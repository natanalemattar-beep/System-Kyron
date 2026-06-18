import { query, queryOne } from '@/lib/db';
import { registerTool } from './tools';

const ALLOWED_TABLES = new Set([
  'users', 'clientes', 'facturas', 'empleados', 'proveedores',
  'asientos_contables', 'nominas', 'nomina_items',
  'notificaciones', 'alert_queue', 'system_health_log',
  'tasas_cambio', 'transacciones', 'declaraciones',
  'periodo_fiscal_cierres', 'aportes_parafiscales',
  'categorias', 'planes', 'subscriptions', 'user_sessions',
]);

function validateTableNames(sql: string): string | null {
  const upper = sql.toUpperCase();
  const tableRefs = upper.match(/(?:FROM|JOIN|INTO|UPDATE|TABLE)\s+([a-z_][a-z0-9_]*)/gi);
  if (!tableRefs) return null;
  for (const ref of tableRefs) {
    const tableName = ref.split(/\s+/)[1]?.toLowerCase();
    if (tableName && !ALLOWED_TABLES.has(tableName)) {
      return `Tabla no permitida en consultas SELECT: "${tableName}"`;
    }
  }
  return null;
}

function n(v: any, fallback = 0): number {
  const p = parseFloat(String(v ?? ''));
  return isNaN(p) ? fallback : p;
}

/* ─────────────────────────────────────────── */
/*  1. QUERY DATABASE (SQL solo lectura)       */
/* ─────────────────────────────────────────── */
registerTool(
  'query_database',
  {
    name: 'query_database',
    description: 'Ejecuta consultas SQL de solo SELECT para obtener datos del sistema. Para cuando necesitas información que no cubren las otras herramientas.',
    parameters: {
      type: 'object',
      properties: {
        sql: { type: 'string', description: 'Consulta SELECT a ejecutar. SOLO SELECT permitido. Usa nombres de tabla exactos de la BD.' },
        limit: { type: 'number', description: 'Máximo de filas a retornar (default 20, max 100)' },
      },
      required: ['sql'],
    },
  } as any,
  {
    execute: async ({ sql, limit = 20 }: { sql: string; limit?: number }) => {
      const trimmed = sql.trim();
      const lowered = trimmed.toLowerCase();
      if (!lowered.startsWith('select')) {
        return { error: 'Solo consultas SELECT están permitidas' };
      }
      const blocked = ['insert', 'update', 'delete', 'drop', 'alter', 'truncate', 'grant', 'revoke', 'create', 'exec', 'execute', 'call', 'pragma', 'attach'];
      for (const kw of blocked) {
        if (lowered.includes(kw)) {
          return { error: `Palabra clave "${kw}" no permitida en consultas.` };
        }
      }
      const tableErr = validateTableNames(trimmed);
      if (tableErr) {
        return { error: tableErr };
      }
      try {
        const safeLimit = Math.min(Math.max(1, limit || 20), 100);
        const cleanSql = trimmed.replace(/;\s*$/, '');
        const limitedSql = `${cleanSql} LIMIT $1`;
        const rows = await query(limitedSql, [safeLimit]);
        return {
          filas: rows.length,
          datos: rows,
          sql_ejecutado: limitedSql.replace(/\$1/, String(safeLimit)),
        };
      } catch (e: any) {
        return { error: `Error en consulta: ${e.message}` };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  2. EXECUTE ACTION — acciones operativas    */
/* ─────────────────────────────────────────── */
registerTool(
  'execute_action',
  {
    name: 'execute_action',
    description: 'Ejecuta una acción operativa en el sistema: crear, actualizar o consultar registros de negocio.',
    parameters: {
      type: 'object',
      properties: {
        accion: {
          type: 'string',
          enum: [
            'crear_factura', 'registrar_empleado', 'crear_asiento_contable',
            'enviar_notificacion', 'crear_cliente', 'registrar_proveedor',
            'actualizar_preferencia', 'generar_respaldo',
            'consultar_ivss', 'calcular_prestaciones',
          ],
          description: 'Acción a ejecutar',
        },
        params: { type: 'object', description: 'Parámetros de la acción' },
      },
      required: ['accion'],
    },
  } as any,
  {
    execute: async ({ accion, params = {} }: { accion: string; params?: any }) => {
      try {
        switch (accion) {
          /* ---- CLIENTES ---- */
          case 'crear_cliente': {
            const { nombre, email, telefono, rif, direccion, tipo_documento, numero_documento } = params;
            if (!nombre) return { success: false, error: 'nombre requerido' };
            const [r] = await query(
              `INSERT INTO clientes (nombre_contacto, email, telefono, rif, direccion, tipo_documento, numero_documento)
               VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
              [nombre, email || null, telefono || null, rif || null, direccion || null, tipo_documento || null, numero_documento || null]
            );
            return { success: true, cliente_id: r?.id, mensaje: `Cliente "${nombre}" creado` };
          }

          /* ---- EMPLEADOS ---- */
          case 'registrar_empleado': {
            const { nombre, apellido, cedula, cargo, salario_base, fecha_ingreso } = params;
            if (!nombre || !apellido) return { success: false, error: 'nombre y apellido requeridos' };
            const [e] = await query(
              `INSERT INTO empleados (nombre, apellido, cedula, cargo, salario_base, fecha_ingreso, activo)
               VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING id`,
              [nombre, apellido, cedula || null, cargo || null, n(salario_base), fecha_ingreso || null]
            );
            return { success: true, empleado_id: e?.id, mensaje: `Empleado "${nombre} ${apellido}" registrado` };
          }

          /* ---- FACTURAS ---- */
          case 'crear_factura': {
            const { cliente_id, total, descripcion, moneda = 'USD' } = params;
            if (!cliente_id || !total) return { success: false, error: 'cliente_id y total requeridos' };
            const [f] = await query(
              `WITH seq AS (
                 SELECT COALESCE(COUNT(*)::int, 0) + 1 AS n FROM facturas WHERE tipo_documento = 'FACTURA'
               )
               INSERT INTO facturas (cliente_id, total, moneda, descripcion, emitida_at, numero_factura, tipo_documento, estado, inmutable)
               SELECT $1, $2, $3, $4, NOW(), 'FAC-' || LPAD(seq.n::text, 6, '0'), 'FACTURA', 'emitida', true
               FROM seq RETURNING id, numero_factura`,
              [cliente_id, n(total), moneda, descripcion || null]
            );
            return { success: true, factura_id: f?.id, numero: f?.numero_factura, mensaje: `Factura creada: ${f?.numero_factura || '#' + f?.id}` };
          }

          /* ---- ASIENTOS CONTABLES ---- */
          case 'crear_asiento_contable': {
            const { descripcion, debe, haber, fecha } = params;
            if (!descripcion || debe === undefined || haber === undefined) {
              return { success: false, error: 'descripcion, debe y haber requeridos' };
            }
            const [a] = await query(
              `INSERT INTO asientos_contables (descripcion, debe, haber, fecha, user_id)
               VALUES ($1,$2,$3,$4,1) RETURNING id`,
              [descripcion, n(debe), n(haber), fecha || new Date().toISOString().split('T')[0]]
            );
            return { success: true, asiento_id: a?.id };
          }

          /* ---- NOTIFICACIONES ---- */
          case 'enviar_notificacion': {
            const { usuario_id, titulo, mensaje, tipo = 'informativa' } = params;
            if (!titulo || !mensaje) return { success: false, error: 'titulo y mensaje requeridos' };
            await query(
              `INSERT INTO notificaciones (user_id, titulo, mensaje, tipo, leida) VALUES ($1,$2,$3,$4,false)`,
              [usuario_id || 1, titulo, mensaje, tipo]
            );
            return { success: true, mensaje: 'Notificación enviada' };
          }

          /* ---- IVSS ---- */
          case 'consultar_ivss': {
            const rows = await query(
              `SELECT e.nombre, e.apellido, e.cedula, e.salario_base,
                      COALESCE((SELECT COUNT(*) FROM aportes_parafiscales WHERE empleado_id = e.id AND tipo = 'ivss'), 0) as aportes
               FROM empleados e WHERE e.activo = true ORDER BY e.nombre`
            );
            return { empleados: rows.map((r: any) => ({ ...r, salario_base: `$${n(r.salario_base).toFixed(2)}` })) };
          }

          /* ---- PRESTACIONES SOCIALES ---- */
          case 'calcular_prestaciones': {
            const { empleado_id } = params;
            if (!empleado_id) return { success: false, error: 'empleado_id requerido' };
            const emp = await queryOne<{ nombre: string; apellido: string; salario_base: string; fecha_ingreso: string }>(
              'SELECT nombre, apellido, salario_base::text, fecha_ingreso::text FROM empleados WHERE id = $1',
              [empleado_id]
            );
            if (!emp) return { success: false, error: 'Empleado no encontrado' };
            const salario = n(emp.salario_base);
            const antiguedad = emp.fecha_ingreso
              ? Math.floor((Date.now() - new Date(emp.fecha_ingreso).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
              : 0;
            const prestaciones = salario * 0.0833 * Math.max(antiguedad, 0) * 12;
            return {
              empleado: `${emp.nombre} ${emp.apellido}`,
              antiguedad_anios: antiguedad,
              salario_actual: `$${salario.toFixed(2)}`,
              prestaciones_estimadas: `$${prestaciones.toFixed(2)}`,
              nota: 'Cálculo estimado basado en LOTTT. Los montos pueden variar según utilidades, bonos y otros conceptos.',
            };
          }

          default:
            return { success: false, error: `Acción "${accion}" no implementada` };
        }
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  3. GENERAR DOCUMENTO                       */
/* ─────────────────────────────────────────── */
registerTool(
  'generar_documento',
  {
    name: 'generar_documento',
    description: 'Genera un documento con contenido dinámico en markdown: cartas laborales, constancias, permisos, reportes, actas.',
    parameters: {
      type: 'object',
      properties: {
        tipo: {
          type: 'string',
          enum: ['carta_trabajo', 'constancia_estudio', 'permiso', 'reporte', 'acta', 'carta_renuncia', 'recibo', 'certificado'],
          description: 'Tipo de documento a generar',
        },
        titulo: { type: 'string', description: 'Título del documento' },
        contenido: { type: 'string', description: 'Contenido del documento en markdown' },
        destinatario: { type: 'string', description: 'Nombre del destinatario (opcional)' },
        empresa: { type: 'string', description: 'Nombre de la empresa (opcional)' },
      },
      required: ['tipo', 'titulo', 'contenido'],
    },
  } as any,
  {
    execute: async ({ tipo, titulo, contenido, destinatario, empresa }: {
      tipo: string; titulo: string; contenido: string; destinatario?: string; empresa?: string;
    }) => {
      const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const doc = [
        `# ${titulo}`,
        ``,
        `**Fecha:** ${fecha}`,
        empresa ? `**Empresa:** ${empresa}` : null,
        destinatario ? `**Destinatario:** ${destinatario}` : null,
        `**Tipo:** ${tipo.replace(/_/g, ' ').toUpperCase()}`,
        ``,
        `---`,
        ``,
        contenido,
        ``,
        `---`,
        `*Documento generado por System Kyron IA*`,
      ]
        .filter(Boolean)
        .join('\n');

      return {
        success: true,
        documento: doc,
        tipo,
        formato: 'markdown',
        mensaje: `"${titulo}" generado. Puedes copiarlo o exportarlo a PDF.`,
      };
    },
  }
);

/* ─────────────────────────────────────────── */
/*  4. SISTEMA                                 */
/* ─────────────────────────────────────────── */
registerTool(
  'get_system_status',
  {
    name: 'get_system_status',
    description: 'Obtiene estado actual del sistema: tasa de error, alertas, salud de BD, usuarios activos',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        await query('SELECT 1');
        const [e] = await query<{ value: string }>(
          `SELECT value FROM system_health_log WHERE metric_type = 'error_rate' ORDER BY recorded_at DESC LIMIT 1`
        );
        const [p] = await query<{ value: string }>(
          `SELECT value FROM system_health_log WHERE metric_type = 'error_rate' ORDER BY recorded_at DESC OFFSET 1 LIMIT 1`
        );
        const cur = n(e?.value);
        const prev = n(p?.value);
        const chg = prev > 0 ? ((cur - prev) / prev) * 100 : 0;
        const [u] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM users WHERE activo = true');
        const [a] = await query<{ cnt: string }>(
          "SELECT COUNT(*) as cnt FROM alert_queue WHERE created_at > NOW() - INTERVAL '7 days'"
        );
        const [n] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM notificaciones WHERE leida = false');
        return {
          status: 'healthy', db_conectada: true,
          tasa_error_actual: `${cur.toFixed(2)}%`, cambio_error_rate: `${chg.toFixed(1)}%`,
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

/* ─────────────────────────────────────────── */
/*  5. MÉTRICAS DASHBOARD                      */
/* ─────────────────────────────────────────── */
registerTool(
  'get_dashboard_metrics',
  {
    name: 'get_dashboard_metrics',
    description: 'Métricas del dashboard financiero: ingresos, gastos, facturas pendientes, nómina mensual',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        const [ing] = await query<{ total: string }>(
          "SELECT COALESCE(SUM(total), 0)::text as total FROM facturas WHERE emitida_at >= NOW() - INTERVAL '30 days' AND anulada_at IS NULL"
        );
        const [gas] = await query<{ total: string }>(
          "SELECT COALESCE(SUM(monto), 0)::text as total FROM transacciones WHERE tipo = 'gasto' AND created_at >= NOW() - INTERVAL '30 days'"
        );
        const [pend] = await query<{ cnt: string }>(
          "SELECT COUNT(*) as cnt FROM facturas WHERE cobrada_at IS NULL AND anulada_at IS NULL AND emitida_at IS NOT NULL"
        );
        const [nom] = await query<{ total: string }>(
          'SELECT COALESCE(SUM(salario_base), 0)::text as total FROM empleados'
        );
        const [clientes] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM clientes');
        const [proveedores] = await query<{ cnt: string }>('SELECT COUNT(*) as cnt FROM proveedores');
        return {
          ingresos_30d: `$${n(ing?.total).toFixed(2)}`,
          gastos_30d: `$${n(gas?.total).toFixed(2)}`,
          facturas_pendientes: parseInt(pend?.cnt || '0'),
          nomina_mensual_estimada: `$${n(nom?.total).toFixed(2)}`,
          total_clientes: parseInt(clientes?.cnt || '0'),
          total_proveedores: parseInt(proveedores?.cnt || '0'),
        };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  6. CERRAR PERÍODO FISCAL                   */
/* ─────────────────────────────────────────── */
registerTool(
  'cerrar_periodo_fiscal',
  {
    name: 'cerrar_periodo_fiscal',
    description: 'Cierra un período fiscal: calcula utilidad, registra el cierre y genera acta contable.',
    parameters: {
      type: 'object',
      properties: {
        periodo: { type: 'string', description: 'Período a cerrar (YYYY-MM, ej: 2025-04)' },
        ingresos: { type: 'number', description: 'Total ingresos del período (opcional, auto-calculado)' },
        gastos: { type: 'number', description: 'Total gastos del período (opcional, auto-calculado)' },
      },
      required: ['periodo'],
    },
  } as any,
  {
    execute: async ({ periodo, ingresos, gastos }: { periodo: string; ingresos?: number; gastos?: number }) => {
      try {
        if (!ingresos || !gastos) {
          const m = await query<{ ingresos: string; gastos: string }>(
            `SELECT
              COALESCE((SELECT SUM(total) FROM facturas WHERE to_char(emitida_at, 'YYYY-MM') = $1 AND anulada_at IS NULL), 0)::text as ingresos,
              COALESCE((SELECT SUM(monto) FROM transacciones WHERE tipo = 'gasto' AND to_char(created_at, 'YYYY-MM') = $1), 0)::text as gastos`,
            [periodo]
          );
          ingresos = n(m[0]?.ingresos);
          gastos = n(m[0]?.gastos);
        }
        const utilidad = ingresos - gastos;
        await query(
          `INSERT INTO periodo_fiscal_cierres (periodo, ingresos, gastos, utilidad, cerrado_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT (periodo) DO UPDATE SET ingresos = $2, gastos = $3, utilidad = $4, cerrado_at = NOW()`,
          [periodo, ingresos, gastos, utilidad]
        );
        return {
          success: true, periodo,
          ingresos: `$${ingresos.toFixed(2)}`,
          gastos: `$${gastos.toFixed(2)}`,
          utilidad: `$${utilidad.toFixed(2)}`,
          mensaje: `Período ${periodo} cerrado. Utilidad: $${utilidad.toFixed(2)}`,
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  7. CALCULAR NÓMINA                         */
/* ─────────────────────────────────────────── */
registerTool(
  'calcular_nomina',
  {
    name: 'calcular_nomina',
    description: 'Calcula y genera la nómina para un período. Procesa todos los empleados activos.',
    parameters: {
      type: 'object',
      properties: {
        periodo: { type: 'string', description: 'Período (ej: "Mayo 2025")' },
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
        let totalGeneral = 0;
        for (const emp of empleados) {
          const sb = n(emp.salario_base);
          const ded = sb * 0.09;
          totalGeneral += sb;
          await query(
            `INSERT INTO nomina_items (nomina_id, empleado_id, salario_base, dias_trabajados, asignaciones, deducciones, total)
             VALUES ($1, $2, $3, 30, 0, $4, $3 - $4)`,
            [nomina.id, emp.id, sb, ded]
          );
        }
        return {
          success: true, nomina_id: nomina.id, periodo, tipo,
          empleados_procesados: empleados.length,
          total_estimado: `$${totalGeneral.toFixed(2)}`,
          detalle: empleados.map((e) => `${e.nombre} ${e.apellido}: $${n(e.salario_base).toFixed(2)}`),
        };
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  8. LISTAR EMPLEADOS                        */
/* ─────────────────────────────────────────── */
registerTool(
  'listar_empleados',
  {
    name: 'listar_empleados',
    description: 'Lista los empleados activos con su información: nombre, cédula, salario, cargo, fecha ingreso',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        const rows = await query<{ id: number; nombre: string; apellido: string; cedula: string; cargo: string; salario_base: string; fecha_ingreso: string }>(
          `SELECT id, nombre, apellido, cedula, cargo, salario_base::text, fecha_ingreso::text
           FROM empleados WHERE activo = true ORDER BY nombre`
        );
        return {
          total: rows.length,
          empleados: rows.map((r) => ({ ...r, salario_base: `$${n(r.salario_base).toFixed(2)}` })),
        };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  9. DECLARACIONES FISCALES                  */
/* ─────────────────────────────────────────── */
registerTool(
  'get_declaraciones',
  {
    name: 'get_declaraciones',
    description: 'Obtiene las declaraciones fiscales registradas (ISLR, IVA)',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        const rows = await query<{ id: number; ejercicio_fiscal: string; estado: string; fecha: string; impuesto: string }>(
          `SELECT id, ejercicio_fiscal, estado, fecha_declaracion::text as fecha, COALESCE(impuesto_a_pagar::text, '0') as impuesto
           FROM declaraciones ORDER BY ejercicio_fiscal DESC LIMIT 10`
        );
        return { total: rows.length, declaraciones: rows };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  10. ALERTAS                                */
/* ─────────────────────────────────────────── */
registerTool(
  'get_alertas',
  {
    name: 'get_alertas',
    description: 'Obtiene alertas activas: vencimientos fiscales, documentos pendientes, tareas',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        const rows = await query<{ id: number; tipo: string; mensaje: string; severidad: string; creado_at: string }>(
          `SELECT id, tipo, mensaje, severidad, creado_at::text FROM alert_queue WHERE leida = false ORDER BY creado_at DESC LIMIT 20`
        );
        return {
          total: rows.length,
          alertas: rows,
          mensaje: rows.length === 0 ? 'No hay alertas activas' : undefined,
        };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  }
);

/* ─────────────────────────────────────────── */
/*  11. TASAS BCV                              */
/* ─────────────────────────────────────────── */
registerTool(
  'get_tasas_bcv',
  {
    name: 'get_tasas_bcv',
    description: 'Obtiene las tasas de cambio actuales del BCV (Bolívar vs USD, EUR, etc.)',
    parameters: { type: 'object', properties: {} },
  } as any,
  {
    execute: async () => {
      try {
        const rows = await query<{ moneda: string; tasa: string; fecha: string }>(
          `SELECT moneda, tasa::text, fecha::text FROM tasas_cambio ORDER BY fecha DESC LIMIT 5`
        );
        if (rows.length > 0) {
          return { tasas: rows, fuente: 'BCV' };
        }
        return { tasas: [{ moneda: 'USD', tasa: 'Calcular...', fecha: new Date().toISOString().split('T')[0] }], fuente: 'BCV (sin datos recientes)' };
      } catch (e: any) {
        return { error: e.message };
      }
    },
  }
);

export async function setupToolImplementations() {
  /* All tools are registered at import time via registerTool() calls above.
     This function only exists for compatibility with existing callers. */
}
