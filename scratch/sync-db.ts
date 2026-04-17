import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

import { initializeDatabase } from '../src/lib/db-schema';

async function sync() {
  try {
    console.log('Syncing database schema with env load...');
    const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL not found in environment');
    }
    console.log('Connection found. Initializing...');
    await initializeDatabase();
    console.log('Schema sync complete.');
  } catch (err) {
    console.error('Sync failed:', err);
  }
}

sync();
