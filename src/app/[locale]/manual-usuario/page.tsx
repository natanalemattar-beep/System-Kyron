
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
    Terminal,
    Activity,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    ChevronRight,
    AlertTriangle,
    Volume2,
    Coins,
    Wand2,
    Printer,
    BarChart3,
    Users,
    Target,
    Clock,
    CheckCircle,
    RefreshCw,
    School,
    Monitor,
    LayoutGrid
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * Estética web HUD limpia + Exportación Word de Alta Fidelidad (Portada Azul/Negra).
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Protocolo de autenticación basado en estándares eIDAS. Mapeo de 512 vectores faciales para firma electrónica inmutable.",
        procedure: "1. Calibración de sensor. 2. Captura multiaxial. 3. Validación de liveness. 4. Generación de hash SECP256K1.",
        technical: "Cifrado asimétrico ECC y almacenamiento en enclave seguro del hardware."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Gestión de red móvil virtual (MVNE). Aprovisionamiento remoto OTA de perfiles eUICC bajo GSMA SGP.22.",
        procedure: "1. Registro de EID. 2. Descarga de perfil cifrado. 3. Activación de Network Slicing. 4. Monitoreo de telemetría.",
        technical: "Arquitectura SDN con priorización de paquetes para nodos fiscales críticos."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta e Inteligencia Fiscal",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Automatización de la Providencia 0071 del SENIAT. Sincronización milimétrica con la tasa oficial del BCV.",
        procedure: "1. Login Biométrico. 2. Carga de RIF automática. 3. Escaneo de activos. 4. Emisión de factura con QR Ledger.",
        technical: "Motores de inferencia para cálculo de IVA, IGTF y retenciones en tiempo real."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#22c55e]",
        concept: "Cumplimiento normativo VEN-NIF. Ejecución automática del Reajuste por Inflación Fiscal (RIPF) actuarial.",
        procedure: "1. Importación de transacciones. 2. Clasificación de partidas. 3. Aplicación de INPC. 4. Generación de estados.",
        technical: "Procesamiento OLAP para análisis de rentabilidad y salud financiera del holding."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento (LOTTT)",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración integral de nómina y beneficios. Control riguroso de LOTTT, LOPNNA y Protección de Pensiones.",
        procedure: "1. Registro de ficha técnica. 2. Configuración prestacional. 3. Cálculo de quincena. 4. Despacho de recibos.",
        technical: "Algoritmos parametrizables y generación de archivos TXT para entes gubernamentales."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica Zero-Knowledge",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Archivo inmutable de instrumentos legales. Resguardo de Actas, Poderes y Marcas ante SAREN y SAPI.",
        procedure: "1. Escaneo UHD. 2. Sellado de tiempo RFC 3161. 3. Encriptación de acceso. 4. Alerta de vencimiento.",
        technical: "Hashing SHA-512 y arquitectura de seguridad sin conocimiento previo (ZKP)."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        color: "text-[#0ea5e9]",
        concept: "Planificación de infraestructura física mediante visión artificial. Cómputos métricos con precisión del 98%.",
        procedure: "1. Captura fotográfica. 2. Reconstrucción 3D SfM. 3. Identificación de superficies. 4. Presupuesto CapEx.",
        technical: "Redes Neuronales Convolucionales (CNN) para detección de materiales y volúmenes."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Reciclaje Magnético IA",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Monetización de residuos mediante tecnología de inducción magnética. Emisión de Eco-Créditos en Blockchain.",
        procedure: "1. Sincronización QR. 2. Clasificación por magnetismo. 3. Registro de peso. 4. Acreditación de tokens.",
        technical: "Protocolo de consenso Proof-of-Sustainability sobre el Ledger distribuido Kyron."
    },
    {
        id: "bi",
        title: "Módulo 9: BI y Centro de Mando",
        icon: TrendingUp,
        color: "text-[#0ea5e9]",
        concept: "Consola ejecutiva para la toma de decisiones. Visualización de KPIs críticos de todos los departamentos.",
        procedure: "1. Definición de umbrales. 2. Monitoreo de flujo de caja. 3. Análisis de competencia. 4. Reporte de socios.",
        technical: "Arquitectura de Data Warehouse con procesamiento paralelo masivo."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Blindaje perimetral de grado militar. Defensa activa contra ataques dirigidos y garantía de soberanía de datos.",
        procedure: "1. Auditoría de red. 2. Gestión de llaves HSM. 3. Aislamiento de nodos. 4. Protocolo de recuperación.",
        technical: "Cifrado AES-XTS-512 y arquitectura Zero Trust para accesos privilegiados."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (NLP)",
        icon: Volume2,
        color: "text-[#0ea5e9]",
        concept: "Interfaz de lenguaje natural. Consultas técnicas y legales mediante voz procesada por IA local.",
        procedure: "1. Trigger vocal. 2. Análisis de intención. 3. Consulta de base de conocimiento. 4. Respuesta TTS.",
        technical: "Modelos Transformer optimizados para el contexto técnico venezolano."
    },
    {
        id: "market",
        title: "Módulo 12: Mercado E-CR (Exchange)",
        icon: Coins,
        color: "text-[#22c55e]",
        concept: "Plataforma de intercambio de activos verdes. Liquidez para la sostenibilidad empresarial.",
        procedure: "1. Tasación de cartera. 2. Publicación en Ledger. 3. Negociación P2P. 4. Liquidación atómica.",
        technical: "Smart Contracts ejecutados sobre el nodo de validación Kyron."
    },
    {
        id: "generator",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        color: "text-[#0ea5e9]",
        concept: "Motor de redacción legal automatizado. Creación de borradores homologados por la jurisprudencia nacional.",
        procedure: "1. Elección de tipo. 2. Inyección de datos SAREN. 3. Ajuste de cláusulas. 4. Documento maestro.",
        technical: "RAG (Retrieval-Augmented Generation) sobre leyes y gacetas actualizadas."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        let modulesHtml = "";
        manualModules.forEach(mod => {
            modulesHtml += `
                <div style="margin-bottom: 30pt; page-break-inside: avoid; border-bottom: 1px solid #eee; padding-bottom: 20pt;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; text-transform: uppercase; margin-bottom: 10pt;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; line-height: 1.6; color: #333;"><strong>CONCEPTO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f8fafc; padding: 12pt; border-left: 5pt solid #0ea5e9; margin: 10pt 0;">
                        <p style="font-size: 10pt; font-weight: bold; color: #0ea5e9; margin-bottom: 5pt;">PROCEDIMIENTO:</p>
                        <p style="font-size: 10pt;">${mod.procedure}</p>
                    </div>
                    <p style="font-size: 10pt; color: #666; font-style: italic;">ARQUITECTURA: ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Helvetica', 'Arial', sans-serif;">
                <!-- PORTADA ESTILO IMAGEN -->
                <div style="background-color: #0ea5e9; padding: 60pt 20pt; text-align: center; border-radius: 20pt; margin-bottom: 20pt;">
                    <div style="background-color: #000; width: 120pt; height: 120pt; margin: auto; border-radius: 25pt; border: 3pt solid #22c55e; display: table;">
                        <div style="display: table-cell; vertical-align: middle; color: #22c55e; font-size: 60pt; font-weight: bold;">&lt;</div>
                    </div>
                </div>

                <div style="background-color: #000; padding: 40pt 20pt; text-align: center; border-radius: 25pt; margin-bottom: 50pt;">
                    <h1 style="color: #ffffff; font-size: 48pt; font-style: italic; font-weight: 900; margin-bottom: 15pt; letter-spacing: -2pt;">SYSTEM KYRON</h1>
                    <p style="color: #0ea5e9; font-size: 18pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt; margin-bottom: 10pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                    <p style="color: #666; font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                </div>

                <div style="page-break-before: always;"></div>

                <!-- ÍNDICE -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 5pt;">ÍNDICE DE NODOS OPERATIVOS</h2>
                <div style="margin: 20pt 0; font-size: 11pt; line-height: 2;">
                    ${manualModules.map((m, i) => `<p>0${i+1}. ${m.title} ................................................................</p>`).join('')}
                </div>

                <div style="page-break-before: always;"></div>

                <!-- CONTENIDO -->
                ${modulesHtml}

                <!-- PIE DE PÁGINA -->
                <div style="margin-top: 50pt; text-align: center; font-size: 8pt; color: #aaa; border-top: 1px solid #eee; padding-top: 10pt;">
                    MANUAL DE USUARIO • SYSTEM KYRON v2.6.5 • ACCESO PÚBLICO UNIVERSAL • 2026
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Manual_de_Usuario_Kyron_v2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "DESCARGA COMPLETADA", description: "El Manual de Usuario ha sido generado exitosamente." });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/20">
            {/* HUD WEB CLEAN UI */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-6">
                    <Logo className="h-8 w-8" />
                    <div className="hidden sm:block border-l border-white/10 pl-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">MANUAL DE USUARIO</span>
                        <p className="text-[8px] font-bold text-primary uppercase mt-1">Versión 2.6.5 [Final]</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-10 px-6 rounded-xl text-[10px] font-black uppercase border border-white/5 hover:bg-white/5">
                        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[10px] font-black uppercase" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-4 w-4" /> Descargar Expediente
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-32 pb-32">
                <div className="grid lg:grid-cols-12 gap-16">
                    
                    {/* SIDEBAR NAVEGACIÓN */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-6">
                            <Card className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/[0.01]">
                                <CardHeader className="p-0 mb-6 text-center border-b border-white/5 pb-6">
                                    <Logo className="h-12 w-12 mx-auto mb-4" />
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nodos del Manual</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                                    {manualModules.map(mod => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full text-left px-4 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3"
                                        >
                                            <mod.icon className="h-3.5 w-3.5" />
                                            <span className="truncate">{mod.title}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* CONTENIDO PRINCIPAL */}
                    <div className="lg:col-span-8 space-y-24">
                        <section id="intro" className="space-y-8">
                            <div className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-6">
                                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">Manual Maestro</h1>
                                <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                    Guía definitiva para la operación del Ecosistema Kyron v2.6.5. Este documento detalla los protocolos de misión crítica y la arquitectura de ingeniería del sistema.
                                </p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary">Última revisión: marzo 2026</Badge>
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-white/10 text-white/40">Acceso Público</Badge>
                                </div>
                            </div>
                        </section>

                        <div className="space-y-32">
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-32 group">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 transition-transform group-hover:rotate-3 shadow-glow-sm", mod.color)}>
                                                <mod.icon className="h-8 w-8" />
                                            </div>
                                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white/90">{mod.title}</h2>
                                        </div>
                                        <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10 space-y-8">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Fundamento Técnico</h4>
                                                <p className="text-xl font-bold italic text-white/70 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-black border border-white/5 shadow-inner">
                                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-6">Protocolo de Operación</h4>
                                                <div className="text-sm font-medium italic text-white/60 space-y-4">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <span className="text-primary font-black opacity-40">0{idx + 1}</span>
                                                            <span>{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 italic">Kyron Engine v2.6</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                    <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Inmune</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </section>
                            ))}
                        </div>

                        <footer className="pt-24 border-t border-white/5 text-center space-y-8">
                            <Logo className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">SYSTEM KYRON CORPORATE ENCYCLOPEDIA</p>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavButton({ label, onClick, icon: Icon, isActive, activeColor }: { label: string, onClick: () => void, icon?: any, isActive?: boolean, activeColor?: string }) {
    return (
        <button 
            onClick={onClick} 
            className={cn(
                "group w-full text-left px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between border border-transparent",
                isActive 
                    ? `bg-white/5 border-white/10 ${activeColor} shadow-glow` 
                    : "text-white/20 hover:text-white hover:bg-white/[0.03] hover:border-white/5"
            )}
        >
            <div className="flex items-center gap-5">
                {Icon && <Icon className={cn("h-4 w-4 transition-all duration-500", isActive ? "scale-125 rotate-3" : "opacity-30 group-hover:opacity-100 group-hover:scale-110")} />}
                <span className="truncate">{label}</span>
            </div>
            <ChevronRight className={cn("h-4 w-4 transition-all duration-500", isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0")} />
        </button>
    );
}
