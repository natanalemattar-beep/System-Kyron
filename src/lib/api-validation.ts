import { type ZodSchema, ZodError } from 'zod';
import { ValidationError, type FieldError } from './api-errors';
import { NextRequest } from 'next/server';

function zodToFieldErrors(zodError: ZodError): FieldError[] {
  return zodError.errors.map((issue) => ({
    field: issue.path.join('.') || '_root',
    message: issue.message,
    code: issue.code,
  }));
}

export async function validateBody<T>(request: NextRequest, schema: ZodSchema<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError('Cuerpo de la solicitud inválido o vacío');
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ValidationError(
      'Error de validación en los datos enviados',
      zodToFieldErrors(result.error)
    );
  }
  return result.data;
}

export function validateQuery<T>(request: NextRequest, schema: ZodSchema<T>): T {
  const params: Record<string, string> = {};
  request.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const result = schema.safeParse(params);
  if (!result.success) {
    throw new ValidationError(
      'Parámetros de consulta inválidos',
      zodToFieldErrors(result.error)
    );
  }
  return result.data;
}

export function validateParams<T>(params: Record<string, string>, schema: ZodSchema<T>): T {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new ValidationError(
      'Parámetros de ruta inválidos',
      zodToFieldErrors(result.error)
    );
  }
  return result.data;
}
