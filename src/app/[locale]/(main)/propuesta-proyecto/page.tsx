
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Printer, 
  ArrowRight, 
  Radio, 
  Magnet, 
  ShieldCheck, 
  Zap,
  Cpu,
  Globe,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const proposalSections = [
    {
        icon: Radio,
        title: "Kyron Hyper-Connect 5G",
        desc: "Asignación inmediata de números telefónicos y eSIMs digitales con protocolo de baja latencia para flotas corporativas.",
        color: "text-blue-400"
    },
    {
        icon: Magnet,
        title: "Ecosistema Magnético IA",
        desc: "Implementación de Smart Bins con tecnología de inducción para la trazabilidad inmutable de activos verdes y residuos.",
        color: "text-emerald-400"
    },
    {
        icon: ShieldCheck,
        title: "Blindaje Fiscal 360°",
        desc: "Automatización total de libros y declaraciones con auditoría predictiva sincronizada con la Gaceta Oficial 24/7.",
        color: "text-amber-400"
    },
    {
        icon: Cpu,
        title: "Ledger Blockchain",
        desc: "Sellado digital de cada transacción para garantizar integridad absoluta ante fiscalizaciones y auditorías externas.",
        color: "text-purple-400"
    }
];

export default function PropuestaProyectoPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: "Documento procesado bajo cifrado de alta fidelidad.",
        });
        window.print();
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20 animate-in fade-in duration-1000 bg-black min-h-screen">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-proposal, #printable-proposal * { visibility: visible; }
                        #printable-proposal { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 no-print border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <FileText className="h-3 w-3" /> Proposal Node: 2025
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-foreground">Propuesta <span className="text-primary">Estratégica</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Consolidado Técnico de Innovación • System Kyron</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => handleAction('impresión')}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={() => handleAction('descarga')}>
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR DOC
                    </Button>
                </div>
            </header>

            <div id="printable-proposal" className="max-w-5xl mx-auto space-y-10">
                <Card className="glass-card border-white/5 rounded-[3rem] overflow-hidden shadow-2xl bg-black/40">
                    <CardHeader className="p-12 md:p-20 text-center relative border-b border-white/5 bg-white/[0.01]">
                        <div className="absolute top-10 left-10 opacity-20"><Logo className="h-12 w-12" /></div>
                        <div className="mx-auto w-fit mb-10 bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20"><Logo className="h-20 w-20" /></div>
                        <CardTitle className="text-3xl md:text-5xl font-black uppercase tracking-tight italic text-white mb-4 leading-tight">EFICIENCIA Y FINANZAS <br/> DEL FUTURO</CardTitle>
                        <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-xs md:text-sm">Proyecto Maestro de Gestión Integral 2025</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-12 md:p-20 space-y-20">
                        <section className="space-y-8">
                            <div className="flex items-center gap-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">1. Visión Maestra</h3>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <p className="text-lg md:text-xl font-medium italic text-muted-foreground leading-relaxed text-justify border-l-4 border-primary/20 pl-10">
                                System Kyron no es solo software; es un centro de inteligencia operativa que fusiona telecomunicaciones 5G, tecnología de reciclaje magnético y un blindaje legal inmutable. Nuestra propuesta elimina el riesgo fiscal y optimiza el 100% de los procesos administrativos mediante IA predictiva.
                            </p>
                        </section>

                        <section className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">2. Pilares de Innovación</h3>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {proposalSections.map((sec, i) => (
                                    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                                        <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                                            <sec.icon className={cn("h-6 w-6", sec.color)} />
                                        </div>
                                        <h4 className="font-black uppercase text-sm tracking-widest text-white mb-3 italic">{sec.title}</h4>
                                        <p className="text-xs font-bold text-muted-foreground/50 uppercase leading-relaxed">{sec.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-glow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="h-40 w-40" /></div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-8 flex items-center gap-4 relative z-10"><Globe className="h-6 w-6" /> Ventaja de Ecosistema</h3>
                            <ul className="space-y-6 relative z-10">
                                {["Centralización Total: Un solo centro para telecom, finanzas y leyes.", "Cumplimiento Predictivo: IA auditando cada factura contra la ley vigente.", "Monetización Sostenible: Transformación de residuos en activos digitales.", "Seguridad de Grado Militar: Cifrado AES-256 y Blockchain Ledger."].map((b, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-bold italic"><ChevronRight className="h-5 w-5 text-muted-foreground/60" /> {b}</li>
                                ))}
                            </ul>
                        </section>
                    </CardContent>
                    
                    <CardFooter className="p-12 md:p-20 border-t border-white/5 flex flex-col items-center gap-10 bg-white/[0.01]">
                        <div className="text-center space-y-4">
                            <div className="w-48 h-[2px] bg-white/20 mx-auto"></div>
                            <p className="font-black text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60">Dirección de Estrategia Maestra • System Kyron</p>
                        </div>
                        <Button size="lg" className="h-16 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl no-print">
                            SOLICITAR AUDITORÍA DEL CENTRO <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
