import { z } from 'zod';
import { apiHandler } from '@/lib/api-handler';
import { ApiResponse } from '@/lib/api-response';
import { validateBody } from '@/lib/api-validation';
import { parsePagination } from '@/lib/pagination';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

const createCampanaSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido').max(200),
  tipo: z.string().max(50).default('Digital'),
  canales: z.array(z.string()).default([]),
  estado: z.enum(['borrador', 'activa', 'pausada', 'finalizada']).default('borrador'),
  fecha_inicio: z.string().nullish(),
  fecha_fin: z.string().nullish(),
  presupuesto: z.coerce.number().min(0).default(0),
  gastado: z.coerce.number().min(0).default(0),
  alcance: z.coerce.number().int().min(0).default(0),
  impresiones: z.coerce.number().int().min(0).default(0),
  clicks: z.coerce.number().int().min(0).default(0),
  conversiones: z.coerce.number().int().min(0).default(0),
  roi: z.coerce.number().default(0),
  notas: z.string().max(2000).nullish(),
});

export const GET = apiHandler(async (ctx) => {
  const { page, limit, offset } = parsePagination(ctx.request);

  const [campanas, countResult] = await Promise.all([
    query(
      `SELECT * FROM campanas_marketing WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [ctx.session!.userId, limit, offset]
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM campanas_marketing WHERE user_id = $1`,
      [ctx.session!.userId]
    ),
  ]);

  const total = parseInt(countResult?.count || '0', 10);
  return ApiResponse.paginated(campanas, total, page, limit);
});

export const POST = apiHandler(async (ctx) => {
  const data = await validateBody(ctx.request, createCampanaSchema);

  const [campana] = await query(
    `INSERT INTO campanas_marketing (user_id, nombre, tipo, canales, estado, fecha_inicio, fecha_fin, presupuesto, gastado, alcance, impresiones, clicks, conversiones, roi, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING *`,
    [
      ctx.session!.userId,
      data.nombre,
      data.tipo,
      data.canales,
      data.estado,
      data.fecha_inicio ?? null,
      data.fecha_fin ?? null,
      data.presupuesto,
      data.gastado,
      data.alcance,
      data.impresiones,
      data.clicks,
      data.conversiones,
      data.roi,
      data.notas ?? null,
    ]
  );

  const c = campana as { id: number };
  await logActivity({
    userId: ctx.session!.userId,
    evento: 'NUEVA_CAMPANA',
    categoria: 'marketing',
    descripcion: `Campaña creada: ${data.nombre}`,
    entidadTipo: 'campana_marketing',
    entidadId: c.id,
  });

  ctx.log.info('Campaña creada', { campanaId: c.id });
  return ApiResponse.created(campana);
});
