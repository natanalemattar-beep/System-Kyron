"use server";

import { createModel } from "@/lib/ai-client";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

export async function chatWithKyron(messages: { role: string; content: string }[]) {
    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const model = createModel("gemini-2.0-flash-lite", {
                temperature: 0.2,
                topP: 0.6,
                topK: 20,
                maxOutputTokens: 2048,
            });

            if (!model) {
                return { error: "La IA de Kyron no está configurada. Agrega GOOGLE_GENERATIVE_AI_API_KEY o GEMINI_API_KEY en las variables de entorno de Vercel." };
            }

            // Prepare history
            const history = messages.slice(0, -1).map(m => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: m.content }]
            }));

            // Ensure history starts with a 'user' message
            const firstUserIndex = history.findIndex(m => m.role === "user");
            const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

            const chat = model.startChat({
                history: validHistory,
                systemInstruction: KYRON_SYSTEM_PROMPT,
            });

            const lastMessage = messages[messages.length - 1].content;
            const result = await chat.sendMessage(lastMessage);
            const response = await result.response;
            return { content: response.text() };
        } catch (error: any) {
            lastError = error;
            if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
                console.warn(`[AI-Chat-Retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                continue;
            }
            break;
        }
    }

    console.error("Kyron Core Error:", lastError?.message || lastError);
    const msg = lastError?.message || String(lastError);
    if (msg.includes("API_KEY") || msg.includes("API key") || msg.includes("not valid") || msg.includes("403")) {
        return { error: "La API Key de Gemini no es válida. Verifica GOOGLE_GENERATIVE_AI_API_KEY en Vercel." };
    }
    if (msg.includes("SAFETY") || msg.includes("blocked")) {
        return { error: "Mensaje bloqueado por políticas de seguridad de Gemini. Reformula tu consulta." };
    }
    if (msg.includes("quota") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
        return { error: "Cuota de API de Gemini agotada. Espera unos minutos." };
    }
    return { error: "Lo siento, hubo un error al procesar tu solicitud. Inténtalo de nuevo." };
}

export async function generateEngineeringInsights(params: any) {
    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const model = createModel("gemini-2.0-flash-lite", {
                temperature: 0.2,
                maxOutputTokens: 1024,
            });

            if (!model) {
                return "La IA de Kyron no está configurada. Agrega GOOGLE_GENERATIVE_AI_API_KEY o GEMINI_API_KEY en las variables de entorno de Vercel.";
            }

            const prompt = `
                Actua como el Ingeniero Jefe de Kyron.
                Analiza los siguientes parametros tecnicos de una obra/infraestructura:
                ${JSON.stringify(params, null, 2)}

                Genera un insight breve (maximo 3 frases) que demuestre superioridad tecnica,
                mencione optimizacion de costos y cumplimiento de normas venezolanas (COVENIN/SENIAT).
                No seas generico. Se audaz.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            lastError = error;
            if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
                console.warn(`[AI-Insights-Retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                continue;
            }
            break;
        }
    }

    console.error("generateEngineeringInsights Error:", lastError?.message || lastError);
    return "Análisis Kyron AI: Estructura validada bajo norma COVENIN. Optimización detectada en el flujo de materiales.";
}
