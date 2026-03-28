import { Pool, PoolClient } from 'pg';

let pool: Pool | undefined;

export function getPool(): Pool {
    if (!pool) {
        const isProduction = process.env.NODE_ENV === 'production';
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: isProduction ? { rejectUnauthorized: false } : false,
            max: isProduction ? 20 : 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
            statement_timeout: 30000,
            query_timeout: 30000,
        });
        pool.on('error', (err) => {
            console.error('Unexpected error on idle DB client:', err);
        });
    }
    return pool;
}

export async function query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
): Promise<T[]> {
    const client = getPool();
    const result = await client.query(text, params);
    return result.rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
): Promise<T | null> {
    const rows = await query<T>(text, params);
    return rows[0] ?? null;
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
