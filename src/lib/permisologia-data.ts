export type Organismo = {
  id: string;
  nombre: string;
  tipo: 'ministerio' | 'seniat' | 'alcaldia' | 'gobernacion' | 'ente_autonomo' | 'instituto';
  siglas?: string;
};

export type PermisoTipo = {
  id: string;
  nombre: string;
  organismoId: string;
  descripcion: string;
  vigencia: number | null;
  requisitosInscripcion: string[];
  requisitosRenovacion: string[];
  costoEstimado?: string;
  baseLegal?: string;
  aplica: ('comercio' | 'industria' | 'servicios' | 'construccion' | 'telecomunicaciones' | 'alimentos' | 'salud' | 'educacion' | 'transporte' | 'mineria' | 'ambiente' | 'turismo' | 'energia' | 'agricultura' | 'pesca' | 'petroleo' | 'financiero' | 'farmaceutico' | 'cultura' | 'deporte' | 'tecnologia' | 'todos')[];
};

export type PermisoRegistro = {
  id?: number;
  empresa_id?: number;
  tipo_permiso_id: string;
  numero_expediente?: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  estado: 'vigente' | 'por_vencer' | 'vencido' | 'en_tramite' | 'rechazado' | 'renovacion';
  observaciones?: string;
  documento_url?: string;
  alerta_dias?: number;
};

export const organismos: Organismo[] = [
  { id: 'SENIAT', nombre: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria', tipo: 'seniat', siglas: 'SENIAT' },
  { id: 'SAREN', nombre: 'Servicio Autónomo de Registros y Notarías', tipo: 'ente_autonomo', siglas: 'SAREN' },
  { id: 'SAPI', nombre: 'Servicio Autónomo de la Propiedad Intelectual', tipo: 'ente_autonomo', siglas: 'SAPI' },
  { id: 'CONATEL', nombre: 'Comisión Nacional de Telecomunicaciones', tipo: 'ente_autonomo', siglas: 'CONATEL' },
  { id: 'INCES', nombre: 'Instituto Nacional de Capacitación y Educación Socialista', tipo: 'instituto', siglas: 'INCES' },
  { id: 'IVSS', nombre: 'Instituto Venezolano de los Seguros Sociales', tipo: 'instituto', siglas: 'IVSS' },
  { id: 'BANAVIH', nombre: 'Banco Nacional de Vivienda y Hábitat', tipo: 'instituto', siglas: 'BANAVIH' },
  { id: 'INPSASEL', nombre: 'Instituto Nacional de Prevención, Salud y Seguridad Laborales', tipo: 'instituto', siglas: 'INPSASEL' },
  { id: 'SUNDDE', nombre: 'Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos', tipo: 'ente_autonomo', siglas: 'SUNDDE' },
  { id: 'SUNAGRO', nombre: 'Superintendencia Nacional de Gestión Agroalimentaria', tipo: 'ente_autonomo', siglas: 'SUNAGRO' },
  { id: 'BCV', nombre: 'Banco Central de Venezuela', tipo: 'ente_autonomo', siglas: 'BCV' },
  { id: 'SUDEBAN', nombre: 'Superintendencia de las Instituciones del Sector Bancario', tipo: 'ente_autonomo', siglas: 'SUDEBAN' },
  { id: 'SUNAVAL', nombre: 'Superintendencia Nacional de Valores', tipo: 'ente_autonomo', siglas: 'SUNAVAL' },
  { id: 'SUDEASEG', nombre: 'Superintendencia de la Actividad Aseguradora', tipo: 'ente_autonomo', siglas: 'SUDEASEG' },
  { id: 'SENCAMER', nombre: 'Servicio Nacional de Normalización, Calidad, Metrología y Reglamentos Técnicos', tipo: 'ente_autonomo', siglas: 'SENCAMER' },
  { id: 'INSAI', nombre: 'Instituto Nacional de Salud Agrícola Integral', tipo: 'instituto', siglas: 'INSAI' },
  { id: 'CENCOEX', nombre: 'Centro Nacional de Comercio Exterior', tipo: 'ente_autonomo', siglas: 'CENCOEX' },
  { id: 'CORPOELEC', nombre: 'Corporación Eléctrica Nacional', tipo: 'ente_autonomo', siglas: 'CORPOELEC' },
  { id: 'CANTV', nombre: 'Compañía Anónima Nacional Teléfonos de Venezuela', tipo: 'ente_autonomo', siglas: 'CANTV' },
  { id: 'INAMEH', nombre: 'Instituto Nacional de Meteorología e Hidrología', tipo: 'instituto', siglas: 'INAMEH' },
  { id: 'CUERPO-BOMBEROS', nombre: 'Cuerpo de Bomberos y Administración de Emergencias', tipo: 'instituto', siglas: 'BOMBEROS' },
  { id: 'INEA', nombre: 'Instituto Nacional de los Espacios Acuáticos', tipo: 'instituto', siglas: 'INEA' },
  { id: 'INTT', nombre: 'Instituto Nacional de Transporte Terrestre', tipo: 'instituto', siglas: 'INTT' },
  { id: 'INN', nombre: 'Instituto Nacional de Nutrición', tipo: 'instituto', siglas: 'INN' },
  { id: 'MPPPST', nombre: 'Instituto Nacional de Prevención y Seguridad del Trabajo', tipo: 'instituto', siglas: 'MPPPST' },
  { id: 'SNTP', nombre: 'Sindicato Nacional de Trabajadores de la Prensa', tipo: 'instituto', siglas: 'SNTP' },

  { id: 'MIN-PLANIFICACION', nombre: 'Ministerio del Poder Popular de Planificación', tipo: 'ministerio', siglas: 'MPPP' },
  { id: 'MIN-DEFENSA', nombre: 'Ministerio del Poder Popular para la Defensa', tipo: 'ministerio', siglas: 'MPPD' },
  { id: 'MIN-COMERCIO', nombre: 'Ministerio del Poder Popular de Comercio Nacional', tipo: 'ministerio', siglas: 'MPPCN' },
  { id: 'MIN-COMERCIO-EXT', nombre: 'Ministerio del Poder Popular de Comercio Exterior', tipo: 'ministerio', siglas: 'MPPCEXT' },
  { id: 'MIN-TRABAJO', nombre: 'Ministerio del Poder Popular para el Proceso Social del Trabajo', tipo: 'ministerio', siglas: 'MPPPST' },
  { id: 'MIN-SALUD', nombre: 'Ministerio del Poder Popular para la Salud', tipo: 'ministerio', siglas: 'MPPS' },
  { id: 'MIN-AMBIENTE', nombre: 'Ministerio del Poder Popular para el Ecosocialismo', tipo: 'ministerio', siglas: 'MPPE' },
  { id: 'MIN-TURISMO', nombre: 'Ministerio del Poder Popular para el Turismo', tipo: 'ministerio', siglas: 'MINTUR' },
  { id: 'MIN-TRANSPORTE', nombre: 'Ministerio del Poder Popular para el Transporte', tipo: 'ministerio', siglas: 'MPPT' },
  { id: 'MIN-ALIMENTACION', nombre: 'Ministerio del Poder Popular para la Alimentación', tipo: 'ministerio', siglas: 'MPPA' },
  { id: 'MIN-EDUCACION', nombre: 'Ministerio del Poder Popular para la Educación', tipo: 'ministerio', siglas: 'MPPE' },
  { id: 'MIN-EDUCACION-UNIV', nombre: 'Ministerio del Poder Popular para la Educación Universitaria', tipo: 'ministerio', siglas: 'MPPEU' },
  { id: 'MIN-ENERGIA', nombre: 'Ministerio del Poder Popular de Petróleo', tipo: 'ministerio', siglas: 'MPPPM' },
  { id: 'MIN-ENERGIA-ELECTRICA', nombre: 'Ministerio del Poder Popular para la Energía Eléctrica', tipo: 'ministerio', siglas: 'MPPEE' },
  { id: 'MIN-INDUSTRIAS', nombre: 'Ministerio del Poder Popular de Industrias y Producción Nacional', tipo: 'ministerio', siglas: 'MPPIPN' },
  { id: 'MIN-CIENCIA', nombre: 'Ministerio del Poder Popular para Ciencia y Tecnología', tipo: 'ministerio', siglas: 'MPPCT' },
  { id: 'MIN-HABITAT', nombre: 'Ministerio del Poder Popular para Vivienda y Hábitat', tipo: 'ministerio', siglas: 'MPPVH' },
  { id: 'MIN-INTERIOR', nombre: 'Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz', tipo: 'ministerio', siglas: 'MPPRIJP' },
  { id: 'MIN-RREE', nombre: 'Ministerio del Poder Popular para Relaciones Exteriores', tipo: 'ministerio', siglas: 'MPPRE' },
  { id: 'MIN-CULTURA', nombre: 'Ministerio del Poder Popular para la Cultura', tipo: 'ministerio', siglas: 'MPPC' },
  { id: 'MIN-COMUNICACION', nombre: 'Ministerio del Poder Popular para la Comunicación y la Información', tipo: 'ministerio', siglas: 'MIPPCI' },
  { id: 'MIN-AGUAS', nombre: 'Ministerio del Poder Popular para la Atención de las Aguas', tipo: 'ministerio', siglas: 'MPPAA' },
  { id: 'MIN-PESCA', nombre: 'Ministerio del Poder Popular para la Pesca y Acuicultura', tipo: 'ministerio', siglas: 'MPPPA' },
  { id: 'MIN-COMUNAS', nombre: 'Ministerio del Poder Popular para las Comunas, Movimientos Sociales y Agricultura Urbana', tipo: 'ministerio', siglas: 'MPPCSAU' },
  { id: 'MIN-MINERIA', nombre: 'Ministerio del Poder Popular de Desarrollo Minero Ecológico', tipo: 'ministerio', siglas: 'MPPDME' },
  { id: 'MIN-AGRICULTURA', nombre: 'Ministerio del Poder Popular para la Agricultura Productiva y Tierras', tipo: 'ministerio', siglas: 'MPPAT' },
  { id: 'MIN-DEPORTE', nombre: 'Ministerio del Poder Popular para el Deporte', tipo: 'ministerio', siglas: 'MPPD' },
  { id: 'MIN-ECONOMIA', nombre: 'Ministerio del Poder Popular de Economía y Finanzas', tipo: 'ministerio', siglas: 'MPPEF' },
  { id: 'MIN-OBRAS-PUBLICAS', nombre: 'Ministerio del Poder Popular para Obras Públicas', tipo: 'ministerio', siglas: 'MPPOP' },
  { id: 'MIN-MUJER', nombre: 'Ministerio del Poder Popular para la Mujer y la Igualdad de Género', tipo: 'ministerio', siglas: 'MPPIG' },
  { id: 'MIN-PENITENCIARIO', nombre: 'Ministerio del Poder Popular para el Servicio Penitenciario', tipo: 'ministerio', siglas: 'MPPSP' },

  { id: 'GOB-MIRANDA', nombre: 'Gobernación del Estado Miranda', tipo: 'gobernacion' },
  { id: 'GOB-CARABOBO', nombre: 'Gobernación del Estado Carabobo', tipo: 'gobernacion' },
  { id: 'GOB-ZULIA', nombre: 'Gobernación del Estado Zulia', tipo: 'gobernacion' },
  { id: 'GOB-ARAGUA', nombre: 'Gobernación del Estado Aragua', tipo: 'gobernacion' },
  { id: 'GOB-LARA', nombre: 'Gobernación del Estado Lara', tipo: 'gobernacion' },
  { id: 'GOB-BOLIVAR', nombre: 'Gobernación del Estado Bolívar', tipo: 'gobernacion' },
  { id: 'GOB-DTOCAPITAL', nombre: 'Gobierno del Distrito Capital', tipo: 'gobernacion' },
  { id: 'GOB-ANZOATEGUI', nombre: 'Gobernación del Estado Anzoátegui', tipo: 'gobernacion' },
  { id: 'GOB-TACHIRA', nombre: 'Gobernación del Estado Táchira', tipo: 'gobernacion' },
  { id: 'GOB-FALCON', nombre: 'Gobernación del Estado Falcón', tipo: 'gobernacion' },
  { id: 'GOB-MERIDA', nombre: 'Gobernación del Estado Mérida', tipo: 'gobernacion' },
  { id: 'GOB-NUEVA-ESPARTA', nombre: 'Gobernación del Estado Nueva Esparta', tipo: 'gobernacion' },
  { id: 'GOB-MONAGAS', nombre: 'Gobernación del Estado Monagas', tipo: 'gobernacion' },
  { id: 'GOB-VARGAS', nombre: 'Gobernación del Estado La Guaira', tipo: 'gobernacion' },
  { id: 'GOB-SUCRE', nombre: 'Gobernación del Estado Sucre', tipo: 'gobernacion' },
  { id: 'GOB-BARINAS', nombre: 'Gobernación del Estado Barinas', tipo: 'gobernacion' },
  { id: 'GOB-PORTUGUESA', nombre: 'Gobernación del Estado Portuguesa', tipo: 'gobernacion' },
  { id: 'GOB-GUARICO', nombre: 'Gobernación del Estado Guárico', tipo: 'gobernacion' },
  { id: 'GOB-YARACUY', nombre: 'Gobernación del Estado Yaracuy', tipo: 'gobernacion' },
  { id: 'GOB-TRUJILLO', nombre: 'Gobernación del Estado Trujillo', tipo: 'gobernacion' },
  { id: 'GOB-COJEDES', nombre: 'Gobernación del Estado Cojedes', tipo: 'gobernacion' },
  { id: 'GOB-APURE', nombre: 'Gobernación del Estado Apure', tipo: 'gobernacion' },
  { id: 'GOB-DELTA-AMACURO', nombre: 'Gobernación del Estado Delta Amacuro', tipo: 'gobernacion' },
  { id: 'GOB-AMAZONAS', nombre: 'Gobernación del Estado Amazonas', tipo: 'gobernacion' },
  { id: 'GOB-ESEQUIBA', nombre: 'Gobernación del Estado Guayana Esequiba', tipo: 'gobernacion' },

  { id: 'ALC-CHACAO', nombre: 'Alcaldía del Municipio Chacao', tipo: 'alcaldia' },
  { id: 'ALC-BARUTA', nombre: 'Alcaldía del Municipio Baruta', tipo: 'alcaldia' },
  { id: 'ALC-SUCRE', nombre: 'Alcaldía del Municipio Sucre (Petare)', tipo: 'alcaldia' },
  { id: 'ALC-LIBERTADOR', nombre: 'Alcaldía del Municipio Libertador', tipo: 'alcaldia' },
  { id: 'ALC-HATILLO', nombre: 'Alcaldía del Municipio El Hatillo', tipo: 'alcaldia' },
  { id: 'ALC-VALENCIA', nombre: 'Alcaldía del Municipio Valencia', tipo: 'alcaldia' },
  { id: 'ALC-MARACAIBO', nombre: 'Alcaldía del Municipio Maracaibo', tipo: 'alcaldia' },
  { id: 'ALC-IRIBARREN', nombre: 'Alcaldía del Municipio Iribarren (Barquisimeto)', tipo: 'alcaldia' },
  { id: 'ALC-SAN-CRISTOBAL', nombre: 'Alcaldía del Municipio San Cristóbal', tipo: 'alcaldia' },
  { id: 'ALC-MATURIN', nombre: 'Alcaldía del Municipio Maturín', tipo: 'alcaldia' },
];

export const tiposPermiso: PermisoTipo[] = [
  // ═══════════════════════════════════════════════════════════════
  // SENIAT — OBLIGACIONES TRIBUTARIAS NACIONALES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SENIAT-RIF',
    nombre: 'Registro de Información Fiscal (RIF)',
    organismoId: 'SENIAT',
    descripcion: 'Inscripción y actualización del RIF ante el SENIAT. Obligatorio para toda persona jurídica o natural con actividad económica.',
    vigencia: null,
    requisitosInscripcion: ['Acta constitutiva legalizada', 'Cédula del representante legal', 'Comprobante de domicilio fiscal', 'Poder notariado (si aplica)'],
    requisitosRenovacion: ['Actualización de datos en portal SENIAT', 'Constancia de domicilio vigente'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Código Orgánico Tributario (2020), Providencia SNAT/2023/00046',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-IVA',
    nombre: 'Registro de Contribuyente IVA',
    organismoId: 'SENIAT',
    descripcion: 'Inscripción como contribuyente ordinario o formal del IVA. Tasa general 16%.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Declaración jurada de actividad económica', 'Libros de compra-venta habilitados'],
    requisitosRenovacion: ['Declaraciones mensuales al día', 'Libros actualizados'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de IVA (G.O. 6.507), Providencia 0071',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-ISLR',
    nombre: 'Declaración Definitiva ISLR',
    organismoId: 'SENIAT',
    descripcion: 'Declaración anual del Impuesto sobre la Renta. Tarifa progresiva para personas jurídicas hasta 34%.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Balance general auditado', 'Estado de resultados', 'Ajuste por inflación fiscal'],
    requisitosRenovacion: ['Presentar declaración antes del 31 de marzo', 'Pago de las porciones correspondientes'],
    costoEstimado: 'Variable según utilidad',
    baseLegal: 'Ley de ISLR (G.O. 6.210), Decreto 4.300',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-IGTF',
    nombre: 'Agente de Percepción IGTF',
    organismoId: 'SENIAT',
    descripcion: 'Registro como agente de percepción del Impuesto a las Grandes Transacciones Financieras (3%).',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Designación por Providencia SENIAT', 'Cumplimiento declaraciones IVA'],
    requisitosRenovacion: ['Declaraciones semanales', 'Entero del impuesto percibido'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de IGTF (G.O. 6.687), Providencia SNAT/2022/000013',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-SOLVENCIA',
    nombre: 'Certificado de Solvencia Tributaria',
    organismoId: 'SENIAT',
    descripcion: 'Constancia de estar al día con todas las obligaciones tributarias nacionales. Requerido para licitaciones y contratos con el Estado.',
    vigencia: 3,
    requisitosInscripcion: ['Declaraciones IVA al día', 'Declaración ISLR vigente', 'Sin deuda de retenciones'],
    requisitosRenovacion: ['Solicitar nueva constancia cada trimestre', 'Pagar obligaciones pendientes'],
    costoEstimado: 'Gratuito',
    baseLegal: 'COT Art. 68, Providencia SNAT/2024/000008',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-FACTURACION',
    nombre: 'Autorización de Facturación',
    organismoId: 'SENIAT',
    descripcion: 'Autorización para emitir facturas, notas de débito/crédito y guías de despacho conforme a Providencia 0071.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Resolución de contribuyente', 'Formato de facturas aprobado'],
    requisitosRenovacion: ['Actualizar series de facturación', 'Reportar cambios de imprentas autorizadas'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Providencia 0071 (G.O. 39.795)',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-ADUANAS',
    nombre: 'Registro Aduanero (Importador/Exportador)',
    organismoId: 'SENIAT',
    descripcion: 'Habilitación ante la Aduana para operaciones de importación y/o exportación.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva con objeto social de comercio exterior', 'Solvencia tributaria', 'Registro RUSAD'],
    requisitosRenovacion: ['Actualización de datos cada 2 años', 'Solvencia tributaria vigente'],
    costoEstimado: '5 UT',
    baseLegal: 'Ley Orgánica de Aduanas (G.O. 6.155)',
    aplica: ['comercio', 'industria'],
  },
  {
    id: 'SENIAT-RETENCIONES',
    nombre: 'Designación Agente de Retención IVA/ISLR',
    organismoId: 'SENIAT',
    descripcion: 'Designación como agente de retención de IVA (75%) e ISLR según actividad económica.',
    vigencia: null,
    requisitosInscripcion: ['Providencia de designación', 'Sistema contable para retenciones', 'Portal fiscal configurado'],
    requisitosRenovacion: ['Declaraciones quincenales de IVA', 'Declaraciones mensuales de ISLR', 'Entero oportuno'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Providencia SNAT/2015/0049 (IVA), Decreto 1.808 (ISLR)',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-PRECIOS-TRANSFER',
    nombre: 'Declaración de Precios de Transferencia',
    organismoId: 'SENIAT',
    descripcion: 'Declaración informativa anual para empresas con operaciones entre partes vinculadas (nacionales e internacionales).',
    vigencia: 12,
    requisitosInscripcion: ['Estudio de precios de transferencia', 'Documentación comprobatoria', 'Contratos intercompañía'],
    requisitosRenovacion: ['Actualizar estudio anualmente', 'Declaración PT-99 antes del 30 de junio'],
    costoEstimado: 'Gratuito (consultoría externa variable)',
    baseLegal: 'Ley de ISLR Art. 111-119, Providencia SNAT/2004/0096',
    aplica: ['todos'],
  },
  {
    id: 'SENIAT-TIMBRE-FISCAL',
    nombre: 'Pago de Timbres Fiscales',
    organismoId: 'SENIAT',
    descripcion: 'Pago de timbres fiscales para documentos legales, contratos y trámites ante registros públicos.',
    vigencia: null,
    requisitosInscripcion: ['Documento que requiera timbre', 'Planilla de pago generada en portal SENIAT'],
    requisitosRenovacion: ['Pago por cada documento que lo requiera'],
    costoEstimado: '1-2% del valor del documento',
    baseLegal: 'Ley de Timbre Fiscal (G.O. 6.150)',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SAREN — REGISTROS Y NOTARÍAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SAREN-MERCANTIL',
    nombre: 'Inscripción en Registro Mercantil',
    organismoId: 'SAREN',
    descripcion: 'Registro de la constitución de la empresa, actas de asamblea, poderes y documentos societarios.',
    vigencia: null,
    requisitosInscripcion: ['Acta constitutiva y estatutos', 'Reserva de denominación comercial', 'Cédulas de socios', 'Declaración jurada de capital'],
    requisitosRenovacion: ['Registro de actas de asamblea anuales', 'Actualización de directiva', 'Cambios de objeto social'],
    costoEstimado: 'Variable según capital social',
    baseLegal: 'Código de Comercio, Ley de Registros y Notarías',
    aplica: ['todos'],
  },
  {
    id: 'SAREN-DENOMINACION',
    nombre: 'Reserva de Denominación Comercial',
    organismoId: 'SAREN',
    descripcion: 'Reserva del nombre comercial de la empresa ante el Registro Mercantil por 30 días previo a la constitución.',
    vigencia: 1,
    requisitosInscripcion: ['Solicitud con 3 opciones de nombre', 'Cédula del solicitante', 'Pago de arancel'],
    requisitosRenovacion: ['Solicitar nueva reserva si venció'],
    costoEstimado: '0.5 UT',
    baseLegal: 'Ley de Registros y Notarías Art. 42',
    aplica: ['todos'],
  },
  {
    id: 'SAREN-PODERES',
    nombre: 'Registro de Poderes y Representación Legal',
    organismoId: 'SAREN',
    descripcion: 'Otorgamiento de poderes notariados para representación legal, judicial y extrajudicial de la empresa.',
    vigencia: null,
    requisitosInscripcion: ['Acta de asamblea autorizando el poder', 'Cédula del apoderado', 'Documento redactado por abogado'],
    requisitosRenovacion: ['Revocatoria y nuevo otorgamiento cuando aplique'],
    costoEstimado: '2-5 UT',
    baseLegal: 'Código Civil Art. 1.684-1.711',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SAPI — PROPIEDAD INTELECTUAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SAPI-MARCA',
    nombre: 'Registro de Marca Comercial',
    organismoId: 'SAPI',
    descripcion: 'Protección de marcas, nombres comerciales, lemas y emblemas. Vigencia de 10 años renovables.',
    vigencia: 120,
    requisitosInscripcion: ['Solicitud de registro', 'Diseño de marca/logotipo', 'Búsqueda de antecedentes fonéticos', 'Pago de tasas', 'Poder de representación (si aplica)'],
    requisitosRenovacion: ['Solicitud de renovación antes del vencimiento', 'Pago de tasa de renovación'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley de Propiedad Industrial (G.O. 25.227), Decisión CAN 486',
    aplica: ['todos'],
  },
  {
    id: 'SAPI-PATENTE',
    nombre: 'Patente de Invención',
    organismoId: 'SAPI',
    descripcion: 'Protección de invenciones técnicas por 20 años. Requiere novedad, nivel inventivo y aplicación industrial.',
    vigencia: 240,
    requisitosInscripcion: ['Descripción detallada de la invención', 'Reivindicaciones', 'Resumen', 'Dibujos técnicos', 'Comprobante de pago'],
    requisitosRenovacion: ['Pago de anualidades de mantenimiento'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Decisión CAN 486, Ley de Propiedad Industrial',
    aplica: ['industria', 'tecnologia'],
  },
  {
    id: 'SAPI-DERECHO-AUTOR',
    nombre: 'Registro de Derechos de Autor (Software)',
    organismoId: 'SAPI',
    descripcion: 'Protección de obras literarias, artísticas, software, bases de datos y creaciones originales.',
    vigencia: null,
    requisitosInscripcion: ['Obra en formato digital o físico', 'Declaración de autoría', 'Memoria descriptiva (software)', 'Depósito de código fuente'],
    requisitosRenovacion: ['No requiere renovación — protección vitalicia + 60 años'],
    costoEstimado: '3-8 UT',
    baseLegal: 'Ley sobre el Derecho de Autor (G.O. 4.638)',
    aplica: ['tecnologia', 'cultura', 'servicios'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE COMERCIO NACIONAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-COMERCIO-RUPDAE',
    nombre: 'Registro Único de Personas que Desarrollan Actividades Económicas (RUPDAE)',
    organismoId: 'MIN-COMERCIO',
    descripcion: 'Registro obligatorio ante la SUNDDE para toda persona natural o jurídica que realice actividades económicas en Venezuela.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Licencia de actividades económicas', 'Nómina de empleados', 'Declaración jurada de ingresos'],
    requisitosRenovacion: ['Actualización anual de datos', 'Declaración de ingresos brutos', 'Inventario actualizado'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Precios Justos Art. 22',
    aplica: ['todos'],
  },
  {
    id: 'MIN-COMERCIO-PRECIOS',
    nombre: 'Registro de Estructura de Costos y Precios Justos',
    organismoId: 'MIN-COMERCIO',
    descripcion: 'Presentación de la estructura de costos ante SUNDDE para fijación de Precios Justos de productos y servicios regulados.',
    vigencia: 12,
    requisitosInscripcion: ['RUPDAE vigente', 'Estructura de costos desglosada', 'Facturas de proveedores', 'Margen de ganancia propuesto'],
    requisitosRenovacion: ['Actualización trimestral o ante cambios de costos', 'Declaración de nuevos productos'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Precios Justos (G.O. 40.340)',
    aplica: ['alimentos', 'salud', 'comercio'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE COMERCIO EXTERIOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-COMEXT-RUSAD',
    nombre: 'Registro de Usuarios del Sistema Aduanero (RUSAD)',
    organismoId: 'MIN-COMERCIO-EXT',
    descripcion: 'Registro obligatorio para personas naturales o jurídicas que realizan operaciones de comercio exterior.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva con objeto social de importación/exportación', 'Solvencia tributaria SENIAT', 'Registro mercantil actualizado'],
    requisitosRenovacion: ['Actualización de datos bianuales', 'Solvencia tributaria vigente'],
    costoEstimado: '5 UT',
    baseLegal: 'Ley Orgánica de Aduanas, Resolución CENCOEX',
    aplica: ['comercio', 'industria'],
  },
  {
    id: 'MIN-COMEXT-CERTIFICADO-ORIGEN',
    nombre: 'Certificado de Origen de Mercancías',
    organismoId: 'MIN-COMERCIO-EXT',
    descripcion: 'Certificación del origen venezolano de productos para exportación y aprovechamiento de acuerdos comerciales.',
    vigencia: null,
    requisitosInscripcion: ['Registro de exportador', 'Factura comercial', 'Lista de empaque', 'Declaración de valor agregado nacional'],
    requisitosRenovacion: ['Solicitar por cada embarque'],
    costoEstimado: '2 UT por certificado',
    baseLegal: 'Decisión CAN 416, Acuerdos de libre comercio vigentes',
    aplica: ['comercio', 'industria', 'agricultura'],
  },
  {
    id: 'MIN-COMEXT-LICENCIA-IMPORT',
    nombre: 'Licencia de Importación',
    organismoId: 'MIN-COMERCIO-EXT',
    descripcion: 'Autorización previa para importar productos sujetos a régimen legal (sanitarios, alimentos, químicos, tecnología).',
    vigencia: 6,
    requisitosInscripcion: ['RUSAD vigente', 'Factura proforma del proveedor', 'Registro sanitario (si aplica)', 'Permiso fitosanitario (si aplica)'],
    requisitosRenovacion: ['Nueva solicitud por cada operación'],
    costoEstimado: 'Variable según producto',
    baseLegal: 'Ley Orgánica de Aduanas Art. 12, Resoluciones CENCOEX',
    aplica: ['comercio', 'industria', 'alimentos', 'salud'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA EL PROCESO SOCIAL DEL TRABAJO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-TRABAJO-SOLVENCIA',
    nombre: 'Solvencia Laboral',
    organismoId: 'MIN-TRABAJO',
    descripcion: 'Certificación de cumplimiento de obligaciones laborales (LOTTT, IVSS, INCES, BANAVIH, FAOV). Obligatoria para contratar con el Estado.',
    vigencia: 6,
    requisitosInscripcion: ['Inscripción IVSS al día', 'Aportes INCES pagados', 'Aportes BANAVIH/FAOV pagados', 'Nómina registrada en TIUNA'],
    requisitosRenovacion: ['Mantener aportes al día', 'Solicitar renovación cada 6 meses', 'Declaración trimestral INCES'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOTTT Art. 143, Decreto 4.248 (2024)',
    aplica: ['todos'],
  },
  {
    id: 'MIN-TRABAJO-REGISTRO-EMPRESA',
    nombre: 'Registro Nacional de Empresas y Establecimientos (RNEE)',
    organismoId: 'MIN-TRABAJO',
    descripcion: 'Inscripción obligatoria de toda empresa ante el Ministerio del Trabajo. Base para la inspección laboral.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Nómina de trabajadores', 'Dirección del establecimiento', 'Actividad económica'],
    requisitosRenovacion: ['Actualización ante cambios de razón social, dirección o actividad'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOTTT Art. 521-523',
    aplica: ['todos'],
  },
  {
    id: 'MIN-TRABAJO-HORARIO',
    nombre: 'Registro de Horario de Trabajo',
    organismoId: 'MIN-TRABAJO',
    descripcion: 'Aprobación del horario de trabajo por la Inspectoría del Trabajo competente.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud por escrito', 'Propuesta de horario', 'Nómina de trabajadores', 'Actividad económica que justifique el horario'],
    requisitosRenovacion: ['Nueva solicitud ante cambio de horario'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOTTT Art. 167-177',
    aplica: ['todos'],
  },
  {
    id: 'MIN-TRABAJO-UTILIDADES',
    nombre: 'Declaración de Utilidades',
    organismoId: 'MIN-TRABAJO',
    descripcion: 'Declaración anual del reparto de utilidades a trabajadores (mínimo 30 días, máximo 120 días de salario).',
    vigencia: 12,
    requisitosInscripcion: ['Balance general del ejercicio', 'Declaración de ISLR', 'Nómina de empleados', 'Cálculo de utilidades por trabajador'],
    requisitosRenovacion: ['Presentar antes del 15 de diciembre de cada año'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOTTT Art. 131-140',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA SALUD
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-SALUD-REGISTRO',
    nombre: 'Registro Sanitario de Productos',
    organismoId: 'MIN-SALUD',
    descripcion: 'Registro obligatorio para alimentos procesados, medicamentos, cosméticos y productos de higiene antes de su comercialización.',
    vigencia: 60,
    requisitosInscripcion: ['Ficha técnica del producto', 'Análisis de laboratorio certificado', 'Etiquetado conforme a normas COVENIN', 'Certificado de libre venta (importados)'],
    requisitosRenovacion: ['Actualización de ficha técnica', 'Nuevos análisis de laboratorio'],
    costoEstimado: '10-50 UT',
    baseLegal: 'Ley de Medicamentos, Resolución SG-2025-001',
    aplica: ['alimentos', 'salud', 'farmaceutico'],
  },
  {
    id: 'MIN-SALUD-PERMISO-SANITARIO',
    nombre: 'Permiso Sanitario de Funcionamiento',
    organismoId: 'MIN-SALUD',
    descripcion: 'Autorización sanitaria para establecimientos de salud, farmacias, laboratorios, clínicas y centros de diagnóstico.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Planos del establecimiento', 'Certificados de salud del personal', 'Director técnico habilitado', 'Equipamiento según normas'],
    requisitosRenovacion: ['Inspección sanitaria anual', 'Certificados de personal renovados', 'Inventario de equipos actualizado'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley Orgánica de Salud Art. 32',
    aplica: ['salud', 'farmaceutico'],
  },
  {
    id: 'MIN-SALUD-FARMACIA',
    nombre: 'Autorización de Funcionamiento de Farmacia',
    organismoId: 'MIN-SALUD',
    descripcion: 'Permiso específico para operar farmacias, droguerías y distribuidoras de medicamentos.',
    vigencia: 12,
    requisitosInscripcion: ['Regente farmacéutico titulado', 'Licencia municipal', 'Planos del establecimiento', 'Inventario inicial de medicamentos', 'Contrato del regente'],
    requisitosRenovacion: ['Inspección anual', 'Constancia del regente', 'Inventario actualizado'],
    costoEstimado: '15-25 UT',
    baseLegal: 'Ley de Medicamentos, Resolución MPPS 2024',
    aplica: ['farmaceutico', 'salud'],
  },
  {
    id: 'MIN-SALUD-ALIMENTOS',
    nombre: 'Permiso Sanitario para Establecimientos de Alimentos',
    organismoId: 'MIN-SALUD',
    descripcion: 'Certificación sanitaria para restaurantes, panaderías, fábricas de alimentos y expendios de comida.',
    vigencia: 12,
    requisitosInscripcion: ['Certificados de salud de manipuladores', 'Curso de manipulación de alimentos', 'Fumigación vigente', 'Análisis microbiológico de agua', 'Planos del establecimiento'],
    requisitosRenovacion: ['Inspección sanitaria anual', 'Renovar certificados de salud', 'Control de plagas actualizado'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley Orgánica de Salud, Resolución SG-0320-2024',
    aplica: ['alimentos'],
  },
  {
    id: 'MIN-SALUD-REGISTRO-COSMETICOS',
    nombre: 'Notificación Sanitaria de Cosméticos e Higiene',
    organismoId: 'MIN-SALUD',
    descripcion: 'Registro obligatorio para productos cosméticos, de higiene personal y del hogar.',
    vigencia: 60,
    requisitosInscripcion: ['Fórmula cualicuantitativa', 'Etiqueta del producto', 'Certificado de libre venta (importados)', 'Análisis de estabilidad'],
    requisitosRenovacion: ['Actualización de fórmula si hay cambios', 'Renovar análisis de laboratorio'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Decisión CAN 516, Resolución MPPS',
    aplica: ['comercio', 'industria'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA ALIMENTACIÓN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-ALIM-GUIA-MOVILIZACION',
    nombre: 'Guía de Movilización de Alimentos (SADA)',
    organismoId: 'MIN-ALIMENTACION',
    descripcion: 'Autorización para el transporte y distribución de alimentos regulados a nivel nacional a través del Sistema SADA.',
    vigencia: null,
    requisitosInscripcion: ['Registro SUNAGRO', 'RIF vigente', 'Licencia de actividades', 'Vehículo registrado'],
    requisitosRenovacion: ['Solicitar por cada despacho de mercancía regulada'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Seguridad y Soberanía Agroalimentaria',
    aplica: ['alimentos', 'comercio'],
  },
  {
    id: 'MIN-ALIM-SADA',
    nombre: 'Registro en el SADA (Sistema de Abastecimiento y Distribución de Alimentos)',
    organismoId: 'MIN-ALIMENTACION',
    descripcion: 'Inscripción de productores, industriales y distribuidores en el sistema de control alimentario nacional.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Registro SUNDDE/RUPDAE', 'Licencia de actividades', 'Descripción de productos', 'Capacidad instalada'],
    requisitosRenovacion: ['Actualización anual', 'Reporte de producción y distribución'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Seguridad y Soberanía Agroalimentaria Art. 15',
    aplica: ['alimentos', 'agricultura'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA EL ECOSOCIALISMO (AMBIENTE)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-AMBIENTE-RAC',
    nombre: 'Registro de Actividades Susceptibles de Degradar el Ambiente (RASDA)',
    organismoId: 'MIN-AMBIENTE',
    descripcion: 'Registro obligatorio para empresas cuyas actividades generen emisiones, efluentes o desechos peligrosos.',
    vigencia: 24,
    requisitosInscripcion: ['Descripción de procesos productivos', 'Plan de manejo de desechos', 'Estudio de emisiones atmosféricas'],
    requisitosRenovacion: ['Informe anual de gestión ambiental', 'Auditoría de cumplimiento'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley Penal del Ambiente (G.O. 39.913)',
    aplica: ['industria', 'mineria', 'construccion'],
  },
  {
    id: 'MIN-AMBIENTE-EIA',
    nombre: 'Estudio de Impacto Ambiental y Sociocultural (EIASC)',
    organismoId: 'MIN-AMBIENTE',
    descripcion: 'Evaluación obligatoria para proyectos que puedan generar impactos ambientales significativos (industriales, construcción, minería).',
    vigencia: 36,
    requisitosInscripcion: ['Proyecto técnico completo', 'Estudio de línea base ambiental', 'Plan de mitigación', 'Consulta pública comunitaria', 'Estudio sociocultural'],
    requisitosRenovacion: ['Informe de cumplimiento trianual', 'Auditoría ambiental externa'],
    costoEstimado: 'Variable según proyecto (consultoría)',
    baseLegal: 'Ley Orgánica del Ambiente Art. 129, Decreto 1.257',
    aplica: ['construccion', 'industria', 'mineria', 'energia'],
  },
  {
    id: 'MIN-AMBIENTE-DESECHOS',
    nombre: 'Autorización para Manejo de Desechos Peligrosos',
    organismoId: 'MIN-AMBIENTE',
    descripcion: 'Permiso para generación, almacenamiento, transporte y disposición final de desechos y materiales peligrosos.',
    vigencia: 12,
    requisitosInscripcion: ['Declaración de generador de desechos', 'Plan de manejo de desechos peligrosos', 'Contrato con empresa autorizada para disposición', 'Hojas de seguridad MSDS'],
    requisitosRenovacion: ['Informe anual de gestión de desechos', 'Actualización de plan de manejo'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Ley de Gestión Integral de Desechos Sólidos, Decreto 2.635',
    aplica: ['industria', 'salud', 'mineria'],
  },
  {
    id: 'MIN-AMBIENTE-FORESTAL',
    nombre: 'Permiso de Aprovechamiento Forestal',
    organismoId: 'MIN-AMBIENTE',
    descripcion: 'Autorización para tala, aprovechamiento o intervención en áreas boscosas o bajo régimen de administración especial.',
    vigencia: 12,
    requisitosInscripcion: ['Plan de manejo forestal', 'Inventario forestal', 'Estudio de impacto ambiental', 'Mapa de ubicación georeferenciado'],
    requisitosRenovacion: ['Informe de cumplimiento del plan', 'Reforestación compensatoria acreditada'],
    costoEstimado: 'Variable según superficie',
    baseLegal: 'Ley de Bosques (G.O. 40.222)',
    aplica: ['construccion', 'agricultura', 'industria'],
  },
  {
    id: 'MIN-AMBIENTE-EMISIONES',
    nombre: 'Permiso de Emisiones Atmosféricas',
    organismoId: 'MIN-AMBIENTE',
    descripcion: 'Autorización para fuentes fijas y móviles de emisiones contaminantes (chimeneas, calderas, generadores).',
    vigencia: 24,
    requisitosInscripcion: ['Inventario de fuentes de emisión', 'Análisis de calidad del aire', 'Plan de control de emisiones', 'Certificación de equipos'],
    requisitosRenovacion: ['Monitoreo semestral de emisiones', 'Informe de mantenimiento de equipos'],
    costoEstimado: '10-25 UT',
    baseLegal: 'Decreto 638 (Normas sobre Calidad del Aire)',
    aplica: ['industria', 'energia', 'mineria'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA ATENCIÓN DE LAS AGUAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-AGUAS-CONCESION',
    nombre: 'Concesión de Aprovechamiento de Aguas',
    organismoId: 'MIN-AGUAS',
    descripcion: 'Autorización para el uso de aguas superficiales o subterráneas con fines industriales, agrícolas o de consumo.',
    vigencia: 60,
    requisitosInscripcion: ['Estudio hidrogeológico', 'Proyecto de captación', 'Estudio de impacto ambiental', 'Análisis de calidad del agua'],
    requisitosRenovacion: ['Informe de uso del recurso hídrico', 'Análisis periódico de calidad de agua'],
    costoEstimado: '20-50 UT',
    baseLegal: 'Ley de Aguas (G.O. 38.595)',
    aplica: ['industria', 'agricultura', 'mineria'],
  },
  {
    id: 'MIN-AGUAS-VERTIDOS',
    nombre: 'Permiso de Vertido de Efluentes',
    organismoId: 'MIN-AGUAS',
    descripcion: 'Autorización para la descarga de aguas residuales tratadas en cuerpos de agua o sistemas de alcantarillado.',
    vigencia: 24,
    requisitosInscripcion: ['Caracterización de efluentes', 'Sistema de tratamiento de aguas residuales', 'Plan de monitoreo', 'Punto de descarga identificado'],
    requisitosRenovacion: ['Análisis trimestrales de efluentes', 'Informe de funcionamiento de planta de tratamiento'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Decreto 883 (Normas para Clasificación y Control de Cuerpos de Agua)',
    aplica: ['industria', 'mineria', 'alimentos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA EL TURISMO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-TURISMO-RTN',
    nombre: 'Registro Turístico Nacional (RTN)',
    organismoId: 'MIN-TURISMO',
    descripcion: 'Inscripción obligatoria para prestadores de servicios turísticos: hoteles, posadas, agencias de viaje, transporte turístico.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Licencia municipal', 'Póliza de responsabilidad civil', 'Clasificación por estrellas (hoteles)'],
    requisitosRenovacion: ['Inspección anual', 'Actualización de servicios ofrecidos', 'Solvencia tributaria'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Ley Orgánica de Turismo (G.O. 6.153)',
    aplica: ['turismo'],
  },
  {
    id: 'MIN-TURISMO-GUIA',
    nombre: 'Licencia de Guía de Turismo',
    organismoId: 'MIN-TURISMO',
    descripcion: 'Credencial obligatoria para personas que prestan servicios de guiatura turística profesional.',
    vigencia: 24,
    requisitosInscripcion: ['Curso de formación de guía turístico', 'Certificado de salud', 'Cédula de identidad', 'Fotografía reciente'],
    requisitosRenovacion: ['Actualización de formación', 'Certificado de salud renovado'],
    costoEstimado: '3-5 UT',
    baseLegal: 'Ley Orgánica de Turismo Art. 69',
    aplica: ['turismo'],
  },
  {
    id: 'MIN-TURISMO-CONTRIBUCION',
    nombre: 'Contribución Especial del 1% al Turismo',
    organismoId: 'MIN-TURISMO',
    descripcion: 'Contribución del 1% sobre ingresos brutos aplicable a prestadores de servicios turísticos.',
    vigencia: 12,
    requisitosInscripcion: ['RTN vigente', 'Declaración jurada de ingresos', 'RIF vigente'],
    requisitosRenovacion: ['Declaración y pago trimestral del 1%'],
    costoEstimado: '1% de ingresos brutos',
    baseLegal: 'Ley Orgánica de Turismo Art. 68',
    aplica: ['turismo'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA EL TRANSPORTE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-TRANSPORTE-PERM',
    nombre: 'Permiso de Operación de Transporte',
    organismoId: 'MIN-TRANSPORTE',
    descripcion: 'Habilitación para operar servicios de transporte terrestre de pasajeros o carga.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Certificado de inscripción vehicular', 'Póliza de seguro vigente', 'Revisión técnica vehicular'],
    requisitosRenovacion: ['Inspección vehicular anual', 'Póliza renovada', 'Solvencia de multas'],
    costoEstimado: '10-25 UT',
    baseLegal: 'Ley de Transporte Terrestre (G.O. 40.589)',
    aplica: ['transporte'],
  },
  {
    id: 'MIN-TRANSPORTE-CARGA',
    nombre: 'Permiso de Transporte de Carga Pesada y Peligrosa',
    organismoId: 'MIN-TRANSPORTE',
    descripcion: 'Autorización especial para vehículos que transporten carga sobredimensionada, extrapesada o materiales peligrosos.',
    vigencia: 12,
    requisitosInscripcion: ['Certificado técnico del vehículo', 'Hojas de seguridad de materiales (MSDS)', 'Póliza de responsabilidad civil ampliada', 'Curso de manejo de materiales peligrosos'],
    requisitosRenovacion: ['Inspección vehicular', 'Renovación de cursos de capacitación', 'Póliza actualizada'],
    costoEstimado: '15-40 UT',
    baseLegal: 'Ley de Transporte Terrestre Art. 97, Decreto 2.635',
    aplica: ['transporte', 'industria'],
  },
  {
    id: 'MIN-TRANSPORTE-MARITIMO',
    nombre: 'Permiso de Navegación y Transporte Marítimo',
    organismoId: 'MIN-TRANSPORTE',
    descripcion: 'Habilitación para embarcaciones de transporte de carga o pasajeros en aguas nacionales.',
    vigencia: 12,
    requisitosInscripcion: ['Matrícula de la embarcación', 'Certificado de navegabilidad', 'Póliza de seguro marítimo', 'Licencia de capitán/patrón'],
    requisitosRenovacion: ['Inspección naval anual', 'Renovación de matrícula', 'Póliza vigente'],
    costoEstimado: '20-50 UT',
    baseLegal: 'Ley de Marinas y Actividades Conexas',
    aplica: ['transporte', 'pesca'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE INDUSTRIAS Y PRODUCCIÓN NACIONAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-IND-REGISTRO',
    nombre: 'Registro Industrial Nacional',
    organismoId: 'MIN-INDUSTRIAS',
    descripcion: 'Inscripción obligatoria para toda empresa del sector industrial y manufacturero ante el Ministerio.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Permiso ambiental (si aplica)', 'Descripción de procesos productivos', 'Capacidad instalada'],
    requisitosRenovacion: ['Actualización de datos de producción', 'Informe de capacidad utilizada'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Decreto con Rango y Fuerza de Ley de Registros de la Actividad Industrial',
    aplica: ['industria'],
  },
  {
    id: 'MIN-IND-CERTIFICADO-PRODUCCION',
    nombre: 'Certificado de Producción Nacional',
    organismoId: 'MIN-INDUSTRIAS',
    descripcion: 'Certificación de que un producto es fabricado en Venezuela. Necesario para preferencia en compras públicas y protección arancelaria.',
    vigencia: 12,
    requisitosInscripcion: ['Registro Industrial vigente', 'Estructura de costos', 'Porcentaje de valor agregado nacional', 'Muestras del producto'],
    requisitosRenovacion: ['Verificación anual de producción', 'Actualización de porcentaje de valor agregado'],
    costoEstimado: '5-10 UT',
    baseLegal: 'Decreto de Preferencia para la Producción Nacional',
    aplica: ['industria'],
  },
  {
    id: 'MIN-IND-CALIDAD',
    nombre: 'Certificación de Calidad COVENIN',
    organismoId: 'MIN-INDUSTRIAS',
    descripcion: 'Certificación de productos conforme a normas técnicas venezolanas COVENIN. Obligatoria para ciertos productos regulados.',
    vigencia: 24,
    requisitosInscripcion: ['Muestras del producto', 'Análisis de laboratorio acreditado', 'Manual de calidad', 'Proceso productivo documentado'],
    requisitosRenovacion: ['Nuevos ensayos de laboratorio', 'Auditoría de calidad', 'Actualización de procesos'],
    costoEstimado: '10-50 UT (incluye ensayos)',
    baseLegal: 'Ley del Sistema Venezolano para la Calidad, Normas COVENIN',
    aplica: ['industria', 'alimentos', 'construccion'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA CIENCIA Y TECNOLOGÍA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-CIENCIA-LOCTI',
    nombre: 'Aporte LOCTI (Ley Orgánica de Ciencia, Tecnología e Innovación)',
    organismoId: 'MIN-CIENCIA',
    descripcion: 'Aporte obligatorio del 0.5% al 2% de los ingresos brutos anuales para financiar ciencia y tecnología.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Registro en plataforma SIDCAI', 'Declaración de ingresos brutos'],
    requisitosRenovacion: ['Declaración y pago anual antes del 30 de septiembre', 'Actualización de datos en SIDCAI'],
    costoEstimado: '0.5-2% de ingresos brutos',
    baseLegal: 'LOCTI (G.O. 39.575), Reglamento LOCTI 2024',
    aplica: ['todos'],
  },
  {
    id: 'MIN-CIENCIA-CENDITEL',
    nombre: 'Registro de Empresas de Base Tecnológica',
    organismoId: 'MIN-CIENCIA',
    descripcion: 'Inscripción de empresas de base tecnológica e innovación para acceso a incentivos fiscales y financiamiento.',
    vigencia: 24,
    requisitosInscripcion: ['Plan de negocio tecnológico', 'Descripción de productos/servicios innovadores', 'Equipo técnico calificado', 'RIF vigente'],
    requisitosRenovacion: ['Informe de actividades de I+D+i', 'Resultados de proyectos tecnológicos'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOCTI Art. 28, Decreto de Zonas Económicas de Tecnología',
    aplica: ['tecnologia', 'servicios'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE PETRÓLEO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-PETROLEO-CONTRATISTA',
    nombre: 'Registro Nacional de Contratistas Petroleros (RNCSP)',
    organismoId: 'MIN-ENERGIA',
    descripcion: 'Inscripción obligatoria para empresas que presten servicios a PDVSA y sus filiales.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva con objeto social petrolero', 'Solvencia laboral', 'Solvencia tributaria', 'Estados financieros auditados', 'Experiencia comprobada'],
    requisitosRenovacion: ['Actualización bianual', 'Estados financieros recientes', 'Solvencias vigentes'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley Orgánica de Hidrocarburos, Resolución MPPPM',
    aplica: ['petroleo', 'industria', 'servicios'],
  },
  {
    id: 'MIN-PETROLEO-DISTRIBUCION',
    nombre: 'Licencia de Distribución de Combustibles',
    organismoId: 'MIN-ENERGIA',
    descripcion: 'Autorización para operar estaciones de servicio y distribución de combustibles líquidos y GLP.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Conformidad de uso', 'Estudio de impacto ambiental', 'Certificación de tanques', 'Permiso de bomberos', 'Póliza de responsabilidad civil'],
    requisitosRenovacion: ['Inspección de tanques y dispensadores', 'Renovación de póliza', 'Certificación de calibración'],
    costoEstimado: '30-100 UT',
    baseLegal: 'Ley Orgánica de Hidrocarburos Art. 42',
    aplica: ['petroleo', 'comercio'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA ENERGÍA ELÉCTRICA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-ELEC-PUNTO-CONEXION',
    nombre: 'Permiso de Punto de Conexión Eléctrica Industrial',
    organismoId: 'MIN-ENERGIA-ELECTRICA',
    descripcion: 'Autorización para conexión de carga eléctrica industrial o comercial de alta demanda al sistema eléctrico nacional.',
    vigencia: null,
    requisitosInscripcion: ['Proyecto eléctrico firmado por ingeniero colegiado', 'Planos de instalaciones', 'Estudio de carga', 'Pago de acometida'],
    requisitosRenovacion: ['Actualización ante ampliación de carga'],
    costoEstimado: 'Variable según carga solicitada',
    baseLegal: 'Ley Orgánica del Sistema y Servicio Eléctrico',
    aplica: ['industria', 'comercio', 'construccion'],
  },
  {
    id: 'MIN-ELEC-AUTOGENERACION',
    nombre: 'Permiso de Autogeneración Eléctrica',
    organismoId: 'MIN-ENERGIA-ELECTRICA',
    descripcion: 'Autorización para instalar y operar plantas de generación eléctrica propia (diesel, gas, solar, eólica).',
    vigencia: 60,
    requisitosInscripcion: ['Proyecto técnico de generación', 'Estudio de impacto ambiental', 'Permiso del ecosocialismo', 'Planos de interconexión'],
    requisitosRenovacion: ['Informe de operación anual', 'Cumplimiento ambiental'],
    costoEstimado: '20-100 UT',
    baseLegal: 'Ley Orgánica del Sistema y Servicio Eléctrico Art. 16',
    aplica: ['industria', 'energia', 'mineria'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE DESARROLLO MINERO ECOLÓGICO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-MINERIA-CONCESION',
    nombre: 'Concesión Minera',
    organismoId: 'MIN-MINERIA',
    descripcion: 'Derecho para explorar, explotar y beneficiar minerales en un área determinada del territorio nacional.',
    vigencia: 240,
    requisitosInscripcion: ['Solicitud de concesión', 'Estudio geológico', 'Estudio de impacto ambiental', 'Plan de inversiones', 'Garantía financiera', 'Permiso de comunidades indígenas (si aplica)'],
    requisitosRenovacion: ['Pago de impuesto superficial anual', 'Informe de producción', 'Cumplimiento ambiental'],
    costoEstimado: '50-500 UT + regalías',
    baseLegal: 'Ley de Minas (G.O. 5.382), Decreto del Arco Minero del Orinoco',
    aplica: ['mineria'],
  },
  {
    id: 'MIN-MINERIA-AUTORIZACION',
    nombre: 'Autorización de Extracción de Minerales No Metálicos',
    organismoId: 'MIN-MINERIA',
    descripcion: 'Permiso para extracción de arena, grava, piedra, arcilla y otros minerales no metálicos.',
    vigencia: 24,
    requisitosInscripcion: ['Solicitud ante la gobernación', 'Estudio de impacto ambiental', 'Plano topográfico del área', 'Plan de restauración del terreno'],
    requisitosRenovacion: ['Informe de extracción', 'Cumplimiento del plan de restauración'],
    costoEstimado: '10-30 UT + regalías',
    baseLegal: 'Ley de Minas Art. 67-71',
    aplica: ['mineria', 'construccion'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA AGRICULTURA PRODUCTIVA Y TIERRAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-AGRI-CARTA-AGRARIA',
    nombre: 'Carta Agraria / Título de Adjudicación de Tierras',
    organismoId: 'MIN-AGRICULTURA',
    descripcion: 'Documento que otorga derechos de uso sobre tierras del Estado con vocación agrícola.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud ante el INTI', 'Plan de producción agrícola', 'Censo de trabajadores', 'Ubicación georeferenciada de la parcela'],
    requisitosRenovacion: ['Demostrar uso productivo de la tierra', 'Informe de producción anual'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de Tierras y Desarrollo Agrario Art. 17',
    aplica: ['agricultura'],
  },
  {
    id: 'MIN-AGRI-CERTIFICADO-FITOSANITARIO',
    nombre: 'Certificado Fitosanitario de Exportación',
    organismoId: 'MIN-AGRICULTURA',
    descripcion: 'Certificación del estado fitosanitario de productos vegetales para exportación.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud ante INSAI', 'Muestras del producto', 'Factura de exportación', 'Guía de despacho'],
    requisitosRenovacion: ['Solicitar por cada embarque'],
    costoEstimado: '2-5 UT por certificado',
    baseLegal: 'Ley de Salud Agrícola Integral Art. 55',
    aplica: ['agricultura', 'alimentos'],
  },
  {
    id: 'MIN-AGRI-REGISTRO-AGRICOLA',
    nombre: 'Registro Agrícola Nacional',
    organismoId: 'MIN-AGRICULTURA',
    descripcion: 'Inscripción de productores agropecuarios en el registro nacional para acceso a créditos, insumos y beneficios.',
    vigencia: 12,
    requisitosInscripcion: ['Cédula del productor', 'Carta agraria o documento de tenencia', 'Descripción de la unidad de producción', 'Tipo de cultivo o ganado'],
    requisitosRenovacion: ['Actualización anual de datos de producción'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de Tierras y Desarrollo Agrario',
    aplica: ['agricultura'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA PESCA Y ACUICULTURA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-PESCA-LICENCIA',
    nombre: 'Licencia de Pesca Comercial',
    organismoId: 'MIN-PESCA',
    descripcion: 'Autorización para realizar actividades de pesca comercial artesanal o industrial en aguas nacionales.',
    vigencia: 12,
    requisitosInscripcion: ['Registro de pescador', 'Matrícula de la embarcación', 'Certificado de navegabilidad', 'Registro ante INSOPESCA'],
    requisitosRenovacion: ['Pago de tasa anual', 'Informe de capturas', 'Inspección de embarcación'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Ley de Pesca y Acuicultura (G.O. 5.877)',
    aplica: ['pesca'],
  },
  {
    id: 'MIN-PESCA-ACUICULTURA',
    nombre: 'Permiso de Acuicultura',
    organismoId: 'MIN-PESCA',
    descripcion: 'Autorización para cultivo de organismos acuáticos (peces, camarones, moluscos) con fines comerciales.',
    vigencia: 24,
    requisitosInscripcion: ['Proyecto de acuicultura', 'Estudio de impacto ambiental', 'Concesión de uso de aguas', 'RIF vigente'],
    requisitosRenovacion: ['Informe de producción', 'Análisis de calidad de aguas'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley de Pesca y Acuicultura Art. 43-51',
    aplica: ['pesca', 'alimentos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA CULTURA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-CULTURA-ESPECTACULOS',
    nombre: 'Permiso de Espectáculos Públicos',
    organismoId: 'MIN-CULTURA',
    descripcion: 'Autorización para organizar eventos culturales, conciertos, festivales, exposiciones y espectáculos públicos.',
    vigencia: null,
    requisitosInscripcion: ['Descripción del evento', 'Plan de seguridad', 'Póliza de responsabilidad civil', 'Permiso de bomberos', 'Autorización de la alcaldía'],
    requisitosRenovacion: ['Solicitar por cada evento'],
    costoEstimado: '3-10 UT',
    baseLegal: 'Ley Orgánica de Cultura, Ordenanzas municipales',
    aplica: ['cultura', 'turismo', 'servicios'],
  },
  {
    id: 'MIN-CULTURA-PATRIMONIO',
    nombre: 'Autorización de Intervención en Bienes Patrimoniales',
    organismoId: 'MIN-CULTURA',
    descripcion: 'Permiso para modificar, restaurar o intervenir inmuebles declarados patrimonio cultural.',
    vigencia: null,
    requisitosInscripcion: ['Proyecto de intervención', 'Informe del estado del inmueble', 'Equipo restaurador calificado', 'Aprobación del IPC'],
    requisitosRenovacion: ['No aplica — permiso por proyecto'],
    costoEstimado: 'Gratuito (consultoría externa variable)',
    baseLegal: 'Ley de Protección y Defensa del Patrimonio Cultural',
    aplica: ['construccion', 'cultura'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA COMUNICACIÓN Y LA INFORMACIÓN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-COMUNICACION-MEDIO',
    nombre: 'Registro de Medios de Comunicación',
    organismoId: 'MIN-COMUNICACION',
    descripcion: 'Inscripción obligatoria para medios impresos, digitales, radiodifusión y televisión.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Director responsable', 'Descripción del medio', 'Alcance geográfico'],
    requisitosRenovacion: ['Actualización de datos', 'Informe de actividades'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de Responsabilidad Social en Radio, Televisión y Medios Electrónicos',
    aplica: ['servicios', 'tecnologia'],
  },
  {
    id: 'MIN-COMUNICACION-PUBLICIDAD',
    nombre: 'Autorización de Publicidad en Medios',
    organismoId: 'MIN-COMUNICACION',
    descripcion: 'Registro de agencias de publicidad y aprobación de contenidos publicitarios en medios regulados.',
    vigencia: 12,
    requisitosInscripcion: ['Registro del medio', 'Contenido publicitario a transmitir', 'Declaración de veracidad', 'RIF de la agencia'],
    requisitosRenovacion: ['Actualización de inventario publicitario', 'Cumplimiento de cuotas de contenido nacional'],
    costoEstimado: '2-10 UT',
    baseLegal: 'Ley RESORTE Art. 10, Reglamento de Publicidad',
    aplica: ['servicios', 'comercio'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA EDUCACIÓN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-EDUCACION-REGISTRO',
    nombre: 'Registro de Instituciones Educativas Privadas',
    organismoId: 'MIN-EDUCACION',
    descripcion: 'Autorización para operar instituciones educativas privadas en todos los niveles (inicial, primaria, media).',
    vigencia: 36,
    requisitosInscripcion: ['Proyecto educativo institucional', 'Planta física adecuada', 'Personal docente titulado', 'Plan de estudio aprobado', 'RIF vigente'],
    requisitosRenovacion: ['Inspección trianual', 'Actualización del proyecto educativo', 'Estadísticas de matrícula'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley Orgánica de Educación Art. 28',
    aplica: ['educacion'],
  },
  {
    id: 'MIN-EDUCACION-CENTRO-FORMACION',
    nombre: 'Registro de Centro de Formación y Capacitación',
    organismoId: 'MIN-EDUCACION',
    descripcion: 'Autorización para operar centros de formación para el trabajo, academias y centros de capacitación profesional.',
    vigencia: 24,
    requisitosInscripcion: ['Programa de formación', 'Instructores calificados', 'Infraestructura adecuada', 'RIF vigente'],
    requisitosRenovacion: ['Actualización de programas', 'Evaluación de instructores'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley Orgánica de Educación, Resoluciones MPPE',
    aplica: ['educacion', 'servicios'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA EDUCACIÓN UNIVERSITARIA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-EDUC-UNIV-INSTITUTO',
    nombre: 'Autorización de Funcionamiento de Instituto Universitario',
    organismoId: 'MIN-EDUCACION-UNIV',
    descripcion: 'Permiso para operar universidades privadas, institutos universitarios de tecnología y colegios universitarios.',
    vigencia: 60,
    requisitosInscripcion: ['Proyecto de creación institucional', 'Estudio de factibilidad', 'Planta profesoral calificada', 'Infraestructura académica', 'Plan de desarrollo'],
    requisitosRenovacion: ['Acreditación institucional', 'Evaluación externa', 'Informe de gestión'],
    costoEstimado: '50-200 UT',
    baseLegal: 'Ley de Universidades, Ley de la Educación Universitaria',
    aplica: ['educacion'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE ECONOMÍA Y FINANZAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-ECONOMIA-CONTRATISTA-ESTADO',
    nombre: 'Registro Nacional de Contratistas (RNC)',
    organismoId: 'MIN-ECONOMIA',
    descripcion: 'Inscripción obligatoria para empresas que deseen contratar con el Estado venezolano en cualquier modalidad.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Solvencia tributaria SENIAT', 'Solvencia laboral', 'Estados financieros auditados', 'Experiencia comprobada', 'Capacidad técnica y financiera'],
    requisitosRenovacion: ['Actualización anual', 'Estados financieros del ejercicio anterior', 'Solvencias vigentes'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley de Contrataciones Públicas (G.O. 6.154)',
    aplica: ['todos'],
  },
  {
    id: 'MIN-ECONOMIA-EXONERACION',
    nombre: 'Solicitud de Exoneración de Impuestos Aduaneros',
    organismoId: 'MIN-ECONOMIA',
    descripcion: 'Beneficio fiscal de exoneración de aranceles para importación de bienes de capital, materias primas e insumos prioritarios.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud fundamentada', 'Factura proforma', 'Justificación de uso productivo', 'Solvencia tributaria'],
    requisitosRenovacion: ['Solicitar por cada operación'],
    costoEstimado: 'Gratuito',
    baseLegal: 'COT Art. 73-76, Decretos de Exoneración vigentes',
    aplica: ['industria', 'agricultura', 'tecnologia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA RELACIONES INTERIORES, JUSTICIA Y PAZ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-INTERIOR-SEGURIDAD-PRIVADA',
    nombre: 'Permiso de Empresa de Seguridad y Vigilancia Privada',
    organismoId: 'MIN-INTERIOR',
    descripcion: 'Autorización para operar empresas de vigilancia, seguridad electrónica y transporte de valores.',
    vigencia: 24,
    requisitosInscripcion: ['RIF vigente', 'Registro mercantil', 'Póliza de seguro', 'Registro de armas (si aplica)', 'Personal acreditado por UNES/DAEX'],
    requisitosRenovacion: ['Inspección bianual', 'Actualización de personal', 'Póliza vigente'],
    costoEstimado: '20-50 UT',
    baseLegal: 'Ley de los Órganos de Investigaciones Científicas, Penales y Criminalísticas, Resolución MPPRIJP',
    aplica: ['servicios'],
  },
  {
    id: 'MIN-INTERIOR-EXPLOSIVOS',
    nombre: 'Permiso de Adquisición, Transporte y Uso de Explosivos',
    organismoId: 'MIN-INTERIOR',
    descripcion: 'Autorización especial para la compra, transporte y uso de materiales explosivos con fines industriales o de minería.',
    vigencia: 6,
    requisitosInscripcion: ['Solicitud ante DAEX', 'Certificado de uso final', 'Plan de seguridad', 'Personal capacitado en manejo de explosivos'],
    requisitosRenovacion: ['Solicitud cada 6 meses', 'Informe de uso y consumo'],
    costoEstimado: '10-30 UT',
    baseLegal: 'Ley de Armas y Explosivos Art. 37',
    aplica: ['mineria', 'construccion'],
  },
  {
    id: 'MIN-INTERIOR-SIGESPAD',
    nombre: 'Registro SIGESPAD (Gestión de Riesgos)',
    organismoId: 'MIN-INTERIOR',
    descripcion: 'Registro ante el Sistema Integrado de Gestión de Riesgo para empresas con operaciones de riesgo elevado.',
    vigencia: 24,
    requisitosInscripcion: ['Plan de emergencia y contingencia', 'Estudio de vulnerabilidad', 'Brigadas de emergencia conformadas', 'Simulacros documentados'],
    requisitosRenovacion: ['Actualización del plan de emergencia', 'Ejecución de simulacros anuales'],
    costoEstimado: '5-10 UT',
    baseLegal: 'Ley de Gestión de Riesgos Socionaturales y Tecnológicos',
    aplica: ['industria', 'petroleo', 'mineria', 'energia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA RELACIONES EXTERIORES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-RREE-APOSTILLA',
    nombre: 'Apostilla y Legalización de Documentos',
    organismoId: 'MIN-RREE',
    descripcion: 'Apostilla o legalización de documentos venezolanos para uso en el extranjero (Convenio de La Haya).',
    vigencia: null,
    requisitosInscripcion: ['Documento original a apostillar', 'Pago de tasa', 'Solicitud en línea'],
    requisitosRenovacion: ['No aplica — trámite por documento'],
    costoEstimado: '1-3 UT por documento',
    baseLegal: 'Convención de La Haya de 1961, Resolución MPPRE',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA DEFENSA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-DEFENSA-ARMAS',
    nombre: 'Permiso de Porte y Detentación de Armas de Fuego',
    organismoId: 'MIN-DEFENSA',
    descripcion: 'Autorización para empresas de seguridad privada para detentación y porte de armas de fuego.',
    vigencia: 12,
    requisitosInscripcion: ['Registro de empresa de seguridad', 'Solicitud ante DAEX', 'Certificación de personal en manejo de armas', 'Polígono de tiro acreditado'],
    requisitosRenovacion: ['Inspección anual de armas', 'Renovación de certificaciones de personal'],
    costoEstimado: '10-30 UT por arma',
    baseLegal: 'Ley para el Desarme y Control de Armas y Municiones',
    aplica: ['servicios'],
  },
  {
    id: 'MIN-DEFENSA-IMPORTACION-BIENES',
    nombre: 'Permiso de Importación de Bienes de Uso Dual (Civil/Militar)',
    organismoId: 'MIN-DEFENSA',
    descripcion: 'Autorización para importar equipos, sustancias químicas o tecnología de uso dual civil-militar.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud fundamentada', 'Certificado de uso final', 'Especificaciones técnicas del producto', 'Empresa importadora registrada'],
    requisitosRenovacion: ['Solicitar por cada operación de importación'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley Orgánica de la Fuerza Armada Nacional Bolivariana, Resoluciones MPPD',
    aplica: ['industria', 'tecnologia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA VIVIENDA Y HÁBITAT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-HABITAT-CONSTRUCCION',
    nombre: 'Permiso de Construcción',
    organismoId: 'MIN-HABITAT',
    descripcion: 'Autorización para desarrollar proyectos de construcción de viviendas y urbanismos.',
    vigencia: 24,
    requisitosInscripcion: ['Proyecto arquitectónico aprobado', 'Estudio de suelos', 'Cálculos estructurales', 'Permiso ambiental', 'Conformidad de uso', 'Registro de CIV del profesional responsable'],
    requisitosRenovacion: ['Informe de avance de obra', 'Solicitud de prórroga si no se culmina en el plazo'],
    costoEstimado: '10-50 UT',
    baseLegal: 'Ley Orgánica de Ordenación Urbanística Art. 84',
    aplica: ['construccion'],
  },
  {
    id: 'MIN-HABITAT-HABITABILIDAD',
    nombre: 'Certificado de Habitabilidad',
    organismoId: 'MIN-HABITAT',
    descripcion: 'Constancia de que una edificación cumple con las normas técnicas y puede ser habitada.',
    vigencia: null,
    requisitosInscripcion: ['Permiso de construcción aprobado', 'Inspección final de obra', 'Conformidad de bomberos', 'Conexión de servicios (agua, electricidad, gas)'],
    requisitosRenovacion: ['No aplica — trámite único'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley Orgánica de Ordenación Urbanística Art. 95',
    aplica: ['construccion'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA OBRAS PÚBLICAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-OBRAS-VIALIDAD',
    nombre: 'Permiso de Intervención en Vías Públicas',
    organismoId: 'MIN-OBRAS-PUBLICAS',
    descripcion: 'Autorización para realizar obras que afecten vías públicas nacionales (ductos, cableado, acometidas).',
    vigencia: null,
    requisitosInscripcion: ['Proyecto de obra', 'Plano de ubicación', 'Plan de desvío de tránsito', 'Póliza de seguro', 'Compromiso de restauración'],
    requisitosRenovacion: ['Solicitar por cada intervención'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Ley de Vías de Comunicación Terrestres',
    aplica: ['construccion', 'telecomunicaciones', 'energia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP DE PLANIFICACIÓN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-PLANIFICACION-ESTADISTICAS',
    nombre: 'Registro de Informante del INE',
    organismoId: 'MIN-PLANIFICACION',
    descripcion: 'Obligación de suministrar información estadística al Instituto Nacional de Estadística para planificación nacional.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Formulario de registro como informante', 'Datos de la unidad económica'],
    requisitosRenovacion: ['Responder encuestas y censos económicos del INE'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley de la Función Pública de Estadística (G.O. 37.321)',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA EL DEPORTE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-DEPORTE-CONTRIBUCION',
    nombre: 'Contribución Parafiscal del Deporte (LFDD)',
    organismoId: 'MIN-DEPORTE',
    descripcion: 'Aporte obligatorio del 1% sobre la utilidad neta anual para el Fondo Nacional del Deporte.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Registro en plataforma del IND', 'Declaración de utilidades'],
    requisitosRenovacion: ['Declaración y pago anual (antes del 31 de marzo)', 'Comprobante de pago'],
    costoEstimado: '1% de utilidad neta',
    baseLegal: 'Ley Orgánica de Deporte, Actividad Física y Educación Física Art. 68',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LA MUJER E IGUALDAD DE GÉNERO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-MUJER-PROTOCOLO',
    nombre: 'Protocolo de Prevención de Acoso Laboral y Violencia de Género',
    organismoId: 'MIN-MUJER',
    descripcion: 'Implementación obligatoria de protocolos de prevención de acoso y violencia de género en el ámbito laboral.',
    vigencia: null,
    requisitosInscripcion: ['Protocolo de prevención aprobado', 'Capacitación al personal', 'Canal de denuncias establecido', 'Comité de género conformado'],
    requisitosRenovacion: ['Actualización del protocolo', 'Capacitaciones anuales', 'Informe de gestión'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica sobre el Derecho de las Mujeres a una Vida Libre de Violencia, LOTTT Art. 164',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // MINISTERIO DEL PP PARA LAS COMUNAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'MIN-COMUNAS-REGISTRO',
    nombre: 'Registro ante el Consejo Comunal o Comuna',
    organismoId: 'MIN-COMUNAS',
    descripcion: 'Registro voluntario/obligatorio de empresas ante el consejo comunal de su jurisdicción para la participación en proyectos comunitarios.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Licencia municipal', 'Carta de presentación al consejo comunal', 'Descripción de la actividad económica'],
    requisitosRenovacion: ['Participación en asambleas comunitarias', 'Informe de responsabilidad social'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de las Comunas Art. 45, Ley de los Consejos Comunales',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CONATEL — TELECOMUNICACIONES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'CONATEL-HAB',
    nombre: 'Habilitación Administrativa de Telecomunicaciones',
    organismoId: 'CONATEL',
    descripcion: 'Autorización para prestar servicios de telecomunicaciones en Venezuela (internet, telefonía, datos).',
    vigencia: 60,
    requisitosInscripcion: ['Proyecto técnico de red', 'Plan de inversiones', 'Garantía de fiel cumplimiento', 'Estudio de factibilidad'],
    requisitosRenovacion: ['Pago de tasas trimestrales', 'Informe de cobertura', 'Cumplimiento de metas de inversión'],
    costoEstimado: '500-5000 UT',
    baseLegal: 'Ley Orgánica de Telecomunicaciones (G.O. 39.610)',
    aplica: ['telecomunicaciones'],
  },
  {
    id: 'CONATEL-CONCESION-RADIO',
    nombre: 'Concesión de Uso del Espectro Radioeléctrico',
    organismoId: 'CONATEL',
    descripcion: 'Autorización para uso de frecuencias radioeléctricas para radiodifusión, telecomunicaciones o comunicaciones privadas.',
    vigencia: 60,
    requisitosInscripcion: ['Solicitud de asignación de frecuencia', 'Proyecto técnico de radiocomunicaciones', 'Estudio de compatibilidad electromagnética', 'Pago de tasa'],
    requisitosRenovacion: ['Pago anual de derechos de uso', 'Informe de uso del espectro'],
    costoEstimado: '100-1000 UT (según frecuencia)',
    baseLegal: 'Ley Orgánica de Telecomunicaciones Art. 72-82',
    aplica: ['telecomunicaciones'],
  },
  {
    id: 'CONATEL-CONTRIBUCION',
    nombre: 'Contribución Especial a CONATEL',
    organismoId: 'CONATEL',
    descripcion: 'Aporte trimestral del 0.5% de los ingresos brutos de operadores de telecomunicaciones.',
    vigencia: null,
    requisitosInscripcion: ['Habilitación administrativa vigente', 'Declaración de ingresos brutos trimestrales'],
    requisitosRenovacion: ['Pago trimestral del 0.5% de ingresos brutos'],
    costoEstimado: '0.5% de ingresos brutos trimestrales',
    baseLegal: 'Ley Orgánica de Telecomunicaciones Art. 148',
    aplica: ['telecomunicaciones'],
  },
  {
    id: 'CONATEL-HOMOLOGACION',
    nombre: 'Homologación de Equipos de Telecomunicaciones',
    organismoId: 'CONATEL',
    descripcion: 'Certificación obligatoria para equipos y terminales de telecomunicaciones antes de su comercialización en Venezuela.',
    vigencia: 36,
    requisitosInscripcion: ['Especificaciones técnicas del equipo', 'Certificado de conformidad del fabricante', 'Muestra del equipo', 'Ensayos de laboratorio acreditado'],
    requisitosRenovacion: ['Nueva homologación ante cambios técnicos del equipo'],
    costoEstimado: '10-50 UT por modelo',
    baseLegal: 'Ley Orgánica de Telecomunicaciones Art. 147',
    aplica: ['telecomunicaciones', 'tecnologia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUNDDE — PRECIOS JUSTOS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SUNDDE-REG',
    nombre: 'Registro en el SICA (Sistema Integral de Control Agroalimentario)',
    organismoId: 'SUNDDE',
    descripcion: 'Registro obligatorio para productores, distribuidores y comercializadores de productos regulados y de primera necesidad.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Licencia de actividades', 'Inventario de productos', 'Lista de precios'],
    requisitosRenovacion: ['Actualización trimestral de precios', 'Reporte de inventarios', 'Cumplimiento de precios justos'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Precios Justos (G.O. 40.340)',
    aplica: ['alimentos', 'comercio'],
  },
  {
    id: 'SUNDDE-MARGEN-GANANCIA',
    nombre: 'Aprobación de Margen de Ganancia (SUNDDE)',
    organismoId: 'SUNDDE',
    descripcion: 'Verificación y aprobación del margen de ganancia máximo permitido (30%) para productos y servicios regulados.',
    vigencia: 12,
    requisitosInscripcion: ['Estructura de costos certificada por contador público', 'Facturas de proveedores', 'Nómina de empleados', 'Gastos operativos detallados'],
    requisitosRenovacion: ['Actualización ante variaciones de costos superiores al 10%'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Precios Justos Art. 32',
    aplica: ['alimentos', 'salud', 'comercio'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUNAGRO — GESTIÓN AGROALIMENTARIA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SUNAGRO-GUIA',
    nombre: 'Guía SADA de Movilización de Productos Agroalimentarios',
    organismoId: 'SUNAGRO',
    descripcion: 'Autorización electrónica para el transporte de rubros alimentarios entre estados.',
    vigencia: null,
    requisitosInscripcion: ['Registro en plataforma SUNAGRO', 'RIF vigente', 'Datos del transporte y carga'],
    requisitosRenovacion: ['Solicitar guía por cada despacho'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica de Seguridad y Soberanía Agroalimentaria',
    aplica: ['alimentos', 'agricultura'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BCV — BANCO CENTRAL DE VENEZUELA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'BCV-OPERADOR-CAMBIARIO',
    nombre: 'Autorización de Operador Cambiario',
    organismoId: 'BCV',
    descripcion: 'Habilitación para operar en el mercado cambiario venezolano (casas de cambio, mesas de cambio bancarias).',
    vigencia: 12,
    requisitosInscripcion: ['Registro SUDEBAN o SUNAVAL', 'Capital mínimo requerido', 'Sistema de prevención LCFT', 'Personal calificado certificado'],
    requisitosRenovacion: ['Auditoría anual', 'Cumplimiento de encaje legal', 'Reportes al BCV'],
    costoEstimado: '100-500 UT',
    baseLegal: 'Convenio Cambiario N° 1 (2018), Resoluciones BCV',
    aplica: ['financiero'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUDEBAN — SUPERVISIÓN BANCARIA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SUDEBAN-AUTORIZACION',
    nombre: 'Autorización de Funcionamiento de Institución Financiera',
    organismoId: 'SUDEBAN',
    descripcion: 'Permiso para operar como banco, institución financiera, microfinanciera, fintech o empresa de arrendamiento financiero.',
    vigencia: null,
    requisitosInscripcion: ['Capital social mínimo', 'Estudio de factibilidad', 'Junta directiva calificada', 'Manual de prevención LCFT', 'Infraestructura tecnológica certificada'],
    requisitosRenovacion: ['Auditoría externa anual', 'Reportes mensuales a SUDEBAN', 'Cumplimiento de encaje legal'],
    costoEstimado: 'Variable (millones de Bs)',
    baseLegal: 'Decreto con Rango y Fuerza de Ley de Instituciones del Sector Bancario',
    aplica: ['financiero'],
  },
  {
    id: 'SUDEBAN-LCFT',
    nombre: 'Registro de Sujeto Obligado — Prevención LCFT',
    organismoId: 'SUDEBAN',
    descripcion: 'Inscripción como sujeto obligado en materia de prevención de legitimación de capitales y financiamiento del terrorismo.',
    vigencia: null,
    requisitosInscripcion: ['Oficial de cumplimiento designado', 'Manual de prevención LCFT aprobado', 'Sistema de detección de operaciones sospechosas', 'Capacitación al personal'],
    requisitosRenovacion: ['Actualización anual del manual', 'Reportes de operaciones sospechosas', 'Auditoría de cumplimiento'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ley Orgánica contra la Delincuencia Organizada y Financiamiento al Terrorismo',
    aplica: ['financiero', 'servicios'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUNAVAL — MERCADO DE VALORES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SUNAVAL-REGISTRO',
    nombre: 'Registro ante SUNAVAL (Emisor de Valores)',
    organismoId: 'SUNAVAL',
    descripcion: 'Inscripción para emitir acciones, bonos u otros títulos valores en el mercado de capitales venezolano.',
    vigencia: 12,
    requisitosInscripcion: ['Estados financieros auditados (3 años)', 'Prospecto de emisión', 'Calificación de riesgo', 'Acuerdo de asamblea autorizando la emisión'],
    requisitosRenovacion: ['Estados financieros anuales', 'Hechos relevantes', 'Información trimestral'],
    costoEstimado: '50-200 UT',
    baseLegal: 'Ley de Mercado de Valores (G.O. 39.489)',
    aplica: ['financiero'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUDEASEG — ACTIVIDAD ASEGURADORA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SUDEASEG-AUTORIZACION',
    nombre: 'Autorización de Empresa de Seguros',
    organismoId: 'SUDEASEG',
    descripcion: 'Permiso para operar como empresa de seguros, reaseguros, corredora de seguros o sociedad de corretaje.',
    vigencia: null,
    requisitosInscripcion: ['Capital social mínimo', 'Plan de negocios', 'Reservas técnicas constituidas', 'Personal actuarial certificado', 'Reaseguro contratado'],
    requisitosRenovacion: ['Estados financieros auditados anuales', 'Índices de solvencia', 'Reportes trimestrales'],
    costoEstimado: 'Variable (millones de Bs)',
    baseLegal: 'Ley de la Actividad Aseguradora (G.O. 39.481)',
    aplica: ['financiero'],
  },

  // ═══════════════════════════════════════════════════════════════
  // SENCAMER — NORMALIZACIÓN Y METROLOGÍA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'SENCAMER-COVENIN',
    nombre: 'Certificación Marca NORVEN / COVENIN',
    organismoId: 'SENCAMER',
    descripcion: 'Sello de calidad que certifica que un producto cumple con las normas técnicas venezolanas COVENIN.',
    vigencia: 24,
    requisitosInscripcion: ['Solicitud de certificación', 'Muestras del producto', 'Ensayos de laboratorio acreditado', 'Manual de calidad del fabricante'],
    requisitosRenovacion: ['Auditoría de seguimiento', 'Nuevos ensayos periódicos'],
    costoEstimado: '15-50 UT',
    baseLegal: 'Ley del Sistema Venezolano para la Calidad Art. 29',
    aplica: ['industria', 'alimentos', 'construccion'],
  },
  {
    id: 'SENCAMER-METROLOGIA',
    nombre: 'Verificación Metrológica de Instrumentos de Medición',
    organismoId: 'SENCAMER',
    descripcion: 'Calibración y verificación obligatoria de balanzas, surtidores de combustible, medidores de gas y otros instrumentos comerciales.',
    vigencia: 12,
    requisitosInscripcion: ['Inventario de instrumentos de medición', 'Solicitud de verificación', 'Acceso al establecimiento para inspección'],
    requisitosRenovacion: ['Verificación anual de todos los instrumentos'],
    costoEstimado: '2-10 UT por instrumento',
    baseLegal: 'Ley de Metrología (G.O. 38.819)',
    aplica: ['comercio', 'industria', 'petroleo'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INSAI — SALUD AGRÍCOLA INTEGRAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INSAI-REGISTRO-INSUMOS',
    nombre: 'Registro de Insumos Agrícolas (Plaguicidas, Fertilizantes)',
    organismoId: 'INSAI',
    descripcion: 'Registro obligatorio para fabricar, importar o comercializar insumos agrícolas (plaguicidas, fertilizantes, semillas).',
    vigencia: 60,
    requisitosInscripcion: ['Ficha técnica del producto', 'Análisis de laboratorio', 'Estudios de eficacia y toxicología', 'Etiquetado conforme a normativa'],
    requisitosRenovacion: ['Actualización de ficha técnica', 'Nuevos estudios si hay cambios de formulación'],
    costoEstimado: '10-50 UT',
    baseLegal: 'Ley de Salud Agrícola Integral Art. 33-40',
    aplica: ['agricultura'],
  },
  {
    id: 'INSAI-CERTIFICADO-ZOOSANITARIO',
    nombre: 'Certificado Zoosanitario',
    organismoId: 'INSAI',
    descripcion: 'Certificación de sanidad animal para movilización, importación o exportación de animales y productos de origen animal.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud ante INSAI', 'Guía de movilización', 'Exámenes veterinarios', 'Vacunaciones al día'],
    requisitosRenovacion: ['Solicitar por cada movilización o embarque'],
    costoEstimado: '2-5 UT por certificado',
    baseLegal: 'Ley de Salud Agrícola Integral Art. 47',
    aplica: ['agricultura', 'alimentos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CENCOEX — COMERCIO EXTERIOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'CENCOEX-AAD',
    nombre: 'Autorización de Adquisición de Divisas (AAD)',
    organismoId: 'CENCOEX',
    descripcion: 'Autorización para adquirir divisas al tipo de cambio oficial para importaciones y pagos al exterior.',
    vigencia: null,
    requisitosInscripcion: ['RUSAD vigente', 'Factura proforma del proveedor', 'Solvencia tributaria', 'Registro sanitario (si aplica)'],
    requisitosRenovacion: ['Solicitar por cada operación de importación'],
    costoEstimado: 'Gratuito (comisión bancaria)',
    baseLegal: 'Convenio Cambiario vigente, Resoluciones BCV',
    aplica: ['comercio', 'industria'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CORPOELEC — SERVICIO ELÉCTRICO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'CORPOELEC-ACOMETIDA',
    nombre: 'Solicitud de Acometida Eléctrica Comercial/Industrial',
    organismoId: 'CORPOELEC',
    descripcion: 'Solicitud de punto de conexión eléctrica para establecimientos comerciales o industriales.',
    vigencia: null,
    requisitosInscripcion: ['Proyecto eléctrico firmado por ingeniero', 'Cédula del representante legal', 'RIF vigente', 'Documento de propiedad o arrendamiento'],
    requisitosRenovacion: ['Modificación ante ampliación de carga instalada'],
    costoEstimado: 'Variable según carga',
    baseLegal: 'Ley Orgánica del Sistema y Servicio Eléctrico',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INTT — TRANSPORTE TERRESTRE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INTT-REVISION-VEHICULAR',
    nombre: 'Revisión Técnica Vehicular',
    organismoId: 'INTT',
    descripcion: 'Inspección técnica obligatoria anual para vehículos de transporte público, carga y comerciales.',
    vigencia: 12,
    requisitosInscripcion: ['Certificado de registro vehicular', 'Vehículo en condiciones mecánicas', 'Pago de tasa'],
    requisitosRenovacion: ['Inspección anual'],
    costoEstimado: '2-5 UT',
    baseLegal: 'Ley de Transporte Terrestre Art. 73',
    aplica: ['transporte'],
  },
  {
    id: 'INTT-TITULO-VEHICULAR',
    nombre: 'Certificado de Registro de Vehículo',
    organismoId: 'INTT',
    descripcion: 'Título de propiedad y registro de vehículos ante el Instituto Nacional de Transporte Terrestre.',
    vigencia: null,
    requisitosInscripcion: ['Factura de compra o documento de propiedad', 'Cédula del propietario', 'Pago de aranceles'],
    requisitosRenovacion: ['Traspaso ante cambio de propietario'],
    costoEstimado: '3-10 UT',
    baseLegal: 'Ley de Transporte Terrestre Art. 64',
    aplica: ['transporte', 'todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INN — INSTITUTO NACIONAL DE NUTRICIÓN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INN-TABLA-NUTRICIONAL',
    nombre: 'Aprobación de Tabla de Valor Nutricional',
    organismoId: 'INN',
    descripcion: 'Aprobación del etiquetado nutricional obligatorio para alimentos procesados comercializados en Venezuela.',
    vigencia: 60,
    requisitosInscripcion: ['Análisis de composición nutricional', 'Etiqueta propuesta', 'Registro sanitario del producto'],
    requisitosRenovacion: ['Actualización ante cambios de formulación'],
    costoEstimado: '3-10 UT',
    baseLegal: 'Resolución INN, Norma COVENIN 2952',
    aplica: ['alimentos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INPSASEL — SEGURIDAD Y SALUD LABORAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INPSASEL-REG',
    nombre: 'Registro INPSASEL / Comité de Seguridad y Salud Laboral',
    organismoId: 'INPSASEL',
    descripcion: 'Registro del comité de seguridad laboral y notificación de riesgos. Obligatorio para empresas con 5+ trabajadores.',
    vigencia: 24,
    requisitosInscripcion: ['Acta de constitución del comité', 'Programa de seguridad y salud', 'Notificación de riesgos por puesto', 'Exámenes pre-empleo'],
    requisitosRenovacion: ['Informe anual de gestión de seguridad', 'Actualización del programa', 'Renovación de delegados'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOPCYMAT (G.O. 38.236)',
    aplica: ['todos'],
  },
  {
    id: 'INPSASEL-ACCIDENTES',
    nombre: 'Declaración de Accidentes y Enfermedades Ocupacionales',
    organismoId: 'INPSASEL',
    descripcion: 'Obligación de reportar accidentes laborales y enfermedades ocupacionales dentro de las 24 horas siguientes.',
    vigencia: null,
    requisitosInscripcion: ['Sistema de declaración en línea', 'Informe del accidente', 'Datos del trabajador afectado'],
    requisitosRenovacion: ['Reportar cada incidente dentro de 24 horas'],
    costoEstimado: 'Gratuito',
    baseLegal: 'LOPCYMAT Art. 73',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // IVSS — SEGURO SOCIAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'IVSS-REG',
    nombre: 'Inscripción Patronal y de Trabajadores IVSS',
    organismoId: 'IVSS',
    descripcion: 'Registro como patrono y afiliación de trabajadores al Seguro Social Obligatorio.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Nómina de empleados', 'Formulario 14-01 y 14-02'],
    requisitosRenovacion: ['Reportar altas y bajas mensualmente', 'Pagar cotizaciones al día'],
    costoEstimado: '9-11% del salario (patrono)',
    baseLegal: 'Ley del Seguro Social Obligatorio (G.O. 39.912)',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INCES — FORMACIÓN PROFESIONAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INCES-REG',
    nombre: 'Inscripción y Aportes INCES',
    organismoId: 'INCES',
    descripcion: 'Registro patronal y pago del aporte del 2% sobre nómina trimestral para formación profesional.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Nómina de trabajadores', 'Registro en plataforma INCES'],
    requisitosRenovacion: ['Declaración trimestral', 'Pago del 2% sobre nómina', 'Constancia de aporte'],
    costoEstimado: '2% de nómina trimestral',
    baseLegal: 'Ley del INCES (G.O. 38.968)',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BANAVIH — VIVIENDA Y HÁBITAT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'BANAVIH-REG',
    nombre: 'Aportes al FAOV (Fondo de Ahorro Obligatorio para la Vivienda)',
    organismoId: 'BANAVIH',
    descripcion: 'Registro y pago mensual del aporte patronal (2%) y del trabajador (1%) al fondo de vivienda.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Nómina actualizada', 'Registro en plataforma BANAVIH'],
    requisitosRenovacion: ['Pago mensual de aportes', 'Actualización de nómina'],
    costoEstimado: '3% del salario integral',
    baseLegal: 'Ley del Régimen Prestacional de Vivienda y Hábitat',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CUERPO DE BOMBEROS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'BOMBEROS-PERMISO',
    nombre: 'Certificado de Conformidad de Bomberos',
    organismoId: 'CUERPO-BOMBEROS',
    descripcion: 'Certificación de cumplimiento de normas de seguridad contra incendios para establecimientos comerciales e industriales.',
    vigencia: 12,
    requisitosInscripcion: ['Planos del establecimiento', 'Extintores vigentes según tipo y carga', 'Señalización de emergencia', 'Plan de evacuación', 'Detector de humo (si aplica)', 'Ruta de escape señalizada'],
    requisitosRenovacion: ['Inspección anual', 'Mantenimiento de extintores certificado', 'Simulacro de evacuación documentado'],
    costoEstimado: '3-15 UT',
    baseLegal: 'Ley de Bomberos y Administración de Emergencias',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INEA — ESPACIOS ACUÁTICOS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'INEA-MATRICULA',
    nombre: 'Matrícula de Embarcación',
    organismoId: 'INEA',
    descripcion: 'Registro obligatorio de embarcaciones en el Registro Naval Venezolano.',
    vigencia: null,
    requisitosInscripcion: ['Documento de propiedad de la embarcación', 'Certificado de construcción o importación', 'Inspección naval', 'Cédula del propietario'],
    requisitosRenovacion: ['Actualización ante cambio de propietario o modificaciones'],
    costoEstimado: '5-20 UT',
    baseLegal: 'Ley de Marinas y Actividades Conexas Art. 25',
    aplica: ['transporte', 'pesca'],
  },

  // ═══════════════════════════════════════════════════════════════
  // ALCALDÍAS — PERMISOS MUNICIPALES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ALC-LICENCIA-ACT',
    nombre: 'Licencia de Actividades Económicas (Patente de Industria y Comercio)',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Permiso municipal obligatorio para ejercer actividades económicas en el municipio. Se renueva anualmente.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Conformidad de uso (zonificación)', 'Permiso de bomberos', 'Solvencia municipal', 'Contrato de arrendamiento o título de propiedad'],
    requisitosRenovacion: ['Declaración jurada de ingresos brutos', 'Pago del impuesto sobre actividades económicas', 'Solvencia municipal vigente'],
    costoEstimado: 'Variable según clasificador de actividades',
    baseLegal: 'Ordenanza sobre Actividades Económicas del Municipio (2024)',
    aplica: ['todos'],
  },
  {
    id: 'ALC-CONFORMIDAD-USO',
    nombre: 'Conformidad de Uso (Zonificación)',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Certificación de que el inmueble puede ser utilizado para la actividad comercial declarada según el plan de zonificación.',
    vigencia: null,
    requisitosInscripcion: ['Copia de documento de propiedad o contrato de arrendamiento', 'Croquis de ubicación', 'Descripción de actividad a realizar'],
    requisitosRenovacion: ['Solo si cambia la actividad económica o la dirección'],
    costoEstimado: '2-5 UT municipales',
    baseLegal: 'Ley Orgánica de Ordenación Urbanística',
    aplica: ['todos'],
  },
  {
    id: 'ALC-BOMBEROS',
    nombre: 'Permiso del Cuerpo de Bomberos (Municipal)',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Inspección y certificación de cumplimiento de normas de seguridad contra incendios del establecimiento comercial a nivel municipal.',
    vigencia: 12,
    requisitosInscripcion: ['Planos del local', 'Extintores vigentes', 'Señalización de emergencia', 'Plan de evacuación'],
    requisitosRenovacion: ['Inspección anual', 'Mantenimiento de extintores certificado', 'Actualización del plan de evacuación'],
    costoEstimado: '3-10 UT municipales',
    baseLegal: 'Ley de Bomberos y Administración de Emergencias',
    aplica: ['todos'],
  },
  {
    id: 'ALC-PUBLICIDAD',
    nombre: 'Permiso de Publicidad Comercial y Propaganda',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización para instalar avisos, vallas o publicidad exterior en fachadas o áreas públicas del municipio.',
    vigencia: 12,
    requisitosInscripcion: ['Diseño del aviso a escala', 'Fotografía de fachada actual', 'Licencia de actividades vigente'],
    requisitosRenovacion: ['Pago anual del impuesto sobre propaganda', 'Fotografía actualizada'],
    costoEstimado: 'Variable según m²',
    baseLegal: 'Ordenanza sobre Propaganda y Publicidad Comercial',
    aplica: ['todos'],
  },
  {
    id: 'ALC-SOLVENCIA',
    nombre: 'Solvencia Municipal',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Constancia de estar al día con los impuestos municipales. Necesaria para trámites bancarios, licitaciones y renovaciones.',
    vigencia: 3,
    requisitosInscripcion: ['Pago de impuestos municipales al día', 'Licencia de actividades vigente'],
    requisitosRenovacion: ['Solicitar cada trimestre', 'Demostrar solvencia de pagos'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Ordenanza de Hacienda Municipal',
    aplica: ['todos'],
  },
  {
    id: 'ALC-INMUEBLES-URBANOS',
    nombre: 'Impuesto sobre Inmuebles Urbanos',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Pago del impuesto anual sobre el valor de los inmuebles urbanos (derecho de frente).',
    vigencia: 12,
    requisitosInscripcion: ['Documento de propiedad del inmueble', 'Cédula catastral', 'Pago anual del impuesto'],
    requisitosRenovacion: ['Pago anual antes del 31 de marzo'],
    costoEstimado: 'Variable según valor catastral',
    baseLegal: 'Ordenanza de Impuesto sobre Inmuebles Urbanos',
    aplica: ['todos'],
  },
  {
    id: 'ALC-VEHICULOS',
    nombre: 'Impuesto sobre Vehículos',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Pago del impuesto municipal sobre vehículos automotores registrados en el municipio.',
    vigencia: 12,
    requisitosInscripcion: ['Certificado de registro vehicular', 'Domicilio fiscal en el municipio'],
    requisitosRenovacion: ['Pago anual del impuesto'],
    costoEstimado: 'Variable según tipo y año del vehículo',
    baseLegal: 'Ordenanza de Impuesto sobre Vehículos',
    aplica: ['todos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // ALCALDÍAS — PERMISOS MUNICIPALES ADICIONALES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ALC-CONSTRUCCION',
    nombre: 'Permiso de Construcción Municipal',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización municipal para ejecutar obras de construcción, remodelación o ampliación de inmuebles.',
    vigencia: 24,
    requisitosInscripcion: ['Proyecto firmado por profesional inscrito en CIV', 'Permiso de Ingeniería Municipal', 'Conformidad de uso', 'Estudio de suelos', 'Planos arquitectónicos y estructurales'],
    requisitosRenovacion: ['Solicitud de prórroga antes del vencimiento', 'Informe de avance de obra'],
    costoEstimado: 'Variable según m² de construcción',
    baseLegal: 'Ley Orgánica de Ordenación Urbanística, Ordenanza de Construcciones',
    aplica: ['construccion'],
  },
  {
    id: 'ALC-HABITABILIDAD',
    nombre: 'Certificado de Habitabilidad Municipal',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Constancia de que la edificación cumple las condiciones para ser habitada o utilizada según las normas de construcción.',
    vigencia: null,
    requisitosInscripcion: ['Permiso de construcción otorgado', 'Acta de terminación de obra', 'Inspección final aprobada', 'Planos conforme a obra'],
    requisitosRenovacion: ['No requiere renovación (permanente)'],
    costoEstimado: '5-15 UT municipales',
    baseLegal: 'Ley Orgánica de Ordenación Urbanística',
    aplica: ['construccion'],
  },
  {
    id: 'ALC-ESPECTACULOS',
    nombre: 'Permiso para Espectáculos Públicos y Eventos',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización municipal para realizar eventos, espectáculos públicos, ferias comerciales o actividades masivas.',
    vigencia: null,
    requisitosInscripcion: ['Solicitud con 15 días de anticipación', 'Plan de seguridad y evacuación', 'Póliza de responsabilidad civil', 'Autorización de bomberos', 'Permiso de SAIME si hay artistas extranjeros'],
    requisitosRenovacion: ['Solicitar por cada evento'],
    costoEstimado: '5-50 UT según capacidad del evento',
    baseLegal: 'Ordenanza de Convivencia Ciudadana y Espectáculos Públicos',
    aplica: ['cultura', 'deporte', 'turismo', 'servicios'],
  },
  {
    id: 'ALC-HORARIO-EXTENDIDO',
    nombre: 'Permiso de Horario Nocturno/Extendido',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización para operar establecimientos comerciales fuera del horario ordinario (después de las 10 PM).',
    vigencia: 12,
    requisitosInscripcion: ['Licencia de actividades vigente', 'Autorización de bomberos', 'Plan de seguridad nocturna', 'Consulta vecinal (si aplica)'],
    requisitosRenovacion: ['Pago anual de la tasa', 'No haber recibido sanciones por ruido'],
    costoEstimado: '10-30 UT municipales',
    baseLegal: 'Ordenanza de Actividades Económicas',
    aplica: ['comercio', 'alimentos', 'turismo'],
  },
  {
    id: 'ALC-ASEO-URBANO',
    nombre: 'Tasa de Aseo Urbano y Domiciliario',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Pago de la tasa por servicio de recolección de desechos sólidos comerciales e industriales.',
    vigencia: 12,
    requisitosInscripcion: ['Inscripción como contribuyente comercial del servicio', 'Clasificación del volumen de desechos'],
    requisitosRenovacion: ['Pago trimestral o anual según facturación'],
    costoEstimado: 'Variable según volumen de desechos',
    baseLegal: 'Ordenanza de Gestión de Residuos Sólidos',
    aplica: ['todos'],
  },
  {
    id: 'ALC-CATASTRO',
    nombre: 'Inscripción Catastral Municipal',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Registro del inmueble en el catastro municipal para efectos tributarios y urbanísticos.',
    vigencia: null,
    requisitosInscripcion: ['Documento de propiedad del inmueble', 'Plano de mensura', 'Cédula del propietario o representante legal', 'Pago de tasa de inscripción'],
    requisitosRenovacion: ['Actualización cuando haya modificaciones al inmueble'],
    costoEstimado: '2-5 UT municipales',
    baseLegal: 'Ley de Geografía, Cartografía y Catastro Nacional',
    aplica: ['todos'],
  },
  {
    id: 'ALC-OCUPACION-VIA',
    nombre: 'Permiso de Ocupación de Vía Pública',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización para uso temporal del espacio público (terrazas de restaurantes, obras, ferias, food trucks).',
    vigencia: null,
    requisitosInscripcion: ['Solicitud indicando ubicación, área y período', 'Croquis del área a ocupar', 'Licencia de actividades vigente', 'Póliza de responsabilidad civil'],
    requisitosRenovacion: ['Solicitar para cada período de uso'],
    costoEstimado: 'Variable según m² y duración',
    baseLegal: 'Ordenanza sobre Uso del Espacio Público',
    aplica: ['comercio', 'alimentos', 'turismo', 'construccion'],
  },
  {
    id: 'ALC-VERTIDOS',
    nombre: 'Permiso de Descarga de Aguas Residuales (Municipal)',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Autorización para descarga de efluentes industriales o comerciales al sistema de alcantarillado municipal.',
    vigencia: 12,
    requisitosInscripcion: ['Análisis de efluentes', 'Descripción del proceso productivo', 'Plan de tratamiento de aguas residuales'],
    requisitosRenovacion: ['Análisis de calidad de efluentes actualizado', 'Inspección del sistema de tratamiento'],
    costoEstimado: '5-20 UT municipales',
    baseLegal: 'Ordenanza sobre Descarga de Aguas Servidas',
    aplica: ['industria', 'alimentos'],
  },

  // ═══════════════════════════════════════════════════════════════
  // GOBERNACIONES — PERMISOS ESTADALES (GENÉRICOS, APLICAN EN TODOS LOS 24 ESTADOS + D.C.)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'GOB-SANIDAD',
    nombre: 'Permiso Sanitario (Corposalud)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Certificación sanitaria obligatoria para establecimientos que manipulen alimentos, productos farmacéuticos o presten servicios de salud. Se tramita ante la Dirección de Salud Ambiental de la Gobernación correspondiente.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Permiso de bomberos', 'Certificados de salud del personal (exámenes médicos)', 'Fumigación vigente (contrato con empresa certificada)', 'Análisis de agua potable', 'Licencia de actividades económicas vigente', 'Fotografías del establecimiento'],
    requisitosRenovacion: ['Inspección sanitaria anual aprobada', 'Certificados de salud renovados', 'Control de plagas actualizado', 'Pago de tasas estadales'],
    costoEstimado: '5-15 UT estadales',
    baseLegal: 'Ley Orgánica de Salud (G.O. 36.579), Resolución SG-0320-2024',
    aplica: ['alimentos', 'salud', 'farmaceutico'],
  },
  {
    id: 'GOB-AMBIENTE',
    nombre: 'Autorización de Ocupación del Territorio (AOT)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Evaluación de impacto ambiental para proyectos de construcción, industriales o que afecten recursos naturales. Tramitada ante la Dirección Estadal Ambiental.',
    vigencia: 24,
    requisitosInscripcion: ['Estudio de impacto ambiental y sociocultural', 'Planos del proyecto', 'Medidas de mitigación propuestas', 'Constancia de consulta pública', 'Memoria descriptiva del proyecto'],
    requisitosRenovacion: ['Informe de cumplimiento ambiental', 'Auditoría ambiental externa', 'Actualización de medidas de mitigación'],
    costoEstimado: 'Variable según magnitud del proyecto',
    baseLegal: 'Ley Orgánica del Ambiente (G.O. 5.833), Decreto 1.257',
    aplica: ['construccion', 'industria', 'mineria', 'energia', 'petroleo'],
  },
  {
    id: 'GOB-TASA-LICORES',
    nombre: 'Licencia para Expendio de Bebidas Alcohólicas',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Permiso estadal para la venta de bebidas alcohólicas al público (bares, restaurantes, licorerías, abastos). Obligatorio en todos los estados.',
    vigencia: 12,
    requisitosInscripcion: ['Licencia municipal vigente', 'RIF vigente', 'Permiso de bomberos', 'Ubicación fuera de zona restringida (escuelas, hospitales, iglesias)', 'Certificado de fumigación', 'Plano del local con área de exhibición de licores'],
    requisitosRenovacion: ['Pago anual del impuesto sobre alcohol y especies alcohólicas', 'Inspección del establecimiento', 'Solvencia de pagos anteriores'],
    costoEstimado: '5-20 UT estadales',
    baseLegal: 'Ley de Impuesto sobre Alcohol y Especies Alcohólicas (G.O. 5.618)',
    aplica: ['comercio', 'alimentos', 'turismo'],
  },
  {
    id: 'GOB-ESTAMPILLAS',
    nombre: 'Timbres y Estampillas Estadales',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Pago de timbres fiscales estadales requeridos para trámites ante gobernaciones (licencias, solvencias, certificaciones). Cada estado fija su valor en UT estadales.',
    vigencia: null,
    requisitosInscripcion: ['Documento que requiera timbre estadal', 'Planilla de pago', 'Identificación del contribuyente'],
    requisitosRenovacion: ['Pago por cada trámite que lo requiera'],
    costoEstimado: '0.5-5 UT estadales',
    baseLegal: 'Ley de Timbre Fiscal de cada estado',
    aplica: ['todos'],
  },
  {
    id: 'GOB-CONTRIBUYENTE-ESTADAL',
    nombre: 'Registro de Contribuyente Estadal',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Inscripción como contribuyente del tesoro estadal para el pago de impuestos, tasas y contribuciones establecidas por la gobernación.',
    vigencia: null,
    requisitosInscripcion: ['RIF vigente', 'Acta constitutiva', 'Licencia de actividades económicas municipal', 'Dirección fiscal dentro del estado'],
    requisitosRenovacion: ['Actualización de datos cuando haya cambios en la empresa'],
    costoEstimado: 'Gratuito',
    baseLegal: 'Código Orgánico Tributario, Ordenanzas estadales',
    aplica: ['todos'],
  },
  {
    id: 'GOB-SOLVENCIA-ESTADAL',
    nombre: 'Solvencia de Impuestos Estadales',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Constancia de estar al día con todos los tributos estadales. Requerida para licitaciones públicas, trámites bancarios y contrataciones con el Estado.',
    vigencia: 3,
    requisitosInscripcion: ['Estar inscrito como contribuyente estadal', 'Tener pagos de impuestos al día', 'Solicitud formal'],
    requisitosRenovacion: ['Solicitar cada trimestre o cuando se requiera', 'Demostrar solvencia de todos los tributos estadales'],
    costoEstimado: 'Costo de estampillas estadales',
    baseLegal: 'Ley de Hacienda Pública Estadal',
    aplica: ['todos'],
  },
  {
    id: 'GOB-CERTIFICADO-SALUD',
    nombre: 'Certificado de Salud del Personal (Manipuladores)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Certificación médica obligatoria para empleados que manipulen alimentos, medicamentos o atiendan al público en establecimientos de salud.',
    vigencia: 6,
    requisitosInscripcion: ['Examen médico completo (heces, orina, pulmones)', 'Fotografía tipo carnet', 'Cédula de identidad'],
    requisitosRenovacion: ['Exámenes médicos actualizados cada 6 meses', 'Fotografía actualizada'],
    costoEstimado: '1-3 UT estadales',
    baseLegal: 'Ley Orgánica de Salud, Resoluciones de Corposalud',
    aplica: ['alimentos', 'salud', 'farmaceutico'],
  },
  {
    id: 'GOB-FUMIGACION',
    nombre: 'Certificado de Fumigación y Control de Plagas',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Constancia de control de plagas y fumigación del establecimiento, emitida por empresa certificada por la gobernación.',
    vigencia: 3,
    requisitosInscripcion: ['Contrato con empresa fumigadora certificada por Corposalud', 'Informe de fumigación con productos utilizados'],
    requisitosRenovacion: ['Fumigación trimestral documentada', 'Informes de control de plagas actualizados'],
    costoEstimado: 'Costo del servicio de fumigación',
    baseLegal: 'Ley Orgánica de Salud, Normas de Saneamiento Ambiental',
    aplica: ['alimentos', 'salud', 'farmaceutico', 'comercio'],
  },
  {
    id: 'GOB-TRANSPORTE-ESCOLAR',
    nombre: 'Permiso de Transporte Escolar y Especial',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización estadal para prestar servicio de transporte escolar o transporte especial de personas.',
    vigencia: 12,
    requisitosInscripcion: ['Licencia de conducir vigente (4ta o 5ta)', 'Certificado médico del conductor', 'Revisión técnica vehicular aprobada', 'Póliza de responsabilidad civil', 'Antecedentes penales'],
    requisitosRenovacion: ['Revisión técnica vehicular anual', 'Renovación de póliza', 'Certificado médico actualizado'],
    costoEstimado: '3-8 UT estadales',
    baseLegal: 'Ley de Transporte Terrestre, Reglamento de Transporte Escolar',
    aplica: ['transporte'],
  },
  {
    id: 'GOB-MINERIA-NOMET',
    nombre: 'Permiso de Extracción de Minerales No Metálicos (Estadal)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización estadal para extracción de arena, grava, piedra y otros minerales no metálicos para construcción.',
    vigencia: 12,
    requisitosInscripcion: ['Estudio de impacto ambiental', 'Plano de ubicación del yacimiento', 'Plan de explotación y restauración', 'Pago de regalías estadales'],
    requisitosRenovacion: ['Informe de producción anual', 'Cumplimiento del plan de restauración', 'Pago de regalías'],
    costoEstimado: 'Variable según volumen de extracción',
    baseLegal: 'Ley de Minas, Decreto con rango de Ley de Minas',
    aplica: ['mineria', 'construccion'],
  },
  {
    id: 'GOB-TURISMO-ESTADAL',
    nombre: 'Registro Turístico Estadal',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Inscripción de prestadores de servicios turísticos ante la Corporación de Turismo Estadal o la Dirección de Turismo de la Gobernación.',
    vigencia: 12,
    requisitosInscripcion: ['RTN vigente (Registro Turístico Nacional)', 'RIF vigente', 'Licencia de actividades económicas', 'Descripción de servicios turísticos ofrecidos'],
    requisitosRenovacion: ['Actualización de datos', 'Solvencia de tasas turísticas estadales'],
    costoEstimado: '2-5 UT estadales',
    baseLegal: 'Ley Orgánica de Turismo, Decretos estadales de turismo',
    aplica: ['turismo'],
  },
  {
    id: 'GOB-FUNCIONAMIENTO-ESTADAL',
    nombre: 'Permiso de Funcionamiento Estadal',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización general de funcionamiento emitida por la gobernación para ciertos tipos de establecimientos regulados a nivel estadal (educación privada, salud, transporte).',
    vigencia: 12,
    requisitosInscripcion: ['Licencia municipal vigente', 'RIF vigente', 'Permiso de bomberos', 'Certificado sanitario (si aplica)', 'Cumplimiento de normativa sectorial específica'],
    requisitosRenovacion: ['Inspección anual de la gobernación', 'Solvencia de tributos estadales', 'Cumplimiento de normas vigentes'],
    costoEstimado: '5-15 UT estadales',
    baseLegal: 'Constitución del Estado correspondiente, Leyes estadales',
    aplica: ['todos'],
  },
  {
    id: 'GOB-DEPORTE-ESTADAL',
    nombre: 'Registro de Establecimientos Deportivos y Recreativos',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Inscripción de gimnasios, academias deportivas, parques recreativos y centros de esparcimiento ante la Dirección de Deportes estadal.',
    vigencia: 12,
    requisitosInscripcion: ['Licencia municipal vigente', 'Permiso de bomberos', 'Certificación de instructores (si aplica)', 'Plan de seguridad del establecimiento'],
    requisitosRenovacion: ['Inspección anual', 'Actualización de personal certificado'],
    costoEstimado: '3-8 UT estadales',
    baseLegal: 'Ley Orgánica de Deporte, Actividad Física y Educación Física',
    aplica: ['deporte'],
  },
  {
    id: 'GOB-CULTURA-ESTADAL',
    nombre: 'Permiso para Actividades Culturales y Artísticas',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización de la Dirección de Cultura estadal para realizar eventos culturales, festivales, exposiciones y actividades artísticas.',
    vigencia: null,
    requisitosInscripcion: ['Descripción del evento o actividad cultural', 'Plan de logística y seguridad', 'Solicitud con 15 días de anticipación'],
    requisitosRenovacion: ['Solicitar por cada evento o temporada'],
    costoEstimado: '1-5 UT estadales o gratuito',
    baseLegal: 'Ley de Cultura, Decretos estadales culturales',
    aplica: ['cultura'],
  },
  {
    id: 'GOB-EDUCACION-PRIVADA',
    nombre: 'Autorización de Funcionamiento de Institución Educativa Privada',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Permiso de la Zona Educativa (adscrita a la gobernación) para operar centros de educación privada (preescolar, primaria, secundaria, técnica).',
    vigencia: 12,
    requisitosInscripcion: ['Proyecto educativo institucional', 'Nómina de docentes con títulos y permisos', 'Certificado de habitabilidad del local', 'Permiso de bomberos', 'Permiso sanitario', 'Contrato de arrendamiento o título de propiedad'],
    requisitosRenovacion: ['Informe anual de gestión educativa', 'Actualización de nómina docente', 'Inspección del plantel'],
    costoEstimado: '10-25 UT estadales',
    baseLegal: 'Ley Orgánica de Educación (G.O. 5.929), Resoluciones del MPPE',
    aplica: ['educacion'],
  },
  {
    id: 'GOB-PUBLICIDAD-ESTADAL',
    nombre: 'Permiso de Publicidad en Vías Estadales',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización para instalar vallas, avisos publicitarios y señalización comercial en vías estadales y carreteras.',
    vigencia: 12,
    requisitosInscripcion: ['Diseño del aviso a escala', 'Ubicación propuesta con coordenadas', 'RIF vigente', 'Pago de tasa estadal de publicidad'],
    requisitosRenovacion: ['Pago anual de la tasa', 'Mantenimiento del aviso en buen estado'],
    costoEstimado: 'Variable según m² y ubicación',
    baseLegal: 'Ley de Tránsito Terrestre, Ordenanzas estadales de publicidad',
    aplica: ['todos'],
  },
  {
    id: 'GOB-PESCA-ARTESANAL',
    nombre: 'Permiso de Pesca Artesanal Estadal',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización de la gobernación para actividades de pesca artesanal en aguas interiores del estado (ríos, lagos, embalses).',
    vigencia: 12,
    requisitosInscripcion: ['Cédula de identidad', 'Inscripción en el registro de pescadores artesanales', 'Descripción de artes de pesca'],
    requisitosRenovacion: ['Informe de capturas del período', 'Pago de tasas estadales'],
    costoEstimado: '1-3 UT estadales',
    baseLegal: 'Ley de Pesca y Acuicultura, Decretos estadales',
    aplica: ['pesca'],
  },
  {
    id: 'GOB-FORESTAL-ESTADAL',
    nombre: 'Permiso de Aprovechamiento Forestal Estadal',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización estadal para tala, deforestación o aprovechamiento de recursos forestales en tierras del estado.',
    vigencia: 12,
    requisitosInscripcion: ['Plan de manejo forestal', 'Estudio de impacto ambiental', 'Permiso del MinAmb nacional', 'Garantía de reforestación'],
    requisitosRenovacion: ['Informe de cumplimiento del plan de manejo', 'Verificación de reforestación'],
    costoEstimado: 'Variable según hectáreas',
    baseLegal: 'Ley de Bosques, Ley Orgánica del Ambiente',
    aplica: ['agricultura', 'ambiente'],
  },
  {
    id: 'GOB-AGUAS-ESTADAL',
    nombre: 'Permiso de Uso de Aguas Estadales',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Autorización para el aprovechamiento de fuentes de agua superficiales o subterráneas dentro del estado para uso comercial, industrial o agrícola.',
    vigencia: 24,
    requisitosInscripcion: ['Estudio hidrogeológico', 'Plan de uso del recurso hídrico', 'Autorización de MinAguas nacional', 'Compromiso de conservación'],
    requisitosRenovacion: ['Informe de uso del recurso', 'Análisis de calidad del agua', 'Pago de canon de aprovechamiento'],
    costoEstimado: 'Variable según volumen',
    baseLegal: 'Ley de Aguas, Decretos estadales',
    aplica: ['agricultura', 'industria', 'energia'],
  },
];

export function getOrganismoById(id: string): Organismo | undefined {
  return organismos.find(o => o.id === id);
}

export function getPermisosByOrganismo(organismoId: string): PermisoTipo[] {
  return tiposPermiso.filter(p => p.organismoId === organismoId);
}

export function getPermisosByTipo(tipo: Organismo['tipo']): PermisoTipo[] {
  const orgIds = organismos.filter(o => o.tipo === tipo).map(o => o.id);
  return tiposPermiso.filter(p => orgIds.includes(p.organismoId));
}

export interface EmpresaCarta {
  denominacion: string;
  rif: string;
  direccion: string;
  telefono?: string;
  representante: {
    nombre: string;
    cedula: string;
    cargo: string;
  };
  objetoSocial?: string;
}

export function generarCartaSolicitud(permiso: PermisoTipo, empresa: EmpresaCarta, tipo: 'inscripcion' | 'renovacion'): string {
  const organismo = getOrganismoById(permiso.organismoId);
  const fecha = new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' });
  const requisitos = tipo === 'inscripcion' ? permiso.requisitosInscripcion : permiso.requisitosRenovacion;

  return `
Caracas, ${fecha}

Ciudadano(a)
Director(a) General
${organismo?.nombre || permiso.organismoId}
Su Despacho.-

REF.: SOLICITUD DE ${tipo === 'inscripcion' ? 'INSCRIPCIÓN' : 'RENOVACIÓN'} — ${permiso.nombre.toUpperCase()}

Yo, ${empresa.representante.nombre}, venezolano(a), mayor de edad, titular de la Cédula de Identidad N° ${empresa.representante.cedula}, actuando en mi carácter de ${empresa.representante.cargo} de la sociedad mercantil "${empresa.denominacion}", inscrita ante el Registro Mercantil correspondiente, domiciliada en ${empresa.direccion}, identificada con el Registro de Información Fiscal (RIF) N° ${empresa.rif}, me dirijo a usted respetuosamente con el objeto de solicitar la ${tipo === 'inscripcion' ? 'inscripción' : 'renovación'} del siguiente permiso:

PERMISO SOLICITADO: ${permiso.nombre}
ORGANISMO EMISOR: ${organismo?.nombre || permiso.organismoId}
BASE LEGAL: ${permiso.baseLegal || 'Según normativa vigente'}

A tales efectos, consigno los siguientes recaudos:

${requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Sin otro particular al cual hacer referencia, quedo de usted.

Atentamente,

_________________________
${empresa.representante.nombre}
${empresa.representante.cargo}
${empresa.denominacion}
RIF: ${empresa.rif}
`.trim();
}
