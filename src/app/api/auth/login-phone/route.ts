import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'La verificación por SMS/WhatsApp está en construcción. Usa el correo electrónico.', enConstruccion: true },
    { status: 503 }
  );
}
