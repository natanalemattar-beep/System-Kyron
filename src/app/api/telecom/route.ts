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
    `SELECT id FROM lineas_telecom WHERE numero = $1`,
    [numero]
  );
  if (existing) {
    return NextResponse.json({ error: 'Ya existe una línea con ese número. Genere uno nuevo.' }, { status: 409 });
  }

  const existsInAsignados = await queryOne(
    `SELECT id FROM telecom_numeros_asignados WHERE numero = $1`,
    [numero]
  );
  if (existsInAsignados) {
    return NextResponse.json({ error: 'Este número ya fue asignado anteriormente. Genere uno nuevo.' }, { status: 409 });
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

  const tipoNumero = numero.startsWith('KYR-EMP-') ? 'empresarial' : 'personal';
  await query(
    `INSERT INTO telecom_numeros_asignados (numero, tipo, user_id) VALUES ($1, $2, $3) ON CONFLICT (numero) DO NOTHING`,
    [numero, tipoNumero, session.userId]
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

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'ID de línea requerido' }, { status: 400 });

  const owned = await queryOne(
    `SELECT id FROM lineas_telecom WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );
  if (!owned) return NextResponse.json({ error: 'Línea no encontrada' }, { status: 404 });

  if (updates.numero) {
    const numDup = await queryOne(
      `SELECT id FROM lineas_telecom WHERE numero = $1 AND id != $2`,
      [updates.numero, id]
    );
    if (numDup) return NextResponse.json({ error: 'Ese número ya está en uso por otra línea.' }, { status: 409 });

    const numAsignado = await queryOne(
      `SELECT id FROM telecom_numeros_asignados WHERE numero = $1`,
      [updates.numero]
    );
    if (numAsignado) return NextResponse.json({ error: 'Ese número ya fue asignado anteriormente.' }, { status: 409 });
  }

  const fields: string[] = [];
  const vals: unknown[] = [];
  let idx = 1;

  const allowed = [
    'numero', 'operadora', 'tipo_linea', 'titular', 'cedula_titular',
    'plan_contratado', 'monto_plan', 'moneda_plan',
    'fecha_activacion', 'fecha_vencimiento', 'activa',
    'uso_datos_gb', 'limite_datos_gb', 'notas'
  ];

  const numericFields = ['monto_plan', 'uso_datos_gb', 'limite_datos_gb'];
  const dateFields = ['fecha_activacion', 'fecha_vencimiento'];
  const nullableStrings = ['titular', 'cedula_titular', 'plan_contratado', 'notas'];
  const enumFields: Record<string, string[]> = {
    operadora: ['inter','cantv','simple','otro'],
    tipo_linea: ['prepago','postpago','datos','wan'],
    moneda_plan: ['USD','VES'],
  };

  for (const key of allowed) {
    if (updates[key] === undefined) continue;
    let val: unknown = updates[key];

    if (numericFields.includes(key)) {
      if (val === '' || val === null) { val = key === 'monto_plan' ? 0 : null; }
      else { const n = parseFloat(String(val)); if (!Number.isFinite(n)) continue; val = n; }
    } else if (dateFields.includes(key)) {
      val = (val === '' || val === null) ? null : val;
    } else if (nullableStrings.includes(key)) {
      val = (val === '' || val === null) ? null : String(val).trim();
    } else if (enumFields[key]) {
      if (!enumFields[key].includes(String(val))) continue;
    }

    fields.push(`${key} = $${idx}`);
    vals.push(val);
    idx++;
  }

  if (fields.length === 0) return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });

  fields.push(`updated_at = NOW()`);
  vals.push(id, session.userId);

  const result = await query(
    `UPDATE lineas_telecom SET ${fields.join(', ')} WHERE id = $${idx} AND user_id = $${idx + 1}
     RETURNING id, numero, operadora, tipo_linea, activa`,
    vals
  );

  await logActivity({
    userId: session.userId,
    evento: 'LINEA_TELECOM_ACTUALIZADA',
    categoria: 'telecom',
    descripcion: `Línea actualizada: ID ${id}`,
    entidadTipo: 'linea_telecom',
    entidadId: id,
    metadata: updates,
  });

  return NextResponse.json({ success: true, linea: result[0] });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const idStr = searchParams.get('id');
  const idNum = idStr ? parseInt(idStr, 10) : NaN;
  if (!Number.isInteger(idNum) || idNum <= 0) {
    return NextResponse.json({ error: 'ID requerido y debe ser un número válido' }, { status: 400 });
  }

  const linea = await queryOne(
    `SELECT id, numero, operadora FROM lineas_telecom WHERE id = $1 AND user_id = $2`,
    [idNum, session.userId]
  );
  if (!linea) return NextResponse.json({ error: 'Línea no encontrada' }, { status: 404 });

  await query(`DELETE FROM lineas_telecom WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

  await logActivity({
    userId: session.userId,
    evento: 'LINEA_TELECOM_ELIMINADA',
    categoria: 'telecom',
    descripcion: `Línea eliminada: ${(linea as { numero: string }).numero}`,
    entidadTipo: 'linea_telecom',
    entidadId: idNum,
    metadata: linea as Record<string, unknown>,
  });

  return NextResponse.json({ success: true });
}
