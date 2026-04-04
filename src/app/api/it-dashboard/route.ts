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
      ticketsAbiertos,
      ticketsEnProgreso,
      totalSolicitudesIT,
      usuariosConectados,
      activityLog,
    ] = await Promise.all([
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM sector_solicitudes
         WHERE user_id = $1 AND categoria = 'informatica' AND estado = 'pendiente'`,
        [uid]
      ).catch(() => ({ count: '0' })),
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM sector_solicitudes
         WHERE user_id = $1 AND categoria = 'informatica' AND estado = 'en_revision'`,
        [uid]
      ).catch(() => ({ count: '0' })),
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM sector_solicitudes
         WHERE user_id = $1 AND categoria = 'informatica'`,
        [uid]
      ).catch(() => ({ count: '0' })),
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM activity_log
         WHERE created_at >= NOW() - INTERVAL '15 minutes'`
      ).catch(() => ({ count: '0' })),
      query<{ evento: string; descripcion: string; created_at: string }>(
        `SELECT evento, descripcion, created_at::text
         FROM activity_log
         WHERE user_id = $1
         ORDER BY created_at DESC LIMIT 5`,
        [uid]
      ).catch(() => []),
    ]);

    const abiertos = parseInt(ticketsAbiertos?.count ?? '0', 10);
    const enProgreso = parseInt(ticketsEnProgreso?.count ?? '0', 10);
    const total = parseInt(totalSolicitudesIT?.count ?? '0', 10);
    const usuarios = Math.max(parseInt(usuariosConectados?.count ?? '0', 10), 1);

    return NextResponse.json({
      tickets: {
        abiertos,
        en_progreso: enProgreso,
        total,
        sla: total > 0 ? Math.round(((total - abiertos) / total) * 100) : 100,
      },
      usuarios_conectados: usuarios,
      actividad_reciente: activityLog,
    });
  } catch (err) {
    console.error('[it-dashboard] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener datos del dashboard IT' }, { status: 500 });
  }
}
