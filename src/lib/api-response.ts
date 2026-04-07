import { NextResponse } from 'next/server';
import { AppError, normalizeError, type ErrorCode, type FieldError } from './api-errors';

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: FieldError[];
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiPaginatedResponse<T = unknown> {
  success: true;
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export const ApiResponse = {
  success<T>(data: T, status: number = 200, meta?: Record<string, unknown>): NextResponse<ApiSuccessResponse<T>> {
    const body: ApiSuccessResponse<T> = { success: true, data };
    if (meta) body.meta = meta;
    return NextResponse.json(body, { status });
  },

  created<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
    return ApiResponse.success(data, 201);
  },

  noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
  },

  paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    extraMeta?: Record<string, unknown>
  ): NextResponse<ApiPaginatedResponse<T>> {
    const totalPages = Math.ceil(total / limit);
    const pagination: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
    return NextResponse.json({
      success: true,
      data,
      meta: { pagination, ...extraMeta },
    });
  },

  error(error: unknown, requestId?: string): NextResponse<ApiErrorResponse> {
    const appError = normalizeError(error);
    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: appError.code,
        message: appError.message,
        ...(appError.details?.length ? { details: appError.details } : {}),
      },
    };

    const headers: Record<string, string> = {};
    if (requestId) headers['x-request-id'] = requestId;
    if ('retryAfter' in appError && typeof appError.retryAfter === 'number') {
      headers['Retry-After'] = String(appError.retryAfter);
    }

    return NextResponse.json(body, { status: appError.statusCode, headers });
  },
} as const;
