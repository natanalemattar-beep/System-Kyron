import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_MAP = new Map<number, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 60_000;

function checkRateLimit(userId: number): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(userId);
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

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

interface ModelResponse {
  model: ModelProvider;
  modelLabel: string;
  reply: string | null;
  error: string | null;
}

async function callGemini(userMessage: string, context: string): Promise<string> {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('Gemini no configurado');

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
      ? { apiVersion: '', baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL }
      : undefined,
  });

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nCONTEXTO: ${context}\n\nMENSAJE: ${userMessage}` }] }],
    config: { temperature: 0.7, maxOutputTokens: 2048, thinkingConfig: { thinkingBudget: 0 } },
  });

  return result.text ?? '';
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

const MODEL_LABELS: Record<ModelProvider, string> = {
  gemini: 'Gemini 2.5 Flash',
  openai: 'GPT-4o Mini',
  anthropic: 'Claude Sonnet',
};

const providers: Record<ModelProvider, (msg: string, ctx: string) => Promise<string>> = {
  gemini: callGemini,
  openai: callOpenAI,
  anthropic: callAnthropic,
};

const ALL_MODELS: ModelProvider[] = ['gemini', 'openai', 'anthropic'];

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (!checkRateLimit(session.userId)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes. Espera un momento.' }, { status: 429 });
    }

    const body = await req.json();
    const { message, context } = body as {
      message: string;
      context?: string;
    };

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Mensaje demasiado largo (máx 2000 caracteres)' }, { status: 400 });
    }

    const ctx = context || 'Asistente general del ecosistema Kyron';
    const trimmed = message.trim();

    const results = await Promise.allSettled(
      ALL_MODELS.map(async (model): Promise<ModelResponse> => {
        try {
          const reply = await providers[model](trimmed, ctx);
          return { model, modelLabel: MODEL_LABELS[model], reply, error: null };
        } catch (err) {
          return {
            model,
            modelLabel: MODEL_LABELS[model],
            reply: null,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      })
    );

    const responses: ModelResponse[] = results.map((r) =>
      r.status === 'fulfilled'
        ? r.value
        : { model: 'gemini' as ModelProvider, modelLabel: '', reply: null, error: 'Error inesperado' }
    );

    const anySuccess = responses.some((r) => r.reply !== null);

    if (!anySuccess) {
      return NextResponse.json(
        { error: 'Ningún modelo IA disponible.', responses },
        { status: 503 }
      );
    }

    return NextResponse.json({ responses });
  } catch (err) {
    console.error('[kyron-voice] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
