'use server';

export type ChatInput = {
  message: string;
  context?: string;
};

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/api/ai/kyron-voice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input.message, context: input.context }),
  });

  const data = await res.json();
  if (!res.ok) return data.error || 'Error de conexión con el núcleo IA.';
  return data.reply;
}
