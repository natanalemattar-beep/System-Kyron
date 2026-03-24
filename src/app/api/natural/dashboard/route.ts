import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const uid = session.userId;

    try {
        const [solicitudes, documentos, notificaciones] = await Promise.all([
            queryOne<{ total: string; pendientes: string; aprobadas: string }>(
                `SELECT 
                    COUNT(*)::text AS total,
                    COUNT(*) FILTER (WHERE estado IN ('pendiente', 'en_proceso'))::text AS pendientes,
                    COUNT(*) FILTER (WHERE estado = 'aprobada')::text AS aprobadas
                 FROM solicitudes_civiles WHERE user_id = $1`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM documentos_personales WHERE user_id = $1`,
                [uid]
            ),
            queryOne<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM notificaciones WHERE user_id = $1 AND leida = false`,
                [uid]
            ).catch(() => null),
        ]);

        return NextResponse.json({
            solicitudes: {
                total: parseInt(solicitudes?.total ?? '0', 10),
                pendientes: parseInt(solicitudes?.pendientes ?? '0', 10),
                aprobadas: parseInt(solicitudes?.aprobadas ?? '0', 10),
            },
            documentos: parseInt(documentos?.total ?? '0', 10),
            notificaciones: parseInt(notificaciones?.total ?? '0', 10),
        });
    } catch (err) {
        console.error('[natural/dashboard] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
    }
}
