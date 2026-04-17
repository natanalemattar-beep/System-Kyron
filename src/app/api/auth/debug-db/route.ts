import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { initializeDatabase } from '@/lib/db-schema';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    env: {
      has_db_url: !!(process.env.DATABASE_URL || process.env.POSTGRES_URL),
      has_jwt_secret: !!process.env.JWT_SECRET,
      has_encryption_key: !!process.env.ENCRYPTION_KEY,
      has_gemini_key: !!(process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY),
      node_env: process.env.NODE_ENV,
    },
    tables: {},
  };

  try {
    const tableList = ['users', 'user_modules', 'activity_log', 'verification_codes'];
    for (const table of tableList) {
      const columns = await query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [table]);
      results.tables[table] = columns;
    }
  } catch (err: any) {
    results.error = err.message;
  }

  return NextResponse.json(results);
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
        // Check Plan Mapping
        const { VALID_PLANS_MAP } = await import('@/lib/planes-kyron');
        const results: any[] = [];
        results.push({
            name: 'Plan Configuration',
            status: VALID_PLANS_MAP ? 'OK' : 'ERROR',
            details: {
                total_plans_mapped: Object.keys(VALID_PLANS_MAP).length,
                mapped_tiers: Object.keys(VALID_PLANS_MAP).filter(k => ['personal', 'profesional', 'empresarial'].includes(k))
            }
        });

        return NextResponse.json({ success: true, timestamp: new Date().toISOString(), results });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      postgres_error: err.message, 
      detail: err.detail || null, 
      hint: err.hint || null 
    }, { status: 500 });
  }
}
