export { getGeminiClient, MODELS } from './providers';
import { MODELS } from './providers';
import { generateText as providerGenText, generateJSON as providerGenJSON, type GenerateTextOpts } from './providers';

export const GEMINI_MODEL = MODELS.GEMINI;

export async function geminiGenerateText(opts: GenerateTextOpts): Promise<string> {
  return providerGenText('gemini', opts);
}

export async function geminiGenerateJSON<T = unknown>(opts: GenerateTextOpts & {
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  return providerGenJSON<T>(['gemini'], opts, 'gemini', opts.validate);
}

export const generateText = geminiGenerateText;
export const generateJSON = geminiGenerateJSON;
