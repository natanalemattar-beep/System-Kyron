import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const pais = req.nextUrl.searchParams.get('pais');
  const estado = req.nextUrl.searchParams.get('estado');

  let sql = `SELECT * FROM compras_internacionales WHERE user_id = $1`;
  const params: unknown[] = [user.id];
  let idx = 2;

  if (pais) { sql += ` AND pais_origen = $${idx++}`; params.push(pais); }
  if (estado) { sql += ` AND estado = $${idx++}`; params.push(estado); }
  sql += ` ORDER BY fecha_orden DESC`;

  const result = await query(sql, params);

  const stats = await query(`
    SELECT
      COUNT(*) as total,
      COALESCE(SUM(monto), 0) as total_monto,
      COALESCE(SUM(costo_total), 0) as total_costo,
      COUNT(DISTINCT pais_origen) as paises,
      COUNT(*) FILTER (WHERE estado = 'en_transito') as en_transito,
      COUNT(*) FILTER (WHERE estado = 'en_aduana') as en_aduana
    FROM compras_internacionales WHERE user_id = $1
  `, [user.id]);

  const porPais = await query(`
    SELECT pais_origen, COUNT(*) as cantidad, COALESCE(SUM(monto), 0) as total_monto
    FROM compras_internacionales WHERE user_id = $1
    GROUP BY pais_origen ORDER BY total_monto DESC LIMIT 10
  `, [user.id]);

  return NextResponse.json({
    compras: result.rows,
    stats: stats.rows[0] || {},
    porPais: porPais.rows,
  });
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const { proveedor, pais_origen, descripcion, referencia_orden, monto, moneda, tasa_cambio, monto_bs, flete, seguro, aranceles, iva_aduanero, fecha_orden, fecha_embarque, fecha_llegada, incoterm, estado, agente_aduanal, numero_bl, numero_dua, notas } = body;

  if (!proveedor || !pais_origen || !descripcion) {
    return NextResponse.json({ error: 'Proveedor, país de origen y descripción son requeridos' }, { status: 400 });
  }

  const costoTotal = parseFloat(monto || 0) + parseFloat(flete || 0) + parseFloat(seguro || 0) + parseFloat(aranceles || 0) + parseFloat(iva_aduanero || 0);

  const result = await query(`
    INSERT INTO compras_internacionales (user_id, proveedor, pais_origen, descripcion, referencia_orden, monto, moneda, tasa_cambio, monto_bs, flete, seguro, aranceles, iva_aduanero, costo_total, fecha_orden, fecha_embarque, fecha_llegada, incoterm, estado, agente_aduanal, numero_bl, numero_dua, notas)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    RETURNING *
  `, [user.id, proveedor, pais_origen, descripcion, referencia_orden, monto || 0, moneda || 'USD', tasa_cambio, monto_bs, flete || 0, seguro || 0, aranceles || 0, iva_aduanero || 0, costoTotal, fecha_orden, fecha_embarque, fecha_llegada, incoterm || 'FOB', estado || 'pendiente', agente_aduanal, numero_bl, numero_dua, notas]);

  return NextResponse.json({ compra: result.rows[0] }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const allowed = ['proveedor', 'pais_origen', 'descripcion', 'referencia_orden', 'monto', 'moneda', 'tasa_cambio', 'monto_bs', 'flete', 'seguro', 'aranceles', 'iva_aduanero', 'costo_total', 'fecha_orden', 'fecha_embarque', 'fecha_llegada', 'incoterm', 'estado', 'agente_aduanal', 'numero_bl', 'numero_dua', 'notas'];
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
    `UPDATE compras_internacionales SET ${updates.join(', ')} WHERE id = $${idx++} AND user_id = $${idx} RETURNING *`,
    params
  );

  if (result.rows.length === 0) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
  return NextResponse.json({ compra: result.rows[0] });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  await query('DELETE FROM compras_internacionales WHERE id = $1 AND user_id = $2', [id, user.id]);
  return NextResponse.json({ ok: true });
}
