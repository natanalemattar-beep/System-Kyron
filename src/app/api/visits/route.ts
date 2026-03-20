import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function detectDevice(ua: string): 'desktop' | 'mobile' | 'tablet' | 'unknown' {
  if (!ua) return 'unknown';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  if (/windows|macintosh|linux/i.test(ua)) return 'desktop';
  return 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
      || headersList.get('x-real-ip')
      || 'unknown';
    const ua = headersList.get('user-agent') || '';
    const referrer = headersList.get('referer') || '';

    let body: { page?: string; visitor_id?: string; user_id?: number | null; module?: string } = {};
    try { body = await req.json(); } catch {}

    const page = body.page || '/';
    const visitor_id = body.visitor_id || null;
    const user_id = body.user_id || null;
    const module = body.module || 'other';
    const device_type = detectDevice(ua);

    await query(
      `INSERT INTO page_visits (page, visitor_id, user_id, module, ip, user_agent, referrer, device_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [page, visitor_id, user_id, module, ip, ua.slice(0, 512), referrer.slice(0, 256), device_type]
    );

    await query(`
      INSERT INTO site_metrics (metric_key, metric_value, updated_at)
      VALUES ('total_visits', 1, NOW())
      ON CONFLICT (metric_key)
      DO UPDATE SET metric_value = site_metrics.metric_value + 1, updated_at = NOW()
    `);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [totalResult, todayResult, uniqueResult, usersResult, activeResult] = await Promise.all([
      query<{ total: string }>(`SELECT metric_value AS total FROM site_metrics WHERE metric_key = 'total_visits'`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '24 hours'`),
      query<{ total: string }>(`SELECT COUNT(DISTINCT visitor_id) AS total FROM page_visits WHERE visitor_id IS NOT NULL`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM users`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '5 minutes'`),
    ]);

    return NextResponse.json({
      totalVisits: parseInt(totalResult[0]?.total ?? '0', 10),
      visitsToday: parseInt(todayResult[0]?.total ?? '0', 10),
      uniqueVisitors: parseInt(uniqueResult[0]?.total ?? '0', 10),
      registeredUsers: parseInt(usersResult[0]?.total ?? '0', 10),
      activeNow: parseInt(activeResult[0]?.total ?? '0', 10),
    });
  } catch {
    return NextResponse.json({
      totalVisits: 0,
      visitsToday: 0,
      uniqueVisitors: 0,
      registeredUsers: 0,
      activeNow: 0,
    });
  }
}
