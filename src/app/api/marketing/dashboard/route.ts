import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const campanasStats = await queryOne<{
            total: string; activas: string; total_alcance: string;
            total_conversiones: string; total_presupuesto: string; total_gastado: string;
        }>(
            `SELECT COUNT(*) as total,
                    COUNT(*) FILTER (WHERE estado = 'activa') as activas,
                    COALESCE(SUM(alcance), 0) as total_alcance,
                    COALESCE(SUM(conversiones), 0) as total_conversiones,
                    COALESCE(SUM(presupuesto), 0) as total_presupuesto,
                    COALESCE(SUM(gastado), 0) as total_gastado
             FROM campanas_marketing WHERE user_id = $1`,
            [session.userId]
        );

        const clientesStats = await queryOne<{
            total: string; activos: string; avg_satisfaccion: string; total_valor: string;
        }>(
            `SELECT COUNT(*) as total,
                    COUNT(*) FILTER (WHERE activo = true) as activos,
                    COALESCE(AVG(satisfaccion), 0) as avg_satisfaccion,
                    COALESCE(SUM(valor_estimado), 0) as total_valor
             FROM clientes WHERE user_id = $1`,
            [session.userId]
        );

        const emailStats = await queryOne<{
            total: string; total_enviados: string; total_abiertos: string; total_clicks: string;
        }>(
            `SELECT COUNT(*) as total,
                    COALESCE(SUM(destinatarios), 0) as total_enviados,
                    COALESCE(SUM(abiertos), 0) as total_abiertos,
                    COALESCE(SUM(clicks), 0) as total_clicks
             FROM email_campaigns WHERE user_id = $1`,
            [session.userId]
        );

        const redesStats = await queryOne<{
            total_seguidores: string; total_alcance: string; avg_engagement: string;
        }>(
            `SELECT COALESCE(SUM(seguidores), 0) as total_seguidores,
                    COALESCE(SUM(alcance), 0) as total_alcance,
                    COALESCE(AVG(engagement), 0) as avg_engagement
             FROM redes_sociales WHERE user_id = $1`,
            [session.userId]
        );

        const recentCampanas = await query(
            `SELECT id, nombre, tipo, estado, alcance, conversiones, roi, created_at
             FROM campanas_marketing WHERE user_id = $1 ORDER BY created_at DESC LIMIT 6`,
            [session.userId]
        );

        const topRedes = await query(
            `SELECT nombre, seguidores, crecimiento, engagement, color, bg
             FROM redes_sociales WHERE user_id = $1 ORDER BY seguidores DESC LIMIT 4`,
            [session.userId]
        );

        return NextResponse.json({
            campanas: campanasStats,
            clientes: clientesStats,
            email: emailStats,
            redes: redesStats,
            recentCampanas,
            topRedes,
        });
    } catch (err) {
        console.error('[marketing/dashboard] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener dashboard' }, { status: 500 });
    }
}
