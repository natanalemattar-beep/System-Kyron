import OpenAI from 'openai';

export function getDeepSeekClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DeepSeek API key not configured');

  return new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
  });
}

export const DEEPSEEK_MODEL = 'deepseek-chat';
export const DEEPSEEK_MODEL_REASONER = 'deepseek-reasoner';

export async function deepseekGenerateText(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const client = getDeepSeekClient();
  const response = await client.chat.completions.create({
    model: DEEPSEEK_MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    temperature: opts.temperature,
    messages: [
      { role: 'system', content: opts.system },
      { role: 'user', content: opts.prompt },
    ],
  });

  return response.choices[0]?.message?.content ?? '';
}

export async function deepseekGenerateJSON<T = unknown>(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  const text = await deepseekGenerateText({
    ...opts,
    system: opts.system + '\n\nResponde UNICAMENTE con un objeto JSON valido, sin markdown, sin backticks, sin texto adicional.',
  });

  if (!text.trim()) {
    throw new Error('DeepSeek returned empty response');
  }

  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`DeepSeek returned invalid JSON: ${cleaned.substring(0, 200)}`);
  }

  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('DeepSeek returned non-object JSON');
  }

  if (opts.validate && !opts.validate(parsed)) {
    throw new Error('DeepSeek output failed schema validation');
  }

  return parsed as T;
}
