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
        name: 'get_system_status',
        description: 'Obtiene el estado actual del sistema: tasa de error, alertas, salud de BD, usuarios activos',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_dashboard_metrics',
        description: 'Obtiene métricas del dashboard financiero: ingresos, gastos, facturas pendientes, saldo, nómina mensual',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'cerrar_periodo_fiscal',
        description: 'Cierra un período fiscal. Calcula utilidad, actualiza saldos y registra el cierre.',
        parameters: {
          type: 'object',
          properties: {
            periodo: { type: 'string', description: 'Período a cerrar en formato YYYY-MM (ej: 2025-04)' },
            ingresos: { type: 'number', description: 'Total de ingresos del período (opcional, auto-calculado)' },
            gastos: { type: 'number', description: 'Total de gastos del período (opcional, auto-calculado)' },
          },
          required: ['periodo'],
        },
      },
      {
        name: 'calcular_nomina',
        description: 'Calcula y genera la nómina para el período y tipo indicados. Crea registros y items por empleado.',
        parameters: {
          type: 'object',
          properties: {
            periodo: { type: 'string', description: 'Período de la nómina (ej: "Mayo 2025")' },
            tipo: { type: 'string', enum: ['quincenal', 'mensual'], description: 'Tipo de nómina' },
          },
          required: ['periodo', 'tipo'],
        },
      },
      {
        name: 'listar_empleados',
        description: 'Lista los empleados activos con su información básica: nombre, cédula, salario, cargo',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_declaraciones',
        description: 'Obtiene las declaraciones fiscales (ISLR, IVA) del usuario',
        parameters: { type: 'object', properties: {} },
      },
      {
        name: 'get_alertas',
        description: 'Obtiene alertas activas del sistema: vencimientos fiscales, documentos por vencer, tareas pendientes',
        parameters: { type: 'object', properties: {} },
      },
    ],
  },
];
