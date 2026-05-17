'use server';

import { createModel } from "@/lib/ai-client";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

export async function getPitchAdvice(slideTitle: string, slideBody: string, slideContext: string) {
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

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Error al conectar con la inteligencia de Kyron.";
    }
}
