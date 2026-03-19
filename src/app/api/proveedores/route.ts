import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const proveedores = await query(
    `SELECT id, razon_social, rif, nombre_contacto, cargo_contacto,
            telefono, email, direccion, estado, municipio,
            categoria, condiciones_pago, calificacion, activo, notas, created_at
     FROM proveedores
     WHERE user_id = $1 AND activo = true
     ORDER BY razon_social ASC`,
    [session.userId]
  );

  return NextResponse.json({ proveedores });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    razon_social, rif, nombre_contacto, cargo_contacto,
    telefono, email, direccion, estado, municipio,
    categoria, condiciones_pago, calificacion, notas
  } = body;

  if (!razon_social) {
    return NextResponse.json({ error: 'Razón social es requerida' }, { status: 400 });
  }

  if (rif) {
    const exists = await queryOne(
      `SELECT id FROM proveedores WHERE user_id = $1 AND rif = $2`,
      [session.userId, rif]
    );
    if (exists) return NextResponse.json({ error: 'Ya existe un proveedor con ese RIF' }, { status: 409 });
  }

  const [proveedor] = await query(
    `INSERT INTO proveedores
     (user_id, razon_social, rif, nombre_contacto, cargo_contacto,
      telefono, email, direccion, estado, municipio,
      categoria, condiciones_pago, calificacion, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING id, razon_social, rif, nombre_contacto`,
    [
      session.userId,
      razon_social,
      rif ?? null,
      nombre_contacto ?? null,
      cargo_contacto ?? null,
      telefono ?? null,
      email ?? null,
      direccion ?? null,
      estado ?? null,
      municipio ?? null,
      categoria ?? null,
      condiciones_pago ?? null,
      calificacion ? parseInt(calificacion) : null,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_PROVEEDOR',
    categoria: 'clientes',
    descripcion: `Proveedor registrado: ${razon_social}${rif ? ` (RIF: ${rif})` : ''}`,
    entidadTipo: 'proveedor',
    entidadId: (proveedor as { id: number }).id,
    metadata: { razon_social, rif: rif ?? null, categoria: categoria ?? null },
  });

  return NextResponse.json({ success: true, proveedor });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, calificacion, notas, activo } = body;

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const [proveedor] = await query(
    `UPDATE proveedores
     SET calificacion = COALESCE($1, calificacion),
         notas        = COALESCE($2, notas),
         activo       = COALESCE($3, activo)
     WHERE id = $4 AND user_id = $5
     RETURNING id, razon_social, calificacion, activo`,
    [
      calificacion ? parseInt(calificacion) : null,
      notas ?? null,
      activo ?? null,
      id,
      session.userId,
    ]
  );

  if (!proveedor) return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });

  return NextResponse.json({ success: true, proveedor });
}
