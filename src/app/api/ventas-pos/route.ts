import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '50');
  const fecha_inicio = searchParams.get('fecha_inicio');
  const fecha_fin = searchParams.get('fecha_fin');

  const conditions = ['v.user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (fecha_inicio) { conditions.push(`v.fecha_venta >= $${i++}`); params.push(fecha_inicio); }
  if (fecha_fin)    { conditions.push(`v.fecha_venta <= $${i++}`); params.push(fecha_fin + ' 23:59:59'); }

  params.push(limit);

  const ventas = await query(
    `SELECT v.id, v.numero_venta, v.fecha_venta, v.subtotal::text, v.monto_iva::text,
            v.descuento_total::text, v.total::text, v.moneda, v.metodo_pago,
            v.estado, v.cajero, v.notas, v.cliente_id,
            c.razon_social AS cliente_nombre,
            (SELECT COUNT(*) FROM ventas_pos_items WHERE venta_id = v.id)::int AS num_items
     FROM ventas_pos v
     LEFT JOIN clientes c ON c.id = v.cliente_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY v.fecha_venta DESC
     LIMIT $${i}`,
    params
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'completada')::int AS ventas_hoy,
       COALESCE(SUM(total) FILTER (WHERE estado = 'completada' AND DATE(fecha_venta) = CURRENT_DATE), 0)::text AS total_hoy,
       COALESCE(SUM(total) FILTER (WHERE estado = 'completada' AND date_trunc('month', fecha_venta) = date_trunc('month', NOW())), 0)::text AS total_mes
     FROM ventas_pos WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ ventas, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    cliente_id, numero_venta, moneda, tasa_bcv,
    metodo_pago, cajero, notas, items
  } = body;

  if (!numero_venta || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Número de venta e items son requeridos' }, { status: 400 });
  }

  let subtotal = 0;
  let monto_iva = 0;
  let descuento_total = 0;

  for (const item of items) {
    const cant = parseFloat(item.cantidad ?? '1');
    const pu   = parseFloat(item.precio_unitario ?? '0');
    const desc = parseFloat(item.descuento_pct ?? '0');
    const itemSub = cant * pu * (1 - desc / 100);
    subtotal += itemSub;
    descuento_total += cant * pu * (desc / 100);
    if (item.aplica_iva !== false) monto_iva += itemSub * 0.16;
  }

  const total = subtotal + monto_iva;

  const [venta] = await query<{ id: number; numero_venta: string }>(
    `INSERT INTO ventas_pos (user_id, cliente_id, numero_venta, subtotal, porcentaje_iva, monto_iva,
                             descuento_total, total, moneda, tasa_bcv, metodo_pago, cajero, notas)
     VALUES ($1,$2,$3,$4,16,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING id, numero_venta`,
    [
      session.userId,
      cliente_id ?? null, numero_venta,
      subtotal, monto_iva, descuento_total, total,
      moneda ?? 'VES',
      tasa_bcv ? parseFloat(tasa_bcv) : null,
      metodo_pago ?? 'efectivo',
      cajero ?? null, notas ?? null,
    ]
  );

  for (const item of items) {
    const cant    = parseFloat(item.cantidad ?? '1');
    const pu      = parseFloat(item.precio_unitario ?? '0');
    const desc    = parseFloat(item.descuento_pct ?? '0');
    const itemSub = cant * pu * (1 - desc / 100);
    await query(
      `INSERT INTO ventas_pos_items (venta_id, inventario_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, aplica_iva)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [venta.id, item.inventario_id ?? null, item.descripcion, cant, pu, desc, itemSub, item.aplica_iva !== false]
    );
    if (item.inventario_id && cant > 0) {
      await query(
        `UPDATE inventario SET stock_actual = GREATEST(0, stock_actual - $1) WHERE id = $2 AND user_id = $3`,
        [cant, item.inventario_id, session.userId]
      );
    }
  }

  await logActivity({
    userId: session.userId,
    evento: 'VENTA_POS',
    categoria: 'contabilidad',
    descripcion: `Venta POS: ${venta.numero_venta} — Total: Bs. ${total.toFixed(2)} (${metodo_pago ?? 'efectivo'})`,
    entidadTipo: 'venta_pos',
    entidadId: venta.id,
    metadata: { total, metodo_pago, moneda },
  });

  return NextResponse.json({ success: true, venta });
}
