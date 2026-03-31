import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { executeAutomation, getAutomationStats, runScheduledAutomations } from '@/lib/automation-engine';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getAutomationStats();
      return NextResponse.json(stats);
    }

    if (action === 'logs') {
      const ruleId = searchParams.get('rule_id');
      const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20') || 20, 1), 100);
      let logsQuery = `
        SELECT al.*, ar.name as rule_name, ar.action_type
        FROM automation_logs al
        JOIN automation_rules ar ON al.rule_id = ar.id
      `;
      const params: unknown[] = [];
      if (ruleId) {
        logsQuery += ` WHERE al.rule_id = $1`;
        params.push(ruleId);
      }
      logsQuery += ` ORDER BY al.started_at DESC LIMIT $${params.length + 1}`;
      params.push(limit);
      const logs = await query(logsQuery, params);
      return NextResponse.json({ logs });
    }

    const rules = await query(
      `SELECT * FROM automation_rules ORDER BY enabled DESC, last_run_at DESC NULLS LAST`
    );
    return NextResponse.json({ rules });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, rule_id } = body;

    if (action === 'execute' && rule_id) {
      const log = await executeAutomation(rule_id);
      return NextResponse.json({ log });
    }

    if (action === 'run_scheduled') {
      const logs = await runScheduledAutomations();
      return NextResponse.json({ executed: logs.length, logs });
    }

    if (action === 'toggle' && rule_id) {
      await query(
        `UPDATE automation_rules SET enabled = NOT enabled WHERE id = $1`,
        [rule_id]
      );
      const updated = await queryOne(`SELECT * FROM automation_rules WHERE id = $1`, [rule_id]);
      return NextResponse.json({ rule: updated });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
