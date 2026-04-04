import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const ingresos = await query(
    `SELECT TO_CHAR(DATE_TRUNC('month', fecha_emision), 'Mon') AS mes,
            COALESCE(SUM(total), 0)::float AS ingresos
     FROM facturas WHERE user_id = $1 AND fecha_emision >= CURRENT_DATE - INTERVAL '6 months'
     GROUP BY DATE_TRUNC('month', fecha_emision)
     ORDER BY DATE_TRUNC('month', fecha_emision)`,
    [uid]
  );

  const egresos = await query(
    `SELECT TO_CHAR(DATE_TRUNC('month', fecha_vencimiento), 'Mon') AS mes,
            COALESCE(SUM(monto_original), 0)::float AS egresos
     FROM cuentas_por_pagar WHERE user_id = $1 AND fecha_vencimiento >= CURRENT_DATE - INTERVAL '6 months'
     GROUP BY DATE_TRUNC('month', fecha_vencimiento)
     ORDER BY DATE_TRUNC('month', fecha_vencimiento)`,
    [uid]
  );

  const mesMap: Record<string, { mes: string; ingresos: number; egresos: number }> = {};

  for (const row of ingresos) {
    const r = row as Record<string, unknown>;
    const mes = r.mes as string;
    if (!mesMap[mes]) mesMap[mes] = { mes, ingresos: 0, egresos: 0 };
    mesMap[mes].ingresos = parseFloat(String(r.ingresos)) || 0;
  }

  for (const row of egresos) {
    const r = row as Record<string, unknown>;
    const mes = r.mes as string;
    if (!mesMap[mes]) mesMap[mes] = { mes, ingresos: 0, egresos: 0 };
    mesMap[mes].egresos = parseFloat(String(r.egresos)) || 0;
  }

  return NextResponse.json({ data: Object.values(mesMap) });
}
