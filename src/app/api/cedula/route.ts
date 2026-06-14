import { NextRequest, NextResponse } from 'next/server';
import { consultarCedula } from '@/lib/cedula-api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cedula = searchParams.get('cedula');
  const nacionalidad = (searchParams.get('nacionalidad') || 'V').toUpperCase();

  if (!cedula || !/^\d+$/.test(cedula)) {
    return NextResponse.json({ error: true, error_str: 'Cédula inválida' }, { status: 400 });
  }

  if (nacionalidad !== 'V' && nacionalidad !== 'E') {
    return NextResponse.json({ error: true, error_str: 'Nacionalidad debe ser V o E' }, { status: 400 });
  }

  const result = await consultarCedula(nacionalidad, cedula);
  return NextResponse.json(result);
}
