'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';

const MODULE_ROUTE_MAP: Record<string, string[]> = {
  admin: ['contabilidad', 'facturacion', 'inventario', 'nomina', 'tesoreria', 'asesoria-contable', 'contabilidad-comunal', 'rendicion-cuentas', 'presupuesto-participativo', 'contraloria-social', 'presupuesto-publico', 'sigecof', 'rendicion-cgr', 'onapre', 'transparencia'],
  telecom: ['telecom', 'telecomunicaciones'],
  ventas: ['tpv', 'ventas-estrategia', 'inventario', 'fidelizacion', 'ventas'],
  hr: ['rrhh', 'talento-humano', 'nomina', 'contabilidad', 'facturacion', 'asesoria-contable', 'ivss', 'inces', 'banavih'],
  legal: ['legal', 'asesoria-legal', 'permisologia', 'contabilidad', 'facturacion', 'asesoria-contable'],
  socios: ['socios', 'gestion-socios'],
  informatica: ['informatica', 'it', 'sistemas'],
};

const LAYOUT_DASHBOARD_MAP: Record<string, string> = {
  admin: '/dashboard-empresa',
  telecom: '/dashboard-telecom',
  ventas: '/estrategias-ventas',
  hr: '/dashboard-rrhh',
  legal: '/escritorio-juridico',
  socios: '/dashboard-socios',
  informatica: '/dashboard-it',
};

function getUserDefaultDashboard(modules: string[], tipo: string): string {
  if (tipo === 'juridico' || tipo === 'admin') {
    for (const mod of modules) {
      if (MODULE_ROUTE_MAP.admin.includes(mod)) return '/dashboard-empresa';
    }
    for (const mod of modules) {
      if (MODULE_ROUTE_MAP.ventas.includes(mod)) return '/estrategias-ventas';
    }
  }
  return '/dashboard';
}

interface ModuleGuardProps {
  layoutKey: string;
  children: React.ReactNode;
}

export function ModuleGuard({ layoutKey, children }: ModuleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      setChecked(true);
      setAuthorized(false);
      return;
    }

    if (layoutKey === 'natural') {
      setAuthorized(true);
      setChecked(true);
      return;
    }

    if (layoutKey === 'main') {
      setAuthorized(true);
      setChecked(true);
      return;
    }

    const userModules = user.modules || [];

    if (userModules.length === 0 && user.tipo === 'natural') {
      setAuthorized(layoutKey === 'natural');
      if (layoutKey !== 'natural') {
        router.replace('/dashboard');
      }
      setChecked(true);
      return;
    }

    const requiredModules = MODULE_ROUTE_MAP[layoutKey];
    if (!requiredModules) {
      setAuthorized(true);
      setChecked(true);
      return;
    }

    const hasAccess = userModules.some(mod => requiredModules.includes(mod));

    if (hasAccess) {
      setAuthorized(true);
    } else {
      const redirectTo = getUserDefaultDashboard(userModules, user.tipo);
      router.replace(redirectTo);
      setAuthorized(false);
    }
    setChecked(true);
  }, [user, isLoading, layoutKey, router]);

  if (isLoading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
