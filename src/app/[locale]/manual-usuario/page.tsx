
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    HeartHandshake,
    Download,
    Home,
    Sparkles,
    Server,
    Database,
    Zap,
    CheckCircle,
    ChevronRight,
    Lock,
    Printer,
    Activity,
    Scale,
    FileText,
    ListTree,
    HelpCircle,
    ShieldAlert,
    Rocket,
    Globe,
    Terminal,
    RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * DOCUMENTACIÓN TÉCNICA MASIVA Y EXHAUSTIVA.
 * Cumple con el Checklist institucional completo.
 */

const introSection = {
    title: "1.0 Bienvenido a System Kyron",
    mission: "Nuestra misión es blindar la gestión institucional y empresarial mediante tecnología inmutable, garantizando soberanía de datos y eficiencia de misión crítica.",
    text: "System Kyron v2.6.5 representa la cúspide de la ingeniería de software aplicada a la gestión corporativa. Este ecosistema integra telecomunicaciones 5G, inteligencia artificial fiscal predictiva y un ledger blockchain inmutable. Este manual ha sido diseñado para guiar a empresas, ciudadanos e instituciones en la operación segura del sistema."
};

const quickStartSteps = [
    { step: "01", title: "Registro de Nodo", desc: "Cree su cuenta corporativa o personal validando su RIF/Cédula ante el motor de cumplimiento Kyron." },
    { step: "02", title: "Enrolamiento Biométrico", desc: "Configure su ID Digital 3D. Este será su pase maestro para todas las operaciones de alta seguridad." },
    { step: "03", title: "Activación de Servicios", desc: "Habilite su línea Kyron 5G y sincronice su terminal para recibir notificaciones en tiempo real." },
    { step: "04", title: "Inyección de Datos", desc: "Cargue sus inventarios o documentos legales para que la IA comience el monitoreo preventivo." }
];

const technicalRequirements = {
    title: "Requisitos Técnicos del Sistema",
    items: [
        { label: "Conectividad", desc: "Enlace mínimo de 10Mbps. Recomendado: Red 5G Kyron Hyper-Connect para latencia <14ms." },
        { label: "Hardware Terminal", desc: "Procesador Quad-Core, 4GB RAM. Soporte eUICC para activación inmediata de eSIM." },
        { label: "Navegación", desc: "Navegadores basados en Chromium (v110+) con aceleración de hardware habilitada." },
        { label: "Seguridad", desc: "Cámara frontal HD para validación biométrica facial 3D." }
    ]
};

const glossaryTerms = [
    { term: "Ledger Inmutable", def: "Registro digital de transacciones sellado criptográficamente que no admite modificaciones posteriores." },
    { term: "eSIM (eUICC)", def: "Chip integrado que permite el aprovisionamiento remoto de perfiles de red sin necesidad de tarjeta física." },
    { term: "Inducción Magnética", def: "Tecnología de sensores para clasificar materiales reciclables mediante su firma electromagnética." },
    { term: "Zero-Knowledge", def: "Arquitectura de privacidad donde Kyron resguarda sus datos pero no tiene la llave técnica para verlos." }
];

const troubleshootingItems = [
    { issue: "¿La biometría falla?", solution: "Asegúrese de estar en un área iluminada. Evite reflejos directos en la lente y mantenga el rostro a 30cm del terminal." },
    { issue: "¿eSIM no activa?", solution: "Verifique que su dispositivo sea compatible con tecnología eUICC y tenga señal de red móvil activa." },
    { issue: "¿Inconsistencia fiscal?", solution: "Ejecute el 'Escáner de Coherencia' en el módulo de contabilidad para sincronizar con la última Gaceta Oficial." }
];

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos bajo estándares AES-512.",
        procedure: "Para enrolar su rostro: 1. Ingrese a 'ID Digital'. 2. Seleccione 'Enrolar'. 3. Siga los puntos de luz en pantalla. 4. Realice el patrón de parpadeo.",
        content: [
            {
                sub: "Arquitectura Biométrica 3D",
                text: "El motor de visión artificial mapea 512 puntos vectoriales únicos. La validación de 'Liveness' detecta micro-movimientos para impedir suplantaciones por fotos o videos."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G",
        icon: Radio,
        description: "Aprovisionamiento digital remoto de líneas bajo estándares internacionales GSMA.",
        procedure: "Para activar eSIM: 1. Elija su plan. 2. Solicite el código QR dinámico. 3. Escanee desde la configuración de red de su móvil. 4. Reinicie el enlace.",
        content: [
            {
                sub: "Servidor SM-DP+ Corporativo",
                text: "Kyron gestiona perfiles eSIM de forma masiva, permitiendo el despliegue de flotas corporativas en minutos sin logística física."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) Inteligente",
        icon: TabletSmartphone,
        description: "Comercialización con validación síncrona de datos fiscales en tiempo real.",
        procedure: "Para facturar: 1. Valide su ID de cajero. 2. Ingrese el RIF del cliente. 3. Escanee productos. 4. Emita la factura legal SENIAT.",
        content: [
            {
                sub: "Sincronización Fiscal 0071",
                text: "Cada venta consulta síncronamente la base de datos fiscal para asegurar que los datos del cliente sean 100% correctos y vigentes."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "4. Finanzas y Auditoría Predictiva",
        icon: TrendingUp,
        description: "Dashboard ejecutivo para toma de decisiones basada en analítica de retorno de inversión.",
        procedure: "Para simular factibilidad: 1. Cargue CapEx y OpEx. 2. Ajuste la tasa cambiaria. 3. Ejecute proyección. 4. Exporte el dictamen VAN/TIR.",
        content: [
            {
                sub: "Análisis Actuarial RIPF",
                text: "El sistema automatiza el Reajuste por Inflación Fiscal utilizando los índices oficiales del BCV, eliminando el error humano en balances."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const handleDownload = () => {
        let docContent = `
            <div style="text-align: center; margin-bottom: 40pt;">
                <h1 style="color: #0ea5e9; font-size: 36pt; font-family: 'Arial Black', sans-serif;">SYSTEM KYRON</h1>
                <p style="font-size: 14pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Manual Maestro de Usuario v2.6.5</p>
                <p style="margin-top: 20pt; color: #94a3b8;">DOCUMENTO DE GRADO CORPORATIVO • 2026</p>
            </div>
            <hr style="border: 1pt solid #eee; margin-bottom: 30pt;" />
            
            <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif;">1. BIENVENIDO</h2>
            <p style="text-align: justify; line-height: 1.6;">${introSection.text}</p>
            
            <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif; margin-top: 30pt;">2. GUÍA DE INICIO RÁPIDO</h2>
            <table style="width: 100%; border-collapse: collapse;">
                ${quickStartSteps.map(s => `
                    <tr>
                        <td style="padding: 10pt; border-bottom: 1pt solid #eee; font-weight: bold; color: #0ea5e9;">${s.step}</td>
                        <td style="padding: 10pt; border-bottom: 1pt solid #eee;"><strong>${s.title}</strong>: ${s.desc}</td>
                    </tr>
                `).join('')}
            </table>
        `;

        manualModules.forEach(mod => {
            docContent += `
                <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif; margin-top: 40pt;">MÓDULO: ${mod.title.toUpperCase()}</h2>
                <p style="background-color: #f8fafc; padding: 10pt; border-left: 4pt solid #0ea5e9;">${mod.description}</p>
                <h3 style="color: #1e293b; font-size: 11pt;">PROCEDIMIENTO OPERATIVO:</h3>
                <p style="font-style: italic; color: #475569;">${mod.procedure}</p>
                ${mod.content.map(c => `
                    <h4 style="color: #2d5a8e; margin-top: 15pt;">${c.sub}</h4>
                    <p style="text-align: justify; font-size: 10pt;">${c.text}</p>
                `).join('')}
            `;
        });

        docContent += `
            <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif; margin-top: 40pt;">REQUISITOS TÉCNICOS</h2>
            <table style="width: 100%; border-collapse: collapse;">
                ${technicalRequirements.items.map(i => `
                    <tr><td style="padding: 8pt; border: 1pt solid #ddd; font-weight: bold; background: #f1f5f9;">${i.label}</td><td style="padding: 8pt; border: 1pt solid #ddd;">${i.desc}</td></tr>
                `).join('')}
            </table>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 40pt; font-family: Arial, sans-serif;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + docContent + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA MAESTRA INICIADA",
            description: "El manual técnico exhaustivo se está exportando a Word.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                    <Download className="mr-2 h-3 w-3" /> EXPORTAR EXPEDIENTE (.DOC)
                </Button>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Índice del Nodo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1">
                                <button onClick={() => scrollToSection("bienvenido")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">1.0 Bienvenido</button>
                                <button onClick={() => scrollToSection("inicio-rapido")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">2.0 Inicio Rápido</button>
                                {manualModules.map((mod) => (
                                    <button key={mod.id} onClick={() => scrollToSection(mod.id)} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Módulo: {mod.id.toUpperCase()}</button>
                                ))}
                                <button onClick={() => scrollToSection("requisitos")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Requisitos</button>
                                <button onClick={() => scrollToSection("glosario")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Glosario</button>
                                <button onClick={() => scrollToSection("soporte")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Soporte</button>
                            </CardContent>
                        </Card>
                    </aside>

                    <div className="lg:col-span-8 space-y-16">
                        <section id="bienvenido" className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <Sparkles className="h-3 w-3" /> INTRODUCCIÓN
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">{introSection.title}</h2>
                            <p className="text-lg text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8 italic">{introSection.text}</p>
                        </section>

                        <section id="inicio-rapido" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">2.0 Inicio Rápido</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((step, i) => (
                                    <Card key={i} className="glass-card p-8 bg-white/[0.02] border-white/5 rounded-[2rem] group hover:border-primary/20 transition-all">
                                        <div className="text-4xl font-black text-primary/20 mb-4 group-hover:text-primary/60 transition-colors italic">{step.step}</div>
                                        <h4 className="font-black uppercase text-sm tracking-widest text-white mb-2 italic">{step.title}</h4>
                                        <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{step.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {manualModules.map((mod) => (
                            <section key={mod.id} id={mod.id} className="space-y-10 scroll-mt-24">
                                <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-10 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-white/[0.01]">
                                        <div className="p-6 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-glow"><mod.icon className="h-10 w-10 text-primary" /></div>
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 space-y-12">
                                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 flex items-center gap-2"><Activity className="h-3.5 w-3.5"/> Protocolo de Ejecución</h4>
                                            <p className="text-sm font-bold italic text-white/80 leading-relaxed">{mod.procedure}</p>
                                        </div>
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic border-l-2 border-primary/40 pl-4">{item.sub}</h4>
                                                <p className="text-base font-medium text-white/60 leading-relaxed italic text-justify">{item.text}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </section>
                        ))}

                        <section id="requisitos" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Requisitos Técnicos</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {technicalRequirements.items.map((req, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <h4 className="font-black uppercase text-[10px] tracking-widest text-primary mb-2">{req.label}</h4>
                                        <p className="text-xs font-medium text-white/60">{req.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="glosario" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Glosario Técnico</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid gap-4">
                                {glossaryTerms.map((g, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                        <h4 className="font-black uppercase text-xs tracking-widest text-primary italic mb-2">{g.term}</h4>
                                        <p className="text-xs font-medium text-white/40 leading-relaxed">{g.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="soporte" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Soporte y Contacto</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <Card className="bg-primary/5 border-primary/20 p-10 rounded-[3rem] text-center space-y-8 shadow-glow">
                                <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto border border-primary/20 shadow-glow"><HelpCircle className="h-12 w-12 text-primary" /></div>
                                <h4 className="text-3xl font-black uppercase italic italic-shadow">Asistencia Prioritaria</h4>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest btn-3d-primary">infosystemkyron@gmail.com</Button>
                                    <Button variant="outline" className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest border-white/10 bg-white/5">+58 212-KYRON-00</Button>
                                </div>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
            
            <footer className="py-16 border-t border-white/5 bg-black/80 text-center relative z-20">
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">SYSTEM KYRON • MASTER USER MANUAL • 2026</p>
            </footer>
        </div>
    );
}
