import { query } from '../src/lib/db';

async function testDB() {
  try {
    const res = await query("SELECT current_user, current_database(), now();");
    console.log("DB Connection OK:", res[0]);
    
    const tables = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';");
    console.log("Tables found:", tables.length);
    console.log("Sample tables:", tables.slice(0, 5).map((t: any) => t.table_name));
    
    const vCodes = tables.some((t: any) => t.table_name === 'verification_codes');
    console.log("Verification codes table exists:", vCodes);

    const userCount = await query("SELECT count(*) as count FROM users;");
    console.log("Total users:", (userCount[0] as any).count);

    const checkVcodes = await query("SELECT * FROM information_schema.columns WHERE table_name = 'verification_codes';");
    console.log("Columns in verification_codes:", checkVcodes.map((c: any) => c.column_name));

  } catch (err) {
    console.error("DB Test FAILED:", err);
  }
}

testDB();
