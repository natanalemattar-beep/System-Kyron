'use server';
/**
 * @fileOverview An AI agent that categorizes financial transactions based on their description.
 *
 * - categorizeTransaction - A function that categorizes a transaction.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  transactionDescription: z
    .string()
    .describe('The description of the transaction to categorize.'),
  transactionAmount: z.number().describe('The amount of the transaction.'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the transaction, e.g., "Food", "Transportation", "Utilities", "Income", etc.'
    ),
  confidence: z
    .number()
    .describe(
      'A number between 0 and 1 indicating the confidence level of the categorization.'
    ),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: `You are a financial expert. Categorize the given transaction based on its description and amount.

      Transaction Description: {{{transactionDescription}}}
      Transaction Amount: {{{transactionAmount}}}
      
      Respond with the category of the transaction and your confidence level in the categorization.
      Ensure that the "confidence" is between 0 and 1.`,
      input,
      output: { schema: CategorizeTransactionOutputSchema },
    });
    return output!;
  }
);
