
"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Gavel, 
  Users, 
  Cpu, 
  Terminal,
  ChevronRight,
  Lock,
  Search,
  FileText,
  Activity,
  Network,
  Database,
  BrainCircuit,
  Fingerprint,
  Smartphone,
  Recycle,
  Coins,
  Scale,
  Calculator,
  Target,
  BarChart3,
  Globe,
  Briefcase,
  Award,
  AlertTriangle,
  Landmark,
  School,
  Download,
  Printer,
  ChevronLeft
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const chapters = [
  {
    id: "vision",
    title: "01. Visión y Propósito del Ecosistema",
    icon: Target,
    content: "System Kyron es un nodo de inteligencia operativa diseñado para la soberanía tecnológica y financiera. Su propósito es fusionar la gestión administrativa con tecnologías de tercera generación (Web3, AI, 5G) para erradicar el riesgo operativo y fiscal en el sector privado venezolano.",
    details: [
      "Misión Crítica: Integridad de datos al 100%.",
      "Visión 2030: Estandarización de la economía digital regional.",
      "Valores: Inmutabilidad, Transparencia y Eficiencia Neuronal."
    ]
  },
  {
    id: "security",
    title: "02. Protocolos de Acceso y Seguridad de Nodo",
    icon: Lock,
    content: "El sistema emplea un esquema de seguridad Zero-Knowledge. La autenticación se realiza mediante llaves criptográficas vinculadas a la identidad biométrica del usuario. El acceso está segmentado por Tiers de autorización, garantizando que la información sensible solo sea accesible por el personal certificado.",
    details: [
      "Cifrado de grado militar AES-XTS-512.",
      "Autenticación Multifactor (MFA) obligatoria.",
      "Registro de auditoría inmutable en el Ledger Central."
    ]
  },
  {
    id: "accounting",
    title: "03. Automatización Contable VEN-NIF",
    icon: Calculator,
    content: "Motor de procesamiento financiero que cumple estrictamente con las Normas de Información Financiera de Venezuela. El sistema realiza el cierre mensual de forma autónoma, calculando el ajuste por inflación fiscal basándose en los índices del BCV sincronizados en tiempo real.",
    details: [
      "Ajuste por Inflación Fiscal (RIPF) automatizado.",
      "Consolidación multimoneda (VES/USD/EUR).",
      "Emisión de balances bajo estándares internacionales."
    ]
  },
  {
    id: "taxes",
    title: "04. Blindaje Fiscal y Cumplimiento SENIAT",
    icon: ShieldCheck,
    content: "Módulo de protección ante fiscalizaciones. La IA de Kyron audita cada factura de compra y venta contra la Providencia 0071 antes de permitir su registro. Esto garantiza que los Libros de IVA y las declaraciones de ISLR sean matemáticamente perfectos.",
    details: [
      "Validación de RIF y número de control en tiempo real.",
      "Generación de archivos .TXT para el portal fiscal.",
      "Control preventivo de retenciones y percepciones."
    ]
  },
  {
    id: "hr",
    title: "05. Gestión de Talento y Cultura (LOTTT)",
    icon: Users,
    content: "Administración integral del capital humano. El sistema automatiza el cálculo de nóminas quincenales, utilidades, bonos vacacionales y prestaciones sociales, minimizando las contingencias legales laborales mediante el estricto cumplimiento de la LOTTT.",
    details: [
      "Cálculo de liquidaciones y prestaciones en 2.3ms.",
      "Control de asistencia mediante telemetría.",
      "Portal de autoservicio para el trabajador."
    ]
  },
  {
    id: "legal",
    title: "06. Bóveda Jurídica y Gestión de Contratos",
    icon: Gavel,
    content: "Repositorio inmutable de activos legales. Kyron permite la redacción de contratos mediante IA entrenada en jurisprudencia venezolana. Los documentos se almacenan con sellado de tiempo RFC 3161, garantizando su validez ante cualquier tribunal.",
    details: [
      "Generador de borradores legales inteligentes.",
      "Alertas de vencimiento de poderes y licencias.",
      "Indexación automática por expediente judicial."
    ]
  },
  {
    id: "telecom",
    title: "07. Infraestructura 5G y eSIM Digital",
    icon: Radio,
    content: "Gestión de conectividad convergente. Kyron opera como un orscriptador de red, permitiendo la activación de líneas y perfiles de datos eSIM para flotas corporativas. El sistema garantiza latencia cero para aplicaciones administrativas críticas.",
    details: [
      "Aprovisionamiento remoto de perfiles eUICC.",
      "Monitoreo de tráfico y Network Slicing.",
      "Integración nativa con dispositivos de última generación."
    ]
  },
  {
    id: "pos",
    title: "08. Punto de Venta (TPV) Inteligente",
    icon: Smartphone,
    content: "Interfaz de ventas optimizada para alta rotación. El TPV está vinculado al inventario central y al motor fiscal, permitiendo cobros en múltiples divisas y métodos de pago (Zelle, Pago Móvil, Cripto) con conciliación automática.",
    details: [
      "Facturación rápida con validación de RIF.",
      "Integración con máquinas fiscales homologadas.",
      "Soporte para plataformas de crédito (Cashea/Krece)."
    ]
  },
  {
    id: "sustainability",
    title: "09. Economía Circular y Eco-Créditos",
    icon: Recycle,
    content: "Iniciativa de la Fundación Kyron para la monetización de la responsabilidad ambiental. Las papeleras inteligentes con tecnología magnética registran la recolección de residuos y acreditan puntos digitales en la billetera del usuario.",
    details: [
      "Trazabilidad de residuos mediante Blockchain.",
      "Marketplace de canje de Eco-Créditos.",
      "Certificación de huella de carbono neutral."
    ]
  },
  {
    id: "engineering",
    title: "10. Ingeniería IA: Planos y Presupuestos",
    icon: Cpu,
    content: "Herramienta de asistencia técnica para proyectos de infraestructura. La IA procesa imágenes de locales comerciales para generar planos arquitectónicos a escala y cómputos métricos detallados para presupuestos de obra.",
    details: [
      "Inferencia de medidas mediante visión artificial.",
      "Cálculo automático de materiales y mano de obra.",
      "Exportación de expedientes técnicos maestros."
    ]
  },
  {
    id: "api",
    title: "11. Integración y Nodo de Datos",
    icon: Network,
    content: "Kyron actúa como un HUB de datos. Nuestra API RESTful permite conectar sistemas externos (CRMs, ERPs antiguos) con el núcleo de inteligencia del ecosistema, asegurando un flujo de información unidireccional y seguro.",
    details: [
      "Webhooks para eventos financieros en vivo.",
      "Documentación técnica para desarrolladores.",
      "Sincronización síncrona de inventarios."
    ]
  },
  {
    id: "blockchain",
    title: "12. Inmutabilidad en el Ledger Digital",
    icon: Database,
    content: "Cada registro operativo (una venta, un contrato, un pago de nómina) genera un hash único en el Ledger de Kyron. Esto crea una cadena de custodia de la información que es imposible de alterar, ideal para auditorías de alta fidelidad.",
    details: [
      "Sellado digital de cada transacción.",
      "Prueba de existencia inatacable.",
      "Transparencia radical para socios y directivos."
    ]
  },
  {
    id: "market",
    title: "13. Business Intelligence y Análisis de Mercado",
    icon: BarChart3,
    content: "Panel estratégico de visualización de datos. El sistema analiza tendencias de consumo, comportamiento de la competencia y salud financiera del holding para proporcionar proyecciones predictivas de rentabilidad.",
    details: [
      "Dashboard de KPIs en tiempo real.",
      "Análisis de demografía y potencial de zona.",
      "Simulador de escenarios 'What-If'."
    ]
  },
  {
    id: "support",
    title: "14. Soporte Técnico Neuronal",
    icon: BrainCircuit,
    content: "El Asistente Kyron (Chat IA) está entrenado en toda la documentación técnica y legal del sistema. Puede resolver dudas operativas, explicar procesos fiscales complejos o generar reportes bajo demanda mediante lenguaje natural.",
    details: [
      "Atención automatizada 24/7.",
      "Escalamiento a soporte humano Nivel 3.",
      "Guías de resolución de problemas integradas."
    ]
  },
  {
    id: "compliance",
    title: "15. Auditoría Preventiva Continua",
    icon: Activity,
    content: "El sistema no espera al cierre del ejercicio para auditar. El motor de cumplimiento monitorea cada nodo operativo buscando inconsistencias, notificando al administrador antes de que se conviertan en multas o sanciones.",
    details: [
      "Detección de anomalías transaccionales.",
      "Verificación de integridad de archivos.",
      "Reportes de cumplimiento para juntas directivas."
    ]
  },
  {
    id: "personal",
    title: "16. Identidad Personal Ciudadana",
    icon: Fingerprint,
    content: "El portal para la persona natural centraliza sus trámites civiles. Desde partidas de nacimiento hasta antecedentes penales, Kyron actúa como el gestor digital de su vida civil bajo protocolos de máxima privacidad.",
    details: [
      "Bóveda de documentos de identidad.",
      "Seguimiento de trámites ante registros.",
      "Acceso a servicios de salud y carnet digital."
    ]
  },
  {
    id: "banking",
    title: "17. Conciliación Bancaria Inteligente",
    icon: Landmark,
    content: "Sincronización con la banca nacional e internacional. El sistema empareja automáticamente los estados de cuenta con las facturas registradas, detectando pagos faltantes o transferencias no identificadas.",
    details: [
      "Lectura automática de estados de cuenta.",
      "Validación de referencias de Pago Móvil.",
      "Control de flujo de caja multimoneda."
    ]
  },
  {
    id: "academy",
    title: "18. Formación y Academia Kyron",
    icon: School,
    content: "Centro de transferencia de conocimiento. Ofrecemos cursos certificados en gestión fiscal, ciberseguridad y uso del ecosistema para que el personal de su empresa alcance el nivel de 'Operador Maestro'.",
    details: [
      "Cursos técnicos online y presenciales.",
      "Certificación verificable en Blockchain.",
      "Actualizaciones constantes sobre leyes."
    ]
  },
  {
    id: "holding",
    title: "19. Gestión Estratégica de Holdings",
    icon: Globe,
    content: "Módulo para grandes corporaciones. Permite gestionar múltiples empresas, sucursales y franquicias desde una sola pantalla, consolidando estados financieros y estructurando el reparto de beneficios.",
    details: [
      "Estructura de socios y participación accionaria.",
      "Consolidación de informes de grupo.",
      "Gestión de poderes inter-empresariales."
    ]
  },
  {
    id: "maintenance",
    title: "20. Mantenimiento y Ciclo de Vida",
    icon: Terminal,
    content: "Protocolos de actualización del sistema. System Kyron evoluciona diariamente. Este capítulo detalla cómo el sistema integra nuevas leyes y mejoras técnicas sin interrumpir la operación del negocio.",
    details: [
      "Actualizaciones transparentes sin tiempo de baja.",
      "Backup redundante en 3 regiones geográficas.",
      "Mejora continua basada en feedback del nodo."
    ]
  }
];

export default function ManualUsuarioPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleDownloadWord = async () => {
    setIsExporting(true);
    
    // Capturar el SVG del logo para integrarlo como imagen en el Word
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
                        ctx.clearRect(0, 0, 400, 400);
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
        <title>Manual de Usuario System Kyron</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 50px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
          .logo { width: 120px; margin-bottom: 20px; }
          h1 { color: #2563eb; font-size: 28pt; margin-bottom: 5pt; }
          h2 { color: #1e40af; border-bottom: 1px solid #ddd; margin-top: 30pt; padding-bottom: 5pt; font-size: 18pt; }
          h3 { color: #2563eb; font-size: 12pt; margin-top: 15pt; }
          p { margin-bottom: 10pt; text-align: justify; }
          ul { margin-bottom: 15pt; }
          li { margin-bottom: 5pt; }
          .footer { margin-top: 50px; text-align: center; font-size: 9pt; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; color: #666;">Manual Maestro de Operaciones v2.6.5</p>
        </div>

        ${chapters.map(ch => `
          <h2>${ch.title}</h2>
          <p>${ch.content}</p>
          <h3>Especificaciones Técnicas:</h3>
          <ul>
            ${ch.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        `).join('')}

        <div class="footer">
          <p>&copy; 2026 System Kyron • Corporate Intelligence Node • Documento de Clase Confidencial</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Usuario_System_Kyron_Master.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "PROTOCOLO DE EXPORTACIÓN COMPLETADO",
        description: "El manual ha sido generado con el logo oficial integrado.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
      {/* Logo oculto para captura en la exportación */}
      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-secondary/[0.02] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> EXPEDIENTE TÉCNICO MAESTRO
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Operación</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Protocolo Integral de Gestión Corporativa • Versión de Inferencia v2.6.5 • Ecosistema Kyron
            </p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl border-white/10 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest">
                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
            </Button>
            <Button 
                onClick={handleDownloadWord} 
                disabled={isExporting}
                className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl"
            >
                {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                DESCARGAR WORD
            </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 no-print">
        {chapters.map((ch, idx) => (
            <a 
                key={ch.id} 
                href={`#${ch.id}`}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all text-center group"
            >
                <ch.icon className="h-5 w-5 mx-auto mb-3 text-white/20 group-hover:text-primary transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Capítulo 0{idx + 1}</span>
            </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-24 pb-32">
        {chapters.map((chapter, idx) => (
          <motion.section 
            id={chapter.id}
            key={chapter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="scroll-mt-32"
          >
            <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-64 w-64 rotate-12" />
              </div>
              
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-1 bg-white/[0.03] border-r border-white/5 flex items-center justify-center p-8 lg:p-0">
                    <span className="text-4xl font-black text-white/10 uppercase vertical-text tracking-tighter">
                        CH.{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                </div>

                <div className="lg:col-span-11 p-10 md:p-16 space-y-12">
                    <header className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary/10 rounded-[1.5rem] border border-primary/20 shadow-inner">
                                <chapter.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{chapter.title}</h2>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent"></div>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Resumen Operativo</h4>
                                <p className="text-lg font-medium italic text-white/70 leading-relaxed text-justify">
                                    {chapter.content}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-inner">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 flex items-center gap-3">
                                    <Terminal className="h-4 w-4" /> Especificaciones de Nodo
                                </h4>
                                <ul className="space-y-4 text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                                    {chapter.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex gap-4 items-start">
                                            <span className="text-primary font-black">[0{dIdx + 1}]</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-white/5 border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center gap-6 group hover:bg-primary/5 transition-all">
                                <ShieldCheck className="h-12 w-12 text-primary opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <div className="space-y-2">
                                    <h5 className="text-sm font-black uppercase tracking-widest text-white">Garantía de Integridad</h5>
                                    <p className="text-[10px] text-white/30 uppercase leading-relaxed font-medium">Este módulo ha sido verificado bajo el protocolo Zero Risk 2026. Los datos procesados aquí son inmutables y legalmente válidos ante fiscalizaciones.</p>
                                </div>
                            </Card>
                            
                            <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                                <Activity className="h-6 w-6 text-white/10 mb-4 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10 italic">Terminal Status: Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </Card>
          </motion.section>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto border-t border-white/5 pt-20 pb-10 text-center space-y-10">
        <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic italic-shadow">¿Necesitas Asistencia Neuronal?</h3>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] max-w-lg mx-auto">Nuestro asistente de IA está disponible en la esquina inferior para resolver cualquier duda técnica en tiempo real.</p>
        </div>
        <div className="flex justify-center gap-4">
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Contactar a Soporte
            </Button>
            <Button asChild className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                <Link href="/">Volver al Portal Central</Link>
            </Button>
        </div>
        <p className="text-[9px] font-black text-white/10 uppercase tracking-[1em] italic pt-10">
            SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
        </p>
      </footer>
    </div>
  );
}
