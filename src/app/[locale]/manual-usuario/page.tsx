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
    Gavel,
    Cpu,
    Recycle,
    Sparkles,
    Zap,
    Download,
    ChevronLeft,
    Terminal,
    Activity,
    Smartphone,
    Scale,
    FileText,
    BarChart3,
    Users,
    Clock,
    Volume2,
    Coins,
    Wand2,
    Printer,
    LayoutGrid,
    BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro v2.6.5.
 * Enciclopedia técnica de alta densidad con motor de exportación de alta fidelidad.
 * Sincronizado con la identidad visual corporativa (Azul Ciber / Verde Neón).
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Implementación de un marco de confianza digital basado en el reglamento eIDAS de la Unión Europea y adaptado a la Ley de Mensajes de Datos y Firmas Electrónicas de Venezuela. El sistema utiliza biometría facial de profundidad para generar una identidad única e inmutable vinculada al RIF del ciudadano o empresa.",
        procedure: "1. Calibración del sensor óptico UHD. 2. Captura multiaxial de rasgos (512 vectores). 3. Validación de vitalidad (Anti-spoofing). 4. Generación de par de llaves criptográficas. 5. Sellado del identificador en el Ledger distribuido.",
        technical: "Cifrado asimétrico ECC con almacenamiento en enclave seguro (TEE) y hashing SHA-512."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Gestión de red móvil virtual (MVNE) bajo estándar GSMA SGP.22. La infraestructura Kyron garantiza comunicaciones cifradas de extremo a extremo mediante Network Slicing 5G, priorizando el tráfico de datos fiscales.",
        procedure: "1. Identificación de EID del terminal. 2. Descarga de perfil eSIM cifrado vía OTA. 3. Activación de nodo 5G de baja latencia. 4. Monitoreo constante desde el NOC Central.",
        technical: "Arquitectura SDN con aprovisionamiento SM-DP+ y túneles IPsec automáticos."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta e Inteligencia Fiscal",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Automatización de la Providencia Administrativa SNAT/2011/0071. Nodo de facturación inteligente que integra el inventario, las tasas BCV y las retenciones en un solo flujo transaccional.",
        procedure: "1. Autenticación del operador. 2. Carga instantánea por RIF. 3. Escaneo de activos. 4. Selección de pago (Multimoneda/Cashea). 5. Emisión de QR fiscal inmutable.",
        technical: "Motor de reglas de negocio sincronizado con la Gaceta Oficial 24/7."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#22c55e]",
        concept: "Gestión financiera de grado ejecutivo bajo normas VEN-NIF. Ejecución automatizada del Reajuste por Inflación Fiscal (RIPF) utilizando el historial de índices INPC del BCV.",
        procedure: "1. Consolidación de movimientos del Ledger. 2. Clasificación de partidas monetarias. 3. Cálculo de reajuste extraordinario. 4. Generación de estados financieros UHD. 5. Sellado digital de libros oficiales.",
        technical: "Procesamiento OLAP para análisis de rentabilidad multidimensional."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y LOTTT",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración estratégica del capital humano cumpliendo rigurosamente con la LOTTT, LOPNNA y la Ley de Protección de Pensiones de Seguridad Social.",
        procedure: "1. Registro de trabajador con carga familiar. 2. Parametrización de beneficios. 3. Ejecución de nómina quincenal. 4. Despacho automatizado de recibos. 5. Auditoría de solvencias laborales.",
        technical: "Algoritmos de cálculo recursivo para prestaciones sociales y pasivos en tiempo real."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica Zero-Knowledge",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Resguardo inmutable de activos intangibles y documentos legales. Arquitectura Zero-Knowledge que garantiza que solo los titulares autorizados puedan acceder a la información.",
        procedure: "1. Escaneo UHD de documentos. 2. Clasificación SAREN/SAPI por IA. 3. Marcado de tiempo RFC 3161. 4. Configuración de alertas de vencimiento. 5. Control de poderes de representación.",
        technical: "Cifrado de grado militar AES-256-GCM con rotación de llaves automática."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        // Logo vectorial de alta precisión sin letras (réplica de la imagen)
        const logoSvgBase64 = "PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgNUw4OSAyNy41VjcyLjVMNTAgOTVMMTEgNzIuNVYyNy41TDUwIDVaIiBmaWxsPSIjMDUwNTA1IiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik02NSAzMEw0MCA1MEw2NSA3MCIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI1MCIgcj0iMiIgZmlsbD0iIzIyYzU1ZSIvPjwvc3ZnPg==";

        let modulesHtml = "";
        manualModules.forEach((mod) => {
            modulesHtml += `
                <div style="margin-bottom: 30pt; border-bottom: 1px solid #e2e8f0; padding-bottom: 20pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 20pt; text-transform: uppercase; font-style: italic; font-weight: 900; margin-bottom: 15pt; border-left: 6pt solid #0ea5e9; padding-left: 15pt;">${mod.title}</h2>
                    <p style="font-size: 9pt; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 8pt;">[ CONCEPTO MAESTRO ]</p>
                    <p style="text-align: justify; font-size: 11pt; line-height: 1.6; color: #1e293b;">${mod.concept}</p>
                    <div style="background-color: #f8fafc; padding: 15pt; border-left: 4pt solid #22c55e; margin: 15pt 0; border-radius: 10pt;">
                        <p style="font-size: 9pt; font-weight: bold; color: #15803d; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 10pt;">[ PROTOCOLO DE EJECUCIÓN ]</p>
                        <div style="font-size: 10pt; color: #475569; line-height: 1.5;">${mod.procedure}</div>
                    </div>
                    <p style="font-size: 8pt; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1pt;">Arquitectura Técnica: ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #0f172a;">
                <div style="text-align: center; margin-bottom: 50pt;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; border-radius: 25pt; border-bottom: 12pt solid #0ea5e9;">
                        <tr>
                            <td align="center" style="padding: 50pt 0 30pt 0;">
                                <img src="data:image/svg+xml;base64,${logoSvgBase64}" width="140" height="140" />
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 0 30pt 50pt 30pt;">
                                <h1 style="color: #ffffff; font-size: 56pt; font-style: italic; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -2pt;">SYSTEM KYRON</h1>
                                <p style="color: #0ea5e9; font-size: 18pt; font-weight: bold; text-transform: uppercase; letter-spacing: 6pt; margin: 20pt 0 10pt 0;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                                <p style="color: #94a3b8; font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 40pt; text-align: center;">
                        <div style="border: 2pt solid #22c55e; padding: 12pt 40pt; border-radius: 20pt; display: inline-block;">
                            <p style="font-size: 14pt; font-weight: 900; text-transform: uppercase; letter-spacing: 5pt; color: #22c55e; margin: 0;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                        </div>
                        <p style="font-size: 9pt; color: #94a3b8; font-weight: bold; text-transform: uppercase; margin-top: 15pt; letter-spacing: 2pt;">REVISIÓN TÉCNICA COMPLETA: MARZO 2026</p>
                    </div>
                </div>

                <div style="page-break-before: always;"></div>
                
                <h3 style="color: #0ea5e9; font-size: 14pt; font-weight: 900; text-transform: uppercase; font-style: italic; border-bottom: 2pt solid #0ea5e9; padding-bottom: 5pt; margin-bottom: 30pt;">ÍNDICE DE NODOS OPERATIVOS</h3>
                
                ${modulesHtml}

                <div style="margin-top: 50pt; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20pt;">
                    <p style="font-size: 8pt; color: #94a3b8; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">EXPEDIENTE ELECTRÓNICO • SYSTEM KYRON CORPORATE • TODOS LOS DERECHOS RESERVADOS</p>
                </div>
            </div>
        `;

        const blob = new Blob([`<html><head><meta charset='utf-8'></head><body>${content}</body></html>`], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Manual_Usuario_Kyron_v2.6.5_Maestro.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE DESCARGADO", 
            description: "Manual generado bajo protocolo corporativo de alta fidelidad.",
            action: <ShieldCheck className="text-primary h-4 w-4" />
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/20 hud-grid">
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-2 bg-black rounded-xl border border-primary/20 shadow-glow-sm">
                        <Logo className="h-8 w-8" />
                    </div>
                    <div className="hidden sm:block border-l border-white/10 pl-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">MANUAL DE USUARIO</span>
                        <p className="text-[8px] font-bold text-primary uppercase mt-1">v2.6.5 [NODO MAESTRO]</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-10 px-6 rounded-xl text-[10px] font-black uppercase border border-white/5 hover:bg-white/5 transition-all">
                        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[10px] font-black uppercase" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-4 w-4" /> Descargar Manual
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-32 pb-32">
                <div className="grid lg:grid-cols-12 gap-16">
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-6">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                                <CardHeader className="p-0 mb-8 text-center border-b border-white/5 pb-6">
                                    <div className="p-4 bg-black rounded-2xl border border-primary/20 w-fit mx-auto mb-4 shadow-glow">
                                        <Logo className="h-12 w-12" />
                                    </div>
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Nodos de Conocimiento</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    {manualModules.map(mod => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full text-left px-4 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3 group"
                                        >
                                            <mod.icon className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                                            <span>{mod.title}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-24">
                        <section className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Enciclopedia Técnica</h1>
                            <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                Protocolo Maestro v2.6.5. El estándar definitivo para la gestión institucional bajo protocolos de misión crítica y soberanía de datos.
                            </p>
                        </section>

                        <div className="space-y-24">
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-32 group animate-in fade-in duration-1000">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 transition-transform group-hover:rotate-3 shadow-glow-sm", mod.color)}>
                                                <mod.icon className="h-8 w-8" />
                                            </div>
                                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white/90">{mod.title}</h2>
                                        </div>
                                        <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10 space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Concepto Maestro</h4>
                                                <p className="text-xl font-bold italic text-white/70 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-black border border-white/5 shadow-inner">
                                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">Protocolo Operativo</h4>
                                                <p className="text-sm font-medium italic text-white/60">{mod.procedure}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                                                <Terminal className="h-4 w-4" />
                                                <span>Arquitectura: {mod.technical}</span>
                                            </div>
                                        </Card>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
