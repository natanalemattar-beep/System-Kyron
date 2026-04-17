import { getPool } from '../src/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

async function testInsert() {
  const pool = getPool();
  try {
    const res = await pool.query(
      `INSERT INTO users (
            email, password_hash, tipo,
            nombre, razon_social, rif, tipo_empresa, actividad_economica, codigo_ciiu,
            fecha_constitucion, registro_mercantil, capital_social,
            telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
            rep_nombre, rep_cedula, rep_email, rep_cargo, rep_telefono,
            plan, plan_monto,
            verificado
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21,
                 $22, $23,
                 $24)
         RETURNING id`,
      [
        'debug_test_empresa@kyron.com', 'fakepasswordhash',
        'Empresa Test SRL', 'Empresa Test SRL', 'J-12345678-9',
        'Tech', 'Software', '1234',
        null, 'Reg 1', '1000',
        '04121234567', '', 'DC', 'Caracas', 'Direccion falsa',
        'Rep Test', 'V-12345678', 'debug_test_empresa@kyron.com', 'CEO', '04121234567',
        'contable_esencial', 8.00,
        true
      ]
    );
    console.log("Success:", res.rows);
  } catch (err: any) {
    console.error("Insert Error details:");
    console.error(err.message);
    if (err.detail) console.error("Detail:", err.detail);
    if (err.hint) console.error("Hint:", err.hint);
  } finally {
    const client = await pool.connect();
    // Limpiamos el fake user si se llega a guardar
    await client.query("DELETE FROM users WHERE email = 'debug_test_empresa@kyron.com'");
    client.release();
    process.exit();
  }
}
testInsert();
