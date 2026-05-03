import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from './api-response';
import { AppError, AuthenticationError, RateLimitError, isAppError } from './api-errors';
import { logger } from './logger';
import { getSession } from './auth';
import { rateLimit, getClientIP } from './rate-limiter';

type Session = Awaited<ReturnType<typeof getSession>>;

export interface RequestContext {
  request: NextRequest;
  requestId: string;
  session: Session;
  ip: string;
  log: ReturnType<typeof logger.withRequest>;
  params?: Record<string, string>;
}

interface HandlerOptions {
  auth?: boolean;
  rateLimit?: {
    max: number;
    windowMs: number;
    keyPrefix?: string;
  };
}

type RouteHandler = (ctx: RequestContext) => Promise<NextResponse>;

function generateRequestId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${ts}-${rand}`;
}

export function apiHandler(handler: RouteHandler, options: HandlerOptions = {}): (request: NextRequest, context?: { params?: Promise<Record<string, string>> }) => Promise<NextResponse> {
  const { auth = true, rateLimit: rateLimitOpts } = options;

  return async (request: NextRequest, routeContext?: { params?: Promise<Record<string, string>> }) => {
    const requestId = generateRequestId();
    const method = request.method;
    const pathname = request.nextUrl.pathname;
    const log = logger.withRequest(requestId, pathname);
    const timer = logger.timed(`${method} ${pathname}`, { requestId });

    try {
      const ip = getClientIP(request);

      if (rateLimitOpts) {
        const key = `${rateLimitOpts.keyPrefix || pathname}:${ip}`;
        const limited = rateLimit(key, rateLimitOpts.max, rateLimitOpts.windowMs);
        if (!limited.allowed) {
          throw new RateLimitError(Math.ceil(limited.retryAfterMs / 1000));
        }
      }

      let session: Session = null;
      if (auth) {
        session = await getSession();
        if (!session) {
          throw new AuthenticationError();
        }
      } else {
        try {
          session = await getSession();
        } catch {
          session = null;
        }
      }

      const resolvedParams = routeContext?.params ? await routeContext.params : undefined;

      const ctx: RequestContext = {
        request,
        requestId,
        session,
        ip,
        log,
        params: resolvedParams,
      };

      const response = await handler(ctx);

      response.headers.set('x-request-id', requestId);
      timer.endWarn(1000, { status: response.status, userId: session?.userId });

      return response;
    } catch (error) {
      const duration = timer.end();

      if (isAppError(error) && error.isOperational) {
        if (error.statusCode >= 500) {
          log.error('Operational error', { code: error.code, message: error.message, durationMs: duration });
        }
      } else {
        log.error('Unhandled error', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          durationMs: duration,
        });
      }

      const response = ApiResponse.error(error, requestId);
      response.headers.set('x-request-id', requestId);
      return response;
    }
  };
}
