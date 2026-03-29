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
  aplica: ('comercio' | 'industria' | 'servicios' | 'construccion' | 'telecomunicaciones' | 'alimentos' | 'salud' | 'educacion' | 'transporte' | 'mineria' | 'ambiente' | 'turismo' | 'todos')[];
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

  { id: 'MIN-COMERCIO', nombre: 'Ministerio del Poder Popular de Comercio Nacional', tipo: 'ministerio' },
  { id: 'MIN-TRABAJO', nombre: 'Ministerio del Poder Popular para el Proceso Social del Trabajo', tipo: 'ministerio' },
  { id: 'MIN-SALUD', nombre: 'Ministerio del Poder Popular para la Salud', tipo: 'ministerio' },
  { id: 'MIN-AMBIENTE', nombre: 'Ministerio del Poder Popular para el Ecosocialismo', tipo: 'ministerio' },
  { id: 'MIN-TURISMO', nombre: 'Ministerio del Poder Popular para el Turismo', tipo: 'ministerio' },
  { id: 'MIN-TRANSPORTE', nombre: 'Ministerio del Poder Popular para el Transporte', tipo: 'ministerio' },
  { id: 'MIN-ALIMENTACION', nombre: 'Ministerio del Poder Popular para la Alimentación', tipo: 'ministerio' },
  { id: 'MIN-EDUCACION', nombre: 'Ministerio del Poder Popular para la Educación', tipo: 'ministerio' },
  { id: 'MIN-ENERGIA', nombre: 'Ministerio del Poder Popular de Petróleo y Minería', tipo: 'ministerio' },
  { id: 'MIN-INDUSTRIAS', nombre: 'Ministerio del Poder Popular de Industrias y Producción Nacional', tipo: 'ministerio' },
  { id: 'MIN-CIENCIA', nombre: 'Ministerio del Poder Popular para Ciencia y Tecnología', tipo: 'ministerio' },
  { id: 'MIN-HABITAT', nombre: 'Ministerio del Poder Popular para Hábitat y Vivienda', tipo: 'ministerio' },
  { id: 'MIN-INTERIOR', nombre: 'Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz', tipo: 'ministerio' },

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
    nombre: 'Permiso del Cuerpo de Bomberos',
    organismoId: 'ALC-CHACAO',
    descripcion: 'Inspección y certificación de cumplimiento de normas de seguridad contra incendios del establecimiento comercial.',
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
    id: 'GOB-SANIDAD',
    nombre: 'Permiso Sanitario (Corposalud)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Certificación sanitaria obligatoria para establecimientos que manipulen alimentos, productos farmacéuticos o presten servicios de salud.',
    vigencia: 12,
    requisitosInscripcion: ['RIF vigente', 'Permiso de bomberos', 'Certificados de salud del personal', 'Fumigación vigente', 'Análisis de agua'],
    requisitosRenovacion: ['Inspección sanitaria anual', 'Certificados de salud renovados', 'Control de plagas actualizado'],
    costoEstimado: '5-15 UT',
    baseLegal: 'Ley Orgánica de Salud, Resolución SG-0320-2024',
    aplica: ['alimentos', 'salud'],
  },
  {
    id: 'GOB-AMBIENTE',
    nombre: 'Autorización de Ocupación del Territorio (AOT)',
    organismoId: 'GOB-MIRANDA',
    descripcion: 'Evaluación de impacto ambiental para proyectos de construcción, industriales o que afecten recursos naturales.',
    vigencia: 24,
    requisitosInscripcion: ['Estudio de impacto ambiental', 'Planos del proyecto', 'Medidas de mitigación propuestas'],
    requisitosRenovacion: ['Informe de cumplimiento ambiental', 'Auditoría ambiental externa'],
    costoEstimado: 'Variable según proyecto',
    baseLegal: 'Ley Orgánica del Ambiente (G.O. 5.833)',
    aplica: ['construccion', 'industria', 'mineria'],
  },

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
    aplica: ['alimentos', 'salud'],
  },
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

export function generarCartaSolicitud(permiso: PermisoTipo, empresa: typeof import('./permisos-data').companyData, tipo: 'inscripcion' | 'renovacion'): string {
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

Yo, ${empresa.socios[0]?.nombre || 'REPRESENTANTE LEGAL'}, venezolano(a), mayor de edad, titular de la Cédula de Identidad N° ${empresa.socios[0]?.cedula || 'V-00.000.000'}, actuando en mi carácter de ${empresa.socios[0]?.cargo || 'Representante Legal'} de la sociedad mercantil "${empresa.denominacion}", inscrita ante el Registro Mercantil correspondiente, domiciliada en ${empresa.direccion}, identificada con el Registro de Información Fiscal (RIF) N° ${empresa.rif}, me dirijo a usted respetuosamente con el objeto de solicitar la ${tipo === 'inscripcion' ? 'inscripción' : 'renovación'} del siguiente permiso:

PERMISO: ${permiso.nombre}
BASE LEGAL: ${permiso.baseLegal || 'Según normativa vigente'}
DESCRIPCIÓN: ${permiso.descripcion}

A tal efecto, adjunto los siguientes recaudos:

${requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Sin otro particular al cual hacer referencia, quedo a su disposición para cualquier información adicional que considere necesaria.

Atentamente,


_______________________________
${empresa.socios[0]?.nombre || 'REPRESENTANTE LEGAL'}
${empresa.socios[0]?.cargo || 'Representante Legal'}
${empresa.denominacion}
RIF: ${empresa.rif}
Teléfono: ${empresa.telefono}
`.trim();
}
