export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT'
  | 'INTERNAL_ERROR'
  | 'BAD_REQUEST'
  | 'SERVICE_UNAVAILABLE';

export interface FieldError {
  field: string;
  message: string;
  code?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;
  public readonly details?: FieldError[];
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: ErrorCode = 'INTERNAL_ERROR',
    options?: {
      isOperational?: boolean;
      details?: FieldError[];
      context?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = options?.isOperational ?? true;
    this.details = options?.details;
    this.context = options?.context;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: FieldError[]) {
    super(message, 400, 'VALIDATION_ERROR', { details });
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'No autenticado') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'No autorizado') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string | number) {
    const msg = identifier
      ? `${resource} con ID ${identifier} no encontrado`
      : `${resource} no encontrado`;
    super(msg, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number;

  constructor(retryAfter: number = 60) {
    super('Demasiadas solicitudes, intente más tarde', 429, 'RATE_LIMIT');
    this.retryAfter = retryAfter;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(service: string) {
    super(`Servicio no disponible: ${service}`, 503, 'SERVICE_UNAVAILABLE');
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) return error;
  if (error instanceof Error) {
    return new AppError(error.message, 500, 'INTERNAL_ERROR', { isOperational: false });
  }
  return new AppError(String(error), 500, 'INTERNAL_ERROR', { isOperational: false });
}
