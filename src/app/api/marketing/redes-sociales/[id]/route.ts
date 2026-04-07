import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const { id } = await params;
        if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        const idNum = parseInt(id);
        const red = await queryOne(
            `SELECT * FROM redes_sociales WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!red) return NextResponse.json({ error: 'Red social no encontrada' }, { status: 404 });
        return NextResponse.json({ red });
    } catch (err) {
        console.error('[marketing/redes-sociales] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener red social' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM redes_sociales WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Red social no encontrada' }, { status: 404 });

    try {
        const body = await req.json();
        const { nombre, handle, seguidores, crecimiento, alcance, engagement, publicaciones, mejor_post, color, bg, border_color } = body;

        const [updated] = await query(
            `UPDATE redes_sociales SET
                nombre = COALESCE($1, nombre),
                handle = COALESCE($2, handle),
                seguidores = COALESCE($3, seguidores),
                crecimiento = COALESCE($4, crecimiento),
                alcance = COALESCE($5, alcance),
                engagement = COALESCE($6, engagement),
                publicaciones = COALESCE($7, publicaciones),
                mejor_post = COALESCE($8, mejor_post),
                color = COALESCE($9, color),
                bg = COALESCE($10, bg),
                border_color = COALESCE($11, border_color),
                updated_at = NOW()
             WHERE id = $12 AND user_id = $13
             RETURNING *`,
            [
                nombre ?? null, handle ?? null,
                seguidores != null ? Math.max(0, parseInt(seguidores) || 0) : null,
                crecimiento != null ? parseFloat(crecimiento) || 0 : null,
                alcance != null ? Math.max(0, parseInt(alcance) || 0) : null,
                engagement != null ? Math.max(0, parseFloat(engagement) || 0) : null,
                publicaciones != null ? Math.max(0, parseInt(publicaciones) || 0) : null,
                mejor_post ?? null,
                color ?? null, bg ?? null, border_color ?? null,
                idNum, session.userId,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_RED_SOCIAL',
            categoria: 'marketing',
            descripcion: `Red social actualizada: ${(updated as { nombre: string }).nombre}`,
            entidadTipo: 'red_social',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, red: updated });
    } catch (err) {
        console.error('[marketing/redes-sociales] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar red social' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne<{ nombre: string }>(`SELECT nombre FROM redes_sociales WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Red social no encontrada' }, { status: 404 });

    try {
        await query(`DELETE FROM redes_sociales WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_RED_SOCIAL',
            categoria: 'marketing',
            descripcion: `Red social eliminada: ${existing.nombre}`,
            entidadTipo: 'red_social',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[marketing/redes-sociales] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar red social' }, { status: 500 });
    }
}
