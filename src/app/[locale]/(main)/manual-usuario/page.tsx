
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview Redirección de seguridad para resolver el conflicto de rutas paralelas.
 * Este nodo en (main) ha sido purgado para consolidar la documentación en el nodo raíz.
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
