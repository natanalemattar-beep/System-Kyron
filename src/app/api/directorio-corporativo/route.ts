import { NextRequest, NextResponse } from "next/server";
  import { query } from "@/lib/db";
  import { getSession } from "@/lib/session";

  const ALLOWED_FIELDS = new Set(["nombre", "apellido", "cedula", "cargo", "departamento", "email", "telefono", "extension", "ubicacion", "fecha_ingreso", "tipo_contrato", "supervisor", "estado"]);

  export async function GET() {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const rows = await query(`SELECT * FROM directorio_corporativo WHERE user_id = $1 ORDER BY created_at DESC`, [session.userId]);
      const statsResult = await query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE estado='activo') as activos, COUNT(DISTINCT departamento) as departamentos, COUNT(*) FILTER (WHERE tipo_contrato='temporal') as temporales FROM directorio_corporativo WHERE user_id = $1`, [session.userId]);
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
        `INSERT INTO directorio_corporativo (user_id, nombre, apellido, cedula, cargo, departamento, email, telefono, extension, ubicacion, fecha_ingreso, tipo_contrato, supervisor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [session.userId, body.nombre, body.apellido, body.cedula, body.cargo, body.departamento, body.email, body.telefono, body.extension, body.ubicacion, body.fecha_ingreso, body.tipo_contrato, body.supervisor]
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
      await query(`DELETE FROM directorio_corporativo WHERE id = $1 AND user_id = $2`, [id, session.userId]);
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
        `UPDATE directorio_corporativo SET ${sets}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, session.userId, ...vals]
      );
      return NextResponse.json({ row: result.rows[0] });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }
  