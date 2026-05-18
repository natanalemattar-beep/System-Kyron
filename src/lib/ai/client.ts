import { GoogleGenAI } from "@google/genai";
import { getAiClient, getNextKey } from "./key-manager";

export interface AiGenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class AiClient {
  private client: GoogleGenAI;

  constructor() {
    this.client = getAiClient();
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3
  ): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        const isRateLimit =
          error?.code === 429 ||
          error?.status === "RESOURCE_EXHAUSTED" ||
          error?.message?.includes("quota") ||
          error?.message?.includes("429");

        if (isRateLimit && attempt < maxRetries - 1) {
          const delay = 15000 + attempt * 10000;
          console.warn(`[AI] Rate limit hit, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
          await sleep(delay);
          this.client = getAiClient();
          continue;
        }
        throw error;
      }
    }
    throw new Error("Max retries exceeded");
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
    } = options;

    return this.retryWithBackoff(async () => {
      const response = await this.client.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature,
          maxOutputTokens: maxTokens,
          systemInstruction: systemInstruction
            ? { text: systemInstruction }
            : undefined,
        },
      });
      return response.text || "";
    });
  }

  async generateJson<T>(
    prompt: string,
    options: AiGenerateOptions = {}
  ): Promise<T> {
    const {
      model = "gemini-2.5-flash",
      temperature = 0.3,
      systemInstruction,
    } = options;

    const jsonPrompt = `${systemInstruction || ""}\n\nResponde SOLO con JSON válido, sin markdown ni texto adicional.\n\n${prompt}`;

    return this.retryWithBackoff(async () => {
      const response = await this.client.models.generateContent({
        model,
        contents: jsonPrompt,
        config: {
          temperature,
          responseMimeType: "application/json",
        },
      });

      let rawText = response.text || "{}";
      rawText = rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

      try {
        return JSON.parse(rawText) as T;
      } catch {
        throw new Error(`Failed to parse AI response as JSON: ${rawText.substring(0, 200)}`);
      }
    });
  }

  async analyzeDocument(
    content: string,
    analysisType: string,
    options: AiGenerateOptions = {}
  ): Promise<string> {
    return this.generateText(
      `Analiza el siguiente documento tipo "${analysisType}":\n\n${content}`,
      {
        systemInstruction:
          "Eres un experto en análisis documental. Proporciona análisis detallado y estructurado.",
        ...options,
      }
    );
  }
}

export const ai = new AiClient();
