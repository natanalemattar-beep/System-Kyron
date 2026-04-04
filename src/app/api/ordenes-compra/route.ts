import { NextRequest, NextResponse } from "next/server";
  import { query } from "@/lib/db";
  import { getSession } from "@/lib/session";

  const ALLOWED_FIELDS = new Set(["numero_orden", "proveedor_nombre", "proveedor_rif", "fecha_emision", "fecha_entrega_esperada", "subtotal", "iva", "total", "moneda", "estado", "aprobado_por", "departamento", "condiciones", "notas"]);

  export async function GET() {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const rows = await query(`SELECT * FROM ordenes_compra WHERE user_id = $1 ORDER BY created_at DESC`, [session.userId]);
      const statsResult = await query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE estado='pendiente') as pendientes, COUNT(*) FILTER (WHERE estado='recibida') as recibidas, COALESCE(SUM(total),0) as monto_total FROM ordenes_compra WHERE user_id = $1`, [session.userId]);
      return NextResponse.json({ rows: rows.rows, stats: statsResult.rows[0] || {} });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function POST(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const body = await req.json();
      const result = await query(
        `INSERT INTO ordenes_compra (user_id, numero_orden, proveedor_nombre, proveedor_rif, fecha_emision, fecha_entrega_esperada, moneda, departamento, condiciones, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [session.userId, body.numero_orden, body.proveedor_nombre, body.proveedor_rif, body.fecha_emision, body.fecha_entrega_esperada, body.moneda, body.departamento, body.condiciones, body.notas]
      );
      return NextResponse.json({ row: result.rows[0] }, { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const { id } = await req.json();
      await query(`DELETE FROM ordenes_compra WHERE id = $1 AND user_id = $2`, [id, session.userId]);
      return NextResponse.json({ ok: true });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function PATCH(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const { id, ...updates } = await req.json();
      const safeKeys = Object.keys(updates).filter(k => ALLOWED_FIELDS.has(k));
      if (!safeKeys.length) return NextResponse.json({ error: "Sin campos válidos" }, { status: 400 });
      const sets = safeKeys.map((k, i) => `${k} = $${i + 3}`).join(', ');
      const vals = safeKeys.map(k => updates[k]);
      const result = await query(
        `UPDATE ordenes_compra SET ${sets}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, session.userId, ...vals]
      );
      return NextResponse.json({ row: result.rows[0] });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }
  