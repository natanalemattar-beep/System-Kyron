"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, 
    Mail, 
    Printer,
    Heart,
    Zap,
    Trophy,
    CreditCard,
    Smartphone,
    Sparkles,
    QrCode,
    Image,
    FileDown,
    ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    const [mode, setMode] = useState<'letter' | 'foto' | 'card'>('letter');
    const [currentLetter, setCurrentLetter] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = async () => {
        if (!exportRef.current) return;
        setIsExporting(true);
        toast({ title: "Generando PDF", description: "Procesando en alta resolución..." });
        try {
            const mod = await import('html2canvas');
const html2canvas = typeof mod === 'function' ? mod : (mod as any).default ?? mod;
            const jsPDF = (await import('jspdf')).default;
            const canvas = await html2canvas(exportRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const isLandscape = mode === 'foto';
            const pdf = new jsPDF({ orientation: isLandscape ? 'landscape' : 'portrait', unit: 'mm', format: 'a4' });
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();
            const ratio = canvas.width / canvas.height;
            const imgH = isLandscape ? pdfH : pdfW / ratio;
            const imgW = isLandscape ? pdfH * ratio : pdfW;
            const x = isLandscape ? (pdfW - imgW) / 2 : 0;
            const y = isLandscape ? 0 : (pdfH - imgH) / 2;
            pdf.addImage(imgData, 'JPEG', x, y, imgW, imgH);
            pdf.save(`SystemKyron_${mode}_${letters[currentLetter].id}.pdf`);
            toast({ title: "¡PDF listo!", description: "Descargado correctamente." });
        } catch (err) {
            console.error(err);
            toast({ variant: "destructive", title: "Error", description: "No se pudo generar el PDF." });
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
                        <button onClick={() => setMode('foto')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", mode === 'foto' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white")}>
                            <Image className="h-3.5 w-3.5" /> Foto
                        </button>
                        <button onClick={() => setMode('card')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2", mode === 'card' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white")}>
                            <CreditCard className="h-3.5 w-3.5" /> ID Card
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handlePrint}
                            className="h-12 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-white/10 active:scale-95"
                        >
                            <Printer className="h-4 w-4" />
                            <span className="hidden sm:inline">Imprimir</span>
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            disabled={isExporting}
                            className="h-12 px-8 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExporting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : <FileDown className="h-4 w-4" />}
                            <span className="hidden sm:inline">{isExporting ? 'Generando...' : 'Descargar PDF'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="relative z-10 pt-56 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center gap-20">
                
                {/* --- SELECCIÓN DE EMPRESA (Nodos Interactivos) --- */}
                <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6 no-print">
                    {letters.map((l, i) => (
                        <button 
                            key={l.id}
                            onClick={() => setCurrentLetter(i)}
                            className="group relative flex items-center gap-4 focus:outline-none"
                        >
                            <div className={cn(
                                "h-14 w-14 rounded-2xl border flex items-center justify-center transition-all duration-500",
                                currentLetter === i ? "bg-white border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] rotate-3" : "bg-black/40 border-white/10 hover:border-white/40 hover:rotate-3"
                            )}>
                                <l.icon className={cn("h-6 w-6", currentLetter === i ? "text-black" : "text-white/40")} />
                            </div>
                            <div className={cn(
                                "absolute left-20 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 transition-all duration-500 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 pointer-events-none",
                                currentLetter === i && "opacity-100 translate-x-2 border-white/20"
                            )}>
                                <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                    {l.company}
                                </span>
                            </div>
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
                            <div ref={exportRef} className="print-area bg-white text-zinc-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-16 md:p-24 flex flex-col relative overflow-hidden min-h-[1056px]">
                                {/* Header Minimalista de Alta Gama */}
                                <div className="flex justify-between items-start border-b-[4px] border-zinc-950 pb-12 mb-16">
                                    <div className="flex items-center gap-6">
                                        <div className="h-24 w-24 bg-zinc-950 rounded-[1.5rem] flex items-center justify-center p-5 shadow-2xl">
                                            <Image src="/images/logo.png" alt="Kyron" width={96} height={96} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">System Kyron</h2>
                                            <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.4em] mt-3 italic">Digital Sovereign Infrastructure</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col justify-between h-24">
                                        <p className="text-[12px] font-black uppercase tracking-widest text-zinc-400">RIF J-50832149-9</p>
                                        <p className="text-[12px] font-black uppercase tracking-widest text-zinc-950 italic">Caracas, Venezuela · 2026</p>
                                    </div>
                                </div>

                                {/* Contenido con Tipografía Editorial */}
                                <div className="flex-1 space-y-12">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-8 bg-cyan-600" />
                                            <p className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.4em]">Propuesta Institucional</p>
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-tight text-zinc-950">{letter.company}</h3>
                                        <p className="text-base font-bold text-zinc-500 uppercase tracking-widest">{letter.recipient}</p>
                                    </div>

                                    <div className="py-8 border-y-2 border-zinc-50 bg-zinc-50/30 px-8 -mx-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2.5 w-2.5 rounded-full bg-cyan-600" />
                                            <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">Referencia: {letter.subject}</p>
                                        </div>
                                    </div>

                                    <div className="text-zinc-800 text-2xl leading-[1.8] text-justify font-serif italic whitespace-pre-line first-letter:text-6xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-zinc-950">
                                        {letter.content}
                                    </div>
                                </div>

                                {/* Firma y Sello de Agua */}
                                <div className="mt-20 pt-16 border-t-2 border-zinc-50 flex justify-between items-end">
                                    <div className="space-y-10">
                                        <div className="relative">
                                            <Image src="/images/sign-sample.png" alt="Signature" width={200} height={100} className="h-24 opacity-30 absolute -top-16 left-0" />
                                            <div className="h-[2px] w-64 bg-zinc-950" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-zinc-950 uppercase tracking-tight">Carlos Mattar</p>
                                            <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-2 italic">Founder & Chief Executive Officer</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-6">
                                        <div className="relative h-28 w-28 border-2 border-zinc-100 rounded-[2rem] p-4 bg-zinc-50 shadow-inner rotate-12 group cursor-help transition-all hover:rotate-0">
                                            <Image src="/images/seal-sample.png" alt="Seal" width={112} height={112} className="w-full h-full object-contain opacity-20 grayscale" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ShieldCheck className="h-8 w-8 text-cyan-600" />
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-black text-zinc-200 uppercase tracking-[0.5em]">Audit Ready · System Kyron Official</p>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] rotate-[-45deg] pointer-events-none">
                                    <h1 className="text-[25rem] font-black">KYRON</h1>
                                </div>
                            </div>
                        </motion.div>
                    ) : mode === 'foto' ? (
                        // --- VISTA FOTO (SALTO ÁNGEL + LOGO KYRON) ---
                        <motion.div 
                            key="foto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-full max-w-5xl"
                        >
                            <div ref={exportRef} className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] border border-white/10">
                                 {/* Foto del Salto Ángel */}
                                 <Image
                                     src="/images/salto-angel.jpg"
                                     alt="Salto Ángel, Venezuela"
                                     fill
                                     className="absolute inset-0 w-full h-full object-cover"
                                 />
                                {/* Overlay sutil en la parte inferior para el logo */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                                {/* Badge Venezuela top-left */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
                                    <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Venezuela · Tepui</span>
                                </div>
                                {/* Logo + nombre System Kyron en esquina inferior derecha */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 shadow-2xl">
                                    <div className="h-12 w-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center p-2 shadow-inner">
                                        <Image src="/images/logo.png" alt="System Kyron" width={48} height={48} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-base font-black uppercase tracking-[0.15em] text-white leading-none">System Kyron</p>
                                        <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.4em] mt-1">Venezuela · 2026</p>
                                    </div>
                                </div>
                                {/* Título carta bottom-left */}
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Carta para</p>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">{letter.company}</h3>
                                </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4 print-area card-grid">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="relative aspect-[1.75/1] bg-zinc-950 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl group p-12 flex flex-col justify-between hover:border-white/20 transition-all">
                                        <div className="absolute inset-0 hud-grid opacity-[0.05]" />
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full translate-x-24 -translate-y-24" />
                                        
                                        <div className="relative flex justify-between items-start">
                                            <div className="flex items-center gap-5">
                                                <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-4 shadow-inner group-hover:bg-white/10 transition-all">
                                                    <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none text-white">System Kyron</h4>
                                                    <p className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.5em] italic">Sovereign Tech Infrastructure</p>
                                                </div>
                                            </div>
                                            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-cyan-500/10">
                                                <QrCode className="h-7 w-7 text-white/20 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="relative space-y-3">
                                            <h3 className="text-5xl font-black uppercase tracking-tight leading-none text-white">Carlos Mattar</h3>
                                            <div className="flex items-center gap-4">
                                                <div className="h-[2px] w-16 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]" />
                                                <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] italic">Founder & CEO</p>
                                            </div>
                                        </div>

                                        <div className="relative flex justify-between items-end border-t border-white/5 pt-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                    <Mail className="h-3.5 w-3.5 text-cyan-500" /> systemkyronofficial@gmail.com
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                    <Smartphone className="h-3.5 w-3.5 text-cyan-500" /> +58 424-1846016
                                                </div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Caracas · Venezuela</p>
                                                <p className="text-[9px] font-black text-cyan-500/20 uppercase tracking-[0.4em]">RIF J-50832149-9</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/20 blur-sm no-print animate-scanner" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- SELECCIÓN MÓVIL (Pills flotantes) --- */}
                <div className="lg:hidden no-print fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-3xl border border-white/10 p-2.5 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                    {letters.map((l, i) => (
                        <button
                            key={l.id}
                            onClick={() => setCurrentLetter(i)}
                            className={cn(
                                "px-8 h-14 rounded-full flex items-center gap-3 transition-all",
                                currentLetter === i ? "bg-white text-black shadow-xl scale-105" : "text-white/40 hover:bg-white/5"
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
                    className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-2xl shadow-cyan-600/40 border border-cyan-500/50 group"
                >
                    <Sparkles className="h-8 w-8 text-white" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-[#02040a] animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                </motion.button>
            </div>
        </div>
    );
}
