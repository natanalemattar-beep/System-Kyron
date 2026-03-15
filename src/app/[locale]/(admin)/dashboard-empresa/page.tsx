
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
    Globe
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

const historicalFinancialData = [
  { month: "Ene '22", ingresos: 20000, gastos: 15000 },
  { month: "Feb '22", ingresos: 22000, gastos: 16500 },
  { month: "Mar '22", ingresos: 25000, gastos: 18000 },
];

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [payStep, setPayStep] = useState(1);

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

  const handleConfigSave = () => {
    toast({
      title: "Configuración Actualizada",
      description: "Los niveles de autonomía del Agente Fiscal han sido guardados.",
    });
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> NODO DE INTELIGENCIA FINANCIERA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Consola de <span className="text-primary italic">Contabilidad Pro</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Arquitectura VEN-NIF / IFRS • Gestión Multimoneda 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Globe className="mr-2 h-4 w-4" /> TASAS BCV
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl">
                REPORTE MAESTRO
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        <StatsCards />

        {/* Módulo de Agente Fiscal Autónomo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card border-primary/20 overflow-hidden relative group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-all duration-1000">
              <Sparkles className="h-32 w-32 text-primary" />
            </div>
            <CardHeader className="p-8 md:p-10 border-b border-border/50 bg-primary/5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase italic tracking-tighter text-foreground">
                    <Bot className="h-8 w-8 text-primary" />
                    Agente Fiscal Autónomo
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Estado: Activo • Sincronización con Gaceta Oficial 24/7
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary h-10 px-6 font-black uppercase text-[10px] tracking-widest">
                      <Settings2 className="mr-2 h-4 w-4" />
                      Configurar Autonomía
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] bg-card/95 backdrop-blur-3xl border-border p-10">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Protocolo de Autonomía</DialogTitle>
                    </DialogHeader>
                    <div className="py-8">
                      <RadioGroup defaultValue="consult" className="space-y-4">
                        {[
                          { id: "r1", val: "auto", title: "Acción Directa", desc: "Permitir ajustes menores a $1,000 sin consultar." },
                          { id: "r2", val: "consult", title: "Supervisión Manual", desc: "El agente sugiere cambios pero espera aprobación." },
                          { id: "r3", val: "off", title: "Modo Pasivo", desc: "Se detendrá todo el aprendizaje autónomo.", danger: true },
                        ].map((opt) => (
                          <div key={opt.id} className="flex items-center space-x-4 border border-border p-5 rounded-2xl hover:bg-primary/5 transition-all cursor-pointer group">
                            <RadioGroupItem value={opt.val} id={opt.id} className="border-primary/40 text-primary" />
                            <Label htmlFor={opt.id} className="cursor-pointer flex-1">
                              <p className={cn("font-black uppercase text-[10px] tracking-widest", opt.danger ? "text-rose-500" : "text-foreground/80")}>{opt.title}</p>
                              <p className="text-[9px] text-muted-foreground font-medium mt-1 leading-snug">{opt.desc}</p>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleConfigSave} className="w-full h-12 rounded-xl btn-3d-primary font-black uppercase text-[10px]">Guardar Configuración</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Prórroga IVA", desc: "Vencimiento Hoy • Aprobada", icon: CheckCircle },
                  { title: "Detección Duplicados", desc: "Factura #F123 Depurada", icon: CheckCircle },
                  { title: "Optimización ISLR", desc: "Ahorro Estimado: $450.00", icon: CheckCircle },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-primary/20 transition-all shadow-inner">
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
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Tesorería Global</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Saldos Multimoneda */}
                <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-10">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-primary">Saldos Certificados</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇻🇪 Bolívares</span>
                                <span className="text-3xl font-black italic text-foreground tracking-tighter">Bs. 45.678,90</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇺🇸 Dólares</span>
                                <span className="text-3xl font-black italic text-primary tracking-tighter">$ 12.345,67</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇪🇺 Euros</span>
                                <span className="text-3xl font-black italic text-foreground/80 tracking-tighter">€ 890,12</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1 h-12 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest">
                                <ArrowDownRight className="mr-2 h-4 w-4" /> Recibir
                            </Button>
                            <Button variant="outline" className="flex-1 h-12 rounded-xl border-border bg-card/5 text-foreground font-black uppercase text-[9px] tracking-widest hover:bg-card/80" onClick={() => setIsPaying(true)}>
                                <ArrowUpRight className="mr-2 h-4 w-4" /> Pagar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Ledger Transaccional */}
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Ledger de Operaciones</CardTitle>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-primary">
                            <Lock className="h-3 w-3" /> Sellado Blockchain
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-widest opacity-30">Descripción Operativa</TableHead>
                                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { date: "08 MAR", desc: "Pago Factura #F123", amount: -450.00, curr: "USD", type: "out" },
                                    { date: "07 MAR", desc: "Ingreso Ventas POS", amount: 1200.00, curr: "Bs.", type: "in" },
                                    { date: "06 MAR", desc: "Aporte Capital Socio", amount: 2300.00, curr: "USD", type: "in" },
                                ].map((move, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-colors">
                                        <TableCell className="pl-10 py-5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">{move.date}</TableCell>
                                        <TableCell className="py-5 font-bold text-foreground/80 text-xs uppercase italic">{move.desc}</TableCell>
                                        <TableCell className={cn(
                                            "text-right pr-10 py-5 font-mono text-sm font-black italic",
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
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Herramientas Contables Pro</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>
            <QuickAccess />
        </section>
      </div>
    </div>
  );
}
