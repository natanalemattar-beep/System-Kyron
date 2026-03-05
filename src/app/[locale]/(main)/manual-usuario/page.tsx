
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview NODO DESACTIVADO - RESOLUCIÓN DE CONFLICTO DE RUTAS.
 * Este archivo ha sido purgado para evitar la colisión de páginas paralelas en Next.js.
 * El Manual de Usuario oficial se encuentra ahora en el nodo raíz: /manual-usuario
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
