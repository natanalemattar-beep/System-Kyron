import { ai } from "../client";
import type { DocumentAnalysisResult, ComplianceResult, ComparisonResult } from "../types";

export class DocumentAnalyzerAgent {
  async analyzeDocument(
    content: string,
    documentType: string
  ): Promise<DocumentAnalysisResult> {
    const result = await ai.generateJson<DocumentAnalysisResult>(
      `ANÁLISIS DOCUMENTAL COMPLETO

TIPO DE DOCUMENTO ESPERADO: ${documentType}

CONTENIDO DEL DOCUMENTO:
${content}

INSTRUCCIONES:
1. Confirma el tipo de documento real
2. Extrae TODOS los datos clave (fechas, montos, partes, números de identificación, etc.)
3. Detecta anomalías o inconsistencias
4. Evalúa cumplimiento normativo
5. Genera resumen ejecutivo
6. Calcula nivel de confianza (0-1)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "documentType": "tipo_confirmado",
  "extractedData": {"campo1": "valor1", "campo2": "valor2"},
  "anomalies": ["anomalía 1", "anomalía 2"],
  "compliance": "compliant|warning|non_compliant",
  "summary": "Resumen ejecutivo del documento",
  "confidence": 0.95
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un analista documental experto. Extraes datos estructurados, detectas anomalías y evalúas cumplimiento normativo con precisión. SIEMPRE respondes con el formato JSON especificado.",
        temperature: 0.2,
      },
      {
        documentType: documentType,
        extractedData: {},
        anomalies: [],
        compliance: "warning",
        summary: "",
        confidence: 0.5,
      }
    );

    return result;
  }

  async extractKeyData(
    content: string
  ): Promise<Record<string, unknown>> {
    const data = await ai.generateJson<Record<string, unknown>>(
      `EXTRACCIÓN DE DATOS DOCUMENTALES

DOCUMENTO:
${content}

Extrae TODOS los datos clave del documento:
- Fechas (emisión, vencimiento, etc.)
- Montos y cifras
- Nombres de personas o empresas
- Direcciones
- Números de identificación (RUC, NIT, DNI, etc.)
- Números de documento (factura, contrato, etc.)
- Condiciones y términos
- Cualquier otro dato relevante

FORMATO: Objeto JSON con nombres de campos descriptivos y valores extraídos.
Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un extractor de datos documentales. Identificas y extraes toda la información relevante de documentos.",
        temperature: 0.1,
      },
      {}
    );

    return data;
  }

  async checkCompliance(
    content: string,
    documentType: string,
    regulations: string[]
  ): Promise<ComplianceResult> {
    const regulationsJson = JSON.stringify(regulations);

    const result = await ai.generateJson<ComplianceResult>(
      `VERIFICACIÓN DE CUMPLIMIENTO NORMATIVO

DOCUMENTO TIPO: ${documentType}

CONTENIDO:
${content}

REGULACIONES A VERIFICAR:
${regulationsJson}

INSTRUCCIONES:
1. Verifica cada regulación contra el contenido del documento
2. Identifica problemas o incumplimientos
3. Calcula score de cumplimiento (0-100)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "compliant": true|false,
  "issues": ["problema 1", "problema 2"],
  "score": 85
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un auditor de cumplimiento normativo. Verificas documentos contra regulaciones específicas con precisión.",
        temperature: 0.2,
      },
      { compliant: true, issues: [], score: 100 }
    );

    return result;
  }

  async compareDocuments(
    doc1: string,
    doc2: string
  ): Promise<ComparisonResult> {
    const result = await ai.generateJson<ComparisonResult>(
      `COMPARACIÓN DE DOCUMENTOS

DOCUMENTO 1:
${doc1}

DOCUMENTO 2:
${doc2}

INSTRUCCIONES:
1. Identifica TODAS las diferencias entre los documentos
2. Calcula similitud general (0-1, donde 1 = idénticos)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "differences": ["diferencia 1", "diferencia 2"],
  "similarity": 0.85
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un comparador de documentos. Identificas diferencias y calculas similitud con precisión.",
        temperature: 0.1,
      },
      { differences: [], similarity: 0 }
    );

    return result;
  }

  async validateDocument(
    content: string,
    documentType: string
  ): Promise<{ valid: boolean; errors: string[]; warnings: string[]; score: number }> {
    const result = await ai.generateJson<{
      valid: boolean;
      errors: string[];
      warnings: string[];
      score: number;
    }>(
      `VALIDACIÓN DE DOCUMENTO

TIPO: ${documentType}

CONTENIDO:
${content}

INSTRUCCIONES:
1. Verifica que el documento tenga todas las secciones requeridas para su tipo
2. Identifica errores críticos (campos faltantes obligatorios)
3. Identifica warnings (campos recomendados faltantes)
4. Calcula score de validez (0-100)

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "valid": true|false,
  "errors": ["error 1", "error 2"],
  "warnings": ["warning 1"],
  "score": 85
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un validador de documentos. Verificas estructura, campos obligatorios y calidad.",
        temperature: 0.2,
      },
      { valid: true, errors: [], warnings: [], score: 100 }
    );

    return result;
  }
}

export const documentAnalyzerAgent = new DocumentAnalyzerAgent();
