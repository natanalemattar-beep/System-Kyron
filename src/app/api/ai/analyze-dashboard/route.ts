import { NextRequest, NextResponse } from 'next/server';
import { createModel, getAiStatus } from "@/lib/ai-client";

const SYSTEM_PROMPT = `Eres Kyron Analytics, el motor de inteligencia contable de System Kyron.
Tu especialidad es analizar dashboards contables bajo normas VEN-NIF y normativa venezolana (SENIAT, LOTTT, BCV).

CAPACIDADES:
1. Analizar KPIs financieros (liquidez, cuentas por cobrar/pagar, facturas activas, compromisos)
2. Identificar riesgos fiscales y oportunidades de optimización
3. Sugerir acciones concretas basadas en los datos visibles
4. Referenciar normativa aplicable (IVA 16%, IGTF 3%, ISLR, retenciones)
5. Detectar anomalías o patrones preocupantes en los números

REGLAS:
- Sé específico con los datos proporcionados, nunca genérico
- Usa formato markdown con encabezados, listas y negritas
- Responde en español venezolano formal
- Si los datos son insuficientes, indícalo claramente
- Incluye siempre: diagnóstico, riesgos detectados y recomendaciones accionables
- Máximo 800 palabras`;

export async function POST(req: NextRequest) {
  try {
    const { module, stream = false, data = {}, context = "" } = await req.json();

    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const model = createModel("gemini-2.0-flash-lite", {
          temperature: 0.3,
          topP: 0.7,
          topK: 30,
          maxOutputTokens: 2048,
        });

        if (!model) {
          return NextResponse.json({ error: "IA no configurada" }, { status: 500 });
        }

        const kpiSummary = Object.entries(data)
          .filter(([, v]) => v !== null && v !== undefined)
          .map(([k, v]) => `- ${k}: ${typeof v === 'number' ? (v >= 1000 ? v.toLocaleString('es-VE') : v.toFixed(2)) : v}`)
          .join('\n');

        const prompt = `${context ? `Contexto: ${context}\n\n` : ''}
Módulo: ${module || 'Contabilidad VEN-NIF'}

KPIs del Dashboard:
${kpiSummary || 'No se proporcionaron KPIs numéricos. Analiza basándote en el contexto general.'}

Fecha de análisis: ${new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Genera un análisis ejecutivo con:
### Diagnóstico General
### Riesgos Detectados
### Recomendaciones Accionables`;

        if (stream) {
          const chat = model.startChat({ history: [] }); // Simpler for streaming
          const result = await chat.sendMessageStream(prompt);
          const encoder = new TextEncoder();
          const readableStream = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of result.stream) {
                  const text = chunk.text();
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                controller.close();
              } catch (e: any) {
                console.error('[analyze-dashboard-stream-error]', e);
                controller.close();
              }
            },
          });

          return new NextResponse(readableStream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        } else {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          return NextResponse.json({ content: response.text(), provider: 'gemini-2.0-flash-lite' });
        }

      } catch (error: any) {
        lastError = error;
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`[analyze-dashboard-retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        break;
      }
    }

    throw lastError;

  } catch (error) {
    console.error('[analyze-dashboard-error]', error);
    return NextResponse.json({ error: "Error al generar el análisis. Intenta de nuevo." }, { status: 500 });
  }
}
