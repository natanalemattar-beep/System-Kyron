export interface EnteFiscal {
  id: string;
  siglas: string;
  nombre: string;
  tipo: 'fiscal' | 'parafiscal' | 'registral' | 'regulador' | 'laboral' | 'financiero' | 'ambiental' | 'municipal';
  sitioWeb: string;
  descripcion: string;
  leyOrganica: string;
  gacetaOficial: string;
  obligaciones: ObligacionFiscal[];
}

export interface ObligacionFiscal {
  nombre: string;
  descripcion: string;
  baseLegal: string;
  periodicidad: 'mensual' | 'trimestral' | 'semestral' | 'anual' | 'quincenal' | 'semanal' | 'unica' | 'permanente';
  tasa?: string;
  sancion?: string;
  aplica: ('natural' | 'juridico' | 'todos')[];
}

export interface LeyVenezolana {
  id: string;
  nombre: string;
  gacetaOficial: string;
  fechaPublicacion: string;
  ente: string;
  resumen: string;
  articulosClaves: ArticuloClave[];
  pais?: 'VE' | 'ES';
  categoria?: string;
}

export interface ArticuloClave {
  articulo: string;
  titulo: string;
  contenido: string;
}

export const entesFiscales: EnteFiscal[] = [
  {
    id: 'SENIAT',
    siglas: 'SENIAT',
    nombre: 'Servicio Nacional Integrado de Administración Aduanera y Tributaria',
    tipo: 'fiscal',
    sitioWeb: 'https://www.seniat.gob.ve',
    descripcion: 'Ente rector de la administración tributaria nacional. Responsable de la recaudación de impuestos nacionales, control aduanero y fiscalización tributaria.',
    leyOrganica: 'Código Orgánico Tributario (G.O. 6.507 Extraordinario, 2020)',
    gacetaOficial: 'G.O. 6.507',
    obligaciones: [
      {
        nombre: 'Registro de Información Fiscal (RIF)',
        descripcion: 'Inscripción obligatoria ante el SENIAT para toda persona natural o jurídica con actividad económica.',
        baseLegal: 'COT Art. 99, Providencia SNAT/2023/00046',
        periodicidad: 'unica',
        sancion: '50 UT por no inscripción',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto al Valor Agregado (IVA)',
        descripcion: 'Declaración y pago mensual del IVA generado. Tasa general 16%. Contribuyentes especiales: retención 75%.',
        baseLegal: 'Ley de IVA (G.O. 6.507), Providencia SNAT/2015/0049',
        periodicidad: 'mensual',
        tasa: '16% (general), 8% (reducida), 0% (exenta)',
        sancion: 'Multa 150-300 UT + intereses moratorios (1.2x tasa activa BCV)',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto Sobre la Renta (ISLR)',
        descripcion: 'Declaración definitiva anual. Tarifa progresiva para personas jurídicas. Anticipo trimestral para SPE.',
        baseLegal: 'Ley de ISLR (G.O. 6.210), Decreto 1.808 (Retenciones)',
        periodicidad: 'anual',
        tasa: '15-34% (jurídicos), 6-34% (naturales)',
        sancion: 'Multa 150% del tributo omitido + intereses',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto a Grandes Transacciones Financieras (IGTF)',
        descripcion: 'Impuesto del 3% sobre pagos en divisas y criptomonedas. Agentes de percepción designados por Providencia.',
        baseLegal: 'Ley de IGTF (G.O. 6.687), Providencia SNAT/2022/000013',
        periodicidad: 'semanal',
        tasa: '3% (divisas/cripto), 2% (transferencias >)',
        sancion: 'Multa 100-500 UT + suspensión de RIF',
        aplica: ['todos'],
      },
      {
        nombre: 'Retenciones IVA/ISLR',
        descripcion: 'Obligación de retener IVA (75%) e ISLR según actividad a proveedores. Entero quincenal para SPE.',
        baseLegal: 'Providencia SNAT/2015/0049 (IVA), Decreto 1.808 (ISLR)',
        periodicidad: 'quincenal',
        sancion: 'Multa 500% del tributo no retenido',
        aplica: ['juridico'],
      },
      {
        nombre: 'Facturación Fiscal',
        descripcion: 'Emisión de facturas, notas de débito/crédito conforme a Providencia 0071. Libros de compra-venta obligatorios.',
        baseLegal: 'Providencia 0071 (G.O. 39.795)',
        periodicidad: 'permanente',
        sancion: 'Clausura temporal 5-10 días + multa 150 UT',
        aplica: ['todos'],
      },
      {
        nombre: 'Solvencia Tributaria',
        descripcion: 'Certificado de cumplimiento de obligaciones tributarias. Requerido para licitaciones y contratos públicos.',
        baseLegal: 'COT Art. 68, Providencia SNAT/2024/000008',
        periodicidad: 'trimestral',
        aplica: ['juridico'],
      },
      {
        nombre: 'Registro Aduanero',
        descripcion: 'Habilitación para operaciones de importación/exportación. Registro RUSAD obligatorio.',
        baseLegal: 'Ley Orgánica de Aduanas (G.O. 6.155)',
        periodicidad: 'unica',
        sancion: 'Decomiso de mercancía + multa equivalente al valor CIF',
        aplica: ['juridico'],
      },
      {
        nombre: 'Impuesto sobre Sucesiones y Donaciones',
        descripcion: 'Gravamen sobre herencias y donaciones. Tarifa progresiva del 1% al 55% según parentesco y monto.',
        baseLegal: 'Ley de Impuesto sobre Sucesiones, Donaciones y demás Ramos Conexos (G.O. 5.391)',
        periodicidad: 'unica',
        tasa: '1-55% según grado de parentesco',
        sancion: 'Multa 10% del impuesto por cada mes de retraso',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto sobre Alcohol y Especies Alcohólicas',
        descripcion: 'Gravamen sobre producción, importación y expendio de bebidas alcohólicas.',
        baseLegal: 'Ley de Impuesto sobre Alcohol y Especies Alcohólicas (G.O. 5.618)',
        periodicidad: 'mensual',
        aplica: ['juridico'],
      },
      {
        nombre: 'Impuesto sobre Cigarrillos y Manufacturas de Tabaco',
        descripcion: 'Gravamen sobre la producción e importación de cigarrillos y productos del tabaco.',
        baseLegal: 'Ley de Impuesto sobre Cigarrillos y Manufactura de Tabaco (G.O. 5.852)',
        periodicidad: 'mensual',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SAREN',
    siglas: 'SAREN',
    nombre: 'Servicio Autónomo de Registros y Notarías',
    tipo: 'registral',
    sitioWeb: 'https://www.saren.gob.ve',
    descripcion: 'Organismo encargado de los registros mercantiles, civiles, inmobiliarios y notarías públicas en Venezuela.',
    leyOrganica: 'Ley de Registros y del Notariado (G.O. 6.668 Extraordinario)',
    gacetaOficial: 'G.O. 6.668',
    obligaciones: [
      {
        nombre: 'Registro Mercantil',
        descripcion: 'Inscripción de acta constitutiva, estatutos sociales, actas de asamblea y cambios societarios.',
        baseLegal: 'Código de Comercio Art. 19, Ley de Registros y del Notariado',
        periodicidad: 'unica',
        sancion: 'Nulidad de actos no registrados frente a terceros',
        aplica: ['juridico'],
      },
      {
        nombre: 'Actualización Anual de Registro',
        descripcion: 'Registro de actas de asamblea ordinarias, cambios de directiva y actualizaciones societarias.',
        baseLegal: 'Código de Comercio Art. 217',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
      {
        nombre: 'Registro de Poderes y Mandatos',
        descripcion: 'Otorgamiento y registro de poderes notariados para representación legal.',
        baseLegal: 'Código Civil Art. 1.169, Ley de Registros y del Notariado',
        periodicidad: 'unica',
        aplica: ['todos'],
      },
      {
        nombre: 'Registro Inmobiliario',
        descripcion: 'Inscripción de documentos de propiedad, hipotecas, arrendamientos y gravámenes sobre inmuebles.',
        baseLegal: 'Ley de Registros y del Notariado Art. 46-51',
        periodicidad: 'unica',
        aplica: ['todos'],
      },
    ],
  },
  {
    id: 'SAIME',
    siglas: 'SAIME',
    nombre: 'Servicio Administrativo de Identificación, Migración y Extranjería',
    tipo: 'registral',
    sitioWeb: 'https://www.saime.gob.ve',
    descripcion: 'Organismo encargado de la identificación ciudadana, emisión de cédulas, pasaportes y control migratorio.',
    leyOrganica: 'Ley Orgánica de Identificación (G.O. 38.458)',
    gacetaOficial: 'G.O. 38.458',
    obligaciones: [
      {
        nombre: 'Cédula de Identidad',
        descripcion: 'Documento obligatorio de identificación para todo venezolano mayor de 9 años y extranjeros residentes.',
        baseLegal: 'Ley Orgánica de Identificación Art. 8-14',
        periodicidad: 'unica',
        sancion: 'Multa 5-10 UT por no portar cédula vigente',
        aplica: ['todos'],
      },
      {
        nombre: 'Pasaporte',
        descripcion: 'Documento de viaje internacional. Vigencia de 5 años. Renovación obligatoria antes de vencimiento.',
        baseLegal: 'Ley Orgánica de Identificación Art. 20-25',
        periodicidad: 'unica',
        aplica: ['todos'],
      },
      {
        nombre: 'Registro de Extranjeros',
        descripcion: 'Inscripción obligatoria de extranjeros residentes. Visa de trabajo para empleados extranjeros.',
        baseLegal: 'Ley de Extranjería y Migración (G.O. 37.944)',
        periodicidad: 'anual',
        aplica: ['todos'],
      },
      {
        nombre: 'Movimiento Migratorio',
        descripcion: 'Control de entrada y salida del territorio nacional. Permiso de salida para menores.',
        baseLegal: 'Ley de Extranjería y Migración Art. 7-12',
        periodicidad: 'permanente',
        aplica: ['todos'],
      },
    ],
  },
  {
    id: 'SAPI',
    siglas: 'SAPI',
    nombre: 'Servicio Autónomo de la Propiedad Intelectual',
    tipo: 'registral',
    sitioWeb: 'https://www.sapi.gob.ve',
    descripcion: 'Organismo encargado del registro y protección de marcas, patentes, derechos de autor y propiedad industrial.',
    leyOrganica: 'Ley de Propiedad Industrial (G.O. 25.227), Ley sobre Derecho de Autor (G.O. 4.638)',
    gacetaOficial: 'G.O. 25.227 / G.O. 4.638',
    obligaciones: [
      {
        nombre: 'Registro de Marca',
        descripcion: 'Protección de marca comercial, nombre comercial, lema comercial. Vigencia 15 años renovables.',
        baseLegal: 'Ley de Propiedad Industrial Art. 27-33, Decisión 486 CAN',
        periodicidad: 'unica',
        tasa: '5-15 UT',
        sancion: 'Pérdida de derechos exclusivos sobre la marca',
        aplica: ['todos'],
      },
      {
        nombre: 'Registro de Patente',
        descripcion: 'Protección de invenciones, modelos de utilidad y diseños industriales. Vigencia 20 años.',
        baseLegal: 'Ley de Propiedad Industrial Art. 1-15, Decisión 486 CAN',
        periodicidad: 'unica',
        tasa: '10-50 UT',
        aplica: ['todos'],
      },
      {
        nombre: 'Derechos de Autor',
        descripcion: 'Registro de obras literarias, artísticas, software y bases de datos. Protección automática, registro declarativo.',
        baseLegal: 'Ley sobre Derecho de Autor (G.O. 4.638 Extraordinario)',
        periodicidad: 'unica',
        aplica: ['todos'],
      },
      {
        nombre: 'Denominaciones de Origen',
        descripcion: 'Protección de productos vinculados a una región geográfica (cacao venezolano, ron, etc.).',
        baseLegal: 'Decisión 486 CAN Art. 201-220',
        periodicidad: 'unica',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'CONATEL',
    siglas: 'CONATEL',
    nombre: 'Comisión Nacional de Telecomunicaciones',
    tipo: 'regulador',
    sitioWeb: 'https://www.conatel.gob.ve',
    descripcion: 'Ente regulador de las telecomunicaciones en Venezuela. Otorga habilitaciones, concesiones y permisos de operación.',
    leyOrganica: 'Ley Orgánica de Telecomunicaciones (G.O. 39.610)',
    gacetaOficial: 'G.O. 39.610',
    obligaciones: [
      {
        nombre: 'Habilitación Administrativa',
        descripcion: 'Autorización para prestar servicios de telecomunicaciones (internet, telefonía, datos, TV por suscripción).',
        baseLegal: 'LOTEL Art. 15-25',
        periodicidad: 'unica',
        tasa: '500-5000 UT según tipo de servicio',
        aplica: ['juridico'],
      },
      {
        nombre: 'Concesión de Espectro Radioeléctrico',
        descripcion: 'Asignación de frecuencias para operación de redes inalámbricas, radio y televisión.',
        baseLegal: 'LOTEL Art. 70-85',
        periodicidad: 'unica',
        aplica: ['juridico'],
      },
      {
        nombre: 'Tasas Trimestrales de Telecomunicaciones',
        descripcion: 'Pago de contribuciones especiales y tasas regulatorias por uso de espectro y prestación de servicios.',
        baseLegal: 'LOTEL Art. 148-152',
        periodicidad: 'trimestral',
        tasa: '0.5-2% de ingresos brutos',
        aplica: ['juridico'],
      },
      {
        nombre: 'Registro de Equipos de Telecomunicaciones',
        descripcion: 'Homologación y registro de equipos terminales y de red para comercialización en Venezuela.',
        baseLegal: 'LOTEL Art. 90-95, Providencia Administrativa',
        periodicidad: 'unica',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SUNDDE',
    siglas: 'SUNDDE',
    nombre: 'Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos',
    tipo: 'regulador',
    sitioWeb: 'https://www.sundde.gob.ve',
    descripcion: 'Ente encargado de la regulación de precios, control de costos y defensa de los derechos económicos del consumidor.',
    leyOrganica: 'Ley Orgánica de Precios Justos (G.O. 40.340)',
    gacetaOficial: 'G.O. 40.340',
    obligaciones: [
      {
        nombre: 'Registro SICA',
        descripcion: 'Inscripción obligatoria en el Sistema Integral de Control Agroalimentario para productores y distribuidores.',
        baseLegal: 'Ley Orgánica de Precios Justos Art. 14-20',
        periodicidad: 'unica',
        sancion: 'Multa 2000 UT + clausura temporal',
        aplica: ['juridico'],
      },
      {
        nombre: 'Marcaje de Precios Justos',
        descripcion: 'Obligación de exhibir precios al público conforme a la estructura de costos aprobada.',
        baseLegal: 'Ley Orgánica de Precios Justos Art. 36-42',
        periodicidad: 'permanente',
        sancion: 'Multa 500-2000 UT + decomiso',
        aplica: ['juridico'],
      },
      {
        nombre: 'Ganancia Máxima (30%)',
        descripcion: 'Margen de ganancia máximo permitido del 30% sobre la estructura de costos del producto o servicio.',
        baseLegal: 'Ley Orgánica de Precios Justos Art. 32',
        periodicidad: 'permanente',
        tasa: 'Máximo 30% de ganancia',
        sancion: 'Multa 1000-5000 UT + cierre definitivo',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'IVSS',
    siglas: 'IVSS',
    nombre: 'Instituto Venezolano de los Seguros Sociales',
    tipo: 'laboral',
    sitioWeb: 'https://www.ivss.gob.ve',
    descripcion: 'Ente encargado de la seguridad social: pensiones, incapacidad, maternidad, sobrevivientes y paro forzoso.',
    leyOrganica: 'Ley del Seguro Social Obligatorio (G.O. 39.912)',
    gacetaOficial: 'G.O. 39.912',
    obligaciones: [
      {
        nombre: 'Inscripción Patronal',
        descripcion: 'Registro obligatorio como empleador ante el IVSS. Afiliación de todos los trabajadores.',
        baseLegal: 'Ley del Seguro Social Art. 63-66',
        periodicidad: 'unica',
        sancion: 'Multa 25-100 UT por trabajador no inscrito',
        aplica: ['juridico'],
      },
      {
        nombre: 'Cotizaciones Mensuales',
        descripcion: 'Pago mensual de cotizaciones patronales (9-11%) y del trabajador (4%) sobre salario normal.',
        baseLegal: 'Ley del Seguro Social Art. 66-70, Reglamento',
        periodicidad: 'mensual',
        tasa: '9-11% patronal, 4% trabajador',
        sancion: 'Intereses moratorios + multa 50% de cotizaciones omitidas',
        aplica: ['juridico'],
      },
      {
        nombre: 'Reportes de Novedades (Altas/Bajas)',
        descripcion: 'Notificación mensual de nuevos ingresos, egresos y cambios de salario de trabajadores.',
        baseLegal: 'Ley del Seguro Social Art. 72',
        periodicidad: 'mensual',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'INCES',
    siglas: 'INCES',
    nombre: 'Instituto Nacional de Capacitación y Educación Socialista',
    tipo: 'parafiscal',
    sitioWeb: 'https://www.inces.gob.ve',
    descripcion: 'Organismo de formación profesional. Patronos contribuyen el 2% de nómina trimestral.',
    leyOrganica: 'Ley del INCES (G.O. 38.968)',
    gacetaOficial: 'G.O. 38.968',
    obligaciones: [
      {
        nombre: 'Aporte Patronal (2%)',
        descripcion: 'Contribución trimestral del 2% sobre el total de sueldos y salarios pagados.',
        baseLegal: 'Ley del INCES Art. 14',
        periodicidad: 'trimestral',
        tasa: '2% de nómina trimestral',
        sancion: 'Multa equivalente al 100% del aporte omitido + intereses',
        aplica: ['juridico'],
      },
      {
        nombre: 'Aporte del Trabajador (0.5%)',
        descripcion: 'Retención del 0.5% del salario del trabajador sobre utilidades o bonificación de fin de año.',
        baseLegal: 'Ley del INCES Art. 14',
        periodicidad: 'anual',
        tasa: '0.5% de utilidades',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'BANAVIH',
    siglas: 'BANAVIH',
    nombre: 'Banco Nacional de Vivienda y Hábitat',
    tipo: 'parafiscal',
    sitioWeb: 'https://www.banavih.gob.ve',
    descripcion: 'Administrador del Fondo de Ahorro Obligatorio para la Vivienda (FAOV). Aportes obligatorios patrono-trabajador.',
    leyOrganica: 'Ley del Régimen Prestacional de Vivienda y Hábitat (G.O. 39.945)',
    gacetaOficial: 'G.O. 39.945',
    obligaciones: [
      {
        nombre: 'Aporte FAOV Patronal',
        descripcion: 'Aporte mensual del 2% del salario integral de cada trabajador al fondo de vivienda.',
        baseLegal: 'Ley Régimen Prestacional de Vivienda Art. 172',
        periodicidad: 'mensual',
        tasa: '2% patronal sobre salario integral',
        sancion: 'Intereses moratorios + recargos del 50%',
        aplica: ['juridico'],
      },
      {
        nombre: 'Aporte FAOV Trabajador',
        descripcion: 'Retención mensual del 1% del salario integral del trabajador al fondo de vivienda.',
        baseLegal: 'Ley Régimen Prestacional de Vivienda Art. 172',
        periodicidad: 'mensual',
        tasa: '1% del trabajador sobre salario integral',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'INPSASEL',
    siglas: 'INPSASEL',
    nombre: 'Instituto Nacional de Prevención, Salud y Seguridad Laborales',
    tipo: 'laboral',
    sitioWeb: 'https://www.inpsasel.gob.ve',
    descripcion: 'Ente encargado de la prevención, condiciones y medio ambiente de trabajo. Fiscaliza cumplimiento LOPCYMAT.',
    leyOrganica: 'LOPCYMAT — Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (G.O. 38.236)',
    gacetaOficial: 'G.O. 38.236',
    obligaciones: [
      {
        nombre: 'Programa de Seguridad y Salud',
        descripcion: 'Documento obligatorio con políticas de prevención, identificación de riesgos y plan de emergencias.',
        baseLegal: 'LOPCYMAT Art. 56, 61-62',
        periodicidad: 'anual',
        sancion: 'Multa 26-75 UCITS por incumplimiento',
        aplica: ['juridico'],
      },
      {
        nombre: 'Comité de Seguridad y Salud Laboral',
        descripcion: 'Constitución obligatoria del comité con representantes de patrono y trabajadores (empresas 5+ empleados).',
        baseLegal: 'LOPCYMAT Art. 46-52',
        periodicidad: 'unica',
        sancion: 'Multa 26-75 UCITS',
        aplica: ['juridico'],
      },
      {
        nombre: 'Notificación de Riesgos',
        descripcion: 'Información escrita a cada trabajador sobre los riesgos específicos de su puesto de trabajo.',
        baseLegal: 'LOPCYMAT Art. 56 numeral 4',
        periodicidad: 'permanente',
        sancion: 'Multa 26-75 UCITS por trabajador',
        aplica: ['juridico'],
      },
      {
        nombre: 'Exámenes Médicos Ocupacionales',
        descripcion: 'Evaluación médica pre-empleo, periódica y post-empleo obligatoria para todos los trabajadores.',
        baseLegal: 'LOPCYMAT Art. 53 numeral 10, Art. 27',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SUNAGRO',
    siglas: 'SUNAGRO',
    nombre: 'Superintendencia Nacional de Gestión Agroalimentaria',
    tipo: 'regulador',
    sitioWeb: 'https://www.sunagro.gob.ve',
    descripcion: 'Control de la cadena agroalimentaria: guías de movilización, permisos sanitarios para productos agrícolas.',
    leyOrganica: 'Ley Orgánica de Seguridad y Soberanía Agroalimentaria (G.O. 5.889)',
    gacetaOficial: 'G.O. 5.889',
    obligaciones: [
      {
        nombre: 'Guía de Movilización (SADA)',
        descripcion: 'Permiso obligatorio para el transporte de rubros agroalimentarios regulados a nivel nacional.',
        baseLegal: 'Ley de Seguridad Agroalimentaria Art. 14-18',
        periodicidad: 'permanente',
        sancion: 'Decomiso de productos + multa 500-2000 UT',
        aplica: ['juridico'],
      },
      {
        nombre: 'Registro de Operadores',
        descripcion: 'Inscripción obligatoria de productores, procesadores y distribuidores de alimentos regulados.',
        baseLegal: 'Ley de Seguridad Agroalimentaria Art. 8-12',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'BCV',
    siglas: 'BCV',
    nombre: 'Banco Central de Venezuela',
    tipo: 'financiero',
    sitioWeb: 'https://www.bcv.org.ve',
    descripcion: 'Autoridad monetaria nacional. Publica tasa de cambio oficial, fija encaje legal y regula el sistema financiero.',
    leyOrganica: 'Ley del Banco Central de Venezuela (G.O. 6.507)',
    gacetaOficial: 'G.O. 6.507',
    obligaciones: [
      {
        nombre: 'Tasa de Cambio Oficial',
        descripcion: 'Obligación de usar la tasa BCV publicada diariamente para todas las operaciones en divisas.',
        baseLegal: 'Convenio Cambiario N° 1 (2018), Ley BCV Art. 7',
        periodicidad: 'permanente',
        sancion: 'Multa hasta 20% de la operación irregular',
        aplica: ['todos'],
      },
      {
        nombre: 'Declaración de Operaciones Cambiarias',
        descripcion: 'Reporte obligatorio de operaciones en divisas superiores a 8.500 USD ante la SUDEBAN/BCV.',
        baseLegal: 'Ley Contra la Legitimación de Capitales Art. 23',
        periodicidad: 'permanente',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SUDEBAN',
    siglas: 'SUDEBAN',
    nombre: 'Superintendencia de las Instituciones del Sector Bancario',
    tipo: 'financiero',
    sitioWeb: 'https://www.sudeban.gob.ve',
    descripcion: 'Ente regulador y supervisor del sistema bancario venezolano. Autoriza operaciones financieras.',
    leyOrganica: 'Ley de Instituciones del Sector Bancario (G.O. 40.557)',
    gacetaOficial: 'G.O. 40.557',
    obligaciones: [
      {
        nombre: 'Prevención Legitimación de Capitales',
        descripcion: 'Cumplimiento de normas antilavado: KYC, reportes de operaciones sospechosas, debida diligencia.',
        baseLegal: 'Ley Contra Legitimación de Capitales (G.O. 6.496)',
        periodicidad: 'permanente',
        sancion: 'Multa 1-5% del capital del banco + intervención',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SUDEASEG',
    siglas: 'SUDEASEG',
    nombre: 'Superintendencia de la Actividad Aseguradora',
    tipo: 'financiero',
    sitioWeb: 'https://www.sudeaseg.gob.ve',
    descripcion: 'Regulador del mercado de seguros y reaseguros en Venezuela.',
    leyOrganica: 'Ley de la Actividad Aseguradora (G.O. 6.220)',
    gacetaOficial: 'G.O. 6.220',
    obligaciones: [
      {
        nombre: 'Pólizas Obligatorias',
        descripcion: 'Contratación de seguros obligatorios: responsabilidad civil vehicular, HCM para empleados, riesgos profesionales.',
        baseLegal: 'Ley de Actividad Aseguradora Art. 39-45, LOTTT Art. 156',
        periodicidad: 'anual',
        aplica: ['todos'],
      },
    ],
  },
  {
    id: 'MIN-AMBIENTE',
    siglas: 'MINEC',
    nombre: 'Ministerio del Poder Popular para el Ecosocialismo',
    tipo: 'ambiental',
    sitioWeb: 'https://www.minec.gob.ve',
    descripcion: 'Ente rector de la política ambiental. Otorga permisos ambientales, estudios de impacto y controla emisiones.',
    leyOrganica: 'Ley Orgánica del Ambiente (G.O. 5.833 Extraordinario)',
    gacetaOficial: 'G.O. 5.833',
    obligaciones: [
      {
        nombre: 'Estudio de Impacto Ambiental',
        descripcion: 'Evaluación obligatoria previa a proyectos industriales, construcción, minería y actividades con impacto ambiental.',
        baseLegal: 'Ley Orgánica del Ambiente Art. 83-85, Decreto 1.257',
        periodicidad: 'unica',
        sancion: 'Paralización de obras + multa 5000-10000 UT',
        aplica: ['juridico'],
      },
      {
        nombre: 'Registro de Actividades Susceptibles de Degradar el Ambiente (RASDA)',
        descripcion: 'Inscripción obligatoria para empresas con actividades potencialmente contaminantes.',
        baseLegal: 'Decreto 2.635 (Normas para el Control de la Recuperación de Materiales Peligrosos)',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
      {
        nombre: 'Conformidad de Uso',
        descripcion: 'Autorización ambiental para el uso de terrenos y construcciones conforme al plan de ordenamiento territorial.',
        baseLegal: 'Ley Orgánica de Ordenación del Territorio Art. 50-55',
        periodicidad: 'unica',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'INDEPABIS',
    siglas: 'SUNDDE',
    nombre: 'Defensa del Consumidor y Usuario',
    tipo: 'regulador',
    sitioWeb: 'https://www.sundde.gob.ve',
    descripcion: 'Protección de derechos del consumidor: garantías, publicidad engañosa, calidad de productos y servicios.',
    leyOrganica: 'Ley para la Defensa de las Personas en el Acceso a Bienes y Servicios (G.O. 39.358)',
    gacetaOficial: 'G.O. 39.358',
    obligaciones: [
      {
        nombre: 'Garantías al Consumidor',
        descripcion: 'Obligación de ofrecer garantía mínima de 6 meses en bienes duraderos y servicios.',
        baseLegal: 'Ley Defensa del Consumidor Art. 36-42',
        periodicidad: 'permanente',
        sancion: 'Multa 500-5000 UT + clausura',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'SUNACRIP',
    siglas: 'SUNACRIP',
    nombre: 'Superintendencia Nacional de Criptoactivos y Actividades Conexas',
    tipo: 'financiero',
    sitioWeb: 'https://www.sunacrip.gob.ve',
    descripcion: 'Ente regulador de criptoactivos, minería digital y operaciones con monedas virtuales en Venezuela.',
    leyOrganica: 'Decreto Constituyente sobre el Sistema Integral de Criptoactivos (G.O. 41.575)',
    gacetaOficial: 'G.O. 41.575',
    obligaciones: [
      {
        nombre: 'Registro de Mineros de Criptoactivos',
        descripcion: 'Inscripción obligatoria para toda persona que realice minería de criptoactivos.',
        baseLegal: 'Decreto Constituyente Art. 10-15',
        periodicidad: 'unica',
        aplica: ['todos'],
      },
      {
        nombre: 'Licencia de Exchange',
        descripcion: 'Autorización para operar casas de intercambio de criptoactivos.',
        baseLegal: 'Providencia SUNACRIP/001/2020',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
    ],
  },
  {
    id: 'ALCALDIA',
    siglas: 'ALCALDÍA',
    nombre: 'Administración Tributaria Municipal',
    tipo: 'municipal',
    sitioWeb: '',
    descripcion: 'Las alcaldías municipales administran tributos locales: patente de industria y comercio, inmuebles urbanos, vehículos y publicidad comercial.',
    leyOrganica: 'Ley Orgánica del Poder Público Municipal (G.O. 6.015 Extraordinario)',
    gacetaOficial: 'G.O. 6.015',
    obligaciones: [
      {
        nombre: 'Patente de Industria y Comercio (ISAE)',
        descripcion: 'Impuesto municipal sobre actividades económicas. Tasa varía por municipio (0.5-10% de ingresos brutos).',
        baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 205-214, Ordenanza Municipal',
        periodicidad: 'trimestral',
        tasa: '0.5-10% según municipio y actividad',
        sancion: 'Multa + clausura temporal del establecimiento',
        aplica: ['juridico'],
      },
      {
        nombre: 'Impuesto sobre Inmuebles Urbanos',
        descripcion: 'Gravamen anual sobre el valor del inmueble urbano (terreno y construcción).',
        baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 173-178',
        periodicidad: 'anual',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto sobre Vehículos',
        descripcion: 'Impuesto anual sobre la propiedad de vehículos automotores.',
        baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 191-193',
        periodicidad: 'anual',
        aplica: ['todos'],
      },
      {
        nombre: 'Impuesto sobre Publicidad y Propaganda Comercial',
        descripcion: 'Gravamen sobre avisos publicitarios, vallas y propaganda comercial en espacios públicos.',
        baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 179-182',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
      {
        nombre: 'Licencia de Actividades Económicas',
        descripcion: 'Permiso municipal obligatorio para operar un establecimiento comercial, industrial o de servicios.',
        baseLegal: 'Ley Orgánica del Poder Público Municipal Art. 204',
        periodicidad: 'anual',
        aplica: ['juridico'],
      },
    ],
  },
];

export const leyesFundamentales: LeyVenezolana[] = [
  {
    id: 'CRBV',
    nombre: 'Constitución de la República Bolivariana de Venezuela',
    gacetaOficial: 'G.O. 36.860 / G.O. 5.908 Extraordinario (Enmienda 2009)',
    fechaPublicacion: '1999-12-30',
    ente: 'ANC',
    pais: 'VE',
    categoria: 'Constitucional',
    resumen: 'Carta magna que establece los principios fundamentales del Estado venezolano, derechos y garantías ciudadanas, estructura del poder público y el sistema económico.',
    articulosClaves: [
      { articulo: 'Art. 87', titulo: 'Derecho al Trabajo', contenido: 'Toda persona tiene derecho al trabajo y el deber de trabajar. El Estado garantizará la adopción de las medidas necesarias.' },
      { articulo: 'Art. 112', titulo: 'Libertad Económica', contenido: 'Todas las personas pueden dedicarse libremente a la actividad económica de su preferencia, sin más limitaciones que las previstas en la Constitución y la ley.' },
      { articulo: 'Art. 133', titulo: 'Deber de Contribuir', contenido: 'Toda persona tiene el deber de coadyuvar a los gastos públicos mediante el pago de impuestos, tasas y contribuciones.' },
      { articulo: 'Art. 299', titulo: 'Régimen Socioeconómico', contenido: 'El régimen socioeconómico se fundamenta en los principios de justicia social, democracia, eficiencia, libre competencia, protección del ambiente, productividad y solidaridad.' },
      { articulo: 'Art. 316', titulo: 'Sistema Tributario', contenido: 'El sistema tributario procurará la justa distribución de las cargas públicas según la capacidad económica del contribuyente.' },
    ],
  },
  {
    id: 'COT',
    nombre: 'Código Orgánico Tributario',
    gacetaOficial: 'G.O. 6.507 Extraordinario',
    fechaPublicacion: '2020-01-29',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Tributario',
    resumen: 'Marco general que rige las relaciones entre el Estado y los contribuyentes. Define deberes formales, sanciones, procedimientos de fiscalización y recursos.',
    articulosClaves: [
      { articulo: 'Art. 22', titulo: 'Obligación Tributaria', contenido: 'La obligación tributaria surge entre el Estado y los sujetos pasivos en cuanto ocurre el presupuesto de hecho previsto en la ley.' },
      { articulo: 'Art. 68', titulo: 'Solvencia Tributaria', contenido: 'El certificado de solvencia tributaria acredita el cumplimiento de las obligaciones tributarias del contribuyente.' },
      { articulo: 'Art. 99-103', titulo: 'Deberes Formales', contenido: 'Inscribirse en los registros, emitir facturas, llevar libros contables, presentar declaraciones y permitir fiscalización.' },
      { articulo: 'Art. 103-108', titulo: 'Sanciones por Incumplimiento', contenido: 'Multas de 50 a 500 UT, clausura de 5 a 10 días, comiso de bienes por infracciones a deberes formales.' },
    ],
  },
  {
    id: 'LOTTT',
    nombre: 'Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras',
    gacetaOficial: 'G.O. 6.076 Extraordinario',
    fechaPublicacion: '2012-05-07',
    ente: 'MIN-TRABAJO',
    pais: 'VE',
    categoria: 'Laboral',
    resumen: 'Regula las relaciones laborales: jornada, salario, prestaciones sociales, estabilidad laboral, utilidades, vacaciones y condiciones de trabajo.',
    articulosClaves: [
      { articulo: 'Art. 104', titulo: 'Salario', contenido: 'El salario comprende las remuneraciones devengadas por el trabajador de forma regular y permanente.' },
      { articulo: 'Art. 131-135', titulo: 'Utilidades', contenido: 'Todo patrono debe distribuir entre sus trabajadores el 15% de los beneficios líquidos al cierre del ejercicio, mínimo 30 días, máximo 120 días.' },
      { articulo: 'Art. 142', titulo: 'Prestaciones Sociales', contenido: 'Garantía de prestaciones sociales: 15 días de salario por trimestre + 2 días adicionales por año acumulativo.' },
      { articulo: 'Art. 173-177', titulo: 'Jornada de Trabajo', contenido: 'Jornada diurna: máximo 8 horas/día, 40 horas/semana. Nocturna: 7 horas. Mixta: 7.5 horas. Dos días de descanso semanal.' },
      { articulo: 'Art. 190', titulo: 'Vacaciones', contenido: 'El trabajador tiene derecho a 15 días hábiles de vacaciones anuales + 1 día por año adicional (máximo 30 días).' },
      { articulo: 'Art. 192', titulo: 'Bono Vacacional', contenido: 'El patrono pagará 15 días de salario + 1 día por año de servicio como bonificación vacacional.' },
    ],
  },
  {
    id: 'LOPCYMAT',
    nombre: 'Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo',
    gacetaOficial: 'G.O. 38.236',
    fechaPublicacion: '2005-07-26',
    ente: 'INPSASEL',
    pais: 'VE',
    categoria: 'Laboral',
    resumen: 'Establece normas de seguridad y salud ocupacional. Define responsabilidades del patrono, derechos del trabajador y sanciones por incumplimiento.',
    articulosClaves: [
      { articulo: 'Art. 46-52', titulo: 'Comité de Seguridad', contenido: 'Toda empresa con 5+ trabajadores debe constituir un Comité de Seguridad y Salud Laboral.' },
      { articulo: 'Art. 53-56', titulo: 'Derechos y Deberes', contenido: 'Derechos: ambiente seguro, información de riesgos, formación. Deberes: cumplir normas, usar EPP, reportar riesgos.' },
      { articulo: 'Art. 118-119', titulo: 'Sanciones', contenido: 'Multas de 26 a 100 UCITS por infracción. Responsabilidad penal del patrono por accidentes con muerte o lesiones graves.' },
    ],
  },
  {
    id: 'LEY-IVA',
    nombre: 'Ley del Impuesto al Valor Agregado',
    gacetaOficial: 'G.O. 6.507 Extraordinario',
    fechaPublicacion: '2020-01-29',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Tributario',
    resumen: 'Regula el impuesto indirecto sobre la venta de bienes y prestación de servicios. Tasa general 16%, reducida 8%, alícuota adicional 15% (lujo).',
    articulosClaves: [
      { articulo: 'Art. 1', titulo: 'Hecho Imponible', contenido: 'Se grava la venta de bienes muebles, prestación de servicios y la importación de bienes.' },
      { articulo: 'Art. 27', titulo: 'Tasa General', contenido: 'La alícuota general es del 16% sobre la base imponible de cada operación gravada.' },
      { articulo: 'Art. 11', titulo: 'No Sujetos', contenido: 'Importaciones del sector público, donaciones al Estado, exportaciones (tasa 0%), servicios de salud y educación.' },
    ],
  },
  {
    id: 'LEY-ISLR',
    nombre: 'Ley del Impuesto Sobre la Renta',
    gacetaOficial: 'G.O. 6.210 Extraordinario',
    fechaPublicacion: '2015-12-30',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Tributario',
    resumen: 'Grava los enriquecimientos netos anuales. Tarifa progresiva para personas naturales y jurídicas domiciliadas o no en Venezuela.',
    articulosClaves: [
      { articulo: 'Art. 1', titulo: 'Objeto', contenido: 'Los enriquecimientos anuales, netos y disponibles obtenidos en dinero o en especie, causarán impuesto.' },
      { articulo: 'Art. 52', titulo: 'Tarifa N° 2 (Jurídicos)', contenido: 'Hasta 2000 UT: 15%. De 2000 a 3000 UT: 22%. Más de 3000 UT: 34%.' },
      { articulo: 'Art. 86-87', titulo: 'Retenciones', contenido: 'Obligación de retener ISLR en pagos a terceros según Decreto 1.808.' },
    ],
  },
  {
    id: 'LEY-IGTF',
    nombre: 'Ley de Impuesto a las Grandes Transacciones Financieras',
    gacetaOficial: 'G.O. 6.687 Extraordinario',
    fechaPublicacion: '2022-03-25',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Tributario',
    resumen: 'Impuesto del 3% sobre pagos en moneda extranjera y criptoactivos. Aplica a sujetos pasivos especiales y contribuyentes designados.',
    articulosClaves: [
      { articulo: 'Art. 4', titulo: 'Hecho Imponible', contenido: 'Pagos en moneda distinta al bolívar, criptoactivos o criptomonedas por sujetos pasivos especiales.' },
      { articulo: 'Art. 10', titulo: 'Alícuota', contenido: 'La alícuota es del 3% sobre el monto de cada transacción gravada.' },
    ],
  },
  {
    id: 'LEY-PRECIOS-JUSTOS',
    nombre: 'Ley Orgánica de Precios Justos',
    gacetaOficial: 'G.O. 40.340',
    fechaPublicacion: '2014-01-23',
    ente: 'SUNDDE',
    pais: 'VE',
    categoria: 'Comercial',
    resumen: 'Establece el margen máximo de ganancia (30%), control de precios, sanciones por especulación, acaparamiento y boicot.',
    articulosClaves: [
      { articulo: 'Art. 32', titulo: 'Ganancia Máxima', contenido: 'El margen de ganancia de cada actor de la cadena de comercialización no excederá el 30%.' },
      { articulo: 'Art. 53', titulo: 'Especulación', contenido: 'Vender bienes a precios superiores a los fijados: pena de 8-10 años de prisión.' },
      { articulo: 'Art. 55', titulo: 'Acaparamiento', contenido: 'Restringir la circulación de bienes declarados de primera necesidad: pena de 6-8 años.' },
    ],
  },
  {
    id: 'LOTEL',
    nombre: 'Ley Orgánica de Telecomunicaciones',
    gacetaOficial: 'G.O. 39.610',
    fechaPublicacion: '2011-02-07',
    ente: 'CONATEL',
    pais: 'VE',
    categoria: 'Telecomunicaciones',
    resumen: 'Marco regulatorio de las telecomunicaciones: habilitaciones, concesiones, espectro radioeléctrico, derechos de los usuarios y régimen sancionatorio.',
    articulosClaves: [
      { articulo: 'Art. 15', titulo: 'Habilitación', contenido: 'Toda persona que pretenda prestar servicios de telecomunicaciones requiere habilitación administrativa de CONATEL.' },
      { articulo: 'Art. 70', titulo: 'Espectro', contenido: 'El espectro radioeléctrico es un bien del dominio público. Su uso requiere concesión.' },
      { articulo: 'Art. 189', titulo: 'Sanciones', contenido: 'Multas de 10.000 a 100.000 UT por operar sin habilitación o incumplir condiciones.' },
    ],
  },
  {
    id: 'LEY-SEGURO-SOCIAL',
    nombre: 'Ley del Seguro Social Obligatorio',
    gacetaOficial: 'G.O. 39.912',
    fechaPublicacion: '2012-04-30',
    ente: 'IVSS',
    pais: 'VE',
    categoria: 'Seguridad Social',
    resumen: 'Regula la seguridad social: prestaciones por enfermedad, maternidad, vejez, sobrevivientes, incapacidad y paro forzoso.',
    articulosClaves: [
      { articulo: 'Art. 63', titulo: 'Obligatoriedad', contenido: 'Todo patrono está obligado a inscribir a sus trabajadores dentro de los 3 días siguientes al inicio de labores.' },
      { articulo: 'Art. 66', titulo: 'Cotizaciones', contenido: 'El patrono aporta 9-11% y el trabajador 4% del salario normal mensual.' },
    ],
  },
  {
    id: 'CODIGO-COMERCIO',
    nombre: 'Código de Comercio',
    gacetaOficial: 'G.O. 475 Extraordinario',
    fechaPublicacion: '1955-12-21',
    ente: 'SAREN',
    pais: 'VE',
    categoria: 'Mercantil',
    resumen: 'Rige las operaciones mercantiles: actos de comercio, sociedades mercantiles, títulos valores, quiebras, contratos mercantiles y obligaciones del comerciante.',
    articulosClaves: [
      { articulo: 'Art. 2', titulo: 'Actos de Comercio', contenido: 'Son actos de comercio las compras y ventas de bienes muebles hechas con ánimo de revenderlos, operaciones bancarias, seguros, fletamentos.' },
      { articulo: 'Art. 19', titulo: 'Registro Mercantil', contenido: 'Los comerciantes harán registrar en el Registro Mercantil: su firma, acta constitutiva, autorizaciones y poderes.' },
      { articulo: 'Art. 200-201', titulo: 'Sociedades de Comercio', contenido: 'Las compañías de comercio son: en nombre colectivo, en comandita, anónimas (C.A.) y de responsabilidad limitada (S.R.L.).' },
      { articulo: 'Art. 32-35', titulo: 'Libros de Comercio', contenido: 'Todo comerciante debe llevar: Libro Diario, Libro Mayor y Libro de Inventarios.' },
    ],
  },
  {
    id: 'CODIGO-CIVIL',
    nombre: 'Código Civil de Venezuela',
    gacetaOficial: 'G.O. 2.990 Extraordinario',
    fechaPublicacion: '1982-07-26',
    ente: 'TSJ',
    pais: 'VE',
    categoria: 'Civil',
    resumen: 'Normas sobre personas, familia, sucesiones, bienes, contratos y obligaciones civiles.',
    articulosClaves: [
      { articulo: 'Art. 16-18', titulo: 'Personalidad Jurídica', contenido: 'Toda persona tiene personalidad jurídica. Las personas jurídicas se constituyen por ley, por acuerdo de voluntades o por acto unilateral.' },
      { articulo: 'Art. 1.133-1.140', titulo: 'Contratos', contenido: 'El contrato es una convención entre dos o más personas para constituir, reglar, transmitir, modificar o extinguir un vínculo jurídico.' },
      { articulo: 'Art. 1.159', titulo: 'Fuerza de Ley', contenido: 'Los contratos tienen fuerza de ley entre las partes y deben ejecutarse de buena fe.' },
      { articulo: 'Art. 1.185', titulo: 'Responsabilidad Civil', contenido: 'El que con intención, negligencia o imprudencia causa un daño a otro está obligado a repararlo.' },
    ],
  },
  {
    id: 'LOA',
    nombre: 'Ley Orgánica de Aduanas',
    gacetaOficial: 'G.O. 6.155 Extraordinario',
    fechaPublicacion: '2014-11-19',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Aduanero',
    resumen: 'Regula las operaciones aduaneras de importación y exportación, tránsito, depósito, zonas francas y régimen sancionatorio aduanero.',
    articulosClaves: [
      { articulo: 'Art. 7-15', titulo: 'Régimen Aduanero', contenido: 'Los actos de importación, exportación, tránsito y depósito están sujetos a potestad aduanera.' },
      { articulo: 'Art. 83-98', titulo: 'Infracciones Aduaneras', contenido: 'Contrabando, defraudación de rentas aduaneras y delitos conexos con penas de 2-6 años de prisión.' },
    ],
  },
  {
    id: 'LOA-AMBIENTE',
    nombre: 'Ley Orgánica del Ambiente',
    gacetaOficial: 'G.O. 5.833 Extraordinario',
    fechaPublicacion: '2006-12-22',
    ente: 'MINEC',
    pais: 'VE',
    categoria: 'Ambiental',
    resumen: 'Establece los principios para la conservación, defensa y mejoramiento del ambiente. Define responsabilidades ambientales y régimen sancionatorio.',
    articulosClaves: [
      { articulo: 'Art. 3', titulo: 'Gestión del Ambiente', contenido: 'La gestión del ambiente comprende la planificación, administración, conservación, protección y mejoramiento del ambiente.' },
      { articulo: 'Art. 83-85', titulo: 'Evaluación de Impacto', contenido: 'Toda actividad susceptible de degradar el ambiente debe contar con estudio de impacto ambiental previo.' },
      { articulo: 'Art. 108-114', titulo: 'Sanciones', contenido: 'Multas de 100 a 50.000 UT y prisión de 6 meses a 3 años por delitos ambientales.' },
    ],
  },
  {
    id: 'LEY-PENAL-AMBIENTE',
    nombre: 'Ley Penal del Ambiente',
    gacetaOficial: 'G.O. 39.913',
    fechaPublicacion: '2012-05-02',
    ente: 'MINEC',
    pais: 'VE',
    categoria: 'Ambiental',
    resumen: 'Tipifica los delitos ambientales y establece sanciones penales por contaminación, destrucción de ecosistemas y manejo inadecuado de desechos.',
    articulosClaves: [
      { articulo: 'Art. 28-33', titulo: 'Degradación de Suelos', contenido: 'Penas de 1-5 años de prisión por degradar suelos, deforestar sin autorización o destruir áreas protegidas.' },
      { articulo: 'Art. 42-50', titulo: 'Contaminación de Aguas', contenido: 'Penas de 1-3 años por vertido de sustancias contaminantes en cuerpos de agua.' },
    ],
  },
  {
    id: 'LOPPM',
    nombre: 'Ley Orgánica del Poder Público Municipal',
    gacetaOficial: 'G.O. 6.015 Extraordinario',
    fechaPublicacion: '2010-12-28',
    ente: 'ALCALDÍA',
    pais: 'VE',
    categoria: 'Municipal',
    resumen: 'Regula la organización y funcionamiento de los municipios: impuestos municipales, patentes, licencias y servicios públicos locales.',
    articulosClaves: [
      { articulo: 'Art. 173-178', titulo: 'Impuesto sobre Inmuebles Urbanos', contenido: 'Los municipios pueden crear impuestos sobre inmuebles urbanos basados en el valor catastral.' },
      { articulo: 'Art. 205-214', titulo: 'Impuesto sobre Actividades Económicas', contenido: 'Las actividades económicas realizadas en jurisdicción municipal generan impuesto (ISAE) sobre ingresos brutos.' },
    ],
  },
  {
    id: 'LEY-ANTICORRUPCION',
    nombre: 'Ley Contra la Corrupción',
    gacetaOficial: 'G.O. 6.155 Extraordinario',
    fechaPublicacion: '2014-11-19',
    ente: 'CGR',
    pais: 'VE',
    categoria: 'Penal',
    resumen: 'Establece sanciones por peculado, malversación, concusión, tráfico de influencias y enriquecimiento ilícito de funcionarios públicos.',
    articulosClaves: [
      { articulo: 'Art. 52-60', titulo: 'Peculado', contenido: 'El funcionario que se apropie de bienes públicos será penado con prisión de 3-10 años.' },
      { articulo: 'Art. 73', titulo: 'Enriquecimiento Ilícito', contenido: 'Funcionario cuyo patrimonio aumente desproporcionadamente: prisión de 3-10 años.' },
    ],
  },
  {
    id: 'LEY-LCPMLFT',
    nombre: 'Ley Contra la Legitimación de Capitales y Financiamiento al Terrorismo',
    gacetaOficial: 'G.O. 6.496 Extraordinario',
    fechaPublicacion: '2019-12-13',
    ente: 'SUDEBAN',
    pais: 'VE',
    categoria: 'Financiero',
    resumen: 'Prevención y sanción del lavado de dinero y financiamiento del terrorismo. Obligaciones de reporte para sujetos obligados.',
    articulosClaves: [
      { articulo: 'Art. 4-8', titulo: 'Delito de Legitimación', contenido: 'Prisión de 10-15 años para quien convierta, transfiera o maneje bienes provenientes de actividades ilícitas.' },
      { articulo: 'Art. 23-28', titulo: 'Obligaciones de Reporte', contenido: 'Bancos, casas de cambio y sujetos obligados deben reportar operaciones sospechosas a la UNIF.' },
    ],
  },
  {
    id: 'LEY-DATOS-PERSONALES',
    nombre: 'Ley Especial contra los Delitos Informáticos',
    gacetaOficial: 'G.O. 37.313',
    fechaPublicacion: '2001-10-30',
    ente: 'TSJ',
    pais: 'VE',
    categoria: 'Tecnología',
    resumen: 'Tipifica delitos informáticos: acceso indebido, sabotaje, fraude, espionaje informático y violación de privacidad de datos.',
    articulosClaves: [
      { articulo: 'Art. 6', titulo: 'Acceso Indebido', contenido: 'Prisión de 1-5 años por acceder sin autorización a sistemas informáticos protegidos.' },
      { articulo: 'Art. 20', titulo: 'Violación de Privacidad', contenido: 'Prisión de 2-6 años por revelar datos personales sin consentimiento obtenidos de sistemas informáticos.' },
    ],
  },
  {
    id: 'GACETA-6952',
    nombre: 'Gaceta Oficial N° 6.952 — Providencias Fiscales 2025',
    gacetaOficial: 'G.O. 6.952 Extraordinario',
    fechaPublicacion: '2025-01-15',
    ente: 'SENIAT',
    pais: 'VE',
    categoria: 'Tributario',
    resumen: 'Providencias del SENIAT para el ejercicio fiscal 2025: actualización de Unidad Tributaria, calendario de declaraciones, nuevos deberes de facturación electrónica.',
    articulosClaves: [
      { articulo: 'Providencia 001', titulo: 'Unidad Tributaria 2025', contenido: 'Se fija el valor de la Unidad Tributaria en Bs. 9,00 para el ejercicio fiscal 2025.' },
      { articulo: 'Providencia 002', titulo: 'Calendario SPE', contenido: 'Calendario de declaraciones y pagos para Sujetos Pasivos Especiales del ejercicio 2025.' },
      { articulo: 'Providencia 003', titulo: 'Facturación Electrónica', contenido: 'Obligación progresiva de facturación electrónica para contribuyentes con ingresos superiores a 3.000 UT anuales.' },
    ],
  },
  {
    id: 'LEY-FUNDACIONES',
    nombre: 'Decreto con Rango y Fuerza de Ley sobre Fundaciones del Estado',
    gacetaOficial: 'G.O. 37.262',
    fechaPublicacion: '2001-08-16',
    ente: 'ANC',
    pais: 'VE',
    categoria: 'Institucional',
    resumen: 'Regula la creación, funcionamiento, supervisión y disolución de fundaciones del Estado y fundaciones privadas sin fines de lucro.',
    articulosClaves: [
      { articulo: 'Art. 2-5', titulo: 'Definición', contenido: 'Las fundaciones son patrimonios afectados a un fin de utilidad general, científico, artístico, literario, benéfico o social.' },
      { articulo: 'Art. 19-22', titulo: 'Supervisión', contenido: 'Las fundaciones del Estado están sujetas al control de la Contraloría General de la República.' },
    ],
  },
  {
    id: 'LEY-ASOCIACIONES-CIVILES',
    nombre: 'Disposiciones del Código Civil sobre Asociaciones Civiles',
    gacetaOficial: 'G.O. 2.990 Extraordinario',
    fechaPublicacion: '1982-07-26',
    ente: 'SAREN',
    pais: 'VE',
    categoria: 'Civil',
    resumen: 'Normas del Código Civil que regulan la constitución, registro y funcionamiento de asociaciones civiles sin fines de lucro.',
    articulosClaves: [
      { articulo: 'Art. 19-20 CC', titulo: 'Personalidad Jurídica', contenido: 'Las asociaciones civiles adquieren personalidad jurídica mediante el registro de su acta constitutiva ante la oficina subalterna de Registro.' },
      { articulo: 'Art. 21-23 CC', titulo: 'Objeto y Patrimonio', contenido: 'Las asociaciones civiles deben tener objeto lícito y patrimonio propio destinado a sus fines.' },
    ],
  },
  {
    id: 'LEY-VIVIENDA',
    nombre: 'Ley del Régimen Prestacional de Vivienda y Hábitat',
    gacetaOficial: 'G.O. 39.945',
    fechaPublicacion: '2012-06-15',
    ente: 'BANAVIH',
    pais: 'VE',
    categoria: 'Seguridad Social',
    resumen: 'Regula el ahorro habitacional obligatorio (FAOV), créditos hipotecarios, política de vivienda y hábitat.',
    articulosClaves: [
      { articulo: 'Art. 172', titulo: 'Aportes FAOV', contenido: 'El empleador aporta el 2% y el trabajador el 1% del salario integral mensual al Fondo de Ahorro para la Vivienda.' },
    ],
  },

  {
    id: 'ES-CONSTITUCION',
    nombre: 'Constitución Española',
    gacetaOficial: 'BOE núm. 311',
    fechaPublicacion: '1978-12-29',
    ente: 'CORTES GENERALES',
    pais: 'ES',
    categoria: 'Constitucional',
    resumen: 'Carta magna del Reino de España. Establece el Estado social y democrático de derecho, la monarquía parlamentaria, derechos fundamentales y organización territorial.',
    articulosClaves: [
      { articulo: 'Art. 14', titulo: 'Igualdad', contenido: 'Los españoles son iguales ante la ley, sin discriminación por nacimiento, raza, sexo, religión u opinión.' },
      { articulo: 'Art. 31', titulo: 'Deber de Contribuir', contenido: 'Todos contribuirán al sostenimiento de los gastos públicos de acuerdo con su capacidad económica mediante un sistema tributario justo.' },
      { articulo: 'Art. 35', titulo: 'Derecho al Trabajo', contenido: 'Todos los españoles tienen el deber de trabajar y el derecho al trabajo, a la libre elección de profesión u oficio.' },
      { articulo: 'Art. 38', titulo: 'Libertad de Empresa', contenido: 'Se reconoce la libertad de empresa en el marco de la economía de mercado.' },
      { articulo: 'Art. 128', titulo: 'Riqueza del País', contenido: 'Toda la riqueza del país está subordinada al interés general. Se reconoce la iniciativa pública en la actividad económica.' },
    ],
  },
  {
    id: 'ES-LGT',
    nombre: 'Ley General Tributaria',
    gacetaOficial: 'BOE núm. 302 — Ley 58/2003',
    fechaPublicacion: '2003-12-18',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Marco general del sistema tributario español: obligaciones tributarias, procedimientos de gestión, inspección, recaudación y régimen sancionador.',
    articulosClaves: [
      { articulo: 'Art. 2', titulo: 'Tributos', contenido: 'Los tributos son impuestos, tasas y contribuciones especiales. Se rigen por la Constitución, tratados y esta Ley.' },
      { articulo: 'Art. 17-18', titulo: 'Obligación Tributaria', contenido: 'La obligación tributaria principal consiste en el pago de la cuota tributaria.' },
      { articulo: 'Art. 178-212', titulo: 'Infracciones y Sanciones', contenido: 'Infracciones leves (multa del 50%), graves (50-100%) y muy graves (100-150%) del perjuicio económico.' },
    ],
  },
  {
    id: 'ES-LIRPF',
    nombre: 'Ley del Impuesto sobre la Renta de las Personas Físicas',
    gacetaOficial: 'BOE núm. 285 — Ley 35/2006',
    fechaPublicacion: '2006-11-29',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Regula el IRPF: rendimientos del trabajo, capital, actividades económicas, ganancias patrimoniales. Tarifa progresiva del 19% al 47%.',
    articulosClaves: [
      { articulo: 'Art. 6-8', titulo: 'Hecho Imponible', contenido: 'Constituye el hecho imponible la obtención de renta por el contribuyente: trabajo, capital, actividades económicas y ganancias.' },
      { articulo: 'Art. 63', titulo: 'Escala General', contenido: 'Tarifa progresiva: hasta 12.450€ al 19%; hasta 20.200€ al 24%; hasta 35.200€ al 30%; hasta 60.000€ al 37%; hasta 300.000€ al 45%; más de 300.000€ al 47%.' },
      { articulo: 'Art. 96', titulo: 'Obligación de Declarar', contenido: 'Están obligados a declarar los contribuyentes con rendimientos del trabajo superiores a 22.000€ anuales (un pagador).' },
    ],
  },
  {
    id: 'ES-LIS',
    nombre: 'Ley del Impuesto sobre Sociedades',
    gacetaOficial: 'BOE núm. 288 — Ley 27/2014',
    fechaPublicacion: '2014-11-28',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Grava la renta de las sociedades y entidades jurídicas. Tipo general 25%. Tipo reducido para empresas de nueva creación (15%) y entidades sin fines de lucro (10%).',
    articulosClaves: [
      { articulo: 'Art. 4', titulo: 'Hecho Imponible', contenido: 'Constituye el hecho imponible la obtención de renta por el contribuyente, cualquiera que fuese su fuente u origen.' },
      { articulo: 'Art. 29', titulo: 'Tipo de Gravamen', contenido: 'Tipo general: 25%. Entidades de nueva creación: 15% (primer y segundo período). Entidades sin fines de lucro: 10%.' },
      { articulo: 'Art. 124-126', titulo: 'Declaración', contenido: 'Los contribuyentes presentarán declaración dentro de los 25 días naturales siguientes a los 6 meses posteriores al cierre del período.' },
    ],
  },
  {
    id: 'ES-LIVA',
    nombre: 'Ley del Impuesto sobre el Valor Añadido',
    gacetaOficial: 'BOE núm. 312 — Ley 37/1992',
    fechaPublicacion: '1992-12-29',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Impuesto indirecto que grava entregas de bienes y prestaciones de servicios. Tipo general 21%, reducido 10%, superreducido 4%.',
    articulosClaves: [
      { articulo: 'Art. 4', titulo: 'Hecho Imponible', contenido: 'Están sujetas las entregas de bienes y prestaciones de servicios realizadas por empresarios o profesionales a título oneroso.' },
      { articulo: 'Art. 90-91', titulo: 'Tipos Impositivos', contenido: 'Tipo general: 21%. Tipo reducido (10%): alimentos, vivienda, transporte. Tipo superreducido (4%): pan, leche, libros, medicamentos.' },
      { articulo: 'Art. 164', titulo: 'Obligaciones de los Sujetos Pasivos', contenido: 'Presentar declaraciones, expedir facturas, llevar registros, conservar facturas durante 4 años.' },
    ],
  },
  {
    id: 'ES-ET',
    nombre: 'Estatuto de los Trabajadores',
    gacetaOficial: 'BOE núm. 255 — Real Decreto Legislativo 2/2015',
    fechaPublicacion: '2015-10-24',
    ente: 'MIN-TRABAJO-ES',
    pais: 'ES',
    categoria: 'Laboral',
    resumen: 'Norma básica del derecho laboral español: contratación, jornada, salario, vacaciones, despido, negociación colectiva y representación de los trabajadores.',
    articulosClaves: [
      { articulo: 'Art. 4', titulo: 'Derechos Laborales', contenido: 'Derecho al trabajo, libre elección de profesión, promoción, no discriminación, integridad física y privacidad.' },
      { articulo: 'Art. 26-33', titulo: 'Salario', contenido: 'SMI fijado anualmente por el Gobierno. Garantía del salario mínimo interprofesional. Pagas extraordinarias obligatorias.' },
      { articulo: 'Art. 34-38', titulo: 'Jornada y Descansos', contenido: 'Jornada máxima 40 horas semanales. Descanso mínimo entre jornadas de 12 horas. 30 días naturales de vacaciones.' },
      { articulo: 'Art. 49-56', titulo: 'Extinción del Contrato', contenido: 'Causas de extinción: mutuo acuerdo, causas objetivas, despido disciplinario. Indemnización por despido improcedente: 33 días/año.' },
    ],
  },
  {
    id: 'ES-LGSS',
    nombre: 'Ley General de la Seguridad Social',
    gacetaOficial: 'BOE núm. 261 — Real Decreto Legislativo 8/2015',
    fechaPublicacion: '2015-10-31',
    ente: 'TGSS',
    pais: 'ES',
    categoria: 'Seguridad Social',
    resumen: 'Regula el sistema de Seguridad Social español: afiliación, cotización, prestaciones (jubilación, incapacidad, desempleo, maternidad/paternidad).',
    articulosClaves: [
      { articulo: 'Art. 6-12', titulo: 'Campo de Aplicación', contenido: 'Protege a todos los españoles que residan en España y ejerzan actividad profesional, más asimilados.' },
      { articulo: 'Art. 141-146', titulo: 'Cotización', contenido: 'Base de cotización: remuneración total del trabajador. Topes mínimos y máximos actualizados anualmente.' },
      { articulo: 'Art. 205-210', titulo: 'Jubilación', contenido: 'Edad ordinaria de jubilación: 67 años (o 65 con 38 años y 6 meses cotizados). Prestación del 50-100% de la base reguladora.' },
    ],
  },
  {
    id: 'ES-LSC',
    nombre: 'Ley de Sociedades de Capital',
    gacetaOficial: 'BOE núm. 161 — Real Decreto Legislativo 1/2010',
    fechaPublicacion: '2010-07-03',
    ente: 'MIN-JUSTICIA-ES',
    pais: 'ES',
    categoria: 'Mercantil',
    resumen: 'Regula las sociedades de capital en España: S.A. (Sociedad Anónima), S.L. (Sociedad Limitada) y S. Com. A. Capital mínimo, órganos de gobierno, cuentas anuales.',
    articulosClaves: [
      { articulo: 'Art. 1-4', titulo: 'Tipos Societarios', contenido: 'Sociedades de capital: S.A. (capital mínimo 60.000€), S.L. (capital mínimo 3.000€), S. Comanditaria por acciones.' },
      { articulo: 'Art. 253-260', titulo: 'Cuentas Anuales', contenido: 'Balance, cuenta de pérdidas y ganancias, estado de cambios en patrimonio neto, estado de flujos y memoria.' },
      { articulo: 'Art. 273-277', titulo: 'Distribución de Dividendos', contenido: 'Reserva legal: 10% del beneficio hasta que alcance el 20% del capital social.' },
    ],
  },
  {
    id: 'ES-LOPD',
    nombre: 'Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales',
    gacetaOficial: 'BOE núm. 294 — Ley Orgánica 3/2018',
    fechaPublicacion: '2018-12-06',
    ente: 'AEPD',
    pais: 'ES',
    categoria: 'Tecnología',
    resumen: 'Adaptación del RGPD europeo al derecho español. Protección de datos personales, derechos ARCO-POL, delegado de protección de datos y régimen sancionador.',
    articulosClaves: [
      { articulo: 'Art. 5-6', titulo: 'Principios', contenido: 'Licitud, lealtad, transparencia, limitación de la finalidad, minimización de datos, exactitud, integridad y confidencialidad.' },
      { articulo: 'Art. 12-18', titulo: 'Derechos del Interesado', contenido: 'Derechos de acceso, rectificación, supresión (olvido), limitación, portabilidad y oposición al tratamiento.' },
      { articulo: 'Art. 70-78', titulo: 'Sanciones', contenido: 'Infracciones muy graves: hasta 20 millones de euros o 4% de la facturación global anual.' },
    ],
  },
  {
    id: 'ES-LEY-AUTONOMOS',
    nombre: 'Ley del Estatuto del Trabajo Autónomo',
    gacetaOficial: 'BOE núm. 166 — Ley 20/2007',
    fechaPublicacion: '2007-07-12',
    ente: 'MIN-TRABAJO-ES',
    pais: 'ES',
    categoria: 'Laboral',
    resumen: 'Regula los derechos y deberes de los trabajadores autónomos, el TRADE (trabajador autónomo económicamente dependiente) y la protección social del autónomo.',
    articulosClaves: [
      { articulo: 'Art. 1-3', titulo: 'Ámbito de Aplicación', contenido: 'Personas físicas que realizan actividad económica habitualmente, por cuenta propia y fuera del ámbito de dirección de otra persona.' },
      { articulo: 'Art. 11-12', titulo: 'TRADE', contenido: 'Autónomo económicamente dependiente: al menos el 75% de sus ingresos provienen de un solo cliente.' },
    ],
  },
  {
    id: 'ES-LEY-EMPRENDEDORES',
    nombre: 'Ley de Apoyo a los Emprendedores y su Internacionalización',
    gacetaOficial: 'BOE núm. 233 — Ley 14/2013',
    fechaPublicacion: '2013-09-28',
    ente: 'MIN-ECONOMIA-ES',
    pais: 'ES',
    categoria: 'Mercantil',
    resumen: 'Medidas para facilitar la creación de empresas: emprendedor de responsabilidad limitada, SL de formación sucesiva, IVA de caja y visado para emprendedores.',
    articulosClaves: [
      { articulo: 'Art. 7-11', titulo: 'Emprendedor Responsabilidad Limitada', contenido: 'La vivienda habitual del emprendedor queda excluida de la responsabilidad patrimonial por deudas empresariales (hasta 300.000€).' },
      { articulo: 'Art. 23', titulo: 'SL de Formación Sucesiva', contenido: 'Permite crear una S.L. sin capital mínimo, con obligaciones de dotación a reservas.' },
    ],
  },
  {
    id: 'ES-LEY-PREVENCION-RIESGOS',
    nombre: 'Ley de Prevención de Riesgos Laborales',
    gacetaOficial: 'BOE núm. 269 — Ley 31/1995',
    fechaPublicacion: '1995-11-10',
    ente: 'MIN-TRABAJO-ES',
    pais: 'ES',
    categoria: 'Laboral',
    resumen: 'Establece los principios de seguridad y salud en el trabajo. Evaluación de riesgos, plan de prevención, delegados de prevención y comité de seguridad.',
    articulosClaves: [
      { articulo: 'Art. 14-15', titulo: 'Derecho a Protección', contenido: 'Los trabajadores tienen derecho a una protección eficaz en materia de seguridad y salud en el trabajo.' },
      { articulo: 'Art. 16', titulo: 'Plan de Prevención', contenido: 'La prevención de riesgos laborales se integrará en el sistema general de gestión de la empresa mediante un plan de prevención.' },
      { articulo: 'Art. 42-49', titulo: 'Responsabilidades', contenido: 'Infracciones leves: 40-2.045€. Graves: 2.046-40.985€. Muy graves: 40.986-819.780€.' },
    ],
  },
  {
    id: 'ES-CC',
    nombre: 'Código de Comercio de España',
    gacetaOficial: 'BOE — Real Decreto de 22 de agosto de 1885',
    fechaPublicacion: '1885-10-16',
    ente: 'MIN-JUSTICIA-ES',
    pais: 'ES',
    categoria: 'Mercantil',
    resumen: 'Norma básica del derecho mercantil español: comerciantes, obligaciones contables, contratos mercantiles, sociedades y quiebras.',
    articulosClaves: [
      { articulo: 'Art. 25-33', titulo: 'Contabilidad', contenido: 'Todo empresario debe llevar contabilidad ordenada: Libro Diario, Libro de Inventarios y Cuentas Anuales.' },
      { articulo: 'Art. 34-41', titulo: 'Cuentas Anuales', contenido: 'Balance, cuenta de pérdidas y ganancias, y memoria explicativa. Formuladas en plazo de 3 meses desde el cierre.' },
    ],
  },
  {
    id: 'ES-LEY-FUNDACIONES',
    nombre: 'Ley de Fundaciones',
    gacetaOficial: 'BOE núm. 310 — Ley 50/2002',
    fechaPublicacion: '2002-12-27',
    ente: 'MIN-JUSTICIA-ES',
    pais: 'ES',
    categoria: 'Institucional',
    resumen: 'Regula la constitución, gobierno, actividades y extinción de fundaciones. Dotación mínima 30.000€. Protectorado del Estado.',
    articulosClaves: [
      { articulo: 'Art. 2-3', titulo: 'Concepto', contenido: 'Fundaciones: organizaciones sin fin de lucro que destinan su patrimonio a fines de interés general.' },
      { articulo: 'Art. 12', titulo: 'Dotación', contenido: 'Dotación inicial mínima de 30.000€. Puede aportarse en bienes o derechos, o comprometerse en 5 años.' },
      { articulo: 'Art. 21-24', titulo: 'Actividades Económicas', contenido: 'Las fundaciones pueden realizar actividades económicas siempre que se relacionen con sus fines o sean accesorias.' },
    ],
  },
  {
    id: 'ES-LEY-ASOCIACIONES',
    nombre: 'Ley Orgánica Reguladora del Derecho de Asociación',
    gacetaOficial: 'BOE núm. 73 — Ley Orgánica 1/2002',
    fechaPublicacion: '2002-03-26',
    ente: 'MIN-INTERIOR-ES',
    pais: 'ES',
    categoria: 'Civil',
    resumen: 'Regula el derecho fundamental de asociación: constitución, inscripción, organización, funcionamiento y disolución de asociaciones.',
    articulosClaves: [
      { articulo: 'Art. 5-6', titulo: 'Constitución', contenido: 'Las asociaciones se constituyen mediante acuerdo de tres o más personas. Se inscribirán en el registro correspondiente.' },
      { articulo: 'Art. 13-14', titulo: 'Órganos', contenido: 'La Asamblea General es el órgano supremo. La Junta Directiva gestiona y representa la asociación.' },
    ],
  },
  {
    id: 'ES-LEY-MECENAZGO',
    nombre: 'Ley de Régimen Fiscal de Entidades sin Fines Lucrativos y de los Incentivos Fiscales al Mecenazgo',
    gacetaOficial: 'BOE núm. 307 — Ley 49/2002',
    fechaPublicacion: '2002-12-24',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Régimen fiscal especial para fundaciones y asociaciones declaradas de utilidad pública. Deducciones por donativos y mecenazgo.',
    articulosClaves: [
      { articulo: 'Art. 5-6', titulo: 'Entidades Beneficiarias', contenido: 'Fundaciones, asociaciones de utilidad pública, ONG de desarrollo, entidades religiosas, universidades y centros de investigación.' },
      { articulo: 'Art. 6-14', titulo: 'Régimen Fiscal Especial', contenido: 'Exención en IS de rentas vinculadas al objeto social. Tipo del 10% para rentas no exentas. Exención en ITP, ICIO e IBI.' },
      { articulo: 'Art. 17-20', titulo: 'Deducciones por Donativos', contenido: 'Personas físicas: 80% de deducción sobre los primeros 150€ donados, 35% sobre el exceso (40% si recurrente). Personas jurídicas: 35% (40% si recurrente).' },
    ],
  },
  {
    id: 'ES-RGPD',
    nombre: 'Reglamento General de Protección de Datos (UE)',
    gacetaOficial: 'DOUE L 119 — Reglamento (UE) 2016/679',
    fechaPublicacion: '2016-05-04',
    ente: 'UE / AEPD',
    pais: 'ES',
    categoria: 'Tecnología',
    resumen: 'Reglamento europeo directamente aplicable en España. Protección de datos personales, consentimiento, derechos del interesado, DPO y transferencias internacionales.',
    articulosClaves: [
      { articulo: 'Art. 5', titulo: 'Principios', contenido: 'Licitud, lealtad, transparencia, limitación de la finalidad, minimización, exactitud, integridad y responsabilidad proactiva.' },
      { articulo: 'Art. 15-22', titulo: 'Derechos del Interesado', contenido: 'Acceso, rectificación, supresión (derecho al olvido), portabilidad, oposición y decisiones individuales automatizadas.' },
      { articulo: 'Art. 83', titulo: 'Sanciones', contenido: 'Hasta 20 millones de euros o el 4% de la facturación anual mundial, la cifra que sea mayor.' },
    ],
  },
  {
    id: 'ES-LEY-LUCHA-FRAUDE',
    nombre: 'Ley de Medidas de Prevención y Lucha contra el Fraude Fiscal',
    gacetaOficial: 'BOE núm. 164 — Ley 11/2021',
    fechaPublicacion: '2021-07-10',
    ente: 'AEAT',
    pais: 'ES',
    categoria: 'Tributario',
    resumen: 'Medidas antifraude: prohibición de software de doble contabilidad, límite de pagos en efectivo a 1.000€, transparencia de criptoactivos y lista de morosos.',
    articulosClaves: [
      { articulo: 'Art. 201 bis LGT', titulo: 'Software Antifraude', contenido: 'Prohibición de software que permita la manipulación de datos contables. Sanción: 150.000€ por ejercicio.' },
      { articulo: 'Disp. Adic. 1ª', titulo: 'Límite Efectivo', contenido: 'Operaciones en las que alguna parte actúe como empresario no podrán pagarse en efectivo si superan 1.000€.' },
    ],
  },
];

export function getEnteFiscalById(id: string): EnteFiscal | undefined {
  return entesFiscales.find(e => e.id === id);
}

export function getEntesPorTipo(tipo: EnteFiscal['tipo']): EnteFiscal[] {
  return entesFiscales.filter(e => e.tipo === tipo);
}

export function getLeyById(id: string): LeyVenezolana | undefined {
  return leyesFundamentales.find(l => l.id === id);
}

export function getLeyesPorPais(pais: 'VE' | 'ES'): LeyVenezolana[] {
  return leyesFundamentales.filter(l => l.pais === pais);
}

export function getLeyesPorCategoria(categoria: string): LeyVenezolana[] {
  return leyesFundamentales.filter(l => l.categoria === categoria);
}

export function getTodasLasObligaciones(): { ente: string; obligacion: ObligacionFiscal }[] {
  return entesFiscales.flatMap(e =>
    e.obligaciones.map(o => ({ ente: e.siglas, obligacion: o }))
  );
}

export function getObligacionesPorPeriodicidad(periodicidad: ObligacionFiscal['periodicidad']): { ente: string; obligacion: ObligacionFiscal }[] {
  return getTodasLasObligaciones().filter(o => o.obligacion.periodicidad === periodicidad);
}

export function getCalendarioFiscal(): { mes: string; obligaciones: { ente: string; nombre: string; baseLegal: string }[] }[] {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return meses.map((mes, i) => {
    const obligaciones: { ente: string; nombre: string; baseLegal: string }[] = [];

    for (const ente of entesFiscales) {
      for (const ob of ente.obligaciones) {
        if (ob.periodicidad === 'mensual' || ob.periodicidad === 'permanente' || ob.periodicidad === 'quincenal' || ob.periodicidad === 'semanal') {
          obligaciones.push({ ente: ente.siglas, nombre: ob.nombre, baseLegal: ob.baseLegal });
        }
        if (ob.periodicidad === 'trimestral' && [2, 5, 8, 11].includes(i)) {
          obligaciones.push({ ente: ente.siglas, nombre: ob.nombre, baseLegal: ob.baseLegal });
        }
        if (ob.periodicidad === 'semestral' && [5, 11].includes(i)) {
          obligaciones.push({ ente: ente.siglas, nombre: ob.nombre, baseLegal: ob.baseLegal });
        }
        if (ob.periodicidad === 'anual' && i === 2) {
          obligaciones.push({ ente: ente.siglas, nombre: ob.nombre, baseLegal: ob.baseLegal });
        }
      }
    }

    return { mes, obligaciones };
  });
}

export const tasasVigentes = {
  iva: { general: 16, reducida: 8, lujo: 31, exenta: 0 },
  islr: { tramo1: 15, tramo2: 22, tramo3: 34 },
  igtf: 3,
  inces: { patronal: 2, trabajador: 0.5 },
  ivss: { patronalMin: 9, patronalMax: 11, trabajador: 4 },
  faov: { patronal: 2, trabajador: 1 },
  rpe: { retencionIVA: 75 },
  utilidades: { minimo: 30, maximo: 120, porcentaje: 15 },
  prestacionesSociales: { diasPorTrimestre: 15, diasAdicionales: 2, tope: 30 },
  vacaciones: { diasBase: 15, diasAdicionales: 1, tope: 30 },
  bonoVacacional: { diasBase: 15, diasAdicionales: 1, tope: 30 },
};

export const tasasVigentesEspana = {
  iva: { general: 21, reducido: 10, superreducido: 4 },
  irpf: { tramo1: 19, tramo2: 24, tramo3: 30, tramo4: 37, tramo5: 45, tramo6: 47 },
  impuestoSociedades: { general: 25, nuevaCreacion: 15, sinFinLucro: 10 },
  cotizacionSS: { contingenciasComunes: 28.3, desempleo: 7.05, formacion: 0.7, fogasa: 0.2 },
  salarioMinimo2024: { mensual: 1134, anual: 15876 },
  limiteEfectivo: 1000,
};
