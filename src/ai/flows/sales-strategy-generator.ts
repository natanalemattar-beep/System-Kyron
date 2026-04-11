'use server';

import { generateJSON } from '@/ai/providers';

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

const SYSTEM = `Eres un estratega de ventas para una empresa venezolana.
Genera exactamente 3 estrategias creativas y accionables.

Cada estrategia: icon ('Package'|'Tag'|'Users'), titulo, descripcion (2-3 oraciones), impacto (estimación).
Considera contexto venezolano: tasa BCV, poder adquisitivo local.
Responde con JSON: { "strategies": [...] }`;

export async function generateSalesStrategies(input: SalesStrategyInput): Promise<SalesStrategyOutput> {
  const prompt = `Productos más vendidos: ${JSON.stringify(input.topProducts)}
Productos menos vendidos: ${JSON.stringify(input.bottomProducts)}

Genera 3 estrategias de combos, ventas cruzadas y fidelización.`;

  const result = await generateJSON<SalesStrategyOutput>(
    ['openai', 'gemini', 'deepseek'],
    { system: SYSTEM, prompt, maxTokens: 2048 },
    'sales-strategy'
  );

  return { strategies: (result.strategies || []).slice(0, 3) };
}
