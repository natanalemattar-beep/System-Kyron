"use server";

import {
  categorizeTransaction,
  CategorizeTransactionInput,
  CategorizeTransactionOutput,
} from "@/ai/flows/transaction-auto-categorization";

export async function categorizeTransactionAction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    const result = await categorizeTransaction(input);
    return result;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
