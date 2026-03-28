import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production');
}
const SECRET = new TextEncoder().encode(
    jwtSecret ?? 'system-kyron-dev-secret-key-not-for-production'
);
const COOKIE_NAME = 'sk_session';
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

export interface SessionPayload {
    userId: number;
    email: string;
    tipo: 'natural' | 'juridico';
    nombre: string;
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

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
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
            maxAge: EXPIRES_IN,
            path: '/',
        },
    };
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
