
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
    Shield,
    Home,
    Download,
    Activity,
    ChevronRight,
    Sparkles,
    Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL v2.6.5
 * Documentación técnica consolidada de misión crítica con sello de identidad oficial.
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
                text: "El ciudadano debe realizar un escaneo facial tridimensional para vincular su identidad física con un hash criptográfico inmutable. Este proceso garantiza que cada trámite posea una firma digital de alta fidelidad."
            },
            {
                sub: "Resguardo de Activos Civiles",
                text: "La plataforma permite el almacenamiento seguro de Cédulas de Identidad, RIF y Pasaportes bajo cifrado AES-512."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes móviles, asignación de numeración y conectividad de baja latencia.",
        content: [
            {
                sub: "Aprovisionamiento de eSIM Digital",
                text: "Activación inmediata de perfiles de red virtuales mediante código QR único tras la validación de identidad."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inventario",
        icon: TabletSmartphone,
        description: "Procesamiento comercial con integración fiscal y control de existencias en tiempo real.",
        content: [
            {
                sub: "Sincronización Fiscal Directa",
                text: "Consulta sincrónica de bases de datos fiscales para extracción de Razón Social y Dirección en tiempo real."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y SENIAT",
        icon: ShieldCheck,
        description: "Automatización total de obligaciones tributarias bajo el estándar 'Cero Riesgo'.",
        content: [
            {
                sub: "Declaraciones de IVA e ISLR",
                text: "Generación automática de archivos TXT homologados para el portal del SENIAT con auditoría IA predictiva."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y BI",
        icon: TrendingUp,
        description: "Análisis de rentabilidad, flujo de caja y toma de decisiones basadas en datos.",
        content: [
            {
                sub: "Análisis de Rentabilidad (VAN/TIR)",
                text: "Cálculo de indicadores financieros para evaluar la viabilidad de proyectos y retorno de inversión."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento y RR.HH.",
        icon: Briefcase,
        description: "Administración integral del personal, nóminas y cumplimiento laboral (LOTTT).",
        content: [
            {
                sub: "Cálculo de Nómina y Prestaciones",
                text: "Automatización del pago quincenal, cálculo de horas extras y liquidaciones con firma electrónica."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico",
        icon: Gavel,
        description: "Control de contratos, poderes de representación y expedientes legales.",
        content: [
            {
                sub: "Ciclo de Vida de Contratos",
                text: "Redacción y seguimiento de contratos comerciales con alertas de vencimiento automatizadas."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Generación de planos, presupuestos de obra y estudios de factibilidad técnica.",
        content: [
            {
                sub: "Planimetría Generativa",
                text: "La IA genera planos a escala a partir de imágenes para la planificación de infraestructura física."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Fundación Kyron",
        icon: Recycle,
        description: "Operación de infraestructuras verdes y monetización de residuos.",
        content: [
            {
                sub: "Reciclaje Magnético IA",
                text: "Identificación de materiales mediante inducción magnética y recompensa mediante eco-créditos."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y LOPNNA",
        icon: HeartHandshake,
        description: "Gestión de trámites familiares, salud y obligaciones civiles.",
        content: [
            {
                sub: "Documentación Civil Certificada",
                text: "Solicitud y descarga de copias certificadas de Partidas de Nacimiento y Actas de Matrimonio."
            }
        ]
    },
    {
        id: "privado",
        title: "11. Sector Privado y Matriz ZEDU",
        icon: Lock,
        description: "Dossiers estratégicos, factibilidad económica y planes de acción institucional.",
        content: [
            {
                sub: "Protocolo ZEDU Maestro",
                text: "Metodología de ingeniería para el despliegue de nodos de desarrollo en comunidades específicas."
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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-full h-[1400px] bg-primary/5 rounded-full blur-[250px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-secondary/5 rounded-full blur-[200px] opacity-30" />
            </div>

            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print">
                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <Logo className="h-10 w-10 shadow-glow" />
                    </Link>
                    <div className="flex flex-col border-l border-white/10 pl-6 ml-2">
                        <span className="text-xs font-black tracking-[0.6em] uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><Home className="mr-2 h-3.5 w-3.5" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[9px] font-black uppercase shadow-glow" onClick={() => window.print()}>
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORTAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32 pb-40 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16">
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-32 space-y-8">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                                <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                                        <Activity className="h-4 w-4" /> Estructura Técnica
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    {manualModules.map((mod) => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => scrollToSection(mod.id)}
                                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 text-left group"
                                        >
                                            <div className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-primary transition-all shadow-glow" />
                                            <span>{mod.title.split('. ')[1]}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-32">
                        <motion.section 
                            className="space-y-10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" /> PROTOCOLO INSTITUCIONAL
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Expediente <br/> <span className="text-primary">Técnico</span></h1>
                            <p className="text-lg text-white/40 max-w-2xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 leading-relaxed">
                                Guía de operación absoluta para el ecosistema Kyron v2.6.5.
                            </p>
                        </motion.section>

                        {manualModules.map((mod, index) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id} 
                                className="scroll-mt-32"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-1000 hover:border-primary/20">
                                    <CardHeader className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-12 bg-white/[0.01]">
                                        <div className="relative">
                                            <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform relative z-10">
                                                <mod.icon className="h-12 w-12 text-primary" />
                                            </div>
                                            <div className="absolute -top-4 -right-4 z-20">
                                                <Logo className="h-10 w-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </div>
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
                                                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic">{item.sub}</h4>
                                                    <div className="h-[1px] w-12 bg-white/5" />
                                                </div>
                                                <p className="text-lg font-medium text-white/60 leading-relaxed text-justify border-l-2 border-primary/10 pl-12 italic">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-8 border-t border-white/5 flex justify-center bg-white/[0.01]">
                                        <Logo className="h-4 w-4 mr-3 opacity-20" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.8em] text-white/10 italic">Kyron Intelligence Ecosystem</span>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="py-20 border-t border-white/5 bg-black/80 text-center relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">
                    FIN DE EXPEDIENTE TÉCNICO • MK-2.6.5
                </p>
            </footer>
        </div>
    );
}
