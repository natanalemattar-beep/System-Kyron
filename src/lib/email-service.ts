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
    const { getSmtpTransporter, getGmailSenderAddress } = await import('@/lib/gmail-client');

    const transporter = getSmtpTransporter();
    const senderEmail = await getGmailSenderAddress();

    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('[email-service] CRÍTICO: GMAIL_APP_PASSWORD no está definida en las variables de entorno.');
    }

    const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
    const fromAddr = opts.from ?? `System Kyron <${senderEmail}>`;

    await transporter.sendMail({
      from: fromAddr,
      to: recipients.join(', '),
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });

    console.log(`[email-service] Gmail SMTP sent to ${recipients.join(', ')} (${opts.purpose ?? 'general'})`);
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

  // Colores por tipo de correo
  const palette = {
    verification: { accent: '#0EA5E9', accentDark: '#0284C7', badge: '#0EA5E9', badgeText: 'VERIFICACIÓN' },
    alert:        { accent: '#F59E0B', accentDark: '#D97706', badge: '#EF4444', badgeText: '⚠ ALERTA DE SEGURIDAD' },
    welcome:      { accent: '#22C55E', accentDark: '#16A34A', badge: '#22C55E', badgeText: 'BIENVENIDO' },
    reset:        { accent: '#A855F7', accentDark: '#9333EA', badge: '#A855F7', badgeText: 'RECUPERACIÓN' },
    general:      { accent: '#0EA5E9', accentDark: '#0284C7', badge: '#0EA5E9', badgeText: 'SYSTEM KYRON' },
  }[type];

  const appUrl = content.appUrl || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://system-kyron.vercel.app';
  const plainTextPreview = content.body.replace(/<[^>]*>?/gm, '').substring(0, 120);

  const codeDigits = content.code ? content.code.split('') : [];
  const digitBoxes = codeDigits.map((d, i) =>
    `<td style="padding:4px;">
      <div style="width:52px;height:64px;background:rgba(14,165,233,0.06);border:1px solid rgba(14,165,233,0.15);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;font-family:monospace;color:#f8fafc;letter-spacing:0;box-shadow:0 4px 12px rgba(0,0,0,0.2);">${d}</div>
    </td>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title} — System Kyron</title>
  <style>
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
      background-size: 200% 100%;
      animation: shimmer 3s ease-in-out infinite;
    }
    .grid-bg {
      background-image:
        linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px);
      background-size: 24px 24px;
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <span style="display:none;font-size:1px;color:#020617;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${plainTextPreview}...</span>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#020617;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:linear-gradient(135deg,#060a14 0%,#0a1020 100%);border:1px solid rgba(14,165,233,0.08);border-radius:32px;overflow:hidden;box-shadow:0 32px 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02);">
          
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#0ea5e9,#22c55e,#a855f7,#0ea5e9,#2563eb);background-size:300% 100%;" class="shimmer"></td>
          </tr>

          <tr>
            <td style="padding:40px 32px 24px 32px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:linear-gradient(135deg,rgba(14,165,233,0.12),rgba(37,99,235,0.08));border-radius:20px;padding:16px;border:1px solid rgba(14,165,233,0.1);">
                          <img src="${appUrl}/images/logo-kyron-hq.png" width="56" height="56" alt="SK" style="display:block;filter:drop-shadow(0 0 12px rgba(14,165,233,0.25));" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="color:#64748b;font-size:10px;font-weight:800;letter-spacing:5px;text-transform:uppercase;">System Kyron</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:12px;">
                    <span style="display:inline-block;background:rgba(14,165,233,0.08);color:${palette.accent};font-size:9px;font-weight:900;letter-spacing:2px;padding:5px 14px;border-radius:100px;border:1px solid rgba(14,165,233,0.12);">${palette.badgeText}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 40px 32px;">
              <h1 style="margin:0 0 12px 0;color:#f1f5f9;font-size:24px;font-weight:800;text-align:center;line-height:1.3;letter-spacing:-0.01em;">${content.title}</h1>
              <p style="margin:0 0 36px 0;color:#94a3b8;font-size:14px;line-height:1.7;text-align:center;max-width:400px;margin-left:auto;margin-right:auto;">
                ${content.body}
              </p>

              ${content.magicLink ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td align="center">
                    <a href="${content.magicLink}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#ffffff;font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:18px 44px;border-radius:16px;box-shadow:0 8px 24px -4px rgba(14,165,233,0.35);">✅ Verificar y Abrir Sesión</a>
                    <p style="margin:12px 0 0 0;color:#475569;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Listo, vuelve a tu pestaña anterior</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${content.code ? `
              <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(14,165,233,0.06);border-radius:20px;padding:32px 24px;text-align:center;position:relative;overflow:hidden;">
                <div style="position:absolute;inset:0;opacity:0.4;" class="grid-bg"></div>
                
                <span style="position:relative;z-index:1;display:block;margin:0 0 20px 0;color:#64748b;font-size:9px;font-weight:900;letter-spacing:5px;text-transform:uppercase;">Código de Verificación</span>
                
                <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;position:relative;z-index:1;">
                  <tr>
                    ${digitBoxes}
                  </tr>
                </table>

                <div style="margin-top:20px;height:1px;background:rgba(255,255,255,0.03);width:100%;position:relative;z-index:1;"></div>
                <p style="margin:16px 0 0 0;color:#475569;font-size:10px;position:relative;z-index:1;">
                  Válido por <span style="color:#f59e0b;font-weight:700;">10 minutos</span> · Cifrado de un solo uso
                </p>
                <div style="margin-top:12px;width:40px;height:40px;border-radius:50%;background:rgba(14,165,233,0.06);margin-left:auto;margin-right:auto;border:1px solid rgba(14,165,233,0.08);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;">
                  <span style="color:${palette.accent};font-size:16px;">🔐</span>
                </div>
              </div>
              ` : ''}

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td style="padding:20px;background:rgba(245,158,11,0.02);border-radius:14px;border-left:3px solid rgba(245,158,11,0.3);">
                    <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
                      <strong style="color:#f59e0b;">Privacidad:</strong> ${content.footer ?? 'Este código es confidencial. Si no iniciaste esta solicitud, ignora este mensaje.'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;background-color:#030711;text-align:center;border-top:1px solid rgba(255,255,255,0.02);">
              <p style="margin:0 0 6px 0;color:#1e293b;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">System Kyron</p>
              <div style="color:#1e293b;font-size:8px;font-weight:600;letter-spacing:1px;">
                Caracas, Venezuela · Protocolo de Inteligencia Distribuida
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

