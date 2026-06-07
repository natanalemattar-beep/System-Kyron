import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";

const TRIAL_LIMIT = 3;
const TRIAL_WINDOW_MS = 24 * 60 * 60 * 1000;

const usageStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous";
}

function getRemaining(ip: string): number {
  const now = Date.now();
  const entry = usageStore.get(ip);
  if (!entry || now >= entry.resetAt) {
    usageStore.set(ip, { count: 0, resetAt: now + TRIAL_WINDOW_MS });
    return TRIAL_LIMIT;
  }
  return Math.max(0, TRIAL_LIMIT - entry.count);
}

function incrementUsage(ip: string): void {
  const now = Date.now();
  const entry = usageStore.get(ip);
  if (!entry || now >= entry.resetAt) {
    usageStore.set(ip, { count: 1, resetAt: now + TRIAL_WINDOW_MS });
  } else {
    entry.count++;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const remaining = getRemaining(ip);

    if (remaining <= 0) {
      return NextResponse.json({ limitReached: true, remaining: 0 }, { status: 429 });
    }

    const start = Date.now();
    const text = await ai.generateText(
      `Eres Kyron IA, el asistente virtual del ecosistema System Kyron. Responde de forma clara, profesional y amigable. Pregunta del usuario: ${message}`,
      {
        model: "gemini-1.5-flash",
        temperature: 0.7,
        systemInstruction: "Eres Kyron IA, asistente corporativo del ecosistema System Kyron. Responde en español de forma profesional y concisa.",
      }
    );
    const responseTime = Date.now() - start;

    incrementUsage(ip);
    const newRemaining = getRemaining(ip);

    return NextResponse.json({ text, responseTime, remaining: newRemaining });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}
