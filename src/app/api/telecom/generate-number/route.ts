import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

const PREFIJOS_PERSONAL = ['0412', '0414', '0424', '0416', '0426'];

function randomDigits(count: number): string {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function generarNumeroPersonal(): string {
  const prefijo = PREFIJOS_PERSONAL[Math.floor(Math.random() * PREFIJOS_PERSONAL.length)];
  return `${prefijo}-${randomDigits(7)}`;
}

function generarCodigoEmpresa(): string {
  const segmento = randomDigits(6);
  return `KYR-EMP-${segmento}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const tipo: string = body.tipo || 'personal';
  const tipoNorm = tipo === 'empresarial' ? 'empresarial' : 'personal';

  const maxAttempts = 50;

  for (let i = 0; i < maxAttempts; i++) {
    const numero = tipoNorm === 'empresarial' ? generarCodigoEmpresa() : generarNumeroPersonal();

    const existsInLineas = await queryOne(
      `SELECT id FROM lineas_telecom WHERE numero = $1`,
      [numero]
    );

    const existsInAsignados = await queryOne(
      `SELECT id FROM telecom_numeros_asignados WHERE numero = $1`,
      [numero]
    );

    if (!existsInLineas && !existsInAsignados) {
      return NextResponse.json({ numero });
    }
  }

  return NextResponse.json(
    { error: 'No se pudo generar un número único. Intente de nuevo.' },
    { status: 500 }
  );
}
