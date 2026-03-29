'use server';

import { getAnthropicClient, CLAUDE_MODEL } from '@/ai/anthropic';

export type AutomatedDataEntryInput = {
  photoDataUri: string;
  description?: string;
};

export type AutomatedDataEntryOutput = {
  vendorName: string;
  date: string;
  totalAmount: number;
  items: {
    description: string;
    quantity?: number;
    unitPrice: number;
  }[];
  paymentMethod?: string;
};

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;
type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number];

export async function automatedDataEntry(input: AutomatedDataEntryInput): Promise<AutomatedDataEntryOutput> {
  const client = getAnthropicClient();

  const match = input.photoDataUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid data URI format');

  const [, rawMediaType, base64Data] = match;

  if (!ALLOWED_MIME_TYPES.includes(rawMediaType as AllowedMimeType)) {
    throw new Error(`Unsupported image type: ${rawMediaType}. Supported: ${ALLOWED_MIME_TYPES.join(', ')}`);
  }

  const mediaType = rawMediaType as AllowedMimeType;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system: `You are an expert financial data extraction specialist. Extract data from receipt/invoice images and return valid JSON only, no markdown or backticks.
The JSON must have: vendorName (string), date (YYYY-MM-DD), totalAmount (number), items (array of {description, quantity?, unitPrice}), paymentMethod (string or null).
If information is not available, use defaults (empty string, 0, null).`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64Data,
            },
          },
          {
            type: 'text',
            text: `Extract all data from this receipt/invoice image.${input.description ? ` Additional context: ${input.description}` : ''}
Return ONLY valid JSON.`,
          },
        ],
      },
    ],
  });

  if (!response.content.length) {
    throw new Error('AI returned no content for image extraction');
  }

  const block = response.content[0];
  if (block.type !== 'text') {
    throw new Error('AI returned non-text response for image extraction');
  }

  const cleaned = block.text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(cleaned);
  } catch {
    throw new Error(`AI returned invalid JSON for image extraction: ${cleaned.substring(0, 200)}`);
  }

  const items = Array.isArray(data.items)
    ? data.items.map((item: Record<string, unknown>) => ({
        description: typeof item.description === 'string' ? item.description : '',
        quantity: typeof item.quantity === 'number' ? item.quantity : undefined,
        unitPrice: typeof item.unitPrice === 'number' ? item.unitPrice : 0,
      }))
    : [];

  return {
    vendorName: typeof data.vendorName === 'string' ? data.vendorName : '',
    date: typeof data.date === 'string' ? data.date : new Date().toISOString().split('T')[0],
    totalAmount: typeof data.totalAmount === 'number' ? data.totalAmount : 0,
    items,
    paymentMethod: typeof data.paymentMethod === 'string' ? data.paymentMethod : undefined,
  };
}
