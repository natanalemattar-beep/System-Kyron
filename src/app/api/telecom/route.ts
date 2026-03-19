import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const lineas = await query(
    `SELECT id, numero, operadora, tipo_linea, titular, cedula_titular,
            plan_contratado, monto_plan::text, moneda_plan,
            fecha_activacion, fecha_vencimiento, activa,
            uso_datos_gb::text, limite_datos_gb::text, notas, created_at
     FROM lineas_telecom
     WHERE user_id = $1
     ORDER BY activa DESC, operadora ASC`,
    [session.userId]
  );

  const facturas = await query(
    `SELECT ft.id, ft.linea_id, ft.periodo, ft.fecha_emision, ft.fecha_vencimiento,
            ft.monto::text, ft.moneda, ft.estado, ft.numero_factura,
            lt.numero AS linea_numero, lt.operadora
     FROM facturas_telecom ft
     LEFT JOIN lineas_telecom lt ON lt.id = ft.linea_id
     WHERE ft.user_id = $1
     ORDER BY ft.fecha_emision DESC
     LIMIT 20`,
    [session.userId]
  );

  return NextResponse.json({ lineas, facturas });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    numero, operadora, tipo_linea, titular, cedula_titular,
    plan_contratado, monto_plan, moneda_plan,
    fecha_activacion, fecha_vencimiento, limite_datos_gb, notas
  } = body;

  if (!numero || !operadora) {
    return NextResponse.json({ error: 'Número y operadora son requeridos' }, { status: 400 });
  }

  const existing = await queryOne(
    `SELECT id FROM lineas_telecom WHERE user_id = $1 AND numero = $2`,
    [session.userId, numero]
  );
  if (existing) {
    return NextResponse.json({ error: 'Ya existe una línea con ese número' }, { status: 409 });
  }

  const [linea] = await query(
    `INSERT INTO lineas_telecom
     (user_id, numero, operadora, tipo_linea, titular, cedula_titular,
      plan_contratado, monto_plan, moneda_plan,
      fecha_activacion, fecha_vencimiento, limite_datos_gb, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id, numero, operadora, tipo_linea, activa`,
    [
      session.userId,
      numero,
      operadora,
      tipo_linea ?? 'postpago',
      titular ?? null,
      cedula_titular ?? null,
      plan_contratado ?? null,
      parseFloat(monto_plan ?? '0'),
      moneda_plan ?? 'USD',
      fecha_activacion ?? null,
      fecha_vencimiento ?? null,
      limite_datos_gb ? parseFloat(limite_datos_gb) : null,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'LINEA_TELECOM_REGISTRADA',
    categoria: 'telecom',
    descripcion: `Línea registrada: ${numero} (${operadora} - ${tipo_linea ?? 'postpago'})`,
    entidadTipo: 'linea_telecom',
    entidadId: (linea as { id: number }).id,
    metadata: { numero, operadora, tipo_linea: tipo_linea ?? 'postpago' },
  });

  return NextResponse.json({ success: true, linea });
}
