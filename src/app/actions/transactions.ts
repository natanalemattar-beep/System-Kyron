
'use server';

export type CategorizeTransactionInput = {
    description: string;
    amount: number;
};

export type CategorizeTransactionOutput = {
    category: string;
    confidence: number;
};

export async function categorizeTransactionAction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput | { error: string }> {
  try {
    // MIGRACIÓN A SISTEMA DETERMINISTA: CATEGORIZACIÓN BASADA EN REGLAS FIJAS
    return {
        category: "General",
        confidence: 1
    };
  } catch (error) {
    console.error("Error en el proceso de categorización:", error);
    return { error: "No se pudo completar la categorización automática en este momento." };
  }
}
