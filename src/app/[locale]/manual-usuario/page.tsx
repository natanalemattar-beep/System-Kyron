
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
    Shield,
    Volume2,
    Coins,
    School,
    Wand2,
    Printer,
    X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const introSection = {
    title: "1.0 Bienvenido a System Kyron v2.6.5",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    target: "Empresas de alto rendimiento, instituciones de misión crítica y ciudadanos digitales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que ofrece líneas 5G, gestión eSIM y equipos homologados como servicio base. Sobre esta infraestructura de red, desplegamos un ecosistema de cumplimiento normativo total que garantiza la operación legal de su empresa ante todas las instituciones rectoras del Estado venezolano: tributario (SENIAT), telecomunicaciones (CONATEL), registral (SAREN), propiedad intelectual (SAPI), laboral (LOTTT, IVSS, FAOV, INCES) y protección del menor (LOPNNA). Cada transacción y registro es blindado por inteligencia artificial predictiva y un ledger blockchain que asegura su inmutabilidad. Este manual proporciona los protocolos para operar los nodos del sistema con absoluta solvencia legal.  Misión: Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales."
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
        { label: "Navegación", desc: "Chromium v115+ (Chrome/Edge) / WebKit (Safari 15+). Aceleración por hardware habilitada." },
        { label: "Sistemas Móviles", desc: "Android 11+ o iOS 15+. Soporte para tecnología eSIM (eUICC) requerido para módulos telecom." },
        { label: "Hardware Estación", desc: "Mínimo 4GB RAM (8GB recomendado). Cámara HD 1080p con soporte para profundidad." },
        { label: "Conectividad Red", desc: "Enlace simétrico > 5Mbps estable. Latencia < 50ms para sincronización Ledger." },
        { label: "Seguridad Hardware", desc: "Habilitación de TPM 2.0 y soporte para cifrado AES-NI en procesador." }
    ]
};

const glossaryTerms = [
    { term: "AES-512", def: "Protocolo de cifrado de grado militar utilizado para el blindaje de la bóveda de documentos." },
    { term: "eIDAS", def: "Estándar de la Unión Europea para la identificación electrónica y servicios de confianza." },
    { term: "SM-DP+", def: "Servidor de gestión de datos de suscripción para el aprovisionamiento remoto de eSIMs." },
    { term: "Network Slicing", def: "Capacidad de la red 5G para crear sub-redes virtuales con parámetros de QoS específicos." },
    { term: "VNF", def: "Funciones de Red Virtualizadas que permiten ejecutar servicios de telecom en la nube." },
    { term: "RIPF Automatizado", def: "Reajuste por Inflación Fiscal calculado en tiempo real según el INPC del BCV." },
    { term: "Ledger Inmutable", def: "Registro de transacciones encadenado criptográficamente que impide alteraciones posteriores." },
    { term: "Eco-Créditos (ECR)", def: "Activos digitales tokenizados que representan la huella de carbono compensada." }
];

const innovationModules = [
    {
        id: "voice",
        title: "Interacción por Voz (V-IA)",
        icon: Volume2,
        description: "Asistente inteligente con procesamiento de lenguaje natural venezolano.",
        procedure: "1. Active el botón flotante. 2. Realice su consulta (ej: '¿Cuándo vence el IVA?'). 3. El sistema procesará y responderá por audio y texto.",
        details: "Utiliza motores de reconocimiento de voz de alta precisión entrenados con el corpus legal y fiscal de Venezuela."
    },
    {
        id: "mercado",
        title: "Mercado de Eco-Créditos",
        icon: Coins,
        description: "Exchange descentralizado para la comercialización de bonos verdes.",
        procedure: "1. Acceda al Mercado. 2. Seleccione 'Vender' o 'Comprar'. 3. Ejecute la transacción en el Ledger. 4. Obtenga su certificado de Carbono Neutral.",
        details: "Crea una economía secundaria basada en la sustentabilidad, permitiendo a empresas rentabilizar sus hábitos de reciclaje."
    },
    {
        id: "generador",
        title: "Generador IA de Documentos",
        icon: Wand2,
        description: "Redacción automatizada de contratos bajo normativa legal vigente.",
        procedure: "1. Elija el tipo de contrato. 2. Ingrese los datos de las partes. 3. Defina condiciones especiales. 4. Genere y firme el borrador.",
        details: "Integración con el nodo jurídico para asegurar que cada cláusula cumpla con el Código Civil y de Comercio."
    }
];

const manualModules = [
    {
        id: "identidad",
        title: "Identidad Digital 3D",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación y resguardo de documentos civiles.",
        procedure: "1. Acceda a 'Mi ID Digital'. 2. Inicie 'Enrolamiento'. 3. Siga la guía visual de mapeo facial. 4. Firme el acta digital con clave maestra.",
        details: "Utiliza 512 puntos vectoriales para crear un hash de identidad único vinculado a su Cédula/RIF. Cumple con estándares eIDAS de alta confianza."
    },
    {
        id: "telecom",
        title: "Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes convergentes y telefonía digital corporativa.",
        procedure: "1. Ingrese a Gestión de Telecom. 2. Genere perfil eSIM. 3. Escanee el código QR en el terminal. 4. Active el nodo de datos y valide señal.",
        details: "Soporte para Multi-IMSI y Network Slicing. Gestión de flota mediante servidor SM-DP+ certificado por GSMA."
    },
    {
        id: "tpv",
        title: "Punto de Venta IA",
        icon: TabletSmartphone,
        description: "Operativa comercial con validación fiscal síncrona en tiempo real.",
        procedure: "1. Valide operador biométricamente. 2. Escanee productos. 3. Ingrese pago multimoneda. 4. Emita factura fiscal homologada.",
        details: "Integración nativa con máquinas fiscales y pasarelas de pago. Detección automática de IGTF y exenciones de IVA por IA."
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
            <div style="text-align: center; margin-bottom: 60pt; border: 4pt double #0ea5e9; padding: 40pt; border-radius: 20pt; background-color: #f0f9ff;">
                <h1 style="color: #0ea5e9; font-size: 42pt; font-family: 'Arial Black', sans-serif; margin-bottom: 10pt; text-transform: uppercase;">SYSTEM KYRON</h1>
                <p style="color: #1e293b; font-size: 18pt; font-weight: bold; text-transform: uppercase; letter-spacing: 5pt; margin-bottom: 30pt;">Expediente Técnico Maestro v2.6.5</p>
                <div style="width: 100pt; height: 2pt; background-color: #0ea5e9; margin: 0 auto 20pt;"></div>
                <p style="color: #64748b; font-size: 12pt; font-style: italic;">Manual de Operaciones de Grado Corporativo • Innovación IA & Sustentabilidad</p>
            </div>

            <h2 style="color: #0ea5e9; border-left: 15pt solid #0ea5e9; padding-left: 15pt; margin-top: 40pt; font-family: 'Arial Black';">1.0 INTRODUCCIÓN GENERAL</h2>
            <p style="text-align: justify; font-size: 11pt; line-height: 1.8; color: #334155;">${introSection.text}</p>

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">2.0 REQUISITOS TÉCNICOS DE OPERACIÓN</h2>
            <table>
                <tr style="background-color: #0ea5e9; color: white;"><th>CATEGORÍA</th><th>ESPECIFICACIÓN MAESTRA</th></tr>
                ${technicalRequirements.items.map(req => `<tr><td style="font-weight:bold;">${req.label}</td><td>${req.desc}</td></tr>`).join('')}
            </table>

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">3.0 GUÍA DE INICIO RÁPIDO (QUICK START)</h2>
            ${quickStartSteps.map(step => `
                <div style="margin-top: 15pt; padding: 15pt; border: 1pt solid #e2e8f0; border-radius: 10pt;">
                    <h3 style="color: #0ea5e9; margin-top: 0;">PASO ${step.step}: ${step.title}</h3>
                    <p style="font-size: 10pt; color: #64748b;">${step.desc}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">4.0 INNOVACIONES DE GRADO SUPERIOR (TIER 2)</h2>
            ${innovationModules.map(mod => `
                <div style="margin-top: 20pt; padding: 20pt; border: 1pt solid #e2e8f0; border-radius: 10pt; background: #f8fafc;">
                    <h3 style="color: #0ea5e9; margin-top: 0; text-transform: uppercase; font-family: 'Arial Black'; font-size: 14pt;">${mod.title}</h3>
                    <p style="font-size: 10pt; color: #64748b; font-weight: bold;">${mod.description}</p>
                    <p style="font-size: 9pt; margin-top: 10pt;"><strong>PROCEDIMIENTO:</strong> ${mod.procedure}</p>
                    <p style="font-size: 9pt; margin-top: 5pt; color: #94a3b8; font-style: italic;">${mod.details}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">5.0 PROTOCOLOS POR MÓDULO (EXPANDIDO)</h2>
            ${manualModules.map(mod => `
                <div style="margin-top: 20pt; padding: 20pt; border: 1pt solid #e2e8f0; border-radius: 10pt;">
                    <h3 style="color: #0ea5e9; margin-top: 0;">${mod.title}</h3>
                    <p style="font-weight:bold; color:#64748b;">${mod.description}</p>
                    <p><strong>PROCEDIMIENTO DE EJECUCIÓN:</strong> ${mod.procedure}</p>
                    <p style="font-size: 9pt; margin-top: 10pt; color: #94a3b8;">${mod.details}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">6.0 GLOSARIO DE INGENIERÍA</h2>
            <table>
                <tr style="background-color: #0ea5e9; color: white;"><th>TÉRMINO</th><th>DEFINICIÓN TÉCNICA</th></tr>
                ${glossaryTerms.map(term => `<tr><td style="font-weight:bold; color:#0ea5e9;">${term.term}</td><td>${term.def}</td></tr>`).join('')}
            </table>

            <h2 style="color: #0ea5e9; margin-top: 50pt; border-left: 15pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">7.0 SOPORTE Y RESOLUCIÓN DE INCIDENCIAS</h2>
            <div style="padding: 20pt; border: 1pt solid #ef4444; border-radius: 10pt; background: #fef2f2;">
                <h3 style="color: #ef4444; margin-top: 0;">TROUBLESHOOTING MAESTRO</h3>
                <p><strong>Falla en Biometría:</strong> Limpie el sensor óptico y asegure iluminación frontal > 500 lux.</p>
                <p><strong>Error de Sincronización:</strong> Verifique latencia de red. El Ledger requiere < 50ms.</p>
                <p><strong>Falla eSIM:</strong> Valide compatibilidad eUICC del terminal móvil.</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title><style>table { width: 100%; border-collapse: collapse; } th, td { border: 1pt solid #ddd; padding: 10pt; text-align: left; font-size: 10pt; }</style></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "EXPEDIENTE EXPORTADO", description: "Manual v2.6.5 generado con éxito bajo protocolo seguro." });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><ChevronLeft className="mr-2 h-3 w-3" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos de Innovación</div>
                                {innovationModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos Base</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <NavButton label="Apéndice: Glosario" onClick={() => scrollToSection("glossary")} icon={BookOpen} />
                            </CardContent>
                        </Card>
                    </aside>

                    <div className="lg:col-span-8 space-y-32">
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6">
                                <Sparkles className="h-3 w-3" /> NODO CENTRAL v2.6.5
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">{introSection.title}</h2>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                        </section>

                        <section id="quick" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" /> 2.0 Inicio Rápido (Quick Start)
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((item, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/[0.01]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl font-black text-primary/40 italic">{item.step}</span>
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                        <h4 className="font-black uppercase text-sm mb-2">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-yellow-500 flex items-center gap-4">
                                <Zap className="h-6 w-6" /> Innovaciones Tier 2
                            </h3>
                            {innovationModules.map(mod => (
                                <ModuleCard key={mod.id} mod={mod} color="text-yellow-500" />
                            ))}
                        </div>

                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4">
                                <Cpu className="h-6 w-6" /> Módulos Corporativos
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleCard key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        <section id="glossary" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <BookOpen className="h-6 w-6 text-primary" /> Apéndice: Glosario Técnico
                            </h3>
                            <div className="grid gap-4">
                                {glossaryTerms.map((term, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-4">
                                        <span className="text-xs font-black text-primary uppercase tracking-widest min-w-[120px]">{term.term}</span>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{term.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavButton({ label, onClick, icon: Icon }: { label: string, onClick: () => void, icon?: any }) {
    return (
        <button 
            onClick={onClick} 
            className="group w-full text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />}
                <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
    );
}

function ModuleCard({ mod, color }: { mod: any, color: string }) {
    return (
        <section id={mod.id} className="scroll-mt-24">
            <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all hover:border-primary/20">
                <CardHeader className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                    <div className={cn("p-8 rounded-[3rem] border border-white/10 shadow-inner", color === 'text-yellow-500' ? 'bg-yellow-500/10' : 'bg-primary/10')}>
                        <mod.icon className={cn("h-12 w-12", color)} />
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">{mod.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Procedimiento Operativo
                        </h4>
                        <div className="text-sm font-bold italic text-white/80 leading-relaxed text-justify space-y-4">
                            {mod.procedure.split('. ').map((step: string, idx: number) => (
                                <p key={idx} className="flex gap-4"><span className={color}>[{idx + 1}]</span> {step}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Arquitectura Técnica</h4>
                        <p className="text-lg font-medium text-white/50 leading-relaxed italic text-justify">{mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> AES-512 SECURED
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg">VERIFIED BY NODO MAESTRO</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
