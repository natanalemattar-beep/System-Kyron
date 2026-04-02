'use client';

import { usePathname } from '@/navigation';
import { Link } from '@/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const routeLabels: Record<string, string> = {
  'dashboard': 'Dashboard',
  'dashboard-rrhh': 'RRHH',
  'dashboard-contable': 'Contabilidad',
  'dashboard-legal': 'Legal',
  'dashboard-telecom': 'Telecom',
  'dashboard-informatica': 'IT',
  'dashboard-socios': 'Socios',
  'nomina': 'Nómina',
  'registro-empleados': 'Empleados',
  'aportes-parafiscales': 'Aportes Parafiscales',
  'clima-organizacional': 'Clima Organizacional',
  'configuracion': 'Configuración',
  'notificaciones': 'Notificaciones',
  'perfil': 'Perfil',
  'contabilidad': 'Contabilidad',
  'facturacion': 'Facturación',
  'facturacion-corporativa': 'Facturación Corp.',
  'arqueo-caja': 'Arqueo de Caja',
  'declaraciones-anteriores': 'Declaraciones',
  'ingenieria': 'Ingeniería',
  'marketing': 'Marketing',
  'contratos': 'Contratos',
  'carpeta-legal': 'Carpeta Legal',
  'escritorio-juridico': 'Escritorio Jurídico',
  'gaceta-oficial': 'Gaceta Oficial',
  'mi-linea': 'Mi Línea',
  'facturas-linea': 'Facturas Línea',
  'esim': 'eSIM',
  'reportes': 'Reportes',
  'flota-empresarial': 'Flota Empresarial',
  'conatel': 'CONATEL',
  'registro-rif': 'Registro RIF',
  'certificaciones': 'Certificaciones',
  'aporte-70': 'Aporte 70%',
  'ministerio-industrias': 'Min. Industrias',
  'mercado-ecocreditos': 'Eco-Créditos',
  'activos-inmobiliarios': 'Activos Inmobiliarios',
  'seguridad': 'Seguridad',
  'respaldos': 'Respaldos',
  'estrategias-ventas': 'Estrategias Ventas',
  'socios': 'Socios',
  'permisos': 'Permisos',
  'carnets': 'Carnets',
  'manual-usuario': 'Manual de Usuario',
  'permisologia': 'Permisología',
  'solicitudes': 'Solicitudes',
  'automatizacion': 'Automatización',
};

function getLabel(segment: string): string {
  return routeLabels[segment] || segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

interface BreadcrumbsProps {
  dashboardHref?: string;
  className?: string;
}

export function Breadcrumbs({ dashboardHref = '/dashboard', className }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter(s => !['es', 'en'].includes(s));
  
  if (segments.length <= 1) return null;

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = getLabel(segment);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-[11px] text-muted-foreground", className)}>
      <Link 
        href={dashboardHref as any}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3 w-3" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          {crumb.isLast ? (
            <span className="text-foreground/70 font-medium truncate max-w-[140px]">{crumb.label}</span>
          ) : (
            <Link 
              href={crumb.href as any}
              className="hover:text-foreground transition-colors truncate max-w-[120px]"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
