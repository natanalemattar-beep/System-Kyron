import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import {
  obtenerGacetasRecientes,
  obtenerCambiosAsamblea,
  obtenerAlertasRegulatorias,
  obtenerResumenRegulatorio,
  verificarAlertasRegulatorias,
} from '@/lib/alertas-regulatorias';
import { obtenerRiesgosMultas } from '@/lib/alertas-predictivas';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const vista = searchParams.get('vista') || 'resumen';
  const tipo = searchParams.get('tipo') as 'ordinaria' | 'extraordinaria' | null;
  const impacto = searchParams.get('impacto') as 'fiscal' | 'laboral' | 'comercial' | 'ambiental' | null;
  const urgencia = searchParams.get('urgencia') as 'critica' | 'alta' | 'media' | 'informativa' | null;
  const sector = searchParams.get('sector');
  const limite = searchParams.get('limite') ? parseInt(searchParams.get('limite')!, 10) : undefined;

  switch (vista) {
    case 'gacetas': {
      const gacetas = obtenerGacetasRecientes({
        tipo: tipo || undefined,
        impacto: impacto || undefined,
        urgencia: urgencia || undefined,
        limite,
      });
      return NextResponse.json({
        gacetas,
        total: gacetas.length,
        criticas: gacetas.filter(g => g.urgencia === 'critica').length,
      });
    }

    case 'asamblea': {
      const cambios = obtenerCambiosAsamblea({
        tipo: searchParams.get('tipo_cambio') as 'ley_aprobada' | 'reforma' | null || undefined,
        urgencia: urgencia || undefined,
        sector: sector || undefined,
        limite,
      });
      return NextResponse.json({
        cambios,
        total: cambios.length,
        criticos: cambios.filter(c => c.urgencia === 'critica').length,
      });
    }

    case 'alertas': {
      const alertas = obtenerAlertasRegulatorias();
      return NextResponse.json({
        alertas,
        total: alertas.length,
        criticas: alertas.filter(a => a.urgencia === 'critica').length,
        altas: alertas.filter(a => a.urgencia === 'alta').length,
      });
    }

    case 'riesgos-multas': {
      const riesgos = obtenerRiesgosMultas();
      const entesCount = Object.keys(riesgos).length;
      const totalObligaciones = Object.values(riesgos).reduce((sum, e) => sum + e.obligaciones.length, 0);
      return NextResponse.json({
        riesgos,
        totalEntes: entesCount,
        totalObligaciones,
      });
    }

    case 'resumen':
    default: {
      const resumen = obtenerResumenRegulatorio();
      const riesgos = obtenerRiesgosMultas();
      return NextResponse.json({
        resumen,
        totalEntesGubernamentales: Object.keys(riesgos).length,
        totalObligacionesFiscales: Object.values(riesgos).reduce((sum, e) => sum + e.obligaciones.length, 0),
        riesgosPorEnte: Object.entries(riesgos).map(([siglas, data]) => ({
          siglas,
          ente: data.ente,
          obligaciones: data.obligaciones.length,
        })),
      });
    }
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  if (session.tipo !== 'juridico') {
    return NextResponse.json({ error: 'Solo cuentas empresariales pueden ejecutar esta acción' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const accion = body.accion || 'verificar';

  if (accion === 'verificar') {
    const alertasGeneradas = await verificarAlertasRegulatorias();
    return NextResponse.json({
      success: true,
      alertas_generadas: alertasGeneradas,
      mensaje: `Se generaron ${alertasGeneradas} alerta(s) regulatoria(s).`,
    });
  }

  return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
}
