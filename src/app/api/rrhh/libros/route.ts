import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const libro = searchParams.get('libro');
    const userId = session.id;

    switch (libro) {
      case 'empleados': {
        const rows = await query(
          `SELECT e.*, u.email as user_email FROM empleados e LEFT JOIN users u ON e.user_id = u.id WHERE e.user_id = $1 ORDER BY e.fecha_ingreso DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'horas_extras': {
        const rows = await query(
          `SELECT h.*, e.nombre, e.apellido, e.cedula FROM horas_extras h JOIN empleados e ON h.empleado_id = e.id WHERE h.user_id = $1 ORDER BY h.fecha DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'vacaciones': {
        const rows = await query(
          `SELECT v.*, e.nombre, e.apellido, e.cedula, e.fecha_ingreso FROM vacaciones_control v JOIN empleados e ON v.empleado_id = e.id WHERE v.user_id = $1 ORDER BY v.fecha_inicio DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'utilidades': {
        const rows = await query(
          `SELECT u.*, e.nombre, e.apellido, e.cedula FROM utilidades_libro u JOIN empleados e ON u.empleado_id = e.id WHERE u.user_id = $1 ORDER BY u.anio DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'prestaciones': {
        const rows = await query(
          `SELECT p.*, e.nombre, e.apellido, e.cedula FROM prestaciones_sociales p JOIN empleados e ON p.empleado_id = e.id WHERE p.user_id = $1 ORDER BY p.fecha_corte DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'parafiscales': {
        const rows = await query(
          `SELECT a.*, e.nombre, e.apellido, e.cedula FROM aportes_parafiscales a JOIN empleados e ON a.empleado_id = e.id WHERE a.user_id = $1 ORDER BY a.periodo DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'solvencias': {
        const rows = await query(
          `SELECT * FROM solvencias_laborales WHERE user_id = $1 ORDER BY fecha_vencimiento ASC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'ingreso_egreso': {
        const rows = await query(
          `SELECT ie.*, e.nombre, e.apellido, e.cedula, e.cargo FROM ingreso_egreso_empleados ie JOIN empleados e ON ie.empleado_id = e.id WHERE ie.user_id = $1 ORDER BY ie.fecha DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'islr': {
        const rows = await query(
          `SELECT i.*, e.nombre, e.apellido, e.cedula FROM islr_retenciones i JOIN empleados e ON i.empleado_id = e.id WHERE i.user_id = $1 ORDER BY i.periodo DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'maternidad': {
        const rows = await query(
          `SELECT m.*, e.nombre, e.apellido, e.cedula FROM maternidad_lactancia m JOIN empleados e ON m.empleado_id = e.id WHERE m.user_id = $1 ORDER BY m.created_at DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'incapacidades': {
        const rows = await query(
          `SELECT i.*, e.nombre, e.apellido, e.cedula FROM incapacidades i JOIN empleados e ON i.empleado_id = e.id WHERE i.user_id = $1 ORDER BY i.fecha_inicio DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'reposos': {
        const rows = await query(
          `SELECT r.*, e.nombre, e.apellido, e.cedula FROM reposos_medicos r JOIN empleados e ON r.empleado_id = e.id WHERE r.user_id = $1 ORDER BY r.fecha_inicio DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'cancelacion_rif': {
        const rows = await query(
          `SELECT * FROM cancelacion_rif_seniat WHERE user_id = $1 ORDER BY fecha_cancelacion DESC`,
          [userId]
        );
        return NextResponse.json({ data: rows });
      }
      case 'alertas': {
        const alertas: any[] = [];
        const hoy = new Date().toISOString().split('T')[0];
        const en15 = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

        const vacProximas = await query(
          `SELECT v.*, e.nombre, e.apellido FROM vacaciones_control v JOIN empleados e ON v.empleado_id = e.id WHERE v.user_id = $1 AND v.estado = 'pendiente' AND v.fecha_inicio BETWEEN $2 AND $3`,
          [userId, hoy, en15]
        );
        vacProximas.forEach((v: any) => alertas.push({ tipo: 'vacaciones', mensaje: `${v.nombre} ${v.apellido} inicia vacaciones el ${v.fecha_inicio}`, urgencia: 'media', data: v }));

        const solvVencen = await query(
          `SELECT * FROM solvencias_laborales WHERE user_id = $1 AND estado IN ('vigente','por_vencer') AND fecha_vencimiento BETWEEN $2 AND $3`,
          [userId, hoy, en15]
        );
        solvVencen.forEach((s: any) => alertas.push({ tipo: 'solvencia', mensaje: `Solvencia ${s.tipo} vence el ${s.fecha_vencimiento}`, urgencia: 'alta', data: s }));

        const repososVencen = await query(
          `SELECT r.*, e.nombre, e.apellido FROM reposos_medicos r JOIN empleados e ON r.empleado_id = e.id WHERE r.user_id = $1 AND r.estado = 'activo' AND r.fecha_fin BETWEEN $2 AND $3`,
          [userId, hoy, en15]
        );
        repososVencen.forEach((r: any) => alertas.push({ tipo: 'reposo', mensaje: `Reposo de ${r.nombre} ${r.apellido} vence el ${r.fecha_fin}`, urgencia: 'media', data: r }));

        const maternidadAlerta = await query(
          `SELECT m.*, e.nombre, e.apellido FROM maternidad_lactancia m JOIN empleados e ON m.empleado_id = e.id WHERE m.user_id = $1 AND m.estado IN ('prenatal','postnatal','lactancia') AND (m.fin_postnatal BETWEEN $2 AND $3 OR m.lactancia_fin BETWEEN $2 AND $3)`,
          [userId, hoy, en15]
        );
        maternidadAlerta.forEach((m: any) => alertas.push({ tipo: 'maternidad', mensaje: `${m.nombre} ${m.apellido}: próximo reintegro o fin de lactancia`, urgencia: 'media', data: m }));

        return NextResponse.json({ data: alertas });
      }
      default:
        return NextResponse.json({ data: [] });
    }
  } catch (err) {
    console.error('[rrhh/libros] error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    const body = await req.json();
    const { action, ...data } = body;
    const userId = session.id;

    switch (action) {
      case 'add_horas_extra': {
        const recargo = data.tipo === 'extra_diurna' ? 50 : data.tipo === 'extra_nocturna' ? 80 : 30;
        const monto = data.salario_hora * data.horas * (1 + recargo / 100);
        await query(
          `INSERT INTO horas_extras (user_id, empleado_id, fecha, tipo, horas, salario_hora, recargo_pct, monto_total, notas) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [userId, data.empleado_id, data.fecha, data.tipo, data.horas, data.salario_hora, recargo, monto, data.notas || null]
        );
        return NextResponse.json({ success: true });
      }
      case 'add_vacacion': {
        const aniosServicio = data.anios_servicio || 1;
        const diasBono = Math.min(15 + (aniosServicio - 1), 30);
        await query(
          `INSERT INTO vacaciones_control (user_id, empleado_id, periodo, fecha_inicio, fecha_fin, dias_correspondientes, dias_pendientes, bono_vacacional, dias_bono) VALUES ($1,$2,$3,$4,$5,$6,$6,$7,$8)`,
          [userId, data.empleado_id, data.periodo, data.fecha_inicio, data.fecha_fin, data.dias_correspondientes || 15, data.bono_vacacional || 0, diasBono]
        );
        return NextResponse.json({ success: true });
      }
      case 'add_reposo': {
        const dias = Math.ceil((new Date(data.fecha_fin).getTime() - new Date(data.fecha_inicio).getTime()) / 86400000);
        await query(
          `INSERT INTO reposos_medicos (user_id, empleado_id, tipo, fecha_inicio, fecha_fin, dias_otorgados, dias_pendientes, medico_tratante, centro_medico, numero_reposo) VALUES ($1,$2,$3,$4,$5,$6,$6,$7,$8,$9)`,
          [userId, data.empleado_id, data.tipo, data.fecha_inicio, data.fecha_fin, dias, data.medico_tratante, data.centro_medico, data.numero_reposo]
        );
        return NextResponse.json({ success: true });
      }
      case 'add_ingreso_egreso': {
        let total = 0;
        const liqPrest = parseFloat(data.liquidacion_prestaciones) || 0;
        const liqVac = parseFloat(data.liquidacion_vacaciones) || 0;
        const liqUtil = parseFloat(data.liquidacion_utilidades) || 0;
        const indem = parseFloat(data.indemnizacion) || 0;
        total = liqPrest + liqVac + liqUtil + indem;
        await query(
          `INSERT INTO ingreso_egreso_empleados (user_id, empleado_id, tipo, fecha, causa_egreso, salario_al_momento, liquidacion_prestaciones, liquidacion_vacaciones, liquidacion_utilidades, indemnizacion, total_liquidacion, observaciones) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [userId, data.empleado_id, data.tipo, data.fecha, data.causa_egreso || null, data.salario_al_momento || 0, liqPrest, liqVac, liqUtil, indem, total, data.observaciones || null]
        );
        return NextResponse.json({ success: true });
      }
      case 'add_cancelacion_rif': {
        await query(
          `INSERT INTO cancelacion_rif_seniat (user_id, empleado_id, nombre_empleado, cedula, rif_anterior, fecha_cancelacion, causa, fecha_notificacion, observaciones) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [userId, data.empleado_id || null, data.nombre_empleado, data.cedula, data.rif_anterior, data.fecha_cancelacion, data.causa, data.fecha_notificacion || null, data.observaciones || null]
        );
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
    }
  } catch (err) {
    console.error('[rrhh/libros POST] error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
