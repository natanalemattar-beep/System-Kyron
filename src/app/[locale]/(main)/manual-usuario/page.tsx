
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview NODO PURGADO - REDIRECCIÓN DE SEGURIDAD.
 * Se ha desactivado este punto de entrada para eliminar el conflicto de rutas paralelas.
 * Toda la documentación reside ahora en el nodo institucional /manual-usuario.
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
