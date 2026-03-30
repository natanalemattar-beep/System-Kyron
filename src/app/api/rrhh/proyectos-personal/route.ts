import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(`SELECT * FROM proyectos_personal ORDER BY created_at DESC`);
    return NextResponse.json({ proyectos: result.rows });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { titulo, departamento, tipo, descripcion, objetivo, responsable, fecha_inicio, fecha_fin_est, prioridad, presupuesto, estado, progreso } = body;

    if (!titulo || !departamento || !fecha_inicio) {
      return NextResponse.json({ error: "Título, departamento y fecha de inicio son requeridos" }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO proyectos_personal (user_id, titulo, departamento, tipo, descripcion, objetivo, responsable, fecha_inicio, fecha_fin_est, prioridad, presupuesto, estado, progreso)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [titulo, departamento, tipo || 'estrategia', descripcion || '', objetivo || '', responsable || '', fecha_inicio, fecha_fin_est || null, prioridad || 'media', presupuesto || 0, estado || 'planificado', progreso || 0]
    );

    return NextResponse.json({ proyecto: result.rows[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
