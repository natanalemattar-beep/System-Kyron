import { NextRequest, NextResponse } from "next/server";
import { analysisAgent } from "@/lib/ai/agents/analysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, data, category } = body;

    if (!data) {
      return NextResponse.json(
        { error: "Faltan datos para analizar" },
        { status: 400 }
      );
    }

    switch (action) {
      case "general":
        const analysis = await analysisAgent.analyze({
          category: category || "general",
          data,
          context: body.context,
          focus: body.focus,
        });
        return NextResponse.json(analysis);

      case "financial":
        const financial = await analysisAgent.financialAnalysis(data);
        return NextResponse.json(financial);

      case "market":
        const market = await analysisAgent.marketAnalysis(data);
        return NextResponse.json(market);

      case "operational":
        const operational = await analysisAgent.operationalAnalysis(data);
        return NextResponse.json(operational);

      case "risk":
        const risk = await analysisAgent.riskAnalysis(data);
        return NextResponse.json(risk);

      case "swot":
        const swot = await analysisAgent.swotAnalysis(data);
        return NextResponse.json(swot);

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: general, financial, market, operational, risk, swot" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Analysis AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
