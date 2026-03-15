"use client";

import { useState, useEffect } from "react";
import { 
    Calculator, 
    Wallet, 
    Globe, 
    TrendingUp, 
    ShieldCheck, 
    Activity, 
    ArrowUpRight, 
    ArrowDownRight, 
    CheckCircle,
    Lock,
    Zap,
    ArrowRight,
    BarChart3,
    ShieldAlert,
    Cpu,
    Building,
    TrendingDown,
    LayoutDashboard,
    CreditCard
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OverviewChart } from "@/components/dashboard/overview-chart";

/**
 * @fileOverview Centro de Mando Maestro de System Kyron.
 * Centraliza la toma de decisiones estratégicas, auditoría fiscal y simulación de negocios.
 */

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [simulation, setSimulation] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runSimulation = (type: string) => {
    setSimulation(null);
    setTimeout(() => {
      setSimulation(type);
      toast({
        title: "SIMULACIÓN COMPLETADA",
        description: "El gemelo digital ha proyectado los resultados del escenario estratégico.",
        action: <CheckCircle className="text-primary h-4 w-4" />
      });
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20">
      {/* HEADER ESTRATÉGICO */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Cpu className="h-3 w-3" /> SISTEMA MAESTRO v2.6.5
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none italic-shadow text-white">CENTRO DE <span className="text-primary italic">MANDO EMPRESA</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Consola de Inteligencia de Negocios • Control Estratégico</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                AUDITORÍA GLOBAL
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                CERRAR PERIODO
            </Button>
        </div>
      </motion.header>

      {/* KPIs EJECUTIVOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-500" },
          { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-primary" },
          { label: "LIQUIDEZ SISTEMA", value: "2.45", sub: "ÓPTIMO", icon: Activity, color: "text-blue-400" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-xl hover:bg-card/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted/50 border border-border">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-white">{kpi.value}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* SIMULADOR DE NEGOCIOS */}
        <Card className="lg:col-span-5 glass-card border-primary/20 overflow-hidden bg-white/[0.02] rounded-[3.5rem] shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 bg-primary/5">
                <CardTitle className="flex items-center gap-4 text-2xl font-black uppercase italic tracking-tighter text-white">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    Simulador BI
                </CardTitle>
                <CardDescription className="text-primary font-bold uppercase text-[9px] tracking-[0.3em]">Proyección de Escenarios Estratégicos</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: "ventas", label: "Aumento Ventas 20%", icon: TrendingUp },
                        { id: "sucursales", label: "Expansión +3 Sedes", icon: Building },
                        { id: "crisis", label: "Escenario Inflación", icon: ShieldAlert }
                    ].map(sc => (
                        <Button 
                            key={sc.id}
                            onClick={() => runSimulation(sc.id)}
                            variant="outline" 
                            className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 group text-white"
                        >
                            <sc.icon className="mr-4 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{sc.label}</span>
                        </Button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    {simulation && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                            <p className="text-[9px] font-black uppercase text-primary mb-2">Impacto Proyectado</p>
                            <p className="text-sm font-bold italic text-white/80 leading-relaxed">
                                {simulation === 'ventas' ? "Incremento del 28% en rentabilidad neta para el cierre de ciclo." : 
                                 simulation === 'sucursales' ? "Punto de equilibrio estimado en 14 meses bajo inversión CapEx." : 
                                 "Requerimiento de liquidez adicional del 15% detectado por el sistema."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>

        {/* BLINDAJE FISCAL */}
        <Card className="lg:col-span-7 bg-emerald-600 text-white rounded-[3.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden shadow-glow-secondary border-none group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-48 w-48" /></div>
            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Blindaje Activo</Badge>
                    <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Cero Riesgo <br/> Fiscal</h3>
                </div>
                <p className="text-sm font-medium opacity-80 leading-relaxed uppercase tracking-widest max-w-md">
                    Auditoría permanente en cada transacción contra la Gaceta Oficial. Sellado digital en Ledger inmutable.
                </p>
                <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> Ledger Inmutable</span>
                    <span className="flex items-center gap-2"><Zap className="h-3 w-3" /> Auditoría 24/7</span>
                </div>
            </div>
            <Button asChild className="relative z-10 h-16 px-12 rounded-2xl bg-white text-emerald-600 font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-emerald-50">
                <Link href="/zero-risk">VER ESTADO</Link>
            </Button>
        </Card>
      </div>

      {/* ANÁLISIS Y FACTURACIÓN */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
            <OverviewChart />
        </div>
        <Card className="lg:col-span-4 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-white/5 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Facturación VIP</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente VIP</TableHead>
                  <TableHead className="text-right pr-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                    { client: "Tech Solutions LLC", amount: 5000 },
                    { client: "Innovate Corp", amount: 12000 },
                    { client: "Marketing Pro", amount: 2500 },
                    { client: "Constructora XYZ", amount: 7500 },
                ].map((inv, i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                    <TableCell className="pl-10 py-6 font-black text-[10px] text-white/80 uppercase italic group-hover:text-primary">{inv.client}</TableCell>
                    <TableCell className="text-right pr-10 py-6 font-mono text-xs font-black text-primary italic">{formatCurrency(inv.amount, 'Bs.')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-6 border-t border-white/5 bg-primary/5 flex justify-center">
             <Button variant="link" asChild className="text-[9px] font-black uppercase tracking-widest text-primary">
                <Link href="/facturacion">VER TODAS LAS FACTURAS <ArrowRight className="ml-2 h-3 w-3"/></Link>
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
