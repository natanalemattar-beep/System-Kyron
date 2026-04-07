import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { geminiGenerateText } from '@/ai/gemini';
import { openaiGenerateText } from '@/ai/openai';
import { deepseekGenerateText } from '@/ai/deepseek';

export const dynamic = 'force-dynamic';

const MASTER_KEY = process.env.KYRON_MAIL_AI_KEY || 'Carlos0507..';

const SYSTEM_PROMPT = `Eres el asistente de comunicaciones de System Kyron, una plataforma de inteligencia corporativa en Venezuela.

Tu trabajo es interpretar instrucciones del CEO para redactar correos profesionales.

SIEMPRE responde con un JSON válido con esta estructura EXACTA:
{
  "to": ["correo@ejemplo.com"],
  "nombre": "Nombre del destinatario si se menciona o null",
  "subject": "Asunto profesional del correo",
  "message": "Cuerpo del correo redactado profesionalmente en español",
  "sender": "auto" | "gmail" | "outlook",
  "template": "personalizado" | "bienvenida" | "notificacion" | "facturacion" | "soporte" | "comercial" | "seguridad"
}

Reglas:
- Redacta correos formales, profesionales y elegantes en nombre de System Kyron
- Si no se especifica correo, pon ["pendiente@definir.com"] y en el message indica que falta el correo
- Si el CEO dice "desde gmail" usa sender "gmail", si dice "desde outlook" usa sender "outlook", si no dice nada usa "auto"
- Elige la plantilla que mejor se ajuste al contexto
- El mensaje debe ser completo, sin placeholders, listo para enviar
- Incluye saludo, cuerpo y despedida profesional
- No uses markdown en el message, solo texto plano con saltos de línea
- Firma siempre como "Equipo System Kyron" o "Dirección de [departamento relevante]"
- SOLO devuelve el JSON, nada más`;

interface DraftResult {
  to: string[];
  nombre: string | null;
  subject: string;
  message: string;
  sender: string;
  template: string;
}

function parseAIDraft(raw: string): DraftResult {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');
  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.subject || !parsed.message) throw new Error('Missing required fields');
  return {
    to: Array.isArray(parsed.to) ? parsed.to : [parsed.to || 'pendiente@definir.com'],
    nombre: parsed.nombre || null,
    subject: parsed.subject,
    message: parsed.message,
    sender: parsed.sender || 'auto',
    template: parsed.template || 'personalizado',
  };
}

type GenerateFn = () => Promise<string>;

async function tryProvider(name: string, fn: GenerateFn, errors: string[]): Promise<DraftResult | null> {
  try {
    const raw = await fn();
    return parseAIDraft(raw);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`${name}: ${msg.substring(0, 100)}`);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`kyron-mail-ai:${ip}`, 20, 60 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const { key, prompt } = await req.json();

    if (key !== MASTER_KEY) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json({ error: 'Prompt demasiado corto' }, { status: 400 });
    }

    const opts = { system: SYSTEM_PROMPT, prompt: prompt.trim(), maxTokens: 1500, temperature: 0.7 };
    const errors: string[] = [];

    const providers: [string, GenerateFn][] = [
      ['Gemini', () => geminiGenerateText(opts)],
      ['DeepSeek', () => deepseekGenerateText(opts)],
      ['OpenAI', () => openaiGenerateText(opts)],
      ['Claude', async () => {
        const { generateText } = await import('@/ai/anthropic');
        return generateText(opts);
      }],
    ];

    for (const [name, fn] of providers) {
      const draft = await tryProvider(name, fn, errors);
      if (draft) {
        return NextResponse.json({ success: true, draft });
      }
    }

    console.error('[kyron-mail-ai] All providers failed:', errors.join(' | '));
    return NextResponse.json({ error: 'Ningún proveedor de IA disponible' }, { status: 503 });
  } catch (err) {
    console.error('[kyron-mail-ai] Error:', err);
    return NextResponse.json({ error: 'Error generando el correo' }, { status: 500 });
  }
}
