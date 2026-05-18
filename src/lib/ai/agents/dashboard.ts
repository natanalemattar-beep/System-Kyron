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
      `ANÁLISIS DE MÉTRICAS DE NEGOCIO

MÉTRICAS ACTUALES:
${metricsJson}

INSTRUCCIONES:
1. Para cada métrica, calcula el cambio porcentual: ((value - previousValue) / previousValue) * 100
2. Determina tendencia: "up" si subió, "down" si bajó, "stable" si cambio < 2%
3. Genera un insight accionable basado en el dato real
4. Genera una recomendación específica y concreta
5. Asigna prioridad: "high" si cambio > 20%, "medium" si 5-20%, "low" si < 5%

FORMATO DE RESPUESTA (JSON array):
[
  {
    "metric": "Ingresos",
    "currentValue": 45000,
    "trend": "up",
    "changePercent": 18.4,
    "insight": "Los ingresos crecieron 18.4% respecto al período anterior",
    "recommendation": "Mantener estrategia actual de ventas",
    "priority": "high"
  }
]

Responde SOLO con el JSON array.`,
      {
        systemInstruction:
          "Eres un analista de datos experto en métricas de negocio. Generas insights accionables y recomendaciones específicas basadas en datos reales.",
        temperature: 0.3,
      },
      []
    );

    return Array.isArray(insights) ? insights : [];
  }

  async generateSummary(metrics: MetricData[]): Promise<string> {
    const metricsJson = JSON.stringify(metrics);

    return ai.generateText(
      `RESUMEN EJECUTIVO DE MÉTRICAS

DATOS:
${metricsJson}

Genera un resumen ejecutivo de 3-4 líneas sobre el estado general del negocio. Incluye:
- Tendencia general (positiva/negativa/mixta)
- Punto más destacado
- Área de preocupación principal
- Recomendación general

Máximo 4 líneas.`,
      {
        systemInstruction:
          "Eres un analista ejecutivo. Resúmenes concisos, data-driven, sin fluff. Lenguaje profesional.",
        temperature: 0.4,
      }
    );
  }

  async detectAnomalies(metrics: MetricData[]): Promise<string[]> {
    const metricsJson = JSON.stringify(metrics);

    const anomalies = await ai.generateJson<string[]>(
      `DETECCIÓN DE ANOMALÍAS EN MÉTRICAS

MÉTRICAS:
${metricsJson}

Detecta anomalías:
- Cambios > 30% respecto al período anterior
- Valores atípicos o inconsistentes
- Patrones inusuales
- Métricas que contradicen otras métricas

FORMATO DE RESPUESTA (JSON array de strings):
["La Tasa de churn aumentó 100% (de 4.1% a 8.2%)", "Los gastos crecieron más rápido que los ingresos"]

Si no hay anomalías, devuelve array vacío [].
Responde SOLO con el JSON array.`,
      {
        systemInstruction:
          "Eres un detector de anomalías en datos de negocio. Identificas cambios significativos y patrones inusuales.",
        temperature: 0.2,
      },
      []
    );

    return Array.isArray(anomalies) ? anomalies : [];
  }

  async generateForecast(
    metrics: MetricData[],
    periods: number = 3
  ): Promise<{ metric: string; forecast: number[]; confidence: number }[]> {
    const metricsJson = JSON.stringify(metrics);

    const forecast = await ai.generateJson<
      { metric: string; forecast: number[]; confidence: number }[]
    >(
      `PRONÓSTICO DE MÉTRICAS

MÉTRICAS HISTÓRICAS:
${metricsJson}

Genera un pronóstico para los próximos ${periods} períodos para cada métrica.
Incluye nivel de confianza (0-1) basado en la consistencia de los datos.

FORMATO DE RESPUESTA (JSON array):
[
  {"metric": "Ingresos", "forecast": [48000, 52000, 55000], "confidence": 0.8}
]

Responde SOLO con el JSON array.`,
      {
        systemInstruction:
          "Eres un analista predictivo. Generas pronósticos basados en tendencias históricas.",
        temperature: 0.3,
      },
      []
    );

    return Array.isArray(forecast) ? forecast : [];
  }
}

export const dashboardAgent = new DashboardAgent();
