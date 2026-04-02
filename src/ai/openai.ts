import OpenAI from 'openai';

let _client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (_client) return _client;

  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  _client = new OpenAI({
    apiKey,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
  });
  return _client;
}

export const OPENAI_MODEL = 'gpt-4o-mini';
export const OPENAI_MODEL_FAST = 'gpt-4o-mini';

export async function openaiGenerateText(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: OPENAI_MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    temperature: opts.temperature,
    messages: [
      { role: 'system', content: opts.system },
      { role: 'user', content: opts.prompt },
    ],
  });

  return response.choices[0]?.message?.content ?? '';
}

export async function openaiGenerateJSON<T = unknown>(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  const text = await openaiGenerateText({
    ...opts,
    system: opts.system + '\n\nResponde UNICAMENTE con un objeto JSON valido, sin markdown, sin backticks, sin texto adicional.',
  });

  if (!text.trim()) {
    throw new Error('OpenAI returned empty response');
  }

  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`OpenAI returned invalid JSON: ${cleaned.substring(0, 200)}`);
  }

  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('OpenAI returned non-object JSON');
  }

  if (opts.validate && !opts.validate(parsed)) {
    throw new Error('OpenAI output failed schema validation');
  }

  return parsed as T;
}
