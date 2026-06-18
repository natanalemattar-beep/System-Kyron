export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeDatabase } = await import('@/lib/db-schema');
      await initializeDatabase();
    } catch (err) {
      console.error('[instrumentation] Database initialization failed — app will continue without DB:', err);
    }

    const getBaseUrl = () => process.env.NEXT_PUBLIC_APP_URL || `https://system-kyron.vercel.app`;

    setTimeout(async () => {
      try {
        const baseUrl = getBaseUrl();
        const res = await fetch(`${baseUrl}/api/tasas-bcv/auto-fetch`, {
          headers: { 'x-internal-fetch': 'true' },
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        if (data.updated) {
          console.info('[bcv-rate] Tasa del día cargada', { tasa: data.tasa?.tasa_usd_ves, fuente: data.fuente });
        } else if (data.tasa) {
          console.info('[bcv-rate] Tasa del día ya existe', { tasa: data.tasa.tasa_usd_ves });
        }
      } catch (err) {
        console.warn('[bcv-rate] No se pudo cargar tasa al inicio:', err);
      }

      try {
        const { runScheduledAutomations } = await import('@/lib/automation-engine');
        const logs = await runScheduledAutomations();
        const success = logs.filter(l => l.status === 'success').length;
        const failed = logs.filter(l => l.status === 'error').length;
        console.info('[automation-engine] Ejecución inicial', { success, failed, total: logs.length });
      } catch (err) {
        console.warn('[automation-engine] Error en ejecución inicial:', err);
      }

      try {
        const { initAutoAsientos } = await import('@/lib/auto-asientos');
        initAutoAsientos();
        console.info('[auto-asientos] Hooks de contabilidad automática registrados');
      } catch (err) {
        console.warn('[auto-asientos] Error al inicializar:', err);
      }
    }, 15_000);

    const UNA_HORA = 60 * 60 * 1000;
    setInterval(async () => {
      try {
        const { runScheduledAutomations } = await import('@/lib/automation-engine');
        const logs = await runScheduledAutomations();
        if (logs.length > 0) {
          const success = logs.filter(l => l.status === 'success').length;
          console.info('[automation-engine] Ciclo ejecutado', { success, total: logs.length });
        }
      } catch (err) {
        console.warn('[automation-engine] Error en ciclo periódico:', err);
      }
    }, UNA_HORA);

    setInterval(async () => {
      try {
        const baseUrl = getBaseUrl();
        const res = await fetch(`${baseUrl}/api/tasas-bcv/auto-fetch`, {
          headers: { 'x-internal-fetch': 'true' },
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        if (data.updated) {
          console.info('[bcv-rate] Actualización periódica', { tasa: data.tasa?.tasa_usd_ves, fuente: data.fuente });
        }
      } catch {}
    }, 4 * UNA_HORA);
  }
}
