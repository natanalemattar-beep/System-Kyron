import { ai } from "../client";
import type { DocumentGenerationResult } from "../types";

export interface DocumentTemplate {
  type: "invoice" | "contract" | "proposal" | "report" | "letter" | "custom";
  language: string;
  fields: Record<string, string>;
  tone?: "formal" | "neutral" | "friendly";
}

export class DocumentGeneratorAgent {
  async generateDocument(
    template: DocumentTemplate
  ): Promise<DocumentGenerationResult> {
    const fieldsJson = JSON.stringify(template.fields);

    const result = await ai.generateJson<DocumentGenerationResult>(
      `Genera un documento tipo "${template.type}" en ${template.language}.

Campos del documento:
${fieldsJson}

Tono: ${template.tone || "formal"}

Requisitos:
- El documento debe estar completo y listo para usar
- Incluir todas las secciones estándar para este tipo de documento
- Formato profesional
- Incluir placeholders donde sea necesario
- Generar metadata con: fecha_creacion, autor, version, idioma

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un generador de documentos profesionales. Creas documentos legales, contables y comerciales completos y bien estructurados.",
        temperature: 0.5,
      }
    );

    return result;
  }

  async generateInvoice(data: {
    clientName: string;
    clientTaxId: string;
    items: { description: string; quantity: number; unitPrice: number }[];
    dueDate: string;
    currency: string;
  }): Promise<DocumentGenerationResult> {
    const itemsJson = JSON.stringify(data.items);

    return ai.generateJson<DocumentGenerationResult>(
      `Genera una factura profesional con estos datos:
- Cliente: ${data.clientName}
- RUC/NIT: ${data.clientTaxId}
- Items: ${itemsJson}
- Fecha vencimiento: ${data.dueDate}
- Moneda: ${data.currency}

Incluir: número de factura, fecha emisión, subtotal, impuestos (16% IVA), total, condiciones de pago.`,
      {
        systemInstruction:
          "Eres un generador de facturas profesionales. Formato estándar contable.",
        temperature: 0.3,
      }
    );
  }

  async generateContract(data: {
    partyA: string;
    partyB: string;
    serviceType: string;
    duration: string;
    amount: string;
    currency: string;
  }): Promise<DocumentGenerationResult> {
    return ai.generateJson<DocumentGenerationResult>(
      `Genera un contrato de servicios con:
- Parte A: ${data.partyA}
- Parte B: ${data.partyB}
- Tipo de servicio: ${data.serviceType}
- Duración: ${data.duration}
- Monto: ${data.amount} ${data.currency}

Incluir: cláusulas estándar, confidencialidad, terminación, jurisdicción.`,
      {
        systemInstruction:
          "Eres un abogado que redacta contratos de servicios profesionales. Lenguaje legal preciso.",
        temperature: 0.4,
      }
    );
  }
}

export const documentGeneratorAgent = new DocumentGeneratorAgent();
