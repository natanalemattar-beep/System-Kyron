import { queryOne } from '../src/lib/db';

async function checkSchema() {
  try {
    const row = await queryOne('SELECT * FROM users LIMIT 1');
    console.log('Columns in users table:', Object.keys(row || {}));
  } catch (err) {
    console.error('Error checking schema:', err);
  }
}

checkSchema();
