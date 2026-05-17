import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function POST() {
    const session = await getSession();
    if (session) {
        await logActivity({
            userId: session.user.id,
            evento: 'LOGOUT',
            categoria: 'auth',
            descripcion: 'Cierre de sesión manual',
            entidadTipo: 'usuario',
            entidadId: session.user.id,
        }).catch(() => {});
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set('sk_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
    return res;
}
