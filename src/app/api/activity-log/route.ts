import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get('categoria');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);

    const conditions: string[] = ['user_id = $1'];
    const params: unknown[] = [session.userId];
    let i = 2;

    if (categoria && categoria !== 'todas') {
      conditions.push(`categoria = $${i++}`);
      params.push(categoria);
    }

    params.push(limit);

    const logs = await query(
      `SELECT id, evento, categoria, descripcion, entidad_tipo, entidad_id, metadata, ip, creado_en
       FROM activity_log
       WHERE ${conditions.join(' AND ')}
       ORDER BY creado_en DESC
       LIMIT $${i}`,
      params
    );

    const resumen = await query<{ categoria: string; total: string }>(
      `SELECT categoria, COUNT(*) as total FROM activity_log WHERE user_id = $1 GROUP BY categoria ORDER BY total DESC`,
      [session.userId]
    );

    return NextResponse.json({ logs, resumen });
  } catch (err) {
    console.error('[activity-log] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener registros' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    await logActivity({
      userId: session.userId,
      evento: body.evento ?? 'EVENTO_MANUAL',
      categoria: body.categoria ?? 'sistema',
      descripcion: body.descripcion ?? null,
      entidadTipo: body.entidad_tipo ?? null,
      entidadId: body.entidad_id ?? null,
      metadata: body.metadata ?? null,
      ip: req.headers.get('x-forwarded-for') ?? undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[activity-log] POST error:', err);
    return NextResponse.json({ error: 'Error al registrar actividad' }, { status: 500 });
  }
}
