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
    LayoutGrid
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Remake Maestro del Manual de Usuario v2.6.5.
 * Diseño HUD Web de Alta Densidad + Exportación Word idéntica a Referencia Institucional.
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Implementación de un marco de confianza digital basado en el reglamento eIDAS de la Unión Europea y adaptado a la Ley de Mensajes de Datos y Firmas Electrónicas de Venezuela. El sistema utiliza biometría facial de profundidad (3D) para generar una identidad única vinculada al RIF, permitiendo la firma electrónica con validez legal absoluta.",
        procedure: "1. Calibración del sensor óptico. 2. Captura multiaxial de rasgos (512 vectores). 3. Validación de 'liveness'. 4. Generación de llaves SECP256K1. 5. Sellado en el Ledger distribuido.",
        technical: "Cifrado asimétrico ECC con almacenamiento en enclave seguro (TEE)."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Gestión de red móvil virtual (MVNE) bajo estándar GSMA SGP.22. La infraestructura Kyron garantiza comunicaciones cifradas de extremo a extremo mediante Network Slicing 5G, permitiendo el aprovisionamiento OTA de perfiles digitales inalterables.",
        procedure: "1. Identificación de EID. 2. Descarga de perfil cifrado. 3. Activación de nodo 5G. 4. Monitoreo de telemetría NOC.",
        technical: "Arquitectura SDN con priorización dinámica de paquetes para nodos fiscales."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta e Inteligencia Fiscal",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Automatización de la Providencia Administrativa SNAT/2011/0071. Nodo de facturación inteligente sincronizado con la tasa BCV en tiempo real, procesando IVA, IGTF y retenciones de forma actuarial.",
        procedure: "1. Autenticación biométrica. 2. Carga por RIF. 3. Escaneo de activos. 4. Pago multimoneda. 5. Emisión de QR fiscal.",
        technical: "Motores de inferencia lógica para validación de exenciones en Gaceta Oficial."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#22c55e]",
        concept: "Gestión financiera bajo VEN-NIF. Ejecución del Reajuste por Inflación Fiscal (RIPF) integrando índices INPC del Banco Central de Venezuela para sincerar estados financieros consolidados.",
        procedure: "1. Importación masiva de Ledger. 2. Clasificación automática. 3. Motor de ajuste INPC. 4. Generación de Balances. 5. Sellado de Libros Diario/Mayor.",
        technical: "Procesamiento OLAP con consolidación multitemporal."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento (LOTTT)",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración de capital humano cumpliendo con LOTTT, LOPNNA y Ley de Protección de Pensiones. Expedientes digitales con sellado de tiempo para auditorías laborales.",
        procedure: "1. Enrolamiento biométrico. 2. Configuración prestacional. 3. Ejecución de nómina. 4. Despacho de recibos sellados. 5. Generación de TXT gubernamental.",
        technical: "Algoritmos de cálculo recursivo para pasivos laborales en tiempo real."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica Zero-Knowledge",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Resguardo inmutable de activos intangibles (Actas, Poderes, Marcas SAPI). Arquitectura Zero-Knowledge que garantiza acceso exclusivo mediante llave biométrica del titular.",
        procedure: "1. Digitalización UHD. 2. Clasificación SAREN/SAPI. 3. Sellado RFC 3161. 4. Alertas predictivas. 5. Control de apoderados.",
        technical: "Cifrado AES-256-GCM con hashing SHA-512 de integridad."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        color: "text-[#0ea5e9]",
        concept: "Planificación de infraestructura física mediante visión artificial. Reconstrucción de planos y cómputos métricos con precisión del 98% desde registros fotográficos.",
        procedure: "1. Captura homologada. 2. Fotogrametría de puntos. 3. Identificación de superficies. 4. Presupuesto técnico. 5. Exportación CAD.",
        technical: "Redes Neuronales Convolucionales (CNN) para detección de volúmenes."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Reciclaje Magnético IA",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Economía circular mediante Smart Bins con inducción magnética para clasificación atómica. Transformación de residuos en activos digitales registrados en Blockchain.",
        procedure: "1. Sincronización ID. 2. Clasificación magnética. 3. Validación sensorial. 4. Emisión de Eco-Créditos. 5. Canje en red aliada.",
        technical: "Consenso Proof-of-Sustainability sobre Ledger de baja latencia."
    },
    {
        id: "bi",
        title: "Módulo 9: BI y Centro de Mando",
        icon: LayoutGrid,
        color: "text-[#0ea5e9]",
        concept: "Consola de inteligencia de negocios para alta gerencia. Agregación de datos de todos los nodos operativos para visión 360° y decisiones basadas en evidencia.",
        procedure: "1. Umbrales KPI. 2. Monitoreo de rentabilidad. 3. Análisis competitivo. 4. Reportes socios. 5. Simulación 'What-if'.",
        technical: "Data Warehouse Cloud con procesamiento paralelo masivo (MPP)."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Blindaje perimetral de grado militar para la protección del ecosistema y soberanía de datos nacionales contra exfiltración y ciberataques.",
        procedure: "1. Auditoría de logs. 2. Gestión HSM. 3. Micro-segmentación. 4. Protocolos DRP. 5. Validación de integridad.",
        technical: "Seguridad Zero Trust y cifrado TLS 1.3 con validación extendida."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (Chat IA)",
        icon: Volume2,
        color: "text-[#0ea5e9]",
        concept: "Interfaz de lenguaje natural (NLP) para comunicación fluida con el sistema. Consultas técnicas, legales y contables procesadas por el motor Gemini 1.5 Pro.",
        procedure: "1. Activación vocal/texto. 2. Procesamiento de intención. 3. Consulta Inferencia IA. 4. Respuesta TTS/HUD. 5. Ejecución operativa.",
        technical: "Modelos Transformer optimizados para el contexto técnico venezolano."
    },
    {
        id: "market",
        title: "Módulo 12: Mercado E-CR (Exchange)",
        icon: Coins,
        color: "text-[#22c55e]",
        concept: "Exchange de activos verdes tokenizados. Monetización del impacto ambiental positivo mediante la venta de Eco-Créditos a organizaciones reguladas.",
        procedure: "1. Tasación cartera. 2. Publicación Ledger. 3. Negociación P2P. 4. Liquidación atómica. 5. Certificación Blockchain.",
        technical: "Smart Contracts auditados en red privada Kyron."
    },
    {
        id: "generator",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        color: "text-[#0ea5e9]",
        concept: "Motor de generación documental basado en IA generativa. Redacción de instrumentos legales precisos basados en jurisprudencia TSJ y leyes nacionales.",
        procedure: "1. Selección instrumento. 2. Inyección de datos. 3. Procesamiento RAG. 4. Revisión técnica. 5. Firma y Bóveda.",
        technical: "LLM Fine-tuned con corpus legal venezolano y protocolos corporativos."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        const logoSvgBase64 = "PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgNUw4OSAyNy41VjcyLjVMNTAgOTVMMTEgNzIuNVYyNy41TDUwIDVaIiBmaWxsPSIjMDUwNTA1IiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik02NSAzMEw0MCA1TDY1IDcwIiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

        let modulesHtml = "";
        manualModules.forEach((mod, i) => {
            modulesHtml += `
                <div style="margin-bottom: 40pt; border-bottom: 1px solid #eee; padding-bottom: 20pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; text-transform: uppercase; font-style: italic; font-weight: 900; margin-bottom: 15pt;">${mod.title}</h2>
                    <p style="font-size: 9pt; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 5pt;">[ CONCEPTO ]</p>
                    <p style="text-align: justify; font-size: 11pt; line-height: 1.6; color: #334155;">${mod.concept}</p>
                    
                    <div style="background-color: #f8fafc; padding: 15pt; border-left: 5pt solid #22c55e; margin: 15pt 0; border-radius: 10pt;">
                        <p style="font-size: 9pt; font-weight: bold; color: #15803d; text-transform: uppercase; letter-spacing: 2pt; margin-bottom: 8pt;">[ PROTOCOLO ]</p>
                        <div style="font-size: 10.5pt; color: #475569;">
                            ${mod.procedure.split('. ').map(s => `<p style="margin-bottom: 4pt;">• ${s}</p>`).join('')}
                        </div>
                    </div>

                    <p style="font-size: 8pt; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1pt; margin-top: 15pt;">[ ARQUITECTURA ]: ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a;">
                
                <!-- PORTADA REMAKE (REPLICA IMAGEN) -->
                <div style="text-align: center; margin-bottom: 60pt;">
                    <!-- Bloque Logo Superior -->
                    <div style="background-color: #000; width: 120pt; height: 120pt; margin: 0 auto 30pt; border-radius: 30pt; display: table;">
                        <div style="display: table-cell; vertical-align: middle; text-align: center;">
                            <img src="data:image/svg+xml;base64,${logoSvgBase64}" width="100" height="100" />
                        </div>
                    </div>

                    <!-- Bloque Marca Maestro -->
                    <div style="background-color: #000; padding: 60pt 20pt; border-radius: 40pt; border: 4pt solid #0ea5e9;">
                        <h1 style="color: #ffffff; font-size: 64pt; font-style: italic; font-weight: 900; margin: 0; line-height: 1; text-transform: uppercase; letter-spacing: -4pt;">SYSTEM KYRON</h1>
                        <p style="color: #0ea5e9; font-size: 22pt; font-weight: bold; text-transform: uppercase; letter-spacing: 8pt; margin: 20pt 0 10pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                        <p style="color: #94a3b8; font-size: 12pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt;">PROTOCOLO MAESTRO v2.6.5 • 2026</p>
                    </div>

                    <div style="margin-top: 50pt;">
                        <p style="font-size: 12pt; font-weight: 900; text-transform: uppercase; letter-spacing: 6pt; color: #22c55e; border: 2pt solid #22c55e; display: inline-block; padding: 10pt 30pt; border-radius: 15pt;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                        <p style="font-size: 10pt; color: #64748b; margin-top: 20pt; font-weight: bold;">Última revisión: Marzo 2026 • Nodo Validado</p>
                    </div>
                </div>

                <div style="page-break-before: always;"></div>

                <!-- ÍNDICE INTERACTIVO -->
                <div style="padding: 40pt; border: 2px solid #0ea5e9; border-radius: 30pt; background-color: #f8fafc; margin-bottom: 50pt;">
                    <h2 style="color: #0ea5e9; font-size: 24pt; border-bottom: 4pt solid #0ea5e9; padding-bottom: 15pt; margin-bottom: 30pt; text-transform: uppercase; font-style: italic; font-weight: 900; text-decoration: underline;">ÍNDICE DE NODOS OPERATIVOS</h2>
                    <div style="font-size: 12pt; line-height: 2.2; color: #1e293b;">
                        ${manualModules.map((m, i) => `
                            <div style="display: table; width: 100%; border-bottom: 1px dotted #cbd5e1;">
                                <div style="display: table-cell; text-align: left; font-weight: bold;">${String(i + 1).padStart(2, '0')}. ${m.title.toUpperCase()}</div>
                                <div style="display: table-cell; text-align: right; color: #0ea5e9;">...................................</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="page-break-before: always;"></div>

                <!-- CONTENIDO TÉCNICO -->
                ${modulesHtml}

                <!-- PIE DE PÁGINA -->
                <div style="margin-top: 100pt; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 30pt;">
                    <p style="font-size: 9pt; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 3pt;">SYSTEM KYRON v2.6.5 • NODO DE CONOCIMIENTO MAESTRO • © 2026</p>
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

        toast({ title: "EXPEDIENTE DESCARGADO", description: "El Manual de Usuario v2.6.5 ha sido generado con éxito." });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/20">
            {/* HUD HEADER */}
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
                    
                    {/* HUD NAVIGATION */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-6">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                                <CardHeader className="p-0 mb-8 text-center border-b border-white/5 pb-6">
                                    <div className="p-4 bg-black rounded-2xl border border-primary/20 w-fit mx-auto mb-4 shadow-glow">
                                        <Logo className="h-12 w-12" />
                                    </div>
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Directorio de Nodos</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                                    {manualModules.map(mod => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full text-left px-4 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3 group"
                                        >
                                            <mod.icon className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                                            <span className="truncate">{mod.title}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* DENSE CONTENT */}
                    <div className="lg:col-span-8 space-y-24">
                        <section className="space-y-8">
                            <div className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual de Usuario</h1>
                                <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                    Enciclopedia Técnica de Operaciones v2.6.5. El estándar definitivo para la gestión institucional y corporativa bajo protocolos de misión crítica.
                                </p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/10">Revisión: Marzo 2026</Badge>
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/10">Acceso Público</Badge>
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
                                        <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10 space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Fundamento Conceptual</h4>
                                                <p className="text-xl font-bold italic text-white/70 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-black border border-white/5 shadow-inner">
                                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">Protocolo de Operación</h4>
                                                <div className="text-sm font-medium italic text-white/60 space-y-4">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <span className="text-emerald-500 font-black opacity-40">0{idx + 1}</span>
                                                            <span>{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4 border-t border-white/5 pt-8">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Arquitectura de Ingeniería</h4>
                                                <p className="text-sm font-bold text-white/40 uppercase tracking-tight">{mod.technical}</p>
                                            </div>
                                        </Card>
                                    </div>
                                </section>
                            ))}
                        </div>

                        <footer className="pt-24 border-t border-white/5 text-center space-y-10">
                            <div className="p-6 bg-black rounded-[2rem] border border-white/5 w-fit mx-auto shadow-glow">
                                <Logo className="h-16 w-16 opacity-80" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">SYSTEM KYRON CORPORATE INTELLIGENCE • 2026</p>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
