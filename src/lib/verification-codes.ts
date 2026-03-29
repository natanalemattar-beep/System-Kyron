const codes = new Map<string, { code: string; expires: number; userId: number; attempts: number }>();

const CODE_LENGTH = 6;
const CODE_EXPIRY_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function generateCode(): string {
  const digits = '0123456789';
  let code = '';
  const array = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(array);
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += digits[array[i] % 10];
  }
  return code;
}

export function storeCode(email: string, code: string, userId: number): void {
  codes.set(email.toLowerCase(), {
    code,
    expires: Date.now() + CODE_EXPIRY_MS,
    userId,
    attempts: 0,
  });
}

export function verifyCode(email: string, inputCode: string): { valid: boolean; userId?: number; error?: string } {
  const key = email.toLowerCase();
  const entry = codes.get(key);

  if (!entry) {
    return { valid: false, error: 'No hay código pendiente. Inicia sesión nuevamente.' };
  }

  if (Date.now() > entry.expires) {
    codes.delete(key);
    return { valid: false, error: 'El código ha expirado. Inicia sesión nuevamente.' };
  }

  entry.attempts++;
  if (entry.attempts > MAX_ATTEMPTS) {
    codes.delete(key);
    return { valid: false, error: 'Demasiados intentos. Inicia sesión nuevamente.' };
  }

  if (entry.code !== inputCode) {
    return { valid: false, error: `Código incorrecto. ${MAX_ATTEMPTS - entry.attempts} intentos restantes.` };
  }

  codes.delete(key);
  return { valid: true, userId: entry.userId };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of codes) {
    if (now > entry.expires) {
      codes.delete(key);
    }
  }
}, 60 * 1000);
