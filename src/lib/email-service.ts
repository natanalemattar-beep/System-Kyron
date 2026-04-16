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

  // Logo IMG: Usamos una imagen real con URL absoluta en vez de SVG para que
  // funcione garantizado en Gmail Móvil, iPhone, Outlook, etc. (que bloquean los SVG)
  const appUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_APP_URL
    : 'https://system-kyron.vercel.app';
    
  const logoIMG = `<img src="${appUrl}/images/logo-kyron-hq.png" width="80" height="80" alt="System Kyron" style="display:block; margin: 0 auto; outline:none; border:none; max-width:80px; max-height:80px;" />`;

  const plainTextPreview = content.body.replace(/<[^>]*>?/gm, '').substring(0, 120);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title} — System Kyron</title>
</head>
<body style="margin:0;padding:0;background-color:#060D1F;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <!-- INICIO PREHEADER INVISIBLE PARA GMAIL -->
  <span style="display:none;font-size:1px;color:#060D1F;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">${plainTextPreview}...</span>
  <!-- FIN PREHEADER -->

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#060D1F;padding:40px 16px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- HEADER GRADIENT BORDER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);border-radius:20px 20px 0 0;padding:2px 2px 0 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#060D1F;border-radius:18px 18px 0 0;padding:36px 40px 28px 40px;text-align:center;">

                    <!-- Logo -->
                    <div>${logoIMG}</div>

                    <!-- Brand Name -->
                    <p style="margin:12px 0 2px 0;color:#F1F5F9;font-size:16px;font-weight:800;letter-spacing:4px;text-transform:uppercase;">SYSTEM KYRON</p>
                    <p style="margin:0;color:#475569;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Inteligencia Corporativa · Venezuela</p>

                    <!-- Badge tipo -->
                    <div style="margin-top:20px;">
                      <span style="display:inline-block;background:${palette.badge};color:#ffffff;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:5px 16px;border-radius:20px;">${palette.badgeText}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);padding:0 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#0A1225;padding:32px 40px;">

                    <!-- Title -->
                    <h1 style="margin:0 0 12px 0;color:#F1F5F9;font-size:22px;font-weight:700;text-align:center;line-height:1.3;">${content.title}</h1>

                    <!-- Body text -->
                    <p style="margin:0 0 28px 0;color:#94A3B8;font-size:14px;line-height:1.7;text-align:center;">${content.body}</p>

                    <!-- Magic Link Button -->
                    ${content.magicLink ? `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                      <tr>
                        <td align="center">
                          <a href="${content.magicLink}" style="display:inline-block;background:linear-gradient(135deg,#0EA5E9,#22C55E);color:#ffffff;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:16px 44px;border-radius:14px;box-shadow:0 4px 24px rgba(14,165,233,0.3);">
                            ✓ &nbsp;Verificar mi identidad
                          </a>
                          <p style="margin:12px 0 0 0;color:#475569;font-size:11px;">El enlace expira en <strong style="color:#F59E0B;">15 minutos</strong></p>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Verification Code Box -->
                    ${content.code ? `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background:#060D1F;border:2px solid ${palette.accent};border-radius:16px;padding:28px;text-align:center;">
                          <p style="margin:0 0 8px 0;color:#64748B;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Tu código de verificación</p>
                          <p style="margin:0 0 10px 0;color:${palette.accent};font-size:46px;font-weight:900;letter-spacing:14px;font-family:'Courier New',Courier,monospace;">${content.code}</p>
                          <p style="margin:0;color:#475569;font-size:12px;">Válido por <strong style="color:#F59E0B;">10 minutos</strong> · No lo compartas con nadie</p>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="border-top:1px solid #1E293B;font-size:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Security Note -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                      <tr>
                        <td style="background:#0F172A;border-left:3px solid #F59E0B;border-radius:0 10px 10px 0;padding:14px 18px;">
                          <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">
                            <strong style="color:#F59E0B;">🔒 Seguridad:</strong> ${content.footer ?? 'Nunca compartiremos tu código con nadie. Si no solicitaste esto, ignora este mensaje o contacta a soporte.'}
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0EA5E9,#22C55E);border-radius:0 0 20px 20px;padding:0 2px 2px 2px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#060D1F;border-radius:0 0 18px 18px;padding:20px 40px 24px 40px;text-align:center;">
                    <p style="margin:0 0 6px 0;color:#334155;font-size:11px;">© 2026 System Kyron · Todos los derechos reservados</p>
                    <p style="margin:0;color:#1E293B;font-size:10px;letter-spacing:1px;">LOTTT · LOPCYMAT · VEN-NIF · ISO 27001</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

