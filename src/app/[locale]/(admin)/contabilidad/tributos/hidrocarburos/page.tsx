
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Download, CircleCheck as CheckCircle, Activity, Terminal, ShieldCheck, CirclePlus as PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function HidrocarburosPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Zap className="h-3 w-3" /> NODO SECTORIAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Hidrocarburos <span className="text-primary italic">y Minería</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Régimen Especial Sin Regalías • Providencia 0091</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => toast({ title: "DECLARACIÓN SECTORIAL INICIADA" })}>
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR ACTIVIDAD
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Empresa Petrolera/Minera</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Dossier Sectorial</h4>
                                    <ul className="space-y-3">
                                        {["Certificación de NO Regalías", "RIF Sectorial Petrolero", "Permiso de Operación Ministerio Petróleo", "Balance de Reservas"].map((doc, i) => (
                                            <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                                <CheckCircle className="h-4 w-4 text-primary" /> {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 bg-white/[0.03] border border-border rounded-2xl">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase text-muted-foreground/40">Estatus Sectorial</span>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none h-6 px-3 text-[8px] font-black uppercase">CERTIFICADO</Badge>
                                        </div>
                                        <div className="mt-4 space-y-1">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground/40">Próxima Renovación</p>
                                            <p className="text-xs font-bold text-foreground">Anual (Diciembre 2026)</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest" onClick={() => toast({ title: "RENOVACIÓN INICIADA", description: "Solicitud de renovación de permiso de hidrocarburos registrada." })}>RENOVAR PERMISO</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl border-l-4 border-primary">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                <Activity className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase italic text-foreground">Control de IVA</h3>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none mt-2 uppercase text-[8px] font-black">Mensual</Badge>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground/40 uppercase leading-relaxed text-justify italic">
                            "Aplica para empresas de refinación y transporte que no perciben regalías. El calendario de declaración coincide con el de Sujetos Pasivos Especiales."
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
