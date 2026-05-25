export const MODULE_PATH_MAP: Record<string, string> = {
  contabilidad: '/dashboard-empresa',
  juridico: '/dashboard-empresa',
  legal: '/escritorio-juridico',
  ventas: '/dashboard-empresa',
  tpv: '/dashboard-empresa',
  socios: '/dashboard-socios',
  sostenibilidad: '/sostenibilidad',
  telecom: '/mi-linea',
  rrhh: '/dashboard-empresa',
  nomina: '/dashboard-empresa',
  talento: '/dashboard-empresa',
  informatica: '/dashboard-it',
};

export function getDashboardPath(modules: string[]): string {
  for (const mod of modules) {
    const path = MODULE_PATH_MAP[mod];
    if (path) return path;
  }
  return '/dashboard';
}
