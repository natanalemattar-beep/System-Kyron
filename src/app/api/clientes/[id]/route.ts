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
        const cliente = await queryOne(
            `SELECT * FROM clientes WHERE id = $1 AND user_id = $2`,
            [idNum, session.userId]
        );
        if (!cliente) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
        return NextResponse.json({ cliente });
    } catch (err) {
        console.error('[clientes] GET by id error:', err);
        return NextResponse.json({ error: 'Error al obtener cliente' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne(`SELECT id FROM clientes WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });

    try {
        const body = await req.json();
        const { tipo, razon_social, rif, nombre_contacto, cedula_contacto, telefono, email, direccion, estado, municipio, activo, segmento, valor_estimado, satisfaccion } = body;

        const [updated] = await query(
            `UPDATE clientes SET
                tipo = COALESCE($1, tipo),
                razon_social = COALESCE($2, razon_social),
                rif = COALESCE($3, rif),
                nombre_contacto = COALESCE($4, nombre_contacto),
                cedula_contacto = COALESCE($5, cedula_contacto),
                telefono = COALESCE($6, telefono),
                email = COALESCE($7, email),
                direccion = COALESCE($8, direccion),
                estado = COALESCE($9, estado),
                municipio = COALESCE($10, municipio),
                activo = COALESCE($11, activo),
                segmento = COALESCE($12, segmento),
                valor_estimado = COALESCE($13, valor_estimado),
                satisfaccion = COALESCE($14, satisfaccion),
                updated_at = NOW()
             WHERE id = $15 AND user_id = $16
             RETURNING *`,
            [
                tipo ?? null, razon_social ?? null, rif ?? null,
                nombre_contacto ?? null, cedula_contacto ?? null,
                telefono ?? null, email ?? null, direccion ?? null,
                estado ?? null, municipio ?? null,
                activo ?? null, segmento ?? null,
                valor_estimado != null ? Math.max(0, parseFloat(valor_estimado) || 0) : null,
                satisfaccion != null ? Math.min(5, Math.max(1, parseInt(satisfaccion) || 1)) : null,
                idNum, session.userId,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'ACTUALIZAR_CLIENTE',
            categoria: 'clientes',
            descripcion: `Cliente actualizado: ${(updated as { razon_social?: string; nombre_contacto?: string }).razon_social ?? (updated as { razon_social?: string; nombre_contacto?: string }).nombre_contacto ?? 'Sin nombre'}`,
            entidadTipo: 'cliente',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true, cliente: updated });
    } catch (err) {
        console.error('[clientes] PUT error:', err);
        return NextResponse.json({ error: 'Error al actualizar cliente' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    const idNum = parseInt(id);

    const existing = await queryOne<{ razon_social?: string; nombre_contacto?: string }>(`SELECT razon_social, nombre_contacto FROM clientes WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);
    if (!existing) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });

    try {
        await query(`DELETE FROM clientes WHERE id = $1 AND user_id = $2`, [idNum, session.userId]);

        await logActivity({
            userId: session.userId,
            evento: 'ELIMINAR_CLIENTE',
            categoria: 'clientes',
            descripcion: `Cliente eliminado: ${existing.razon_social ?? existing.nombre_contacto ?? 'Sin nombre'}`,
            entidadTipo: 'cliente',
            entidadId: idNum,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[clientes] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar cliente' }, { status: 500 });
    }
}
