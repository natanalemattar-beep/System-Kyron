'use client';

import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterRRHHPage() {
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'rrhh');
  }, []);

  return <RegisterJuridicoPage />;
}
