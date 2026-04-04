import { getTwilioClient } from '@/lib/twilio-client';

const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

function normalizeVenezuelanPhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('whatsapp:')) cleaned = cleaned.replace('whatsapp:', '');
  if (cleaned.startsWith('+')) return cleaned;
  if (cleaned.startsWith('0')) return `+58${cleaned.slice(1)}`;
  if (cleaned.startsWith('58')) return `+${cleaned}`;
  return `+${cleaned}`;
}

export async function sendWhatsAppMessage(
  to: string,
  body: string
): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const client = await getTwilioClient();

    const normalized = normalizeVenezuelanPhone(to);
    if (!/^\+\d{10,15}$/.test(normalized)) {
      console.warn(`[whatsapp] Invalid phone number format: ${to}`);
      return { success: false, error: `Invalid phone number: ${to}` };
    }
    const toFormatted = `whatsapp:${normalized}`;

    const message = await client.messages.create({
      body,
      from: WHATSAPP_FROM,
      to: toFormatted,
    });

    return { success: true, sid: message.sid };
  } catch (err) {
    console.error('[whatsapp] Send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const TIPO_LABELS: Record<string, string> = {
  alerta: '🚨 ALERTA',
  info: 'ℹ️ INFO',
  exito: '✅ ÉXITO',
  advertencia: '⚠️ ADVERTENCIA',
  fiscal: '📋 FISCAL',
  parafiscal: '🏛️ PARAFISCAL',
  laboral: '👷 LABORAL',
  regulatorio: '⚖️ REGULATORIO',
  municipal: '🏢 MUNICIPAL',
  ambiental: '🌿 AMBIENTAL',
  vencimiento: '📅 VENCIMIENTO',
};

export async function sendWhatsAppNotification(
  userId: number,
  notification: {
    tipo: string;
    titulo: string;
    mensaje: string;
  }
) {
  try {
    const { queryOne } = await import('@/lib/db');
    const config = await queryOne<{ notif_whatsapp: boolean; telefono_whatsapp: string }>(
      `SELECT notif_whatsapp, telefono_whatsapp FROM configuracion_usuario WHERE user_id = $1`,
      [userId]
    );

    if (!config?.notif_whatsapp || !config?.telefono_whatsapp) {
      return;
    }

    const tipoLabel = TIPO_LABELS[notification.tipo] || 'NOTIFICACIÓN';

    const body = `*SYSTEM KYRON*\n${tipoLabel}\n\n*${notification.titulo}*\n${notification.mensaje}`;

    const result = await sendWhatsAppMessage(config.telefono_whatsapp, body);

    if (!result.success) {
      console.warn(`[whatsapp] Failed to send notification: ${result.error}`);
    }
  } catch (err) {
    console.error('[whatsapp] Error sending notification:', err);
  }
}
