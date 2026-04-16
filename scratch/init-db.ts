import { Pool } from 'pg';
import { initializeDatabase } from '../src/lib/db-schema';

// Forzamos SSL para entornos locales que conectan a Supabase/Neon
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function main() {
  console.log('--- Initializing Database (Force SSL Bypass) ---');
  try {
    await initializeDatabase();
    console.log('--- Database Initialized Successfully ---');
  } catch (err) {
    console.error('--- Database Initialization FAILED ---');
    console.error(err);
    process.exit(1);
  }
}

main();
