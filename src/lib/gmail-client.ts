import nodemailer from 'nodemailer';
import { google } from 'googleapis';

type SmtpProvider = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

function getSmtpConfig(): SmtpProvider | null {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };
  }
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    };
  }
  return null;
}

export async function getUncachableGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export function getSmtpTransporter(): nodemailer.Transporter {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      'SMTP not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS or GMAIL_USER/GMAIL_APP_PASSWORD.'
    );
  }
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== 'development',
    },
  });
}

export async function getGmailSenderAddress(): Promise<string> {
  const config = getSmtpConfig();
  if (!config) throw new Error('SMTP not configured');
  return config.user;
}

export function getSmtpProviderName(): string {
  const config = getSmtpConfig();
  if (!config) return 'none';
  if (config.host.includes('gmail')) return 'gmail';
  if (config.host.includes('outlook') || config.host.includes('office365') || config.host.includes('hotmail')) return 'outlook';
  if (config.host.includes('sendgrid')) return 'sendgrid';
  if (config.host.includes('mailgun')) return 'mailgun';
  if (config.host.includes('postmark')) return 'postmark';
  if (config.host.includes('mailtrap') || config.host.includes('sandbox')) return 'mailtrap';
  return 'smtp';
}
