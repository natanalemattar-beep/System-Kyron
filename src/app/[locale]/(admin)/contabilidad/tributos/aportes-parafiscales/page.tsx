
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calculator, Activity, Landmark, Percent, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const parafiscales = [
    { id: "ivss", name: "IVSS", logo: Landmark, rates: "Patronal: 9-11% | Empleado: 4%", base: "Tope: 5 Salarios Mínimos", color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "faov", name: "FAOV", logo: Activity, rates: "Empleador: 2% | Empleado: 1%", base: "Salario Integral", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: "inces", name: "INCES", logo: ShieldCheck, rates: "Empleador: 2% | Empleado: 0.5%", base: "Nómina (5+ empleados)", color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: "paro", name: "Paro Forzoso", logo: Landmark, rates: "Empleador: 2% | Empleado: 0.5%", base: "Tope: 10 Salarios Mínimos", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { id: "lopcymat", name: "LOPCYMAT", logo: ShieldCheck, rates: "Riesgo: 0.75% a 10%", base: "Solo Empleador", color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function AportesParafiscalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Landmark className="h-3 w-3" /> NODO DE SEGURIDAD SOCIAL
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
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5 h-6 px-3">Vigente</Badge>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">{p.name}</CardTitle>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest"><span className="text-primary">TASAS:</span> {p.rates}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest"><span className="text-primary">BASE:</span> {p.base}</p>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="p-0 pt-10">
                            <Button className="w-full h-12 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest" onClick={() => alert("Calculadora en construcción")}>
                                <Calculator className="mr-2 h-4 w-4" /> CALCULAR APORTE
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
