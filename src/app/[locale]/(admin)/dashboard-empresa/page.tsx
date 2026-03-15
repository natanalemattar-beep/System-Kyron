
"use client";

import { useState } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { 
    BookOpen, 
    Scale, 
    ArrowRight, 
    ShieldCheck, 
    Terminal, 
    Calculator, 
    Landmark,
    Coins,
    TrendingUp,
    Zap,
    Activity,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Lock,
    Fingerprint,
    Loader2,
    CheckCircle,
    FileText,
    Banknote,
    Bot,
    Settings2,
    Sparkles,
    ChevronRight,
    Globe,
    BarChart3
} from "lucide-react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [payStep, setPayStep] = useState(1);

  // Filtrar accesos rápidos para que solo muestren contabilidad moderna
  const contabilidadNav = adminNavGroups.filter(g => 
    g.title === "Contabilidad" || g.title === "Administración" || g.title === "Sostenibilidad"
  );

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

  return (
    <div className="space-y-12 pb-20">
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> NODO CONTABLE MAESTRO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Inteligencia <span className="text-primary italic">Financiera</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Arquitectura VEN-NIF • Gestión Multimoneda 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Globe className="mr-2 h-4 w-4" /> MONITOR BCV
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl">
                BALANCE CONSOLIDADO
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        <StatsCards />

        {/* Agente Fiscal Autónomo */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="glass-card border-primary/20 overflow-hidden relative group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-all duration-1000">
              <Sparkles className="h-32 w-32 text-primary" />
            </div>
            <CardHeader className="p-10 border-b border-border/50 bg-primary/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase italic tracking-tighter">
                    <Bot className="h-8 w-8 text-primary" />
                    Agente Fiscal Autónomo
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Estado: Activo • Sincronización Internacional IFRS/VEN-NIF
                  </CardDescription>
                </div>
                <Button variant="outline" className="rounded-xl border-primary/20 text-primary h-10 px-6 font-black uppercase text-[10px] tracking-widest">
                  <Settings2 className="mr-2 h-4 w-4" /> Configurar Autonomía
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Prórroga IVA", desc: "Aprobada automáticamente", icon: CheckCircle },
                  { title: "Detección Errores", desc: "0 discrepancias en Ledger", icon: CheckCircle },
                  { title: "Ahorro Fiscal", desc: "Estimado: $1,240.00", icon: CheckCircle },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5 shadow-inner">
                    <action.icon className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{action.title}</p>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Tesorería Internacional</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Saldos Multimoneda */}
                <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-10">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-primary">Saldos Certificados</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇻🇪 Bolívares (VES)</span>
                                <span className="text-3xl font-black italic text-foreground tracking-tighter">Bs. 45.678,90</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇺🇸 Dólares (USD)</span>
                                <span className="text-3xl font-black italic text-primary tracking-tighter">$ 12.345,67</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇪🇺 Euros (EUR)</span>
                                <span className="text-3xl font-black italic text-foreground/80 tracking-tighter">€ 890,12</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-6">
                            <Button className="flex-1 h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">
                                <ArrowDownRight className="mr-2 h-4 w-4" /> RECIBIR
                            </Button>
                            <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border bg-card/5 text-foreground font-black uppercase text-[10px] tracking-widest hover:bg-card/80" onClick={() => setIsPaying(true)}>
                                <ArrowUpRight className="mr-2 h-4 w-4" /> DISPERSAR
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Ledger Transaccional */}
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Libro Diario Ledger</CardTitle>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-primary">
                            <Lock className="h-3 w-3" /> Sellado Inmutable
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Timestamp</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-widest opacity-30">Concepto Operativo</TableHead>
                                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { date: "08 MAR", desc: "Liquidación Proveedor Tech", amount: -450.00, curr: "USD", type: "out" },
                                    { date: "07 MAR", desc: "Ingreso Ventas Catia TPV", amount: 1200.00, curr: "Bs.", type: "in" },
                                    { date: "06 MAR", desc: "Inyección Capital Nodo", amount: 2300.00, curr: "USD", type: "in" },
                                ].map((move, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-colors">
                                        <TableCell className="pl-10 py-6 text-[9px] font-black text-muted-foreground/40 uppercase">{move.date}</TableCell>
                                        <TableCell className="py-6 font-bold text-foreground/80 text-xs uppercase italic">{move.desc}</TableCell>
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

        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
            <div className="lg:col-span-4">
                <RecentInvoices />
            </div>
        </div>

        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Módulos de Auditoría Permanente</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>
            <QuickAccess navGroups={contabilidadNav} />
        </section>
      </div>
    </div>
  );
}
