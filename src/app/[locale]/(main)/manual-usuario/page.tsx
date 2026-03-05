
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview NODO PURGADO - REDIRECCIÓN DE SEGURIDAD
 * Este punto de entrada ha sido desactivado para resolver el conflicto de rutas paralelas.
 * La documentación oficial reside ahora en la ruta raíz: /manual-usuario
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
