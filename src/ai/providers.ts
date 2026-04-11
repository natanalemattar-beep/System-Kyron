import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

export const MODELS = {
  CLAUDE: 'claude-sonnet-4-6',
  OPENAI: 'gpt-4o-mini',
  GEMINI: 'gemini-2.5-flash',
  DEEPSEEK: 'deepseek-chat',
  DEEPSEEK_REASONER: 'deepseek-reasoner',
} as const;

type ProviderName = 'anthropic' | 'openai' | 'gemini' | 'deepseek';

function resolveKey(provider: Uppercase<string>): { apiKey: string; baseURL?: string } | null {
  const intKey = process.env[`AI_INTEGRATIONS_${provider}_API_KEY`];
  const intBase = process.env[`AI_INTEGRATIONS_${provider}_BASE_URL`];
  const directKey = process.env[`${provider}_API_KEY`];

  if (intKey && intBase) return { apiKey: intKey, baseURL: intBase };
  if (directKey) return { apiKey: directKey };
  return null;
}

let _anthropic: Anthropic | null = null;
let _openai: OpenAI | null = null;
let _gemini: GoogleGenAI | null = null;
let _deepseek: OpenAI | null = null;

export function getAnthropicClient(): Anthropic {
  if (_anthropic) return _anthropic;
  const cfg = resolveKey('ANTHROPIC');
  if (!cfg) throw new Error('Anthropic API key not configured');
  const opts: ConstructorParameters<typeof Anthropic>[0] = { apiKey: cfg.apiKey };
  if (cfg.baseURL) opts.baseURL = cfg.baseURL;
  _anthropic = new Anthropic(opts);
  return _anthropic;
}

export function getOpenAIClient(): OpenAI {
  if (_openai) return _openai;
  const cfg = resolveKey('OPENAI');
  if (!cfg) throw new Error('OpenAI API key not configured');
  const opts: ConstructorParameters<typeof OpenAI>[0] = { apiKey: cfg.apiKey };
  if (cfg.baseURL) opts.baseURL = cfg.baseURL;
  _openai = new OpenAI(opts);
  return _openai;
}

export function getGeminiClient(): GoogleGenAI {
  if (_gemini) return _gemini;
  const cfg = resolveKey('GEMINI');
  if (!cfg) throw new Error('Gemini API key not configured');
  const opts: ConstructorParameters<typeof GoogleGenAI>[0] = { apiKey: cfg.apiKey };
  if (cfg.baseURL) {
    opts.httpOptions = { apiVersion: '', baseUrl: cfg.baseURL };
  }
  _gemini = new GoogleGenAI(opts);
  return _gemini;
}

export function getDeepSeekClient(): OpenAI {
  if (_deepseek) return _deepseek;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DeepSeek API key not configured');
  _deepseek = new OpenAI({ apiKey, baseURL: 'https://api.deepseek.com' });
  return _deepseek;
}

export function isAvailable(provider: ProviderName): boolean {
  try {
    switch (provider) {
      case 'anthropic': getAnthropicClient(); return true;
      case 'openai': getOpenAIClient(); return true;
      case 'gemini': getGeminiClient(); return true;
      case 'deepseek': getDeepSeekClient(); return true;
    }
  } catch {
    return false;
  }
}

export function getAvailableProviders(preferred?: ProviderName[]): ProviderName[] {
  const order = preferred ?? ['gemini', 'deepseek', 'openai', 'anthropic'];
  return order.filter(p => isAvailable(p));
}

export function cleanJSON(text: string): string {
  return text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
}

export function parseAIJSON<T>(text: string, providerLabel: string): T {
  if (!text.trim()) throw new Error(`${providerLabel} returned empty response`);
  const cleaned = cleanJSON(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`${providerLabel} returned invalid JSON: ${cleaned.substring(0, 200)}`);
  }
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`${providerLabel} returned non-object JSON`);
  }
  return parsed as T;
}

export type GenerateTextOpts = {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
};

export async function generateText(
  provider: ProviderName,
  opts: GenerateTextOpts
): Promise<string> {
  switch (provider) {
    case 'anthropic': {
      const client = getAnthropicClient();
      const res = await client.messages.create({
        model: MODELS.CLAUDE,
        max_tokens: opts.maxTokens ?? 1024,
        temperature: opts.temperature,
        system: opts.system,
        messages: [{ role: 'user', content: opts.prompt }],
      });
      if (!res.content.length) return '';
      const block = res.content[0];
      return block.type === 'text' ? block.text : '';
    }
    case 'openai': {
      const client = getOpenAIClient();
      const res = await client.chat.completions.create({
        model: MODELS.OPENAI,
        max_tokens: opts.maxTokens ?? 1024,
        temperature: opts.temperature,
        messages: [
          { role: 'system', content: opts.system },
          { role: 'user', content: opts.prompt },
        ],
      });
      return res.choices[0]?.message?.content ?? '';
    }
    case 'gemini': {
      const client = getGeminiClient();
      const res = await client.models.generateContent({
        model: MODELS.GEMINI,
        contents: opts.prompt,
        config: {
          systemInstruction: opts.system,
          maxOutputTokens: opts.maxTokens ?? 2048,
          temperature: opts.temperature,
        },
      });
      return res.text ?? '';
    }
    case 'deepseek': {
      const client = getDeepSeekClient();
      const res = await client.chat.completions.create({
        model: MODELS.DEEPSEEK,
        max_tokens: opts.maxTokens ?? 1024,
        temperature: opts.temperature,
        messages: [
          { role: 'system', content: opts.system },
          { role: 'user', content: opts.prompt },
        ],
      });
      return res.choices[0]?.message?.content ?? '';
    }
  }
}

export async function generateTextWithFallback(
  providers: ProviderName[],
  opts: GenerateTextOpts,
  label: string
): Promise<string> {
  const available = providers.filter(p => isAvailable(p));
  if (available.length === 0) throw new Error('No AI providers available');

  for (let i = 0; i < available.length; i++) {
    try {
      return await generateText(available[i], opts);
    } catch (err) {
      console.error(`[${label}] ${available[i]} failed:`, err);
      if (i === available.length - 1) throw err;
    }
  }
  throw new Error('All AI providers failed');
}

export async function generateJSON<T>(
  providers: ProviderName[],
  opts: GenerateTextOpts,
  label: string,
  validate?: (data: unknown) => data is T
): Promise<T> {
  const jsonOpts = {
    ...opts,
    system: opts.system + '\n\nResponde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin backticks, sin texto adicional.',
  };

  const text = await generateTextWithFallback(providers, jsonOpts, label);
  const parsed = parseAIJSON<T>(text, label);

  if (validate && !validate(parsed)) {
    throw new Error(`${label} output failed schema validation`);
  }

  return parsed;
}
