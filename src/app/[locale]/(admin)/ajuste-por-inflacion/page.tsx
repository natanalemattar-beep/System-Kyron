
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, FileWarning, CircleHelp as HelpCircle, CircleCheck as CheckCircle, ListOrdered, Calculator, Activity, Terminal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

const calculoSimplificado = [
    { paso: 1, titulo: "Excluir Cuentas no Monetarias", descripcion: "Identificar inventarios, activos fijos y patrimonio que requieren reajuste según el INPC." },
    { paso: 2, titulo: "Posición Monetaria Neta", descripcion: "Diferencia entre activos y pasivos monetarios para determinar ganancia o pérdida por inflación." },
    { paso: 3, titulo: "Factor de Inflación BCV", descripcion: "Aplicar el coeficiente del INPC del periodo para determinar el monto del ajuste fiscal." },
];

export default function AjustePorInflacionPage() {

  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Activity className="h-3 w-3" /> PROTOCOLO RIPF
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Reajuste por <span className="text-primary italic">Inflación Fiscal</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Actualización de Activos No Monetarios • Normativa LISLR 2026</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] p-10 bg-card/40 shadow-xl shadow-blue-500/5">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                        <HelpCircle className="text-primary h-6 w-6"/> ¿Qué es el Ajuste Fiscal?
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg font-medium italic text-muted-foreground leading-relaxed text-justify">
                    Es el procedimiento obligatorio establecido en la Ley de ISLR para sincerar la información financiera. El sistema utiliza los índices INPC publicados por el BCV para calcular automáticamente la ganancia o pérdida monetaria, garantizando una base imponible veraz.
                </CardContent>
            </Card>

             <Card className="glass-card border-none rounded-[3rem] p-10 bg-card/40 shadow-xl">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Sujetos Obligados</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                     <ul className="space-y-6">
                        {[
                            "Personas jurídicas que realicen actividades comerciales, industriales o bancarias.",
                            "Explotadores de minas, hidrocarburos y actividades conexas.",
                            "Contribuyentes que utilicen principios VEN-NIF para determinar ingresos."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-6 group">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wide text-foreground/70">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                    <FileWarning className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-rose-500 mb-4">RIESGO DE SANCIÓN</h3>
                    <p className="text-[10px] font-bold text-foreground/60 leading-relaxed uppercase mb-8">El incumplimiento del ajuste RIPF acarrea multas de hasta 1.000 veces el tipo de cambio oficial según el Código Orgánico Tributario.</p>
                </div>
                <Button variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl relative z-10">AUDITAR ESTADOS FINANCIEROS</Button>
            </Card>
        </div>
      </div>
      
       <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 shadow-2xl overflow-hidden mt-10">
        <CardHeader className="p-12 border-b border-border bg-muted/10">
            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                <Calculator className="h-8 w-8 text-primary"/> Algoritmo de Cálculo Maestro
            </CardTitle>
        </CardHeader>
        <CardContent className="p-12 grid md:grid-cols-3 gap-10">
            {calculoSimplificado.map(paso => (
                <div key={paso.paso} className="p-8 bg-muted/20 border border-border rounded-[2.5rem] space-y-4 hover:border-primary/30 transition-all group">
                    <p className="text-[9px] font-black uppercase text-primary tracking-widest">PASO 0{paso.paso}</p>
                    <h3 className="font-black text-sm uppercase italic text-foreground/90 group-hover:text-primary">{paso.titulo}</h3>
                    <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase">{paso.descripcion}</p>
                </div>
            ))}
        </CardContent>
        <CardFooter className="p-12 bg-primary/5 flex justify-between items-center border-t border-border">
            <div className="flex items-center gap-4 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] italic">
                <Terminal className="h-4 w-4" /> Ejecución Automática System Kyron
            </div>
            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">SIMULAR REAJUSTE</Button>
        </CardFooter>
       </Card>
    </div>
  );
}
