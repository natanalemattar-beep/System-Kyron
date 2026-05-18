import { NextRequest, NextResponse } from "next/server";
import { dashboardAgent } from "@/lib/ai/agents/dashboard";
import type { MetricData } from "@/lib/ai/agents/dashboard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, metrics } = body;

    if (!metrics || !Array.isArray(metrics)) {
      return NextResponse.json(
        { error: "Faltan métricas o formato inválido" },
        { status: 400 }
      );
    }

    const metricData = metrics as MetricData[];

    switch (action) {
      case "insights":
        const insights = await dashboardAgent.generateInsights(metricData);
        return NextResponse.json({ insights });

      case "summary":
        const summary = await dashboardAgent.generateSummary(metricData);
        return NextResponse.json({ summary });

      case "anomalies":
        const anomalies = await dashboardAgent.detectAnomalies(metricData);
        return NextResponse.json({ anomalies });

      case "forecast":
        const forecast = await dashboardAgent.generateForecast(metricData, body.periods || 3);
        return NextResponse.json({ forecast });

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: insights, summary, anomalies, forecast" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Dashboard AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
