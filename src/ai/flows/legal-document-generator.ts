
'use server';
/**
 * @fileOverview Generador IA de documentos legales basado en el marco jurídico venezolano.
 *
 * - generateLegalDocument - Genera un borrador de contrato o documento legal.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LegalDocumentInputSchema = z.object({
  documentType: z.string().describe('El tipo de documento a generar (ej: Contrato de Arrendamiento).'),
  parties: z.string().describe('Información de las partes involucradas.'),
  specificClauses: z.string().optional().describe('Cláusulas o requisitos específicos del usuario.'),
});
export type LegalDocumentInput = z.infer<typeof LegalDocumentInputSchema>;

export type LegalDocumentOutput = string;

export async function generateLegalDocument(input: LegalDocumentInput): Promise<LegalDocumentOutput> {
  const { text } = await ai.generate({
    model: 'googleai/gemini-1.5-pro-latest',
    prompt: `Eres un experto abogado venezolano senior con amplia experiencia en derecho civil y mercantil.
    
    Tu tarea es redactar un borrador profesional de un documento legal de tipo: {{{documentType}}}.
    
    LAS PARTES:
    {{{parties}}}
    
    REQUISITOS ADICIONALES:
    {{{specificClauses}}}
    
    INSTRUCCIONES TÉCNICAS:
    1. Usa un lenguaje jurídico formal, preciso y elegante.
    2. Asegúrate de incluir referencias a leyes vigentes (Código Civil, Código de Comercio, Ley de Arrendamientos, etc.) según corresponda.
    3. Incluye las cláusulas estándar: Objeto, Duración, Precio/Monto, Obligaciones de las partes, Domicilio y Jurisdicción.
    4. El documento debe estar listo para revisión legal final.
    
    Escribe el documento completo con formato profesional.`,
    input,
  });
  return text;
}
