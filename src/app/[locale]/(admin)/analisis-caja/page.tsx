
"use client";

import { CashFlowAnalysis } from "@/components/finanzas/cash-flow-analysis";
import { CashPosition } from "@/components/finanzas/cash-position";
import { CollectionForecast } from "@/components/finanzas/collection-forecast";
import { Activity, Wallet, TrendingUp, ArrowRight, Download, Terminal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalisisCajaPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
        <header className="border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Wallet className="h-3 w-3" /> NODO DE LIQUIDEZ
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Análisis de <span className="text-primary italic">Caja y Flujo</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Proyección de Tesorería • Monitoreo de Solvencia 2026</p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <CashPosition />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-10">
                <CashFlowAnalysis />
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                            <TrendingUp className="text-primary h-6 w-6" /> Estrategia de Inyección
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <p className="text-lg font-bold italic text-muted-foreground/60 leading-relaxed text-justify">
                            El análisis predictivo sugiere un excedente de liquidez de **Bs. 12.500** para el cierre del trimestre. Se recomienda la conversión a divisas o la inversión en activos verdes (Eco-Créditos) para proteger el capital contra la inflación.
                        </p>
                        <div className="flex gap-4">
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest shadow-xl flex-1">IR AL EXCHANGE</Button>
                            <Button variant="outline" className="h-12 px-8 rounded-xl border-border bg-card/5 text-foreground font-black uppercase text-[9px] tracking-widest flex-1">ESTUDIO DE RIESGO</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-5 space-y-10">
                <CollectionForecast />
                <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] p-8 border border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3 italic">
                        <Terminal className="h-4 w-4" /> Telemetría de Caja
                    </h4>
                    <div className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
                        <div className="flex justify-between border-b border-border/50 pb-2"><span>Índice de Solvencia:</span> <span className="text-emerald-500 font-black">2.45 (ÓPTIMO)</span></div>
                        <div className="flex justify-between border-b border-border/50 pb-2"><span>Periodo de Cobro:</span> <span className="text-foreground">32 DÍAS</span></div>
                        <div className="flex justify-between"><span>Cobertura Gastos:</span> <span className="text-foreground">4.2 MESES</span></div>
                    </div>
                    <Button variant="link" className="w-full mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-primary">DESCARGAR INFORME ANALÍTICO <Download className="ml-2 h-3 w-3" /></Button>
                </Card>
            </div>
        </div>
    </div>
  );
}
