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
  if (!match) throw new Error('Formato de URI de datos inválido');

  const [, rawMediaType, base64Data] = match;

  if (!ALLOWED_MIME_TYPES.includes(rawMediaType as AllowedMimeType)) {
    throw new Error(`Tipo de imagen no soportado: ${rawMediaType}. Soportados: ${ALLOWED_MIME_TYPES.join(', ')}`);
  }

  const mediaType = rawMediaType as AllowedMimeType;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system: `Eres un especialista en extracción de datos financieros. Extrae datos de imágenes de recibos y facturas venezolanas y devuelve JSON válido únicamente, sin markdown ni backticks.

El JSON debe tener:
- vendorName (string): nombre del proveedor/comercio
- date (string, formato YYYY-MM-DD): fecha de la transacción
- totalAmount (number): monto total
- items (array de objetos con: description (string), quantity (number opcional), unitPrice (number)): lista de productos/servicios
- paymentMethod (string o null): método de pago (efectivo, tarjeta, Pago Móvil, Zelle, transferencia, etc.)

Si algún dato no está disponible, usa valores por defecto (cadena vacía, 0, null).
Reconoce montos en Bs. (bolívares) y USD. Si hay RIF, inclúyelo en el nombre del proveedor.`,
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
            text: `Extrae todos los datos de esta imagen de recibo/factura.${input.description ? ` Contexto adicional: ${input.description}` : ''}
Devuelve SOLO JSON válido.`,
          },
        ],
      },
    ],
  });

  if (!response.content.length) {
    throw new Error('La IA no devolvió contenido para la extracción de imagen');
  }

  const block = response.content[0];
  if (block.type !== 'text') {
    throw new Error('La IA devolvió una respuesta no textual para la extracción de imagen');
  }

  const cleaned = block.text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(cleaned);
  } catch {
    throw new Error(`La IA devolvió JSON inválido: ${cleaned.substring(0, 200)}`);
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
