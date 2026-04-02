import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { to, message, title = '💬 Mensaje Personal' } = await req.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros: to, message' },
        { status: 400 }
      );
    }

    const html = buildKyronEmailTemplate({
      title,
      body: `<p style="color: #E2E8F0; font-size: 16px; margin: 0;">${message}</p>`,
      footer: 'Mensaje enviado desde System Kyron.',
    });

    const result = await sendEmail({
      to,
      subject: title,
      html,
      module: 'sistema',
      purpose: 'general',
    });

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      to,
      message: result.success ? 'Mensaje enviado exitosamente' : 'Error al enviar',
      error: result.error,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno del servidor', details: String(err) },
      { status: 500 }
    );
  }
}
