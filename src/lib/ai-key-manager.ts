const KEY_ENV_VARS = ['GOOGLE_GENERATIVE_AI_API_KEY', 'GEMINI_API_KEY', 'GEMINI_API_KEY_1', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3', 'GEMINI_API_KEY_4'];

let currentIndex = 0;
let fallbackKeys: string[] = [];

function loadKeys(): string[] {
  const keys: string[] = [];
  for (const envVar of KEY_ENV_VARS) {
    const key = process.env[envVar];
    if (key) keys.push(key);
  }
  return keys;
}

function getNextKey(): string {
  if (fallbackKeys.length === 0) {
    fallbackKeys = loadKeys();
  }
  if (fallbackKeys.length === 0) return '';

  const key = fallbackKeys[currentIndex % fallbackKeys.length];
  currentIndex = (currentIndex + 1) % fallbackKeys.length;
  return key;
}

export function getApiKey(): string {
  return getNextKey();
}

export function hasApiKeys(): boolean {
  return loadKeys().length > 0;
}

export function getKeyCount(): number {
  return loadKeys().length;
}
