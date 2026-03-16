
"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  TrendingUp, 
  Activity, 
  BookOpen, 
  Receipt,
  Users,
  HandCoins,
  Zap,
  ArrowRight,
  Book,
  History,
  Box,
  Landmark,
  Banknote,
  BrainCircuit,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Clock,
  Sparkles,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const kpiData = [
  { label: "LIQUIDEZ CERTIFICADA", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-500", icon: Wallet },
  { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Activos", color: "text-blue-500", icon: TrendingUp },
  { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Compromisos", color: "text-rose-500", icon: HandCoins },
  { label: "EXPOSICIÓN FISCAL", val: "0.00%", trend: "BAJO RIESGO", color: "text-emerald-500", icon: ShieldCheck },
];

const frequentAccess = [
    { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Marzo: Al día", color: "text-blue-500" },
    { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-500" },
    { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box, kpi: "45 SKUs", color: "text-amber-500" },
    { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Ok", color: "text-rose-500" },
];

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState(100);

  const runForensicAudit = () => {
    setIsAuditing(true);
    toast({
        title: "INICIANDO AUDITORÍA FORENSE",
        description: "Escaneando inconsistencias en el Ledger central...",
    });

    setTimeout(() => {
        setIsAuditing(false);
        setAuditScore(99.8);
        toast({
            title: "ANÁLISIS COMPLETADO",
            description: "Integridad de datos: 99.8%. 1 entrada requiere verificación manual.",
            action: <ShieldCheck className="text-primary h-4 w-4" />
        });
    }, 3000);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                <BrainCircuit className="h-3 w-3" /> NÚCLEO CONTABLE INTELIGENTE
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none text-white italic-shadow">CENTRO DE <span className="text-primary italic">CONTABILIDAD</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Operating System v2.6.5 • Control Global</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-white/60 hover:bg-primary/5 hover:text-primary transition-all" onClick={runForensicAudit} disabled={isAuditing}>
                {isAuditing ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <ShieldSearch className="mr-3 h-4 w-4" />}
                AUDITORÍA FORENSE
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                <Receipt className="mr-3 h-4 w-4" /> CERRAR PERIODO
            </Button>
        </div>
      </header>

      {/* KPIs DE ALTA DENSIDAD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-white">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* PANEL DEL AGENTE FISCAL (INNOVACIÓN) */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-primary/20 bg-primary/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Bot className="h-48 w-48 text-primary" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                        <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 uppercase tracking-[0.4em] shadow-glow">Neural Network Health</Badge>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Agente Fiscal Autónomo</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary/60">
                                <span>Capacidad de Aprendizaje</span>
                                <span>94.2%</span>
                            </div>
                            <Progress value={94.2} className="h-1.5 bg-white/5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <p className="text-[8px] font-black uppercase text-white/30 mb-1">Inconsistencias Corregidas</p>
                                <p className="text-xl font-black text-white italic">145</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <p className="text-[8px] font-black uppercase text-white/30 mb-1">Tiempo Ahorrado (Mes)</p>
                                <p className="text-xl font-black text-primary italic">12h</p>
                            </div>
                        </div>
                    </div>

                    <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl">
                        GESTIONAR PROTOCOLOS IA
                    </Button>
                </div>
            </Card>

            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 italic flex items-center gap-3">
                    <Zap className="h-4 w-4" /> Sugerencias de Optimización
                </h4>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-all cursor-pointer">
                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-emerald-400 uppercase">Ajuste RIPF Pendiente</p>
                            <p className="text-[9px] font-bold text-white/40 uppercase leading-snug">Se detectó una discrepancia del 2% en activos no monetarios. Aplicar ahora para blindaje fiscal.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all cursor-pointer">
                        <Activity className="h-5 w-5 text-primary shrink-0" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-primary uppercase">Oportunidad de Crédito</p>
                            <p className="text-[9px] font-bold text-white/40 uppercase leading-snug">Excedente de retenciones de IVA puede compensar el pago de IGTF del próximo periodo.</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        {/* GRÁFICO Y ACCESOS RÁPIDOS */}
        <div className="lg:col-span-8 space-y-10">
            <OverviewChart />

            <div className="space-y-6">
                <div className="flex items-center gap-4 ml-2">
                    <div className="p-2 bg-primary/10 rounded-xl"><Activity className="h-5 w-5 text-primary" /></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/60 italic">Accesos Directos al Ledger</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {frequentAccess.map((item, i) => (
                        <Link key={i} href={item.href as any}>
                            <Card className="glass-card border-none bg-card/40 hover:bg-white/[0.05] transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-tight text-white/80 group-hover:text-primary transition-colors italic">{item.label}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.kpi}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <ArrowRight className="h-4 w-4 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* BANNER DE BIBLIOTECA MAESTRA */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-[#050505] border-none rounded-[3rem] p-12 text-primary-foreground relative overflow-hidden shadow-2xl group cursor-pointer">
            <Link href="/contabilidad/libros" className="absolute inset-0 z-20" />
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Book className="h-64 w-64 text-primary" />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <Badge className="bg-primary text-white border-none text-[9px] font-black px-4 py-1.5 rounded-lg shadow-glow uppercase tracking-widest">Repositorio Certificado</Badge>
                    <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-none text-white italic-shadow">Biblioteca de <br/> Libros Digitales</h3>
                    <p className="text-lg font-medium opacity-80 leading-relaxed uppercase italic">Acceda al legajo completo de registros fiscales, laborales y patrimoniales con sellado Blockchain.</p>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none">
                        EXPLORAR BIBLIOTECA <ArrowRight className="ml-4 h-5 w-5" />
                    </Button>
                </div>
                <div className="hidden md:flex justify-end">
                    <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                        <BookOpen className="h-16 w-16 mx-auto text-white/40 mb-2 drop-shadow-glow" />
                        <p className="text-5xl font-black italic tracking-tighter text-white">30</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 text-white">Módulos de Control</p>
                    </div>
                </div>
            </div>
        </Card>
      </motion.div>
    </div>
  );
}

function ShieldSearch(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <circle cx="12" cy="12" r="3" />
      <path d="m14.5 14.5 2.5 2.5" />
    </svg>
  )
}
