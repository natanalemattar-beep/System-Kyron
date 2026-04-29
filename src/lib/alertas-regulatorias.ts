import { query, queryOne } from '@/lib/db';

export interface GacetaOficial {
  id: string;
  numero: string;
  tipo: 'ordinaria' | 'extraordinaria';
  fecha: string;
  titulo: string;
  resumen: string;
  enteEmisor: string;
  impactoFiscal: boolean;
  impactoLaboral: boolean;
  impactoComercial: boolean;
  impactoAmbiental: boolean;
  urgencia: 'critica' | 'alta' | 'media' | 'informativa';
  decretos: DecretoGaceta[];
  vigenciaDesde: string;
  tags: string[];
}

export interface DecretoGaceta {
  numero: string;
  titulo: string;
  resumen: string;
  articulosClaves: string[];
  impacto: string;
}

export interface CambioAsamblea {
  id: string;
  tipo: 'ley_aprobada' | 'reforma' | 'decreto_constituyente' | 'acuerdo' | 'resolucion';
  titulo: string;
  fecha: string;
  resumen: string;
  impactoEmpresarial: string;
  sectoresAfectados: string[];
  gacetaRelacionada?: string;
  urgencia: 'critica' | 'alta' | 'media' | 'informativa';
  accionRequerida: string;
  plazoAdaptacion?: string;
}

export interface AlertaRegulatoria {
  id: string;
  tipo: 'gaceta' | 'asamblea' | 'providencia' | 'resolucion';
  titulo: string;
  resumen: string;
  fecha: string;
  enteEmisor: string;
  impacto: string[];
  urgencia: 'critica' | 'alta' | 'media' | 'informativa';
  accionRequerida: string;
  baseLegal: string;
  vigenciaDesde?: string;
  tags: string[];
}

const GACETAS_RECIENTES: GacetaOficial[] = [
  {
    id: 'GO-6960',
    numero: '6.960 Extraordinario',
    tipo: 'extraordinaria',
    fecha: '2026-04-28',
    titulo: 'Ley de Activos Digitales y Criptofiscalidad',
    resumen: 'Regulación definitiva sobre el uso de activos digitales para el pago de tributos nacionales y régimen de retención para exchanges locales.',
    enteEmisor: 'Asamblea Nacional / SUNACRIP',
    impactoFiscal: true,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'critica',
    decretos: [
      {
        numero: '6.200',
        titulo: 'Reglamento de Pagos en Criptoactivos para Contribuyentes Especiales',
        resumen: 'Establece los mecanismos para que los grandes contribuyentes liquiden sus obligaciones en activos digitales autorizados.',
        articulosClaves: ['Art. 5 — Activos permitidos', 'Art. 12 — Método de valoración'],
        impacto: 'Obligación de reporte y valoración diaria de carteras digitales para efectos de ISLR.',
      }
    ],
    vigenciaDesde: '2026-05-01',
    tags: ['cripto', 'fiscal', 'SUNACRIP', 'IA'],
  },
  {
    id: 'GO-6952',
    numero: '6.952 Extraordinario',
    tipo: 'extraordinaria',
    fecha: '2025-12-31',
    titulo: 'Reforma Tributaria 2026 — Decretos 5.196, 5.197, 5.198',
    resumen: 'Modificaciones sustanciales al IVA, régimen aduanero y arancel de aduanas. Alícuota de IVA ajustada, nuevas exenciones y modificación de partidas arancelarias.',
    enteEmisor: 'Presidencia de la República',
    impactoFiscal: true,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'critica',
    decretos: [
      {
        numero: '5.196',
        titulo: 'Decreto con Rango, Valor y Fuerza de Ley de Reforma Parcial del IVA',
        resumen: 'Modifica alícuotas, exenciones y régimen de contribuyentes especiales del IVA.',
        articulosClaves: ['Art. 27 — Nueva alícuota general', 'Art. 18 — Exenciones ampliadas', 'Art. 11 — Contribuyentes especiales'],
        impacto: 'Todas las empresas deben actualizar sus sistemas de facturación y retención de IVA.',
      },
      {
        numero: '5.197',
        titulo: 'Decreto de Reforma Parcial de la Ley Orgánica de Aduanas',
        resumen: 'Nuevos procedimientos de importación/exportación, valoración aduanera y tránsito.',
        articulosClaves: ['Art. 30 — Valoración', 'Art. 86 — Tránsito aduanero', 'Art. 120 — Sanciones'],
        impacto: 'Importadores y exportadores deben ajustar procedimientos y documentación.',
      },
      {
        numero: '5.198',
        titulo: 'Decreto de Reforma del Arancel de Aduanas',
        resumen: 'Modificación de partidas arancelarias y tasas de importación.',
        articulosClaves: ['Capítulo 1-97 — Nuevas partidas', 'Notas complementarias actualizadas'],
        impacto: 'Revisión obligatoria de clasificación arancelaria de productos importados.',
      },
    ],
    vigenciaDesde: '2026-01-01',
    tags: ['IVA', 'aduanas', 'aranceles', 'reforma tributaria'],
  },
  {
    id: 'GO-6950',
    numero: '6.950 Extraordinario',
    tipo: 'extraordinaria',
    fecha: '2025-11-15',
    titulo: 'Ajuste de la Unidad Tributaria (UT) 2026',
    resumen: 'La Unidad Tributaria se fija en nuevo valor. Afecta cálculo de multas, sanciones, tasas y contribuciones de todos los entes gubernamentales.',
    enteEmisor: 'SENIAT',
    impactoFiscal: true,
    impactoLaboral: true,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'critica',
    decretos: [],
    vigenciaDesde: '2026-01-01',
    tags: ['UT', 'unidad tributaria', 'multas', 'sanciones'],
  },
  {
    id: 'GO-6948',
    numero: '6.948 Extraordinario',
    tipo: 'extraordinaria',
    fecha: '2025-10-20',
    titulo: 'Ley de Reforma Parcial de la LOTTT',
    resumen: 'Modificaciones a la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras. Ajustes en jornada laboral, beneficios sociales y régimen de inamovilidad.',
    enteEmisor: 'Asamblea Nacional',
    impactoFiscal: false,
    impactoLaboral: true,
    impactoComercial: false,
    impactoAmbiental: false,
    urgencia: 'alta',
    decretos: [],
    vigenciaDesde: '2026-01-01',
    tags: ['LOTTT', 'laboral', 'inamovilidad', 'beneficios sociales'],
  },
  {
    id: 'GO-6945',
    numero: '6.945 Ordinaria',
    tipo: 'ordinaria',
    fecha: '2025-09-30',
    titulo: 'Providencia SUNDDE — Actualización de Precios Justos',
    resumen: 'Nuevos márgenes de ganancia para productos y servicios regulados. Actualización del SISECOMR. Obligación de marcaje de precios.',
    enteEmisor: 'SUNDDE',
    impactoFiscal: false,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'alta',
    decretos: [],
    vigenciaDesde: '2025-10-15',
    tags: ['precios justos', 'SUNDDE', 'márgenes de ganancia', 'SISECOMR'],
  },
  {
    id: 'GO-6940',
    numero: '6.940 Ordinaria',
    tipo: 'ordinaria',
    fecha: '2025-08-15',
    titulo: 'Resolución SUNAGRO — Guías SADA Electrónicas',
    resumen: 'Implementación obligatoria del sistema electrónico para guías de movilización de alimentos. Eliminación gradual de guías físicas.',
    enteEmisor: 'SUNAGRO',
    impactoFiscal: false,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'media',
    decretos: [],
    vigenciaDesde: '2025-09-01',
    tags: ['SUNAGRO', 'guías SADA', 'alimentos', 'movilización'],
  },
  {
    id: 'GO-6938',
    numero: '6.938 Extraordinario',
    tipo: 'extraordinaria',
    fecha: '2025-07-30',
    titulo: 'Ley de Reforma del Régimen Cambiario',
    resumen: 'Nuevas normas para operaciones en divisas. Obligaciones de reporte al BCV para transacciones superiores a umbrales definidos.',
    enteEmisor: 'BCV / Asamblea Nacional',
    impactoFiscal: true,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'alta',
    decretos: [],
    vigenciaDesde: '2025-08-15',
    tags: ['divisas', 'BCV', 'régimen cambiario', 'IGTF'],
  },
  {
    id: 'GO-6935',
    numero: '6.935 Ordinaria',
    tipo: 'ordinaria',
    fecha: '2025-06-30',
    titulo: 'Resolución MIN. Ecosocialismo — Certificación Ambiental Obligatoria',
    resumen: 'Nuevos requisitos para certificación ambiental de empresas industriales y de servicios. Ampliación del RASDA.',
    enteEmisor: 'Ministerio del Ecosocialismo',
    impactoFiscal: false,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: true,
    urgencia: 'media',
    decretos: [],
    vigenciaDesde: '2025-09-01',
    tags: ['ambiente', 'RASDA', 'certificación ambiental'],
  },
  {
    id: 'GO-6930',
    numero: '6.930 Ordinaria',
    tipo: 'ordinaria',
    fecha: '2025-05-15',
    titulo: 'Providencia SNAT — Facturación Electrónica Obligatoria',
    resumen: 'Implementación progresiva de facturación electrónica para contribuyentes especiales y ordinarios. Nuevas especificaciones técnicas.',
    enteEmisor: 'SENIAT',
    impactoFiscal: true,
    impactoLaboral: false,
    impactoComercial: true,
    impactoAmbiental: false,
    urgencia: 'critica',
    decretos: [],
    vigenciaDesde: '2026-01-01',
    tags: ['facturación electrónica', 'SENIAT', 'XML', 'contribuyentes especiales'],
  },
];

const CAMBIOS_ASAMBLEA: CambioAsamblea[] = [
  {
    id: 'AN-2026-003',
    tipo: 'ley_aprobada',
    titulo: 'Ley de Fomento a la Exportación de Servicios Tecnológicos',
    fecha: '2026-04-15',
    resumen: 'Incentivos fiscales para empresas que exporten software y servicios de IA desde Venezuela. Exoneración del 100% de IGTF para cobros internacionales.',
    impactoEmpresarial: 'Las empresas registradas en el nuevo Registro de Exportadores de Tecnología (RET) podrán facturar sin IGTF a clientes extranjeros.',
    sectoresAfectados: ['tecnología', 'software', 'IA'],
    urgencia: 'alta',
    accionRequerida: 'Inscribirse en el portal del RET ante el Ministerio de Ciencia y Tecnología para optar por los beneficios.',
    plazoAdaptacion: '60 días para inscripción inicial',
  },
  {
    id: 'AN-2025-001',
    tipo: 'ley_aprobada',
    titulo: 'Ley de Reforma Parcial del Código Orgánico Tributario',
    fecha: '2025-12-15',
    resumen: 'Modificaciones al régimen sancionatorio tributario. Incremento de multas por evasión. Nuevos plazos de prescripción. Responsabilidad solidaria ampliada.',
    impactoEmpresarial: 'Todas las empresas deben revisar su cumplimiento tributario. Las multas por evasión aumentan significativamente.',
    sectoresAfectados: ['todos'],
    gacetaRelacionada: 'Pendiente publicación',
    urgencia: 'critica',
    accionRequerida: 'Auditoría interna de cumplimiento tributario. Actualización de procedimientos de declaración y pago.',
    plazoAdaptacion: '90 días desde publicación en Gaceta',
  },
  {
    id: 'AN-2025-002',
    tipo: 'reforma',
    titulo: 'Reforma de la Ley Orgánica del Trabajo (LOTTT) — Teletrabajo',
    fecha: '2025-11-20',
    resumen: 'Regulación del teletrabajo y trabajo remoto. Definición de derechos y obligaciones del patrono en modalidad remota. Provisión de equipos y conectividad.',
    impactoEmpresarial: 'Empresas con trabajadores remotos deben formalizar contratos y proveer herramientas. Nuevas obligaciones de seguridad y salud para teletrabajo.',
    sectoresAfectados: ['tecnología', 'servicios', 'consultoría', 'banca'],
    urgencia: 'alta',
    accionRequerida: 'Actualizar contratos laborales. Crear política de teletrabajo. Registrar modalidad ante MINPPTRASS.',
    plazoAdaptacion: '180 días desde publicación',
  },
  {
    id: 'AN-2025-003',
    tipo: 'ley_aprobada',
    titulo: 'Ley de Protección de Datos Personales',
    fecha: '2025-10-01',
    resumen: 'Primera ley integral de protección de datos personales en Venezuela. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Registro de bases de datos obligatorio.',
    impactoEmpresarial: 'Todas las empresas que manejen datos personales deben designar un Oficial de Protección de Datos y registrar sus bases de datos.',
    sectoresAfectados: ['todos'],
    urgencia: 'critica',
    accionRequerida: 'Designar DPO (Oficial de Protección de Datos). Auditar bases de datos. Implementar consentimiento informado. Registrar ante autoridad de control.',
    plazoAdaptacion: '1 año desde publicación',
  },
  {
    id: 'AN-2025-004',
    tipo: 'acuerdo',
    titulo: 'Acuerdo sobre Incentivos Fiscales para Empresas Tecnológicas',
    fecha: '2025-09-15',
    resumen: 'Exoneración parcial de ISLR para empresas del sector tecnología y software por 3 años. Reducción de aportes parafiscales para startups.',
    impactoEmpresarial: 'Empresas de tecnología pueden solicitar exoneración ante SENIAT. Requisitos: generación de empleo, desarrollo de software venezolano.',
    sectoresAfectados: ['tecnología', 'software', 'telecomunicaciones'],
    urgencia: 'media',
    accionRequerida: 'Verificar elegibilidad. Presentar solicitud ante SENIAT con plan de negocios y nómina.',
  },
  {
    id: 'AN-2025-005',
    tipo: 'decreto_constituyente',
    titulo: 'Decreto sobre Obligaciones Especiales para Grandes Contribuyentes',
    fecha: '2025-08-01',
    resumen: 'Nuevas obligaciones de reporte mensual para contribuyentes especiales. Anticipo de ISLR trimestral obligatorio. Auditorías externas anuales.',
    impactoEmpresarial: 'Contribuyentes especiales deben presentar informes detallados mensuales. Contratación obligatoria de auditor externo.',
    sectoresAfectados: ['banca', 'seguros', 'telecomunicaciones', 'petróleo', 'construcción'],
    urgencia: 'alta',
    accionRequerida: 'Contratar auditor externo. Preparar reportes mensuales. Ajustar flujo de caja para anticipos trimestrales de ISLR.',
    plazoAdaptacion: '60 días desde publicación',
  },
  {
    id: 'AN-2025-006',
    tipo: 'resolucion',
    titulo: 'Resolución sobre Control de Precios de Insumos Médicos',
    fecha: '2025-07-15',
    resumen: 'Regulación de márgenes de ganancia para productos farmacéuticos e insumos médicos. Prohibición de incrementos sin autorización de SUNDDE.',
    impactoEmpresarial: 'Farmacias, distribuidoras y laboratorios deben ajustar precios según tabla SUNDDE. Reportar inventarios semanalmente.',
    sectoresAfectados: ['salud', 'farmacéutico', 'distribución'],
    urgencia: 'alta',
    accionRequerida: 'Ajustar lista de precios. Registrarse en plataforma SUNDDE. Reportar inventario semanal.',
    plazoAdaptacion: '30 días',
  },
  {
    id: 'AN-2026-001',
    tipo: 'ley_aprobada',
    titulo: 'Ley de Economía Digital y Criptoactivos',
    fecha: '2026-01-20',
    resumen: 'Marco regulatorio para criptomonedas, activos digitales y servicios fintech. Obligaciones de registro ante SUNACRIP. Impuesto del 5% sobre ganancias de capital en criptoactivos.',
    impactoEmpresarial: 'Empresas que operen con criptomonedas deben registrarse ante SUNACRIP. Retención de 5% sobre transacciones superiores a 10 Petros.',
    sectoresAfectados: ['tecnología', 'fintech', 'banca', 'comercio electrónico'],
    urgencia: 'critica',
    accionRequerida: 'Registrarse ante SUNACRIP. Implementar retención del 5%. Reportar transacciones cripto mensualmente.',
    plazoAdaptacion: '120 días desde publicación',
  },
  {
    id: 'AN-2026-002',
    tipo: 'reforma',
    titulo: 'Reforma del Régimen de Zona Libre y Puertos Libres',
    fecha: '2026-02-15',
    resumen: 'Ampliación de beneficios fiscales para empresas en zonas libres. Nuevos requisitos de empleo local. Exoneración de IVA e IGTF para operaciones dentro de la zona.',
    impactoEmpresarial: 'Empresas en zonas libres obtienen exoneración total de IVA e IGTF. Deben contratar mínimo 80% de personal local.',
    sectoresAfectados: ['comercio', 'industria', 'turismo', 'logística'],
    urgencia: 'media',
    accionRequerida: 'Evaluar reubicación a zona libre. Solicitar certificado de exoneración. Ajustar nómina para cumplir cuota de empleo local.',
  },
];

export function obtenerGacetasRecientes(filtros?: {
  tipo?: 'ordinaria' | 'extraordinaria';
  impacto?: 'fiscal' | 'laboral' | 'comercial' | 'ambiental';
  urgencia?: 'critica' | 'alta' | 'media' | 'informativa';
  limite?: number;
}): GacetaOficial[] {
  let resultado = [...GACETAS_RECIENTES];

  if (filtros?.tipo) {
    resultado = resultado.filter(g => g.tipo === filtros.tipo);
  }
  if (filtros?.impacto) {
    resultado = resultado.filter(g => {
      switch (filtros.impacto) {
        case 'fiscal': return g.impactoFiscal;
        case 'laboral': return g.impactoLaboral;
        case 'comercial': return g.impactoComercial;
        case 'ambiental': return g.impactoAmbiental;
        default: return true;
      }
    });
  }
  if (filtros?.urgencia) {
    resultado = resultado.filter(g => g.urgencia === filtros.urgencia);
  }

  resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  if (filtros?.limite) {
    resultado = resultado.slice(0, filtros.limite);
  }

  return resultado;
}

export function obtenerCambiosAsamblea(filtros?: {
  tipo?: CambioAsamblea['tipo'];
  urgencia?: 'critica' | 'alta' | 'media' | 'informativa';
  sector?: string;
  limite?: number;
}): CambioAsamblea[] {
  let resultado = [...CAMBIOS_ASAMBLEA];

  if (filtros?.tipo) {
    resultado = resultado.filter(c => c.tipo === filtros.tipo);
  }
  if (filtros?.urgencia) {
    resultado = resultado.filter(c => c.urgencia === filtros.urgencia);
  }
  if (filtros?.sector) {
    resultado = resultado.filter(c =>
      c.sectoresAfectados.includes('todos') ||
      c.sectoresAfectados.some(s => s.toLowerCase().includes(filtros.sector!.toLowerCase()))
    );
  }

  resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  if (filtros?.limite) {
    resultado = resultado.slice(0, filtros.limite);
  }

  return resultado;
}

export function obtenerAlertasRegulatorias(): AlertaRegulatoria[] {
  const alertas: AlertaRegulatoria[] = [];

  for (const gaceta of GACETAS_RECIENTES) {
    const impacto: string[] = [];
    if (gaceta.impactoFiscal) impacto.push('fiscal');
    if (gaceta.impactoLaboral) impacto.push('laboral');
    if (gaceta.impactoComercial) impacto.push('comercial');
    if (gaceta.impactoAmbiental) impacto.push('ambiental');

    alertas.push({
      id: gaceta.id,
      tipo: 'gaceta',
      titulo: `Gaceta Oficial N° ${gaceta.numero} — ${gaceta.titulo}`,
      resumen: gaceta.resumen,
      fecha: gaceta.fecha,
      enteEmisor: gaceta.enteEmisor,
      impacto,
      urgencia: gaceta.urgencia,
      accionRequerida: gaceta.decretos.length > 0
        ? gaceta.decretos.map(d => d.impacto).join(' ')
        : 'Revisar cambios y evaluar impacto en operaciones.',
      baseLegal: `Gaceta Oficial N° ${gaceta.numero}`,
      vigenciaDesde: gaceta.vigenciaDesde,
      tags: gaceta.tags,
    });
  }

  for (const cambio of CAMBIOS_ASAMBLEA) {
    alertas.push({
      id: cambio.id,
      tipo: 'asamblea',
      titulo: `[Asamblea Nacional] ${cambio.titulo}`,
      resumen: cambio.resumen,
      fecha: cambio.fecha,
      enteEmisor: 'Asamblea Nacional',
      impacto: cambio.sectoresAfectados,
      urgencia: cambio.urgencia,
      accionRequerida: cambio.accionRequerida,
      baseLegal: cambio.gacetaRelacionada || 'Gaceta pendiente',
      vigenciaDesde: cambio.plazoAdaptacion,
      tags: cambio.sectoresAfectados,
    });
  }

  alertas.sort((a, b) => {
    const urgenciaOrden = { critica: 0, alta: 1, media: 2, informativa: 3 };
    const diffUrgencia = urgenciaOrden[a.urgencia] - urgenciaOrden[b.urgencia];
    if (diffUrgencia !== 0) return diffUrgencia;
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });

  return alertas;
}

export async function verificarAlertasRegulatorias(): Promise<number> {
  let alertasGeneradas = 0;

  const empresas = await query<{
    user_id: number;
    email: string;
    nombre_empresa: string;
    actividad_economica: string;
  }>(
    `SELECT u.id AS user_id, u.email,
            COALESCE(u.razon_social, u.nombre) AS nombre_empresa,
            COALESCE(u.actividad_economica, '') AS actividad_economica
     FROM users u
     WHERE u.tipo = 'juridico'`
  );

  if (!empresas.length) return 0;

  const alertas = obtenerAlertasRegulatorias();
  const alertasCriticas = alertas.filter(a => a.urgencia === 'critica' || a.urgencia === 'alta');

  for (const empresa of empresas) {
    for (const alerta of alertasCriticas) {
      const yaEnviada = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM notificaciones
         WHERE user_id = $1
         AND metadata::text LIKE $2
         AND created_at > NOW() - INTERVAL '30 days'`,
        [empresa.user_id, `%"alerta_id":"${alerta.id}"%`]
      );

      if (parseInt(yaEnviada[0]?.count ?? '0') > 0) continue;

      const titulo = alerta.urgencia === 'critica'
        ? `ALERTA REGULATORIA: ${alerta.titulo}`
        : `Cambio Regulatorio: ${alerta.titulo}`;

      const mensaje = `${alerta.resumen}\n\nAcción Requerida: ${alerta.accionRequerida}\n\nBase Legal: ${alerta.baseLegal}`;

      await query(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          empresa.user_id,
          'regulatorio',
          titulo,
          mensaje,
          JSON.stringify({
            alerta_id: alerta.id,
            tipo: alerta.tipo,
            urgencia: alerta.urgencia,
            ente_emisor: alerta.enteEmisor,
            impacto: alerta.impacto,
            vigencia_desde: alerta.vigenciaDesde,
            regulatoria: true,
          }),
        ]
      );

      alertasGeneradas++;
    }
  }

  return alertasGeneradas;
}

export function obtenerResumenRegulatorio() {
  const gacetas = obtenerGacetasRecientes();
  const cambios = obtenerCambiosAsamblea();
  const alertas = obtenerAlertasRegulatorias();

  return {
    totalGacetas: gacetas.length,
    totalCambiosAsamblea: cambios.length,
    totalAlertas: alertas.length,
    alertasCriticas: alertas.filter(a => a.urgencia === 'critica').length,
    alertasAltas: alertas.filter(a => a.urgencia === 'alta').length,
    ultimaGaceta: gacetas[0] || null,
    ultimoCambioAsamblea: cambios[0] || null,
    porImpacto: {
      fiscal: alertas.filter(a => a.impacto.includes('fiscal')).length,
      laboral: alertas.filter(a => a.impacto.includes('laboral')).length,
      comercial: alertas.filter(a => a.impacto.includes('comercial')).length,
      ambiental: alertas.filter(a => a.impacto.includes('ambiental')).length,
    },
  };
}
