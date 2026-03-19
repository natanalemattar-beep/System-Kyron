import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const cxc = await query(
    `SELECT c.id, c.concepto, c.monto_original::text, c.monto_pendiente::text,
            c.moneda, c.fecha_emision, c.fecha_vencimiento, c.estado,
            c.dias_vencimiento, c.notas, c.created_at, c.factura_id, c.cliente_id,
            cl.razon_social AS cliente_nombre, cl.rif AS cliente_rif,
            cl.telefono AS cliente_telefono, cl.email AS cliente_email
     FROM cuentas_por_cobrar c
     LEFT JOIN clientes cl ON cl.id = c.cliente_id
     WHERE c.user_id = $1
     ORDER BY c.estado ASC, c.fecha_vencimiento ASC NULLS LAST`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COALESCE(SUM(monto_pendiente) FILTER (WHERE estado IN ('pendiente','parcial')), 0)::text AS total_pendiente,
       COALESCE(SUM(monto_pendiente) FILTER (WHERE estado = 'vencida'), 0)::text AS total_vencido,
       COUNT(*) FILTER (WHERE estado IN ('pendiente','parcial'))::int AS num_pendientes,
       COUNT(*) FILTER (WHERE estado = 'vencida')::int AS num_vencidas
     FROM cuentas_por_cobrar WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ cuentas: cxc, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { cliente_id, factura_id, concepto, monto_original, moneda, fecha_emision, fecha_vencimiento, notas } = body;

  if (!concepto || !monto_original || !fecha_emision) {
    return NextResponse.json({ error: 'Concepto, monto y fecha son requeridos' }, { status: 400 });
  }

  const monto = parseFloat(monto_original);
  const [cxc] = await query<{ id: number }>(
    `INSERT INTO cuentas_por_cobrar (user_id, cliente_id, factura_id, concepto, monto_original, monto_pendiente, moneda, fecha_emision, fecha_vencimiento, notas)
     VALUES ($1,$2,$3,$4,$5,$5,$6,$7,$8,$9)
     RETURNING id`,
    [session.userId, cliente_id ?? null, factura_id ?? null, concepto, monto, moneda ?? 'VES', fecha_emision, fecha_vencimiento ?? null, notas ?? null]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVA_CXC',
    categoria: 'contabilidad',
    descripcion: `C×C registrada: ${concepto} — Bs. ${monto.toFixed(2)}`,
    entidadTipo: 'cxc',
    entidadId: cxc.id,
  });

  return NextResponse.json({ success: true, id: cxc.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, monto_abono, estado } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  if (monto_abono !== undefined) {
    await query(
      `UPDATE cuentas_por_cobrar
       SET monto_pendiente = GREATEST(0, monto_pendiente - $1),
           estado = CASE WHEN monto_pendiente - $1 <= 0 THEN 'cobrada'
                         WHEN monto_pendiente - $1 < monto_original THEN 'parcial'
                         ELSE estado END,
           updated_at = NOW()
       WHERE id = $2 AND user_id = $3`,
      [parseFloat(monto_abono), id, session.userId]
    );
  } else if (estado) {
    await query(
      `UPDATE cuentas_por_cobrar SET estado = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
      [estado, id, session.userId]
    );
  }

  return NextResponse.json({ success: true });
}
