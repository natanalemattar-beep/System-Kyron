
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
    Activity,
    Home,
    Sparkles,
    Server,
    Database,
    Zap,
    CheckCircle,
    ChevronRight,
    Lock,
    Scale
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * Contiene la documentación técnica exhaustiva de los 10 módulos operativos.
 * Optimizado para lectura HUD y exportación profesional a Microsoft Word.
 */

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Protocolos de Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares de seguridad militar AES-512.",
        content: [
            {
                sub: "Arquitectura de Validación Biométrica 3D y Prueba de Vida",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento despliega un motor de visión artificial que ejecuta un escaneo facial tridimensional exhaustivo, mapeando más de 128 puntos vectoriales únicos. El sistema exige una validación de 'Prueba de Vida' activa, detectando micro-movimientos involuntarios y reflejos pupilares para garantizar la imposibilidad técnica de suplantación mediante deepfakes o pantallas de alta resolución. Cumple rigurosamente con los estándares internacionales de firmas electrónicas avanzadas."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles",
                text: "Los documentos maestros (Cédulas, RIF, Pasaportes) se someten a un proceso de fragmentación y cifrado distribuido AES-512. La arquitectura asegura que los datos permanezcan inaccesibles para el nodo de red general hasta que el titular inicie una secuencia de autenticación exitosa. Cada archivo cuenta con un sellado de tiempo (Timestamping) basado en el protocolo RFC 3161, permitiendo la portabilidad legal completa verificable mediante códigos QR dinámicos, eliminando la vulnerabilidad de los documentos físicos."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y Aprovisionamiento eSIM",
        icon: Radio,
        description: "Administración de redes de ultra-baja latencia y aprovisionamiento digital remoto bajo estándar GSMA.",
        content: [
            {
                sub: "Protocolo de Aprovisionamiento Dinámico de eSIM (GSMA SM-DP+)",
                text: "Kyron integra un servidor de aprovisionamiento remoto certificado que permite la generación instantánea de perfiles eSIM. Tras la validación biométrica, el sistema empaqueta las credenciales de red y las inyecta en el dispositivo del usuario. Esto permite la activación de líneas 5G en milisegundos, facilitando la gestión remota de flotas corporativas sin intervención física sobre el hardware, garantizando seguridad mediante el protocolo de enlace EAP-AKA."
            },
            {
                sub: "Arquitectura de Red Core 5G y Troncalización SIP",
                text: "La infraestructura opera con una latencia de extremo a extremo inferior a 10ms, esencial para la sincronización de bases de datos financieras en tiempo real. El sistema gestiona troncales SIP para voz sobre IP de alta definición, permitiendo despliegues de centrales virtuales con enrutamiento inteligente y grabación encriptada, todo encapsulado en túneles VPN con cifrado IPsec."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inteligencia de Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa y validación síncrona de RIF corporativo.",
        content: [
            {
                sub: "Motores de Validación Fiscal Síncrona",
                text: "Al ingresar el RIF de un cliente, el motor de inteligencia fiscal valida instantáneamente la Razón Social y condición de contribuyente ante los registros oficiales. Esto garantiza que el 100% de las facturas cumplan con la Providencia Administrativa SNAT/2011/0071 del SENIAT. El sistema automatiza el cálculo del IGTF según el método de pago detectado y mantiene la integridad inalterable del libro de ventas."
            },
            {
                sub: "Gestión de Inventario y Kardex de Precisión",
                text: "El control de existencias opera bajo una arquitectura de Kardex perpetuo. Cada SKU cuenta con trazabilidad absoluta, permitiendo métodos de valoración promedio ponderado o FIFO. La interfaz gestiona depósitos múltiples y sucursales distribuidas, donde cada transferencia es validada mediante protocolos de escaneo QR y firmas digitales, alertando sobre discrepancias mediante analítica predictiva."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Protocolos de Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa ininterrumpida basada en IA.",
        content: [
            {
                sub: "Motor de Auditoría Preventiva 24/7",
                text: "System Kyron neutraliza vulnerabilidades mediante un motor de auditoría preventiva que cruza ingresos declarados con movimientos bancarios. Genera automáticamente los Libros de Compras y Ventas, exportando archivos XML/TXT listos para el portal fiscal nacional. Nuestra IA ejecuta 'Pruebas de Coherencia' para detectar inconsistencias antes de que ocurra cualquier fiscalización oficial."
            },
            {
                sub: "Automatización del Reajuste por Inflación Fiscal (RIPF)",
                text: "El sistema carga diariamente los índices INPC del Banco Central de Venezuela. Identifica automáticamente partidas no monetarias y aplica factores de corrección actuariales, generando asientos contables de ajuste impecables. Este módulo protege el patrimonio de la organización contra la erosión inflacionaria y proporciona un sustento técnico inatacable ante inspecciones."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y Análisis de Factibilidad",
        icon: TrendingUp,
        description: "Dashboard de mando ejecutivo para toma de decisiones basadas en analítica predictiva y modelado financiero.",
        content: [
            {
                sub: "Modelado de Inversiones y Análisis de Sensibilidad",
                text: "Dota a la directiva de herramientas para calcular VAN y TIR en tiempo real. El simulador permite crear escenarios optimistas y pesimistas alterando variables de mercado, proporcionando una base científica para planes de expansión. Cada proyección se basa en datos históricos consolidados en el Ledger del sistema."
            },
            {
                sub: "Conciliación Bancaria Inteligente Multimoneda",
                text: "Gestiona tesorería en VES, USD y EUR bajo tasas oficiales. El protocolo de conciliación utiliza algoritmos de coincidencia de patrones para vincular transferencias y Pago Móvil con facturas de origen, detectando duplicidades y asegurando que la disponibilidad de fondos en el dashboard sea un espejo exacto de la realidad bancaria."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento Humano y Nómina LOTTT",
        icon: Briefcase,
        description: "Administración integral del capital humano con cumplimiento estricto de la legislación laboral vigente.",
        content: [
            {
                sub: "Motor de Cálculo de Nómina Automatizado",
                text: "Integra la lógica jurídica de la LOTTT para automatizar salarios integrales, bonos y prestaciones sociales. Genera recibos digitales con validez legal y resguarda el historial remunerativo de forma inmutable. El manual detalla la configuración de conceptos salariales y la gestión de depósitos de garantía de antigüedad."
            },
            {
                sub: "Gestión de Solvencias y Libros Laborales",
                text: "Actualiza automáticamente los libros de vacaciones, horas extras y personal retirado. Gestiona retenciones para IVSS, FAOV e INCES, generando archivos de carga masiva para portales institucionales (TIUNA), asegurando que la empresa mantenga sus solvencias al día para contratar con el Estado."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico Corporativo",
        icon: Gavel,
        description: "Control centralizado de expedientes, contratos inteligentes y vigilancia de poderes de representación.",
        content: [
            {
                sub: "Gestión de Ciclo de Vida de Contratos (CLM)",
                text: "Centraliza la redacción y revisión de instrumentos legales mediante un repositorio de plantillas visadas. El Ledger registra cada versión del documento, garantizando que solo la última versión firmada biométricamente sea la vinculante, eliminando el riesgo de manipulación de acuerdos críticos."
            },
            {
                sub: "Vigilancia de Vencimientos de Activos Legales",
                text: "Genera alertas proactivas antes del vencimiento de poderes, registros de marcas ante el SAPI o habilitaciones de CONATEL. Este sistema de alerta temprana permite coordinar renovaciones ante registros y notarías sin interrumpir la operatividad o comprometer la representación jurídica de la empresa."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería, Arquitectura y Planificación IA",
        icon: Cpu,
        description: "Herramientas de planimetría automatizada y cómputos métricos integrados con visión artificial.",
        content: [
            {
                sub: "Fotogrametría y Generación de Planos Vectoriales",
                text: "Permite digitalizar espacios físicos mediante el procesamiento de imágenes de alta resolución. La IA identifica geometrías y muros, escalando el espacio automáticamente al detectar una cota de referencia. Facilita el levantamiento técnico de infraestructuras para remodelaciones o expansión de sucursales."
            },
            {
                sub: "Cómputos Métricos y Análisis de Precios Unitarios (APU)",
                text: "Vincula los planos generados con cálculos autónomos de materiales y mano de obra. Genera presupuestos dinámicos que validan costos proyectados contra el mercado de proveedores registrados, manteniendo un control financiero riguroso sobre cada fase de la obra civil o tecnológica."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Economía Circular Magnética",
        icon: Recycle,
        description: "Operatividad de infraestructura verde y monetización de residuos mediante tecnología de inducción.",
        content: [
            {
                sub: "Sensores de Inducción Magnética en Smart Bins",
                text: "Implementa estaciones de reciclaje inteligentes con sensores que detectan la firma electromagnética de los materiales. Clasifica automáticamente metales ferrosos de plásticos PET, optimizando la cadena de suministro verde desde el origen y garantizando trazabilidad absoluta en el Blockchain."
            },
            {
                sub: "Monetización de Impacto: Eco-Créditos",
                text: "Cada acción ambiental verificada se traduce en activos digitales (Eco-Créditos) transferidos a la billetera del usuario. Para las organizaciones, genera reportes ESG de alta fidelidad, certificando la reducción real de la huella de carbono mediante datos inalterables respaldados por el Ledger institucional."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y Protección LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles integrales y cumplimiento de obligaciones familiares bajo el marco legal de la LOPNNA.",
        content: [
            {
                sub: "Bóveda Civil y Salud Inteligente",
                text: "Centraliza copias certificadas de documentos vitales e integra una red de salud donde el historial médico es portátil y seguro. La Identidad Digital garantiza que solo el ciudadano tenga control sobre su información sensible, facilitando trámites ante organismos públicos y privados."
            },
            {
                sub: "Calculadora de Manutención y Registro RIF Menores",
                text: "Simplifica el cumplimiento de responsabilidades familiares mediante una calculadora técnica basada en unidades tributarias e ingresos documentados. El asistente de RIF para menores automatiza el llenado de formularios oficiales, asegurando el resguardo de derechos fiscales y sucesorios de forma inmediata."
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

    const handleDownload = () => {
        let docContent = "";
        
        docContent += `
            <div style="padding: 10pt; border-bottom: 2pt solid #2563eb; margin-bottom: 20pt;">
                <table style="width: 100%; border: none;">
                    <tr>
                        <td style="width: 50pt; border: none;">
                            <div style="background-color: #2563eb; color: white; width: 45pt; height: 45pt; text-align: center; line-height: 45pt; font-weight: bold; font-size: 20pt; border-radius: 6pt;">K</div>
                        </td>
                        <td style="border: none; vertical-align: middle;">
                            <h1 style="color: #2563eb; margin: 0; font-size: 22pt; font-family: 'Arial Black', sans-serif;">SYSTEM KYRON</h1>
                            <p style="color: #666; margin: 0; font-size: 8pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5pt;">Manual de Operaciones Maestro v2.6.5</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 20pt; border-left: 8pt solid #2563eb; padding-left: 15pt;">
                <h2 style="color: #1e293b; font-size: 18pt; margin: 0; font-family: 'Arial', sans-serif;">DOCUMENTACIÓN TÉCNICA INTEGRAL</h2>
                <p style="font-style: italic; color: #475569; margin-top: 5pt; font-size: 10pt;">Consolidado operativo de misión crítica.</p>
            </div>
        `;

        manualModules.forEach(mod => {
            docContent += `
                <div style="margin-top: 15pt; margin-bottom: 15pt;">
                    <h2 style="color: #2563eb; text-transform: uppercase; border-bottom: 1pt solid #eee; padding-bottom: 5pt; margin-bottom: 10pt; font-size: 16pt; font-family: 'Arial', sans-serif;">${mod.title}</h2>
                    <p style="font-weight: bold; color: #475569; margin-bottom: 10pt; font-size: 9pt; text-transform: uppercase; font-family: 'Arial', sans-serif;">${mod.description}</p>
            `;
            
            mod.content.forEach(item => {
                docContent += `
                    <div style="margin-bottom: 15pt; padding: 10pt; background-color: #f8fafc; border-radius: 8pt;">
                        <h3 style="color: #1e293b; font-size: 12pt; margin-bottom: 8pt; border-left: 3pt solid #2563eb; padding-left: 10pt; font-family: 'Arial', sans-serif;">${item.sub}</h3>
                        <p style="text-align: justify; line-height: 1.6; font-size: 10pt; color: #334155; font-family: 'Times New Roman', serif;">${item.text}</p>
                    </div>
                `;
            });
            
            docContent += `</div>`;
        });

        const footer = `
            <div style="margin-top: 40pt; border-top: 1pt solid #eee; padding-top: 15pt; text-align: center; font-size: 7pt; color: #94a3b8; font-family: 'Arial', sans-serif;">
                <p>PROPIEDAD INTELECTUAL DE SYSTEM KYRON, C.A. • DOCUMENTO DE GRADO CORPORATIVO • ID: SK-OPER-2.6.5</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual de Usuario System Kyron</title></head><body style='padding: 20pt;'>";
        const finalSource = headerHtml + docContent + footer + "</body></html>";

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(finalSource);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = source;
        link.download = "Manual_Usuario_System_Kyron_v2.6.5.doc";
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA MAESTRA INICIADA",
            description: "El expediente técnico exhaustivo se está exportando a Word.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-full h-[1200px] bg-primary/5 rounded-full blur-[200px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[180px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Header Fijo */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <Logo className="h-8 w-8 shadow-glow" />
                    </Link>
                    <div className="flex flex-col border-l border-white/10 pl-4 ml-1">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild className="rounded-xl h-9 px-4 text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
                        <Link href="/"><Home className="mr-2 h-3 w-3" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> EXPORTAR WORD (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Navegación Lateral (HUD Table of Contents) */}
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-24 space-y-6">
                            <Card className="glass-card p-6 rounded-[2rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                                <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                    <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                        <Activity className="h-3.5 w-3.5" /> Protocolos Maestros
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-0.5">
                                    {manualModules.map((mod) => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => scrollToSection(mod.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all text-left group",
                                                activeTab === mod.id ? "bg-primary/10 text-primary border border-primary/20 shadow-glow" : "text-white/30 hover:text-white/60 hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-1 w-1 rounded-full transition-all shadow-glow",
                                                activeTab === mod.id ? "bg-primary" : "bg-white/10 group-hover:bg-white/30"
                                            )} />
                                            <span>{mod.title.split('. ')[1]}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-primary/5 border-primary/20 p-5 rounded-[1.5rem]">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/80 leading-none">Inteligencia de Soporte</p>
                                        <p className="text-[8px] font-bold text-white/30 leading-relaxed uppercase">Asistencia técnica sobre protocolos de red o cifrado activa.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-12 md:space-y-16">
                        <motion.section 
                            className="space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <ShieldCheck className="h-3 w-3" /> MASTER USER GUIDE v2.6.5
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
                                Manual de Usuario de System Kyron
                            </h1>
                            <p className="text-base text-white/40 max-w-xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-8 leading-relaxed">
                                Documentación técnica exhaustiva para la operatividad del ecosistema integral de gestión administrativa, fiscal y telecomunicaciones.
                            </p>
                        </motion.section>

                        {manualModules.map((mod, index) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id} 
                                className="scroll-mt-24"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-white/[0.01]">
                                        <div className="relative">
                                            <div className="p-6 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform relative z-10">
                                                <mod.icon className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="absolute -top-3 -right-3 z-20">
                                                <Logo className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 md:p-10 space-y-12">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-6 group/item">
                                                <div className="flex items-center gap-6">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic whitespace-nowrap">{item.sub}</h4>
                                                    <div className="h-[1px] flex-1 bg-white/5 group-hover/item:bg-primary/20 transition-colors" />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-6 top-0 bottom-0 w-[1.5px] bg-primary/10 group-hover/item:bg-primary/40 transition-colors rounded-full" />
                                                    <p className="text-base font-medium text-white/60 leading-relaxed text-justify italic">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-6 border-t border-white/5 flex justify-center bg-white/[0.01] gap-6">
                                        <div className="flex items-center gap-2">
                                            <Server className="h-3 w-3 text-white/20" />
                                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20">Operational Status: Optimal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Database className="h-3 w-3 text-white/20" />
                                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20">Data Integrity: Verified</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="py-16 border-t border-white/5 bg-black/80 text-center relative z-20">
                <div className="mb-6 opacity-20 hover:opacity-50 transition-opacity">
                    <Logo className="h-10 w-10 mx-auto" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                    SYSTEM KYRON • MASTER USER MANUAL • MK-2.6.5 • 2026
                </p>
            </footer>
        </div>
    );
}
