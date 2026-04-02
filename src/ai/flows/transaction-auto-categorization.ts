'use server';

import { openaiGenerateJSON } from '@/ai/openai';

export type CategorizeTransactionInput = {
  transactionDescription: string;
  transactionAmount: number;
};

export type CategorizeTransactionOutput = {
  category: string;
  confidence: number;
};

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  const result = await openaiGenerateJSON<CategorizeTransactionOutput>({
    system: `You are a financial expert. Categorize transactions based on their description and amount. Respond with a JSON object containing "category" (string like "Food", "Transportation", "Utilities", "Income", etc.) and "confidence" (number between 0 and 1).`,
    prompt: `Transaction Description: ${input.transactionDescription}\nTransaction Amount: ${input.transactionAmount}`,
  });

  return {
    category: result.category || 'Otros',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
