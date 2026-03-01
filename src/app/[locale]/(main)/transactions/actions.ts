
'use server';

import { categorizeTransaction, type CategorizeTransactionInput, type CategorizeTransactionOutput } from "@/ai/flows/transaction-auto-categorization";

export async function categorizeTransactionAction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    const result = await categorizeTransaction(input);
    return result;
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return { error: "No se pudo categorizar la transacción en este momento." };
  }
}
