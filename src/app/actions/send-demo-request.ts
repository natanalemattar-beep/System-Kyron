'use server';

import { Resend } from 'resend';
import { query } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');

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
    ).catch(() => null);

    await resend.emails.send({
      from: 'System Kyron <onboarding@resend.dev>',
      to: 'infosystemkyron@gmail.com',
      subject: `🚀 NUEVA SOLICITUD DE DEMO: ${data.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">EXPEDIENTE DE INTELIGENCIA COMERCIAL</h2>
          <p><strong>Cliente:</strong> ${data.name} (${data.role})</p>
          <p><strong>Empresa:</strong> ${data.company}</p>
          <p><strong>Tamaño:</strong> ${data.companySize} empleados</p>
          <p><strong>Sector:</strong> ${data.sector}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Contacto:</strong> <a href="mailto:${data.email}">${data.email}</a> | ${data.phone}</p>
          <p><strong>Módulo Maestro:</strong> ${data.module}</p>
          <p><strong>Urgencia:</strong> ${data.urgency}</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <strong>Notas del Cliente:</strong><br/>
            ${data.message || 'Sin comentarios adicionales.'}
          </div>
          <p style="font-size: 10px; color: #9ca3af; margin-top: 30px; text-align: center;">
            Este es un mensaje automático generado por el Ecosistema Kyron v2.6.5
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error en protocolo de despacho:", error);
    return { success: false, error: "Falla en transmisión" };
  }
}
