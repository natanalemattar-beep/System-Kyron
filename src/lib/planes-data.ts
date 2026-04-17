/**
 * Constantes de planes exportadas de forma segura para uso en cliente y servidor.
 * NO importar db.ts aquí.
 */

export type PlanTier = 'personal' | 'profesional' | 'empresarial' | 'kyron_max';
export type CicloFacturacion = 'mensual' | 'anual';

export interface PlanMiLinea {
  id: string;
  nombre: string;
  datos: string;
  velocidad: string;
  precioMensualUSD: number;
  popular: boolean;
  color: string;
  minutosNacionales: string;
  mensajesSMS: string;
  llamadasInternacionales: string;
  caracteristicas: string[];
}

export const PLANES_MI_LINEA: PlanMiLinea[] = [
  { id: 'basico_2gb', nombre: 'Básico', datos: '2 GB', velocidad: '4G', precioMensualUSD: 3, popular: false, color: 'slate', minutosNacionales: '60 min', mensajesSMS: '30 SMS', llamadasInternacionales: 'No incluidas', caracteristicas: ['WhatsApp incluido', 'Redes sociales básicas'] },
  { id: 'conecta_5gb', nombre: 'Conecta', datos: '5 GB', velocidad: '4G LTE', precioMensualUSD: 5, popular: false, color: 'blue', minutosNacionales: '150 min', mensajesSMS: '80 SMS', llamadasInternacionales: 'No incluidas', caracteristicas: ['Redes sociales ilimitadas', 'Música streaming'] },
  { id: 'plus_10gb', nombre: 'Plus', datos: '10 GB', velocidad: '4G LTE', precioMensualUSD: 8, popular: false, color: 'indigo', minutosNacionales: '300 min', mensajesSMS: '150 SMS', llamadasInternacionales: '15 min', caracteristicas: ['Redes sociales ilimitadas', 'Streaming música y video SD', 'Roaming básico'] },
  { id: 'global_25gb', nombre: 'Global', datos: '25 GB', velocidad: '5G', precioMensualUSD: 14, popular: true, color: 'primary', minutosNacionales: 'Ilimitados', mensajesSMS: '500 SMS', llamadasInternacionales: '60 min', caracteristicas: ['Apps ilimitadas', 'Streaming HD', 'Roaming premium', 'Hotspot 10 GB'] },
  { id: 'ultra_50gb', nombre: 'Ultra', datos: '50 GB', velocidad: '5G', precioMensualUSD: 22, popular: false, color: 'cyan', minutosNacionales: 'Ilimitados', mensajesSMS: 'Ilimitados', llamadasInternacionales: '200 min', caracteristicas: ['Streaming 4K', 'Roaming global', 'Hotspot 25 GB', 'VPN incluida', 'Prioridad de red'] },
  { id: 'infinite', nombre: 'Infinite', datos: 'Ilimitado', velocidad: '5G Ultra', precioMensualUSD: 35, popular: false, color: 'violet', minutosNacionales: 'Ilimitados', mensajesSMS: 'Ilimitados', llamadasInternacionales: 'Ilimitadas', caracteristicas: ['Streaming 4K/8K', 'Roaming global premium', 'Hotspot ilimitado', 'VPN + seguridad avanzada', 'Soporte prioritario 24/7', 'eSIM múltiple'] },
];

export interface PlanLimites {
  consultasAI: number;
  alertasFiscales: number;
  alertasRegulatorias: number;
  facturasMensuales: number;
  empleadosNomina: number;
  clientesCRM: number;
  documentosLegales: number;
  lineasTelecom: number;
  reportesMensuales: number;
  usuariosConcurrentes: number;
  almacenamientoGB: number;
  chatAIMensajes: number;
  simuladorMultas: number;
  exportacionesExcel: number;
  consultasRIF: number;
  declaracionesAsistidas: number;
  blockchainProofs: number;
}

export interface PlanKyron {
  id: PlanTier;
  nombre: string;
  nombreCompleto: string;
  precioMensualUSD: number;
  precioAnualUSD: number;
  precioAnualMensualizado: number;
  ahorroAnualUSD: number;
  ahorroAnualPorcentaje: number;
  color: string;
  descripcion: string;
  destacado: boolean;
  limites: PlanLimites;
  modulosIncluidos: string[];
  etiqueta?: string;
}

const ILIMITADO = 999999;

export const PLANES: PlanKyron[] = [
  {
    id: 'personal', nombre: 'Personal', nombreCompleto: 'Kyron Personal',
    precioMensualUSD: 0, precioAnualUSD: 0, precioAnualMensualizado: 0,
    ahorroAnualUSD: 0, ahorroAnualPorcentaje: 0, color: '#22C55E',
    descripcion: 'Cuenta personal con herramientas básicas. Totalmente gratis, para siempre.',
    destacado: false, etiqueta: 'GRATIS',
    limites: { consultasAI: 30, alertasFiscales: 10, alertasRegulatorias: 5, facturasMensuales: 20, empleadosNomina: 0, clientesCRM: 25, documentosLegales: 5, lineasTelecom: 3, reportesMensuales: 3, usuariosConcurrentes: 1, almacenamientoGB: 3, chatAIMensajes: 50, simuladorMultas: 5, exportacionesExcel: 5, consultasRIF: 15, declaracionesAsistidas: 0, blockchainProofs: 10 },
    modulosIncluidos: ['Cuenta Personal completa', 'Tasa BCV en vivo', 'Chat AI (50 msgs/mes)', 'Alertas SENIAT (10/mes)', 'Consulta RIF/Cédula (15/mes)', 'Documentos personales', 'Dashboard personal', '1 usuario'],
  },
  {
    id: 'profesional', nombre: 'Profesional', nombreCompleto: 'Kyron Profesional',
    precioMensualUSD: 29, precioAnualUSD: 278, precioAnualMensualizado: 23,
    ahorroAnualUSD: 70, ahorroAnualPorcentaje: 20, color: '#0EA5E9',
    descripcion: 'Paquete completo: Contabilidad + Facturación + Mi Línea.',
    destacado: false, etiqueta: 'AHORRA 30%',
    limites: { consultasAI: 250, alertasFiscales: 50, alertasRegulatorias: 30, facturasMensuales: 500, empleadosNomina: 15, clientesCRM: 500, documentosLegales: 50, lineasTelecom: 10, reportesMensuales: 20, usuariosConcurrentes: 5, almacenamientoGB: 25, chatAIMensajes: 500, simuladorMultas: 50, exportacionesExcel: 50, consultasRIF: 100, declaracionesAsistidas: 12, blockchainProofs: 100 },
    modulosIncluidos: ['Todo en Personal +', 'Asesoría Contable VEN-NIF Pro', 'Facturación SENIAT (500/mes)', 'Mi Línea (10 líneas)', 'IA Avanzada (250 consultas)', 'Bóveda Digital (25GB)', 'Auditoría Fiscal en Tiempo Real', 'Simulador de multas COT Pro', 'Declaraciones asistidas (12/año)', '5 usuarios'],
  },
  {
    id: 'empresarial', nombre: 'Empresarial', nombreCompleto: 'Kyron Empresarial',
    precioMensualUSD: 59, precioAnualUSD: 566, precioAnualMensualizado: 47,
    ahorroAnualUSD: 142, ahorroAnualPorcentaje: 20, color: '#A78BFA',
    descripcion: 'Todo incluido para empresas en crecimiento.',
    destacado: true, etiqueta: 'MÁS POPULAR',
    limites: { consultasAI: 500, alertasFiscales: 100, alertasRegulatorias: 50, facturasMensuales: 1000, empleadosNomina: 50, clientesCRM: 1000, documentosLegales: 100, lineasTelecom: 20, reportesMensuales: 50, usuariosConcurrentes: 10, almacenamientoGB: 50, chatAIMensajes: 500, simuladorMultas: 100, exportacionesExcel: 100, consultasRIF: 200, declaracionesAsistidas: 24, blockchainProofs: 200 },
    modulosIncluidos: ['TODOS los módulos incluidos', 'Asesoría Contable avanzada', 'Asesoría Legal completa', 'Facturación ilimitada', 'Socios y Directivos', 'Mi Línea Jurídica (20 líneas)', 'IA avanzada (500 msgs/mes)', 'Alertas multicanal', 'Scoring de riesgo fiscal', '10 usuarios'],
  },
  {
    id: 'kyron_max', nombre: 'Kyron MAX', nombreCompleto: 'Kyron MAX — Sin Límites',
    precioMensualUSD: 149, precioAnualUSD: 1430, precioAnualMensualizado: 119,
    ahorroAnualUSD: 358, ahorroAnualPorcentaje: 20, color: '#F59E0B',
    descripcion: 'Todo ilimitado. IA sin restricciones, API dedicada, white-label y soporte VIP.',
    destacado: false, etiqueta: 'SIN LÍMITES',
    limites: { consultasAI: ILIMITADO, alertasFiscales: ILIMITADO, alertasRegulatorias: ILIMITADO, facturasMensuales: ILIMITADO, empleadosNomina: ILIMITADO, clientesCRM: ILIMITADO, documentosLegales: ILIMITADO, lineasTelecom: ILIMITADO, reportesMensuales: ILIMITADO, usuariosConcurrentes: ILIMITADO, almacenamientoGB: ILIMITADO, chatAIMensajes: ILIMITADO, simuladorMultas: ILIMITADO, exportacionesExcel: ILIMITADO, consultasRIF: ILIMITADO, declaracionesAsistidas: ILIMITADO, blockchainProofs: ILIMITADO },
    modulosIncluidos: ['TODOS los módulos sin restricción', 'IA Claude ilimitado 24/7', 'Facturación ilimitada', 'Mi Línea Jurídica ilimitada', 'Asesoría Contable MAX', 'Asesoría Legal MAX', 'API dedicada + White-label', 'Soporte prioritario VIP', 'Usuarios ilimitados', 'Almacenamiento ilimitado'],
  },
];

export function obtenerPlan(tier: PlanTier): PlanKyron {
  return PLANES.find(p => p.id === tier) || PLANES[0];
}

export function obtenerTodosLosPlanes(): PlanKyron[] {
  return PLANES;
}

export function esIlimitado(valor: number): boolean {
  return valor >= ILIMITADO;
}

export function formatearLimite(valor: number): string {
  if (valor >= ILIMITADO) return 'Ilimitado';
  if (valor === 0) return 'No incluido';
  return valor.toLocaleString('es-VE');
}

export function calcularPrecio(plan: PlanKyron, ciclo: CicloFacturacion) {
  if (ciclo === 'anual') {
    return {
      precioTotal: plan.precioAnualUSD,
      precioMensualEfectivo: plan.precioAnualMensualizado,
      ahorro: plan.ahorroAnualUSD,
      ahorroPorc: plan.ahorroAnualPorcentaje,
      etiquetaPrecio: plan.precioAnualUSD === 0 ? 'Gratis' : `$${plan.precioAnualUSD}/año ($${plan.precioAnualMensualizado}/mes)`,
    };
  }
  return {
    precioTotal: plan.precioMensualUSD,
    precioMensualEfectivo: plan.precioMensualUSD,
    ahorro: 0,
    ahorroPorc: 0,
    etiquetaPrecio: plan.precioMensualUSD === 0 ? 'Gratis' : `$${plan.precioMensualUSD}/mes`,
  };
}
