
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    Sparkles,
    Database,
    Zap,
    CheckCircle,
    Lock,
    Download,
    ChevronLeft,
    ListTree,
    Terminal,
    RefreshCw,
    Activity,
    ShieldAlert,
    HelpCircle,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    Clock,
    Search,
    UserPlus,
    Target,
    LayoutGrid,
    ChevronRight,
    AlertTriangle,
    Shield,
    Volume2,
    Coins,
    School,
    Wand2,
    Printer,
    X,
    Monitor,
    BarChart3,
    Network,
    Atom
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const introSection = {
    title: "1.0 Bienvenido a System Kyron v2.6.5",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que ofrece líneas 5G, gestión eSIM y equipos homologados como servicio base. Sobre esta infraestructura de red, desplegamos un ecosistema de cumplimiento normativo total que garantiza la operación legal de su empresa ante todas las instituciones rectoras del Estado venezolano: tributario (SENIAT), telecomunicaciones (CONATEL), registral (SAREN), propiedad intelectual (SAPI), laboral (LOTTT, IVSS, FAOV, INCES) y protección del menor (LOPNNA). Cada transacción y registro es blindado por inteligencia artificial predictiva y un ledger blockchain que asegura su inmutabilidad. Este manual proporciona los protocolos para operar los nodos del sistema con absoluta solvencia legal."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo", desc: "Ingrese sus credenciales maestras y valide su identidad biométrica inicial mediante el escaneo facial 3D.", icon: Terminal },
    { step: "02", title: "Sincronización de Base", desc: "El sistema cargará automáticamente los últimos índices INPC del BCV y los parámetros de ley vigentes.", icon: RefreshCw },
    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Fiscal, RRHH) desde el selector de arquitectura modular.", icon: Zap },
    { step: "04", title: "Inyección de Datos", desc: "Suba su base de clientes, productos y activos mediante el motor de importación masiva con validación IA.", icon: Database }
];

const technicalRequirements = {
    title: "Requisitos Técnicos de Operación",
    items: [
        { label: "Navegación", desc: "Chromium v115+ (Chrome/Edge), Firefox 110+, Safari 16+. Aceleración por hardware requerida." },
        { label: "Sistemas Móviles", desc: "Android 11+ o iOS 15+. Compatibilidad con tecnología eSIM (eUICC) para gestión de líneas." },
        { label: "Hardware Estación", desc: "Mínimo 4GB RAM (8GB recomendado). Cámara HD con profundidad para biometría facial." },
        { label: "Conectividad Red", desc: "Enlace simétrico > 10Mbps. Latencia < 40ms para sincronización de Ledger Blockchain." },
        { label: "Seguridad Local", desc: "TPM 2.0 habilitado. Firewall corporativo con puertos 443/8443 abiertos para túneles IPsec." }
    ]
};

const glossaryTerms = [
    { term: "AES-512", def: "Estándar de cifrado avanzado con llaves de 512 bits para blindaje de activos digitales." },
    { term: "eIDAS", def: "Reglamento de la UE sobre identificación electrónica y servicios de confianza." },
    { term: "SM-DP+", def: "Subscription Manager Data Preparation para el aprovisionamiento remoto de perfiles eSIM." },
    { term: "Network Slicing", def: "Segmentación virtual de la red 5G para garantizar ancho de banda a aplicaciones críticas." },
    { term: "VEN-NIF", def: "Normas de Información Financiera adoptadas en Venezuela para transparencia contable." },
    { term: "RIPF", def: "Reajuste por Inflación Fiscal, cálculo obligatorio para la determinación del ISLR." },
    { term: "Ledger Blockchain", def: "Libro contable digital distribuido donde los registros son permanentes e inalterables." },
    { term: "Zero-Knowledge Proof", def: "Protocolo criptográfico que permite validar datos sin revelar la información sensible subyacente." }
];

const innovationModules = [
    {
        id: "voice",
        title: "Interacción por Voz (V-IA)",
        icon: Volume2,
        description: "Asistente inteligente con procesamiento de lenguaje natural (NLP) adaptado al léxico venezolano.",
        procedure: "1. Active el botón de voz en el HUD. 2. Realice su consulta técnica o legal. 3. Escuche la inferencia de la IA basada en la Gaceta Oficial. 4. Confirme la acción ejecutada.",
        details: "Reducción del 60% en tiempos de consulta documental. Entrenamiento basado en jurisprudencia y normativa administrativa nacional."
    },
    {
        id: "mercado",
        title: "Mercado de Eco-Créditos",
        icon: Coins,
        description: "Exchange de bonos verdes tokenizados para la monetización de la responsabilidad ambiental.",
        procedure: "1. Inyecte residuos en Smart Bins. 2. Valide créditos en su billetera digital. 3. Publique oferta en el mercado secundario. 4. Liquide activos o compense huella.",
        details: "Arquitectura basada en Smart Contracts que garantiza la trazabilidad de cada kilogramo de residuo transformado en activo digital."
    },
    {
        id: "generador",
        title: "Generador IA de Documentos",
        icon: Wand2,
        description: "Motor de redacción jurídica automatizada bajo el marco del Código Civil y de Comercio.",
        procedure: "1. Seleccione tipo de instrumento. 2. Identifique a las partes. 3. Defina condiciones de negocio. 4. Obtenga borrador de grado legal para firma.",
        details: "Elimina el 90% de los errores de redacción comunes. Sincronización con el módulo de permisos para validación de poderes vigentes."
    }
];

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital 3D",
        icon: Fingerprint,
        description: "Sistema maestro de autenticación biométrica y resguardo de identidad civil.",
        procedure: "1. Iniciar sesión segura. 2. Acceder a Enrolamiento Facial. 3. Captura de 512 puntos vectoriales. 4. Vinculación de Cédula/RIF. 5. Emisión de ID Digital.",
        details: "Protocolo de 'Prueba de Vida' (Liveness Detection) para prevenir suplantación por fotos o videos. Cumplimiento con estándares internacionales eIDAS."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecom 5G y eSIM",
        icon: Radio,
        description: "Gestión de conectividad convergente y aprovisionamiento remoto de líneas.",
        procedure: "1. Selección de plan de datos. 2. Generación de perfil eUICC. 3. Escaneo de código de activación. 4. Registro en el HLR/HSS corporativo.",
        details: "Integración nativa con servidores SM-DP+ de Kyron. Soporte para Network Slicing para priorizar tráfico de TPV y Contabilidad."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta IA",
        icon: TabletSmartphone,
        description: "Terminal de facturación inteligente con validación fiscal síncrona.",
        procedure: "1. Validación de operador. 2. Escaneo de activos/productos. 3. Cálculo automático de IVA/IGTF. 4. Cierre de venta y emisión de factura QR.",
        details: "Sincronización automática con inventario y libros de venta. Detección de exenciones de IVA según decretos presidenciales vigentes."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Finanzas y Contabilidad",
        icon: BarChart3,
        description: "Automatización total del ciclo contable bajo estándares VEN-NIF.",
        procedure: "1. Carga de transacciones por Ledger. 2. Ejecución de asientos automáticos. 3. Cálculo de RIPF (Ajuste por Inflación). 4. Generación de Estados Financieros.",
        details: "Integración con el INPC del Banco Central de Venezuela para cálculos actuariales precisos y auditoría de balance en tiempo real."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento",
        icon: Users,
        description: "Administración estratégica de capital humano y nómina automatizada.",
        procedure: "1. Alta de ficha de trabajador. 2. Configuración de conceptos prestacionales. 3. Cálculo de quincena y aportes. 4. Envío de recibos digitales.",
        details: "Cálculo preciso de IVSS, FAOV e INCES. Módulo de LOPNNA para protección de menores y registro de cargas familiares."
    },
    {
        id: "juridico",
        title: "Módulo 6: Centro Jurídico Corporativo",
        icon: Gavel,
        description: "Gestión de contratos, poderes y cumplimiento normativo integral.",
        procedure: "1. Registro de actas de asamblea. 2. Control de vigencia de poderes. 3. Seguimiento de trámites en SAREN/SAPI. 4. Alertas de vencimiento legal.",
        details: "Bóveda segura para resguardo de títulos de propiedad y documentos constitutivos con sello de tiempo inmutable."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Proyectos IA",
        icon: Cpu,
        description: "Planificación técnica basada en fotogrametría y presupuestos automatizados.",
        procedure: "1. Carga de captura visual del local. 2. Generación de plano a escala por IA. 3. Cálculo métrico de materiales. 4. Exportación de presupuesto CapEx.",
        details: "Optimización de costos de obra civil mediante algoritmos de inteligencia espacial y base de datos de precios de materiales actualizada."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Ecosistema de Sostenibilidad",
        icon: Recycle,
        description: "Gestión de residuos mediante tecnología de inducción magnética.",
        procedure: "1. Ubicación de Smart Bin. 2. Autenticación de usuario. 3. Depósito y clasificación magnética. 4. Tokenización de impacto en Eco-Créditos.",
        details: "Implementación del modelo de economía circular Kyron. Transformación de residuos en activos transaccionables en el mercado interno."
    },
    {
        id: "bi",
        title: "Módulo 9: Inteligencia de Negocio (BI)",
        icon: TrendingUp,
        description: "Dashboard ejecutivo para la toma de decisiones basada en datos.",
        procedure: "1. Selección de nodo de análisis. 2. Definición de KPI estratégico. 3. Visualización de tendencias predictivas. 4. Exportación de reporte ejecutivo.",
        details: "Análisis multidimensional de rentabilidad, riesgo de mercado y comportamiento del consumidor mediante redes neuronales recurrentes."
    },
    {
        id: "ciberseguridad",
        title: "Módulo 10: Ciberseguridad Militar",
        icon: ShieldCheck,
        description: "Blindaje de infraestructura y soberanía de los datos corporativos.",
        procedure: "1. Monitoreo de nodos activos. 2. Auditoría de accesos biométricos. 3. Verificación de integridad del Ledger. 4. Escaneo de vulnerabilidades.",
        details: "Cifrado AES-512 en reposo y TLS 1.3 en tránsito. Arquitectura Zero-Knowledge: Kyron no conoce sus llaves privadas, solo usted tiene el control."
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = () => {
        const content = `
            <div style="text-align: center; margin-bottom: 40pt; border: 4pt double #0ea5e9; padding: 30pt; border-radius: 15pt; background-color: #f8fafc;">
                <h1 style="color: #0ea5e9; font-size: 36pt; font-family: 'Arial Black', sans-serif; margin-bottom: 5pt; text-transform: uppercase;">SYSTEM KYRON</h1>
                <p style="color: #1e293b; font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt; margin-bottom: 20pt;">Manual de Usuario Maestro v2.6.5</p>
                <div style="width: 80pt; height: 3pt; background-color: #0ea5e9; margin: 0 auto 15pt;"></div>
                <p style="color: #64748b; font-size: 10pt; font-style: italic;">Documento de Grado Corporativo • Confidencialidad Nivel 5</p>
            </div>

            <h2 style="color: #0ea5e9; border-left: 10pt solid #0ea5e9; padding-left: 15pt; margin-top: 30pt; font-family: 'Arial Black';">1.0 INTRODUCCIÓN GENERAL</h2>
            <p style="text-align: justify; font-size: 11pt; line-height: 1.6; color: #334155;">${introSection.text}</p>

            <h2 style="color: #0ea5e9; margin-top: 30pt; border-left: 10pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">2.0 INICIO RÁPIDO (QUICK START)</h2>
            ${quickStartSteps.map(step => `
                <div style="margin-top: 10pt; padding: 12pt; border: 1pt solid #e2e8f0; border-radius: 8pt; background: #ffffff;">
                    <h3 style="color: #0ea5e9; margin-top: 0; font-size: 12pt;">${step.step}. ${step.title}</h3>
                    <p style="font-size: 10pt; color: #64748b;">${step.desc}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">3.0 PROTOCOLOS OPERATIVOS POR MÓDULO</h2>
            ${manualModules.map(mod => `
                <div style="margin-top: 20pt; padding: 15pt; border: 1pt solid #cbd5e1; border-radius: 10pt; background: #fdfdfd;">
                    <h3 style="color: #0ea5e9; margin-top: 0; text-transform: uppercase; font-size: 14pt;">${mod.title}</h3>
                    <p style="font-weight: bold; color: #475569; font-size: 10pt;">OBJETIVO: ${mod.description}</p>
                    <div style="margin-top: 10pt; padding: 10pt; background: #f1f5f9; border-radius: 5pt;">
                        <p style="font-weight: bold; font-size: 9pt; color: #0ea5e9;">PROCEDIMIENTO PASO A PASO:</p>
                        <p style="font-size: 10pt; color: #334155;">${mod.procedure}</p>
                    </div>
                    <p style="font-size: 9pt; margin-top: 10pt; color: #94a3b8; font-style: italic;"><strong>ARQUITECTURA:</strong> ${mod.details}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">4.0 INNOVACIONES ESTRATÉGICAS TIER 2</h2>
            ${innovationModules.map(mod => `
                <div style="margin-top: 15pt; padding: 15pt; border: 1pt solid #0ea5e9; border-radius: 10pt; background: #f0f9ff;">
                    <h3 style="color: #0369a1; margin-top: 0; font-family: 'Arial Black';">${mod.title}</h3>
                    <p style="font-size: 10pt; font-weight: bold; color: #0ea5e9;">${mod.description}</p>
                    <p style="font-size: 10pt; margin-top: 8pt;"><strong>OPERACIÓN:</strong> ${mod.procedure}</p>
                    <p style="font-size: 9pt; margin-top: 5pt; color: #64748b; font-style: italic;">${mod.details}</p>
                </div>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 15pt; font-family: 'Arial Black';">5.0 REQUISITOS TÉCNICOS Y GLOSARIO</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10pt;">
                <tr style="background-color: #0ea5e9; color: white;">
                    <th style="padding: 10pt; text-align: left; border: 1pt solid #ddd;">CATEGORÍA</th>
                    <th style="padding: 10pt; text-align: left; border: 1pt solid #ddd;">ESPECIFICACIÓN</th>
                </tr>
                ${technicalRequirements.items.map(req => `
                    <tr>
                        <td style="padding: 10pt; border: 1pt solid #ddd; font-weight: bold; background: #f8fafc;">${req.label}</td>
                        <td style="padding: 10pt; border: 1pt solid #ddd; font-size: 9pt;">${req.desc}</td>
                    </tr>
                `).join('')}
            </table>

            <div style="margin-top: 30pt;">
                <h3 style="color: #0ea5e9; font-family: 'Arial Black';">GLOSARIO DE TÉRMINOS</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10pt;">
                    ${glossaryTerms.map(term => `
                        <p style="font-size: 9pt; margin-bottom: 5pt;"><strong>${term.term}:</strong> ${term.def}</p>
                    `).join('')}
                </div>
            </div>

            <div style="margin-top: 50pt; padding: 20pt; border: 2pt solid #ef4444; border-radius: 10pt; background: #fef2f2; text-align: center;">
                <h3 style="color: #ef4444; margin-top: 0; font-family: 'Arial Black';">SOPORTE MAESTRO 24/7</h3>
                <p style="font-size: 11pt; font-weight: bold;">Para asistencia crítica: infosystemkyron@gmail.com</p>
                <p style="font-size: 9pt; color: #b91c1c;">Protocolo de respuesta: < 2 horas para Nivel 5.</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title><style>table { width: 100%; border-collapse: collapse; } th, td { border: 1pt solid #ddd; padding: 10pt; text-align: left; font-size: 10pt; }</style></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "EXPEDIENTE EXPORTADO", description: "Manual Maestro v2.6.5 generado bajo protocolo seguro." });
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
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><ChevronLeft className="mr-2 h-3 w-3" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones Tier 2</div>
                                {innovationModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <NavButton label="Apéndice: Requisitos" onClick={() => scrollToSection("tech")} icon={Monitor} />
                                <NavButton label="Apéndice: Glosario" onClick={() => scrollToSection("glossary")} icon={BookOpen} />
                            </CardContent>
                        </Card>
                    </aside>

                    <div className="lg:col-span-8 space-y-32">
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6">
                                <Sparkles className="h-3 w-3" /> NODO CENTRAL v2.6.5
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">{introSection.title}</h2>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                        </section>

                        <section id="quick" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" /> 2.0 Inicio Rápido
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((item, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/[0.01]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl font-black text-primary/40 italic">{item.step}</span>
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                        <h4 className="font-black uppercase text-sm mb-2">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4">
                                <Cpu className="h-6 w-6" /> 3.0 Protocolos Operativos
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleCard key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-yellow-500 flex items-center gap-4">
                                <Zap className="h-6 w-6" /> 4.0 Innovaciones Tier 2
                            </h3>
                            {innovationModules.map(mod => (
                                <ModuleCard key={mod.id} mod={mod} color="text-yellow-500" />
                            ))}
                        </div>

                        <section id="tech" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Monitor className="h-6 w-6 text-primary" /> Apéndice A: Requisitos Técnicos
                            </h3>
                            <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.01]">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-white/[0.03] border-none">
                                            <TableHead className="pl-10 font-black uppercase text-[10px] tracking-widest text-primary">CATEGORÍA</TableHead>
                                            <TableHead className="font-black uppercase text-[10px] tracking-widest text-primary">ESPECIFICACIÓN</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {technicalRequirements.items.map((req, i) => (
                                            <TableRow key={i} className="border-white/5">
                                                <TableCell className="pl-10 font-black text-xs text-white/80 uppercase">{req.label}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground font-medium">{req.desc}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </section>

                        <section id="glossary" className="space-y-12 scroll-mt-24 pb-20">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <BookOpen className="h-6 w-6 text-primary" /> Apéndice B: Glosario de Ingeniería
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {glossaryTerms.map((term, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">{term.term}</span>
                                        <p className="text-[10px] text-white/40 font-bold leading-relaxed">{term.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
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
            className="group w-full text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />}
                <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
    );
}

function ModuleCard({ mod, color }: { mod: any, color: string }) {
    return (
        <section id={mod.id} className="scroll-mt-24">
            <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all hover:border-primary/20">
                <CardHeader className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                    <div className={cn("p-8 rounded-[3rem] border border-white/10 shadow-inner", color === 'text-yellow-500' ? 'bg-yellow-500/10' : 'bg-primary/10')}>
                        <mod.icon className={cn("h-12 w-12", color)} />
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">{mod.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Procedimiento Operativo
                        </h4>
                        <div className="text-sm font-bold italic text-white/80 leading-relaxed text-justify space-y-4">
                            {mod.procedure.split('. ').map((step: string, idx: number) => (
                                <p key={idx} className="flex gap-4"><span className={color}>[{idx + 1}]</span> {step}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Arquitectura Técnica</h4>
                        <p className="text-lg font-medium text-white/50 leading-relaxed italic text-justify">{mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> AES-512 SECURED
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg">VERIFIED BY NODO MAESTRO</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
