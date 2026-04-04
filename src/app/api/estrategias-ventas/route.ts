import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const rows = await query(
    `SELECT id, titulo, descripcion, impacto, plazo, icono, activa FROM estrategias_ventas WHERE user_id = $1 ORDER BY id`,
    [session.userId]
  ).catch(() => []);

  return NextResponse.json({ estrategias: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { titulo, descripcion, impacto, plazo, icono } = await req.json();
    if (!titulo) return NextResponse.json({ error: 'Título requerido' }, { status: 400 });

    const [row] = await query(
      `INSERT INTO estrategias_ventas (user_id, titulo, descripcion, impacto, plazo, icono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [session.userId, titulo, descripcion ?? '', impacto ?? 'Medio', plazo ?? '', icono ?? '']
    );

    return NextResponse.json({ success: true, id: (row as Record<string, unknown>).id });
  } catch (err) {
    console.error('[estrategias-ventas] POST error:', err);
    return NextResponse.json({ error: 'Error al crear estrategia' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { id, activa } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await query(
      `UPDATE estrategias_ventas SET activa = $1 WHERE id = $2 AND user_id = $3`,
      [activa ?? true, id, session.userId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[estrategias-ventas] PATCH error:', err);
    return NextResponse.json({ error: 'Error al actualizar estrategia' }, { status: 500 });
  }
}
