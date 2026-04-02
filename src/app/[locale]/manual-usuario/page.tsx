"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  BookOpen, ShieldCheck, Zap, Calculator, Users, School,
  Download, Printer, Loader as Loader2, CircleCheck as CheckCircle,
  Target, LayoutDashboard, ShoppingCart,
  Landmark, Activity, Cpu, Building2, FileText,
  Gavel, Radio, Recycle, Wallet, ChartBar as BarChart3, BrainCircuit,
  ExternalLink, ChevronUp, Search, Menu, X,
  CreditCard, Briefcase, Settings,
  DollarSign, FolderOpen,
  Headphones, Megaphone
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const chapters = [
  {
    id: "bienvenida",
    title: "Bienvenida al Ecosistema",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    content: `Bienvenido a la documentación unificada de System Kyron v3.0. Este legajo representa la visión técnica y operativa de un ecosistema integral diseñado para la excelencia en la gestión empresarial y ciudadana en Venezuela. Bajo la dirección estratégica de Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS), System Kyron se propone como el núcleo de inteligencia que fusiona telecomunicaciones, finanzas y cumplimiento legal automatizado. El ecosistema cuenta con más de 80 tablas en base de datos, más de 60 rutas API y más de 10 módulos especializados. Este manual detalla las capacidades técnicas disponibles para transformar la operatividad del sector privado bajo los más altos estándares de seguridad y eficiencia.`,
    details: [
      "Centralizar el 100% de las operaciones críticas en una plataforma única.",
      "Ingeniería soberana desarrollada en el Colegio Santa Rosa de Lima.",
      "Preparar a las empresas para la economía digital de 2026.",
      "Más de 10 áreas independientes que escalan con su organización.",
      "Soporte multimoneda (Bs., USD, EUR) con tasas BCV en tiempo real."
    ]
  },
  {
    id: "empezar",
    title: "Cómo empezar",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    content: `El despliegue de System Kyron está diseñado para ser fluido e intuitivo. Al iniciar, el sistema le guiará a través de una configuración inicial donde definirá el perfil de su organización o identidad personal. Un asistente de configuración mapea automáticamente sus necesidades según el sector económico, asegurando que los módulos de facturación, contabilidad y recursos humanos se activen con los parámetros legales correspondientes a su jurisdicción. El sistema ofrece un tutorial de bienvenida interactivo y tutoriales específicos por módulo para facilitar la adopción.`,
    details: [
      "Registro de RIF, Razón Social y datos de contacto oficiales.",
      "Activación bajo demanda de las 10+ secciones principales.",
      "Guía asistida por Kyron AI (potenciado por Claude de Anthropic) para la carga inicial de datos.",
      "Soporte bilingüe completo (Español e Inglés) con next-intl.",
      "Tutorial de bienvenida interactivo y tutoriales por módulo.",
      "Guía de registro paso a paso disponible en /guia-registro."
    ]
  },
  {
    id: "seguridad",
    title: "Protegiendo tu cuenta",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-500",
    content: `La seguridad en System Kyron es la base de la arquitectura. El sistema implementa cifrado AES-256 con autenticación de dos factores (2FA). Para proteger sus activos digitales, la validación 2FA es obligatoria: cada acceso sensible requiere confirmación desde su dispositivo vinculado, garantizando que solo el titular pueda acceder a la plataforma. Los tokens JWT se manejan como cookies HTTP-only para máxima seguridad. Se aplican cabeceras CSP, HSTS, X-Frame-Options, Permissions-Policy, rate limiting con bloqueo por fuerza bruta, validación de complejidad de contraseña y sanitización de entradas.`,
    details: [
      "Cifrado AES-256 de grado bancario en toda la plataforma.",
      "Autenticación 2FA vía email, SMS o WhatsApp.",
      "Alertas instantáneas ante intentos de acceso no autorizados.",
      "Auditoría inmutable de cada operación con SHA-256.",
      "Rate limiting inteligente con bloqueo tras intentos fallidos.",
      "Cabeceras de seguridad: CSP, HSTS, X-Content-Type-Options.",
      "Magic links para verificación de acceso sin contraseña."
    ]
  },
  {
    id: "tablero",
    title: "Dashboard Empresarial",
    icon: LayoutDashboard,
    color: "from-violet-500 to-purple-500",
    content: `El portal central de System Kyron es un espejo de la salud de su negocio. El Dashboard Empresarial muestra KPIs (Indicadores Clave de Desempeño) en tiempo real, incluyendo ingresos, gastos, utilidad neta, cuentas por cobrar y pagar, análisis de nómina y movimientos recientes. El sistema de visualización multimoneda permite cambiar entre Bolívares (Bs.), Dólares (USD) y Euros (EUR) con un solo clic, convirtiendo automáticamente todos los valores mostrados según las tasas de cambio. La interfaz utiliza el diseño HUD Titanium con animaciones fluidas y gráficos interactivos para reducir la carga cognitiva.`,
    details: [
      "Resumen consolidado con KPIs financieros en tiempo real.",
      "Selector de moneda: visualización en Bs., USD o EUR.",
      "Gráficos de ingresos/gastos, cuentas por cobrar/pagar.",
      "Personalización según rol (Gerente, Contador, Operador).",
      "Datos actualizados sin necesidad de recarga manual.",
      "Navegación rápida entre cuenta personal y corporativa."
    ]
  },
  {
    id: "multimoneda",
    title: "Sistema Multimoneda",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    content: `System Kyron incorpora un sistema de visualización multimoneda que permite ver todos los valores monetarios en Bolívares (VES), Dólares (USD) o Euros (EUR). El selector de moneda está disponible en todas las páginas financieras: centro de facturación, proformas, facturación a crédito, notas de débito, notas de crédito y el dashboard empresarial. Es importante destacar que este sistema es de referencia visual solamente: todos los montos se almacenan y procesan en bolívares (VES) para cumplir con la normativa SENIAT. Las tasas de cambio se muestran como referencia y las del BCV se actualizan automáticamente.`,
    details: [
      "Conversión instantánea entre VES, USD y EUR en pantalla.",
      "Cumplimiento SENIAT: todos los datos fiscales en VES.",
      "Selector completo (3 opciones visibles) en dashboards.",
      "Selector compacto (clic para ciclar) en notas de débito/crédito.",
      "Tasas BCV actualizadas automáticamente.",
      "6 páginas financieras con soporte multimoneda integrado."
    ]
  },
  {
    id: "contabilidad",
    title: "Contabilidad VEN-NIF",
    icon: Calculator,
    color: "from-sky-500 to-blue-500",
    content: `El módulo contable se alinea estrictamente con las normas VEN-NIF y cuenta con 10 sub-módulos especializados. Procesa automáticamente los asientos diarios, integrando las ventas del TPV y los gastos registrados. Incluye gestión multimoneda con tasas oficiales del BCV y cálculo automático del Reajuste por Inflación Fiscal (RIPF) según índices INPC. Además ofrece análisis de caja, estructura de costos, análisis de rentabilidad, análisis de riesgo, análisis de ventas, libro de compra-venta, cuentas por cobrar y pagar, declaración de IVA, retenciones ISLR-ARC y trámites fiscales integrados.`,
    details: [
      "Adaptación total a los principios contables VEN-NIF.",
      "Conversión síncrona en Bs., USD y EUR según tasa BCV.",
      "Ajuste RIPF automatizado de activos no monetarios.",
      "Balance de Situación y Estado de Resultados siempre listos.",
      "10 sub-módulos: análisis de caja, costos, rentabilidad, riesgo, ventas.",
      "Libros de compra-venta, declaración IVA, ISLR-ARC automáticos.",
      "Cuentas por cobrar y pagar con alertas de vencimiento."
    ]
  },
  {
    id: "facturacion",
    title: "Facturación Homologada SENIAT",
    icon: FileText,
    color: "from-blue-500 to-indigo-500",
    content: `El centro de facturación cumple con la Providencia SNAT/2011/0071 para facturación electrónica en Venezuela. Incluye facturación estándar, proformas comerciales, facturación a crédito con control de mora, notas de débito y notas de crédito. Cada documento fiscal incluye hash SHA-256 para garantizar inmutabilidad y cumplimiento ante auditorías. El sistema genera secuencias correlativas, control de números de máquina fiscal, y soporta cobro mixto Bs./Divisas con cálculo exacto de IGTF (3%). Todas las vistas financieras incluyen el selector multimoneda para referencia visual.`,
    details: [
      "Facturación electrónica con hash SHA-256 inmutable.",
      "Proformas comerciales con conversión a factura formal.",
      "Facturación a crédito con alertas de mora y vencimiento.",
      "Notas de débito y crédito con cálculos automáticos.",
      "Cumplimiento Providencia 0071: correlativo, RIF, datos fiscales.",
      "Selector multimoneda en todas las vistas de facturación.",
      "Cobro mixto Bs./Divisas con IGTF automático."
    ]
  },
  {
    id: "impuestos",
    title: "Impuestos & Pre-Alerta IA",
    icon: Landmark,
    color: "from-red-500 to-rose-500",
    content: `El cumplimiento ante el SENIAT es de misión crítica. System Kyron incorpora un motor de Pre-Alerta que notifica con 15, 7 y 3 días de antelación sobre cada vencimiento fiscal. El sistema calcula automáticamente el IVA (16%), las retenciones de ISLR y el IGTF (3%) según el método de pago. El módulo de Alertas Fiscales Expandidas monitorea más de 30 obligaciones fiscales venezolanas. El módulo de Alertas Regulatorias vigila cambios legislativos desde Gacetas Oficiales y la Asamblea Nacional. Al automatizar estos procesos según la Providencia SNAT/2011/0071, se evitan multas por declaraciones extemporáneas.`,
    details: [
      "Generación automática de libros de Compra y Venta.",
      "Cálculo instantáneo del IGTF (3%) en transacciones de divisas.",
      "Notificaciones proactivas para cumplimiento a tiempo.",
      "Exportación de archivos .txt para el portal fiscal del SENIAT.",
      "Monitoreo de 30+ obligaciones fiscales venezolanas.",
      "Alertas regulatorias desde Gacetas Oficiales y Asamblea Nacional.",
      "Pre-alerta con 15, 7 y 3 días antes de vencimientos."
    ]
  },
  {
    id: "tpv",
    title: "Punto de Venta & Inventario",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-500",
    content: `El módulo de facturación integra un Punto de Venta (TPV) de alta velocidad con control de horario laboral. Si un operador intenta procesar una venta fuera de su turno, el sistema requiere autorización gerencial. El control de inventario se actualiza en tiempo real con cada transacción, alertando sobre stock bajo y permitiendo transferencias entre sucursales. Junto con la homologación de equipos fiscales y 26+ pasarelas de pago (incluyendo 29 bancos venezolanos), asegura control total sobre inventario e ingresos.`,
    details: [
      "Bloqueo automático del TPV fuera del horario laboral.",
      "Cobro mixto (Bs./Divisas) con cálculo exacto de IGTF.",
      "Actualización de inventario en tiempo real con cada transacción.",
      "Registro de excepciones supervisadas por gerencia.",
      "26+ pasarelas de pago y 29 bancos venezolanos.",
      "Alertas de stock bajo y gestión de reposición.",
      "Control de caja con arqueos detallados."
    ]
  },
  {
    id: "empleados",
    title: "Recursos Humanos & Nómina",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    content: `La gestión del talento garantiza el respeto total a la LOTTT. El módulo de RRHH es uno de los más completos del ecosistema, con sub-módulos para: nómina con cálculos automáticos, prestaciones sociales, desarrollo personal, bienestar laboral, clima organizacional, salud y seguridad, reclutamiento, libros laborales, proyectos del personal y manuales de procedimientos RRHH. Calcula nóminas, vacaciones, utilidades y prestaciones sociales de forma transparente. Incluye la entrega de recibos de pago firmados digitalmente a través de WhatsApp, con plena validez legal.`,
    details: [
      "Cálculo automático de IVSS, FAOV, LPH e INCES.",
      "Recibos de pago por WhatsApp con validez legal.",
      "Prestaciones sociales con cálculo LOTTT automatizado.",
      "Módulo de desarrollo personal y plan de carrera.",
      "Bienestar laboral: encuestas de clima organizacional.",
      "Reclutamiento: publicación de vacantes y selección.",
      "Salud y seguridad ocupacional con registros LOPCYMAT.",
      "Libros laborales y manuales de procedimientos RRHH."
    ]
  },
  {
    id: "legal",
    title: "Asesoría Legal con Kyron AI",
    icon: Gavel,
    color: "from-indigo-500 to-violet-500",
    content: `El módulo jurídico actúa como un Oficial de Cumplimiento virtual. Kyron AI — potenciado por Claude de Anthropic — está entrenado en legislación venezolana para redactar borradores de contratos, acuerdos de confidencialidad y actas de asamblea. El Escritorio Jurídico centraliza la gestión de todos los documentos legales. El módulo de Permisología gestiona permisos, licencias y certificaciones ante SENIAT, SAREN, SAPI y otras instituciones. Monitorea registros y emite alertas sobre vencimiento de poderes o necesidad de renovar marcas comerciales.`,
    details: [
      "Generación automática de documentos legales por Kyron AI.",
      "Escritorio Jurídico: gestión centralizada de casos legales.",
      "Gestión de contratos con seguimiento de vigencia.",
      "Permisología: licencias, permisos y certificaciones.",
      "Avisos preventivos antes de la caducidad de poderes.",
      "Control de registros de marca y patentes (SAPI).",
      "Organización de documentos públicos y notariales (SAREN).",
      "Generación de actas de asamblea con formato legal."
    ]
  },
  {
    id: "telecom",
    title: "Telecomunicaciones 5G/eSIM",
    icon: Radio,
    color: "from-cyan-500 to-sky-500",
    content: `System Kyron opera como un centro de telecomunicaciones bajo normativas de CONATEL. Permite la activación inmediata de líneas móviles mediante eSIM (chips digitales), eliminando la logística física. Las empresas pueden gestionar flotas de datos 5G con priorización de red (Network Slicing). El módulo incluye: gestión de líneas individuales (Mi Línea), consumo 5G, flotas empresariales, facturación corporativa de telecom, recargas, homologación IMEI, venta de líneas, reportes de flota y límites corporativos para control de gastos.`,
    details: [
      "Activación eSIM en minutos mediante código QR.",
      "Cumplimiento con los estándares de CONATEL.",
      "Gestión centralizada de consumo para planes corporativos.",
      "Flotas empresariales con límites y alertas de consumo.",
      "Facturación corporativa de telecomunicaciones.",
      "Homologación de equipos IMEI.",
      "Reportes detallados de consumo por flota y usuario.",
      "Venta de líneas con activación inmediata."
    ]
  },
  {
    id: "informatica",
    title: "Informática & IT",
    icon: Cpu,
    color: "from-slate-500 to-zinc-500",
    content: `El módulo de Informática e IT proporciona herramientas completas para la gestión tecnológica de la empresa. Incluye un Dashboard IT con métricas en tiempo real, gestión de infraestructura de servidores y servicios, sistema de Helpdesk para soporte interno, gestión de licencias de software, seguridad informática con monitoreo de vulnerabilidades, y sistema de respaldos automatizados. Permite a las empresas mantener control total sobre su infraestructura tecnológica, garantizando la continuidad operativa.`,
    details: [
      "Dashboard IT con métricas de infraestructura en tiempo real.",
      "Sistema de Helpdesk para gestión de tickets de soporte.",
      "Gestión de licencias de software con alertas de renovación.",
      "Monitoreo de seguridad informática y vulnerabilidades.",
      "Sistema de respaldos automatizados con programación.",
      "Gestión de infraestructura: servidores, redes y servicios.",
      "Inventario de equipos y activos tecnológicos."
    ]
  },
  {
    id: "cuenta-natural",
    title: "Cuenta Personal del Ciudadano",
    icon: FolderOpen,
    color: "from-blue-500 to-indigo-500",
    content: `El portal de Cuenta Personal está diseñado para el ciudadano venezolano. Incluye: perfil personal con datos civiles, dashboard de actividades, gestión de documentos (cédula, pasaporte, títulos), partidas de nacimiento, actas de matrimonio, documentos judiciales, antecedentes penales, registro de RIF personal, directorio médico, cálculo de manutención LOPNNA, carnet personal digital, tarjeta digital de identificación, tarjeta de reciclaje Ameru, notificaciones personales y módulo de seguridad de la cuenta.`,
    details: [
      "Bóveda digital de documentos de identidad y propiedad.",
      "Partidas de nacimiento y actas de matrimonio digitalizadas.",
      "Antecedentes penales y documentos judiciales.",
      "Cálculo LOPNNA de pensión alimenticia con ajuste inflacionario.",
      "Registro de RIF personal desde la plataforma.",
      "Directorio médico con búsqueda de profesionales.",
      "Carnet personal y tarjeta digital de identificación.",
      "Tarjeta de reciclaje Ameru para Eco-Créditos."
    ]
  },
  {
    id: "socios",
    title: "Portal de Socios & Directivos",
    icon: Briefcase,
    color: "from-amber-500 to-yellow-500",
    content: `El portal de Socios y Directivos ofrece una vista ejecutiva consolidada de toda la operación empresarial. Diseñado para la alta gerencia, permite acceder a KPIs estratégicos, análisis de rendimiento global, reportes consolidados multi-sede y toma de decisiones basada en datos. Desde este portal los directivos pueden supervisar todas las áreas de la empresa sin acceder a la operación diaria, manteniendo el control estratégico con información actualizada en tiempo real.`,
    details: [
      "Dashboard ejecutivo con KPIs estratégicos consolidados.",
      "Vista global del rendimiento de todas las sedes.",
      "Reportes de alto nivel para juntas directivas.",
      "Control de acceso diferenciado para socios y directivos.",
      "Análisis de tendencias y proyecciones empresariales.",
      "Gestión de dividendos y participaciones societarias."
    ]
  },
  {
    id: "sostenibilidad",
    title: "Sostenibilidad & Eco-Créditos Ameru",
    icon: Recycle,
    color: "from-green-500 to-emerald-500",
    content: `Este módulo introduce la economía circular al ecosistema mediante el programa Ameru. Mediante puntos de reciclaje con tecnología de inducción magnética, los usuarios transforman residuos en activos digitales. Kyron AI valida el pesaje y acredita Eco-Créditos en su cuenta. Estos créditos se intercambian en el Mercado de Eco-Créditos interno, permitiendo a las empresas comprar o vender bonos verdes. Los usuarios pueden consultar su tarjeta de reciclaje desde la cuenta personal.`,
    details: [
      "Clasificación precisa de metales y plásticos por IA.",
      "Exchange de activos ambientales certificados.",
      "Acumulación de puntos canjeables por servicios Kyron.",
      "Reportes de impacto ambiental para balance social (CO₂).",
      "Tarjeta de reciclaje Ameru integrada en cuenta personal.",
      "Mercado de Eco-Créditos para bonos verdes empresariales."
    ]
  },
  {
    id: "fidelizacion",
    title: "Fidelización & Marketing",
    icon: Megaphone,
    color: "from-pink-500 to-rose-500",
    content: `El módulo de Fidelización de Clientes permite crear programas de lealtad, gestionar puntos de recompensa y diseñar campañas de retención. Junto con el módulo de Estrategias de Ventas y el Análisis de Mercado, ofrece herramientas completas para el crecimiento comercial. Incluye modelos de factura personalizables, análisis de ventas con tendencias, estructura de costos detallada y análisis de rentabilidad por producto o servicio.`,
    details: [
      "Programas de fidelización con puntos de recompensa.",
      "Estrategias de ventas con análisis de conversión.",
      "Análisis de mercado y competencia.",
      "Modelos de factura personalizables por marca.",
      "Análisis de rentabilidad por producto/servicio.",
      "Segmentación de clientes y campañas dirigidas."
    ]
  },
  {
    id: "billetera",
    title: "Billetera Digital & Pasarelas",
    icon: Wallet,
    color: "from-yellow-500 to-amber-500",
    content: `La Billetera Digital es el centro financiero del ecosistema. Permite realizar pagos instantáneos entre usuarios de la plataforma sin comisiones. Los fondos pueden provenir de ventas, transferencias bancarias o del canje de Eco-Créditos. El módulo de pasarelas de pago soporta 26+ métodos de pago y 29 bancos venezolanos, incluyendo Pago Móvil, transferencias bancarias, Zelle, PayPal, Binance Pay, criptomonedas y más. El sistema calcula automáticamente el IGTF en pagos con divisas.`,
    details: [
      "Transferencias P2P/B2B inmediatas dentro de la red.",
      "Conversión de Eco-Créditos en saldo utilizable.",
      "26+ pasarelas de pago integradas.",
      "29 bancos venezolanos para Pago Móvil y transferencias.",
      "Protección de fondos bajo cifrado AES-256.",
      "Historial sellado e inmutable de cada transacción.",
      "Cálculo automático de IGTF en pagos con divisas."
    ]
  },
  {
    id: "auditoria",
    title: "Auditoría, Blockchain & Automatizaciones",
    icon: Activity,
    color: "from-rose-500 to-red-500",
    content: `Para garantizar el 'Cero Riesgo Fiscal', System Kyron cuenta con un Supervisor Kyron AI que audita transacciones las 24 horas. Detecta inconsistencias antes de que se conviertan en multas. La auditoría incluye sellado criptográfico SHA-256 y anclaje blockchain mediante raíz de Merkle en redes Polygon, Ethereum y BSC para registros inmutables. El Motor de Automatización ejecuta reglas programadas como sincronización BCV, anclaje blockchain por lotes, alertas fiscales y más, con dashboard de ejecución en tiempo real.`,
    details: [
      "Detección temprana de errores en base imponible o IGTF.",
      "Sellado SHA-256 inmutable en cada operación fiscal.",
      "Anclaje blockchain en Polygon, Ethereum y BSC.",
      "Motor de automatización con reglas programadas.",
      "Sincronización automática de tasas BCV.",
      "Score de cumplimiento fiscal para su empresa.",
      "Dashboard de automatizaciones con logs de ejecución."
    ]
  },
  {
    id: "reportes",
    title: "Reportes & Analítica Avanzada",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
    content: `System Kyron transforma los datos en decisiones. El generador de reportes extrae información analítica de cualquier módulo del sistema. Desde reportes de ventas por hora hasta análisis de rentabilidad por producto. Incluye resumen de negocio ejecutivo, análisis de riesgo financiero, proyecciones con IA y documentos listos para auditorías del SENIAT. Todos los reportes son exportables en PDF y Excel, diseñados para juntas directivas o entes gubernamentales con total transparencia.`,
    details: [
      "Resúmenes ejecutivos para socios y directores.",
      "Proyecciones de ventas y tendencias por Kyron AI.",
      "Documentos listos para auditorías del SENIAT.",
      "Exportación a PDF y Excel (ExcelJS) en un clic.",
      "Análisis de riesgo financiero y alertas.",
      "Resumen de negocio con indicadores consolidados.",
      "Registro completo e inmutable de cada operación."
    ]
  },
  {
    id: "chat-ia",
    title: "Kyron AI — Asistente Inteligente",
    icon: BrainCircuit,
    color: "from-violet-500 to-fuchsia-500",
    content: `Kyron AI es el asistente inteligente del ecosistema, potenciado por Claude de Anthropic. Ofrece 10+ identidades contextuales que se adaptan automáticamente según la sección donde se encuentre el usuario: Contador Kyron en contabilidad, Abogado Kyron en el módulo legal, Ingeniero Kyron en IT, Telecom Kyron en telecomunicaciones, y más. El chat es accesible desde cualquier página del sistema y puede responder preguntas, generar documentos, analizar datos y asistir en la toma de decisiones.`,
    details: [
      "10+ identidades contextuales según módulo activo.",
      "Generación de documentos legales y contables.",
      "Análisis fiscal predictivo y alertas proactivas.",
      "Asistencia en la clasificación de residuos Ameru.",
      "Chat accesible desde cualquier página del sistema.",
      "Potenciado por Claude de Anthropic y modelos Gemini/OpenAI."
    ]
  },
  {
    id: "conexion-bancaria",
    title: "Conexión Bancaria & Conciliación",
    icon: Landmark,
    color: "from-emerald-500 to-teal-500",
    content: `System Kyron se integra con las principales instituciones financieras del país. La conexión permite conciliación bancaria automática, comparando registros contables con movimientos bancarios. Reduce el tiempo de oficina al automatizar el reconocimiento de pagos móviles, transferencias y cargos por servicios bancarios. Las tasas BCV se actualizan automáticamente para conversiones en tiempo real. El billetera-cambio permite operaciones de cambio de divisas dentro del ecosistema.`,
    details: [
      "Conciliación inteligente de transacciones bancarias.",
      "Actualización diaria de tasas de cambio del BCV.",
      "Cuadre entre bancos y efectivo en tiempo real.",
      "Enlaces cifrados mediante protocolos de alta seguridad.",
      "Billetera de cambio para operaciones de divisas.",
      "Soporte para 29 bancos venezolanos."
    ]
  },
  {
    id: "locales",
    title: "Múltiples Sedes & Franquicias",
    icon: Building2,
    color: "from-zinc-500 to-slate-500",
    content: `Para las empresas en expansión, System Kyron ofrece gestión multi-sede. Controle inventarios, ventas y personal de diferentes sucursales desde una cuenta ejecutiva de Socios y Directivos. Consolide la operación global del negocio manteniendo la independencia administrativa de cada punto, ideal para franquicias o holdings que operan en distintos estados. El sistema de activos inmobiliarios permite registrar y gestionar las propiedades de la empresa.`,
    details: [
      "Reportes unificados de todos los puntos de venta.",
      "Transferencias de stock entre locales.",
      "Permisos diferenciados por gerente de sede.",
      "Visibilidad en tiempo real de cada sucursal.",
      "Gestión de activos inmobiliarios por sede.",
      "Consolidación financiera multi-sede."
    ]
  },
  {
    id: "configuracion",
    title: "Configuración & Personalización",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
    content: `La página de Configuración permite personalizar completamente la experiencia del usuario. Incluye ajustes de animaciones (rendimiento adaptativo), preferencias de navegación, configuración de notificaciones (email, SMS, WhatsApp), datos fiscales de la empresa (RIF, razón social, domicilio fiscal), datos de contacto y temática visual del sistema. El sistema de temas estacionales celebra fechas venezolanas importantes con decoraciones especiales.`,
    details: [
      "Ajustes de animaciones y rendimiento adaptativo.",
      "Configuración de notificaciones por canal preferido.",
      "Datos fiscales: RIF, razón social, domicilio fiscal.",
      "Temas estacionales para fiestas venezolanas.",
      "Preferencias de navegación y atajos.",
      "Gestión de plan y límites de suscripción."
    ]
  },
  {
    id: "planes",
    title: "Planes de Suscripción",
    icon: CreditCard,
    color: "from-purple-500 to-indigo-500",
    content: `System Kyron ofrece 4 planes de suscripción progresivos diseñados para adaptarse a empresas de cualquier tamaño. Cada plan incluye límites específicos de recursos (usuarios, facturas, almacenamiento, módulos) que escalan con las necesidades de la organización. Los precios se expresan en USD con conversión automática a bolívares según la tasa BCV vigente. Todos los planes incluyen acceso a Kyron AI y soporte técnico, diferenciándose en volumen de operaciones y funcionalidades avanzadas.`,
    details: [
      "4 planes progresivos: desde emprendedores hasta corporaciones.",
      "Límites de recursos que escalan con la empresa.",
      "Facturación mensual o anual con descuento.",
      "Precios en USD con conversión BCV automática.",
      "Acceso a Kyron AI incluido en todos los planes.",
      "Módulos premium desbloqueables según plan."
    ]
  },
  {
    id: "modelo-zedu",
    title: "Modelo ZEDU — AutoMind AI",
    icon: School,
    color: "from-violet-500 to-fuchsia-500",
    content: `El Modelo Zedu corresponde al proyecto educativo AutoMind AI, desarrollado en el Colegio Santa Rosa de Lima, Caracas. Transforma el sistema de archivado tradicional de instituciones educativas en un entorno digital eficiente, integrando digitalización de expedientes estudiantiles, chatbot de atención automatizada para representantes y herramientas de Kyron AI de apoyo administrativo. AutoMind AI aplica inteligencia artificial para optimizar la gestión escolar, desde matrículas hasta comunicaciones con padres y representantes.`,
    details: [
      "Digitalización y búsqueda instantánea de expedientes con OCR.",
      "Chatbot Kyron AI: atención 24/7 vía WhatsApp y portal web.",
      "Generación de reportes, circulares y análisis estratégico.",
      "Gestión de matrículas y inscripciones digitales.",
      "Comunicación automatizada con representantes.",
      "Disponible con opción de descarga en Word (.doc)."
    ]
  },
  {
    id: "soporte",
    title: "Soporte Técnico & Comunidad",
    icon: Headphones,
    color: "from-sky-500 to-cyan-500",
    content: `El soporte técnico de System Kyron es de grado corporativo. Incluye asistencia multicanal mediante Kyron AI (potenciado por Claude de Anthropic), chat en vivo y conexión directa con el equipo de ingeniería. El sistema de notificaciones internas mantiene al usuario informado sobre actualizaciones, cambios de normativa y alertas del sistema. Estamos comprometidos con una experiencia de misión crítica: sin caídas, sin errores y con respuesta técnica inmediata.`,
    details: [
      "Resolución de dudas 24/7 mediante Kyron AI.",
      "Seguimiento transparente de tickets de servicio.",
      "Sistema de notificaciones internas del sistema.",
      "Actualizaciones de sistema sin interrupciones.",
      "FAQ completa con preguntas frecuentes.",
      "Foro de la comunidad Kyron para mejores prácticas.",
      "Contacto directo: infosystemkyron@gmail.com."
    ]
  },
  {
    id: "academia",
    title: "Academia Kyron",
    icon: School,
    color: "from-purple-500 to-violet-500",
    content: `La Academia Kyron es un portal educativo donde los operadores aprenden a usar cada módulo del sistema mediante cursos certificados. El conocimiento se transfiere a los usuarios para que dominen la gestión fiscal y técnica del sistema, convirtiéndose en profesionales capaces de liderar la transformación digital en sus empresas. El ecosistema también ofrece una guía de registro interactiva y tutoriales por módulo para nuevos usuarios.`,
    details: [
      "Certificación de competencias en gestión Kyron.",
      "Tutoriales en video paso a paso de cada módulo.",
      "Webinars sobre cambios en Gacetas Oficiales.",
      "Biblioteca técnica con manuales, guías y casos de éxito.",
      "Guía de registro interactiva para nuevos usuarios.",
      "Tutoriales por módulo con asistente Kyron AI."
    ]
  }
];

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
      <div className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver al inicio"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/90 text-white shadow-lg shadow-primary/30 hover:bg-primary transition-all hover:scale-110"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

export default function ManualUsuarioPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActiveChapter(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    chapters.forEach(ch => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const filteredChapters = searchQuery
    ? chapters.filter(ch => {
        const q = searchQuery.toLowerCase();
        return ch.title.toLowerCase().includes(q) ||
          ch.content.toLowerCase().includes(q) ||
          ch.details.some(d => d.toLowerCase().includes(q));
      })
    : chapters;

  const scrollToChapter = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tocOpen) setTocOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [tocOpen]);

  const handleDownloadWord = async () => {
    setIsExporting(true);

    let logoBase64 = "";
    if (logoRef.current) {
      const svgElement = logoRef.current.querySelector("svg");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        canvas.width = 400;
        canvas.height = 400;
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        await new Promise((resolve) => {
          img.onload = () => {
            if (ctx) { ctx.fillStyle = "white"; ctx.fillRect(0, 0, 400, 400); ctx.drawImage(img, 0, 0, 400, 400); }
            URL.revokeObjectURL(url);
            resolve(true);
          };
          img.src = url;
        });
        logoBase64 = canvas.toDataURL("image/png");
      }
    }

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Manual de Usuario - System Kyron v3.0</title>
        <style>
          @page { size: 8.5in 11in; margin: 1in; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.6; width: 100%; }
          .header { text-align: center; margin-bottom: 50pt; border-bottom: 3pt solid #0A2472; padding-bottom: 25pt; width: 100%; }
          .logo { width: 120pt; margin-bottom: 15pt; }
          h1 { color: #0A2472; font-size: 34pt; margin-bottom: 5pt; font-weight: 900; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 14pt; text-transform: uppercase; letter-spacing: 4pt; font-weight: bold; }
          h2 { color: #0A2472; border-bottom: 1.5pt solid #cbd5e1; margin-top: 50pt; padding-bottom: 12pt; font-size: 22pt; font-weight: 900; page-break-before: always; text-transform: uppercase; width: 100%; }
          h3 { color: #00A86B; font-size: 14pt; margin-top: 30pt; font-weight: 800; text-transform: uppercase; border-left: 5pt solid #00A86B; padding-left: 12pt; }
          p { margin-bottom: 20pt; text-align: justify; font-size: 12pt; color: #334155; width: 100%; line-height: 1.8; }
          .intro { font-size: 13pt; font-style: italic; color: #475569; margin-bottom: 45pt; padding: 30pt; background: #f8fafc; border-left: 6pt solid #0A2472; line-height: 1.7; }
          ul { margin-bottom: 30pt; padding-left: 35pt; width: 100%; }
          li { margin-bottom: 12pt; font-size: 11pt; color: #1e293b; text-align: justify; }
          .footer { margin-top: 80pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #e2e8f0; padding-top: 30pt; width: 100%; }
          .highlight-box { padding: 20pt; background-color: #f1f5f9; border-radius: 8pt; margin-bottom: 20pt; border: 1pt solid #e2e8f0; }
          .legal-note { font-size: 9pt; color: #64748b; font-style: italic; margin-top: 40pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Manual de Usuario Unificado v3.0</p>
          <p style="font-size: 10pt; color: #94a3b8; margin-top: 15pt;">Fecha de publicaci&oacute;n: Abril 2026</p>
        </div>
        <div class="intro">
          Este manual representa la documentaci&oacute;n unificada de System Kyron (v3.0), un ecosistema tecnol&oacute;gico integral dise&ntilde;ado por Carlos Mattar (CM), Sebasti&aacute;n Garrido (SG) y Marcos Sousa (MS). Incluye ${chapters.length} cap&iacute;tulos operativos que cubren la totalidad de los m&oacute;dulos del sistema. La plataforma es una soluci&oacute;n de misi&oacute;n cr&iacute;tica para el mercado venezolano, integrando normativas del SENIAT, CONATEL, LOTTT, VEN-NIF y otros entes reguladores. Cuenta con m&aacute;s de 80 tablas en base de datos, m&aacute;s de 60 rutas API y m&aacute;s de 10 m&oacute;dulos especializados.
        </div>
        ${chapters.map((ch, i) => `
          <div class="section">
            <h2>${String(i + 1).padStart(2, "0")}. ${ch.title}</h2>
            <p>${ch.content}</p>
            <div class="highlight-box">
              <h3>Puntos Clave:</h3>
              <ul>${ch.details.map(d => `<li>${d}</li>`).join("")}</ul>
            </div>
          </div>
        `).join("")}
        <div class="legal-note">
          Nota: System Kyron es un proyecto en etapa de Acceso Anticipado. Las funcionalidades descritas representan el dise&ntilde;o final previsto. Las referencias a entes gubernamentales se basan en las normativas vigentes a abril de 2026. Documento generado autom&aacute;ticamente por System Kyron v3.0.
        </div>
        <div class="footer">
          <p>System Kyron v3.0 &bull; Inteligencia Corporativa &bull; Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados. &bull; infosystemkyron@gmail.com</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", docContent], { type: "application/vnd.ms-word" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Manual de Usuario - System Kyron v3.0.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    toast({
      title: "Descarga completada",
      description: `La gu\u00EDa de operaciones (${chapters.length} cap\u00EDtulos) ha sido generada con \u00E9xito.`,
      action: <CheckCircle className="text-primary h-4 w-4" />,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ReadingProgress />
      <ScrollToTop />

      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Indice de capitulos"
        className={cn(
          "fixed inset-y-0 left-0 z-[90] w-80 bg-card/95 backdrop-blur-xl border-r border-border transform transition-transform duration-300 overflow-y-auto",
          tocOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-foreground">Indice</span>
          </div>
          <button onClick={() => setTocOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer" aria-label="Cerrar indice">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar capitulo..."
              aria-label="Buscar capitulo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
            />
          </div>
          <nav className="space-y-0.5">
            {filteredChapters.map((ch) => {
              const i = chapters.indexOf(ch);
              return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide transition-all group",
                  activeChapter === ch.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 transition-all",
                  activeChapter === ch.id ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                )}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{ch.title}</span>
              </button>
              );
            })}
          </nav>
        </div>
      </div>

      {tocOpen && <div className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-sm" onClick={() => setTocOpen(false)} />}

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
        <div className="absolute inset-0 hud-grid opacity-30" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="flex items-start justify-between gap-8 mb-12">
            <button
              onClick={() => setTocOpen(true)}
              aria-label="Abrir indice de capitulos"
              className="p-3 rounded-xl bg-card/60 border border-border hover:bg-card transition-all no-print"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex gap-3 no-print">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="h-11 px-5 rounded-xl border-border bg-card/50 text-foreground text-[9px] font-black uppercase tracking-widest hover:bg-card/80 transition-all"
              >
                <Printer className="mr-2 h-4 w-4" /> Imprimir
              </Button>
              <Button
                onClick={handleDownloadWord}
                disabled={isExporting}
                className="h-11 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Descargar Word
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.3em] text-primary">
              <BookOpen className="h-3 w-3" /> Manual de Usuario v3.0
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
              <span className="text-foreground">Manual de</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                Usuario
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              Documentaci&oacute;n completa de {chapters.length} m&oacute;dulos del ecosistema System Kyron. 
              Incluye gu&iacute;as de uso, especificaciones t&eacute;cnicas, sistema multimoneda, 
              m&oacute;dulos de RRHH, IT, legal, telecomunicaciones y el Modelo ZEDU AutoMind AI.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Cap&iacute;tulos</span>
                <span className="text-xl font-black text-foreground">{chapters.length}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Versi&oacute;n</span>
                <span className="text-xl font-black text-foreground">3.0</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Motor IA</span>
                <span className="text-xl font-black text-primary">Claude</span>
                <span className="text-[8px] font-bold text-muted-foreground/60 block">by Anthropic</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Actualizado</span>
                <span className="text-xl font-black text-foreground">Abr 2026</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        {filteredChapters.map((chapter) => {
          const realIdx = chapters.indexOf(chapter);
          const num = String(realIdx + 1).padStart(2, "0");

          return (
            <motion.section
              id={chapter.id}
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="scroll-mt-24"
            >
              <Card className="glass-card relative overflow-hidden rounded-2xl border-border bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 group">
                <div className={cn("absolute top-0 left-0 w-1 h-full bg-gradient-to-b", chapter.color)} />

                <div className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                  <chapter.icon className="h-32 w-32" />
                </div>

                <div className="p-8 md:p-10 pl-10 md:pl-12">
                  <div className="flex items-center gap-5 mb-8">
                    <div className={cn("flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br shadow-lg", chapter.color)}>
                      <chapter.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 block mb-1">
                        Cap&iacute;tulo {num}
                      </span>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                        {chapter.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3">
                      <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                        {chapter.content}
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-5 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-emerald-500" /> Puntos clave
                        </h4>
                        <ul className="space-y-3.5">
                          {chapter.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex gap-3 items-start text-xs text-muted-foreground leading-relaxed">
                              <span className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0 bg-gradient-to-r", chapter.color)} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        {chapter.id === "modelo-zedu" && (
                          <div className="mt-6 pt-4 border-t border-border/50">
                            <Button asChild size="sm" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
                              <Link href="/login">
                                <ExternalLink className="h-3 w-3" /> Ver documento completo
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.section>
          );
        })}

        {filteredChapters.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No se encontraron cap&iacute;tulos para &ldquo;{searchQuery}&rdquo;</p>
          </div>
        )}
      </div>

      <footer className="max-w-6xl mx-auto px-6 border-t border-border pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 opacity-30">
            {[
              { initials: "CM", name: "Carlos Mattar" },
              { initials: "SG", name: "Sebasti\u00E1n Garrido" },
              { initials: "MS", name: "Marcos Sousa" },
            ].map((p) => (
              <div key={p.initials} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground/10 border border-border flex items-center justify-center text-[9px] font-black text-foreground/60">
                  {p.initials}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground hidden md:block">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Logo className="h-8 w-8 opacity-20" />
            <p className="text-[9px] font-black text-foreground/15 uppercase tracking-[0.3em]">
              System Kyron v3.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
