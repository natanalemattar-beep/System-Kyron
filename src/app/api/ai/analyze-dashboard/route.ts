import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { module, data, context } = body;

    if (!data) {
      return NextResponse.json({ error: 'Datos requeridos para el análisis' }, { status: 400 });
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
${JSON.stringify(data, null, 2)}

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
