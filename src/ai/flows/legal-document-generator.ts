'use server';

import { generateText } from '@/ai/anthropic';

export type LegalDocumentInput = {
  documentType: string;
  parties: string;
  specificClauses?: string;
};

export type LegalDocumentOutput = string;

export async function generateLegalDocument(input: LegalDocumentInput): Promise<LegalDocumentOutput> {
  return generateText({
    system: `Eres un experto abogado venezolano senior con amplia experiencia en derecho civil y mercantil.
Redacta documentos legales profesionales con lenguaje jurídico formal, preciso y elegante.
Incluye referencias a leyes vigentes (Código Civil, Código de Comercio, Ley de Arrendamientos, etc.) según corresponda.
Incluye cláusulas estándar: Objeto, Duración, Precio/Monto, Obligaciones de las partes, Domicilio y Jurisdicción.`,
    prompt: `Redacta un borrador profesional de un documento legal de tipo: ${input.documentType}.

LAS PARTES:
${input.parties}

REQUISITOS ADICIONALES:
${input.specificClauses ?? 'Ninguno especificado.'}

Escribe el documento completo con formato profesional.`,
    maxTokens: 4096,
  });
}
