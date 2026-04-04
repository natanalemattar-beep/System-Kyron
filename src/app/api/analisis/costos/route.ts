import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const cxp = await query(
    `SELECT COALESCE(concepto, 'Sin categoría') AS nombre, SUM(monto_original)::float AS valor
     FROM cuentas_por_pagar WHERE user_id = $1
     GROUP BY COALESCE(concepto, 'Sin categoría')
     ORDER BY valor DESC LIMIT 6`,
    [uid]
  );

  const [statsRow] = await query(
    `SELECT
       COALESCE(SUM(monto_original), 0)::text AS total_costos
     FROM cuentas_por_pagar WHERE user_id = $1`,
    [uid]
  );

  const [ingresoRow] = await query(
    `SELECT COALESCE(SUM(total), 0)::float AS total_ingresos FROM facturas WHERE user_id = $1`,
    [uid]
  );

  const totalCostos = parseFloat((statsRow as Record<string, unknown>)?.total_costos as string) || 0;
  const totalIngresos = parseFloat(String((ingresoRow as Record<string, unknown>)?.total_ingresos ?? '0')) || 0;
  const margenBruto = totalIngresos > 0 ? ((totalIngresos - totalCostos) / totalIngresos) * 100 : 0;

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "#0ea5e9",
    "#f97316",
    "#8b5cf6",
    "#10b981",
  ];

  const desglose = cxp.map((row, i) => ({
    name: (row as Record<string, unknown>).nombre as string,
    value: parseFloat(String((row as Record<string, unknown>).valor ?? '0')) || 0,
    fill: COLORS[i % COLORS.length],
  }));

  return NextResponse.json({
    total_costos: String(totalCostos),
    margen_bruto: String(margenBruto),
    punto_equilibrio: "N/A",
    desglose,
  });
}
