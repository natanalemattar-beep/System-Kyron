import { ai } from "../client";
import type { AnalysisResult, SwotResult } from "../types";

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
      `ANÁLISIS PROFUNDO

CATEGORÍA: ${request.category}
DATOS: ${request.data}
CONTEXTO: ${request.context || "No proporcionado"}
ÁREAS DE ENFOQUE: ${focusJson}

INSTRUCCIONES:
1. Analiza los datos proporcionados en profundidad
2. Identifica hallazgos principales (mínimo 3)
3. Identifica riesgos (mínimo 2)
4. Identifica oportunidades (mínimo 2)
5. Calcula score general 0-100
6. Genera resumen ejecutivo
7. Proporciona pasos siguientes accionables (mínimo 3)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "category": "${request.category}",
  "findings": ["hallazgo 1", "hallazgo 2", "hallazgo 3"],
  "risks": ["riesgo 1", "riesgo 2"],
  "opportunities": ["oportunidad 1", "oportunidad 2"],
  "score": 75,
  "summary": "Resumen ejecutivo del análisis",
  "nextSteps": ["paso 1", "paso 2", "paso 3"]
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un analista experto multifuncional. Realizas análisis profundos, identificas riesgos y oportunidades, y proporcionas recomendaciones accionables. SIEMPRE respondes con el formato JSON especificado.",
        temperature: 0.4,
      },
      {
        category: request.category,
        findings: [],
        risks: [],
        opportunities: [],
        score: 50,
        summary: "",
        nextSteps: [],
      }
    );

    return result;
  }

  async financialAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "financial",
      data,
      focus: ["rentabilidad", "liquidez", "endeudamiento", "eficiencia", "flujo de caja"],
    });
  }

  async marketAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "market",
      data,
      focus: ["competencia", "tendencias", "oportunidades", "amenazas", "cuota de mercado"],
    });
  }

  async operationalAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "operational",
      data,
      focus: ["procesos", "eficiencia", "cuellos de botella", "mejoras", "automatización"],
    });
  }

  async riskAnalysis(data: string): Promise<AnalysisResult> {
    return this.analyze({
      category: "risk",
      data,
      focus: ["riesgos financieros", "riesgos operativos", "riesgos legales", "mitigación", "contingencia"],
    });
  }

  async swotAnalysis(data: string): Promise<SwotResult> {
    const swot = await ai.generateJson<SwotResult>(
      `ANÁLISIS FODA (SWOT)

DATOS:
${data}

INSTRUCCIONES:
1. Identifica fortalezas internas (mínimo 3)
2. Identifica debilidades internas (mínimo 3)
3. Identifica oportunidades externas (mínimo 3)
4. Identifica amenazas externas (mínimo 3)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "strengths": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "weaknesses": ["debilidad 1", "debilidad 2", "debilidad 3"],
  "opportunities": ["oportunidad 1", "oportunidad 2", "oportunidad 3"],
  "threats": ["amenaza 1", "amenaza 2", "amenaza 3"]
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un estratega de negocios experto en análisis FODA. Identificas factores internos y externos con precisión.",
        temperature: 0.4,
      },
      { strengths: [], weaknesses: [], opportunities: [], threats: [] }
    );

    return swot;
  }

  async competitiveAnalysis(data: string): Promise<{
    competitors: { name: string; strengths: string[]; weaknesses: string[]; marketShare: string }[];
    recommendations: string[];
  }> {
    const result = await ai.generateJson<{
      competitors: { name: string; strengths: string[]; weaknesses: string[]; marketShare: string }[];
      recommendations: string[];
    }>(
      `ANÁLISIS COMPETITIVO

DATOS DEL MERCADO:
${data}

INSTRUCCIONES:
1. Identifica competidores principales
2. Analiza fortalezas y debilidades de cada uno
3. Estima cuota de mercado
4. Genera recomendaciones estratégicas

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "competitors": [
    {"name": "Competidor A", "strengths": ["s1", "s2"], "weaknesses": ["w1"], "marketShare": "25%"}
  ],
  "recommendations": ["recomendación 1", "recomendación 2"]
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un analista competitivo experto. Identificas competidores, analizas su posición y generas recomendaciones estratégicas.",
        temperature: 0.4,
      },
      { competitors: [], recommendations: [] }
    );

    return result;
  }
}

export const analysisAgent = new AnalysisAgent();
