'use client';

/**
 * NODO REDIRIGIDO - SEGURIDAD NIVEL 5
 * El acceso a la Bóveda Maestra ha sido reubicado al Sector Privado
 * para evitar colisiones estructurales en el árbol de rutas de Next.js.
 */
import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function VaultRedirect() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
