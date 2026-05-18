import { ai } from "../client";
import type { DashboardInsight } from "../types";

export interface MetricData {
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  period: string;
}

export class DashboardAgent {
  async generateInsights(metrics: MetricData[]): Promise<DashboardInsight[]> {
    const metricsJson = JSON.stringify(
      metrics.map((m) => ({
        name: m.name,
        value: m.value,
        previousValue: m.previousValue,
        unit: m.unit,
        period: m.period,
      }))
    );

    const insights = await ai.generateJson<DashboardInsight[]>(
      `Métricas actuales:
${metricsJson}

Analiza cada métrica:
- Calcula el cambio porcentual: ((value - previousValue) / previousValue) * 100
- Determina tendencia: "up" si subió, "down" si bajó, "stable" si cambio < 2%
- Genera un insight accionable basado en el dato
- Genera una recomendación específica
- Asigna prioridad: "high" si cambio > 20%, "medium" si 5-20%, "low" si < 5%

Responde solo con JSON array de insights.`,
      {
        systemInstruction:
          "Eres un analista de datos experto. Generas insights accionables y recomendaciones específicas basadas en métricas de negocio.",
        temperature: 0.3,
      }
    );

    return insights;
  }

  async generateSummary(metrics: MetricData[]): Promise<string> {
    const metricsJson = JSON.stringify(metrics);

    return ai.generateText(
      `Métricas del período:
${metricsJson}

Genera un resumen ejecutivo de 3-4 líneas sobre el estado general del negocio.`,
      {
        systemInstruction:
          "Eres un analista ejecutivo. Resúmenes concisos, datos-driven, sin fluff.",
      }
    );
  }

  async detectAnomalies(metrics: MetricData[]): Promise<string[]> {
    const metricsJson = JSON.stringify(metrics);

    const anomalies = await ai.generateJson<string[]>(
      `Métricas:
${metricsJson}

Detecta anomalías: cambios > 30% respecto al período anterior, valores atípicos, o patrones inusuales. Devuelve solo un array de strings describiendo cada anomalía encontrada. Si no hay anomalías, devuelve array vacío.`,
      {
        systemInstruction:
          "Eres un detector de anomalías en datos de negocio.",
        temperature: 0.2,
      }
    );

    return anomalies;
  }
}

export const dashboardAgent = new DashboardAgent();
