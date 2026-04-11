export { getDeepSeekClient, MODELS } from './providers';
import { MODELS } from './providers';
import { generateText as providerGenText, generateJSON as providerGenJSON, type GenerateTextOpts } from './providers';

export const DEEPSEEK_MODEL = MODELS.DEEPSEEK;
export const DEEPSEEK_MODEL_REASONER = MODELS.DEEPSEEK_REASONER;

export async function deepseekGenerateText(opts: GenerateTextOpts): Promise<string> {
  return providerGenText('deepseek', opts);
}

export async function deepseekGenerateJSON<T = unknown>(opts: GenerateTextOpts & {
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  return providerGenJSON<T>(['deepseek'], opts, 'deepseek', opts.validate);
}

export const generateText = deepseekGenerateText;
export const generateJSON = deepseekGenerateJSON;
