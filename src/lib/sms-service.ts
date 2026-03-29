import { sendSms } from '@/lib/twilio-client';

function normalizeVenezuelanPhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+')) return cleaned;
  if (cleaned.startsWith('0')) return `+58${cleaned.slice(1)}`;
  if (cleaned.startsWith('58')) return `+${cleaned}`;
  return `+${cleaned}`;
}

const TIPO_LABELS: Record<string, string> = {
  alerta: 'ALERTA',
  info: 'INFO',
  exito: 'EXITO',
  advertencia: 'ADVERTENCIA',
  fiscal: 'FISCAL',
  vencimiento: 'VENCIMIENTO',
};

export async function sendSmsNotification(
  userId: number,
  notification: {
    tipo: string;
    titulo: string;
    mensaje: string;
  }
) {
  try {
    const { queryOne } = await import('@/lib/db');
    const config = await queryOne<{ notif_sms: boolean; telefono_sms: string }>(
      `SELECT notif_sms, telefono_sms FROM configuracion_usuario WHERE user_id = $1`,
      [userId]
    );

    if (!config?.notif_sms || !config?.telefono_sms) {
      return;
    }

    const normalized = normalizeVenezuelanPhone(config.telefono_sms);
    if (!/^\+\d{10,15}$/.test(normalized)) {
      console.warn(`[sms] Invalid phone number format: ${config.telefono_sms}`);
      return;
    }

    const tipoLabel = TIPO_LABELS[notification.tipo] || 'NOTIFICACION';
    const body = `SYSTEM KYRON | ${tipoLabel}\n${notification.titulo}\n${notification.mensaje}`;

    const result = await sendSms(normalized, body);

    if (!result.success) {
      console.warn(`[sms] Failed to send notification: ${result.error}`);
    }
  } catch (err) {
    console.error('[sms] Error sending notification:', err);
  }
}
