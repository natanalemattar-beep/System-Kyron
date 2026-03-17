
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    ShieldCheck, 
    FileText, 
    CheckCircle, 
    Activity, 
    Terminal, 
    Download, 
    Eye, 
    Layers, 
    Scale,
    ClipboardCheck,
    Search,
    Wand2,
    Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const isoManuals = [
    { 
        id: "M-CAL-001", 
        title: "Manual de Calidad Maestro", 
        desc: "Define la política de calidad, objetivos y el alcance del SGC en System Kyron.",
        status: "Vigente",
        lastReview: "15/01/2026",
        owner: "Dirección General"
    },
    { 
        id: "P-RSK-002", 
        title: "Gestión de Riesgos y Oportunidades", 
        desc: "Procedimiento para identificar, evaluar y mitigar riesgos corporativos y operativos.",
        status: "Vigente",
        lastReview: "10/02/2026",
        owner: "Área Estratégica"
    },
    { 
        id: "P-DOC-003", 
        title: "Control de Información Documentada", 
        desc: "Protocolo de sellado inmutable y archivo de registros en el Ledger digital.",
        status: "Vigente",
        lastReview: "01/03/2026",
        owner: "Centro de Datos"
    },
    { 
        id: "P-AUD-004", 
        title: "Auditoría Interna y Cumplimiento", 
        desc: "Cronograma y metodología de inspección forense asistida por Inteligencia Artificial.",
        status: "Vigente",
        lastReview: "Hoy",
        owner: "Oficial de Cumplimiento"
    },
    { 
        id: "P-COR-005", 
        title: "Acciones Correctivas y Mejora", 
        desc: "Gestión de no conformidades y bucles de optimización continua del sistema.",
        status: "Vigente",
        lastReview: "28/02/2026",
        owner: "Gestión de Procesos"
    }
];

export default function IsoManualsPage() {
    const { toast } = useToast();
    const [search, setSearch] = useState("");

    const handleAction = (id: string, action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: `Documento ${id} procesado bajo norma ISO 9001:2015.`,
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const filteredManuals = isoManuals.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase()) || 
        m.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow-secondary mb-4">
                        <ShieldCheck className="h-3 w-3" /> NODO DE CALIDAD
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Manuales <span className="text-emerald-500 italic">ISO 9001</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Sistema de Gestión de Calidad • Certificación 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                        <Settings className="mr-3 h-4 w-4" /> CONFIGURAR SGC
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <Wand2 className="mr-3 h-4 w-4" /> AUDITORÍA IA
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Cumplimiento Normativo", val: "100%", color: "text-emerald-500", icon: CheckCircle },
                    { label: "Documentos Sellados", val: "1,245", color: "text-primary", icon: Lock },
                    { label: "No Conformidades", val: "0", color: "text-emerald-500", icon: ShieldCheck },
                    { label: "Última Auditoría", val: "EXITOSA", color: "text-primary", icon: Activity },
                ].map((stat, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <p className={cn("text-2xl font-black italic tracking-tighter leading-none", stat.color)}>{stat.val}</p>
                    </Card>
                ))}
            </div>

            <div className="mb-10">
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input 
                        placeholder="Buscar manual o procedimiento..." 
                        className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest text-foreground placeholder:text-muted-foreground/20" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredManuals.map((manual, idx) => (
                        <motion.div
                            key={manual.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card className="glass-card border-none rounded-[2.5rem] bg-card/40 overflow-hidden shadow-2xl group hover:border-emerald-500/20 transition-all">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-20 bg-muted/30 flex items-center justify-center border-r border-border/50">
                                        <span className="text-xl font-black text-foreground/5 uppercase lg:vertical-text tracking-tighter group-hover:text-emerald-500/10 transition-colors">ISO-9001</span>
                                    </div>
                                    <div className="flex-1 p-8 md:p-10 space-y-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase tracking-widest px-3 h-6 rounded-lg">{manual.status}</Badge>
                                                    <p className="text-[10px] font-mono font-black text-primary italic uppercase">{manual.id}</p>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">{manual.title}</h3>
                                                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase leading-relaxed max-w-2xl">{manual.desc}</p>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <p className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Responsable</p>
                                                <p className="text-[10px] font-black uppercase italic text-foreground/80">{manual.owner}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40">Última Revisión</p>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-foreground">
                                                        <CalendarClock className="h-3.5 w-3.5 text-primary/40" />
                                                        {manual.lastReview}
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40">Integridad</p>
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                                                        <ShieldCheck className="h-3.5 w-3.5" /> SELLADO
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 w-full sm:w-auto">
                                                <Button variant="outline" className="flex-1 sm:flex-none h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10" onClick={() => handleAction(manual.id, 'visualización')}>
                                                    <Eye className="mr-2 h-3.5 w-3.5" /> VER
                                                </Button>
                                                <Button variant="outline" className="flex-1 sm:flex-none h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10" onClick={() => handleAction(manual.id, 'descarga')}>
                                                    <Download className="mr-2 h-3.5 w-3.5" /> BAJAR .PDF
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <Card className="glass-card border-none bg-[#050505] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Terminal className="h-48 w-48 text-emerald-500" /></div>
                <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <ClipboardCheck className="h-10 w-10 text-emerald-500 animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">Política Integrada de <br/> Calidad y Seguridad</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-emerald-500/20 pl-10">
                            System Kyron se compromete a la excelencia operativa mediante el cumplimiento estricto del estándar ISO 9001:2015. Nuestro sistema no solo registra procesos, sino que garantiza que cada manual sea una directriz inmutable, auditada por algoritmos de IA para eliminar la variabilidad y el error humano en la gestión de servicios.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500 mb-10 flex items-center gap-3 italic">
                            <Activity className="h-4 w-4" /> Telemetría de Calidad v2.6.5
                        </h4>
                        <div className="space-y-6">
                            {[
                                { label: "Madurez del SGC", val: "98.4%", color: "text-emerald-400" },
                                { label: "Estandarización", val: "ALTA", color: "text-blue-400" },
                                { label: "Control Ledger", val: "VERIFIED", color: "text-primary" }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4 last:border-none last:pb-0">
                                    <span>{stat.label}</span>
                                    <span className={cn("font-black italic text-sm", stat.color)}>{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function CalendarClock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 0-9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="m16 18 2 2 4-4" />
      <path d="M12 7v5l2 2" />
    </svg>
  )
}
