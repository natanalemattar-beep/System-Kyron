import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const [stats] = await query(
    `SELECT
       COUNT(DISTINCT cliente_id)::int AS total_clientes,
       COALESCE(SUM(total), 0)::text AS total_ingresos,
       COALESCE(AVG(total), 0)::text AS ingreso_promedio_cliente
     FROM facturas WHERE user_id = $1`,
    [uid]
  );

  const ventas = await query(
    `SELECT TO_CHAR(DATE_TRUNC('month', fecha_emision), 'Mon') AS mes,
            COALESCE(SUM(total), 0)::float AS total
     FROM facturas WHERE user_id = $1 AND fecha_emision >= CURRENT_DATE - INTERVAL '6 months'
     GROUP BY DATE_TRUNC('month', fecha_emision)
     ORDER BY DATE_TRUNC('month', fecha_emision)`,
    [uid]
  );

  return NextResponse.json({
    total_clientes: (stats as Record<string, unknown>)?.total_clientes ?? 0,
    total_ingresos: (stats as Record<string, unknown>)?.total_ingresos ?? '0',
    ingreso_promedio_cliente: (stats as Record<string, unknown>)?.ingreso_promedio_cliente ?? '0',
    ventas_mensuales: ventas.map(v => ({
      mes: (v as Record<string, unknown>).mes,
      total: parseFloat(String((v as Record<string, unknown>).total)) || 0,
    })),
  });
}
