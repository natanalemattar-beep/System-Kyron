'use server';
/**
 * @fileOverview An AI agent that generates sales strategies.
 *
 * - generateSalesStrategies - A function that creates sales strategies based on product performance.
 * - SalesStrategyInput - The input type for the function.
 * - SalesStrategyOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Package, Tag, Users } from 'lucide-react';

const SalesStrategyInputSchema = z.object({
  topProducts: z.array(z.object({ name: z.string(), sales: z.number(), revenue: z.string() })).describe("List of top-selling products."),
  bottomProducts: z.array(z.object({ name: z.string(), sales: z.number(), revenue: z.string() })).describe("List of bottom-selling products."),
});
export type SalesStrategyInput = z.infer<typeof SalesStrategyInputSchema>;

const SalesStrategyOutputSchema = z.object({
    strategies: z.array(z.object({
        icon: z.enum(["Package", "Tag", "Users"]).describe("Thematic icon for the strategy (Package, Tag, or Users)."),
        titulo: z.string().describe("A short, catchy title for the strategy."),
        descripcion: z.string().describe("A detailed description of the strategy and its rationale."),
        impacto: z.string().describe("The estimated impact or result of implementing the strategy (e.g., 'Aumento del 15% en ventas').")
    }))
});
export type SalesStrategyOutput = z.infer<typeof SalesStrategyOutputSchema>;

export async function generateSalesStrategies(input: SalesStrategyInput): Promise<SalesStrategyOutput> {
  return generateSalesStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSalesStrategiesPrompt',
  input: { schema: SalesStrategyInputSchema },
  output: { schema: SalesStrategyOutputSchema },
  prompt: `You are a world-class sales and marketing strategist for a Venezuelan company selling office supplies, tech, and furniture.
  
  Analyze the following sales data:
  - Top Selling Products: {{{json topProducts}}}
  - Bottom Selling Products: {{{json bottomProducts}}}

  Based on this data, generate exactly 3 creative, actionable, and impactful sales strategies. For each strategy, provide a title, a description, an estimated impact, and an appropriate icon ('Package' for bundling, 'Tag' for discounts, 'Users' for loyalty programs).
  
  Example Strategy:
  {
    "icon": "Package",
    "titulo": "Crear un Combo 'Kit de Oficina Esencial'",
    "descripcion": "Agrupa 'Resma de Papel', 'Caja de Bolígrafos' y 'Tóner' con un 10% de descuento. Esto incrementa el ticket promedio y rota productos de alta demanda.",
    "impacto": "Aumento del 15% en ventas de productos de papelería."
  }
  
  Focus on strategies like bundling (combos), cross-selling (promociones), and loyalty programs. Be specific and tailor the strategies to the provided products.
  `,
});

const generateSalesStrategiesFlow = ai.defineFlow(
  {
    name: 'generateSalesStrategiesFlow',
    inputSchema: SalesStrategyInputSchema,
    outputSchema: SalesStrategyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
