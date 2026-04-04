import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const [facturaStats] = await query(
    `SELECT
       COUNT(*)::int AS total_facturas,
       COALESCE(SUM(total) FILTER (WHERE date_trunc('month', fecha_emision) = date_trunc('month', CURRENT_DATE)), 0)::text AS ingresos_mes,
       COALESCE(AVG(total) FILTER (WHERE date_trunc('month', fecha_emision) = date_trunc('month', CURRENT_DATE)), 0)::text AS ticket_promedio
     FROM facturas WHERE user_id = $1`,
    [uid]
  );

  const topProductos = await query(
    `SELECT nombre, stock_actual AS ventas, (precio_venta * stock_actual)::text AS ingresos
     FROM inventario WHERE user_id = $1
     ORDER BY precio_venta DESC LIMIT 5`,
    [uid]
  );

  const flujoMensual = await query(
    `SELECT TO_CHAR(DATE_TRUNC('month', fecha_emision), 'Mon') AS mes,
            COALESCE(SUM(total), 0)::float AS ingresos
     FROM facturas WHERE user_id = $1 AND fecha_emision >= CURRENT_DATE - INTERVAL '12 months'
     GROUP BY DATE_TRUNC('month', fecha_emision)
     ORDER BY DATE_TRUNC('month', fecha_emision)`,
    [uid]
  );

  return NextResponse.json({
    total_facturas: (facturaStats as Record<string, unknown>)?.total_facturas ?? 0,
    ingresos_mes: (facturaStats as Record<string, unknown>)?.ingresos_mes ?? '0',
    ticket_promedio: (facturaStats as Record<string, unknown>)?.ticket_promedio ?? '0',
    top_productos: topProductos.map(p => ({
      nombre: (p as Record<string, unknown>).nombre,
      ventas: (p as Record<string, unknown>).ventas ?? 0,
      ingresos: (p as Record<string, unknown>).ingresos ?? '0',
    })),
    flujo_mensual: flujoMensual.map(m => ({
      mes: (m as Record<string, unknown>).mes,
      ingresos: parseFloat((m as Record<string, unknown>).ingresos as string) || 0,
    })),
  });
}
