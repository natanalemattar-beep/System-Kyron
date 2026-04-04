import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const periodo = searchParams.get('periodo');

  const conditions = ['c.user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (periodo) { conditions.push(`c.periodo = $${i++}`); params.push(periodo); }

  const encuestas = await query(
    `SELECT c.id, c.periodo, c.fecha_encuesta, c.dimension, c.puntuacion,
            c.comentario, c.anonimo, c.created_at,
            CASE WHEN c.anonimo THEN 'Anónimo'
                 ELSE e.nombre || ' ' || e.apellido END AS empleado,
            CASE WHEN c.anonimo THEN NULL
                 ELSE e.cargo END AS cargo
     FROM clima_organizacional c
     LEFT JOIN empleados e ON e.id = c.empleado_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY c.fecha_encuesta DESC, c.id DESC`,
    params
  );

  const resumenParams: unknown[] = [session.userId];
  let resumenCondition = '';
  if (periodo) {
    resumenParams.push(periodo);
    resumenCondition = ` AND periodo = $${resumenParams.length}`;
  }

  const resumen = await query(
    `SELECT dimension,
            ROUND(AVG(puntuacion), 2)::text AS promedio,
            COUNT(*)::int AS total,
            MIN(puntuacion) AS min_puntaje,
            MAX(puntuacion) AS max_puntaje
     FROM clima_organizacional
     WHERE user_id = $1${resumenCondition}
     GROUP BY dimension
     ORDER BY AVG(puntuacion) ASC`,
    resumenParams
  );

  return NextResponse.json({ encuestas, resumen });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { empleado_id, periodo, dimension, puntuacion, comentario, anonimo } = body;

  if (!periodo || !dimension || puntuacion === undefined) {
    return NextResponse.json({ error: 'Período, dimensión y puntuación son requeridos' }, { status: 400 });
  }

  const puntaje = parseInt(puntuacion);
  if (puntaje < 1 || puntaje > 10) {
    return NextResponse.json({ error: 'La puntuación debe estar entre 1 y 10' }, { status: 400 });
  }

  const [encuesta] = await query<{ id: number }>(
    `INSERT INTO clima_organizacional (user_id, empleado_id, periodo, dimension, puntuacion, comentario, anonimo)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id`,
    [
      session.userId,
      anonimo ? null : (empleado_id ?? null),
      periodo, dimension, puntaje,
      comentario ?? null,
      anonimo ?? true,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'ENCUESTA_CLIMA',
    categoria: 'rrhh',
    descripcion: `Encuesta de clima registrada: ${dimension} — Puntuación: ${puntaje}/10`,
    entidadTipo: 'clima',
    entidadId: encuesta.id,
  });

  return NextResponse.json({ success: true, id: encuesta.id });
}
