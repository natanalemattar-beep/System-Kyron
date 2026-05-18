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
    const fieldsJson = JSON.stringify(template.fields, null, 2);

    const result = await ai.generateJson<DocumentGenerationResult>(
      `GENERAR DOCUMENTO PROFESIONAL

TIPO: ${template.type}
IDIOMA: ${template.language}
TONO: ${template.tone || "formal"}

CAMPOS DEL DOCUMENTO:
${fieldsJson}

REQUISITOS:
- El documento debe estar COMPLETO y listo para usar
- Incluir TODAS las secciones estándar para este tipo de documento
- Formato profesional con estructura clara
- Incluir placeholders [PLACEHOLDER] donde sea necesario
- Generar metadata con: fecha_creacion, autor, version, idioma

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "documentType": "${template.type}",
  "content": "CONTENIDO COMPLETO DEL DOCUMENTO AQUÍ",
  "metadata": {"fecha_creacion": "2026-05-17", "autor": "System Kyron AI", "version": "1.0", "idioma": "${template.language}"},
  "warnings": []
}

El campo "content" DEBE contener el documento completo. No dejes el campo vacío.
Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un generador de documentos profesionales. Creas documentos legales, contables y comerciales completos y bien estructurados. SIEMPRE incluyes el contenido completo en el campo 'content'.",
        temperature: 0.4,
      },
      { documentType: template.type, content: "", metadata: {}, warnings: [] }
    );

    if (!result.content || result.content.length < 50) {
      result.content = await this.generateDocumentContent(template);
    }

    return result;
  }

  private async generateDocumentContent(template: DocumentTemplate): Promise<string> {
    return ai.generateText(
      `Genera el contenido completo de un documento tipo "${template.type}" en ${template.language}.

Campos: ${JSON.stringify(template.fields)}
Tono: ${template.tone || "formal"}

Genera SOLO el contenido del documento, sin explicaciones.`,
      {
        systemInstruction:
          "Eres un generador de documentos profesionales. Genera contenido completo y estructurado.",
        temperature: 0.4,
      }
    );
  }

  async generateInvoice(data: {
    clientName: string;
    clientTaxId: string;
    items: { description: string; quantity: number; unitPrice: number }[];
    dueDate: string;
    currency: string;
  }): Promise<DocumentGenerationResult> {
    const itemsJson = JSON.stringify(data.items, null, 2);
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * 0.16;
    const total = subtotal + tax;

    const result = await ai.generateJson<DocumentGenerationResult>(
      `GENERAR FACTURA PROFESIONAL

DATOS:
- Cliente: ${data.clientName}
- RUC/NIT: ${data.clientTaxId}
- Items: ${itemsJson}
- Subtotal calculado: $${subtotal.toFixed(2)}
- IVA (16%): $${tax.toFixed(2)}
- Total: $${total.toFixed(2)}
- Fecha vencimiento: ${data.dueDate}
- Moneda: ${data.currency}

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "documentType": "invoice",
  "content": "FACTURA N° [NÚMERO]\\nFecha: [FECHA]\\n\\nCLIENTE: ${data.clientName}\\nRUC: ${data.clientTaxId}\\n\\nDETALLE:\\n[LISTA DE ITEMS CON CANTIDAD, PRECIO UNITARIO Y TOTAL]\\n\\nSUBTOTAL: $${subtotal.toFixed(2)}\\nIVA (16%): $${tax.toFixed(2)}\\nTOTAL: $${total.toFixed(2)}\\n\\nCONDICIONES: Pago antes del ${data.dueDate}",
  "metadata": {"cliente": "${data.clientName}", "total": "${total.toFixed(2)}", "moneda": "${data.currency}"},
  "warnings": []
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un generador de facturas profesionales. Formato estándar contable. SIEMPRE incluyes el contenido completo en el campo 'content'.",
        temperature: 0.3,
      },
      {
        documentType: "invoice",
        content: `FACTURA\\nCliente: ${data.clientName}\\nTotal: $${total.toFixed(2)} ${data.currency}`,
        metadata: { cliente: data.clientName, total: total.toFixed(2) },
        warnings: [],
      }
    );

    if (!result.content || result.content.length < 50) {
      result.content = `FACTURA N° FAC-${Date.now()}\\nFecha: ${new Date().toISOString().split("T")[0]}\\n\\nCLIENTE: ${data.clientName}\\nRUC/NIT: ${data.clientTaxId}\\n\\nDETALLE:\\n${data.items.map((item) => `- ${item.description}: ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${(item.quantity * item.unitPrice).toFixed(2)}`).join("\\n")}\\n\\nSUBTOTAL: $${subtotal.toFixed(2)}\\nIVA (16%): $${tax.toFixed(2)}\\nTOTAL: $${total.toFixed(2)} ${data.currency}\\n\\nCONDICIONES: Pago antes del ${data.dueDate}`;
    }

    return result;
  }

  async generateContract(data: {
    partyA: string;
    partyB: string;
    serviceType: string;
    duration: string;
    amount: string;
    currency: string;
  }): Promise<DocumentGenerationResult> {
    const result = await ai.generateJson<DocumentGenerationResult>(
      `GENERAR CONTRATO DE SERVICIOS PROFESIONALES

DATOS:
- Parte A (Proveedor): ${data.partyA}
- Parte B (Cliente): ${data.partyB}
- Tipo de servicio: ${data.serviceType}
- Duración: ${data.duration}
- Monto: ${data.amount} ${data.currency}

CLÁUSULAS REQUERIDAS:
1. Objeto del contrato
2. Obligaciones de cada parte
3. Monto y forma de pago
4. Duración y renovación
5. Confidencialidad
6. Terminación
7. Jurisdicción y resolución de disputas
8. Firmas

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "documentType": "contract",
  "content": "CONTRATO DE SERVICIOS PROFESIONALES\\n\\nENTRE:\\n${data.partyA} (en adelante 'EL PROVEEDOR')\\nY:\\n${data.partyB} (en adelante 'EL CLIENTE')\\n\\n[CONTENIDO COMPLETO DEL CONTRATO CON TODAS LAS CLÁUSULAS]",
  "metadata": {"parte_a": "${data.partyA}", "parte_b": "${data.partyB}", "monto": "${data.amount} ${data.currency}"},
  "warnings": []
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un abogado que redacta contratos de servicios profesionales. Lenguaje legal preciso. SIEMPRE incluyes el contenido completo en el campo 'content'.",
        temperature: 0.4,
      },
      {
        documentType: "contract",
        content: `CONTRATO DE SERVICIOS\\n\\nEntre ${data.partyA} y ${data.partyB}\\nServicio: ${data.serviceType}\\nDuración: ${data.duration}\\nMonto: ${data.amount} ${data.currency}`,
        metadata: { parte_a: data.partyA, parte_b: data.partyB },
        warnings: [],
      }
    );

    if (!result.content || result.content.length < 200) {
      result.content = await this.generateContractContent(data);
    }

    return result;
  }

  private async generateContractContent(data: {
    partyA: string;
    partyB: string;
    serviceType: string;
    duration: string;
    amount: string;
    currency: string;
  }): Promise<string> {
    return ai.generateText(
      `Genera un contrato de servicios completo con:
- Parte A: ${data.partyA}
- Parte B: ${data.partyB}
- Servicio: ${data.serviceType}
- Duración: ${data.duration}
- Monto: ${data.amount} ${data.currency}

Incluir TODAS las cláusulas estándar: objeto, obligaciones, pago, duración, confidencialidad, terminación, jurisdicción.
Genera SOLO el contenido del contrato, sin explicaciones.`,
      {
        systemInstruction:
          "Eres un abogado experto en contratos. Genera contratos completos y profesionales.",
        temperature: 0.4,
      }
    );
  }
}

export const documentGeneratorAgent = new DocumentGeneratorAgent();
