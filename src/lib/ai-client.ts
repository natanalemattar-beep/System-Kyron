import { GoogleGenerativeAI } from '@google/generative-ai';
import { getApiKey, hasApiKeys } from '@/lib/ai-key-manager';

export function createClient(): GoogleGenerativeAI | null {
  const key = getApiKey();
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

export function createModel(
  modelName: string = 'gemini-2.0-flash-lite',
  config?: Record<string, any>
) {
  const client = createClient();
  if (!client) return null;
  return client.getGenerativeModel({
    model: modelName,
    ...(config ? { generationConfig: config } : {}),
  });
}

export function getAiStatus(): { configured: boolean } {
  return {
    configured: hasApiKeys(),
  };
}
