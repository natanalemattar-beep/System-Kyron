'use server';

import { query } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

const DEMO_NOTIFICATION_EMAIL = 'infosystemkyron@gmail.com';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildDemoRequestEmailHtml(data: {
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
  const urgencyLabels: Record<string, string> = {
    immediate: '🔴 Inmediata',
    'this-week': '🟠 Esta semana',
    'this-month': '🟡 Este mes',
    exploring: '🟢 Explorando',
  };

  const rows = [
    ['Nombre', escapeHtml(data.name)],
    ['Cargo', escapeHtml(data.role)],
    ['Email', escapeHtml(data.email)],
    ['Teléfono', escapeHtml(data.phone)],
    ['Empresa', escapeHtml(data.company)],
    ['Tamaño', escapeHtml(data.companySize) + ' empleados'],
    ['Sector', escapeHtml(data.sector)],
    ['Módulo', escapeHtml(data.module)],
    ['Urgencia', urgencyLabels[data.urgency] ?? escapeHtml(data.urgency)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="color:#94A3B8;font-size:13px;padding:8px 12px;border-bottom:1px solid #1E293B;font-weight:600;white-space:nowrap;">${label}</td>
          <td style="color:#F1F5F9;font-size:13px;padding:8px 12px;border-bottom:1px solid #1E293B;">${value}</td>
        </tr>`
    )
    .join('');

  const messageSection = data.message
    ? `<div style="background:#0A1530;border-radius:8px;padding:14px 16px;margin-top:16px;">
        <p style="color:#94A3B8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px 0;font-weight:700;">Mensaje adicional</p>
        <p style="color:#F1F5F9;font-size:13px;margin:0;line-height:1.5;">${escapeHtml(data.message)}</p>
      </div>`
    : '';

  const bodyHtml = `
    <table style="width:100%;border-collapse:collapse;background:#0A1530;border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
    ${messageSection}
  `;

  return buildKyronEmailTemplate({
    title: '📋 Nueva Solicitud de Demo',
    body: bodyHtml,
    footer: 'Este correo fue generado automáticamente al recibir una solicitud de demostración en systemkyron.com.',
  });
}

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

    sendEmail({
      to: DEMO_NOTIFICATION_EMAIL,
      subject: `Nueva Solicitud de Demo — ${data.company} (${data.module})`.slice(0, 200),
      html: buildDemoRequestEmailHtml(data),
      purpose: 'general',
      module: 'demo',
    }).catch((err) => {
      console.error('[send-demo-request] Email notification failed:', err);
    });

    return { success: true };
  } catch (error) {
    console.error("[send-demo-request] Error:", error);
    return { success: false, error: "Error al registrar la solicitud" };
  }
}
