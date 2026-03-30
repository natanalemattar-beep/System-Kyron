import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const user = await queryOne<{ access_key_hash: string | null }>(
            `SELECT access_key_hash FROM users WHERE id = $1`,
            [session.userId]
        );

        return NextResponse.json({
            hasAccessKey: !!(user?.access_key_hash),
        });
    } catch (err) {
        console.error('[access-key GET] error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { accessKey, currentPassword } = await req.json();

        if (!currentPassword) {
            return NextResponse.json({ error: 'Debes confirmar tu contraseña actual' }, { status: 400 });
        }

        const user = await queryOne<{ id: number; password_hash: string }>(
            `SELECT id, password_hash FROM users WHERE id = $1`,
            [session.userId]
        );

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const passwordValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!passwordValid) {
            return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
        }

        if (!accessKey || typeof accessKey !== 'string' || accessKey.trim().length < 6) {
            return NextResponse.json({ error: 'La llave de acceso debe tener al menos 6 caracteres' }, { status: 400 });
        }

        if (accessKey.trim().length > 64) {
            return NextResponse.json({ error: 'La llave de acceso no puede tener más de 64 caracteres' }, { status: 400 });
        }

        const accessKeyHash = await bcrypt.hash(accessKey.trim(), 10);

        await query(
            `UPDATE users SET access_key_hash = $1, updated_at = NOW() WHERE id = $2`,
            [accessKeyHash, session.userId]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACCESS_KEY_SET',
            categoria: 'auth',
            descripcion: `Llave de acceso configurada para ${session.email}`,
            entidadTipo: 'usuario',
            entidadId: session.userId,
            metadata: { email: session.email },
        });

        return NextResponse.json({ success: true, message: 'Llave de acceso configurada correctamente' });
    } catch (err) {
        console.error('[access-key POST] error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await query(
            `UPDATE users SET access_key_hash = NULL, updated_at = NOW() WHERE id = $1`,
            [session.userId]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACCESS_KEY_REMOVED',
            categoria: 'auth',
            descripcion: `Llave de acceso eliminada para ${session.email}`,
            entidadTipo: 'usuario',
            entidadId: session.userId,
            metadata: { email: session.email },
        });

        return NextResponse.json({ success: true, message: 'Llave de acceso eliminada' });
    } catch (err) {
        console.error('[access-key DELETE] error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
