'use server';

import { generateJSON } from '@/ai/providers';

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

export async function automatedDataEntry(input: AutomatedDataEntryInput): Promise<AutomatedDataEntryOutput> {
  const SYSTEM = `Eres un especialista en extracción de datos financieros. Extrae datos de imágenes de recibos y facturas venezolanas y devuelve JSON válido únicamente.

El JSON debe tener:
- vendorName (string): nombre del proveedor/comercio
- date (string, formato YYYY-MM-DD): fecha de la transacción
- totalAmount (number): monto total
- items (array de objetos con: description (string), quantity (number opcional), unitPrice (number))
- paymentMethod (string o null): método de pago

Si algún dato no está disponible, usa valores por defecto. Reconoce montos en Bs. y USD. Si hay RIF, inclúyelo en vendorName.`;

  const result = await generateJSON<AutomatedDataEntryOutput>(
    ['gemini'],
    { 
      system: SYSTEM, 
      prompt: `Extrae todos los datos de esta imagen de recibo/factura.${input.description ? ` Contexto: ${input.description}` : ''}`,
      image: input.photoDataUri 
    },
    'automated-entry'
  );

  const data = result;

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
