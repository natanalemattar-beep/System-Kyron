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

const SYSTEM = `You are a sentiment analysis expert. Analyze text and classify it as "Positivo", "Negativo", or "Neutral". Respond with a JSON object containing "sentiment" (one of those three values) and "confidence" (number between 0 and 1).`;

export async function analyzeSentiment(
  input: AnalyzeSentimentInput
): Promise<AnalyzeSentimentOutput> {
  const prompt = `Text to analyze: ${input.textToAnalyze}`;

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
