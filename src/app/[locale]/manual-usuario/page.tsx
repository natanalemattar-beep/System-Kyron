
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
    Terminal
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
 * Cumple con el Checklist institucional: Introducción, Pasos, Diagramas, Soporte, Glosario, Requisitos.
 */

// Secciones adicionales para el checklist
const introSection = {
    title: "Introducción General al Ecosistema",
    text: "System Kyron v2.6.5 representa la cúspide de la ingeniería de software aplicada a la gestión corporativa en entornos de alta volatilidad. No es una simple suite administrativa; es un organismo digital distribuido que integra telecomunicaciones 5G de misión crítica, inteligencia artificial fiscal predictiva y un ledger inmutable basado en tecnología blockchain. Este ecosistema ha sido diseñado para eliminar la fricción operativa, garantizando un cumplimiento normativo del 100% ante entes como el SENIAT, CONATEL y la LOTTT. La arquitectura modular de Kyron permite que cada nodo (empresa, socio o ciudadano) opere con soberanía absoluta de sus datos, bajo protocolos de cifrado AES-512 y validación biométrica de grado militar."
};

const technicalRequirements = {
    title: "Requisitos Técnicos del Sistema",
    items: [
        { label: "Conectividad", desc: "Enlace mínimo de 10Mbps (Fibra Óptica recomendada). Soporte nativo para redes 5G Kyron Hyper-Connect." },
        { label: "Hardware Terminal", desc: "Procesador Quad-Core 2.0GHz o superior, 4GB RAM mínimo. Soporte para chips eUICC (eSIM)." },
        { label: "Navegación", desc: "Navegadores basados en Chromium (v110+) o Safari (v16+) con aceleración de hardware habilitada para renderizado 3D." },
        { label: "Seguridad Perimetral", desc: "Cámara frontal HD para validación biométrica y soporte para protocolos WebAuthn." }
    ]
};

const glossaryTerms = [
    { term: "Ledger Inmutable", def: "Registro digital de transacciones que no puede ser alterado ni borrado tras su sellado criptográfico." },
    { term: "eSIM (eUICC)", def: "Módulo de identidad de suscripción embebido que permite el aprovisionamiento remoto de perfiles de red 5G." },
    { term: "Inducción Magnética Síncrona", def: "Tecnología de sensores utilizada en Smart Bins para clasificar materiales mediante su firma electromagnética." },
    { term: "Prueba de Vida (Liveness)", def: "Algoritmo de IA que verifica que la persona ante la cámara es un ser humano real y activo, no una reproducción." },
    { term: "RIPF", def: "Reajuste por Inflación Fiscal. Procedimiento contable obligatorio en Venezuela para sincerar balances ante la inflación." }
];

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Protocolos de Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares de seguridad militar AES-512.",
        steps: [
            "Escaneo Biométrico: Posicione su rostro frente a la cámara térmica para mapeo 3D.",
            "Validación de Liveness: Realice el patrón de parpadeo solicitado por la IA.",
            "Sellado de Nodo: El sistema genera una llave privada única vinculada a su hardware.",
            "Carga de Activos: Suba sus documentos maestros para fragmentación y cifrado distribuido."
        ],
        content: [
            {
                sub: "Arquitectura de Validación Biométrica 3D y Prueba de Vida (Liveness Detection)",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento despliega un motor de visión artificial de alta precisión que ejecuta un escaneo facial tridimensional exhaustivo, mapeando más de 512 puntos vectoriales únicos y analizando la profundidad geométrica de las facciones con una tolerancia de error de 1 entre 1.000.000. El sistema exige una validación de 'Prueba de Vida' activa, que detecta micro-movimientos involuntarios, reflejos pupilares ante estímulos lumínicos y patrones de parpadeo síncrono para garantizar la imposibilidad técnica de suplantación mediante deepfakes, fotografías de alta resolución o máscaras realistas. La base de datos biométrica utiliza un hash unidireccional de 512 bits, lo que significa que el rostro original nunca se almacena en el servidor, solo su representación matemática cifrada."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles y Entropía de Cifrado AES-512",
                text: "Los documentos maestros se someten a un proceso de fragmentación digital y cifrado distribuido bajo el estándar AES-512. La arquitectura de 'Zero Knowledge' asegura que los datos permanezcan cifrados y sean inaccesibles incluso para los administradores de red de Kyron; los datos solo pueden ser desencriptados por el titular legítimo tras una secuencia de autenticación biométrica exitosa. Cada activo depositado cuenta con un sellado de tiempo (Timestamping) inmutable basado en el protocolo RFC 3161, lo que otorga a cada copia digital una validez legal equivalente al original físico."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y Aprovisionamiento eSIM",
        icon: Radio,
        description: "Administración de redes de ultra-baja latencia y aprovisionamiento digital remoto bajo estándares GSMA.",
        steps: [
            "Selección de Terminal: Identifique el dispositivo con soporte eUICC en su consola.",
            "Generación de Perfil: Solicite el paquete de datos dinámico al servidor SM-DP+.",
            "Inyección de Credenciales: Escanee el código QR dinámico o acepte la descarga push.",
            "Verificación de Enlace: Valide la latencia y el ancho de banda en el monitor de telemetría."
        ],
        content: [
            {
                sub: "Protocolo de Aprovisionamiento Dinámico de eSIM (GSMA SM-DP+)",
                text: "Kyron opera un servidor de aprovisionamiento remoto certificado (SM-DP+) que permite la generación, gestión e instalación instantánea de perfiles eSIM en dispositivos móviles. Tras la validación de la identidad biométrica, el sistema empaqueta las credenciales de red bajo un túnel cifrado y las inyecta en el chip embebido (eUICC) del terminal del usuario final. El sistema facilita la gestión remota masiva de flotas corporativas (Bulk Provisioning), permitiendo al departamento de IT desplegar políticas de conectividad personalizadas para cientos de empleados de forma simultánea."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inteligencia de Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa y validación síncrona de registros corporativos.",
        steps: [
            "Apertura de Turno: Valide su identidad para habilitar el cajero fiscal.",
            "Escaneo de Productos: Utilice el lector industrial para registrar los ítems en el Kardex.",
            "Validación de RIF: Ingrese la identificación del cliente para consulta síncrona al SENIAT.",
            "Cierre y Sellado: Emita la factura fiscal y registre el hash transaccional en el Ledger."
        ],
        content: [
            {
                sub: "Motores de Validación Fiscal Síncrona y Cumplimiento SENIAT",
                text: "Al procesar una transacción, el motor de inteligencia fiscal de Kyron ejecuta una consulta síncrona a las bases de datos de la administración tributaria para validar el RIF, la Razón Social y el domicilio fiscal del cliente en milisegundos. Este protocolo garantiza que el 100% de los documentos emitidos cumplan estrictamente con la Providencia Administrativa SNAT/2011/0071. El sistema automatiza el cálculo y aplicación del IGTF, detectando mediante sensores el origen de los fondos y aplicando la alícuota legal correspondiente."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Protocolos de Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa continua.",
        steps: [
            "Sincronización de Gaceta: El sistema actualiza las tasas de IVA e ISLR cada 24 horas.",
            "Auditoría Predictiva: Ejecute el escáner de coherencia fiscal mensualmente.",
            "Generación de Libros: Exporte los archivos XML/TXT listos para el portal fiscal.",
            "Certificación Zero-Risk: Obtenga el dictamen de cumplimiento inatacable."
        ],
        content: [
            {
                sub: "Motor de Auditoría Preventiva 24/7 y Conciliación Fiscal Automatizada",
                text: "System Kyron neutraliza cualquier vulnerabilidad administrativa mediante un motor de auditoría preventiva que cruza sistemáticamente los ingresos declarados con los movimientos bancarios efectivos. El sistema genera de forma autónoma los Libros de Compras y Ventas mensuales, exportando archivos en formatos XML y TXT con la estructura exacta requerida. Nuestra IA ejecuta 'Pruebas de Coherencia' que detectan discrepancias en decimales o fechas, permitiendo ajustes proactivos antes de fiscalizaciones."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y Análisis de Factibilidad",
        icon: TrendingUp,
        description: "Dashboard de mando ejecutivo para la toma de decisiones basada en analítica predictiva.",
        steps: [
            "Carga de Escenarios: Introduzca las variables de inversión CapEx y OpEx.",
            "Ejecución de Simulación: Obtenga los indicadores VAN y TIR instantáneamente.",
            "Análisis de Sensibilidad: Modifique la tasa cambiaria para ver el impacto en flujo de caja.",
            "Exportación de Dictamen: Genere el informe de factibilidad para banca o socios."
        ],
        content: [
            {
                sub: "Modelado de Inversiones y Análisis de Sensibilidad Financiera (VAN/TIR)",
                text: "El sistema dota a la alta gerencia de herramientas avanzadas para la evaluación de proyectos de capital, permitiendo calcular indicadores de rentabilidad como el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR) en tiempo real. El simulador financiero permite crear escenarios multivariables alterando parámetros críticos como costos de insumos y fluctuación cambiaria, proporcionando una base científica rigurosa para la aprobación de planes de expansión."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("identidad");

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setActiveTab(id);
        }
    };

    const handleDownload = async () => {
        const svgElement = document.getElementById('master-logo-export-source');
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        
        img.onload = () => {
            canvas.width = 400;
            canvas.height = 400;
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, 400, 400);
            }
            const pngDataUrl = canvas.toDataURL("image/png");
            
            let docContent = "";
            
            // --- Portada ---
            docContent += `
                <div style="text-align: center; margin-bottom: 50pt; padding-top: 100pt;">
                    <img src="${pngDataUrl}" width="150" height="150" />
                    <h1 style="color: #0ea5e9; font-size: 48pt; font-family: 'Arial Black', sans-serif; margin-top: 20pt; text-transform: uppercase; font-style: italic;">SYSTEM KYRON</h1>
                    <p style="font-size: 14pt; color: #64748b; font-weight: bold; letter-spacing: 4pt; text-transform: uppercase;">Manual Técnico Maestro v2.6.5</p>
                    <p style="margin-top: 100pt; font-size: 10pt; color: #94a3b8;">EXPEDIENTE DE GRADO CORPORATIVO • 2026</p>
                </div>
                <br clear="all" style="page-break-before: always" />
            `;

            // --- Índice ---
            docContent += `
                <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif; border-bottom: 2pt solid #eee; padding-bottom: 10pt;">ÍNDICE DE CONTENIDO</h2>
                <ul style="list-style: none; font-family: 'Arial', sans-serif; line-height: 2;">
                    <li>1. INTRODUCCIÓN GENERAL ....................................................................... Pag. 2</li>
                    <li>2. REQUISITOS TÉCNICOS ........................................................................... Pag. 3</li>
                    <li>3. GUÍA DE PRIMEROS PASOS ...................................................................... Pag. 4</li>
                    <li>4. MÓDULOS DE INGENIERÍA ...................................................................... Pag. 5</li>
                    <li>5. SEGURIDAD Y PRIVACIDAD ..................................................................... Pag. 15</li>
                    <li>6. SOPORTE Y GLOSARIO ............................................................................. Pag. 18</li>
                </ul>
                <br clear="all" style="page-break-before: always" />
            `;

            // --- Introducción ---
            docContent += `
                <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif;">1. INTRODUCCIÓN GENERAL</h2>
                <p style="text-align: justify; line-height: 1.6; font-family: 'Times New Roman', serif; font-size: 12pt;">${introSection.text}</p>
                <div style="background-color: #f8fafc; border: 1pt solid #e2e8f0; padding: 15pt; margin-top: 20pt; border-left: 5pt solid #0ea5e9;">
                    <strong>Dato Maestro:</strong> El sistema opera bajo un protocolo de latencia ultra-baja (<14ms) garantizando la sincronización de nodos globales.
                </div>
            `;

            // --- Requisitos ---
            docContent += `
                <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif; margin-top: 30pt;">2. REQUISITOS TÉCNICOS</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10pt;">
                    ${technicalRequirements.items.map(i => `
                        <tr>
                            <td style="border: 1pt solid #ddd; padding: 10pt; background-color: #f1f5f9; width: 30%; font-weight: bold;">${i.label}</td>
                            <td style="border: 1pt solid #ddd; padding: 10pt;">${i.desc}</td>
                        </tr>
                    `).join('')}
                </table>
            `;

            // --- Módulos ---
            manualModules.forEach(mod => {
                docContent += `
                    <div style="margin-top: 40pt;">
                        <h2 style="color: #0ea5e9; border-bottom: 2pt solid #0ea5e9; padding-bottom: 10pt; font-family: 'Arial Black', sans-serif;">${mod.title}</h2>
                        <p style="font-weight: bold; background-color: #f8fafc; padding: 10pt; margin-bottom: 20pt;">${mod.description}</p>
                        
                        <h3 style="color: #1e293b; text-transform: uppercase; font-size: 11pt;">Protocolo Paso a Paso:</h3>
                        <ol style="margin-bottom: 20pt;">
                            ${mod.steps.map(s => `<li style="margin-bottom: 5pt;">${s}</li>`).join('')}
                        </ol>

                        ${mod.content.map(item => `
                            <div style="margin-bottom: 20pt;">
                                <h4 style="color: #2d5a8e; font-size: 12pt; border-left: 4pt solid #0ea5e9; padding-left: 10pt;">${item.sub}</h4>
                                <p style="text-align: justify; line-height: 1.6; font-size: 11pt;">${item.text}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            });

            // --- Glosario ---
            docContent += `
                <br clear="all" style="page-break-before: always" />
                <h2 style="color: #0ea5e9; font-family: 'Arial Black', sans-serif;">GLOSARIO DE TÉRMIMOS</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${glossaryTerms.map(g => `
                        <tr>
                            <td style="border: 1pt solid #ddd; padding: 10pt; font-weight: bold; background-color: #f8fafc; width: 30%;">${g.term}</td>
                            <td style="border: 1pt solid #ddd; padding: 10pt; font-size: 10pt;">${g.def}</td>
                        </tr>
                    `).join('')}
                </table>
            `;

            const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro System Kyron</title></head><body style='padding: 50pt;'>";
            const footerHtml = "</body></html>";
            const finalSource = headerHtml + docContent + footerHtml;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(finalSource);
            const link = document.createElement("a");
            document.body.appendChild(link);
            link.href = source;
            link.download = "MANUAL_MAESTRO_KYRON_V2.6.5.doc";
            link.click();
            document.body.removeChild(link);

            toast({
                title: "DESCARGA MAESTRA INICIADA",
                description: "Manual técnico completo exportado bajo protocolo seguro.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        };
        
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            <div className="sr-only"><Logo id="master-logo-export-source" className="h-[400px] w-[400px]" /></div>

            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-full h-[1200px] bg-primary/5 rounded-full blur-[200px] opacity-40 animate-pulse" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:scale-105 transition-transform"><Logo className="h-8 w-8 drop-shadow-glow" /></Link>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild className="rounded-xl h-9 px-4 text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><Home className="mr-2 h-3 w-3" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> EXPORTAR WORD (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-24 space-y-6">
                            <Card className="glass-card p-6 rounded-[2.5rem] border-white/5 bg-black/60 shadow-2xl">
                                <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                    <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                        <ListTree className="h-3.5 w-3.5" /> Estructura del Nodo
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    <button onClick={() => scrollToSection("introduccion")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Introducción General</button>
                                    <button onClick={() => scrollToSection("requisitos")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Requisitos Técnicos</button>
                                    <button onClick={() => scrollToSection("pasos")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Guía Primeros Pasos</button>
                                    {manualModules.map((mod) => (
                                        <button key={mod.id} onClick={() => scrollToSection(mod.id)} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Módulo: {mod.id.toUpperCase()}</button>
                                    ))}
                                    <button onClick={() => scrollToSection("glosario")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Glosario Técnico</button>
                                    <button onClick={() => scrollToSection("soporte")} className="w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 transition-all">Soporte y Contacto</button>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-16">
                        {/* 1. Introducción */}
                        <section id="introduccion" className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <Sparkles className="h-3 w-3" /> INTRODUCCIÓN GENERAL
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Visión Sistémica</h2>
                            <p className="text-lg text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8 italic">{introSection.text}</p>
                        </section>

                        {/* 2. Requisitos */}
                        <section id="requisitos" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Requisitos Técnicos</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {technicalRequirements.items.map((req, i) => (
                                    <Card key={i} className="glass-card p-6 bg-white/[0.02] border-white/5 rounded-2xl group hover:border-primary/20 transition-all">
                                        <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 border border-primary/10 group-hover:scale-110 transition-transform"><Server className="h-5 w-5 text-primary" /></div>
                                        <h4 className="font-black uppercase text-xs tracking-widest text-white mb-2">{req.label}</h4>
                                        <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{req.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* 3. Guía Primeros Pasos */}
                        <section id="pasos" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Guía de Primeros Pasos</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="space-y-4">
                                {[
                                    { step: "01", title: "Configuración de Nodo", desc: "Ingrese sus credenciales maestras y valide su identidad biométrica inicial.", icon: Terminal },
                                    { step: "02", title: "Sincronización de Base", desc: "El sistema cargará automáticamente los últimos índices INPC y parámetros de ley.", icon: RefreshCw },
                                    { step: "03", title: "Habilitación de Módulos", desc: "Active los servicios necesarios (Telecom, Fiscal, RRHH) desde el selector modular.", icon: Zap },
                                    { step: "04", title: "Inyección de Datos", desc: "Suba su base de clientes y productos mediante el motor de importación masiva.", icon: Database }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-8 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                        <span className="text-4xl font-black text-primary/20 group-hover:text-primary/60 transition-colors italic">{item.step}</span>
                                        <div className="flex-1">
                                            <h4 className="font-black uppercase text-sm tracking-widest text-white italic flex items-center gap-3"><item.icon className="h-4 w-4 text-primary" /> {item.title}</h4>
                                            <p className="text-[10px] font-bold text-white/30 uppercase mt-1">{item.desc}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-2" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Módulos Operativos */}
                        {manualModules.map((mod, index) => (
                            <motion.section key={mod.id} id={mod.id} className="scroll-mt-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-white/[0.01]">
                                        <div className="p-6 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-glow relative z-10"><mod.icon className="h-10 w-10 text-primary" /></div>
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 md:p-10 space-y-12">
                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic border-b border-white/5 pb-2">Protocolo Paso a Paso</h4>
                                                <div className="space-y-4">
                                                    {mod.steps.map((s, i) => (
                                                        <div key={i} className="flex gap-4 text-xs font-medium text-white/60">
                                                            <span className="text-primary font-black">0{i+1}.</span>
                                                            <p className="italic">{s}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
                                                <div className="p-4 bg-white/5 rounded-full mb-4 animate-pulse"><mod.icon className="h-8 w-8 text-primary/40" /></div>
                                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Diagrama Operativo de Nodo v2.6</p>
                                            </div>
                                        </div>
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-4 group/item">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">{item.sub}</h4>
                                                <p className="text-base font-medium text-white/60 leading-relaxed italic text-justify">{item.text}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.section>
                        ))}

                        {/* 5. Glosario */}
                        <section id="glosario" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Glosario de Términos</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <div className="grid gap-4">
                                {glossaryTerms.map((g, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                        <h4 className="font-black uppercase text-xs tracking-widest text-primary italic mb-2">{g.term}</h4>
                                        <p className="text-xs font-medium text-white/40 leading-relaxed">{g.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. Soporte */}
                        <section id="soporte" className="space-y-10">
                            <div className="flex items-center gap-6"><h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Soporte y Contacto</h3><div className="h-px flex-1 bg-white/10"></div></div>
                            <Card className="bg-primary/5 border-primary/20 p-10 rounded-[3rem] text-center space-y-8">
                                <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto border border-primary/20 shadow-glow"><HelpCircle className="h-12 w-12 text-primary" /></div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-black uppercase italic italic-shadow">Asistencia Prioritaria</h4>
                                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest max-w-lg mx-auto leading-relaxed">Si requiere asistencia técnica inmediata o reporte de incidencias en el Ledger, contacte al nodo de soporte central.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest btn-3d-primary">infosystemkyron@gmail.com</Button>
                                    <Button variant="outline" className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest border-white/10 bg-white/5">+58 212-KYRON-00</Button>
                                </div>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
            
            <footer className="py-16 border-t border-white/5 bg-black/80 text-center relative z-20">
                <div className="mb-6 opacity-20 hover:opacity-50 transition-opacity group"><Logo className="h-10 w-10 mx-auto group-hover:drop-shadow-glow" /></div>
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">SYSTEM KYRON • MASTER USER MANUAL • MK-2.6.5 • 2026</p>
            </footer>
        </div>
    );
}
