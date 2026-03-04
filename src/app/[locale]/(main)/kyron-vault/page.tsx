'use client';

/**
 * NODO NEUTRALIZADO
 * El acceso ha sido consolidado en /terminal para optimizar el árbol de rutas.
 */
import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function VaultMainRedirect() {
  useEffect(() => {
    redirect('/terminal');
  }, []);

  return null;
}