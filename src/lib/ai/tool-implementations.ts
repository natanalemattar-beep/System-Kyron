import { query } from '@/lib/db';
import { registerTool } from './tools';

function safeParseFloat(v: any, fallback = 0): number {
  const n = parseFloat(String(v ?? ''));
  return isNaN(n) ? fallback : n;
}

export async function setupToolImplementations() {
  registerTool(
    'get_system_status',
    {
      name: 'get_system_status',
      description: 'Obtiene el estado actual del sistema: tasa de error, alertas, salud de BD, usuarios activos',
      parameters: { type: 'object', properties: {} },
    } as any,
    {
      execute: async () => {
        try {
          await query('SELECT 1');
          const [errorRate] = await query<{ value: string }>(
            `SELECT value FROM system_health_log WHERE metric_type = 'error_rate' ORDER BY recorded_at DESC LIMIT 1`
          );
          const [prevError] = await query<{ value: string }>(
            `SELECT value FROM system_health_log WHERE metric_type = 'error_rate' ORDER BY recorded_at DESC OFFSET 1 LIMIT 1`
          );
          const current = safeParseFloat(errorRate?.value);
          const previous = safeParseFloat(prevError?.value);
          const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
          const [u] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM users WHERE activo = true');
          const [a] = await query<{ cnt: string }>(
            "SELECT COUNT(*) as cnt FROM alert_queue WHERE created_at > NOW() - INTERVAL '7 days'"
          );
          const [n] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM notificaciones WHERE leida = false');
          return {
            status: 'healthy',
            db_conectada: true,
            tasa_error_actual: `${current.toFixed(2)}%`,
            cambio_error_rate: `${change.toFixed(1)}%`,
            usuarios_activos: parseInt(u?.cnt || '0'),
            alertas_semana: parseInt(a?.cnt || '0'),
            notificaciones_sin_leer: parseInt(n?.cnt || '0'),
          };
        } catch (e: any) {
          return { status: 'degraded', error: e.message };
        }
      },
    }
  );

  registerTool(
    'get_dashboard_metrics',
    {
      name: 'get_dashboard_metrics',
      description: 'Obtiene métricas del dashboard financiero: ingresos, gastos, facturas pendientes, saldo, nómina mensual',
      parameters: { type: 'object', properties: {} },
    } as any,
    {
      execute: async () => {
        try {
          const [ing] = await query<{ total: string }>(
            "SELECT COALESCE(SUM(total), 0)::text as total FROM facturas WHERE emitida_at >= NOW() - INTERVAL '30 days' AND anulada_at IS NULL"
          );
          const [gas] = await query<{ total: string }>(
            'SELECT COALESCE(SUM(monto), 0)::text as total FROM transacciones WHERE tipo = \'gasto\' AND created_at >= NOW() - INTERVAL \'30 days\''
          );
          const [pend] = await query<{ cnt: string }>(
            'SELECT COUNT(*) as cnt FROM facturas WHERE cobrada_at IS NULL AND anulada_at IS NULL AND emitida_at IS NOT NULL'
          );
          const [nom] = await query<{ total: string }>(
            'SELECT COALESCE(SUM(salario_base), 0)::text as total FROM empleados'
          );
          return {
            ingresos_30d: `$${safeParseFloat(ing?.total).toFixed(2)}`,
            gastos_30d: `$${safeParseFloat(gas?.total).toFixed(2)}`,
            facturas_pendientes: parseInt(pend?.cnt || '0'),
            nomina_mensual_estimada: `$${safeParseFloat(nom?.total).toFixed(2)}`,
          };
        } catch (e: any) {
          return { error: e.message };
        }
      },
    }
  );

  registerTool(
    'cerrar_periodo_fiscal',
    {
      name: 'cerrar_periodo_fiscal',
      description: 'Cierra un período fiscal. Calcula utilidad, actualiza saldos y registra el cierre. Requiere: periodo (ej: "2025-04")',
      parameters: {
        type: 'object',
        properties: {
          periodo: { type: 'string', description: 'Período a cerrar en formato YYYY-MM' },
          ingresos: { type: 'number', description: 'Total de ingresos del período' },
          gastos: { type: 'number', description: 'Total de gastos del período' },
        },
        required: ['periodo'],
      },
    } as any,
    {
      execute: async ({ periodo, ingresos, gastos }: { periodo: string; ingresos?: number; gastos?: number }) => {
        try {
          if (!ingresos || !gastos) {
            const metrics = await query<{ ingresos: string; gastos: string }>(
              `SELECT
                COALESCE((SELECT SUM(total) FROM facturas WHERE to_char(emitida_at, 'YYYY-MM') = $1 AND anulada_at IS NULL), 0)::text as ingresos,
                COALESCE((SELECT SUM(monto) FROM transacciones WHERE tipo = 'gasto' AND to_char(created_at, 'YYYY-MM') = $1), 0)::text as gastos`,
              [periodo]
            );
            ingresos = safeParseFloat(metrics[0]?.ingresos);
            gastos = safeParseFloat(metrics[0]?.gastos);
          }
          const utilidad = ingresos - gastos;
          await query(
            `INSERT INTO periodo_fiscal_cierres (periodo, ingresos, gastos, utilidad, cerrado_at)
             VALUES ($1, $2, $3, $4, NOW())
             ON CONFLICT (periodo) DO UPDATE SET ingresos = $2, gastos = $3, utilidad = $4, cerrado_at = NOW()`,
            [periodo, ingresos, gastos, utilidad]
          );
          await query(
            `INSERT INTO activity_log (categoria, descripcion) VALUES ('contabilidad', $1)`,
            [`Período fiscal cerrado: ${periodo} — Utilidad: $${utilidad.toFixed(2)}`]
          );
          return { success: true, periodo, ingresos, gastos, utilidad: utilidad.toFixed(2) };
        } catch (e: any) {
          return { success: false, error: e.message };
        }
      },
    }
  );

  registerTool(
    'calcular_nomina',
    {
      name: 'calcular_nomina',
      description: 'Calcula y genera la nómina para el período indicado. Crea registros de nómina y items por empleado.',
      parameters: {
        type: 'object',
        properties: {
          periodo: { type: 'string', description: 'Período de la nómina (ej: "Mayo 2025")' },
          tipo: { type: 'string', enum: ['quincenal', 'mensual'], description: 'Tipo de nómina' },
        },
        required: ['periodo', 'tipo'],
      },
    } as any,
    {
      execute: async ({ periodo, tipo }: { periodo: string; tipo: string }) => {
        try {
          const empleados = await query<{ id: number; nombre: string; apellido: string; salario_base: string }>(
            'SELECT id, nombre, apellido, salario_base::text FROM empleados WHERE activo = true'
          );
          if (empleados.length === 0) return { success: false, error: 'No hay empleados activos' };
          const [nomina] = await query<{ id: number }>(
            `INSERT INTO nominas (periodo, tipo, estado) VALUES ($1, $2, 'calculada') RETURNING id`,
            [periodo, tipo]
          );
          for (const emp of empleados) {
            const salarioBase = safeParseFloat(emp.salario_base);
            const deducciones = salarioBase * 0.09; // IVSS + FAOV + INCES
            await query(
              `INSERT INTO nomina_items (nomina_id, empleado_id, salario_base, dias_trabajados, asignaciones, deducciones, total)
               VALUES ($1, $2, $3, 30, 0, $4, $3 - $4)`,
              [nomina.id, emp.id, salarioBase, deducciones]
            );
          }
          await query(
            `INSERT INTO activity_log (categoria, descripcion) VALUES ('nomina', $1)`,
            [`Nómina ${tipo} generada: ${periodo} — ${empleados.length} empleados`]
          );
          return {
            success: true,
            nomina_id: nomina.id,
            periodo,
            empleados_procesados: empleados.length,
            total_estimado: empleados.reduce((s, e) => s + safeParseFloat(e.salario_base), 0).toFixed(2),
          };
        } catch (e: any) {
          return { success: false, error: e.message };
        }
      },
    }
  );

  registerTool(
    'listar_empleados',
    {
      name: 'listar_empleados',
      description: 'Lista los empleados activos con su información básica: nombre, cédula, salario, cargo',
      parameters: { type: 'object', properties: {} },
    } as any,
    {
      execute: async () => {
        try {
          const rows = await query<{ id: number; nombre: string; apellido: string; cedula: string; cargo: string; salario_base: string }>(
            'SELECT id, nombre, apellido, cedula, cargo, salario_base::text FROM empleados WHERE activo = true ORDER BY nombre'
          );
          return { empleados: rows.map((r) => ({ ...r, salario_base: `$${safeParseFloat(r.salario_base).toFixed(2)}` })) };
        } catch (e: any) {
          return { error: e.message };
        }
      },
    }
  );

  registerTool(
    'get_declaraciones',
    {
      name: 'get_declaraciones',
      description: 'Obtiene las declaraciones fiscales (ISLR, IVA) del usuario',
      parameters: { type: 'object', properties: {} },
    } as any,
    {
      execute: async () => {
        try {
          const rows = await query<{ id: number; ejercicio_fiscal: string; estado: string; fecha_declaracion: string; impuesto_a_pagar: string }>(
            'SELECT id, ejercicio_fiscal, estado, fecha_declaracion::text, COALESCE(impuesto_a_pagar::text, \'0\') as impuesto_a_pagar FROM declaraciones ORDER BY ejercicio_fiscal DESC LIMIT 10'
          );
          return { declaraciones: rows };
        } catch (e: any) {
          return { error: e.message };
        }
      },
    }
  );

  registerTool(
    'get_alertas',
    {
      name: 'get_alertas',
      description: 'Obtiene alertas activas del sistema: vencimientos fiscales, documentos por vencer, tareas pendientes',
      parameters: { type: 'object', properties: {} },
    } as any,
    {
      execute: async () => {
        try {
          const rows = await query<{ id: number; tipo: string; mensaje: string; severidad: string; creado_at: string }>(
            'SELECT id, tipo, mensaje, severidad, creado_at::text FROM alert_queue WHERE leida = false ORDER BY creado_at DESC LIMIT 20'
          );
          return { alertas: rows };
        } catch (e: any) {
          return { error: e.message };
        }
      },
    }
  );
}
