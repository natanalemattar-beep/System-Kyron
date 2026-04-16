import { query } from '../src/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


async function checkCodes() {
  try {
    console.log('--- DB Connection Check ---');
    const dbStatus = await query('SELECT 1 as connected');
    console.log('DB Status:', JSON.stringify(dbStatus, null, 2));

    console.log('\n--- Latest Verification Codes ---');
    const codes = await query('SELECT * FROM verification_codes ORDER BY created_at DESC LIMIT 5');
    console.log(JSON.stringify(codes, null, 2));

    console.log('\n--- Latest Email Logs ---');
    const emailLogs = await query('SELECT * FROM email_log ORDER BY created_at DESC LIMIT 5');
    console.log(JSON.stringify(emailLogs, null, 2));
    
    console.log('\n--- Verification Codes Count by Type ---');
    const stats = await query('SELECT tipo, COUNT(*) as count FROM verification_codes GROUP BY tipo');
    console.log(JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error('Error checking codes:', err);
  }
}

checkCodes();


checkCodes();
