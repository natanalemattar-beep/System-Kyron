import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { cachedQuery, invalidateCache } from '@/lib/cache';

export const dynamic = 'force-dynamic';

const COMENTARIOS_TTL = 120_000;

export async function GET() {
    try {
        const rows = await cachedQuery('comentarios:list', COMENTARIOS_TTL, () =>
            query(
                `SELECT c.id, c.texto, c.calificacion, c.modulo, c.created_at,
                        u.nombre, u.apellido, u.tipo as user_tipo, u.razon_social
                 FROM comentarios_publicos c
                 JOIN users u ON c.user_id = u.id
                 WHERE c.aprobado = true AND c.visible = true
                 ORDER BY c.created_at DESC
                 LIMIT 20`,
                []
            )
        );

        const comentarios = rows.map((r: any) => ({
            id: r.id,
            texto: r.texto,
            calificacion: r.calificacion,
            modulo: r.modulo,
            created_at: r.created_at,
            autor: r.user_tipo === 'juridico'
                ? (r.razon_social || 'Empresa')
                : `${r.nombre || ''} ${r.apellido || ''}`.trim() || 'Usuario',
            tipo: r.user_tipo,
            iniciales: r.user_tipo === 'juridico'
                ? (r.razon_social || 'E').substring(0, 2).toUpperCase()
                : `${(r.nombre || '?')[0]}${(r.apellido || '?')[0]}`.toUpperCase(),
        }));

        return NextResponse.json({ data: comentarios });
    } catch (err) {
        console.error('[comentarios] GET error:', err);
        return NextResponse.json({ data: [] });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ error: 'Debes iniciar sesión para comentar' }, { status: 401 });
        }

        const body = await req.json();
        const { texto, calificacion = 5, modulo } = body;

        if (!texto || typeof texto !== 'string' || texto.trim().length < 10) {
            return NextResponse.json({ error: 'El comentario debe tener al menos 10 caracteres' }, { status: 400 });
        }

        if (texto.trim().length > 500) {
            return NextResponse.json({ error: 'El comentario no puede exceder 500 caracteres' }, { status: 400 });
        }

        const cal = Math.max(1, Math.min(5, Number(calificacion) || 5));

        const existing = await query(
            `SELECT id FROM comentarios_publicos WHERE user_id = $1 AND created_at > NOW() - INTERVAL '24 hours'`,
            [session.userId]
        );
        if (existing.length >= 3) {
            return NextResponse.json({ error: 'Máximo 3 comentarios por día' }, { status: 429 });
        }

        await query(
            `INSERT INTO comentarios_publicos (user_id, texto, calificacion, modulo, aprobado)
             VALUES ($1, $2, $3, $4, true)`,
            [session.userId, texto.trim(), cal, modulo || null]
        );

        invalidateCache('comentarios:');
        return NextResponse.json({ success: true, message: 'Comentario publicado' });
    } catch (err) {
        console.error('[comentarios] POST error:', err);
        return NextResponse.json({ error: 'Error al publicar comentario' }, { status: 500 });
    }
}
