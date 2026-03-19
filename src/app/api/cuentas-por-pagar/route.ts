import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const cxp = await query(
    `SELECT c.id, c.concepto, c.monto_original::text, c.monto_pendiente::text,
            c.moneda, c.fecha_emision, c.fecha_vencimiento, c.estado,
            c.numero_factura_proveedor, c.notas, c.created_at, c.proveedor_id,
            p.razon_social AS proveedor_nombre, p.rif AS proveedor_rif,
            p.telefono AS proveedor_telefono, p.email AS proveedor_email
     FROM cuentas_por_pagar c
     LEFT JOIN proveedores p ON p.id = c.proveedor_id
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
     FROM cuentas_por_pagar WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ cuentas: cxp, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { proveedor_id, concepto, monto_original, moneda, fecha_emision, fecha_vencimiento, numero_factura_proveedor, notas } = body;

  if (!concepto || !monto_original || !fecha_emision) {
    return NextResponse.json({ error: 'Concepto, monto y fecha son requeridos' }, { status: 400 });
  }

  const monto = parseFloat(monto_original);
  const [cxp] = await query<{ id: number }>(
    `INSERT INTO cuentas_por_pagar (user_id, proveedor_id, concepto, monto_original, monto_pendiente, moneda, fecha_emision, fecha_vencimiento, numero_factura_proveedor, notas)
     VALUES ($1,$2,$3,$4,$4,$5,$6,$7,$8,$9)
     RETURNING id`,
    [session.userId, proveedor_id ?? null, concepto, monto, moneda ?? 'VES', fecha_emision, fecha_vencimiento ?? null, numero_factura_proveedor ?? null, notas ?? null]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVA_CXP',
    categoria: 'contabilidad',
    descripcion: `C×P registrada: ${concepto} — Bs. ${monto.toFixed(2)}`,
    entidadTipo: 'cxp',
    entidadId: cxp.id,
  });

  return NextResponse.json({ success: true, id: cxp.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, monto_abono, estado } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  if (monto_abono !== undefined) {
    await query(
      `UPDATE cuentas_por_pagar
       SET monto_pendiente = GREATEST(0, monto_pendiente - $1),
           estado = CASE WHEN monto_pendiente - $1 <= 0 THEN 'pagada'
                         WHEN monto_pendiente - $1 < monto_original THEN 'parcial'
                         ELSE estado END,
           updated_at = NOW()
       WHERE id = $2 AND user_id = $3`,
      [parseFloat(monto_abono), id, session.userId]
    );
  } else if (estado) {
    await query(
      `UPDATE cuentas_por_pagar SET estado = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
      [estado, id, session.userId]
    );
  }

  return NextResponse.json({ success: true });
}
