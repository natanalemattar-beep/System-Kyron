import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const ADMIN_SECRET = process.env.ADMIN_PROMOTE_SECRET || 'kyron-ceo-carlos-2025';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { secret } = await req.json();

    if (!secret || secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    await query(
      `UPDATE users SET tipo = 'admin' WHERE id = $1`,
      [session.userId]
    );

    console.log(`[admin] ${session.email} promoted to admin`);

    return NextResponse.json({
      success: true,
      message: '¡Bienvenido CEO! Ahora eres administrador. Recarga la página para que los cambios se reflejen.',
    });
  } catch (err) {
    console.error('[admin-promote] Error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
