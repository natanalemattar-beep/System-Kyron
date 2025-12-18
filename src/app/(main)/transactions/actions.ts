'use server';

import {
  categorizeTransaction,
  type CategorizeTransactionInput,
  type CategorizeTransactionOutput,
} from '@/ai/flows/transaction-auto-categorization';

export async function categorizeTransactionAction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    const result = await categorizeTransaction(input);
    return result;
  } catch (e: any) {
    console.error(e);
    // Ensure a consistent error object is returned
    const errorMessage = e.message || 'An unknown error occurred during categorization.';
    return { error: errorMessage };
  }
}
