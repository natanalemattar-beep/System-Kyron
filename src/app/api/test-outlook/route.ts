import { NextResponse } from 'next/server';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

const ALERT_LEVELS = [
  {
    tipo: 'info',
    emoji: 'ℹ️',
    label: 'INFORMATIVA',
    color: '#0EA5E9',
    borderColor: '#0EA5E9',
    titulo: 'Reporte Mensual Generado',
    mensaje: 'El reporte financiero del mes de Marzo 2026 ha sido generado exitosamente. Se procesaron 847 transacciones por un total de Bs. 2,450,000.00. Puede descargarlo desde el módulo de reportes.',
    detalle: 'Módulo: Finanzas · Acción: Generación automática',
  },
  {
    tipo: 'advertencia',
    emoji: '⚠️',
    label: 'ADVERTENCIA',
    color: '#F59E0B',
    borderColor: '#F59E0B',
    titulo: 'Licencia SENIAT Próxima a Vencer',
    mensaje: 'La licencia fiscal RIF J-12345678-9 vence en 15 días (15/04/2026). Se recomienda iniciar el proceso de renovación lo antes posible para evitar sanciones administrativas.',
    detalle: 'Módulo: Legal/Fiscal · Prioridad: Media',
  },
  {
    tipo: 'alerta',
    emoji: '🚨',
    label: 'ALERTA CRÍTICA',
    color: '#EF4444',
    borderColor: '#EF4444',
    titulo: 'Intento de Acceso No Autorizado Detectado',
    mensaje: 'Se detectaron 5 intentos fallidos de acceso desde la IP 192.168.1.45 en los últimos 10 minutos. La cuenta usuario@empresa.com ha sido bloqueada temporalmente por seguridad. Se requiere revisión inmediata.',
    detalle: 'Módulo: Seguridad · Prioridad: CRÍTICA · Acción requerida',
  },
];

export async function GET() {
  const results = [];
  const to = 'natanalemattar@gmail.com';
  const timestamp = new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' });

  for (const alert of ALERT_LEVELS) {
    const html = buildKyronEmailTemplate({
      title: `${alert.emoji} ${alert.titulo}`,
      body: `
        <div style="margin-bottom: 20px;">
          <div style="display: inline-block; background: ${alert.color}20; border: 1px solid ${alert.color}40; border-radius: 6px; padding: 4px 12px; margin-bottom: 16px;">
            <span style="color: ${alert.color}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">${alert.label}</span>
          </div>
        </div>
        <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">${alert.mensaje}</p>
        <div style="background: #0A1530; border-left: 3px solid ${alert.color}; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 16px;">
          <p style="color: #94A3B8; font-size: 12px; margin: 0;">
            <strong style="color: ${alert.color};">Detalle:</strong> ${alert.detalle}
          </p>
        </div>
        <div style="background: #0A1530; border-radius: 8px; padding: 12px 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #64748B; font-size: 11px; padding: 4px 0;">Fecha/Hora:</td>
              <td style="color: #94A3B8; font-size: 11px; padding: 4px 0; text-align: right;">${timestamp}</td>
            </tr>
            <tr>
              <td style="color: #64748B; font-size: 11px; padding: 4px 0;">Sistema:</td>
              <td style="color: #94A3B8; font-size: 11px; padding: 4px 0; text-align: right;">System Kyron v2.9.0</td>
            </tr>
            <tr>
              <td style="color: #64748B; font-size: 11px; padding: 4px 0;">Enviado a:</td>
              <td style="color: #94A3B8; font-size: 11px; padding: 4px 0; text-align: right;">${to}</td>
            </tr>
          </table>
        </div>
      `,
      footer: alert.tipo === 'alerta'
        ? 'Esta alerta requiere acción inmediata. Si no reconoces esta actividad, contacta al administrador.'
        : 'Este es un mensaje automático de System Kyron. Puedes configurar tus preferencias de notificación en el panel.',
    });

    const result = await sendEmail({
      to,
      subject: `[Kyron ${alert.label}] ${alert.titulo}`,
      html,
      module: 'sistema',
      purpose: 'alert',
    });

    results.push({
      level: alert.label,
      subject: alert.titulo,
      success: result.success,
      provider: result.provider,
      error: result.error || null,
    });
  }

  return NextResponse.json({
    message: 'Prueba de alertas enviada',
    to,
    timestamp,
    results,
  });
}
