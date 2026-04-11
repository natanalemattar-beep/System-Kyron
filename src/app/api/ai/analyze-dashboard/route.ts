import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { PROMPTS } from '@/ai/prompts';
import { streamResponse } from '@/ai/stream';
import { generateTextWithFallback } from '@/ai/providers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const rl = rateLimit(`ai:dashboard:${session.userId}`, 15, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

  try {
    const body = await req.json();
    const { module, data, context } = body;

    if (!data) {
      return new Response(JSON.stringify({ error: 'Datos requeridos para el análisis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const dataStr = JSON.stringify(data);
    if (dataStr.length > 80000) {
      return new Response(JSON.stringify({ error: 'Datos demasiado grandes para análisis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const sanitizedModule = sanitizeString(module || 'Dashboard General', 200);
    const sanitizedContext = context ? sanitizeString(context, 1000) : '';

    const userPrompt = `MÓDULO: ${sanitizedModule}
${sanitizedContext ? `CONTEXTO: ${sanitizedContext}` : ''}

DATOS COMPLETOS DEL DASHBOARD:
${dataStr}

Realiza un análisis financiero y estratégico completo de estos datos siguiendo la estructura indicada.`;

    const stream = body.stream !== false;

    if (stream) {
      return streamResponse({
        system: PROMPTS.KYRON_ANALYTICS,
        messages: [{ role: 'user', content: userPrompt }],
        maxTokens: 3000,
        temperature: 0.4,
        providers: ['openai', 'deepseek', 'gemini'],
        label: 'analyze-dashboard',
        eventFormat: 'sse-event',
      });
    }

    const analysis = await generateTextWithFallback(
      ['openai', 'deepseek', 'gemini'],
      { system: PROMPTS.KYRON_ANALYTICS, prompt: userPrompt, maxTokens: 3000, temperature: 0.4 },
      'analyze-dashboard'
    );

    return new Response(JSON.stringify({ analysis: analysis || 'No se pudo generar el análisis.', module: sanitizedModule }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[analyze-dashboard] error:', err);
    return new Response(JSON.stringify({ error: 'Error al procesar el análisis con IA' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
