import { GoogleGenAI } from "@google/genai";
import { getNextKey, markKeyRateLimited } from "./key-manager";

export interface AiGenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
  timeout?: number;
  images?: string[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error: any): boolean {
  if (!error) return false;
  try {
    const msg = typeof error.message === "string" ? error.message
      : typeof error.error === "string" ? error.error
      : error.error?.message || "";
    return (
      error.code === 429 ||
      error.status === "RESOURCE_EXHAUSTED" ||
      msg.includes("quota") ||
      msg.includes("429") ||
      msg.includes("rate limit") ||
      msg.includes("RESOURCE_EXHAUSTED")
    );
  } catch {
    return false;
  }
}

function extractRetryDelay(error: any): number {
  try {
    const msg = typeof error.message === "string" ? error.message
      : typeof error.error === "string" ? error.error
      : error.error?.message || "";
    const match = msg.match(/retry in (\d+(?:\.\d+)?)s/i);
    if (match) return parseFloat(match[1]) * 1000;
    const details = error.error?.details || [];
    for (const d of details) {
      if (d.retryDelay) {
        const m = d.retryDelay.match(/(\d+)s/);
        if (m) return parseInt(m[1]) * 1000;
      }
    }
  } catch {
    // ignore
  }
  return 15000;
}

function detectMimeType(dataUri: string): string {
  const match = dataUri.match(/^data:(image\/(?:jpeg|png|gif|webp));base64/);
  return match?.[1] || "image/jpeg";
}

function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  return cleaned.trim();
}

function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const cleaned = cleanJsonResponse(text);
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      const bracketMatch = cleaned.match(/\{[\s\S]*\}/);
      if (bracketMatch) {
        try {
          return JSON.parse(bracketMatch[0]) as T;
        } catch {
          console.warn("[AI] JSON parse failed, returning fallback");
          return fallback;
        }
      }
      console.warn("[AI] JSON parse failed, returning fallback");
      return fallback;
    }
  }
}

export class AiClient {
  private client: GoogleGenAI;
  private keyIndex: number;

  constructor() {
    const { client, index } = getNextKey();
    this.client = client;
    this.keyIndex = index;
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3
  ): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        if (isRateLimitError(error) && attempt < maxRetries - 1) {
          markKeyRateLimited(this.keyIndex);
          const delay = extractRetryDelay(error) + attempt * 5000;
          console.warn(`[AI] Rate limit, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
          await sleep(delay);
          const next = getNextKey();
          this.client = next.client;
          this.keyIndex = next.index;
          continue;
        }
        throw error;
      }
    }
    throw new Error("Max retries exceeded for AI request");
  }

  async generateText(
    prompt: string,
    options: AiGenerateOptions = {}
  ): Promise<string> {
    const {
      model = "gemini-2.5-flash",
      temperature = 0.7,
      maxTokens = 8192,
      systemInstruction,
      timeout = 60000,
      images,
    } = options;

    return this.retryWithBackoff(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const contents = images?.length
          ? [{
              role: "user" as const,
              parts: [
                { text: prompt },
                ...images.map((img) => ({
                  inlineData: { mimeType: detectMimeType(img), data: img.split(",")[1] || img },
                })),
              ],
            }]
          : prompt;

        const response = await this.client.models.generateContent({
          model,
          contents,
          config: {
            temperature,
            maxOutputTokens: maxTokens,
            systemInstruction: systemInstruction
              ? { text: systemInstruction }
              : undefined,
          },
        });
        return response.text || "";
      } finally {
        clearTimeout(timer);
      }
    });
  }

  async generateJson<T>(
    prompt: string,
    options: AiGenerateOptions = {},
    fallback?: T
  ): Promise<T> {
    const {
      model = "gemini-2.5-flash",
      temperature = 0.3,
      maxTokens = 8192,
      systemInstruction,
      timeout = 60000,
      images,
    } = options;

    const defaultFallback = (fallback || {}) as T;

    return this.retryWithBackoff(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const contents = images?.length
          ? [{
              role: "user" as const,
              parts: [
                { text: prompt },
                ...images.map((img) => ({
                  inlineData: { mimeType: detectMimeType(img), data: img.split(",")[1] || img },
                })),
              ],
            }]
          : prompt;

        const response = await this.client.models.generateContent({
          model,
          contents,
          config: {
            temperature,
            maxOutputTokens: maxTokens,
            systemInstruction: systemInstruction
              ? { text: systemInstruction }
              : undefined,
            responseMimeType: "application/json",
          },
        });
        return safeJsonParse<T>(response.text || "{}", defaultFallback);
      } finally {
        clearTimeout(timer);
      }
    });
  }

  async generateWithRetry(
    prompt: string,
    options: AiGenerateOptions = {}
  ): Promise<string> {
    return this.generateText(prompt, options);
  }
}

export const ai = new AiClient();
