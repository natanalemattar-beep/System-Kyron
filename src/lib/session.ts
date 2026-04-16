
export async function getSession() {
  return { user: { id: 1, name: 'Admin User', role: 'admin' } };
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}
