import { NextRequest } from 'next/server';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';
import { getDeepSeekClient, DEEPSEEK_MODEL } from '@/ai/deepseek';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const TRIAL_MAX_MESSAGES = 3;

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

async function checkTrialLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();

  await query(`DELETE FROM trial_chat_usage WHERE expires_at < NOW()`);

  const existing = await query(
    `SELECT message_count, expires_at FROM trial_chat_usage WHERE ip_address = $1 AND expires_at > NOW()`,
    [ip]
  );

  if (existing.rows.length === 0) {
    const res = await query(
      `INSERT INTO trial_chat_usage (ip_address, message_count, first_used_at, last_used_at, expires_at)
       VALUES ($1, 1, NOW(), NOW(), NOW() + INTERVAL '24 hours')
       RETURNING expires_at`,
      [ip]
    );
    const expiresAt = new Date(res.rows[0].expires_at).getTime();
    return { allowed: true, remaining: TRIAL_MAX_MESSAGES - 1, resetAt: expiresAt };
  }

  const row = existing.rows[0];
  const currentCount = row.message_count;
  const expiresAt = new Date(row.expires_at).getTime();

  if (currentCount >= TRIAL_MAX_MESSAGES) {
    return { allowed: false, remaining: 0, resetAt: expiresAt };
  }

  await query(
    `UPDATE trial_chat_usage SET message_count = message_count + 1, last_used_at = NOW() WHERE ip_address = $1 AND expires_at > NOW()`,
    [ip]
  );

  return { allowed: true, remaining: TRIAL_MAX_MESSAGES - (currentCount + 1), resetAt: expiresAt };
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
    const { allowed, remaining, resetAt } = await checkTrialLimit(ip);

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

    const startTime = Date.now();
    let text = '';

    try {
      const gemini = getGeminiClient();
      const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{ text: message.substring(0, 500) }] }],
        config: {
          systemInstruction: TRIAL_SYSTEM_PROMPT,
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });
      text = response.text ?? '';
    } catch (geminiErr) {
      console.warn('[kyron-chat-trial] Gemini failed, trying DeepSeek fallback:', geminiErr);
      try {
        const deepseek = getDeepSeekClient();
        const response = await deepseek.chat.completions.create({
          model: DEEPSEEK_MODEL,
          max_tokens: 300,
          temperature: 0.7,
          messages: [
            { role: 'system', content: TRIAL_SYSTEM_PROMPT },
            { role: 'user', content: message.substring(0, 500) },
          ],
        });
        text = response.choices[0]?.message?.content ?? '';
      } catch (deepseekErr) {
        console.error('[kyron-chat-trial] DeepSeek also failed:', deepseekErr);
        throw deepseekErr;
      }
    }

    const responseTime = Date.now() - startTime;
    return Response.json({ text, remaining, responseTime });
  } catch (err) {
    console.error('[kyron-chat-trial]', err);
    return Response.json({ error: 'Error procesando tu consulta. Intenta de nuevo.' }, { status: 500 });
  }
}
