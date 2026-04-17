import { getPool } from '../src/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
  const pool = getPool();
  try {
    const res = await pool.query(`SELECT COUNT(*) as count FROM verification_codes WHERE destino = 'natanalemattar@gmail.com'`);
    console.log("Success:", res.rows);
  } catch (err) {
    console.error("Query Error:", err);
  } finally {
    process.exit();
  }
}
test();
