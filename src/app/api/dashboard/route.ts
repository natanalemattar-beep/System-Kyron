import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { queryOne, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const uid = session.userId;

        const [
            ingresos, gastos, liquidez,
            cuentasCobrar, cuentasPagar,
            facturas, empleados,
            movRecientes, tasaBCV,
            ingresosAnterior, gastosAnterior,
            clientesActivos, facturasEsteMes,
            inventarioBajoStock, notifNoLeidas,
            chartMensual,
        ] = await Promise.all([
            queryOne<{ total: string }>(
                `SELECT COALESCE(SUM(monto), 0)::text AS total
                 FROM movimientos_bancarios
                 WHERE user_id = $1 AND tipo = 'credito'
                   AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE)`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COALESCE(SUM(monto), 0)::text AS total
                 FROM movimientos_bancarios
                 WHERE user_id = $1 AND tipo = 'debito'
                   AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE)`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COALESCE(SUM(saldo_actual), 0)::text AS total
                 FROM cuentas_bancarias WHERE user_id = $1 AND activa = true`,
                [uid]
            ),
            queryOne<{ total: string; count: string }>(
                `SELECT COALESCE(SUM(total), 0)::text AS total, COUNT(*)::text AS count
                 FROM facturas WHERE user_id = $1 AND tipo = 'venta' AND estado IN ('emitida', 'pendiente')`,
                [uid]
            ),
            queryOne<{ total: string; count: string }>(
                `SELECT COALESCE(SUM(total), 0)::text AS total, COUNT(*)::text AS count
                 FROM facturas WHERE user_id = $1 AND tipo = 'compra' AND estado IN ('emitida', 'pendiente')`,
                [uid]
            ),
            queryOne<{ emitidas: string; cobradas: string; vencidas: string; pagadas: string; total: string }>(
                `SELECT
                   COUNT(*) FILTER (WHERE estado = 'emitida')::text AS emitidas,
                   COUNT(*) FILTER (WHERE estado = 'cobrada')::text AS cobradas,
                   COUNT(*) FILTER (WHERE estado = 'vencida')::text AS vencidas,
                   COUNT(*) FILTER (WHERE estado = 'pagada')::text AS pagadas,
                   COUNT(*)::text AS total
                 FROM facturas WHERE user_id = $1`,
                [uid]
            ),
            queryOne<{ total: string; nomina_mensual: string }>(
                `SELECT COUNT(*)::text AS total,
                        COALESCE(SUM(salario_base), 0)::text AS nomina_mensual
                 FROM empleados WHERE user_id = $1 AND activo = true`,
                [uid]
            ),
            query<{
                id: number;
                fecha_operacion: string;
                concepto: string;
                monto: string;
                tipo: string;
                referencia: string | null;
                categoria: string | null;
            }>(
                `SELECT id, fecha_operacion, concepto, monto::text, tipo, referencia, categoria
                 FROM movimientos_bancarios
                 WHERE user_id = $1
                 ORDER BY fecha_operacion DESC, id DESC
                 LIMIT 8`,
                [uid]
            ),
            queryOne<{ tasa_usd_ves: string; fecha: string }>(
                `SELECT tasa_usd_ves::text, fecha::text FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`
            ).catch(() => null),
            queryOne<{ total: string }>(
                `SELECT COALESCE(SUM(monto), 0)::text AS total
                 FROM movimientos_bancarios
                 WHERE user_id = $1 AND tipo = 'credito'
                   AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month')`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COALESCE(SUM(monto), 0)::text AS total
                 FROM movimientos_bancarios
                 WHERE user_id = $1 AND tipo = 'debito'
                   AND date_trunc('month', fecha_operacion) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month')`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM clientes WHERE user_id = $1 AND activo = true`,
                [uid]
            ),
            queryOne<{ total: string; monto: string }>(
                `SELECT COUNT(*)::text AS total, COALESCE(SUM(total), 0)::text AS monto
                 FROM facturas WHERE user_id = $1
                   AND date_trunc('month', fecha_emision) = date_trunc('month', CURRENT_DATE)`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM inventario
                 WHERE user_id = $1 AND stock_actual <= stock_minimo AND activo = true`,
                [uid]
            ).catch(() => ({ total: '0' })),
            queryOne<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM notificaciones
                 WHERE user_id = $1 AND leida = false`,
                [uid]
            ).catch(() => ({ total: '0' })),
            query<{ mes: string; ingresos: string; gastos: string }>(
                `SELECT
                    TO_CHAR(gs.mes, 'Mon ''YY') AS mes,
                    COALESCE(SUM(CASE WHEN m.tipo = 'credito' THEN m.monto END), 0)::text AS ingresos,
                    COALESCE(SUM(CASE WHEN m.tipo = 'debito' THEN m.monto END), 0)::text AS gastos
                 FROM generate_series(
                    date_trunc('month', CURRENT_DATE) - INTERVAL '11 months',
                    date_trunc('month', CURRENT_DATE),
                    '1 month'
                 ) AS gs(mes)
                 LEFT JOIN movimientos_bancarios m
                    ON m.user_id = $1
                    AND date_trunc('month', m.fecha_operacion) = gs.mes
                 GROUP BY gs.mes
                 ORDER BY gs.mes ASC`,
                [uid]
            ).catch(() => []),
        ]);

        const ingresosNum = parseFloat(ingresos?.total ?? '0');
        const gastosNum   = parseFloat(gastos?.total ?? '0');
        const ingAntNum   = parseFloat(ingresosAnterior?.total ?? '0');
        const gasAntNum   = parseFloat(gastosAnterior?.total ?? '0');

        const calcVariacion = (actual: number, anterior: number) => {
            if (anterior === 0) return actual > 0 ? 100 : 0;
            return +((actual - anterior) / anterior * 100).toFixed(1);
        };

        return NextResponse.json({
            ingresos: ingresosNum,
            gastos: gastosNum,
            utilidadNeta: ingresosNum - gastosNum,
            liquidezTotal: parseFloat(liquidez?.total ?? '0'),
            cuentasCobrar: {
                total: parseFloat(cuentasCobrar?.total ?? '0'),
                count: parseInt(cuentasCobrar?.count ?? '0', 10),
            },
            cuentasPagar: {
                total: parseFloat(cuentasPagar?.total ?? '0'),
                count: parseInt(cuentasPagar?.count ?? '0', 10),
            },
            facturas: {
                emitidas: parseInt(facturas?.emitidas ?? '0', 10),
                cobradas: parseInt(facturas?.cobradas ?? '0', 10),
                vencidas: parseInt(facturas?.vencidas ?? '0', 10),
                pagadas: parseInt(facturas?.pagadas ?? '0', 10),
                total: parseInt(facturas?.total ?? '0', 10),
            },
            empleados: parseInt(empleados?.total ?? '0', 10),
            nominaMensual: parseFloat(empleados?.nomina_mensual ?? '0'),
            clientesActivos: parseInt(clientesActivos?.total ?? '0', 10),
            facturasEsteMes: {
                count: parseInt(facturasEsteMes?.total ?? '0', 10),
                monto: parseFloat(facturasEsteMes?.monto ?? '0'),
            },
            inventarioBajoStock: parseInt(inventarioBajoStock?.total ?? '0', 10),
            notificacionesNoLeidas: parseInt(notifNoLeidas?.total ?? '0', 10),
            variaciones: {
                ingresos: calcVariacion(ingresosNum, ingAntNum),
                gastos: calcVariacion(gastosNum, gasAntNum),
                utilidad: calcVariacion(ingresosNum - gastosNum, ingAntNum - gasAntNum),
            },
            tasaBCV: tasaBCV ? {
                usd_ves: parseFloat(tasaBCV.tasa_usd_ves),
                fecha: tasaBCV.fecha,
            } : null,
            movimientosRecientes: movRecientes,
            chartMensual: (chartMensual ?? []).map(r => ({
                mes: r.mes,
                ingresos: parseFloat(r.ingresos),
                gastos: parseFloat(r.gastos),
            })),
        });
    } catch (err) {
        console.error('[dashboard] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener datos del dashboard' }, { status: 500 });
    }
}
