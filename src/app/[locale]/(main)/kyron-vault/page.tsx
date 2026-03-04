
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function KyronVaultMainRedirect() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
