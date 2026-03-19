import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const vacantes = await query(
    `SELECT v.id, v.titulo, v.departamento, v.descripcion, v.requisitos,
            v.tipo_contrato, v.modalidad, v.salario_min::text, v.salario_max::text,
            v.moneda_salario, v.ubicacion, v.estado, v.prioridad,
            v.fecha_publicacion, v.fecha_limite, v.created_at,
            (SELECT COUNT(*) FROM candidatos_vacante WHERE vacante_id = v.id)::int AS num_candidatos,
            (SELECT COUNT(*) FROM candidatos_vacante WHERE vacante_id = v.id AND etapa = 'contratado')::int AS contratados
     FROM vacantes v
     WHERE v.user_id = $1
     ORDER BY v.fecha_publicacion DESC`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'abierta')::int AS abiertas,
       COUNT(*) FILTER (WHERE estado = 'en_proceso')::int AS en_proceso,
       COUNT(*) FILTER (WHERE estado = 'cubierta')::int AS cubiertas,
       (SELECT COUNT(*) FROM candidatos_vacante cv
        JOIN vacantes vv ON vv.id = cv.vacante_id
        WHERE vv.user_id = $1)::int AS total_candidatos
     FROM vacantes WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ vacantes, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    titulo, departamento, descripcion, requisitos,
    tipo_contrato, modalidad, salario_min, salario_max,
    moneda_salario, ubicacion, prioridad, fecha_limite
  } = body;

  if (!titulo || !departamento) {
    return NextResponse.json({ error: 'Título y departamento son requeridos' }, { status: 400 });
  }

  const [vacante] = await query<{ id: number }>(
    `INSERT INTO vacantes (user_id, titulo, departamento, descripcion, requisitos,
                           tipo_contrato, modalidad, salario_min, salario_max,
                           moneda_salario, ubicacion, prioridad, fecha_limite)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id`,
    [
      session.userId,
      titulo, departamento,
      descripcion ?? null,
      Array.isArray(requisitos) ? requisitos : null,
      tipo_contrato ?? 'tiempo_indeterminado',
      modalidad ?? 'presencial',
      salario_min ? parseFloat(salario_min) : null,
      salario_max ? parseFloat(salario_max) : null,
      moneda_salario ?? 'USD',
      ubicacion ?? null,
      prioridad ?? 'normal',
      fecha_limite ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVA_VACANTE',
    categoria: 'rrhh',
    descripcion: `Vacante publicada: ${titulo} — ${departamento}`,
    entidadTipo: 'vacante',
    entidadId: vacante.id,
  });

  return NextResponse.json({ success: true, id: vacante.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado } = body;
  if (!id || !estado) return NextResponse.json({ error: 'id y estado requeridos' }, { status: 400 });

  await query(
    `UPDATE vacantes SET estado = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
    [estado, id, session.userId]
  );
  return NextResponse.json({ success: true });
}
