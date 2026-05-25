import { Tool } from '@google/genai';

export interface ToolImplementation {
  execute: (...args: any[]) => Promise<any>;
}

export const toolRegistry: Record<string, ToolImplementation> = {};

export function registerTool(
  name: string,
  _declaration: Tool,
  implementation: ToolImplementation
) {
  toolRegistry[name] = implementation;
}

export const coreTools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: 'query_database',
        description: 'Ejecuta consultas SQL de solo SELECT para obtener cualquier dato del sistema. Úsala cuando necesites info que no cubren otras tools.',
        parameters: {
          type: 'object',
          properties: {
            sql: { type: 'string', description: 'Consulta SELECT a ejecutar. Ej: SELECT * FROM empleados WHERE activo = true' },
            limit: { type: 'number', description: 'Máx filas (default 20, max 100)' },
          },
          required: ['sql'],
        },
      },
      {
        name: 'execute_action',
        description: 'Ejecuta acciones operativas: crear clientes, empleados, facturas, asientos contables, enviar notificaciones, consultar IVSS, calcular prestaciones.',
        parameters: {
          type: 'object',
          properties: {
            accion: {
              type: 'string',
              enum: [
                'crear_cliente', 'registrar_empleado', 'crear_factura',
                'crear_asiento_contable', 'enviar_notificacion',
                'consultar_ivss', 'calcular_prestaciones',
              ],
              description: 'Acción a ejecutar',
            },
            params: { type: 'object', description: 'Parámetros de la acción' },
          },
          required: ['accion'],
        },
      },
      {
        name: 'generar_documento',
        description: 'Genera documentos en markdown: cartas laborales, constancias, permisos, actas, reportes, certificados.',
        parameters: {
          type: 'object',
          properties: {
            tipo: {
              type: 'string',
              enum: ['carta_trabajo', 'constancia', 'permiso', 'reporte', 'acta', 'carta_renuncia', 'recibo', 'certificado'],
              description: 'Tipo de documento',
            },
            titulo: { type: 'string', description: 'Título' },
            contenido: { type: 'string', description: 'Contenido del documento en markdown' },
            destinatario: { type: 'string', description: 'Destinatario (opcional)' },
            empresa: { type: 'string', description: 'Empresa (opcional)' },
          },
          required: ['tipo', 'titulo', 'contenido'],
        },
      },
      {
        name: 'get_system_status',
        description: 'Estado actual del sistema: tasa de error, alertas, salud BD, usuarios activos',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_dashboard_metrics',
        description: 'Métricas financieras: ingresos 30d, gastos, facturas pendientes, nómina, clientes',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'cerrar_periodo_fiscal',
        description: 'Cierra un período fiscal. Calcula utilidad = ingresos - gastos y registra el cierre.',
        parameters: {
          type: 'object',
          properties: {
            periodo: { type: 'string', description: 'Período a cerrar (YYYY-MM, ej: 2025-04)' },
            ingresos: { type: 'number', description: 'Ingresos totales (opcional, auto-calculado)' },
            gastos: { type: 'number', description: 'Gastos totales (opcional, auto-calculado)' },
          },
          required: ['periodo'],
        },
      },
      {
        name: 'calcular_nomina',
        description: 'Calcula y genera la nómina para todos los empleados activos en un período.',
        parameters: {
          type: 'object',
          properties: {
            periodo: { type: 'string', description: 'Período (ej: "Mayo 2025")' },
            tipo: { type: 'string', enum: ['quincenal', 'mensual'], description: 'Tipo de nómina' },
          },
          required: ['periodo', 'tipo'],
        },
      },
      {
        name: 'listar_empleados',
        description: 'Lista empleados activos con nombre, cédula, salario, cargo, fecha ingreso',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_declaraciones',
        description: 'Declaraciones fiscales registradas (ISLR, IVA) por ejercicio fiscal',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_alertas',
        description: 'Alertas activas: vencimientos fiscales, documentos pendientes, tareas',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_tasas_bcv',
        description: 'Tasas de cambio actuales del BCV (USD, EUR)',
        parameters: { type: 'object', properties: {} },
      },
    ],
  },
];
