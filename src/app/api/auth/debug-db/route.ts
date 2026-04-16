import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { initializeDatabase } from '@/lib/db-schema';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    env: {
      has_db_url: !!process.env.DATABASE_URL,
      db_url_is_localhost: process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1'),
    },
    tests: {},
  };

  // Test 1: Basic Connection
  try {
    const startTime = Date.now();
    await query('SELECT 1');
    results.tests.connection = { status: 'ok', latency: `${Date.now() - startTime}ms` };
  } catch (err: any) {
    results.tests.connection = { status: 'error', message: err.message };
  }

  // Test 2: Table existence
  try {
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    const tableNames = (tables as any[]).map(t => t.table_name);
    results.tests.tables = {
      count: tableNames.length,
      names: tableNames,
      required_present: {
        users: tableNames.includes('users'),
        verification_codes: tableNames.includes('verification_codes'),
        tasas_bcv: tableNames.includes('tasas_bcv'),
      }
    };
  } catch (err: any) {
    results.tests.tables = { status: 'error', message: err.message };
  }

  // Action: Auto-init if missing and secret is provided
  const secret = req.nextUrl.searchParams.get('init_secret');
  if (secret === 'kyron_force_2026') {
    try {
      await initializeDatabase();
      results.action = 'Database initialized successfully';
    } catch (err: any) {
      results.action = 'Error initializing database: ' + err.message;
    }
  }

  return NextResponse.json(results, { status: results.tests.connection?.status === 'ok' ? 200 : 500 });
}
