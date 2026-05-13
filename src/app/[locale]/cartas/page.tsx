"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, 
    Download, 
    ChevronLeft, 
    ChevronRight, 
    Mail, 
    Printer,
    ArrowLeft,
    Building2,
    Heart,
    Zap,
    Trophy,
    CreditCard,
    Smartphone,
    Globe,
    Sparkles,
    CheckCircle2,
    QrCode,
    Maximize2,
    FileDown,
    Lock,
    Unlock,
    Users,
    Layout,
    Presentation,
    ArrowRight,
    Search,
    ShieldCheck,
    Cpu,
    ExternalLink
} from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ResourceHeader } from "@/components/brand/ResourceHeader";

const letters = [
    {
        id: "coca-cola",
        company: "Coca-Cola FEMSA",
        recipient: "Gerencia de Innovación Operativa",
        subject: "Alianza Estratégica: Digitalización de Procesos Críticos",
        icon: Trophy,
        color: "rose",
        content: `
            Distinguidos señores de Coca-Cola FEMSA,

            Es un honor para System Kyron dirigirse a una organización que es referente mundial de eficiencia y compromiso social. Nuestra plataforma, diseñada para la soberanía digital del emprendimiento venezolano, encuentra en su trayectoria la inspiración necesaria para escalar soluciones de alto impacto.

            Reconocemos su labor titánica en la cadena de distribución y su apoyo constante al microempresario. System Kyron propone una integración algorítmica que simplifica la carga fiscal y operativa de sus aliados comerciales, garantizando que el foco permanezca en la productividad y el crecimiento mutuo.

            Agradecemos su visión vanguardista en el Reto InspiraVe 2026 y quedamos a su entera disposición para explorar sinergias tecnológicas que sigan refrescando el futuro de nuestra nación.

            Atentamente,
        `
    },
    {
        id: "inter",
        company: "Inter (Corporación Telemic)",
        recipient: "Dirección de Infraestructura y Redes",
        subject: "Sinergia Tecnológica: Conectividad y Automatización",
        icon: Zap,
        color: "cyan",
        content: `
            Estimados aliados de Inter,

            La conectividad es el sistema nervioso de la economía moderna. En System Kyron, entendemos que nuestra arquitectura SaaS solo es posible gracias a la robustez de la red que ustedes han construido con esfuerzo y visión país.

            Esta carta es un reconocimiento a su papel fundamental como habilitadores del ecosistema digital. Gracias a su infraestructura, emprendedores en cada rincón de Venezuela pueden hoy acceder a herramientas de gestión que antes eran exclusivas de grandes corporaciones.

            Valoramos profundamente nuestra relación técnica y aspiramos a seguir integrando sus capacidades de red en nuestro ecosistema operativo, logrando una simbiosis perfecta entre conectividad y automatización.

            Sigan conectando sueños, sigan conectando el futuro.

            Con gratitud,
        `
    },
    {
        id: "chevere-salud",
        company: "Chévere Salud",
        recipient: "Dirección de Bienestar y Seguros",
        subject: "Acuerdo de Protección Social para la Red Kyron",
        icon: Heart,
        color: "emerald",
        content: `
            Distinguidos directivos de Chévere Salud,

            En el corazón de System Kyron reside la convicción de que la tecnología debe servir al ser humano. Admiramos profundamente cómo Chévere Salud ha transformado el concepto de asistencia médica en Venezuela, priorizando la dignidad y la accesibilidad.

            Nuestra plataforma busca proteger al emprendedor no solo en lo fiscal, sino en su integridad personal. Vemos en su modelo de gestión de salud un espejo de lo que queremos lograr en la gestión administrativa: tranquilidad, precisión y calidad humana.

            Agradecemos su compromiso con la salud del motor productivo del país y esperamos consolidar alianzas que permitan a cada usuario de Kyron contar con el respaldo de una infraestructura de bienestar tan sólida como la suya.

            Por un futuro más saludable y productivo,
        `
    }
];

export default function CartasAgradecimientoPage() {
    const { toast } = useToast();
    const [mode, setMode] = useState<'letter' | 'presentation' | 'card'>('letter');
    const [currentLetter, setCurrentLetter] = useState(0);
    const [context, setContext] = useState<'public' | 'private'>('private');
    const [isExporting, setIsExporting] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    const handlePrint = () => {
        window.print();
    };

    const handleExportImage = async () => {
        if (!slideRef.current) return;
        setIsExporting(true);
        toast({ title: "Generando Asset", description: "Procesando imagen en alta resolución..." });

        try {
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(slideRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#020617',
            });
            
            const link = document.createElement('a');
            link.download = `Kyron_${mode.toUpperCase()}_${letters[currentLetter].id}.png`;
            link.href = dataUrl;
            link.click();
            toast({ title: "¡Listo!", description: "Asset descargado correctamente." });
        } catch (err) {
            console.error(err);
            toast({ variant: "destructive", title: "Error", description: "No se pudo generar la imagen." });
        } finally {
            setIsExporting(false);
        }
    };

    const letter = letters[currentLetter];

    return (
        <div className="min-h-screen bg-[#02040a] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30 overflow-x-hidden">
            <ResourceHeader />
            
            <style jsx global>{`
                @media print {
                    @page { size: letter; margin: 0; }
                    body { background: white !important; color: black !important; -webkit-print-color-adjust: exact !important; }
                    .no-print { display: none !important; }
                    .print-area { display: block !important; width: 100% !important; margin: 0 !important; background: white !important; }
                    .card-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10mm !important; padding: 10mm !important; }
                }
                .hud-grid {
                    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 30px 30px;
                }
                @keyframes scanner { 0% { top: 0; } 100% { top: 100%; } }
                .animate-scanner { animation: scanner 4s linear infinite; }
            `}</style>

            {/* --- BACKGROUND DECOR --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div 
                    className="absolute w-[800px] h-[800px] rounded-full opacity-[0.05] blur-[120px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600"
                    style={{ left: mousePos.x - 400, top: mousePos.y - 400, transition: 'all 0.3s cubic-bezier(0.1, 0, 0, 1)' }}
                />
                <div className="absolute inset-0 hud-grid" />
            </div>

            {/* --- TITANIUM TOOLBAR --- */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-6 no-print">
                <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/5">
                        <button onClick={() => setMode('letter')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", mode === 'letter' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white")}>
                            <FileText className="h-3.5 w-3.5" /> Carta
                        </button>
                        <button onClick={() => setMode('presentation')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", mode === 'presentation' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white")}>
                            <Presentation className="h-3.5 w-3.5" /> Paisaje
                        </button>
                        <button onClick={() => setMode('card')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", mode === 'card' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white")}>
                            <CreditCard className="h-3.5 w-3.5" /> ID Card
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-4 px-6">
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" onClick={() => setContext('private')} className={cn("cursor-pointer border-none px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all", context === 'private' ? "bg-blue-600 text-white" : "bg-white/5 text-white/40 hover:text-white")}>Privado</Badge>
                            <Badge variant="outline" onClick={() => setContext('public')} className={cn("cursor-pointer border-none px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all", context === 'public' ? "bg-emerald-600 text-white" : "bg-white/5 text-white/40 hover:text-white")}>Público</Badge>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={mode === 'presentation' ? handleExportImage : handlePrint}
                            className="h-12 px-8 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-95"
                        >
                            {mode === 'presentation' ? <Download className="h-4 w-4" /> : <Printer className="h-4 w-4" />}
                            <span className="hidden sm:inline">{mode === 'presentation' ? 'Descargar PNG' : 'Imprimir'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="relative z-10 pt-56 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center gap-20">
                
                {/* --- SIDEBAR SELECTION (VIRTUAL NODES) --- */}
                <div className="fixed left-10 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-6 no-print">
                    {letters.map((l, i) => (
                        <button 
                            key={l.id}
                            onClick={() => setCurrentLetter(i)}
                            className="group relative flex items-center gap-4"
                        >
                            <div className={cn(
                                "h-14 w-14 rounded-2xl border flex items-center justify-center transition-all duration-500",
                                currentLetter === i ? "bg-white border-white scale-110 shadow-2xl shadow-white/20" : "bg-black/40 border-white/10 hover:border-white/40"
                            )}>
                                <l.icon className={cn("h-6 w-6", currentLetter === i ? "text-black" : "text-white/40")} />
                            </div>
                            <span className={cn(
                                "absolute left-20 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2",
                                currentLetter === i ? "text-white" : "text-white/40"
                            )}>
                                {l.company}
                            </span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'letter' ? (
                        // --- VISTA CARTA (ESTILO EDITORIAL DE LUJO) ---
                        <motion.div 
                            key="letter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-4xl"
                        >
                            <div className="print-area bg-white text-zinc-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-20 flex flex-col relative overflow-hidden min-h-[1056px]">
                                {/* Header Minimalista de Alta Gama */}
                                <div className="flex justify-between items-start border-b-[3px] border-zinc-950 pb-12 mb-16">
                                    <div className="flex items-center gap-6">
                                        <div className="h-20 w-20 bg-zinc-950 rounded-[1.5rem] flex items-center justify-center p-4 shadow-2xl">
                                            <img src="/images/logo-transparent.png" alt="Kyron" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">System Kyron</h2>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mt-2 italic">Infrastructure · Telecom · Legal</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col justify-between h-20">
                                        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">RIF J-50832149-9</p>
                                        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-950 italic">Caracas, Mayo 2026</p>
                                    </div>
                                </div>

                                {/* Contenido con Tipografía Editorial */}
                                <div className="flex-1 space-y-12">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-4">Comunicación Institucional</p>
                                        <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{letter.company}</h3>
                                        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{letter.recipient}</p>
                                    </div>

                                    <div className="py-8 border-y-2 border-zinc-50">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-cyan-600" />
                                            <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">Asunto: {letter.subject}</p>
                                        </div>
                                    </div>

                                    <div className="text-zinc-800 text-xl leading-[1.8] text-justify font-serif italic whitespace-pre-line first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                                        {letter.content}
                                    </div>
                                </div>

                                {/* Firma y Sello de Agua */}
                                <div className="mt-20 pt-16 border-t-2 border-zinc-50 flex justify-between items-end">
                                    <div className="space-y-8">
                                        <div className="relative">
                                            <img src="/images/sign-sample.png" alt="Signature" className="h-20 opacity-20 absolute -top-12 left-0" />
                                            <div className="h-[2px] w-56 bg-zinc-950" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-zinc-950 uppercase tracking-tight">Carlos Mattar</p>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-1 italic">Founder & Chief Executive Officer</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-6">
                                        <div className="h-24 w-24 border-2 border-zinc-100 rounded-3xl p-3 opacity-20 grayscale hover:opacity-100 transition-all cursor-help rotate-12">
                                            <img src="/images/seal-sample.png" alt="Seal" className="w-full h-full object-contain" />
                                        </div>
                                        <p className="text-[8px] font-black text-zinc-200 uppercase tracking-[0.5em]">Authentic Documentation Protocol</p>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] rotate-[-45deg] pointer-events-none">
                                    <h1 className="text-[20rem] font-black">KYRON</h1>
                                </div>
                            </div>
                        </motion.div>
                    ) : mode === 'presentation' ? (
                        // --- VISTA PAISAJE (TITANIUM SLIDE) ---
                        <motion.div 
                            key="presentation"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-full max-w-6xl aspect-[16/9] relative"
                            ref={slideRef}
                        >
                            <div className="absolute inset-0 bg-[#020617] rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] flex flex-col">
                                <div className="absolute inset-0 hud-grid opacity-[0.03]" />
                                <div className={cn("absolute -top-1/4 -right-1/4 w-[800px] h-[800px] blur-[150px] rounded-full opacity-30", context === 'public' ? "bg-emerald-600" : "bg-cyan-600")} />
                                
                                <div className="relative z-10 h-full p-20 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-6">
                                            <div className={cn("h-1.5 w-16 rounded-full", context === 'public' ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" : "bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]")} />
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white/30 italic">Propuesta {context === 'public' ? 'Pública' : 'Privada'}</h3>
                                                <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-none">{letter.company}</h2>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-6">
                                            <div className="h-24 w-24 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex items-center justify-center p-5 shadow-2xl">
                                                <img src="/images/logo-transparent.png" alt="Kyron" className="w-full h-full object-contain" />
                                            </div>
                                            <Badge className={cn("px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-none shadow-xl", context === 'public' ? "bg-emerald-500 text-white" : "bg-cyan-600 text-white")}>
                                                Kyron Partner Network
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-center py-10">
                                        <div className="max-w-4xl space-y-10">
                                            <p className="text-5xl font-medium leading-[1.2] text-zinc-300 italic font-serif">
                                                "{letter.content.split('\n')[2].trim()}"
                                            </p>
                                            <div className="flex gap-16">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                                        <letter.icon className={cn("h-8 w-8", context === 'public' ? "text-emerald-400" : "text-cyan-400")} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Protocolo de Alianza</p>
                                                        <p className="text-lg font-black text-white uppercase tracking-tight italic">{letter.id}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                                        <ShieldCheck className={cn("h-8 w-8", context === 'public' ? "text-emerald-400" : "text-cyan-400")} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Estado de Verificación</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                                            <p className="text-lg font-black text-white uppercase tracking-tight">100% Determinista</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end border-t border-white/5 pt-10">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                                                <Cpu className="h-7 w-7 text-cyan-400 animate-pulse" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-black uppercase tracking-widest text-white">System Kyron Infrastructure</p>
                                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Operational Ecosystem v3.1 Ultra</p>
                                            </div>
                                        </div>
                                        <div className="text-[12px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                                            RETO INSPIRAVE 2026 // CARACAS
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-500/30 blur-md animate-scanner opacity-50" />
                            </div>
                        </motion.div>
                    ) : (
                        // --- VISTA ID CARD (PREMIUM CEO BADGE) ---
                        <motion.div 
                            key="card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-full max-w-5xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 print-area card-grid">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="relative aspect-[1.75/1] bg-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl group p-10 flex flex-col justify-between">
                                        <div className="absolute inset-0 hud-grid opacity-[0.05]" />
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 blur-[60px] rounded-full translate-x-16 -translate-y-16" />
                                        
                                        <div className="relative flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-3 shadow-inner">
                                                    <img src="/images/logo-transparent.png" alt="Logo" className="w-full h-full object-contain" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-lg font-black uppercase tracking-tighter italic leading-none">System Kyron</h4>
                                                    <p className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.4em] italic">Sovereign Tech Infrastructure</p>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                <QrCode className="h-6 w-6 text-white/20 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="relative space-y-2">
                                            <h3 className="text-4xl font-black uppercase tracking-tight leading-none text-white">Carlos Mattar</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" />
                                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">Founder & CEO</p>
                                            </div>
                                        </div>

                                        <div className="relative flex justify-between items-end border-t border-white/5 pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest">
                                                    <Mail className="h-3 w-3 text-cyan-500" /> systemkyronofficial@gmail.com
                                                </div>
                                                <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest">
                                                    <Smartphone className="h-3 w-3 text-cyan-500" /> +58 424-1846016
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">Caracas · Venezuela</p>
                                                <p className="text-[8px] font-black text-cyan-500/20 uppercase tracking-[0.3em] mt-1">RIF J-50832149-9</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 blur-sm no-print animate-scanner" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- MODO MOVIL: SELECCIÓN DE EMPRESA --- */}
                <div className="xl:hidden no-print fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-3xl border border-white/10 p-2 rounded-[2rem] shadow-2xl">
                    {letters.map((l, i) => (
                        <button
                            key={l.id}
                            onClick={() => setCurrentLetter(i)}
                            className={cn(
                                "px-6 h-14 rounded-2xl flex items-center gap-3 transition-all",
                                currentLetter === i ? "bg-white text-black shadow-xl" : "text-white/40 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <l.icon className="h-5 w-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{l.company.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </main>

            {/* --- AI FLOATING ASSISTANT --- */}
            <div className="fixed bottom-10 right-10 z-[100] no-print">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toast({ title: "Kyron Nexus Core", description: "Auditando consistencia visual de activos... Status: 100% OK." })}
                    className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-2xl shadow-cyan-600/40 border border-cyan-500/50 group"
                >
                    <Sparkles className="h-8 w-8 text-white" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-[#02040a] animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                </motion.button>
            </div>
        </div>
    );
}
