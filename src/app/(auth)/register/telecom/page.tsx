'use client';

import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterTelecomPage() {
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'telecom');
  }, []);

  return <RegisterJuridicoPage />;
}
