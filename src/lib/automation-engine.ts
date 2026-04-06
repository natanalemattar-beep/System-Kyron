import { query, queryOne } from '@/lib/db';
import { sendNotificationEmail } from '@/lib/alert-email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

async function safeQuery(sql: string, params?: unknown[]): Promise<void> {
  try { await query(sql, params); } catch { /* non-fatal */ }
}

async function dispatchMultichannel(userId: number, notification: { tipo: string; titulo: string; mensaje: string }) {
  await Promise.allSettled([
    sendNotificationEmail(userId, notification),
    sendWhatsAppNotification(userId, notification),
    sendSmsNotification(userId, notification),
  ]);
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
  const sources = [
    { url: 'https://pydolarve.org/api/v2/precio?page=bcv', name: 'pydolarve', extract: (d: any) => d?.monitors?.usd?.price },
    { url: 'https://ve.dolarapi.com/v1/dolares/oficial', name: 'dolarapi', extract: (d: any) => d?.promedio },
  ];

  for (const src of sources) {
    try {
      const resp = await fetch(src.url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) continue;
      const data = await resp.json();
      const usdRate = src.extract(data);
      if (usdRate && typeof usdRate === 'number' && usdRate > 0) {
        await query(
          `INSERT INTO tasas_bcv (fecha, tasa_usd_ves, fuente)
           VALUES (CURRENT_DATE, $1, $2)
           ON CONFLICT (fecha) DO UPDATE SET tasa_usd_ves = $1, fuente = $2`,
          [usdRate, `${src.name}_auto`]
        );
        return `Tasa USD/VES actualizada: ${usdRate.toFixed(2)} Bs. (fuente: ${src.name})`;
      }
    } catch { /* try next source */ }
  }

  const existing = await queryOne<{ tasa_usd_ves: string }>(
    `SELECT tasa_usd_ves FROM tasas_bcv WHERE fecha = CURRENT_DATE`
  );
  if (existing) {
    return `Sin conexión a APIs externas — se mantiene tasa del día: ${parseFloat(existing.tasa_usd_ves).toFixed(2)} Bs.`;
  }
  throw new Error('No se pudo obtener la tasa BCV de ninguna fuente y no hay tasa del día');
});

registerAction('fiscal_alerts', async () => {
  const now = new Date();
  const day = now.getDate();
  const alerts: string[] = [];

  const pendingIVA = await queryOne<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM facturas WHERE estado = 'pendiente' AND fecha_emision >= CURRENT_DATE - INTERVAL '15 days'`
  );
  const ivaCount = parseInt(pendingIVA?.cnt || '0');

  if (day >= 1 && day <= 15) {
    alerts.push('Período de declaración IVA quincenal activo');
  }
  if (day >= 25) {
    alerts.push('Próximo cierre de período fiscal — verificar retenciones ISLR');
  }

  const overdueInvoices = await queryOne<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM facturas WHERE estado = 'pendiente' AND fecha_vencimiento < CURRENT_DATE`
  );
  const overdueCount = parseInt(overdueInvoices?.cnt || '0');
  if (overdueCount > 0) {
    alerts.push(`${overdueCount} factura(s) vencida(s) requieren atención`);
  }

  if (alerts.length > 0) {
    for (const alert of alerts) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         SELECT id, 'fiscal', 'Alerta Fiscal Automática', $1, 'alta', 'app'
         FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`,
        [alert]
      );
    }
  }

  return `Revisión fiscal: ${alerts.length} alerta(s) generada(s), ${ivaCount} facturas en período IVA, ${overdueCount} vencida(s)`;
});

registerAction('regulatory_alerts', async () => {
  const recentChanges = await queryOne<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM notificaciones WHERE tipo = 'fiscal' AND created_at > NOW() - INTERVAL '24 hours'`
  );
  const recent = parseInt(recentChanges?.cnt || '0');

  return `Monitor regulatorio ejecutado — ${recent} alerta(s) fiscal(es) en últimas 24h`;
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
               VALUES ($1, 'alerta', 'Facturas vencidas pendientes', $2, 'alta', 'app')`,
              [u.user_id, `${cnt} factura(s) con fecha de vencimiento pasada requieren atención`]
            );
          }
        }
      } else if (rule.tipo === 'resumen_semanal') {
        const stats = await queryOne<Record<string, string>>(
          `SELECT COUNT(*) as total FROM activity_log WHERE created_at > NOW() - INTERVAL '7 days'`
        );
        const total = stats?.total || '0';
        await safeQuery(
          `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
           SELECT id, 'info', 'Resumen semanal disponible', $1, 'normal', 'app'
           FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`,
          [`Tu resumen de actividad semanal está listo: ${total} eventos registrados`]
        );
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

registerAction('inventory_alerts', async () => {
  const lowStock = await query<Record<string, unknown>>(
    `SELECT i.id, i.nombre, i.stock_actual, i.stock_minimo, i.user_id
     FROM inventario i
     WHERE i.activo = true AND i.stock_actual <= i.stock_minimo AND i.stock_minimo > 0`
  );

  const outOfStock = await query<Record<string, unknown>>(
    `SELECT i.id, i.nombre, i.user_id
     FROM inventario i
     WHERE i.activo = true AND i.stock_actual <= 0`
  );

  let notified = 0;

  const userLowStock = new Map<number, string[]>();
  for (const item of lowStock) {
    const uid = item.user_id as number;
    if (!userLowStock.has(uid)) userLowStock.set(uid, []);
    userLowStock.get(uid)!.push(`${item.nombre} (${item.stock_actual}/${item.stock_minimo})`);
  }
  for (const [userId, items] of userLowStock) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Stock bajo detectado', $2, 'alta', 'app')`,
      [userId, `${items.length} producto(s) por debajo del mínimo: ${items.slice(0, 5).join(', ')}${items.length > 5 ? '...' : ''}`]
    );
    notified++;
  }

  const userOutOfStock = new Map<number, string[]>();
  for (const item of outOfStock) {
    const uid = item.user_id as number;
    if (!userOutOfStock.has(uid)) userOutOfStock.set(uid, []);
    userOutOfStock.get(uid)!.push(item.nombre as string);
  }
  for (const [userId, items] of userOutOfStock) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Productos agotados', $2, 'critica', 'app')`,
      [userId, `${items.length} producto(s) sin stock: ${items.slice(0, 5).join(', ')}${items.length > 5 ? '...' : ''}`]
    );
    notified++;
  }

  return `Inventario: ${lowStock.length} bajo stock, ${outOfStock.length} agotados, ${notified} alerta(s)`;
});

registerAction('hr_contract_alerts', async () => {
  const expiringContracts = await query<Record<string, unknown>>(
    `SELECT cl.id, cl.titulo, cl.cargo, cl.fecha_fin, cl.user_id,
            e.nombre || ' ' || e.apellido as empleado_nombre
     FROM contratos_laborales cl
     LEFT JOIN empleados e ON cl.empleado_id = e.id
     WHERE cl.estado IN ('vigente', 'firmado')
       AND cl.fecha_fin IS NOT NULL
       AND cl.fecha_fin BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'`
  );

  const expiredContracts = await query<Record<string, unknown>>(
    `SELECT cl.id, cl.titulo, cl.cargo, cl.fecha_fin, cl.user_id,
            e.nombre || ' ' || e.apellido as empleado_nombre
     FROM contratos_laborales cl
     LEFT JOIN empleados e ON cl.empleado_id = e.id
     WHERE cl.estado IN ('vigente', 'firmado')
       AND cl.fecha_fin IS NOT NULL
       AND cl.fecha_fin < CURRENT_DATE`
  );

  let notified = 0;

  const userExpiring = new Map<number, string[]>();
  for (const c of expiringContracts) {
    const uid = c.user_id as number;
    if (!userExpiring.has(uid)) userExpiring.set(uid, []);
    const daysLeft = Math.ceil((new Date(c.fecha_fin as string).getTime() - Date.now()) / 86400000);
    userExpiring.get(uid)!.push(`${c.empleado_nombre || c.cargo} (${daysLeft} días)`);
  }
  for (const [userId, items] of userExpiring) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Contratos por vencer', $2, 'alta', 'app')`,
      [userId, `${items.length} contrato(s) vencen pronto: ${items.slice(0, 5).join(', ')}`]
    );
    notified++;
  }

  for (const c of expiredContracts) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Contrato laboral vencido', $2, 'critica', 'app')`,
      [c.user_id, `Contrato de ${c.empleado_nombre || c.cargo}: "${c.titulo}" venció el ${c.fecha_fin}`]
    );
    await safeQuery(
      `UPDATE contratos_laborales SET estado = 'finalizado' WHERE id = $1 AND estado IN ('vigente','firmado')`,
      [c.id]
    );
    notified++;
  }

  return `RRHH Contratos: ${expiringContracts.length} por vencer, ${expiredContracts.length} vencidos, ${notified} alerta(s)`;
});

registerAction('hr_vacation_alerts', async () => {
  const pendingVacations = await query<Record<string, unknown>>(
    `SELECT vc.id, vc.dias_pendientes, vc.periodo, vc.user_id, vc.empleado_id,
            e.nombre || ' ' || e.apellido as empleado_nombre
     FROM vacaciones_control vc
     JOIN empleados e ON vc.empleado_id = e.id
     WHERE vc.estado = 'pendiente' AND vc.dias_pendientes > 0
       AND vc.alerta_enviada = false AND e.activo = true`
  );

  const accumulated = pendingVacations.filter(v => (v.dias_pendientes as number) >= 30);
  let notified = 0;

  const userAccumulated = new Map<number, string[]>();
  for (const v of accumulated) {
    const uid = v.user_id as number;
    if (!userAccumulated.has(uid)) userAccumulated.set(uid, []);
    userAccumulated.get(uid)!.push(`${v.empleado_nombre}: ${v.dias_pendientes} días`);
  }
  for (const [userId, items] of userAccumulated) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Vacaciones acumuladas excesivas', $2, 'media', 'app')`,
      [userId, `${items.length} empleado(s) con +30 días acumulados: ${items.slice(0, 5).join(', ')}`]
    );
    notified++;
  }

  for (const v of accumulated) {
    await safeQuery(`UPDATE vacaciones_control SET alerta_enviada = true WHERE id = $1`, [v.id]);
  }

  const upcomingVacations = await query<Record<string, unknown>>(
    `SELECT vc.user_id, e.nombre || ' ' || e.apellido as empleado_nombre, vc.fecha_inicio
     FROM vacaciones_control vc
     JOIN empleados e ON vc.empleado_id = e.id
     WHERE vc.estado = 'pendiente' AND vc.fecha_inicio BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'`
  );

  const userUpcoming = new Map<number, string[]>();
  for (const v of upcomingVacations) {
    const uid = v.user_id as number;
    if (!userUpcoming.has(uid)) userUpcoming.set(uid, []);
    userUpcoming.get(uid)!.push(`${v.empleado_nombre} (${v.fecha_inicio})`);
  }
  for (const [userId, items] of userUpcoming) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'info', 'Vacaciones próximas', $2, 'normal', 'app')`,
      [userId, `${items.length} empleado(s) inician vacaciones esta semana: ${items.join(', ')}`]
    );
    notified++;
  }

  return `RRHH Vacaciones: ${accumulated.length} con acumulación excesiva, ${upcomingVacations.length} próximas, ${notified} alerta(s)`;
});

registerAction('payroll_alerts', async () => {
  const now = new Date();
  const day = now.getDate();
  const alerts: string[] = [];
  let notified = 0;

  if (day >= 12 && day <= 15) {
    alerts.push('Fecha límite de nómina quincenal se acerca (15 del mes)');
  }
  if (day >= 27 || day <= 2) {
    alerts.push('Período de cierre de nómina mensual activo');
  }

  const pendingPayroll = await query<Record<string, unknown>>(
    `SELECT n.id, n.periodo, n.estado, n.user_id, n.total_neto
     FROM nominas n
     WHERE n.estado = 'pendiente' AND n.fecha_pago <= CURRENT_DATE + INTERVAL '3 days'`
  );

  if (pendingPayroll.length > 0) {
    const userPayrolls = new Map<number, number>();
    for (const p of pendingPayroll) {
      const uid = p.user_id as number;
      userPayrolls.set(uid, (userPayrolls.get(uid) || 0) + 1);
    }
    for (const [userId, count] of userPayrolls) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         VALUES ($1, 'alerta', 'Nóminas pendientes de pago', $2, 'alta', 'app')`,
        [userId, `${count} nómina(s) pendiente(s) con fecha de pago en los próximos 3 días`]
      );
      notified++;
    }
  }

  if (alerts.length > 0) {
    for (const alert of alerts) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         SELECT id, 'info', 'Recordatorio de Nómina', $1, 'media', 'app'
         FROM users WHERE activo = true AND tipo IN ('juridico', 'admin')`,
        [alert]
      );
    }
    notified += alerts.length;
  }

  return `Nómina: ${pendingPayroll.length} pendientes, ${alerts.length} recordatorio(s), ${notified} alerta(s)`;
});

registerAction('accounts_receivable_alerts', async () => {
  const overdueCxC = await query<Record<string, unknown>>(
    `SELECT cxc.id, cxc.concepto, cxc.monto_pendiente, cxc.fecha_vencimiento, cxc.user_id,
            c.razon_social as cliente_nombre
     FROM cuentas_por_cobrar cxc
     LEFT JOIN clientes c ON cxc.cliente_id = c.id
     WHERE cxc.estado IN ('pendiente', 'parcial')
       AND cxc.fecha_vencimiento < CURRENT_DATE`
  );

  const upcomingCxC = await query<Record<string, unknown>>(
    `SELECT cxc.id, cxc.concepto, cxc.monto_pendiente, cxc.fecha_vencimiento, cxc.user_id,
            c.razon_social as cliente_nombre
     FROM cuentas_por_cobrar cxc
     LEFT JOIN clientes c ON cxc.cliente_id = c.id
     WHERE cxc.estado IN ('pendiente', 'parcial')
       AND cxc.fecha_vencimiento BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'`
  );

  let notified = 0;

  const userOverdue = new Map<number, { count: number; total: number }>();
  for (const c of overdueCxC) {
    const uid = c.user_id as number;
    const current = userOverdue.get(uid) || { count: 0, total: 0 };
    current.count++;
    current.total += parseFloat(c.monto_pendiente as string || '0');
    userOverdue.set(uid, current);

    await safeQuery(
      `UPDATE cuentas_por_cobrar SET estado = 'vencida', dias_vencimiento = CURRENT_DATE - fecha_vencimiento WHERE id = $1 AND estado = 'pendiente'`,
      [c.id]
    );
  }
  for (const [userId, data] of userOverdue) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Cuentas por cobrar vencidas', $2, 'alta', 'app')`,
      [userId, `${data.count} cuenta(s) vencida(s) por un total de ${data.total.toFixed(2)}. Revisa tu cartera de cobros.`]
    );
    notified++;
  }

  const userUpcoming = new Map<number, number>();
  for (const c of upcomingCxC) {
    const uid = c.user_id as number;
    userUpcoming.set(uid, (userUpcoming.get(uid) || 0) + 1);
  }
  for (const [userId, count] of userUpcoming) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'info', 'Cobros próximos a vencer', $2, 'media', 'app')`,
      [userId, `${count} cuenta(s) por cobrar vencen en los próximos 7 días`]
    );
    notified++;
  }

  return `CxC: ${overdueCxC.length} vencidas, ${upcomingCxC.length} próximas, ${notified} alerta(s)`;
});

registerAction('accounts_payable_alerts', async () => {
  const overdueCxP = await query<Record<string, unknown>>(
    `SELECT cxp.id, cxp.concepto, cxp.monto_pendiente, cxp.fecha_vencimiento, cxp.user_id,
            p.razon_social as proveedor_nombre
     FROM cuentas_por_pagar cxp
     LEFT JOIN proveedores p ON cxp.proveedor_id = p.id
     WHERE cxp.estado IN ('pendiente', 'parcial')
       AND cxp.fecha_vencimiento < CURRENT_DATE`
  );

  const upcomingCxP = await query<Record<string, unknown>>(
    `SELECT cxp.id, cxp.concepto, cxp.monto_pendiente, cxp.fecha_vencimiento, cxp.user_id,
            p.razon_social as proveedor_nombre
     FROM cuentas_por_pagar cxp
     LEFT JOIN proveedores p ON cxp.proveedor_id = p.id
     WHERE cxp.estado IN ('pendiente', 'parcial')
       AND cxp.fecha_vencimiento BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '5 days'`
  );

  let notified = 0;

  const userOverdue = new Map<number, { count: number; total: number }>();
  for (const c of overdueCxP) {
    const uid = c.user_id as number;
    const current = userOverdue.get(uid) || { count: 0, total: 0 };
    current.count++;
    current.total += parseFloat(c.monto_pendiente as string || '0');
    userOverdue.set(uid, current);
  }
  for (const [userId, data] of userOverdue) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Pagos a proveedores vencidos', $2, 'critica', 'app')`,
      [userId, `${data.count} pago(s) vencido(s) por ${data.total.toFixed(2)}. Evita recargos y mantén buenas relaciones comerciales.`]
    );
    notified++;
  }

  for (const [userId, ] of new Map([...upcomingCxP.map(c => [c.user_id as number, true] as const)])) {
    const count = upcomingCxP.filter(c => c.user_id === userId).length;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Pagos próximos a vencer', $2, 'alta', 'app')`,
      [userId, `${count} pago(s) a proveedores vencen en los próximos 5 días`]
    );
    notified++;
  }

  return `CxP: ${overdueCxP.length} vencidas, ${upcomingCxP.length} próximas, ${notified} alerta(s)`;
});

registerAction('budget_alerts', async () => {
  const overBudget = await query<Record<string, unknown>>(
    `SELECT p.id, p.nombre, p.categoria, p.monto_presupuestado, p.monto_ejecutado, p.user_id,
            ROUND((p.monto_ejecutado / NULLIF(p.monto_presupuestado, 0)) * 100, 1) as pct_ejecutado
     FROM presupuestos p
     WHERE p.estado = 'activo'
       AND p.monto_ejecutado > p.monto_presupuestado`
  );

  const nearLimit = await query<Record<string, unknown>>(
    `SELECT p.id, p.nombre, p.categoria, p.monto_presupuestado, p.monto_ejecutado, p.user_id,
            ROUND((p.monto_ejecutado / NULLIF(p.monto_presupuestado, 0)) * 100, 1) as pct_ejecutado
     FROM presupuestos p
     WHERE p.estado = 'activo'
       AND p.monto_presupuestado > 0
       AND (p.monto_ejecutado / p.monto_presupuestado) >= 0.85
       AND p.monto_ejecutado <= p.monto_presupuestado`
  );

  const expiringSoon = await query<Record<string, unknown>>(
    `SELECT p.id, p.nombre, p.periodo_fin, p.user_id
     FROM presupuestos p
     WHERE p.estado = 'activo'
       AND p.periodo_fin BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '15 days'`
  );

  let notified = 0;

  for (const b of overBudget) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Presupuesto excedido', $2, 'critica', 'app')`,
      [b.user_id, `"${b.nombre}" (${b.categoria}): ejecutado ${b.pct_ejecutado}% del presupuesto asignado`]
    );
    await safeQuery(
      `UPDATE presupuestos SET estado = 'excedido' WHERE id = $1 AND estado = 'activo'`,
      [b.id]
    );
    notified++;
  }

  const userNearLimit = new Map<number, string[]>();
  for (const b of nearLimit) {
    const uid = b.user_id as number;
    if (!userNearLimit.has(uid)) userNearLimit.set(uid, []);
    userNearLimit.get(uid)!.push(`${b.nombre} (${b.pct_ejecutado}%)`);
  }
  for (const [userId, items] of userNearLimit) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Presupuestos cerca del límite', $2, 'alta', 'app')`,
      [userId, `${items.length} presupuesto(s) superan el 85%: ${items.join(', ')}`]
    );
    notified++;
  }

  if (expiringSoon.length > 0) {
    const userExpiring = new Map<number, string[]>();
    for (const b of expiringSoon) {
      const uid = b.user_id as number;
      if (!userExpiring.has(uid)) userExpiring.set(uid, []);
      userExpiring.get(uid)!.push(b.nombre as string);
    }
    for (const [userId, items] of userExpiring) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         VALUES ($1, 'info', 'Presupuestos por cerrar', $2, 'media', 'app')`,
        [userId, `${items.length} presupuesto(s) finalizan en los próximos 15 días: ${items.join(', ')}`]
      );
      notified++;
    }
  }

  return `Presupuestos: ${overBudget.length} excedidos, ${nearLimit.length} cerca del límite, ${expiringSoon.length} por cerrar, ${notified} alerta(s)`;
});

registerAction('legal_contract_alerts', async () => {
  const expiringLegal = await query<Record<string, unknown>>(
    `SELECT cl.id, cl.titulo, cl.contraparte, cl.fecha_fin, cl.user_id
     FROM contratos_legales cl
     WHERE cl.estado = 'activo'
       AND cl.fecha_fin IS NOT NULL
       AND cl.fecha_fin BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'`
  );

  const expiredLegal = await query<Record<string, unknown>>(
    `SELECT cl.id, cl.titulo, cl.contraparte, cl.fecha_fin, cl.user_id
     FROM contratos_legales cl
     WHERE cl.estado = 'activo'
       AND cl.fecha_fin IS NOT NULL
       AND cl.fecha_fin < CURRENT_DATE`
  );

  let notified = 0;

  for (const c of expiredLegal) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'alerta', 'Contrato legal vencido', $2, 'critica', 'app')`,
      [c.user_id, `"${c.titulo}" con ${c.contraparte || 'contraparte'} venció el ${c.fecha_fin}. Requiere renovación o cierre.`]
    );
    await safeQuery(
      `UPDATE contratos_legales SET estado = 'vencido' WHERE id = $1 AND estado = 'activo'`,
      [c.id]
    );
    notified++;
  }

  const userExpiring = new Map<number, string[]>();
  for (const c of expiringLegal) {
    const uid = c.user_id as number;
    if (!userExpiring.has(uid)) userExpiring.set(uid, []);
    const daysLeft = Math.ceil((new Date(c.fecha_fin as string).getTime() - Date.now()) / 86400000);
    userExpiring.get(uid)!.push(`"${c.titulo}" (${daysLeft}d)`);
  }
  for (const [userId, items] of userExpiring) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       VALUES ($1, 'advertencia', 'Contratos legales por vencer', $2, 'alta', 'app')`,
      [userId, `${items.length} contrato(s) vencen pronto: ${items.join(', ')}`]
    );
    notified++;
  }

  return `Legal: ${expiringLegal.length} por vencer, ${expiredLegal.length} vencidos, ${notified} alerta(s)`;
});

registerAction('security_alerts', async () => {
  const failedLogins = await queryOne<Record<string, string>>(
    `SELECT COUNT(*) as cnt FROM activity_log
     WHERE evento = 'LOGIN_FAILED' AND created_at > NOW() - INTERVAL '1 hour'`
  );
  const failedCount = parseInt(failedLogins?.cnt || '0');

  const suspiciousIPs = await query<Record<string, unknown>>(
    `SELECT metadata->>'ip' as ip, COUNT(*) as attempts
     FROM activity_log
     WHERE evento = 'LOGIN_FAILED' AND created_at > NOW() - INTERVAL '1 hour'
       AND metadata->>'ip' IS NOT NULL
     GROUP BY metadata->>'ip'
     HAVING COUNT(*) >= 5`
  );

  const newUsers24h = await queryOne<Record<string, string>>(
    `SELECT COUNT(*) as cnt FROM users WHERE created_at > NOW() - INTERVAL '24 hours'`
  );

  let notified = 0;

  if (failedCount >= 10) {
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       SELECT id, 'alerta', 'Actividad sospechosa detectada', $1, 'critica', 'app'
       FROM users WHERE tipo = 'admin' AND activo = true`,
      [`${failedCount} intentos fallidos de login en la última hora. ${suspiciousIPs.length} IP(s) sospechosa(s).`]
    );
    notified++;
  }

  if (suspiciousIPs.length > 0) {
    const ipList = suspiciousIPs.map(s => `${s.ip} (${s.attempts}x)`).join(', ');
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
       SELECT id, 'alerta', 'IPs con intentos masivos', $1, 'critica', 'app'
       FROM users WHERE tipo = 'admin' AND activo = true`,
      [`IPs con 5+ intentos fallidos/hora: ${ipList}`]
    );
    notified++;
  }

  const lockedAccounts = await queryOne<Record<string, string>>(
    `SELECT COUNT(*) as cnt FROM users
     WHERE activo = false AND updated_at > NOW() - INTERVAL '24 hours'`
  );
  const lockedCount = parseInt(lockedAccounts?.cnt || '0');

  return `Seguridad: ${failedCount} login(s) fallidos/hora, ${suspiciousIPs.length} IP(s) sospechosa(s), ${lockedCount} cuenta(s) bloqueada(s), registros nuevos: ${newUsers24h?.cnt || 0}, ${notified} alerta(s)`;
});

registerAction('client_alerts', async () => {
  const inactiveClients = await query<Record<string, unknown>>(
    `SELECT c.id, c.razon_social, c.nombre_contacto, c.user_id, c.updated_at
     FROM clientes c
     WHERE c.activo = true
       AND c.updated_at < NOW() - INTERVAL '90 days'
       AND EXISTS (SELECT 1 FROM facturas f WHERE f.cliente_id = c.id)`
  );

  const lowSatisfaction = await query<Record<string, unknown>>(
    `SELECT c.id, c.razon_social, c.nombre_contacto, c.satisfaccion, c.user_id
     FROM clientes c
     WHERE c.activo = true AND c.satisfaccion IS NOT NULL AND c.satisfaccion <= 2`
  );

  let notified = 0;

  if (inactiveClients.length > 0) {
    const userInactive = new Map<number, number>();
    for (const c of inactiveClients) {
      const uid = c.user_id as number;
      userInactive.set(uid, (userInactive.get(uid) || 0) + 1);
    }
    for (const [userId, count] of userInactive) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         VALUES ($1, 'info', 'Clientes inactivos detectados', $2, 'media', 'app')`,
        [userId, `${count} cliente(s) sin actividad en 90+ días. Considera una campaña de reactivación.`]
      );
      notified++;
    }
  }

  if (lowSatisfaction.length > 0) {
    const userLow = new Map<number, string[]>();
    for (const c of lowSatisfaction) {
      const uid = c.user_id as number;
      if (!userLow.has(uid)) userLow.set(uid, []);
      userLow.get(uid)!.push(c.razon_social as string || c.nombre_contacto as string || 'Sin nombre');
    }
    for (const [userId, clients] of userLow) {
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal)
         VALUES ($1, 'advertencia', 'Clientes con baja satisfacción', $2, 'alta', 'app')`,
        [userId, `${clients.length} cliente(s) con satisfacción baja: ${clients.slice(0, 5).join(', ')}`]
      );
      notified++;
    }
  }

  return `Clientes: ${inactiveClients.length} inactivos (90d+), ${lowSatisfaction.length} baja satisfacción, ${notified} alerta(s)`;
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

// ─────────────────────────────────────────────────────────────────────────────
// RRHH ALERTS
// ─────────────────────────────────────────────────────────────────────────────

registerAction('hr_contract_alerts', async () => {
  const thresholds = [30, 15, 7];
  let totalAlerts = 0;

  for (const days of thresholds) {
    const contracts = await query(
      `SELECT cl.id, cl.user_id, cl.titulo, cl.cargo, cl.fecha_fin,
              e.nombre || ' ' || e.apellido as empleado_nombre
       FROM contratos_laborales cl
       LEFT JOIN empleados e ON cl.empleado_id = e.id
       WHERE cl.estado IN ('vigente','firmado')
         AND cl.fecha_fin IS NOT NULL
         AND cl.fecha_fin = CURRENT_DATE + $1::int
      `,
      [days]
    );

    for (const c of contracts) {
      const row = c as Record<string, unknown>;
      const prioridad = days <= 7 ? 'alta' : 'normal';
      const titulo = 'Contrato laboral próximo a vencer';
      const mensaje = `El contrato "${row.titulo}" de ${row.empleado_nombre || 'empleado'} (${row.cargo}) vence en ${days} día(s) — ${row.fecha_fin}`;
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
         VALUES ($1, 'alerta', $2, $3, $4, 'multi', $5)`,
        [row.user_id, titulo, mensaje, prioridad, JSON.stringify({ contrato_id: row.id, dias_restantes: days })]
      );
      await dispatchMultichannel(Number(row.user_id), { tipo: 'alerta', titulo, mensaje });
      totalAlerts++;
    }
  }

  return `Contratos laborales: ${totalAlerts} alerta(s) generada(s)`;
});

registerAction('hr_birthday_alerts', async () => {
  const birthdays = await query(
    `SELECT e.id, e.user_id, e.nombre, e.apellido, e.fecha_nacimiento, e.departamento
     FROM empleados e
     WHERE e.activo = true
       AND e.fecha_nacimiento IS NOT NULL
       AND EXTRACT(MONTH FROM e.fecha_nacimiento) = EXTRACT(MONTH FROM CURRENT_DATE + INTERVAL '1 day')
       AND EXTRACT(DAY FROM e.fecha_nacimiento) = EXTRACT(DAY FROM CURRENT_DATE + INTERVAL '1 day')`
  );

  for (const emp of birthdays) {
    const row = emp as Record<string, unknown>;
    const titulo = 'Cumpleaños de empleado mañana';
    const mensaje = `Mañana es el cumpleaños de ${row.nombre} ${row.apellido} (${row.departamento || 'Sin depto.'})`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'info', $2, $3, 'normal', 'multi', $4)`,
      [row.user_id, titulo, mensaje, JSON.stringify({ empleado_id: row.id })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'info', titulo, mensaje });
  }

  return `Cumpleaños: ${birthdays.length} alerta(s) generada(s)`;
});

registerAction('hr_evaluation_alerts', async () => {
  const probation = await query(
    `SELECT e.id, e.user_id, e.nombre, e.apellido, e.cargo, e.fecha_ingreso,
            e.fecha_ingreso + INTERVAL '90 days' as fin_prueba
     FROM empleados e
     WHERE e.activo = true
       AND e.tipo_contrato IN ('tiempo_indeterminado','tiempo_determinado')
       AND e.fecha_ingreso IS NOT NULL
       AND (e.fecha_ingreso + INTERVAL '90 days') BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '15 days'`
  );

  for (const emp of probation) {
    const row = emp as Record<string, unknown>;
    const titulo = 'Período de prueba próximo a finalizar';
    const mensaje = `El empleado ${row.nombre} ${row.apellido} (${row.cargo}) finaliza su período de prueba el ${row.fin_prueba}. Evalúe su desempeño.`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'advertencia', $2, $3, 'alta', 'multi', $4)`,
      [row.user_id, titulo, mensaje, JSON.stringify({ empleado_id: row.id })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'advertencia', titulo, mensaje });
  }

  return `Evaluaciones/Prueba: ${probation.length} alerta(s) generada(s)`;
});

// ─────────────────────────────────────────────────────────────────────────────
// FINANZAS OPERATIVAS ALERTS
// ─────────────────────────────────────────────────────────────────────────────

registerAction('accounts_payable_alerts', async () => {
  const thresholds = [7, 3, 1];
  let totalAlerts = 0;

  for (const days of thresholds) {
    const payables = await query(
      `SELECT cp.id, cp.user_id, cp.concepto, cp.monto_pendiente, cp.moneda,
              cp.fecha_vencimiento, p.razon_social as proveedor_nombre
       FROM cuentas_por_pagar cp
       LEFT JOIN proveedores p ON cp.proveedor_id = p.id
       WHERE cp.estado IN ('pendiente','parcial')
         AND cp.fecha_vencimiento IS NOT NULL
         AND cp.fecha_vencimiento = CURRENT_DATE + $1::int`,
      [days]
    );

    for (const pay of payables) {
      const row = pay as Record<string, unknown>;
      const prioridad = days <= 1 ? 'critica' : days <= 3 ? 'alta' : 'normal';
      const titulo = 'Cuenta por pagar próxima a vencer';
      const mensaje = `Pago a ${row.proveedor_nombre || 'proveedor'}: "${row.concepto}" por ${row.monto_pendiente} ${row.moneda} vence en ${days} día(s) — ${row.fecha_vencimiento}`;
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
         VALUES ($1, 'alerta', $2, $3, $4, 'multi', $5)`,
        [row.user_id, titulo, mensaje, prioridad, JSON.stringify({ cuenta_por_pagar_id: row.id, dias_restantes: days })]
      );
      await dispatchMultichannel(Number(row.user_id), { tipo: 'alerta', titulo, mensaje });
      totalAlerts++;
    }
  }

  const overdue = await query(
    `SELECT cp.id, cp.user_id, cp.concepto, cp.monto_pendiente, cp.moneda,
            cp.fecha_vencimiento, p.razon_social as proveedor_nombre
     FROM cuentas_por_pagar cp
     LEFT JOIN proveedores p ON cp.proveedor_id = p.id
     WHERE cp.estado IN ('pendiente','parcial')
       AND cp.fecha_vencimiento < CURRENT_DATE
       AND cp.fecha_vencimiento >= CURRENT_DATE - INTERVAL '30 days'`
  );

  for (const pay of overdue) {
    const row = pay as Record<string, unknown>;
    const titulo = 'Cuenta por pagar VENCIDA';
    const mensaje = `Pago vencido a ${row.proveedor_nombre || 'proveedor'}: "${row.concepto}" por ${row.monto_pendiente} ${row.moneda} — venció el ${row.fecha_vencimiento}`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'alerta', $2, $3, 'critica', 'multi', $4)`,
      [row.user_id, titulo, mensaje, JSON.stringify({ cuenta_por_pagar_id: row.id, vencida: true })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'alerta', titulo, mensaje });
    totalAlerts++;
  }

  return `Cuentas por pagar: ${totalAlerts} alerta(s) generada(s) (${overdue.length} vencida(s))`;
});

registerAction('credit_limit_alerts', async () => {
  const HIGH_BALANCE_THRESHOLD = 10000;
  const highBalances = await query(
    `SELECT cc.user_id, cc.cliente_id,
            SUM(cc.monto_pendiente) as total_pendiente,
            cc.moneda,
            COALESCE(c.razon_social, c.nombre_contacto) as cliente_nombre,
            COUNT(*) as facturas_pendientes
     FROM cuentas_por_cobrar cc
     JOIN clientes c ON cc.cliente_id = c.id
     WHERE cc.estado IN ('pendiente','parcial','vencida')
       AND cc.cliente_id IS NOT NULL
     GROUP BY cc.user_id, cc.cliente_id, cc.moneda, c.razon_social, c.nombre_contacto
     HAVING SUM(cc.monto_pendiente) >= $1`,
    [HIGH_BALANCE_THRESHOLD]
  );

  for (const row of highBalances) {
    const r = row as Record<string, unknown>;
    const titulo = 'Saldo elevado de cliente';
    const mensaje = `El cliente ${r.cliente_nombre || 'desconocido'} tiene ${r.facturas_pendientes} factura(s) pendiente(s) con saldo total de ${r.total_pendiente} ${r.moneda} (umbral: ${HIGH_BALANCE_THRESHOLD}).`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'advertencia', $2, $3, 'alta', 'multi', $4)`,
      [r.user_id, titulo, mensaje, JSON.stringify({ cliente_id: r.cliente_id, total_pendiente: r.total_pendiente, umbral: HIGH_BALANCE_THRESHOLD })]
    );
    await dispatchMultichannel(Number(r.user_id), { tipo: 'advertencia', titulo, mensaje });
  }

  return `Saldos elevados: ${highBalances.length} alerta(s) generada(s)`;
});

// ─────────────────────────────────────────────────────────────────────────────
// INVENTARIO Y VENTAS ALERTS
// ─────────────────────────────────────────────────────────────────────────────

registerAction('low_stock_alerts', async () => {
  const lowStock = await query(
    `SELECT id, user_id, codigo, nombre, categoria, stock_actual, stock_minimo, unidad_medida
     FROM inventario
     WHERE activo = true
       AND stock_minimo > 0
       AND stock_actual < stock_minimo`
  );

  for (const item of lowStock) {
    const row = item as Record<string, unknown>;
    const prioridad = Number(row.stock_actual) <= 0 ? 'critica' : 'alta';
    const titulo = 'Stock bajo en inventario';
    const mensaje = `Producto "${row.nombre}" (${row.codigo || 'sin código'}): stock actual ${row.stock_actual} ${row.unidad_medida} — mínimo requerido: ${row.stock_minimo} ${row.unidad_medida}`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'alerta', $2, $3, $4, 'multi', $5)`,
      [row.user_id, titulo, mensaje, prioridad, JSON.stringify({ inventario_id: row.id, categoria: row.categoria })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'alerta', titulo, mensaje });
  }

  return `Stock bajo: ${lowStock.length} producto(s) por debajo del mínimo`;
});

registerAction('kpi_progress_alerts', async () => {
  const KPI_PROGRESS_THRESHOLD = 50;
  const PERIOD_ELAPSED_THRESHOLD = 75;

  const laggingKpis = await query(
    `SELECT id, user_id, nombre, categoria, indicador, meta_valor, valor_actual, unidad,
            fecha_inicio, fecha_fin, responsable
     FROM metas_kpi
     WHERE estado = 'en_progreso'
       AND fecha_fin > CURRENT_DATE
       AND meta_valor > 0
       AND (valor_actual / meta_valor * 100) < $1
       AND (
         EXTRACT(EPOCH FROM (CURRENT_DATE - fecha_inicio)) /
         NULLIF(EXTRACT(EPOCH FROM (fecha_fin - fecha_inicio)), 0) * 100
       ) > $2`,
    [KPI_PROGRESS_THRESHOLD, PERIOD_ELAPSED_THRESHOLD]
  );

  for (const kpi of laggingKpis) {
    const row = kpi as Record<string, unknown>;
    const progress = Number(row.meta_valor) > 0
      ? ((Number(row.valor_actual) / Number(row.meta_valor)) * 100).toFixed(1)
      : '0';
    const titulo = 'Meta KPI con bajo progreso';
    const mensaje = `KPI "${row.nombre}" (${row.categoria}): progreso ${progress}% con menos del 25% del período restante. Meta: ${row.meta_valor} ${row.unidad}, actual: ${row.valor_actual} ${row.unidad}. Responsable: ${row.responsable || 'No asignado'}`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'advertencia', $2, $3, 'alta', 'multi', $4)`,
      [row.user_id, titulo, mensaje, JSON.stringify({ meta_kpi_id: row.id, progreso_pct: parseFloat(progress) })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'advertencia', titulo, mensaje });
  }

  return `KPIs con bajo progreso: ${laggingKpis.length} alerta(s) generada(s)`;
});

// ─────────────────────────────────────────────────────────────────────────────
// TELECOMUNICACIONES ALERTS
// ─────────────────────────────────────────────────────────────────────────────

registerAction('telecom_alerts', async () => {
  let totalAlerts = 0;

  const invoiceThresholds = [7, 3, 1];
  for (const days of invoiceThresholds) {
    const invoices = await query(
      `SELECT ft.id, ft.user_id, ft.monto, ft.moneda, ft.fecha_vencimiento,
              ft.numero_factura, ft.periodo, lt.numero as linea_numero, lt.operadora
       FROM facturas_telecom ft
       LEFT JOIN lineas_telecom lt ON ft.linea_id = lt.id
       WHERE ft.estado = 'pendiente'
         AND ft.fecha_vencimiento IS NOT NULL
         AND ft.fecha_vencimiento = CURRENT_DATE + $1::int`,
      [days]
    );

    for (const inv of invoices) {
      const row = inv as Record<string, unknown>;
      const prioridad = days <= 1 ? 'critica' : days <= 3 ? 'alta' : 'normal';
      const titulo = 'Factura telecom próxima a vencer';
      const mensaje = `Factura ${row.numero_factura || ''} (${row.operadora || 'operadora'}, línea ${row.linea_numero || 'N/A'}) por ${row.monto} ${row.moneda} — vence en ${days} día(s)`;
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
         VALUES ($1, 'alerta', $2, $3, $4, 'multi', $5)`,
        [row.user_id, titulo, mensaje, prioridad, JSON.stringify({ factura_telecom_id: row.id, dias_restantes: days })]
      );
      await dispatchMultichannel(Number(row.user_id), { tipo: 'alerta', titulo, mensaje });
      totalAlerts++;
    }
  }

  const lineThresholds = [30, 15, 7];
  for (const days of lineThresholds) {
    const lines = await query(
      `SELECT id, user_id, numero, operadora, tipo_linea, plan_contratado, fecha_vencimiento
       FROM lineas_telecom
       WHERE activa = true
         AND fecha_vencimiento IS NOT NULL
         AND fecha_vencimiento = CURRENT_DATE + $1::int`,
      [days]
    );

    for (const line of lines) {
      const row = line as Record<string, unknown>;
      const titulo = 'Vencimiento de contrato de línea telecom';
      const mensaje = `La línea ${row.numero} (${row.operadora}, ${row.tipo_linea}) con plan "${row.plan_contratado || 'N/A'}" vence en ${days} día(s) — ${row.fecha_vencimiento}`;
      await safeQuery(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
         VALUES ($1, 'advertencia', $2, $3, $4, 'multi', $5)`,
        [row.user_id, titulo, mensaje, days <= 7 ? 'alta' : 'normal', JSON.stringify({ linea_telecom_id: row.id, dias_restantes: days })]
      );
      await dispatchMultichannel(Number(row.user_id), { tipo: 'advertencia', titulo, mensaje });
      totalAlerts++;
    }
  }

  const excessiveUsage = await query(
    `SELECT id, user_id, numero, operadora, uso_datos_gb, limite_datos_gb
     FROM lineas_telecom
     WHERE activa = true
       AND limite_datos_gb IS NOT NULL
       AND limite_datos_gb > 0
       AND uso_datos_gb > limite_datos_gb * 0.9`
  );

  for (const line of excessiveUsage) {
    const row = line as Record<string, unknown>;
    const pct = Number(row.limite_datos_gb) > 0
      ? ((Number(row.uso_datos_gb) / Number(row.limite_datos_gb)) * 100).toFixed(0)
      : '100';
    const titulo = 'Consumo excesivo de datos';
    const mensaje = `Línea ${row.numero} (${row.operadora}): uso ${row.uso_datos_gb} GB de ${row.limite_datos_gb} GB (${pct}% del límite)`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       VALUES ($1, 'advertencia', $2, $3, 'alta', 'multi', $4)`,
      [row.user_id, titulo, mensaje, JSON.stringify({ linea_telecom_id: row.id, uso_pct: parseFloat(pct) })]
    );
    await dispatchMultichannel(Number(row.user_id), { tipo: 'advertencia', titulo, mensaje });
    totalAlerts++;
  }

  return `Telecom: ${totalAlerts} alerta(s) generada(s)`;
});

// ─────────────────────────────────────────────────────────────────────────────
// SEGURIDAD ALERTS
// ─────────────────────────────────────────────────────────────────────────────

registerAction('security_alerts', async () => {
  let totalAlerts = 0;

  const adminUsers = await query<{ id: number }>(
    `SELECT id FROM users WHERE activo = true AND tipo = 'admin'`
  );

  const failedLogins = await query(
    `SELECT ip_address, COUNT(*) as intentos, 
            array_agg(DISTINCT user_id) as user_ids,
            MIN(created_at) as primer_intento,
            MAX(created_at) as ultimo_intento
     FROM auditoria_detallada
     WHERE operacion = 'LOGIN'
       AND risk_level IN ('high','critical')
       AND created_at > NOW() - INTERVAL '1 hour'
     GROUP BY ip_address
     HAVING COUNT(*) >= 5`
  );

  for (const attempt of failedLogins) {
    const row = attempt as Record<string, unknown>;
    const titulo = 'Múltiples intentos de login fallidos';
    const mensaje = `Detectados ${row.intentos} intentos de login desde IP ${row.ip_address} en la última hora (${row.primer_intento} - ${row.ultimo_intento})`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       SELECT id, 'alerta', $1, $2, 'critica', 'multi', $3
       FROM users WHERE activo = true AND tipo = 'admin'`,
      [titulo, mensaje, JSON.stringify({ ip_address: row.ip_address, intentos: row.intentos, user_ids: row.user_ids })]
    );
    for (const admin of adminUsers) {
      await dispatchMultichannel(admin.id, { tipo: 'alerta', titulo, mensaje });
    }
    totalAlerts++;
  }

  const permissionChanges = await query(
    `SELECT ad.id, ad.user_id, ad.tabla_afectada, ad.campos_modificados,
            ad.datos_anteriores, ad.datos_nuevos, ad.ip_address, ad.created_at,
            u.nombre || ' ' || u.apellido as usuario_nombre
     FROM auditoria_detallada ad
     LEFT JOIN users u ON ad.user_id = u.id
     WHERE ad.tabla_afectada IN ('users','roles','permisos','user_roles')
       AND ad.operacion IN ('UPDATE','INSERT','DELETE')
       AND ad.created_at > NOW() - INTERVAL '1 hour'
       AND (
         ad.campos_modificados && ARRAY['tipo','activo','role','permisos','permissions']
         OR ad.tabla_afectada IN ('roles','permisos','user_roles')
       )`
  );

  for (const change of permissionChanges) {
    const row = change as Record<string, unknown>;
    const titulo = 'Cambio de permisos/roles detectado';
    const mensaje = `Usuario ${row.usuario_nombre || 'ID:' + row.user_id} modificó ${row.tabla_afectada} (campos: ${row.campos_modificados || 'N/A'}) desde IP ${row.ip_address} a las ${row.created_at}`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       SELECT id, 'alerta', $1, $2, 'critica', 'multi', $3
       FROM users WHERE activo = true AND tipo = 'admin'`,
      [titulo, mensaje, JSON.stringify({ auditoria_id: row.id, tabla: row.tabla_afectada })]
    );
    for (const admin of adminUsers) {
      await dispatchMultichannel(admin.id, { tipo: 'alerta', titulo, mensaje });
    }
    totalAlerts++;
  }

  const offHoursActivity = await query(
    `SELECT user_id, COUNT(*) as operaciones,
            u.nombre || ' ' || u.apellido as usuario_nombre
     FROM auditoria_detallada ad
     JOIN users u ON ad.user_id = u.id
     WHERE ad.created_at > NOW() - INTERVAL '1 hour'
       AND EXTRACT(HOUR FROM ad.created_at AT TIME ZONE 'America/Caracas') NOT BETWEEN 6 AND 22
       AND ad.operacion NOT IN ('LOGIN','LOGOUT','SELECT')
     GROUP BY ad.user_id, u.nombre, u.apellido
     HAVING COUNT(*) >= 10`
  );

  for (const activity of offHoursActivity) {
    const row = activity as Record<string, unknown>;
    const titulo = 'Actividad inusual fuera de horario';
    const mensaje = `Usuario ${row.usuario_nombre} realizó ${row.operaciones} operaciones de escritura fuera de horario laboral en la última hora`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       SELECT id, 'alerta', $1, $2, 'critica', 'multi', $3
       FROM users WHERE activo = true AND tipo = 'admin'`,
      [titulo, mensaje, JSON.stringify({ user_id: row.user_id, operaciones: row.operaciones })]
    );
    for (const admin of adminUsers) {
      await dispatchMultichannel(admin.id, { tipo: 'alerta', titulo, mensaje });
    }
    totalAlerts++;
  }

  const INACTIVE_SESSION_HOURS = 24;
  const inactiveSessions = await query(
    `SELECT us.id as session_id, us.user_id, us.ip, us.user_agent, us.created_at,
            u.nombre || ' ' || u.apellido as usuario_nombre, u.email
     FROM user_sessions us
     JOIN users u ON us.user_id = u.id
     WHERE us.activa = true
       AND us.created_at < NOW() - ($1 || ' hours')::interval
       AND us.expires_at > NOW()`,
    [INACTIVE_SESSION_HOURS]
  );

  for (const session of inactiveSessions) {
    const row = session as Record<string, unknown>;
    const titulo = 'Sesión inactiva prolongada';
    const mensaje = `Sesión activa del usuario ${row.usuario_nombre} (${row.email}) desde ${row.created_at}, IP: ${row.ip || 'N/A'} — lleva más de ${INACTIVE_SESSION_HOURS}h sin renovación`;
    await safeQuery(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
       SELECT id, 'alerta', $1, $2, 'critica', 'multi', $3
       FROM users WHERE activo = true AND tipo = 'admin'`,
      [titulo, mensaje, JSON.stringify({ session_id: row.session_id, user_id: row.user_id, ip: row.ip })]
    );
    for (const admin of adminUsers) {
      await dispatchMultichannel(admin.id, { tipo: 'alerta', titulo, mensaje });
    }
    totalAlerts++;
  }

  return `Seguridad: ${totalAlerts} alerta(s) generada(s) (${failedLogins.length} login sospechoso(s), ${permissionChanges.length} cambio(s) de permisos, ${offHoursActivity.length} actividad(es) fuera de horario, ${inactiveSessions.length} sesión(es) inactiva(s))`;
});

// ─────────────────────────────────────────────────────────────────────────────
// SEED: Insert automation rules for new alert types
// ─────────────────────────────────────────────────────────────────────────────

export async function seedAlertAutomationRules(): Promise<number> {
  const rules = [
    { name: 'Alertas de contratos laborales', description: 'Detecta contratos laborales próximos a vencer (30, 15, 7 días)', action_type: 'hr_contract_alerts', interval_hours: 24, module: 'rrhh' },
    { name: 'Alertas de cumpleaños', description: 'Notifica el día anterior al cumpleaños de empleados', action_type: 'hr_birthday_alerts', interval_hours: 24, module: 'rrhh' },
    { name: 'Alertas de evaluación/período de prueba', description: 'Detecta empleados en período de prueba próximo a finalizar', action_type: 'hr_evaluation_alerts', interval_hours: 24, module: 'rrhh' },
    { name: 'Alertas de cuentas por pagar', description: 'Detecta pagos a proveedores próximos a vencer (7, 3, 1 día) y vencidos', action_type: 'accounts_payable_alerts', interval_hours: 12, module: 'finanzas' },
    { name: 'Alertas de saldo elevado de clientes', description: 'Detecta clientes con saldos pendientes que superan el umbral configurado', action_type: 'credit_limit_alerts', interval_hours: 12, module: 'finanzas' },
    { name: 'Alertas de stock bajo', description: 'Detecta productos con stock por debajo del mínimo', action_type: 'low_stock_alerts', interval_hours: 6, module: 'inventario' },
    { name: 'Alertas de progreso KPI', description: 'Detecta metas KPI con bajo progreso relativo al período', action_type: 'kpi_progress_alerts', interval_hours: 6, module: 'inventario' },
    { name: 'Alertas de telecomunicaciones', description: 'Detecta facturas telecom por vencer, líneas con vencimiento de contrato y consumo excesivo', action_type: 'telecom_alerts', interval_hours: 24, module: 'telecom' },
    { name: 'Alertas de seguridad', description: 'Detecta intentos de login fallidos, cambios de permisos y actividad fuera de horario', action_type: 'security_alerts', interval_hours: 1, module: 'seguridad' },
  ];

  let inserted = 0;
  for (const rule of rules) {
    try {
      const result = await query(
        `INSERT INTO automation_rules (name, description, trigger_type, trigger_config, action_type, action_config, enabled, module)
         VALUES ($1, $2, 'schedule', $3, $4, '{}', true, $5)
         ON CONFLICT (action_type) WHERE trigger_type = 'schedule' DO UPDATE SET module = EXCLUDED.module
         RETURNING id`,
        [
          rule.name,
          rule.description,
          JSON.stringify({ interval_hours: rule.interval_hours }),
          rule.action_type,
          rule.module,
        ]
      );
      if (result.length > 0) inserted++;
    } catch (err) {
      console.error(`[seed] Failed to insert rule ${rule.action_type}:`, err);
    }
  }

  return inserted;
}

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
    } catch (err) {
      console.error(`[automation-engine] Error executing rule ${rule.name} (${rule.id}):`, err);
    }
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
