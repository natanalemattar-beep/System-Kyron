import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://postgres.pzwozmzolneqgwsceknq:EtPNtHFHooOw9zXW@aws-1-us-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('Conectado a Supabase PostgreSQL');

    // Desactivar triggers temporalmente
    await client.query('SET session_replication_role = replica');

    // Obtener todas las tablas que referencian users
    const { rows: fkTables } = await client.query(`
      SELECT DISTINCT tc.table_schema, tc.table_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND ccu.table_name = 'users'
        AND tc.table_schema = 'public'
    `);

    console.log(`Tablas con FK a users: ${fkTables.length}`);

    // Truncar en orden inverso (primero las que referencian a users, luego users)
    for (const row of fkTables.reverse()) {
      const table = row.table_name;
      console.log(`Truncando ${table}...`);
      await client.query(`TRUNCATE TABLE "${table}" CASCADE`);
    }

    // Truncar users
    await client.query('TRUNCATE TABLE users CASCADE');
    console.log('Tabla users truncada.');

    // Reactivar triggers
    await client.query('SET session_replication_role = origin');

    console.log('\nBase de datos limpiada. Todos los usuarios eliminados.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
