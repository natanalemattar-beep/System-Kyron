'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getModuleFromPath(path: string): string {
  const p = path.replace(/^\/(es|en)/, '');
  if (!p || p === '/') return 'landing';
  if (p.startsWith('/login') || p.startsWith('/register')) return 'auth';
  if (
    p.startsWith('/dashboard-empresa') ||
    p.startsWith('/resumen-negocio') ||
    p.startsWith('/contabilidad') ||
    p.startsWith('/facturas') ||
    p.startsWith('/transacciones') ||
    p.startsWith('/cuentas-por') ||
    p.startsWith('/cuentas') ||
    p.startsWith('/libro-') ||
    p.startsWith('/inventario') ||
    p.startsWith('/declaracion-') ||
    p.startsWith('/islr-') ||
    p.startsWith('/ajuste-por-inflacion') ||
    p.startsWith('/analisis-rentabilidad') ||
    p.startsWith('/pasarelas-pago') ||
    p.startsWith('/reportes') ||
    p.startsWith('/tramites-fiscales') ||
    p.startsWith('/sector-energetico') ||
    p.startsWith('/proformas') ||
    p.startsWith('/automatizaciones') ||
    p.startsWith('/configuracion') ||
    p.startsWith('/notificaciones') ||
    p.startsWith('/perfil-empresa')
  ) return 'admin';
  if (
    p.startsWith('/dashboard-rrhh') ||
    p.startsWith('/nominas') ||
    p.startsWith('/reclutamiento') ||
    p.startsWith('/prestaciones-sociales') ||
    p.startsWith('/clima-organizacional') ||
    p.startsWith('/salud-seguridad') ||
    p.startsWith('/desarrollo-personal')
  ) return 'hr';
  if (
    p.startsWith('/escritorio-juridico') ||
    p.startsWith('/contratos') ||
    p.startsWith('/permisos') ||
    p.startsWith('/gaceta-6952') ||
    p.startsWith('/acta-asamblea') ||
    p.startsWith('/poderes-representacion') ||
    p.startsWith('/recover-legal')
  ) return 'legal';
  if (
    p.startsWith('/mi-linea') ||
    p.startsWith('/flota-empresarial') ||
    p.startsWith('/venta-linea') ||
    p.startsWith('/telecom')
  ) return 'telecom';
  if (
    p.startsWith('/sostenibilidad') ||
    p.startsWith('/mercado-ecocreditos') ||
    p.startsWith('/generador-documentos') ||
    p.startsWith('/academia-kyron') ||
    p.startsWith('/ingenieria-ia') ||
    p.startsWith('/data-entry') ||
    p.startsWith('/marketing') ||
    p.startsWith('/estrategias-ventas') ||
    p.startsWith('/ventas') ||
    p.startsWith('/punto-de-venta') ||
    p.startsWith('/analisis')
  ) return 'main';
  if (
    p.startsWith('/cuenta-personal') ||
    p.startsWith('/documentos') ||
    p.startsWith('/tarjeta-digital') ||
    p.startsWith('/tarjeta-reciclaje') ||
    p.startsWith('/dashboard') ||
    p.startsWith('/perfil') ||
    p.startsWith('/partidas-nacimiento') ||
    p.startsWith('/antecedentes-penales') ||
    p.startsWith('/actas-matrimonio') ||
    p.startsWith('/registro-rif') ||
    p.startsWith('/directorio-medico') ||
    p.startsWith('/manutencion') ||
    p.startsWith('/seguridad')
  ) return 'natural';
  return 'other';
}

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem('_sk_vid');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('_sk_vid', id);
    }
    return id;
  } catch {
    return 'unknown';
  }
}

export function PageTracker({ userId }: { userId?: number | null }) {
  const pathname = usePathname();
  const lastTracked = useRef<string>('');

  useEffect(() => {
    if (pathname === lastTracked.current) return;
    lastTracked.current = pathname;

    const visitorId = getOrCreateVisitorId();
    const module = getModuleFromPath(pathname);

    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        visitor_id: visitorId,
        user_id: userId ?? null,
        module,
      }),
    }).catch(() => {});
  }, [pathname, userId]);

  return null;
}
