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
        const idNum = parseInt(id);

        const embudo = await queryOne(
            `SELECT * FROM embudos_ventas WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!embudo) return NextResponse.json({ error: 'Embudo no encontrado' }, { status: 404 });

        const etapas = await query(
            `SELECT * FROM etapas_embudo WHERE embudo_id = $1 ORDER BY orden ASC`,
            [idNum]
        );

        return NextResponse.json({ embudo: { ...embudo as object, etapas } });
    } catch (err) {
        console.error('[marketing/embudos] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener embudo' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM embudos_ventas WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Embudo no encontrado' }, { status: 404 });

    try {
        const body = await req.json();
        const { nombre, estado, leads, conversion_global, ticket_promedio, ingreso_estimado, etapas } = body;

        const [updated] = await query(
            `UPDATE embudos_ventas SET
                nombre = COALESCE($1, nombre),
                estado = COALESCE($2, estado),
                leads = COALESCE($3, leads),
                conversion_global = COALESCE($4, conversion_global),
                ticket_promedio = COALESCE($5, ticket_promedio),
                ingreso_estimado = COALESCE($6, ingreso_estimado),
                updated_at = NOW()
             WHERE id = $7 AND user_id = $8
             RETURNING *`,
            [
                nombre ?? null, estado ?? null,
                leads != null ? Math.max(0, parseInt(leads) || 0) : null,
                conversion_global != null ? parseFloat(conversion_global) || 0 : null,
                ticket_promedio != null ? Math.max(0, parseFloat(ticket_promedio) || 0) : null,
                ingreso_estimado != null ? Math.max(0, parseFloat(ingreso_estimado) || 0) : null,
                idNum, session.userId,
            ]
        );

        if (Array.isArray(etapas)) {
            await query(`DELETE FROM etapas_embudo WHERE embudo_id = $1`, [idNum]);
            for (let i = 0; i < etapas.length; i++) {
                const et = etapas[i];
                await query(
                    `INSERT INTO etapas_embudo (embudo_id, nombre, total, orden, color, bg) VALUES ($1,$2,$3,$4,$5,$6)`,
                    [idNum, et.nombre, Math.max(0, parseInt(et.total) || 0), i, et.color ?? 'text-primary', et.bg ?? 'bg-primary/10']
                );
            }
        }

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_EMBUDO',
            categoria: 'marketing',
            descripcion: `Embudo actualizado: ${(updated as { nombre: string }).nombre}`,
            entidadTipo: 'embudo_ventas',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, embudo: updated });
    } catch (err) {
        console.error('[marketing/embudos] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar embudo' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    const idNum = parseInt(id);

    const existing = await queryOne<{ nombre: string }>(`SELECT nombre FROM embudos_ventas WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Embudo no encontrado' }, { status: 404 });

    try {
        await query(`DELETE FROM etapas_embudo WHERE embudo_id = $1`, [idNum]);
        await query(`DELETE FROM embudos_ventas WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_EMBUDO',
            categoria: 'marketing',
            descripcion: `Embudo eliminado: ${existing.nombre}`,
            entidadTipo: 'embudo_ventas',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[marketing/embudos] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar embudo' }, { status: 500 });
    }
}
