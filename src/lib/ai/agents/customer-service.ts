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
      `CONTEXTO DEL CLIENTE:
- ID: ${context.customerId}
- Nombre: ${context.customerName}
- Estado cuenta: ${context.accountStatus}
- Facturas pendientes: ${context.pendingInvoices}
- Facturas vencidas: ${context.overdueInvoices}
- Documentos pendientes: ${context.pendingDocuments}
- Última actividad: ${context.lastActivity}
- Plan: ${context.plan}
${context.advisorId ? `- Asesor asignado: ${context.advisorId}` : ""}

REGLAS DE ACCIÓN:
1. Si hay facturas vencidas (>0): generar email de recordatorio con priority "high"
2. Si hay documentos pendientes (>0): generar nota interna con priority "medium"
3. Si estado es "trial" y última actividad > 7 días: generar email re-engagement con priority "medium"
4. Si facturas vencidas > 3: generar alerta al asesor con priority "critical"
5. Si estado es "suspended": generar email de reactivación con priority "critical"
6. Siempre incluir al menos una acción si hay algo pendiente

FORMATO DE RESPUESTA (JSON array):
[
  {"type": "email", "priority": "high", "content": "...", "reason": "..."},
  {"type": "internal_note", "priority": "medium", "content": "...", "reason": "..."}
]

Responde SOLO con el JSON array.`,
      {
        systemInstruction:
          "Eres un agente de atención al cliente proactivo que detecta situaciones requiring acción inmediata y genera comunicaciones o alertas automáticas. No eres un chatbot conversacional.",
        temperature: 0.3,
      },
      []
    );

    return Array.isArray(actions) ? actions : [];
  }

  async generateEmail(
    context: CustomerContext,
    purpose: string
  ): Promise<string> {
    return ai.generateText(
      `GENERAR EMAIL PROFESIONAL

DATOS DEL CLIENTE:
- Nombre: ${context.customerName}
- Estado: ${context.accountStatus}
- Plan: ${context.plan}

PROPÓSITO DEL EMAIL:
${purpose}

REQUISITOS:
- Tono profesional pero cercano
- Máximo 150 palabras
- Incluir asunto
- Incluir call-to-action claro
- Firmar como "Equipo System Kyron"`,
      {
        systemInstruction:
          "Eres un redactor de emails corporativos experto. Estilo profesional, directo y empático.",
        temperature: 0.5,
      }
    );
  }

  async generateAdvisorNote(
    context: CustomerContext,
    issue: string
  ): Promise<string> {
    return ai.generateText(
      `GENERAR NOTA INTERNA PARA ASESOR

CLIENTE: ${context.customerName} (ID: ${context.customerId})
PROBLEMA: ${issue}
CONTEXTO: ${context.pendingInvoices} facturas pendientes, ${context.overdueInvoices} vencidas, ${context.pendingDocuments} documentos pendientes
ESTADO: ${context.accountStatus}

La nota debe ser concisa, accionable y profesional. Máximo 100 palabras.`,
      {
        systemInstruction:
          "Eres un asistente que redacta notas internas para asesores. Estilo directo y profesional.",
        temperature: 0.4,
      }
    );
  }

  async generateDraftResponse(
    context: CustomerContext,
    customerInquiry: string
  ): Promise<string> {
    return ai.generateText(
      `GENERAR BORRADOR DE RESPUESTA AL CLIENTE

CLIENTE: ${context.customerName}
PLAN: ${context.plan}
ESTADO: ${context.accountStatus}

CONSULTA DEL CLIENTE:
${customerInquiry}

Genera una respuesta profesional, completa y útil. Incluye información relevante basada en el contexto del cliente.`,
      {
        systemInstruction:
          "Eres un agente de soporte que genera borradores de respuesta para asesores. Respuestas completas, profesionales y accionables.",
        temperature: 0.5,
      }
    );
  }
}

export const customerServiceAgent = new CustomerServiceAgent();
