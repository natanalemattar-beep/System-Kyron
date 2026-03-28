import { query } from '@/lib/db';

export type EmailProvider = 'gmail' | 'outlook' | 'resend';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  module?: string;
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

async function sendViaOutlook(opts: EmailOptions): Promise<EmailResult> {
  try {
    const { getUncachableOutlookClient } = await import('@/lib/outlook-client');
    const client = await getUncachableOutlookClient();
    const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];

    await client.api('/me/sendMail').post({
      message: {
        subject: opts.subject,
        body: { contentType: 'HTML', content: opts.html },
        toRecipients: recipients.map(email => ({
          emailAddress: { address: email },
        })),
      },
      saveToSentItems: true,
    });

    return { success: true, provider: 'outlook' };
  } catch (err) {
    return { success: false, provider: 'outlook', error: String(err) };
  }
}

async function sendViaGmail(opts: EmailOptions): Promise<EmailResult> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY
      ? 'repl ' + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

    if (!hostname || !xReplitToken) {
      return { success: false, provider: 'gmail', error: 'Gmail connector env vars not available' };
    }

    const connRes = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
      { headers: { 'Accept': 'application/json', 'X-Replit-Token': xReplitToken } }
    );
    if (!connRes.ok) {
      return { success: false, provider: 'gmail', error: `Gmail connection fetch failed: ${connRes.status}` };
    }

    const connData = await connRes.json();
    const conn = connData.items?.[0];
    const accessToken = conn?.settings?.access_token || conn?.settings?.oauth?.credentials?.access_token;
    if (!accessToken) {
      return { success: false, provider: 'gmail', error: 'Gmail not connected' };
    }

    const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
    const rawEmail = [
      `To: ${recipients.join(', ')}`,
      `Subject: =?utf-8?B?${Buffer.from(opts.subject).toString('base64')}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      opts.html,
    ].join('\r\n');

    const encodedMessage = Buffer.from(rawEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw: encodedMessage }),
    });

    if (!sendRes.ok) {
      const errBody = await sendRes.text();
      return { success: false, provider: 'gmail', error: `Gmail API: ${sendRes.status} ${errBody}` };
    }

    return { success: true, provider: 'gmail' };
  } catch (err) {
    return { success: false, provider: 'gmail', error: String(err) };
  }
}

async function sendViaResend(opts: EmailOptions): Promise<EmailResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey || resendKey === 're_placeholder_123') {
    return { success: false, provider: 'resend', error: 'RESEND_API_KEY not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendKey);
    const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];

    await resend.emails.send({
      from: opts.from ?? 'System Kyron <onboarding@resend.dev>',
      to: recipients,
      subject: opts.subject,
      html: opts.html,
    });

    return { success: true, provider: 'resend' };
  } catch (err) {
    return { success: false, provider: 'resend', error: String(err) };
  }
}

export async function sendEmail(opts: EmailOptions): Promise<EmailResult> {
  const providers: Array<() => Promise<EmailResult>> = [
    sendViaOutlook,
    sendViaGmail,
    sendViaResend,
  ].map(fn => () => fn(opts));

  for (const tryProvider of providers) {
    const result = await tryProvider();
    if (result.success) {
      await logEmail(opts, result);
      return result;
    }
    console.warn(`[email-service] ${result.provider} failed: ${result.error}`);
  }

  const fallback: EmailResult = { success: false, provider: 'none', error: 'All email providers failed' };
  await logEmail(opts, fallback);
  return fallback;
}

export function buildKyronEmailTemplate(content: { title: string; body: string; code?: string; footer?: string }) {
  return `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 520px; margin: 0 auto; background: #060D1F; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0EA5E9, #22C55E); padding: 2px;">
        <div style="background: #060D1F; border-radius: 14px; padding: 40px 36px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #0EA5E918; border: 2px solid #0EA5E9; border-radius: 12px; padding: 14px 20px;">
              <span style="font-size: 28px; font-weight: 900; color: #0EA5E9; letter-spacing: 4px;">SK</span>
            </div>
            <p style="color: #94A3B8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 10px 0 0 0;">CORPORATE INTELLIGENCE · ZERO RISK</p>
          </div>
          <h1 style="color: #F1F5F9; font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 8px 0;">
            ${content.title}
          </h1>
          <p style="color: #94A3B8; font-size: 14px; text-align: center; margin: 0 0 36px 0;">
            ${content.body}
          </p>
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
