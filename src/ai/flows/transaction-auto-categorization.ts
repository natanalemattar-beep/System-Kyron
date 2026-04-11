'use server';

import { generateJSON } from '@/ai/providers';

export type CategorizeTransactionInput = {
  transactionDescription: string;
  transactionAmount: number;
};

export type CategorizeTransactionOutput = {
  category: string;
  confidence: number;
};

const SYSTEM = `Eres un experto financiero venezolano. Categoriza transacciones por descripción y monto.

CATEGORÍAS: Alimentación, Transporte, Servicios, Nómina, Alquiler, Impuestos, Insumos de Oficina, Tecnología, Mantenimiento, Seguros, Honorarios Profesionales, Publicidad y Marketing, Ventas, Otros Ingresos, Otros Gastos

Responde con JSON: { "category": "...", "confidence": 0-1 }`;

export async function categorizeTransaction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput> {
  const result = await generateJSON<CategorizeTransactionOutput>(
    ['openai', 'gemini', 'deepseek'],
    { system: SYSTEM, prompt: `Descripción: ${input.transactionDescription}\nMonto: ${input.transactionAmount}` },
    'categorize-tx'
  );

  return {
    category: result.category || 'Otros Gastos',
    confidence: typeof result.confidence === 'number' ? Math.min(1, Math.max(0, result.confidence)) : 0.5,
  };
}
