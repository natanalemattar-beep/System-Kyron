import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';

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

    const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        content: 'El asistente IA no está disponible en este momento. Contacta al administrador para configurar el servicio.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
        ? { apiVersion: '', baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL }
        : undefined,
    });

    const systemContext = `Eres un experto fiscal venezolano especializado en el Código Orgánico Tributario (COT), 
la Gaceta Oficial N° 6.952, normativas SENIAT, IVA, ISLR, IGTF, VEN-NIF y legislación tributaria venezolana.
Responde SIEMPRE en español, de forma clara, precisa y profesional.
Cita artículos y leyes específicas cuando sea relevante.
No inventes normativas ni cifras que no sean reales.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemContext}\n\nConsulta del usuario: ${sanitizedPrompt}` }] },
      ],
      config: { maxOutputTokens: 2048, thinkingConfig: { thinkingBudget: 0 } },
    });

    const content = response.text ?? 'No pude procesar la consulta. Intenta de nuevo.';
    return NextResponse.json({ content });
  } catch (err) {
    console.error('[fiscal-chat] error:', err);
    return NextResponse.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
