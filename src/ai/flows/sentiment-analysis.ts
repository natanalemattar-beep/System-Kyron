'use server';

import { generateJSON } from '@/ai/providers';

export type AnalyzeSentimentInput = { textToAnalyze: string };

export type AnalyzeSentimentOutput = {
  sentiment: 'Positivo' | 'Negativo' | 'Neutral';
  confidence: number;
};

const SYSTEM = `Eres un experto en análisis de sentimiento. Clasifica el texto como "Positivo", "Negativo" o "Neutral".
Responde con JSON: { "sentiment": "...", "confidence": 0-1 }
Considera contexto hispanoamericano/venezolano para expresiones coloquiales.`;

export async function analyzeSentiment(input: AnalyzeSentimentInput): Promise<AnalyzeSentimentOutput> {
  const result = await generateJSON<AnalyzeSentimentOutput>(
    ['gemini'],
    { system: SYSTEM, prompt: `Texto a analizar: ${input.textToAnalyze}` },
    'sentiment'
  );

  const valid = ['Positivo', 'Negativo', 'Neutral'] as const;
  return {
    sentiment: valid.includes(result.sentiment as any) ? result.sentiment : 'Neutral',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
