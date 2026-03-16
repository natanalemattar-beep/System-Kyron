
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle, CheckCircle, FileText, Activity, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function MinisterioIndustriasPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Building2 className="h-3 w-3" /> NODO INDUSTRIAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Industrias</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Empresas y Permisos Industriales • 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    SOLICITAR PERMISO
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Requisitos de Inscripción</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>Copia del Registro Mercantil y RIF vigente.</span>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>Memoria Descriptiva de procesos industriales.</span>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>Planos de ubicación y zonificación de la planta.</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                            <Activity className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic text-foreground">Estatus Operativo</h3>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none mt-2 uppercase text-[8px] font-black">Certificado</Badge>
                        </div>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground/40 uppercase leading-relaxed text-justify italic">
                        "El sistema monitorea síncronamente los parámetros de producción para asegurar que el registro industrial se mantenga vigente ante inspecciones del ministerio."
                    </p>
                </Card>
            </div>
        </div>
    );
}
