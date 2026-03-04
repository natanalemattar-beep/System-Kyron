
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

/**
 * @fileOverview Redirección de seguridad para purgar el nodo conflictivo kyron-vault.
 */
export default function KyronVaultPurge() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
