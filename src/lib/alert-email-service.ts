import { queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

const TIPO_LABELS: Record<string, { emoji: string; label: string }> = {
  alerta: { emoji: '🚨', label: 'Alerta' },
  info: { emoji: 'ℹ️', label: 'Información' },
  exito: { emoji: '✅', label: 'Éxito' },
  advertencia: { emoji: '⚠️', label: 'Advertencia' },
  fiscal: { emoji: '📋', label: 'Notificación Fiscal' },
  vencimiento: { emoji: '📅', label: 'Vencimiento' },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function sendNotificationEmail(
  userId: number,
  notification: {
    tipo: string;
    titulo: string;
    mensaje: string;
    accion_url?: string;
  }
) {
  try {
    const config = await queryOne<{ notif_email: boolean; email_alertas: string | null }>(
      `SELECT notif_email, email_alertas FROM configuracion_usuario WHERE user_id = $1`,
      [userId]
    );

    if (!config || !config.notif_email) {
      return;
    }

    const user = await queryOne<{ email: string; nombre: string }>(
      `SELECT email, nombre FROM users WHERE id = $1`,
      [userId]
    );

    if (!user?.email) {
      return;
    }

    const alertEmail = config.email_alertas || user.email;

    const tipoInfo = TIPO_LABELS[notification.tipo] || TIPO_LABELS.info;
    const safeTitulo = escapeHtml(notification.titulo);
    const safeMensaje = escapeHtml(notification.mensaje);

    let bodyContent = `<p style="color: #E2E8F0; font-size: 14px; margin: 0 0 16px 0;">${safeMensaje}</p>`;

    if (notification.accion_url && isValidUrl(notification.accion_url)) {
      const safeUrl = escapeHtml(notification.accion_url);
      bodyContent += `
        <div style="text-align: center; margin: 24px 0;">
          <a href="${safeUrl}"
             style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #0EA5E9, #22C55E); color: white; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px;">
            Ver en System Kyron
          </a>
        </div>`;
    }

    const html = buildKyronEmailTemplate({
      title: `${tipoInfo.emoji} ${safeTitulo}`,
      body: bodyContent,
      footer: `${tipoInfo.label} enviada automaticamente por System Kyron. Puedes desactivar las notificaciones por email en tu configuracion.`,
    });

    const result = await sendEmail({
      to: alertEmail,
      subject: `[Kyron ${tipoInfo.label}] ${notification.titulo}`,
      html,
      module: 'sistema',
      purpose: 'alert',
    });

    if (!result.success) {
      console.warn(`[alert-email] Failed to send to ${alertEmail}: ${result.error}`);
    }
  } catch (err) {
    console.error('[alert-email] Error sending notification email:', err);
  }
}
