import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get('categoria');
    const search = searchParams.get('search');

    const conditions: string[] = ['user_id = $1', 'activo = true'];
    const params: unknown[] = [session.userId];
    let i = 2;

    if (categoria) { conditions.push(`categoria = $${i++}`); params.push(categoria); }
    if (search) { conditions.push(`(nombre ILIKE $${i} OR sku ILIKE $${i})`); params.push(`%${search}%`); i++; }

    const items = await query(
        `SELECT id, sku, nombre, descripcion, categoria, unidad_medida,
                stock_actual, stock_minimo, costo_unitario::text,
                precio_venta::text, fecha_vencimiento, activo, created_at, updated_at
         FROM inventario
         WHERE ${conditions.join(' AND ')}
         ORDER BY nombre ASC`,
        params
    );

    const stats = await queryOne<{ total_items: string; valor_total: string; items_criticos: string; categorias: string }>(
        `SELECT
            COUNT(*)::text AS total_items,
            COALESCE(SUM(stock_actual * costo_unitario), 0)::text AS valor_total,
            COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL AND fecha_vencimiento <= NOW() + INTERVAL '30 days')::text AS items_criticos,
            COUNT(DISTINCT categoria)::text AS categorias
         FROM inventario WHERE user_id = $1 AND activo = true`,
        [session.userId]
    );

    return NextResponse.json({ items, stats });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const {
        sku, nombre, descripcion, categoria, unidad_medida,
        stock_actual, stock_minimo, costo_unitario, precio_venta, fecha_vencimiento
    } = body;

    if (!nombre) {
        return NextResponse.json({ error: 'El nombre del producto es requerido' }, { status: 400 });
    }

    if (sku) {
        const exists = await queryOne(`SELECT id FROM inventario WHERE user_id = $1 AND sku = $2`, [session.userId, sku]);
        if (exists) return NextResponse.json({ error: 'Ya existe un producto con ese SKU' }, { status: 409 });
    }

    const [item] = await query(
        `INSERT INTO inventario (user_id, sku, nombre, descripcion, categoria, unidad_medida,
                                 stock_actual, stock_minimo, costo_unitario, precio_venta, fecha_vencimiento)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING id, sku, nombre, stock_actual, costo_unitario::text`,
        [
            session.userId,
            sku || null,
            nombre,
            descripcion || null,
            categoria || 'General',
            unidad_medida || 'unidad',
            parseInt(stock_actual ?? '0', 10),
            parseInt(stock_minimo ?? '0', 10),
            parseFloat(costo_unitario ?? '0'),
            parseFloat(precio_venta ?? '0'),
            fecha_vencimiento || null,
        ]
    );

    await logActivity({
        userId: session.userId,
        evento: 'NUEVO_PRODUCTO_INVENTARIO',
        categoria: 'inventario',
        descripcion: `Producto registrado: ${nombre} — SKU: ${sku || 'N/A'}`,
        entidadTipo: 'inventario',
        entidadId: (item as { id: number }).id,
        metadata: { sku, nombre, categoria, stock_actual },
    });

    return NextResponse.json({ success: true, item });
}

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const { id, stock_actual, costo_unitario, precio_venta, stock_minimo } = body;

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    const [item] = await query(
        `UPDATE inventario
         SET stock_actual     = COALESCE($2, stock_actual),
             costo_unitario   = COALESCE($3, costo_unitario),
             precio_venta     = COALESCE($4, precio_venta),
             stock_minimo     = COALESCE($5, stock_minimo),
             updated_at       = NOW()
         WHERE id = $1 AND user_id = $6
         RETURNING id, nombre, stock_actual`,
        [id, stock_actual ?? null, costo_unitario ?? null, precio_venta ?? null, stock_minimo ?? null, session.userId]
    );

    return NextResponse.json({ success: true, item });
}

export async function DELETE(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await query(
        `UPDATE inventario SET activo = false, updated_at = NOW() WHERE id = $1 AND user_id = $2`,
        [parseInt(id, 10), session.userId]
    );

    return NextResponse.json({ success: true });
}
