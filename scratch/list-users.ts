import { getPool } from '../src/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

async function listUsers() {
  const pool = getPool();
  try {
    const res = await pool.query(`SELECT id, email, tipo, nombre, apellido, verificado FROM users LIMIT 20`);
    console.log("Users in Database:");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Query Error:", err);
  } finally {
    process.exit();
  }
}
listUsers();
