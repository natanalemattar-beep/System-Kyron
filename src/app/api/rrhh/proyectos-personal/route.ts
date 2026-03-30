import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const proyectos = await query(`SELECT * FROM proyectos_personal WHERE user_id = $1 ORDER BY created_at DESC`, [session.userId]);
    return NextResponse.json({ proyectos });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const body = await req.json();
    const { titulo, departamento, tipo, descripcion, objetivo, responsable, fecha_inicio, fecha_fin_est, prioridad, presupuesto, estado, progreso } = body;

    if (!titulo || !departamento || !fecha_inicio) {
      return NextResponse.json({ error: "Título, departamento y fecha de inicio son requeridos" }, { status: 400 });
    }

    const rows = await query(
      `INSERT INTO proyectos_personal (user_id, titulo, departamento, tipo, descripcion, objetivo, responsable, fecha_inicio, fecha_fin_est, prioridad, presupuesto, estado, progreso)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [session.userId, titulo, departamento, tipo || 'estrategia', descripcion || '', objetivo || '', responsable || '', fecha_inicio, fecha_fin_est || null, prioridad || 'media', presupuesto || 0, estado || 'planificado', progreso || 0]
    );

    return NextResponse.json({ proyecto: rows[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
