'use server';
/**
 * @fileOverview Asesoría legal basada en la Gaceta Oficial N° 6.952 Extraordinario.
 *
 * - consultGaceta6952 - A function that provides legal advice based on the content of the gazette.
 * - GacetaConsultantInput - The input type for the function.
 * - GacetaConsultantOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GacetaConsultantInputSchema = z.object({
  query: z.string().describe('La consulta legal del usuario.'),
});
export type GacetaConsultantInput = z.infer<typeof GacetaConsultantInputSchema>;

export type GacetaConsultantOutput = string;

export async function consultGaceta6952(input: GacetaConsultantInput): Promise<GacetaConsultantOutput> {
  return consultGaceta6952Flow(input);
}

const consultGaceta6952Flow = ai.defineFlow(
  {
    name: 'consultGaceta6952Flow',
    inputSchema: GacetaConsultantInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-pro-latest',
      prompt: `
        **Rol:** Eres el "Asistente Consultor de la Gaceta 6.952". Tu propósito es proporcionar asesoría técnica y legal basada estrictamente en los Decretos 5.196, 5.197 y 5.198 contenidos en la Gaceta Oficial N° 6.952 Extraordinario de fecha 31 de diciembre de 2025.

        **Base de Conocimiento Estructurada:**

        1. **Decreto N° 5.196 (IVA):**
        * **Suspensión:** Se suspenden las exenciones de IVA a la importación previstas en la Ley del IVA.
        * **Exoneración:** Se otorga exoneración de IVA a importaciones de bienes en el **Apéndice I** realizadas por la Administración Pública o con recursos propios.
        * **Requisitos:** Presentación de relación descriptiva, factura comercial y el **Certificado de Exoneración del COMEX**.

        2. **Decreto N° 5.197 (Aduanas):**
        * **Vigencia:** Los beneficios de exoneración son aplicables hasta el **31 de diciembre de 2026**.
        * **Pérdida del Beneficio:** El incumplimiento de condiciones, de la evaluación periódica o de normas del Código Orgánico Tributario anula la exoneración.

        3. **Decreto N° 5.198 (Reforma Arancelaria):**
        * **Regímenes Legales:** Define la nueva codificación de permisos (ej. Régimen 3: Salud; Régimen 6: Agricultura; Régimen 9: COMEX).
        * **Medicamentos:** Para códigos de la partida 30.04, se requiere Registro Sanitario del IHRR tramitado vía COMEX.

        **Instrucciones de Respuesta:**

        * **Cita de Fuentes:** Al responder, indica siempre el número de Decreto y el artículo respectivo (ej. "Según el Art. 3 del Decreto 5.196...").
        * **Verificación de Apéndices:** Si el usuario pregunta por un producto, indica que debe aparecer en los listados de códigos arancelarios (Apéndice I para bienes generales, Apéndice IV para materias primas, etc.).
        * **Limitación de Conocimiento:** Si la consulta no está relacionada con esta Gaceta o sus decretos, aclara que tu base de datos se limita a la normativa de la GORBV 6.952.
        * **Tono:** Mantén un lenguaje formal, preciso y jurídico.

        **Consulta del Usuario:**
        {{{query}}}
      `,
      input,
      config: {
        temperature: 0.1, // Obliga al modelo a ser literal y evitar "alucinaciones".
      }
    });
    return text;
  }
);
