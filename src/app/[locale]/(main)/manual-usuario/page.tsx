
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview Redirección de seguridad para purgar el nodo conflictivo del grupo (main).
 * Se mantiene este archivo temporalmente como puente hacia la ruta raíz consolidada.
 */
export default function ManualUsuarioRedirect() {
  useEffect(() => {
    redirect('/manual-usuario');
  }, []);

  return null;
}
