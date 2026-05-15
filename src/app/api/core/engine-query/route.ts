import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * System Kyron Core AI Engine — Professional Implementation
 * Integrates Gemini AI with a robust deterministic fallback.
 */

const KNOWLEDGE_BASE: Record<string, string[]> = {
  saludo: ["¡Hola! Soy Kyron Core AI. Monitoreo la eficiencia y sostenibilidad de tu empresa. ¿En qué puedo ayudarte?"],
  equipo: ["El equipo directivo está conformado por: Carlos Mattar (CEO & Tech), Sebastian Garrido (Ops) y Marcos Sousa (Legal)."],
  sostenibilidad: ["Nuestra bandera es la Sostenibilidad. Con el modelo 'Cero Papel', eliminamos el desperdicio físico y la huella de carbono administrativa."],
  seguridad: ["Seguridad total con Kyron Shield y auditoría en Blockchain. Blindaje legal pericial automatizado."],
  precios: ["Planes: Personal ($3), Empresarial ($10). Módulos SaaS desde $30."],
  reto: ["En el Reto Inspira 2026, System Kyron destaca por unir Rentabilidad con Impacto Ambiental."],
  ayuda: ["Puedo asistirte en Contabilidad, Sostenibilidad (Cero Papel) o Gestión de Líneas Corporativas."]
};

const SYSTEM_PROMPT = `Eres Kyron Core AI, la inteligencia central de System Kyron. 
Tu misión es asesorar a socios y clientes en el marco del Reto Inspira 2026.
Tus pilares son: Sostenibilidad (Cero Papel), Conectividad (5G y Reserva de Emergencia) y Eficiencia Legal/Fiscal.
El equipo directivo es Carlos Mattar, Sebastian Garrido y Marcos Sousa.
Sé profesional, innovador y directo. Si no tienes la información exacta, invita al usuario a contactar a soporte.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ content: "Detecto un error en la transmisión. ¿Puedes repetir tu consulta?", status: 'error' });
    }

    const lastMessage = messages[messages.length - 1].content;
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // 1. Intentar con Gemini si la API Key existe
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const chat = model.startChat({
          history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 250 },
        });

        const result = await chat.sendMessage(SYSTEM_PROMPT + "\n\nUsuario: " + lastMessage);
        const response = await result.response;
        return NextResponse.json({ content: response.text(), provider: 'gemini-pro', status: 'success' });
      } catch (aiError) {
        console.error('[AI-Engine-Warning] Failover to Deterministic:', aiError);
      }
    }

    // 2. Fallback Determinístico (Kyron Nexus v3)
    const query = lastMessage.toLowerCase();
    let fallback = "Como Kyron Core AI, analizo tu consulta. ¿Deseas saber cómo nuestro modelo 'Cero Papel' optimiza tu sostenibilidad o prefieres ver el área Contable?";
    
    if (query.includes('hola') || query.includes('buenos')) fallback = KNOWLEDGE_BASE.saludo[0];
    else if (query.includes('equipo') || query.includes('carlos') || query.includes('sebastian') || query.includes('marcos')) fallback = KNOWLEDGE_BASE.equipo[0];
    else if (query.includes('papel') || query.includes('sostenib') || query.includes('ecologi') || query.includes('ambiente')) fallback = KNOWLEDGE_BASE.sostenibilidad[0];
    else if (query.includes('seguro') || query.includes('shield')) fallback = KNOWLEDGE_BASE.seguridad[0];
    else if (query.includes('precio') || query.includes('plan')) fallback = KNOWLEDGE_BASE.precios[0];
    else if (query.includes('reto') || query.includes('inspira')) fallback = KNOWLEDGE_BASE.reto[0];
    else if (query.includes('ayuda')) fallback = KNOWLEDGE_BASE.ayuda[0];

    return NextResponse.json({ content: fallback, provider: 'kyron-nexus-v3', status: 'success' });

  } catch (error) {
    console.error('[AI-Engine-Critical-Error]', error);
    return NextResponse.json({ content: "El núcleo de Kyron está en mantenimiento preventivo. Por favor, intenta de nuevo en unos momentos.", status: 'offline' });
  }
}
