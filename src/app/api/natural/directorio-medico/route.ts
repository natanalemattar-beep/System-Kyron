import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const rows = await query(
    `SELECT id, nombre, tipo, zona, COALESCE(telefono, '') AS tel, especialidades, disponible
     FROM directorio_medico WHERE user_id = $1 ORDER BY nombre`,
    [session.userId]
  ).catch(() => []);

  const centros = rows.map(r => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id,
      nombre: row.nombre,
      tipo: row.tipo,
      zona: row.zona ?? '',
      tel: row.tel,
      especialidades: row.especialidades ?? [],
      disponible: row.disponible ?? true,
    };
  });

  return NextResponse.json({ centros });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { nombre, tipo, zona, telefono, especialidades, disponible } = body;
    if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

    const [row] = await query(
      `INSERT INTO directorio_medico (user_id, nombre, tipo, zona, telefono, especialidades, disponible)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [session.userId, nombre, tipo ?? 'Centro Médico', zona ?? '', telefono ?? '', especialidades ?? [], disponible ?? true]
    );
    return NextResponse.json({ success: true, id: (row as Record<string, unknown>).id });
  } catch (err) {
    console.error('[directorio-medico] POST error:', err);
    return NextResponse.json({ error: 'Error al registrar centro médico' }, { status: 500 });
  }
}
