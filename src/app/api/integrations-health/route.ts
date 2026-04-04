import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, unknown> = {};

  results.anthropic = {
    key_present: !!(process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY),
    source: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY ? 'replit_integration' : (process.env.ANTHROPIC_API_KEY ? 'env_var' : 'none'),
  };

  results.gemini = {
    key_present: !!(process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
    source: process.env.AI_INTEGRATIONS_GEMINI_API_KEY ? 'replit_integration' : (process.env.GEMINI_API_KEY ? 'env_var' : 'none'),
  };

  results.openai = {
    key_present: !!(process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY),
    source: process.env.AI_INTEGRATIONS_OPENAI_API_KEY ? 'replit_integration' : (process.env.OPENAI_API_KEY ? 'env_var' : 'none'),
  };

  results.gmail_connector = {
    hostname_set: !!process.env.REPLIT_CONNECTORS_HOSTNAME,
    identity_set: !!(process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL),
  };

  let gmailStatus = 'unknown';
  try {
    const { getUncachableGmailClient, getGmailSenderAddress } = await import('@/lib/gmail-client');
    const gmail = await getUncachableGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    const sender = await getGmailSenderAddress();
    gmailStatus = 'connected';
    results.gmail_live = { status: gmailStatus, email: profile.data.emailAddress, sender };
  } catch (err) {
    gmailStatus = 'error';
    results.gmail_live = { status: gmailStatus, error: String(err).substring(0, 200) };
  }

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

  let geminiStatus = 'unknown';
  try {
    const { geminiGenerateText } = await import('@/ai/gemini');
    const resp = await geminiGenerateText({ system: 'Respond with exactly: OK', prompt: 'status check', maxTokens: 5 });
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

  return NextResponse.json(results);
}
