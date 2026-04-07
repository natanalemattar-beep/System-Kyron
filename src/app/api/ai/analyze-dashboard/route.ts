import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { getOpenAIClient, OPENAI_MODEL } from '@/ai/openai';
import { getGeminiClient, GEMINI_MODEL } from '@/ai/gemini';
import { getDeepSeekClient, DEEPSEEK_MODEL } from '@/ai/deepseek';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Eres **KYRON Analytics**, el motor de inteligencia financiera y estratégica de System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

Tu rol es actuar como un **Director Financiero (CFO) virtual** con especialización en economía venezolana, ofreciendo análisis de nivel ejecutivo con profundidad técnica.

═══════════════════════════════════════════
ESTRUCTURA DE TU ANÁLISIS (sigue SIEMPRE este formato):
═══════════════════════════════════════════

## 📊 Diagnóstico Ejecutivo
Un párrafo de 3-4 líneas con la radiografía financiera del periodo. Incluye la conclusión principal, el estado general y la tendencia detectada.

## 🔑 Indicadores Clave
Analiza los KPIs más relevantes usando datos concretos:
- **Margen operativo**: Ingresos vs Gastos, ratio de eficiencia
- **Liquidez**: Capacidad de cobertura de pasivos a corto plazo
- **Rotación de cartera**: Cuentas por cobrar vs por pagar, ciclo de conversión de efectivo
- **Variaciones MoM**: Tendencias mes a mes con porcentajes

## ⚠️ Alertas y Riesgos
Identifica riesgos reales basados en los datos:
- Facturas vencidas o cartera morosa
- Desequilibrios entre cobrar y pagar
- Stock bajo que pueda afectar operaciones
- Gastos que crecen más rápido que ingresos
- Concentración de riesgo

## 📈 Tendencias (si hay datos históricos)
Analiza la evolución mes a mes del gráfico de ingresos/gastos. Identifica patrones estacionales, puntos de inflexión y proyecciones.

## 💡 Recomendaciones Estratégicas
3-5 acciones concretas y priorizadas. Cada una debe:
- Ser específica y medible
- Indicar en qué módulo de System Kyron ejecutarla (ej: "Revisa en **Cuentas por Cobrar** las facturas con más de 30 días")
- Estimar el impacto esperado

## 🇻🇪 Contexto Venezuela
Consideraciones específicas del entorno económico:
- Impacto de la tasa BCV actual sobre la operación
- Implicaciones fiscales (SENIAT, IVA, ISLR, retenciones)
- Estrategias de cobertura cambiaria si aplica

═══════════════════════════════════════════
REGLAS:
═══════════════════════════════════════════
- Idioma: español profesional, tono ejecutivo pero accesible
- Cita SIEMPRE cifras específicas de los datos proporcionados
- Usa formato Markdown rico: negritas, tablas cuando sean útiles, listas ordenadas
- Calcula ratios y métricas derivadas que no estén explícitas en los datos
- Si los datos muestran valores en cero, indica que la empresa puede estar en fase inicial o que faltan registros, y sugiere pasos para alimentar el sistema
- Módulos disponibles: Centro Contable, Facturación, Inventario, Análisis Financiero, Análisis de Caja, Análisis de Ventas, Análisis de Rentabilidad, Análisis de Riesgo, Análisis de Mercado, Cuentas por Cobrar, Cuentas por Pagar, Nóminas, Declaración IVA, Retenciones ISLR, Gaceta Oficial (legal)
- NUNCA muestres rutas técnicas — usa nombres descriptivos de módulos
- Si detectas que no hay datos suficientes para alguna sección, indica qué información falta y cómo obtenerla dentro de la plataforma`;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const rl = rateLimit(`ai:dashboard:${session.userId}`, 15, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

  try {
    const body = await req.json();
    const { module, data, context } = body;

    if (!data) {
      return new Response(JSON.stringify({ error: 'Datos requeridos para el análisis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const dataStr = JSON.stringify(data);
    if (dataStr.length > 80000) {
      return new Response(JSON.stringify({ error: 'Datos demasiado grandes para análisis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const sanitizedModule = sanitizeString(module || 'Dashboard General', 200);
    const sanitizedContext = context ? sanitizeString(context, 1000) : '';

    const userPrompt = `══════════════════════════════════════
MÓDULO: ${sanitizedModule}
${sanitizedContext ? `CONTEXTO: ${sanitizedContext}` : ''}
══════════════════════════════════════

DATOS COMPLETOS DEL DASHBOARD:
${dataStr}

Realiza un análisis financiero y estratégico completo de estos datos siguiendo la estructura indicada.`;

    const stream = body.stream !== false;

    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          const send = (event: string, payload: string) => {
            controller.enqueue(encoder.encode(`event: ${event}\ndata: ${payload}\n\n`));
          };

          try {
            let streamed = false;
            let openaiPartialFail = false;

            try {
              const client = getOpenAIClient();
              const response = await client.chat.completions.create({
                model: OPENAI_MODEL,
                max_tokens: 3000,
                temperature: 0.4,
                stream: true,
                messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  { role: 'user', content: userPrompt },
                ],
              });

              for await (const chunk of response) {
                const delta = chunk.choices[0]?.delta?.content;
                if (delta) {
                  send('chunk', JSON.stringify({ text: delta }));
                  streamed = true;
                }
              }
            } catch (openaiErr) {
              console.error('[analyze-dashboard] OpenAI stream failed:', openaiErr);
              if (streamed) {
                openaiPartialFail = true;
                send('chunk', JSON.stringify({ text: '\n\n---\n*⚠️ El análisis se interrumpió parcialmente. Regenere para obtener un análisis completo.*' }));
              }
            }

            if (!streamed) {
              try {
                const ds = getDeepSeekClient();
                const dsStream = await ds.chat.completions.create({
                  model: DEEPSEEK_MODEL,
                  max_tokens: 3000,
                  temperature: 0.4,
                  stream: true,
                  messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt },
                  ],
                });
                for await (const chunk of dsStream) {
                  const text = chunk.choices[0]?.delta?.content;
                  if (text) {
                    send('chunk', JSON.stringify({ text }));
                    streamed = true;
                  }
                }
              } catch (dsErr) {
                console.error('[analyze-dashboard] DeepSeek stream failed:', dsErr);
              }
            }

            if (!streamed) {
              try {
                const gemini = getGeminiClient();
                const response = await gemini.models.generateContentStream({
                  model: GEMINI_MODEL,
                  contents: userPrompt,
                  config: {
                    systemInstruction: SYSTEM_PROMPT,
                    maxOutputTokens: 3000,
                    temperature: 0.4,
                  },
                });

                for await (const chunk of response) {
                  const text = chunk.text;
                  if (text) {
                    send('chunk', JSON.stringify({ text }));
                    streamed = true;
                  }
                }
              } catch (geminiErr) {
                console.error('[analyze-dashboard] Gemini stream also failed:', geminiErr);
              }
            }

            if (!streamed) {
              send('chunk', JSON.stringify({ text: 'No se pudo generar el análisis. Intente nuevamente.' }));
            }

            send('done', '{}');
          } catch (err) {
            console.error('[analyze-dashboard] stream error:', err);
            send('error', JSON.stringify({ error: 'Error al generar análisis' }));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    const { openaiGenerateText } = await import('@/ai/openai');
    const { deepseekGenerateText } = await import('@/ai/deepseek');
    const { geminiGenerateText } = await import('@/ai/gemini');

    let analysis: string;
    try {
      analysis = await openaiGenerateText({ system: SYSTEM_PROMPT, prompt: userPrompt, maxTokens: 3000, temperature: 0.4 });
    } catch {
      try {
        analysis = await deepseekGenerateText({ system: SYSTEM_PROMPT, prompt: userPrompt, maxTokens: 3000, temperature: 0.4 });
      } catch {
        analysis = await geminiGenerateText({ system: SYSTEM_PROMPT, prompt: userPrompt, maxTokens: 3000, temperature: 0.4 });
      }
    }

    return new Response(JSON.stringify({ analysis: analysis || 'No se pudo generar el análisis.', module: sanitizedModule }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[analyze-dashboard] error:', err);
    return new Response(JSON.stringify({ error: 'Error al procesar el análisis con IA' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
