import { NextRequest, NextResponse } from "next/server";
import { documentAnalyzerAgent } from "@/lib/ai/agents/document-analyzer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, content, documentType, regulations, doc1, doc2 } = body;

    if (!content && action !== "compare") {
      return NextResponse.json(
        { error: "Falta contenido del documento" },
        { status: 400 }
      );
    }

    switch (action) {
      case "analyze":
        const analysis = await documentAnalyzerAgent.analyzeDocument(
          content,
          documentType || "general"
        );
        return NextResponse.json(analysis);

      case "extract":
        const extractedData = await documentAnalyzerAgent.extractKeyData(content);
        return NextResponse.json({ extractedData });

      case "compliance":
        if (!regulations || !Array.isArray(regulations)) {
          return NextResponse.json(
            { error: "Faltan regulaciones para verificar" },
            { status: 400 }
          );
        }
        const compliance = await documentAnalyzerAgent.checkCompliance(
          content,
          documentType || "general",
          regulations
        );
        return NextResponse.json(compliance);

      case "compare":
        if (!doc1 || !doc2) {
          return NextResponse.json(
            { error: "Faltan documentos para comparar" },
            { status: 400 }
          );
        }
        const comparison = await documentAnalyzerAgent.compareDocuments(doc1, doc2);
        return NextResponse.json(comparison);

      case "validate":
        const validation = await documentAnalyzerAgent.validateDocument(
          content,
          documentType || "general"
        );
        return NextResponse.json(validation);

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: analyze, extract, compliance, compare, validate" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Document Analyzer AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
