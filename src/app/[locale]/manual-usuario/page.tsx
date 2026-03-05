
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Fingerprint,
    Radio,
    TabletSmartphone,
    ShieldCheck,
    TrendingUp,
    Briefcase,
    Gavel,
    Cpu,
    Recycle,
    Sparkles,
    Database,
    Zap,
    CheckCircle,
    Lock,
    Download,
    ChevronLeft,
    ListTree,
    Terminal,
    RefreshCw,
    Activity,
    ShieldAlert,
    HelpCircle,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    Clock,
    Search,
    UserPlus,
    Target,
    LayoutGrid,
    ChevronRight,
    AlertTriangle,
    Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * DOCUMENTACIÓN TÉCNICA MASIVA, EXHAUSTIVA Y PROFESIONAL.
 */

const introSection = {
    title: "1.0 Bienvenido a System Kyron",
    mission: "Garantizar la soberanía tecnológica y fiscal mediante arquitecturas inmutables de grado corporativo.",
    target: "Empresas, instituciones gubernamentales, y ciudadanos que requieren una gestión de activos digitales de misión crítica.",
    text: "System Kyron v2.6.5 es una plataforma de inteligencia distribuida diseñada para centralizar la operatividad de empresas modernas en el complejo entorno venezolano. Nuestra arquitectura fusiona conectividad 5G, inteligencia artificial predictiva para cumplimiento del SENIAT y un ledger blockchain que garantiza la integridad absoluta de cada activo digital."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo", desc: "Ingrese sus credenciales maestras y valide su identidad biométrica inicial.", icon: Terminal },
    { step: "02", title: "Sincronización de Base", desc: "El sistema cargará automáticamente los últimos índices INPC y parámetros de ley.", icon: RefreshCw },
    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Fiscal, RRHH) desde el selector modular.", icon: Zap },
    { step: "04", title: "Inyección de Datos", desc: "Suba su base de clientes y productos mediante el motor de importación masiva.", icon: Database }
];

const technicalRequirements = {
    title: "Requisitos Técnicos de Operación",
    items: [
        { label: "Conectividad", desc: "Enlace simétrico > 10Mbps. Latencia < 50ms para sincronización Ledger." },
        { label: "Navegación", desc: "Chromium v115+ / WebKit. Aceleración por hardware habilitada." },
        { label: "Biometría", desc: "Cámara HD 1080p con soporte para profundidad (IR recomendado)." },
        { label: "Seguridad", desc: "Habilitación de TPM 2.0 y soporte para cifrado AES-NI en hardware." }
    ]
};

const glossaryTerms = [
    { term: "Ledger Inmutable", def: "Registro de transacciones encadenado mediante hashes criptográficos que impide cualquier alteración posterior." },
    { term: "eSIM (eUICC)", def: "Chip integrado que permite el aprovisionamiento de perfiles de red móvil de forma remota (Over-the-Air)." },
    { term: "Validación eIDAS", def: "Estándar de la Unión Europea para la identificación electrónica y servicios de confianza." },
    { term: "RIPF Automatizado", def: "Reajuste por Inflación Fiscal calculado en tiempo real según el INPC del Banco Central de Venezuela." },
    { term: "Zero-Knowledge Proof", def: "Método criptográfico que permite validar información sin revelar los datos sensibles subyacentes." }
];

const troubleshooting = [
    { issue: "Falla de Validación Biométrica", cause: "Iluminación insuficiente o ángulo de cámara incorrecto.", solution: "Asegure luz frontal uniforme y mantenga el rostro a 30cm del lente." },
    { issue: "Error de Sincronización Ledger", cause: "Micro-cortes en el enlace de red local.", solution: "Verifique estado del nodo 5G y ejecute el protocolo 'Refresh Data' en el Dashboard." },
    { issue: "Bloqueo de Facturación", cause: "RIF del cliente vencido o inconsistente en la base del SENIAT.", solution: "Actualice la ficha del cliente mediante el motor de búsqueda automática de RIF." }
];

const manualModules = [
    {
        id: "identidad",
        title: "Identidad Digital 3D",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación y resguardo de documentos civiles.",
        procedure: "1. Acceda a 'Mi ID Digital'. 2. Inicie 'Enrolamiento'. 3. Siga la guía visual de mapeo facial. 4. Firme el acta digital.",
        details: "Utiliza 512 puntos vectoriales para crear un hash de identidad único vinculado a su Cédula/RIF. Cumple con estándares eIDAS de alta confianza."
    },
    {
        id: "telecom",
        title: "Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes convergentes y telefonía digital corporativa.",
        procedure: "1. Ingrese a Gestión de Telecom. 2. Genere perfil eSIM. 3. Escanee el código QR en el terminal. 4. Active el nodo de datos.",
        details: "Soporte para Multi-IMSI y Network Slicing. Gestión de flota mediante servidor SM-DP+ certificado por GSMA."
    },
    {
        id: "tpv",
        title: "Punto de Venta IA",
        icon: TabletSmartphone,
        description: "Operativa comercial con validación fiscal síncrona en tiempo real.",
        procedure: "1. Valide operador. 2. Escanee productos. 3. Ingrese pago multimoneda. 4. Imprima factura fiscal.",
        details: "Integración nativa con máquinas fiscales y pasarelas de pago. Detección automática de IGTF y exenciones de IVA."
    },
    {
        id: "contabilidad",
        title: "Finanzas y Auditoría",
        icon: TrendingUp,
        description: "Consolidación financiera y cumplimiento fiscal automatizado.",
        procedure: "1. Cargue asientos. 2. Ejecute Auditoría Predictiva. 3. Genere Libros Oficiales. 4. Selle periodo fiscal.",
        details: "Cálculo automático de RIPF. Generación de archivos TXT para SENIAT libres de errores humanos mediante IA."
    },
    {
        id: "rrhh",
        title: "Gestión de Talento",
        icon: Briefcase,
        description: "Administración integral de nómina y cumplimiento laboral LOTTT.",
        procedure: "1. Cree perfil empleado. 2. Firme contrato digital. 3. Procese nómina quincenal. 4. Archive en Bóveda RRHH.",
        details: "Motor de cálculo actuarial para prestaciones sociales y vacaciones. Generación de constancias AR-C con código QR."
    },
    {
        id: "legal",
        title: "Mando Jurídico",
        icon: Gavel,
        description: "Control de contratos, poderes y habilitaciones corporativas.",
        procedure: "1. Cargue borrador. 2. Asigne firmantes. 3. Ejecute flujo legal. 4. Monitoree vencimientos.",
        details: "Alertas tempranas de vencimiento de poderes ante el SAREN y licencias CONATEL. Repositorio inmutable de actas."
    },
    {
        id: "ingenieria",
        title: "Ingeniería e IA",
        icon: Cpu,
        description: "Fotogrametría para planos y presupuestos de infraestructura.",
        procedure: "1. Suba fotos del local. 2. Genere plano 2D/3D. 3. Seleccione materiales. 4. Exporte presupuesto.",
        details: "Algoritmos de visión artificial para estimación de áreas y optimización de materiales de construcción."
    },
    {
        id: "reciclaje",
        title: "Reciclaje Magnético",
        icon: Recycle,
        description: "Monetización de residuos mediante tecnología de inducción.",
        procedure: "1. Deposite envase. 2. Espere validación magnética. 3. Escanee ID. 4. Reciba Eco-Créditos.",
        details: "Sistema patentado de clasificación de polímeros y metales vinculado a una billetera de activos verdes."
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = () => {
        const content = `
            <div style="text-align: center; margin-bottom: 50pt;">
                <h1 style="color: #0ea5e9; font-size: 32pt; font-family: 'Arial Black', sans-serif; margin-bottom: 5pt; text-transform: uppercase;">SYSTEM KYRON</h1>
                <p style="color: #64748b; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 3pt;">Expediente Técnico Maestro v2.6.5</p>
                <p style="color: #94a3b8; font-size: 10pt; margin-top: 30pt;">© 2026 • DOCUMENTO DE GRADO CORPORATIVO • PROPIEDAD INTELECTUAL RESERVADA</p>
            </div>

            <div style="page-break-after: always; padding: 20pt; border: 2pt solid #0ea5e9; border-radius: 10pt; background: #f8fafc;">
                <h2 style="color: #0ea5e9; text-align: center;">ÍNDICE GENERAL</h2>
                <ul style="list-style: none; padding: 0; line-height: 2;">
                    <li><strong>1.0 Introducción al Ecosistema</strong> ..................................................... Pág. 03</li>
                    <li><strong>2.0 Guía de Inicio Rápido</strong> ........................................................... Pág. 05</li>
                    <li><strong>3.0 Requisitos del Sistema</strong> ........................................................... Pág. 07</li>
                    <li><strong>4.0 Módulos de Operación Maestra</strong> .............................................. Pág. 09</li>
                    <li><strong>5.0 Soberanía y Seguridad de Datos</strong> ............................................ Pág. 25</li>
                    <li><strong>6.0 Resolución de Incidencias</strong> ..................................................... Pág. 28</li>
                    <li><strong>7.0 Glosario y Soporte Técnico</strong> ................................................... Pág. 30</li>
                </ul>
            </div>

            <h2 style="color: #0ea5e9; border-left: 15pt solid #0ea5e9; padding-left: 10pt; margin-top: 40pt;">1.0 INTRODUCCIÓN GENERAL</h2>
            <p style="text-align: justify; font-size: 11pt; line-height: 1.6;">${introSection.text}</p>
            <p style="font-weight: bold; color: #1e293b;">Misión:</p>
            <p style="font-style: italic; color: #475569;">${introSection.mission}</p>
            <p style="font-weight: bold; color: #1e293b;">Audiencia:</p>
            <p style="color: #475569;">${introSection.target}</p>

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 15pt solid #0ea5e9; padding-left: 10pt;">2.0 GUÍA DE INICIO RÁPIDO (QUICK START)</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15pt;">
                <tr style="background-color: #0ea5e9; color: white;">
                    <th style="padding: 12pt; text-align: left; width: 10%;">PASO</th>
                    <th style="padding: 12pt; text-align: left;">PROTOCOLO DE ACCIÓN</th>
                </tr>
                ${quickStartSteps.map(s => `
                    <tr>
                        <td style="padding: 12pt; border-bottom: 1pt solid #e2e8f0; font-weight: bold; color: #0ea5e9;">${s.step}</td>
                        <td style="padding: 12pt; border-bottom: 1pt solid #e2e8f0;">
                            <strong>${s.title}</strong>: ${s.desc}
                        </td>
                    </tr>
                `).join('')}
            </table>

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 15pt solid #0ea5e9; padding-left: 10pt;">3.0 MÓDULOS OPERATIVOS</h2>
            ${manualModules.map(mod => `
                <div style="margin-top: 30pt; padding: 15pt; border: 1pt solid #e2e8f0; border-radius: 8pt; background: #ffffff;">
                    <h3 style="color: #0ea5e9; margin-top: 0; text-transform: uppercase;">${mod.title}</h3>
                    <p style="font-size: 10pt; color: #64748b;">${mod.description}</p>
                    <div style="background: #f1f5f9; padding: 10pt; margin: 10pt 0; border-radius: 5pt;">
                        <p style="font-weight: bold; margin-bottom: 5pt;">PROCEDIMIENTO PASO A PASO:</p>
                        <p style="font-size: 10pt;">${mod.procedure}</p>
                    </div>
                    <p style="font-weight: bold; margin-top: 10pt;">ANÁLISIS DE INGENIERÍA:</p>
                    <p style="text-align: justify; font-size: 9pt; color: #475569;">${mod.details}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 15pt solid #0ea5e9; padding-left: 10pt;">4.0 RESOLUCIÓN DE INCIDENCIAS (TROUBLESHOOTING)</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15pt;">
                <tr style="background-color: #4b5563; color: white;">
                    <th style="padding: 10pt; text-align: left;">SÍNTOMA / ERROR</th>
                    <th style="padding: 10pt; text-align: left;">SOLUCIÓN MAESTRA</th>
                </tr>
                ${troubleshooting.map(t => `
                    <tr>
                        <td style="padding: 10pt; border-bottom: 1pt solid #e2e8f0; font-size: 10pt;"><strong>${t.issue}</strong><br/><small>${t.cause}</small></td>
                        <td style="padding: 10pt; border-bottom: 1pt solid #e2e8f0; font-size: 10pt; color: #15803d;">${t.solution}</td>
                    </tr>
                `).join('')}
            </table>

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 15pt solid #0ea5e9; padding-left: 10pt;">5.0 GLOSARIO TÉCNICO</h2>
            <div style="margin-top: 15pt;">
                ${glossaryTerms.map(g => `
                    <p style="margin-bottom: 10pt;"><strong>${g.term}</strong>: <span style="font-size: 10pt; color: #475569;">${g.def}</span></p>
                `).join('')}
            </div>

            <div style="margin-top: 60pt; text-align: center; border-top: 2pt solid #0ea5e9; padding-top: 20pt;">
                <p style="font-weight: bold; font-size: 12pt;">CENTRO DE SOPORTE MAESTRO</p>
                <p style="color: #64748b;">infosystemkyron@gmail.com | Atenci&oacute;n 24/7 Nivel 5</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPEDIENTE TÉCNICO EXPORTADO",
            description: "El Manual Maestro se ha generado exitosamente bajo protocolo seguro.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* Header HUD Fijo */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Secure Stream</span>
                    </div>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Navegación Lateral HUD */}
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03]"><ListTree className="h-20 w-20" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                <NavButton label="1.0 Bienvenida" onClick={() => scrollToSection("intro")} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quickstart")} />
                                <NavButton label="3.0 Requisitos" onClick={() => scrollToSection("requirements")} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20">Módulos Maestros</div>
                                {manualModules.map((mod) => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20">Anexos</div>
                                <NavButton label="Seguridad & Privacidad" onClick={() => scrollToSection("security")} />
                                <NavButton label="Troubleshooting" onClick={() => scrollToSection("troubleshooting")} />
                                <NavButton label="Glosario Técnico" onClick={() => scrollToSection("glossary")} />
                                <NavButton label="Soporte Maestro" onClick={() => scrollToSection("support")} />
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-20 md:space-y-32">
                        {/* 1.0 Introducción */}
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6">
                                    <Sparkles className="h-3 w-3" /> NODO CENTRAL 0.0
                                </div>
                                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none mb-8">{introSection.title}</h2>
                                <div className="space-y-6 border-l-4 border-primary/20 pl-8">
                                    <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify">{introSection.text}</p>
                                    <div className="grid sm:grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-2">
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-primary">Misión Estratégica</h4>
                                            <p className="text-xs font-bold text-white/40 uppercase leading-snug">{introSection.mission}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-primary">Perfil de Usuario</h4>
                                            <p className="text-xs font-bold text-white/40 uppercase leading-snug">{introSection.target}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* 2.0 Quick Start */}
                        <section id="quickstart" className="space-y-12 scroll-mt-24">
                            <SectionHeader title="2.0 Guía de Inicio Rápido" />
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((item, i) => (
                                    <Card key={i} className="glass-card p-8 bg-white/[0.02] border-white/5 rounded-[2.5rem] group hover:border-primary/20 transition-all shadow-xl relative overflow-hidden">
                                        <div className="text-5xl font-black text-primary/10 mb-4 group-hover:text-primary/40 transition-colors italic">{item.step}</div>
                                        <h4 className="font-black uppercase text-base tracking-widest text-white italic mb-3">{item.title}</h4>
                                        <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* 3.0 Requisitos */}
                        <section id="requirements" className="space-y-12 scroll-mt-24">
                            <SectionHeader title="3.0 Requisitos del Sistema" />
                            <div className="grid sm:grid-cols-2 gap-6">
                                {technicalRequirements.items.map((req, i) => (
                                    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/10 transition-all flex items-start gap-6 group">
                                        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 group-hover:scale-110 transition-transform"><Info className="h-4 w-4 text-primary" /></div>
                                        <div>
                                            <h4 className="font-black uppercase text-[10px] tracking-widest text-white mb-2 italic">{req.label}</h4>
                                            <p className="text-[10px] font-medium text-white/40 leading-relaxed uppercase">{req.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Módulos */}
                        {manualModules.map((mod) => (
                            <section key={mod.id} id={mod.id} className="space-y-12 scroll-mt-24">
                                <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-10 opacity-[0.02]"><mod.icon className="h-40 w-40" /></div>
                                        <div className="p-8 bg-primary/10 rounded-[3rem] border border-primary/20 shadow-glow relative z-10"><mod.icon className="h-12 w-12 text-primary" /></div>
                                        <div className="space-y-3 text-center md:text-left relative z-10">
                                            <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic opacity-60">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-12 md:p-16 space-y-16">
                                        <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 shadow-inner relative">
                                            <div className="absolute top-6 right-8 opacity-20"><Activity className="h-5 w-5 text-primary animate-pulse" /></div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-8 flex items-center gap-3">
                                                <Terminal className="h-4 w-4" /> Procedimiento de Ejecución
                                            </h4>
                                            <div className="text-sm font-bold italic text-white/80 leading-relaxed text-justify space-y-4">
                                                {mod.procedure.split('. ').map((step, idx) => (
                                                    <p key={idx} className="flex gap-4"><span className="text-primary">[{idx + 1}]</span> {step}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-primary/40 pl-6">Arquitectura de Ingeniería</h4>
                                            <p className="text-lg font-medium text-white/50 leading-relaxed italic text-justify">{mod.details}</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-12 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                                            <ShieldCheck className="h-3.5 w-3.5" /> AES-512 SECURED
                                        </div>
                                        <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg">VERIFIED BY NODO MAESTRO</Badge>
                                    </CardFooter>
                                </Card>
                            </section>
                        ))}

                        {/* Seguridad & Privacidad */}
                        <section id="security" className="space-y-12 scroll-mt-24">
                            <SectionHeader title="Soberanía y Seguridad del Dato" />
                            <Card className="glass-card p-12 rounded-[3rem] border-white/5 bg-primary/5">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Arquitectura Zero-Knowledge</h4>
                                        <p className="text-sm text-white/60 leading-relaxed text-justify">
                                            Sus documentos están fragmentados y cifrados antes de salir de su dispositivo. Kyron no posee las llaves maestras; solo su firma biométrica puede recomponer la información en el nodo de salida.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Recuperación de Nodo</h4>
                                        <p className="text-sm text-white/60 leading-relaxed text-justify">
                                            En caso de pérdida de terminal, el protocolo de recuperación requiere validación presencial ante el Oficial de Cumplimiento o el uso de la llave de recuperación física generada durante el enrolamiento.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </section>

                        {/* Troubleshooting */}
                        <section id="troubleshooting" className="space-y-12 scroll-mt-24">
                            <SectionHeader title="Resolución de Incidencias" />
                            <div className="space-y-4">
                                {troubleshooting.map((t, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-3xl border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="space-y-2">
                                                <h4 className="font-black text-sm uppercase italic text-rose-500 flex items-center gap-2">
                                                    <ShieldAlert className="h-4 w-4" /> {t.issue}
                                                </h4>
                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{t.cause}</p>
                                            </div>
                                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl md:w-1/2">
                                                <p className="text-xs font-bold text-emerald-400 italic">SOLUCIÓN: {t.solution}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Glosario */}
                        <section id="glossary" className="space-y-12 scroll-mt-24">
                            <SectionHeader title="Glosario Técnico v2.6.5" />
                            <div className="grid gap-4">
                                {glossaryTerms.map((g, i) => (
                                    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-primary/20 transition-all group flex flex-col md:flex-row gap-6 md:items-center">
                                        <div className="md:w-1/3 font-black uppercase text-xs tracking-widest text-primary italic group-hover:translate-x-2 transition-transform">{g.term}</div>
                                        <div className="md:w-2/3 text-[11px] font-medium text-white/30 leading-relaxed uppercase group-hover:text-white/60 transition-colors">{g.def}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Soporte */}
                        <section id="support" className="space-y-12 scroll-mt-24 pb-20">
                            <Card className="glass-card p-12 md:p-20 rounded-[4rem] border-primary/20 bg-primary/10 text-center relative overflow-hidden shadow-glow">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0,transparent_70%)]" />
                                <div className="relative z-10 space-y-8">
                                    <HelpCircle className="h-20 w-20 text-primary mx-auto animate-pulse" />
                                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white italic-shadow">Soporte Técnico Nivel 5</h2>
                                    <p className="text-lg text-white/60 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed italic">
                                        Si requiere asistencia personalizada o auditoría de nodo, nuestro equipo de ingeniería está disponible 24/7.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
                                        <Button size="lg" className="h-16 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest" asChild>
                                            <a href="mailto:infosystemkyron@gmail.com">SOPORTE POR EMAIL</a>
                                        </Button>
                                        <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl font-black uppercase text-xs tracking-widest border-white/10 hover:bg-white/5" asChild>
                                            <Link href="/#contacto">SOLICITAR DEMO</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
            
            <footer className="py-20 border-t border-white/5 bg-black/80 text-center relative z-[140] backdrop-blur-3xl">
                <div className="flex items-center justify-center gap-12 mb-10 text-[8px] font-black uppercase tracking-[0.6em] text-white/10 italic">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Encrypt: AES-512</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> AI Node: Active</span>
                    <span className="flex items-center gap-2"><Database className="h-3 w-3" /> Ledger: Verified</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1.5em] text-white/5 italic">SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026</p>
            </footer>
        </div>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-8">
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white shrink-0">{title}</h3>
            <div className="h-px flex-1 bg-white/10"></div>
        </div>
    );
}

function NavButton({ label, onClick, icon: Icon }: { label: string, onClick: () => void, icon?: any }) {
    return (
        <button 
            onClick={onClick} 
            className="group w-full text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between border border-transparent hover:border-primary/20"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />}
                <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </button>
    );
}
