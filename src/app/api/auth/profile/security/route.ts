import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const user = await queryOne<{ two_factor_enabled: boolean; notification_method: string }>(
        `SELECT two_factor_enabled, notification_method FROM users WHERE id = $1`,
        [session.userId]
    );

    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const recentLogins = await query(
        `SELECT evento, ip, created_at as fecha
         FROM activity_log 
         WHERE user_id = $1 AND evento IN ('LOGIN_EXITOSO', 'LOGIN_FALLIDO', '2FA_VERIFIED')
         ORDER BY created_at DESC LIMIT 5`,
        [session.userId]
    );

    return NextResponse.json({
        twoFactorEnabled: user.two_factor_enabled,
        notificationMethod: user.notification_method || 'email',
        recentLogins: recentLogins.map((l: any) => ({
            ...l,
            status: l.evento === 'LOGIN_FALLIDO' ? 'bloqueado' : 'ok'
        }))
    });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const { twoFactorEnabled, notificationMethod } = await req.json();

    await query(
        `UPDATE users 
         SET two_factor_enabled = $1, notification_method = $2, updated_at = NOW() 
         WHERE id = $3`,
        [twoFactorEnabled, notificationMethod, session.userId]
    );

    await logActivity({
        userId: session.userId,
        evento: 'SECURITY_UPDATE',
        categoria: 'security',
        descripcion: `Configuración de seguridad actualizada: 2FA ${twoFactorEnabled ? 'Activado' : 'Desactivado'}`,
        metadata: { twoFactorEnabled, notificationMethod }
    });

    return NextResponse.json({ success: true });
}
