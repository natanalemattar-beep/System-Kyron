export const MODULE_PATH_MAP: Record<string, string> = {
  contabilidad: '/dashboard-empresas',
  juridico: '/dashboard-empresas',
  legal: '/escritorio-juridico',
  ventas: '/dashboard-empresas',
  tpv: '/dashboard-empresas',
  socios: '/dashboard-socios',
  sostenibilidad: '/sostenibilidad',
  telecom: '/mi-linea',
  rrhh: '/dashboard-empresas',
  nomina: '/dashboard-empresas',
  talento: '/dashboard-empresas',
  informatica: '/dashboard-it',
};

export function getDashboardPath(modules: string[]): string {
  for (const mod of modules) {
    const path = MODULE_PATH_MAP[mod];
    if (path) return path;
  }
  return '/dashboard';
}
