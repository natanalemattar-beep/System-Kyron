
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
    Terminal,
    ShieldCheck,
    Database,
    Activity,
    CheckCircle2,
    Lock,
    Zap,
    ArrowDown,
    ChevronRight,
    Target,
    ListTree
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL v2.6.5
 * Documentación técnica de misión crítica.
 * Incluye sistema de JUMP LINKS (Enlaces de Salto) para navegación directa.
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
                text: "El ciudadano debe realizar un escaneo facial tridimensional para vincular su identidad física con un hash criptográfico inmutable. Este proceso garantiza que cada trámite posea una firma digital de alta fidelidad. Instrucciones: Asegure una iluminación uniforme, retire accesorios que cubran el rostro y realice un movimiento circular lento según las guías en pantalla para el sellado de su identidad en el Ledger distribuido."
            },
            {
                sub: "Gestión de Documentos de Identidad",
                text: "La plataforma permite el resguardo y verificación de Cédulas de Identidad, RIF Personal y Pasaportes. Cada documento cargado es sometido a una validación por OCR (Reconocimiento Óptico de Caracteres) para asegurar que la información coincida con las bases de datos institucionales. Los documentos permanecen cifrados bajo estándar AES-512."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes móviles, asignación de numeración y conectividad global.",
        content: [
            {
                sub: "Aprovisionamiento de eSIM Digital",
                text: "Activación de perfiles de red virtuales sin necesidad de hardware físico. El sistema genera un código QR de activación tras validar la titularidad. Este perfil configura automáticamente los puntos de acceso (APN) y protocolos de seguridad 5G, permitiendo conectividad inmediata con cifrado de grado militar de extremo a extremo."
            },
            {
                sub: "Cumplimiento Regulatorio CONATEL",
                text: "Monitor de cumplimiento para operadoras. Emite alertas críticas 60 días antes del vencimiento de habilitaciones. El usuario debe cargar los recaudos en formato PDF para la auditoría técnica previa a la presentación ante el ente regulador."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Terminal de Punto de Venta (TPV) IA",
        icon: TabletSmartphone,
        description: "Procesamiento comercial con integración fiscal y validación de identidad.",
        content: [
            {
                sub: "Sincronización Fiscal por RIF",
                text: "Al ingresar el RIF del cliente, el TPV realiza una consulta sincrónica al nodo fiscal para extraer Razón Social y Dirección. Este proceso cumple con la Providencia SNAT/2011/0071, asegurando que el 100% de las facturas emitidas posean datos válidos, eliminando el riesgo de facturación errónea."
            },
            {
                sub: "Protocolo de Cierre y Arqueo Maestro",
                text: "Al finalizar el turno, el cajero debe ejecutar el protocolo de arqueo. El sistema solicita el conteo físico por denominación de billete (VES/USD/EUR). Si existe una discrepancia, la IA de riesgo solicita una justificación obligatoria que se anexa al Libro de Sobrantes y Faltantes."
            }
        ]
    },
    {
        id: "facturacion",
        title: "4. Facturación, Crédito y BNPL",
        icon: CreditCard,
        description: "Control de documentos de venta y gestión de plataformas de financiamiento.",
        content: [
            {
                sub: "Emisión de Documentos Legales",
                text: "Generación de Facturas, Notas de Débito y Notas de Crédito con numeración de control inalterable. Cada documento incluye un código QR que permite la validación inmediata de su autenticidad por parte de las autoridades fiscales."
            },
            {
                sub: "Gestión de Crédito 'Compra Ahora, Paga Después'",
                text: "Integración con Cashea, Krece y otros proveedores. El sistema valida el nivel de crédito del usuario en tiempo real, procesa el pago inicial y automatiza la programación de cuotas, enviando recordatorios mediante canales seguros."
            }
        ]
    },
    {
        id: "fiscal",
        title: "5. Blindaje Fiscal SENIAT y Libros",
        icon: Calculator,
        description: "Automatización total de obligaciones tributarias y libros oficiales.",
        content: [
            {
                sub: "Mantenimiento de Libros Electrónicos",
                text: "Los Libros de Compra y Venta se alimentan automáticamente de las transacciones del TPV. El sistema genera los archivos planos (.txt) necesarios para la declaración de IVA e ISLR, garantizando que el reporte digital sea un espejo exacto de la operación comercial."
            },
            {
                sub: "Motor de Auditoría Predictiva",
                text: "Tecnología que analiza cada asiento contable contra la Gaceta Oficial vigente. Si se detecta un cambio en la alícuota del IVA o nuevas contribuciones, el sistema recalcula los pasivos impositivos y alerta al contador para su liquidación proactiva."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Personal y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral del capital humano y cumplimiento sociolaboral.",
        content: [
            {
                sub: "Cómputo de Remuneraciones y Parafiscales",
                text: "Cálculo de sueldos, vacaciones, utilidades y prestaciones sociales conforme a la LOTTT. Gestión de retenciones de IVSS, FAOV e INCES, emitiendo las planillas de pago digitalizadas para su archivo histórico en el expediente del trabajador."
            }
        ]
    },
    {
        id: "legal",
        title: "7. Escritorio Jurídico y Contratos",
        icon: Gavel,
        description: "Centralización de minutas, poderes y representación corporativa.",
        content: [
            {
                sub: "Administración de Poderes y Representación",
                text: "Rastreo de la vigencia de poderes notariales y actas de asamblea. Emisión de alertas automáticas sobre la extinción de facultades de representación, asegurando que la institución siempre actúe bajo apoderados facultados."
            }
        ]
    },
    {
        id: "bi",
        title: "8. Inteligencia de Negocio y Estrategia",
        icon: BrainCircuit,
        description: "Análisis predictivo y visualización de KPIs de misión crítica.",
        content: [
            {
                sub: "Análisis de Rentabilidad y ROI",
                text: "Tablero ejecutivo que visualiza el Punto de Equilibrio y la Tasa Interna de Retorno (TIR). Los datos se presentan en interfaces HUD optimizadas para la toma de decisiones estratégicas de alta dirección."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Reciclaje Magnético",
        icon: Recycle,
        description: "Operación de infraestructuras verdes y generación de eco-créditos.",
        content: [
            {
                sub: "Tecnología de Inducción en Smart Bins",
                text: "Estaciones de recolección con sensores de magnetismo para clasificar residuos. El ciudadano sincroniza su ID Digital, deposita el material y recibe automáticamente Eco-Créditos en su billetera digital."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "10. Planificación de Ingeniería e IA",
        icon: Cpu,
        description: "Diseño técnico, presupuestos de obra y modelado inteligente.",
        content: [
            {
                sub: "Generación de Planos por Visión Artificial",
                text: "Carga de fotografías de espacios físicos para generar planos a escala con precisión técnica. Incluye calculador de materiales (m²/unidades) vinculado a presupuestos CapEx para proyectos institucionales."
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
            description: "Procesando expediente técnico oficial para descarga institucional.",
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
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    .glass-card { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; }
                    .text-white { color: black !important; }
                    .text-primary { color: #2563eb !important; }
                    .text-white/40 { color: #666 !important; }
                    .border-white/5 { border-color: #eee !important; }
                }
            `}</style>

            {/* CABECERA DOCUMENTAL */}
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
                    
                    {/* NAVEGACIÓN POR ANCLAS (JUMP LINKS) */}
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-32 space-y-8">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                                <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                                        <ListTree className="h-4 w-4" /> Protocolos Maestros
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

                            <Card className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-4" />
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">Seguridad Validada</p>
                                <span className="text-xs font-bold text-white/80">Protocolo v2.6.5 Final</span>
                            </Card>
                        </div>
                    </aside>

                    {/* CONTENIDO TÉCNICO JERARQUIZADO */}
                    <div className="lg:col-span-8 space-y-32">
                        <section className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary shadow-glow">
                                <Activity className="h-3.5 w-3.5" /> EXPEDIENTE DE MISIÓN CRÍTICA
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de <br/> <span className="text-primary">Usuario</span></h1>
                            <p className="text-lg md:text-xl text-white/40 max-w-3xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 text-justify leading-relaxed">
                                Guía técnica integral para la operación soberana del ecosistema System Kyron. Los procedimientos descritos son de carácter institucional y cumplimiento obligatorio.
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
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Verificado v2.6.5</span>
                                        </div>
                                        <Button variant="link" className="text-[9px] font-black uppercase text-primary p-0 hover:shadow-glow-text no-print" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                            VOLVER AL INICIO <ArrowDown className="ml-2 h-3.5 w-3.5 rotate-180" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        ))}

                        <Card className="bg-primary text-primary-foreground rounded-[3.5rem] p-16 text-center shadow-glow border-none relative overflow-hidden group no-print">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <Zap className="h-64 w-64" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight italic-shadow">Soporte Maestro</h3>
                                <p className="text-xl font-bold opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-10 text-justify">
                                    Para incidencias en el despliegue operativo de los módulos o fallas en el protocolo de sincronización, establezca conexión con el nodo de ingeniería central.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-20 px-16 font-black text-sm uppercase tracking-widest shadow-2xl transition-all">
                                    ESTABLECER CONEXIÓN MAESTRA
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="mt-40 text-center space-y-10 opacity-20 no-print pb-20 border-t border-white/5 pt-20">
                    <div className="flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.8em]">
                        <span className="flex items-center gap-4"><Lock className="h-4 w-4" /> SECURED DATA</span>
                        <span className="flex items-center gap-4"><Database className="h-4 w-4" /> LEDGER NODE</span>
                        <span className="flex items-center gap-4"><Activity className="h-4 w-4" /> STATUS: OPTIMAL</span>
                    </div>
                    <p className="max-w-4xl mx-auto text-[9px] font-bold uppercase tracking-[0.4em] leading-relaxed italic">
                        © {new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Caracas, Venezuela. <br/>
                        Documento amparado bajo propiedad intelectual institucional.
                    </p>
                </div>
            </main>
        </div>
    );
}
