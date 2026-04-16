import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { PROMPTS } from '@/ai/prompts';
import { streamResponse } from '@/ai/stream';
import { generateTextWithFallback } from '@/ai/providers';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:fiscal:${session.userId}`, 30, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const body = await req.json();
    const { prompt, messages: chatHistory } = body as {
      prompt?: string;
      messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      const trimmedHistory = chatHistory.slice(-12).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: sanitizeString(m.content, 2000),
      }));

      return streamResponse({
        system: PROMPTS.KYRON_FISCAL,
        messages: trimmedHistory,
        maxTokens: 8192,
        temperature: 0.6,
        providers: ['gemini'],
        label: 'fiscal-chat',
      });
    }

    if (!prompt) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const content = await generateTextWithFallback(
      ['gemini'],
      { system: PROMPTS.KYRON_FISCAL, prompt: sanitizeString(prompt, 4000), maxTokens: 8192 },
      'fiscal-chat'
    );

    return NextResponse.json({ content: content || 'No pude procesar la consulta. Intenta de nuevo.' });
  } catch (err) {
    console.error('[fiscal-chat] error:', err);
    const msg = String(err);
    if (msg.includes('not configured')) {
      return NextResponse.json({
        content: 'El asistente IA no está disponible en este momento. Contacta al administrador para configurar el servicio.',
      });
    }
    return NextResponse.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
