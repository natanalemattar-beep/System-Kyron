import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { verificarAlertasPredictivas, obtenerProximasObligaciones, obtenerRiesgosMultas } from '@/lib/alertas-predictivas';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const rifTerminal = parseInt(searchParams.get('rif_terminal') ?? '0', 10);
  const vista = searchParams.get('vista') || 'obligaciones';

  if (vista === 'riesgos-multas') {
    const riesgos = obtenerRiesgosMultas();
    return NextResponse.json({
      riesgos,
      totalEntes: Object.keys(riesgos).length,
      totalObligaciones: Object.values(riesgos).reduce((sum, e) => sum + e.obligaciones.length, 0),
    });
  }

  const proximas = await obtenerProximasObligaciones(rifTerminal);

  const porEnte: Record<string, number> = {};
  for (const ob of proximas) {
    const ente = ob.ente || 'SENIAT';
    porEnte[ente] = (porEnte[ente] || 0) + 1;
  }

  return NextResponse.json({
    obligaciones: proximas,
    total: proximas.length,
    criticas: proximas.filter(o => o.urgencia === 'critica').length,
    altas: proximas.filter(o => o.urgencia === 'alta').length,
    porEnte,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  if (session.tipo !== 'juridico') {
    return NextResponse.json({ error: 'Solo cuentas empresariales pueden ejecutar esta acción' }, { status: 403 });
  }

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
