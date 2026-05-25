import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const SALT = 'kyron-file-encryption-v1';

let cachedKey: Buffer | null = null;

function getFileEncryptionKey(): Buffer {
  if (cachedKey) return cachedKey;
  const secret = process.env.FILE_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('[file-crypto] FILE_ENCRYPTION_KEY or ENCRYPTION_KEY is required');
  }
  cachedKey = scryptSync(secret, SALT, KEY_LENGTH);
  return cachedKey;
}

export function encryptFile(buffer: Buffer): Buffer {
  const key = getFileEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]);
}

export function decryptFile(encryptedBuffer: Buffer): Buffer {
  const key = getFileEncryptionKey();

  if (encryptedBuffer.length < IV_LENGTH + TAG_LENGTH) {
    throw new Error('Archivo cifrado corrupto o incompleto');
  }

  const iv = encryptedBuffer.subarray(0, IV_LENGTH);
  const authTag = encryptedBuffer.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const encrypted = encryptedBuffer.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}
