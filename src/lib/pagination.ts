import { NextRequest } from 'next/server';

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 500;

export function parsePagination(request: NextRequest, defaults?: { limit?: number }): PaginationParams {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);
  const rawLimit = parseInt(searchParams.get('limit') || String(defaults?.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT;
  const limit = Math.min(Math.max(1, rawLimit), MAX_LIMIT);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export interface SortParams {
  column: string;
  direction: 'ASC' | 'DESC';
}

export function parseSort(
  request: NextRequest,
  allowedColumns: string[],
  defaults: SortParams = { column: 'id', direction: 'DESC' }
): SortParams {
  const searchParams = request.nextUrl.searchParams;
  const sortBy = searchParams.get('sort_by') || defaults.column;
  const sortDir = (searchParams.get('sort_dir') || defaults.direction).toUpperCase();

  const column = allowedColumns.includes(sortBy) ? sortBy : defaults.column;
  const direction: 'ASC' | 'DESC' = sortDir === 'ASC' ? 'ASC' : 'DESC';

  return { column, direction };
}

export function buildPaginatedQuery(
  baseQuery: string,
  pagination: PaginationParams,
  sort?: SortParams
): string {
  let query = baseQuery;
  if (sort) {
    query += ` ORDER BY "${sort.column}" ${sort.direction}`;
  }
  query += ` LIMIT ${pagination.limit} OFFSET ${pagination.offset}`;
  return query;
}
