import { GoogleGenerativeAI } from '@google/generative-ai';
import { getApiKey, hasApiKeys, getKeyCount } from '@/lib/ai-key-manager';

export function createClient(): GoogleGenerativeAI | null {
  const key = getApiKey();
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

export function createModel(
  modelName: string = 'gemini-1.5-flash',
  config?: Record<string, any>
) {
  const client = createClient();
  if (!client) return null;
  return client.getGenerativeModel({
    model: modelName,
    ...(config ? { generationConfig: config } : {}),
  });
}

export function getAiStatus(): { configured: boolean; keyCount: number } {
  return {
    configured: hasApiKeys(),
    keyCount: getKeyCount(),
  };
}
