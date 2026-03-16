
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palmtree, PlusCircle, CheckCircle, FileText, Activity, Terminal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function MinisterioTurismoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Palmtree className="h-3 w-3" /> NODO TURÍSTICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Turismo</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Prestadores de Servicios (RTN) • 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    ACTUALIZAR RTN
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                    <div className="space-y-8">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform w-fit">
                            <Star className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Contribución 1% INATUR</h3>
                            <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase text-justify">
                                Liquidación mensual obligatoria para prestadores de servicios turísticos. El sistema calcula la tasa basada en los ingresos brutos del periodo declarados en el TPV.
                            </p>
                        </div>
                    </div>
                    <div className="pt-10">
                        <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar Declaración</Button>
                    </div>
                </Card>

                <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary italic">Estatus RTN Corporativo</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="flex justify-between items-center border-b border-border/50 pb-4">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Nro. de Registro</span>
                            <span className="text-xs font-black font-mono">RTN-2026-00456</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-4">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Categoría</span>
                            <span className="text-xs font-black uppercase italic">Servicios Corporativos</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Vencimiento</span>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase">31 DIC 2026</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
