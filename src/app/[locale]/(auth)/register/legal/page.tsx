'use client';

import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterLegalPage() {
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'legal');
  }, []);

  return <RegisterJuridicoPage />;
}
