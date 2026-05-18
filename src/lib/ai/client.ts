import { GoogleGenAI } from "@google/genai";
import { getAiClient } from "./key-manager";

export interface AiGenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
}

export class AiClient {
  private client: GoogleGenAI;

  constructor() {
    this.client = getAiClient();
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

    const response = await this.client.models.generateContent({
      model,
      contents: jsonPrompt,
      config: {
        temperature,
        responseMimeType: "application/json",
      },
    });

    try {
      return JSON.parse(response.text || "{}") as T;
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }
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
