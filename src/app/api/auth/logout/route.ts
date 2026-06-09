import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (session) {
        const { all } = await req.json().catch(() => ({ all: false }));

        if (all) {
            await query(`DELETE FROM user_sessions WHERE user_id = $1`, [session.user.id]);
        }

        await logActivity({
            userId: session.user.id,
            evento: 'LOGOUT',
            categoria: 'auth',
            descripcion: all ? 'Cierre de sesión en todos los dispositivos' : 'Cierre de sesión manual',
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
