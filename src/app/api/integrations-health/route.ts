import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, unknown> = {};

  // Módulo de Procesamiento Algorítmico (Kyron Core)
  results.kyron_core = {
    engine: 'deterministic-v2',
    status: 'operational',
    visual_processing: 'enabled',
    fiscal_audit: 'enabled'
  };
  
  results.gmail = {
    smtp_user: !!process.env.GMAIL_USER,
    smtp_password: !!process.env.GMAIL_APP_PASSWORD,
    method: 'nodemailer_smtp',
  };

  try {
    const { getSmtpTransporter, getGmailSenderAddress } = await import('@/lib/gmail-client');
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = getSmtpTransporter();
      const sender = await getGmailSenderAddress();
      await transporter.verify();
      results.gmail_live = { status: 'connected', sender, method: 'smtp' };
    } else {
      results.gmail_live = { status: 'not_configured' };
    }
  } catch (err) {
    results.gmail_live = { status: 'error', error: String(err).substring(0, 200) };
  }

  return NextResponse.json(results);
}
