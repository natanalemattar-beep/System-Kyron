import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get('categoria');

  const conditions: string[] = ['user_id = $1', 'activo = true'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (categoria) { conditions.push(`categoria = $${i++}`); params.push(categoria); }

  const documentos = await query(
    `SELECT id, categoria, nombre, tipo_archivo, tamano_kb,
            url_storage, fecha_emision, fecha_vencimiento,
            organismo, descripcion, created_at
     FROM documentos_personales
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC`,
    params
  );

  return NextResponse.json({ documentos });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    categoria, nombre, tipo_archivo, tamano_kb,
    url_storage, fecha_emision, fecha_vencimiento, organismo, descripcion
  } = body;

  if (!nombre || !categoria) {
    return NextResponse.json({ error: 'Nombre y categoría son requeridos' }, { status: 400 });
  }

  const [doc] = await query(
    `INSERT INTO documentos_personales
     (user_id, categoria, nombre, tipo_archivo, tamano_kb, url_storage,
      fecha_emision, fecha_vencimiento, organismo, descripcion)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING id, categoria, nombre, tipo_archivo`,
    [
      session.userId,
      categoria,
      nombre,
      tipo_archivo ?? 'PDF',
      tamano_kb ? parseInt(tamano_kb) : null,
      url_storage ?? null,
      fecha_emision ?? null,
      fecha_vencimiento ?? null,
      organismo ?? null,
      descripcion ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'DOCUMENTO_PERSONAL_SUBIDO',
    categoria: 'documentos',
    descripcion: `Documento subido: ${nombre} (${categoria})`,
    entidadTipo: 'documento_personal',
    entidadId: (doc as { id: number }).id,
    metadata: { categoria, nombre, tipo_archivo: tipo_archivo ?? 'PDF' },
  });

  return NextResponse.json({ success: true, documento: doc });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const existing = await queryOne(
    `SELECT id FROM documentos_personales WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );
  if (!existing) return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });

  await query(
    `UPDATE documentos_personales SET activo = false WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );

  return NextResponse.json({ success: true });
}
