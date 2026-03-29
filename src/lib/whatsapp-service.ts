import { query } from '@/lib/db';

const TWILIO_WHATSAPP_SANDBOX = 'whatsapp:+14155238886';

async function getTwilioCredentials() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error('Twilio not configured: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN required');
  }

  return { accountSid, authToken };
}

export async function sendWhatsAppMessage(
  to: string,
  body: string
): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const { accountSid, authToken } = await getTwilioCredentials();
    const twilio = (await import('twilio')).default;
    const client = twilio(accountSid, authToken);

    const toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    const message = await client.messages.create({
      body,
      from: TWILIO_WHATSAPP_SANDBOX,
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
    const user = await import('@/lib/db').then(m =>
      m.queryOne<{ telefono_whatsapp: string }>(
        `SELECT telefono_whatsapp FROM configuracion_usuario WHERE user_id = $1`,
        [userId]
      )
    );

    if (!user?.telefono_whatsapp) {
      return;
    }

    const tipoLabel = TIPO_LABELS[notification.tipo] || 'NOTIFICACIÓN';

    const body = `*SYSTEM KYRON*\n${tipoLabel}\n\n*${notification.titulo}*\n${notification.mensaje}`;

    const result = await sendWhatsAppMessage(user.telefono_whatsapp, body);

    if (!result.success) {
      console.warn(`[whatsapp] Failed to send notification: ${result.error}`);
    }
  } catch (err) {
    console.error('[whatsapp] Error sending notification:', err);
  }
}
