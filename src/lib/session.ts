import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'sk_session';

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return null;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    return {
      user: {
        id: payload.userId as number,
        email: payload.email as string,
        tipo: payload.tipo as string,
        nombre: payload.nombre as string,
        role: payload.tipo === 'admin' ? 'admin' : 'user',
      },
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}