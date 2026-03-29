export interface EnteFiscal {
  id: string;
  siglas: string;
  nombre: string;
  tipo: 'fiscal' | 'parafiscal' | 'registral' | 'regulador' | 'laboral' | 'financiero';
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
];

export const leyesFundamentales: LeyVenezolana[] = [
  {
    id: 'COT',
    nombre: 'Código Orgánico Tributario',
    gacetaOficial: 'G.O. 6.507 Extraordinario',
    fechaPublicacion: '2020-01-29',
    ente: 'SENIAT',
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
    resumen: 'Regula las relaciones laborales: jornada, salario, prestaciones sociales, estabilidad laboral, utilidades, vacaciones y condiciones de trabajo.',
    articulosClaves: [
      { articulo: 'Art. 104', titulo: 'Salario', contenido: 'El salario comprende las remuneraciones devengadas por el trabajador de forma regular y permanente.' },
      { articulo: 'Art. 131-135', titulo: 'Utilidades', contenido: 'Todo patrono debe distribuir entre sus trabajadores el 15% de los beneficios líquidos al cierre del ejercicio, mínimo 30 días, máximo 120 días.' },
      { articulo: 'Art. 142', titulo: 'Prestaciones Sociales', contenido: 'Garantía de prestaciones sociales: 15 días de salario por trimestre + 2 días adicionales por año acumulativo.' },
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
    resumen: 'Regula la seguridad social: prestaciones por enfermedad, maternidad, vejez, sobrevivientes, incapacidad y paro forzoso.',
    articulosClaves: [
      { articulo: 'Art. 63', titulo: 'Obligatoriedad', contenido: 'Todo patrono está obligado a inscribir a sus trabajadores dentro de los 3 días siguientes al inicio de labores.' },
      { articulo: 'Art. 66', titulo: 'Cotizaciones', contenido: 'El patrono aporta 9-11% y el trabajador 4% del salario normal mensual.' },
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
