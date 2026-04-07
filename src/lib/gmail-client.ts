import nodemailer from 'nodemailer';

let _transporter: nodemailer.Transporter | null = null;

export function getSmtpTransporter(): nodemailer.Transporter {
  if (_transporter) return _transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Gmail SMTP not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
  }

  _transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  return _transporter;
}

export async function getGmailSenderAddress(): Promise<string> {
  return process.env.GMAIL_USER || 'noreplysystemkyron@gmail.com';
}
