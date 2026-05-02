import { query, queryOne } from '@/lib/db';
import { encryptIfNotEmpty } from '@/lib/encryption';
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

/**
 * Normaliza un número de teléfono al formato internacional (+58...)
 */
export function normalizePhone(phone: string): string {
  let normalized = phone.replace(/[\s\-\(\)]/g, '');
  if (normalized.startsWith('0')) normalized = `+58${normalized.slice(1)}`;
  else if (normalized.startsWith('58')) normalized = `+${normalized}`;
  else if (!normalized.startsWith('+')) normalized = `+${normalized}`;
  return normalized;
}

/**
 * Enmascara un número de teléfono para privacidad
 */
export function maskPhone(phone: string): string {
  const clean = phone.replace(/[^\d]/g, '');
  if (clean.length >= 10) {
    return `****${clean.slice(-4)}`;
  }
  return `****${clean.slice(-3)}`;
}

export async function storeMagicToken(email: string, token: string, _userId?: number): Promise<void> {
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);
  const hashed = hashToken(token);
  await query(
    `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito)
     VALUES ($1, 'email', $2, $3, 'magic_link')`,
    [email.toLowerCase(), hashed, expiresAt]
  );
}

export async function verifyMagicToken(token: string): Promise<{ valid: boolean; email?: string; userId?: number; error?: string }> {
  const hashed = hashToken(token);

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

  if (!record) {
    return { valid: false, error: 'Enlace inválido o expirado. Inicia sesión nuevamente.' };
  }

  const user = await queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [record.destino]);
  return { valid: true, email: record.destino, userId: user?.id };
}

export type VerificationPurpose = 'verification' | 'registration' | '2fa' | 'reset_password' | 'sensitive_action' | 'magic_link';

export async function storeCode(
  destino: string, 
  code: string, 
  proposito: VerificationPurpose = 'verification',
  tipo: 'email' | 'sms' | 'whatsapp' = 'email'
): Promise<void> {
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS);
  await query(
    `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito)
     VALUES ($1, $2, $3, $4, $5)`,
    [destino.toLowerCase(), tipo, code, expiresAt, proposito]
  );
}

export async function verifyCode(
  destino: string, 
  inputCode: string, 
  proposito: VerificationPurpose = 'verification'
): Promise<{ valid: boolean; userId?: number; error?: string }> {
  const key = destino.toLowerCase();

  // Usamos Row Level Locking para evitar race conditions
  const record = await queryOne<{ id: number; codigo: string; intentos: number }>(
    `SELECT id, codigo, COALESCE(intentos, 0) as intentos FROM verification_codes
     WHERE destino = $1 AND usado = false AND expires_at > NOW()
     AND proposito = $2
     ORDER BY created_at DESC LIMIT 1
     FOR UPDATE`,
    [key, proposito]
  );

  if (!record) {
    return { valid: false, error: 'Código inválido o expirado. Solicita uno nuevo.' };
  }

  if (record.intentos >= MAX_ATTEMPTS) {
    return { valid: false, error: 'Demasiados intentos fallidos. Solicita un nuevo código.' };
  }

  if (record.codigo !== inputCode.trim()) {
    await query(`UPDATE verification_codes SET intentos = COALESCE(intentos, 0) + 1 WHERE id = $1`, [record.id]);
    const remaining = MAX_ATTEMPTS - record.intentos - 1;
    return { valid: false, error: `Código incorrecto. ${remaining} intentos restantes.` };
  }

  // Marcar como usado
  await query(`UPDATE verification_codes SET usado = true WHERE id = $1`, [record.id]);

  // Intentar obtener el usuario (búsqueda dual email/teléfono, con soporte para teléfono encriptado)
  const looksLikeEmail = key.includes('@');
  const encPhone = !looksLikeEmail ? encryptIfNotEmpty(key.replace(/\D/g, '')) : null;
  const user = await queryOne<{ id: number }>(
    `SELECT id FROM users WHERE email = $1 OR telefono = $1 OR ($2 IS NOT NULL AND telefono = $2)`,
    [key, encPhone]
  );
  return { valid: true, userId: user?.id };
}

