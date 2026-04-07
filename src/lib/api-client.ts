'use client';

export interface ApiResult<T = unknown> {
  success: boolean;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    [key: string]: unknown;
  };
  error?: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: Array<{ field: string; message: string }>;

  constructor(status: number, code: string, message: string, details?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResult<T>> {
  const json = await response.json();

  if (json.success === false || !response.ok) {
    throw new ApiError(
      response.status,
      json.error?.code || 'UNKNOWN_ERROR',
      json.error?.message || json.error || 'Error desconocido',
      json.error?.details
    );
  }

  if ('success' in json && json.success === true) {
    return json as ApiResult<T>;
  }

  return { success: true, data: json as T };
}

export const api = {
  async get<T = unknown>(url: string, params?: Record<string, string | number>): Promise<ApiResult<T>> {
    const queryString = params
      ? '?' + new URLSearchParams(
          Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {} as Record<string, string>)
        ).toString()
      : '';
    const response = await fetch(`${url}${queryString}`);
    return handleResponse<T>(response);
  },

  async post<T = unknown>(url: string, body?: unknown): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async put<T = unknown>(url: string, body?: unknown): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async patch<T = unknown>(url: string, body?: unknown): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async delete<T = unknown>(url: string): Promise<ApiResult<T>> {
    const response = await fetch(url, { method: 'DELETE' });
    return handleResponse<T>(response);
  },
};
