import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { generateText } from '@/ai/anthropic';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:fiscal:${session.userId}`, 30, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const sanitizedPrompt = sanitizeString(prompt, 4000);

    const content = await generateText({
      system: `Eres un experto fiscal venezolano especializado en el Código Orgánico Tributario (COT), 
la Gaceta Oficial N° 6.952, normativas SENIAT, IVA, ISLR, IGTF, VEN-NIF y legislación tributaria venezolana.
Responde SIEMPRE en español, de forma clara, precisa y profesional.
Cita artículos y leyes específicas cuando sea relevante.
No inventes normativas ni cifras que no sean reales.`,
      prompt: sanitizedPrompt,
      maxTokens: 2048,
    });

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
