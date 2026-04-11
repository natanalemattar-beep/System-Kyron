'use server';

import { generateTextWithFallback } from '@/ai/providers';

export type LegalDocumentInput = {
  documentType: string;
  parties: string;
  specificClauses?: string;
};

export type LegalDocumentOutput = string;

const LEGAL_SYSTEM = `Eres un experto abogado venezolano senior en derecho civil y mercantil.
Redacta documentos legales profesionales con lenguaje jurídico formal y preciso.
Incluye referencias a leyes vigentes (Código Civil, Código de Comercio, Ley de Arrendamientos, etc.).
Incluye cláusulas estándar: Objeto, Duración, Precio/Monto, Obligaciones, Domicilio y Jurisdicción.`;

export async function generateLegalDocument(input: LegalDocumentInput): Promise<LegalDocumentOutput> {
  const prompt = `Redacta un borrador profesional de: ${input.documentType}.

LAS PARTES:
${input.parties}

REQUISITOS ADICIONALES:
${input.specificClauses ?? 'Ninguno especificado.'}

Escribe el documento completo con formato profesional.`;

  return generateTextWithFallback(
    ['gemini', 'openai', 'deepseek'],
    { system: LEGAL_SYSTEM, prompt, maxTokens: 4096 },
    'legal-doc'
  );
}
