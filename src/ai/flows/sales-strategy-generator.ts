'use server';

import { openaiGenerateJSON } from '@/ai/openai';

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

export async function generateSalesStrategies(input: SalesStrategyInput): Promise<SalesStrategyOutput> {
  const result = await openaiGenerateJSON<SalesStrategyOutput>({
    system: `You are a world-class sales and marketing strategist for a Venezuelan company selling office supplies, tech, and furniture.
Generate exactly 3 creative, actionable, and impactful sales strategies.
Each strategy must have: icon ('Package' for bundling, 'Tag' for discounts, 'Users' for loyalty), titulo (string), descripcion (string), impacto (string).
Return a JSON with key "strategies" containing an array of exactly 3 objects.`,
    prompt: `Top Selling Products: ${JSON.stringify(input.topProducts)}
Bottom Selling Products: ${JSON.stringify(input.bottomProducts)}

Generate 3 strategies focused on bundling, cross-selling, and loyalty programs.`,
    maxTokens: 2048,
  });

  return {
    strategies: (result.strategies || []).slice(0, 3),
  };
}
