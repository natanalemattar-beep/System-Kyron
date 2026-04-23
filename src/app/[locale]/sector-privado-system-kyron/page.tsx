"use client";

import { Printer, Download, ChevronLeft, CircleCheck as CheckCircle, Users, User, Cpu, Activity, Target, Zap, Lock, FileText, Scale, TrendingUp, ChartBar as BarChart3, Globe, Handshake, ClipboardList, MapPin, Sun, AlertTriangle, Lightbulb, ShieldCheck, BookOpen, Calculator, Presentation, Smartphone, Recycle, Gavel, Building2, ShoppingCart, Megaphone, Loader2, Shield, ScanLine } from "lucide-react";
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

const MASTER_PITCH_3MIN = [
    {
        title: "0:00 - Infrestructura y Soberanía",
        content: "Bienvenidos al futuro de la gestión corporativa en Venezuela. System Kyron no es un proveedor, es su aliado en soberanía tecnológica. Somos la primera infraestructura en el país que fusiona conectividad 5G nativa con inteligencia artificial aplicada. No estamos vendiendo un software; estamos desplegando el estándar de eficiencia que el sector privado necesita para escalar en 2026."
    },
    {
        title: "0:45 - El Ecosistema de 12 Portales",
        content: "Nuestra plataforma unifica 12 portales críticos que eliminan la fricción operativa. Contamos con IA Legal impulsada por Claude 3.5 para blindaje de contratos, IA Fiscal para conciliación VEN-NIF en tiempo real, y un portal de RRHH que automatiza nómina bajo la LOTTT. Desde Eco-Créditos con Ameru.AI hasta Facturación POS certificada, todo vive en una nube segura AES-256."
    },
    {
        title: "1:30 - Telecomunicaciones y Kyron Shield",
        content: "El diferencial maestro es nuestra red. Ofrecemos líneas corporativas 5G y eSIMs gestionadas directamente desde el portal. Pero vamos más allá: cada línea incluye Kyron Shield. Esto significa reposición de equipos en 1h, peritaje forense ante el SENIAT y defensa legal inmediata. En System Kyron, la conectividad es seguridad, y la seguridad es continuidad de negocio."
    },
    {
        title: "2:15 - Blindaje Fiscal y Productividad",
        content: "Resolvemos el mayor dolor de cabeza del empresario venezolano: la descoordinación entre el BCV, el SENIAT y la banca. Automatizamos la tasa diaria, el cumplimiento tributario y la gestión de sostenibilidad. Con hardware fiscal homologado y trazabilidad total, permitimos que los líderes se enfoquen en crecer, mientras Kyron se encarga de la ingeniería regulatoria."
    },
    {
        title: "2:45 - Conclusión y Equipo Elite",
        content: "Respaldados por Google Cloud y liderados por Carlos Mattar, Sebastian Garrido y Marcos Sousa, System Kyron es la inversión más inteligente para el sector privado. Un solo ecosistema, integración total y el respaldo tecnológico más sólido de Venezuela. Estamos listos para dominar el mercado. ¿Están listos para unirse a la elite?"
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
    const [activeDocument, setActiveDocument] = useState<'zedu' | 'folleto'>('zedu');

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

    const handleDownloadPitchScript = () => {
        const script = activeScript === 'zedu' ? PRESENTATION_SCRIPT : MASTER_PITCH_3MIN;
        const text = script.map(s => `[${s.title}]\n${s.content}\n`).join('\n---\n\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Kyron_Pitch_Script_${activeScript.toUpperCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Guion Descargado",
            description: "El guion ejecutivo se ha guardado en tu dispositivo.",
        });
    };

    const handleDownloadPDF = () => {
        toast({ title: "Descargando PDF", description: "Abriendo cuadro de impresión para exportar como PDF..." });
        setTimeout(() => window.print(), 1200);
    };

    const handleDownloadWord = async () => {
        toast({ title: "Descargando Word", description: "Preparando documento en formato .docx..." });
        setTimeout(() => {
            toast({ title: "Completado", description: "Archivo Word descargado." });
        }, 2000);
    };

    const tableHeaderClass = "header-cell bg-[#0A1128] text-white font-black uppercase p-6 text-[11px] border border-black/10 tracking-widest text-center shadow-lg";
    const tableCellClass = "p-6 text-[13px] border border-slate-200 text-slate-950 bg-white/80 backdrop-blur-sm leading-relaxed font-bold text-justify transition-colors hover:bg-white";
    const tableLabelClass = "label-cell bg-slate-100/50 p-6 text-[9px] font-black uppercase border border-slate-200 text-slate-500 w-1/3 border-r-4 border-r-amber-500/20";

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-emerald-50/30 to-slate-50 py-16 px-4 selection:bg-amber-100 relative" style={{ colorScheme: 'light' }}>
            {/* Presentation Mode FAB */}
            <div className="fixed bottom-10 right-10 z-[100] no-print">
                <Button 
                    onClick={() => setPresentationMode(!presentationMode)}
                    className={cn(
                        "h-20 w-20 rounded-[2rem] shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all duration-500 flex items-center justify-center border-4",
                        presentationMode 
                            ? "bg-slate-950 border-amber-400 text-amber-400 scale-110" 
                            : "bg-amber-500 border-white text-white hover:scale-110 hover:shadow-glow"
                    )}
                >
                    {presentationMode ? <Users className="h-8 w-8" /> : <Megaphone className="h-8 w-8" />}
                </Button>
            </div>

            {/* Presentation Script Overlay */}
            <AnimatePresence>
                {presentationMode && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed top-24 right-8 w-96 z-[90] no-print"
                    >
                        <div className="glass-elite p-8 rounded-[3rem] border-amber-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-slate-950/95 backdrop-blur-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border border-white/20 shadow-glow-sm">
                                        <Presentation className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-0.5">Elite Presentation</h4>
                                        <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Pitch Maestro 2026</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setPresentationMode(false)} className="text-white/20 hover:text-white">
                                    <ChevronLeft className="h-4 w-4 rotate-180" />
                                </Button>
                            </div>

                            {/* Script Toggle */}
                            <div className="grid grid-cols-2 gap-2 mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                                <button 
                                    onClick={() => { setActiveScript('zedu'); setCurrentStep(0); }}
                                    className={cn(
                                        "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeScript === 'zedu' 
                                            ? "bg-amber-500 text-white shadow-glow-sm" 
                                            : "text-white/30 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Modelo Zedu
                                </button>
                                <button 
                                    onClick={() => { setActiveScript('master'); setCurrentStep(0); }}
                                    className={cn(
                                        "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeScript === 'master' 
                                            ? "bg-amber-500 text-white shadow-glow-sm" 
                                            : "text-white/30 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Master Pitch
                                </button>
                            </div>
                            
                            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-3 custom-scrollbar mb-8">
                                {(activeScript === 'zedu' ? PRESENTATION_SCRIPT : MASTER_PITCH_3MIN).map((step, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setCurrentStep(i)}
                                        className={cn(
                                            "p-5 rounded-[1.5rem] border transition-all cursor-pointer group relative overflow-hidden",
                                            currentStep === i 
                                                ? "bg-amber-500/10 border-amber-500/40 shadow-glow-sm" 
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <p className={cn("text-[9px] font-black uppercase tracking-widest", currentStep === i ? "text-amber-400" : "text-white/20")}>
                                                {activeScript === 'zedu' ? `SECCIÓN 0${i + 1}` : step.title.split(' - ')[0]}
                                            </p>
                                            {currentStep === i && <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-glow" />}
                                        </div>
                                        <p className="text-[12px] font-black text-white mb-2 group-hover:text-amber-200 transition-colors uppercase tracking-tight">
                                            {activeScript === 'zedu' ? step.title : step.title.split(' - ')[1]}
                                        </p>
                                        {currentStep === i && (
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-[11px] text-slate-300 leading-relaxed italic border-t border-amber-500/20 pt-3 mt-2"
                                            >
                                                {step.content}
                                            </motion.p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Download Actions */}
                            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                                <Button 
                                    onClick={handleDownloadPitchScript}
                                    variant="outline" 
                                    className="bg-transparent border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest h-12 text-white/60 hover:text-white hover:bg-white/5"
                                >
                                    <Download className="mr-2 h-3 w-3" /> Guion .TXT
                                </Button>
                                <Button 
                                    onClick={handleDownloadWord}
                                    className="bg-white text-slate-950 hover:bg-amber-400 rounded-2xl text-[9px] font-black uppercase tracking-widest h-12 transition-all shadow-xl"
                                >
                                    <Layout className="mr-2 h-3 w-3" /> Presentación
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1200px] mx-auto mb-8 flex flex-col lg:flex-row justify-between items-center gap-4 no-print relative z-10">
                <Button variant="ghost" asChild className="font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-black shrink-0">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>

                {/* Tab selector */}
                <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                    <button onClick={() => setActiveDocument('zedu')} className={cn("px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeDocument === 'zedu' ? "bg-amber-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-100")}>
                        Modelo Zedu
                    </button>
                    <button onClick={() => setActiveDocument('folleto')} className={cn("px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeDocument === 'folleto' ? "bg-emerald-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100")}>
                        Folleto Comercial
                    </button>
                </div>

                <div className="flex gap-2 shrink-0">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-[10px] uppercase h-12 px-5 shadow-sm text-slate-700">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownloadPDF} className="bg-rose-600 text-white hover:bg-rose-700 rounded-xl font-bold text-[10px] uppercase h-12 px-5 shadow-md">
                        <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold text-[10px] uppercase h-12 px-5 shadow-md">
                        <Download className="mr-2 h-4 w-4" /> WORD
                    </Button>
                </div>
            </div>

            {activeDocument === 'folleto' ? <FolletoView /> : (
            <motion.div
                key={activeDocument}
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
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOLLETO / TRÍPTICO COMERCIAL — Vista Final Dúplex (2 caras, 6 paneles)
// ─────────────────────────────────────────────────────────────────────────────
function FolletoView() {
    const QR_PRINCIPAL = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app&color=03050a&bgcolor=ffffff&margin=4";
    const QR_FEEDBACK = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app/es/feedback&color=03050a&bgcolor=ffffff&margin=4";
    
    return (
        <div id="folleto-content" className="w-full bg-slate-900 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)]">

            {/* ═ CARA 1: EXTERIOR (Paneles: Solapa, Contraportada, Portada) ═ */}
            <div className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(14,165,233,0.12),transparent)] pointer-events-none" />

                {/* P1: HISTORIA (Solapa Izquierda) */}
                <div className="flex-1 border-r border-white/5 p-10 flex flex-col relative z-10 bg-[#020409]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-400/80">Nuestra Historia</span>
                    </div>
                    <h3 className="text-[20px] font-black text-white leading-tight tracking-tighter mb-4">Nacido para<br/><span className="text-amber-500">Venezuela.</span></h3>
                    <p className="text-[10px] text-slate-300 leading-relaxed mb-4 text-justify">
                        System Kyron nace para resolver la fragmentación tecnológica. Dejamos de usar 10 herramientas desconectadas para crear <span className="text-white font-bold">un solo ecosistema unificado</span> que protege a la empresa venezolana de errores y multas.
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <h5 className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Misión 2026</h5>
                            <p className="text-[9px] text-slate-400 leading-relaxed italic">"Automatizar la complejidad fiscal y legal a través de IA avanzada y conectividad 5G nativa."</p>
                        </div>
                    </div>
                    <div className="mt-auto space-y-3">
                         <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                            <Target className="h-5 w-5 text-amber-500 shrink-0" />
                            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Visión: El estándar de gestión corporativa.</p>
                         </div>
                         <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                            <Handshake className="h-5 w-5 text-amber-500 shrink-0" />
                            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Compromiso: 100% cumplimiento fiscal.</p>
                         </div>
                    </div>
                </div>

                {/* P2: CONTRAPORTADA (Centro) */}
                <div className="flex-1 border-r border-white/5 p-10 flex flex-col justify-between relative z-10 bg-[#03050a]">
                    <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-700 mb-6 text-center">Infraestructura Crítica</p>
                        <div className="space-y-3">
                            {[
                                {c:"text-cyan-400 border-cyan-500/25 from-cyan-500/10", t:"Sostenibilidad Eco-IA", d:"Cada operación genera créditos verdes con Ameru.AI."},
                                {c:"text-emerald-400 border-emerald-500/25 from-emerald-500/10", t:"Precios Demo", d:"*Los montos mostrados en pruebas son referenciales."},
                                {c:"text-blue-400 border-blue-500/25 from-blue-500/10", t:"Cloud AES-256", d:"Backups automáticos y cifrado bancario en la nube."},
                                {c:"text-amber-400 border-amber-500/25 from-amber-500/10", t:"Soporte Elite", d:"Ingenieros especializados disponibles 24/7."},
                            ].map((card,i)=>(
                                <div key={i} className={`bg-gradient-to-r ${card.c.split(' ')[2]} to-transparent p-3 rounded-xl border ${card.c.split(' ')[1]}`}>
                                    <h4 className={`text-[9px] font-black uppercase tracking-widest ${card.c.split(' ')[0]} mb-0.5`}>{card.t}</h4>
                                    <p className="text-[8.5px] text-slate-500 leading-tight">{card.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <Logo className="h-10 w-10 mb-4 opacity-20 filter grayscale" />
                        <p className="text-[8px] text-slate-600 uppercase tracking-[0.4em] mb-2 font-black">Caracas · Venezuela · 2026</p>
                        <p className="text-[7px] text-slate-800 tracking-widest">system-kyron.vercel.app</p>
                    </div>
                </div>

                {/* P3: PORTADA (Derecha) */}
                <div className="flex-1 p-10 flex flex-col relative z-10 overflow-hidden bg-[#050816]">
                    <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <Logo className="h-14 w-14 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]" />
                            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-[7px] font-black uppercase tracking-widest text-cyan-400">Edición 2026</span>
                        </div>
                        <div className="mb-8">
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 mb-3 flex items-center gap-2">
                                <span className="h-px w-6 bg-slate-600 inline-block" /> Sector Privado
                            </p>
                            <h1 className="text-[52px] font-black uppercase tracking-tighter leading-[0.85] mb-5 text-white">System<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kyron.</span></h1>
                            <p className="text-[11px] text-slate-300 leading-relaxed border-l-3 border-cyan-500 pl-4 max-w-[240px]">El primer ecosistema de inteligencia corporativa unificado. Fiscal, Telecom y IA.</p>
                        </div>
                        <div className="flex flex-col items-center mt-auto">
                            <div className="bg-white p-3 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.3)] mb-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={QR_PRINCIPAL} alt="QR Portada" width={180} height={180} className="rounded-xl block" />
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <ScanLine className="h-4 w-4 text-cyan-400 animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Escanea para acceder</p>
                            </div>
                            <p className="text-[8px] text-slate-500 tracking-widest">system-kyron.vercel.app</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ CARA 2: INTERIOR (Paneles: Módulos, Diferenciales, Feedback) ═ */}
            <div className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(14,165,233,0.06),transparent)] pointer-events-none" />

                {/* P4: LOS 9 MÓDULOS (Izquierda) */}
                <div className="flex-1 border-r border-white/5 p-10 flex flex-col relative z-10 bg-[#020409]/60">
                    <div className="mb-6">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400/70 mb-1">Ecosistema Zedu</p>
                        <h3 className="text-[24px] font-black uppercase tracking-tighter text-white leading-none">Los 9 <span className="text-emerald-400">Módulos</span></h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2 flex-1 pr-2">
                        {[
                            {I:Calculator, t:"Contabilidad VEN-NIF", d:"Libros automáticos y tasa BCV."},
                            {I:Users, t:"RRHH & Nómina LOTTT", d:"Cálculos de ley y utilidades."},
                            {I:ShoppingCart, t:"Facturación & POS", d:"IGTF y fiscalización SENIAT."},
                            {I:Building2, t:"Gestión de Socios", d:"Control de juntas y actas."},
                            {I:Gavel, t:"IA Legal (Claude 3.5)", d:"Blindaje y contratos con IA."},
                            {I:Recycle, t:"Sostenibilidad Eco-IA", d:"Huella verde y Ameru.AI."},
                            {I:Smartphone, t:"Telecom 5G Corp.", d:"Gestión de líneas y eSIMs."},
                            {I:ShieldCheck, t:"Auditoría Real-Time", d:"Monitoreo fiscal preventivo."},
                            {I:Activity, t:"Análisis de Mercado", d:"Data para toma de decisiones."},
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex gap-3 p-2 bg-white/[0.03] rounded-xl border border-emerald-500/10">
                                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    <I className="h-3.5 w-3.5 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white uppercase text-[8px] tracking-widest mb-0.5">{t}</h4>
                                    <p className="text-[8px] text-slate-500 leading-tight">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* P5: DIFERENCIALES & SHIELD (Centro) */}
                <div className="flex-1 border-r border-white/5 p-10 flex flex-col relative z-10 bg-[#03050a]">
                    <div className="mb-6">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/70 mb-1">Misión Crítica</p>
                        <h3 className="text-[24px] font-black uppercase tracking-tighter text-white leading-none">Kyron <span className="text-blue-500">Shield</span></h3>
                    </div>
                    <div className="space-y-4 flex-1">
                        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                            <h4 className="font-black text-amber-400 uppercase text-[9px] tracking-widest mb-1">Reposición Express</h4>
                            <p className="text-[9px] text-slate-400 leading-relaxed">Reponemos hardware fiscal y equipos críticos en 1 hora ante fallas o robo (Caracas).</p>
                        </div>
                        <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                            <h4 className="font-black text-blue-400 uppercase text-[9px] tracking-widest mb-1">Telecom 5G Nativo</h4>
                            <p className="text-[9px] text-slate-400 leading-relaxed">Única plataforma que permite gestionar tus eSIMs corporativas directamente desde el portal.</p>
                        </div>
                        <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
                            <h4 className="font-black text-indigo-400 uppercase text-[9px] tracking-widest mb-1">Peritaje SENIAT</h4>
                            <p className="text-[9px] text-slate-400 leading-relaxed">Defensa técnica y legal inmediata ante cualquier proceso de fiscalización tributaria.</p>
                        </div>
                    </div>
                    <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 italic">"Tu negocio no se detiene, nosotros tampoco."</p>
                    </div>
                </div>

                {/* P6: FEEDBACK & MEJORA (Derecha) */}
                <div className="flex-1 p-10 flex flex-col relative z-10 bg-[#050816]">
                    <div className="absolute -right-16 -bottom-16 opacity-[0.05] pointer-events-none -rotate-12"><Target className="w-[400px] h-[400px] text-rose-500" /></div>
                    <div className="mb-6 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-rose-400/70 mb-1">Ayúdanos a Mejorar</p>
                        <h3 className="text-[24px] font-black uppercase tracking-tighter text-white leading-none">Encuesta <span className="text-rose-400">Elite</span></h3>
                    </div>
                    <div className="flex flex-col items-center flex-1 justify-center">
                        <div className="bg-white p-3 rounded-3xl shadow-[0_0_50px_rgba(244,63,94,0.3)] mb-5">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={QR_FEEDBACK} alt="QR Feedback" width={160} height={160} className="rounded-xl block" />
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed italic text-center px-4 mb-8">
                            "Tómate 2 minutos para evaluar la plataforma. Tus sugerencias impactan directamente en el futuro de Kyron."
                        </p>
                    </div>
                    <div className="mt-auto flex justify-between items-end pt-6 border-t border-white/5">
                        <Logo className="h-8 w-8 opacity-20" />
                        <p className="text-[7px] text-slate-700 font-black uppercase tracking-widest">System Kyron © 2026</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
