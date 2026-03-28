import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

function safeFloat(val: unknown, fallback = 0): number {
  const n = parseFloat(String(val ?? fallback));
  return Number.isFinite(n) ? n : fallback;
}

function safeInt(val: unknown, fallback = 0): number {
  const n = parseInt(String(val ?? fallback), 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const categoria = searchParams.get('categoria');
        const search = searchParams.get('search');

        const conditions: string[] = ['user_id = $1', 'activo = true'];
        const params: unknown[] = [session.userId];
        let i = 2;

        if (categoria) { conditions.push(`categoria = $${i++}`); params.push(categoria); }
        if (search) { conditions.push(`(nombre ILIKE $${i} OR codigo ILIKE $${i})`); params.push(`%${search}%`); i++; }

        const items = await query(
            `SELECT id, codigo, nombre, descripcion, categoria, unidad_medida,
                    stock_actual, stock_minimo, precio_costo::text,
                    precio_venta::text, activo, created_at, updated_at
             FROM inventario
             WHERE ${conditions.join(' AND ')}
             ORDER BY nombre ASC`,
            params
        );

        const stats = await queryOne<{ total_items: string; valor_total: string; items_criticos: string; categorias: string }>(
            `SELECT
                COUNT(*)::text AS total_items,
                COALESCE(SUM(stock_actual * precio_costo), 0)::text AS valor_total,
                COUNT(*) FILTER (WHERE stock_actual <= stock_minimo AND stock_minimo > 0)::text AS items_criticos,
                COUNT(DISTINCT categoria)::text AS categorias
             FROM inventario WHERE user_id = $1 AND activo = true`,
            [session.userId]
        );

        return NextResponse.json({ items, stats });
    } catch (err) {
        console.error('[inventario] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener inventario' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const {
            codigo, nombre, descripcion, categoria, unidad_medida,
            stock_actual, stock_minimo, precio_costo, precio_venta
        } = body;

        if (!nombre) {
            return NextResponse.json({ error: 'El nombre del producto es requerido' }, { status: 400 });
        }

        if (codigo) {
            const exists = await queryOne(`SELECT id FROM inventario WHERE user_id = $1 AND codigo = $2`, [session.userId, codigo]);
            if (exists) return NextResponse.json({ error: 'Ya existe un producto con ese código' }, { status: 409 });
        }

        const [item] = await query(
            `INSERT INTO inventario (user_id, codigo, nombre, descripcion, categoria, unidad_medida,
                                     stock_actual, stock_minimo, precio_costo, precio_venta)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
             RETURNING id, codigo, nombre, stock_actual, precio_costo::text`,
            [
                session.userId,
                codigo || null,
                nombre,
                descripcion || null,
                categoria || 'General',
                unidad_medida || 'unidad',
                safeInt(stock_actual),
                safeInt(stock_minimo),
                safeFloat(precio_costo),
                safeFloat(precio_venta),
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVO_PRODUCTO_INVENTARIO',
            categoria: 'sistema',
            descripcion: `Producto registrado: ${nombre} — Código: ${codigo || 'N/A'}`,
            entidadTipo: 'inventario',
            entidadId: (item as { id: number }).id,
            metadata: { codigo, nombre, categoria, stock_actual },
        });

        return NextResponse.json({ success: true, item });
    } catch (err) {
        console.error('[inventario] POST error:', err);
        return NextResponse.json({ error: 'Error al registrar producto' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { id, stock_actual, precio_costo, precio_venta, stock_minimo } = body;

        const parsedId = safeInt(id);
        if (parsedId <= 0) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

        const [item] = await query(
            `UPDATE inventario
             SET stock_actual     = COALESCE($2, stock_actual),
                 precio_costo     = COALESCE($3, precio_costo),
                 precio_venta     = COALESCE($4, precio_venta),
                 stock_minimo     = COALESCE($5, stock_minimo),
                 updated_at       = NOW()
             WHERE id = $1 AND user_id = $6
             RETURNING id, nombre, stock_actual`,
            [parsedId,
             stock_actual != null ? safeFloat(stock_actual) : null,
             precio_costo != null ? safeFloat(precio_costo) : null,
             precio_venta != null ? safeFloat(precio_venta) : null,
             stock_minimo != null ? safeFloat(stock_minimo) : null,
             session.userId]
        );

        return NextResponse.json({ success: true, item });
    } catch (err) {
        console.error('[inventario] PATCH error:', err);
        return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

        const parsedId = safeInt(id);
        if (parsedId <= 0) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

        await query(
            `UPDATE inventario SET activo = false, updated_at = NOW() WHERE id = $1 AND user_id = $2`,
            [parsedId, session.userId]
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[inventario] DELETE error:', err);
        return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
    }
}
