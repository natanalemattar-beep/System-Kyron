'use client';

import { useEffect } from 'react';
import RegisterJuridicoPage from '../juridico/page';

export default function RegisterSostenibilidadPage() {
  useEffect(() => {
    sessionStorage.setItem('kyron-register-module', 'sostenibilidad');
  }, []);

  return <RegisterJuridicoPage />;
}
