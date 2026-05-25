type Handler<T = unknown> = (payload: T) => void | Promise<void>;

const handlers = new Map<string, Set<Handler>>();

export function on<T>(event: string, handler: Handler<T>) {
  if (!handlers.has(event)) handlers.set(event, new Set());
  handlers.get(event)!.add(handler);
  return () => handlers.get(event)?.delete(handler);
}

export async function emit(event: string, payload?: unknown) {
  const eventHandlers = handlers.get(event);
  if (!eventHandlers) return;
  await Promise.allSettled(
    [...eventHandlers].map(h => Promise.resolve().then(() => h(payload)))
  );
}

export function removeAll(event?: string) {
  if (event) handlers.delete(event);
  else handlers.clear();
}
