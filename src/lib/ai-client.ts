import { AiClient } from '@/lib/ai';

export function createClient(): AiClient | null {
  try {
    const client = new AiClient();
    return client.isConfigured() ? client : null;
  } catch {
    return null;
  }
}

export function createModel(
  modelName: string = 'gemini-2.0-flash-lite',
  config?: Record<string, any>
) {
  const client = createClient();
  if (!client) return null;
  return client;
}

export function getAiStatus(): { configured: boolean } {
  const client = new AiClient();
  return { configured: client.isConfigured() };
}
