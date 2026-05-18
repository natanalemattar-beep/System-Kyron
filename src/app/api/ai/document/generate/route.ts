import { NextRequest, NextResponse } from "next/server";
import { documentGeneratorAgent } from "@/lib/ai/agents/document-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type) {
      return NextResponse.json(
        { error: "Falta tipo de documento" },
        { status: 400 }
      );
    }

    switch (type) {
      case "invoice":
        if (!data || !data.clientName || !data.items) {
          return NextResponse.json(
            { error: "Datos incompletos para factura" },
            { status: 400 }
          );
        }
        const invoice = await documentGeneratorAgent.generateInvoice(data);
        return NextResponse.json(invoice);

      case "contract":
        if (!data || !data.partyA || !data.partyB) {
          return NextResponse.json(
            { error: "Datos incompletos para contrato" },
            { status: 400 }
          );
        }
        const contract = await documentGeneratorAgent.generateContract(data);
        return NextResponse.json(contract);

      case "custom":
        if (!data || !data.fields) {
          return NextResponse.json(
            { error: "Datos incompletos para documento custom" },
            { status: 400 }
          );
        }
        const customDoc = await documentGeneratorAgent.generateDocument({
          type: "custom",
          language: data.language || "es",
          fields: data.fields,
          tone: data.tone,
        });
        return NextResponse.json(customDoc);

      default:
        return NextResponse.json(
          { error: "Tipo no válido. Use: invoice, contract, custom" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Document Generator AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
