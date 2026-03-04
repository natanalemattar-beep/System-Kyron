
'use client';

import { redirect } from '@/navigation';
import { useEffect } from 'react';

export default function KyronVaultRedirect() {
  useEffect(() => {
    redirect('/sector-privado-system-kyron');
  }, []);

  return null;
}
