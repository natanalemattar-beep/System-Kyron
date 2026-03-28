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
        const cuentaId = searchParams.get('cuenta_id');
        const desde    = searchParams.get('desde');
        const hasta    = searchParams.get('hasta');
        const rawLimit = parseInt(searchParams.get('limit') ?? '50', 10);
        const limit    = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 500) : 50;

        const conditions: string[] = ['m.user_id = $1'];
        const params: unknown[] = [session.userId];
        let i = 2;

        if (cuentaId) {
            const cid = parseInt(cuentaId, 10);
            if (!Number.isFinite(cid)) {
                return NextResponse.json({ error: 'cuenta_id inválido' }, { status: 400 });
            }
            conditions.push(`m.cuenta_id = $${i++}`);
            params.push(cid);
        }
        if (desde) { conditions.push(`m.fecha_operacion >= $${i++}`); params.push(desde); }
        if (hasta) { conditions.push(`m.fecha_operacion <= $${i++}`); params.push(hasta); }

        params.push(limit);

        const movimientos = await query(
            `SELECT m.id, m.fecha_operacion, m.concepto, m.monto::text, m.tipo,
                    m.referencia, m.conciliado, m.cuenta_id,
                    cb.banco, cb.numero_cuenta
             FROM movimientos_bancarios m
             LEFT JOIN cuentas_bancarias cb ON cb.id = m.cuenta_id
             WHERE ${conditions.join(' AND ')}
             ORDER BY m.fecha_operacion DESC, m.id DESC
             LIMIT $${i}`,
            params
        );

        return NextResponse.json({ movimientos });
    } catch (err) {
        console.error('[movimientos] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener movimientos' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { cuenta_id, fecha_operacion, concepto, monto, tipo, referencia } = body;

        if (!fecha_operacion || !concepto || monto === undefined || !tipo) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }
        if (!['credito', 'debito'].includes(tipo)) {
            return NextResponse.json({ error: 'Tipo inválido. Use credito o debito' }, { status: 400 });
        }

        const montoNum = parseFloat(monto);
        if (!Number.isFinite(montoNum) || montoNum <= 0) {
            return NextResponse.json({ error: 'Monto inválido — debe ser un número positivo' }, { status: 400 });
        }

        const [mov] = await query(
            `INSERT INTO movimientos_bancarios (user_id, cuenta_id, fecha_operacion, concepto, monto, tipo, referencia)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, fecha_operacion, concepto, monto::text, tipo, referencia, conciliado`,
            [session.userId, cuenta_id ?? null, fecha_operacion, concepto, montoNum, tipo, referencia ?? null]
        );

        if (cuenta_id) {
            const delta = tipo === 'credito' ? montoNum : -montoNum;
            await query(
                `UPDATE cuentas_bancarias SET saldo_actual = saldo_actual + $1, saldo_disponible = saldo_disponible + $1 WHERE id = $2 AND user_id = $3`,
                [delta, cuenta_id, session.userId]
            );
        }

        await logActivity({
            userId: session.userId,
            evento: 'NUEVO_MOVIMIENTO',
            categoria: 'banco',
            descripcion: `Movimiento bancario: ${tipo === 'credito' ? '↑ Crédito' : '↓ Débito'} ${monto} — ${concepto}`,
            entidadTipo: 'movimiento',
            entidadId: (mov as { id: number }).id,
            metadata: { tipo, monto, concepto, cuenta_id: cuenta_id ?? null, referencia: referencia ?? null },
        });
        return NextResponse.json({ success: true, movimiento: mov });
    } catch (err) {
        console.error('[movimientos] POST error:', err);
        return NextResponse.json({ error: 'Error al registrar movimiento' }, { status: 500 });
    }
}
