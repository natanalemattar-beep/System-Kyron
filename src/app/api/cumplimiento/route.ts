import { NextRequest, NextResponse } from "next/server";
  import { query } from "@/lib/db";
  import { getSession } from "@/lib/session";

  const ALLOWED_FIELDS = new Set(["norma", "organismo", "categoria", "descripcion", "estado", "nivel_riesgo", "fecha_limite", "fecha_cumplimiento", "responsable", "acciones_correctivas", "multa_estimada", "notas"]);

  export async function GET() {
    try {
      const session = await getSession();
      if (!session?.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const rows = await query(`SELECT * FROM cumplimiento_normativo WHERE user_id = $1 ORDER BY created_at DESC`, [session.userId]);
      const statsResult = await query(`SELECT COUNT(*) FILTER (WHERE estado='cumplido') as cumplidos, COUNT(*) FILTER (WHERE estado='pendiente') as pendientes, COUNT(*) FILTER (WHERE nivel_riesgo='alto' OR nivel_riesgo='critico') as alto_riesgo, COUNT(*) as total FROM cumplimiento_normativo WHERE user_id = $1`, [session.userId]);
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
        `INSERT INTO cumplimiento_normativo (user_id, norma, organismo, categoria, descripcion, nivel_riesgo, fecha_limite, responsable, multa_estimada, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [session.userId, body.norma, body.organismo, body.categoria, body.descripcion, body.nivel_riesgo, body.fecha_limite, body.responsable, body.multa_estimada, body.notas]
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
      await query(`DELETE FROM cumplimiento_normativo WHERE id = $1 AND user_id = $2`, [id, session.userId]);
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
        `UPDATE cumplimiento_normativo SET ${sets}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, session.userId, ...vals]
      );
      return NextResponse.json({ row: result.rows[0] });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }
  