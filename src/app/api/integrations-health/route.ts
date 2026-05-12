import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function aiKeyInfo(directKey: string | undefined) {
  if (directKey) return { key_present: true, source: 'env_var' };
  return { key_present: false, source: 'none' };
}

export async function GET() {
  const results: Record<string, unknown> = {};

  results.gemini = aiKeyInfo(process.env.GEMINI_API_KEY);
  results.openai = aiKeyInfo(process.env.OPENAI_API_KEY);
  results.anthropic = aiKeyInfo(process.env.ANTHROPIC_API_KEY);
  
  results.gmail = {
    smtp_user: !!process.env.GMAIL_USER,
    smtp_password: !!process.env.GMAIL_APP_PASSWORD,
    method: 'nodemailer_smtp',
  };

  // Live checks
  try {
    const { geminiGenerateText } = await import('@/ai/gemini');
    if (process.env.GEMINI_API_KEY) {
      const resp = await geminiGenerateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 256 });
      results.gemini_live = { status: resp ? 'connected' : 'empty_response' };
    } else {
      results.gemini_live = { status: 'not_configured' };
    }
  } catch (err) {
    results.gemini_live = { status: 'error', error: String(err).substring(0, 200) };
  }

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
