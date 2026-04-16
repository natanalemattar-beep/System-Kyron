import nodemailer from 'nodemailer';
import { google } from 'googleapis';

/**
 * Cliente OAuth2 de Gmail para operaciones avanzadas (lectura de buzón, bank-sync, etc).
 * Siempre se crea fresco — jamás cachear el cliente de OAuth2.
 */
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

/**
 * Crea un transporter SMTP de Gmail usando App Password.
 * NO se cachea en singleton para evitar quedar con un transporter en estado inválido
 * si las credenciales cambian o Gmail rechaza la conexión.
 */
export function getSmtpTransporter(): nodemailer.Transporter {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Gmail SMTP not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
    // Timeouts explícitos para Vercel serverless (limite 10s por defecto)
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
    tls: {
      // Permitir certificados autofirmados de Google en entornos restrictivos
      rejectUnauthorized: false,
    },
  });
}

export async function getGmailSenderAddress(): Promise<string> {
  return process.env.GMAIL_USER || 'noreplysystemkyron@gmail.com';
}
