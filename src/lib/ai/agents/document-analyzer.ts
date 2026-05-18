import { ai } from "../client";
import type { DocumentAnalysisResult } from "../types";

export class DocumentAnalyzerAgent {
  async analyzeDocument(
    content: string,
    documentType: string
  ): Promise<DocumentAnalysisResult> {
    const result = await ai.generateJson<DocumentAnalysisResult>(
      `Analiza el siguiente documento tipo "${documentType}":

${content}

Extrae:
1. Tipo de documento confirmado
2. Datos clave (fechas, montos, partes involucradas, etc.)
3. Anomalías o inconsistencias
4. Estado de cumplimiento normativo
5. Resumen ejecutivo
6. Nivel de confianza (0-1)

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un analista documental experto. Extraes datos estructurados, detectas anomalías y evalúas cumplimiento normativo con precisión.",
        temperature: 0.2,
      }
    );

    return result;
  }

  async extractKeyData(
    content: string
  ): Promise<Record<string, unknown>> {
    const data = await ai.generateJson<Record<string, unknown>>(
      `Extrae todos los datos clave de este documento:

${content}

Devuelve un objeto JSON con todos los campos encontrados: fechas, montos, nombres, direcciones, números de identificación, etc.`,
      {
        systemInstruction:
          "Eres un extractor de datos documentales. Identifica y extrae toda la información relevante.",
        temperature: 0.1,
      }
    );

    return data;
  }

  async checkCompliance(
    content: string,
    documentType: string,
    regulations: string[]
  ): Promise<{ compliant: boolean; issues: string[]; score: number }> {
    const regulationsJson = JSON.stringify(regulations);

    const result = await ai.generateJson<{
      compliant: boolean;
      issues: string[];
      score: number;
    }>(
      `Verifica el cumplimiento normativo de este documento tipo "${documentType}":

${content}

Regulaciones a verificar:
${regulationsJson}

Devuelve:
- compliant: true/false
- issues: array de problemas encontrados
- score: 0-100

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un auditor de cumplimiento normativo. Verificas documentos contra regulaciones específicas.",
        temperature: 0.2,
      }
    );

    return result;
  }

  async compareDocuments(
    doc1: string,
    doc2: string
  ): Promise<{ differences: string[]; similarity: number }> {
    const result = await ai.generateJson<{
      differences: string[];
      similarity: number;
    }>(
      `Compara estos dos documentos:

Documento 1:
${doc1}

Documento 2:
${doc2}

Identifica diferencias y calcula similitud (0-1). Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un comparador de documentos. Identificas diferencias y calculas similitud.",
        temperature: 0.1,
      }
    );

    return result;
  }
}

export const documentAnalyzerAgent = new DocumentAnalyzerAgent();
