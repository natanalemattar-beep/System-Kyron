type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  module?: string;
  requestId?: string;
  userId?: number;
  durationMs?: number;
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL = LOG_LEVELS[(process.env.LOG_LEVEL as LogLevel) || 'info'] ?? 1;

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= MIN_LEVEL;
}

function formatEntry(entry: LogEntry): string {
  if (process.env.NODE_ENV === 'production') {
    return JSON.stringify(entry);
  }
  const { timestamp, level, message, module, requestId, durationMs, ...rest } = entry;
  const prefix = module ? `[${module}]` : '';
  const rid = requestId ? `(${requestId})` : '';
  const dur = durationMs !== undefined ? `${durationMs}ms` : '';
  const extras = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : '';
  return `${timestamp} ${level.toUpperCase()} ${prefix}${rid} ${message} ${dur}${extras}`.trim();
}

function emit(level: LogLevel, message: string, data?: Record<string, unknown>) {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
  };

  const formatted = formatEntry(entry);
  switch (level) {
    case 'error':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => emit('debug', message, data),
  info: (message: string, data?: Record<string, unknown>) => emit('info', message, data),
  warn: (message: string, data?: Record<string, unknown>) => emit('warn', message, data),
  error: (message: string, data?: Record<string, unknown>) => emit('error', message, data),

  child(context: Record<string, unknown>) {
    return {
      debug: (msg: string, data?: Record<string, unknown>) => emit('debug', msg, { ...context, ...data }),
      info: (msg: string, data?: Record<string, unknown>) => emit('info', msg, { ...context, ...data }),
      warn: (msg: string, data?: Record<string, unknown>) => emit('warn', msg, { ...context, ...data }),
      error: (msg: string, data?: Record<string, unknown>) => emit('error', msg, { ...context, ...data }),
    };
  },

  withRequest(requestId: string, module?: string) {
    return this.child({ requestId, ...(module ? { module } : {}) });
  },

  timed(label: string, data?: Record<string, unknown>) {
    const start = performance.now();
    return {
      end: (extraData?: Record<string, unknown>) => {
        const durationMs = Math.round(performance.now() - start);
        emit('info', label, { ...data, ...extraData, durationMs });
        return durationMs;
      },
      endWarn: (thresholdMs: number, extraData?: Record<string, unknown>) => {
        const durationMs = Math.round(performance.now() - start);
        const level = durationMs > thresholdMs ? 'warn' : 'info';
        emit(level, label, { ...data, ...extraData, durationMs });
        return durationMs;
      },
    };
  },
};
