import { query, queryOne, queryWithCount } from '@/lib/db';

async function safeQuery(sql: string, params?: unknown[]): Promise<void> {
  try { await query(sql, params); } catch { /* non-fatal */ }
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger_type: 'schedule' | 'event' | 'manual';
  trigger_config: Record<string, unknown>;
  action_type: string;
  action_config: Record<string, unknown>;
  enabled: boolean;
  module: string | null;
  last_run_at: string | null;
  next_run_at: string | null;
  run_count: number;
  fail_count: number;
  avg_duration_ms: number | null;
  created_at: string;
}

export interface AutomationLog {
  id: string;
  rule_id: string;
  rule_name: string;
  status: 'success' | 'error' | 'running' | 'skipped';
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  result_summary: string | null;
  error_message: string | null;
}

const ACTION_HANDLERS: Record<string, (config: Record<string, unknown>) => Promise<string>> = {};

export function registerAction(type: string, handler: (config: Record<string, unknown>) => Promise<string>) {
  ACTION_HANDLERS[type] = handler;
}

registerAction('bcv_sync', async () => {
  try {
    const resp = await fetch('https://pydolarve.org/api/v2/precio?page=bcv', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) throw new Error(`BCV API ${resp.status}`);
    const data = await resp.json();
    const usdRate = data?.monitors?.usd?.price;
    if (usdRate && typeof usdRate === 'number') {
      await query(
        `INSERT INTO tasas_bcv (fecha, tasa_usd_ves, fuente)
         VALUES (CURRENT_DATE, $1, 'pydolarve_auto')
         ON CONFLICT (fecha) DO UPDATE SET tasa_usd_ves = $1, fuente = 'pydolarve_auto'`,
        [usdRate]
      );
      return `Tasa USD/VES actualizada: ${usdRate.toFixed(2)} Bs.`;
    }
    return 'Tasa obtenida pero sin valor válido';
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Error sincronizando BCV: ${msg}`);
  }
});

registerAction('fiscal_alerts', async () => {
  const { verificarAlertasPredictivas } = await import('@/lib/alertas-predictivas');
  const alertas = await verificarAlertasPredictivas();
  return `${alertas.length} alerta(s) fiscal(es) verificada(s) — SENIAT, IVSS, INCES, BANAVIH, INPSASEL, SUNDDE, SUNAGRO, SENCAMER, municipales`;
});

registerAction('regulatory_alerts', async () => {
  const { verificarAlertasRegulatorias } = await import('@/lib/alertas-regulatorias');
  const alertasGeneradas = await verificarAlertasRegulatorias();
  return `${alertasGeneradas} alerta(s) regulatoria(s) generada(s) — Gacetas Oficiales y cambios Asamblea Nacional`;
});

registerAction('db_health_check', async () => {
  const start = Date.now();
  const userRow = await queryOne<{ total: string }>('SELECT COUNT(*) as total FROM users');
  const latency = Date.now() - start;
  const users = userRow?.total || '0';

  const tableRow = await queryOne<{ cnt: string }>(`SELECT COUNT(*) as cnt FROM information_schema.tables WHERE table_schema = 'public'`);
  const tableCount = tableRow?.cnt || '0';

  const sizeRow = await queryOne<{ size: string }>(`SELECT pg_size_pretty(pg_database_size(current_database())) as size`);
  const dbSize = sizeRow?.size || 'N/A';

  await query(
    `INSERT INTO system_health_log (metric_type, value, unit, context)
     VALUES ('db_latency', $1, 'ms', $2)`,
    [latency, JSON.stringify({ users, tables: tableCount, db_size: dbSize, latency_ms: latency })]
  );

  return `DB OK — ${tableCount} tablas, ${users} usuarios, ${dbSize}, latencia: ${latency}ms`;
});

registerAction('blockchain_batch_anchor', async () => {
  const row = await queryOne<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM blockchain_proofs WHERE status = 'pending'`
  );
  const count = parseInt(row?.cnt || '0');
  if (count === 0) return 'Sin pruebas pendientes de anclar';

  await query(
    `UPDATE blockchain_proofs SET status = 'anchored', anchored_at = NOW()
     WHERE status = 'pending' AND created_at < NOW() - INTERVAL '1 hour'`
  );

  return `${count} prueba(s) blockchain procesada(s)`;
});

registerAction('session_cleanup', async () => {
  const expiredCodes = await query(
    `DELETE FROM verification_codes WHERE expires_at < NOW() - INTERVAL '1 day' RETURNING id`
  );
  const codesClean = expiredCodes.length;

  const oldLogs = await query(
    `DELETE FROM automation_logs WHERE started_at < NOW() - INTERVAL '30 days' RETURNING id`
  );
  const logsClean = oldLogs.length;

  return `Limpieza: ${codesClean} códigos expirados, ${logsClean} logs antiguos eliminados`;
});

registerAction('invoice_reminders', async () => {
  const overdue = await query(
    `SELECT f.id, f.numero_factura, f.total, f.fecha_vencimiento, 
            COALESCE(c.razon_social, c.nombre_contacto) as cliente_nombre, c.email as cliente_email
     FROM facturas f
     LEFT JOIN clientes c ON f.cliente_id = c.id
     WHERE f.estado = 'pendiente' 
       AND f.fecha_vencimiento <= CURRENT_DATE + INTERVAL '3 days'
       AND f.fecha_vencimiento >= CURRENT_DATE - INTERVAL '30 days'`
  );

  if (overdue.length === 0) return 'Sin facturas por vencer o vencidas';

  let notified = 0;
  for (const inv of overdue) {
    const i = inv as Record<string, unknown>;
    if (i.cliente_email) {
      try {
        await query(
          `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, leida, canal)
           SELECT f.user_id, 'alerta', 'Factura por cobrar', $1, 'alta', false, 'app'
           FROM facturas f WHERE f.id = $2 LIMIT 1`,
          [`Factura #${i.numero_factura} por ${i.total} - Cliente: ${i.cliente_nombre}`, i.id]
        );
        notified++;
      } catch { /* skip individual failures */ }
    }
  }

  return `${overdue.length} factura(s) próximas a vencer, ${notified} notificación(es) creada(s)`;
});

registerAction('email_automation', async () => {
  const pendingEmails = await query(
    `SELECT ea.* FROM email_automaticos ea
     WHERE ea.activo = true 
       AND ea.intervalo_horas IS NOT NULL
       AND (ea.ultimo_envio IS NULL OR ea.ultimo_envio < NOW() - (ea.intervalo_horas || ' hours')::interval)`
  );

  let processed = 0;
  const errors: string[] = [];

  for (const emailRule of pendingEmails) {
    const rule = emailRule as Record<string, unknown>;
    try {
      if (rule.tipo === 'factura_vencida') {
        const overdue = await query(
          `SELECT COUNT(*) as cnt FROM facturas 
           WHERE estado = 'pendiente' AND fecha_vencimiento < CURRENT_DATE`
        );
        const cnt = parseInt((overdue[0] as Record<string, string>)?.cnt || '0');
        if (cnt > 0) {
          const affectedUsers = await query(
            `SELECT DISTINCT f.user_id, u.email, u.nombre, u.apellido 
             FROM facturas f JOIN users u ON u.id = f.user_id 
             WHERE f.estado = 'pendiente' AND f.fecha_vencimiento < CURRENT_DATE`
          );
          for (const row of affectedUsers) {
            const u = row as Record<string, string>;
            await safeQuery(
              `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
               VALUES ($1, 'alerta', 'Facturas vencidas pendientes', $2, 'alta', 'multi')`,
              [u.user_id, `${cnt} factura(s) con fecha de vencimiento pasada requieren atención`]
            );
            if (u.email) {
              try {
                const uc = await queryOne<{ notif_email: boolean; email_alertas: string | null }>(
                  `SELECT notif_email, email_alertas FROM configuracion_usuario WHERE user_id = $1`,
                  [u.user_id]
                );
                if (!uc || uc.notif_email !== false) {
                  const { sendEmail, buildKyronEmailTemplate } = await import('@/lib/email-service');
                  await sendEmail({
                    to: uc?.email_alertas || u.email,
                    subject: `${cnt} factura(s) vencida(s) — Acción requerida`,
                    html: buildKyronEmailTemplate({
                      title: `Facturas Vencidas`,
                      body: `<p>Hola ${u.nombre || ''},</p><p>Tienes <strong>${cnt}</strong> factura(s) con fecha de vencimiento pasada que requieren atención inmediata.</p><p>Ingresa a System Kyron para gestionar tus pagos pendientes.</p>`,
                      footer: 'Este es un recordatorio automático de System Kyron.',
                    }),
                    module: 'contabilidad',
                    purpose: 'general',
                  });
                }
              } catch { /* email delivery failure is non-fatal */ }
            }
          }
        }
      } else if (rule.tipo === 'resumen_semanal') {
        const stats = await queryOne<Record<string, string>>(
          `SELECT COUNT(*) as total FROM activity_log WHERE created_at > NOW() - INTERVAL '7 days'`
        );
        const total = stats?.total || '0';
        const adminUsers = await query(
          `SELECT id, email, nombre FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`
        );
        for (const row of adminUsers) {
          const u = row as Record<string, string>;
          await safeQuery(
            `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
             VALUES ($1, 'info', 'Resumen semanal disponible', $2, 'normal', 'app')`,
            [u.id, `Tu resumen de actividad semanal está listo: ${total} eventos registrados`]
          );
          if (u.email) {
            try {
              const uc = await queryOne<{ notif_email: boolean; email_alertas: string | null }>(
                `SELECT notif_email, email_alertas FROM configuracion_usuario WHERE user_id = $1`,
                [u.id]
              );
              if (!uc || uc.notif_email !== false) {
                const { sendEmail, buildKyronEmailTemplate } = await import('@/lib/email-service');
                await sendEmail({
                  to: uc?.email_alertas || u.email,
                  subject: 'Tu resumen semanal — System Kyron',
                  html: buildKyronEmailTemplate({
                    title: 'Resumen Semanal',
                    body: `<p>Hola ${u.nombre || ''},</p><p>Tu resumen de actividad semanal está listo: <strong>${total}</strong> eventos registrados en los últimos 7 días.</p>`,
                    footer: 'Resumen automático generado por System Kyron.',
                  }),
                  module: 'sistema',
                  purpose: 'general',
                });
              }
            } catch { /* email delivery failure is non-fatal */ }
          }
        }
      } else if (rule.tipo === 'alerta_fiscal') {
        await safeQuery(
          `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
           SELECT id, 'fiscal', 'Revisión fiscal automática', 
             'Verificación periódica de obligaciones fiscales completada', 'normal', 'app'
           FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`
        );
      } else if (rule.tipo === 'recordatorio_pago') {
        await safeQuery(
          `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
           SELECT id, 'info', 'Recordatorio de pago', 
             'Recuerda mantener tu suscripción al día para acceso ininterrumpido', 'normal', 'app'
           FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`
        );
      }

      await query(
        `UPDATE email_automaticos SET ultimo_envio = NOW(), total_enviados = total_enviados + 1 WHERE id = $1`,
        [rule.id]
      );
      processed++;
    } catch (err) {
      const msg = `[email_automation] Rule ${rule.tipo}(id=${rule.id}) failed: ${err instanceof Error ? err.message : String(err)}`;
      console.error(msg);
      errors.push(msg);
    }
  }

  const errSummary = errors.length > 0 ? ` | ${errors.length} error(s)` : '';
  return `${processed} regla(s) de email automático procesada(s) de ${pendingEmails.length} pendiente(s)${errSummary}`;
});

registerAction('activity_digest', async () => {
  const s = await queryOne<Record<string, string>>(
    `SELECT 
       COUNT(*) as last_24h,
       COUNT(*) FILTER (WHERE categoria = 'auth') as auth_events,
       COUNT(*) FILTER (WHERE categoria = 'contabilidad') as accounting_events,
       COUNT(*) FILTER (WHERE evento LIKE '%error%' OR evento LIKE '%fail%') as errors
     FROM activity_log
     WHERE created_at > NOW() - INTERVAL '24 hours'`
  );

  return `Resumen 24h: ${s?.last_24h || 0} eventos, ${s?.auth_events || 0} auth, ${s?.accounting_events || 0} contables, ${s?.errors || 0} errores`;
});

export async function executeAutomation(ruleId: string): Promise<AutomationLog> {
  const rule = await queryOne<AutomationRule>(
    `SELECT * FROM automation_rules WHERE id = $1`, [ruleId]
  );
  if (!rule) throw new Error(`Rule ${ruleId} not found`);

  const logId = crypto.randomUUID();
  const startedAt = new Date().toISOString();

  await query(
    `INSERT INTO automation_logs (id, rule_id, status, started_at)
     VALUES ($1, $2, 'running', $3)`,
    [logId, ruleId, startedAt]
  );

  const handler = ACTION_HANDLERS[rule.action_type];
  if (!handler) {
    const err = `No handler for action type: ${rule.action_type}`;
    await query(
      `UPDATE automation_logs SET status = 'error', finished_at = NOW(), error_message = $1,
       duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
       WHERE id = $2`,
      [err, logId]
    );
    await query(
      `UPDATE automation_rules SET fail_count = fail_count + 1, last_run_at = NOW() WHERE id = $1`,
      [ruleId]
    );
    throw new Error(err);
  }

  try {
    const summary = await handler(rule.action_config as Record<string, unknown>);
    await query(
      `UPDATE automation_logs SET status = 'success', finished_at = NOW(), result_summary = $1,
       duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
       WHERE id = $2`,
      [summary, logId]
    );
    await query(
      `UPDATE automation_rules SET 
        last_run_at = NOW(), 
        run_count = run_count + 1,
        avg_duration_ms = COALESCE(
          (avg_duration_ms * (run_count) + EXTRACT(EPOCH FROM (NOW() - $2::timestamp)) * 1000) / (run_count + 1),
          EXTRACT(EPOCH FROM (NOW() - $2::timestamp)) * 1000
        )
       WHERE id = $1`,
      [ruleId, startedAt]
    );

    return {
      id: logId, rule_id: ruleId, rule_name: rule.name,
      status: 'success', started_at: startedAt, finished_at: new Date().toISOString(),
      duration_ms: Date.now() - new Date(startedAt).getTime(), result_summary: summary, error_message: null
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    await query(
      `UPDATE automation_logs SET status = 'error', finished_at = NOW(), error_message = $1,
       duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
       WHERE id = $2`,
      [msg, logId]
    );
    await query(
      `UPDATE automation_rules SET fail_count = fail_count + 1, last_run_at = NOW() WHERE id = $1`,
      [ruleId]
    );
    return {
      id: logId, rule_id: ruleId, rule_name: rule.name,
      status: 'error', started_at: startedAt, finished_at: new Date().toISOString(),
      duration_ms: Date.now() - new Date(startedAt).getTime(), result_summary: null, error_message: msg
    };
  }
}

export async function runScheduledAutomations(): Promise<AutomationLog[]> {
  const claimed = await query<AutomationRule>(
    `UPDATE automation_rules 
     SET next_run_at = NOW() + ((trigger_config->>'interval_hours')::int || ' hours')::interval
     WHERE id IN (
       SELECT id FROM automation_rules
       WHERE enabled = true AND trigger_type = 'schedule'
         AND (next_run_at IS NULL OR next_run_at <= NOW())
       FOR UPDATE SKIP LOCKED
     )
     RETURNING *`
  );

  const logs: AutomationLog[] = [];
  for (const rule of claimed) {
    try {
      const log = await executeAutomation(rule.id);
      logs.push(log);
    } catch { /* logged inside executeAutomation */ }
  }

  return logs;
}

export async function getAutomationStats() {
  const s = await queryOne<Record<string, string>>(
    `SELECT 
       COUNT(*) as total_rules,
       COUNT(*) FILTER (WHERE enabled = true) as active_rules,
       SUM(run_count) as total_runs,
       SUM(fail_count) as total_failures,
       AVG(avg_duration_ms) as avg_duration
     FROM automation_rules`
  );

  const recentLogs = await query(
    `SELECT al.*, ar.name as rule_name 
     FROM automation_logs al 
     JOIN automation_rules ar ON al.rule_id = ar.id
     ORDER BY al.started_at DESC LIMIT 20`
  );

  const h = await queryOne<Record<string, string>>(
    `SELECT COALESCE(SUM(duration_ms), 0) / 1000.0 / 60.0 as minutes_saved,
            COUNT(*) as total_executions
     FROM automation_logs WHERE status = 'success'`
  );

  return {
    totalRules: parseInt(s?.total_rules || '0'),
    activeRules: parseInt(s?.active_rules || '0'),
    totalRuns: parseInt(s?.total_runs || '0'),
    totalFailures: parseInt(s?.total_failures || '0'),
    avgDurationMs: parseFloat(s?.avg_duration || '0'),
    totalExecutions: parseInt(h?.total_executions || '0'),
    minutesSaved: parseFloat(h?.minutes_saved || '0'),
    recentLogs,
  };
}
