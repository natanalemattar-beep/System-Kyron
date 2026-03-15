'use server';

import { categorizeTransaction, type CategorizeTransactionInput, type CategorizeTransactionOutput } from "@/ai/flows/transaction-auto-categorization";

/**
 * @fileOverview Acción de servidor centralizada para la categorización de transacciones.
 */

export async function categorizeTransactionAction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    const result = await categorizeTransaction(input);
    return result;
  } catch (error) {
    console.error("Error en el proceso de categorización:", error);
    return { error: "No se pudo completar la categorización automática en este momento." };
  }
}
