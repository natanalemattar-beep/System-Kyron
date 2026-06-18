import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Require ADMIN_PROMOTE_SECRET in production to avoid accidental privilege escalation.
const ADMIN_SECRET = process.env.ADMIN_PROMOTE_SECRET ?? (process.env.NODE_ENV === 'production' ? undefined : 'kyron_admin_promote_2026');
if (!ADMIN_SECRET) {
  throw new Error('ADMIN_PROMOTE_SECRET must be set in production');
}


export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { secret } = await req.json();

    if (!secret || secret !== ADMIN_SECRET) {
      // Do not leak the actual secret or whether it exists — generic error message.
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    await query(
      `UPDATE users SET tipo = 'admin' WHERE id = $1`,
      [session.user.id]
    );

    // Log non-sensitive info — avoid printing tokens or secrets.
    console.info('[admin] user promoted to admin', { userId: session.user.id });

    return NextResponse.json({
      success: true,
      message: '¡Bienvenido CEO. Ahora eres administrador. Recarga la página para aplicar los cambios.',
    });
  } catch (err) {
    console.error('[admin-promote] Error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
