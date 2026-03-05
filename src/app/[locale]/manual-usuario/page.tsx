
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
 * DOCUMENTO DE ACCESO PÚBLICO UNIVERSAL - MÁXIMA DENSIDAD TÉCNICA Y LEGAL.
 * Integra los 13 nodos operativos del ecosistema incluyendo innovaciones Tier 2.
 */

const introSection = {
    title: "1.0 Introducción al Ecosistema de Misión Crítica",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que ofrece líneas 5G, gestión eSIM y equipos homologados como servicio base. Sobre esta infraestructura de red, desplegamos un ecosistema de cumplimiento normativo total que garantiza la operación legal de su empresa ante todas las instituciones rectoras del Estado venezolano: tributario (SENIAT), telecomunicaciones (CONATEL), registral (SAREN), propiedad intelectual (SAPI), laboral (LOTTT, IVSS, FAOV, INCES) y protección del menor (LOPNNA). Cada transacción y registro es blindado por inteligencia artificial predictiva y un ledger blockchain que asegura su inmutabilidad. Este manual proporciona los protocolos para operar los nodos del sistema con absoluta solvencia legal."
};

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        concept: "La identidad es la piedra angular de la soberanía digital. Implementamos protocolos de captura de 512 puntos vectoriales faciales bajo el estándar europeo eIDAS para garantizar que cada firma digital sea inatacable y vinculada de forma unívoca al titular legal.",
        procedure: "1. Acceda al Nodo de Identidad desde el dashboard principal. 2. Realice el escaneo facial 3D asegurando una iluminación frontal uniforme. 3. El sistema ejecutará una prueba de vida (Liveness Detection) mediante seguimiento ocular aleatorio para evitar suplantaciones.",
        technical: "Cifrado AES-512 con arquitectura Zero-Knowledge. Los datos biométricos se transforman en un hash irreversible que reside en el enclave seguro del dispositivo y se valida contra el Ledger descentralizado de Kyron."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Provisión de infraestructura de red de baja latencia basada en estándares de la GSMA. El sistema actúa como un nodo de gestión inteligente (SM-DP+) para el aprovisionamiento remoto de flotas corporativas y la asignación inmediata de numeración.",
        procedure: "1. Ingrese al Centro de Control Telecom. 2. Seleccione el dispositivo del inventario homologado o ingrese el EID de su smartphone. 3. El sistema generará un perfil eUICC dinámico que podrá activar escaneando el código QR de seguridad enviado a su terminal.",
        technical: "Soporte nativo para Network Slicing 5G, permitiendo priorizar el tráfico de datos fiscales sobre la red pública. Protocolos EAP-AKA para autenticación de grado militar en el acceso a la red."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        concept: "Terminal de facturación híbrido diseñado para el cumplimiento estricto de la Providencia SNAT/2011/0071 del SENIAT. Gestiona transacciones multimoneda con conversión automática a la tasa oficial del BCV en tiempo real.",
        procedure: "1. Inicie sesión mediante biometría. 2. Escanee los productos mediante el lector integrado. 3. El sistema validará el RIF del cliente contra la base de datos nacional. 4. Emita la factura fiscal con código QR sellado en el bloque transaccional del día.",
        technical: "Integración vía API con máquinas fiscales homologadas. Cada correlativo de control se firma digitalmente para evitar la alteración de libros de ventas y asegurar la trazabilidad ante auditorías."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        concept: "Automatización del ciclo contable bajo normativas VEN-NIF. El sistema realiza el Reajuste por Inflación Fiscal (RIPF) de forma actuarial para proteger el patrimonio de la empresa ante la volatilidad monetaria.",
        procedure: "1. Sincronice las transacciones del TPV y el Ledger. 2. El sistema detectará automáticamente partidas no monetarias (activos fijos, inventario). 3. Ejecute el motor de ajuste basado en los índices INPC publicados por el Banco Central de Venezuela.",
        technical: "Algoritmos de partida doble con validación de integridad referencial. Sincronización diaria con la API del BCV para tasas de cambio y factores inflacionarios oficiales."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y LOTTT",
        icon: Users,
        concept: "Administración estratégica de capital humano centrada en la LOTTT y LOPNNA. El sistema blinda la relación laboral mediante expedientes inmutables y cálculos prestacionales precisos al 100%.",
        procedure: "1. Registre la ficha del trabajador con validación de carga familiar (LOPNNA). 2. Configure los conceptos prestacionales (Vacaciones, Utilidades). 3. El sistema calculará automáticamente aportes al IVSS, FAOV e INCES y la contribución de Protección de Pensiones.",
        technical: "Motor de cálculo parametrizable según contratos colectivos. Módulo especializado de LOPNNA para la gestión de permisos y autorizaciones de menores asociados al titular, con respaldo de firma digital."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN",
        icon: Gavel,
        concept: "Archivo digital de grado legal para el resguardo inmutable de activos jurídicos. Centraliza instrumentos notariales, actas de asamblea y registros ante el SAPI, garantizando que la preexistencia de documentos sea inatacable.",
        procedure: "1. Digitalice documentos originales en alta fidelidad. 2. Clasifique por tipo de expediente (Mercantil, Civil, Propiedad Intelectual). 3. El sistema activará alertas predictivas 30 días antes del vencimiento de poderes, marcas o licencias.",
        technical: "Sellado de tiempo RFC 3161 y encriptación de archivos en reposo. La desencriptación solo es posible mediante la clave privada derivada de la biometría del apoderado legal registrado."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica avanzada de activos físicos. Nuestra IA de visión computacional procesa registros fotográficos para generar planos a escala, presupuestos de materiales y análisis de factibilidad de obras.",
        procedure: "1. Capture fotografías multiaxiales del espacio físico. 2. Cargue el set de imágenes al Nodo de Ingeniería. 3. La IA generará el plano 2D/3D con cálculo automático de áreas, rendimientos de materiales y estimación de costos de mano de obra.",
        technical: "Redes neuronales convolucionales (CNN) para detección de aristas y elementos estructurales. Exportación de modelos compatible con software CAD industrial y formatos BIM."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Eco-Créditos y Reciclaje Magnético",
        icon: Recycle,
        concept: "Monetización de la responsabilidad ambiental mediante el uso de Smart Bins equipados con sensores de inducción magnética para la clasificación automatizada de residuos en origen.",
        procedure: "1. Identifíquese en la papelera inteligente mediante su ID Digital. 2. Deposite el envase. 3. El sistema validará el tipo de material mediante magnetismo y visión. 4. Acreditación instantánea de Eco-Créditos en su billetera digital Kyron.",
        technical: "Validación de hardware mediante firmas criptográficas únicas por papelera. Cada gramo reciclado se registra como un activo ambiental tokenizado (E-CR) en el Ledger público de Kyron para su posterior intercambio."
    },
    {
        id: "bi",
        title: "Módulo 9: Business Intelligence y Dashboards",
        icon: TrendingUp,
        concept: "Visualización estratégica de datos para la toma de decisiones ejecutivas. Consolida la información de todos los nodos (Ventas, RRHH, Fiscal) en una matriz de indicadores clave de rendimiento (KPIs).",
        procedure: "1. Acceda al Centro de Mando. 2. Seleccione el periodo de análisis. 3. Visualice tendencias de rentabilidad, eficiencia operativa y exposición al riesgo. 4. Exporte reportes ejecutivos para la junta directiva o socios.",
        technical: "Motor de análisis de datos basado en Big Data con procesamiento en memoria. Generación dinámica de gráficos mediante librerías de alta fidelidad sincronizadas con el Ledger Blockchain."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía de Datos",
        icon: ShieldCheck,
        concept: "Blindaje perimetral y profundo de toda la infraestructura del ecosistema. Implementamos capas de seguridad redundantes para proteger la integridad de los activos digitales de la empresa y del ciudadano.",
        procedure: "1. Active el MFA (Multifactor Authentication) biométrico. 2. Supervise el registro de accesos en el Nodo de Seguridad. 3. Realice auditorías periódicas de permisos de usuario. 4. Ejecute el protocolo de bloqueo de emergencia en caso de extravío de terminales.",
        technical: "Arquitectura de microservicios aislados. Implementación de protocolos TLS 1.3 y firewalls de aplicación (WAF) con detección de intrusiones mediante IA de comportamiento anómalo."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (IA por Voz)",
        icon: Volume2,
        concept: "Interfaz de interacción natural humano-máquina optimizada para el léxico administrativo y legal venezolano. Permite realizar consultas complejas y ejecutar comandos sin necesidad de navegación manual.",
        procedure: "1. Pulse el botón flotante de Kyron Voice. 2. Realice su consulta en voz alta (ej: '¿Cuál es mi saldo de Eco-Créditos?' o '¿Cuándo vence mi RIF?'). 3. El sistema procesará la intención y responderá mediante síntesis de voz natural y visualización en pantalla.",
        technical: "Modelos de Procesamiento de Lenguaje Natural (NLP) entrenados con el corpus legal nacional. Integración con APIs de Speech-to-Text y Text-to-Speech de baja latencia para respuestas en <500ms."
    },
    {
        id: "market-ecr",
        title: "Módulo 12: Mercado de Eco-Créditos (Exchange)",
        icon: Coins,
        concept: "Plataforma de intercambio descentralizado de activos verdes. Permite a las empresas monetizar su impacto ambiental positivo mediante la venta de créditos excedentes a entidades que buscan compensar su huella de carbono.",
        procedure: "1. Ingrese al Mercado E-CR. 2. Publique una oferta de venta de sus créditos acumulados definiendo el precio de mercado. 3. Los interesados ejecutarán la compra mediante saldo de servicios o divisas. 4. El Ledger Blockchain sellará la transferencia del activo verde.",
        technical: "Contratos inteligentes (Smart Contracts) sobre el Ledger de Kyron que aseguran la liquidación atómica de las transacciones. Generación de certificados de carbono neutralidad verificables mediante hash único."
    },
    {
        id: "generador-ia",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        concept: "Motor de redacción automatizada de instrumentos legales de alta fidelidad. Utiliza inteligencia artificial para ensamblar borradores de contratos y actas basados en las leyes vigentes y jurisprudencia del TSJ.",
        procedure: "1. Seleccione el tipo de documento. 2. El sistema extraerá automáticamente los datos de las partes de la Bóveda Jurídica. 3. Ingrese los parámetros específicos (montos, plazos). 4. La IA generará el borrador completo listo para la firma del abogado.",
        technical: "Sistema de In-Context Learning alimentado por una base de datos vectorial de leyes venezolanas actualizadas. Validación de coherencia legal mediante grafos de conocimiento jurídico."
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
                <div style="margin-bottom: 30pt; page-break-inside: avoid; border-bottom: 2px solid #e2e8f0; padding-bottom: 20pt;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; margin-bottom: 12pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; color: #1e293b; margin-bottom: 15pt;"><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f8fafc; padding: 15pt; border-left: 5pt solid #0ea5e9; margin: 15pt 0; border-radius: 8pt;">
                        <p style="color: #0369a1; font-weight: bold; margin-bottom: 8pt; font-size: 10pt; text-transform: uppercase;">PROCEDIMIENTO DE EJECUCIÓN PASO A PASO:</p>
                        <p style="font-size: 10pt; line-height: 1.6; color: #334155;">${mod.procedure}</p>
                    </div>
                    <div style="margin-top: 15pt; padding: 10pt; background-color: #f1f5f9; border-radius: 5pt;">
                        <p style="font-size: 9pt; color: #64748b; font-style: italic;"><strong>RESPALDO DE INGENIERÍA:</strong> ${mod.technical}</p>
                    </div>
                    <div style="margin-top: 10pt; font-size: 8pt; color: #94a3b8; text-align: right;">Protocolo v2.6.5 • Nodo: ${mod.id.toUpperCase()}</div>
                </div>
            `;
        });

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
                    <h2 style="color: #0ea5e9; font-size: 24pt; border-bottom: 3pt solid #0ea5e9; padding-bottom: 10pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">Índice General de Nodos</h2>
                    <div style="line-height: 2.2; font-size: 12pt; margin-top: 30pt;">
                        <p>1.0 Visión Estratégica del Ecosistema ........................................................... 02</p>
                        <p>2.0 Guía de Inicio Rápido (Quick Start) ............................................................. 03</p>
                        <p>3.0 Visualización del Sistema (Dashboards) ....................................................... 04</p>
                        ${manualModules.map((m, i) => `<p>Módulo ${i+1}: ${m.title} ................................................................... 0${i+5}</p>`).join('')}
                        <p>4.0 Soporte y Resolución de Conflictos ............................................................ 18</p>
                        <p>5.0 Requisitos Técnicos de Grado Militar ......................................................... 19</p>
                        <p>6.0 Glosario de Ingeniería y Leyes .................................................................... 20</p>
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
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-size: 22pt;">2.0 PROTOCOLOS DE INGENIERÍA POR NODO</h2>
                ${modulesContent}

                <!-- PIE DE PÁGINA GLOBAL (SIMULADO EN DOC) -->
                <div style="margin-top: 100pt; text-align: center; border-top: 1pt solid #cbd5e1; padding-top: 20pt;">
                    <p style="font-size: 9pt; color: #94a3b8; font-weight: bold;">Manual Maestro System Kyron v2.6.5 • Revisión Marzo 2026 • Expediente Público #KYR-2026-FINAL</p>
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
            title: "EXPEDIENTE INSTITUCIONAL GENERADO", 
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
                    {/* Navegación Lateral HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="h-20 w-20 text-primary" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4 text-center">
                                <Logo className="h-12 w-12 mx-auto mb-4" />
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center justify-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Índice Maestro Interactivo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                <NavButton label="1.0 Visión Estratégica" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <NavButton label="3.0 Visualización Dash" onClick={() => scrollToSection("screenshot")} icon={Monitor} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Protocolos por Nodo</div>
                                {manualModules.map(mod => (
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
                                <Clock className="h-4 w-4" /> Última revisión: Marzo 2026 • Acceso Público Universal
                            </div>
                        </section>

                        {/* 2.0 Quick Start */}
                        <section id="quick" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" /> 2.0 Guía de Inicio Rápido (Quick Start)
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { step: "01", title: "Enrolamiento Maestro", desc: "Ingrese sus credenciales y valide su identidad biométrica 3D para desbloquear el nodo principal.", icon: Fingerprint },
                                    { step: "02", title: "Sincronización Fiscal", desc: "El sistema cargará automáticamente los últimos índices INPC y normativas del SENIAT/BCV.", icon: RefreshCw },
                                    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Contabilidad, RRHH) desde la matriz modular.", icon: Zap },
                                    { step: "04", title: "Inyección de Ledger", desc: "Configure sus parámetros de facturación y nómina para iniciar el sellado digital inmutable.", icon: Database }
                                ].map((item, i) => (
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
                        <div className="space-y-32">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4 border-b border-primary/20 pb-4">
                                <Cpu className="h-6 w-6" /> 4.0 Protocolos de Ingeniería por Nodo
                            </h3>
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-24 group">
                                    <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/30">
                                        <CardHeader className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                                            <div className="p-8 rounded-[3rem] border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700 bg-primary/10">
                                                <mod.icon className="h-12 w-12 text-primary" />
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
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3 text-primary">
                                                    <Terminal className="h-4 w-4" /> Protocolo de Ejecución
                                                </h4>
                                                <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-4">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <span className="font-black text-xs text-primary">[{idx + 1}]</span>
                                                            <span>{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Respaldo de Ingeniería</h4>
                                                <p className="text-lg font-medium text-white/40 leading-relaxed italic text-justify">{mod.technical}</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                                            <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                                                <ShieldCheck className="h-3.5 w-3.5" /> AES-512 SECURED
                                            </div>
                                            <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow uppercase">Verified by Nodo Maestro</Badge>
                                        </CardFooter>
                                    </Card>
                                </section>
                            ))}
                        </div>

                        {/* Troubleshooting */}
                        <section id="trouble" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-red-500 flex items-center gap-4">
                                <AlertTriangle className="h-6 w-6 text-red-500" /> 5.0 Soporte y Resolución de Conflictos
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { q: "¿Falla en el reconocimiento biométrico?", a: "Asegure iluminación frontal uniforme y limpie el sensor óptico. El protocolo requiere visibilidad del 100% de los puntos vectoriales." },
                                    { q: "¿Retardo en la asignación de eSIM?", a: "Verifique que su terminal soporte el estándar eUICC. El tiempo de provisión remota puede variar entre 30s y 3min según la red." },
                                    { q: "¿Error de sincronización con el BCV?", a: "El sistema reintenta la conexión cada 15 min. Puede forzar el sellado manual desde el panel de configuración contable." }
                                ].map((item, i) => (
                                    <Card key={i} className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl">
                                        <p className="font-black text-[10px] uppercase text-red-500 mb-2 tracking-widest italic">INCIDENCIA DE OPERACIÓN {i+1}</p>
                                        <p className="font-bold text-base mb-4 italic text-white/90">{item.q}</p>
                                        <p className="text-sm text-white/60 font-medium leading-relaxed border-l-2 border-red-500/20 pl-6">{item.a}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Requisitos Técnicos */}
                        <section id="specs" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Monitor className="h-6 w-6 text-primary" /> 6.0 Requisitos Técnicos de Grado Militar
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <Card className="bg-white/[0.02] border-white/5 p-10 rounded-[2.5rem]">
                                    <h4 className="text-xs font-black uppercase text-primary mb-8 tracking-widest italic">Hardware & Red</h4>
                                    <ul className="space-y-6 text-[11px] font-bold uppercase tracking-widest text-white/60">
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Memoria RAM:</span> <span className="text-white">8GB Recomendado</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Conectividad:</span> <span className="text-white">5G LTE / 10 Mbps Min.</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Procesador:</span> <span className="text-white">64-bit Quad Core</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Cámara:</span> <span className="text-white">12MP c/ Soporte 3D</span></li>
                                    </ul>
                                </Card>
                                <Card className="bg-white/[0.02] border-white/5 p-10 rounded-[2.5rem]">
                                    <h4 className="text-xs font-black uppercase text-primary mb-8 tracking-widest italic">Software & Crypt</h4>
                                    <ul className="space-y-6 text-[11px] font-bold uppercase tracking-widest text-white/60">
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Navegadores:</span> <span className="text-white">Chrome 95+ / Safari 15+</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Móvil:</span> <span className="text-white">Android 12+ / iOS 16+</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Cifrado:</span> <span className="text-white">AES-512 / TLS 1.3</span></li>
                                        <li className="flex justify-between border-b border-white/5 pb-3"><span>Auth:</span> <span className="text-white">eIDAS Compliant</span></li>
                                    </ul>
                                </Card>
                            </div>
                        </section>

                        {/* Glosario */}
                        <section id="glossary" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <BookOpen className="h-6 w-6 text-primary" /> 7.0 Glosario de Ingeniería y Leyes
                            </h3>
                            <div className="grid gap-6">
                                {[
                                    { t: "eIDAS", d: "Reglamento de la UE relativo a la identificación electrónica y los servicios de confianza para las transacciones electrónicas." },
                                    { t: "SM-DP+", d: "Subscription Manager Data Preparation para el aprovisionamiento remoto seguro de perfiles eSIM." },
                                    { t: "RIPF", d: "Reajuste por Inflación Fiscal obligatorio para contribuyentes del ISLR en Venezuela según la ley vigente." },
                                    { t: "Zero-Knowledge", d: "Arquitectura de seguridad donde el servidor no posee conocimiento de las llaves de cifrado de los datos del usuario." },
                                    { t: "VNF", d: "Virtual Network Function. Funciones de red virtualizadas que permiten la escalabilidad del nodo 5G." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 group hover:bg-white/[0.05] transition-all">
                                        <span className="font-black text-primary uppercase text-sm tracking-widest italic">{item.t}:</span>
                                        <p className="text-xs text-white/60 mt-3 font-medium leading-relaxed text-justify">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <footer className="pt-20 border-t border-white/5 text-center space-y-8 pb-10">
                            <Logo className="h-16 w-16 mx-auto opacity-40 drop-shadow-glow" />
                            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">
                                SYSTEM KYRON MASTER PROTOCOL • v2.6.5 • MARZO 2026
                            </p>
                            <div className="flex items-center justify-center gap-10 text-[8px] font-bold text-white/5 uppercase tracking-[0.4em]">
                                <span>Expediente #KYR-2026-FINAL</span>
                                <span>•</span>
                                <span>Acceso Público Universal</span>
                                <span>•</span>
                                <span>Sello de Integridad Digital</span>
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
