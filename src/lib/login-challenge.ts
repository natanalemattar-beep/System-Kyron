import crypto from 'crypto';

const CHALLENGE_EXPIRY_MS = 15 * 60 * 1000;
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const SECRET: string = process.env.JWT_SECRET;

export function createLoginChallenge(email: string, userId: number): string {
  const payload = {
    e: email.toLowerCase(),
    u: userId,
    t: Date.now(),
    n: crypto.randomBytes(8).toString('hex'),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyLoginChallenge(token: string, email: string): { valid: boolean; userId?: number } {
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return { valid: false };

    const expectedSig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.e !== email.toLowerCase()) return { valid: false };
    if (Date.now() - payload.t > CHALLENGE_EXPIRY_MS) return { valid: false };

    return { valid: true, userId: payload.u };
  } catch {
    return { valid: false };
  }
}
