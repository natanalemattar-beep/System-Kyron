export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeDatabase } = await import('@/lib/db-schema');
      await initializeDatabase();
    } catch (err) {
      console.error('[instrumentation] Database initialization failed — app will continue without DB:', err);
    }

    const CUATRO_HORAS = 4 * 60 * 60 * 1000;
    setTimeout(async () => {
      try {
        const { verificarAlertasPredictivas } = await import('@/lib/alertas-predictivas');
        await verificarAlertasPredictivas();
        console.log('[alertas-predictivas] Revisión inicial completada');
      } catch (err) {
        console.warn('[alertas-predictivas] Error en revisión inicial:', err);
      }
    }, 30_000);

    setInterval(async () => {
      try {
        const { verificarAlertasPredictivas } = await import('@/lib/alertas-predictivas');
        const alertas = await verificarAlertasPredictivas();
        if (alertas.length > 0) {
          console.log(`[alertas-predictivas] ${alertas.length} alerta(s) enviada(s)`);
        }
      } catch (err) {
        console.warn('[alertas-predictivas] Error en revisión periódica:', err);
      }
    }, CUATRO_HORAS);
  }
}
