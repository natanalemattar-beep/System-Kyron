
'use server';

export type CategorizeTransactionInput = {
    description: string;
    amount: number;
};

export type CategorizeTransactionOutput = {
    category: string;
    confidence: number;
};

export async function categorizeTransactionAction(_input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    // MIGRACIÓN A SISTEMA DETERMINISTA: CATEGORIZACIÓN BASADA EN REGLAS FIJAS
    return {
        category: "General",
        confidence: 1
    };
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return { error: "No se pudo categorizar la transacción en este momento." };
  }
}
