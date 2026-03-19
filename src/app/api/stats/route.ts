import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

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
        ] = await Promise.all([
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users WHERE tipo = 'juridico'`),
            query<{ total: string }>(`SELECT metric_value AS total FROM site_metrics WHERE metric_key = 'total_visits'`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '24 hours'`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_visits WHERE created_at >= NOW() - INTERVAL '5 minutes'`),
        ]);

        const totalUsuarios = parseInt(usersResult[0]?.total ?? '0', 10);
        const totalEmpresas = parseInt(juridicosResult[0]?.total ?? '0', 10);
        const totalVisitas = parseInt(visitsResult[0]?.total ?? '0', 10);
        const visitasHoy = parseInt(visitsHoyResult[0]?.total ?? '0', 10);
        const activosAhora = parseInt(activosResult[0]?.total ?? '0', 10);

        return NextResponse.json({
            totalUsuarios,
            totalEmpresas,
            totalVisitas,
            visitasHoy,
            activosAhora,
            cumplimiento: 100,
            erroresFiscales: 0,
        });
    } catch {
        return NextResponse.json({
            totalUsuarios: 0,
            totalEmpresas: 0,
            totalVisitas: 0,
            visitasHoy: 0,
            activosAhora: 0,
            cumplimiento: 100,
            erroresFiscales: 0,
        });
    }
}
