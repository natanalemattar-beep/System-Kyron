export { getOpenAIClient, MODELS } from './providers';
import { MODELS } from './providers';
import { generateText as providerGenText, generateJSON as providerGenJSON, type GenerateTextOpts } from './providers';

export const OPENAI_MODEL = MODELS.OPENAI;
export const OPENAI_MODEL_FAST = MODELS.OPENAI;

export async function openaiGenerateText(opts: GenerateTextOpts): Promise<string> {
  return providerGenText('openai', opts);
}

export async function openaiGenerateJSON<T = unknown>(opts: GenerateTextOpts & {
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  return providerGenJSON<T>(['openai'], opts, 'openai', opts.validate);
}

export const generateText = openaiGenerateText;
export const generateJSON = openaiGenerateJSON;
