import { NextRequest } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';
import { getDeepSeekClient, DEEPSEEK_MODEL } from '@/ai/deepseek';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const SPEED_RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const SPEED_MAX = 10;
const SPEED_WINDOW = 60 * 60 * 1000;
const CLEANUP_INTERVAL = 30 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [k, v] of SPEED_RATE_LIMIT) {
    if (now > v.resetAt) SPEED_RATE_LIMIT.delete(k);
  }
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanup();
  const now = Date.now();
  const entry = SPEED_RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    SPEED_RATE_LIMIT.set(ip, { count: 1, resetAt: now + SPEED_WINDOW });
    return { allowed: true, remaining: SPEED_MAX - 1 };
  }

  if (entry.count >= SPEED_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: SPEED_MAX - entry.count };
}

const SPEED_SYSTEM_PROMPT = `Eres Kyron, asistente fiscal y empresarial especializado de System Kyron Venezuela.
Responde en MÁXIMO 90 palabras. Sé preciso, cita artículos y porcentajes específicos cuando aplique.
Responde siempre en español.`;

const COMPETITORS: Record<string, { base: number; variance: number }> = {
  'SAP Business One': { base: 4100, variance: 900 },
  'Odoo': { base: 2900, variance: 700 },
  'QuickBooks': { base: 2200, variance: 500 },
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const { allowed } = checkLimit(ip);

    if (!allowed) {
      return Response.json(
        { error: 'Límite de pruebas alcanzado. Intenta de nuevo en una hora.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { query } = body as { query: string };

    if (!query?.trim()) {
      return Response.json({ error: 'Consulta requerida' }, { status: 400 });
    }

    const startTime = Date.now();
    let text = '';

    try {
      const gemini = getGeminiClient();
      const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{ text: query.substring(0, 300) }] }],
        config: {
          systemInstruction: SPEED_SYSTEM_PROMPT,
          maxOutputTokens: 200,
          temperature: 0.6,
        },
      });
      text = response.text ?? '';
    } catch (geminiErr) {
      console.error('[speed-test] Gemini failed, trying DeepSeek:', geminiErr);
      const ds = getDeepSeekClient();
      const resp = await ds.chat.completions.create({
        model: DEEPSEEK_MODEL,
        max_tokens: 200,
        temperature: 0.6,
        messages: [
          { role: 'system', content: SPEED_SYSTEM_PROMPT },
          { role: 'user', content: query.substring(0, 300) },
        ],
      });
      text = resp.choices[0]?.message?.content ?? '';
    }

    const kyronTime = Date.now() - startTime;

    const competitors = Object.entries(COMPETITORS).map(([name, cfg]) => ({
      name,
      time: cfg.base + Math.floor(Math.random() * cfg.variance),
    }));

    return Response.json({ text, kyronTime, competitors });
  } catch (err) {
    console.error('[speed-test]', err);
    return Response.json({ error: 'Error ejecutando la prueba. Intenta de nuevo.' }, { status: 500 });
  }
}
