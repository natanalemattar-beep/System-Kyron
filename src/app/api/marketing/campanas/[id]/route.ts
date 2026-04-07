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
        const campana = await queryOne(
            `SELECT * FROM campanas_marketing WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!campana) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });
        return NextResponse.json({ campana });
    } catch (err) {
        console.error('[marketing/campanas] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener campaña' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM campanas_marketing WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });

    try {
        const body = await req.json();
        const { nombre, tipo, canales, estado, fecha_inicio, fecha_fin, presupuesto, gastado, alcance, impresiones, clicks, conversiones, roi, notas } = body;

        const [updated] = await query(
            `UPDATE campanas_marketing SET
                nombre = COALESCE($1, nombre),
                tipo = COALESCE($2, tipo),
                canales = COALESCE($3, canales),
                estado = COALESCE($4, estado),
                fecha_inicio = COALESCE($5, fecha_inicio),
                fecha_fin = COALESCE($6, fecha_fin),
                presupuesto = COALESCE($7, presupuesto),
                gastado = COALESCE($8, gastado),
                alcance = COALESCE($9, alcance),
                impresiones = COALESCE($10, impresiones),
                clicks = COALESCE($11, clicks),
                conversiones = COALESCE($12, conversiones),
                roi = COALESCE($13, roi),
                notas = COALESCE($14, notas),
                updated_at = NOW()
             WHERE id = $15 AND user_id = $16
             RETURNING *`,
            [
                nombre ?? null, tipo ?? null, canales ?? null, estado ?? null,
                fecha_inicio ?? null, fecha_fin ?? null,
                presupuesto != null ? Math.max(0, parseFloat(presupuesto) || 0) : null,
                gastado != null ? Math.max(0, parseFloat(gastado) || 0) : null,
                alcance != null ? Math.max(0, parseInt(alcance) || 0) : null,
                impresiones != null ? Math.max(0, parseInt(impresiones) || 0) : null,
                clicks != null ? Math.max(0, parseInt(clicks) || 0) : null,
                conversiones != null ? Math.max(0, parseInt(conversiones) || 0) : null,
                roi != null ? parseFloat(roi) || 0 : null,
                notas ?? null,
                idNum, session.userId,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_CAMPANA',
            categoria: 'marketing',
            descripcion: `Campaña actualizada: ${(updated as { nombre: string }).nombre}`,
            entidadTipo: 'campana_marketing',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, campana: updated });
    } catch (err) {
        console.error('[marketing/campanas] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar campaña' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne<{ nombre: string }>(`SELECT nombre FROM campanas_marketing WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 });

    try {
        await query(`DELETE FROM campanas_marketing WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_CAMPANA',
            categoria: 'marketing',
            descripcion: `Campaña eliminada: ${existing.nombre}`,
            entidadTipo: 'campana_marketing',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[marketing/campanas] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar campaña' }, { status: 500 });
    }
}
