import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32;
const ENCODING = 'base64' as const;
const PREFIX = 'ENC:';

let cachedKey: Buffer | null = null;

function getEncryptionKey(): Buffer {
    if (cachedKey) return cachedKey;
    const secret = process.env.ENCRYPTION_KEY;
    if (!secret) {
        // Fallback robusto por si en Vercel no está ni ENCRYPTION_KEY ni JWT_SECRET
        const jwtSecret = process.env.JWT_SECRET || 'kyron_secret_key_fixed_2026_fallback_xyz123';
        console.warn('[encryption] ENCRYPTION_KEY no está definida. Usando fallback de seguridad.');
        cachedKey = scryptSync(jwtSecret + ':encryption-derived', 'kyron-aes256-derived-salt', KEY_LENGTH);
        return cachedKey;
    }
    cachedKey = scryptSync(secret, 'kyron-aes256-salt', KEY_LENGTH);
    return cachedKey;
}

export function encrypt(plaintext: string): string {
    if (!plaintext || plaintext.startsWith(PREFIX)) return plaintext;

    const key = getEncryptionKey();
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plaintext, 'utf8', ENCODING);
    encrypted += cipher.final(ENCODING);
    const tag = cipher.getAuthTag();

    const result = Buffer.concat([
        iv,
        tag,
        Buffer.from(encrypted, ENCODING),
    ]).toString(ENCODING);

    return PREFIX + result;
}

export function decrypt(ciphertext: string): string {
    if (!ciphertext || !ciphertext.startsWith(PREFIX)) return ciphertext;

    try {
        const key = getEncryptionKey();
        const data = Buffer.from(ciphertext.slice(PREFIX.length), ENCODING);

        if (data.length < IV_LENGTH + TAG_LENGTH) {
            throw new Error('Cifrado incompleto o corrupto');
        }

        const iv = data.subarray(0, IV_LENGTH);
        const tag = data.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
        const encrypted = data.subarray(IV_LENGTH + TAG_LENGTH);

        const decipher = createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(tag);

        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    } catch (err: any) {
        console.error('CRITICAL LOGIN ERROR:', {
            message: err.message,
            stack: err.stack,
            cause: err.cause
        });
        return '[ERROR_DECRYPT]';
    }
}

export function isEncrypted(value: string): boolean {
    return typeof value === 'string' && value.startsWith(PREFIX);
}

export function encryptIfNotEmpty(value: unknown): string {
    if (value === null || value === undefined || value === '') return '';
    return encrypt(String(value));
}

export function decryptIfEncrypted(value: unknown): string {
    if (value === null || value === undefined || value === '') return '';
    const str = String(value);
    if (isEncrypted(str)) return decrypt(str);
    return str;
}

export function encryptSensitiveFields<T extends Record<string, unknown>>(
    obj: T,
    fields: (keyof T)[]
): T {
    const result = { ...obj };
    for (const field of fields) {
        const val = result[field];
        if (val && typeof val === 'string' && val.length > 0) {
            result[field] = encrypt(val) as T[keyof T];
        }
    }
    return result;
}

export function decryptSensitiveFields<T extends Record<string, unknown>>(
    obj: T,
    fields: (keyof T)[]
): T {
    const result = { ...obj };
    for (const field of fields) {
        const val = result[field];
        if (val && typeof val === 'string' && isEncrypted(val)) {
            result[field] = decrypt(val) as T[keyof T];
        }
    }
    return result;
}
