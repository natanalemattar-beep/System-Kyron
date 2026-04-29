import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { verificarAlertasRegulatorias } from '@/lib/alertas-regulatorias';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Ensure the table exists (Lazy initialization for Vercel/Serverless)
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS system_tasks (
        task_name TEXT PRIMARY KEY,
        last_run TIMESTAMP WITH TIME ZONE,
        status TEXT,
        metadata JSONB
      )
    `);
  } catch (err) {
    console.error('[maintenance] Error ensuring system_tasks table:', err);
  }

  const tasks = [
    { name: 'bcv_fetch', intervalMs: 30 * 60 * 1000 }, // 30 mins
    { name: 'regulatorio_check', intervalMs: 60 * 60 * 1000 }, // 1 hour
  ];

  const results: Record<string, any> = {};

  for (const task of tasks) {
    try {
      const log = await queryOne<{ last_run: string }>(
        `SELECT last_run FROM system_tasks WHERE task_name = $1`,
        [task.name]
      );

      const now = Date.now();
      const lastRun = log ? new Date(log.last_run).getTime() : 0;

      if (now - lastRun > task.intervalMs) {
        console.log(`[maintenance] Running task: ${task.name}`);
        
        if (task.name === 'bcv_fetch') {
          // Trigger the internal fetch
          const res = await fetch(`${new URL(req.url).origin}/api/tasas-bcv/auto-fetch`, {
            headers: { 'x-internal-fetch': 'true' }
          });
          results[task.name] = await res.json();
        } else if (task.name === 'regulatorio_check') {
          const alertas = await verificarAlertasRegulatorias();
          results[task.name] = { count: alertas.length };
        }

        await query(
          `INSERT INTO system_tasks (task_name, last_run, status)
           VALUES ($1, NOW(), $2)
           ON CONFLICT (task_name) DO UPDATE SET last_run = NOW(), status = $2`,
          [task.name, 'success']
        );
      } else {
        results[task.name] = 'skipped (cooldown)';
      }
    } catch (err: any) {
      console.error(`[maintenance] Task ${task.name} failed:`, err.message);
      results[task.name] = { error: err.message };
    }
  }

  return NextResponse.json({ success: true, results });
}
