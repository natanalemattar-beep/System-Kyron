
"use client";

import { useState, useEffect } from "react";
import { 
    Calculator, 
    Wallet, 
    Globe, 
    TrendingUp, 
    ShieldCheck, 
    Terminal, 
    Bot, 
    Settings2, 
    Sparkles, 
    Activity, 
    ArrowUpRight, 
    ArrowDownRight, 
    Fingerprint, 
    Loader2, 
    CheckCircle,
    Lock,
    Zap,
    ChevronRight,
    ArrowRight,
    BarChart3,
    Target,
    ShieldAlert,
    Cpu,
    Building,
    FileText
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [payStep, setPayStep] = useState(1);
  const [simulation, setSimulation] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const runSimulation = (type: string) => {
    setSimulation(null);
    setTimeout(() => {
      setSimulation(type);
      toast({
        title: "SIMULACIÓN COMPLETADA",
        description: "El gemelo digital ha proyectado los resultados del escenario estratégico.",
        action: <ShieldCheck className="h-4 w-4 text-primary" />
      });
    }, 1000);
  };

  const handleSimulatePayment = () => {
    setIsPaying(true);
    setPayStep(1);
    setTimeout(() => setPayStep(2), 1500); 
    setTimeout(() => {
        setPayStep(3);
        toast({
            title: "PAGO PROCESADO",
            description: "La transacción ha sido sellada en el registro contable inmutable.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    }, 3500);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      {/* HEADER DE MISIÓN CRÍTICA */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Cpu className="h-3 w-3" /> NODO DE INTELIGENCIA CORPORATIVA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-primary italic">Mando Maestro</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Arquitectura ZEDU v2.6.5 • Control Total 2026</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Activity className="mr-2 h-4 w-4 text-emerald-500" /> STATUS: ÓPTIMO
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                AUDITORÍA GLOBAL
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        <StatsCards />

        <div className="grid lg:grid-cols-12 gap-8">
            {/* BLOQUE DE RENTABILIDAD Y FACTIBILIDAD */}
            <Card className="lg:col-span-4 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Target className="h-32 w-32" /></div>
                <CardHeader className="p-0 mb-10">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                        <TrendingUp className="h-3 w-3" /> Viabilidad Económica
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">TIR Proyectada</p>
                            <p className="text-3xl font-black italic text-emerald-500 tracking-tighter">28.5%</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">VAN (Presente)</p>
                            <p className="text-3xl font-black italic text-foreground tracking-tighter">$450k</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary">
                            <span>Retorno de Inversión (ROI)</span>
                            <span>32%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary shadow-glow" style={{ width: '32%' }} />
                        </div>
                    </div>
                    <Button variant="link" asChild className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-primary hover:text-foreground">
                        <Link href="/estudio-factibilidad-economica" className="flex items-center gap-2">Ver informe técnico <ArrowRight className="h-3 w-3"/></Link>
                    </Button>
                </CardContent>
            </Card>

            {/* BLINDAJE CERO RIESGO (ZERO-RISK) */}
            <Card className="lg:col-span-8 bg-emerald-600 text-white rounded-[3rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden shadow-glow-secondary border-none group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-48 w-48" /></div>
                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Protocolo Zero-Risk Activo</Badge>
                        <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Blindaje Fiscal <br/> Inexpugnable</h3>
                    </div>
                    <p className="text-sm font-medium opacity-80 leading-relaxed uppercase tracking-widest max-w-md">
                        Cada transacción es auditada por la IA contra la Gaceta Oficial y sellada en el Ledger Blockchain. 0.00% probabilidad de multa fiscal.
                    </p>
                    <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em]">
                        <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> Ledger Sincronizado</span>
                        <span className="flex items-center gap-2"><Zap className="h-3 w-3" /> Alerta 24/7</span>
                    </div>
                </div>
                <Button asChild className="relative z-10 h-16 px-12 rounded-2xl bg-white text-emerald-600 font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-emerald-50">
                    <Link href="/zero-risk">ESTADO DE PROTECCIÓN</Link>
                </Button>
            </Card>
        </div>

        {/* GEMELO DIGITAL Y SIMULADOR ESTRATÉGICO */}
        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Inteligencia de Socios / Gemelo Digital</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <Card className="glass-card border-primary/20 overflow-hidden bg-white/[0.02] rounded-[3.5rem]">
                <CardHeader className="p-10 border-b border-white/5 bg-primary/5">
                    <CardTitle className="flex items-center gap-4 text-2xl font-black uppercase italic tracking-tighter">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        Simulador de Escenarios (BI)
                    </CardTitle>
                    <CardDescription className="text-primary font-bold uppercase text-[9px] tracking-[0.3em]">Inferencia predictiva basada en data histórica</CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4 space-y-4">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-6 ml-1">Seleccionar Inyección</h4>
                            {[
                                { id: "sucursales", label: "Expansión: +3 Locales", desc: "Modelado de inversión física", icon: Building },
                                { id: "ventas", label: "Ventas: +20% Revenue", desc: "Proyección de rentabilidad", icon: TrendingUp },
                                { id: "crisis", label: "Estrés: -15% Mercado", desc: "Plan de liquidez", icon: ShieldAlert }
                            ].map(sc => (
                                <Button 
                                    key={sc.id}
                                    onClick={() => runSimulation(sc.id)}
                                    variant="outline" 
                                    className="w-full justify-start h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 group transition-all"
                                >
                                    <sc.icon className="mr-4 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <p className="text-xs font-black uppercase tracking-tight">{sc.label}</p>
                                        <p className="text-[8px] opacity-40 uppercase font-bold tracking-widest">{sc.desc}</p>
                                    </div>
                                </Button>
                            ))}
                        </div>

                        <div className="lg:col-span-8 bg-black/40 rounded-[2.5rem] border border-white/5 min-h-[350px] flex items-center justify-center p-10">
                            <AnimatePresence mode="wait">
                                {simulation ? (
                                    <motion.div key={simulation} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-10">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <h5 className="text-2xl font-black uppercase italic text-primary">Resultados del Nodo</h5>
                                                <p className="text-[9px] font-bold uppercase text-muted-foreground/40 tracking-widest">Confianza: 94% • IA Inferencia Activa</p>
                                            </div>
                                            <Button variant="outline" className="rounded-xl border-primary/20 text-primary h-10 text-[9px] font-black uppercase">BAJAR DICTAMEN PDF</Button>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {[
                                                { label: "Impacto Caja", val: simulation === "crisis" ? "-$80k" : simulation === "ventas" ? "+$120k" : "-$45k", color: simulation === "crisis" ? "text-rose-500" : "text-emerald-500" },
                                                { label: "Rentabilidad", val: simulation === "crisis" ? "-15%" : simulation === "ventas" ? "+28%" : "+12%", color: simulation === "crisis" ? "text-rose-500" : "text-emerald-500" },
                                                { label: "Tier Holding", val: simulation === "ventas" ? "MASTER" : "ELITE", color: "text-primary" }
                                            ].map((r, i) => (
                                                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-2">{r.label}</p>
                                                    <p className={cn("text-2xl font-black italic tracking-tighter", r.color)}>{r.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center space-y-6 opacity-20 italic">
                                        <Terminal className="h-16 w-16 mx-auto animate-pulse" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Esperando parámetros de inyección estratégica...</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

        {/* BILLETERA DIGITAL Y TESORERÍA MULTIMONEDA */}
        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Tesorería Multimoneda / Ledger</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-10">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                            <Lock className="h-3 w-3" /> Caja Digital Certificada
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="space-y-6">
                            {[
                                { label: "🇻🇪 Bolívares (VES)", val: "Bs. 45.678,90", color: "text-foreground" },
                                { label: "🇺🇸 Dólares (USD)", val: "$ 12.345,67", color: "text-primary" },
                                { label: "🇪🇺 Euros (EUR)", val: "€ 890,12", color: "text-foreground/80" }
                            ].map(curr => (
                                <div key={curr.label} className="flex justify-between items-end border-b border-border pb-4">
                                    <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{curr.label}</span>
                                    <span className={cn("text-3xl font-black italic tracking-tighter", curr.color)}>{curr.val}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1 h-12 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest">INYECTAR</Button>
                            <Button variant="outline" className="flex-1 h-12 rounded-xl border-border bg-card/5 text-foreground font-black uppercase text-[9px] tracking-widest" onClick={() => setIsPaying(true)}>DISPERSAR</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Libro Diario Inmutable</CardTitle>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-primary">
                            <ShieldCheck className="h-4 w-4" /> SELLADO BLOCKCHAIN
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Timestamp</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Concepto / Ref</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { date: "08 MAR", desc: "Venta Licencia Global", amount: 450.00, curr: "USD", type: "in" },
                                    { date: "07 MAR", desc: "Pago Servidores Cloud", amount: -120.00, curr: "USD", type: "out" },
                                    { date: "06 MAR", desc: "Inyección Capital Nodo", amount: 2300.00, curr: "USD", type: "in" },
                                ].map((move, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6 text-[9px] font-black text-muted-foreground/40 uppercase">{move.date}</TableCell>
                                        <TableCell className="py-6 font-bold text-foreground/80 text-xs uppercase italic group-hover:text-primary transition-colors">{move.desc}</TableCell>
                                        <TableCell className={cn(
                                            "text-right pr-10 py-6 font-mono text-sm font-black italic",
                                            move.type === 'in' ? "text-emerald-600" : "text-rose-600"
                                        )}>
                                            {move.type === 'in' ? '+' : ''}{move.amount.toLocaleString()} {move.curr}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* ACCESOS RÁPIDOS PULIDOS */}
        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Módulos de Operación Maestra</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>
            <QuickAccess navGroups={adminNavGroups.filter(g => g.title === "Contabilidad" || g.title === "Ventas")} />
        </section>

        <div className="grid gap-10 lg:grid-cols-12 pb-10">
            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
            <div className="lg:col-span-4">
                <RecentInvoices />
            </div>
        </div>
      </div>

      {/* DIALOGO DE PAGO BIOMÉTRICO */}
      <Dialog open={isPaying} onOpenChange={(val) => { setIsPaying(val); if(!val) setPayStep(1); }}>
        <DialogContent className="rounded-[3rem] bg-card/95 backdrop-blur-3xl border-border p-10">
            <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Autorización de Dispersión</DialogTitle>
            </DialogHeader>
            <div className="py-8">
                {payStep === 1 && (
                    <div className="space-y-8 animate-in fade-in">
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Beneficiario Maestro</Label>
                            <Input placeholder="Nombre o RIF de la Empresa" className="h-12 rounded-xl bg-white/5 border-border font-bold text-sm uppercase" />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Monto a Liquidar</Label>
                            <div className="relative">
                                <Input type="number" placeholder="0.00" className="h-16 rounded-2xl bg-white/5 border-border pl-14 text-2xl font-black italic text-primary" />
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-primary/40">$</span>
                            </div>
                        </div>
                        <Button className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-glow" onClick={handleSimulatePayment}>AUTORIZAR TRANSACCIÓN</Button>
                    </div>
                )}
                {payStep === 2 && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                            <div className="p-10 rounded-[3rem] border-2 border-primary bg-primary/10 relative z-10">
                                <Fingerprint className="h-20 w-20 text-primary" />
                            </div>
                        </div>
                        <div className="text-center space-y-3">
                            <p className="text-lg font-black uppercase italic text-foreground tracking-tight">Validación Biométrica</p>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                                <Loader2 className="h-4 w-4 animate-spin" /> Verificando Firma Digital...
                            </div>
                        </div>
                    </div>
                )}
                {payStep === 3 && (
                    <div className="py-12 text-center space-y-8 animate-in fade-in">
                        <div className="p-8 bg-emerald-500/10 rounded-full w-fit mx-auto border-2 border-emerald-500/30 shadow-glow-secondary">
                            <CheckCircle className="h-20 w-20 text-emerald-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Sello Exitoso</h3>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em]">REGISTRADO EN LEDGER INMUTABLE</p>
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-xl border-border text-[9px] font-black uppercase tracking-widest" onClick={() => setIsPaying(false)}>CERRAR EXPEDIENTE</Button>
                    </div>
                )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
