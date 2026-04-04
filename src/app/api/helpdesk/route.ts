import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);

  const rows = await query(
    `SELECT id, titulo, descripcion, categoria, prioridad, estado, asignado_a, created_at::text, updated_at::text
     FROM helpdesk_tickets WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
    [session.userId, limit]
  ).catch(() => []);

  return NextResponse.json({ tickets: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { titulo, descripcion, categoria, prioridad } = await req.json();
    if (!titulo) return NextResponse.json({ error: 'Título requerido' }, { status: 400 });

    const [row] = await query(
      `INSERT INTO helpdesk_tickets (user_id, titulo, descripcion, categoria, prioridad)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [session.userId, titulo, descripcion ?? '', categoria ?? 'general', prioridad ?? 'media']
    );

    return NextResponse.json({ success: true, id: (row as Record<string, unknown>).id });
  } catch (err) {
    console.error('[helpdesk] POST error:', err);
    return NextResponse.json({ error: 'Error al crear ticket' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { id, estado } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await query(
      `UPDATE helpdesk_tickets SET estado = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3`,
      [estado, id, session.userId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[helpdesk] PATCH error:', err);
    return NextResponse.json({ error: 'Error al actualizar ticket' }, { status: 500 });
  }
}
