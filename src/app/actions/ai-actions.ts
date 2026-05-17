'use server';

import { createModel } from "@/lib/ai-client";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

export async function getPitchAdvice(slideTitle: string, slideBody: string, slideContext: string) {
    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const model = createModel("gemini-2.0-flash", {
                temperature: 0.4,
                maxOutputTokens: 1024,
            });

            if (!model) {
                return "Configura GEMINI_API_KEY_1 en Vercel para activar el Coach de IA.";
            }

            const prompt = `
                DIAPOSITIVA ACTUAL: "${slideTitle}"
                CONTENIDO: "${slideBody}"
                ETIQUETA: "${slideContext}"

                Dame 3 consejos de oro para mi presentación.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            lastError = error;
            if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
                console.warn(`[AI-Pitch-Retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                continue;
            }
            break;
        }
    }

    console.error("Gemini Error:", lastError?.message || lastError);
    return "Error al conectar con la inteligencia de Kyron. Inténtalo de nuevo.";
}
