
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
    ChevronRight,
    Terminal,
    ShieldCheck,
    Database,
    Activity,
    Printer,
    CheckCircle2,
    Lock,
    Zap,
    ArrowDown,
    ListTree,
    ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL v2.6.5
 * Documentación técnica de grado ministerial diseñada para el cumplimiento de misión crítica.
 * Este nodo opera de forma independiente a la navegación global para garantizar el enfoque técnico.
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
                text: "Usted deberá realizar el escaneo facial tridimensional para vincular su identidad física con un hash criptográfico inmutable. Este proceso garantiza que cada trámite posea una firma digital de alta fidelidad. Asegure una iluminación uniforme y realice un giro lento de la cabeza para el sellado de su identidad en el Ledger distribuido."
            },
            {
                sub: "Bóveda de Documentos Institucionales",
                text: "La Institución permite el resguardo de copias certificadas de Partidas de Nacimiento y Actas de Matrimonio. La carga de datos requiere precisión absoluta en los campos de Tomo, Folio y Acta. Una vez verificado, el documento se emite con un sello QR institucional verificable 24/7."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes móviles y servicios de conectividad global.",
        content: [
            {
                sub: "Aprovisionamiento de eSIM Digital",
                text: "El sistema permite la descarga inmediata de perfiles de red virtuales. Tras la validación, se genera un código QR único que configura automáticamente los parámetros de red 5G en el dispositivo del usuario, asegurando latencia mínima y cifrado de extremo a extremo."
            },
            {
                sub: "Monitoreo Regulatorio CONATEL",
                text: "La plataforma emite alertas críticas sesenta (60) días antes del vencimiento de concesiones, facilitando la renovación electrónica inmediata y evitando penalizaciones administrativas por mora."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Terminal de Punto de Venta (TPV) IA",
        icon: TabletSmartphone,
        description: "Procesamiento de transacciones comerciales con integración fiscal automatizada.",
        content: [
            {
                sub: "Sincronización Fiscal por RIF",
                text: "Al ingresar el número de RIF del cliente, el sistema sincroniza instantáneamente la Razón Social y Dirección Fiscal, garantizando el cumplimiento estricto de la Providencia SNAT/2011/0071 y eliminando errores de transcripción."
            },
            {
                sub: "Protocolo de Arqueo y Cierre",
                text: "Al finalizar la jornada, se debe ejecutar el protocolo de arqueo que cruza los ingresos registrados con el conteo físico. Cualquier discrepancia es registrada automáticamente en el Libro de Sobrantes y Faltantes para su auditoría."
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
                text: "Generación automatizada de facturas, notas de débito y crédito con correlatividad inalterable. El sistema asegura que cada documento cumpla con los requisitos de ley, incluyendo número de control y firma digital."
            },
            {
                sub: "Integración de Financiamiento (Cashea/Krece)",
                text: "El sistema valida el nivel de crédito del usuario, procesa el pago inicial y programa las cuotas restantes en el calendario de cobranza institucional."
            }
        ]
    },
    {
        id: "fiscal",
        title: "5. Blindaje Fiscal SENIAT y Libros",
        icon: Calculator,
        description: "Automatización total de la carga impositiva y registros oficiales.",
        content: [
            {
                sub: "Libros de Compra y Venta Digitales",
                text: "Mantenimiento diario de registros fiscales. El sistema genera los archivos planos (.txt) requeridos para la carga masiva en el portal del SENIAT, garantizando precisión matemática en el cálculo de débitos y créditos."
            },
            {
                sub: "Auditoría Predictiva de Riesgo 0%",
                text: "El motor de cumplimiento analiza cada asiento contable contra la Gaceta Oficial vigente, permitiendo correcciones proactivas que eliminan el riesgo de multas."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Personal y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral de la relación laboral y cumplimiento social.",
        content: [
            {
                sub: "Cómputo de Nómina y Parafiscales",
                text: "Cálculo automatizado de salarios y retenciones de IVSS, FAOV e INCES. El sistema emite recibos de pago digitales con validez legal transmitidos al trabajador mediante protocolo seguro."
            },
            {
                sub: "Liquidación y Finiquitos Técnicos",
                text: "Procesamiento de prestaciones sociales conforme al Artículo 142 de la LOTTT, emitiendo el documento de finiquito listo para archivo ministerial."
            }
        ]
    },
    {
        id: "legal",
        title: "7. Escritorio Jurídico y Contratos",
        icon: Gavel,
        description: "Centralización de minutas, poderes y cumplimiento corporativo.",
        content: [
            {
                sub: "Archivo Digital de Contratos",
                text: "Repositorio central con control de versiones. El sistema rastrea vencimientos y cláusulas de renovación, alertando sobre la necesidad de actualización de acuerdos estratégicos."
            },
            {
                sub: "Control de Poderes y Socios",
                text: "Seguimiento de facultades de representación, asegurando que la Institución mantenga su personalidad jurídica y apoderados debidamente facultados."
            }
        ]
    },
    {
        id: "bi",
        title: "8. Inteligencia de Negocio y Estrategia",
        icon: BrainCircuit,
        description: "Análisis predictivo y visualización de datos para la dirección.",
        content: [
            {
                sub: "Cuadro de Mando Ejecutivo (HUD)",
                text: "Visualización de métricas de misión crítica: Liquidez neta, ROI y Punto de Equilibrio. La interfaz presenta datos vectoriales para identificar desviaciones operativas."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Reciclaje Magnético",
        icon: Recycle,
        description: "Operación de infraestructuras verdes y activos digitales.",
        content: [
            {
                sub: "Smart Bins con Tecnología de Inducción",
                text: "Las estaciones emplean sensores magnéticos para clasificar materiales. El sistema valida la inyección del residuo y transfiere Eco-Créditos a la billetera ciudadana."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "10. Planificación de Ingeniería e IA",
        icon: Cpu,
        description: "Diseño técnico, presupuestos de obra y soluciones IA.",
        content: [
            {
                sub: "Generación de Planos por Visión Artificial",
                text: "Utilizando levantamientos fotográficos, la IA genera planos arquitectónicos con precisión técnica, optimizando los tiempos de diseño."
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

    const handleDownload = (format: 'pdf' | 'doc') => {
        toast({
            title: `PROTOCOLO DE EXPORTACIÓN ${format.toUpperCase()} ACTIVADO`,
            description: "Procesando expediente técnico oficial para descarga.",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });
        window.print();
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* ESTILOS DE PRIORIDAD PARA OCULTAR ELEMENTOS EXTERNOS */}
            <style jsx global>{`
                header.fixed.top-0, 
                footer.border-t,
                nav.fixed,
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
                    .border-white\/5 { border-color: #eee !important; }
                }
            `}</style>

            {/* HEADER INSTITUCIONAL DEL MANUAL */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print shadow-2xl">
                <div className="flex items-center gap-6">
                    <Logo className="h-10 w-10 shadow-glow" />
                    <div className="flex flex-col">
                        <span className="text-xs font-black tracking-[0.6em] uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Manual de Usuario Institucional</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-5 rounded-xl text-[9px] font-black uppercase border-white/10 hover:bg-white/5" onClick={() => handleDownload('doc')}>
                        <FileText className="mr-2 h-3.5 w-3.5" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-10 px-6 rounded-xl text-[9px] font-black uppercase shadow-glow" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-3.5 w-3.5" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32 pb-40 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16">
                    
                    {/* PANEL DE NAVEGACIÓN POR ANCLAS */}
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-32 space-y-8">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                                    <ListTree className="h-20 w-20" />
                                </div>
                                <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                                        <Terminal className="h-4 w-4" /> Índice de Protocolos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    {manualModules.map((mod) => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => scrollToSection(mod.id)}
                                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 text-left border border-transparent hover:border-primary/20 group"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                                            <span>{mod.title.split('. ')[1]}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">Estado del Nodo</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-glow" />
                                    <span className="text-xs font-bold text-white/80">Operativo v2.6.5</span>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* CUERPO TÉCNICO DEL MANUAL */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* PORTADA INTERNA */}
                        <section className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary shadow-glow">
                                <Activity className="h-3.5 w-3.5" /> EXPEDIENTE TÉCNICO INSTITUCIONAL
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de <span className="text-primary">Usuario</span></h1>
                            <p className="text-lg md:text-xl text-white/40 max-w-3xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 text-justify leading-relaxed">
                                Este documento constituye la norma técnica oficial para la operación del ecosistema System Kyron. Todo procedimiento descrito se ajusta al marco legal de la República Bolivariana de Venezuela.
                            </p>
                        </section>

                        {manualModules.map((mod) => (
                            <section key={mod.id} id={mod.id} className="scroll-mt-32">
                                <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-1000 hover:border-primary/20">
                                    <CardHeader className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-12 bg-white/[0.01]">
                                        <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform duration-700">
                                            <mod.icon className="h-12 w-12 text-primary" />
                                        </div>
                                        <div className="space-y-4 text-center md:text-left">
                                            <CardTitle className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-12 md:p-16 space-y-16">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-8">
                                                <div className="flex items-center gap-8">
                                                    <div className="h-[1px] flex-1 bg-white/5" />
                                                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic shadow-glow-text">{item.sub}</h4>
                                                    <div className="h-[1px] w-12 bg-white/5" />
                                                </div>
                                                <p className="text-lg font-medium text-white/60 leading-relaxed text-justify indent-12 border-l-2 border-primary/10 pl-12 italic">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-10 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo Verificado</span>
                                        </div>
                                        <Button variant="link" className="text-[9px] font-black uppercase text-primary p-0 hover:shadow-glow-text" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                            VOLVER AL INICIO <ArrowDown className="ml-2 h-3.5 w-3.5 rotate-180" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        ))}

                        {/* SECCIÓN DE ASISTENCIA */}
                        <Card className="bg-primary text-primary-foreground rounded-[3.5rem] p-16 text-center shadow-glow border-none relative overflow-hidden group no-print">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <Zap className="h-64 w-64" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight italic-shadow">Soporte Técnico</h3>
                                <p className="text-xl font-bold opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-10 text-justify">
                                    En caso de incidencias en el despliegue operativo de los módulos institucionales, contacte al nodo de ingeniería central para resolución bajo protocolos de alta prioridad.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-20 px-16 font-black text-sm uppercase tracking-widest shadow-2xl transition-all">
                                    ESTABLECER CONEXIÓN CON INGENIERÍA
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* FOOTER DEL MANUAL */}
                <div className="mt-40 text-center space-y-10 opacity-20 no-print pb-20 border-t border-white/5 pt-20">
                    <div className="flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.8em]">
                        <span className="flex items-center gap-4"><Lock className="h-4 w-4" /> SECURED</span>
                        <span className="flex items-center gap-4"><Database className="h-4 w-4" /> LEDGER</span>
                        <span className="flex items-center gap-4"><Activity className="h-4 w-4" /> STATUS: OK</span>
                    </div>
                    <p className="max-w-4xl mx-auto text-[9px] font-bold uppercase tracking-[0.4em] leading-relaxed italic">
                        © {new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Caracas, Venezuela. <br/>
                        Documento amparado bajo propiedad intelectual registrada ante el SAPI.
                    </p>
                </div>
            </main>
        </div>
    );
}
