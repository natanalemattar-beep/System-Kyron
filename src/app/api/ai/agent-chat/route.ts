import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, context, systemPrompt: clientPrompt, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensaje requerido" },
        { status: 400 }
      );
    }

    const systemPrompt = clientPrompt || `Eres Kyron AI, el asistente inteligente de System Kyron. 
System Kyron es una plataforma integral de gestión empresarial que incluye:
- Contabilidad VEN-NIF (libros legales, tributos, análisis fiscal)
- Facturación fiscal SENIAT
- Asesoría Legal (contratos, permisos, litigios)
- Telecomunicaciones (Mi Línea personal y corporativa)
- Sostenibilidad y eco-créditos
- RRHH y nómina
- CRM y ventas

Responde de forma concisa, profesional y en español. Si no sabes algo, dilo honestamente.`;

    const conversationHistory = history || [];
    const fullPrompt = conversationHistory
      .map((m: { role: string; content: string }) => 
        `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`
      )
      .join('\n');

    const finalPrompt = fullPrompt 
      ? `${fullPrompt}\nUsuario: ${message}`
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
