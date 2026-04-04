import { query, batchInsert } from '@/lib/db';

export async function seedDemoData(userId: number): Promise<{ seeded: string[]; errors: string[] }> {
  const seeded: string[] = [];
  const errors: string[] = [];

  const safeSeed = async (label: string, fn: () => Promise<void>) => {
    try {
      await fn();
      seeded.push(label);
    } catch (err: unknown) {
      errors.push(`${label}: ${(err as Error).message}`);
    }
  };

  await safeSeed('notificaciones', () => seedNotificaciones(userId));

  return { seeded, errors };
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
