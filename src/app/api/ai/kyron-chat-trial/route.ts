import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { PROMPTS } from '@/ai/prompts';
import { generateTextWithFallback } from '@/ai/providers';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const TRIAL_MAX_MESSAGES = 3;

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

async function checkTrialLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const defaultReset = Date.now() + 24 * 60 * 60 * 1000;

  try {
    await query(`DELETE FROM trial_chat_usage WHERE expires_at < NOW()`);
  } catch {}

  let existing: any;
  try {
    existing = await query(
      `SELECT message_count, expires_at FROM trial_chat_usage WHERE ip_address = $1 AND expires_at > NOW()`,
      [ip]
    );
  } catch {
    return { allowed: true, remaining: TRIAL_MAX_MESSAGES - 1, resetAt: defaultReset };
  }

  if (!existing?.rows?.length) {
    try {
      const res = await query(
        `INSERT INTO trial_chat_usage (ip_address, message_count, first_used_at, last_used_at, expires_at)
         VALUES ($1, 1, NOW(), NOW(), NOW() + INTERVAL '24 hours')
         ON CONFLICT (ip_address) DO UPDATE SET message_count = trial_chat_usage.message_count + 1, last_used_at = NOW()
         RETURNING expires_at, message_count`,
        [ip]
      );
      const expiresAt = res?.rows?.[0]?.expires_at ? new Date(res.rows[0].expires_at).getTime() : defaultReset;
      return { allowed: true, remaining: TRIAL_MAX_MESSAGES - 1, resetAt: expiresAt };
    } catch {
      return { allowed: true, remaining: TRIAL_MAX_MESSAGES - 1, resetAt: defaultReset };
    }
  }

  const row = existing.rows[0];
  const currentCount = row.message_count ?? 0;
  const expiresAt = row.expires_at ? new Date(row.expires_at).getTime() : defaultReset;

  if (currentCount >= TRIAL_MAX_MESSAGES) {
    return { allowed: false, remaining: 0, resetAt: expiresAt };
  }

  try {
    await query(
      `UPDATE trial_chat_usage SET message_count = message_count + 1, last_used_at = NOW() WHERE ip_address = $1 AND expires_at > NOW()`,
      [ip]
    );
  } catch {}

  return { allowed: true, remaining: TRIAL_MAX_MESSAGES - (currentCount + 1), resetAt: expiresAt };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const { allowed, remaining, resetAt } = await checkTrialLimit(ip);

    if (!allowed) {
      return Response.json(
        { error: 'Límite de prueba alcanzado', limitReached: true, resetAt },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message } = body as { message: string };

    if (!message?.trim()) {
      return Response.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const startTime = Date.now();

    const text = await generateTextWithFallback(
      ['gemini', 'deepseek'],
      { system: PROMPTS.KYRON_TRIAL, prompt: message.substring(0, 500), maxTokens: 300, temperature: 0.7 },
      'kyron-chat-trial'
    );

    const responseTime = Date.now() - startTime;
    return Response.json({ text, remaining, responseTime });
  } catch (err) {
    console.error('[kyron-chat-trial]', err);
    return Response.json({ error: 'Error procesando tu consulta. Intenta de nuevo.' }, { status: 500 });
  }
}
