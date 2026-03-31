import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import {
  obtenerTodosLosPlanes,
  obtenerPlan,
  obtenerResumenUso,
  verificarLimite,
  incrementarUso,
  cambiarPlan,
  formatearLimite,
  esRecursoValido,
  calcularPrecio,
  type PlanTier,
  type CicloFacturacion,
  type RecursoLimite,
} from '@/lib/planes-kyron';

export const dynamic = 'force-dynamic';

const PLANES_VALIDOS = ['starter', 'profesional', 'empresarial', 'kyron_max'];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vista = searchParams.get('vista') || 'planes';

    if (vista === 'planes') {
      const cicloParam = (searchParams.get('ciclo') || 'mensual') as CicloFacturacion;
      const ciclo = cicloParam === 'anual' ? 'anual' : 'mensual';
      const planes = obtenerTodosLosPlanes();
      return NextResponse.json({
        ciclo,
        planes: planes.map(p => ({
          ...p,
          precios: calcularPrecio(p, ciclo),
          limites: Object.fromEntries(
            Object.entries(p.limites).map(([k, v]) => [k, { valor: v, display: formatearLimite(v) }])
          ),
        })),
      });
    }

    if (vista === 'mi-plan' || vista === 'uso') {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

      const resumen = await obtenerResumenUso(session.userId);
      return NextResponse.json(resumen);
    }

    if (vista === 'verificar') {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

      const recursoRaw = searchParams.get('recurso') || '';
      if (!esRecursoValido(recursoRaw)) {
        return NextResponse.json({ error: `Recurso no válido: ${recursoRaw}` }, { status: 400 });
      }

      const check = await verificarLimite(session.userId, recursoRaw);
      return NextResponse.json(check);
    }

    if (vista === 'comparar') {
      const planes = obtenerTodosLosPlanes();
      const comparacion = {
        categorias: [
          {
            nombre: 'Inteligencia Artificial',
            recursos: [
              { key: 'consultasAI', label: 'Consultas AI', icon: 'brain' },
              { key: 'chatAIMensajes', label: 'Chat AI Mensajes', icon: 'message-circle' },
              { key: 'simuladorMultas', label: 'Simulador de Multas', icon: 'calculator' },
              { key: 'declaracionesAsistidas', label: 'Declaraciones Asistidas', icon: 'file-check' },
            ],
          },
          {
            nombre: 'Alertas y Monitoreo',
            recursos: [
              { key: 'alertasFiscales', label: 'Alertas Fiscales (todos los entes)', icon: 'bell' },
              { key: 'alertasRegulatorias', label: 'Alertas Gacetas/Asamblea Nacional', icon: 'landmark' },
            ],
          },
          {
            nombre: 'Operaciones',
            recursos: [
              { key: 'facturasMensuales', label: 'Facturas por Mes', icon: 'file-text' },
              { key: 'empleadosNomina', label: 'Empleados en Nómina', icon: 'users' },
              { key: 'clientesCRM', label: 'Clientes CRM', icon: 'contact' },
              { key: 'documentosLegales', label: 'Documentos Legales', icon: 'scale' },
              { key: 'lineasTelecom', label: 'Líneas Telecom', icon: 'phone' },
            ],
          },
          {
            nombre: 'Herramientas',
            recursos: [
              { key: 'reportesMensuales', label: 'Reportes por Mes', icon: 'bar-chart' },
              { key: 'exportacionesExcel', label: 'Exportaciones Excel', icon: 'download' },
              { key: 'consultasRIF', label: 'Consultas RIF/Cédula', icon: 'search' },
              { key: 'blockchainProofs', label: 'Blockchain Proofs', icon: 'shield' },
            ],
          },
          {
            nombre: 'Infraestructura',
            recursos: [
              { key: 'usuariosConcurrentes', label: 'Usuarios', icon: 'user' },
              { key: 'almacenamientoGB', label: 'Almacenamiento (GB)', icon: 'hard-drive' },
            ],
          },
        ],
        planes: planes.map(p => ({
          id: p.id,
          nombre: p.nombre,
          precio: p.precioMensualUSD,
          precioAnual: p.precioAnualUSD,
          color: p.color,
          etiqueta: p.etiqueta,
          destacado: p.destacado,
          limites: Object.fromEntries(
            Object.entries(p.limites).map(([k, v]) => [k, formatearLimite(v)])
          ),
        })),
      };
      return NextResponse.json(comparacion);
    }

    return NextResponse.json({ error: 'Vista no válida' }, { status: 400 });
  } catch (err) {
    console.error('[planes API GET]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const accion = body.accion;

    if (accion === 'usar-recurso') {
      const recursoRaw = body.recurso || '';
      if (!esRecursoValido(recursoRaw)) {
        return NextResponse.json({ error: `Recurso no válido: ${recursoRaw}` }, { status: 400 });
      }
      const cantidad = typeof body.cantidad === 'number' && body.cantidad > 0 ? body.cantidad : 1;

      const exito = await incrementarUso(session.userId, recursoRaw, cantidad);
      if (!exito) {
        const check = await verificarLimite(session.userId, recursoRaw);
        const plan = obtenerPlan(check.plan);
        return NextResponse.json({
          error: 'Límite alcanzado',
          mensaje: `Has alcanzado el límite de ${formatearLimite(check.limite)} para ${recursoRaw} en tu plan ${plan.nombre}. Actualiza a un plan superior para continuar.`,
          usado: check.usado,
          limite: check.limite,
          plan: check.plan,
          upgrade: true,
        }, { status: 429 });
      }

      const checkActual = await verificarLimite(session.userId, recursoRaw);
      return NextResponse.json({
        success: true,
        usado: checkActual.usado,
        limite: checkActual.limite,
        porcentaje: checkActual.porcentaje,
      });
    }

    if (accion === 'cambiar-plan') {
      const nuevoPlan = body.plan;
      const cicloRaw = body.ciclo || 'mensual';
      const ciclo: CicloFacturacion = cicloRaw === 'anual' ? 'anual' : 'mensual';

      if (!nuevoPlan || !PLANES_VALIDOS.includes(nuevoPlan)) {
        return NextResponse.json({ error: 'Plan no válido' }, { status: 400 });
      }

      await cambiarPlan(session.userId, nuevoPlan as PlanTier, ciclo);
      const plan = obtenerPlan(nuevoPlan as PlanTier);
      const precios = calcularPrecio(plan, ciclo);
      return NextResponse.json({
        success: true,
        plan: {
          id: plan.id,
          nombre: plan.nombre,
          color: plan.color,
        },
        ciclo,
        precios,
        mensaje: ciclo === 'anual'
          ? `Plan actualizado a ${plan.nombreCompleto} (anual). Ahorras $${plan.ahorroAnualUSD}/año.`
          : `Plan actualizado a ${plan.nombreCompleto} (mensual).`,
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('[planes API POST]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
