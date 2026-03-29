import { NextRequest, NextResponse } from 'next/server';
import { healthCheck, getQueryMetrics, count } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    if ((session.tipo as string) !== 'admin') {
        return NextResponse.json({ error: 'Acceso restringido a administradores' }, { status: 403 });
    }

    try {
        const [health, metrics, tableCounts] = await Promise.all([
            healthCheck(),
            Promise.resolve(getQueryMetrics()),
            getTableCounts(),
        ]);

        return NextResponse.json({
            status: health.healthy ? 'operational' : 'degraded',
            database: {
                healthy: health.healthy,
                latencyMs: health.latencyMs,
                version: health.version,
                uptime: health.uptime,
                pool: health.poolStats,
            },
            queries: metrics,
            tables: tableCounts,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        console.error('[db-health] Error:', err);
        return NextResponse.json(
            { status: 'error', message: 'Error al verificar estado de la base de datos' },
            { status: 500 }
        );
    }
}

async function getTableCounts() {
    const tables = [
        'users', 'facturas', 'clientes', 'empleados', 'nominas',
        'cuentas_bancarias', 'movimientos_bancarios', 'inventario',
        'activity_log', 'notificaciones', 'tasas_bcv',
    ];

    const counts: Record<string, number> = {};
    await Promise.all(
        tables.map(async (table) => {
            try {
                counts[table] = await count(table);
            } catch {
                counts[table] = -1;
            }
        })
    );

    return counts;
}
