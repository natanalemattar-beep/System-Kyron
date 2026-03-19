import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const incidentes = await query(
    `SELECT i.id, i.tipo, i.fecha_incidente, i.lugar, i.descripcion,
            i.lesiones, i.dias_reposo, i.requiere_inabi, i.numero_inabi,
            i.reportado_inpsasel, i.fecha_reporte_inpsasel,
            i.medidas_correctivas, i.estado, i.created_at,
            e.nombre || ' ' || e.apellido AS empleado_nombre,
            e.cargo AS empleado_cargo, e.cedula AS empleado_cedula
     FROM incidentes_salud_seguridad i
     LEFT JOIN empleados e ON e.id = i.empleado_id
     WHERE i.user_id = $1
     ORDER BY i.fecha_incidente DESC`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tipo = 'accidente_trabajo')::int AS accidentes,
       COUNT(*) FILTER (WHERE estado = 'abierto')::int AS abiertos,
       COALESCE(SUM(dias_reposo), 0)::int AS total_dias_reposo
     FROM incidentes_salud_seguridad WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ incidentes, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    empleado_id, tipo, fecha_incidente, lugar, descripcion,
    lesiones, dias_reposo, requiere_inabi, numero_inabi,
    reportado_inpsasel, medidas_correctivas
  } = body;

  if (!tipo || !fecha_incidente || !descripcion) {
    return NextResponse.json({ error: 'Tipo, fecha y descripción son requeridos' }, { status: 400 });
  }

  const [incidente] = await query<{ id: number }>(
    `INSERT INTO incidentes_salud_seguridad
     (user_id, empleado_id, tipo, fecha_incidente, lugar, descripcion,
      lesiones, dias_reposo, requiere_inabi, numero_inabi,
      reportado_inpsasel, medidas_correctivas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING id`,
    [
      session.userId,
      empleado_id ?? null,
      tipo, fecha_incidente,
      lugar ?? null, descripcion,
      lesiones ?? null,
      parseInt(dias_reposo ?? '0'),
      requiere_inabi ?? false,
      numero_inabi ?? null,
      reportado_inpsasel ?? false,
      medidas_correctivas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_INCIDENTE_SST',
    categoria: 'rrhh',
    descripcion: `Incidente SST registrado: ${tipo} — ${fecha_incidente}`,
    entidadTipo: 'incidente_sst',
    entidadId: incidente.id,
  });

  return NextResponse.json({ success: true, id: incidente.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado, medidas_correctivas } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  const updates: string[] = [];
  const params: unknown[] = [];
  let i = 1;

  if (estado) { updates.push(`estado = $${i++}`); params.push(estado); }
  if (medidas_correctivas) { updates.push(`medidas_correctivas = $${i++}`); params.push(medidas_correctivas); }

  if (updates.length === 0) return NextResponse.json({ success: true });

  params.push(id, session.userId);
  await query(
    `UPDATE incidentes_salud_seguridad SET ${updates.join(', ')} WHERE id = $${i++} AND user_id = $${i++}`,
    params
  );

  return NextResponse.json({ success: true });
}
