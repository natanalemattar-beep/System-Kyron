import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import type { AiConfig } from './types';
import { AiError } from './errors';
import { getApiKey, hasApiKeys } from '@/lib/ai-key-manager';

const DEFAULT_CONFIG: Required<AiConfig> = {
  model: 'gemini-2.0-flash-lite',
  temperature: 0.2,
  topP: 0.6,
  topK: 20,
  maxOutputTokens: 2048,
};

const MAX_RETRIES = 3;

export class AiClient {
  private client: GoogleGenerativeAI | null = null;
  private modelName: string;

  constructor(modelName?: string) {
    this.modelName = modelName || DEFAULT_CONFIG.model;
  }

  isConfigured(): boolean {
    return hasApiKeys();
  }

  private ensureClient(): GoogleGenerativeAI {
    if (!this.client) {
      const key = getApiKey();
      if (!key) {
        throw new AiError('La IA de Kyron no está configurada.', 'CONFIG_ERROR');
      }
      this.client = new GoogleGenerativeAI(key);
    }
    return this.client;
  }

  private getModel(config?: AiConfig): GenerativeModel {
    const client = this.ensureClient();
    const merged = { ...DEFAULT_CONFIG, ...config };
    this.modelName = merged.model;
    return client.getGenerativeModel({
      model: this.modelName,
      generationConfig: {
        temperature: merged.temperature,
        topP: merged.topP,
        topK: merged.topK,
        maxOutputTokens: merged.maxOutputTokens,
      },
    });
  }

  async generate(prompt: string, config?: AiConfig): Promise<string> {
    return this.withRetry(async (model) => {
      const result = await model.generateContent(prompt);
      return (await result.response).text();
    }, config);
  }

  async generateWithSystem(prompt: string, systemInstruction: string, config?: AiConfig): Promise<string> {
    return this.withRetry(async (model) => {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: { role: 'user', parts: [{ text: systemInstruction }] },
      });
      return (await result.response).text();
    }, config);
  }

  async chat(messages: { role: string; content: string }[], systemPrompt?: string, config?: AiConfig): Promise<string> {
    return this.withRetry(async (model) => {
      const history = messages.slice(0, -1).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
      const firstUserIndex = history.findIndex((m) => m.role === 'user');
      const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];
      const chat = model.startChat({
        history: validHistory,
        ...(systemPrompt ? { systemInstruction: systemPrompt } : {}),
      });
      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      return (await result.response).text();
    }, config);
  }

  async *chatStream(messages: { role: string; content: string }[], systemPrompt?: string, config?: AiConfig): AsyncGenerator<string> {
    const model = this.getModel(config);
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    const firstUserIndex = history.findIndex((m) => m.role === 'user');
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];
    const chat = model.startChat({
      history: validHistory,
      ...(systemPrompt ? { systemInstruction: systemPrompt } : {}),
    });
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }

  async *generateStream(prompt: string, config?: AiConfig): AsyncGenerator<string> {
    const model = this.getModel(config);
    const result = await model.generateContentStream(prompt);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }

  private async withRetry(fn: (model: GenerativeModel) => Promise<string>, config?: AiConfig): Promise<string> {
    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const model = this.getModel(config);
        return await fn(model);
      } catch (err) {
        lastError = err;
        if (AiError.isQuotaError(err)) {
          if (attempt < MAX_RETRIES - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
            continue;
          }
        }
        throw AiError.from(err);
      }
    }
    throw AiError.from(lastError);
  }
}

export { AiError };
