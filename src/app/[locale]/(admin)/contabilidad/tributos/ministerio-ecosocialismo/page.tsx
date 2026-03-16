
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, PlusCircle, CheckCircle, FileText, Activity, Terminal, Recycle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function MinisterioEcosocialismoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Leaf className="h-3 w-3" /> NODO AMBIENTAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Ecosocialismo</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Permisología Ambiental y Gestión de Residuos • 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    DECLARAR DESECHOS
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Actividades Capaces de Degradar el Ambiente (RACDA)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner text-center">
                                    <p className="text-[9px] font-black uppercase text-primary/60 mb-2">Estatus RACDA</p>
                                    <p className="text-2xl font-black italic text-foreground tracking-tighter">VIGENTE</p>
                                </div>
                                <div className="p-6 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner text-center">
                                    <p className="text-[9px] font-black uppercase text-primary/60 mb-2">Huella de Carbono</p>
                                    <p className="text-2xl font-black italic text-foreground tracking-tighter">BAJA</p>
                                </div>
                            </div>
                            <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Obligaciones Mensuales</h4>
                                <ul className="space-y-3">
                                    {["Manifiesto de Generación de Desechos Peligrosos", "Control de Emisiones Atmosféricas", "Auditoría de Planta de Tratamiento"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-tight text-foreground/60">
                                            <CheckCircle className="h-4 w-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5">
                    <Card className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow-secondary border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Recycle className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Economía Circular</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify">
                            System Kyron integra la telemetría de sus Smart Bins directamente con el Manifiesto de Desechos del MINEC, automatizando el 90% de la carga administrativa ambiental.
                        </p>
                        <Button variant="secondary" className="w-full h-12 bg-white text-secondary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">VER TABLERO VERDE</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
