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

export function buildKyronEmailTemplate(content: { title: string; body: string; code?: string; magicLink?: string; footer?: string }) {
    const baseUrl = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : (process.env.REPLIT_DEPLOYMENT_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://system-kyron.replit.app');
  return `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 520px; margin: 0 auto; background: #060D1F; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0EA5E9, #22C55E); padding: 2px;">
        <div style="background: #060D1F; border-radius: 14px; padding: 40px 36px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="${baseUrl}/logo-kyron-email.png" alt="System Kyron" width="72" height="72" style="display: block; margin: 0 auto 12px auto;" />
              <p style="color: #F1F5F9; font-size: 15px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin: 0;">SYSTEM KYRON</p>
              <p style="color: #64748B; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin: 4px 0 0 0;">Inteligencia Corporativa</p>
            </div>
          <h1 style="color: #F1F5F9; font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 8px 0;">
            ${content.title}
          </h1>
          <div style="color: #94A3B8; font-size: 14px; text-align: center; margin: 0 0 36px 0;">
            ${content.body}
          </div>
          ${content.magicLink ? `
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${content.magicLink}" style="display: inline-block; background: linear-gradient(135deg, #0EA5E9, #22C55E); color: #FFFFFF; font-size: 14px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 16px 40px; border-radius: 12px;">
              Verificar mi identidad
            </a>
            <p style="color: #475569; font-size: 11px; margin: 12px 0 0 0;">Haz clic en el botón o usa el código de abajo</p>
          </div>
          ` : ''}
          ${content.code ? `
          <div style="background: #0A1530; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
            <p style="color: #94A3B8; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px 0;">Tu código de verificación</p>
            <p style="color: #0EA5E9; font-size: 42px; font-weight: 900; letter-spacing: 12px; margin: 0; font-family: 'Courier New', monospace;">${content.code}</p>
            <p style="color: #475569; font-size: 12px; margin: 12px 0 0 0;">Válido por <strong style="color: #F59E0B;">10 minutos</strong></p>
          </div>
          ` : ''}
          <div style="background: #0A1530; border-left: 3px solid #F59E0B; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
            <p style="color: #94A3B8; font-size: 12px; margin: 0;">
              <strong style="color: #F59E0B;">Seguridad:</strong> ${content.footer ?? 'Este es un mensaje automático de System Kyron.'}
            </p>
          </div>
          <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">
            System Kyron · Inteligencia Corporativa · Venezuela
          </p>
        </div>
      </div>
    </div>
  `;
}
