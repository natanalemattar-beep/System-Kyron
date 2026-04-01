import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Teléfono requerido' },
        { status: 400 }
      );
    }

    const { sendSms } = await import('@/lib/twilio-client');

    const testCode = Math.floor(Math.random() * 900000) + 100000;
    const message = `SYSTEM KYRON - Código de prueba: ${testCode}`;

    const result = await sendSms(phone, message);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Código ${testCode} enviado a ${phone}`,
        sid: result.sid,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
