import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";

const MAX_INPUT_LENGTH = 4000;
const MAX_HISTORY_LENGTH = 8000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, systemPrompt: clientPrompt, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensaje requerido" },
        { status: 400 }
      );
    }

    if (message.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: `Mensaje demasiado largo (máx. ${MAX_INPUT_LENGTH} caracteres)` },
        { status: 400 }
      );
    }

    const systemPrompt = clientPrompt || `Eres Kyron Core, la IA central del ecosistema System Kyron. Eres el orquestador principal del sistema. Tienes conocimiento AMPLIO sobre TODOS los módulos:

- Contabilidad VEN-NIF y cumplimiento SENIAT
- Asesoría Legal y derecho corporativo venezolano
- RRHH y nómina LOTTT
- Telecomunicaciones (Mi Línea personal y corporativa)
- Ventas y CRM
- Sostenibilidad y eco-créditos
- Portal de Socios
- Informática e IT
- Soporte técnico

Si una consulta requiere una especialidad profunda, indícalo claramente. Responde de forma concisa, profesional y en español. Usa formato markdown. Si no sabes algo, dilo honestamente.`;

    const conversationHistory = history || [];
    let historyText = conversationHistory
      .map((m: { role: string; content: string }) => 
        `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`
      )
      .join('\n');

    if (historyText.length > MAX_HISTORY_LENGTH) {
      historyText = historyText.slice(-MAX_HISTORY_LENGTH);
    }

    const finalPrompt = historyText 
      ? `${historyText}\nUsuario: ${message}`
      : message;

    const response = await ai.generateText(finalPrompt, {
      model: "gemini-2.5-flash",
      temperature: 0.7,
      maxTokens: 1024,
      systemInstruction: systemPrompt,
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("[agent-chat] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Error interno del agente" },
      { status: 500 }
    );
  }
}
