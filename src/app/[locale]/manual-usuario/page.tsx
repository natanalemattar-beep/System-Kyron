
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
    Target,
    TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro v2.6.5.
 * Enciclopedia técnica que integra absolutamente todos los módulos públicos del ecosistema.
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Sistema de autenticación soberana basado en biometría facial UHD. Genera un identificador inmutable vinculado al RIF personal o jurídico, permitiendo el acceso seguro a todos los nodos del ecosistema sin contraseñas tradicionales.",
        procedure: "1. Calibración de cámara UHD. 2. Escaneo de 512 puntos vectoriales faciales. 3. Prueba de vitalidad (Anti-spoofing). 4. Cifrado en enclave seguro (TEE). 5. Emisión de ID Digital Kyron.",
        technical: "Cifrado AES-512, Almacenamiento Zero-Knowledge, Sincronización Blockchain."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Infraestructura de red convergente que permite el aprovisionamiento remoto de líneas telefónicas. Gestión masiva de perfiles eSIM para flotas corporativas con priorización de tráfico para datos fiscales (Network Slicing).",
        procedure: "1. Registro de terminal homologado. 2. Selección de plan de datos 5G. 3. Descarga de perfil eSIM vía OTA. 4. Activación inmediata de número y servicios.",
        technical: "Protocolo GSMA SM-DP+, Conectividad de baja latencia, Túneles IPsec automáticos."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inventario",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Terminal inteligente de ventas adaptado a la Providencia SNAT/2011/0071. Automatiza la carga de datos fiscales mediante RIF, gestiona el inventario en tiempo real y procesa pagos multimoneda con tasas BCV síncronas.",
        procedure: "1. Identificación del cajero. 2. Captura de RIF del cliente (Carga automática). 3. Escaneo de productos. 4. Selección de método de pago. 5. Emisión de factura fiscal homologada.",
        technical: "Motor de precios dinámico, Sincronización con Kardex de Inventario, Ledger transaccional."
    },
    {
        id: "financiamiento",
        title: "Módulo 4: Facturación a Crédito y BNPL (Cashea)",
        icon: Smartphone,
        color: "text-[#22c55e]",
        concept: "Gestión de ventas bajo la modalidad 'Compra Ahora, Paga Después'. Integración nativa con Cashea (Niveles 1 a 6) y sistemas de crédito directo empresarial para facilitar el consumo masivo.",
        procedure: "1. Validación de perfil crediticio del cliente. 2. Aplicación de pago inicial (según nivel). 3. Financiamiento del saldo en cuotas fijas sin intereses. 4. Monitoreo de cobranza y alertas de vencimiento.",
        technical: "Integración vía API con pasarelas BNPL, Motor de scoring de riesgo inteligente."
    },
    {
        id: "contabilidad",
        title: "Módulo 5: Contabilidad y Reajuste RIPF",
        icon: Calculator,
        color: "text-[#0ea5e9]",
        concept: "Automatización contable integral bajo normas VEN-NIF. Ejecuta de forma actuarial el Reajuste por Inflación Fiscal (RIPF) integrando los índices INPC del Banco Central de Venezuela.",
        procedure: "1. Consolización de asientos desde TPV y Nómina. 2. Clasificación de partidas monetarias y no monetarias. 3. Ejecución de motor de ajuste por inflación. 4. Emisión de estados financieros UHD.",
        technical: "Cálculo recursivo de índices, Auditoría de integridad contable 100%."
    },
    {
        id: "seniat",
        title: "Módulo 6: Cumplimiento SENIAT (Zero Risk)",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Escudo de protección fiscal que garantiza cero sanciones. La IA audita cada documento contra la ley vigente y las últimas Gacetas Oficiales antes de cualquier declaración o fiscalización.",
        procedure: "1. Auditoría continua de transacciones. 2. Verificación de retenciones de IVA/ISLR. 3. Generación automática de archivos TXT y declaraciones estimadas. 4. Alerta temprana de inconsistencias.",
        technical: "Algoritmos predictivos de cumplimiento, Monitor de Gaceta Oficial 24/7."
    },
    {
        id: "rrhh",
        title: "Módulo 7: Gestión de Talento y LOTTT",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración estratégica del capital humano. Automatiza el cumplimiento de la LOTTT, LOPNNA y la contribución de Protección de Pensiones, asegurando pagos precisos y expedientes inmutables.",
        procedure: "1. Enrolamiento biométrico de personal. 2. Gestión de nómina y parafiscales. 3. Control de horas extras y vacaciones. 4. Despacho digital de recibos de pago. 5. Cálculo de finiquitos.",
        technical: "Cálculo de pasivos laborales en tiempo real, Firma digital de documentos laborales."
    },
    {
        id: "juridico",
        title: "Módulo 8: Bóveda Jurídica y Contratos IA",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Resguardo inmutable de los activos legales de la empresa. Incluye un generador de borradores legales mediante IA que redacta contratos y actas basados en el marco jurídico nacional vigente.",
        procedure: "1. Redacción asistida por IA jurídica. 2. Firma digital centralizada. 3. Sellado de tiempo RFC 3161. 4. Resguardo en Bóveda Zero-Knowledge. 5. Control de poderes y asambleas.",
        technical: "Cifrado de grado militar, Inteligencia Artificial Generativa Legal."
    },
    {
        id: "civiles",
        title: "Módulo 9: Trámites Civiles y Ciudadanía",
        icon: FileText,
        color: "text-[#0ea5e9]",
        concept: "Nodo ciudadano para la gestión simplificada de documentos de identidad. Centraliza partidas de nacimiento, actas de matrimonio y antecedentes penales en un solo buzón seguro.",
        procedure: "1. Carga de datos base. 2. Digitalización de documentos físicos. 3. Validación ante el Registro Civil digital. 4. Emisión de copias certificadas con validez QR.",
        technical: "OCR para extracción de datos, Integración con Bóveda Personal."
    },
    {
        id: "sustentabilidad",
        title: "Módulo 10: Eco-Créditos y Reciclaje Magnético",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Programa de inyección de sustentabilidad. Utiliza papeleras inteligentes con tecnología de inducción magnética para validar residuos y recompensar al ciudadano con Eco-Créditos digitales.",
        procedure: "1. Identificación vía app en Smart Bin. 2. Depósito de residuos metálicos/plásticos. 3. Validación por sensor magnético. 4. Asignación de puntos al Ledger. 5. Canje en red de aliados.",
        technical: "Blockchain para trazabilidad verde, Sensores de precisión industrial."
    },
    {
        id: "analitica",
        title: "Módulo 11: Analítica, BI y Factibilidad",
        icon: TrendingUp,
        color: "text-[#0ea5e9]",
        concept: "Centro de inteligencia de negocios. Calcula indicadores de factibilidad económica (VAN, TIR, Payback) y realiza estudios de población para la toma de decisiones estratégicas de expansión.",
        procedure: "1. Inyección de datos operativos. 2. Análisis de márgenes por producto/cliente. 3. Proyección de flujos de caja. 4. Evaluación demográfica por geolocalización.",
        technical: "Motores estadísticos OLAP, Visualización de datos UHD."
    },
    {
        id: "ingenieria",
        title: "Módulo 12: Ingeniería y Proyectos IA",
        icon: Cpu,
        color: "text-[#22c55e]",
        concept: "Asistente técnico para planificación física. Genera planos a escala a partir de imágenes de locales, calcula cómputos métricos y elabora presupuestos de construcción detallados por área.",
        procedure: "1. Captura fotográfica del entorno. 2. Generación de plano base por IA. 3. Selección de acabados y materiales. 4. Cálculo de cantidades. 5. Emisión de presupuesto maestro.",
        technical: "Visión Artificial (Computer Vision), Base de datos de rendimientos técnicos."
    },
    {
        id: "academia",
        title: "Módulo 13: Academia Kyron y Certificación",
        icon: School,
        color: "text-[#0ea5e9]",
        concept: "Eje educativo para operadores y gerentes. Cursos de formación técnica en gestión fiscal, telecomunicaciones 5G y operatividad del ecosistema con emisión de credenciales Blockchain.",
        procedure: "1. Registro en ruta de aprendizaje. 2. Visualización de módulos técnicos. 3. Evaluación práctica en entorno sandbox. 4. Obtención de Certificación Maestra.",
        technical: "LMS de alta densidad, Credenciales verificables (Verifiable Credentials)."
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        // SVG Base64 del Logo Institucional Exacto (Hexágono + Glifo Neón + Nodo Central)
        const logoSvgBase64 = "PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgNUw4OSAyNy41VjcyLjVMNTAgOTVMMTEgNzIuNVYyNy41TDUwIDVaIiBmaWxsPSIjMDUwNTA1Ii8+PHBhdGggZD0iTTUwIDVMODkgMjcuNVY3Mi41TDUwIDk1TDExIDcyLjVWMjcuNUw1MCA1WiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjMiLz48ZyBmaWx0ZXI9InVybCgjZ2xvdykiPjxwYXRoIGQ9Ik02NSAzMEw0MCA1MEw2NSA3MCIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI1MCIgcj0iMiIgZmlsbD0iIzIyYzU1ZSIvPjwvZz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUiIHI9IjIiIGZpbGw9IiMwZWE1ZTkiLz48Y2lyY2xlIGN4PSI1MCIgY3k9Ijk1IiByPSIyIiBmaWxsPSIjMjJjNTVlIi8+PC9zdmc+";

        let modulesHtml = "";
        manualModules.forEach((mod) => {
            modulesHtml += `
                <div style="margin-bottom: 30pt; border-bottom: 1px solid #eee; padding-bottom: 20pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; text-transform: uppercase; font-style: italic; font-weight: 900; margin-bottom: 12pt; border-left: 6pt solid #0ea5e9; padding-left: 15pt;">${mod.title}</h2>
                    <p style="font-size: 8pt; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 8pt;">[ CONCEPTO MAESTRO ]</p>
                    <p style="text-align: justify; font-size: 10.5pt; line-height: 1.6; color: #111; margin-bottom: 12pt;">${mod.concept}</p>
                    <div style="background-color: #f8fafc; padding: 15pt; border-left: 4pt solid #22c55e; margin: 12pt 0;">
                        <p style="font-size: 8pt; font-weight: bold; color: #15803d; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 6pt;">[ PROTOCOLO DE EJECUCIÓN ]</p>
                        <div style="font-size: 10pt; color: #334155; line-height: 1.5;">${mod.procedure}</div>
                    </div>
                    <p style="font-size: 8pt; font-weight: bold; color: #94a3b8; text-transform: uppercase; tracking: 1pt;">Arquitectura Técnica: ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #000;">
                <!-- PORTADA MAESTRA RÉPLICA EXACTA -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; border-bottom: 15pt solid #0ea5e9;">
                    <tr>
                        <td align="center" style="padding: 50pt 0 30pt 0;">
                            <img src="data:image/svg+xml;base64,${logoSvgBase64}" width="140" height="140" />
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 30pt 60pt 30pt;">
                            <h1 style="color: #ffffff; font-size: 52pt; font-style: italic; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -2pt;">SYSTEM KYRON</h1>
                            <p style="color: #0ea5e9; font-size: 18pt; font-weight: bold; text-transform: uppercase; letter-spacing: 6pt; margin: 20pt 0 8pt 0;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                            <p style="color: #64748b; font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                        </td>
                    </tr>
                </table>
                
                <div style="text-align: center; margin-top: 40pt;">
                    <div style="border: 2pt solid #22c55e; padding: 12pt 40pt; border-radius: 20pt; display: inline-block;">
                        <p style="font-size: 14pt; font-weight: 900; text-transform: uppercase; letter-spacing: 5pt; color: #22c55e; margin: 0;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                    </div>
                    <p style="font-size: 9pt; color: #94a3b8; font-weight: bold; text-transform: uppercase; margin-top: 15pt; letter-spacing: 2pt;">ÚLTIMA REVISIÓN TÉCNICA: MARZO 2026</p>
                </div>

                <div style="page-break-before: always;"></div>
                
                <h3 style="color: #0ea5e9; font-size: 14pt; font-weight: 900; text-transform: uppercase; font-style: italic; border-bottom: 2pt solid #0ea5e9; padding-bottom: 6pt; margin-bottom: 30pt; text-decoration: underline;">ÍNDICE DE NODOS OPERATIVOS</h3>
                
                ${modulesHtml}

                <div style="margin-top: 50pt; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20pt;">
                    <p style="font-size: 8pt; color: #94a3b8; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">SYSTEM KYRON CORPORATE • DOCUMENTACIÓN DE MISIÓN CRÍTICA • © 2026</p>
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
            description: "Manual de Usuario exportado bajo protocolo corporativo de alta fidelidad.",
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
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Manual de Usuario</CardTitle>
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
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de Usuario</h1>
                            <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                Enciclopedia Técnica v2.6.5. El estándar definitivo para la gestión integral del ecosistema Kyron bajo protocolos de misión crítica.
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
