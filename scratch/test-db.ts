import { healthCheck, getQueryMetrics } from '../src/lib/db';

async function testConnection() {
    console.log('--- Iniciando prueba de conexión a la Base de Datos ---');
    try {
        const status = await healthCheck();
        if (status.healthy) {
            console.log('✅ Conexión EXITOSA');
            console.log('Latencia:', status.latencyMs, 'ms');
            console.log('Estadísticas del Pool:', status.poolStats);
            console.log('Versión DB:', status.version);
            console.log('Uptime:', status.uptime);
        } else {
            console.error('❌ Conexión FALLIDA');
            console.error('Latencia:', status.latencyMs, 'ms');
        }
        
        const metrics = getQueryMetrics();
        console.log('Métricas de consultas:', metrics);
        
    } catch (err: any) {
        console.error('💥 Error crítico durante la prueba:', err.message);
    }
    console.log('--- Prueba finalizada ---');
    process.exit(0);
}

testConnection();
