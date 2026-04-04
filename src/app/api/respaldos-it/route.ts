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
    `SELECT id, nombre, tipo, destino, estado, tamano_mb, notas, created_at::text
     FROM respaldos_it WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
    [session.userId, limit]
  ).catch(() => []);

  return NextResponse.json({ respaldos: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { nombre, tipo, destino, notas } = await req.json();
    if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

    const [row] = await query(
      `INSERT INTO respaldos_it (user_id, nombre, tipo, destino, notas)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [session.userId, nombre, tipo ?? 'completo', destino ?? 'local', notas ?? '']
    );

    return NextResponse.json({ success: true, id: (row as Record<string, unknown>).id });
  } catch (err) {
    console.error('[respaldos-it] POST error:', err);
    return NextResponse.json({ error: 'Error al crear respaldo' }, { status: 500 });
  }
}
