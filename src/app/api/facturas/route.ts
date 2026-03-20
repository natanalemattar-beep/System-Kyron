import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const tipo   = searchParams.get('tipo');
        const estado = searchParams.get('estado');
        const limit  = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 500);

        const conditions: string[] = ['f.user_id = $1'];
        const params: unknown[] = [session.userId];
        let i = 2;

        if (tipo)   { conditions.push(`f.tipo = $${i++}`);   params.push(tipo); }
        if (estado) { conditions.push(`f.estado = $${i++}`); params.push(estado); }

        params.push(limit);

        const facturas = await query(
            `SELECT f.id, f.numero_factura, f.tipo, f.fecha_emision, f.fecha_vencimiento,
                    f.moneda, f.subtotal::text, f.monto_iva::text, f.porcentaje_iva,
                    f.total::text, f.tasa_bcv, f.total_usd::text, f.estado, f.descripcion,
                    f.cliente_id,
                    c.razon_social AS cliente_nombre, c.rif AS cliente_rif
             FROM facturas f
             LEFT JOIN clientes c ON c.id = f.cliente_id
             WHERE ${conditions.join(' AND ')}
             ORDER BY f.fecha_emision DESC, f.id DESC
             LIMIT $${i}`,
            params
        );

        return NextResponse.json({ facturas });
    } catch (err) {
        console.error('[facturas] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener facturas' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const {
            cliente_id, numero_factura, tipo, fecha_emision, fecha_vencimiento,
            moneda, subtotal, porcentaje_iva, tasa_bcv, estado, descripcion, notas, items
        } = body;

        if (!numero_factura || !fecha_emision || subtotal === undefined) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const sub = parseFloat(subtotal ?? '0');
        if (isNaN(sub)) {
            return NextResponse.json({ error: 'Subtotal inválido' }, { status: 400 });
        }

        const piva  = parseFloat(porcentaje_iva ?? '16');
        const pigtf = 3.00;
        const iva   = sub * (piva / 100);
        const igtf  = sub * (pigtf / 100);
        const total = sub + iva + igtf;
        const bcv   = parseFloat(tasa_bcv ?? '0');
        const totalUsd = !isNaN(bcv) && bcv > 0 ? total / bcv : null;

        const [factura] = await query<{ id: number; numero_factura: string; total: string }>(
            `INSERT INTO facturas (user_id, cliente_id, numero_factura, tipo, fecha_emision, fecha_vencimiento,
                                   moneda, subtotal, monto_iva, porcentaje_iva, monto_igtf, porcentaje_igtf,
                                   total, tasa_bcv, total_usd, estado, descripcion, notas)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
             RETURNING id, numero_factura, total::text`,
            [
                session.userId,
                cliente_id ?? null,
                numero_factura,
                tipo ?? 'venta',
                fecha_emision,
                fecha_vencimiento ?? null,
                moneda ?? 'VES',
                sub, iva, piva, igtf, pigtf,
                total,
                !isNaN(bcv) && bcv > 0 ? bcv : null,
                totalUsd,
                estado ?? 'emitida',
                descripcion ?? null,
                notas ?? null,
            ]
        );

        if (Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                const cant = parseFloat(item.cantidad ?? '1');
                const pu   = parseFloat(item.precio_unitario ?? '0');
                const desc = parseFloat(item.descuento_pct ?? '0');
                if (isNaN(cant) || isNaN(pu) || isNaN(desc)) continue;
                const itemSub = cant * pu * (1 - desc / 100);
                await query(
                    `INSERT INTO factura_items (factura_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, aplica_iva)
                     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                    [factura.id, item.descripcion, cant, pu, desc, itemSub, item.aplica_iva !== false]
                );
            }
        }

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_FACTURA',
            categoria: 'contabilidad',
            descripcion: `Factura creada: ${factura.numero_factura} — Total: ${factura.total}`,
            entidadTipo: 'factura',
            entidadId: factura.id,
            metadata: { numero_factura: factura.numero_factura, total: factura.total, moneda: moneda ?? 'VES', estado: estado ?? 'emitida' },
        });

        return NextResponse.json({ success: true, factura });
    } catch (err) {
        console.error('[facturas] POST error:', err);
        return NextResponse.json({ error: 'Error al crear factura' }, { status: 500 });
    }
}
