
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
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * DOCUMENTO DE GRADO CORPORATIVO - MÁXIMA DENSIDAD CONCEPTUAL.
 */

const introSection = {
    title: "1.0 Introducción al Ecosistema de Misión Crítica",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una infraestructura de ingeniería convergente diseñada para operar en el complejo entorno regulatorio de la República Bolivariana de Venezuela. No es solo un software; es un nodo de inteligencia que fusiona telecomunicaciones 5G, ciberseguridad cuántica y fiscalidad predictiva. Este protocolo garantiza la operación legal absoluta ante instituciones como el SENIAT, CONATEL, SAREN, SAPI, LOTTT e IVSS."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo", desc: "Instalación de certificados raíz y primer enrolamiento biométrico de administradores.", icon: Terminal },
    { step: "02", title: "Sincronización Fiscal", desc: "Carga de índices INPC del BCV y sincronización con el calendario de contribuyentes especiales.", icon: RefreshCw },
    { step: "03", title: "Activación de Red", desc: "Aprovisionamiento de perfiles eSIM en dispositivos homologados para conectividad segura.", icon: Radio },
    { step: "04", title: "Sellado de Ledger", desc: "Activación de la cadena de bloques para la inmutabilidad de los registros históricos.", icon: ShieldCheck }
];

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        concept: "La identidad es el núcleo de la soberanía digital. Implementamos protocolos de captura de 512 puntos vectoriales faciales bajo el estándar europeo eIDAS, garantizando que cada acción en el sistema sea atribuible de forma inequívoca al titular.",
        procedure: "1. Iniciar Nodo de Enrolamiento. 2. Captura de datos biográficos. 3. Escaneo facial 3D con prueba de vida (Liveness Detection). 4. Generación de Hash de Identidad inmutable en Blockchain.",
        technical: "Cifrado de datos biométricos mediante AES-512. El sistema no almacena imágenes, sino vectores matemáticos procesados en un enclave seguro de hardware."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Infraestructura de red soberana basada en estándares GSMA. Permitimos la gestión remota de flotas móviles mediante aprovisionamiento SM-DP+, asegurando comunicaciones cifradas punto a punto para operaciones corporativas.",
        procedure: "1. Acceder al panel de Telecom. 2. Seleccionar dispositivo homologado. 3. Generar código de activación eUICC. 4. Descarga automática de perfil de red y activación de datos 5G.",
        technical: "Soporte para Network Slicing (priorización de tráfico crítico) y túneles IPsec automáticos para el tráfico administrativo."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) IA y Fiscalidad",
        concept: "Terminal de facturación inteligente diseñado para el cumplimiento estricto de la Providencia SNAT/2011/0071. Integra validación de RIF en tiempo real y cálculo automatizado de IGTF e IVA.",
        procedure: "1. Escaneo de productos/servicios. 2. Validación instantánea del cliente vía Cédula/RIF. 3. Selección de método de pago (Multimoneda). 4. Emisión de Factura Fiscal con código QR verificable.",
        technical: "Sincronización síncrona con el Libro de Ventas. Capacidad de operación offline con re-sincronización automática al detectar nodo de red.",
        icon: TabletSmartphone
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y RIPF",
        icon: BarChart3,
        concept: "Automatización total de la contabilidad bajo normativas VEN-NIF. El sistema realiza el Reajuste por Inflación Fiscal (RIPF) de forma actuarial, eliminando el error humano en balances complejos.",
        procedure: "1. Carga de transacciones del periodo. 2. Ejecución de asientos de ajuste automáticos. 3. Generación de Estado de Situación Financiera. 4. Cierre de ejercicio con sellado de libros digitales.",
        technical: "Integración API directa con los índices INPC del Banco Central de Venezuela. Algoritmos de cuadre por partida doble con tolerancia cero."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y LOTTT",
        icon: Users,
        concept: "Administración integral del capital humano centrada en el cumplimiento de la LOTTT y LOPNNA. Garantiza que cada cálculo de nómina y liquidación sea legalmente inatacable.",
        procedure: "1. Registro de trabajador y carga familiar. 2. Configuración de beneficios (Cesta Ticket, Bonos). 3. Cálculo de quincena y aportes parafiscales (IVSS, FAOV). 4. Generación de Constancias AR-C.",
        technical: "Motor de cálculo parametrizable según convenciones colectivas. Generación de archivos TXT para carga masiva en portales gubernamentales."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y SAREN",
        icon: Gavel,
        concept: "Archivo digital de grado legal para el resguardo de Actas Constitutivas, Poderes y Marcas. Utiliza sellado de tiempo RFC 3161 para garantizar la preexistencia de documentos.",
        procedure: "1. Digitalización de instrumentos legales. 2. Clasificación por expediente. 3. Configuración de alertas de vencimiento de poderes. 4. Gestión de propiedad industrial ante el SAPI.",
        technical: "Cifrado de archivos en reposo con arquitectura Zero-Knowledge. Los documentos solo pueden ser desencriptados mediante la llave biométrica del representante legal."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica de activos físicos. Nuestra IA procesa imágenes para generar planos a escala y cómputos métricos, facilitando la elaboración de presupuestos de obra civil y mantenimiento.",
        procedure: "1. Carga de registro fotográfico del local. 2. Procesamiento de nube de puntos. 3. Extracción de medidas y áreas. 4. Generación de presupuesto basado en APU actualizados.",
        technical: "Motor de visión artificial entrenado para detección de elementos estructurales. Exportación de planos en formatos estándar (DWG/PDF)."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Economía Circular y Activos Verdes",
        icon: Recycle,
        concept: "Iniciativa de la Fundación Kyron para la monetización de residuos. Implementamos tecnología de inducción magnética para clasificar residuos y transformarlos en Eco-Créditos tokenizados.",
        procedure: "1. Autenticación en Smart Bin. 2. Depósito de envases. 3. Validación magnética de material. 4. Acreditación de puntos en la Billetera Digital.",
        technical: "Cada transacción de reciclaje se registra como un activo digital en el Ledger Kyron, permitiendo a las empresas certificar su Carbono Neutralidad."
    },
    {
        id: "bi",
        title: "Módulo 9: Inteligencia de Negocio (BI)",
        icon: TrendingUp,
        concept: "Analítica predictiva de alto nivel. Transforma datos operativos en tableros de control ejecutivos para la toma de decisiones basada en evidencia y no en intuición.",
        procedure: "1. Definición de umbrales críticos. 2. Monitoreo de KPIs en tiempo real. 3. Análisis de tendencias de mercado. 4. Proyección de escenarios financieros (What-if analysis).",
        technical: "Integración de modelos de Machine Learning para la detección de anomalías y prevención de fraudes financieros."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Cifrado Militar",
        icon: ShieldCheck,
        concept: "Blindaje proactivo de la infraestructura. Aplicamos una arquitectura de Confianza Cero (Zero Trust) para asegurar que el ecosistema sea resistente a ataques dirigidos y exfiltración de datos.",
        procedure: "1. Auditoría de accesos. 2. Monitoreo de integridad de archivos. 3. Gestión de llaves de cifrado. 4. Respuesta automatizada ante incidentes.",
        technical: "Implementación de protocolos de seguridad cuánticamente resistentes. Registro de logs inmutable para auditorías de forense digital."
    }
];

const innovationTier2 = [
    {
        id: "voice",
        title: "Kyron Voice: Inferencia por Lenguaje Natural",
        icon: Volume2,
        concept: "Interacción humano-máquina mediante voz. Nuestro asistente IA entiende el lenguaje administrativo venezolano para agilizar consultas críticas sin necesidad de teclado.",
        procedure: "Presione el icono de volumen y consulte: '¿Cuál es el saldo actual en el Ledger?' o 'Genera el borrador del contrato de arrendamiento para el local A'.",
        technical: "Procesamiento en el borde (Edge AI) para garantizar privacidad. Modelos NLP optimizados para términos legales y contables específicos.",
        details: "Capacidad de lectura de reportes y alertas críticas mediante síntesis de voz de alta fidelidad."
    },
    {
        id: "generador-ia",
        title: "Generador Jurídico IA: Redacción Automatizada",
        icon: Wand2,
        concept: "Motor de generación de instrumentos legales. Crea borradores de contratos y actas basados en plantillas certificadas por nuestro departamento legal y adaptadas a la ley vigente.",
        procedure: "1. Elegir tipo de documento. 2. Inyectar datos de las partes. 3. Definir condiciones comerciales. 4. Obtener borrador profesional editable.",
        technical: "Sincronización con el módulo de Poderes para validar que los firmantes tienen la capacidad legal requerida.",
        details: "Reduce el tiempo de redacción legal en un 90%, minimizando el riesgo de errores en cláusulas de jurisdicción y domicilio."
    },
    {
        id: "market-ecr",
        title: "Exchange de Eco-Créditos: Mercado de Activos Verdes",
        icon: Coins,
        concept: "Plataforma de trading para la sostenibilidad. Las empresas pueden intercambiar Eco-Créditos para compensar su impacto ambiental y cumplir con normativas internacionales de ESG.",
        procedure: "1. Verificar balance de E-CR. 2. Publicar oferta de venta o compra. 3. Ejecutar transacción con firma digital. 4. Obtener certificado de compensación.",
        technical: "Arquitectura basada en Smart Contracts para garantizar que cada Eco-Crédito solo pueda ser canjeado una vez.",
        details: "Fomenta una economía circular real donde la responsabilidad ambiental se convierte en un activo financiero tangible."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        const content = `
            <div style="font-family: 'Times New Roman', serif; padding: 40pt; color: #1a1a1a;">
                <!-- PORTADA -->
                <div style="text-align: center; border: 2pt solid #0ea5e9; padding: 50pt; margin-bottom: 50pt; border-radius: 20pt;">
                    <h1 style="color: #0ea5e9; font-size: 42pt; margin-bottom: 10pt;">SYSTEM KYRON</h1>
                    <p style="font-size: 18pt; font-weight: bold; color: #64748b;">EXPEDIENTE MAESTRO DE OPERACIONES</p>
                    <p style="font-size: 14pt; color: #94a3b8; margin-top: 20pt;">VERSIÓN 2.6.5 • GRADO CORPORATIVO</p>
                    <div style="margin-top: 40pt;">
                        <p style="font-size: 10pt; color: #ef4444; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">[ CONFIDENCIALIDAD NIVEL 5 - USO RESTRINGIDO ]</p>
                    </div>
                </div>

                <!-- INTRODUCCIÓN -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 5pt; margin-top: 40pt;">1.0 INTRODUCCIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; line-height: 1.6;">${introSection.text}</p>
                <div style="background-color: #f0f9ff; padding: 15pt; border-left: 5pt solid #0ea5e9; margin: 20pt 0;">
                    <p style="font-weight: bold; color: #0369a1; margin: 0;">MISIÓN DEL SISTEMA:</p>
                    <p style="font-style: italic; margin: 5pt 0 0 0;">"${introSection.mission}"</p>
                </div>

                <!-- MÓDULOS -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 5pt; margin-top: 40pt;">2.0 PROTOCOLOS OPERATIVOS DE INGENIERÍA</h2>
                ${manualModules.map(mod => `
                    <div style="margin-bottom: 35pt; page-break-inside: avoid;">
                        <h3 style="background-color: #0ea5e9; color: white; padding: 10pt 20pt; border-radius: 5pt;">${mod.title}</h3>
                        <div style="padding: 10pt 0;">
                            <p><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                            <div style="background-color: #f8fafc; padding: 12pt; border: 1pt solid #e2e8f0; border-radius: 8pt; margin: 10pt 0;">
                                <p style="font-weight: bold; color: #0ea5e9; margin-bottom: 5pt;">PROTOCOLO DE EJECUCIÓN:</p>
                                <p>${mod.procedure}</p>
                            </div>
                            <p style="font-size: 10pt; color: #64748b;"><strong>ARQUITECTURA TÉCNICA:</strong> ${mod.technical}</p>
                        </div>
                    </div>
                `).join('')}

                <!-- INNOVACIONES -->
                <h2 style="color: #22c55e; border-bottom: 2pt solid #22c55e; padding-bottom: 5pt; margin-top: 40pt;">3.0 INNOVACIONES DE VANGUARDIA (TIER 2)</h2>
                ${innovationTier2.map(inn => `
                    <div style="margin-bottom: 30pt; border: 1pt solid #d1fae5; border-radius: 10pt; padding: 20pt; background-color: #f0fdf4;">
                        <h3 style="color: #15803d; margin-top: 0;">${inn.title}</h3>
                        <p><strong>VALOR ESTRATÉGICO:</strong> ${inn.concept}</p>
                        <p><strong>MODO DE OPERACIÓN:</strong> ${inn.procedure}</p>
                        <p style="font-size: 9pt; color: #166534; margin-top: 10pt; font-style: italic;">Respaldo: ${inn.technical}</p>
                    </div>
                `).join('')}

                <!-- ANEXOS TÉCNICOS -->
                <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 5pt; margin-top: 40pt;">4.0 ANEXOS Y SOPORTE</h2>
                <div style="margin-bottom: 20pt;">
                    <h4 style="color: #0369a1;">4.1 Requisitos de Sistema (Hardware & Red)</h4>
                    <ul style="color: #475569;">
                        <li><strong>Terminales Móviles:</strong> Android 11+ / iOS 15+ con soporte eSIM y Biometría.</li>
                        <li><strong>Conectividad:</strong> Red 5G / 4G LTE con latencia < 50ms para transacciones Blockchain.</li>
                        <li><strong>Estación de Trabajo:</strong> Chrome 110+, Edge o Firefox actualizados.</li>
                        <li><strong>Seguridad Local:</strong> Cámara HD 1080p para enrolamiento facial de alta fidelidad.</li>
                    </ul>
                </div>

                <div style="margin-bottom: 20pt;">
                    <h4 style="color: #0369a1;">4.2 Glosario de Ingeniería</h4>
                    <p><strong>eIDAS:</strong> Reglamento europeo para la identificación electrónica y servicios de confianza.</p>
                    <p><strong>SM-DP+:</strong> Servidor de preparación de datos de suscripción para eSIM (estándar GSMA).</p>
                    <p><strong>Ledger:</strong> Libro contable distribuido e inmutable basado en tecnología Blockchain.</p>
                    <p><strong>RIPF:</strong> Reajuste por Inflación Fiscal, proceso legal obligatorio para balances reales.</p>
                </div>

                <div style="margin-top: 60pt; text-align: center; border-top: 2pt solid #eee; padding-top: 20pt;">
                    <p style="font-size: 9pt; color: #94a3b8;">SYSTEM KYRON • CORPORATE INTELLIGENCE HUB • © 2026</p>
                    <p style="font-size: 8pt; color: #cbd5e1;">DOCUMENTO SELLADO DIGITALMENTE - ID: KYR-MSTR-V265-SEC5</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 0; margin: 0;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE EXPORTADO", 
            description: "Manual Maestro v2.6.5 generado bajo protocolo de alta fidelidad.",
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
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Navegación Lateral HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="h-20 w-20 text-primary" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones Tier 2</div>
                                {innovationTier2.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Soporte Maestro</div>
                                <NavButton label="Requisitos Técnicos" onClick={() => scrollToSection("intro")} icon={Monitor} />
                                <NavButton label="Glosario" onClick={() => scrollToSection("intro")} icon={BookOpen} />
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal de Alta Densidad */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* 1.0 Introducción */}
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6"
                            >
                                <Sparkles className="h-3 w-3" /> NODO CENTRAL v2.6.5
                            </motion.div>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">{introSection.title}</h2>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                            <Card className="bg-primary/5 border-primary/20 p-8 rounded-[2rem]">
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2">Misión Institucional</p>
                                <p className="text-lg font-bold italic text-white/90">{introSection.mission}</p>
                            </Card>
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

                        {/* Módulos de Operación */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4">
                                <Cpu className="h-6 w-6" /> 3.0 Protocolos Operativos
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        {/* Innovaciones Tier 2 */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary flex items-center gap-4">
                                <Sparkles className="h-6 w-6" /> 4.0 Innovaciones de Vanguardia
                            </h3>
                            {innovationTier2.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-secondary" />
                            ))}
                        </div>

                        {/* Soporte y Troubleshooting */}
                        <section id="support" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Activity className="h-6 w-6 text-emerald-500" /> 5.0 Soporte y Resolución
                            </h3>
                            <div className="grid gap-6">
                                <Card className="glass-card p-10 rounded-[3rem] border-white/5 bg-white/[0.01]">
                                    <h4 className="text-lg font-black uppercase italic text-primary mb-6">Troubleshooting Maestro</h4>
                                    <div className="space-y-6">
                                        {[
                                            { q: "Falla en Validación Biométrica", a: "Asegure iluminación de 300 lux, limpie lente óptico y evite accesorios que cubran puntos vectoriales clave." },
                                            { q: "Latencia en Ledger Blockchain", a: "Verifique que el firewall permita tráfico por los puertos del nodo Kyron y que la conexión 5G esté en modo 'Low Latency'." },
                                            { q: "Desconexión de Smart Bin", a: "Reinicie el nodo de inducción magnética y valide el estado de los sensores de proximidad." }
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <p className="font-black text-xs uppercase text-white/80">{item.q}</p>
                                                <p className="text-xs text-muted-foreground font-medium italic">{item.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </section>

                        <footer className="pt-20 border-t border-white/5 text-center space-y-6">
                            <Logo className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                                SYSTEM KYRON MASTER PROTOCOL • END OF FILE
                            </p>
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
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">Protocolo Operativo Verificado</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 flex items-center gap-2">
                            <BookOpen className="h-3 w-3" /> Concepto Fundamental
                        </h4>
                        <p className="text-xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept || mod.description}</p>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Procedimiento de Ejecución
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
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Arquitectura de Ingeniería</h4>
                        <p className="text-lg font-medium text-white/40 leading-relaxed italic text-justify">{mod.technical || mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> SECURE-NODE AUTH
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow">VERIFIED BY MASTER NODE</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
