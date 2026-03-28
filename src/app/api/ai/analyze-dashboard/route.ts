import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSession } from '@/lib/auth';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:dashboard:${session.userId}`, 20, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const body = await req.json();
    const { module, data, context } = body;

    if (!data) {
      return NextResponse.json({ error: 'Datos requeridos para el análisis' }, { status: 400 });
    }

    const dataStr = JSON.stringify(data);
    if (dataStr.length > 50000) {
      return NextResponse.json({ error: 'Datos demasiado grandes para análisis' }, { status: 400 });
    }

    const systemPrompt = `Eres un analista financiero y de negocios experto para empresas venezolanas.
Analiza los datos del dashboard y proporciona:
1. Un resumen ejecutivo en 2-3 líneas
2. Los 3 puntos más críticos o destacados
3. Recomendaciones accionables
4. Alertas o riesgos importantes

Responde siempre en español, de forma concisa y profesional.
Usa emojis estratégicamente para resaltar puntos importantes.
Cita cifras específicas cuando estén disponibles.
Considera el contexto económico venezolano (inflación, tipo de cambio BCV, normativa SENIAT).`;

    const userMessage = `Módulo: ${module || 'Dashboard General'}
${context ? `Contexto adicional: ${context}` : ''}

Datos del dashboard:
${dataStr}

Por favor analiza estos datos y proporciona insights accionables.`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_completion_tokens: 1024,
    });

    const analysis = response.choices[0]?.message?.content ?? 'No se pudo generar el análisis.';
    return NextResponse.json({ analysis, module: module || 'Dashboard General' });
  } catch (err) {
    console.error('[analyze-dashboard] error:', err);
    return NextResponse.json({ error: 'Error al procesar el análisis con IA' }, { status: 500 });
  }
}
