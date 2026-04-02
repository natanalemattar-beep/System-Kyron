import { query, queryOne } from '@/lib/db';
import crypto from 'crypto';

const CODE_LENGTH = 6;
const CODE_EXPIRY_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAGIC_TOKEN_BYTES = 32;

export function generateCode(): string {
  const digits = '0123456789';
  let code = '';
  const array = new Uint8Array(CODE_LENGTH);
  globalThis.crypto.getRandomValues(array);
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += digits[array[i] % 10];
  }
  return code;
}

export function generateMagicToken(): string {
  return crypto.randomBytes(MAGIC_TOKEN_BYTES).toString('hex');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function storeMagicToken(email: string, token: string, userId?: number): Promise<void> {
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);
  const hashed = hashToken(token);
  try {
    await query(
      `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito)
       VALUES ($1, 'email', $2, $3, 'magic_link')`,
      [email.toLowerCase(), hashed, expiresAt]
    );
  } catch {
    console.error('[verification-codes] DB insert magic token failed, using fallback');
    fallbackMagicTokens.set(hashed, {
      email: email.toLowerCase(),
      expires: Date.now() + CODE_EXPIRY_MS,
      userId: userId ?? 0,
    });
  }
}

export async function verifyMagicToken(token: string): Promise<{ valid: boolean; email?: string; userId?: number; error?: string }> {
  const hashed = hashToken(token);

  try {
    const record = await queryOne<{ id: number; destino: string }>(
      `UPDATE verification_codes
       SET usado = true
       WHERE id = (
         SELECT id FROM verification_codes
         WHERE codigo = $1 AND usado = false AND expires_at > NOW()
         AND proposito = 'magic_link'
         ORDER BY created_at DESC LIMIT 1
         FOR UPDATE SKIP LOCKED
       )
       RETURNING id, destino`,
      [hashed]
    );

    if (record) {
      const user = await queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [record.destino]);
      return { valid: true, email: record.destino, userId: user?.id };
    }
  } catch (err) {
    console.error('[verification-codes] DB verify magic token failed, trying fallback:', err);
  }

  const entry = fallbackMagicTokens.get(hashed);
  if (!entry) {
    return { valid: false, error: 'Enlace inválido o expirado. Inicia sesión nuevamente.' };
  }
  if (Date.now() > entry.expires) {
    fallbackMagicTokens.delete(hashed);
    return { valid: false, error: 'El enlace ha expirado. Inicia sesión nuevamente.' };
  }
  fallbackMagicTokens.delete(hashed);
  return { valid: true, email: entry.email, userId: entry.userId };
}

export async function storeCode(email: string, code: string, userId: number): Promise<void> {
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);
  try {
    await query(
      `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito)
       VALUES ($1, 'email', $2, $3, 'verification')`,
      [email.toLowerCase(), code, expiresAt]
    );
  } catch {
    console.error('[verification-codes] DB insert failed, using fallback');
    fallbackCodes.set(email.toLowerCase(), {
      code,
      expires: Date.now() + CODE_EXPIRY_MS,
      userId,
      attempts: 0,
    });
  }
}

export async function verifyCode(email: string, inputCode: string): Promise<{ valid: boolean; userId?: number; error?: string }> {
  const key = email.toLowerCase();

  try {
    const record = await queryOne<{ id: number; codigo: string; intentos: number }>(
      `SELECT id, codigo, COALESCE(intentos, 0) as intentos FROM verification_codes
       WHERE destino = $1 AND tipo IN ('email', 'sms', 'whatsapp') AND usado = false AND expires_at > NOW()
       AND COALESCE(proposito, 'verification') = 'verification'
       ORDER BY created_at DESC LIMIT 1`,
      [key]
    );

    if (record) {
      if (record.intentos >= MAX_ATTEMPTS) {
        return { valid: false, error: 'Demasiados intentos. Inicia sesión nuevamente.' };
      }

      if (record.codigo !== inputCode.trim()) {
        await query(`UPDATE verification_codes SET intentos = COALESCE(intentos, 0) + 1 WHERE id = $1`, [record.id]);
        const remaining = MAX_ATTEMPTS - record.intentos - 1;
        return { valid: false, error: `Código incorrecto. ${remaining} intentos restantes.` };
      }

      await query(`UPDATE verification_codes SET usado = true WHERE id = $1`, [record.id]);

      const user = await queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [key]);
      return { valid: true, userId: user?.id };
    }
  } catch (err) {
    console.error('[verification-codes] DB verify failed, trying fallback:', err);
  }

  const entry = fallbackCodes.get(key);
  if (!entry) {
    return { valid: false, error: 'No hay código pendiente. Inicia sesión nuevamente.' };
  }

  if (Date.now() > entry.expires) {
    fallbackCodes.delete(key);
    return { valid: false, error: 'El código ha expirado. Inicia sesión nuevamente.' };
  }

  entry.attempts++;
  if (entry.attempts > MAX_ATTEMPTS) {
    fallbackCodes.delete(key);
    return { valid: false, error: 'Demasiados intentos. Inicia sesión nuevamente.' };
  }

  if (entry.code !== inputCode.trim()) {
    return { valid: false, error: `Código incorrecto. ${MAX_ATTEMPTS - entry.attempts} intentos restantes.` };
  }

  fallbackCodes.delete(key);
  return { valid: true, userId: entry.userId };
}

const fallbackCodes = new Map<string, { code: string; expires: number; userId: number; attempts: number }>();
const fallbackMagicTokens = new Map<string, { email: string; expires: number; userId: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of fallbackCodes) {
    if (now > entry.expires) {
      fallbackCodes.delete(key);
    }
  }
  for (const [key, entry] of fallbackMagicTokens) {
    if (now > entry.expires) {
      fallbackMagicTokens.delete(key);
    }
  }
}, 60 * 1000);
