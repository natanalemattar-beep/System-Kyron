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

export async function POST(req: NextRequest) {
  try {
    const res = await query(
      `INSERT INTO users (
            email, password_hash, tipo,
            nombre, razon_social, rif, tipo_empresa, actividad_economica, codigo_ciiu,
            fecha_constitucion, registro_mercantil, capital_social,
            telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
            rep_nombre, rep_cedula, rep_email, rep_cargo, rep_telefono,
            plan, plan_monto,
            verificado
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21,
                 $22, $23,
                 $24)
         RETURNING id`,
      [
        'debug_test_empresa@kyron.com', 'fakepasswordhash',
        'Empresa Test SRL', 'Empresa Test', 'J-12345678-9',
        'Tech', 'Software', '1234',
        null, 'Reg 1', '1000',
        '04121234567', '', 'DC', 'Caracas', 'Direccion falsa',
        'Rep Test', 'V-12345678', 'debug_test_empresa@kyron.com', 'CEO', '04121234567',
        'contable_esencial', 8.00,
        true
      ]
    );
    // Cleanup if it worked magically
    await query("DELETE FROM users WHERE email = 'debug_test_empresa@kyron.com'");
    return NextResponse.json({ success: true, inserted: res });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      postgres_error: err.message, 
      detail: err.detail || null, 
      hint: err.hint || null 
    }, { status: 500 });
  }
}
