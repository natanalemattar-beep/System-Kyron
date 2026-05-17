import { AiClient } from './client';
import type { AiChatRequest, AiChatResponse } from './types';

export async function processChatRequest(request: AiChatRequest): Promise<AiChatResponse> {
  const client = new AiClient();
  if (!client.isConfigured()) {
    return { content: '', provider: 'none', status: 'error', error: 'La IA de Kyron no está configurada.' };
  }
  try {
    const formatted = request.context
      ? [{ role: 'user' as const, content: '[Contexto: ' + request.context + ']' }, ...request.messages]
      : request.messages;
    const content = await client.chat(
      formatted.map(m => ({ role: m.role, content: m.content })),
      request.systemPrompt,
      request.config
    );
    return { content, provider: 'gemini-2.0-flash-lite', status: 'success' };
  } catch (error) {
    return { content: '', provider: 'gemini-2.0-flash-lite', status: 'error', error: error instanceof Error ? error.message : 'Error desconocido' };
  }
}

export async function* processChatStream(request: AiChatRequest): AsyncGenerator<string> {
  const client = new AiClient();
  if (!client.isConfigured()) {
    yield 'data: {"error":"IA no configurada"}\n\n';
    return;
  }
  const formatted = request.context
    ? [{ role: 'user' as const, content: '[Contexto: ' + request.context + ']' }, ...request.messages]
    : request.messages;
  try {
    const stream = client.chatStream(
      formatted.map(m => ({ role: m.role, content: m.content })),
      request.systemPrompt,
      request.config
    );
    for await (const chunk of stream) { yield chunk; }
  } catch (error) {
    yield 'Error: ' + (error instanceof Error ? error.message : 'Error de streaming');
  }
}
