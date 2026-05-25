import { Tool } from "@google/genai";

// This interface defines how a tool's implementation is mapped to its declaration
export interface ToolImplementation {
  execute: (...args: any[]) => Promise<any>;
}

// The Registry
export const toolRegistry: Record<string, ToolImplementation> = {};

// Helper to register tools
export function registerTool(name: string, declaration: Tool, implementation: ToolImplementation) {
  toolRegistry[name] = implementation;
  return declaration;
}

// Exported Tool Declarations (to be used in AiClient calls)
export const coreTools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "get_system_status",
        description: "Obtiene el estado actual de los servicios del sistema (errores, uso de CPU, etc.)",
        parameters: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "update_user_preference",
        description: "Actualiza una preferencia del usuario (idioma, tema, animaciones)",
        parameters: {
          type: "object",
          properties: {
            key: { type: "string", description: "La clave de la preferencia (ej: 'idioma', 'tema', 'reducir_animaciones')" },
            value: { type: "string", description: "El nuevo valor" },
          },
          required: ["key", "value"],
        },
      },
      {
        name: "run_fiscal_action",
        description: "Ejecuta una acción fiscal importante (ej: cerrar periodo, consultar tasas)",
        parameters: {
          type: "object",
          properties: {
            action: { type: "string", description: "La acción a realizar (ej: 'cierre_fiscal', 'consultar_iva')" },
            params: { type: "object", description: "Parámetros necesarios para la acción" },
          },
          required: ["action"],
        },
      },
    ],
  },
];
