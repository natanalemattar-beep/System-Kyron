
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Fingerprint,
    Radio,
    TabletSmartphone,
    Calculator,
    Users,
    Gavel,
    CreditCard,
    Recycle,
    Cpu,
    BrainCircuit,
    Download,
    FileText,
    Search,
    ChevronRight,
    Terminal,
    ShieldCheck,
    Database,
    Activity,
    Printer,
    CheckCircle2,
    Lock,
    Zap,
    Scale,
    Shield,
    Smartphone,
    Globe,
    Info,
    ArrowDown,
    ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL - ECOSISTEMA KYRON v2.6.5
 * Documentación técnica de grado ministerial diseñada para el cumplimiento de misión crítica.
 * Este documento es de acceso público y permite la descarga en formatos oficiales.
 */

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Bóveda Civil",
        icon: Fingerprint,
        description: "Gestión soberana de la identidad ciudadana y activos legales digitalizados.",
        content: [
            {
                sub: "Protocolo de Validación Biométrica 3D",
                text: "El sistema emplea tecnología de reconocimiento facial avanzada para vincular la identidad física del usuario con un hash criptográfico inmutable. Este proceso garantiza que cada trámite posea una firma digital de alta fidelidad. El usuario debe posicionarse frente a la cámara, asegurar una iluminación uniforme y realizar el escaneo tridimensional para el sellado de su identidad en el Ledger distribuido."
            },
            {
                sub: "Gestión de Documentos Civiles",
                text: "La Institución permite la solicitud y resguardo de copias certificadas de Partidas de Nacimiento, Actas de Matrimonio y Defunción. La carga de datos requiere precisión absoluta en los campos de Tomo, Folio y Acta. Una vez verificado por el registrador ministerial, el documento se emite con un sello QR institucional verificable 24/7, eliminando la burocracia física."
            },
            {
                sub: "Cifrado de Datos de Grado Militar",
                text: "Toda la información personal y civil reside en una base de datos cifrada bajo el estándar internacional AES-512. El acceso a documentos sensibles está protegido por un protocolo de autenticación multifactor (MFA), asegurando que solo el titular o el representante legal facultado pueda consultar la información institucional."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes móviles, activación de líneas y servicios de conectividad global.",
        content: [
            {
                sub: "Aprovisionamiento Instantáneo de eSIM",
                text: "Mediante el nodo de telecomunicaciones, el sistema permite la descarga de perfiles de red virtuales. Tras la validación biométrica, se genera un código QR único que configura automáticamente los parámetros de red 5G en el dispositivo. Este protocolo asegura una latencia mínima y una encriptación de extremo a extremo en todas las transmisiones de voz y datos."
            },
            {
                sub: "Control de Flotas Corporativas",
                text: "El administrador del sistema puede supervisar en tiempo real el consumo de recursos de cada terminal vinculado. El panel de telemetría permite la asignación dinámica de cuotas de ancho de banda y la monitorización de la ubicación de los nodos móviles, garantizando la continuidad operativa en despliegues de campo."
            },
            {
                sub: "Monitoreo Regulatorio CONATEL",
                text: "Sincronización continua con el marco regulatorio. La plataforma emite alertas críticas sesenta (60) días antes del vencimiento de concesiones de espectro o habilitaciones postales, facilitando la renovación electrónica inmediata y evitando penalizaciones administrativas por mora."
            }
        ]
    },
    {
        id: "ventas",
        title: "3. Terminal de Punto de Venta (TPV) IA",
        icon: TabletSmartphone,
        description: "Procesamiento de transacciones comerciales con integración fiscal automatizada.",
        content: [
            {
                sub: "Validación Fiscal por RIF",
                text: "El operador del TPV solo requiere el ingreso del número de RIF o Cédula. El sistema sincroniza instantáneamente la Razón Social y Dirección Fiscal desde el nodo maestro, garantizando el cumplimiento estricto de la Providencia SNAT/2011/0071. Este protocolo elimina errores de transcripción y asegura la integridad de la base imponible."
            },
            {
                sub: "Arqueo de Caja Multimoneda",
                text: "Al cierre de la jornada, el sistema ejecuta un protocolo de arqueo que cruza los ingresos registrados (Bs, USD, EUR, Pago Móvil) con el conteo físico del operador. Cualquier discrepancia es registrada en el Libro de Sobrantes y Faltantes para su auditoría inmediata por el departamento de cumplimiento."
            },
            {
                sub: "Inteligencia de Inventario Sincronizada",
                text: "Cada venta confirmada actualiza el inventario global del holding en milisegundos. El motor de IA genera alertas de reabastecimiento crítico y detecta productos de baja rotación, sugiriendo ajustes estratégicos para optimizar el flujo de caja."
            }
        ]
    },
    {
        id: "facturacion",
        title: "4. Facturación, Crédito y BNPL",
        icon: CreditCard,
        description: "Control de documentos de venta y gestión de financiamiento comercial.",
        content: [
            {
                sub: "Emisión de Documentos Fiscales",
                text: "Generación automatizada de facturas, notas de débito y notas de crédito. Todos los documentos mantienen una correlatividad inalterable y cumplen con los requisitos de ley, incluyendo número de control y firma digital del emisor."
            },
            {
                sub: "Gestión de Financiamiento Cashea/Krece",
                text: "Integración con plataformas BNPL (Buy Now, Pay Later). El sistema valida el nivel de crédito del usuario, procesa el pago inicial y programa las cuotas restantes en el calendario de cobranza, enviando recordatorios automáticos al terminal del cliente para asegurar el retorno de inversión."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "5. Blindaje Fiscal SENIAT y Libros",
        icon: Calculator,
        description: "Automatización total de la carga impositiva y mantenimiento de registros oficiales.",
        content: [
            {
                sub: "Libros de Compra y Venta Digitales",
                text: "Mantenimiento diario de registros fiscales. El sistema genera automáticamente los archivos planos (.txt) requeridos para la carga masiva en el portal del SENIAT, garantizando una precisión matemática del 100% en el cálculo de débitos y créditos."
            },
            {
                sub: "Auditoría Predictiva de Riesgo 0%",
                text: "El motor de cumplimiento analiza cada asiento contable contra la Gaceta Oficial vigente. Esta tecnología detecta anomalías fiscales antes de la declaración definitiva, permitiendo correcciones proactivas que eliminan el riesgo de multas o sanciones."
            }
        ]
    },
    {
        id: "bi",
        title: "6. Inteligencia de Negocio y Estrategia",
        icon: BrainCircuit,
        description: "Análisis predictivo y visualización de datos para la alta dirección.",
        content: [
            {
                sub: "Cuadro de Mando Ejecutivo (HUD)",
                text: "Visualización de métricas de misión crítica: Liquidez neta, ROI por proyecto y Punto de Equilibrio. La interfaz presenta datos vectoriales que permiten a los socios identificar desviaciones operativas y tomar decisiones basadas en evidencia en tiempo real."
            },
            {
                sub: "Simulador de Escenarios Económicos",
                text: "Módulo de IA que proyecta el impacto de cambios en precios, costos de materia prima o fluctuaciones cambiarias. El simulador permite evaluar la factibilidad económica de nuevas líneas de negocio antes del despliegue de capital."
            }
        ]
    },
    {
        id: "rrhh",
        title: "7. Gestión de Personal y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral de la relación laboral y cumplimiento social.",
        content: [
            {
                sub: "Cómputo de Nómina y Parafiscales",
                text: "Cálculo automatizado de salarios, utilidades y bono vacacional. El sistema gestiona las retenciones de IVSS, FAOV e INCES, emitiendo recibos de pago digitales con validez legal que son transmitidos al trabajador para su firma electrónica."
            },
            {
                sub: "Liquidación y Finiquitos Técnicos",
                text: "Procesamiento de prestaciones sociales conforme al Artículo 142 de la LOTTT. En caso de terminación laboral, el sistema genera el cálculo de antigüedad y conceptos fraccionados, emitiendo el documento de finiquito listo para archivo ministerial."
            }
        ]
    },
    {
        id: "legal",
        title: "8. Escritorio Jurídico y Contratos",
        icon: Gavel,
        description: "Centralización de minutas, poderes y cumplimiento normativo corporativo.",
        content: [
            {
                sub: "Archivo Digital de Contratos",
                text: "Repositorio central de documentos legales con control de versiones. El sistema rastrea fechas de vencimiento y cláusulas de renovación, alertando al departamento legal sobre la necesidad de actualización de acuerdos estratégicos."
            },
            {
                sub: "Control de Poderes y Socios",
                text: "Seguimiento de facultades de representación y actas de asamblea. El módulo garantiza que la Institución mantenga su personalidad jurídica vigente y sus apoderados estén debidamente facultados ante registros y notarías."
            }
        ]
    },
    {
        id: "reciclaje",
        title: "9. Sostenibilidad y Reciclaje Magnético",
        icon: Recycle,
        description: "Operación de infraestructuras verdes y activos digitales ambientales.",
        content: [
            {
                sub: "Smart Bins con Tecnología de Inducción",
                text: "Las estaciones de reciclaje emplean sensores de magnetismo síncrono para clasificar materiales metálicos y plásticos. El sistema valida la inyección del residuo y transfiere automáticamente los Eco-Créditos a la billetera del ciudadano."
            },
            {
                sub: "Certificación de Huella de Carbono",
                text: "Cada kilogramo reciclado es sellado en Blockchain, permitiendo a la empresa generar reportes de sostenibilidad auditables. Estos activos verdes pueden ser utilizados para incentivos fiscales o cumplimiento de responsabilidad social."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "10. Planificación de Ingeniería e IA",
        icon: Cpu,
        description: "Diseño técnico, presupuestos de obra y soluciones IA aplicadas.",
        content: [
            {
                sub: "Generación de Planos por Visión Artificial",
                text: "Utilizando levantamientos fotográficos, la IA genera planos arquitectónicos y de infraestructura con precisión técnica. Esta herramienta optimiza los tiempos de diseño y reduce costos en la fase de planificación de proyectos civiles."
            },
            {
                sub: "Presupuestos CapEx Estructurados",
                text: "Cálculo detallado de inversión vinculando requerimientos técnicos con costos de mercado. El sistema emite dictámenes de factibilidad económica listos para su presentación ante entes de financiamiento o juntas directivas."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `PROTOCOLO DE EXPORTACIÓN ${format.toUpperCase()} ACTIVADO`,
            description: "Procesando expediente técnico oficial para descarga.",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; padding: 40px; color: #000; }
                        h1 { text-align: center; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; font-size: 24pt; }
                        h2 { color: #000; border-bottom: 1px solid #333; margin-top: 40px; text-transform: uppercase; font-size: 18pt; }
                        h3 { color: #444; margin-top: 25px; text-decoration: underline; font-size: 14pt; }
                        p { text-align: justify; margin-bottom: 15px; font-size: 11pt; }
                        .footer { font-size: 9pt; text-align: center; color: #666; margin-top: 60px; border-top: 1px solid #ddd; padding-top: 10px; }
                    </style>
                </head>
                <body>
                    <h1>MANUAL DE USUARIO OFICIAL</h1>
                    <p style="text-align: center; font-weight: bold; font-size: 14pt;">Ecosistema de Gestión de Misión Crítica Kyron v2.6.5</p>
                    <p style="text-align: center; font-style: italic;">Expediente Técnico para Uso Ministerial y Administrativo</p>
            `;
            
            let body = "";
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Descripción:</strong> ${mod.description}</p>`;
                mod.content.forEach(c => {
                    body += `<h3>${c.sub}</h3><p>${c.text}</p>`;
                });
            });

            const footer = `
                    <div class="footer">
                        © ${new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Caracas, Venezuela.
                    </div>
                </body></html>
            `;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Manual_Usuario_Kyron_Oficial.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* ESTILOS PARA OCULTAR BARRA SUPERIOR GLOBAL */}
            <style jsx global>{`
                header.fixed.top-0, 
                footer.border-t,
                .no-print {
                    display: none !important;
                }
                body { padding-top: 0 !important; }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    .glass-card { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; }
                    .text-white { color: black !important; }
                    .text-primary { color: #2563eb !important; }
                    .text-white\/40 { color: #666 !important; }
                }
            `}</style>

            {/* HEADER LOCAL DEL MANUAL */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-24 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print">
                <div className="flex items-center gap-6">
                    <Logo className="h-12 w-12 shadow-glow" />
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-[0.6em] uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Expediente Técnico de Usuario</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase border-white/10 hover:bg-white/5" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase shadow-glow" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-40 pb-40 relative z-10">
                {/* HERO DEL MANUAL */}
                <div className="text-center space-y-10 mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.6em] text-primary">
                        <Terminal className="h-4 w-4" /> PROTOCOLO INSTITUCIONAL v2.6.5
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de <span className="text-primary">Usuario</span></h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-4xl mx-auto font-bold uppercase tracking-tight italic border-l-4 border-primary/20 pl-10">
                        Guía técnica exhaustiva para la operación de nodos en el ecosistema nacional de gestión integral.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-20">
                    {/* NAVEGACIÓN POR ANCLAS (PANEL LATERAL) */}
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-10 rounded-[3rem] sticky top-40 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-10 border-b border-white/5 pb-8">
                                <CardTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-4">
                                    <Activity className="h-5 w-5 animate-pulse" /> Índice Técnico
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-2">
                                {manualModules.map((mod) => (
                                    <a 
                                        key={mod.id}
                                        href={`#${mod.id}`}
                                        className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 group border border-transparent hover:border-primary/20"
                                    >
                                        <mod.icon className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        <span>{mod.title.split('. ')[1]}</span>
                                    </a>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* CONTENIDO DETALLADO */}
                    <div className="lg:col-span-8 space-y-40">
                        {manualModules.map((mod) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="scroll-mt-40"
                            >
                                <Card className="glass-card rounded-[4rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-1000 hover:border-primary/30">
                                    <CardHeader className="p-16 md:p-24 border-b border-white/5 flex flex-row items-center gap-16 bg-white/[0.01]">
                                        <div className="p-10 bg-primary/10 rounded-[3rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform duration-700">
                                            <mod.icon className="h-16 w-16 text-primary" />
                                        </div>
                                        <div className="space-y-6">
                                            <CardTitle className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-sm font-black uppercase tracking-[0.5em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-16 md:p-24 space-y-24">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-10">
                                                <div className="flex items-center gap-10">
                                                    <div className="h-[2px] flex-1 bg-white/5" />
                                                    <h4 className="text-sm font-black uppercase tracking-[0.8em] text-primary italic shadow-glow-text">{item.sub}</h4>
                                                    <div className="h-[2px] w-20 bg-white/5" />
                                                </div>
                                                <p className="text-xl font-medium text-white/60 leading-relaxed text-justify indent-20 border-l-4 border-primary/10 pl-20 italic">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-12 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Documento Verificado por Nodo Maestro</span>
                                        </div>
                                        <Button variant="link" className="text-[10px] font-black uppercase text-primary p-0 hover:shadow-glow-text" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                            VOLVER AL ÍNDICE <ArrowDown className="ml-3 h-4 w-4 rotate-180" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}

                        <Card className="bg-primary text-primary-foreground rounded-[4rem] p-24 text-center shadow-glow border-none relative overflow-hidden group no-print mt-40">
                            <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <ShieldCheck className="h-[400px] w-[400px]" />
                            </div>
                            <div className="relative z-10 max-w-3xl mx-auto space-y-16">
                                <h3 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-tight italic-shadow">Asistencia Técnica Institucional</h3>
                                <p className="text-2xl font-bold opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-12 text-justify">
                                    Nuestra mesa de ayuda está facultada para la resolución de incidencias operativas bajo protocolos de alta prioridad y seguridad de datos blindada.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-3xl h-24 px-20 font-black text-lg uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                    CONTACTAR INGENIERÍA CENTRAL
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* FOOTER LOCAL */}
                <div className="mt-60 text-center space-y-12 opacity-30 no-print pb-20">
                    <div className="flex justify-center gap-20 text-[11px] font-black uppercase tracking-[1em]">
                        <span className="flex items-center gap-5"><Lock className="h-5 w-5" /> CIFRADO AES-512</span>
                        <span className="flex items-center gap-5"><Database className="h-5 w-5" /> LEDGER VERIFIED</span>
                        <span className="flex items-center gap-5"><Activity className="h-5 w-5" /> STATUS: OPERATIONAL</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <p className="max-w-5xl mx-auto text-[10px] font-bold uppercase tracking-[0.5em] leading-relaxed italic">
                        © {new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Caracas, Venezuela. <br/>
                        Todos los derechos reservados. Documento oficial de propiedad intelectual bajo registro SAPI.
                    </p>
                </div>
            </main>
        </div>
    );
}
