import { ai } from "../client";
import type { AnalysisResult } from "../types";

export interface AnalysisRequest {
  category: string;
  data: string;
  context?: string;
  focus?: string[];
}

export class AnalysisAgent {
  async analyze(request: AnalysisRequest): Promise<AnalysisResult> {
    const focusJson = request.focus ? JSON.stringify(request.focus) : "[]";

    const result = await ai.generateJson<AnalysisResult>(
      `Análisis solicitado:
- Categoría: ${request.category}
- Datos: ${request.data}
- Contexto: ${request.context || "No proporcionado"}
- Áreas de enfoque: ${focusJson}

Realiza un análisis completo incluyendo:
- findings: hallazgos principales
- risks: riesgos identificados
- opportunities: oportunidades detectadas
- score: puntuación general 0-100
- summary: resumen ejecutivo
- nextSteps: pasos siguientes recomendados

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un analista experto multifuncional. Realizas análisis profundos, identificas riesgos y oportunidades, y proporcionas recomendaciones accionables.",
        temperature: 0.4,
      }
    );

    return result;
  }

  async financialAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "financial",
      data,
      focus: ["rentabilidad", "liquidez", "endeudamiento", "eficiencia"],
    });
  }

  async marketAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "market",
      data,
      focus: ["competencia", "tendencias", "oportunidades", "amenazas"],
    });
  }

  async operationalAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "operational",
      data,
      focus: ["procesos", "eficiencia", "cuellos de botella", "mejoras"],
    });
  }

  async riskAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "risk",
      data,
      focus: ["riesgos financieros", "riesgos operativos", "riesgos legales", "mitigación"],
    });
  }

  async swotAnalysis(data: string): Promise<{
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  }> {
    const swot = await ai.generateJson<{
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    }>(
      `Realiza un análisis FODA (SWOT) basado en:
${data}

Devuelve:
- strengths: fortalezas
- weaknesses: debilidades
- opportunities: oportunidades
- threats: amenazas

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un estratega de negocios experto en análisis FODA.",
        temperature: 0.4,
      }
    );

    return swot;
  }
}

export const analysisAgent = new AnalysisAgent();
