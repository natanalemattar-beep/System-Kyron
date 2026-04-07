import { z } from 'zod';
import { apiHandler } from '@/lib/api-handler';
import { ApiResponse } from '@/lib/api-response';
import { ConflictError, ValidationError } from '@/lib/api-errors';
import { validateBody } from '@/lib/api-validation';
import { parsePagination } from '@/lib/pagination';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

const createClienteSchema = z.object({
  tipo: z.enum(['natural', 'juridico']).default('juridico'),
  razon_social: z.string().min(1).max(200).nullish(),
  rif: z.string().max(20).nullish(),
  nombre_contacto: z.string().max(200).nullish(),
  cedula_contacto: z.string().max(20).nullish(),
  telefono: z.string().max(30).nullish(),
  email: z.string().email().max(100).nullish(),
  direccion: z.string().max(500).nullish(),
  estado: z.string().max(100).nullish(),
  municipio: z.string().max(100).nullish(),
  segmento: z.string().max(50).nullish(),
  valor_estimado: z.coerce.number().min(0).default(0),
  satisfaccion: z.coerce.number().min(0).max(10).nullish(),
}).refine(
  (data) => data.razon_social || data.nombre_contacto,
  { message: 'Se requiere razón social o nombre del contacto', path: ['razon_social'] }
);

export const GET = apiHandler(async (ctx) => {
  const { page, limit, offset } = parsePagination(ctx.request);

  const [clientes, countResult] = await Promise.all([
    query(
      `SELECT id, tipo, razon_social, rif, nombre_contacto, cedula_contacto,
              telefono, email, direccion, estado, municipio, activo,
              segmento, valor_estimado, satisfaccion, created_at
       FROM clientes WHERE user_id = $1
       ORDER BY razon_social ASC NULLS LAST
       LIMIT $2 OFFSET $3`,
      [ctx.session!.userId, limit, offset]
    ),
    queryOne<{ count: string }>(`SELECT COUNT(*) as count FROM clientes WHERE user_id = $1`, [ctx.session!.userId]),
  ]);

  const total = parseInt(countResult?.count || '0', 10);
  return ApiResponse.paginated(clientes, total, page, limit);
});

export const POST = apiHandler(async (ctx) => {
  const data = await validateBody(ctx.request, createClienteSchema);

  if (data.rif) {
    const exists = await queryOne(
      `SELECT id FROM clientes WHERE user_id = $1 AND rif = $2`,
      [ctx.session!.userId, data.rif]
    );
    if (exists) throw new ConflictError('Ya existe un cliente con ese RIF');
  }

  const [cliente] = await query(
    `INSERT INTO clientes (user_id, tipo, razon_social, rif, nombre_contacto, cedula_contacto, telefono, email, direccion, estado, municipio, segmento, valor_estimado, satisfaccion)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING *`,
    [
      ctx.session!.userId,
      data.tipo,
      data.razon_social ?? null,
      data.rif ?? null,
      data.nombre_contacto ?? null,
      data.cedula_contacto ?? null,
      data.telefono ?? null,
      data.email ?? null,
      data.direccion ?? null,
      data.estado ?? null,
      data.municipio ?? null,
      data.segmento ?? null,
      data.valor_estimado,
      data.satisfaccion ?? null,
    ]
  );

  const c = cliente as { id: number; razon_social?: string; nombre_contacto?: string };
  await logActivity({
    userId: ctx.session!.userId,
    evento: 'NUEVO_CLIENTE',
    categoria: 'clientes',
    descripcion: `Cliente registrado: ${c.razon_social ?? c.nombre_contacto ?? 'Sin nombre'}`,
    entidadTipo: 'cliente',
    entidadId: c.id,
    metadata: { tipo: data.tipo, rif: data.rif ?? null },
  });

  ctx.log.info('Cliente creado', { clienteId: c.id });
  return ApiResponse.created(cliente);
});
