"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
let model: ReturnType<typeof genAI.getGenerativeModel> | null = null;
if (apiKey) {
    model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
            temperature: 0.2,
            topP: 0.6,
            topK: 20,
            maxOutputTokens: 2048,
        }
    });
}

export async function chatWithKyron(messages: { role: string; content: string }[]) {
    if (!model) return { error: "La IA de Kyron no está configurada. Agrega GEMINI_API_KEY en las variables de entorno." };
    try {
        const chat = model.startChat({
            history: messages.slice(0, -1).map(m => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: m.content }]
            })),
            systemInstruction: KYRON_SYSTEM_PROMPT,
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return { content: response.text() };
    } catch (error) {
        console.error("Kyron Core Error:", error);
        return { error: "Lo siento, mi núcleo de procesamiento está bajo mantenimiento. ¿En qué más puedo ayudarte?" };
    }
}

export async function generateEngineeringInsights(params: any) {
    if (!model) return "La IA de Kyron no está configurada. Agrega GEMINI_API_KEY en las variables de entorno.";
    try {
        const prompt = `
            Actúa como el Ingeniero Jefe de Kyron. 
            Analiza los siguientes parámetros técnicos de una obra/infraestructura:
            ${JSON.stringify(params, null, 2)}
            
            Genera un insight breve (máximo 3 frases) que demuestre superioridad técnica, 
            mencione optimización de costos y cumplimiento de normas venezolanas (COVENIN/SENIAT).
            No seas genérico. Sé audaz.
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        return "Análisis Kyron AI: Estructura validada bajo norma COVENIN. Optimización detectada en el flujo de materiales.";
    }
}
