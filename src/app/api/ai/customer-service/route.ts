import { NextRequest, NextResponse } from "next/server";
import { customerServiceAgent } from "@/lib/ai/agents/customer-service";
import type { CustomerContext } from "@/lib/ai/agents/customer-service";

function sanitizeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Error desconocido";
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "JSON inválido en el cuerpo de la solicitud" },
        { status: 400 }
      );
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "El cuerpo debe ser un objeto JSON" },
        { status: 400 }
      );
    }

    const { action, context } = body;

    if (!context || typeof context !== "object" || !(context as Record<string, unknown>).customerId) {
      return NextResponse.json(
        { error: "Falta contexto del cliente" },
        { status: 400 }
      );
    }

    const customerContext = context as CustomerContext;

    switch (action) {
      case "analyze":
        const actions = await customerServiceAgent.analyzeCustomer(customerContext);
        return NextResponse.json({ actions });

      case "email":
        const email = await customerServiceAgent.generateEmail(customerContext, body.purpose as string);
        return NextResponse.json({ email });

      case "note":
        const note = await customerServiceAgent.generateAdvisorNote(customerContext, body.issue as string);
        return NextResponse.json({ note });

      case "draft":
        if (!body.inquiry || typeof body.inquiry !== "string") {
          return NextResponse.json(
            { error: "Falta la consulta del cliente (inquiry)" },
            { status: 400 }
          );
        }
        const draft = await customerServiceAgent.generateDraftResponse(customerContext, body.inquiry as string);
        return NextResponse.json({ draft });

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: analyze, email, note, draft" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Customer Service AI Error:", sanitizeError(error));
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
