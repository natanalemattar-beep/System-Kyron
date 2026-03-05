
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview Redirección de seguridad para purgar el nodo conflictivo del grupo (main).
 * Se consolida la documentación en la ruta raíz para evitar errores de páginas paralelas en Next.js.
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
