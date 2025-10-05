'use server';
/**
 * @fileOverview A general purpose chat flow.
 *
 * - chat - A function that handles a user's chat message.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
  context: z.string().optional().describe('The context of the current page or user action.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    prompt: `You are a helpful AI assistant for a business management platform called "System C.M.S". Your goal is to guide users and answer their questions about the platform's features.

The user is currently on a page or in a context described as: "{{{context}}}".

Use this context to answer the user's question. If the user asks what the page is for or what they can do, explain the purpose based on the context.

If the user's message seems unrelated to the provided context, you can act as a general helpful assistant.

The user says:
{{{message}}}
`,
  },
);

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const { text } = await prompt(input);
    return text;
  }
);
