import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const proyectos = await query(
    `SELECT id, nombre, codigo, tipo, descripcion, objetivo, alcance,
            cliente_empresa, rif_cliente, presupuesto_estimado::text,
            moneda, duracion_meses, fecha_inicio_estimada, fecha_fin_estimada,
            fase, prioridad, responsable, equipo, rentabilidad_esperada::text,
            notas, created_at, updated_at
     FROM proyectos_propuesta
     WHERE user_id = $1
     ORDER BY prioridad DESC, created_at DESC`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE fase = 'propuesta')::int AS propuestas,
       COUNT(*) FILTER (WHERE fase = 'en_ejecucion')::int AS en_ejecucion,
       COUNT(*) FILTER (WHERE fase = 'completado')::int AS completados,
       COALESCE(SUM(presupuesto_estimado) FILTER (WHERE fase NOT IN ('cancelado','completado')), 0)::text AS presupuesto_activo
     FROM proyectos_propuesta WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ proyectos, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    nombre, codigo, tipo, descripcion, objetivo, alcance,
    cliente_empresa, rif_cliente, presupuesto_estimado, moneda,
    duracion_meses, fecha_inicio_estimada, fecha_fin_estimada,
    prioridad, responsable, equipo, rentabilidad_esperada, notas
  } = body;

  if (!nombre) return NextResponse.json({ error: 'El nombre del proyecto es requerido' }, { status: 400 });

  const [proyecto] = await query<{ id: number }>(
    `INSERT INTO proyectos_propuesta
     (user_id, nombre, codigo, tipo, descripcion, objetivo, alcance,
      cliente_empresa, rif_cliente, presupuesto_estimado, moneda,
      duracion_meses, fecha_inicio_estimada, fecha_fin_estimada,
      prioridad, responsable, equipo, rentabilidad_esperada, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
     RETURNING id`,
    [
      session.userId,
      nombre, codigo ?? null,
      tipo ?? 'interno',
      descripcion ?? null, objetivo ?? null, alcance ?? null,
      cliente_empresa ?? null, rif_cliente ?? null,
      parseFloat(presupuesto_estimado ?? '0'),
      moneda ?? 'USD',
      parseInt(duracion_meses ?? '1'),
      fecha_inicio_estimada ?? null, fecha_fin_estimada ?? null,
      prioridad ?? 'normal',
      responsable ?? null,
      Array.isArray(equipo) ? equipo : null,
      rentabilidad_esperada ? parseFloat(rentabilidad_esperada) : null,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_PROYECTO',
    categoria: 'sistema',
    descripcion: `Proyecto creado: ${nombre} — ${tipo ?? 'interno'}`,
    entidadTipo: 'proyecto',
    entidadId: proyecto.id,
  });

  return NextResponse.json({ success: true, id: proyecto.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, fase } = body;
  if (!id || !fase) return NextResponse.json({ error: 'id y fase requeridos' }, { status: 400 });

  await query(
    `UPDATE proyectos_propuesta SET fase = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
    [fase, id, session.userId]
  );

  return NextResponse.json({ success: true });
}
