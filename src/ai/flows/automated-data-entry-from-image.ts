'use server';
/**
 * @fileOverview An automated data entry AI agent.
 *
 * - automatedDataEntry - A function that handles the data extraction process from images.
 * - AutomatedDataEntryInput - The input type for the automatedDataEntry function.
 * - AutomatedDataEntryOutput - The return type for the automatedDataEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedDataEntryInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a receipt or invoice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Additional description of the document.'),
});
export type AutomatedDataEntryInput = z.infer<typeof AutomatedDataEntryInputSchema>;

const AutomatedDataEntryOutputSchema = z.object({
  vendorName: z.string().describe('The name of the vendor.'),
  date: z.string().describe('The date on the receipt or invoice (YYYY-MM-DD).'),
  totalAmount: z.number().describe('The total amount due on the receipt or invoice.'),
  items: z.array(
    z.object({
      description: z.string().describe('Description of the item.'),
      quantity: z.number().optional().describe('Quantity of the item.'),
      unitPrice: z.number().describe('Unit price of the item.'),
    })
  ).describe('A list of items on the receipt or invoice.'),
  paymentMethod: z.string().optional().describe('The method of payment used.'),
});
export type AutomatedDataEntryOutput = z.infer<typeof AutomatedDataEntryOutputSchema>;

export async function automatedDataEntry(input: AutomatedDataEntryInput): Promise<AutomatedDataEntryOutput> {
  return automatedDataEntryFlow(input);
}

const automatedDataEntryFlow = ai.defineFlow(
  {
    name: 'automatedDataEntryFlow',
    inputSchema: AutomatedDataEntryInputSchema,
    outputSchema: AutomatedDataEntryOutputSchema,
  },
  async input => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-1.5-pro-latest',
      prompt: `You are an expert financial data extraction specialist.

      You will extract data from the given receipt or invoice image and description, and output in JSON format. You must always populate all the fields with the extracted information. If some information is not available, populate the field with default values (e.g., empty string, 0, or null, where appropriate based on the field's data type. Do not guess or invent data if it's not present in the document.)

      The date MUST be in YYYY-MM-DD format.

      Description: {{{description}}}
      Photo: {{media url=photoDataUri}}

      Make sure you return a valid JSON. If a field is not present, populate the field with default values (e.g., empty string, 0, or null, where appropriate based on the field's data type).
      Make sure the totalAmount reflects the total amount shown in the image.
      Make sure you populate the items array with all the items in the image, listing its description, quantity and unitPrice. If there are not line items, populate with an empty array.
    `,
      input,
      output: { schema: AutomatedDataEntryOutputSchema },
      config: {
        safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH'}],
      }
    });
    return output!;
  }
);
