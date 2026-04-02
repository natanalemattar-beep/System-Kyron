export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeDatabase } = await import('@/lib/db-schema');
      await initializeDatabase();
    } catch (err) {
      console.error('[instrumentation] Database initialization failed — app will continue without DB:', err);
    }

    setTimeout(async () => {
      try {
        const baseUrl = `http://localhost:${process.env.PORT || 5000}`;
        const res = await fetch(`${baseUrl}/api/tasas-bcv/auto-fetch`, {
          headers: { 'x-internal-fetch': 'true' },
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        if (data.updated) {
          console.log(`[bcv-rate] Tasa del día cargada: ${data.tasa?.tasa_usd_ves} Bs/$ (${data.fuente})`);
        } else if (data.tasa) {
          console.log(`[bcv-rate] Tasa del día ya existe: ${data.tasa.tasa_usd_ves} Bs/$`);
        }
      } catch (err) {
        console.warn('[bcv-rate] No se pudo cargar tasa al inicio:', err);
      }

      try {
        const { runScheduledAutomations } = await import('@/lib/automation-engine');
        const logs = await runScheduledAutomations();
        const success = logs.filter(l => l.status === 'success').length;
        const failed = logs.filter(l => l.status === 'error').length;
        console.log(`[automation-engine] Ejecución inicial: ${success} éxito, ${failed} error de ${logs.length} regla(s)`);
      } catch (err) {
        console.warn('[automation-engine] Error en ejecución inicial:', err);
      }
    }, 15_000);

    const UNA_HORA = 60 * 60 * 1000;
    setInterval(async () => {
      try {
        const { runScheduledAutomations } = await import('@/lib/automation-engine');
        const logs = await runScheduledAutomations();
        if (logs.length > 0) {
          const success = logs.filter(l => l.status === 'success').length;
          console.log(`[automation-engine] Ciclo: ${success}/${logs.length} automatización(es) ejecutada(s)`);
        }
      } catch (err) {
        console.warn('[automation-engine] Error en ciclo periódico:', err);
      }
    }, UNA_HORA);

    setInterval(async () => {
      try {
        const baseUrl = `http://localhost:${process.env.PORT || 5000}`;
        const res = await fetch(`${baseUrl}/api/tasas-bcv/auto-fetch`, {
          headers: { 'x-internal-fetch': 'true' },
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        if (data.updated) {
          console.log(`[bcv-rate] Actualización periódica: ${data.tasa?.tasa_usd_ves} Bs/$ (${data.fuente})`);
        }
      } catch {}
    }, 4 * UNA_HORA);
  }
}
