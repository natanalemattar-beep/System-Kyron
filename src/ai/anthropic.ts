export { getAnthropicClient, MODELS } from './providers';
import { MODELS } from './providers';
import { generateText as providerGenText, generateJSON as providerGenJSON, type GenerateTextOpts } from './providers';

export const CLAUDE_MODEL = MODELS.CLAUDE;

export async function generateText(opts: GenerateTextOpts): Promise<string> {
  return providerGenText('anthropic', opts);
}

export async function generateJSON<T = unknown>(opts: GenerateTextOpts & {
  validate?: (data: unknown) => data is T;
}): Promise<T> {
  return providerGenJSON<T>(['anthropic'], opts, 'anthropic', opts.validate);
}
