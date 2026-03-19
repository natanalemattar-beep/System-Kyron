'use server';
/**
 * @fileOverview An AI agent that analyzes the sentiment of a given text.
 *
 * - analyzeSentiment - A function that analyzes the sentiment of a text.
 * - AnalyzeSentimentInput - The input type for the analyzeSentiment function.
 * - AnalyzeSentimentOutput - The return type for the analyzeSentiment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeSentimentInputSchema = z.object({
  textToAnalyze: z.string().describe('The text to be analyzed for sentiment.'),
});
export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

const AnalyzeSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['Positivo', 'Negativo', 'Neutral'])
    .describe(
      'The overall sentiment of the text: Positivo, Negativo, or Neutral.'
    ),
  confidence: z
    .number()
    .describe(
      'A number between 0 and 1 indicating the confidence level of the sentiment analysis.'
    ),
});
export type AnalyzeSentimentOutput = z.infer<
  typeof AnalyzeSentimentOutputSchema
>;

export async function analyzeSentiment(
  input: AnalyzeSentimentInput
): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-1.5-pro-latest',
      prompt: `You are a sentiment analysis expert. Analyze the sentiment of the following text and classify it as "Positivo", "Negativo", or "Neutral".

      Text to analyze: ${input.textToAnalyze}
      
      Respond with the sentiment and your confidence level.
      Ensure that the "confidence" is between 0 and 1.`,
      output: { schema: AnalyzeSentimentOutputSchema },
      config: {
        safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH'}],
      }
    });
    return output!;
  }
);
