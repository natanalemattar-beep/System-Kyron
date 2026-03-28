'use server';

import { query } from '@/lib/db';

export async function sendDemoRequestAction(data: {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  sector: string;
  urgency: string;
  module: string;
  message?: string;
}) {
  try {
    await query(
      `INSERT INTO demo_requests (name, role, email, phone, company, company_size, sector, urgency, module, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'new')`,
      [data.name, data.role, data.email, data.phone, data.company, data.companySize, data.sector, data.urgency, data.module, data.message ?? '']
    );

    await query(
      `INSERT INTO contact_messages (nombre, email, telefono, empresa, asunto, mensaje)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        data.name,
        data.email,
        data.phone,
        data.company,
        `Demo Request: ${data.module} (${data.urgency})`,
        `Cargo: ${data.role}\nEmpresa: ${data.company} (${data.companySize} empleados)\nSector: ${data.sector}\nMódulo: ${data.module}\nUrgencia: ${data.urgency}\n\n${data.message || 'Sin comentarios adicionales.'}`
      ]
    ).catch(() => null);

    return { success: true };
  } catch (error) {
    console.error("[send-demo-request] Error:", error);
    return { success: false, error: "Error al registrar la solicitud" };
  }
}
