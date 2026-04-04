import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;
  const { searchParams } = new URL(req.url);
  const timeFrame = searchParams.get('timeFrame') ?? 'quarter';

  const interval = timeFrame === 'month' ? '1 month' : timeFrame === 'year' ? '12 months' : '3 months';

  const rows = await query(
    `SELECT
       COALESCE(c.razon_social, c.nombre_contacto, 'Sin cliente') AS nombre,
       f.tipo_documento AS categoria,
       COALESCE(SUM(f.total), 0)::float AS ingresos,
       0::float AS costos
     FROM facturas f
     LEFT JOIN clientes c ON c.id = f.cliente_id AND c.user_id = f.user_id
     WHERE f.user_id = $1
       AND f.fecha_emision >= CURRENT_DATE - $2::interval
       AND f.tipo = 'venta'
     GROUP BY COALESCE(c.razon_social, c.nombre_contacto, 'Sin cliente'), f.tipo_documento
     HAVING SUM(f.total) > 0
     ORDER BY ingresos DESC LIMIT 10`,
    [uid, interval]
  );

  const cxp = await query(
    `SELECT concepto AS nombre, SUM(monto_original)::float AS costos
     FROM cuentas_por_pagar WHERE user_id = $1 AND fecha_vencimiento >= CURRENT_DATE - $2::interval
     GROUP BY concepto`,
    [uid, interval]
  );

  const costMap: Record<string, number> = {};
  for (const r of cxp) {
    const row = r as Record<string, unknown>;
    costMap[row.nombre as string] = parseFloat(String(row.costos)) || 0;
  }

  const data = rows.map((r, i) => {
    const row = r as Record<string, unknown>;
    const ingresos = parseFloat(String(row.ingresos)) || 0;
    const costos = costMap[row.nombre as string] ?? 0;
    const margen = ingresos > 0 ? ((ingresos - costos) / ingresos) * 100 : 0;
    return {
      id: `rent-${i}`,
      nombre: row.nombre as string,
      categoria: (row.categoria as string) ?? 'FACTURA',
      ingresos,
      costos,
      margen,
      tendencia: 'stable' as const,
    };
  });

  return NextResponse.json({ data });
}
