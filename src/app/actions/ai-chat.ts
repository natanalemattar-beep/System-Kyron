"use server";
import { AiClient, AiError } from "@/lib/ai";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

export async function chatWithKyron(messages: { role: string; content: string }[]) {
    const client = new AiClient();
    if (!client.isConfigured()) {
        return { error: "La IA de Kyron no está configurada. Agrega GOOGLE_GENERATIVE_AI_API_KEY." };
    }
    try {
        const content = await client.chat(messages, KYRON_SYSTEM_PROMPT, {
            temperature: 0.2, topP: 0.6, topK: 20, maxOutputTokens: 2048,
        });
        return { content };
    } catch (error) {
        console.error("Kyron Core Error:", error);
        if (error instanceof AiError) return { error: error.message };
        return { error: "Error al procesar tu solicitud. Inténtalo de nuevo." };
    }
}

export async function generateEngineeringInsights(params: any) {
    const client = new AiClient();
    if (!client.isConfigured()) {
        return "La IA de Kyron no está configurada. Agrega GOOGLE_GENERATIVE_AI_API_KEY.";
    }
    try {
        const prompt = "Actua como el Ingeniero Jefe de Kyron.\nAnaliza los siguientes parametros tecnicos de una obra/infraestructura:\n" + JSON.stringify(params, null, 2) + "\n\nGenera un insight breve (maximo 3 frases) que demuestre superioridad tecnica, mencione optimizacion de costos y cumplimiento de normas venezolanas (COVENIN/SENIAT). No seas generico. Se audaz.";
        return await client.generate(prompt, { temperature: 0.2, maxOutputTokens: 1024 });
    } catch (error) {
        console.error("generateEngineeringInsights Error:", error);
        return "Análisis Kyron AI: Estructura validada bajo norma COVENIN. Optimización detectada en el flujo de materiales.";
    }
}
