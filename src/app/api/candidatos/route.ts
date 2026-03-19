import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const vacante_id = searchParams.get('vacante_id');

  const conditions = [
    `cv.user_id = $1`
  ];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (vacante_id) {
    conditions.push(`cv.vacante_id = $${i++}`);
    params.push(parseInt(vacante_id));
  }

  const candidatos = await query(
    `SELECT cv.id, cv.vacante_id, cv.nombre, cv.apellido, cv.cedula, cv.email,
            cv.telefono, cv.cv_url, cv.experiencia_anos, cv.nivel_educacion,
            cv.pretension_salarial::text, cv.moneda_pretension, cv.etapa,
            cv.puntuacion, cv.notas_evaluacion, cv.fecha_aplicacion, cv.created_at,
            v.titulo AS vacante_titulo, v.departamento AS vacante_departamento
     FROM candidatos_vacante cv
     JOIN vacantes v ON v.id = cv.vacante_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY cv.fecha_aplicacion DESC`,
    params
  );

  return NextResponse.json({ candidatos });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    vacante_id, nombre, apellido, cedula, email, telefono,
    cv_url, experiencia_anos, nivel_educacion,
    pretension_salarial, moneda_pretension, notas_evaluacion
  } = body;

  if (!vacante_id || !nombre || !apellido || !email) {
    return NextResponse.json({ error: 'Vacante, nombre, apellido y email son requeridos' }, { status: 400 });
  }

  const [candidato] = await query<{ id: number }>(
    `INSERT INTO candidatos_vacante (user_id, vacante_id, nombre, apellido, cedula, email, telefono,
                                     cv_url, experiencia_anos, nivel_educacion,
                                     pretension_salarial, moneda_pretension, notas_evaluacion)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id`,
    [
      session.userId,
      vacante_id, nombre, apellido,
      cedula ?? null, email,
      telefono ?? null, cv_url ?? null,
      parseInt(experiencia_anos ?? '0'),
      nivel_educacion ?? 'universitario',
      pretension_salarial ? parseFloat(pretension_salarial) : null,
      moneda_pretension ?? 'USD',
      notas_evaluacion ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_CANDIDATO',
    categoria: 'rrhh',
    descripcion: `Candidato registrado: ${nombre} ${apellido} para vacante #${vacante_id}`,
    entidadTipo: 'candidato',
    entidadId: candidato.id,
  });

  return NextResponse.json({ success: true, id: candidato.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, etapa, puntuacion, notas_evaluacion } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  const updates: string[] = ['updated_at = NOW()'];
  const params: unknown[] = [];
  let i = 1;

  if (etapa) { updates.push(`etapa = $${i++}`); params.push(etapa); }
  if (puntuacion !== undefined) { updates.push(`puntuacion = $${i++}`); params.push(puntuacion); }
  if (notas_evaluacion !== undefined) { updates.push(`notas_evaluacion = $${i++}`); params.push(notas_evaluacion); }

  params.push(id, session.userId);

  await query(
    `UPDATE candidatos_vacante SET ${updates.join(', ')} WHERE id = $${i++} AND user_id = $${i++}`,
    params
  );

  return NextResponse.json({ success: true });
}
