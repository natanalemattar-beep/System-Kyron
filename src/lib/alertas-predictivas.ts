import { query, queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

interface ObligacionFiscal {
  nombre: string;
  tipo: string;
  periodicidad: 'mensual' | 'anual' | 'trimestral';
  diasAntes: number[];
  calcularFecha: (rifTerminal: number, mes: number, anio: number) => Date | null;
}

const CALENDARIO_SENIAT: Record<number, { desde: number; hasta: number }> = {
  0: { desde: 12, hasta: 12 },
  1: { desde: 13, hasta: 14 },
  2: { desde: 14, hasta: 15 },
  3: { desde: 15, hasta: 16 },
  4: { desde: 16, hasta: 17 },
  5: { desde: 17, hasta: 18 },
  6: { desde: 18, hasta: 19 },
  7: { desde: 19, hasta: 21 },
  8: { desde: 21, hasta: 23 },
  9: { desde: 23, hasta: 27 },
};

function getFechaVencimientoIVA(rifTerminal: number, mes: number, anio: number): Date | null {
  const cal = CALENDARIO_SENIAT[rifTerminal];
  if (!cal) return null;
  return new Date(anio, mes - 1, cal.hasta);
}

interface RiesgoMulta {
  ente: string;
  siglas: string;
  descripcion: string;
  montoMulta: string;
  baseLegal: string;
}

interface ObligacionExtendida extends ObligacionFiscal {
  ente: string;
  siglas: string;
  riesgoMulta: RiesgoMulta;
}

const OBLIGACIONES_SENIAT: ObligacionExtendida[] = [
  {
    nombre: 'Declaración de IVA',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por declaración extemporánea de IVA',
      montoMulta: '150 a 300 UT + intereses moratorios (1.2x tasa activa BCV)',
      baseLegal: 'COT Art. 103, Ley de IVA (G.O. 6.507)',
    },
  },
  {
    nombre: 'Retención de IVA (Contribuyentes Especiales)',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por no retener o enterar retenciones de IVA',
      montoMulta: '500% del tributo no retenido + prisión 4-6 años (Art. 118 COT)',
      baseLegal: 'Providencia SNAT/2015/0049, COT Art. 118',
    },
  },
  {
    nombre: 'Retención de ISLR',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por no retener o enterar retenciones de ISLR',
      montoMulta: '500% del tributo no retenido + responsabilidad solidaria',
      baseLegal: 'Decreto 1.808, COT Art. 112-113',
    },
  },
  {
    nombre: 'Declaración de IGTF',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: getFechaVencimientoIVA,
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por omisión de IGTF en transacciones con divisas/cripto',
      montoMulta: '100 a 500 UT + suspensión de RIF hasta por 90 días',
      baseLegal: 'Ley de IGTF (G.O. 6.687), Providencia SNAT/2022/000013',
    },
  },
  {
    nombre: 'Declaración Definitiva ISLR',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3, 1],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por declaración anual extemporánea de ISLR',
      montoMulta: '150% del tributo omitido + intereses moratorios + recargos',
      baseLegal: 'Ley de ISLR (G.O. 6.210), COT Art. 103-104',
    },
  },
  {
    nombre: 'Impuesto a los Grandes Patrimonios (IGP)',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3, 1],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por omisión del IGP',
      montoMulta: '150% del impuesto omitido + clausura temporal',
      baseLegal: 'Ley Constitucional que crea el IGP (G.O. 41.667)',
    },
  },
  {
    nombre: 'Facturación Fiscal — Libros de Compra y Venta',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'mensual',
    diasAntes: [5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 20),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Clausura por no llevar libros o facturación irregular',
      montoMulta: 'Clausura 5-10 días + multa 150 UT por cada libro faltante',
      baseLegal: 'Providencia 0071 (G.O. 39.795), COT Art. 101-102',
    },
  },
  {
    nombre: 'Declaración Estimada de ISLR',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por no presentar la declaración estimada de ISLR',
      montoMulta: '100-300 UT + ajuste fiscal con intereses moratorios',
      baseLegal: 'Ley de ISLR (G.O. 6.210) Art. 83, COT Art. 103',
    },
  },
  {
    nombre: 'Precios de Transferencia (Informe PT)',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por no presentar informe de precios de transferencia con partes vinculadas',
      montoMulta: '1.000-2.000 UT + ajuste de base imponible + intereses moratorios',
      baseLegal: 'Ley de ISLR Art. 111-170, Providencia SNAT/2003/0032',
    },
  },
  {
    nombre: 'Impuesto sobre Sucesiones, Donaciones y Ramos Conexos',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por omisión de declaración de sucesiones o donaciones',
      montoMulta: '100-500 UT + intereses de mora + retención de bienes heredados',
      baseLegal: 'Ley de Impuesto sobre Sucesiones, Donaciones y Demás Ramos Conexos (G.O. 5.391)',
    },
  },
  {
    nombre: 'Timbres Fiscales — Renovación',
    tipo: 'fiscal',
    ente: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    siglas: 'SENIAT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 31),
    riesgoMulta: {
      ente: 'SENIAT',
      siglas: 'SENIAT',
      descripcion: 'Multa por documentos sin timbres fiscales o inutilización de documentos',
      montoMulta: '50-200 UT + nulidad del documento sin timbre',
      baseLegal: 'Ley de Timbre Fiscal (G.O. 5.416), Art. 22-31',
    },
  },
];

const OBLIGACIONES_PARAFISCALES: ObligacionExtendida[] = [
  {
    nombre: 'Aportes al IVSS (Seguro Social Obligatorio)',
    tipo: 'parafiscal',
    ente: 'Instituto Venezolano de los Seguros Sociales',
    siglas: 'IVSS',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 5),
    riesgoMulta: {
      ente: 'IVSS',
      siglas: 'IVSS',
      descripcion: 'Multa por mora en cotizaciones patronales al Seguro Social',
      montoMulta: '10-50 UT por cada trabajador no inscrito + intereses de mora 12% anual',
      baseLegal: 'Ley del Seguro Social (G.O. 5.976), Art. 87-89',
    },
  },
  {
    nombre: 'Aportes al INCES (2%)',
    tipo: 'parafiscal',
    ente: 'Instituto Nacional de Capacitación y Educación Socialista',
    siglas: 'INCES',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 15);
    },
    riesgoMulta: {
      ente: 'INCES',
      siglas: 'INCES',
      descripcion: 'Multa por no aportar el 2% de nómina trimestral al INCES',
      montoMulta: '25-100 UT + recargos del 1% mensual sobre monto adeudado',
      baseLegal: 'Ley del INCES (G.O. 6.155), Art. 14-15',
    },
  },
  {
    nombre: 'Aportes al FAOV/BANAVIH (Vivienda)',
    tipo: 'parafiscal',
    ente: 'Banco Nacional de Vivienda y Hábitat',
    siglas: 'BANAVIH',
    periodicidad: 'mensual',
    diasAntes: [7, 5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 5),
    riesgoMulta: {
      ente: 'BANAVIH',
      siglas: 'BANAVIH',
      descripcion: 'Multa por no aportar el 3% FAOV patronal',
      montoMulta: '50-200 UT + intereses calculados a tasa activa BCV',
      baseLegal: 'Ley del Régimen Prestacional de Vivienda y Hábitat (G.O. 39.945), Art. 37',
    },
  },
  {
    nombre: 'Aporte al Fondo Nacional Antidrogas (FONA)',
    tipo: 'parafiscal',
    ente: 'Oficina Nacional Antidrogas',
    siglas: 'ONA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'ONA',
      siglas: 'ONA',
      descripcion: 'Multa por no aportar el 1% de ganancia neta al FONA',
      montoMulta: '50-100 UT + inhabilitación para contratación pública',
      baseLegal: 'Ley Orgánica de Drogas (G.O. 39.546), Art. 32',
    },
  },
  {
    nombre: 'Aporte LOPNNA — Fondo de Protección del Niño y Adolescente',
    tipo: 'parafiscal',
    ente: 'Instituto Autónomo Consejo Nacional de Derechos del Niño, Niña y Adolescente',
    siglas: 'IDENNA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 8, 30),
    riesgoMulta: {
      ente: 'IDENNA',
      siglas: 'IDENNA',
      descripcion: 'Multa por no destinar el aporte al fondo de protección de niños',
      montoMulta: '15-90 UT + inhabilitación para solvencia laboral',
      baseLegal: 'LOPNNA (G.O. 5.859 Ext.), Art. 339',
    },
  },
  {
    nombre: 'Aporte al Fondo Nacional de Ciencia, Tecnología e Innovación (FONACIT)',
    tipo: 'parafiscal',
    ente: 'Fondo Nacional de Ciencia, Tecnología e Innovación',
    siglas: 'FONACIT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'FONACIT',
      siglas: 'FONACIT',
      descripcion: 'Multa por no aportar entre 0.5%-2% de ingresos brutos a LOCTI',
      montoMulta: '50% del aporte omitido + intereses moratorios',
      baseLegal: 'LOCTI (G.O. 39.575), Art. 26-27',
    },
  },
  {
    nombre: 'Aporte al Deporte (Ley Orgánica de Deporte)',
    tipo: 'parafiscal',
    ente: 'Instituto Nacional de Deportes',
    siglas: 'IND',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'IND',
      siglas: 'IND',
      descripcion: 'Multa por no aportar el 1% de la ganancia neta al deporte',
      montoMulta: '50-200 UT + inhabilitación para solvencia laboral',
      baseLegal: 'Ley Orgánica de Deporte, Actividad Física y Educación Física (G.O. 39.741), Art. 68',
    },
  },
];

const OBLIGACIONES_LABORALES: ObligacionExtendida[] = [
  {
    nombre: 'Declaración INPSASEL — Accidentes y Enfermedades',
    tipo: 'laboral',
    ente: 'Instituto Nacional de Prevención, Salud y Seguridad Laborales',
    siglas: 'INPSASEL',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'INPSASEL',
      siglas: 'INPSASEL',
      descripcion: 'Sanción por no declarar accidentes laborales o incumplir normas de seguridad',
      montoMulta: '26-75 UT por cada trabajador afectado + clausura parcial o total',
      baseLegal: 'LOPCYMAT (G.O. 38.236), Art. 118-120',
    },
  },
  {
    nombre: 'Programa de Seguridad y Salud en el Trabajo',
    tipo: 'laboral',
    ente: 'Instituto Nacional de Prevención, Salud y Seguridad Laborales',
    siglas: 'INPSASEL',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'INPSASEL',
      siglas: 'INPSASEL',
      descripcion: 'Multa por no tener Programa de Seguridad actualizado',
      montoMulta: '26-75 UT por trabajador + responsabilidad civil/penal en caso de accidente',
      baseLegal: 'LOPCYMAT Art. 56, 73, 118',
    },
  },
  {
    nombre: 'Solvencia Laboral (MINPPTRASS)',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Impedimento para contratar con el Estado sin solvencia laboral vigente',
      montoMulta: 'Inhabilitación para licitaciones públicas + multa 60-120 UT',
      baseLegal: 'Decreto 4.248, LOTTT Art. 512-513',
    },
  },
  {
    nombre: 'Utilidades / Bonificación de Fin de Año',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3, 1],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 15),
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Sanción por no pagar utilidades en el plazo legal',
      montoMulta: 'Multa 60-120 UT + pago de intereses de mora al trabajador',
      baseLegal: 'LOTTT Art. 131-140',
    },
  },
  {
    nombre: 'Depósito de Prestaciones Sociales (Antigüedad)',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Sanción por no depositar trimestralmente las prestaciones sociales',
      montoMulta: 'Intereses de mora a tasa activa BCV + multa 60-120 UT por trabajador',
      baseLegal: 'LOTTT Art. 141-147, 553',
    },
  },
  {
    nombre: 'Cestaticket / Beneficio de Alimentación',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'mensual',
    diasAntes: [5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 1),
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Multa por no otorgar el beneficio de alimentación a los trabajadores',
      montoMulta: '60-120 UT + pago retroactivo del beneficio omitido',
      baseLegal: 'Ley de Alimentación para los Trabajadores (G.O. 39.666), Art. 4-6, 17',
    },
  },
  {
    nombre: 'Vacaciones Colectivas / Disfrute Obligatorio',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 31),
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Sanción por no otorgar vacaciones anuales o bono vacacional',
      montoMulta: 'Multa 60-120 UT + pago doble del bono vacacional adeudado',
      baseLegal: 'LOTTT Art. 190-203',
    },
  },
  {
    nombre: 'Comité de Seguridad y Salud Laboral',
    tipo: 'laboral',
    ente: 'Instituto Nacional de Prevención, Salud y Seguridad Laborales',
    siglas: 'INPSASEL',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'INPSASEL',
      siglas: 'INPSASEL',
      descripcion: 'Multa por no constituir o renovar el Comité de Seguridad y Salud Laboral',
      montoMulta: '26-75 UT por trabajador afectado',
      baseLegal: 'LOPCYMAT Art. 46-52',
    },
  },
  {
    nombre: 'Registro Nacional de Entidades de Trabajo (RNET)',
    tipo: 'laboral',
    ente: 'Ministerio del Poder Popular para el Proceso Social del Trabajo',
    siglas: 'MINPPTRASS',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'MINPPTRASS',
      siglas: 'MINPPTRASS',
      descripcion: 'Multa por no inscribirse o actualizar datos en el RNET',
      montoMulta: '30-60 UT + impedimento para obtener solvencia laboral',
      baseLegal: 'LOTTT Art. 511-512',
    },
  },
];

const OBLIGACIONES_REGULATORIAS: ObligacionExtendida[] = [
  {
    nombre: 'Registro SUNDDE — Precios Justos',
    tipo: 'regulatorio',
    ente: 'Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos',
    siglas: 'SUNDDE',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'SUNDDE',
      siglas: 'SUNDDE',
      descripcion: 'Multa por no registrar precios o vender por encima del precio justo',
      montoMulta: '2.000-50.000 UT + ocupación temporal + comiso de mercancía',
      baseLegal: 'Ley Orgánica de Precios Justos (G.O. 40.340), Art. 49-55',
    },
  },
  {
    nombre: 'Guía SADA/SUNAGRO — Productos Regulados',
    tipo: 'regulatorio',
    ente: 'Superintendencia Nacional de Gestión Agroalimentaria',
    siglas: 'SUNAGRO',
    periodicidad: 'mensual',
    diasAntes: [5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 10),
    riesgoMulta: {
      ente: 'SUNAGRO',
      siglas: 'SUNAGRO',
      descripcion: 'Sanción por transportar/comercializar alimentos sin guía SADA',
      montoMulta: 'Comiso de mercancía + multa 1.000-10.000 UT + cierre temporal',
      baseLegal: 'Ley Orgánica de Seguridad y Soberanía Agroalimentaria, Providencia SUNAGRO',
    },
  },
  {
    nombre: 'Registro SENCAMER — Normas COVENIN',
    tipo: 'regulatorio',
    ente: 'Servicio Autónomo Nacional de Normalización, Calidad, Metrología y Reglamentos Técnicos',
    siglas: 'SENCAMER',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'SENCAMER',
      siglas: 'SENCAMER',
      descripcion: 'Multa por incumplimiento de normas COVENIN o venta sin certificación',
      montoMulta: '500-5.000 UT + retiro de producto del mercado',
      baseLegal: 'Ley del Sistema Venezolano para la Calidad (G.O. 37.555)',
    },
  },
  {
    nombre: 'Permiso Sanitario — Min. Salud',
    tipo: 'regulatorio',
    ente: 'Ministerio del Poder Popular para la Salud',
    siglas: 'MPPS',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 31),
    riesgoMulta: {
      ente: 'MPPS',
      siglas: 'MPPS',
      descripcion: 'Cierre por operar sin permiso sanitario vigente',
      montoMulta: 'Clausura inmediata + multa 100-1.000 UT',
      baseLegal: 'Ley Orgánica de Salud, Decreto 1.700',
    },
  },
  {
    nombre: 'Habilitación CONATEL — Telecomunicaciones',
    tipo: 'regulatorio',
    ente: 'Comisión Nacional de Telecomunicaciones',
    siglas: 'CONATEL',
    periodicidad: 'anual',
    diasAntes: [60, 30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'CONATEL',
      siglas: 'CONATEL',
      descripcion: 'Sanción por operar servicios de telecomunicaciones sin habilitación',
      montoMulta: '1% de ingresos brutos + comiso de equipos + revocación de habilitación',
      baseLegal: 'Ley Orgánica de Telecomunicaciones (G.O. 39.610), Art. 171-189',
    },
  },
  {
    nombre: 'Registro Mercantil — Actualización Anual',
    tipo: 'regulatorio',
    ente: 'Servicio Autónomo de Registros y Notarías',
    siglas: 'SAREN',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'SAREN',
      siglas: 'SAREN',
      descripcion: 'Multa por no actualizar datos en el Registro Mercantil',
      montoMulta: '50-300 UT + nulidad de actos no registrados',
      baseLegal: 'Ley de Registros y del Notariado (G.O. 39.983), Código de Comercio Art. 17-19',
    },
  },
  {
    nombre: 'Registro SUDEBAN — Entidades Bancarias',
    tipo: 'regulatorio',
    ente: 'Superintendencia de las Instituciones del Sector Bancario',
    siglas: 'SUDEBAN',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 15);
    },
    riesgoMulta: {
      ente: 'SUDEBAN',
      siglas: 'SUDEBAN',
      descripcion: 'Multa por incumplimiento de normas prudenciales bancarias',
      montoMulta: '0.1%-0.5% del capital pagado + intervención administrativa',
      baseLegal: 'Ley de Instituciones del Sector Bancario (G.O. 40.557), Art. 200-216',
    },
  },
  {
    nombre: 'Registro SUDEASEG — Empresas de Seguros',
    tipo: 'regulatorio',
    ente: 'Superintendencia de la Actividad Aseguradora',
    siglas: 'SUDEASEG',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'SUDEASEG',
      siglas: 'SUDEASEG',
      descripcion: 'Multa por incumplimiento de reservas técnicas o normativa aseguradora',
      montoMulta: '1.000-20.000 UT + revocación de autorización para operar',
      baseLegal: 'Ley de la Actividad Aseguradora (G.O. 39.481), Art. 118-130',
    },
  },
  {
    nombre: 'Declaración SUNAVAL — Mercado de Valores',
    tipo: 'regulatorio',
    ente: 'Superintendencia Nacional de Valores',
    siglas: 'SUNAVAL',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'SUNAVAL',
      siglas: 'SUNAVAL',
      descripcion: 'Multa por no presentar información financiera al ente regulador de valores',
      montoMulta: '500-5.000 UT + suspensión de oferta pública',
      baseLegal: 'Ley del Mercado de Valores (G.O. 39.489), Art. 80-92',
    },
  },
  {
    nombre: 'Registro UNELLEZ/MPPAPT — Empresas Agrícolas',
    tipo: 'regulatorio',
    ente: 'Ministerio del Poder Popular de Agricultura Productiva y Tierras',
    siglas: 'MPPAPT',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'MPPAPT',
      siglas: 'MPPAPT',
      descripcion: 'Multa por no cumplir con registro de tierras productivas o uso agrario',
      montoMulta: '100-1.000 UT + expropiación de tierras ociosas',
      baseLegal: 'Ley de Tierras y Desarrollo Agrario (G.O. 5.991), Art. 97-100',
    },
  },
  {
    nombre: 'Prevención de Legitimación de Capitales (UNIF)',
    tipo: 'regulatorio',
    ente: 'Unidad Nacional de Inteligencia Financiera',
    siglas: 'UNIF',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'UNIF',
      siglas: 'UNIF',
      descripcion: 'Sanción por incumplimiento de normas anti-lavado y reporte de operaciones sospechosas',
      montoMulta: '500-50.000 UT + responsabilidad penal + cierre de cuenta bancaria',
      baseLegal: 'Ley Orgánica contra la Delincuencia Organizada y Financiamiento al Terrorismo (G.O. 39.912), Art. 58-63',
    },
  },
];

const OBLIGACIONES_MUNICIPALES: ObligacionExtendida[] = [
  {
    nombre: 'Impuesto sobre Actividades Económicas (IAE/Patente)',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'trimestral',
    diasAntes: [15, 7, 5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => {
      const trimestre = Math.ceil(mes / 3);
      const mesFin = trimestre * 3;
      return new Date(anio, mesFin - 1, 30);
    },
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Multa por declaración extemporánea de Impuesto sobre Actividades Económicas',
      montoMulta: 'Varía por municipio: 10-50% del impuesto omitido + recargos',
      baseLegal: 'Ordenanza de Impuesto sobre Actividades Económicas del municipio',
    },
  },
  {
    nombre: 'Renovación Licencia de Actividades Económicas',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Cierre por operar sin licencia de actividades económicas vigente',
      montoMulta: 'Clausura del establecimiento + multa 50-500 UT municipal',
      baseLegal: 'Ley Orgánica del Poder Público Municipal, Art. 204-213',
    },
  },
  {
    nombre: 'Impuesto sobre Inmuebles Urbanos',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Recargo por mora en impuesto inmobiliario urbano',
      montoMulta: '1% mensual sobre saldo adeudado + embargo preventivo',
      baseLegal: 'Ordenanza de Impuesto sobre Inmuebles Urbanos',
    },
  },
  {
    nombre: 'Aseo Urbano / Tasa de Servicios Municipales',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'mensual',
    diasAntes: [5, 3, 1],
    calcularFecha: (_terminal, mes, anio) => new Date(anio, mes - 1, 15),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Recargo por mora en tasa de aseo urbano',
      montoMulta: '1.5% mensual sobre saldo + restricción de solvencia municipal',
      baseLegal: 'Ordenanza de Tasas por Servicios Públicos Municipales',
    },
  },
  {
    nombre: 'Impuesto sobre Propaganda y Publicidad Comercial',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Multa por exhibir propaganda comercial sin pago del impuesto municipal',
      montoMulta: '50-300 UT municipal + retiro de publicidad + multa diaria por retraso',
      baseLegal: 'Ordenanza de Impuesto sobre Propaganda y Publicidad Comercial, Ley del Poder Público Municipal Art. 179',
    },
  },
  {
    nombre: 'Impuesto sobre Vehículos',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Recargo por mora en impuesto municipal sobre vehículos',
      montoMulta: '1% mensual sobre saldo + retención del vehículo en fiscalizaciones',
      baseLegal: 'Ordenanza de Impuesto sobre Vehículos del municipio',
    },
  },
  {
    nombre: 'Conformidad de Uso / Habilitación Municipal',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Clausura por operar sin conformidad de uso vigente',
      montoMulta: 'Clausura inmediata + multa 100-500 UT municipal',
      baseLegal: 'Ley Orgánica de Ordenación Urbanística, Ordenanza de Zonificación municipal',
    },
  },
  {
    nombre: 'Solvencia Municipal (Requisito para Solvencia Laboral)',
    tipo: 'municipal',
    ente: 'Alcaldía Municipal',
    siglas: 'ALCALDÍA',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'Alcaldía',
      siglas: 'ALCALDÍA',
      descripcion: 'Impedimento para obtener solvencia laboral sin solvencia municipal al día',
      montoMulta: 'Bloqueo de solvencia laboral + inhabilitación para licitar con el Estado',
      baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 180, Decreto 4.248',
    },
  },
  {
    nombre: 'Tasa de Bomberos',
    tipo: 'municipal',
    ente: 'Cuerpo de Bomberos Municipal',
    siglas: 'BOMBEROS',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 2, 31),
    riesgoMulta: {
      ente: 'Bomberos',
      siglas: 'BOMBEROS',
      descripcion: 'Impedimento para renovar licencia de actividades económicas sin tasa de bomberos',
      montoMulta: 'Bloqueo de licencia municipal + inspección forzosa',
      baseLegal: 'Ley de los Cuerpos de Bomberos y Bomberas (G.O. 38.520), Ordenanza municipal',
    },
  },
];

const OBLIGACIONES_AMBIENTALES: ObligacionExtendida[] = [
  {
    nombre: 'Certificación Ambiental — Min. Ecosocialismo',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7, 3],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Sanción por operar sin autorización ambiental o contaminar',
      montoMulta: '500-50.000 UT + reparación del daño + responsabilidad penal',
      baseLegal: 'Ley Penal del Ambiente (G.O. 39.913), Ley Orgánica del Ambiente',
    },
  },
  {
    nombre: 'Registro de Actividades Susceptibles de Degradar el Ambiente (RASDA)',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 0, 31),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Multa por no renovar RASDA',
      montoMulta: '300-3.000 UT + paralización de actividades',
      baseLegal: 'Decreto 1.257 (G.O. 35.946), Ley Orgánica del Ambiente Art. 83',
    },
  },
  {
    nombre: 'Estudio de Impacto Ambiental y Socio-Cultural (EIASC)',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Multa por iniciar obras o proyectos sin estudio de impacto ambiental aprobado',
      montoMulta: '1.000-10.000 UT + paralización de obra + restauración obligatoria',
      baseLegal: 'Decreto 1.257 (G.O. 35.946), Ley Orgánica del Ambiente Art. 129',
    },
  },
  {
    nombre: 'Gestión Integral de Residuos y Desechos Sólidos',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 11, 31),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Sanción por manejo inadecuado de residuos peligrosos o desechos sólidos',
      montoMulta: '500-5.000 UT + clausura + responsabilidad penal ambiental',
      baseLegal: 'Ley de Gestión Integral de la Basura (G.O. 6.017), Ley Penal del Ambiente Art. 60-62',
    },
  },
  {
    nombre: 'Permiso de Emisiones Atmosféricas',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 8, 30),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Multa por emisiones que excedan los límites permisibles sin autorización',
      montoMulta: '500-10.000 UT + clausura + obligación de instalar filtros/equipos',
      baseLegal: 'Decreto 638 (Normas de Calidad del Aire), Ley Penal del Ambiente Art. 44-47',
    },
  },
  {
    nombre: 'Permiso de Vertidos de Efluentes Líquidos',
    tipo: 'ambiental',
    ente: 'Ministerio del Poder Popular para el Ecosocialismo',
    siglas: 'MINEC',
    periodicidad: 'anual',
    diasAntes: [30, 15, 7],
    calcularFecha: (_terminal, _mes, anio) => new Date(anio, 5, 30),
    riesgoMulta: {
      ente: 'MINEC',
      siglas: 'MINEC',
      descripcion: 'Sanción por vertido de efluentes líquidos sin tratamiento o autorización',
      montoMulta: '1.000-20.000 UT + clausura + restauración del cuerpo de agua',
      baseLegal: 'Decreto 883 (Normas para clasificación de cuerpos de agua y vertidos), Ley Penal del Ambiente Art. 50-54',
    },
  },
];

const TODAS_OBLIGACIONES: ObligacionExtendida[] = [
  ...OBLIGACIONES_SENIAT,
  ...OBLIGACIONES_PARAFISCALES,
  ...OBLIGACIONES_LABORALES,
  ...OBLIGACIONES_REGULATORIAS,
  ...OBLIGACIONES_MUNICIPALES,
  ...OBLIGACIONES_AMBIENTALES,
];

const OBLIGACIONES: ObligacionFiscal[] = TODAS_OBLIGACIONES;

interface AlertaGenerada {
  userId: number;
  obligacion: string;
  diasRestantes: number;
  fechaVencimiento: Date;
}

function getRifTerminal(rif: string): number {
  const clean = rif.replace(/[^0-9]/g, '');
  const last = clean.charAt(clean.length - 1);
  return parseInt(last, 10) || 0;
}

export async function verificarAlertasPredictivas(): Promise<AlertaGenerada[]> {
  const alertasGeneradas: AlertaGenerada[] = [];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const empresas = await query<{
    user_id: number;
    rif: string;
    nombre_empresa: string;
    email: string;
  }>(
    `SELECT u.id AS user_id, u.email, u.rif, COALESCE(u.razon_social, u.nombre) AS nombre_empresa
     FROM users u
     WHERE u.tipo = 'juridico' AND u.rif IS NOT NULL AND u.rif != ''`
  );

  if (!empresas.length) return alertasGeneradas;

  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  for (const empresa of empresas) {
    const rifTerminal = getRifTerminal(empresa.rif);

    for (const obligacion of OBLIGACIONES) {
      const fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual);
      if (!fechaVenc) continue;

      const diffMs = fechaVenc.getTime() - hoy.getTime();
      const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diasRestantes < 0 || !obligacion.diasAntes.includes(diasRestantes)) continue;

      const yaEnviada = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM notificaciones
         WHERE user_id = $1
         AND titulo LIKE $2
         AND created_at > NOW() - INTERVAL '20 hours'`,
        [empresa.user_id, `%${obligacion.nombre}%`]
      );

      if (parseInt(yaEnviada[0]?.count ?? '0') > 0) continue;

      const titulo = diasRestantes === 1
        ? `${obligacion.nombre} vence MAÑANA`
        : `${obligacion.nombre} — faltan ${diasRestantes} días`;

      const fechaStr = fechaVenc.toLocaleDateString('es-VE', {
        day: '2-digit', month: 'long', year: 'numeric',
      });

      const ext = obligacion as ObligacionExtendida;
      const enteInfo = ext.siglas ? ` (${ext.siglas})` : ' del SENIAT';

      const mensaje = diasRestantes <= 3
        ? `URGENTE: Tu ${obligacion.nombre} vence el ${fechaStr}. RIF: ${empresa.rif}. Presenta tu declaración lo antes posible para evitar multas y sanciones${enteInfo}.`
        : `Recordatorio: Tu ${obligacion.nombre} vence el ${fechaStr}. RIF: ${empresa.rif}. Tienes ${diasRestantes} días para preparar y presentar tu declaración ante ${ext.ente || 'el SENIAT'}.`;

      await query(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          empresa.user_id,
          obligacion.tipo,
          titulo,
          mensaje,
          JSON.stringify({
            obligacion: obligacion.nombre,
            ente: ext.siglas || 'SENIAT',
            ente_nombre: ext.ente || 'SENIAT',
            dias_restantes: diasRestantes,
            fecha_vencimiento: fechaVenc.toISOString(),
            rif: empresa.rif,
            predictiva: true,
            riesgo_multa: ext.riesgoMulta ? {
              descripcion: ext.riesgoMulta.descripcion,
              monto: ext.riesgoMulta.montoMulta,
              base_legal: ext.riesgoMulta.baseLegal,
            } : null,
          }),
        ]
      );

      const html = buildKyronEmailTemplate({
        title: diasRestantes <= 3 ? `⚠️ ${titulo}` : `📅 ${titulo}`,
        body: `
          <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 12px 0;">${mensaje}</p>
          <div style="background: #0A1530; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">EMPRESA</p>
            <p style="color: #F1F5F9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">${empresa.nombre_empresa}</p>
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">RIF</p>
            <p style="color: #0EA5E9; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">${empresa.rif}</p>
            <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0;">VENCIMIENTO</p>
            <p style="color: ${diasRestantes <= 3 ? '#F59E0B' : '#22C55E'}; font-size: 14px; font-weight: 700; margin: 0;">${fechaStr}</p>
          </div>
        `,
        footer: diasRestantes <= 3
          ? 'Esta obligación vence pronto. Evita sanciones presentando a tiempo.'
          : 'Alerta predictiva generada automáticamente por System Kyron.',
      });

      const userConfig = await queryOne<{ notif_email: boolean; email_alertas: string | null }>(
        `SELECT notif_email, email_alertas FROM configuracion_usuario WHERE user_id = $1`,
        [empresa.user_id]
      );
      if (!userConfig || userConfig.notif_email !== false) {
        const alertEmail = userConfig?.email_alertas || empresa.email;
        sendEmail({
          to: alertEmail,
          subject: `[Kyron Fiscal] ${titulo}`,
          html,
          module: 'tributos',
          purpose: 'alert',
        }).catch(() => {});
      }

      sendWhatsAppNotification(empresa.user_id, {
        tipo: obligacion.tipo,
        titulo,
        mensaje,
      }).catch(() => {});

      sendSmsNotification(empresa.user_id, {
        tipo: obligacion.tipo,
        titulo,
        mensaje,
      }).catch(() => {});

      alertasGeneradas.push({
        userId: empresa.user_id,
        obligacion: obligacion.nombre,
        diasRestantes,
        fechaVencimiento: fechaVenc,
      });
    }
  }

  return alertasGeneradas;
}

export async function obtenerProximasObligaciones(rifTerminal: number) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  const proximas = [];

  for (const obligacion of TODAS_OBLIGACIONES) {
    let fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual);

    if (!fechaVenc || fechaVenc.getTime() < hoy.getTime()) {
      if (obligacion.periodicidad === 'mensual') {
        const mesSiguiente = mesActual === 12 ? 1 : mesActual + 1;
        const anioSiguiente = mesActual === 12 ? anioActual + 1 : anioActual;
        fechaVenc = obligacion.calcularFecha(rifTerminal, mesSiguiente, anioSiguiente);
      } else if (obligacion.periodicidad === 'trimestral') {
        const mesSiguiente = mesActual + 3 > 12 ? (mesActual + 3) - 12 : mesActual + 3;
        const anioSiguiente = mesActual + 3 > 12 ? anioActual + 1 : anioActual;
        fechaVenc = obligacion.calcularFecha(rifTerminal, mesSiguiente, anioSiguiente);
      } else {
        fechaVenc = obligacion.calcularFecha(rifTerminal, mesActual, anioActual + 1);
      }
    }

    if (!fechaVenc) continue;

    const diffMs = fechaVenc.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    proximas.push({
      nombre: obligacion.nombre,
      tipo: obligacion.tipo,
      ente: obligacion.siglas,
      enteNombre: obligacion.ente,
      periodicidad: obligacion.periodicidad,
      fechaVencimiento: fechaVenc.toISOString(),
      diasRestantes,
      urgencia: diasRestantes <= 3 ? 'critica' : diasRestantes <= 7 ? 'alta' : diasRestantes <= 15 ? 'media' : 'baja',
      riesgoMulta: obligacion.riesgoMulta ? {
        descripcion: obligacion.riesgoMulta.descripcion,
        montoMulta: obligacion.riesgoMulta.montoMulta,
        baseLegal: obligacion.riesgoMulta.baseLegal,
      } : null,
    });
  }

  return proximas.sort((a, b) => a.diasRestantes - b.diasRestantes);
}

export function obtenerRiesgosMultas() {
  const riesgos: Record<string, {
    ente: string;
    siglas: string;
    obligaciones: {
      nombre: string;
      tipo: string;
      periodicidad: string;
      multa: string;
      baseLegal: string;
      descripcionRiesgo: string;
    }[];
  }> = {};

  for (const ob of TODAS_OBLIGACIONES) {
    if (!riesgos[ob.siglas]) {
      riesgos[ob.siglas] = {
        ente: ob.ente,
        siglas: ob.siglas,
        obligaciones: [],
      };
    }
    riesgos[ob.siglas].obligaciones.push({
      nombre: ob.nombre,
      tipo: ob.tipo,
      periodicidad: ob.periodicidad,
      multa: ob.riesgoMulta.montoMulta,
      baseLegal: ob.riesgoMulta.baseLegal,
      descripcionRiesgo: ob.riesgoMulta.descripcion,
    });
  }

  return riesgos;
}
