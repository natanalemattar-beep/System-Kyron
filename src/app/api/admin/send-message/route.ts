import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { isValidEmail } from '@/lib/input-sanitizer';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_TITLE_LENGTH = 200;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (session.tipo !== 'admin') {
      return NextResponse.json({ error: 'No autorizado. Se requiere rol de administrador.' }, { status: 403 });
    }

    const ip = getClientIP(req);
    const rl = rateLimit(`admin-msg:${ip}`, 10, 15 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const { to, message, title = '💬 Mensaje Personal' } = await req.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros: to, message' },
        { status: 400 }
      );
    }

    const recipient = String(to).trim();
    if (!isValidEmail(recipient)) {
      return NextResponse.json(
        { error: 'Dirección de correo inválida' },
        { status: 400 }
      );
    }

    const cleanMessage = String(message).slice(0, MAX_MESSAGE_LENGTH);
    const cleanTitle = String(title).slice(0, MAX_TITLE_LENGTH);

    const html = buildKyronEmailTemplate({
      title: cleanTitle,
      body: `<p style="color: #E2E8F0; font-size: 16px; margin: 0;">${cleanMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`,
      footer: 'Mensaje enviado desde System Kyron.',
    });

    const result = await sendEmail({
      to: recipient,
      subject: cleanTitle,
      html,
      module: 'sistema',
      purpose: 'general',
    });

    console.log(`[admin-msg] ${session.email} sent message to ${recipient}: ${result.success ? 'OK' : 'FAIL'}`);

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      to: recipient,
      message: result.success ? 'Mensaje enviado exitosamente' : 'Error al enviar',
      error: result.error,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
