import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { queryOne, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const uid = session.userId;

    const [ingresos, gastos, liquidez, cuentasCobrar, cuentasPagar, facturas, empleados, movRecientes] = await Promise.all([
        // Ingresos del mes
        queryOne<{ total: string }>(
            `SELECT COALESCE(SUM(monto), 0)::text AS total
             FROM movimientos_bancarios
             WHERE user_id = $1
               AND tipo = 'credito'
               AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE)`,
            [uid]
        ),
        // Gastos del mes
        queryOne<{ total: string }>(
            `SELECT COALESCE(SUM(monto), 0)::text AS total
             FROM movimientos_bancarios
             WHERE user_id = $1
               AND tipo = 'debito'
               AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE)`,
            [uid]
        ),
        // Liquidez total (saldo de cuentas bancarias)
        queryOne<{ total: string }>(
            `SELECT COALESCE(SUM(saldo_actual), 0)::text AS total
             FROM cuentas_bancarias WHERE user_id = $1 AND activa = true`,
            [uid]
        ),
        // Cuentas por cobrar
        queryOne<{ total: string }>(
            `SELECT COALESCE(SUM(total), 0)::text AS total
             FROM facturas WHERE user_id = $1 AND tipo = 'venta' AND estado IN ('emitida', 'pendiente')`,
            [uid]
        ),
        // Cuentas por pagar
        queryOne<{ total: string }>(
            `SELECT COALESCE(SUM(total), 0)::text AS total
             FROM facturas WHERE user_id = $1 AND tipo = 'compra' AND estado IN ('emitida', 'pendiente')`,
            [uid]
        ),
        // Resumen de facturas
        queryOne<{ emitidas: string; cobradas: string; vencidas: string }>(
            `SELECT
               COUNT(*) FILTER (WHERE estado = 'emitida')::text AS emitidas,
               COUNT(*) FILTER (WHERE estado = 'cobrada')::text AS cobradas,
               COUNT(*) FILTER (WHERE estado = 'vencida')::text AS vencidas
             FROM facturas WHERE user_id = $1`,
            [uid]
        ),
        // Total empleados activos
        queryOne<{ total: string }>(
            `SELECT COUNT(*)::text AS total FROM empleados WHERE user_id = $1 AND activo = true`,
            [uid]
        ),
        // Últimos 5 movimientos
        query<{
            id: number;
            fecha_operacion: string;
            concepto: string;
            monto: string;
            tipo: string;
            referencia: string | null;
        }>(
            `SELECT id, fecha_operacion, concepto, monto::text, tipo, referencia
             FROM movimientos_bancarios
             WHERE user_id = $1
             ORDER BY fecha_operacion DESC, id DESC
             LIMIT 5`,
            [uid]
        ),
    ]);

    const ingresosNum = parseFloat(ingresos?.total ?? '0');
    const gastosNum   = parseFloat(gastos?.total ?? '0');

    return NextResponse.json({
        ingresos: ingresosNum,
        gastos:   gastosNum,
        utilidadNeta: ingresosNum - gastosNum,
        liquidezTotal: parseFloat(liquidez?.total ?? '0'),
        cuentasCobrar: parseFloat(cuentasCobrar?.total ?? '0'),
        cuentasPagar:  parseFloat(cuentasPagar?.total ?? '0'),
        facturas: {
            emitidas:  parseInt(facturas?.emitidas  ?? '0', 10),
            cobradas:  parseInt(facturas?.cobradas  ?? '0', 10),
            vencidas:  parseInt(facturas?.vencidas  ?? '0', 10),
        },
        empleados: parseInt(empleados?.total ?? '0', 10),
        movimientosRecientes: movRecientes,
    });
}
