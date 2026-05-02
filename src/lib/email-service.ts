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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://system-kyron.com';
  const plainTextPreview = content.body.replace(/<[^>]*>?/gm, '').substring(0, 120);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title} — System Kyron</title>
  <style>
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
    @keyframes scan {
      0% { top: 0%; }
      100% { top: 100%; }
    }
    .neural-bg {
      background-image: radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.05) 1px, transparent 0);
      background-size: 24px 24px;
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- Preheader -->
  <span style="display:none;font-size:1px;color:#020617;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${plainTextPreview}...</span>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#020617;padding:40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#060a14;border:1px solid rgba(255,255,255,0.05);border-radius:32px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
          
          <!-- Animated Header Strip -->
          <tr>
            <td height="4" style="background:linear-gradient(90deg, #0ea5e9, #22c55e, #a855f7, #0ea5e9);background-size:200% 100%;"></td>
          </tr>

          <!-- Header Content -->
          <tr>
            <td style="padding:48px 40px 32px 40px;text-align:center;position:relative;">
              <div style="margin-bottom:24px;">
                <img src="${appUrl}/images/logo-kyron-hq.png" width="70" height="70" alt="SK" style="display:inline-block;filter:drop-shadow(0 0 10px rgba(14,165,233,0.3));" />
              </div>
              <h2 style="margin:0;color:#ffffff;font-size:12px;font-weight:900;letter-spacing:6px;text-transform:uppercase;opacity:0.5;">SYSTEM KYRON</h2>
              <div style="margin:16px 0;">
                <span style="background:rgba(14,165,233,0.1);color:#0ea5e9;font-size:9px;font-weight:900;letter-spacing:2px;padding:6px 16px;border-radius:100px;border:1px solid rgba(14,165,233,0.2);">${palette.badgeText}</span>
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:0 48px 48px 48px;">
              <h1 style="margin:0 0 16px 0;color:#f8fafc;font-size:26px;font-weight:800;text-align:center;line-height:1.2;letter-spacing:-0.02em;">${content.title}</h1>
              <p style="margin:0 0 40px 0;color:#94a3b8;font-size:15px;line-height:1.6;text-align:center;max-width:420px;margin-left:auto;margin-right:auto;">
                ${content.body}
              </p>

              <!-- Magic Action -->
              ${content.magicLink ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
                <tr>
                  <td align="center">
                    <a href="${content.magicLink}" style="display:inline-block;background:#0ea5e9;background:linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);color:#ffffff;font-size:14px;font-weight:800;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:20px 48px;border-radius:18px;box-shadow:0 10px 25px -5px rgba(14,165,233,0.4);">
                      Acceso Instantáneo
                    </a>
                    <p style="margin:16px 0 0 0;color:#475569;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Auto-verificación biométrica activa</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Visual Code Area -->
              ${content.code ? `
              <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:24px;padding:40px;text-align:center;position:relative;overflow:hidden;">
                <!-- Decorative Grid -->
                <div style="position:absolute;inset:0;opacity:0.05;background-image:linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);background-size:20px 20px;"></div>
                
                <p style="margin:0 0 12px 0;color:#64748b;font-size:10px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">Protocolo de Identidad</p>
                <div style="margin:0;color:#ffffff;font-size:54px;font-weight:900;letter-spacing:16px;font-family:monospace;text-shadow:0 0 20px rgba(14,165,233,0.3); line-height:1;">
                  ${content.code}
                </div>
                <div style="margin-top:20px;height:1px;background:rgba(255,255,255,0.05);width:100%;"></div>
                <p style="margin:15px 0 0 0;color:#475569;font-size:11px;">
                  Válido por <span style="color:#f59e0b;font-weight:700;">10 minutos</span> &bull; Cifrado de un solo uso
                </p>
              </div>
              ` : ''}

              <!-- Security Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:40px;">
                <tr>
                  <td style="padding:24px;background:rgba(245,158,11,0.03);border-radius:16px;border-left:4px solid #f59e0b;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                      <strong style="color:#f59e0b;">Soberanía de Datos:</strong> ${content.footer ?? 'Este código es confidencial. Si usted no inició esta solicitud, el núcleo de seguridad ha bloqueado el intento preventivamente.'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px;background-color:#030711;text-align:center;border-top:1px solid rgba(255,255,255,0.03);">
              <p style="margin:0 0 8px 0;color:#334155;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">System Kyron Alpha v4.0.2</p>
              <div style="color:#1e293b;font-size:9px;font-weight:600;letter-spacing:1px;">
                VEN-NIF &bull; SENIAT &bull; LOTTT &bull; ISO 27001
              </div>
              <div style="margin-top:16px;color:#1e293b;font-size:9px;">
                Caracas, Venezuela &bull; Protocolo de Inteligencia Distribuida
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

