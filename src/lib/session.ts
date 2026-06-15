import { getSession as getSessionFromAuth } from '@/lib/auth';

export async function getSession() {
  return getSessionFromAuth();
}

export async function requireAuth() {
  const session = await getSessionFromAuth();
  if (!session) throw new Error('Unauthorized');
  return session;
}
