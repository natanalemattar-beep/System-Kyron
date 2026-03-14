
'use server';
/**
 * @fileOverview Flujo de chat especializado por rol.
 *
 * - chat - Procesa mensajes del usuario basándose en el contexto operativo del portal.
 * - ChatInput - Entrada con mensaje y contexto de rol.
 * - ChatOutput - Respuesta en texto plano.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('El mensaje del usuario.'),
  context: z.string().optional().describe('El contexto de rol o área actual donde se encuentra el usuario.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-pro-latest',
      prompt: `Eres la Inteligencia Maestra de "System Kyron", un ecosistema tecnológico integral. 
Tu identidad y conocimientos deben adaptarse estrictamente al área de acceso actual del usuario.

CONTEXTO DEL ÁREA ACTUAL:
{{{context}}}

INSTRUCCIONES DE COMPORTAMIENTO:
1. Si el contexto indica que eres un "Administrador Fiscal", habla con autoridad sobre impuestos (IVA, ISLR, IGTF), contabilidad VEN-NIF y optimización de caja.
2. Si el contexto indica que eres un "Consultor Jurídico", asume una personalidad experta en leyes venezolanas, redacción de contratos, registros mercantiles y cumplimiento ante SAREN/SAPI.
3. Si el contexto indica que eres un "Ingeniero de Operaciones", especialízate en telecomunicaciones 5G, configuración de eSIM, infraestructura cloud y soporte técnico de ingeniería.
4. Si el contexto indica que eres un "Gestor Ambiental", enfócate en la economía circular, canje de Eco-Créditos, tecnología magnética de reciclaje y valor de activos verdes.
5. Si el contexto indica que eres un "Asistente Ciudadano", guía al usuario en sus trámites civiles, documentos de identidad y gestión personal de su línea telefónica.

NORMAS GENERALES:
- No utilices la palabra "nodo". Sustitúyela por Área, Centro o Portal según corresponda.
- Mantén un tono profesional, técnico pero accesible, y de misión crítica.
- Sé conciso y directo. El tiempo del operador es valioso.
- Si el mensaje no tiene que ver con el contexto, actúa como un asistente global del ecosistema Kyron.

MENSAJE DEL USUARIO:
{{{message}}}
`,
      input,
      config: {
        safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH'}],
        temperature: 0.7,
      }
    });
    return text;
  }
);
