'use server';

import { openaiGenerateJSON } from '@/ai/openai';
import { geminiGenerateJSON } from '@/ai/gemini';

export type AnalyzeSentimentInput = {
  textToAnalyze: string;
};

export type AnalyzeSentimentOutput = {
  sentiment: 'Positivo' | 'Negativo' | 'Neutral';
  confidence: number;
};

const SYSTEM = `Eres un experto en análisis de sentimiento. Analiza el texto proporcionado y clasifícalo como "Positivo", "Negativo" o "Neutral".

Responde con un objeto JSON que contenga:
- "sentiment": uno de estos tres valores exactos: "Positivo", "Negativo", "Neutral"
- "confidence": número entre 0 y 1 indicando tu nivel de certeza

Considera el contexto cultural y lingüístico hispanoamericano/venezolano al interpretar expresiones coloquiales.`;

export async function analyzeSentiment(
  input: AnalyzeSentimentInput
): Promise<AnalyzeSentimentOutput> {
  const prompt = `Texto a analizar: ${input.textToAnalyze}`;

  let result: AnalyzeSentimentOutput;
  try {
    result = await openaiGenerateJSON<AnalyzeSentimentOutput>({
      system: SYSTEM,
      prompt,
    });
  } catch (err) {
    console.error('[sentiment] OpenAI failed, trying Gemini:', err);
    result = await geminiGenerateJSON<AnalyzeSentimentOutput>({
      system: SYSTEM,
      prompt,
    });
  }

  const validSentiments = ['Positivo', 'Negativo', 'Neutral'] as const;
  return {
    sentiment: validSentiments.includes(result.sentiment as any) ? result.sentiment : 'Neutral',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
