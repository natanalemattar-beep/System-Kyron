"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, ShieldCheck, Zap, Calculator, Users, School,
  Download, Printer, Loader2, CircleCheck, Target, LayoutDashboard, ShoppingCart,
  Landmark, Activity, Cpu, Building2, FileText,
  Gavel, Radio, Recycle, Wallet, ChartBar as ChartColumn, BrainCircuit,
  ChevronUp, Search, ArrowLeft,
  CreditCard, Briefcase, Settings,
  DollarSign, FolderOpen, Lock,
  Headphones, Megaphone, ChevronRight
} from "lucide-react";
import { Link } from "@/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { PasswordGate } from "@/components/password-gate";

const chapters = [
  {
    id: "bienvenida",
    title: "Bienvenida al Ecosistema",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    content: `Bienvenido a la documentación unificada de System Kyron v3.0. Este legajo representa la visión técnica y operativa de un ecosistema integral diseñado para la excelencia en la gestión empresarial y ciudadana en Venezuela. Bajo la dirección estratégica de Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS), System Kyron se propone como el núcleo de inteligencia que fusiona telecomunicaciones, finanzas y cumplimiento legal automatizado. El ecosistema cuenta con más de 80 tablas en base de datos, más de 60 rutas API y más de 10 módulos especializados. Este manual detalla las capacidades técnicas disponibles para transformar la operatividad del sector privado bajo los más altos estándares de seguridad y eficiencia.`,
    details: [
      "Centralizar el 100% de las operaciones críticas en una plataforma única.",
      "Ingeniería avanzada desarrollada en el Colegio Santa Rosa de Lima.",
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
      "Guía asistida por Asistencia Técnica Directa (algoritmos de procesamiento avanzado) para la carga inicial de datos.",
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
    title: "Impuestos & Pre-Alerta Core",
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
    title: "Asesoría Legal con Asistencia Técnica Directa",
    icon: Gavel,
    color: "from-indigo-500 to-violet-500",
    content: `El módulo jurídico actúa como un Oficial de Cumplimiento virtual. Asistencia Técnica Directa — algoritmos de procesamiento avanzado — está entrenado en legislación venezolana para redactar borradores de contratos, acuerdos de confidencialidad y actas de asamblea. El Escritorio Jurídico centraliza la gestión de todos los documentos legales. El módulo de Permisología gestiona permisos, licencias y certificaciones ante SENIAT, SAREN, SAPI y otras instituciones. Monitorea registros y emite alertas sobre vencimiento de poderes o necesidad de renovar marcas comerciales.`,
    details: [
      "Generación automática de documentos legales por Asistencia Técnica Directa.",
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
    content: `Este módulo introduce la economía circular al ecosistema mediante el programa Ameru. Mediante puntos de reciclaje con tecnología de inducción magnética, los usuarios transforman residuos en activos digitales. Asistencia Técnica Directa valida el pesaje y acredita Eco-Créditos en su cuenta. Estos créditos se intercambian en el Mercado de Eco-Créditos interno, permitiendo a las empresas comprar o vender bonos verdes. Los usuarios pueden consultar su tarjeta de reciclaje desde la cuenta personal.`,
    details: [
      "Clasificación precisa de metales y plásticos por el sistema.",
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
    content: `Para garantizar el 'Cero Riesgo Fiscal', System Kyron cuenta con un Supervisor Asistencia Técnica Directa que audita transacciones las 24 horas. Detecta inconsistencias antes de que se conviertan en multas. La auditoría incluye sellado criptográfico SHA-256 y anclaje blockchain mediante raíz de Merkle en redes Polygon, Ethereum y BSC para registros inmutables. El Motor de Automatización ejecuta reglas programadas como sincronización BCV, anclaje blockchain por lotes, alertas fiscales y más, con dashboard de ejecución en tiempo real.`,
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
    icon: ChartColumn,
    color: "from-pink-500 to-rose-500",
    content: `System Kyron transforma los datos en decisiones. El generador de reportes extrae información analítica de cualquier módulo del sistema. Desde reportes de ventas por hora hasta análisis de rentabilidad por producto. Incluye resumen de negocio ejecutivo, análisis de riesgo financiero, proyecciones algorítmicas y documentos listos para auditorías del SENIAT. Todos los reportes son exportables en PDF y Excel, diseñados para juntas directivas o entes gubernamentales con total transparencia.`,
    details: [
      "Resúmenes ejecutivos para socios y directores.",
      "Proyecciones de ventas y tendencias por Asistencia Técnica Directa.",
      "Documentos listos para auditorías del SENIAT.",
      "Exportación a PDF y Excel (ExcelJS) en un clic.",
      "Análisis de riesgo financiero y alertas.",
      "Resumen de negocio con indicadores consolidados.",
      "Registro completo e inmutable de cada operación."
    ]
  },
  {
    id: "chat-ia",
    title: "Asistencia Técnica Directa — Asistencia Especializada",
    icon: BrainCircuit,
    color: "from-violet-500 to-fuchsia-500",
    content: `Asistencia Técnica Directa es el asistente inteligente del ecosistema, algoritmos de procesamiento avanzado. Ofrece 10+ identidades contextuales que se adaptan automáticamente según la sección donde se encuentre el usuario: Contador Kyron en contabilidad, Abogado Kyron en el módulo legal, Ingeniero Kyron en IT, Telecom Kyron en telecomunicaciones, y más. El chat es accesible desde cualquier página del sistema y puede responder preguntas, generar documentos, analizar datos y asistir en la toma de decisiones.`,
    details: [
      "10+ identidades contextuales según módulo activo.",
      "Generación de documentos legales y contables.",
      "Análisis fiscal predictivo y alertas proactivas.",
      "Asistencia en la clasificación de residuos Ameru.",
      "Centro de consultas accesible desde cualquier página del sistema.",
      "Motor determinista de alta velocidad Kyron Engine v3.0."
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
    content: `System Kyron ofrece 4 planes de suscripción progresivos diseñados para adaptarse a empresas de cualquier tamaño. Cada plan incluye límites específicos de recursos (usuarios, facturas, almacenamiento, módulos) que escalan con las necesidades de la organización. Los precios se expresan en USD con conversión automática a bolívares según la tasa BCV vigente. Todos los planes incluyen acceso a Asistencia Técnica Directa y soporte técnico, diferenciándose en volumen de operaciones y funcionalidades avanzadas.`,
    details: [
      "4 planes progresivos: desde emprendedores hasta corporaciones.",
      "Límites de recursos que escalan con la empresa.",
      "Facturación mensual o anual con descuento.",
      "Precios en USD con conversión BCV automática.",
      "Acceso a Asistencia Técnica Directa incluido en todos los planes.",
      "Módulos premium desbloqueables según plan."
    ]
  },
  {
    id: "modelo-zedu",
    title: "Modelo ZEDU — AutoMind Core",
    icon: School,
    color: "from-violet-500 to-fuchsia-500",
    content: `El Modelo Zedu corresponde al proyecto educativo AutoMind Core, desarrollado en el Colegio Santa Rosa de Lima, Caracas. Transforma el sistema de archivado tradicional de instituciones educativas en un entorno digital eficiente, integrando digitalización de expedientes estudiantiles y herramientas de Asistencia Técnica Directa de apoyo administrativo. AutoMind Core aplica analítica avanzada para optimizar la gestión escolar, desde matrículas hasta comunicaciones con padres y representantes.`,
    details: [
      "Digitalización y búsqueda instantánea de expedientes con OCR.",
      "Asistencia Técnica Directa: atención 24/7 vía WhatsApp y portal web.",
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
    content: `El soporte técnico de System Kyron es de grado corporativo. Incluye asistencia multicanal mediante Asistencia Técnica Directa (algoritmos de procesamiento avanzado), chat en vivo y conexión directa con el equipo de ingeniería. El sistema de notificaciones internas mantiene al usuario informado sobre actualizaciones, cambios de normativa y alertas del sistema. Estamos comprometidos con una experiencia de misión crítica: sin caídas, sin errores y con respuesta técnica inmediata.`,
    details: [
      "Resolución de dudas 24/7 mediante Asistencia Técnica Directa.",
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
      "Tutoriales por módulo con asistente Asistencia Técnica Directa."
    ]
  }
];

const TOTAL_CHAPTERS = chapters.length;

function ProgressBar() {
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

function BookCover() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-8">
          <Lock className="h-3.5 w-3.5" /> Documento Confidencial
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] mb-6">
          <span className="text-foreground">SYSTEM</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            KYRON
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto mb-8 rounded-full" />
        <p className="text-2xl sm:text-3xl font-bold text-muted-foreground mb-4 tracking-tight">
          Manual de Usuario
        </p>
        <p className="text-lg text-muted-foreground/60 font-medium mb-12">
          Edición Corporativa — v3.0
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">{TOTAL_CHAPTERS}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Capítulos</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">3.0</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Versión</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-primary">2026</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Edición</p>
          </div>
          <div className="p-4 rounded-2xl bg-card/60 border border-border">
            <p className="text-2xl font-black text-foreground">VZLA</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Origen</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TableOfContents({ onChapterClick }: { onChapterClick: (id: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <BookOpen className="h-3.5 w-3.5" /> Tabla de Contenidos
        </div>
        <p className="text-sm text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          {TOTAL_CHAPTERS} capítulos que cubren la totalidad de los módulos del ecosistema System Kyron.
          Selecciona un capítulo para navegar directamente.
        </p>
        <div className="grid gap-2">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => onChapterClick(ch.id)}
              className="group flex items-center gap-4 w-full text-left p-4 rounded-2xl bg-card/30 hover:bg-card/60 border border-border/50 hover:border-border transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg" style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                ...(ch.color.startsWith('from-') ? {} : { background: ch.color })
              }}>
                <ch.icon className="h-4 w-4 text-white" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider">
                  Capítulo {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {ch.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function BookManualUsuarioPage() {
  const [, setActiveChapter] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollToChapter = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;

      const docHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>System Kyron — Manual de Usuario v3.0</title>
          <style>
            @page { margin: 0; size: A4 portrait; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: #1e293b; background: #fff; }
            .page { width: 210mm; min-height: 297mm; padding: 25mm 20mm 20mm; position: relative; page-break-after: always; }
            .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 297mm; padding: 30mm 20mm; background: linear-gradient(135deg, #0a0f1e 0%, #0A2472 50%, #0d1b3e 100%); color: #fff; text-align: center; }
            .cover h1 { font-size: 52pt; font-weight: 900; letter-spacing: -2pt; line-height: 1; margin-bottom: 10pt; }
            .cover h1 span { background: linear-gradient(135deg, #4fc3f7, #00E5FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .cover .subtitle { font-size: 22pt; font-weight: 700; color: rgba(255,255,255,0.7); margin-bottom: 40pt; text-transform: uppercase; letter-spacing: 6pt; }
            .cover .divider { width: 80pt; height: 3pt; background: linear-gradient(90deg, #4fc3f7, #00E5FF); border-radius: 2pt; margin: 0 auto 30pt; }
            .cover .meta { display: flex; gap: 15pt; justify-content: center; flex-wrap: wrap; }
            .cover .meta-item { padding: 12pt 20pt; border: 1px solid rgba(255,255,255,0.15); border-radius: 8pt; background: rgba(255,255,255,0.05); }
            .cover .meta-item .num { font-size: 24pt; font-weight: 900; }
            .cover .meta-item .label { font-size: 8pt; text-transform: uppercase; letter-spacing: 3pt; color: rgba(255,255,255,0.4); margin-top: 4pt; }
            .cover .badge { display: inline-block; padding: 6pt 16pt; border: 1px solid rgba(79,195,247,0.3); border-radius: 20pt; font-size: 8pt; text-transform: uppercase; letter-spacing: 3pt; color: #4fc3f7; margin-bottom: 30pt; background: rgba(79,195,247,0.1); }
            .chapter { padding: 20mm 18mm 15mm; page-break-after: always; }
            .chapter-header { display: flex; align-items: center; gap: 12pt; margin-bottom: 20pt; }
            .chapter-number { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 3pt; color: #94a3b8; }
            .chapter-title { font-size: 22pt; font-weight: 900; color: #0A2472; line-height: 1.2; }
            .chapter-body { font-size: 11pt; line-height: 1.8; color: #475569; text-align: justify; margin-bottom: 20pt; }
            .chapter-divider { width: 100%; height: 1pt; background: #e2e8f0; margin: 25pt 0 20pt; }
            .key-points-title { font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 2pt; color: #00A86B; margin-bottom: 12pt; display: flex; align-items: center; gap: 6pt; }
            .key-points { list-style: none; padding: 0; }
            .key-points li { font-size: 10pt; color: #334155; line-height: 1.6; margin-bottom: 8pt; padding-left: 14pt; position: relative; }
            .key-points li::before { content: ''; position: absolute; left: 0; top: 7pt; width: 5pt; height: 5pt; border-radius: 50%; background: #00A86B; }
            .footer-note { margin-top: 30pt; padding-top: 15pt; border-top: 1pt solid #e2e8f0; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; }
            .toc { padding: 20mm 18mm; page-break-after: always; }
            .toc h2 { font-size: 18pt; font-weight: 900; color: #0A2472; margin-bottom: 6pt; }
            .toc p { font-size: 10pt; color: #64748b; margin-bottom: 20pt; }
            .toc-item { display: flex; align-items: center; gap: 10pt; padding: 8pt 12pt; border-bottom: 1px solid #f1f5f9; }
            .toc-num { font-size: 9pt; font-weight: 700; color: #0A2472; width: 30pt; }
            .toc-title { font-size: 10pt; font-weight: 600; color: #1e293b; }
            .legal { text-align: center; padding: 20mm; font-size: 8pt; color: #94a3b8; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="page cover">
            <div class="badge">Documento Privado</div>
            <h1>SYSTEM<br><span>KYRON</span></h1>
            <div class="divider"></div>
            <p class="subtitle">Manual de Usuario</p>
            <div class="meta">
              <div class="meta-item"><div class="num">${chapters.length}</div><div class="label">Capítulos</div></div>
              <div class="meta-item"><div class="num">3.0</div><div class="label">Versión</div></div>
              <div class="meta-item"><div class="num">2026</div><div class="label">Edición</div></div>
              <div class="meta-item"><div class="num">VZLA</div><div class="label">Origen</div></div>
            </div>
          </div>

          <div class="page toc">
            <h2>Tabla de Contenidos</h2>
            <p>${chapters.length} capítulos que cubren la totalidad de los módulos del ecosistema System Kyron.</p>
            ${chapters.map((ch, i) => `
              <div class="toc-item">
                <span class="toc-num">${String(i + 1).padStart(2, "0")}</span>
                <span class="toc-title">${ch.title}</span>
              </div>
            `).join("")}
          </div>

          ${chapters.map((ch, i) => `
            <div class="page chapter">
              <div class="chapter-header">
                <span class="chapter-number">Capítulo ${String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 class="chapter-title">${ch.title}</h2>
              <div class="chapter-divider"></div>
              <p class="chapter-body">${ch.content}</p>
              <div class="key-points-title">Puntos Clave</div>
              <ul class="key-points">
                ${ch.details.map(d => `<li>${d}</li>`).join("")}
              </ul>
              <div class="footer-note">
                <span>System Kyron v3.0</span>
                <span>Capítulo ${String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          `).join("")}

          <div class="page legal">
            <p>System Kyron v3.0 — Inteligencia Corporativa — Caracas, Venezuela</p>
            <p style="margin-top:6pt;">© 2026 Todos los derechos reservados.</p>
          </div>
        </body>
        </html>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:fixed;left:-9999px;top:0;width:210mm;';
      tempDiv.innerHTML = docHtml;
      document.body.appendChild(tempDiv);

      await html2pdf()
        .set({
          margin: 0,
          filename: "System-Kyron-Manual-Usuario-v3.0.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            width: 2100,
            height: 2970
          },
          jsPDF: {
            unit: 'px',
            format: [2100, 2970],
            orientation: 'portrait'
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
          }
        })
        .from(tempDiv)
        .save();

      document.body.removeChild(tempDiv);

      toast({
        title: "PDF generado",
        description: `Libro completo (${chapters.length} capítulos) descargado.`,
        action: <CircleCheck className="text-primary h-4 w-4" />,
      });
    } catch {
      toast({ title: "Error al generar PDF", description: "Ocurrió un error al exportar.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const { toast } = useToast();

  return (
    <PasswordGate title="Manual de Usuario — System Kyron">
      <div className="min-h-screen bg-background text-foreground relative">
        <ProgressBar />

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver al inicio"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/90 text-white shadow-lg shadow-primary/30 hover:bg-primary transition-all hover:scale-110"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        )}

        <header className="relative overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
            <Link href="/brand-kit" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Brand Kit
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="text-[10px] font-bold uppercase tracking-widest rounded-xl"
              >
                <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="text-[10px] font-bold uppercase tracking-widest rounded-xl"
              >
                {isExporting ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Download className="mr-2 h-3.5 w-3.5" />}
                {isExporting ? "Generando..." : "PDF"}
              </Button>
            </div>
          </div>
        </header>

        <BookCover />

        <TableOfContents onChapterClick={scrollToChapter} />

        <div className="max-w-5xl mx-auto px-6 pb-24" ref={contentRef}>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden lg:block" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden lg:block" />

            <div className="space-y-24 relative">
              {chapters.map((chapter, index) => {
                const num = String(index + 1).padStart(2, "0");
                return (
                  <motion.section
                    key={chapter.id}
                    id={chapter.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="scroll-mt-24"
                  >
                    <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 group">
                      <div className={cn("absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b", chapter.color)} />

                      <div className="p-8 md:p-12 pl-10 md:pl-14">
                        <div className="flex items-center gap-5 mb-10">
                          <div className={cn("flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br shadow-lg", chapter.color)}>
                            <chapter.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 block mb-1">
                              Capítulo {num} de {TOTAL_CHAPTERS}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                              {chapter.title}
                            </h2>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-10">
                          <div className="lg:col-span-3">
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                              {chapter.content}
                            </p>
                          </div>
                          <div className="lg:col-span-2">
                            <div className="p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/50">
                              <div className="flex items-center gap-2 mb-6">
                                <CircleCheck className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                                  Puntos Clave
                                </span>
                              </div>
                              <ul className="space-y-4">
                                {chapter.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gradient-to-r", chapter.color)} />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-border/40 flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
                            System Kyron v3.0 — Capítulo {num}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
                            Pág. {index + 1}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.section>
                );
              })}

              {chapters.length === 0 && (
                <div className="text-center py-20">
                  <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">No se encontraron capítulos para &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="border-t border-border/50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/60 border border-border">
                  <Lock className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Confidencial</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/60 border border-border">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Verificado</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  System Kyron v3.0 &bull; Caracas, Venezuela
                </p>
                <p className="text-[9px] text-muted-foreground/30 mt-1">
                  &copy; 2026 Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PasswordGate>
  );
}
