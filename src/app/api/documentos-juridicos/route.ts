import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const tipo   = searchParams.get('tipo');
  const estado = searchParams.get('estado');

  const conditions: string[] = ['user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (tipo)   { conditions.push(`tipo = $${i++}`);   params.push(tipo); }
  if (estado) { conditions.push(`estado = $${i++}`); params.push(estado); }

  const documentos = await query(
    `SELECT id, tipo, titulo, descripcion, partes,
            fecha_documento, fecha_vencimiento,
            estado, archivo_url, notaria, registro_publico, notas,
            created_at, updated_at
     FROM documentos_juridicos
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC`,
    params
  );

  const stats = await queryOne<{
    contratos_activos: number;
    poderes_vigentes: number;
    por_vencer: number;
    vencidos: number;
  }>(
    `SELECT
       COUNT(*) FILTER (WHERE tipo = 'contrato' AND estado = 'vigente')::int AS contratos_activos,
       COUNT(*) FILTER (WHERE tipo = 'poder'    AND estado = 'vigente')::int AS poderes_vigentes,
       COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL
                          AND fecha_vencimiento <= CURRENT_DATE + INTERVAL '30 days'
                          AND fecha_vencimiento >= CURRENT_DATE
                          AND estado = 'vigente')::int AS por_vencer,
       COUNT(*) FILTER (WHERE estado = 'vencido')::int AS vencidos
     FROM documentos_juridicos WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ documentos, stats: stats ?? { contratos_activos: 0, poderes_vigentes: 0, por_vencer: 0, vencidos: 0 } });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    tipo, titulo, descripcion, partes,
    fecha_documento, fecha_vencimiento,
    estado, archivo_url, notaria, registro_publico, notas
  } = body;

  if (!tipo || !titulo) {
    return NextResponse.json({ error: 'Tipo y título son requeridos' }, { status: 400 });
  }

  const [doc] = await query(
    `INSERT INTO documentos_juridicos
     (user_id, tipo, titulo, descripcion, partes, fecha_documento,
      fecha_vencimiento, estado, archivo_url, notaria, registro_publico, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING id, tipo, titulo, estado`,
    [
      session.userId,
      tipo,
      titulo,
      descripcion ?? null,
      partes ? `{${(partes as string[]).map(p => `"${p}"`).join(',')}}` : null,
      fecha_documento ?? null,
      fecha_vencimiento ?? null,
      estado ?? 'vigente',
      archivo_url ?? null,
      notaria ?? null,
      registro_publico ?? null,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'DOCUMENTO_JURIDICO_CREADO',
    categoria: 'legal',
    descripcion: `Documento jurídico: ${titulo} (${tipo})`,
    entidadTipo: 'documento_juridico',
    entidadId: (doc as { id: number }).id,
    metadata: { tipo, titulo, estado: estado ?? 'vigente' },
  });

  return NextResponse.json({ success: true, documento: doc });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  await query(
    `DELETE FROM documentos_juridicos WHERE id = $1 AND user_id = $2`,
    [parseInt(id), session.userId]
  );

  await logActivity({
    userId: session.userId,
    evento: 'DOCUMENTO_JURIDICO_ELIMINADO',
    categoria: 'legal',
    descripcion: `Documento jurídico #${id} eliminado`,
    entidadTipo: 'documento_juridico',
    entidadId: parseInt(id),
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado, notas } = body;

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const existing = await queryOne(
    `SELECT id FROM documentos_juridicos WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );
  if (!existing) return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });

  const [doc] = await query(
    `UPDATE documentos_juridicos
     SET estado     = COALESCE($1, estado),
         notas      = COALESCE($2, notas),
         updated_at = NOW()
     WHERE id = $3 AND user_id = $4
     RETURNING id, tipo, titulo, estado`,
    [estado ?? null, notas ?? null, id, session.userId]
  );

  return NextResponse.json({ success: true, documento: doc });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  await query(
    `DELETE FROM documentos_juridicos WHERE id = $1 AND user_id = $2`,
    [parseInt(id), session.userId]
  );

  await logActivity({
    userId: session.userId,
    evento: 'DOCUMENTO_JURIDICO_ELIMINADO',
    categoria: 'legal',
    descripcion: `Documento jurídico #${id} eliminado`,
    entidadTipo: 'documento_juridico',
    entidadId: parseInt(id),
  });

  return NextResponse.json({ success: true });
}
