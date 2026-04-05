import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const tipo = req.nextUrl.searchParams.get('tipo');
  const estado = req.nextUrl.searchParams.get('estado');

  let sql = `SELECT * FROM lineas_credito WHERE user_id = $1`;
  const params: unknown[] = [user.id];
  let idx = 2;

  if (tipo) { sql += ` AND tipo = $${idx++}`; params.push(tipo); }
  if (estado) { sql += ` AND estado = $${idx++}`; params.push(estado); }
  sql += ` ORDER BY created_at DESC`;

  const result = await query(sql, params);

  const totales = await query(`
    SELECT
      COUNT(*) FILTER (WHERE estado = 'activa') as activas,
      COALESCE(SUM(monto_aprobado) FILTER (WHERE estado = 'activa'), 0) as total_aprobado,
      COALESCE(SUM(monto_utilizado) FILTER (WHERE estado = 'activa'), 0) as total_utilizado,
      COUNT(*) FILTER (WHERE estado = 'en_mora') as en_mora
    FROM lineas_credito WHERE user_id = $1
  `, [user.id]);

  return NextResponse.json({
    lineas: result.rows,
    stats: totales.rows[0] || { activas: 0, total_aprobado: 0, total_utilizado: 0, en_mora: 0 },
  });
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const { tipo, entidad, referencia, monto_aprobado, monto_utilizado, moneda, tasa_interes, fecha_apertura, fecha_vencimiento, plazo_meses, estado, condiciones, contacto, notas } = body;

  if (!entidad || !monto_aprobado) {
    return NextResponse.json({ error: 'Entidad y monto aprobado son requeridos' }, { status: 400 });
  }

  const result = await query(`
    INSERT INTO lineas_credito (user_id, tipo, entidad, referencia, monto_aprobado, monto_utilizado, moneda, tasa_interes, fecha_apertura, fecha_vencimiento, plazo_meses, estado, condiciones, contacto, notas)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *
  `, [user.id, tipo || 'recibida', entidad, referencia, monto_aprobado, monto_utilizado || 0, moneda || 'USD', tasa_interes, fecha_apertura, fecha_vencimiento, plazo_meses, estado || 'activa', condiciones, contacto, notas]);

  return NextResponse.json({ linea: result.rows[0] }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const allowed = ['tipo', 'entidad', 'referencia', 'monto_aprobado', 'monto_utilizado', 'moneda', 'tasa_interes', 'fecha_apertura', 'fecha_vencimiento', 'plazo_meses', 'estado', 'condiciones', 'contacto', 'notas'];
  const updates: string[] = [];
  const params: unknown[] = [];
  let idx = 1;
  for (const key of allowed) {
    if (key in fields) {
      updates.push(`${key} = $${idx++}`);
      params.push(fields[key]);
    }
  }
  if (updates.length === 0) return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });

  updates.push(`updated_at = NOW()`);
  params.push(id, user.id);

  const result = await query(
    `UPDATE lineas_credito SET ${updates.join(', ')} WHERE id = $${idx++} AND user_id = $${idx} RETURNING *`,
    params
  );

  if (result.rows.length === 0) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
  return NextResponse.json({ linea: result.rows[0] });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  await query('DELETE FROM lineas_credito WHERE id = $1 AND user_id = $2', [id, user.id]);
  return NextResponse.json({ ok: true });
}
