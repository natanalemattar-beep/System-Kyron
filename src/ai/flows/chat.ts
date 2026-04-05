'use server';

export type ChatInput = {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  context?: string;
};

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/api/ai/kyron-chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: input.messages, context: input.context }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return data.error || 'Error de conexión con el núcleo IA.';
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/event-stream') && res.body) {
    let fullText = '';
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        try {
          const data = JSON.parse(line.slice(6));
          if (data.text) fullText += data.text;
          if (data.error) return data.error;
        } catch {}
      }
    }
    return fullText || 'Sin respuesta.';
  }

  const data = await res.json();
  return data.content || data.reply || 'Sin respuesta.';
}
