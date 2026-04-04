import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get('categoria') ?? null;
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);

  const rows = await query(
    `SELECT id, categoria, subcategoria, descripcion, estado, metadata, created_at::text AS created_at
     FROM sector_solicitudes
     WHERE user_id = $1
       AND ($2::text IS NULL OR categoria = $2)
     ORDER BY created_at DESC LIMIT $3`,
    [session.userId, categoria, limit]
  ).catch(() => []);

  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { categoria, subcategoria, descripcion, metadata } = body;

    if (!categoria) {
      return NextResponse.json({ error: 'Categoría requerida' }, { status: 400 });
    }

    const [row] = await query(
      `INSERT INTO sector_solicitudes (user_id, categoria, subcategoria, descripcion, estado, metadata)
       VALUES ($1, $2, $3, $4, 'pendiente', $5)
       RETURNING *`,
      [
        session.userId,
        categoria,
        subcategoria || null,
        descripcion || '',
        metadata ? JSON.stringify(metadata) : null,
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'SOLICITUD_CREADA',
      categoria: 'sistema',
      descripcion: `Solicitud ${categoria}${subcategoria ? ` - ${subcategoria}` : ''} registrada`,
      entidadTipo: 'solicitud',
      entidadId: (row as Record<string, unknown>).id as number,
      metadata: { categoria, subcategoria },
    });

    return NextResponse.json({ success: true, solicitud: row, id: (row as Record<string, unknown>).id });
  } catch (err) {
    console.error('[api/solicitudes] Error:', err);
    return NextResponse.json({ error: 'Error al registrar solicitud' }, { status: 500 });
  }
}
