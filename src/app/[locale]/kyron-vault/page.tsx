'use client';

/**
 * NODO NEUTRALIZADO
 * Este archivo ha sido desactivado para resolver el conflicto de rutas paralelas.
 * La inteligencia estratégica reside ahora en el nodo maestro /terminal.
 */
import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function VaultRedirect() {
  useEffect(() => {
    redirect('/terminal');
  }, []);

  return null;
}