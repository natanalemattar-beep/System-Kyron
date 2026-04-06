import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { seedAlertAutomationRules } from '@/lib/automation-engine';

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if (session.tipo !== 'admin') {
    return NextResponse.json({ error: 'Acceso restringido a administradores' }, { status: 403 });
  }

  try {
    const count = await seedAlertAutomationRules();
    return NextResponse.json({ success: true, rules_inserted: count });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
