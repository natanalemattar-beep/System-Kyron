'use server';

import { openaiGenerateJSON } from '@/ai/openai';
import { geminiGenerateJSON } from '@/ai/gemini';

export type CategorizeTransactionInput = {
  transactionDescription: string;
  transactionAmount: number;
};

export type CategorizeTransactionOutput = {
  category: string;
  confidence: number;
};

const SYSTEM = `You are a financial expert. Categorize transactions based on their description and amount. Respond with a JSON object containing "category" (string like "Food", "Transportation", "Utilities", "Income", etc.) and "confidence" (number between 0 and 1).`;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  const prompt = `Transaction Description: ${input.transactionDescription}\nTransaction Amount: ${input.transactionAmount}`;

  let result: CategorizeTransactionOutput;
  try {
    result = await openaiGenerateJSON<CategorizeTransactionOutput>({
      system: SYSTEM,
      prompt,
    });
  } catch (err) {
    console.error('[categorize-tx] OpenAI failed, trying Gemini:', err);
    result = await geminiGenerateJSON<CategorizeTransactionOutput>({
      system: SYSTEM,
      prompt,
    });
  }

  return {
    category: result.category || 'Otros',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
