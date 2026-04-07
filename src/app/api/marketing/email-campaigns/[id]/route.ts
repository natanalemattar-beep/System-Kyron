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
        const campaign = await queryOne(
            `SELECT * FROM email_campaigns WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!campaign) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });
        return NextResponse.json({ campaign });
    } catch (err) {
        console.error('[marketing/email-campaigns] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener campaña' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM email_campaigns WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });

    try {
        const body = await req.json();
        const { nombre, estado, fecha, destinatarios, entregados, abiertos, clicks, bajas } = body;

        const [updated] = await query(
            `UPDATE email_campaigns SET
                nombre = COALESCE($1, nombre),
                estado = COALESCE($2, estado),
                fecha = COALESCE($3, fecha),
                destinatarios = COALESCE($4, destinatarios),
                entregados = COALESCE($5, entregados),
                abiertos = COALESCE($6, abiertos),
                clicks = COALESCE($7, clicks),
                bajas = COALESCE($8, bajas),
                updated_at = NOW()
             WHERE id = $9 AND user_id = $10
             RETURNING *`,
            [
                nombre ?? null, estado ?? null, fecha ?? null,
                destinatarios != null ? Math.max(0, parseInt(destinatarios) || 0) : null,
                entregados != null ? Math.max(0, parseInt(entregados) || 0) : null,
                abiertos != null ? Math.max(0, parseInt(abiertos) || 0) : null,
                clicks != null ? Math.max(0, parseInt(clicks) || 0) : null,
                bajas != null ? Math.max(0, parseInt(bajas) || 0) : null,
                idNum, session.userId,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_EMAIL_CAMPAIGN',
            categoria: 'marketing',
            descripcion: `Campaña email actualizada: ${(updated as { nombre: string }).nombre}`,
            entidadTipo: 'email_campaign',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, campaign: updated });
    } catch (err) {
        console.error('[marketing/email-campaigns] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar campaña' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne<{ nombre: string }>(`SELECT nombre FROM email_campaigns WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });

    try {
        await query(`DELETE FROM email_campaigns WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_EMAIL_CAMPAIGN',
            categoria: 'marketing',
            descripcion: `Campaña email eliminada: ${existing.nombre}`,
            entidadTipo: 'email_campaign',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[marketing/email-campaigns] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar campaña' }, { status: 500 });
    }
}
