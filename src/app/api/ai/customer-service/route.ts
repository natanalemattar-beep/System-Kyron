import { NextRequest, NextResponse } from "next/server";
import { customerServiceAgent } from "@/lib/ai/agents/customer-service";
import type { CustomerContext } from "@/lib/ai/agents/customer-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, context } = body;

    if (!context || !context.customerId) {
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
        const email = await customerServiceAgent.generateEmail(customerContext, body.purpose);
        return NextResponse.json({ email });

      case "note":
        const note = await customerServiceAgent.generateAdvisorNote(customerContext, body.issue);
        return NextResponse.json({ note });

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: analyze, email, note" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Customer Service AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
