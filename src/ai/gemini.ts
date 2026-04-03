import { GoogleGenAI } from '@google/genai';

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured');

  return new GoogleGenAI({
    apiKey,
    httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
      ? { baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL, apiVersion: '' }
      : undefined,
  });
}

export const GEMINI_MODEL = 'gemini-2.5-flash';

export async function geminiGenerateText(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const client = getGeminiClient();
  const response = await client.models.generateContent({
    model: GEMINI_MODEL,
    contents: opts.prompt,
    config: {
      systemInstruction: opts.system,
      maxOutputTokens: opts.maxTokens ?? 2048,
      temperature: opts.temperature,
    },
  });

  return response.text ?? '';
}

export async function geminiGenerateJSON<T = unknown>(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  const text = await geminiGenerateText({
    ...opts,
    system: opts.system + '\n\nResponde UNICAMENTE con un objeto JSON valido, sin markdown, sin backticks, sin texto adicional.',
  });

  if (!text.trim()) {
    throw new Error('Gemini returned empty response');
  }

  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini returned invalid JSON: ${cleaned.substring(0, 200)}`);
  }

  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('Gemini returned non-object JSON');
  }

  if (opts.validate && !opts.validate(parsed)) {
    throw new Error('Gemini output failed schema validation');
  }

  return parsed as T;
}
