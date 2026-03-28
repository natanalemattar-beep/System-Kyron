export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeDatabase } = await import('@/lib/db-schema');
      await initializeDatabase();
    } catch (err) {
      console.error('[instrumentation] Database initialization failed — app will continue without DB:', err);
    }
  }
}
