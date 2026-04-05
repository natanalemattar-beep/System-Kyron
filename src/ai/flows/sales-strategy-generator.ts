'use server';

import { openaiGenerateJSON } from '@/ai/openai';
import { geminiGenerateJSON } from '@/ai/gemini';

export type SalesStrategyInput = {
  topProducts: { name: string; sales: number; revenue: string }[];
  bottomProducts: { name: string; sales: number; revenue: string }[];
};

export type SalesStrategyOutput = {
  strategies: {
    icon: 'Package' | 'Tag' | 'Users';
    titulo: string;
    descripcion: string;
    impacto: string;
  }[];
};

const SYSTEM = `Eres un estratega de ventas y marketing de clase mundial para una empresa venezolana.
Genera exactamente 3 estrategias creativas, accionables y de alto impacto para mejorar las ventas.

Cada estrategia debe tener:
- icon: 'Package' (para paquetes/combos), 'Tag' (para descuentos/promociones), o 'Users' (para fidelización/referidos)
- titulo: nombre corto y atractivo de la estrategia (en español)
- descripcion: explicación detallada de cómo implementarla (en español, 2-3 oraciones)
- impacto: estimación del impacto esperado (ej: "+15% en ventas cruzadas", "Retención de 80% de clientes top")

Considera el contexto venezolano: tasa de cambio BCV, poder adquisitivo, preferencias del consumidor local.

Responde con un JSON con la clave "strategies" conteniendo un array de exactamente 3 objetos.`;

export async function generateSalesStrategies(input: SalesStrategyInput): Promise<SalesStrategyOutput> {
  const prompt = `Productos más vendidos: ${JSON.stringify(input.topProducts)}
Productos menos vendidos: ${JSON.stringify(input.bottomProducts)}

Genera 3 estrategias enfocadas en combos de productos, ventas cruzadas y programas de fidelización.`;

  let result: SalesStrategyOutput;
  try {
    result = await openaiGenerateJSON<SalesStrategyOutput>({
      system: SYSTEM,
      prompt,
      maxTokens: 2048,
    });
  } catch (err) {
    console.error('[sales-strategy] OpenAI failed, trying Gemini:', err);
    result = await geminiGenerateJSON<SalesStrategyOutput>({
      system: SYSTEM,
      prompt,
      maxTokens: 2048,
    });
  }

  return {
    strategies: (result.strategies || []).slice(0, 3),
  };
}
