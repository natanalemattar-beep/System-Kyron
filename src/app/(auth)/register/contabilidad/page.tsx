'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterContabilidadPage() {
  const router = useRouter();
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'contabilidad');
  }, []);

  return <RegisterJuridicoPage />;
}
