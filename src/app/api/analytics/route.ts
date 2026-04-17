import { NextResponse } from 'next/server';
import { query, getPool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { cachedQuery } from '@/lib/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ANALYTICS_TTL = 60_000;

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const [summaryData, aggregations] = await Promise.all([
      cachedQuery('analytics:summary', ANALYTICS_TTL, async () => {
        const pool = getPool();
        const result = await pool.query(`
          SELECT
            (SELECT COALESCE(metric_value, 0) FROM site_metrics WHERE metric_key = 'total_visits') AS total_visits,
            (SELECT COUNT(*) FROM page_visits WHERE created_at >= NOW() - INTERVAL '24 hours') AS visits_today,
            (SELECT COUNT(*) FROM page_visits WHERE created_at >= NOW() - INTERVAL '7 days') AS visits_week,
            (SELECT COUNT(*) FROM page_visits WHERE created_at >= NOW() - INTERVAL '5 minutes') AS active_now,
            (SELECT COUNT(DISTINCT visitor_id) FROM page_visits WHERE visitor_id IS NOT NULL) AS unique_visitors,
            (SELECT COUNT(*) FROM users WHERE tipo = 'natural') AS registered_users,
            (SELECT COUNT(*) FROM users WHERE tipo = 'juridico') AS registered_companies
        `);
        const r = result.rows[0] || {};
        return {
          totalVisits: parseInt(r.total_visits ?? '0', 10),
          visitsToday: parseInt(r.visits_today ?? '0', 10),
          visitsThisWeek: parseInt(r.visits_week ?? '0', 10),
          activeNow: parseInt(r.active_now ?? '0', 10),
          uniqueVisitors: parseInt(r.unique_visitors ?? '0', 10),
          registeredUsers: parseInt(r.registered_users ?? '0', 10),
          registeredCompanies: parseInt(r.registered_companies ?? '0', 10),
        };
      }),
      cachedQuery('analytics:aggregations', ANALYTICS_TTL, async () => {
        const [byModule, topPages, byDevice, dailyTrend] = await Promise.all([
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
        ]);
        return {
          byModule: byModule.map(r => ({ module: r.module, visits: parseInt(r.visits, 10) })),
          topPages: topPages.map(r => ({ page: r.page, visits: parseInt(r.visits, 10) })),
          byDevice: byDevice.map(r => ({ device: r.device_type, visits: parseInt(r.visits, 10) })),
          dailyTrend: dailyTrend.map(r => ({ day: r.day, visits: parseInt(r.visits, 10) })),
        };
      }),
    ]);

    return NextResponse.json({
      summary: summaryData,
      ...aggregations,
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
