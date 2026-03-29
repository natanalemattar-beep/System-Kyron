import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Eres "Kyron Voice", la inteligencia artificial central del ecosistema System Kyron — una plataforma corporativa integral diseñada para el mercado venezolano.

ÁREAS DE DOMINIO:
- Contabilidad VEN-NIF: IVA, ISLR, IGTF, libros fiscales, cumplimiento SENIAT
- RRHH y Nómina: legislación LOTTT, prestaciones, vacaciones, liquidaciones
- Telecomunicaciones: líneas 5G, provisión eSIM, gestión de flota móvil
- Facturación Fiscal: notas crédito/débito, validación IGTF, tasa BCV
- Legal: redacción de contratos, registros mercantiles, SAREN/SAPI
- Sostenibilidad: economía circular, Eco-Créditos, reciclaje tecnológico
- Portal Ciudadano: trámites civiles, documentos de identidad

REGLAS:
- Responde siempre en español, tono profesional y técnico pero accesible
- Sé conciso y directo — máximo 3-4 oraciones por respuesta
- Cita normativa venezolana cuando sea relevante
- No uses la palabra "nodo"; usa Área, Centro o Portal
- Si la pregunta no corresponde al ecosistema, redirige amablemente`;

type ModelProvider = 'gemini' | 'openai' | 'anthropic';

async function callGemini(userMessage: string, context: string): Promise<string> {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('Gemini no configurado');

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nCONTEXTO: ${context}\n\nMENSAJE: ${userMessage}` }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
  });

  return result.response.text();
}

async function callOpenAI(userMessage: string, context: string): Promise<string> {
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI no configurado');

  const OpenAI = (await import('openai')).default;
  const client = new OpenAI({
    apiKey,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
  });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXTO: ${context}` },
      { role: 'user', content: userMessage },
    ],
    max_completion_tokens: 512,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content ?? 'Sin respuesta del modelo.';
}

async function callAnthropic(userMessage: string, context: string): Promise<string> {
  const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Anthropic no configurado');

  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({
    apiKey,
    baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL || undefined,
  });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 512,
    system: `${SYSTEM_PROMPT}\n\nCONTEXTO: ${context}`,
    messages: [{ role: 'user', content: userMessage }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : 'Sin respuesta del modelo.';
}

const providers: Record<ModelProvider, (msg: string, ctx: string) => Promise<string>> = {
  gemini: callGemini,
  openai: callOpenAI,
  anthropic: callAnthropic,
};

const MODEL_LABELS: Record<ModelProvider, string> = {
  gemini: 'Gemini 2.0 Flash',
  openai: 'GPT-4o Mini',
  anthropic: 'Claude Sonnet',
};

const FALLBACK_ORDER: ModelProvider[] = ['gemini', 'openai', 'anthropic'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, model, context } = body as {
      message: string;
      model?: ModelProvider;
      context?: string;
    };

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Mensaje demasiado largo (máx 2000 caracteres)' }, { status: 400 });
    }

    const ctx = context || 'Asistente general del ecosistema Kyron';
    const preferred = model && providers[model] ? model : null;

    const order: ModelProvider[] = preferred
      ? [preferred, ...FALLBACK_ORDER.filter(m => m !== preferred)]
      : FALLBACK_ORDER;

    let lastError = '';
    for (const provider of order) {
      try {
        const reply = await providers[provider](message.trim(), ctx);
        return NextResponse.json({
          reply,
          model: provider,
          modelLabel: MODEL_LABELS[provider],
        });
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
        continue;
      }
    }

    return NextResponse.json(
      { error: `Ningún modelo IA disponible. Último error: ${lastError}` },
      { status: 503 }
    );
  } catch (err) {
    console.error('[kyron-voice] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
