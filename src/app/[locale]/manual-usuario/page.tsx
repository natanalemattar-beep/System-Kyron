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
 * Enciclopedia Técnica de Alta Densidad.
 * Diseño HUD Web + Exportación Word de Grado Corporativo (Idéntica a Referencia).
 */

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Implementación de un marco de confianza digital basado en el reglamento eIDAS de la Unión Europea y adaptado a la Ley de Mensajes de Datos y Firmas Electrónicas de Venezuela. El sistema utiliza biometría facial de profundidad (3D) para generar una identidad única e inmutable vinculada al RIF del ciudadano o empresa, permitiendo la firma electrónica de documentos con validez legal absoluta.",
        procedure: "1. Calibración del sensor óptico en entorno iluminado. 2. Captura multiaxial de rasgos faciales (512 vectores). 3. Validación de 'liveness' para prevención de suplantación. 4. Generación de par de llaves criptográficas SECP256K1. 5. Sellado del bloque de identidad en el Ledger distribuido.",
        technical: "Cifrado asimétrico ECC (Elliptic Curve Cryptography) con almacenamiento en el enclave seguro (TEE) del hardware del usuario."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y eSIM 5G",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Gestión avanzada de red móvil virtual (MVNE) integrada en el ecosistema. Permite el aprovisionamiento remoto Over-the-Air (OTA) de perfiles eUICC bajo el estándar GSMA SGP.22. La infraestructura Kyron garantiza comunicaciones cifradas de extremo a extremo para flotas corporativas, asegurando la soberanía de los datos mediante Network Slicing 5G.",
        procedure: "1. Identificación del EID del dispositivo. 2. Selección de plan de datos maestro. 3. Descarga del perfil digital cifrado mediante protocolo seguro. 4. Activación del nodo de datos 5G. 5. Monitoreo de telemetría de red en tiempo real desde la consola NOC.",
        technical: "Arquitectura SDN (Software Defined Networking) con priorización dinámica de paquetes para nodos de facturación y cumplimiento fiscal."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta e Inteligencia Fiscal",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Automatización total de la Providencia Administrativa SNAT/2011/0071 del SENIAT. El sistema actúa como un nodo de facturación inteligente que sincroniza milimétricamente cada transacción con la tasa oficial del Banco Central de Venezuela (BCV), calculando automáticamente IVA, IGTF y retenciones según el perfil del contribuyente.",
        procedure: "1. Autenticación biométrica del operador. 2. Carga instantánea de datos fiscales mediante búsqueda por RIF. 3. Escaneo de activos con actualización de stock en tiempo real. 4. Procesamiento de pago multimoneda. 5. Emisión de factura fiscal digital con código QR sellado.",
        technical: "Motores de inferencia lógica para la validación de exenciones y exoneraciones fiscales según la Gaceta Oficial vigente."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#22c55e]",
        concept: "Sistema de gestión financiera bajo normativas VEN-NIF. El núcleo contable ejecuta de forma actuarial el Reajuste por Inflación Fiscal (RIPF), integrando los índices INPC del BCV para sincerar los estados financieros. Esto proporciona una visión real de la utilidad neta y la salud económica del holding en entornos de alta volatilidad.",
        procedure: "1. Importación masiva de transacciones del Ledger TPV. 2. Clasificación automática de cuentas según el plan maestro. 3. Ejecución del motor de ajuste por inflación. 4. Generación de Balance General y Estado de Resultados. 5. Sellado inmutable de Libros Diario y Mayor.",
        technical: "Procesamiento analítico en línea (OLAP) con capacidad de consolidación multitemporal y multidivisa."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento (LOTTT)",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Administración estratégica del capital humano con blindaje legal total. El sistema gestiona nóminas complejas, beneficios laborales y aportes parafiscales (IVSS, FAOV, INCES) cumpliendo con la LOTTT, la LOPNNA y la Ley de Protección de Pensiones. Los expedientes digitales cuentan con sellado de tiempo para garantizar su preexistencia ante auditorías.",
        procedure: "1. Registro de ficha técnica del trabajador con biometría. 2. Configuración de conceptos prestacionales y deducciones de ley. 3. Ejecución de nómina quincenal/mensual. 4. Despacho automatizado de recibos digitales. 5. Generación de archivos TXT gubernamentales.",
        technical: "Algoritmos de cálculo recursivo para prestaciones sociales y vacaciones con proyección de pasivos laborales en tiempo real."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica Zero-Knowledge",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Archivo inmutable de grado legal para el resguardo de activos intangibles. Centraliza Actas Constitutivas, Modificaciones de Estatutos, Poderes de Representación y Registros de Marca ante el SAREN y SAPI. La arquitectura Zero-Knowledge garantiza que solo los titulares biométricamente autorizados puedan acceder a la información.",
        procedure: "1. Digitalización de instrumentos legales en alta fidelidad (UHD). 2. Clasificación por expediente y ente regulador. 3. Aplicación de sellado de tiempo RFC 3161. 4. Configuración de alertas predictivas de vencimiento. 5. Gestión de facultades de apoderados.",
        technical: "Cifrado de datos en reposo mediante AES-256-GCM y hashing SHA-512 para verificación de integridad documental."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        color: "text-[#0ea5e9]",
        concept: "Planificación avanzada de infraestructura física mediante visión artificial. El sistema reconstruye planos a escala y genera cómputos métricos con una precisión del 98% a partir de registros fotográficos simples, optimizando el presupuesto de construcción (CapEx) y el despliegue de sucursales.",
        procedure: "1. Captura de entorno mediante dispositivos móviles homologados. 2. Procesamiento de nube de puntos y fotogrametría. 3. Identificación automática de superficies y materiales. 4. Generación de presupuesto técnico detallado. 5. Exportación de planos CAD.",
        technical: "Redes Neuronales Convolucionales (CNN) entrenadas para la detección de volúmenes y estimación de rendimiento de materiales."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Reciclaje Magnético IA",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Iniciativa de economía circular impulsada por la Fundación Kyron. Utiliza papeleras inteligentes con tecnología de inducción magnética para la clasificación atómica de residuos. Los ciudadanos y empresas transforman residuos en activos digitales (Eco-Créditos) registrados en una Blockchain inmutable.",
        procedure: "1. Sincronización de ID Digital con el Smart Bin. 2. Depósito de residuos y clasificación magnética automática. 3. Pesaje y validación sensorial. 4. Emisión instantánea de Eco-Créditos. 5. Canje de beneficios en la red de comercios aliados.",
        technical: "Protocolo de consenso Proof-of-Sustainability sobre un Ledger distribuido de baja huella de carbono."
    },
    {
        id: "bi",
        title: "Módulo 9: BI y Centro de Mando",
        icon: TrendingUp,
        color: "text-[#0ea5e9]",
        concept: "Consola de inteligencia de negocios para la alta gerencia. Agrega datos críticos de todos los nodos operativos (Ventas, Contabilidad, RR.HH., Telecom) para proporcionar una visión 360° del rendimiento empresarial, permitiendo decisiones estratégicas basadas en evidencia empírica.",
        procedure: "1. Configuración de umbrales de alerta (KPIs). 2. Monitoreo de flujo de caja y rentabilidad por segmento. 3. Análisis de tendencias de mercado y competencia. 4. Generación de reportes consolidados para socios. 5. Ejecución de modelos de simulación 'What-if'.",
        technical: "Arquitectura de Data Warehouse en la nube con procesamiento paralelo masivo (MPP) para análisis en milisegundos."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Blindaje perimetral y lógico de grado militar para la protección del ecosistema. Garantiza la soberanía de los datos nacionales y empresariales, defendiendo la infraestructura contra ataques dirigidos, inyecciones de código y exfiltración de información sensible.",
        procedure: "1. Auditoría continua de logs de red. 2. Gestión centralizada de llaves criptográficas (HSM). 3. Aislamiento de nodos mediante micro-segmentación. 4. Ejecución de protocolos de recuperación ante desastres (DRP). 5. Validación de integridad de software.",
        technical: "Protocolos de seguridad Zero Trust y cifrado de canal TLS 1.3 con certificados de validación extendida."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (NLP)",
        icon: Volume2,
        color: "text-[#0ea5e9]",
        concept: "Interfaz de lenguaje natural (NLP) que permite la comunicación fluida con el sistema. Los operadores pueden realizar consultas técnicas, legales y contables mediante voz, recibiendo respuestas precisas extraídas de la base de conocimiento oficial de Kyron.",
        procedure: "1. Activación de interfaz vocal. 2. Captura y procesamiento de intención del usuario. 3. Consulta a motores de inferencia IA. 4. Respuesta sintetizada (TTS) en tiempo real. 5. Ejecución de comandos operativos autorizados.",
        technical: "Modelos Transformer de última generación optimizados para el contexto técnico y modismos del mercado venezolano."
    },
    {
        id: "market",
        title: "Módulo 12: Mercado E-CR (Exchange)",
        icon: Coins,
        color: "text-[#22c55e]",
        concept: "Plataforma de intercambio de activos verdes tokenizados. Permite a las empresas monetizar su impacto ambiental positivo, vendiendo Eco-Créditos a organizaciones que buscan compensar su huella de carbono o acceder a incentivos fiscales sustentables.",
        procedure: "1. Tasación de la cartera de activos verdes. 2. Publicación de oferta en el Ledger de mercado. 3. Negociación P2P entre nodos validados. 4. Liquidación atómica de la transacción. 5. Certificación Blockchain del intercambio.",
        technical: "Smart Contracts auditados ejecutados sobre la red privada de alta velocidad de System Kyron."
    },
    {
        id: "generator",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        color: "text-[#0ea5e9]",
        concept: "Motor de generación documental basado en inteligencia artificial generativa. Redacta borradores de contratos, actas y comunicaciones legales con precisión jurídica, utilizando como base la jurisprudencia del TSJ y las leyes vigentes de la República.",
        procedure: "1. Selección del tipo de instrumento legal. 2. Inyección de parámetros específicos (Partes, Montos, Fechas). 3. Procesamiento de cláusulas mediante RAG (Retrieval-Augmented Generation). 4. Revisión técnica del borrador generado. 5. Firma y resguardo en Bóveda.",
        technical: "Modelos de Lenguaje de Gran Escala (LLM) afinados con textos legales nacionales y protocolos de redacción corporativa."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        // Generar HTML detallado para cada módulo
        let modulesHtml = "";
        manualModules.forEach((mod, index) => {
            modulesHtml += `
                <div style="margin-bottom: 30pt; page-break-inside: avoid; border-bottom: 1px solid #e2e8f0; padding-bottom: 20pt;">
                    <h2 style="color: #0ea5e9; font-size: 20pt; text-transform: uppercase; margin-bottom: 15pt; font-weight: 900; font-style: italic;">${mod.title}</h2>
                    
                    <div style="margin-bottom: 15pt;">
                        <p style="font-size: 10pt; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 5pt;">[ CONCEPTO MAESTRO ]</p>
                        <p style="text-align: justify; font-size: 11pt; line-height: 1.6; color: #1e293b;">${mod.concept}</p>
                    </div>

                    <div style="background-color: #f8fafc; padding: 15pt; border-left: 6pt solid #22c55e; margin: 15pt 0; border-radius: 8pt;">
                        <p style="font-size: 10pt; font-weight: bold; color: #15803d; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 8pt;">[ PROTOCOLO DE EJECUCIÓN ]</p>
                        <div style="font-size: 10.5pt; line-height: 1.5; color: #334155;">
                            ${mod.procedure.split('. ').map((step, i) => `<p style="margin-bottom: 4pt;"><strong>${i + 1}.</strong> ${step}</p>`).join('')}
                        </div>
                    </div>

                    <div style="margin-top: 15pt; border-top: 1px dashed #cbd5e1; padding-top: 10pt;">
                        <p style="font-size: 9pt; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 5pt;">[ ARQUITECTURA DE INGENIERÍA ]</p>
                        <p style="font-size: 10pt; color: #475569; font-style: italic;">${mod.technical}</p>
                    </div>
                </div>
            `;
        });

        // Representación SVG del Logo para Word
        const logoSvg = `<svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z" fill="#050505" stroke="#0ea5e9" stroke-width="3"/>
            <path d="M65 30L40 50L65 70" stroke="#0ea5e9" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="40" cy="50" r="5" fill="#ffffff" />
        </svg>`;

        const content = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a;">
                
                <!-- PORTADA INSTITUCIONAL (SINCRO CON IMAGEN) -->
                <div style="text-align: center; margin-bottom: 40pt;">
                    <!-- Banner Azul Superior con Logo -->
                    <div style="background-color: #0ea5e9; padding: 60pt 20pt; border-radius: 30pt; margin-bottom: 20pt;">
                        <div style="background-color: #000; width: 140pt; height: 140pt; margin: auto; border-radius: 35pt; border: 4pt solid #22c55e; display: table;">
                            <div style="display: table-cell; vertical-align: middle; text-align: center;">
                                ${logoSvg}
                            </div>
                        </div>
                    </div>

                    <!-- Bloque de Marca Negro Sólido -->
                    <div style="background-color: #000; padding: 50pt 20pt; border-radius: 30pt; margin-bottom: 40pt;">
                        <h1 style="color: #ffffff; font-size: 56pt; font-style: italic; font-weight: 900; margin-bottom: 15pt; letter-spacing: -3pt; text-transform: uppercase;">SYSTEM KYRON</h1>
                        <p style="color: #0ea5e9; font-size: 20pt; font-weight: bold; text-transform: uppercase; letter-spacing: 6pt; margin-bottom: 12pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                        <p style="color: #94a3b8; font-size: 12pt; font-weight: bold; text-transform: uppercase; letter-spacing: 3pt;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                    </div>
                    
                    <div style="margin-top: 40pt;">
                        <p style="font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: 5pt; color: #22c55e;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                        <p style="font-size: 9pt; color: #64748b; margin-top: 10pt; font-weight: bold;">Última revisión: Marzo 2026 • Estado: Validado por Nodo Maestro</p>
                    </div>
                </div>

                <div style="page-break-before: always;"></div>

                <!-- ÍNDICE MAESTRO AUTOMATIZADO -->
                <div style="padding: 40pt; border: 1px solid #e2e8f0; border-radius: 20pt; background-color: #f8fafc; margin-bottom: 40pt;">
                    <h2 style="color: #0ea5e9; font-size: 24pt; border-bottom: 3pt solid #0ea5e9; padding-bottom: 10pt; margin-bottom: 25pt; text-transform: uppercase; font-style: italic; font-weight: 900;">ÍNDICE DE NODOS OPERATIVOS</h2>
                    <div style="font-size: 11pt; line-height: 2.2; color: #334155;">
                        ${manualModules.map((m, i) => `
                            <div style="display: table; width: 100%; border-bottom: 1px dotted #cbd5e1;">
                                <div style="display: table-cell; text-align: left; font-weight: bold;">${String(i + 1).padStart(2, '0')}. ${m.title.toUpperCase()}</div>
                                <div style="display: table-cell; text-align: right; color: #0ea5e9;">................................................</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="page-break-before: always;"></div>

                <!-- CONTENIDO TÉCNICO DE ALTA DENSIDAD -->
                ${modulesHtml}

                <!-- PIE DE PÁGINA GLOBAL -->
                <div style="margin-top: 60pt; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20pt;">
                    <p style="font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">SYSTEM KYRON v2.6.5 • NODO DE CONOCIMIENTO DISTRIBUIDO • © 2026</p>
                    <p style="margin-top: 5pt;">Documento de Referencia Técnica • Propiedad Intelectual del Ecosistema • Prohibida su alteración</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Manual_de_Usuario_Kyron_v2.6.5_Maestro.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "EXPEDIENTE DESCARGADO", description: "El Manual de Usuario v2.6.5 ha sido generado con éxito." });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/20">
            {/* CABECERA HUD WEB */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-2 bg-black rounded-xl border border-primary/20 shadow-glow-sm">
                        <Logo className="h-8 w-8" />
                    </div>
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
                    
                    {/* NAVEGACIÓN LATERAL HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-6">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                                <CardHeader className="p-0 mb-6 text-center border-b border-white/5 pb-6">
                                    <div className="p-4 bg-black rounded-2xl border border-primary/20 w-fit mx-auto mb-4 shadow-glow">
                                        <Logo className="h-12 w-12" />
                                    </div>
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nodos de Información</CardTitle>
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

                    {/* CONTENIDO WEB DE ALTA DENSIDAD */}
                    <div className="lg:col-span-8 space-y-24">
                        <section id="intro" className="space-y-8">
                            <div className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual Maestro</h1>
                                <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                    Enciclopedia Técnica de Operaciones v2.6.5. Este expediente detalla los protocolos de ingeniería y marcos legales que sustentan el ecosistema System Kyron.
                                </p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/10">Última revisión: marzo 2026</Badge>
                                    <Badge variant="outline" className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-white/10 text-white/40">Acceso Público Universal</Badge>
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
                                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary mb-6">Protocolo de Operación</h4>
                                                <div className="text-sm font-medium italic text-white/60 space-y-4">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <span className="text-secondary font-black opacity-40">0{idx + 1}</span>
                                                            <span>{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4 border-t border-white/5 pt-8">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Arquitectura de Ingeniería</h4>
                                                <p className="text-sm font-bold text-white/40 uppercase tracking-tight">{mod.technical}</p>
                                            </div>
                                            <div className="pt-6 border-t border-white/5 flex items-center justify-between opacity-40">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 italic">System Kyron Engine v2.6.5</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Validado</span>
                                                </div>
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
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">SYSTEM KYRON CORPORATE ENCYCLOPEDIA • 2026</p>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
