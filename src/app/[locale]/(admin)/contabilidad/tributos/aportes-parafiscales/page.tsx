
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calculator, Activity, Landmark, Percent, Zap, Building2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const parafiscales = [
    { 
        id: "ivss", 
        name: "IVSS (Seguro Social)", 
        logo: Landmark, 
        rates: { patronal: "9% - 11%", empleado: "4%" }, 
        base: "Tope: 5 Salarios Mínimos", 
        legal: "Ley del Seguro Social",
        color: "text-blue-500", 
        bg: "bg-blue-500/10" 
    },
    { 
        id: "faov", 
        name: "FAOV (Vivienda)", 
        logo: Activity, 
        rates: { patronal: "2%", empleado: "1%" }, 
        base: "Salario Integral (Sin tope)", 
        legal: "Ley de Vivienda",
        color: "text-emerald-500", 
        bg: "bg-emerald-500/10" 
    },
    { 
        id: "inces", 
        name: "INCES (Capacitación)", 
        logo: ShieldCheck, 
        rates: { patronal: "2%", empleado: "0.5%" }, 
        base: "Nómina (5+ empleados)", 
        legal: "Ley del INCES",
        color: "text-amber-500", 
        bg: "bg-amber-500/10" 
    },
    { 
        id: "paro", 
        name: "Paro Forzoso", 
        logo: Landmark, 
        rates: { patronal: "2%", empleado: "0.5%" }, 
        base: "Tope: 10 Salarios Mínimos", 
        legal: "Ley del Empleo",
        color: "text-indigo-500", 
        bg: "bg-indigo-500/10" 
    },
    { 
        id: "lopcymat", 
        name: "LOPCYMAT", 
        logo: ShieldCheck, 
        rates: { patronal: "0.75% - 10%", empleado: "0%" }, 
        base: "Según Nivel de Riesgo", 
        legal: "LOPCYMAT",
        color: "text-rose-500", 
        bg: "bg-rose-500/10" 
    },
];

export default function AportesParafiscalesPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Building2 className="h-3 w-3" /> NODO DE SEGURIDAD SOCIAL
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Aportes <span className="text-primary italic">Parafiscales</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">IVSS • FAOV • INCES • LOPCYMAT • 2026</p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {parafiscales.map(p => (
                    <Card key={p.id} className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                        <div className="space-y-8">
                            <div className="flex justify-between items-start">
                                <div className={cn("p-4 rounded-2xl border border-border group-hover:scale-110 transition-transform", p.bg)}>
                                    <p.logo className={cn("h-6 w-6", p.color)} />
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5 h-6 px-3 italic">{p.legal}</Badge>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">{p.name}</CardTitle>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-border pb-2">
                                        <span className="text-[9px] font-black text-muted-foreground uppercase">Patronal</span>
                                        <span className="text-sm font-black text-foreground">{p.rates.patronal}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-border pb-2">
                                        <span className="text-[9px] font-black text-muted-foreground uppercase">Empleado</span>
                                        <span className="text-sm font-black text-foreground">{p.rates.empleado}</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Base de Cálculo:</p>
                                        <p className="text-[10px] font-black text-primary uppercase mt-1 italic">{p.base}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="p-0 pt-10">
                            <Button className="w-full h-12 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest" onClick={() => alert("Simulador de Aportes en construcción")}>
                                <Calculator className="mr-2 h-4 w-4" /> CALCULAR APORTE
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl mt-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                    <Terminal className="h-4 w-4" /> Telemetría de Cumplimiento
                </h4>
                <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase max-w-2xl">
                    Cada aporte calculado es auditado automáticamente contra la nómina activa para garantizar la solvencia ante el Ministerio del Trabajo y el IVSS. El sistema genera los archivos de carga masiva para los portales oficiales de forma síncrona.
                </p>
            </Card>
        </div>
    );
}
