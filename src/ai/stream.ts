import { getGeminiClient, MODELS, isAvailable } from './providers';

type ProviderName = 'gemini';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export type StreamConfig = {
  system: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  providers: ProviderName[];
  label: string;
  eventFormat?: 'sse-data' | 'sse-event';
};

const encoder = new TextEncoder();

function encodeSSEData(payload: Record<string, unknown>): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function encodeSSEEvent(event: string, payload: string): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${payload}\n\n`);
}

async function streamGemini(
  _ctrl: ReadableStreamDefaultController,
  config: StreamConfig,
  encode: (text: string) => void
) {
  const client = getGeminiClient();
  const geminiHistory = config.messages.map(m => ({
    role: m.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: m.content }],
  }));
  const response = await client.models.generateContentStream({
    model: MODELS.GEMINI,
    contents: geminiHistory,
    config: {
      systemInstruction: config.system,
      maxOutputTokens: config.maxTokens ?? 8192,
      temperature: config.temperature ?? 0.7,
    },
  });
  for await (const chunk of response) {
    const text = chunk.text;
    if (text) encode(text);
  }
}

export function createAIStream(config: StreamConfig): ReadableStream {
  const format = config.eventFormat ?? 'sse-data';

  return new ReadableStream({
    async start(controller) {
      let hasEmitted = false;

      const emitText = (text: string) => {
        hasEmitted = true;
        if (format === 'sse-event') {
          controller.enqueue(encodeSSEEvent('chunk', JSON.stringify({ text })));
        } else {
          controller.enqueue(encodeSSEData({ text }));
        }
      };

      const emitDone = () => {
        if (format === 'sse-event') {
          controller.enqueue(encodeSSEEvent('done', '{}'));
        } else {
          controller.enqueue(encodeSSEData({ done: true }));
        }
      };

      const emitError = (msg: string) => {
        if (format === 'sse-event') {
          controller.enqueue(encodeSSEEvent('error', JSON.stringify({ error: msg })));
        } else {
          controller.enqueue(encodeSSEData({ error: msg }));
        }
      };

      try {
        if (!isAvailable('gemini')) {
          emitError('Servicio de IA (Gemini) no disponible. Verifica la API KEY.');
          controller.close();
          return;
        }

        try {
          await streamGemini(controller, config, emitText);
          if (hasEmitted) {
            emitDone();
          } else {
            console.warn(`[${config.label}] Gemini returned zero tokens`);
            emitError('No se pudo generar respuesta');
          }
        } catch (err) {
          console.error(`[${config.label}] Gemini failed:`, err);
          if (hasEmitted) {
            emitDone();
          } else {
            emitError('Error al generar respuesta con Gemini');
          }
        }

      } catch (err) {
        console.error(`[${config.label}] stream critical error:`, err);
        if (!hasEmitted) {
          emitError('Error interno del servidor de IA');
        }
      } finally {
        controller.close();
      }
    },
  });
}

export function streamResponse(config: StreamConfig): Response {
  const readable = createAIStream(config);
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
