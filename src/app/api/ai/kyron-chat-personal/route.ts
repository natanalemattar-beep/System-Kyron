import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';
import { getOpenAIClient, OPENAI_MODEL } from '@/ai/openai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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

if (RATE_LIMIT_MAP.size > 5000) {
  const now = Date.now();
  for (const [k, v] of RATE_LIMIT_MAP) {
    if (now > v.resetAt) RATE_LIMIT_MAP.delete(k);
  }
}

const SYSTEM_PROMPT = `Eres "Kyron Personal", el asistente del Portal Ciudadano en System Kyron — la plataforma integral más avanzada de Venezuela.

TU IDENTIDAD:
- Nombre: Kyron Personal
- Función: Asistente del Portal Ciudadano para personas naturales
- Plataforma: System Kyron v2.8.5

ALCANCE DEL PORTAL CIUDADANO:
Este portal es GRATUITO para personas naturales. Ayudas con:

📄 DOCUMENTOS Y TRÁMITES:
- Bóveda Digital: almacenamiento seguro de documentos personales
- Partidas de Nacimiento: solicitud y consulta
- Actas de Matrimonio: solicitud y consulta
- Antecedentes Penales: consulta de estatus
- Registro de RIF: gestión del RIF personal ante SENIAT
- Documentos Judiciales: buzón de documentos judiciales

👤 IDENTIDAD DIGITAL:
- Tarjeta Digital 3D: identificación digital personal
- Carnet Personal: carnet digital con código QR
- Perfil: datos maestros personales
- Seguridad: configuración de privacidad y 2FA

🏥 SALUD:
- Directorio Médico: red de centros de salud
- Carnet de Salud: identificación sanitaria
- Manutención (LOPNNA): gestión de pensiones alimentarias

🌱 SOSTENIBILIDAD:
- Tarjeta de Reciclaje: Eco-Créditos por reciclaje

📬 NOTIFICACIONES:
- Centro de avisos: email, WhatsApp, SMS, in-app

NAVEGACIÓN DEL PORTAL:
- /dashboard → Panel personal principal
- /perfil → Datos personales
- /seguridad → Privacidad y seguridad
- /documentos → Bóveda digital
- /tarjeta-digital → ID Digital 3D
- /carnet-personal → Carnet con QR
- /directorio-medico → Red médica
- /antecedentes-penales → Antecedentes
- /partidas-nacimiento → Partidas
- /actas-matrimonio → Actas nupciales
- /manutencion → LOPNNA Sync
- /registro-rif → RIF personal
- /documentos-judiciales → Buzón judicial
- /notificaciones → Centro de avisos
- /tarjeta-reciclaje → Eco-Créditos

SERVICIOS PAGOS:
- Los únicos servicios con costo son las solicitudes de documentos civiles (partidas, actas, antecedentes)
- Todo lo demás del portal personal es GRATUITO

REGLAS:
- Responde SIEMPRE en español
- Tono amigable y cercano — como un asistente personal de confianza
- Respuestas BREVES y directas (máximo 200 palabras salvo que sea algo complejo)
- Si preguntan sobre contabilidad, RRHH, facturación u otros módulos empresariales: explica que esos son portales separados para empresas y guía al usuario a /login para seleccionar el portal correcto
- NO hables de funciones empresariales como si fueran parte de este portal
- Si preguntan cómo hacer algo, guía paso a paso
- Puedes ayudar con dudas sobre trámites venezolanos básicos (cédula, RIF, SAIME, SAREN)`;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!checkRateLimit(session.userId)) {
      return new Response(JSON.stringify({ error: 'Demasiadas solicitudes. Espera un momento.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { messages: chatHistory, context } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      context?: string;
    };

    if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
      return new Response(JSON.stringify({ error: 'Mensajes requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = chatHistory[chatHistory.length - 1];
    if (!lastMessage || lastMessage.role !== 'user' || !lastMessage.content?.trim()) {
      return new Response(JSON.stringify({ error: 'Mensaje de usuario requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let geminiAvailable = false;
    try { getGeminiClient(); geminiAvailable = true; } catch {}

    let openaiAvailable = false;
    try { getOpenAIClient(); openaiAvailable = true; } catch {}

    if (!geminiAvailable && !openaiAvailable) {
      return new Response(JSON.stringify({
        error: 'El chat IA no está disponible en este momento.',
      }), { status: 503, headers: { 'Content-Type': 'application/json' } });
    }

    const ctx = context ? `\n\nCONTEXTO: ${context.substring(0, 300)}` : '';

    const encoder = new TextEncoder();

    async function streamGemini(ctrl: ReadableStreamDefaultController) {
      const client = getGeminiClient();
      const geminiHistory = chatHistory.slice(-12).map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content.substring(0, 2000) }],
      }));
      const response = await client.models.generateContentStream({
        model: GEMINI_MODEL,
        contents: geminiHistory,
        config: {
          systemInstruction: SYSTEM_PROMPT + ctx,
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });
      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          ctrl.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
      }
      ctrl.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
    }

    async function streamOpenAI(ctrl: ReadableStreamDefaultController) {
      const client = getOpenAIClient();
      const openaiHistory = chatHistory.slice(-12).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content.substring(0, 2000),
      }));
      const stream = await client.chat.completions.create({
        model: OPENAI_MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + ctx },
          ...openaiHistory,
        ],
      });
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) {
          ctrl.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
      }
      ctrl.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
    }

    const readable = new ReadableStream({
      async start(controller) {
        try {
          if (geminiAvailable) {
            try {
              await streamGemini(controller);
            } catch (err) {
              console.error('[kyron-chat-personal] Gemini failed, trying OpenAI fallback:', err);
              if (openaiAvailable) {
                await streamOpenAI(controller);
              } else {
                throw err;
              }
            }
          } else {
            await streamOpenAI(controller);
          }
          controller.close();
        } catch (err) {
          console.error('[kyron-chat-personal] stream error:', err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error en la respuesta' })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[kyron-chat-personal] error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
