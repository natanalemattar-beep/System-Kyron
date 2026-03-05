
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    HeartHandshake,
    Download,
    Home,
    Sparkles,
    Server,
    Database,
    Zap,
    CheckCircle,
    ChevronRight,
    Lock,
    Printer,
    Activity,
    Scale,
    FileText,
    ListTree,
    HelpCircle,
    ShieldAlert,
    Rocket,
    Globe,
    Terminal,
    RefreshCw,
    Search,
    BookOpen,
    Eye,
    Calculator,
    Mail,
    Shield,
    Smartphone,
    Bell,
    Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * DOCUMENTACIÓN TÉCNICA MASIVA Y EXHAUSTIVA.
 */

const introSection = {
    title: "1.0 Bienvenido al Ecosistema System Kyron",
    mission: "Garantizar la soberanía tecnológica y fiscal mediante arquitecturas inmutables de grado corporativo.",
    text: "System Kyron v2.6.5 es una plataforma de inteligencia distribuida diseñada para centralizar la operatividad de empresas modernas en el complejo entorno venezolano. Nuestra arquitectura fusiona conectividad 5G, inteligencia artificial predictiva para cumplimiento del SENIAT y un ledger blockchain que garantiza la integridad absoluta de cada activo digital. Este manual proporciona los protocolos necesarios para la operación segura de los nodos del ecosistema."
};

const technicalRequirements = {
    title: "Requisitos Técnicos de Operación",
    items: [
        { label: "Conectividad de Red", desc: "Enlace simétrico mínimo de 10Mbps. Recomendado: Nodo 5G Kyron para latencias inferiores a 14ms." },
        { label: "Navegación Segura", desc: "Navegadores con motor Chromium v115+ o WebKit actualizado. Soporte WebGL para visualización de activos 3D." },
        { label: "Hardware de Terminal", desc: "CPU Quad-Core @ 2.4GHz, 8GB RAM. Cámara HD con sensor IR para validación biométrica de profundidad." },
        { label: "Seguridad de Datos", desc: "Habilitación obligatoria de TPM 2.0 o enclave seguro para el resguardo de llaves privadas del Ledger." }
    ]
};

const glossaryTerms = [
    { term: "Ledger Inmutable", def: "Base de datos distribuida donde los registros, una vez validados, no pueden ser alterados ni eliminados." },
    { term: "eSIM (eUICC)", def: "Módulo de identidad de abonado integrado que permite el cambio de operador mediante software (Over-the-Air)." },
    { term: "Inducción Magnética Síncrona", def: "Método de detección de metales y polímeros mediante la perturbación controlada de un campo electromagnético." },
    { term: "Cifrado AES-512", def: "Estándar de cifrado avanzado con llaves de 512 bits, duplicando la seguridad bancaria tradicional." },
    { term: "Validación eIDAS", def: "Reglamento de la UE que define los niveles de confianza para la identificación electrónica y firmas digitales." }
];

const manualModules = [
    {
        id: "identidad",
        title: "1. Gestión de Identidad Digital 3D",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación biométrica y resguardo de documentos civiles.",
        procedure: "1. Acceda al Portal Personal. 2. Seleccione 'Enrolamiento Biométrico'. 3. Realice el mapeo facial siguiendo los puntos vectoriales. 4. Firme el acta de soberanía digital con su huella cifrada.",
        details: "El sistema utiliza algoritmos de visión artificial para extraer 512 puntos vectoriales del rostro, garantizando una tasa de error de 1 entre 1.000.000. Los documentos en la Bóveda Civil están fragmentados y cifrados, lo que significa que ni siquiera los administradores de Kyron pueden ver su contenido (Arquitectura Zero-Knowledge)."
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Despliegue y administración de redes convergentes y telefonía digital.",
        procedure: "1. Ingrese a Gestión de Telecom. 2. Seleccione 'Aprovisionar eSIM'. 3. Escanee el código QR dinámico generado por el servidor SM-DP+. 4. Active el perfil de red corporativo.",
        details: "Nuestra red utiliza Network Slicing para priorizar el tráfico de datos fiscales y transaccionales sobre el tráfico recreativo. La gestión de eSIM permite a las empresas reasignar números telefónicos de forma remota, eliminando la necesidad de logística física de tarjetas SIM tradicionales."
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) y Facturación",
        icon: TabletSmartphone,
        description: "Operativa comercial con validación fiscal síncrona ante el SENIAT.",
        procedure: "1. Valide su ID de Operador. 2. Ingrese el RIF/Cédula del cliente (la IA autocompletará datos). 3. Escanee productos. 4. Procese el pago y emita la factura homologada.",
        details: "El TPV Kyron está integrado con el motor de Prevención de Sanciones. Si detecta un RIF vencido o una inconsistencia en el cálculo de IGTF, el sistema bloqueará la transacción y sugerirá la corrección legal inmediata según la Providencia 0071."
    },
    {
        id: "contabilidad",
        title: "4. Contabilidad y Auditoría Predictiva",
        icon: TrendingUp,
        description: "Consolidación financiera y cumplimiento fiscal automatizado.",
        procedure: "1. Ejecute el 'Cierre de Periodo'. 2. Verifique el Reajuste por Inflación Fiscal (RIPF). 3. Genere los archivos .TXT para el SENIAT. 4. Selle el periodo en el Ledger Blockchain.",
        details: "La IA contable monitorea las fluctuaciones del INPC publicadas por el BCV para realizar ajustes actuariales precisos. Cada asiento contable genera un hash único que se inyecta en el blockchain, impidiendo la 'contabilidad creativa' y blindando a la empresa ante futuras auditorías."
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Cultura",
        icon: Briefcase,
        description: "Administración integral del personal y cumplimiento de la LOTTT.",
        procedure: "1. Cargue el perfil del empleado. 2. Genere el contrato de trabajo parametrizado. 3. Procese la nómina quincenal. 4. Emita los recibos de pago con firma digital verificable.",
        details: "El módulo de RR.HH. automatiza el cálculo de prestaciones sociales, vacaciones y utilidades, ajustándose a la última jurisprudencia del TSJ. La plataforma permite la gestión de expedientes de personal con sellado de tiempo para evitar reclamos laborales por falta de documentación."
    },
    {
        id: "legal",
        title: "6. Centro de Mando Jurídico",
        icon: Gavel,
        description: "Control de contratos, poderes y cumplimiento corporativo.",
        procedure: "1. Repositorio de Contratos. 2. Cargue el borrador. 3. Ejecute el flujo de aprobaciones. 4. Archive el documento final con sellado blockchain.",
        details: "Centralizamos la gestión de habilitaciones de CONATEL, registros mercantiles ante el SAREN y derechos de propiedad industrial en el SAPI. El sistema emite alertas automáticas 30 días antes del vencimiento de cualquier poder o permiso legal."
    },
    {
        id: "ia-ingenieria",
        title: "7. Ingeniería e Inteligencia Artificial",
        icon: Cpu,
        description: "Soluciones de visión artificial y planificación de infraestructura.",
        procedure: "1. Ingrese a Ingeniería IA. 2. Suba fotos del local comercial. 3. Genere el plano arquitectónico por fotogrametría. 4. Calcule el presupuesto de materiales automático.",
        details: "Nuestra IA de ingeniería utiliza redes neuronales convolucionales para estimar áreas y volúmenes con una precisión del 98%. Esto reduce en un 70% el tiempo de planificación de nuevas sucursales o remodelaciones corporativas."
    },
    {
        id: "reciclaje",
        title: "8. Sostenibilidad y Eco-Créditos",
        icon: Recycle,
        description: "Monetización de residuos mediante tecnología magnética.",
        procedure: "1. Deposite envases en el Smart Bin. 2. Los sensores de inducción validarán el material. 3. Escanee su ID Digital. 4. Reciba sus puntos en la billetera de Eco-Créditos.",
        details: "Impulsado por la Fundación Kyron, este módulo transforma la responsabilidad ambiental en activos digitales. Las empresas pueden canjear Eco-Créditos por beneficios fiscales o utilizarlos como parte de su programa de beneficios para empleados."
    },
    {
        id: "marketing",
        title: "9. Inteligencia de Negocio (BI)",
        icon: Sparkles,
        description: "Análisis competitivo y estrategias de crecimiento basadas en datos.",
        procedure: "1. Ejecute el Análisis de Mercado. 2. Cargue datos de competencia. 3. Genere estrategias de venta con IA. 4. Implemente el programa de fidelización.",
        details: "El motor de BI de Kyron analiza patrones de consumo y demografía local para sugerir ajustes de precios y lanzamientos de productos. Utiliza procesamiento de lenguaje natural (NLP) para medir el sentimiento de los clientes en redes sociales."
    },
    {
        id: "seguridad",
        title: "10. Ciberseguridad y Nodo Estratégico",
        icon: Lock,
        description: "Protección de la infraestructura y gestión de niveles de acceso.",
        procedure: "1. Configure el cortafuegos del nodo. 2. Asigne niveles de seguridad a los usuarios. 3. Realice auditorías de logs de acceso. 4. Ejecute el protocolo de respaldo externo.",
        details: "Todo el tráfico de red está encapsulado en túneles VPN con cifrado de grado militar. Implementamos detección de intrusiones mediante IA que bloquea ataques de fuerza bruta y denegación de servicio (DDoS) en el borde de la red."
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const handleDownload = () => {
        const content = `
            <div style="text-align: center; margin-bottom: 40pt;">
                <h1 style="color: #0ea5e9; font-size: 28pt; font-family: 'Arial Black', sans-serif; margin-bottom: 5pt;">SYSTEM KYRON</h1>
                <p style="color: #64748b; font-size: 12pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">Expediente Técnico Maestro v2.6.5</p>
                <p style="color: #94a3b8; font-size: 9pt; margin-top: 20pt;">© 2026 • DOCUMENTO DE GRADO CORPORATIVO • CONFIDENCIAL</p>
            </div>

            <h2 style="color: #0ea5e9; border-left: 10pt solid #0ea5e9; padding-left: 10pt;">1. INTRODUCCIÓN AL ECOSISTEMA</h2>
            <p style="text-align: justify; line-height: 1.6;">${introSection.text}</p>
            <p style="background-color: #f1f5f9; padding: 10pt; border-radius: 5pt; font-style: italic;">Misión: ${introSection.mission}</p>

            <h2 style="color: #0ea5e9; margin-top: 30pt; border-left: 10pt solid #0ea5e9; padding-left: 10pt;">2. GUÍA DE INICIO RÁPIDO (QUICK START)</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10pt;">
                <tr style="background-color: #0ea5e9; color: white;">
                    <th style="padding: 10pt; text-align: left;">PASO</th>
                    <th style="padding: 10pt; text-align: left;">ACCIÓN ESTRATÉGICA</th>
                </tr>
                <tr><td style="padding: 10pt; border-bottom: 1pt solid #eee;">01</td><td style="padding: 10pt; border-bottom: 1pt solid #eee;"><strong>Configuración de Nodo</strong>: Registro de credenciales maestras y validación biométrica.</td></tr>
                <tr><td style="padding: 10pt; border-bottom: 1pt solid #eee;">02</td><td style="padding: 10pt; border-bottom: 1pt solid #eee;"><strong>Sincronización</strong>: Carga de índices INPC y parámetros legales actualizados.</td></tr>
                <tr><td style="padding: 10pt; border-bottom: 1pt solid #eee;">03</td><td style="padding: 10pt; border-bottom: 1pt solid #eee;"><strong>Habilitación Modular</strong>: Activación de servicios Telecom, Fiscal y RRHH.</td></tr>
                <tr><td style="padding: 10pt; border-bottom: 1pt solid #eee;">04</td><td style="padding: 10pt; border-bottom: 1pt solid #eee;"><strong>Inyección de Datos</strong>: Importación masiva de activos y base de clientes.</td></tr>
            </table>

            ${manualModules.map(mod => `
                <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 10pt;">MÓDULO: ${mod.title.toUpperCase()}</h2>
                <p style="font-weight: bold; color: #1e293b;">Descripción General:</p>
                <p style="text-align: justify;">${mod.description}</p>
                <div style="background-color: #f8fafc; padding: 10pt; border: 1pt solid #e2e8f0; margin: 10pt 0;">
                    <p style="font-weight: bold; margin-bottom: 5pt; color: #0ea5e9;">PROTOCOLO PASO A PASO:</p>
                    <p>${mod.procedure}</p>
                </div>
                <p style="font-weight: bold; color: #1e293b;">Detalles Técnicos:</p>
                <p style="text-align: justify; font-size: 10pt; color: #475569;">${mod.details}</p>
            `).join('')}

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 10pt;">ANEXO: REQUISITOS TÉCNICOS</h2>
            <table style="width: 100%; border-collapse: collapse;">
                ${technicalRequirements.items.map(i => `
                    <tr>
                        <td style="padding: 8pt; border: 1pt solid #ddd; background: #f8fafc; font-weight: bold; width: 30%;">${i.label}</td>
                        <td style="padding: 8pt; border: 1pt solid #ddd;">${i.desc}</td>
                    </tr>
                `).join('')}
            </table>

            <h2 style="color: #0ea5e9; margin-top: 40pt; border-left: 10pt solid #0ea5e9; padding-left: 10pt;">ANEXO: GLOSARIO DE TÉRMINOS</h2>
            <table style="width: 100%; border-collapse: collapse;">
                ${glossaryTerms.map(g => `
                    <tr>
                        <td style="padding: 8pt; border-bottom: 1pt solid #eee; font-weight: bold; color: #0ea5e9; width: 25%;">${g.term}</td>
                        <td style="padding: 8pt; border-bottom: 1pt solid #eee; font-size: 10pt;">${g.def}</td>
                    </tr>
                `).join('')}
            </table>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + docContent + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPORTACIÓN COMPLETA",
            description: "El manual técnico exhaustivo se ha descargado correctamente.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* Header Flotante HUD */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                    <Download className="mr-2 h-3 w-3" /> EXPORTAR EXPEDIENTE (.DOC)
                </Button>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Navegación Lateral */}
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Índice Operativo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1">
                                <button onClick={() => scrollToSection("introduccion")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">1.0 Introducción</button>
                                <button onClick={() => scrollToSection("inicio-rapido")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">2.0 Inicio Rápido</button>
                                {manualModules.map((mod) => (
                                    <button key={mod.id} onClick={() => scrollToSection(mod.id)} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Nodo: {mod.id.toUpperCase()}</button>
                                ))}
                                <button onClick={() => scrollToSection("requisitos")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Anexo: Requisitos</button>
                                <button onClick={() => scrollToSection("glosario")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Anexo: Glosario</button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-16 md:space-y-24">
                        <section id="introduccion" className="space-y-6 scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <Sparkles className="h-3 w-3" /> NODO 0.0
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">{introSection.title}</h2>
                            <p className="text-lg text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8 italic">{introSection.text}</p>
                        </section>

                        <section id="inicio-rapido" className="space-y-10 scroll-mt-24">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">2.0 Inicio Rápido</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { step: "01", title: "Configuración de Nodo", desc: "Ingrese sus credenciales maestras y valide su identidad biométrica inicial.", icon: Terminal },
                                    { step: "02", title: "Sincronización de Base", desc: "El sistema cargará automáticamente los últimos índices INPC y parámetros de ley.", icon: RefreshCw },
                                    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Fiscal, RRHH) desde el selector modular.", icon: Zap },
                                    { step: "04", title: "Inyección de Datos", desc: "Suba su base de clientes y productos mediante el motor de importación masiva.", icon: Database }
                                ].map((item, i) => (
                                    <Card key={i} className="glass-card p-8 bg-white/[0.02] border-white/5 rounded-[2rem] group hover:border-primary/20 transition-all shadow-xl">
                                        <div className="text-4xl font-black text-primary/20 mb-4 group-hover:text-primary/60 transition-colors italic">{item.step}</div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <item.icon className="h-4 w-4 text-primary" />
                                            <h4 className="font-black uppercase text-sm tracking-widest text-white italic">{item.title}</h4>
                                        </div>
                                        <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {manualModules.map((mod) => (
                            <section key={mod.id} id={mod.id} className="space-y-10 scroll-mt-24">
                                <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-10 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-white/[0.01]">
                                        <div className="p-6 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow"><mod.icon className="h-10 w-10 text-primary" /></div>
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 space-y-12">
                                        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner relative group">
                                            <div className="absolute top-4 right-6 opacity-20"><Activity className="h-4 w-4 text-primary" /></div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-2">Protocolo de Operación</h4>
                                            <p className="text-sm font-bold italic text-white/80 leading-relaxed text-justify">{mod.procedure}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic border-l-2 border-primary/40 pl-4">Análisis de Ingeniería</h4>
                                            <p className="text-base font-medium text-white/60 leading-relaxed italic text-justify">{mod.details}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>
                        ))}

                        <section id="requisitos" className="space-y-10 scroll-mt-24">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Anexo: Requisitos Técnicos</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {technicalRequirements.items.map((req, i) => (
                                    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/10 transition-all">
                                        <h4 className="font-black uppercase text-[10px] tracking-widest text-primary mb-3 italic">{req.label}</h4>
                                        <p className="text-xs font-medium text-white/40 leading-relaxed">{req.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="glosario" className="space-y-10 scroll-mt-24 pb-20">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Anexo: Glosario Maestro</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid gap-4">
                                {glossaryTerms.map((g, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all group">
                                        <h4 className="font-black uppercase text-xs tracking-widest text-primary italic mb-2 group-hover:translate-x-2 transition-transform">{g.term}</h4>
                                        <p className="text-xs font-medium text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">{g.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            
            <footer className="py-16 border-t border-white/5 bg-black/80 text-center relative z-20 backdrop-blur-3xl">
                <p className="text-[9px] font-black uppercase tracking-[1em] text-white/10 italic">SYSTEM KYRON • MASTER USER MANUAL • 2026</p>
            </footer>
        </div>
    );
}
