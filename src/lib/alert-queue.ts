import { query } from '@/lib/db';
import { sendNotificationEmail } from '@/lib/alert-email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

export interface QueueAlertParams {
  user_id: number;
  dedup_key: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  prioridad: string;
  metadata?: Record<string, unknown>;
  categoria?: string;
}

const PRIORIDADES_URGENTES = new Set(['alta', 'critica']);

export async function queueAlert(params: QueueAlertParams): Promise<'urgent' | 'queued'> {
  if (PRIORIDADES_URGENTES.has(params.prioridad)) {
    const [notif] = await query(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, $2, $3, $4, $5, 'multi', $6)
       RETURNING id`,
      [
        params.user_id,
        params.tipo,
        params.titulo,
        params.mensaje,
        params.prioridad,
        params.metadata ? JSON.stringify(params.metadata) : '{}',
      ]
    );

    await Promise.allSettled([
      sendNotificationEmail(params.user_id, { tipo: params.tipo, titulo: params.titulo, mensaje: params.mensaje }),
      sendWhatsAppNotification(params.user_id, { tipo: params.tipo, titulo: params.titulo, mensaje: params.mensaje }),
      sendSmsNotification(params.user_id, { tipo: params.tipo, titulo: params.titulo, mensaje: params.mensaje }),
    ]);

    return 'urgent';
  }

  await query(
    `INSERT INTO alert_queue (user_id, dedup_key, tipo, titulo, mensaje, prioridad, metadata, categoria)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id, dedup_key)
     DO UPDATE SET
       tipo = EXCLUDED.tipo,
       titulo = EXCLUDED.titulo,
       mensaje = EXCLUDED.mensaje,
       prioridad = EXCLUDED.prioridad,
       metadata = EXCLUDED.metadata,
       categoria = EXCLUDED.categoria,
       created_at = NOW()`,
    [
      params.user_id,
      params.dedup_key,
      params.tipo,
      params.titulo,
      params.mensaje,
      params.prioridad,
      params.metadata ? JSON.stringify(params.metadata) : '{}',
      params.categoria || 'general',
    ]
  );

  return 'queued';
}

export function makeDedupKey(tipo: string, ...parts: string[]): string {
  return `${tipo}:${parts.join(':')}`;
}

export async function countQueuedAlerts(sinceHours = 168): Promise<number> {
  const rows = await query<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM alert_queue WHERE created_at > NOW() - ($1 || ' hours')::interval`,
    [sinceHours]
  );
  return parseInt(rows[0]?.cnt || '0');
}

export async function clearProcessedAlerts(olderThanHours = 168): Promise<number> {
  const result = await query(
    `DELETE FROM alert_queue WHERE created_at < NOW() - ($1 || ' hours')::interval RETURNING id`,
    [olderThanHours]
  );
  return result.length;
}
