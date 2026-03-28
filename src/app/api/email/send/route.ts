import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

export const dynamic = 'force-dynamic';

const MODULE_TEMPLATES: Record<string, { fromLabel: string; defaultSubjectPrefix: string }> = {
  rrhh: { fromLabel: 'RRHH · System Kyron', defaultSubjectPrefix: '[RRHH]' },
  contabilidad: { fromLabel: 'Contabilidad · System Kyron', defaultSubjectPrefix: '[Fiscal]' },
  legal: { fromLabel: 'Legal · System Kyron', defaultSubjectPrefix: '[Legal]' },
  telecom: { fromLabel: 'Telecom · System Kyron', defaultSubjectPrefix: '[Mi Línea 5G]' },
  sostenibilidad: { fromLabel: 'Ameru IA · System Kyron', defaultSubjectPrefix: '[Eco]' },
  sistema: { fromLabel: 'System Kyron', defaultSubjectPrefix: '[Kyron]' },
};

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { to, subject, title, message, module, code } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Campos requeridos: to, subject, message' },
        { status: 400 }
      );
    }

    const recipients = Array.isArray(to) ? to : [to];
    if (recipients.length > 50) {
      return NextResponse.json(
        { error: 'Máximo 50 destinatarios por envío' },
        { status: 400 }
      );
    }

    const mod = MODULE_TEMPLATES[module] ?? MODULE_TEMPLATES.sistema;

    const html = buildKyronEmailTemplate({
      title: title ?? subject,
      body: message,
      code,
      footer: `Enviado desde el módulo ${mod.fromLabel}.`,
    });

    const fullSubject = subject.startsWith('[')
      ? subject
      : `${mod.defaultSubjectPrefix} ${subject}`;

    const result = await sendEmail({
      to: Array.isArray(to) ? to : [to],
      subject: fullSubject,
      html,
      module: module ?? 'sistema',
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        provider: result.provider,
        message: `Email enviado correctamente vía ${result.provider}`,
      });
    }

    return NextResponse.json(
      { success: false, error: result.error ?? 'No se pudo enviar el email' },
      { status: 502 }
    );
  } catch (err) {
    console.error('[email/send] error:', err);
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 });
  }
}
