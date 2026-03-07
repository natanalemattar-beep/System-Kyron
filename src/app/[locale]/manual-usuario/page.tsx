
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
    BookOpen,
    Calculator,
    Magnet,
    School,
    Shield,
    Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro v2.6.5.
 * Enciclopedia técnica de máxima densidad que cubre todo el ecosistema Kyron.
 * Motor de exportación sincronizado con la identidad visual UHD.
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Marco de confianza digital basado en el reglamento eIDAS y la Ley de Firmas Electrónicas de Venezuela. Utiliza biometría facial UHD para generar un identificador inmutable vinculado al RIF.",
        procedure: "1. Calibración UHD. 2. Captura de 512 vectores faciales. 3. Validación de vitalidad (Anti-spoofing). 4. Generación de llave privada en enclave seguro (TEE). 5. Sellado en Blockchain.",
        technical: "Cifrado ECC, Hashing SHA-512, Almacenamiento Zero-Knowledge."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Gestión de red móvil virtual (MVNE) bajo estándar GSMA. Aprovisionamiento remoto de perfiles eSIM y Network Slicing para priorizar datos fiscales críticos.",
        procedure: "1. Registro de EID. 2. Descarga de perfil OTA (Over-the-Air). 3. Activación de túnel IPsec. 4. Monitoreo de latencia en tiempo real desde el NOC Central.",
        technical: "Protocolo SM-DP+, Arquitectura SDN, Conectividad 5G Low Latency."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) y Arqueo",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Terminal de ventas inteligente adaptado a la Providencia SNAT/2011/0071. Integra gestión de inventario, tasas BCV y control de cierre de caja (Arqueo).",
        procedure: "1. Autenticación de cajero. 2. Carga automática de datos fiscales vía RIF. 3. Escaneo de productos. 4. Cobro multimoneda. 5. Arqueo físico vs sistema al cierre de turno.",
        technical: "Motor de reglas sincronizado con BCV, Registro de Sobrantes y Faltantes."
    },
    {
        id: "financiamiento",
        title: "Módulo 4: Facturación a Crédito y BNPL",
        icon: Smartphone,
        color: "text-[#22c55e]",
        concept: "Gestión de ventas con financiamiento integrado. Soporte nativo para plataformas 'Compra Ahora, Paga Después' como Cashea (Niveles 1-6), Lysto y Zueño.",
        procedure: "1. Validación de crédito del cliente. 2. Selección de plataforma (Cashea/Directo). 3. Cálculo de cuotas quincenales. 4. Emisión de factura a crédito. 5. Control de cobranza y bloqueos.",
        technical: "Integración con API de BNPL, Motor de Scoring de Riesgo propio."
    },
    {
        id: "contabilidad",
        title: "Módulo 5: Contabilidad y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#0ea5e9]",
        concept: "Gestión financiera bajo VEN-NIF. Motor automático de Reajuste por Inflación Fiscal (RIPF) basado en los índices INPC históricos del BCV.",
        procedure: "1. Consolidación de Ledger. 2. Clasificación de partidas monetarias. 3. Ejecución de reajuste. 4. Generación de Balances y Flujos de Efectivo UHD.",
        technical: "Procesamiento OLAP, Auditoría de Integridad Contable 100%."
    },
    {
        id: "seniat",
        title: "Módulo 6: Cumplimiento SENIAT (Zero Risk)",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Sistema de protección fiscal absoluta. Auditoría IA predictiva que valida declaraciones de IVA, ISLR e IGTF antes de su presentación para garantizar cero sanciones.",
        procedure: "1. Monitoreo de Gaceta Oficial. 2. Cruce de Libros de Compra/Venta. 3. Validación de retenciones. 4. Generación de archivos TXT para el portal fiscal.",
        technical: "Algoritmos de verificación triple, Escudo Predictivo 45 días."
    },
    {
        id: "rrhh",
        title: "Módulo 7: Gestión de Talento y LOTTT",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración de nómina y capital humano. Automatiza cálculos de la LOTTT, LOPNNA y la nueva Contribución de Protección de Pensiones.",
        procedure: "1. Registro de ficha técnica. 2. Control de asistencia y horas extras. 3. Cálculo quincenal. 4. Despacho digital de recibos. 5. Liquidación de prestaciones sociales.",
        technical: "Cálculo recursivo de pasivos laborales, Sellado digital de libros de personal."
    },
    {
        id: "juridico",
        title: "Módulo 8: Bóveda Jurídica y Contratos IA",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Gestión de activos legales inmutables. Generador de contratos mediante IA basado en el marco jurídico venezolano y Bóveda Zero-Knowledge.",
        procedure: "1. Redacción asistida por IA. 2. Revisión técnica. 3. Firma digital certificada. 4. Resguardo en bóveda cifrada. 5. Control de vencimientos de poderes.",
        technical: "Cifrado AES-256-GCM, Marcado de tiempo RFC 3161, IA Generativa Legal."
    },
    {
        id: "civiles",
        title: "Módulo 9: Trámites Civiles y Ciudadanía",
        icon: FileText,
        color: "text-[#0ea5e9]",
        concept: "Nodo personal para la gestión de documentos de identidad, partidas de nacimiento, actas de matrimonio y antecedentes penales.",
        procedure: "1. Carga de datos base. 2. Digitalización UHD de documentos físicos. 3. Validación en el Registro Civil. 4. Descarga de copias certificadas digitales.",
        technical: "Integración con Bóveda de Identidad, OCR para extracción de datos civiles."
    },
    {
        id: "sustentabilidad",
        title: "Módulo 10: Eco-Créditos y Reciclaje Magnético",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Monetización de residuos mediante tecnología de inducción magnética. Los ciudadanos inyectan sustentabilidad y reciben Eco-Créditos transables.",
        procedure: "1. Identificación en Smart Bin. 2. Depósito de residuos. 3. Clasificación magnética. 4. Asignación de puntos al Ledger. 5. Canje en comercios aliados.",
        technical: "Sensores de inducción síncrona, Blockchain para trazabilidad verde."
    },
    {
        id: "analitica",
        title: "Módulo 11: Analítica y Factibilidad",
        icon: TrendingUp,
        color: "text-[#0ea5e9]",
        concept: "Dashboard de Business Intelligence para la toma de decisiones. Cálculo de indicadores de factibilidad económica (VAN, TIR, Payback) y análisis demográfico.",
        procedure: "1. Inyección de datos operativos. 2. Análisis predictivo de mercado. 3. Cálculo de indicadores financieros. 4. Visualización de mapas de calor poblacionales.",
        technical: "Motores estadísticos avanzados, Inferencia de datos demográficos por IA."
    },
    {
        id: "ingenieria",
        title: "Módulo 12: Ingeniería y Proyectos IA",
        icon: Cpu,
        color: "text-[#22c55e]",
        concept: "Sistema de planificación técnica. Generación de planos a partir de imágenes, cálculo de materiales por área y elaboración de presupuestos de construcción.",
        procedure: "1. Carga de foto del local. 2. Generación de plano a escala por IA. 3. Selección de materiales. 4. Cálculo de cómputos métricos. 5. Emisión de presupuesto.",
        technical: "Visión Artificial (Computer Vision), Base de datos de rendimientos constructivos."
    },
    {
        id: "academia",
        title: "Módulo 13: Academia Kyron y Formación",
        icon: School,
        color: "text-[#0ea5e9]",
        concept: "Centro de capacitación técnica para operadores del ecosistema. Cursos de formación profesional en gestión fiscal, telecomunicaciones y tecnología Blockchain.",
        procedure: "1. Inscripción en plan de estudio. 2. Visualización de lecciones UHD. 3. Evaluación práctica. 4. Obtención de certificado verificado en Blockchain.",
        technical: "LMS integrado, Credenciales verificables (Verifiable Credentials)."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        // Logo en Base64 para inserción directa en Word
        const logoSvgBase64 = "PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgNUw4OSAyNy41VjcyLjVMNTAgOTVMMTEgNzIuNVYyNy41TDUwIDVaIiBmaWxsPSIjMDcwNzA3Ii8+PHBhdGggZD0iTTUwIDVMODkgMjcuNVY3Mi41TDUwIDk1TDExIDcyLjVWMjcuNUw1MCA1WiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNNjUgMzBMNDAgNTBMNjUgNzAiIHN0cm9rZT0iIzBlYTVlOSIgc3Ryb2tlLXdpZHRoPSIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNTAiIHI9IjIiIGZpbGw9IiMyMmM1NWUiLz48L3N2Zz4=";

        let modulesHtml = "";
        manualModules.forEach((mod) => {
            modulesHtml += `
                <div style="margin-bottom: 25pt; border-bottom: 1px solid #eee; padding-bottom: 15pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; text-transform: uppercase; font-style: italic; font-weight: 900; margin-bottom: 10pt; border-left: 5pt solid #0ea5e9; padding-left: 12pt;">${mod.title}</h2>
                    <p style="font-size: 8pt; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 1.5pt; margin-bottom: 5pt;">[ CONCEPTO MAESTRO ]</p>
                    <p style="text-align: justify; font-size: 10pt; line-height: 1.5; color: #333; margin-bottom: 10pt;">${mod.concept}</p>
                    <div style="background-color: #f9fafb; padding: 12pt; border-left: 3pt solid #22c55e; margin: 10pt 0;">
                        <p style="font-size: 8pt; font-weight: bold; color: #15803d; text-transform: uppercase; letter-spacing: 1.5pt; margin-bottom: 5pt;">[ PROTOCOLO DE EJECUCIÓN ]</p>
                        <div style="font-size: 9.5pt; color: #444; line-height: 1.4;">${mod.procedure}</div>
                    </div>
                    <p style="font-size: 7.5pt; font-weight: bold; color: #999; text-transform: uppercase;">Arquitectura: ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #111;">
                <!-- PORTADA MAESTRA REPLICA EXACTA -->
                <div style="text-align: center; margin-bottom: 40pt;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; border-bottom: 10pt solid #0ea5e9;">
                        <tr>
                            <td align="center" style="padding: 40pt 0 20pt 0;">
                                <img src="data:image/svg+xml;base64,${logoSvgBase64}" width="120" height="120" />
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 0 20pt 40pt 20pt;">
                                <h1 style="color: #ffffff; font-size: 48pt; font-style: italic; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -1pt;">SYSTEM KYRON</h1>
                                <p style="color: #0ea5e9; font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 5pt; margin: 15pt 0 5pt 0;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                                <p style="color: #888; font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 3pt;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 30pt;">
                        <div style="border: 1.5pt solid #22c55e; padding: 10pt 30pt; border-radius: 15pt; display: inline-block;">
                            <p style="font-size: 12pt; font-weight: 900; text-transform: uppercase; letter-spacing: 4pt; color: #22c55e; margin: 0;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                        </div>
                        <p style="font-size: 8pt; color: #999; font-weight: bold; text-transform: uppercase; margin-top: 12pt;">ÚLTIMA REVISIÓN: MARZO 2026</p>
                    </div>
                </div>

                <div style="page-break-before: always;"></div>
                
                <h3 style="color: #0ea5e9; font-size: 13pt; font-weight: 900; text-transform: uppercase; font-style: italic; border-bottom: 1.5pt solid #0ea5e9; padding-bottom: 4pt; margin-bottom: 25pt;">ÍNDICE DE NODOS OPERATIVOS</h3>
                
                ${modulesHtml}

                <div style="margin-top: 40pt; text-align: center; border-top: 1px solid #eee; padding-top: 15pt;">
                    <p style="font-size: 7.5pt; color: #999; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5pt;">SYSTEM KYRON CORPORATE • TODOS LOS DERECHOS RESERVADOS • 2026</p>
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

                    <div className="lg:col-span-8 space-y-20">
                        <section className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Enciclopedia Técnica</h1>
                            <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                Protocolo Maestro v2.6.5. El estándar definitivo para la gestión integral bajo protocolos de misión crítica y soberanía de datos.
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
                                                <p className="text-sm font-medium italic text-white/60 leading-relaxed">{mod.procedure}</p>
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
