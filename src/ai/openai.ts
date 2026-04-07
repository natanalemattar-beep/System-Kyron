import OpenAI from 'openai';

export function getOpenAIClient(): OpenAI {
  const integrationKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  const integrationBaseUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const directKey = process.env.OPENAI_API_KEY;

  const useIntegration = !!(integrationKey && integrationBaseUrl);
  const apiKey = useIntegration ? integrationKey : directKey;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const opts: ConstructorParameters<typeof OpenAI>[0] = { apiKey };
  if (useIntegration) {
    opts.baseURL = integrationBaseUrl;
  }

  return new OpenAI(opts);
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
