
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
    ShieldCheck,
    Database,
    Activity,
    Lock,
    Zap,
    ListTree,
    Home,
    Sparkles,
    Shield,
    ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL v2.6.5
 * Documentación técnica de misión crítica.
 * Incluye Jump Links y Módulo "Quiénes Somos".
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
                sub: "Gestión de Documentos de Identidad",
                text: "La plataforma permite el resguardo y verificación de Cédulas de Identidad, RIF Personal y Pasaportes mediante validación por OCR de precisión."
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
                text: "Activación inmediata de perfiles de red virtuales. El sistema genera un código QR tras validar la titularidad corporativa o personal."
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
                sub: "Sincronización Fiscal Directa",
                text: "Consulta sincrónica al nodo fiscal SENIAT para extraer Razón Social y Dirección basándose en el RIF ingresado."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal SENIAT",
        icon: Calculator,
        description: "Automatización total de obligaciones tributarias y libros oficiales.",
        content: [
            {
                sub: "Cero Riesgo Fiscal",
                text: "Auditoría predictiva 24/7 contra la Gaceta Oficial vigente. Generación de archivos TXT homologados para el portal del SENIAT."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "5. Sostenibilidad y Reciclaje Magnético",
        icon: Recycle,
        description: "Operación de infraestructuras verdes y generación de eco-créditos.",
        content: [
            {
                sub: "Inducción Magnética",
                text: "Uso de sensores de proximidad y clasificación magnética para transformar residuos en puntos para la billetera digital."
            }
        ]
    },
    {
        id: "nosotros",
        title: "11. Quiénes Somos: System Kyron",
        icon: Shield,
        description: "La institución detrás del motor tecnológico de próxima generación.",
        content: [
            {
                sub: "Identidad Institucional",
                text: "Somos un nodo de ingeniería avanzada dedicado a la simplificación de la complejidad operativa. Nuestro propósito es dotar a las empresas y ciudadanos de herramientas inmutables para el crecimiento sostenible en la República Bolivariana de Venezuela."
            },
            {
                sub: "Misión de Grado Corporativo",
                text: "Diseñamos infraestructura de misión crítica que garantiza el 100% de cumplimiento legal y la integridad absoluta de los datos transaccionales mediante Ledger Blockchain."
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

            {/* HEADER DOCUMENTAL */}
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
                    
                    {/* PANEL DE NAVEGACIÓN */}
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

                    {/* CONTENIDO TÉCNICO */}
                    <div className="lg:col-span-8 space-y-32">
                        <motion.section 
                            className="space-y-10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" /> PROTOCOLO INSTITUCIONAL
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de <br/> <span className="text-primary">Operación</span></h1>
                            <p className="text-lg text-white/40 max-w-2xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 leading-relaxed">
                                Expediente técnico para la operatividad absoluta del nodo System Kyron.
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
                                        <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform">
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
                                        <span className="text-[8px] font-black uppercase tracking-[0.8em] text-white/10 italic">Kyron Distributed Ledger Technology • 2026</span>
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
