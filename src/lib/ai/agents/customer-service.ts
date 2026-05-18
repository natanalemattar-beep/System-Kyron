import { ai } from "../client";
import type { CustomerServiceAction } from "../types";

export interface CustomerContext {
  customerId: string;
  customerName: string;
  accountStatus: "active" | "pending" | "suspended" | "trial";
  pendingInvoices: number;
  overdueInvoices: number;
  pendingDocuments: number;
  lastActivity: string;
  plan: string;
  advisorId?: string;
}

export class CustomerServiceAgent {
  async analyzeCustomer(context: CustomerContext): Promise<CustomerServiceAction[]> {
    const actions = await ai.generateJson<CustomerServiceAction[]>(
      `Contexto del cliente:
- Nombre: ${context.customerName}
- Estado: ${context.accountStatus}
- Facturas pendientes: ${context.pendingInvoices}
- Facturas vencidas: ${context.overdueInvoices}
- Documentos pendientes: ${context.pendingDocuments}
- Última actividad: ${context.lastActivity}
- Plan: ${context.plan}

Analiza el contexto y genera acciones proactivas. Reglas:
- Si hay facturas vencidas (>0): generar email de recordatorio (priority: high)
- Si hay documentos pendientes (>0): generar nota interna para el asesor (priority: medium)
- Si el estado es "trial" y última actividad > 7 días: generar email de re-engagement (priority: medium)
- Si hay facturas vencidas > 3: generar alerta al asesor (priority: critical)
- Siempre incluir al menos una acción si hay algo pendiente

Responde solo con JSON array de acciones.`,
      {
        systemInstruction:
          "Eres un agente de atención al cliente proactivo. Detectas situaciones que requieren acción y generas comunicaciones o alertas automáticas. No eres un chatbot.",
        temperature: 0.4,
      }
    );

    return actions;
  }

  async generateEmail(
    context: CustomerContext,
    purpose: string
  ): Promise<string> {
    return ai.generateText(
      `Genera un email profesional para:
Cliente: ${context.customerName}
Propósito: ${purpose}
Estado: ${context.accountStatus}
Plan: ${context.plan}

El email debe ser cordial, directo y con un call-to-action claro.`,
      {
        systemInstruction:
          "Eres un redactor de emails corporativos. Estilo profesional pero cercano. Máximo 150 palabras.",
      }
    );
  }

  async generateAdvisorNote(
    context: CustomerContext,
    issue: string
  ): Promise<string> {
    return ai.generateText(
      `Genera una nota interna para el asesor sobre:
Cliente: ${context.customerName} (ID: ${context.customerId})
Problema: ${issue}
Contexto adicional: ${context.pendingInvoices} facturas pendientes, ${context.overdueInvoices} vencidas

La nota debe ser concisa y accionable.`,
      {
        systemInstruction:
          "Eres un asistente que redacta notas internas para asesores. Estilo directo y profesional.",
      }
    );
  }
}

export const customerServiceAgent = new CustomerServiceAgent();
