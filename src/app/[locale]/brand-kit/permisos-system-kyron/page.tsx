"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ArrowLeft, FileText, FileSignature } from "lucide-react";
import { Link } from "@/navigation";
import { PasswordGate } from "@/components/password-gate";
import { useTheme } from "next-themes";
import jsPDF from "jspdf";

type PermisoEntry = {
  organismo: string;
  permiso: string;
  descripcion: string;
  baseLegal?: string;
  vigencia: string;
  requisitos: string[];
};

const permisos: PermisoEntry[] = [
  {
    organismo: "SAREN — Servicio Autónomo de Registros y Notarías",
    permiso: "Registro Mercantil (Acta Constitutiva)",
    descripcion: "Inscripción de la empresa. Otorga personalidad jurídica a System Kyron.",
    baseLegal: "Código de Comercio de Venezuela, Ley de Registros Públicos y Notarías",
    vigencia: "Indefinida",
    requisitos: ["Reserva de denominación comercial", "Contrato constitutivo y estatutos", "Cédula de identidad de los socios", "RIF de los socios", "Pago de tasas registrales"]
  },
  {
    organismo: "GACETA — Imprenta Nacional y Gaceta Oficial",
    permiso: "Publicación en Gaceta Oficial",
    descripcion: "Publicación del Registro Mercantil. Requisito posterior a la inscripción en SAREN.",
    baseLegal: "Ley de Publicaciones Oficiales",
    vigencia: "Única",
    requisitos: ["Copia del Registro Mercantil", "Solicitud de publicación", "Pago de tasas"]
  },
  {
    organismo: "SENIAT — Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    permiso: "RIF (Registro de Información Fiscal)",
    descripcion: "Identificación tributaria. Obligatorio para facturar, declarar impuestos y operar.",
    baseLegal: "Código Orgánico Tributario, Ley de IVA",
    vigencia: "Indefinida (actualización de datos obligatoria)",
    requisitos: ["Registro Único de Información Fiscal (RIF)", "Cédula de identidad del representante", "Registro Mercantil", "Forma de inscripción"]
  },
  {
    organismo: "SENIAT",
    permiso: "IVA (Impuesto al Valor Agregado)",
    descripcion: "Inscripción como contribuyente ordinario. Declaración y pago mensual.",
    baseLegal: "Ley de Impuesto al Valor Agregado (IVA)",
    vigencia: "Mensual (declaración)",
    requisitos: ["RIF activo", "Registro Mercantil", "Constancia de domicilio fiscal", "Estados financieros iniciales"]
  },
  {
    organismo: "SENIAT",
    permiso: "ISLR (Impuesto Sobre La Renta)",
    descripcion: "Registro como contribuyente. Declaración definitiva anual.",
    baseLegal: "Ley de Impuesto Sobre La Renta (ISLR)",
    vigencia: "Anual (declaración)",
    requisitos: ["RIF activo", "Balance general", "Estado de resultados", "Registro Mercantil", "Estados financieros auditados (si aplica)"]
  },
  {
    organismo: "SENIAT",
    permiso: "Facturación Electrónica",
    descripcion: "Autorización para emitir facturas electrónicas. Sistema certificado.",
    baseLegal: "Providencia SNAT/2011/0071",
    vigencia: "Indefinida (mientras cumpla requisitos)",
    requisitos: ["Solicitud de habilitación", "Software certificado", "Certificado digital", "RIF activo", "Comprobante de pruebas técnicas"]
  },
  {
    organismo: "SENIAT",
    permiso: "IGTF (Impuesto a Grandes Transacciones Financieras)",
    descripcion: "Registro y declaración del IGTF 3% en pagos en divisas.",
    baseLegal: "Ley de Impuesto a Grandes Transacciones Financieras (IGTF)",
    vigencia: "Mensual (declaración)",
    requisitos: ["RIF activo como contribuyente IGTF", "Registro de operaciones en divisas", "Estados de cuenta bancarios"]
  },
  {
    organismo: "SENIAT",
    permiso: "RETENCIONES IVA e ISLR (Agente de Retención)",
    descripcion: "Designación como agente de retención. Obligatorio para facturar a empresas contribuyentes especiales.",
    baseLegal: "Código Orgánico Tributario, Providencias SNAT",
    vigencia: "Mensual (declaración de retenciones)",
    requisitos: ["RIF activo", "Calificación como agente de retención", "Registro de proveedores", "Sistema de facturación configurado"]
  },
  {
    organismo: "ALCALDÍA — Municipio del domicilio fiscal",
    permiso: "Patente de Industria y Comercio",
    descripcion: "Licencia municipal para ejercer actividades comerciales o de servicios.",
    baseLegal: "Ley de Impuesto sobre Actividades Económicas (LIAE)",
    vigencia: "Anual",
    requisitos: ["Registro Mercantil", "RIF", "Cédula del representante", "Contrato de arrendamiento o título de propiedad", "Solvencia municipal del inmueble", "Pago de tasas municipales"]
  },
  {
    organismo: "ALCALDÍA",
    permiso: "Conformidad de Uso",
    descripcion: "Certificación de uso comercial/oficina permitido en la zonificación.",
    baseLegal: "Ordenanza de Zonificación Municipal",
    vigencia: "Indefinida (mientras se mantenga el uso)",
    requisitos: ["Solicitud dirigida a Ingeniería Municipal", "Plano de ubicación", "Documento de propiedad o arrendamiento", "RIF", "Registro Mercantil"]
  },
  {
    organismo: "ALCALDÍA",
    permiso: "Solvencia Municipal",
    descripcion: "Certificado de estar al día con tributos municipales.",
    baseLegal: "Ordenanza de Hacienda Municipal",
    vigencia: "Anual",
    requisitos: ["Patente de Industria y Comercio al día", "Declaraciones municipales presentadas", "Pago de tasas municipales"]
  },
  {
    organismo: "IVSS — Instituto Venezolano de los Seguros Sociales",
    permiso: "Inscripción del Empleador (Patrono)",
    descripcion: "Registro patronal para asegurar a los trabajadores ante el Seguro Social.",
    baseLegal: "Ley del Seguro Social",
    vigencia: "Indefinida (actualización anual de nómina)",
    requisitos: ["Registro Mercantil", "RIF", "Cédula del representante", "Nómina inicial de trabajadores", "Contratos de trabajo", "Dirección del establecimiento"]
  },
  {
    organismo: "INCES — Instituto Nacional de Capacitación y Educación Socialista",
    permiso: "Registro del Empleador",
    descripcion: "Inscripción patronal. Aporte del 2% sobre salarios.",
    baseLegal: "Ley del INCES",
    vigencia: "Indefinida",
    requisitos: ["Registro Mercantil", "RIF", "Cédula del representante", "Nómina de trabajadores", "Planilla de inscripción INCES"]
  },
  {
    organismo: "BANAVIH — Banco Nacional de Vivienda y Hábitat",
    permiso: "Registro Patronal (Ley de Política Habitacional)",
    descripcion: "Registro obligatorio. Aporte del 3% sobre salarios al fondo de vivienda.",
    baseLegal: "Ley de Política Habitacional (LPH)",
    vigencia: "Indefinida",
    requisitos: ["Registro Mercantil", "RIF", "Cédula del representante", "Nómina de trabajadores", "Planilla de registro BANAVIH"]
  },
  {
    organismo: "INPSASEL — Instituto Nacional de Prevención, Salud y Seguridad Laborales",
    permiso: "Registro de la Empresa (LOPCYMAT)",
    descripcion: "Registro en el sistema de seguridad y salud laboral. Incluye programa de prevención.",
    baseLegal: "Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (LOPCYMAT)",
    vigencia: "Anual (renovación del programa de seguridad)",
    requisitos: ["Registro Mercantil", "RIF", "Nómina de trabajadores", "Programa de seguridad y salud laboral", "Evaluación de riesgos por puesto de trabajo", "Certificación del Delegado de Prevención"]
  },
  {
    organismo: "SAPI — Servicio Autónomo de la Propiedad Intelectual",
    permiso: "Registro de Marca «System Kyron»",
    descripcion: "Protección del nombre comercial, logotipo y eslogan a nivel nacional.",
    baseLegal: "Ley de Propiedad Industrial, Decisión 486 CAN",
    vigencia: "15 años (renovable)",
    requisitos: ["Búsqueda de antecedentes marcarios", "Solicitud de registro (planilla FM-02)", "Logo en formato digital", "RIF y Registro Mercantil", "Pago de tasas"]
  },
  {
    organismo: "SAPI",
    permiso: "Registro de Dominio .com.ve",
    descripcion: "Registro del dominio web systemkyron.com.ve como activo de propiedad intelectual.",
    baseLegal: "Ley de Propiedad Industrial",
    vigencia: "Anual (renovable)",
    requisitos: ["RIF", "Registro Mercantil", "Cédula del representante", "Solicitud de registro de dominio"]
  },
  {
    organismo: "SAPI",
    permiso: "Registro de Derecho de Autor (Software y Contenido Digital)",
    descripcion: "Protección del código fuente, plataforma web y contenido digital desarrollado por System Kyron.",
    baseLegal: "Ley sobre Derecho de Autor",
    vigencia: "Vida del autor + 60 años",
    requisitos: ["Código fuente en soporte digital", "Manual de usuario de la plataforma", "Descripción técnica del software", "Datos del desarrollador", "Cesión de derechos (si aplica)"]
  },
  {
    organismo: "SAPI",
    permiso: "Registro de Nombre Comercial y Lema",
    descripcion: "Registro del nombre comercial «System Kyron» y lemas asociados como signos distintivos.",
    baseLegal: "Ley de Propiedad Industrial",
    vigencia: "15 años (renovable)",
    requisitos: ["Búsqueda de antecedentes", "Solicitud de registro", "Comprobante de uso del nombre comercial", "RIF", "Registro Mercantil"]
  },
  {
    organismo: "SENCAMER — Servicio de Normalización, Calidad y Reglamentos Técnicos",
    permiso: "Registro de Servicios Tecnológicos",
    descripcion: "Certificación de calidad de servicios. Recomendado para contratar con el Estado.",
    baseLegal: "Ley de Normalización, Calidad y Reglamentos Técnicos",
    vigencia: "2 años",
    requisitos: ["Manual de calidad", "Procedimientos operativos estándar", "Registro Mercantil", "RIF", "Evaluación técnica de procesos"]
  },
  {
    organismo: "SENCAMER",
    permiso: "Certificación ISO 9001:2015 (Sistema de Gestión de Calidad)",
    descripcion: "Certificación internacional de calidad. Requisito para licitaciones públicas y contratos con el Estado.",
    baseLegal: "Norma ISO 9001:2015, Ley de Normalización",
    vigencia: "3 años (auditorías de seguimiento anuales)",
    requisitos: ["Manual de calidad implementado", "Procedimientos documentados", "Registro Mercantil", "RIF", "Política de calidad", "Auditoría interna y externa"]
  },
  {
    organismo: "SUNDDE — Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos",
    permiso: "Registro de Precios de Servicios",
    descripcion: "Registro de precios de servicios de telecomunicaciones y tecnología.",
    baseLegal: "Ley Orgánica de Precios Justos",
    vigencia: "Anual",
    requisitos: ["RIF", "Registro Mercantil", "Estructura de costos", "Precios de los servicios ofrecidos", "Estados financieros"]
  },
  {
    organismo: "SDP — Superintendencia de Datos Personales",
    permiso: "Registro de Base de Datos Personales",
    descripcion: "Inscripción de bancos de datos con información de clientes, empleados y usuarios.",
    baseLegal: "Ley Orgánica de Protección de Datos Personales (LOPDP)",
    vigencia: "Indefinida (actualización anual)",
    requisitos: ["Descripción de la base de datos", "Política de privacidad", "Consentimiento informado de los titulares", "Medidas de seguridad implementadas", "Designación de responsable de datos"]
  },
  {
    organismo: "SDP",
    permiso: "Registro de Política de Privacidad y Términos de Uso",
    descripcion: "Registro de las políticas de privacidad y términos de uso de la plataforma web y apps.",
    baseLegal: "LOPDP, Ley de Infogobierno",
    vigencia: "Anual (actualización)",
    requisitos: ["Texto completo de la política de privacidad", "Términos y condiciones de uso", "Mecanismos de consentimiento", "Registro de base de datos"]
  },
  {
    organismo: "CONATEL — Comisión Nacional de Telecomunicaciones",
    permiso: "Habilitación Administrativa",
    descripcion: "Permiso para operar servicios de telecomunicaciones (VOIP, datos, valor agregado).",
    baseLegal: "Ley Orgánica de Telecomunicaciones (LOTEL)",
    vigencia: "15 años",
    requisitos: ["Registro Mercantil", "RIF", "Proyecto técnico de la red", "Estudio de impacto espectral", "Descripción de los servicios a ofrecer", "Pago de tasas CONATEL"]
  },
  {
    organismo: "CONATEL",
    permiso: "Asignación de Espectro Radioeléctrico",
    descripcion: "Permiso para usar frecuencias si opera enlaces de microondas o radio.",
    baseLegal: "LOTEL, Plan Nacional de Frecuencias",
    vigencia: "15 años",
    requisitos: ["Habilitación administrativa vigente", "Estudio técnico de frecuencias", "Coordenadas geográficas de las estaciones", "Pago de tasas por uso del espectro"]
  },
  {
    organismo: "CONATEL",
    permiso: "Registro de Proveedor de Servicios de Internet",
    descripcion: "Registro como proveedor de servicios de conectividad.",
    baseLegal: "LOTEL, Reglamento de Servicios de Telecomunicaciones",
    vigencia: "15 años",
    requisitos: ["Habilitación administrativa", "Infraestructura de red documentada", "Plan de numeración IP", "Política de calidad del servicio"]
  },
  {
    organismo: "CONATEL",
    permiso: "Certificación de Equipos de Telecomunicaciones",
    descripcion: "Homologación de equipos terminales y de red utilizados en la prestación de servicios.",
    baseLegal: "LOTEL, Normas de Homologación CONATEL",
    vigencia: "Por lote o modelo",
    requisitos: ["Especificaciones técnicas del equipo", "Certificado de origen", "Manual del equipo", "Resultados de pruebas técnicas"]
  },
  {
    organismo: "BCV — Banco Central de Venezuela",
    permiso: "Registro de Operaciones Cambiarias",
    descripcion: "Registro si recibe pagos en divisas del exterior o requiere liquidar operaciones.",
    baseLegal: "Ley de Régimen Cambiario",
    vigencia: "Indefinida (reporte mensual obligatorio)",
    requisitos: ["RIF", "Registro Mercantil", "Cédula del representante", "Contratos con clientes del exterior", "Estados de cuenta bancarios en divisas"]
  },
  {
    organismo: "MINEC — Ministerio del Poder Popular para el Ecosocialismo",
    permiso: "Permiso Ambiental",
    descripcion: "Evaluación ambiental si genera desechos electrónicos o tiene instalaciones físicas.",
    baseLegal: "Ley Orgánica del Ambiente, Ley de Gestión Integral de Desechos Sólidos",
    vigencia: "2 años (renovable)",
    requisitos: ["Registro Mercantil", "RIF", "Descripción del proceso operativo", "Plan de manejo de desechos electrónicos", "Evaluación de impacto ambiental (si aplica)"]
  },
  {
    organismo: "MIN-TRABAJO — Ministerio del Poder Popular para el Proceso Social del Trabajo",
    permiso: "Registro en el Sistema de Información Laboral (SIL)",
    descripcion: "Registro de empleadores en el sistema laboral. Obligatorio para reportar nómina.",
    baseLegal: "Ley Orgánica del Trabajo (LOTTT)",
    vigencia: "Indefinida (actualización trimestral)",
    requisitos: ["RIF", "Registro Mercantil", "Nómina de trabajadores", "Contratos de trabajo registrados", "Horario de trabajo"]
  },
  {
    organismo: "MIN-TRABAJO",
    permiso: "Registro de Contratos de Trabajo",
    descripcion: "Registro de contratos de trabajo ante la Inspectoría del Trabajo.",
    baseLegal: "LOTTT, Reglamento de la LOTTT",
    vigencia: "Por cada contrato",
    requisitos: ["Contrato de trabajo firmado", "RIF del empleador", "Cédula del trabajador", "Registro SIL"]
  },
  {
    organismo: "MIN-CIENCIA — Ministerio del Poder Popular para Ciencia y Tecnología",
    permiso: "Registro Nacional de Empresas Tecnológicas",
    descripcion: "Registro como empresa de tecnología. Otorga beneficios fiscales y preferencia en contrataciones públicas.",
    baseLegal: "Ley Orgánica de Ciencia, Tecnología e Innovación (LOCTI)",
    vigencia: "2 años",
    requisitos: ["RIF", "Registro Mercantil", "Descripción de actividades tecnológicas", "Proyectos de I+D+i", "Inversión en ciencia y tecnología", "Nómina de personal técnico"]
  },
  {
    organismo: "MIN-CIENCIA",
    permiso: "Acreditación como Centro de Desarrollo Tecnológico",
    descripcion: "Acreditación que reconoce la capacidad de innovación y desarrollo tecnológico de System Kyron.",
    baseLegal: "LOCTI, Reglamento de Acreditación",
    vigencia: "3 años",
    requisitos: ["Registro Nacional de Empresas Tecnológicas", "Portafolio de proyectos tecnológicos", "Infraestructura de I+D", "Personal calificado", "Resultados de investigación"]
  },
  {
    organismo: "SUNACOOP — Superintendencia Nacional de Cooperativas",
    permiso: "Registro de Asociación Cooperativa (si aplica estructura cooperativa)",
    descripcion: "Registro si la empresa opera bajo figura cooperativa para ciertos servicios.",
    baseLegal: "Ley Especial de Asociaciones Cooperativas",
    vigencia: "Indefinida",
    requisitos: ["Acta constitutiva", "Estatutos de la cooperativa", "Registro de asociados", "RIF", "Cédulas de los asociados"]
  },
  {
    organismo: "CPAE — Colegio de Profesionales (según el área)",
    permiso: "Inscripción en el Colegio de Profesional (Ingeniería, Contaduría, etc.)",
    descripcion: "Inscripción profesional requerida si la empresa ofrece servicios profesionales regulados.",
    baseLegal: "Ley de Ejercicio Profesional, Ley de Colegios Profesionales",
    vigencia: "Anual (pago de timbres)",
    requisitos: ["Título universitario", "Registro Mercantil", "RIF", "Solicitud de inscripción", "Pago de timbres profesionales"]
  },
  {
    organismo: "INTT — Instituto Nacional de Transporte Terrestre",
    permiso: "Permiso de Transporte de Carga y Pasajeros (si aplica)",
    descripcion: "Permiso si la empresa requiere transporte de equipos o personal.",
    baseLegal: "Ley de Transporte Terrestre",
    vigencia: "5 años",
    requisitos: ["Registro Mercantil", "RIF", "Título de propiedad de los vehículos", "Certificado de revisión técnica", "Seguro de responsabilidad civil"]
  },
  {
    organismo: "INEA — Instituto Nacional de los Espacios Acuáticos",
    permiso: "Permiso de Operaciones Acuáticas (si aplica)",
    descripcion: "Permiso si la empresa opera en espacios acuáticos (cableado submarino, etc.).",
    baseLegal: "Ley de Espacios Acuáticos",
    vigencia: "5 años",
    requisitos: ["Registro Mercantil", "RIF", "Estudio de impacto ambiental", "Plan de operaciones"]
  },
  {
    organismo: "MPPS — Ministerio del Poder Popular para la Salud",
    permiso: "Registro Sanitario (para servicios de salud si aplica)",
    descripcion: "Registro si la empresa ofrece servicios de salud o bienestar.",
    baseLegal: "Ley de Salud, Reglamento de Registros Sanitarios",
    vigencia: "3 años",
    requisitos: ["Registro Mercantil", "RIF", "Descripción de los servicios de salud", "Certificación del personal de salud", "Condiciones del establecimiento"]
  },
  {
    organismo: "SAPI",
    permiso: "Cesión de Derechos de Propiedad Intelectual",
    descripcion: "Cesión formal de derechos de propiedad intelectual entre los fundadores y la empresa.",
    baseLegal: "Ley de Propiedad Industrial, Ley sobre Derecho de Autor",
    vigencia: "Indefinida",
    requisitos: ["Contrato de cesión de derechos", "Identificación de las obras o marcas cedidas", "Registro Mercantil", "Cédulas de los cedentes"]
  },
  {
    organismo: "SAREN",
    permiso: "Registro de Poderes (Generales y Especiales)",
    descripcion: "Registro de poderes otorgados a representantes legales y apoderados de la empresa.",
    baseLegal: "Código de Comercio",
    vigencia: "Indefinida (mientras no sea revocado)",
    requisitos: ["Documento de poder", "Registro Mercantil", "Cédula del representante", "Cédula del apoderado", "Pago de tasas registrales"]
  },
  {
    organismo: "SAREN",
    permiso: "Inscripción de Accionistas y Juntas Directivas",
    descripcion: "Registro de cambios en la composición accionaria o directiva de la empresa.",
    baseLegal: "Código de Comercio, Ley de Mercado de Valores",
    vigencia: "Cada cambio",
    requisitos: ["Acta de asamblea de accionistas", "Registro Mercantil", "Cédulas de los nuevos accionistas/directivos", "Declaración de inversión"]
  },
  {
    organismo: "SENIAT",
    permiso: "Registro como Exportador de Servicios",
    descripcion: "Registro si System Kyron presta servicios tecnológicos a clientes en el exterior.",
    baseLegal: "Ley de IVA, Ley de ISLR",
    vigencia: "Indefinida",
    requisitos: ["RIF activo", "Registro Mercantil", "Contratos con clientes del exterior", "Facturas de exportación", "Declaración de divisas"]
  },
  {
    organismo: "BCV",
    permiso: "Registro de Inversión Extranjera (si aplica)",
    descripcion: "Registro si la empresa recibe inversión extranjera directa.",
    baseLegal: "Ley de Inversiones Internacionales, Convenio CIADI",
    vigencia: "Indefinida",
    requisitos: ["Contrato de inversión", "Registro Mercantil", "RIF", "Documentos de identidad del inversionista", "Proyecto de inversión"]
  },
  {
    organismo: "SENIAT",
    permiso: "Declaración y Pago de IVA e ISLR (Régimen General)",
    descripcion: "Cumplimiento mensual/anual de obligaciones tributarias.",
    baseLegal: "Código Orgánico Tributario",
    vigencia: "Mensual / Anual",
    requisitos: ["Libros de compras y ventas IVA", "Balance general", "Estado de resultados", "Registro de retenciones", "Declaraciones definitivas"]
  },
  {
    organismo: "IVSS",
    permiso: "Pago de Cotizaciones al Seguro Social",
    descripcion: "Pago mensual de cotizaciones de los trabajadores al IVSS.",
    baseLegal: "Ley del Seguro Social",
    vigencia: "Mensual",
    requisitos: ["Nómina registrada", "Planilla de cotizaciones", "Registro patronal", "Pago electrónico"]
  },
  {
    organismo: "INCES",
    permiso: "Aporte patronal INCES (2% de la nómina)",
    descripcion: "Aporte patronal mensual del 2% sobre los salarios pagados.",
    baseLegal: "Ley del INCES",
    vigencia: "Mensual",
    requisitos: ["Registro patronal INCES", "Nómina del período", "Planilla de aportes", "Pago electrónico"]
  },
  {
    organismo: "BANAVIH",
    permiso: "Aporte patronal FAOV (LPH)",
    descripcion: "Aporte patronal del 3% sobre los salarios para el Fondo de Vivienda.",
    baseLegal: "Ley de Política Habitacional",
    vigencia: "Mensual",
    requisitos: ["Registro BANAVIH", "Nómina del período", "Planilla de aportes", "Pago electrónico"]
  }
];

const EMPRESA_FIJA = {
  denominacion: "SYSTEM KYRON",
  emprendimiento: "Carlos Mattar",
  rif: "J-12345678-0",
  direccion: "Caracas, Distrito Capital, Venezuela",
  telefono: "+58 412-000-0000",
  email: "info@systemkyron.com",
  representante: "Carlos Mattar",
  representanteCedula: "V-00.000.000",
  representanteCargo: "Fundador y Director General",
};

function generarTextoCartaLocal(p: PermisoEntry): string[] {
  const fecha = new Date().toLocaleDateString("es-VE", {
    year: "numeric", month: "long", day: "numeric",
  });
  const out: string[] = [];
  const add = (s: string) => out.push(s);
  const addBold = (s: string) => out.push(`__BOLD__${s}`);
  const addLabel = (label: string, value: string) => out.push(`__LABEL__${label}::${value}`);

  add(`Caracas, ${fecha}.`);
  add("");
  add("Ciudadano(a)");
  add("Director(a) General");
  add(p.organismo);
  add("Su Despacho.-");
  add("");
  addBold(`REF.: SOLICITUD DE INSCRIPCIÓN — ${p.permiso.toUpperCase()}`);
  add("");
  add(
    `Yo, ${EMPRESA_FIJA.representante}, venezolano, mayor de edad, titular de la cédula de identidad N° ${EMPRESA_FIJA.representanteCedula}, actuando en mi carácter de ${EMPRESA_FIJA.representanteCargo} de "${EMPRESA_FIJA.denominacion}", emprendimiento del ciudadano ${EMPRESA_FIJA.emprendimiento}, domiciliada en ${EMPRESA_FIJA.direccion} e identificada con el RIF N° ${EMPRESA_FIJA.rif}, por medio de la presente me dirijo a usted respetuosamente para solicitar la inscripción del siguiente permiso:`
  );
  add("");
  addLabel("PERMISO SOLICITADO", p.permiso);
  addLabel("ORGANISMO EMISOR", p.organismo);
  if (p.baseLegal) addLabel("BASE LEGAL", p.baseLegal);
  addLabel("OBJETO SOCIAL", EMPRESA_FIJA.denominacion + " — " + EMPRESA_FIJA.emprendimiento);
  add("");
  add("A tal efecto, consigno los siguientes recaudos:");
  add("");
  p.requisitos.forEach((r, i) => add(`  ${i + 1}. ${r}`));
  add("");
  add("Sin otro particular al cual hacer referencia, quedo de usted.");
  add("");
  add("Atentamente,");
  add("");
  add("_________________________");
  add(EMPRESA_FIJA.representante);
  add(EMPRESA_FIJA.representanteCargo);
  add(EMPRESA_FIJA.denominacion);
  add(`RIF: ${EMPRESA_FIJA.rif}`);
  add(`Emprendimiento: ${EMPRESA_FIJA.emprendimiento}`);

  return out;
}

function descargarCarta(permiso: PermisoEntry) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const m = 22;
  const cw = pw - m * 2;
  let y = m;
  const lh = 5;

  function checkPage(h: number) {
    if (y + h > ph - m - 8) {
      pdf.addPage();
      y = m;
    }
  }

  function t(s: string, size: number, color: number[], style: "bold" | "normal", indent = 0) {
    checkPage(lh);
    pdf.setFont("helvetica", style);
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(s, cw - indent);
    for (const l of lines) {
      checkPage(lh);
      pdf.text(l, m + indent, y);
      y += lh;
    }
  }

  // Letterhead
  t("SYSTEM KYRON", 20, [10, 10, 20], "bold");
  t(`Emprendimiento: ${EMPRESA_FIJA.emprendimiento}`, 9, [100, 100, 120], "normal");
  t(`RIF: ${EMPRESA_FIJA.rif} | ${EMPRESA_FIJA.direccion}`, 8, [100, 100, 120], "normal");
  t(`Tel: ${EMPRESA_FIJA.telefono} | Email: ${EMPRESA_FIJA.email}`, 8, [100, 100, 120], "normal");
  y += 3;
  checkPage(1);
  pdf.setDrawColor(190, 190, 200);
  pdf.setLineWidth(0.4);
  pdf.line(m, y, pw - m, y);
  y += 6;

  // Body
  const blocks = generarTextoCartaLocal(permiso);
  for (const block of blocks) {
    if (block.startsWith("__BOLD__")) {
      t(block.replace("__BOLD__", ""), 10, [20, 20, 30], "bold");
    } else if (block.startsWith("__LABEL__")) {
      const rest = block.replace("__LABEL__", "");
      const sep = rest.indexOf("::");
      const label = rest.slice(0, sep);
      const value = rest.slice(sep + 2);
      checkPage(lh);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(20, 20, 30);
      const ll = pdf.splitTextToSize(label + ": ", cw);
      pdf.text(ll[0], m, y);
      const lw = pdf.getTextWidth(label + ": ");
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 70);
      const vl = pdf.splitTextToSize(value, cw - lw);
      if (vl.length === 1) {
        pdf.text(vl[0], m + lw, y);
        y += lh;
      } else {
        y += lh;
        for (const v of vl) {
          checkPage(lh);
          pdf.text(v, m, y);
          y += lh;
        }
      }
    } else if (!block) {
      y += 3;
    } else if (block.trim() === "Atentamente,") {
      y += 6;
      t(block, 10, [30, 30, 40], "normal");
    } else if (block.trim() === "_________________________") {
      y += 4;
      checkPage(lh);
      pdf.text(block.trim(), m, y);
      y += 7;
    } else if (/^\s*\d+\.\s/.test(block)) {
      t(block.trim(), 9, [60, 60, 70], "normal", 6);
    } else {
      t(block, 10, [30, 30, 40], "normal");
    }
  }

  // Footer
  const footerY = ph - m - 6;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(160, 160, 170);
  pdf.text(`Documento generado por System Kyron — ${new Date().toLocaleDateString("es-VE")}`, m, footerY);

  const safeName = permiso.permiso.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 40);
  pdf.save(`carta_${safeName}.pdf`);
}

function descargarPDFCompleto() {
  const pdf = new jsPDF("p", "mm", "a4");
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const m = 16;
  const cw = pw - m * 2;
  let y = m;
  const lineH = 4.8;

  function np(h: number) {
    if (y + h > ph - m - 10) {
      pdf.addPage();
      y = m;
    }
  }

  // Title
  pdf.setFontSize(22);
  pdf.setTextColor(10, 10, 20);
  pdf.text("Permisos Requeridos — System Kyron", m, y);
  y += 8;
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 130);
  pdf.text("Emprendimiento Carlos Mattar — Cumplimiento Normativo. Actualizado mayo 2026", m, y);
  y += 3;
  pdf.setDrawColor(210, 210, 215);
  pdf.setLineWidth(0.4);
  pdf.line(m, y, pw - m, y);
  y += 8;

  for (const p of permisos) {
    const nameLines = pdf.splitTextToSize(p.permiso, cw - 14);
    const descLines = pdf.splitTextToSize(p.descripcion, cw - 14);
    const cardPad = 6;
    const innerH = nameLines.length * lineH + descLines.length * lineH + 6;
    const cardH = cardPad * 2 + innerH;

    np(cardH + 4);

    const idx = permisos.indexOf(p);
    pdf.setFillColor(idx % 2 === 0 ? 252 : 248, idx % 2 === 0 ? 252 : 250, idx % 2 === 0 ? 254 : 252);
    pdf.setDrawColor(222, 222, 228);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(m, y, cw, cardH, 2, 2, "FD");

    let cy = y + cardPad + lineH;

    pdf.setFontSize(10);
    pdf.setTextColor(15, 15, 25);
    for (let i = 0; i < nameLines.length; i++) {
      pdf.text(nameLines[i], m + cardPad, cy + i * lineH);
    }
    cy += nameLines.length * lineH + 1;

    pdf.setFontSize(8);
    pdf.setTextColor(90, 90, 100);
    for (let i = 0; i < descLines.length; i++) {
      pdf.text(descLines[i], m + cardPad, cy + i * lineH);
    }

    y += cardH + 2;
  }

  // Footer
  np(20);
  y += 6;
  pdf.setFillColor(240, 247, 255);
  pdf.roundedRect(m, y, cw, 14, 2, 2, "F");
  pdf.setFontSize(7);
  pdf.setTextColor(100, 100, 115);
  const note = "Lista actualizada a mayo 2026. Verificar requisitos especificos segun el domicilio fiscal y servicios que preste System Kyron al momento de cada tramite. System Kyron — Emprendimiento Carlos Mattar.";
  const noteLines = pdf.splitTextToSize(note, cw - 10);
  for (let i = 0; i < noteLines.length; i++) {
    pdf.text(noteLines[i], m + 5, y + 5 + i * 4);
  }

  pdf.save("permisos-system-kyron-completo.pdf");
}

export default function PermisosSystemKyronPage() {
  const [mounted, setMounted] = useState(false);
  const [downloadingFull, setDownloadingFull] = useState(false);
  const [downloadingCarta, setDownloadingCarta] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDescargarCarta = (p: PermisoEntry) => {
    setDownloadingCarta(p.permiso);
    try {
      descargarCarta(p);
    } catch (e) {
      console.error("Error al descargar carta:", e);
    } finally {
      setDownloadingCarta(null);
    }
  };

  const handleDescargarCompleto = () => {
    setDownloadingFull(true);
    try {
      descargarPDFCompleto();
    } finally {
      setDownloadingFull(false);
    }
  };

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <PasswordGate title="Permisos Requeridos — System Kyron">
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-outfit)]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0"
             style={{ backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] bg-blue-600/8 dark:bg-blue-600/8 bg-blue-200/40 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/5 dark:bg-cyan-500/5 bg-cyan-200/30 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <Link href="/brand-kit" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Volver a Brand Kit
          </Link>
          <button onClick={handleDescargarCompleto} disabled={downloadingFull} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-cyan-500/20">
            <FileText className={`h-4 w-4 ${downloadingFull ? "animate-bounce" : ""}`} />
            {downloadingFull ? "Generando..." : "Descargar Todo"}
          </button>
        </div>

        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md mb-6">
          <ShieldCheck className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-400">Cumplimiento Normativo — System Kyron</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6">
          Permisos <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-foreground dark:from-cyan-400 dark:via-blue-400 dark:to-white bg-clip-text text-transparent">Requeridos</span>
        </h1>
        <p className="text-muted-foreground text-base lg:text-lg font-medium leading-relaxed max-w-3xl mb-4">
          Todos los permisos, licencias, registros y habilitaciones que <strong>System Kyron — Emprendimiento Carlos Mattar</strong> debe obtener para operar legalmente en Venezuela.
        </p>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-3xl mb-16">
          {permisos.length} permisos identificados. Cada uno incluye su base legal, vigencia y requisitos. 
          Use el botón <strong>"Carta de Solicitud"</strong> para descargar una carta formal dirigida al organismo correspondiente.
        </p>

        <div className="space-y-3">
          {permisos.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border dark:border-white/[0.06] p-6 bg-card dark:bg-transparent">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black tracking-tight text-foreground mb-1">{p.permiso}</h3>
                  <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400/70 mb-2">{p.organismo}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.descripcion}</p>
                  <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground/70">
                    {p.baseLegal && <span><strong className="text-foreground/80">Base Legal:</strong> {p.baseLegal}</span>}
                    <span><strong className="text-foreground/80">Vigencia:</strong> {p.vigencia}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDescargarCarta(p)}
                  disabled={downloadingCarta === p.permiso}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white transition-all text-[10px] font-bold uppercase tracking-wider disabled:opacity-50 shadow-md shadow-cyan-500/20"
                >
                  <FileSignature className={`h-3.5 w-3.5 ${downloadingCarta === p.permiso ? "animate-bounce" : ""}`} />
                  {downloadingCarta === p.permiso ? "Generando..." : "Carta de Solicitud"}
                </button>
              </div>
              <details className="mt-3 group">
                <summary className="text-[11px] font-bold text-muted-foreground/50 hover:text-foreground/70 cursor-pointer transition-colors select-none">
                  Requisitos ({p.requisitos.length})
                </summary>
                <ul className="mt-2 space-y-1">
                  {p.requisitos.map((r, j) => (
                    <li key={j} className="text-xs text-muted-foreground/60 pl-4 relative">
                      <span className="absolute left-0 top-0 text-cyan-500">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-cyan-600 dark:text-cyan-400">System Kyron — Emprendimiento Carlos Mattar.</strong> Lista actualizada a mayo 2026. 
            Verificar requisitos específicos según el domicilio fiscal y servicios que preste System Kyron al momento de cada trámite. 
            Las cartas de solicitud son modelos referenciales; consulte con un abogado para su presentación formal.
          </p>
        </div>
      </main>
    </div>
    </PasswordGate>
  );
}
