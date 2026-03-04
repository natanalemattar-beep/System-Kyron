'use client';

/**
 * NODO NEUTRALIZADO
 * Este punto de entrada ha sido desactivado permanentemente para
 * resolver el conflicto de rutas paralelas. La inteligencia reside ahora
 * en el Sector Privado de System Kyron (/sector-privado-system-kyron).
 */
import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function OldVaultRedirect() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
