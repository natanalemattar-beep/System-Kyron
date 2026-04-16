import { query } from './src/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function checkTime() {
  try {
    const res = await query('SELECT NOW() as db_now');
    console.log('DB NOW:', res[0].db_now);
    console.log('Local NOW:', new Date().toISOString());
  } catch (err) {
    console.error('Time check failed:', err);
  }
}

checkTime();
