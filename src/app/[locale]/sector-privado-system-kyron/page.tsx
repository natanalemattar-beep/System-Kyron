"use client";

import { Printer, Download, ChevronLeft, CircleCheck as CheckCircle, Users, User, Cpu, Activity, Target, Zap, Lock, FileText, Scale, TrendingUp, ChartBar as BarChart3, Globe, Handshake, ClipboardList, MapPin, Sun, AlertTriangle, Lightbulb, ShieldCheck, BookOpen, Calculator, Smartphone, Recycle, Gavel, Building2, ShoppingCart, Megaphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PRESENTATION_SCRIPT = [
    {
        title: "Apertura & Visión",
        content: "System Kyron no es solo software, es una infraestructura de inteligencia corporativa diseñada para la soberanía tecnológica de las empresas venezolanas. Hoy presentamos el Modelo Zedu, el corazón de nuestra propuesta para el sector privado."
    },
    {
        title: "El Problema (Diagnóstico)",
        content: "Venezuela tiene uno de los entornos fiscales más complejos del mundo. El 67% de las PYME enfrentan riesgos de multas por falta de automatización entre SENIAT, BCV y la LOTTT. La fragmentación de herramientas genera ineficiencia y costos elevados."
    },
    {
        title: "Ecosistema Kyron (Los 11 Portales)",
        content: "Unificamos telecomunicaciones 5G, gestión fiscal VEN-NIF, nómina inteligente y legalidad con IA en un solo ecosistema AES-256. Destacamos la Línea Infantil CONATEL y la integración con Ameru.AI para sostenibilidad."
    },
    {
        title: "Diferenciadores Clave",
        content: "A diferencia de ERPs genéricos, Kyron integra nativamente la tasa BCV diaria y Kyron AI (Claude) para blindaje jurídico. Somos la única plataforma que une Telecom + SaaS + Sostenibilidad."
    },
    {
        title: "Inversión & Retorno",
        content: "Con una inversión inicial de $18k, proyectamos un retorno operativo en el primer año. Nuestra flota logística y alianzas con Google Cloud aseguran escalabilidad nacional inmediata."
    }
];

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [inputCode, setInputCode] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [presentationMode, setPresentationMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if already authorized in current session
        const savedAuth = sessionStorage.getItem("kyron_elite_auth");
        if (savedAuth === "true") {
            setIsAuthorized(true);
        }
        setAuthChecked(true);
    }, []);

    const handleVerifyCode = () => {
        if (inputCode === "Carlos123") {
            setIsAuthorized(true);
            sessionStorage.setItem("kyron_elite_auth", "true");
            toast({
                title: "Acceso Concedido",
                description: "Bienvenido al Ecosistema Elite de System Kyron.",
            });
        } else {
            toast({
                title: "Código Incorrecto",
                description: "El código ingresado no tiene autorización para este nivel.",
                variant: "destructive",
            });
        }
    };

    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.05),transparent_70%)]" />
                <div className="max-w-md w-full glass-elite p-10 rounded-[2.5rem] border-amber-500/20 text-center relative z-10">
                    <div className="h-20 w-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-glow-sm">
                        <Lock className="h-10 w-10 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Acceso Elite</h2>
                    <p className="text-sm text-slate-400 font-medium mb-8">Ingresa el código de acceso exclusivo para visualizar el Modelo Zedu.</p>
                    
                    <div className="space-y-4">
                        <Input 
                            type="password"
                            placeholder="Código de Acceso"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                            className="h-14 bg-white/5 border-white/10 rounded-2xl text-center text-lg font-black tracking-[0.3em] text-amber-500 placeholder:text-white/20 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all"
                        />
                        <Button 
                            onClick={handleVerifyCode}
                            className="w-full h-14 rounded-2xl kyron-gradient-bg border-0 font-black uppercase tracking-widest text-[10px] shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Validar Acceso Elite
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const handleDownloadWord = async () => {
        toast({
            title: "Generando Documento Elite",
            description: "El Modelo Zedu se está preparando para descarga corporativa.",
        });
    };

    const tableHeaderClass = "header-cell bg-[#0A1128] text-white font-semibold uppercase p-5 text-[12px] border border-black/10 tracking-wide text-center";
    const tableCellClass = "p-5 text-[13px] border border-black/5 text-slate-900 bg-white leading-relaxed font-medium text-justify";
    const tableLabelClass = "label-cell bg-slate-50/50 p-5 text-[10px] font-semibold uppercase border border-black/5 text-slate-500 w-1/3 border-r-2";

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 selection:bg-amber-100 relative" style={{ colorScheme: 'light' }}>
            {/* Presentation Mode FAB */}
            <div className="fixed bottom-8 right-8 z-[100] no-print">
                <Button 
                    onClick={() => setPresentationMode(!presentationMode)}
                    className={cn(
                        "h-16 w-16 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center border-2",
                        presentationMode 
                            ? "bg-slate-950 border-amber-400 text-amber-400 scale-110" 
                            : "bg-amber-500 border-white text-white hover:scale-110"
                    )}
                >
                    {presentationMode ? <Users className="h-6 w-6" /> : <Megaphone className="h-6 w-6" />}
                </Button>
            </div>

            {/* Presentation Script Overlay */}
            <AnimatePresence>
                {presentationMode && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-24 right-8 w-80 z-[90] no-print"
                    >
                        <div className="glass-elite p-6 rounded-[2rem] border-amber-500/20 shadow-2xl bg-slate-950/95 backdrop-blur-xl border border-amber-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-8 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                    <FileText className="h-4 w-4 text-amber-400" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Guion de Pitch Elite</h4>
                            </div>
                            
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {PRESENTATION_SCRIPT.map((step, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setCurrentStep(i)}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all cursor-pointer",
                                            currentStep === i 
                                                ? "bg-amber-500/10 border-amber-500/40 shadow-glow-sm" 
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        <p className={cn("text-[9px] font-black uppercase tracking-widest mb-1", currentStep === i ? "text-amber-400" : "text-white/40")}>Paso {i + 1}</p>
                                        <p className="text-[11px] font-bold text-white mb-2">{step.title}</p>
                                        {currentStep === i && (
                                            <p className="text-[11px] text-slate-300 leading-relaxed italic border-t border-amber-500/20 pt-2 animate-reveal-up">{step.content}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 no-print relative z-10">
                <Button variant="ghost" asChild className="font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-[10px] uppercase h-12 px-8 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-slate-900 text-white hover:bg-black rounded-xl font-semibold text-[10px] uppercase h-12 px-10 shadow-xl border-t border-white/10">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-24 text-slate-950 border border-slate-200 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
                
                <div className="flex items-start justify-start border-b-8 border-slate-50 mb-20 pb-12 gap-12 relative z-10">
                    <Logo id="main-logo-zedu" className="h-32 w-28 border-4 border-amber-500/30 p-2 bg-white shadow-2xl rounded-[2rem] shrink-0" />
                    <div className="pt-4 space-y-3">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-[0.8] mb-1">
                            MODELO <span className="text-amber-500">ZEDU</span>
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-300 uppercase tracking-tight italic leading-none">SYSTEM KYRON</h2>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-2 w-12 bg-amber-500/30 rounded-full" />
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Sector Privado · Venezuela 2026</p>
                        </div>
                    </div>
                </div>

                <div id="zedu-document-content">
                    {/* SECCIÓN 1 — INFORMACIÓN DEL EQUIPO */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <Users className="h-8 w-8 text-amber-500" /> 1. INFORMACIÓN DEL EQUIPO
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl bg-slate-50/30 p-2">
                            <table className="w-full border-collapse rounded-[2rem] overflow-hidden">
                                <tbody>
                                    <tr><td className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} colSpan={3}>Nombre del Proyecto</td></tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "text-center font-black uppercase text-3xl py-10 col-span-3 text-slate-900 tracking-tighter")} colSpan={3}>System Kyron</td>
                                    </tr>
                                    <tr><td className={cn(tableHeaderClass, "bg-slate-900/10 text-slate-500 border-y-2 border-slate-100")} colSpan={3}>Integrantes del Equipo Elite</td></tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "text-center font-black uppercase py-8 text-slate-700")}>Carlos Mattar</td>
                                        <td className={cn(tableCellClass, "text-center font-black uppercase py-8 text-slate-700")}>Sebastian Garrido</td>
                                        <td className={cn(tableCellClass, "text-center font-black uppercase py-8 text-slate-700")}>Marcos Sousa</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 2 — POBLACIÓN A TRABAJAR */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <MapPin className="h-8 w-8 text-amber-500" /> 2. POBLACIÓN A TRABAJAR
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr><td className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} colSpan={2}>Localización Estratégica</td></tr>
                                    <tr>
                                        <td className={tableLabelClass}>País / Ciudad / Municipio</td>
                                        <td className={cn(tableCellClass, "font-bold text-slate-700 text-lg")}>Venezuela — alcance nacional, con sede operativa en Caracas, Distrito Capital</td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Segmento de Mercado Elite</td>
                                        <td className={tableCellClass}>Sector privado venezolano: PYMES y Corporations que requieren gestión contable VEN-NIF, administración de nómina, telecomunicaciones corporativas con IA y gestión de sostenibilidad.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 3 — ANÁLISIS DEL PROBLEMA */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <AlertTriangle className="h-8 w-8 text-amber-500" /> 3. DIAGNÓSTICO DEL PROBLEMA
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr><td className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} colSpan={2}>Definición Crítica</td></tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "bg-amber-500/5")} colSpan={2}>
                                            <p className="text-lg font-bold text-slate-800 mb-4">Las empresas venezolanas operan en uno de los entornos regulatorios más complejos de América Latina.</p>
                                            <p>Enfrentan simultáneamente la gestión de múltiples tributos con tasas dinámicas, la obligatoriedad de los libros contables bajo normas VEN-NIF, la administración de nóminas con múltiples beneficios y aportes sociales, y el cumplimiento de una legislación laboral y mercantil en constante actualización.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 4 — SOLUCIÓN PROPUESTA */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <Lightbulb className="h-8 w-8 text-amber-500" /> 4. SOLUCIÓN: SYSTEM KYRON
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr><td className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} colSpan={2}>Ecosistema de Inteligencia Corporativa</td></tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "border-b-4 border-amber-500/10")} colSpan={2}>
                                            <p className="text-lg font-black text-slate-900 mb-4 tracking-tight uppercase italic text-center">Software, Infraestructura & IA</p>
                                            <p className="mb-6">Integramos en una sola plataforma web 11 portales especializados: desde gestión contable VEN-NIF y nómina LOTTT, hasta telecomunicaciones 5G corporativas y asesoría legal impulsada por Kyron AI (Claude 3.5).</p>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                                                {[
                                                    { name: "Portal Ciudadano", icon: User },
                                                    { name: "Telecom 5G/eSIM", icon: Smartphone },
                                                    { name: "RRHH & Nómina", icon: Users },
                                                    { name: "Facturación POS", icon: ShoppingCart },
                                                    { name: "IA Legal", icon: Gavel },
                                                    { name: "Eco-Créditos", icon: Recycle },
                                                ].map((m) => (
                                                    <div key={m.name} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                                        <m.icon className="h-4 w-4 text-amber-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">{m.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 5 — PRESUPUESTO */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <Zap className="h-8 w-8 text-amber-500" /> 5. PROYECCIÓN FINANCIERA ELITE
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500 text-left")} style={{ width: '45%' }}>Ítem Estratégico</th>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '10%' }}>Cant.</th>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '20%' }}>Inversión (USD)</th>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '25%' }}>Fuente / Proveedor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-slate-900 text-white">
                                        <td className={cn(tableCellClass, "bg-slate-900 text-white font-black text-right uppercase py-8")} colSpan={2}>INVERSIÓN TOTAL ELITE</td>
                                        <td className={cn(tableCellClass, "bg-slate-900 text-amber-400 text-right font-black text-4xl shadow-inner")}>$ 18.574</td>
                                        <td className={cn(tableCellClass, "bg-slate-900 text-slate-500")}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 6 — ALIADOS & COMPETENCIA */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <Handshake className="h-8 w-8 text-amber-500" /> 6. ALIADOS & COMPETENCIA
                        </h2>
                        <div className="space-y-12">
                            <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '35%' }}>Aliado Estratégico</th>
                                            <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '65%' }}>Valor Aportado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={cn(tableCellClass, "font-black uppercase text-amber-600 bg-amber-50/20")}>Google Cloud for Education</td>
                                            <td className={tableCellClass}>Créditos de IA y acceso prioritario a infraestructura escalable global.</td>
                                        </tr>
                                        <tr>
                                            <td className={cn(tableCellClass, "font-black uppercase text-slate-900 bg-slate-50")}>Ameru.AI</td>
                                            <td className={tableCellClass}>Integración de hardware inteligente para la gestión de residuos y eco-créditos.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl bg-white/50 backdrop-blur-sm">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '30%' }}>Líderes Locales</th>
                                            <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")} style={{ width: '70%' }}>Análisis Differentiation Elite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={cn(tableCellClass, "font-black uppercase text-slate-900")}>Inter / NetUno</td>
                                            <td className={tableCellClass}>Foco en conectividad. System Kyron integra telefonía con IA empresarial y gestión fiscal.</td>
                                        </tr>
                                        <tr>
                                            <td className={cn(tableCellClass, "font-black uppercase text-slate-900")}>SAP / Profit Plus</td>
                                            <td className={tableCellClass}>Sistemas Legacy. Kyron es 5G nativo, modular y adaptado al ecosistema fiscal venezolano real-time.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 7 — PLAN DE ACCIÓN EJECUTIVO */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-slate-900 border-l-8 border-amber-500 pl-6">
                            <ClipboardList className="h-8 w-8 text-amber-500" /> 7. PLAN DE ACCIÓN 2026
                        </h2>
                        <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")}>Hito Estratégico</th>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")}>Responsable Elite</th>
                                        <th className={cn(tableHeaderClass, "bg-slate-950 text-amber-500")}>Cronograma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center font-bold">
                                        <td className={tableCellClass}>Validación Fiscal & QA</td>
                                        <td className={tableCellClass}>Carlos Mattar</td>
                                        <td className={tableCellClass}>Q1 2026</td>
                                    </tr>
                                    <tr className="text-center font-bold">
                                        <td className={tableCellClass}>Despliegue Infraestructura 5G</td>
                                        <td className={tableCellClass}>Sebastian Garrido</td>
                                        <td className={tableCellClass}>Q2 2026</td>
                                    </tr>
                                    <tr className="text-center font-bold bg-amber-50/10">
                                        <td className={tableCellClass}>Escalabilidad & Expansión</td>
                                        <td className={tableCellClass}>Marcos Sousa</td>
                                        <td className={tableCellClass}>Q3-Q4 2026</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-40 pt-12 border-t-8 border-slate-50 text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mb-12">Certificación de Infraestructura Digital · Caracas 2026</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            {[
                                { name: "Carlos Mattar", role: "Chief Executive Visionary" },
                                { name: "Sebastian Garrido", role: "Technical Systems Architect" },
                                { name: "Marcos Sousa", role: "Strategic Operations Analysis" },
                            ].map((member) => (
                                <div key={member.name} className="relative">
                                    <div className="h-px w-full bg-slate-200 mb-6" />
                                    <p className="text-[11px] font-black uppercase text-slate-950 tracking-widest">{member.name}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{member.role}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-32 opacity-20 filter grayscale select-none">
                            <p className="text-center text-[10px] text-slate-900 font-black uppercase tracking-[0.6em] italic">System Kyron · The Elite Enterprise Standard</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
