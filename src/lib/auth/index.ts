import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { query } from '@/lib/db';

const jwtSecret = process.env.JWT_SECRET;

function getSecret() {
  if (!jwtSecret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET no configurado — la autenticación no puede funcionar en producción');
    }
    console.error('[auth] JWT_SECRET not configured — using fallback (DEV ONLY)');
    return new TextEncoder().encode('fallback_only_dev_no_prod');
  }
  return new TextEncoder().encode(jwtSecret);
}

const SECRET = getSecret();
const COOKIE_NAME = 'sk_session';
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

export interface SessionPayload {
    userId: number;
    email: string;
    tipo: 'natural' | 'juridico' | 'admin';
    nombre: string;
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function insertUserSession(
  token: string,
  userId: number,
  ip?: string,
  userAgent?: string
): Promise<void> {
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + EXPIRES_IN * 1000);
  await query(
    `INSERT INTO user_sessions (user_id, token_hash, ip, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (token_hash) DO UPDATE SET
       ip = EXCLUDED.ip,
       user_agent = EXCLUDED.user_agent`,
    [userId, tokenHash, ip || null, userAgent || null, expiresAt]
  );
}

export async function removeUserSession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await query(`DELETE FROM user_sessions WHERE token_hash = $1`, [tokenHash]);
}

export async function createToken(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload as unknown as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${EXPIRES_IN}s`)
        .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<{ user: { id: number; email: string; tipo: string; nombre: string; role: string } } | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload) return null;
    return {
        user: {
            id: payload.userId,
            email: payload.email,
            tipo: payload.tipo,
            nombre: payload.nombre,
            role: payload.tipo === 'admin' ? 'admin' as const : 'user' as const,
        },
    };
}

export function setSessionCookie(token: string): {
    name: string;
    value: string;
    options: Record<string, unknown>;
} {
    return {
        name: COOKIE_NAME,
        value: token,
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        },
    };
}


export const COOKIE_NAME_EXPORT = COOKIE_NAME;

export async function verifyAuth(): Promise<{ user: { id: number; email: string; tipo: string; nombre: string; role: string } } | null> {
  return getSession();
}
