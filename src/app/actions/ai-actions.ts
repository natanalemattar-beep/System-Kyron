'use server';

import { AiClient } from "@/lib/ai";

export async function getPitchAdvice(slideTitle: string, slideBody: string, slideContext: string) {
    const client = new AiClient();
    if (!client.isConfigured()) {
        return "Configura GOOGLE_GENERATIVE_AI_API_KEY para activar el Coach de IA.";
    }

    try {
        const prompt = `DIAPOSITIVA ACTUAL: "${slideTitle}"
CONTENIDO: "${slideBody}"
ETIQUETA: "${slideContext}"

Dame 3 consejos de oro para mi presentación.`;

        return await client.generate(prompt, {
            temperature: 0.4,
            maxOutputTokens: 1024,
        });
    } catch (error) {
        console.error("Pitch Coach Error:", error);
        return "Error al conectar con la inteligencia de Kyron. Inténtalo de nuevo.";
    }
}
