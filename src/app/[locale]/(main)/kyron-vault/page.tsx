'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * NODO DEPURADO - PROTOCOLO DE SEGURIDAD
 * Esta ruta ha sido migrada al Sector Privado para evitar colisiones de sistema.
 */
export default function KyronVaultMainRedirect() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
