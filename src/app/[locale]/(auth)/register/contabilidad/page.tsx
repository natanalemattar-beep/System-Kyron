'use client';

import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterContabilidadPage() {
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'contabilidad');
  }, []);

  return <RegisterJuridicoPage />;
}
