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
        const list = await queryOne(
            `SELECT * FROM email_lists WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!list) return NextResponse.json({ error: 'Lista no encontrada' }, { status: 404 });
        return NextResponse.json({ list });
    } catch (err) {
        console.error('[marketing/email-lists] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener lista' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM email_lists WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Lista no encontrada' }, { status: 404 });

    try {
        const body = await req.json();
        const { nombre, total, activos } = body;

        const [updated] = await query(
            `UPDATE email_lists SET
                nombre = COALESCE($1, nombre),
                total = COALESCE($2, total),
                activos = COALESCE($3, activos),
                updated_at = NOW()
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [
                nombre ?? null,
                total != null ? Math.max(0, parseInt(total) || 0) : null,
                activos != null ? Math.max(0, parseInt(activos) || 0) : null,
                idNum, session.userId,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_EMAIL_LIST',
            categoria: 'marketing',
            descripcion: `Lista de email actualizada: ${(updated as { nombre: string }).nombre}`,
            entidadTipo: 'email_list',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, list: updated });
    } catch (err) {
        console.error('[marketing/email-lists] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar lista' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne<{ nombre: string }>(`SELECT nombre FROM email_lists WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Lista no encontrada' }, { status: 404 });

    try {
        await query(`DELETE FROM email_lists WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_EMAIL_LIST',
            categoria: 'marketing',
            descripcion: `Lista de email eliminada: ${existing.nombre}`,
            entidadTipo: 'email_list',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[marketing/email-lists] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar lista' }, { status: 500 });
    }
}
