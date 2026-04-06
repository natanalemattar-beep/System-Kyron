import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const MIN_SELECTIONS = 5;

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category');
    if (!category) {
      return NextResponse.json({ error: 'category parameter required' }, { status: 400 });
    }

    const rows = await query<{ plan_id: string; count: string }>(
      `SELECT plan_id, COUNT(*)::text as count
       FROM plan_selections
       WHERE category = $1
       GROUP BY plan_id
       ORDER BY COUNT(*) DESC
       LIMIT 1`,
      [category]
    );

    if (!rows.length || parseInt(rows[0].count) < MIN_SELECTIONS) {
      return NextResponse.json({ popularPlan: null, totalSelections: 0 });
    }

    const totalRows = await query<{ total: string }>(
      `SELECT COUNT(*)::text as total FROM plan_selections WHERE category = $1`,
      [category]
    );

    return NextResponse.json({
      popularPlan: rows[0].plan_id,
      totalSelections: parseInt(totalRows[0]?.total || '0'),
    });
  } catch (err) {
    console.error('[plan-popularity] GET error:', err);
    return NextResponse.json({ popularPlan: null, totalSelections: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { category, planId } = await req.json();
    if (!category || !planId) {
      return NextResponse.json({ error: 'category and planId required' }, { status: 400 });
    }

    await query(
      `INSERT INTO plan_selections (category, plan_id) VALUES ($1, $2)`,
      [category, planId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[plan-popularity] POST error:', err);
    return NextResponse.json({ error: 'Failed to record selection' }, { status: 500 });
  }
}
