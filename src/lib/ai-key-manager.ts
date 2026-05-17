export function getApiKey(): string {
  return process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
}

export function hasApiKeys(): boolean {
  return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;
}
