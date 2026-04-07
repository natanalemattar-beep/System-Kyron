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

  results.anthropic = aiKeyInfo(process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY, process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL, process.env.ANTHROPIC_API_KEY);
  results.gemini = aiKeyInfo(process.env.AI_INTEGRATIONS_GEMINI_API_KEY, process.env.AI_INTEGRATIONS_GEMINI_BASE_URL, process.env.GEMINI_API_KEY);
  results.openai = aiKeyInfo(process.env.AI_INTEGRATIONS_OPENAI_API_KEY, process.env.AI_INTEGRATIONS_OPENAI_BASE_URL, process.env.OPENAI_API_KEY);

  results.deepseek = {
    key_present: !!process.env.DEEPSEEK_API_KEY,
    source: process.env.DEEPSEEK_API_KEY ? 'direct_env_var' : 'none',
  };

  results.gmail = {
    smtp_user: !!process.env.GMAIL_USER,
    smtp_password: !!process.env.GMAIL_APP_PASSWORD,
    method: 'nodemailer_smtp',
  };

  let claudeStatus = 'unknown';
  try {
    const { generateText } = await import('@/ai/anthropic');
    const resp = await generateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 5 });
    claudeStatus = resp ? 'connected' : 'empty_response';
    results.claude_live = { status: claudeStatus };
  } catch (err) {
    claudeStatus = 'error';
    results.claude_live = { status: claudeStatus, error: String(err).substring(0, 200) };
  }

  let deepseekStatus = 'unknown';
  try {
    const { deepseekGenerateText } = await import('@/ai/deepseek');
    const resp = await deepseekGenerateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 5 });
    deepseekStatus = resp ? 'connected' : 'empty_response';
    results.deepseek_live = { status: deepseekStatus };
  } catch (err) {
    deepseekStatus = 'error';
    results.deepseek_live = { status: deepseekStatus, error: String(err).substring(0, 200) };
  }

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

  let openaiStatus = 'unknown';
  try {
    const { openaiGenerateText } = await import('@/ai/openai');
    const resp = await openaiGenerateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 5 });
    openaiStatus = resp ? 'connected' : 'empty_response';
    results.openai_live = { status: openaiStatus };
  } catch (err) {
    openaiStatus = 'error';
    results.openai_live = { status: openaiStatus, error: String(err).substring(0, 200) };
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
