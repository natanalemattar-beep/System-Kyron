import { GoogleGenAI } from "@google/genai";

const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
].filter(Boolean) as string[];

if (API_KEYS.length === 0) {
  throw new Error("No Gemini API keys configured");
}

interface KeyStatus {
  client: GoogleGenAI;
  cooldownUntil: number;
  requestCount: number;
  lastReset: number;
}

const keyPool: KeyStatus[] = API_KEYS.map((key) => ({
  client: new GoogleGenAI({ apiKey: key }),
  cooldownUntil: 0,
  requestCount: 0,
  lastReset: Date.now(),
}));

let currentIndex = 0;

function resetCountersIfNeeded() {
  const now = Date.now();
  keyPool.forEach((k) => {
    if (now - k.lastReset > 60000) {
      k.requestCount = 0;
      k.lastReset = now;
    }
  });
}

export function getNextKey(): { client: GoogleGenAI; index: number } {
  resetCountersIfNeeded();

  const now = Date.now();
  let attempts = 0;
  const maxAttempts = keyPool.length;

  while (attempts < maxAttempts) {
    const key = keyPool[currentIndex];
    const idx = currentIndex;
    currentIndex = (currentIndex + 1) % keyPool.length;

    if (now >= key.cooldownUntil && key.requestCount < 4) {
      key.requestCount++;
      return { client: key.client, index: idx };
    }
    attempts++;
  }

  const soonestCooldown = Math.min(...keyPool.map((k) => k.cooldownUntil));
  const waitTime = Math.max(0, soonestCooldown - now);
  throw new Error(`All keys rate limited. Retry in ${Math.ceil(waitTime / 1000)}s`);
}

export function markKeyRateLimited(keyIndex: number) {
  if (keyIndex < 0 || keyIndex >= keyPool.length) return;
  keyPool[keyIndex].cooldownUntil = Date.now() + 30000;
  keyPool[keyIndex].requestCount = 5;
}

export function getAiClient(): GoogleGenAI {
  return getNextKey().client;
}

export function getKeyCount(): number {
  return API_KEYS.length;
}

export function getKeyStatus() {
  return keyPool.map((k, i) => ({
    index: i,
    cooldown: k.cooldownUntil > Date.now(),
    requests: k.requestCount,
  }));
}
