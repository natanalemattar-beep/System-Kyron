"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { BookOpen, ShieldCheck, Zap, Calculator, Users, Lock, Smartphone, School, Download, Printer, ChevronLeft, Loader as Loader2, CircleCheck as CheckCircle, Target, LayoutDashboard, ShoppingCart, Clock, ShieldAlert, History, Scale, Landmark, Globe, Coins, Activity, Cpu, MessageSquare, Building2, FileText, Gavel, Radio, Recycle, Wallet, ChartBar as BarChart3, BrainCircuit, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const chapters = [
  {
    id: "bienvenida",
    title: "01. Bienvenida al Ecosistema",
    icon: Target,
    content: `Bienvenido a la documentación unificada de System Kyron. Este legajo representa la visión técnica y operativa de un ecosistema integral diseñado para la excelencia en la gestión empresarial y ciudadana en Venezuela. Bajo la dirección estratégica de Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS), System Kyron se propone como el núcleo de inteligencia que fusiona telecomunicaciones, finanzas blockchain y cumplimiento legal automatizado. Este manual detalla las capacidades técnicas previstas para transformar la operatividad del sector privado bajo los más altos estándares de seguridad y eficiencia.`,
    details: [
      "Propósito: Centralizar el 100% de las operaciones críticas en una plataforma única.",
      "Identidad: Desarrollo de ingeniería soberana nacido en el Colegio Gabriela Mistral.",
      "Visión 2026: Preparar a las empresas para la economía digital inmutable.",
      "Escalabilidad: Áreas independientes que crecen con su organización."
    ]
  },
  {
    id: "empezar",
    title: "02. Cómo empezar",
    icon: Zap,
    content: `El despliegue de System Kyron está diseñado para ser fluido e intuitivo. Al iniciar, el sistema le guiará a través de una configuración inicial donde definirá el perfil de su organización o identidad personal. Nuestra propuesta incluye un asistente de configuración que mapea automáticamente sus necesidades según el sector económico, asegurando que los módulos de FACTURACIÓN, CONTABILIDAD y RECURSOS HUMANOS se activen con los parámetros legales correspondientes a su jurisdicción.`,
    details: [
      "Perfil Consolidado: Registro de RIF, Razón Social y datos de contacto oficiales.",
      "Selector de Áreas: Activación bajo demanda de las 10 secciones principales.",
      "Onboarding IA: Guía asistida por voz y texto para la carga inicial de datos.",
      "Multilingüe: Soporte completo para operaciones nacionales e internacionales."
    ]
  },
  {
    id: "seguridad",
    title: "03. Protegiendo tu cuenta",
    icon: ShieldCheck,
    content: `La seguridad en System Kyron no es una opción, es la base de nuestra arquitectura. El sistema implementa el 'Protocolo de Seguridad Nivel 5', que combina cifrado de grado militar AES-512 con autenticación biométrica 3D. Para proteger sus activos digitales, la propuesta incluye la validación obligatoria de Dos Factores (2FA). Cada vez que se intente un acceso sensible, el sistema requerirá una confirmación desde su terminal MI LÍNEA 5G vinculado, garantizando que solo el titular posea la llave de desencriptación de la Bóveda Protegida.`,
    details: [
      "Cifrado Inmutable: Sus documentos se sellan mediante tecnología Blockchain.",
      "Auth Nivel 5: Reconocimiento facial y dactilar estándar eIDAS.",
      "Alertas de Intrusión: Notificaciones instantáneas ante intentos de acceso no autorizados.",
      "Zero-Knowledge: Ni siquiera nuestros administradores pueden ver su data privada."
    ]
  },
  {
    id: "tablero",
    title: "04. Tablero de herramientas",
    icon: LayoutDashboard,
    content: `El portal central de System Kyron es un espejo de la salud de su negocio. El tablero ha sido diseñado para mostrar KPIs (Indicadores Clave de Desempeño) en tiempo real. Podrá visualizar el pulso financiero, la telemetría de red y el impacto ambiental desde una única consola. La interfaz utiliza glassmorphism para reducir la carga cognitiva, permitiendo que el operador identifique anomalías o éxitos mediante códigos de colores vivos y alertas visuales dinámicas.`,
    details: [
      "Visión 360°: Resumen consolidado de las 10 áreas de gestión.",
      "Personalización: Ajuste el tablero según su rol (Gerente, Contador, Operador).",
      "Telemetría en Vivo: Datos actualizados al segundo sin necesidad de recarga.",
      "Acceso Multi-Portal: Salte entre su cuenta personal y corporativa con un clic."
    ]
  },
  {
    id: "contabilidad",
    title: "05. CONTABILIDAD",
    icon: Calculator,
    content: `Nuestra propuesta contable revoluciona el cumplimiento en Venezuela al alinearse estrictamente con las normas VEN-NIF. El sistema está diseñado para procesar automáticamente los asientos diarios, integrando las ventas del TPV y los gastos registrados. La funcionalidad más avanzada incluye la gestión multimoneda con tasas oficiales del BCV y el cálculo automático del Reajuste por Inflación Fiscal (RIPF), utilizando los índices INPC publicados por el BCV para asegurar que sus estados financieros reflejen la realidad económica del país.`,
    details: [
      "Normativa VEN-NIF: Adaptación total a los principios contables nacionales.",
      "Gestión Multimoneda: Conversión síncrona en Bs., USD y EUR según el BCV.",
      "RIPF Automatizado: Ajuste de activos no monetarios sin errores manuales.",
      "Balances al Minuto: Estado de Situación y Ganancias y Pérdidas siempre listos."
    ]
  },
  {
    id: "impuestos",
    title: "06. Impuestos (Pre-Alerta IA)",
    icon: Landmark,
    content: `El cumplimiento ante el SENIAT es de misión crítica. System Kyron incorpora un motor de 'Pre-Alerta de Impuestos' que notifica al usuario con 15, 7 y 3 días de antelación sobre cada vencimiento. El sistema está diseñado para calcular automáticamente el IVA, las retenciones de ISLR y el IGTF (3%) según el método de pago utilizado. Al automatizar estos procesos según la Providencia SNAT/2011/0071, nuestra propuesta ayuda a evitar multas que pueden alcanzar 1.000 veces el tipo de cambio oficial por declaraciones extemporáneas.`,
    details: [
      "Formatos Homologados: Generación automática de libros de Compra y Venta.",
      "Cálculo de IGTF: Aplicación del 3% en transacciones de divisas al instante.",
      "Blindaje contra Multas: Notificaciones proactivas para cumplimiento a tiempo.",
      "Archivos .txt: Exportación de archivos listos para el portal fiscal."
    ]
  },
  {
    id: "empleados",
    title: "07. RECURSOS HUMANOS",
    icon: Users,
    content: `La gestión del talento bajo System Kyron garantiza el respeto total a la LOTTT. El sistema está diseñado para calcular nóminas, vacaciones, utilidades y prestaciones sociales de forma transparente. Innovamos con la entrega de recibos de pago firmados digitalmente a través de WhatsApp, con plena validez legal. Además, para fomentar un clima organizacional de excelencia, el sistema incluirá el envío automático de mensajes motivacionales y reconocimientos de logros al personal, fortaleciendo el compromiso del equipo.`,
    details: [
      "Aportes Parafiscales: Cálculo automático de IVSS, FAOV e INCES.",
      "Recibos WhatsApp: Notificación instantánea y ecológica de pagos.",
      "Mensajes de Incentivo: Reconocimiento automatizado de metas y cumpleaños.",
      "Dossier Digital: Resguardo de títulos, contratos y solvencias de salud."
    ]
  },
  {
    id: "tpv",
    title: "08. FACTURACIÓN (Punto de Venta)",
    icon: ShoppingCart,
    content: `El área de FACTURACIÓN integra un Punto de Venta (TPV) de alta velocidad que respeta estrictamente el horario laboral configurado por la gerencia. Si un operador intenta procesar una venta fuera de su turno, el sistema bloqueará la transacción, requiriendo autorización de un gerente con clave de acceso. Esta funcionalidad, junto con la homologación de equipos fiscales, asegura un control total sobre el inventario y los ingresos, eliminando el riesgo de ventas no registradas o discrepancias en el arqueo de caja.`,
    details: [
      "Control de Horario: Bloqueo automático del TPV fuera del tiempo laboral.",
      "Venta Multimoneda: Cobro mixto (Bs./Divisas) con cálculo exacto de IGTF.",
      "Inventario Síncrono: Actualización de existencias con cada transacción.",
      "Autorización Especial: Registro de excepciones supervisadas por gerencia."
    ]
  },
  {
    id: "legal",
    title: "09. ASESORÍA LEGAL (IA)",
    icon: Gavel,
    content: `El área jurídica de System Kyron actúa como un Oficial de Cumplimiento virtual. Nuestra IA está entrenada en leyes venezolanas para ayudarle a redactar borradores de contratos de arrendamiento, acuerdos de confidencialidad y actas de asamblea. Además, el sistema monitorea los registros ante el SAREN y el SAPI, emitiendo alertas sobre el vencimiento de poderes de representación o la necesidad de renovar marcas comerciales, asegurando que la estructura legal de su empresa sea inexpugnable.`,
    details: [
      "Redacción Jurídica: Generación de documentos basados en leyes vigentes.",
      "Alerta de Poderes: Avisos preventivos antes de la caducidad de facultades.",
      "Gestión SAPI: Control de registros de marca y patentes de invención.",
      "Protocolos SAREN: Organización de documentos públicos y notariales."
    ]
  },
  {
    id: "telecom",
    title: "10. MI LÍNEA 5G",
    icon: Radio,
    content: `Kyron opera como un centro de telecomunicaciones de vanguardia bajo normativas de CONATEL. Nuestra propuesta permite la activación inmediata de líneas móviles mediante eSIM (chips digitales), eliminando la logística física. Las empresas pueden gestionar flotas de datos 5G para sus empleados con priorización de red (Network Slicing), garantizando que las aplicaciones de gestión tengan siempre la máxima velocidad y estabilidad, incluso en zonas de alta congestión.`,
    details: [
      "Activación eSIM: Provisión de servicio telefónico en minutos vía código QR.",
      "Equipos Homologados: Garantía de cumplimiento con los estándares de CONATEL.",
      "Control de Flotas: Gestión centralizada de consumo para planes corporativos.",
      "Conectividad 5G: Acceso a la red de mayor velocidad y menor latencia."
    ]
  },
  {
    id: "sostenibilidad",
    title: "11. SOSTENIBILIDAD (Reciclaje)",
    icon: Recycle,
    content: `Esta sección de System Kyron introduce la economía circular al ecosistema. Mediante el uso de nuestros puntos de reciclaje con tecnología de inducción magnética, los usuarios pueden transformar residuos en activos digitales. El sistema valida el pesaje por IA y acredita Eco-Créditos en su cuenta. Estos créditos pueden ser intercambiados en el 'Mercado de Eco-Créditos' interno, permitiendo a las empresas comprar o vender bonos verdes, creando una nueva línea de ingresos basada en la responsabilidad ambiental.`,
    details: [
      "Tecnología Magnética: Clasificación precisa de metales y plásticos.",
      "Mercado de Créditos: Exchange descentralizado de activos ambientales.",
      "Billetera Verde: Acumulación de puntos canjeables por servicios Kyron.",
      "Certificación CO₂: Reportes de impacto ambiental para balance social."
    ]
  },
  {
    id: "ingenieria",
    title: "12. INGENIERÍA E IT",
    icon: Cpu,
    content: `El área de ingeniería proporciona herramientas de planificación técnica avanzada. Está diseñada para empresas que manejan infraestructura, permitiendo generar presupuestos de obra detallados y planos básicos mediante inferencia de IA. El sistema ayuda a controlar los costos de materiales y mano de obra, integrándose con el módulo de CONTABILIDAD para una ejecución presupuestaria impecable y sin desviaciones financieras.`,
    details: [
      "Cómputos Métricos: Cálculo automático de materiales por área.",
      "Presupuestos Técnicos: Análisis de costos unitarios y márgenes de obra.",
      "Inferencia de Planos: Generación de layouts arquitectónicos con IA.",
      "Soporte Crítico: Monitoreo de servidores y servicios de infraestructura."
    ]
  },
  {
    id: "reportes",
    title: "13. Reportes",
    icon: BarChart3,
    content: `System Kyron transforma los datos en decisiones. El generador de reportes permite extraer información analítica de cualquier área del sistema. Podrá obtener desde reportes de ventas por hora hasta análisis de rentabilidad por producto. Todos los reportes son exportables en formatos PDF y Excel, y están diseñados para ser presentados ante juntas directivas o entes gubernamentales con total transparencia y profesionalismo.`,
    details: [
      "Reportes Ejecutivos: Resúmenes de alto nivel para socios y directores.",
      "Análisis de Tendencias: Proyecciones de ventas basadas en IA.",
      "Exportación Fiscal: Documentos listos para auditorías del SENIAT.",
      "Historial de Operaciones: Registro completo de cada acción en el sistema."
    ]
  },
  {
    id: "billetera",
    title: "14. Billetera Digital",
    icon: Wallet,
    content: `La Billetera Digital de Kyron es el centro financiero del ecosistema. Permite realizar pagos instantáneos entre usuarios de la plataforma (empleados y proveedores) sin comisiones. Los fondos pueden provenir de ventas, transferencias bancarias o del canje de Eco-Créditos. Nuestra propuesta financiera busca agilizar la liquidez empresarial, permitiendo que el dinero circule de forma segura y verificada dentro del ecosistema inmutable de Kyron.`,
    details: [
      "Pagos P2P/B2B: Transferencias inmediatas dentro de la red Kyron.",
      "Canje de Puntos: Transformación de Eco-Créditos en saldo real.",
      "Custodia Segura: Protección de fondos bajo protocolos de cifrado nivel 5.",
      "Historial Blockchain: Cada pago queda sellado para evitar fraudes."
    ]
  },
  {
    id: "auditoria",
    title: "15. Auditoría (Supervisor 24/7)",
    icon: Activity,
    content: `Para garantizar el 'Cero Riesgo Fiscal', System Kyron cuenta con un Supervisor IA que audita las transacciones las 24 horas del día. Esta herramienta detecta inconsistencias antes de que se conviertan en multas, como RIFs vencidos de proveedores o cálculos erróneos de retenciones. El sistema sugiere correcciones automáticas y asegura que la data que llega a sus libros contables sea 100% veraz y cumpla con las leyes venezolanas actuales.`,
    details: [
      "Detección Temprana: Identificación de errores en base imponible o IGTF.",
      "Validación de Terceros: Chequeo automático de estatus de proveedores.",
      "Supervisor Permanente: El sistema nunca duerme ni omite validaciones.",
      "Score de Cumplimiento: Medición del riesgo fiscal de su empresa."
    ]
  },
  {
    id: "documentos-personales",
    title: "16. Documentos personales",
    icon: FileText,
    content: `El portal de CUENTA PERSONAL incluye una bóveda para trámites civiles. El ciudadano podrá gestionar y resguardar copias certificadas de partidas de nacimiento, actas de matrimonio y documentos judiciales. Nuestra propuesta incluye la integración con el marco legal de la LOPNNA, permitiendo calcular automáticamente obligaciones de manutención basadas en los ingresos y el índice inflacionario del BCV, garantizando los derechos de los menores.`,
    details: [
      "Bóveda Civil: Resguardo de documentos de identidad y propiedad.",
      "LOPNNA Sync: Cálculo de pensión alimenticia con ajuste inflacionario.",
      "Trámites Ante SAREN: Seguimiento de documentos personales.",
      "Identidad Digital: Su ficha única para todos los servicios del Estado."
    ]
  },
  {
    id: "conexion-bancaria",
    title: "17. Conexión bancaria",
    icon: Landmark,
    content: `System Kyron está diseñado para integrarse con las principales instituciones financieras del país. Esta conexión permite la conciliación bancaria automática, donde el sistema compara sus registros contables con los movimientos de sus cuentas. Nuestra propuesta tecnológica busca reducir el tiempo de oficina en un 80% al automatizar el reconocimiento de pagos móviles, transferencias y cargos por servicios bancarios.`,
    details: [
      "Conciliación IA: Apareo inteligente de transacciones bancarias.",
      "Sincronización BCV: Actualización diaria de tasas de cambio.",
      "Control de Caja: Cuadre entre bancos y efectivo en tiempo real.",
      "Seguridad Bancaria: Enlaces cifrados mediante protocolos de alta seguridad."
    ]
  },
  {
    id: "academia",
    title: "18. Academia Kyron",
    icon: School,
    content: `Creemos en la formación continua. La Academia Kyron es un portal educativo donde los operadores pueden aprender a usar cada área del sistema mediante cursos certificados. El conocimiento generado en el Colegio Gabriela Mistral se transfiere a los usuarios para que dominen la ingeniería fiscal y técnica del sistema, convirtiéndose en profesionales más competentes y capaces de liderar la transformación digital en sus empresas.`,
    details: [
      "Cursos Certificados: Validación de competencias en gestión Kyron.",
      "Tutoriales en Video: Guías visuales paso a paso de cada funcionalidad.",
      "Actualización Legal: Webinars sobre cambios en Gacetas Oficiales.",
      "Biblioteca Técnica: Acceso a manuales, guías y casos de éxito."
    ]
  },
  {
    id: "locales",
    title: "19. Múltiples sedes",
    icon: Building2,
    content: `Para las empresas en expansión, System Kyron ofrece gestión multi-local. Podrá controlar inventarios, ventas y personal de diferentes sedes desde una cuenta ejecutiva de SOCIOS Y DIRECTIVOS. El sistema permite consolidar la operación global del negocio manteniendo la independencia administrativa de cada punto, ideal para franquicias o holdings que operan en distintos estados de Venezuela o a nivel internacional.`,
    details: [
      "Consolidación Global: Reportes unificados de todos sus puntos de venta.",
      "Transferencias de Stock: Movimiento de mercancía entre locales.",
      "Gestión Jerárquica: Permisos diferenciados por gerente de sede.",
      "Visión en Tiempo Real: Sepa qué ocurre en cada local al instante."
    ]
  },
  {
    id: "soporte",
    title: "20. Soporte",
    icon: MessageSquare,
    content: `El soporte técnico de System Kyron es de grado corporativo. Nuestra propuesta incluye asistencia multicanal mediante chat IA, voz y conexión directa con nuestros ingenieros. En el manual de usuario, encontrará los protocolos para reportar incidencias o solicitar nuevas funcionalidades. Estamos comprometidos con que su experiencia sea de misión crítica: sin caídas, sin errores y con una respuesta técnica inmediata ante cualquier desafío operativo.`,
    details: [
      "Asistente de Voz: Resolución de dudas mediante IA conversacional.",
      "Tickets de Servicio: Seguimiento transparente de requerimientos técnicos.",
      "Mantenimiento Proactivo: Actualizaciones de sistema sin interrupciones.",
      "Comunidad Kyron: Foro de usuarios para compartir mejores prácticas."
    ]
  },
  {
    id: "modelo-zedu",
    title: "21. Modelo ZEDU — AutoMind AI",
    icon: BrainCircuit,
    content: `El Modelo Zedu de System Kyron corresponde al proyecto educativo AutoMind AI, desarrollado por Miguel Uzcategui, Miguel Angel Goites y Joaquin de Barros en el Colegio Santa Rosa de Lima, Caracas. Este proyecto transforma el sistema de archivado tradicional de instituciones educativas en un entorno digital eficiente, integrando digitalización de expedientes estudiantiles, un chatbot de atención automatizada para representantes y herramientas de inteligencia artificial de apoyo administrativo. El documento completo del Modelo Zedu — incluyendo análisis del problema, solución propuesta, presupuesto, aliados y plan de acción — está disponible en la sección Sector Privado del portal. Puede imprimirlo o descargarlo en formato Word (.doc) desde esa misma página.`,
    details: [
      "Equipo: Miguel Uzcategui, Miguel Angel Goites, Joaquin de Barros — Colegio Santa Rosa de Lima.",
      "Módulo de Archivo Digital: Digitalización y búsqueda instantánea de expedientes estudiantiles con OCR.",
      "Chatbot IA: Atención automatizada a representantes 24/7 vía WhatsApp y portal web.",
      "Asistente Administrativo IA: Generación de reportes, circulares y análisis estratégico para la dirección.",
      "Acceso directo: Disponible dentro de la plataforma (requiere inicio de sesión) con opción de descarga en Word."
    ]
  }
];

export default function ManualUsuarioPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

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
                    if (ctx) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, 400, 400);
                        ctx.drawImage(img, 0, 0, 400, 400);
                    }
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
        <title>Manual de Usuario - System Kyron v2.6.5</title>
        <style>
          @page { size: 8.5in 11in; margin: 1in; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.6; width: 100%; }
          .header { text-align: center; margin-bottom: 50pt; border-bottom: 3pt solid #0A2472; padding-bottom: 25pt; width: 100%; }
          .logo { width: 120pt; margin-bottom: 15pt; }
          h1 { color: #0A2472; font-size: 34pt; margin-bottom: 5pt; font-weight: 900; text-transform: uppercase; }
          .subtitle { color: #64748b; font-size: 14pt; text-transform: uppercase; letter-spacing: 4pt; font-weight: bold; }
          
          h2 { color: #0A2472; border-bottom: 1.5pt solid #cbd5e1; margin-top: 50pt; padding-bottom: 12pt; font-size: 24pt; font-weight: 900; page-break-before: always; text-transform: uppercase; width: 100%; }
          h3 { color: #00A86B; font-size: 16pt; margin-top: 30pt; font-weight: 800; text-transform: uppercase; border-left: 5pt solid #00A86B; padding-left: 12pt; }
          
          p { margin-bottom: 20pt; text-align: justify; font-size: 12.5pt; color: #334155; width: 100%; line-height: 1.8; }
          .intro { font-size: 15pt; font-style: italic; color: #475569; margin-bottom: 45pt; padding: 30pt; background: #f8fafc; border-left: 6pt solid #0A2472; line-height: 1.7; }
          
          ul { margin-bottom: 30pt; padding-left: 35pt; width: 100%; }
          li { margin-bottom: 14pt; font-size: 12pt; color: #1e293b; text-align: justify; }
          
          .footer { margin-top: 100pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #e2e8f0; padding-top: 30pt; width: 100%; }
          .highlight-box { padding: 20pt; background-color: #f1f5f9; border-radius: 15pt; margin-bottom: 20pt; border: 1pt solid #e2e8f0; }
          .legal-note { font-size: 9pt; color: #64748b; font-style: italic; margin-top: 40pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="subtitle">Guía de Operaciones Unificada v2.6.5</p>
        </div>

        <div class="intro">
          Este manual representa la documentación unificada de System Kyron (v2.6.5), un ecosistema tecnológico integral diseñado por Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS). Incluye 21 capítulos operativos, entre ellos el Capítulo 21 dedicado al Modelo ZEDU — proyecto AutoMind AI del Colegio Santa Rosa de Lima. La plataforma se proyecta como una solución de misión crítica para el mercado venezolano en 2026, integrando normativas del SENIAT, CONATEL, LOTTT y otros entes reguladores. Esta guía detalla las capacidades previstas para garantizar la excelencia operativa y el cumplimiento legal absoluto de su organización.
        </div>

        ${chapters.map((ch) => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <div class="highlight-box">
                <h3>Capacidades y Puntos Clave:</h3>
                <ul>
                ${ch.details.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
          </div>
        `).join('')}

        <div class="legal-note">
            Nota: System Kyron es un proyecto en etapa de propuesta tecnológica. Las funcionalidades descritas en este manual representan el diseño final previsto para el lanzamiento oficial. Las referencias a entes gubernamentales (SENIAT, CONATEL, etc.) se basan en las normativas y Gacetas Oficiales proyectadas a marzo de 2026.
        </div>

        <div class="footer">
          <p>System Kyron • Inteligencia Corporativa · Riesgo Cero • Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados bajo Protocolo de Integridad Central.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Guía de usuario System Kyron.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "PROTOCOLO DE DESCARGA FINALIZADO",
        description: "La guía de operaciones detallada (21 capítulos, incluye Modelo ZEDU) ha sido generada con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> DOCUMENTACIÓN UNIFICADA v2.6.5
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-foreground italic-shadow leading-none">
            Guía de <span className="text-primary not-italic">Usuario</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Consolidado Técnico de 21 Capítulos • Incluye Modelo ZEDU AutoMind AI • CM | SG | MS
            </p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl border-border bg-card/50 text-foreground text-[9px] font-black uppercase tracking-widest hover:bg-card/80 transition-all">
                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
            </Button>
            <Button 
                onClick={handleDownloadWord} 
                disabled={isExporting}
                className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl"
            >
                {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                DESCARGAR WORD (.DOC)
            </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-16 pb-32">
        {chapters.map((chapter, idx) => (
          <motion.section 
            id={chapter.id}
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="scroll-mt-32"
          >
            <Card className="glass-card border-border rounded-[2.5rem] bg-card/40 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-48 w-48 rotate-12" />
              </div>
              
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-20 bg-muted/30 border-r border-border flex items-center justify-center p-6 lg:p-0">
                    <span className="text-3xl font-black text-foreground/5 uppercase lg:vertical-text tracking-tighter">
                        CAP 0{idx + 1}
                    </span>
                </div>

                <div className="flex-1 p-8 md:p-12 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                            <chapter.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-foreground">{chapter.title}</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-base md:text-lg font-medium italic text-muted-foreground leading-relaxed text-justify">
                                {chapter.content}
                            </p>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-border shadow-inner flex flex-col">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-foreground/30 mb-8 flex items-center gap-3">
                                <CheckCircle className="h-4 w-4 text-emerald-500" /> Puntos clave de gestión
                            </h4>
                            <ul className="space-y-6 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed flex-grow">
                                {chapter.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex gap-4 items-start">
                                        <span className="text-primary font-black text-lg leading-none">»</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                            {chapter.id === "modelo-zedu" && (
                                <div className="mt-8 pt-6 border-t border-border">
                                    <Button asChild className="w-full btn-3d-primary rounded-xl font-black text-[10px] uppercase tracking-widest gap-2">
                                        <Link href="/login">
                                            <ExternalLink className="h-4 w-4" /> INICIAR SESIÓN PARA VER DOCUMENTO
                                        </Link>
                                    </Button>
                                </div>
                            )}
                            {chapter.id !== "modelo-zedu" && (
                                <div className="mt-8 pt-6 border-t border-border">
                                    <p className="text-[8px] font-black text-muted-foreground/20 uppercase tracking-[0.4em]">Protocolo Verificado v2.6.5</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
              </div>
            </Card>
          </motion.section>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto border-t border-border pt-20 pb-10 text-center space-y-12">
        <div className="flex justify-center gap-12 opacity-20">
            <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-[10px] font-black text-background">CM</div>
                <span className="text-[8px] font-black uppercase">Carlos Mattar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-[10px] font-black text-background">SG</div>
                <span className="text-[8px] font-black uppercase">Sebastián Garrido</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-[10px] font-black text-background">MS</div>
                <span className="text-[8px] font-black uppercase">Marcos Sousa</span>
            </div>
        </div>
        <Logo className="h-12 w-12 mx-auto opacity-20" />
        <p className="text-[10px] font-black text-foreground/10 uppercase tracking-[1.5em] italic">
            SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
        </p>
      </footer>
    </div>
  );
}
