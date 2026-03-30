"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  BookOpen, ShieldCheck, Zap, Calculator, Users, School,
  Download, Printer, Loader as Loader2, CircleCheck as CheckCircle,
  Target, LayoutDashboard, ShoppingCart,
  Landmark, Activity, Cpu, MessageSquare, Building2, FileText,
  Gavel, Radio, Recycle, Wallet, ChartBar as BarChart3, BrainCircuit,
  ExternalLink, ChevronUp, Search, Menu, X
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
    content: `Bienvenido a la documentación unificada de System Kyron v2.8.5. Este legajo representa la visión técnica y operativa de un ecosistema integral diseñado para la excelencia en la gestión empresarial y ciudadana en Venezuela. Bajo la dirección estratégica de Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS), System Kyron se propone como el núcleo de inteligencia que fusiona telecomunicaciones, finanzas y cumplimiento legal automatizado. Este manual detalla las capacidades técnicas previstas para transformar la operatividad del sector privado bajo los más altos estándares de seguridad y eficiencia.`,
    details: [
      "Centralizar el 100% de las operaciones críticas en una plataforma única.",
      "Ingeniería soberana desarrollada en el Colegio Santa Rosa de Lima.",
      "Preparar a las empresas para la economía digital de 2026.",
      "Áreas independientes que escalan con su organización."
    ]
  },
  {
    id: "empezar",
    title: "Cómo empezar",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    content: `El despliegue de System Kyron está diseñado para ser fluido e intuitivo. Al iniciar, el sistema le guiará a través de una configuración inicial donde definirá el perfil de su organización o identidad personal. Un asistente de configuración mapea automáticamente sus necesidades según el sector económico, asegurando que los módulos de facturación, contabilidad y recursos humanos se activen con los parámetros legales correspondientes a su jurisdicción.`,
    details: [
      "Registro de RIF, Razón Social y datos de contacto oficiales.",
      "Activación bajo demanda de las 10+ secciones principales.",
      "Guía asistida por Kyron AI (potenciado por Claude de Anthropic) para la carga inicial de datos.",
      "Soporte bilingüe completo (Español e Inglés)."
    ]
  },
  {
    id: "seguridad",
    title: "Protegiendo tu cuenta",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-500",
    content: `La seguridad en System Kyron es la base de la arquitectura. El sistema implementa cifrado AES-256 con autenticación de dos factores (2FA). Para proteger sus activos digitales, la validación 2FA es obligatoria: cada acceso sensible requiere confirmación desde su dispositivo vinculado, garantizando que solo el titular pueda acceder a la plataforma. Los tokens JWT se manejan como cookies HTTP-only para máxima seguridad.`,
    details: [
      "Cifrado AES-256 de grado bancario en toda la plataforma.",
      "Autenticación 2FA vía email, SMS o WhatsApp.",
      "Alertas instantáneas ante intentos de acceso no autorizados.",
      "Auditoría inmutable de cada operación realizada."
    ]
  },
  {
    id: "tablero",
    title: "Tablero de herramientas",
    icon: LayoutDashboard,
    color: "from-violet-500 to-purple-500",
    content: `El portal central de System Kyron es un espejo de la salud de su negocio. El tablero muestra KPIs (Indicadores Clave de Desempeño) en tiempo real. Visualice el pulso financiero, la telemetría de red y el impacto ambiental desde una única consola. La interfaz utiliza el diseño HUD Titanium para reducir la carga cognitiva, permitiendo identificar anomalías o éxitos mediante códigos de colores y alertas visuales dinámicas.`,
    details: [
      "Resumen consolidado de todas las áreas de gestión.",
      "Personalización según rol (Gerente, Contador, Operador).",
      "Datos actualizados en tiempo real sin necesidad de recarga.",
      "Navegación rápida entre cuenta personal y corporativa."
    ]
  },
  {
    id: "contabilidad",
    title: "Contabilidad VEN-NIF",
    icon: Calculator,
    color: "from-sky-500 to-blue-500",
    content: `El módulo contable se alinea estrictamente con las normas VEN-NIF. Procesa automáticamente los asientos diarios, integrando las ventas del TPV y los gastos registrados. Incluye gestión multimoneda con tasas oficiales del BCV y cálculo automático del Reajuste por Inflación Fiscal (RIPF), utilizando los índices INPC publicados por el BCV para asegurar que sus estados financieros reflejen la realidad económica del país.`,
    details: [
      "Adaptación total a los principios contables VEN-NIF.",
      "Conversión síncrona en Bs., USD y EUR según tasa BCV.",
      "Ajuste RIPF automatizado de activos no monetarios.",
      "Balance de Situación y Estado de Resultados siempre listos."
    ]
  },
  {
    id: "impuestos",
    title: "Impuestos & Pre-Alerta IA",
    icon: Landmark,
    color: "from-red-500 to-rose-500",
    content: `El cumplimiento ante el SENIAT es de misión crítica. System Kyron incorpora un motor de Pre-Alerta que notifica con 15, 7 y 3 días de antelación sobre cada vencimiento. El sistema calcula automáticamente el IVA (16%), las retenciones de ISLR y el IGTF (3%) según el método de pago. Al automatizar estos procesos según la Providencia SNAT/2011/0071, se evitan multas por declaraciones extemporáneas.`,
    details: [
      "Generación automática de libros de Compra y Venta.",
      "Cálculo instantáneo del IGTF (3%) en transacciones de divisas.",
      "Notificaciones proactivas para cumplimiento a tiempo.",
      "Exportación de archivos .txt para el portal fiscal del SENIAT."
    ]
  },
  {
    id: "empleados",
    title: "Recursos Humanos & Nómina",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    content: `La gestión del talento garantiza el respeto total a la LOTTT. Calcula nóminas, vacaciones, utilidades y prestaciones sociales de forma transparente. Incluye la entrega de recibos de pago firmados digitalmente a través de WhatsApp, con plena validez legal. El sistema también envía automáticamente reconocimientos de logros y mensajes motivacionales al personal.`,
    details: [
      "Cálculo automático de IVSS, FAOV, LPH e INCES.",
      "Recibos de pago por WhatsApp con validez legal.",
      "Reconocimiento automatizado de metas y cumpleaños.",
      "Resguardo digital de títulos, contratos y solvencias."
    ]
  },
  {
    id: "tpv",
    title: "Facturación & Punto de Venta",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-500",
    content: `El módulo de facturación integra un Punto de Venta (TPV) de alta velocidad con control de horario laboral. Si un operador intenta procesar una venta fuera de su turno, el sistema requiere autorización gerencial. Junto con la homologación de equipos fiscales, asegura control total sobre inventario e ingresos, eliminando ventas no registradas o discrepancias en el arqueo de caja.`,
    details: [
      "Bloqueo automático del TPV fuera del horario laboral.",
      "Cobro mixto (Bs./Divisas) con cálculo exacto de IGTF.",
      "Actualización de inventario con cada transacción.",
      "Registro de excepciones supervisadas por gerencia."
    ]
  },
  {
    id: "legal",
    title: "Asesoría Legal con Kyron AI (Claude)",
    icon: Gavel,
    color: "from-indigo-500 to-violet-500",
    content: `El módulo jurídico actúa como un Oficial de Cumplimiento virtual. Kyron AI — potenciado por Claude de Anthropic — está entrenado en legislación venezolana para redactar borradores de contratos, acuerdos de confidencialidad y actas de asamblea. Además, monitorea registros ante el SAREN y el SAPI, emitiendo alertas sobre vencimiento de poderes o necesidad de renovar marcas comerciales.`,
    details: [
      "Generación automática de documentos legales por Kyron AI.",
      "Avisos preventivos antes de la caducidad de poderes.",
      "Control de registros de marca y patentes (SAPI).",
      "Organización de documentos públicos y notariales (SAREN)."
    ]
  },
  {
    id: "telecom",
    title: "Mi Línea 5G / eSIM",
    icon: Radio,
    color: "from-cyan-500 to-sky-500",
    content: `System Kyron opera como un centro de telecomunicaciones bajo normativas de CONATEL. Permite la activación inmediata de líneas móviles mediante eSIM (chips digitales), eliminando la logística física. Las empresas pueden gestionar flotas de datos 5G con priorización de red (Network Slicing), garantizando máxima velocidad y estabilidad para las aplicaciones de gestión.`,
    details: [
      "Activación eSIM en minutos mediante código QR.",
      "Cumplimiento con los estándares de CONATEL.",
      "Gestión centralizada de consumo para planes corporativos.",
      "Acceso a la red 5G de mayor velocidad y menor latencia."
    ]
  },
  {
    id: "sostenibilidad",
    title: "Sostenibilidad & Eco-Créditos",
    icon: Recycle,
    color: "from-green-500 to-emerald-500",
    content: `Este módulo introduce la economía circular al ecosistema. Mediante puntos de reciclaje con tecnología de inducción magnética, los usuarios transforman residuos en activos digitales. Kyron AI valida el pesaje y acredita Eco-Créditos en su cuenta. Estos créditos se intercambian en el Mercado de Eco-Créditos interno, permitiendo a las empresas comprar o vender bonos verdes.`,
    details: [
      "Clasificación precisa de metales y plásticos por IA.",
      "Exchange de activos ambientales certificados.",
      "Acumulación de puntos canjeables por servicios Kyron.",
      "Reportes de impacto ambiental para balance social (CO₂)."
    ]
  },
  {
    id: "ingenieria",
    title: "Ingeniería & IT",
    icon: Cpu,
    color: "from-slate-500 to-zinc-500",
    content: `El módulo de ingeniería proporciona herramientas de planificación técnica avanzada para empresas que manejan infraestructura. Permite generar presupuestos de obra detallados y planos básicos mediante Kyron AI. El sistema controla costos de materiales y mano de obra, integrándose con Contabilidad para una ejecución presupuestaria impecable.`,
    details: [
      "Cálculo automático de materiales por área (cómputos métricos).",
      "Análisis de costos unitarios y márgenes de obra.",
      "Generación de layouts arquitectónicos con Kyron AI.",
      "Monitoreo de servidores y servicios de infraestructura."
    ]
  },
  {
    id: "reportes",
    title: "Reportes & Analítica",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
    content: `System Kyron transforma los datos en decisiones. El generador de reportes extrae información analítica de cualquier módulo del sistema. Desde reportes de ventas por hora hasta análisis de rentabilidad por producto. Todos los reportes son exportables en PDF y Excel, diseñados para juntas directivas o entes gubernamentales con total transparencia.`,
    details: [
      "Resúmenes ejecutivos para socios y directores.",
      "Proyecciones de ventas y tendencias por Kyron AI.",
      "Documentos listos para auditorías del SENIAT.",
      "Registro completo e inmutable de cada operación."
    ]
  },
  {
    id: "billetera",
    title: "Billetera Digital",
    icon: Wallet,
    color: "from-yellow-500 to-amber-500",
    content: `La Billetera Digital es el centro financiero del ecosistema. Permite realizar pagos instantáneos entre usuarios de la plataforma sin comisiones. Los fondos pueden provenir de ventas, transferencias bancarias o del canje de Eco-Créditos. Agiliza la liquidez empresarial, permitiendo que el dinero circule de forma segura dentro del ecosistema de Kyron.`,
    details: [
      "Transferencias P2P/B2B inmediatas dentro de la red.",
      "Conversión de Eco-Créditos en saldo utilizable.",
      "Protección de fondos bajo cifrado AES-256.",
      "Historial sellado e inmutable de cada transacción."
    ]
  },
  {
    id: "auditoria",
    title: "Auditoría & Supervisor 24/7",
    icon: Activity,
    color: "from-rose-500 to-red-500",
    content: `Para garantizar el 'Cero Riesgo Fiscal', System Kyron cuenta con un Supervisor Kyron AI que audita transacciones las 24 horas. Detecta inconsistencias antes de que se conviertan en multas, como RIFs vencidos de proveedores o cálculos erróneos de retenciones. Sugiere correcciones automáticas y asegura que la data cumpla con las leyes venezolanas vigentes.`,
    details: [
      "Detección temprana de errores en base imponible o IGTF.",
      "Verificación automática del estatus de proveedores.",
      "Supervisión permanente sin pausas ni omisiones.",
      "Score de cumplimiento fiscal para su empresa."
    ]
  },
  {
    id: "documentos-personales",
    title: "Documentos Personales",
    icon: FileText,
    color: "from-blue-500 to-indigo-500",
    content: `El portal de Cuenta Personal incluye una bóveda para trámites civiles. El ciudadano gestiona y resguarda copias certificadas de partidas de nacimiento, actas de matrimonio y documentos judiciales. Incluye integración con el marco legal LOPNNA para calcular automáticamente obligaciones de manutención basadas en ingresos e índice inflacionario del BCV.`,
    details: [
      "Resguardo de documentos de identidad y propiedad.",
      "Cálculo LOPNNA de pensión alimenticia con ajuste inflacionario.",
      "Seguimiento de trámites ante SAREN.",
      "Ficha de identidad digital para todos los servicios."
    ]
  },
  {
    id: "conexion-bancaria",
    title: "Conexión Bancaria",
    icon: Landmark,
    color: "from-emerald-500 to-teal-500",
    content: `System Kyron se integra con las principales instituciones financieras del país. La conexión permite conciliación bancaria automática, comparando registros contables con movimientos bancarios. Reduce el tiempo de oficina al automatizar el reconocimiento de pagos móviles, transferencias y cargos por servicios bancarios.`,
    details: [
      "Conciliación inteligente de transacciones bancarias.",
      "Actualización diaria de tasas de cambio del BCV.",
      "Cuadre entre bancos y efectivo en tiempo real.",
      "Enlaces cifrados mediante protocolos de alta seguridad."
    ]
  },
  {
    id: "academia",
    title: "Academia Kyron",
    icon: School,
    color: "from-purple-500 to-violet-500",
    content: `La Academia Kyron es un portal educativo donde los operadores aprenden a usar cada módulo del sistema mediante cursos certificados. El conocimiento se transfiere a los usuarios para que dominen la gestión fiscal y técnica del sistema, convirtiéndose en profesionales capaces de liderar la transformación digital en sus empresas.`,
    details: [
      "Certificación de competencias en gestión Kyron.",
      "Tutoriales en video paso a paso de cada módulo.",
      "Webinars sobre cambios en Gacetas Oficiales.",
      "Biblioteca técnica con manuales, guías y casos de éxito."
    ]
  },
  {
    id: "locales",
    title: "Múltiples Sedes",
    icon: Building2,
    color: "from-zinc-500 to-slate-500",
    content: `Para las empresas en expansión, System Kyron ofrece gestión multi-sede. Controle inventarios, ventas y personal de diferentes sucursales desde una cuenta ejecutiva de Socios y Directivos. Consolide la operación global del negocio manteniendo la independencia administrativa de cada punto, ideal para franquicias o holdings que operan en distintos estados.`,
    details: [
      "Reportes unificados de todos los puntos de venta.",
      "Transferencias de stock entre locales.",
      "Permisos diferenciados por gerente de sede.",
      "Visibilidad en tiempo real de cada sucursal."
    ]
  },
  {
    id: "soporte",
    title: "Soporte Técnico",
    icon: MessageSquare,
    color: "from-sky-500 to-cyan-500",
    content: `El soporte técnico de System Kyron es de grado corporativo. Incluye asistencia multicanal mediante Kyron AI (potenciado por Claude de Anthropic), chat en vivo y conexión directa con el equipo de ingeniería. Estamos comprometidos con una experiencia de misión crítica: sin caídas, sin errores y con respuesta técnica inmediata ante cualquier desafío operativo.`,
    details: [
      "Resolución de dudas 24/7 mediante Kyron AI (Claude, Anthropic).",
      "Seguimiento transparente de tickets de servicio.",
      "Actualizaciones de sistema sin interrupciones.",
      "Foro de la comunidad Kyron para mejores prácticas."
    ]
  },
  {
    id: "modelo-zedu",
    title: "Modelo ZEDU — AutoMind AI",
    icon: BrainCircuit,
    color: "from-violet-500 to-fuchsia-500",
    content: `El Modelo Zedu corresponde al proyecto educativo AutoMind AI, desarrollado por Miguel Uzcategui, Miguel Angel Goites y Joaquin de Barros en el Colegio Santa Rosa de Lima, Caracas. Transforma el sistema de archivado tradicional de instituciones educativas en un entorno digital eficiente, integrando digitalización de expedientes estudiantiles, chatbot de atención automatizada para representantes y herramientas de Kyron AI (potenciado por Claude de Anthropic) de apoyo administrativo. El documento completo está disponible en la sección Sector Privado del portal.`,
    details: [
      "Equipo: Miguel Uzcategui, Miguel Angel Goites, Joaquin de Barros.",
      "Digitalización y búsqueda instantánea de expedientes con OCR.",
      "Chatbot Kyron AI: atención 24/7 vía WhatsApp y portal web.",
      "Generación de reportes, circulares y análisis estratégico.",
      "Disponible con opción de descarga en Word (.doc)."
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
        <title>Manual de Usuario - System Kyron v2.8.5</title>
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
          <p class="subtitle">Guía de Operaciones Unificada v2.8.5</p>
        </div>
        <div class="intro">
          Este manual representa la documentación unificada de System Kyron (v2.8.5), un ecosistema tecnológico integral diseñado por Carlos Mattar (CM), Sebastián Garrido (SG) y Marcos Sousa (MS). Incluye ${chapters.length} capítulos operativos, entre ellos el Modelo ZEDU — proyecto AutoMind AI del Colegio Santa Rosa de Lima. La plataforma es una solución de misión crítica para el mercado venezolano, integrando normativas del SENIAT, CONATEL, LOTTT y otros entes reguladores.
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
          Nota: System Kyron es un proyecto en etapa de Acceso Anticipado. Las funcionalidades descritas representan el diseño final previsto. Las referencias a entes gubernamentales se basan en las normativas vigentes a 2026.
        </div>
        <div class="footer">
          <p>System Kyron v2.8.5 &bull; Inteligencia Corporativa &bull; Caracas, Venezuela</p>
          <p>&copy; 2026 Todos los derechos reservados.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", docContent], { type: "application/vnd.ms-word" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Manual de Usuario - System Kyron v2.8.5.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    toast({
      title: "Descarga completada",
      description: `La guía de operaciones (${chapters.length} capítulos) ha sido generada con éxito.`,
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
        aria-label="Índice de capítulos"
        className={cn(
          "fixed inset-y-0 left-0 z-[90] w-80 bg-card/95 backdrop-blur-xl border-r border-border transform transition-transform duration-300 overflow-y-auto",
          tocOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-foreground">Índice</span>
          </div>
          <button onClick={() => setTocOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer" aria-label="Cerrar índice">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar capítulo..."
              aria-label="Buscar capítulo"
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
              aria-label="Abrir índice de capítulos"
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
              <BookOpen className="h-3 w-3" /> Manual de Usuario v2.8.5
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
              <span className="text-foreground">Guía de</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                Operaciones
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              Documentación completa de {chapters.length} módulos del ecosistema System Kyron. 
              Incluye guías de uso, especificaciones técnicas y el Modelo ZEDU AutoMind AI.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Capítulos</span>
                <span className="text-xl font-black text-foreground">{chapters.length}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Versión</span>
                <span className="text-xl font-black text-foreground">2.8.5</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-card/60 border border-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Motor IA</span>
                <span className="text-xl font-black text-primary">Claude</span>
                <span className="text-[8px] font-bold text-muted-foreground/60 block">by Anthropic</span>
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
                        Capítulo {num}
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
            <p className="text-muted-foreground text-sm">No se encontraron capítulos para "{searchQuery}"</p>
          </div>
        )}
      </div>

      <footer className="max-w-6xl mx-auto px-6 border-t border-border pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 opacity-30">
            {[
              { initials: "CM", name: "Carlos Mattar" },
              { initials: "SG", name: "Sebastián Garrido" },
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
              System Kyron v2.8.5
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
