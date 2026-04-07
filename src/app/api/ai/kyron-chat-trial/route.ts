import { NextRequest } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const TRIAL_RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const TRIAL_MAX_MESSAGES = 3;
const TRIAL_WINDOW = 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL = 30 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [k, v] of TRIAL_RATE_LIMIT) {
    if (now > v.resetAt) TRIAL_RATE_LIMIT.delete(k);
  }
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkTrialLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  cleanup();
  const now = Date.now();
  const entry = TRIAL_RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    TRIAL_RATE_LIMIT.set(ip, { count: 1, resetAt: now + TRIAL_WINDOW });
    return { allowed: true, remaining: TRIAL_MAX_MESSAGES - 1, resetAt: now + TRIAL_WINDOW };
  }

  if (entry.count >= TRIAL_MAX_MESSAGES) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: TRIAL_MAX_MESSAGES - entry.count, resetAt: entry.resetAt };
}

const TRIAL_SYSTEM_PROMPT = `Eres Kyron, el asistente inteligente de System Kyron — la plataforma empresarial número uno de Venezuela especializada en contabilidad VEN-NIF, SENIAT, LOTTT, BCV y cumplimiento legal venezolano.

RESTRICCIONES DE DEMOSTRACIÓN:
- Responde en MÁXIMO 120 palabras
- Sé directo, preciso y útil
- Demuestra tu expertise con cifras y referencias legales concretas
- Responde siempre en español
- Termina SIEMPRE con esta línea exacta en nueva línea: "💡 Regístrate en System Kyron para consultas ilimitadas y acceso completo al ecosistema."

CONOCIMIENTO CLAVE:
- IVA: alícuota general 16%, reducida 8%, exenta. Retención: 75% contribuyentes especiales, 100% ordinarios
- IGTF: 3% transacciones en divisas y criptoactivos
- ISLR: tarifas progresivas 6%-34% personas jurídicas
- LOTTT: prestaciones Art.142, vacaciones Art.190-192, utilidades Art.131-132
- IVSS, INCES (2%), BANAVIH/FAOV (2%+1%)
- BCV: tasa de cambio oficial`;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const { allowed, remaining, resetAt } = checkTrialLimit(ip);

    if (!allowed) {
      return Response.json(
        { error: 'Límite de prueba alcanzado', limitReached: true, resetAt },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message } = body as { message: string };

    if (!message?.trim()) {
      return Response.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const gemini = getGeminiClient();
    const startTime = Date.now();

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{ text: message.substring(0, 500) }] }],
      config: {
        systemInstruction: TRIAL_SYSTEM_PROMPT,
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    const responseTime = Date.now() - startTime;
    const text = response.text ?? '';

    return Response.json({ text, remaining, responseTime });
  } catch (err) {
    console.error('[kyron-chat-trial]', err);
    return Response.json({ error: 'Error procesando tu consulta. Intenta de nuevo.' }, { status: 500 });
  }
}
