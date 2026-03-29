import { Pool, PoolClient, QueryResult } from 'pg';

let pool: Pool | undefined;
let queryCount = 0;
let slowQueryCount = 0;

const SLOW_QUERY_THRESHOLD_MS = 500;

export function getPool(): Pool {
    if (!pool) {
        const isProduction = process.env.NODE_ENV === 'production';
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: isProduction ? { rejectUnauthorized: false } : false,
            max: isProduction ? 25 : 12,
            min: isProduction ? 5 : 2,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
            statement_timeout: 30000,
            query_timeout: 30000,
            allowExitOnIdle: false,
        });
        pool.on('error', (err) => {
            console.error('[db] Error inesperado en cliente idle:', err.message);
        });
    }
    return pool;
}

export async function query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
): Promise<T[]> {
    const start = Date.now();
    queryCount++;
    try {
        const result = await getPool().query(text, params);
        const duration = Date.now() - start;
        if (duration > SLOW_QUERY_THRESHOLD_MS) {
            slowQueryCount++;
            console.warn(`[db] Query lenta (${duration}ms): ${text.substring(0, 120)}...`);
        }
        return result.rows as T[];
    } catch (err: any) {
        const duration = Date.now() - start;
        console.error(`[db] Error en query (${duration}ms):`, err.message);
        throw err;
    }
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

export async function count(table: string, where?: string, params?: unknown[]): Promise<number> {
    validateIdentifier(table);
    const whereClause = where ? `WHERE ${where}` : '';
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
