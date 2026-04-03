
"use client";

import { CashFlowAnalysis } from "@/components/finanzas/cash-flow-analysis";
import { CashPosition } from "@/components/finanzas/cash-position";
import { CollectionForecast } from "@/components/finanzas/collection-forecast";
import { Activity, Wallet, TrendingUp, Download, Terminal, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

/**
 * @fileOverview Análisis de Caja y Tesorería (Localizada).
 */

export default function AnalisisCajaPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
        <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Wallet className="h-3 w-3" /> CENTRO DE LIQUIDEZ
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Análisis de <span className="text-primary italic">Caja y Flujo</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Proyección de Tesorería • Monitoreo de Solvencia 2026</p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                    <Link href="/contabilidad/cuentas"><ArrowLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                </Button>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <Download className="mr-3 h-4 w-4" /> EXPORTAR DATA
                </Button>
            </div>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <CashPosition />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-10">
                <CashFlowAnalysis />
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tight text-foreground flex items-center gap-4">
                            <TrendingUp className="text-primary h-6 w-6" /> Estrategia de Liquidez
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <p className="text-lg font-bold italic text-muted-foreground/60 leading-relaxed text-justify">
                            El análisis predictivo sugiere un excedente de liquidez de **Bs. 12.500** para el cierre del trimestre. Se recomienda la diversificación de activos para proteger el capital ante la inflación.
                        </p>
                        <Button className="h-14 px-8 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl w-full">OPTIMIZAR CARTERA</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-5 space-y-10">
                <CollectionForecast />
                <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] p-8 border border-white/5 shadow-2xl">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                        <Terminal className="h-4 w-4" /> Telemetría de Tesorería
                    </h4>
                    <div className="space-y-6">
                        {[
                            { label: "Ratio Solvencia", val: "2.45", status: "ÓPTIMO", color: "text-emerald-500" },
                            { label: "Periodo Cobro", val: "32 DÍAS", status: "NORMAL", color: "text-blue-500" },
                            { label: "Cobertura Caja", val: "4.2 MESES", status: "ÓPTIMO", color: "text-emerald-500" }
                        ].map(stat => (
                            <div key={stat.label} className="flex justify-between items-end border-b border-border/50 pb-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">{stat.label}</p>
                                    <p className="text-xl font-black italic text-foreground tracking-tight">{stat.val}</p>
                                </div>
                                <Badge variant="outline" className={cn("text-[8px] font-black uppercase h-5", stat.color)}>{stat.status}</Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
}
