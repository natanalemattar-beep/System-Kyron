import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { geminiGenerateText } from '@/ai/gemini';
import { openaiGenerateText } from '@/ai/openai';
import { deepseekGenerateText } from '@/ai/deepseek';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';
import { getOpenAIClient, OPENAI_MODEL } from '@/ai/openai';
import { getDeepSeekClient, DEEPSEEK_MODEL } from '@/ai/deepseek';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const FISCAL_SYSTEM = `Eres "Kyron Fiscal", el asistente tributario especializado del ecosistema System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

ESPECIALIZACIÓN:
Experto en el Código Orgánico Tributario (COT), la Gaceta Oficial N° 6.952 (Decretos 5.196, 5.197, 5.198), normativas SENIAT, IVA (16% general, 8% reducida), ISLR (6%-34% PJ), IGTF (3%), VEN-NIF y legislación tributaria venezolana.

MÓDULOS FISCALES DE LA PLATAFORMA:
- Centro Contable Principal (Plan de cuentas VEN-NIF)
- Gestión Tributaria SENIAT
- Declaración IVA Forma 30
- Retenciones ISLR (ARC) según Decreto 1.808
- Libros de Compras y Ventas Fiscales
- Ajuste por Inflación Fiscal
- Trámites ante SENIAT
- Referencia Gaceta Oficial 6.952
- Estructura de Costos Empresariales

SISTEMA DE ALERTAS FISCALES:
- Las alertas regulatorias y fiscales se envían automáticamente por email
- Tipos de alerta: vencimiento de declaraciones, cambios normativos, umbrales fiscales superados
- El usuario puede configurar alertas en Configuración del Sistema

REGLAS:
- Responde SIEMPRE en español, de forma clara, precisa y profesional
- Cita artículos y leyes específicas cuando sea relevante
- No inventes normativas ni cifras que no sean reales
- Si preguntan cómo hacer algo en la plataforma, guía paso a paso usando nombres descriptivos de módulos (nunca rutas técnicas)
- Usa formato Markdown para organizar respuestas largas`;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:fiscal:${session.userId}`, 30, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const body = await req.json();
    const { prompt, messages: chatHistory } = body as {
      prompt?: string;
      messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      const trimmedHistory = chatHistory.slice(-12).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: sanitizeString(m.content, 2000),
      }));

      let geminiAvailable = false;
      try { getGeminiClient(); geminiAvailable = true; } catch {}

      let deepseekAvailable = false;
      try { getDeepSeekClient(); deepseekAvailable = true; } catch {}

      let openaiAvailable = false;
      try { getOpenAIClient(); openaiAvailable = true; } catch {}

      if (!geminiAvailable && !deepseekAvailable && !openaiAvailable) {
        return NextResponse.json({
          content: 'El asistente IA no está disponible en este momento.',
        }, { status: 503 });
      }

      const encoder = new TextEncoder();

      async function streamGemini(ctrl: ReadableStreamDefaultController) {
        const client = getGeminiClient();
        const geminiHistory = trimmedHistory.map(m => ({
          role: m.role === 'user' ? 'user' as const : 'model' as const,
          parts: [{ text: m.content }],
        }));
        const response = await client.models.generateContentStream({
          model: GEMINI_MODEL,
          contents: geminiHistory,
          config: {
            systemInstruction: FISCAL_SYSTEM,
            maxOutputTokens: 2048,
            temperature: 0.3,
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

      async function streamDeepSeek(ctrl: ReadableStreamDefaultController) {
        const client = getDeepSeekClient();
        const dsHistory = trimmedHistory.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));
        const stream = await client.chat.completions.create({
          model: DEEPSEEK_MODEL,
          max_tokens: 2048,
          temperature: 0.3,
          stream: true,
          messages: [
            { role: 'system', content: FISCAL_SYSTEM },
            ...dsHistory,
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

      async function streamOpenAI(ctrl: ReadableStreamDefaultController) {
        const client = getOpenAIClient();
        const openaiHistory = trimmedHistory.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));
        const stream = await client.chat.completions.create({
          model: OPENAI_MODEL,
          max_tokens: 2048,
          temperature: 0.3,
          stream: true,
          messages: [
            { role: 'system', content: FISCAL_SYSTEM },
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

      const streamFns: [string, boolean, (ctrl: ReadableStreamDefaultController) => Promise<void>][] = [
        ['Gemini', geminiAvailable, streamGemini],
        ['DeepSeek', deepseekAvailable, streamDeepSeek],
        ['OpenAI', openaiAvailable, streamOpenAI],
      ];

      const readable = new ReadableStream({
        async start(controller) {
          let hasEmitted = false;
          try {
            for (const [name, available, fn] of streamFns) {
              if (!available || hasEmitted) continue;
              try {
                const trackingCtrl = new Proxy(controller, {
                  get(target, prop) {
                    if (prop === 'enqueue') {
                      return (chunk: Uint8Array) => { hasEmitted = true; target.enqueue(chunk); };
                    }
                    return (target as any)[prop];
                  }
                }) as ReadableStreamDefaultController;
                await fn(trackingCtrl);
                break;
              } catch (err) {
                console.error(`[fiscal-chat] ${name} stream failed:`, err);
                if (hasEmitted) break;
              }
            }
            if (!hasEmitted) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error en la respuesta' })}\n\n`));
            }
            controller.close();
          } catch (err) {
            console.error('[fiscal-chat] stream error:', err);
            if (!hasEmitted) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error en la respuesta' })}\n\n`));
            }
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
    }

    if (!prompt) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const sanitizedPrompt = sanitizeString(prompt, 4000);

    let content: string;
    try {
      content = await geminiGenerateText({
        system: FISCAL_SYSTEM,
        prompt: sanitizedPrompt,
        maxTokens: 2048,
      });
    } catch (geminiErr) {
      console.error('[fiscal-chat] Gemini failed, trying DeepSeek fallback:', geminiErr);
      try {
        content = await deepseekGenerateText({
          system: FISCAL_SYSTEM,
          prompt: sanitizedPrompt,
          maxTokens: 2048,
        });
      } catch (dsErr) {
        console.error('[fiscal-chat] DeepSeek failed, trying OpenAI fallback:', dsErr);
        content = await openaiGenerateText({
          system: FISCAL_SYSTEM,
          prompt: sanitizedPrompt,
          maxTokens: 2048,
        });
      }
    }

    return NextResponse.json({ content: content || 'No pude procesar la consulta. Intenta de nuevo.' });
  } catch (err) {
    console.error('[fiscal-chat] error:', err);
    const msg = String(err);
    if (msg.includes('not configured')) {
      return NextResponse.json({
        content: 'El asistente IA no está disponible en este momento. Contacta al administrador para configurar el servicio.',
      });
    }
    return NextResponse.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
