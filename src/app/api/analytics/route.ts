import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const [
      totalVisits,
      visitsToday,
      visitsThisWeek,
      activeNow,
      byModule,
      topPages,
      byDevice,
      dailyTrend,
      uniqueVisitors,
      registeredUsers,
      registeredCompanies,
    ] = await Promise.all([
      query<{ total: string }>(`SELECT COALESCE(metric_value, 0) AS total FROM site_metrics WHERE metric_key = 'total_visits'`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '24 hours'`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '7 days'`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '5 minutes'`),
      query<{ module: string; visits: string }>(`
        SELECT module, COUNT(*) AS visits
        FROM page_visits
        WHERE created_at >= NOW() - INTERVAL '30 days'
          AND module IS NOT NULL
        GROUP BY module
        ORDER BY visits DESC
      `),
      query<{ page: string; visits: string }>(`
        SELECT page, COUNT(*) AS visits
        FROM page_visits
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY page
        ORDER BY visits DESC
        LIMIT 10
      `),
      query<{ device_type: string; visits: string }>(`
        SELECT device_type, COUNT(*) AS visits
        FROM page_visits
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY device_type
        ORDER BY visits DESC
      `),
      query<{ day: string; visits: string }>(`
        SELECT DATE(created_at) AS day, COUNT(*) AS visits
        FROM page_visits
        WHERE created_at >= NOW() - INTERVAL '14 days'
        GROUP BY DATE(created_at)
        ORDER BY day ASC
      `),
      query<{ total: string }>(`SELECT COUNT(DISTINCT visitor_id) AS total FROM page_visits WHERE visitor_id IS NOT NULL`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM users`),
      query<{ total: string }>(`SELECT COUNT(*) AS total FROM users WHERE tipo = 'juridico'`),
    ]);

    return NextResponse.json({
      summary: {
        totalVisits: parseInt(totalVisits[0]?.total ?? '0', 10),
        visitsToday: parseInt(visitsToday[0]?.total ?? '0', 10),
        visitsThisWeek: parseInt(visitsThisWeek[0]?.total ?? '0', 10),
        activeNow: parseInt(activeNow[0]?.total ?? '0', 10),
        uniqueVisitors: parseInt(uniqueVisitors[0]?.total ?? '0', 10),
        registeredUsers: parseInt(registeredUsers[0]?.total ?? '0', 10),
        registeredCompanies: parseInt(registeredCompanies[0]?.total ?? '0', 10),
      },
      byModule: byModule.map(r => ({
        module: r.module,
        visits: parseInt(r.visits, 10),
      })),
      topPages: topPages.map(r => ({
        page: r.page,
        visits: parseInt(r.visits, 10),
      })),
      byDevice: byDevice.map(r => ({
        device: r.device_type,
        visits: parseInt(r.visits, 10),
      })),
      dailyTrend: dailyTrend.map(r => ({
        day: r.day,
        visits: parseInt(r.visits, 10),
      })),
    });
  } catch (err) {
    console.error('[analytics] Error:', err);
    return NextResponse.json({
      summary: {
        totalVisits: 0, visitsToday: 0, visitsThisWeek: 0,
        activeNow: 0, uniqueVisitors: 0, registeredUsers: 0, registeredCompanies: 0,
      },
      byModule: [],
      topPages: [],
      byDevice: [],
      dailyTrend: [],
    });
  }
}
