
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, PlusCircle, CheckCircle, FileText, Activity, Terminal, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function MinisterioTransportePage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Truck className="h-3 w-3" /> NODO LOGÍSTICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Transporte</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Permisología de Flota y Concesiones Viales • 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    REGISTRAR UNIDAD
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Truck className="h-32 w-32" /></div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8">Gestión de Guías de Movilización</h3>
                    <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                        Emisión automatizada de guías SICA/SADA y permisos de transporte terrestre para carga pesada y materiales estratégicos.
                    </p>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar Guía</Button>
                </Card>

                <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6">Cumplimiento de Flota</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-border/50 pb-3">
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Certificado de Revisión</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black">VIGENTE</Badge>
                            </div>
                            <div className="flex justify-between items-center border-b border-border/50 pb-3">
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Seguro de Carga</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black">ACTIVO</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 flex items-center gap-3 text-[9px] font-black uppercase text-primary/40 italic">
                        <ShieldCheck className="h-4 w-4" /> Auditoría de Unidades s/norma INTT
                    </div>
                </Card>
            </div>
        </div>
    );
}
