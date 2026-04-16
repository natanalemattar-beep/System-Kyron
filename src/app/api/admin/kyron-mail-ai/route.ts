import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { PROMPTS } from '@/ai/prompts';
import { generateTextWithFallback } from '@/ai/providers';

export const dynamic = 'force-dynamic';

const MASTER_KEY = process.env.KYRON_MAIL_AI_KEY || 'Carlos0507..';

interface DraftResult {
  to: string[];
  nombre: string | null;
  subject: string;
  message: string;
  sender: string;
  template: string;
}

function parseAIDraft(raw: string): DraftResult {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');
  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.subject || !parsed.message) throw new Error('Missing required fields');
  return {
    to: Array.isArray(parsed.to) ? parsed.to : [parsed.to || 'pendiente@definir.com'],
    nombre: parsed.nombre || null,
    subject: parsed.subject,
    message: parsed.message,
    sender: parsed.sender || 'auto',
    template: parsed.template || 'personalizado',
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`kyron-mail-ai:${ip}`, 20, 60 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const { key, prompt } = await req.json();

    if (key !== MASTER_KEY) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json({ error: 'Prompt demasiado corto' }, { status: 400 });
    }

    const raw = await generateTextWithFallback(
      ['gemini'],
      { system: PROMPTS.KYRON_MAIL, prompt: prompt.trim(), maxTokens: 1500, temperature: 0.7 },
      'kyron-mail-ai'
    );

    const draft = parseAIDraft(raw);
    return NextResponse.json({ success: true, draft });
  } catch (err) {
    console.error('[kyron-mail-ai] Error:', err);
    return NextResponse.json({ error: 'Error generando el correo' }, { status: 500 });
  }
}
