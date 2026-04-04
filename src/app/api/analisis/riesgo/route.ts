import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const cxcVencidas = await query(
    `SELECT id, COALESCE(concepto, 'Cuenta por cobrar') AS desc, monto_pendiente::text AS monto
     FROM cuentas_por_cobrar
     WHERE user_id = $1 AND estado IN ('vencida','parcial') AND fecha_vencimiento < CURRENT_DATE
     LIMIT 5`,
    [uid]
  );

  const cxpVencidas = await query(
    `SELECT id, COALESCE(concepto, 'Cuenta por pagar') AS desc, monto_pendiente::text AS monto
     FROM cuentas_por_pagar
     WHERE user_id = $1 AND estado IN ('vencida','parcial') AND fecha_vencimiento < CURRENT_DATE
     LIMIT 5`,
    [uid]
  );

  const riesgos_cxc = cxcVencidas.map((r, i) => ({
    id: `CXC-${String(i + 1).padStart(3, '0')}`,
    area: "Cuentas por Cobrar",
    desc: (r as Record<string, unknown>).desc as string,
    impacto: "Alto",
    prob: "Alta",
    score: 9,
  }));

  const riesgos_cxp = cxpVencidas.map((r, i) => ({
    id: `CXP-${String(i + 1).padStart(3, '0')}`,
    area: "Cuentas por Pagar",
    desc: (r as Record<string, unknown>).desc as string,
    impacto: "Medio",
    prob: "Alta",
    score: 7,
  }));

  const total = riesgos_cxc.length + riesgos_cxp.length;
  const score_global = total === 0 ? 0 : Math.min(10, 5 + total * 0.8);

  return NextResponse.json({ score_global, riesgos_cxc, riesgos_cxp });
}
