import { query } from '../src/lib/db';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function listTables() {
  try {
    const tables = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';");
    console.log("Tables in public schema:");
    tables.forEach((t: any) => console.log(` - ${t.table_name}`));
    
    const vExists = tables.some((t: any) => t.table_name === 'verification_codes');
    console.log("\nverification_codes exists:", vExists);
    
    if (vExists) {
      const cols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'verification_codes';");
      console.log("Columns in verification_codes:");
      cols.forEach((c: any) => console.log(` - ${c.column_name} (${c.data_type})`));
    }
  } catch (err) {
    console.error("Failed to list tables:", err);
  }
}

listTables();
