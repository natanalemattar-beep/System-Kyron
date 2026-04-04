import { NextRequest, NextResponse } from "next/server";
  import { query } from "@/lib/db";
  import { getSession } from "@/lib/session";

  const ALLOWED_FIELDS = new Set(["marca", "modelo", "anio", "color", "placa", "serial_carroceria", "serial_motor", "tipo", "fecha_registro", "seguro_poliza", "seguro_vencimiento", "revision_tecnica", "estado", "notas"]);

  export async function GET() {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const rows = await query(`SELECT * FROM vehiculos WHERE user_id = $1 ORDER BY created_at DESC`, [session.userId]);
      const statsResult = await query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE estado='activo') as activos, COUNT(*) FILTER (WHERE seguro_vencimiento < CURRENT_DATE) as seguro_vencido, COUNT(*) FILTER (WHERE revision_tecnica < CURRENT_DATE) as revision_vencida FROM vehiculos WHERE user_id = $1`, [session.userId]);
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
        `INSERT INTO vehiculos (user_id, marca, modelo, anio, color, placa, serial_carroceria, serial_motor, tipo, fecha_registro, seguro_poliza, seguro_vencimiento, revision_tecnica, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
        [session.userId, body.marca, body.modelo, body.anio, body.color, body.placa, body.serial_carroceria, body.serial_motor, body.tipo, body.fecha_registro, body.seguro_poliza, body.seguro_vencimiento, body.revision_tecnica, body.notas]
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
      await query(`DELETE FROM vehiculos WHERE id = $1 AND user_id = $2`, [id, session.userId]);
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
        `UPDATE vehiculos SET ${sets}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, session.userId, ...vals]
      );
      return NextResponse.json({ row: result.rows[0] });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }
  