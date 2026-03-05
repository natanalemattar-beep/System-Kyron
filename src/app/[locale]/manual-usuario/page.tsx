
"use client";

import { useState, useEffect } from "react";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardFooter 
} from "@/components/ui/card";
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
    Briefcase,
    School,
    Clock,
    CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * DOCUMENTO DE ACCESO PÚBLICO - MÁXIMA DENSIDAD TÉCNICA Y LEGAL.
 * Última revisión: Marzo 2026.
 */

const introSection = {
    title: "1.0 Introducción al Ecosistema de Misión Crítica",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que ofrece líneas 5G, gestión eSIM y equipos homologados como servicio base. Sobre esta infraestructura de red, desplegamos un ecosistema de cumplimiento normativo total que garantiza la operación legal de su empresa ante todas las instituciones rectoras del Estado venezolano: tributario (SENIAT), telecomunicaciones (CONATEL), registral (SAREN), propiedad intelectual (SAPI), laboral (LOTTT, IVSS, FAOV, INCES) y protección del menor (LOPNNA). Cada transacción y registro es blindado por inteligencia artificial predictiva y un ledger blockchain que asegura su inmutabilidad."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo", desc: "Ingrese sus credenciales maestras y valide su identidad biométrica inicial.", icon: Terminal },
    { step: "02", title: "Sincronización de Base", desc: "El sistema cargará automáticamente los últimos índices INPC y parámetros de ley.", icon: RefreshCw },
    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Fiscal, RRHH) desde el selector modular.", icon: Zap },
    { step: "04", title: "Inyección de Datos", desc: "Suba su base de clientes y productos mediante el motor de importación masiva.", icon: Database }
];

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        concept: "La identidad es la piedra angular de la soberanía digital. Implementamos protocolos de captura de 512 puntos vectoriales faciales bajo el estándar europeo eIDAS.",
        procedure: "1. Acceda al Nodo de Identidad. 2. Realice el escaneo facial 3D asegurando una iluminación adecuada. 3. El sistema ejecutará una prueba de vida (Liveness Detection).",
        technical: "Cifrado AES-512 con arquitectura Zero-Knowledge. Reconocimiento vectorial con tasa de error inferior al 0.0001%."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Provisión de infraestructura de red de baja latencia basada en estándares GSMA. El sistema actúa como un nodo de gestión inteligente para flotas corporativas.",
        procedure: "1. Ingrese al Centro de Control Telecom. 2. Seleccione el dispositivo del inventario homologado. 3. Escanee el código QR generado para instalar el perfil eSIM.",
        technical: "Soporte para Network Slicing y protocolos EAP-AKA para autenticación de red segura."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        concept: "Terminal de facturación diseñado para el cumplimiento estricto de la Providencia SNAT/2011/0071 del SENIAT.",
        procedure: "1. Inicie sesión mediante biometría. 2. Escanee los productos. 3. Valide el RIF del cliente vía OCR. 4. Emita la factura fiscal con código QR.",
        technical: "Integración con máquinas fiscales de nueva generación y sellado Blockchain de cada correlativo de control."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        concept: "Automatización del ciclo contable bajo normativas VEN-NIF. El sistema realiza el Reajuste por Inflación Fiscal (RIPF) de forma actuarial.",
        procedure: "1. Importación automática de transacciones. 2. Ejecución del motor de ajuste por inflación. 3. Generación de Estados Financieros sellados.",
        technical: "Algoritmos de partida doble con validación de integridad referencial y sincronización API con el BCV."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento",
        icon: Users,
        concept: "Administración estratégica de capital humano centrada en la LOTTT y LOPNNA. Gestiona salarios, beneficios y retenciones de forma automática.",
        procedure: "1. Alta de ficha de trabajador. 2. Configuración de conceptos prestacionales. 3. Cálculo de quincena y aportes. 4. Envío de recibos digitales.",
        technical: "Cálculo preciso de IVSS, FAOV e INCES. Módulo de LOPNNA para protección de menores y registro de cargas familiares."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN",
        icon: Gavel,
        concept: "Archivo digital de grado legal para el resguardo inmutable de activos jurídicos. Centraliza Actas, Poderes y Registros de Marca ante el SAPI.",
        procedure: "1. Digitalización de instrumentos legales. 2. Clasificación por expediente. 3. Configuración de alertas de renovación.",
        technical: "Timestamping RFC 3161 y encriptación Zero-Knowledge accesible solo mediante llave biométrica del titular."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica avanzada de activos físicos. Nuestra IA procesa registros fotográficos para generar planos a escala.",
        procedure: "1. Captura de fotos multiaxiales del espacio. 2. Carga al Nodo de Ingeniería. 3. Procesamiento IA del plano 2D/3D.",
        technical: "Redes neuronales convolucionales para detección de elementos estructurales. Exportación compatible con AutoCAD."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Eco-Créditos y Reciclaje",
        icon: Recycle,
        concept: "Iniciativa para la monetización de la responsabilidad ambiental mediante Smart Bins con tecnología de inducción magnética.",
        procedure: "1. Identificación en Smart Bin vía QR. 2. Depósito de residuos. 3. Validación por magnetismo. 4. Acreditación inmediata de E-CR.",
        technical: "Protocolo de validación de hardware mediante sensores de campo electromagnético. Registro de activos en Ledger."
    },
    {
        id: "bi",
        title: "Módulo 9: Inteligencia de Negocio (BI)",
        icon: TrendingUp,
        concept: "Capa de analítica predictiva que transforma datos en decisiones maestras. Procesa millones de puntos para optimizar costos.",
        procedure: "1. Acceso al Centro de Mando Ejecutivo. 2. Visualización de KPIs críticos. 3. Simulación de escenarios 'What-If'.",
        technical: "Algoritmos de aprendizaje automático para detección de anomalías y proyecciones de flujo de caja.",
        screenshot: "https://picsum.photos/seed/kyron-bi-dashboard/800/400"
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad Cuántica",
        icon: ShieldCheck,
        concept: "Blindaje proactivo contra amenazas avanzadas (APT). Arquitectura Zero Trust donde cada transacción requiere doble validación.",
        procedure: "1. Configuración de Firewall Maestro. 2. Auditoría semanal de accesos. 3. Verificación de sellado Blockchain.",
        technical: "Protocolos resistentes a la computación cuántica y registro de logs WORM (Write Once Read Many)."
    }
];

const innovationTier2 = [
    {
        id: "voice",
        title: "Kyron Voice: Asistente por Voz IA",
        icon: Volume2,
        description: "Interacción humano-máquina optimizada para el léxico administrativo y legal venezolano.",
        procedure: "Pulse el icono de micrófono y consulte: '¿Cuándo vence el IVA?' o 'Lee el resumen de ventas'. El sistema responderá con síntesis de voz.",
        technical: "Modelos de lenguaje de gran escala (LLM) entrenados con la base legal de la República Bolivariana de Venezuela."
    },
    {
        id: "generador-ia",
        title: "Generador Jurídico IA",
        icon: Wand2,
        description: "Automatización de la redacción de instrumentos legales complejos alineados con la ley venezolana.",
        procedure: "1. Seleccione tipo de instrumento. 2. Inyecte datos de las partes. 3. Defina objeto y montos. 4. Genere y firme el borrador.",
        technical: "Validación de coherencia semántica contra el Módulo de Poderes para asegurar capacidad legal de los firmantes."
    },
    {
        id: "market-ecr",
        title: "Mercado de Eco-Créditos",
        icon: Coins,
        description: "Exchange de activos ambientales tokenizados para monetizar la sustentabilidad corporativa.",
        procedure: "1. Consulte balance E-CR. 2. Publique oferta en el Ledger. 3. Ejecute transacción. 4. Emisión de Certificado Carbono Neutral.",
        technical: "Contratos inteligentes en Blockchain para garantizar transparencia y evitar el doble gasto de activos verdes."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        let sectionsHtml = "";
        
        // ÍNDICE PARA WORD
        const indexDoc = `
            <div style="margin-bottom: 40pt;">
                <h2 style="color: #2d5a8e; border-bottom: 2px solid #2d5a8e; padding-bottom: 5px; text-transform: uppercase;">Índice Maestro</h2>
                <div style="line-height: 1.8; font-size: 11pt;">
                    <p>1.0 Introducción al Ecosistema .....................................................................</p>
                    <p>2.0 Guía de Inicio Rápido ...........................................................................</p>
                    ${manualModules.map((m, i) => `<p>Módulo ${i+1}: ${m.title} ................................................................</p>`).join('')}
                    ${innovationTier2.map(i => `<p>${i.title} ............................................................................</p>`).join('')}
                    <p>3.0 Soporte y Troubleshooting .....................................................................</p>
                    <p>4.0 Glosario de Ingeniería ...........................................................................</p>
                </div>
                <div style="page-break-after: always;"></div>
            </div>
        `;

        manualModules.forEach(mod => {
            sectionsHtml += `
                <div style="margin-bottom: 25pt; page-break-inside: avoid; border-bottom: 1px solid #eee; padding-bottom: 20pt;">
                    <h2 style="color: #2d5a8e; font-size: 18pt; margin-bottom: 10pt; text-transform: uppercase;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; color: #333;"><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f8fafc; padding: 12pt; border-left: 4pt solid #2d5a8e; margin: 10pt 0;">
                        <p style="color: #2d5a8e; font-weight: bold; margin-bottom: 5pt; font-size: 10pt;">PROCEDIMIENTO DE EJECUCIÓN:</p>
                        <p style="font-size: 10pt;">${mod.procedure}</p>
                    </div>
                    <p style="font-size: 9pt; color: #64748b; font-style: italic;"><strong>RESPALDO TÉCNICO:</strong> ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Times New Roman', serif; color: #1a1a1a;">
                <!-- PORTADA MAESTRA -->
                <div style="text-align: center; border: 4pt double #2d5a8e; padding: 60pt 30pt; margin-bottom: 80pt; border-radius: 15pt;">
                    <div style="margin-bottom: 30pt;"><span style="font-size: 60pt; color: #2d5a8e; font-weight: bold;">K</span></div>
                    <h1 style="color: #2d5a8e; font-size: 42pt; margin-bottom: 5pt; letter-spacing: 4pt; text-transform: uppercase;">SYSTEM KYRON</h1>
                    <p style="font-size: 18pt; font-weight: bold; color: #475569; margin-bottom: 10pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                    <p style="font-size: 12pt; color: #94a3b8; font-weight: bold;">VERSIÓN 2.6.5 • ÚLTIMA REVISIÓN: MARZO 2026</p>
                    <div style="margin-top: 50pt;">
                        <p style="font-size: 10pt; color: #22c55e; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                    </div>
                </div>

                ${indexDoc}

                <!-- INTRODUCCIÓN -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 30pt;">1.0 VISIÓN SISTÉMICA</h2>
                <p style="text-align: justify; line-height: 1.6; font-size: 12pt;">${introSection.text}</p>
                <div style="background-color: #f0f9ff; padding: 15pt; border-left: 5pt solid #2d5a8e; margin: 25pt 0;">
                    <p style="font-weight: bold; color: #0c4a6e; margin: 0; font-size: 11pt;">MISIÓN INSTITUCIONAL:</p>
                    <p style="font-style: italic; margin: 5pt 0 0 0; font-size: 12pt;">"${introSection.mission}"</p>
                </div>

                <!-- MÓDULOS -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 30pt;">2.0 NODOS DE INGENIERÍA</h2>
                ${sectionsHtml}

                <div style="page-break-before: always;"></div>

                <!-- SOPORTE -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt;">3.0 SOPORTE Y TROUBLESHOOTING</h2>
                <p style="font-size: 11pt;">Para incidencias técnicas, contacte al Nodo de Soporte Maestro en <strong>infosystemkyron@gmail.com</strong>. Respuesta garantizada en 24h hábiles.</p>

                <!-- FOOTER WORD -->
                <div style="margin-top: 80pt; text-align: center; border-top: 1pt solid #eee; padding-top: 20pt;">
                    <p style="font-size: 9pt; color: #94a3b8;">Manual System Kyron v2.6.5 • Página 1 de 45 • Revisión Marzo 2026</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 40pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE EXPORTADO", 
            description: "Enciclopedia Técnica generada bajo protocolo de alta fidelidad.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
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
            {/* Header HUD Permanente */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5 • Revisión 2026</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><ChevronLeft className="mr-2 h-3 w-3" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-3 w-3" /> EXPORTAR ENCICLOPEDIA
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Navegación Lateral HUD (ÍNDICE AUTOMATIZADO) */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="h-20 w-20 text-primary" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-0.4em text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Índice Maestro Interactivo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Nodos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones Tier 2</div>
                                {innovationTier2.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <NavButton label="3.0 Troubleshooting" onClick={() => scrollToSection("trouble")} icon={AlertTriangle} />
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* 1.0 Introducción */}
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <div className="flex items-center gap-6 mb-10">
                                <Logo className="h-20 w-20 drop-shadow-glow" />
                                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Visión <span className="text-primary">Maestra</span></h2>
                            </div>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 pt-4">
                                <Clock className="h-4 w-4" /> Última revisión: Marzo 2026
                            </div>
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
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4 border-b border-primary/20 pb-4">
                                <Cpu className="h-6 w-6" /> 3.0 Protocolos de Ingeniería
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        {/* Innovaciones Tier 2 */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary flex items-center gap-4 border-b border-secondary/20 pb-4">
                                <Sparkles className="h-6 w-6" /> 4.0 Innovaciones de Vanguardia
                            </h3>
                            {innovationTier2.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-secondary" />
                            ))}
                        </div>

                        {/* 5.0 Troubleshooting */}
                        <section id="trouble" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-red-500 flex items-center gap-4">
                                <AlertTriangle className="h-6 w-6" /> 5.0 Soporte y Troubleshooting
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { q: "¿Falla en el reconocimiento biométrico?", a: "Asegure iluminación uniforme sobre el rostro y limpie la lente de la cámara. El protocolo requiere visibilidad del 100% de los puntos vectoriales." },
                                    { q: "¿Error de conexión con el SM-DP+?", a: "Verifique que su red tenga habilitado el tráfico hacia los nodos de aprovisionamiento de Kyron. El retardo debe ser inferior a 150ms." },
                                    { q: "¿Libro de ventas no sincroniza con el Ledger?", a: "Inicie el protocolo de resincronización manual en el panel de contabilidad para forzar el sellado del bloque transaccional." }
                                ].map((item, i) => (
                                    <Card key={i} className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
                                        <p className="font-black text-[10px] uppercase text-red-500 mb-2 tracking-widest">INCIDENCIA {i+1}</p>
                                        <p className="font-bold text-sm mb-3 italic">{item.q}</p>
                                        <p className="text-xs text-white/60 font-medium leading-relaxed">{item.a}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        <footer className="pt-20 border-t border-white/5 text-center space-y-6">
                            <Logo className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                                SYSTEM KYRON MASTER PROTOCOL • v2.6.5 • MARZO 2026
                            </p>
                            <div className="text-[8px] font-bold text-white/5 uppercase tracking-[0.4em]">
                                Documento de Acceso Público Universal • Sello de Integridad #KYR-2026-FINAL
                            </div>
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
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">Nodo de Operación Certificado</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 flex items-center gap-2">
                            <BookOpen className="h-3 w-3" /> Concepto Maestro
                        </h4>
                        <p className="text-xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept || mod.description}</p>
                    </div>

                    {mod.screenshot && (
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/40 flex items-center gap-2 mb-4">
                                <Monitor className="h-3 w-3" /> Ejemplo de Interfaz (Simulado)
                            </h4>
                            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group/img">
                                <Image src={mod.screenshot} alt={mod.title} fill className="object-cover group-hover/img:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <Badge className="bg-primary text-white font-black text-[8px] uppercase tracking-widest">Preview: System Kyron Console</Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Protocolo de Ejecución
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
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Respaldo de Ingeniería</h4>
                        <p className="text-lg font-medium text-white/40 leading-relaxed italic text-justify">{mod.technical || mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> SECURED NODO v2.6.5
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow uppercase">Verified by Master Protocol</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
