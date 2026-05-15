'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

const apiKey = process.env.GEMINI_API_KEY || "";
let model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null;
if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: KYRON_SYSTEM_PROMPT
    });
}

export async function getPitchAdvice(slideTitle: string, slideBody: string, slideContext: string) {
    if (!model || !apiKey) {
        return "Configura GEMINI_API_KEY en Vercel para activar el Coach de IA.";
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
