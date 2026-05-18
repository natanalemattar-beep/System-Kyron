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

let currentIndex = 0;
const activeClients = new Map<number, GoogleGenAI>();

export function getNextKey(): string {
  const key = API_KEYS[currentIndex];
  currentIndex = (currentIndex + 1) % API_KEYS.length;
  return key;
}

export function getAiClient(): GoogleGenAI {
  const key = getNextKey();
  if (!activeClients.has(currentIndex)) {
    activeClients.set(currentIndex, new GoogleGenAI({ apiKey: key }));
  }
  return activeClients.get(currentIndex)!;
}

export function getKeyCount(): number {
  return API_KEYS.length;
}
