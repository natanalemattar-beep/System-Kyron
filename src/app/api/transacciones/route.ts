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
        const tipo_pago = searchParams.get('tipo_pago');
        const limit     = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 500);

        const conditions: string[] = ['user_id = $1'];
        const params: unknown[] = [session.userId];
        let i = 2;

        if (tipo_pago) { conditions.push(`tipo_pago = $${i++}`); params.push(tipo_pago); }
        params.push(limit);

        const transacciones = await query(
            `SELECT id, factura_id, tipo_pago, medio_pago, monto::text, moneda,
                    tasa_bcv, monto_usd::text, referencia, cedula_pagador, nombre_pagador,
                    banco_origen, banco_destino, verificado, verificado_en,
                    segundos_verificacion, created_at
             FROM transacciones_pagos
             WHERE ${conditions.join(' AND ')}
             ORDER BY created_at DESC
             LIMIT $${i}`,
            params
        );

        return NextResponse.json({ transacciones });
    } catch (err) {
        console.error('[transacciones] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener transacciones' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const {
            factura_id, tipo_pago, medio_pago, monto, moneda,
            tasa_bcv, referencia, cedula_pagador, nombre_pagador,
            banco_origen, banco_destino, segundos_verificacion
        } = body;

        if (!tipo_pago || monto === undefined) {
            return NextResponse.json({ error: 'Tipo de pago y monto son requeridos' }, { status: 400 });
        }

        const montoNum = parseFloat(monto);
        if (isNaN(montoNum) || montoNum <= 0) {
            return NextResponse.json({ error: 'Monto inválido' }, { status: 400 });
        }

        const bcv      = parseFloat(tasa_bcv ?? '0');
        const montoUsd = !isNaN(bcv) && bcv > 0 ? montoNum / bcv : null;

        const [tx] = await query(
            `INSERT INTO transacciones_pagos
             (user_id, factura_id, tipo_pago, medio_pago, monto, moneda, tasa_bcv, monto_usd,
              referencia, cedula_pagador, nombre_pagador, banco_origen, banco_destino,
              verificado, verificado_en, segundos_verificacion)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, true, NOW(), $14)
             RETURNING id, tipo_pago, monto::text, referencia, verificado, created_at`,
            [
                session.userId,
                factura_id ?? null,
                tipo_pago,
                medio_pago ?? null,
                montoNum,
                moneda ?? 'VES',
                !isNaN(bcv) && bcv > 0 ? bcv : null,
                montoUsd,
                referencia ?? null,
                cedula_pagador ?? null,
                nombre_pagador ?? null,
                banco_origen ?? null,
                banco_destino ?? null,
                segundos_verificacion ?? null,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_TRANSACCION',
            categoria: 'contabilidad',
            descripcion: `Pago registrado: ${tipo_pago} — ${(tx as { monto: string }).monto} ${moneda ?? 'VES'}${referencia ? ` · Ref: ${referencia}` : ''}`,
            entidadTipo: 'transaccion',
            entidadId: (tx as { id: number }).id,
            metadata: { tipo_pago, monto: (tx as { monto: string }).monto, moneda: moneda ?? 'VES', referencia: referencia ?? null, verificado: true },
        });

        return NextResponse.json({ success: true, transaccion: tx });
    } catch (err) {
        console.error('[transacciones] POST error:', err);
        return NextResponse.json({ error: 'Error al registrar transacción' }, { status: 500 });
    }
}
