import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";
import { setupToolImplementations } from "@/lib/ai/tool-implementations";
import { coreTools } from "@/lib/ai/tools";

export async function POST(req: NextRequest) {
  try {
    const { mensaje, context } = await req.json();

    if (!mensaje) {
      return NextResponse.json({ success: false, error: "Mensaje requerido" }, { status: 400 });
    }

    // 1. Setup tools (this should ideally be done once at startup, but for serverless we do it per request)
    await setupToolImplementations();

    // 2. Construct System Instruction based on context
    const systemInstruction = `Eres el Cerebro Operativo de System Kyron, un Sistema Operativo para empresas y máquinas fiscales.
Tu objetivo es ayudar al usuario a gestionar su empresa, contabilidad, fiscalidad, personal y conectividad de forma automatizada.

Contexto de la sesión:
${JSON.stringify(context || {})}

REGLAS DE ORO:
1. Si el usuario pide realizar una acción (ej: "registra un empleado", "cambia el tema", "cierra el periodo"), utiliza las herramientas disponibles.
2. Si una acción requiere parámetros que no tienes, NO inventes. Pide al usuario la información necesaria.
3. Siempre confirma que la acción se ha realizado con un mensaje amable y profesional.
4. Si una acción es crítica (ej: borrar datos, cambios de impuestos), pide una confirmación explícita al usuario antes de ejecutarla (esto se manejará en el frontend, pero tú debes sugerirlo).
5. Responde SIEMPRE en un lenguaje profesional, pero cercano.
6. Si el usuario te pide algo que está fuera de tus capacidades, indícalo educadamente.

Eres un AGENTE de acción, no solo un chatbot de ayuda. Tienes el poder de operar el sistema.`;

    // 3. Execute Agentic Loop
    const result = await ai.agenticGenerate(mensaje, {
      systemInstruction,
      tools: coreTools,
      model: "gemini-1.5-flash", // Or "gemini-1.5-pro" for better reasoning
    });

    return NextResponse.json({
      success: true,
      respuesta: result.text,
      acciones: result.toolCalls,
    });
  } catch (error: any) {
    console.error("[Orchestrator Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error interno del cerebro operativo" },
      { status: 500 }
    );
  }
}
