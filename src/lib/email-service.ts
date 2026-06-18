import { query } from '@/lib/db';

export type EmailProvider = 'gmail';
export type EmailPurpose = 'verification' | 'password-reset' | 'alert' | 'general';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  module?: string;
  purpose?: EmailPurpose;
}

interface EmailResult {
  success: boolean;
  provider: EmailProvider | 'none';
  error?: string;
}

async function logEmail(opts: EmailOptions, result: EmailResult) {
  try {
    const recipients = Array.isArray(opts.to) ? opts.to.join(',') : opts.to;
    await query(
      `INSERT INTO email_log (destinatario, asunto, modulo, proveedor, estado, error_msg, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [recipients, opts.subject, opts.module ?? 'sistema', result.provider, result.success ? 'enviado' : 'fallido', result.error ?? null]
    );
  } catch {
    console.warn('[email-service] Could not log email to DB');
  }
}

async function sendViaGmail(opts: EmailOptions): Promise<EmailResult> {
  try {
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('[email-service] CRÍTICO: GMAIL_APP_PASSWORD no está definida en las variables de entorno.');
    }

    const { getSmtpTransporter, getGmailSenderAddress } = await import('@/lib/gmail-client');

    const transporter = getSmtpTransporter();
    const senderEmail = await getGmailSenderAddress();

    const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
    const fromAddr = opts.from ?? `System Kyron <${senderEmail}>`;

    await transporter.sendMail({
      from: fromAddr,
      to: recipients.join(', '),
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });

    // Log sending events; avoid logging recipient list in production.
    if (process.env.NODE_ENV !== 'production') {
      console.info('[email-service] Gmail SMTP sent to', { recipients, purpose: opts.purpose ?? 'general' });
    } else {
      console.info('[email-service] Gmail SMTP send event (production)');
    }
    return { success: true, provider: 'gmail' };
  } catch (err) {
    const errorMsg = String(err);
    console.error(`[email-service] Gmail SMTP failed:`, errorMsg);
    return { success: false, provider: 'gmail', error: errorMsg };
  }
}

export async function sendEmail(opts: EmailOptions): Promise<EmailResult> {
  const result = await sendViaGmail(opts);

  if (result.success) {
    logEmail(opts, result).catch(() => {});
    return result;
  }

  console.warn(`[email-service] Gmail failed (${opts.purpose ?? 'general'}): ${result.error}`);
  logEmail(opts, result).catch(() => {});
  return result;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function buildKyronEmailTemplate(content: {
  title: string;
  body: string;
  code?: string;
  magicLink?: string;
  footer?: string;
  type?: 'verification' | 'alert' | 'welcome' | 'reset' | 'general';
  appUrl?: string;
}) {
  const type = content.type ?? 'general';

  const palette = {
    verification: { accent: '#0ea5e9', accentDark: '#0284c7', gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)', bg: 'rgba(14,165,233,0.06)', badge: 'VERIFICACIÓN' },
    alert:        { accent: '#ef4444', accentDark: '#dc2626', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', bg: 'rgba(239,68,68,0.06)', badge: '⚠ ALERTA' },
    welcome:      { accent: '#22c55e', accentDark: '#16a34a', gradient: 'linear-gradient(135deg, #22c55e, #059669)', bg: 'rgba(34,197,94,0.06)', badge: 'BIENVENIDO' },
    reset:        { accent: '#a855f7', accentDark: '#9333ea', gradient: 'linear-gradient(135deg, #a855f7, #6366f1)', bg: 'rgba(168,85,247,0.06)', badge: 'RECUPERACIÓN' },
    general:      { accent: '#0ea5e9', accentDark: '#0284c7', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', bg: 'rgba(14,165,233,0.06)', badge: 'SYSTEM KYRON' },
  }[type];

  const appUrl = content.appUrl || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://system-kyron.vercel.app';
  const plainTextPreview = content.body.replace(/<[^>]*>?/gm, '').substring(0, 120);

  const codeDigits = content.code ? content.code.split('') : [];
  const digitBoxes = codeDigits.map((d) =>
    `<td align="center" style="padding:4px;">
      <table cellpadding="0" cellspacing="0" border="0" style="width:54px;height:66px;background:${palette.bg};border:1.5px solid ${palette.accent}22;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);">
        <tr><td align="center" style="font-size:30px;font-weight:900;font-family:monospace;color:#f1f5f9;line-height:66px;">${d}</td></tr>
      </table>
    </td>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.title)} — System Kyron</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <span style="display:none;font-size:1px;color:#0f172a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${plainTextPreview}...</span>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;background:linear-gradient(160deg,#0b1120 0%,#111827 100%);border-radius:32px;box-shadow:0 40px 80px -20px rgba(0,0,0,0.7);">

          <tr>
            <td style="height:4px;background:${palette.gradient};border-radius:32px 32px 0 0;font-size:0;line-height:0;">&zwj;</td>
          </tr>

          <tr>
            <td style="padding:36px 32px 20px 32px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:linear-gradient(135deg,${palette.accent}15,${palette.accent}08);border-radius:20px;padding:14px;border:1px solid ${palette.accent}18;box-shadow:0 0 30px ${palette.accent}10;">
                          <img src="${appUrl}/images/logo-kyron-hq.png" width="52" height="52" alt="SK" style="display:block;" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <span style="color:#475569;font-size:9px;font-weight:800;letter-spacing:5px;text-transform:uppercase;">System Kyron</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:14px;">
                    <span style="display:inline-block;background:${palette.accent}12;color:${palette.accent};font-size:9px;font-weight:900;letter-spacing:2.5px;padding:6px 16px;border-radius:100px;border:1px solid ${palette.accent}15;">${palette.badge}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <h1 style="margin:0 0 10px 0;color:#f1f5f9;font-size:22px;font-weight:800;text-align:center;line-height:1.35;letter-spacing:-0.01em;">${escapeHtml(content.title)}</h1>
              <p style="margin:0 0 32px 0;color:#94a3b8;font-size:14px;line-height:1.75;text-align:center;">
                ${content.body}
              </p>

              ${content.magicLink ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:${palette.gradient};border-radius:16px;box-shadow:0 8px 28px -4px ${palette.accent}40;">
                          <a href="${content.magicLink?.startsWith('http') ? content.magicLink : '#'}" style="display:inline-block;color:#ffffff;font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:16px 40px;border-radius:16px;">Verificar y Acceder</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0 0;color:#475569;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Luego vuelve a tu pestaña anterior</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${content.code ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0;">
                <tr>
                  <td style="background:rgba(0,0,0,0.25);border:1px solid ${palette.accent}08;border-radius:20px;padding:28px 20px;text-align:center;">
                    <span style="display:block;margin:0 0 18px 0;color:#475569;font-size:9px;font-weight:900;letter-spacing:5px;text-transform:uppercase;">Código de Verificación</span>
                    
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        ${digitBoxes}
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
                      <tr>
                        <td style="height:1px;background:rgba(255,255,255,0.03);font-size:0;line-height:0;">&zwj;</td>
                      </tr>
                    </table>

                    <p style="margin:16px 0 0 0;color:#475569;font-size:10px;line-height:1.5;">
                      Válido por <span style="color:${palette.accent};font-weight:800;">10 minutos</span> · Cifrado de un solo uso
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(251,191,36,0.03);border-radius:14px;border-left:3px solid rgba(251,191,36,0.25);">
                    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
                      <strong style="color:#fbbf24;">🔒 Privacidad:</strong> ${content.footer ? escapeHtml(content.footer) : 'Este c\u00f3digo es confidencial. Si no iniciaste esta solicitud, ignora este mensaje.'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:rgba(0,0,0,0.2);text-align:center;border-top:1px solid rgba(255,255,255,0.02);border-radius:0 0 32px 32px;">
              <p style="margin:0 0 4px 0;color:#1e293b;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">System Kyron</p>
              <p style="margin:0;color:#1e293b;font-size:8px;font-weight:600;letter-spacing:1px;">Caracas, Venezuela · Plataforma de Gesti\u00f3n Empresarial</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

