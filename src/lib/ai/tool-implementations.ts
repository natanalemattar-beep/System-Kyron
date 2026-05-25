import { registerTool } from "./tools";
import { query } from "@/lib/db";

export async function setupToolImplementations() {
  // 1. get_system_status
  registerTool("get_system_status", 
    {
      name: "get_system_status",
      description: "Obtiene el estado actual del sistema incluyendo tasa de error, alertas y salud de BD",
      parameters: { type: "object", properties: {} }
    } as any,
    {
      execute: async () => {
        try {
          await query("SELECT 1");

          const errorRate = await query<{ value: string }>(
            `SELECT value FROM system_health_log 
             WHERE metric_type = 'error_rate' 
             ORDER BY recorded_at DESC LIMIT 1`
          );

          const prevErrorRate = await query<{ value: string }>(
            `SELECT value FROM system_health_log 
             WHERE metric_type = 'error_rate' 
             ORDER BY recorded_at DESC OFFSET 1 LIMIT 1`
          );

          const current = parseFloat(errorRate[0]?.value || '0');
          const previous = parseFloat(prevErrorRate[0]?.value || '0');
          const change = previous > 0 ? ((current - previous) / previous * 100).toFixed(1) : '0';

          const userCount = await query<{ cnt: string }>(
            `SELECT COUNT(*) as cnt FROM users WHERE activo = true`
          );

          const alertCount = await query<{ cnt: string }>(
            `SELECT COUNT(*) as cnt FROM alert_queue WHERE created_at > NOW() - INTERVAL '7 days'`
          );

          const notiCount = await query<{ cnt: string }>(
            `SELECT COUNT(*) as cnt FROM notificaciones WHERE leida = false`
          );

          return {
            status: "healthy",
            db_conectada: true,
            tasa_error_actual: `${current.toFixed(2)}%`,
            tasa_error_anterior: `${previous.toFixed(2)}%`,
            cambio_error_rate: `${change}%`,
            usuarios_activos: parseInt(userCount[0]?.cnt || '0'),
            alertas_encoladas_semana: parseInt(alertCount[0]?.cnt || '0'),
            notificaciones_sin_leer: parseInt(notiCount[0]?.cnt || '0'),
            ultima_medicion: errorRate.length > 0 ? 'Disponible' : 'Sin datos históricos',
          };
        } catch (e) {
          return { status: "degraded", error: (e as Error).message };
        }
      }
    }
  );

  // 2. update_user_preference
  registerTool("update_user_preference",
    {
      name: "update_user_preference",
      description: "Actualiza una preferencia del usuario",
      parameters: {
        type: "object",
        properties: {
          key: { type: "string" },
          value: { type: "string" }
        },
        required: ["key", "value"]
      }
    } as any,
    {
      execute: async ({ key, value }: { key: string, value: string }) => {
        // This would call our preference context/api
        // For now, we simulate success
        console.log(`[AI Tool] Updating preference: ${key} = ${value}`);
        return { success: true, updated: { [key]: value } };
      }
    }
  );

  // 3. run_fiscal_action
  registerTool("run_fiscal_action",
    {
      name: "run_fiscal_action",
      description: "Ejecuta acciones fiscales",
      parameters: {
        type: "object",
        properties: {
          action: { type: "string" },
          params: { type: "object" }
        },
        required: ["action"]
      }
    } as any,
    {
      execute: async ({ action, params }: { action: string, params?: any }) => {
        console.log(`[AI Tool] Executing fiscal action: ${action}`, params);
        // Here we would route to existing API routes
        // For demo:
        if (action === "consultar_iva") {
          return { tasa: "16%", estado: "activa" };
        }
        return { success: true, message: `Acción ${action} procesada.` };
      }
    }
  );
}
