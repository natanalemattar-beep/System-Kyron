'use client';

import { useEffect } from 'react';
import { redirect } from '@/navigation';

/**
 * NODO DE REDIRECCIÓN ESTRATÉGICA
 * Neutraliza el conflicto de rutas paralelas moviendo el tráfico al nodo profesional.
 */
export default function KyronVaultRedirect() {
  useEffect(() => {
    redirect('/kyron-vault');
  }, []);

  return null;
}
