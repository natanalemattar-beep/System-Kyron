import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const planes = await query(
      `SELECT dp.id, dp.nombre_plan, dp.categoria, dp.nivel_actual, dp.nivel_objetivo,
              dp.progreso, dp.descripcion, dp.competencias, dp.fecha_inicio,
              dp.fecha_objetivo, dp.estado, dp.notas, dp.created_at,
              CASE WHEN dp.empleado_id IS NOT NULL
                   THEN e.nombre || ' ' || e.apellido ELSE NULL END AS empleado_nombre,
              CASE WHEN dp.empleado_id IS NOT NULL
                   THEN e.cargo ELSE NULL END AS empleado_cargo
       FROM desarrollo_personal dp
       LEFT JOIN empleados e ON e.id = dp.empleado_id
       WHERE dp.user_id = $1
       ORDER BY dp.created_at DESC`,
      [session.userId]
    );

    const stats = await query(
      `SELECT
         COUNT(*) FILTER (WHERE estado = 'activo')::int AS activos,
         COUNT(*) FILTER (WHERE estado = 'completado')::int AS completados,
         COUNT(*)::int AS total,
         COALESCE(ROUND(AVG(progreso), 0), 0)::int AS progreso_promedio
       FROM desarrollo_personal WHERE user_id = $1`,
      [session.userId]
    );

    return NextResponse.json({ planes, stats: stats[0] ?? {} });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      nombre_plan, categoria, nivel_actual, nivel_objetivo,
      descripcion, competencias, fecha_objetivo, empleado_id
    } = body;

    if (!nombre_plan) {
      return NextResponse.json({ error: 'El nombre del plan es requerido' }, { status: 400 });
    }

    let validatedEmpleadoId: number | null = null;
    if (empleado_id) {
      const emp = await query(
        `SELECT id FROM empleados WHERE id = $1 AND user_id = $2`,
        [empleado_id, session.userId]
      );
      if (emp.length === 0) {
        return NextResponse.json({ error: 'Empleado no encontrado o no autorizado' }, { status: 400 });
      }
      validatedEmpleadoId = emp[0].id as number;
    }

    const [plan] = await query<{ id: number }>(
      `INSERT INTO desarrollo_personal (user_id, empleado_id, nombre_plan, categoria, nivel_actual,
                                         nivel_objetivo, descripcion, competencias, fecha_objetivo)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING id`,
      [
        session.userId,
        validatedEmpleadoId,
        nombre_plan,
        categoria ?? 'tecnico',
        nivel_actual ?? 'iniciacion',
        nivel_objetivo ?? 'junior',
        descripcion ?? null,
        Array.isArray(competencias) && competencias.length > 0 ? competencias : null,
        fecha_objetivo || null,
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'PLAN_DESARROLLO',
      categoria: 'rrhh',
      descripcion: `Plan de desarrollo creado: ${nombre_plan}`,
      entidadTipo: 'desarrollo',
      entidadId: plan.id,
    });

    return NextResponse.json({ success: true, id: plan.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, progreso, estado, notas } = body;
    if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

    const updates: string[] = ['updated_at = NOW()'];
    const params: unknown[] = [];
    let i = 1;

    if (progreso !== undefined) { updates.push(`progreso = $${i++}`); params.push(progreso); }
    if (estado) { updates.push(`estado = $${i++}`); params.push(estado); }
    if (notas !== undefined) { updates.push(`notas = $${i++}`); params.push(notas); }

    params.push(id, session.userId);

    const result = await query(
      `UPDATE desarrollo_personal SET ${updates.join(', ')} WHERE id = $${i++} AND user_id = $${i++} RETURNING id`,
      params
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Plan no encontrado o no autorizado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
