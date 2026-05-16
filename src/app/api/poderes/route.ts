import { NextRequest, NextResponse } from "next/server";
  import { query } from "@/lib/db";
  import { getSession } from "@/lib/session";

  const ALLOWED_FIELDS = new Set(["tipo", "titulo", "otorgante", "apoderado", "cedula_otorgante", "cedula_apoderado", "notaria", "numero_documento", "tomo", "folio", "facultades", "fecha_otorgamiento", "fecha_vencimiento", "estado", "notas"]);

  export async function GET() {
    try {
      const session = await getSession();
      if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const rows = await query(`SELECT * FROM poderes_notariados WHERE user_id = $1 ORDER BY created_at DESC`, [session.user.id]);
      const statsResult = await query(`SELECT COUNT(*) FILTER (WHERE estado='vigente') as vigentes, COUNT(*) FILTER (WHERE estado='vencido') as vencidos, COUNT(*) FILTER (WHERE estado='revocado') as revocados, COUNT(*) as total FROM poderes_notariados WHERE user_id = $1`, [session.user.id]);
      return NextResponse.json({ rows: rows, stats: statsResult[0] || {} });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function POST(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const body = await req.json();
      const result = await query(
        `INSERT INTO poderes_notariados (user_id, tipo, titulo, otorgante, apoderado, cedula_otorgante, cedula_apoderado, notaria, numero_documento, tomo, folio, facultades, fecha_otorgamiento, fecha_vencimiento, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
        [session.user.id, body.tipo, body.titulo, body.otorgante, body.apoderado, body.cedula_otorgante, body.cedula_apoderado, body.notaria, body.numero_documento, body.tomo, body.folio, body.facultades, body.fecha_otorgamiento, body.fecha_vencimiento, body.notas]
      );
      return NextResponse.json({ row: result[0] }, { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const { id } = await req.json();
      await query(`DELETE FROM poderes_notariados WHERE id = $1 AND user_id = $2`, [id, session.user.id]);
      return NextResponse.json({ ok: true });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  export async function PATCH(req: NextRequest) {
    try {
      const session = await getSession();
      if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      const { id, ...updates } = await req.json();
      const safeKeys = Object.keys(updates).filter(k => ALLOWED_FIELDS.has(k));
      if (!safeKeys.length) return NextResponse.json({ error: "Sin campos vÃ¡lidos" }, { status: 400 });
      const sets = safeKeys.map((k, i) => `${k} = $${i + 3}`).join(', ');
      const vals = safeKeys.map(k => updates[k]);
      const result = await query(
        `UPDATE poderes_notariados SET ${sets}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, session.user.id, ...vals]
      );
      return NextResponse.json({ row: result[0] });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }
  
