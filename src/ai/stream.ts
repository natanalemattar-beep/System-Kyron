import { getAnthropicClient, getOpenAIClient, getGeminiClient, getDeepSeekClient, MODELS, isAvailable } from './providers';

type ProviderName = 'anthropic' | 'openai' | 'gemini' | 'deepseek';

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

async function streamAnthropic(
  ctrl: ReadableStreamDefaultController,
  config: StreamConfig,
  encode: (text: string) => void
) {
  const client = getAnthropicClient();
  const stream = await client.messages.stream({
    model: MODELS.CLAUDE,
    max_tokens: config.maxTokens ?? 8192,
    system: config.system,
    messages: config.messages,
  });
  for await (const event of stream) {
    if (event.type === 'content_block_delta') {
      const delta = event.delta;
      if ('text' in delta) encode(delta.text);
    }
  }
}

async function streamOpenAI(
  ctrl: ReadableStreamDefaultController,
  config: StreamConfig,
  encode: (text: string) => void
) {
  const client = getOpenAIClient();
  const stream = await client.chat.completions.create({
    model: MODELS.OPENAI,
    max_tokens: config.maxTokens ?? 4096,
    temperature: config.temperature ?? 0.7,
    stream: true,
    messages: [
      { role: 'system', content: config.system },
      ...config.messages,
    ],
  });
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) encode(text);
  }
}

async function streamGemini(
  ctrl: ReadableStreamDefaultController,
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

async function streamDeepSeek(
  ctrl: ReadableStreamDefaultController,
  config: StreamConfig,
  encode: (text: string) => void
) {
  const client = getDeepSeekClient();
  const stream = await client.chat.completions.create({
    model: MODELS.DEEPSEEK,
    max_tokens: config.maxTokens ?? 8192,
    temperature: config.temperature ?? 0.7,
    stream: true,
    messages: [
      { role: 'system', content: config.system },
      ...config.messages,
    ],
  });
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) encode(text);
  }
}

const STREAM_FNS: Record<ProviderName, typeof streamAnthropic> = {
  anthropic: streamAnthropic,
  openai: streamOpenAI,
  gemini: streamGemini,
  deepseek: streamDeepSeek,
};

export function createAIStream(config: StreamConfig): ReadableStream {
  const available = config.providers.filter(p => isAvailable(p));
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
        if (available.length === 0) {
          emitError('No hay proveedores de IA disponibles');
          controller.close();
          return;
        }

        for (let i = 0; i < available.length; i++) {
          const provider = available[i];
          try {
            await STREAM_FNS[provider](controller, config, emitText);
            if (hasEmitted) {
              emitDone();
              break;
            }
            console.warn(`[${config.label}] ${provider} returned zero tokens, trying next`);
            continue;
          } catch (err) {
            console.error(`[${config.label}] ${provider} failed:`, err);
            if (hasEmitted) {
              emitDone();
              break;
            }
          }
        }

        if (!hasEmitted) {
          emitError('No se pudo generar respuesta');
        }
      } catch (err) {
        console.error(`[${config.label}] stream critical error:`, err);
        if (!hasEmitted) {
          emitError('Error interno del servidor');
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
