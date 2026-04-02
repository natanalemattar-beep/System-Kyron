import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { categoria, subcategoria, descripcion } = body;

    if (!categoria) {
      return NextResponse.json({ error: 'Categoría requerida' }, { status: 400 });
    }

    const [row] = await query(
      `INSERT INTO sector_solicitudes (user_id, categoria, subcategoria, descripcion, estado)
       VALUES ($1, $2, $3, $4, 'pendiente')
       RETURNING *`,
      [
        session.userId,
        categoria,
        subcategoria || null,
        descripcion || '',
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

    return NextResponse.json({ success: true, solicitud: row });
  } catch (err) {
    console.error('[api/solicitudes] Error:', err);
    return NextResponse.json({ error: 'Error al registrar solicitud' }, { status: 500 });
  }
}
