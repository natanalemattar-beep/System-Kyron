import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { isValidEmail } from '@/lib/input-sanitizer';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

const MASTER_KEY = 'KYRON-2026-MASTER';

const TEMPLATES: Record<string, { subject: string; title: string; footer: string }> = {
  bienvenida: {
    subject: 'Bienvenido a System Kyron — Tu plataforma de gestión inteligente',
    title: '¡Bienvenido a System Kyron!',
    footer: 'Tu cuenta ha sido activada exitosamente. Estamos encantados de tenerte con nosotros.',
  },
  notificacion: {
    subject: 'Notificación Importante — System Kyron',
    title: 'Notificación del Sistema',
    footer: 'Este mensaje ha sido enviado por el equipo de System Kyron.',
  },
  facturacion: {
    subject: 'Información de Facturación — System Kyron',
    title: 'Actualización de Facturación',
    footer: 'Departamento de Facturación · System Kyron · Venezuela',
  },
  soporte: {
    subject: 'Soporte Técnico — System Kyron',
    title: 'Soporte Técnico',
    footer: 'Equipo de Soporte · System Kyron · Respuesta en menos de 24 horas.',
  },
  comercial: {
    subject: 'Propuesta Comercial — System Kyron',
    title: 'Propuesta Comercial',
    footer: 'Dirección Comercial · System Kyron · Inteligencia Corporativa.',
  },
  seguridad: {
    subject: 'Alerta de Seguridad — System Kyron',
    title: 'Alerta de Seguridad',
    footer: 'Centro de Seguridad · System Kyron · Protección de datos garantizada.',
  },
  personalizado: {
    subject: 'System Kyron',
    title: 'System Kyron',
    footer: 'System Kyron · Inteligencia Corporativa · Venezuela',
  },
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`kyron-mail:${ip}`, 30, 60 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const body = await req.json();
    const { key, to, cc, subject, message, template = 'personalizado', sender = 'auto', nombre } = body;

    if (key !== MASTER_KEY) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    if (!to || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos: to, message' }, { status: 400 });
    }

    const recipients = Array.isArray(to) ? to : [to];
    for (const r of recipients) {
      if (!isValidEmail(String(r).trim())) {
        return NextResponse.json({ error: `Correo inválido: ${r}` }, { status: 400 });
      }
    }

    if (cc) {
      const ccList = Array.isArray(cc) ? cc : [cc];
      for (const c of ccList) {
        if (!isValidEmail(String(c).trim())) {
          return NextResponse.json({ error: `CC inválido: ${c}` }, { status: 400 });
        }
      }
    }

    const tpl = TEMPLATES[template] || TEMPLATES.personalizado;
    const finalSubject = subject || tpl.subject;
    const greeting = nombre ? `<p style="color: #F1F5F9; font-size: 16px; margin: 0 0 16px 0;">Estimado/a <strong>${nombre.replace(/</g, '&lt;')}</strong>,</p>` : '';
    const formattedMessage = message.replace(/\n/g, '<br/>').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;br\/&gt;/g, '<br/>');

    const html = buildKyronEmailTemplate({
      title: subject ? subject : tpl.title,
      body: `${greeting}<p style="color: #CBD5E1; font-size: 15px; line-height: 1.7; margin: 0;">${formattedMessage}</p>`,
      footer: tpl.footer,
    });

    const purposeMap: Record<string, 'general' | 'alert' | 'verification'> = {
      gmail: 'verification',
      outlook: 'alert',
      auto: 'general',
    };

    const result = await sendEmail({
      to: recipients.map(r => String(r).trim()),
      subject: finalSubject,
      html,
      module: `kyron-mail-${template}`,
      purpose: purposeMap[sender] || 'general',
    });

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      to: recipients,
      subject: finalSubject,
      template,
      error: result.error,
    });
  } catch (err) {
    console.error('[kyron-mail] Error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
