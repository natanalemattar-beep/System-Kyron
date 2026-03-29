import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const [
            usersResult,
            juridicosResult,
            visitsResult,
            visitsHoyResult,
            activosResult,
            facturasResult,
            empleadosResult,
            tasaResult,
        ] = await Promise.all([
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users WHERE tipo = 'juridico'`),
            query<{ total: string }>(`SELECT metric_value AS total FROM site_metrics WHERE metric_key = 'total_visits'`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '24 hours'`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '5 minutes'`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM facturas WHERE created_at >= NOW() - INTERVAL '30 days'`).catch(() => [{ total: '0' }]),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM empleados WHERE activo = true`).catch(() => [{ total: '0' }]),
            queryOne<{ tasa_usd_ves: string; fecha: string }>(
              `SELECT tasa_usd_ves::text, fecha::text FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`
            ).catch(() => null),
        ]);

        const totalUsuarios = parseInt(usersResult[0]?.total ?? '0', 10);
        const totalEmpresas = parseInt(juridicosResult[0]?.total ?? '0', 10);
        const totalVisitas = parseInt(visitsResult[0]?.total ?? '0', 10);
        const visitasHoy = parseInt(visitsHoyResult[0]?.total ?? '0', 10);
        const activosAhora = parseInt(activosResult[0]?.total ?? '0', 10);
        const facturasDelMes = parseInt(facturasResult[0]?.total ?? '0', 10);
        const empleadosActivos = parseInt(empleadosResult[0]?.total ?? '0', 10);

        return NextResponse.json({
            totalUsuarios,
            totalEmpresas,
            totalVisitas,
            visitasHoy,
            activosAhora,
            facturasDelMes,
            empleadosActivos,
            tasaBCV: tasaResult ? {
                usd_ves: parseFloat(tasaResult.tasa_usd_ves),
                fecha: tasaResult.fecha,
            } : null,
        });
    } catch {
        return NextResponse.json({
            totalUsuarios: 0,
            totalEmpresas: 0,
            totalVisitas: 0,
            visitasHoy: 0,
            activosAhora: 0,
            facturasDelMes: 0,
            empleadosActivos: 0,
            tasaBCV: null,
        });
    }
}
