import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function aiKeyInfo(integrationKey: string | undefined, integrationBaseUrl: string | undefined, directKey: string | undefined) {
  const useIntegration = !!(integrationKey && integrationBaseUrl);
  if (useIntegration) return { key_present: true, source: 'replit_integration' };
  if (integrationKey && !integrationBaseUrl) return { key_present: true, source: 'replit_integration_misconfigured' };
  if (directKey) return { key_present: true, source: 'direct_env_var' };
  return { key_present: false, source: 'none' };
}

export async function GET() {
  const results: Record<string, unknown> = {};

  results.gemini = aiKeyInfo(process.env.AI_INTEGRATIONS_GEMINI_API_KEY, process.env.AI_INTEGRATIONS_GEMINI_BASE_URL, process.env.GEMINI_API_KEY);
  
  results.gmail = {
    smtp_user: !!process.env.GMAIL_USER,
    smtp_password: !!process.env.GMAIL_APP_PASSWORD,
    method: 'nodemailer_smtp',
  };

  let geminiStatus = 'unknown';
  try {
    const { geminiGenerateText } = await import('@/ai/gemini');
    const resp = await geminiGenerateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 256 });
    geminiStatus = resp ? 'connected' : 'empty_response';
    results.gemini_live = { status: geminiStatus };
  } catch (err) {
    geminiStatus = 'error';
    results.gemini_live = { status: geminiStatus, error: String(err).substring(0, 200) };
  }

  let gmailStatus = 'unknown';
  try {
    const { getSmtpTransporter, getGmailSenderAddress } = await import('@/lib/gmail-client');
    const transporter = getSmtpTransporter();
    const sender = await getGmailSenderAddress();
    await transporter.verify();
    gmailStatus = 'connected';
    results.gmail_live = { status: gmailStatus, sender, method: 'smtp' };
  } catch (err) {
    gmailStatus = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD ? 'configured_but_verify_failed' : 'not_configured';
    results.gmail_live = { status: gmailStatus, error: String(err).substring(0, 200) };
  }

  return NextResponse.json(results);
}
