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

const SYSTEM = `Eres un experto financiero venezolano. Categoriza transacciones basándote en su descripción y monto.

CATEGORÍAS VÁLIDAS:
- Alimentación
- Transporte
- Servicios (agua, luz, internet, teléfono)
- Nómina
- Alquiler
- Impuestos (IVA, ISLR, IGTF, municipales)
- Insumos de Oficina
- Tecnología
- Mantenimiento
- Seguros
- Honorarios Profesionales
- Publicidad y Marketing
- Ventas (ingresos)
- Otros Ingresos
- Otros Gastos

Responde con un objeto JSON que contenga "category" (una de las categorías de arriba) y "confidence" (número entre 0 y 1 indicando tu nivel de certeza).`;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  const prompt = `Descripción: ${input.transactionDescription}\nMonto: ${input.transactionAmount}`;

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
    category: result.category || 'Otros Gastos',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
