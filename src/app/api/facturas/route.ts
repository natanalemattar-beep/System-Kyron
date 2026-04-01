import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

async function getNextNumeroControl(userId: number): Promise<string> {
    const result = await query<{ max_num: string | null }>(
        `SELECT MAX(numero_control) as max_num FROM facturas WHERE user_id = $1 AND numero_control IS NOT NULL`,
        [userId]
    );
    const current = result[0]?.max_num;
    if (!current) return '00-000001';
    const parts = current.split('-');
    const num = parseInt(parts[parts.length - 1], 10) + 1;
    const prefix = parts.length > 1 ? parts[0] : '00';
    return `${prefix}-${String(num).padStart(6, '0')}`;
}

async function getNextNumeroFactura(userId: number, tipoDoc: string): Promise<string> {
    const prefixes: Record<string, string> = {
        'FACTURA': 'FAC',
        'NOTA_DEBITO': 'ND',
        'NOTA_CREDITO': 'NC',
        'ORDEN_ENTREGA': 'OE',
        'GUIA_DESPACHO': 'GD',
    };
    const prefix = prefixes[tipoDoc] || 'FAC';
    const result = await query<{ count: string }>(
        `SELECT COUNT(*)::text as count FROM facturas WHERE user_id = $1 AND tipo_documento = $2`,
        [userId, tipoDoc]
    );
    const num = parseInt(result[0]?.count ?? '0', 10) + 1;
    return `${prefix}-${String(num).padStart(6, '0')}`;
}

function validateRIF(rif: string): boolean {
    if (!rif) return false;
    return /^[VJEPG]-?\d{8}-?\d$/.test(rif.toUpperCase().replace(/\s/g, ''));
}

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const tipo   = searchParams.get('tipo');
        const estado = searchParams.get('estado');
        const tipoDocumento = searchParams.get('tipo_documento');
        const limit  = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 500);

        const conditions: string[] = ['f.user_id = $1'];
        const params: unknown[] = [session.userId];
        let i = 2;

        if (tipo)   { conditions.push(`f.tipo = $${i++}`);   params.push(tipo); }
        if (estado) { conditions.push(`f.estado = $${i++}`); params.push(estado); }
        if (tipoDocumento) { conditions.push(`f.tipo_documento = $${i++}`); params.push(tipoDocumento); }

        params.push(limit);

        const facturas = await query(
            `SELECT f.id, f.numero_factura, f.numero_control, f.serie, f.tipo, f.tipo_documento,
                    f.condicion_pago, f.fecha_emision, f.fecha_vencimiento,
                    f.moneda, f.subtotal::text, f.base_imponible::text, f.base_exenta::text,
                    f.base_no_sujeta::text, f.porcentaje_iva, f.alicuota_tipo,
                    f.monto_iva::text, f.porcentaje_igtf, f.monto_igtf::text,
                    f.total::text, f.tasa_bcv, f.total_usd::text,
                    f.monto_moneda_ext::text, f.moneda_extranjera,
                    f.retencion_iva::text, f.porcentaje_ret_iva,
                    f.retencion_islr::text, f.porcentaje_ret_islr,
                    f.total_a_pagar::text,
                    f.rif_emisor, f.razon_social_emisor, f.domicilio_fiscal_emisor,
                    f.estado, f.descripcion,
                    f.factura_referencia_id, f.factura_referencia_num, f.motivo_ajuste,
                    f.sin_derecho_credito_fiscal,
                    f.cliente_id,
                    c.razon_social AS cliente_nombre, c.rif AS cliente_rif,
                    c.direccion AS cliente_direccion, c.telefono AS cliente_telefono
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
            cliente_id, numero_factura, tipo, tipo_documento, condicion_pago,
            fecha_emision, fecha_vencimiento,
            moneda, subtotal, porcentaje_iva, alicuota_tipo, tasa_bcv,
            moneda_extranjera, monto_moneda_ext,
            porcentaje_ret_iva, porcentaje_ret_islr,
            rif_emisor, razon_social_emisor, domicilio_fiscal_emisor, telefono_emisor,
            factura_referencia_id, factura_referencia_num, factura_referencia_fecha, motivo_ajuste,
            estado, descripcion, notas, items, serie
        } = body;

        if (!fecha_emision) {
            return NextResponse.json({ error: 'La fecha de emisión es obligatoria' }, { status: 400 });
        }

        const tipoDoc = (tipo_documento ?? 'FACTURA').toUpperCase();

        if (['NOTA_DEBITO', 'NOTA_CREDITO'].includes(tipoDoc)) {
            if (!factura_referencia_num && !factura_referencia_id) {
                return NextResponse.json({ error: 'Las Notas de Débito/Crédito requieren referencia a la factura original (Art. 18)' }, { status: 400 });
            }
            if (!motivo_ajuste) {
                return NextResponse.json({ error: 'Debe indicar el motivo del ajuste' }, { status: 400 });
            }
        }

        if (rif_emisor && !validateRIF(rif_emisor)) {
            return NextResponse.json({ error: 'El RIF del emisor tiene formato inválido. Use: V/J/E/P/G-12345678-0' }, { status: 400 });
        }

        const sub = parseFloat(subtotal ?? '0');
        if (isNaN(sub)) {
            return NextResponse.json({ error: 'Subtotal inválido' }, { status: 400 });
        }

        let baseImponible = 0;
        let baseExenta = 0;
        let baseNoSujeta = 0;

        if (Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                const cant = parseFloat(item.cantidad ?? '1');
                const pu = parseFloat(item.precio_unitario ?? '0');
                const desc = parseFloat(item.descuento_pct ?? '0');
                const itemSub = cant * pu * (1 - desc / 100);
                const gravamen = item.tipo_gravamen ?? 'gravado';
                if (gravamen === 'exento') baseExenta += itemSub;
                else if (gravamen === 'no_sujeto') baseNoSujeta += itemSub;
                else baseImponible += itemSub;
            }
        } else {
            baseImponible = sub;
        }

        const piva = parseFloat(porcentaje_iva ?? '16');
        const pigtf = 3.00;
        const iva = baseImponible * (piva / 100);
        const monedaVal = (moneda ?? 'VES').toUpperCase();
        const igtf = monedaVal !== 'VES' ? (baseImponible + baseExenta + baseNoSujeta) * (pigtf / 100) : 0;
        const total = baseImponible + baseExenta + baseNoSujeta + iva + igtf;

        const bcv = parseFloat(tasa_bcv ?? '0');
        const totalUsd = !isNaN(bcv) && bcv > 0 ? total / bcv : null;

        const pRetIva = parseFloat(porcentaje_ret_iva ?? '0');
        const pRetIslr = parseFloat(porcentaje_ret_islr ?? '0');
        const retIva = iva * (pRetIva / 100);
        const retIslr = (baseImponible + baseExenta + baseNoSujeta) * (pRetIslr / 100);
        const totalAPagar = total - retIva - retIslr;

        const numFactura = numero_factura || await getNextNumeroFactura(session.userId, tipoDoc);
        const numControl = await getNextNumeroControl(session.userId);

        const [factura] = await query<{ id: number; numero_factura: string; numero_control: string; total: string }>(
            `INSERT INTO facturas (
                user_id, cliente_id, numero_factura, numero_control, serie,
                tipo, tipo_documento, condicion_pago,
                fecha_emision, fecha_vencimiento,
                moneda, subtotal, base_imponible, base_exenta, base_no_sujeta,
                porcentaje_iva, alicuota_tipo, monto_iva,
                porcentaje_igtf, monto_igtf,
                total, tasa_bcv, total_usd,
                monto_moneda_ext, moneda_extranjera,
                retencion_iva, porcentaje_ret_iva,
                retencion_islr, porcentaje_ret_islr,
                total_a_pagar,
                rif_emisor, razon_social_emisor, domicilio_fiscal_emisor, telefono_emisor,
                factura_referencia_id, factura_referencia_num, factura_referencia_fecha, motivo_ajuste,
                estado, descripcion, notas,
                sin_derecho_credito_fiscal
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
                $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42
            ) RETURNING id, numero_factura, numero_control, total::text`,
            [
                session.userId,
                cliente_id ?? null,
                numFactura,
                numControl,
                serie ?? null,
                tipo ?? 'venta',
                tipoDoc,
                condicion_pago ?? 'contado',
                fecha_emision,
                fecha_vencimiento ?? null,
                moneda ?? 'VES',
                sub,
                baseImponible,
                baseExenta,
                baseNoSujeta,
                piva,
                alicuota_tipo ?? 'general',
                iva,
                pigtf,
                igtf,
                total,
                !isNaN(bcv) && bcv > 0 ? bcv : null,
                totalUsd,
                monto_moneda_ext ? parseFloat(monto_moneda_ext) : null,
                moneda_extranjera ?? null,
                retIva,
                pRetIva,
                retIslr,
                pRetIslr,
                totalAPagar,
                rif_emisor ?? null,
                razon_social_emisor ?? null,
                domicilio_fiscal_emisor ?? null,
                telefono_emisor ?? null,
                factura_referencia_id ?? null,
                factura_referencia_num ?? null,
                factura_referencia_fecha ?? null,
                motivo_ajuste ?? null,
                estado ?? 'emitida',
                descripcion ?? null,
                notas ?? null,
                false,
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
                    `INSERT INTO factura_items (factura_id, descripcion, codigo, unidad, cantidad, precio_unitario, descuento_pct, subtotal, aplica_iva, tipo_gravamen)
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                    [
                        factura.id,
                        item.descripcion,
                        item.codigo ?? null,
                        item.unidad ?? 'UND',
                        cant, pu, desc, itemSub,
                        (item.tipo_gravamen ?? 'gravado') === 'gravado',
                        item.tipo_gravamen ?? 'gravado',
                    ]
                );
            }
        }

        await logActivity({
            userId: session.userId,
            evento: tipoDoc === 'FACTURA' ? 'NUEVA_FACTURA' : tipoDoc === 'NOTA_DEBITO' ? 'NUEVA_NOTA_DEBITO' : tipoDoc === 'NOTA_CREDITO' ? 'NUEVA_NOTA_CREDITO' : 'NUEVO_DOCUMENTO',
            categoria: 'contabilidad',
            descripcion: `${tipoDoc} creada: ${factura.numero_factura} (Control: ${factura.numero_control}) — Total: ${factura.total}`,
            entidadTipo: 'factura',
            entidadId: factura.id,
            metadata: {
                numero_factura: factura.numero_factura,
                numero_control: factura.numero_control,
                tipo_documento: tipoDoc,
                total: factura.total,
                moneda: moneda ?? 'VES',
                estado: estado ?? 'emitida',
            },
        });

        return NextResponse.json({ success: true, factura });
    } catch (err) {
        console.error('[facturas] POST error:', err);
        return NextResponse.json({ error: 'Error al crear factura' }, { status: 500 });
    }
}
