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

    const systemPrompt = clientPrompt || `Eres un asistente de System Kyron. Responde SOLO sobre el contexto actual. Si no tienes contexto específico, indícalo. No menciones módulos fuera del alcance de la consulta actual.`;

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
      model: "gemini-1.5-flash",
      temperature: 0.7,
      maxTokens: 1024,
      systemInstruction: systemPrompt,
      timeout: 45000,
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    const msg = error?.message || '';
    const isKeyExhausted = msg.includes('All keys rate limited');
    const isQuota = msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');
    const status = isKeyExhausted ? 503 : isQuota ? 429 : 500;
    console.warn(`[agent-chat] ${status}`, msg);
    return NextResponse.json(
      { error: isKeyExhausted ? 'Agente temporalmente no disponible. Intenta de nuevo en unos segundos.' : msg || 'Error interno del agente' },
      { status }
    );
  }
}
