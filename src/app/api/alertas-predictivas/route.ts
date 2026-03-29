import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { verificarAlertasPredictivas, obtenerProximasObligaciones } from '@/lib/alertas-predictivas';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const rifTerminal = parseInt(searchParams.get('rif_terminal') ?? '0', 10);

  const proximas = await obtenerProximasObligaciones(rifTerminal);

  return NextResponse.json({
    obligaciones: proximas,
    total: proximas.length,
    criticas: proximas.filter(o => o.urgencia === 'critica').length,
    altas: proximas.filter(o => o.urgencia === 'alta').length,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const alertas = await verificarAlertasPredictivas();

  return NextResponse.json({
    success: true,
    alertas_generadas: alertas.length,
    detalle: alertas.map(a => ({
      obligacion: a.obligacion,
      dias_restantes: a.diasRestantes,
      fecha_vencimiento: a.fechaVencimiento.toISOString(),
    })),
  });
}
