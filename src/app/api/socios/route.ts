import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';
import { decryptIfEncrypted, encryptIfNotEmpty, generateSearchHash } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const socios = await query(
    `SELECT id, nombre, cedula_rif, tipo, porcentaje_participacion::text,
            cargo, fecha_ingreso, activo, email, telefono, created_at
     FROM socios
     WHERE user_id = $1
     ORDER BY porcentaje_participacion DESC`,
    [session.user.id]
  );

  const sociosClean = (socios ?? []).map((s: any) => ({
    ...s,
    cedula_rif: s.cedula_rif ? decryptIfEncrypted(s.cedula_rif) : null,
    telefono: s.telefono ? decryptIfEncrypted(s.telefono) : null,
    email: s.email || null,
  }));

  const actas = await query(
    `SELECT id, numero_acta, tipo, fecha_asamblea, lugar,
            quorum_pct::text, orden_del_dia, acuerdos,
            presidente, secretario, estado, notas, created_at
     FROM actas_asamblea
     WHERE user_id = $1
     ORDER BY fecha_asamblea DESC
     LIMIT 20`,
    [session.user.id]
  );

  const stats = await queryOne<{
    total_socios: number;
    socios_activos: number;
    total_actas: number;
    actas_registradas: number;
  }>(
    `SELECT
       (SELECT COUNT(*)::int FROM socios WHERE user_id = $1) AS total_socios,
       (SELECT COUNT(*)::int FROM socios WHERE user_id = $1 AND activo = true) AS socios_activos,
       (SELECT COUNT(*)::int FROM actas_asamblea WHERE user_id = $1) AS total_actas,
       (SELECT COUNT(*)::int FROM actas_asamblea WHERE user_id = $1 AND estado = 'registrada') AS actas_registradas`,
    [session.user.id]
  );

  return NextResponse.json({
    socios: sociosClean,
    actas,
    stats: stats ?? { total_socios: 0, socios_activos: 0, total_actas: 0, actas_registradas: 0 },
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { entity } = body;

  if (entity === 'socio') {
    const { nombre, cedula_rif, tipo, porcentaje_participacion, cargo, fecha_ingreso, email, telefono } = body;
    if (!nombre) return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 });

    const encCedulaRif = encryptIfNotEmpty(cedula_rif);
    const encTelefono = encryptIfNotEmpty(telefono);
    const cedulaHash = tipo === 'natural' ? generateSearchHash(cedula_rif) : '';
    const rifHash = tipo === 'juridico' ? generateSearchHash(cedula_rif) : '';

    const [socio] = await query(
      `INSERT INTO socios (user_id, nombre, cedula_rif, cedula_hash, rif_hash, tipo, porcentaje_participacion, cargo, fecha_ingreso, email, telefono)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, nombre, porcentaje_participacion::text, cargo`,
      [session.user.id, nombre, encCedulaRif || null, cedulaHash || null, rifHash || null, tipo ?? 'natural',
       parseFloat(porcentaje_participacion || '0'), cargo ?? null,
       fecha_ingreso ?? null, email ?? null, encTelefono || null]
    );

    await logActivity({
      userId: session.user.id, evento: 'SOCIO_REGISTRADO', categoria: 'legal' as const,
      descripcion: `Socio registrado: ${nombre}`,
      entidadTipo: 'socio', entidadId: (socio as { id: number }).id,
      metadata: { nombre, cargo },
    });

    return NextResponse.json({ success: true, socio });
  }

  if (entity === 'acta') {
    const { numero_acta, tipo, fecha_asamblea, lugar, quorum_pct, orden_del_dia, acuerdos, presidente, secretario, notas } = body;
    if (!numero_acta || !fecha_asamblea) {
      return NextResponse.json({ error: 'Número de acta y fecha son requeridos' }, { status: 400 });
    }

    const [acta] = await query(
      `INSERT INTO actas_asamblea (user_id, numero_acta, tipo, fecha_asamblea, lugar, quorum_pct, orden_del_dia, acuerdos, presidente, secretario, notas)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, numero_acta, tipo, estado`,
      [session.user.id, numero_acta, tipo ?? 'ordinaria', fecha_asamblea,
       lugar ?? null, quorum_pct ? parseFloat(quorum_pct) : null,
       orden_del_dia ?? null, acuerdos ?? null,
       presidente ?? null, secretario ?? null, notas ?? null]
    );

    await logActivity({
      userId: session.user.id, evento: 'ACTA_ASAMBLEA_CREADA', categoria: 'legal' as const,
      descripcion: `Acta de asamblea: ${numero_acta}`,
      entidadTipo: 'acta_asamblea', entidadId: (acta as { id: number }).id,
      metadata: { numero_acta, tipo },
    });

    return NextResponse.json({ success: true, acta });
  }

  return NextResponse.json({ error: 'Entidad no válida' }, { status: 400 });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { entity, id } = body;
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  if (entity === 'socio') {
    const { nombre, cedula_rif, tipo, porcentaje_participacion, cargo, activo, email, telefono } = body;
    const encCedulaRif = cedula_rif != null ? encryptIfNotEmpty(cedula_rif) : undefined;
    const encTelefono = telefono != null ? encryptIfNotEmpty(telefono) : undefined;
    const socioTipo = tipo || 'natural';
    const cedulaHash = cedula_rif != null && socioTipo === 'natural' ? generateSearchHash(cedula_rif) : undefined;
    const rifHash = cedula_rif != null && socioTipo === 'juridico' ? generateSearchHash(cedula_rif) : undefined;
    await query(
      `UPDATE socios SET
         nombre = COALESCE($1, nombre),
         cedula_rif = COALESCE($2, cedula_rif),
         cedula_hash = COALESCE($3, cedula_hash),
         rif_hash = COALESCE($4, rif_hash),
         porcentaje_participacion = COALESCE($5, porcentaje_participacion),
         cargo = COALESCE($6, cargo),
         activo = COALESCE($7, activo),
         email = COALESCE($8, email),
         telefono = COALESCE($9, telefono)
       WHERE id = $10 AND user_id = $11`,
      [nombre ?? null, encCedulaRif ?? null, cedulaHash ?? null, rifHash ?? null,
       porcentaje_participacion != null ? parseFloat(porcentaje_participacion) : null,
       cargo ?? null, activo ?? null, email ?? null, encTelefono ?? null,
       id, session.user.id]
    );
    return NextResponse.json({ success: true });
  }

  if (entity === 'acta') {
    const { estado, notas } = body;
    await query(
      `UPDATE actas_asamblea SET
         estado = COALESCE($1, estado),
         notas = COALESCE($2, notas)
       WHERE id = $3 AND user_id = $4`,
      [estado ?? null, notas ?? null, id, session.user.id]
    );
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Entidad no válida' }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const entity = searchParams.get('entity');
  const id = searchParams.get('id');
  if (!entity || !id) return NextResponse.json({ error: 'entity e id requeridos' }, { status: 400 });

  const table = entity === 'socio' ? 'socios' : entity === 'acta' ? 'actas_asamblea' : null;
  if (!table) return NextResponse.json({ error: 'Entidad no válida' }, { status: 400 });

  await query(`DELETE FROM ${table} WHERE id = $1 AND user_id = $2`, [parseInt(id), session.user.id]);

  await logActivity({
    userId: session.user.id, evento: entity === 'socio' ? 'SOCIO_ELIMINADO' : 'ACTA_ELIMINADA',
    categoria: 'socios', descripcion: `${entity} #${id} eliminado`,
    entidadTipo: entity, entidadId: parseInt(id),
  });

  return NextResponse.json({ success: true });
}
