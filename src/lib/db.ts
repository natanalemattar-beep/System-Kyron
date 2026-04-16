import { Pool, PoolClient, QueryResult } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const globalForDb = globalThis as unknown as {
    pool: Pool | undefined;
    queryCache: Map<string, { data: any; expiry: number }>;
};

if (!globalForDb.queryCache) {
    globalForDb.queryCache = new Map();
}

let queryCount = 0;
let slowQueryCount = 0;

const SLOW_QUERY_THRESHOLD_MS = 300;

export function getPool(): Pool {
    if (!globalForDb.pool) {
        const isProduction = process.env.NODE_ENV === 'production';
        // Vercel inyecta POSTGRES_URL automáticamente con Supabase / Neon / etc.
        const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
        
        if (!connectionString) {
            console.warn('[db] AVISO: DATABASE_URL no está definida. La base de datos no funcionará.');
        }

        globalForDb.pool = new Pool({
            connectionString: connectionString || 'postgres://localhost:5432/postgres',
            // rejectUnauthorized: false permite conexiones SSL auto-firmadas en Supabase/Neon
            // sin necesidad de modificar la URL (que puede tener parámetros propios como ?supa=...)
            ssl: isProduction ? { rejectUnauthorized: false } : false,
            max: isProduction ? 30 : 12,
            min: isProduction ? 5 : 2,
            idleTimeoutMillis: 20000,
            connectionTimeoutMillis: 5000,
            statement_timeout: 25000,
            query_timeout: 25000,
            allowExitOnIdle: false,
            application_name: 'system-kyron',
        });
        globalForDb.pool.on('error', (err) => {
            console.error('[db] Error inesperado en cliente idle:', err.message);
        });
    }
    return globalForDb.pool;
}

export interface QueryOptions {
    useCache?: boolean;
    ttlMs?: number; // Tiempo de vida de la caché
    retries?: number; // Número de reintentos automáticos
}

export async function query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
    options?: QueryOptions
): Promise<T[]> {
    const start = Date.now();
    queryCount++;

    // Lógica ultrarrápida de Caché en memoria para evitar hacer la consulta repetida
    const cacheKey = options?.useCache ? `${text}::${JSON.stringify(params)}` : null;
    if (cacheKey) {
        const cached = globalForDb.queryCache.get(cacheKey);
        if (cached && cached.expiry > Date.now()) {
            return cached.data as T[];
        }
    }

    const retries = options?.retries ?? 2; // Por defecto intentamos 2 veces (Resiliencia en Vercel)
    let attempt = 0;

    while (attempt <= retries) {
        try {
            const result = await getPool().query(text, params);
            const duration = Date.now() - start;
            
            if (duration > SLOW_QUERY_THRESHOLD_MS) {
                slowQueryCount++;
                console.warn(`[db] Query lenta (${duration}ms): ${text.substring(0, 120)}...`);
            }

            if (cacheKey && result.rows) {
                // Guardamos en caché y limpiamos la caché si crece demasiado
                if (globalForDb.queryCache.size > 1000) globalForDb.queryCache.clear();
                globalForDb.queryCache.set(cacheKey, {
                    data: result.rows,
                    expiry: Date.now() + (options?.ttlMs ?? 10000) // 10 segundos por defecto
                });
            }

            return result.rows as T[];
        } catch (err: any) {
            attempt++;
            if (attempt > retries) {
                const duration = Date.now() - start;
                console.error(`[db] Error fatal en query tras ${retries} reintentos (${duration}ms):`, err.message);
                throw err;
            }
            // Pequeña pausa antes de reintentar por si se cayó la conexión momentáneamente
            await new Promise(r => setTimeout(r, 200 * attempt));
            console.warn(`[db] Reintentando query (${attempt}/${retries})...`);
        }
    }
    return [];
}

export async function queryOne<T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
): Promise<T | null> {
    const rows = await query<T>(text, params);
    return rows[0] ?? null;
}

export async function queryWithCount<T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
): Promise<{ rows: T[]; count: number }> {
    const result = await getPool().query(text, params);
    return { rows: result.rows as T[], count: result.rowCount ?? 0 };
}

export async function transaction<T>(
    fn: (client: PoolClient) => Promise<T>
): Promise<T> {
    const client = await getPool().connect();
    try {
        await client.query('BEGIN');
        const result = await fn(client);
        await client.query('COMMIT');
        return result;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

const SAFE_IDENTIFIER = /^[a-z_][a-z0-9_]*$/;

function validateIdentifier(name: string): string {
    if (!SAFE_IDENTIFIER.test(name)) {
        throw new Error(`Identificador SQL inválido: "${name}"`);
    }
    return name;
}

function validateIdentifiers(names: string[]): string[] {
    return names.map(validateIdentifier);
}

export async function batchInsert(
    table: string,
    columns: string[],
    rows: unknown[][],
): Promise<number> {
    if (rows.length === 0) return 0;
    validateIdentifier(table);
    const safeCols = validateIdentifiers(columns);
    const colStr = safeCols.join(', ');
    let paramIdx = 1;
    const allParams: unknown[] = [];
    const valueGroups: string[] = [];

    for (const row of rows) {
        const placeholders = row.map(() => `$${paramIdx++}`);
        valueGroups.push(`(${placeholders.join(', ')})`);
        allParams.push(...row);
    }

    const sql = `INSERT INTO ${table} (${colStr}) VALUES ${valueGroups.join(', ')} ON CONFLICT DO NOTHING`;
    const result = await getPool().query(sql, allParams);
    return result.rowCount ?? 0;
}

export async function upsert<T = Record<string, unknown>>(
    table: string,
    data: Record<string, unknown>,
    conflictColumns: string[],
    updateColumns?: string[],
): Promise<T | null> {
    validateIdentifier(table);
    const keys = validateIdentifiers(Object.keys(data));
    const safeConflict = validateIdentifiers(conflictColumns);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const conflictStr = safeConflict.join(', ');
    const updCols = validateIdentifiers(updateColumns ?? keys.filter(k => !safeConflict.includes(k)));
    const updateStr = updCols.map(k => `${k} = EXCLUDED.${k}`).join(', ');

    const sql = `INSERT INTO ${table} (${keys.join(', ')})
                 VALUES (${placeholders.join(', ')})
                 ON CONFLICT (${conflictStr}) DO UPDATE SET ${updateStr}
                 RETURNING *`;
    const result = await getPool().query(sql, values);
    return (result.rows[0] as T) ?? null;
}

export async function count(
    table: string,
    filters?: Record<string, unknown>,
): Promise<number> {
    validateIdentifier(table);
    let whereClause = '';
    const params: unknown[] = [];
    if (filters && Object.keys(filters).length > 0) {
        const conditions = Object.entries(filters).map(([col, val], i) => {
            validateIdentifier(col);
            params.push(val);
            return `${col} = $${i + 1}`;
        });
        whereClause = `WHERE ${conditions.join(' AND ')}`;
    }
    const result = await queryOne<{ total: string }>(
        `SELECT COUNT(*)::text AS total FROM ${table} ${whereClause}`, params
    );
    return parseInt(result?.total ?? '0', 10);
}

export async function healthCheck(): Promise<{
    healthy: boolean;
    latencyMs: number;
    poolStats: { total: number; idle: number; waiting: number };
    version?: string;
    uptime?: string;
}> {
    const start = Date.now();
    try {
        const p = getPool();
        const result = await queryOne<{ version: string; uptime: string }>(
            `SELECT version() AS version,
                    (NOW() - pg_postmaster_start_time())::text AS uptime`
        );
        const latencyMs = Date.now() - start;
        return {
            healthy: true,
            latencyMs,
            poolStats: { total: p.totalCount, idle: p.idleCount, waiting: p.waitingCount },
            version: result?.version?.split(' ').slice(0, 2).join(' '),
            uptime: result?.uptime,
        };
    } catch {
        return {
            healthy: false,
            latencyMs: Date.now() - start,
            poolStats: { total: 0, idle: 0, waiting: 0 },
        };
    }
}

export function getQueryMetrics() {
    return { queryCount, slowQueryCount };
}

// Exportamos 'db' para compatibilidad con Drizzle ORM en otros módulos
export const db = drizzle(getPool());
