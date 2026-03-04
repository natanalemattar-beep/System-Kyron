
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Printer, 
  ArrowRight, 
  Send, 
  Radio, 
  Magnet, 
  ShieldCheck, 
  Zap,
  Cpu,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

const proposalSections = [
    {
        icon: Radio,
        title: "Kyron Hyper-Connect 5G",
        desc: "Asignación inmediata de números y eSIMs digitales con protocolo de baja latencia para flotas corporativas."
    },
    {
        icon: Magnet,
        title: "Ecosistema de Reciclaje Magnético",
        desc: "Implementación de Smart Bins con tecnología de inducción para la trazabilidad de activos verdes."
    },
    {
        icon: ShieldCheck,
        title: "Blindaje Fiscal con IA",
        desc: "Automatización total de libros y declaraciones con auditoría predictiva contra la Gaceta Oficial."
    },
    {
        icon: Cpu,
        title: "Ledger Inmutable (Blockchain)",
        desc: "Sellado digital de cada transacción para garantizar integridad absoluta ante fiscalizaciones."
    }
];

export default function PropuestaProyectoPage() {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAction = (action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVO`,
            description: "El documento ha sido procesado bajo cifrado AES-512.",
        });
        window.print();
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20 animate-in fade-in duration-1000">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-proposal, #printable-report * { visibility: visible; }
                        #printable-proposal { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 no-print border-l-4 border-primary pl-8 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <FileText className="h-3 w-3" /> Business Proposal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Propuesta <span className="text-primary">Maestra</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Alianza Estratégica • Ecosistema Kyron</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5" onClick={() => handleAction('impresión')}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={() => handleAction('descarga')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR DOC
                    </Button>
                </div>
            </header>

            <div id="printable-proposal" className="max-w-5xl mx-auto space-y-10">
                <Card className="glass-card border-white/5 rounded-[3rem] overflow-hidden shadow-2xl bg-black/40">
                    <CardHeader className="p-12 md:p-20 text-center relative border-b border-white/5 bg-white/[0.01]">
                        <div className="absolute top-10 left-10 opacity-20">
                            <Logo className="h-12 w-12" />
                        </div>
                        <div className="mx-auto w-fit mb-10 bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20">
                            <Logo className="h-20 w-20" />
                        </div>
                        <CardTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-4 italic-shadow">EFICIENCIA Y FINANZAS <br/> DEL FUTURO</CardTitle>
                        <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-xs md:text-sm">Expediente de Proyecto 2026</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-12 md:p-20 space-y-20">
                        {/* Summary */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">1. Visión Ejecutiva</h3>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <p className="text-lg md:text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-10">
                                System Kyron no es solo software; es una capa de inteligencia operativa que fusiona telecomunicaciones de alta velocidad con un blindaje legal inmutable. Nuestra propuesta garantiza la eliminación del riesgo fiscal y la optimización del 100% de los procesos administrativos en territorio nacional e internacional.
                            </p>
                        </section>

                        {/* Pillars */}
                        <section className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">2. Pilares Tecnológicos</h3>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {proposalSections.map((sec, i) => (
                                    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                                        <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 shadow-inner border border-primary/10 group-hover:scale-110 transition-transform">
                                            <sec.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h4 className="font-black uppercase text-sm tracking-widest text-white mb-3 italic">{sec.title}</h4>
                                        <p className="text-xs font-bold text-white/30 uppercase leading-relaxed">{sec.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Benefits */}
                        <section className="bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-glow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Zap className="h-40 w-40" />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-4 relative z-10">
                                <Globe className="h-6 w-6" /> Ventaja Competitiva
                            </h3>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    "Gestión 360°: Un único nodo para telecom, finanzas y leyes.",
                                    "Cumplimiento Total: IA sincronizada con la Gaceta Oficial 24/7.",
                                    "Trazabilidad Verde: Monetización de hábitos de reciclaje.",
                                    "Escalabilidad ZEDU: Preparado para Zonas Económicas Especiales."
                                ].map((b, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-bold italic">
                                        <ChevronRight className="h-5 w-5 text-white/40" /> {b}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </CardContent>
                    
                    <CardFooter className="p-12 md:p-20 border-t border-white/5 flex flex-col items-center gap-10 bg-white/[0.01]">
                        <div className="text-center space-y-4">
                            <div className="w-48 h-[2px] bg-white/20 mx-auto"></div>
                            <p className="font-black text-[10px] uppercase tracking-[0.5em] text-white/40">Dirección de Estrategia • System Kyron, C.A.</p>
                        </div>
                        <Button size="lg" className="h-16 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl no-print">
                            AGENDAR DEMOSTRACIÓN TÉCNICA <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
