
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
    Gavel,
    Cpu,
    Recycle,
    Sparkles,
    Database,
    Zap,
    Lock,
    Download,
    ChevronLeft,
    ListTree,
    Terminal,
    RefreshCw,
    Activity,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    Search,
    ChevronRight,
    AlertTriangle,
    Shield,
    Volume2,
    Coins,
    Wand2,
    Printer,
    Monitor,
    BarChart3,
    Users,
    Target,
    Activity as ActivityIcon,
    Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * Versión de Grado Corporativo con Máxima Densidad Conceptual.
 */

const introSection = {
    title: "1.0 Introducción al Ecosistema de Misión Crítica",
    mission: "Garantizar la soberanía operativa y solvencia legal del sector privado mediante tecnología inmutable.",
    text: "System Kyron v2.6.5 no es una simple aplicación de gestión; es una infraestructura de ingeniería convergente diseñada para operar en el complejo entorno regulatorio venezolano. La plataforma se fundamenta sobre una red de telecomunicaciones 5G soberana, permitiendo que cada nodo administrativo (Fiscal, Legal, RRHH, Financiero) funcione con latencia cero y respaldo Blockchain. Este manual es el protocolo definitivo para la implementación y operación del sistema, asegurando que su organización alcance el estándar de 'Riesgo Cero' ante los entes reguladores del Estado: SENIAT, CONATEL, SAREN, SAPI, LOTTT e IVSS."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo", desc: "Ingrese credenciales maestras y realice el primer Enrolamiento Biométrico 3D.", icon: Terminal },
    { step: "02", title: "Sincronización Legal", desc: "Sincronice el sistema con la Gaceta Oficial y los índices INPC del BCV en tiempo real.", icon: RefreshCw },
    { step: "03", title: "Activación de Flotas", desc: "Habilite las líneas eSIM y los smartphones homologados para el personal clave.", icon: Smartphone },
    { step: "04", title: "Sellado de Ledger", desc: "Inicie el primer ciclo contable para activar el blindaje de inmutabilidad Blockchain.", icon: ShieldCheck }
];

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica",
        icon: Fingerprint,
        concept: "La identidad es el eje de la seguridad. Kyron utiliza patrones vectoriales 3D para crear una firma civil digital inerrante.",
        procedure: "1. Iniciar Enrolamiento. 2. Captura facial (512 puntos). 3. Verificación de Prueba de Vida (Liveness). 4. Sellado de ID Digital.",
        technical: "Cumplimiento total con el estándar europeo eIDAS. Algoritmos de reconocimiento con margen de error de 1:1.000.000."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM",
        icon: Radio,
        concept: "Infraestructura de conectividad soberana basada en estándares GSMA para flotas corporativas.",
        procedure: "1. Selección de perfil eUICC. 2. Aprovisionamiento remoto vía SM-DP+. 3. Activación de Network Slicing para datos críticos.",
        technical: "Soporte Multi-IMSI para redundancia de red. Cifrado EAP-AKA en la capa de transporte 5G."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) IA",
        icon: TabletSmartphone,
        concept: "Terminal de facturación inteligente que garantiza el cumplimiento fiscal en cada transacción.",
        procedure: "1. Validación de RIF automática. 2. Escaneo de activos. 3. Aplicación de IGTF/IVA según ley. 4. Emisión de Factura Fiscal QR.",
        technical: "Sincronización síncrona con el Ledger Contable y la Providencia Administrativa SNAT/2011/0071 del SENIAT."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad y RIPF",
        icon: BarChart3,
        concept: "Automatización integral del ciclo contable bajo normativas VEN-NIF y leyes de impuesto sobre la renta.",
        procedure: "1. Ejecución de Asientos Automáticos. 2. Ajuste por Inflación Fiscal (RIPF). 3. Generación de Estados Financieros Consolidados.",
        technical: "Motor actuarial integrado con los índices del Banco Central de Venezuela para cálculos de reajuste regulares."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y LOTTT",
        icon: Users,
        concept: "Administración estratégica del capital humano con blindaje legal ante normativas laborales venezolanas.",
        procedure: "1. Alta de ficha laboral. 2. Cálculo de conceptos LOTTT (Utilidades, Vacaciones). 3. Declaración de Parafiscales (IVSS, FAOV).",
        technical: "Módulo LOPNNA integrado para el registro de cargas familiares y cumplimiento de obligaciones de manutención."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y SAREN",
        icon: Gavel,
        concept: "Resguardo inmutable de la estructura legal y societaria de la empresa mediante sellado de tiempo RFC 3161.",
        procedure: "1. Registro de Actas de Asamblea. 2. Gestión de Poderes Notariados. 3. Control de Marcas y Patentes ante el SAPI.",
        technical: "Bóveda digital con cifrado AES-512 y arquitectura Zero-Knowledge: solo el representante legal tiene acceso a las llaves."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica de espacios físicos mediante visión artificial para presupuestos de alta precisión.",
        procedure: "1. Captura de imagen del local. 2. Procesamiento de nube de puntos. 3. Generación de planos métricos. 4. Cómputos métricos.",
        technical: "Integración de base de datos de precios unitarios (APU) para la generación automática de presupuestos de obra civil."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Economía Circular Magnética",
        icon: Recycle,
        concept: "Monetización de la responsabilidad ambiental mediante tecnología de inducción magnética síncrona.",
        procedure: "1. Autenticación en Smart Bin. 2. Depósito de residuos. 3. Clasificación magnética. 4. Tokenización de Eco-Créditos.",
        technical: "Protocolo de trazabilidad Blockchain para cada kilogramo reciclado, validable para auditorías de Carbono Neutralidad."
    },
    {
        id: "bi",
        title: "Módulo 9: Inteligencia de Negocio (BI)",
        icon: TrendingUp,
        concept: "Analítica predictiva de datos masivos para la toma de decisiones estratégicas de nivel ejecutivo.",
        procedure: "1. Definición de KPI Maestro. 2. Análisis de Sensibilidad Financiera. 3. Proyección de Escenarios de Mercado.",
        technical: "Motores de inferencia basados en redes neuronales recurrentes para la detección de anomalías en el flujo de caja."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad Militar",
        icon: ShieldCheck,
        concept: "Defensa proactiva de la infraestructura digital contra amenazas externas e internas.",
        procedure: "1. Monitoreo de Nodos. 2. Auditoría de Accesos. 3. Verificación de Integridad de Ledger. 4. Respuesta a Incidentes.",
        technical: "Implementación de arquitectura de confianza cero (Zero Trust) y cifrado cuánticamente resistente para activos críticos."
    }
];

const innovationTier2 = [
    {
        id: "voice",
        title: "Kyron Voice: Asistente V-IA",
        icon: Volume2,
        concept: "Interacción mediante lenguaje natural procesado por IA para consultas rápidas.",
        procedure: "Active el micrófono y consulte: '¿Cuándo vence mi declaración de IVA?' o 'Calcula la liquidación de Ana Pérez'.",
        technical: "Modelo NLP entrenado en el corpus legal y administrativo de la República Bolivariana de Venezuela."
    },
    {
        id: "ecocreditos",
        title: "Mercado de Eco-Créditos",
        icon: Coins,
        concept: "Exchange de activos verdes tokenizados para la compensación de huella de carbono entre empresas.",
        procedure: "1. Verificar saldo de E-CR. 2. Publicar oferta en el Ledger. 3. Ejecutar transacción inmutable entre nodos.",
        technical: "Contratos inteligentes (Smart Contracts) para la liquidación instantánea de bonos de sostenibilidad."
    },
    {
        id: "generador",
        title: "Generador de Contratos IA",
        icon: Wand2,
        concept: "Redacción automatizada de instrumentos legales de alta complejidad bajo el marco civil y mercantil.",
        procedure: "1. Seleccionar plantilla. 2. Inyectar datos de las partes. 3. Definir cláusulas específicas. 4. Validar firma digital.",
        technical: "Sincronización con el módulo jurídico para asegurar que los firmantes poseen los poderes vigentes necesarios."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        const docContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40pt; color: #1a1a1a;">
                <div style="text-align: center; border-bottom: 3pt solid #0ea5e9; padding-bottom: 20pt; margin-bottom: 40pt;">
                    <h1 style="color: #0ea5e9; font-size: 38pt; margin-bottom: 0;">SYSTEM KYRON</h1>
                    <p style="text-transform: uppercase; letter-spacing: 5pt; font-weight: bold; color: #64748b;">Manual Maestro de Operaciones v2.6.5</p>
                    <p style="font-size: 10pt; color: #94a3b8;">EXPEDIENTE DE GRADO CORPORATIVO • CONFIDENCIALIDAD NIVEL 5</p>
                </div>

                <h2 style="color: #0ea5e9; border-left: 10pt solid #0ea5e9; padding-left: 15pt; margin-bottom: 20pt;">1.0 INTRODUCCIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; font-size: 11pt; line-height: 1.6;">${introSection.text}</p>
                <div style="background-color: #f8fafc; padding: 15pt; border-radius: 10pt; margin-top: 15pt; border: 1pt solid #e2e8f0;">
                    <p style="font-weight: bold; color: #0ea5e9; margin-bottom: 5pt;">MISIÓN DEL NODO MAESTRO:</p>
                    <p style="font-style: italic;">${introSection.mission}</p>
                </div>

                <h2 style="color: #0ea5e9; border-left: 10pt solid #0ea5e9; padding-left: 15pt; margin-top: 40pt; margin-bottom: 20pt;">2.0 PROTOCOLOS OPERATIVOS MAESTROS</h2>
                ${manualModules.map(mod => `
                    <div style="margin-bottom: 30pt; page-break-inside: avoid;">
                        <h3 style="background-color: #0ea5e9; color: white; padding: 8pt 15pt; border-radius: 5pt; text-transform: uppercase;">${mod.title}</h3>
                        <div style="padding: 10pt;">
                            <p><strong>CONCEPTO FUNDAMENTAL:</strong> ${mod.concept}</p>
                            <div style="background-color: #f1f5f9; padding: 10pt; border-radius: 5pt; margin: 10pt 0;">
                                <p style="font-weight: bold; font-size: 9pt; color: #0369a1;">PROCEDIMIENTO PASO A PASO:</p>
                                <p>${mod.procedure}</p>
                            </div>
                            <p style="font-size: 9pt; color: #64748b; border-top: 1pt solid #eee; padding-top: 5pt;"><strong>RESPALDO TÉCNICO:</strong> ${mod.technical}</p>
                        </div>
                    </div>
                `).join('')}

                <h2 style="color: #0ea5e9; border-left: 10pt solid #0ea5e9; padding-left: 15pt; margin-top: 40pt; margin-bottom: 20pt;">3.0 INNOVACIONES DE GRADO SUPERIOR (TIER 2)</h2>
                ${innovationTier2.map(inn => `
                    <div style="margin-bottom: 25pt; border: 1pt solid #e2e8f0; border-radius: 8pt; padding: 15pt; background-color: #f0f9ff;">
                        <h3 style="color: #0369a1; margin-top: 0;">${inn.title}</h3>
                        <p><strong>OBJETIVO:</strong> ${inn.concept}</p>
                        <p style="font-size: 10pt; color: #334155;"><strong>OPERACIÓN:</strong> ${inn.procedure}</p>
                        <p style="font-size: 9pt; font-style: italic; color: #64748b; margin-top: 10pt;">Integración de Ingeniería: ${inn.technical}</p>
                    </div>
                `).join('')}

                <div style="margin-top: 60pt; text-align: center; border-top: 2pt solid #eee; padding-top: 30pt;">
                    <p style="font-size: 9pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 3pt;">System Kyron Corporate Node • © 2026</p>
                    <p style="font-size: 8pt; color: #cbd5e1;">Todos los derechos reservados. El uso no autorizado de este protocolo será perseguido legalmente.</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 0; margin: 0;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + docContent + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "EXPEDIENTE EXPORTADO", description: "Manual Maestro v2.6.5 descargado con éxito bajo protocolo seguro." });
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
            {/* Header Flotante HUD */}
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
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Navegación Lateral HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><ActivityIcon className="h-20 w-20 text-primary" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones de Vanguardia</div>
                                {innovationTier2.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal de Alta Densidad */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* 1.0 Introducción */}
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6"
                            >
                                <Sparkles className="h-3 w-3" /> NODO CENTRAL v2.6.5
                            </motion.div>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">{introSection.title}</h2>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                            <Card className="bg-primary/5 border-primary/20 p-8 rounded-[2rem]">
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2">Misión Institucional</p>
                                <p className="text-lg font-bold italic text-white/90">{introSection.mission}</p>
                            </Card>
                        </section>

                        {/* 2.0 Quick Start */}
                        <section id="quick" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" /> 2.0 Guía de Inicio Rápido
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((item, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl font-black text-primary/40 italic">{item.step}</span>
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                        <h4 className="font-black uppercase text-sm mb-2 text-white/90 tracking-widest">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Módulos de Operación */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4">
                                <Cpu className="h-6 w-6" /> 3.0 Protocolos Operativos
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        {/* Innovaciones Tier 2 */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary flex items-center gap-4">
                                <Sparkles className="h-6 w-6" /> 4.0 Innovaciones de Vanguardia
                            </h3>
                            {innovationTier2.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-secondary" />
                            ))}
                        </div>

                        {/* Footer del Manual */}
                        <footer className="pt-20 border-t border-white/5 text-center space-y-6">
                            <Logo className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                                SYSTEM KYRON MASTER PROTOCOL • END OF FILE
                            </p>
                        </footer>
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
            className="group w-full text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between border border-transparent hover:border-primary/20"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />}
                <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
    );
}

function ModuleSection({ mod, color }: { mod: any, color: string }) {
    return (
        <section id={mod.id} className="scroll-mt-24 group">
            <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/30">
                <CardHeader className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                    <div className={cn("p-8 rounded-[3rem] border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700", color === 'text-secondary' ? 'bg-secondary/10' : 'bg-primary/10')}>
                        <mod.icon className={cn("h-12 w-12", color)} />
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">Protocolo Operativo Verificado</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 flex items-center gap-2">
                            <BookOpen className="h-3 w-3" /> Concepto Fundamental
                        </h4>
                        <p className="text-xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept || mod.description}</p>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Procedimiento de Ejecución
                        </h4>
                        <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-4">
                            {mod.procedure.split('. ').map((step: string, idx: number) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <span className={cn("font-black text-xs", color)}>[{idx + 1}]</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Arquitectura de Ingeniería</h4>
                        <p className="text-lg font-medium text-white/40 leading-relaxed italic text-justify">{mod.technical || mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> SECURE-NODE AUTH
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow">VERIFIED BY MASTER NODE</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
