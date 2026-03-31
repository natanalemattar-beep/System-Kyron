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
        const { runScheduledAutomations } = await import('@/lib/automation-engine');
        const logs = await runScheduledAutomations();
        const success = logs.filter(l => l.status === 'success').length;
        const failed = logs.filter(l => l.status === 'error').length;
        console.log(`[automation-engine] Ejecución inicial: ${success} éxito, ${failed} error de ${logs.length} regla(s)`);
      } catch (err) {
        console.warn('[automation-engine] Error en ejecución inicial:', err);
      }
    }, 30_000);

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
  }
}
