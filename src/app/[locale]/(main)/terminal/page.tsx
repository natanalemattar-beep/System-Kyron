'use client';

import { useEffect } from 'react';
import { redirect } from '@/navigation';

/**
 * NODO DE REDIRECCIÓN TÉCNICA
 * Mueve el tráfico heredado al nodo maestro /kyron-vault.
 */
export default function TerminalRedirect() {
  useEffect(() => {
    redirect('/kyron-vault');
  }, []);

  return null;
}
