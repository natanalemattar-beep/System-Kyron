import { query, transaction, batchInsert } from '@/lib/db';
import { PoolClient } from 'pg';

export async function seedDemoData(userId: number): Promise<{ seeded: string[]; errors: string[] }> {
  const seeded: string[] = [];
  const errors: string[] = [];

  const safeSeed = async (label: string, fn: () => Promise<void>) => {
    try {
      await fn();
      seeded.push(label);
    } catch (err: any) {
      errors.push(`${label}: ${err.message}`);
    }
  };

  await safeSeed('tasas_bcv', () => seedTasasBCV());
  await safeSeed('notificaciones', () => seedNotificaciones(userId));

  return { seeded, errors };
}

async function seedTasasBCV() {
  const existing = await query(`SELECT id FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`);
  if (existing.length > 0) return;

  const today = new Date();
  const tasasData: unknown[][] = [];

  for (let i = 0; i < 90; i++) {
    const fecha = new Date(today);
    fecha.setDate(fecha.getDate() - i);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;

    const baseRate = 36.50 + (Math.random() * 2 - 1) * 0.5;
    const eurRate = baseRate * 1.08;

    tasasData.push([
      fecha.toISOString().split('T')[0],
      +baseRate.toFixed(4),
      +eurRate.toFixed(4),
      null, null, 'BCV'
    ]);
  }

  await batchInsert('tasas_bcv',
    ['fecha','tasa_usd_ves','tasa_eur_ves','tasa_cop_ves','tasa_usdt_ves','fuente'],
    tasasData
  );
}

async function seedNotificaciones(userId: number) {
  const existing = await query(`SELECT id FROM notificaciones WHERE user_id = $1 LIMIT 1`, [userId]);
  if (existing.length > 0) return;

  await batchInsert('notificaciones',
    ['user_id','tipo','titulo','mensaje','leida','accion_url'],
    [
      [userId,'info','Bienvenido a System Kyron','Su cuenta ha sido configurada exitosamente. Explore los módulos disponibles para comenzar.',false,null],
    ]
  );
}
