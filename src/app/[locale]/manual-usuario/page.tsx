
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
        concept: "La identidad es la piedra angular de la soberanía digital. Implementamos protocolos de captura de 512 puntos vectoriales faciales bajo el estándar europeo eIDAS para garantizar que cada firma digital sea inatacable.",
        procedure: "1. Acceda al Nodo de Identidad desde el dashboard principal. 2. Realice el escaneo facial 3D asegurando una iluminación frontal uniforme. 3. El sistema ejecutará una prueba de vida (Liveness Detection) mediante seguimiento ocular aleatorio para evitar suplantaciones.",
        technical: "Cifrado AES-512 con arquitectura Zero-Knowledge. Los datos biométricos se transforman en un hash irreversible que reside en el enclave seguro del dispositivo y se valida contra el Ledger descentralizado."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Provisión de infraestructura de red de baja latencia basada en estándares de la GSMA. El sistema actúa como un nodo de gestión inteligente (SM-DP+) para el aprovisionamiento remoto de flotas corporativas.",
        procedure: "1. Ingrese al Centro de Control Telecom. 2. Seleccione el dispositivo del inventario homologado o ingrese el EID de su smartphone. 3. El sistema generará un perfil eUICC dinámico que podrá activar escaneando el código QR de seguridad.",
        technical: "Soporte nativo para Network Slicing 5G, permitiendo priorizar el tráfico de datos fiscales sobre la red pública. Protocolos EAP-AKA para autenticación de grado militar."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        concept: "Terminal de facturación híbrido diseñado para el cumplimiento estricto de la Providencia SNAT/2011/0071 del SENIAT y la gestión multimoneda automática.",
        procedure: "1. Inicie sesión mediante biometría. 2. Escanee los productos mediante el lector integrado. 3. El sistema validará el RIF del cliente contra la base de datos nacional. 4. Emita la factura fiscal con código QR sellado en tiempo real.",
        technical: "Integración vía API con máquinas fiscales homologadas. Cada correlativo de control se firma digitalmente para evitar la alteración de libros de ventas."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        concept: "Automatización del ciclo contable bajo normativas VEN-NIF. El sistema realiza el Reajuste por Inflación Fiscal (RIPF) de forma actuarial para proteger el patrimonio de la empresa.",
        procedure: "1. Sincronice las transacciones del TPV. 2. El sistema detectará automáticamente partidas no monetarias. 3. Ejecución del motor de ajuste basado en los índices INPC del Banco Central de Venezuela. 4. Generación de Estados de Situación Financiera.",
        technical: "Algoritmos de partida doble con validación de integridad referencial. Sincronización diaria con la API del BCV para tasas de cambio y factores inflacionarios."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y LOTTT",
        icon: Users,
        concept: "Administración estratégica de capital humano centrada en la LOTTT y LOPNNA. El sistema blinda la relación laboral mediante expedientes inmutables.",
        procedure: "1. Registre la ficha del trabajador con validación de carga familiar. 2. Configure los conceptos prestacionales (Vacaciones, Utilidades). 3. El sistema calculará automáticamente aportes al IVSS, FAOV e INCES. 4. Envío de recibos con sello de tiempo.",
        technical: "Motor de cálculo parametrizable según contratos colectivos. Módulo especializado de LOPNNA para la gestión de permisos y autorizaciones de menores asociados al titular."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN",
        icon: Gavel,
        concept: "Archivo digital de grado legal para el resguardo inmutable de activos jurídicos. Centraliza instrumentos notariales, actas de asamblea y registros ante el SAPI.",
        procedure: "1. Digitalice documentos originales en alta fidelidad. 2. Clasifique por tipo de expediente (Mercantil, Civil, Propiedad Intelectual). 3. El sistema activará alertas predictivas 30 días antes del vencimiento de poderes o licencias.",
        technical: "Sellado de tiempo RFC 3161 y encriptación de archivos en reposo. La desencriptación solo es posible mediante la clave privada derivada de la biometría del apoderado."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica avanzada de activos físicos. Nuestra IA de visión computacional procesa registros fotográficos para generar planos a escala y presupuestos de materiales.",
        procedure: "1. Capture fotografías multiaxiales del espacio físico. 2. Cargue el set de imágenes al Nodo de Ingeniería. 3. La IA generará el plano 2D/3D con cálculo automático de áreas y materiales de construcción necesarios.",
        technical: "Redes neuronales convolucionales (CNN) para detección de aristas y elementos estructurales. Exportación de modelos compatible con software CAD industrial."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Eco-Créditos y Reciclaje Magnético",
        icon: Recycle,
        concept: "Monetización de la responsabilidad ambiental mediante el uso de Smart Bins equipados con sensores de inducción magnética para la clasificación de residuos.",
        procedure: "1. Identifíquese en la papelera inteligente mediante su ID Digital. 2. Deposite el envase. 3. El sistema validará el tipo de material mediante magnetismo. 4. Acreditación instantánea de Eco-Créditos en su billetera.",
        technical: "Validación de hardware mediante firmas criptográficas. Cada gramo reciclado se registra como un activo ambiental tokenizado en el Ledger público de Kyron."
    }
];

const innovationTier2 = [
    {
        id: "voice",
        title: "Innovación: Kyron Voice (IA por Voz)",
        icon: Volume2,
        concept: "Interfaz de interacción humano-máquina optimizada para el léxico administrativo venezolano, permitiendo consultas complejas sin uso de periféricos.",
        procedure: "Pulse el botón de comando vocal y realice consultas como: '¿Qué facturas vencen hoy?' o 'Estado de la declaración de IVA'. El sistema procesará la intención y responderá mediante síntesis de voz natural.",
        technical: "Procesamiento de Lenguaje Natural (NLP) integrado con el motor de inferencia legal de la plataforma. Soporte para modismos regionales para mayor precisión."
    },
    {
        id: "market-ecr",
        title: "Innovación: Mercado de Eco-Créditos",
        icon: Coins,
        concept: "Exchange descentralizado de activos ambientales que permite a las empresas monetizar su impacto positivo o compensar su huella de carbono.",
        procedure: "1. Visualice sus créditos acumulados. 2. Publique una oferta de venta en el mercado interno. 3. Ejecute el intercambio contra créditos de servicio o divisas digitales. 4. Emisión de Certificado Carbono Neutral.",
        technical: "Contratos inteligentes (Smart Contracts) que automatizan la liquidación de las transacciones, eliminando la necesidad de intermediarios financieros."
    },
    {
        id: "generador-ia",
        title: "Innovación: Generador Jurídico IA",
        icon: Wand2,
        concept: "Motor de redacción automatizada de borradores legales de alta fidelidad alineados con el marco jurídico nacional.",
        procedure: "1. Seleccione el tipo de contrato. 2. El sistema extraerá los datos de las partes de la Bóveda Jurídica. 3. Introduzca las cláusulas comerciales. 4. La IA ensamblará el borrador legal listo para revisión de abogado.",
        technical: "Base de conocimientos entrenada con jurisprudencia del TSJ y modelos de contratos homologados por los principales registros mercantiles del país."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        const timestamp = new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' });
        
        let modulesContent = "";
        manualModules.forEach(mod => {
            modulesContent += `
                <div style="margin-bottom: 25pt; page-break-inside: avoid; border-bottom: 1px solid #e2e8f0; padding-bottom: 20pt;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; margin-bottom: 10pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; color: #1e293b; margin-bottom: 10pt;"><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f1f5f9; padding: 15pt; border-left: 5pt solid #0ea5e9; margin: 10pt 0; border-radius: 5pt;">
                        <p style="color: #0369a1; font-weight: bold; margin-bottom: 5pt; font-size: 10pt; text-transform: uppercase;">PROCEDIMIENTO DE EJECUCIÓN PASO A PASO:</p>
                        <p style="font-size: 10pt; line-height: 1.6;">${mod.procedure}</p>
                    </div>
                    <p style="font-size: 9pt; color: #64748b; font-style: italic;"><strong>RESPALDO DE INGENIERÍA:</strong> ${mod.technical}</p>
                </div>
            `;
        });

        const innovationsContent = innovationTier2.map(mod => `
            <div style="margin-bottom: 25pt; page-break-inside: avoid; border-bottom: 1px solid #e2e8f0; padding-bottom: 20pt;">
                <h2 style="color: #22c55e; font-size: 18pt; margin-bottom: 10pt; text-transform: uppercase;">${mod.title}</h2>
                <p style="text-align: justify; font-size: 11pt; color: #1e293b; margin-bottom: 10pt;"><strong>CONCEPTO:</strong> ${mod.concept}</p>
                <div style="background-color: #f0fdf4; padding: 15pt; border-left: 5pt solid #22c55e; margin: 10pt 0; border-radius: 5pt;">
                    <p style="color: #15803d; font-weight: bold; margin-bottom: 5pt; font-size: 10pt;">PROTOCOLO OPERATIVO:</p>
                    <p style="font-size: 10pt;">${mod.procedure}</p>
                </div>
                <p style="font-size: 9pt; color: #64748b; font-style: italic;"><strong>DETALLES TÉCNICOS:</strong> ${mod.technical}</p>
            </div>
        `).join('');

        const content = `
            <div style="font-family: 'Times New Roman', serif; color: #0f172a;">
                <!-- PORTADA DE GRADO CORPORATIVO -->
                <div style="text-align: center; border: 5pt double #0ea5e9; padding: 80pt 40pt; margin-bottom: 100pt; border-radius: 20pt; background-color: #fafafa;">
                    <div style="margin-bottom: 40pt;"><span style="font-size: 80pt; color: #0ea5e9; font-weight: bold;">K</span></div>
                    <h1 style="color: #0f172a; font-size: 48pt; margin-bottom: 10pt; letter-spacing: 5pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">SYSTEM KYRON</h1>
                    <p style="font-size: 22pt; font-weight: bold; color: #64748b; margin-bottom: 20pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                    <div style="border-top: 2pt solid #0ea5e9; width: 200pt; margin: 20pt auto;"></div>
                    <p style="font-size: 14pt; color: #94a3b8; font-weight: bold;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO</p>
                    <p style="font-size: 12pt; color: #0ea5e9; font-weight: bold; margin-top: 40pt;">ÚLTIMA REVISIÓN: MARZO 2026</p>
                    <div style="margin-top: 60pt;">
                        <p style="font-size: 11pt; color: #22c55e; font-weight: bold; text-transform: uppercase; letter-spacing: 3pt; border: 1pt solid #22c55e; padding: 10pt; display: inline-block;">[ ACCESO PÚBLICO UNIVERSAL ]</p>
                    </div>
                </div>

                <!-- ÍNDICE MAESTRO AUTOMATIZADO -->
                <div style="page-break-before: always; padding: 40pt;">
                    <h2 style="color: #0ea5e9; font-size: 24pt; border-bottom: 3pt solid #0ea5e9; padding-bottom: 10pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">Índice General</h2>
                    <div style="line-height: 2.2; font-size: 12pt; margin-top: 30pt;">
                        <p>1.0 Introducción al Ecosistema ....................................................................... 02</p>
                        <p>2.0 Guía de Inicio Rápido (Quick Start) ............................................................. 03</p>
                        <p>3.0 Visualización del Sistema (Dashboard) ........................................................ 04</p>
                        ${manualModules.map((m, i) => `<p>Módulo ${i+1}: ${m.title} ................................................................... 0${i+5}</p>`).join('')}
                        <p>4.0 Soporte y Resolución de Conflictos ............................................................ 15</p>
                        <p>5.0 Requisitos Técnicos de Sistema ................................................................. 16</p>
                        <p>6.0 Glosario de Ingeniería ................................................................................. 17</p>
                    </div>
                </div>

                <div style="page-break-after: always;"></div>

                <!-- INTRODUCCIÓN -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-size: 22pt;">1.0 VISIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; line-height: 1.8; font-size: 12pt; color: #334155;">${introSection.text}</p>
                <div style="background-color: #f0f9ff; padding: 20pt; border-left: 6pt solid #0ea5e9; margin: 30pt 0; border-radius: 8pt;">
                    <p style="font-weight: bold; color: #0369a1; margin: 0; font-size: 12pt; text-transform: uppercase;">MISIÓN INSTITUCIONAL:</p>
                    <p style="font-style: italic; margin: 10pt 0 0 0; font-size: 13pt; color: #0c4a6e;">"${introSection.mission}"</p>
                </div>

                <!-- MÓDULOS -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-size: 22pt;">2.0 NODOS DE OPERACIÓN</h2>
                ${modulesContent}

                <!-- INNOVACIONES -->
                <h2 style="color: #22c55e; border-bottom: 2pt solid #22c55e; padding-bottom: 10pt; margin-top: 40pt; font-size: 22pt;">3.0 INNOVACIONES DE VANGUARDIA</h2>
                ${innovationsContent}

                <!-- PIE DE PÁGINA GLOBAL (SIMULADO EN DOC) -->
                <div style="margin-top: 100pt; text-align: center; border-top: 1pt solid #cbd5e1; padding-top: 20pt;">
                    <p style="font-size: 9pt; color: #94a3b8; font-weight: bold;">Manual System Kyron v2.6.5 • Revisión Marzo 2026 • Expediente #KYR-2026-FINAL</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE GENERADO", 
            description: "Enciclopedia Técnica v2.6.5 exportada con éxito.",
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
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5 • Revisión Marzo 2026</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><ChevronLeft className="mr-2 h-3 w-3" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-3 w-3" /> EXPORTAR EXPEDIENTE
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
                                <NavButton label="1.0 Visión Estratégica" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <NavButton label="3.0 Visualización Dash" onClick={() => scrollToSection("screenshot")} icon={Monitor} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Nodos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones Tier 2</div>
                                {innovationTier2.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <NavButton label="4.0 Troubleshooting" onClick={() => scrollToSection("trouble")} icon={AlertTriangle} />
                                <NavButton label="5.0 Requisitos" onClick={() => scrollToSection("specs")} icon={Monitor} />
                                <NavButton label="6.0 Glosario" onClick={() => scrollToSection("glossary")} icon={BookOpen} />
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

                        {/* 3.0 Screenshot Dashboard */}
                        <section id="screenshot" className="space-y-8 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Monitor className="h-6 w-6 text-primary" /> 3.0 Visualización del Centro de Mando
                            </h3>
                            <p className="text-sm text-muted-foreground italic">Vista previa de la interfaz de Business Intelligence y Control Operativo.</p>
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                                <Image src="https://picsum.photos/seed/dashboard-preview/1200/800" alt="Dashboard Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
                                    <div className="space-y-2">
                                        <Badge className="bg-primary text-white font-black text-[8px] uppercase tracking-widest">KYRON-OS v2.6.5</Badge>
                                        <p className="text-lg font-black uppercase italic text-white">Consola de Inteligencia de Negocios</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Módulos de Operación */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4 border-b border-primary/20 pb-4">
                                <Cpu className="h-6 w-6" /> 4.0 Protocolos de Ingeniería
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        {/* Innovaciones Tier 2 */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary flex items-center gap-4 border-b border-secondary/20 pb-4">
                                <Sparkles className="h-6 w-6" /> 5.0 Innovaciones Tier 2
                            </h3>
                            {innovationTier2.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-secondary" />
                            ))}
                        </div>

                        {/* Troubleshooting */}
                        <section id="trouble" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-red-500 flex items-center gap-4">
                                <AlertTriangle className="h-6 w-6" /> 6.0 Soporte y Troubleshooting
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

                        {/* Requisitos Técnicos */}
                        <section id="specs" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Monitor className="h-6 w-6 text-primary" /> 7.0 Requisitos de Sistema
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <Card className="bg-white/[0.02] border-white/5 p-8 rounded-3xl">
                                    <h4 className="text-xs font-black uppercase text-primary mb-6 tracking-widest">Hardware & Red</h4>
                                    <ul className="space-y-4 text-xs font-bold uppercase tracking-tight text-white/60">
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Memoria RAM:</span> <span className="text-white">4GB Min. / 8GB Rec.</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Conectividad:</span> <span className="text-white">5 Mbps Min. / 5G LTE</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Cámara:</span> <span className="text-white">8MP con Soporte 3D</span></li>
                                    </ul>
                                </Card>
                                <Card className="bg-white/[0.02] border-white/5 p-8 rounded-3xl">
                                    <h4 className="text-xs font-black uppercase text-primary mb-6 tracking-widest">Software</h4>
                                    <ul className="space-y-4 text-xs font-bold uppercase tracking-tight text-white/60">
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Navegadores:</span> <span className="text-white">Chrome 90+, Edge 90+</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Móvil:</span> <span className="text-white">Android 11+, iOS 15+</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-2"><span>Cifrado:</span> <span className="text-white">TLS 1.3 / AES-512</span></li>
                                    </ul>
                                </Card>
                            </div>
                        </section>

                        {/* Glosario */}
                        <section id="glossary" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <BookOpen className="h-6 w-6 text-primary" /> 8.0 Glosario de Ingeniería
                            </h3>
                            <div className="grid gap-4">
                                {[
                                    { t: "eIDAS", d: "Reglamento de la UE relativo a la identificación electrónica y los servicios de confianza." },
                                    { t: "SM-DP+", d: "Subscription Manager Data Preparation para el aprovisionamiento remoto de tarjetas SIM." },
                                    { t: "RIPF", d: "Reajuste por Inflación Fiscal obligatorio para contribuyentes del ISLR en Venezuela." },
                                    { t: "Zero-Knowledge", d: "Arquitectura de seguridad donde el servidor no tiene acceso a las llaves de cifrado del usuario." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="font-black text-primary uppercase text-xs tracking-widest">{item.t}:</span>
                                        <p className="text-xs text-white/60 mt-2 font-medium">{item.d}</p>
                                    </div>
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
                        <p className="text-xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept}</p>
                    </div>

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
