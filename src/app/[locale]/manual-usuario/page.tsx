
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
    Gavel,
    Cpu,
    Recycle,
    Sparkles,
    Zap,
    Download,
    ChevronLeft,
    Terminal,
    Activity,
    Smartphone,
    Scale,
    FileText,
    BarChart3,
    Users,
    Clock,
    Volume2,
    Coins,
    Wand2,
    Printer,
    LayoutGrid,
    BookOpen,
    Calculator,
    Magnet,
    School,
    Shield,
    Target,
    TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Personal y Acceso",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        concept: "Sistema de identificación segura basado en rasgos físicos. Crea un perfil único vinculado a tus documentos legales, permitiendo entrar a las distintas áreas del sistema de forma protegida.",
        procedure: "1. Preparación de cámara. 2. Identificación de puntos faciales. 3. Verificación de identidad real. 4. Cifrado de datos personales. 5. Creación de cuenta Kyron.",
        technical: "Protección de datos personales, Almacenamiento seguro, Validación de identidad."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telefonía y Planes de Datos",
        icon: Radio,
        color: "text-[#22c55e]",
        concept: "Servicio de líneas telefónicas que se activan de forma digital. Permite gestionar números para uso personal o para todos los empleados de una empresa con internet de alta velocidad.",
        procedure: "1. Selección de tarjeta SIM o perfil eSIM. 2. Elección del plan de datos. 3. Descarga del perfil digital. 4. Uso inmediato de llamadas e internet.",
        technical: "Red 5G, Activación remota, Prioridad para trámites de negocio."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta y Facturación",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        concept: "Herramienta para cobrar a clientes cumpliendo con las leyes fiscales. Carga los datos del cliente al instante con su RIF, controla lo que hay en el almacén y acepta pagos en bolívares o dólares.",
        procedure: "1. Identificación del vendedor. 2. Ingreso del RIF del cliente. 3. Selección de productos. 4. Cobro según la tasa del día. 5. Impresión de factura legal.",
        technical: "Control de inventario, Precios automáticos, Historial de ventas."
    },
    {
        id: "financiamiento",
        title: "Módulo 4: Ventas a Crédito y Pagos en Cuotas",
        icon: Smartphone,
        color: "text-[#22c55e]",
        concept: "Permite a los clientes comprar productos y pagarlos por partes. Integrado con aplicaciones de financiamiento populares y sistemas de crédito propios de la empresa.",
        procedure: "1. Revisión de historial del cliente. 2. Cobro del pago inicial. 3. Entrega inmediata del producto. 4. Seguimiento de las cuotas pendientes.",
        technical: "Análisis de riesgo, Alertas de cobro, Integración con bancos."
    },
    {
        id: "contabilidad",
        title: "Módulo 5: Contabilidad y Balance Fiscal",
        icon: Calculator,
        color: "text-[#0ea5e9]",
        concept: "Automatización de las cuentas de la empresa. Calcula automáticamente los ajustes por inflación usando los datos oficiales del banco central para tener estados financieros reales.",
        procedure: "1. Registro de ingresos y gastos. 2. Clasificación de cuentas. 3. Cálculo de inflación del periodo. 4. Emisión de informes de ganancias y pérdidas.",
        technical: "Normas contables nacionales, Auditoría de saldos, Reportes oficiales."
    },
    {
        id: "seniat",
        title: "Módulo 6: Cumplimiento de Impuestos",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        concept: "Protección contra multas y sanciones. El sistema revisa cada factura y documento contra la ley actual antes de presentar las declaraciones a la administración tributaria.",
        procedure: "1. Revisión diaria de transacciones. 2. Cálculo de retenciones de IVA. 3. Preparación de archivos para declaración. 4. Aviso de posibles errores.",
        technical: "Control de riesgo fiscal, Monitoreo de leyes, Validación legal."
    },
    {
        id: "rrhh",
        title: "Módulo 7: Recursos Humanos y Nómina",
        icon: Users,
        color: "text-[#0ea5e9]",
        concept: "Gestión de los trabajadores de la empresa. Automatiza el pago de sueldos, vacaciones y beneficios de ley, asegurando que los expedientes de personal estén completos.",
        procedure: "1. Registro de nuevos empleados. 2. Configuración de sueldo y bonos. 3. Cálculo quincenal de nómina. 4. Envío de recibos de pago digitales.",
        technical: "Cálculo de prestaciones sociales, Control de asistencia, Archivo de personal."
    },
    {
        id: "juridico",
        title: "Módulo 8: Documentos Legales y Contratos",
        icon: Gavel,
        color: "text-[#22c55e]",
        concept: "Lugar seguro para guardar papeles importantes. Incluye un asistente que ayuda a redactar contratos y actas de asamblea basados en las leyes del país.",
        procedure: "1. Redacción de borrador con ayuda. 2. Revisión del documento legal. 3. Firma y sellado de tiempo. 4. Guardado seguro en la nube. 5. Control de vencimientos.",
        technical: "Asesoría legal digital, Seguridad de archivos, Registro de actas."
    },
    {
        id: "sustentabilidad",
        title: "Módulo 9: Reciclaje y Puntos de Premio",
        icon: Recycle,
        color: "text-[#22c55e]",
        concept: "Programa ambiental que premia a los usuarios. Usa papeleras especiales que identifican los residuos y otorgan puntos digitales que pueden canjearse por beneficios.",
        procedure: "1. Identificación en la papelera. 2. Depósito de botellas o latas. 3. Validación automática del residuo. 4. Carga de puntos a la cuenta personal.",
        technical: "Trazabilidad ambiental, Sistema de recompensas, Tecnología de sensores."
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/20 hud-grid">
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-2 bg-black rounded-xl border border-primary/20 shadow-glow-sm">
                        <Logo className="h-8 w-8" />
                    </div>
                    <div className="hidden sm:block border-l border-white/10 pl-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">CENTRO DE AYUDA</span>
                        <p className="text-[8px] font-bold text-primary uppercase mt-1">Manual de Usuario v2.6</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-10 px-6 rounded-xl text-[10px] font-black uppercase border border-white/5 hover:bg-white/5 transition-all">
                        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-32 pb-32">
                <div className="grid lg:grid-cols-12 gap-16">
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-6">
                            <Card className="glass-card p-0 rounded-[2.5rem] border-white/5 bg-white/[0.01] overflow-hidden">
                                <CardHeader className="p-8 pb-4 text-center border-b border-white/5">
                                    <div className="p-4 bg-black rounded-2xl border border-primary/20 w-fit mx-auto mb-4 shadow-glow">
                                        <Logo className="h-12 w-12" />
                                    </div>
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Guía de Secciones</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 max-h-[calc(100vh-25rem)] overflow-y-auto custom-scrollbar space-y-1">
                                    {manualModules.map(mod => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                            className="w-full text-left px-4 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3 group"
                                        >
                                            <mod.icon className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                                            <span>{mod.title}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-20">
                        <section className="bg-primary/5 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de Usuario</h1>
                            <p className="text-lg font-medium text-white/60 italic leading-relaxed max-w-2xl mx-auto">
                                Información detallada para el uso de la plataforma. Aprende a gestionar tus documentos, finanzas y servicios.
                            </p>
                        </section>

                        <div className="space-y-24">
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-32 group animate-in fade-in duration-1000">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 transition-transform group-hover:rotate-3 shadow-glow-sm", mod.color)}>
                                                <mod.icon className="h-8 w-8" />
                                            </div>
                                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white/90">{mod.title}</h2>
                                        </div>
                                        <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-10 space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Propósito</h4>
                                                <p className="text-xl font-bold italic text-white/70 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-black border border-white/5 shadow-inner">
                                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">Pasos a seguir</h4>
                                                <p className="text-sm font-medium italic text-white/60 leading-relaxed">{mod.procedure}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                                                <ShieldCheck className="h-4 w-4" />
                                                <span>Seguridad Aplicada: {mod.technical}</span>
                                            </div>
                                        </Card>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
