import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const estado = searchParams.get('estado');

  const conditions = ['p.user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (estado) { conditions.push(`p.estado = $${i++}`); params.push(estado); }

  const proformas = await query(
    `SELECT p.id, p.numero_proforma, p.fecha_emision, p.fecha_vencimiento,
            p.moneda, p.subtotal::text, p.monto_iva::text, p.total::text,
            p.tasa_bcv, p.total_usd::text, p.estado, p.descripcion,
            p.condiciones_pago, p.validez_dias, p.cliente_id,
            c.razon_social AS cliente_nombre, c.rif AS cliente_rif,
            (SELECT COUNT(*) FROM proforma_items WHERE proforma_id = p.id)::int AS num_items
     FROM proformas p
     LEFT JOIN clientes c ON c.id = p.cliente_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY p.fecha_emision DESC, p.id DESC
     LIMIT 100`,
    params
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'borrador')::int    AS borradores,
       COUNT(*) FILTER (WHERE estado = 'enviada')::int     AS enviadas,
       COUNT(*) FILTER (WHERE estado = 'aprobada')::int    AS aprobadas,
       COUNT(*) FILTER (WHERE estado = 'rechazada')::int   AS rechazadas,
       COALESCE(SUM(total) FILTER (WHERE estado = 'aprobada'),0)::text AS total_aprobado
     FROM proformas WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ proformas, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    cliente_id, numero_proforma, fecha_emision, fecha_vencimiento,
    moneda, subtotal, porcentaje_iva, tasa_bcv, condiciones_pago,
    validez_dias, descripcion, notas, items
  } = body;

  if (!numero_proforma || !fecha_emision || subtotal === undefined) {
    return NextResponse.json({ error: 'Faltan campos obligatorios: número, fecha y subtotal' }, { status: 400 });
  }

  const sub   = parseFloat(subtotal ?? '0');
  const piva  = parseFloat(porcentaje_iva ?? '16');
  const iva   = sub * (piva / 100);
  const total = sub + iva;
  const bcv   = parseFloat(tasa_bcv ?? '0');
  const totalUsd = bcv > 0 ? total / bcv : null;

  const [proforma] = await query<{ id: number; numero_proforma: string }>(
    `INSERT INTO proformas (user_id, cliente_id, numero_proforma, fecha_emision, fecha_vencimiento,
                            moneda, subtotal, porcentaje_iva, monto_iva, total, tasa_bcv, total_usd,
                            condiciones_pago, validez_dias, descripcion, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING id, numero_proforma`,
    [
      session.userId,
      cliente_id ?? null,
      numero_proforma,
      fecha_emision,
      fecha_vencimiento ?? null,
      moneda ?? 'VES',
      sub, piva, iva, total,
      bcv || null,
      totalUsd,
      condiciones_pago ?? null,
      parseInt(validez_dias ?? '30'),
      descripcion ?? null,
      notas ?? null,
    ]
  );

  if (Array.isArray(items) && items.length > 0) {
    for (const item of items) {
      const cant    = parseFloat(item.cantidad ?? '1');
      const pu      = parseFloat(item.precio_unitario ?? '0');
      const desc    = parseFloat(item.descuento_pct ?? '0');
      const itemSub = cant * pu * (1 - desc / 100);
      await query(
        `INSERT INTO proforma_items (proforma_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, aplica_iva)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [proforma.id, item.descripcion, cant, pu, desc, itemSub, item.aplica_iva !== false]
      );
    }
  }

  await logActivity({
    userId: session.userId,
    evento: 'NUEVA_PROFORMA',
    categoria: 'contabilidad',
    descripcion: `Proforma creada: ${proforma.numero_proforma} — Total: Bs. ${total.toFixed(2)}`,
    entidadTipo: 'proforma',
    entidadId: proforma.id,
    metadata: { numero_proforma: proforma.numero_proforma, total, moneda: moneda ?? 'VES' },
  });

  return NextResponse.json({ success: true, proforma });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado } = body;
  if (!id || !estado) return NextResponse.json({ error: 'id y estado son requeridos' }, { status: 400 });

  await query(
    `UPDATE proformas SET estado = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
    [estado, id, session.userId]
  );

  return NextResponse.json({ success: true });
}
