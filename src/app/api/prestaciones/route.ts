import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const prestaciones = await query(
    `SELECT p.id, p.periodo, p.fecha_inicio, p.fecha_corte,
            p.salario_integral::text, p.dias_antiguedad,
            p.garantia::text, p.intereses::text, p.utilidades_frac::text,
            p.vacaciones_frac::text, p.total_prestaciones::text,
            p.estado, p.notas, p.created_at,
            e.nombre || ' ' || e.apellido AS empleado_nombre,
            e.cargo, e.cedula, e.fecha_ingreso, e.salario_base::text
     FROM prestaciones_sociales p
     JOIN empleados e ON e.id = p.empleado_id
     WHERE p.user_id = $1
     ORDER BY p.fecha_corte DESC`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(DISTINCT empleado_id)::int AS empleados_con_prestaciones,
       COALESCE(SUM(total_prestaciones), 0)::text AS total_garantia_acumulada,
       COALESCE(SUM(total_prestaciones) FILTER (WHERE estado = 'liquidado'), 0)::text AS total_liquidado
     FROM prestaciones_sociales WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ prestaciones, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { empleado_id, periodo, fecha_inicio, fecha_corte, notas } = body;

  if (!empleado_id || !periodo || !fecha_inicio || !fecha_corte) {
    return NextResponse.json({ error: 'Empleado, período, fecha inicio y fecha de corte son requeridos' }, { status: 400 });
  }

  const empleado = await queryOne<{ salario_base: string; fecha_ingreso: string }>(
    `SELECT salario_base::text, fecha_ingreso FROM empleados WHERE id = $1 AND user_id = $2`,
    [empleado_id, session.userId]
  );

  if (!empleado) return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });

  const salarioBase = parseFloat(empleado.salario_base);
  const fi   = new Date(fecha_inicio);
  const fc   = new Date(fecha_corte);
  const dias = Math.floor((fc.getTime() - fi.getTime()) / (1000 * 60 * 60 * 24));
  const anos = dias / 365;

  const salarioIntegral  = salarioBase * 1.25;
  const garantia         = salarioIntegral * Math.min(dias / 30, 30 * anos) / 30;
  const intereses        = garantia * 0.0605;
  const utilidadesFrac   = salarioBase * 30 * (dias / 365) / 30;
  const vacacionesFrac   = salarioBase * (dias / 365) * 15 / 30;
  const total            = garantia + intereses + utilidadesFrac + vacacionesFrac;

  const [prestacion] = await query<{ id: number }>(
    `INSERT INTO prestaciones_sociales
     (user_id, empleado_id, periodo, fecha_inicio, fecha_corte,
      salario_integral, dias_antiguedad, garantia, intereses,
      utilidades_frac, vacaciones_frac, total_prestaciones, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id`,
    [
      session.userId,
      empleado_id, periodo, fecha_inicio, fecha_corte,
      salarioIntegral, dias,
      garantia, intereses,
      utilidadesFrac, vacacionesFrac, total,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'CALCULO_PRESTACIONES',
    categoria: 'nomina',
    descripcion: `Prestaciones calculadas para empleado #${empleado_id} — Total: Bs. ${total.toFixed(2)}`,
    entidadTipo: 'prestacion',
    entidadId: prestacion.id,
  });

  return NextResponse.json({
    success: true,
    id: prestacion.id,
    calculo: { salarioIntegral, dias, garantia, intereses, utilidadesFrac, vacacionesFrac, total }
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado } = body;
  if (!id || !estado) return NextResponse.json({ error: 'id y estado requeridos' }, { status: 400 });

  await query(
    `UPDATE prestaciones_sociales SET estado = $1 WHERE id = $2 AND user_id = $3`,
    [estado, id, session.userId]
  );
  return NextResponse.json({ success: true });
}
