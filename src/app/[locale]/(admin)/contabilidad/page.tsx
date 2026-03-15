
"use client";

import { useState } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { QuickAccess } from "@/components/dashboard/quick-access";
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
    ArrowRight
} from "lucide-react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ContabilidadPage() {
  const [isPaying, setIsPaying] = useState(false);
  const [payStep, setPayStep] = useState(1);
  const { toast } = (require("@/hooks/use-toast")).useToast();

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

  const contabilidadGroup = adminNavGroups.find(g => g.title === "Contabilidad");

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
                <Calculator className="h-3 w-3" /> NODO CONTABLE MAESTRO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Inteligencia <span className="text-primary italic">Financiera</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Arquitectura VEN-NIF • Gestión Global 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all">
                <Link href="/billetera-cambio">
                    <Wallet className="mr-2 h-4 w-4" /> EXCHANGE INTERNO
                </Link>
            </Button>
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground hover:bg-card">
                SINCRONIZAR BCV
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        <StatsCards />

        {/* Billetera Digital y Operaciones Internacionales */}
        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Tesorería y Flujo Internacional</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Billetera Multimoneda */}
                <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-32 w-32 text-primary" /></div>
                    <CardHeader className="p-0 mb-10">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                            <Lock className="h-3 w-3" /> Caja Digital Certificada
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇻🇪 Bolívares (VES)</span>
                                <span className="text-3xl font-black italic text-foreground tracking-tighter">Bs. 45.678,90</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇺🇸 Dólares (USD)</span>
                                <span className="text-3xl font-black italic text-primary tracking-tighter">$ 12.345,67</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇪🇺 Euros (EUR)</span>
                                <span className="text-3xl font-black italic text-foreground/80 tracking-tighter">€ 890,12</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1 h-12 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest">
                                <ArrowDownRight className="mr-2 h-4 w-4" /> INYECTAR
                            </Button>
                            <Button variant="outline" className="flex-1 h-12 rounded-xl border-border bg-card/5 text-foreground font-black uppercase text-[9px] tracking-widest hover:bg-card/80" onClick={() => setIsPaying(true)}>
                                <ArrowUpRight className="mr-2 h-4 w-4" /> DISPERSAR
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Ledger Internacional */}
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                        <div className="space-y-1">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Operaciones Globales</CardTitle>
                            <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Sincronización con pasarelas internacionales</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5 h-6 text-[8px] font-black uppercase">Stripe: Online</Badge>
                            <Badge variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5 h-6 text-[8px] font-black uppercase">PayPal: Active</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Timestamp</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-widest opacity-30">Concepto / Referencia</TableHead>
                                    <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Canal</TableHead>
                                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { date: "08 MAR", desc: "Venta Licencia Global", amount: 450.00, curr: "USD", type: "in", channel: "Stripe" },
                                    { date: "07 MAR", desc: "Pago Servidores Cloud", amount: -120.00, curr: "USD", type: "out", channel: "Corporate" },
                                    { date: "06 MAR", desc: "Honorarios Consultoría", amount: 2300.00, curr: "USD", type: "in", channel: "PayPal" },
                                ].map((move, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-5 text-[9px] font-black text-muted-foreground/40 uppercase">{move.date}</TableCell>
                                        <TableCell className="py-5 font-bold text-foreground/80 text-xs uppercase italic flex items-center gap-3">
                                            <Globe className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
                                            {move.desc}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-[8px] font-black uppercase px-2 py-1 bg-white/5 rounded-md text-white/40">{move.channel}</span>
                                        </TableCell>
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

        {/* Agente Fiscal y Auditoría Predictiva */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
                    Estado: Activo • Monitoreo síncrono del Ledger Inmutable
                  </CardDescription>
                </div>
                <Button variant="outline" className="rounded-xl border-primary/20 text-primary h-10 px-6 font-black uppercase text-[10px] tracking-widest">
                  <Settings2 className="mr-2 h-4 w-4" /> Configurar Protocolo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Prórroga IVA", desc: "Auditada y Verificada", icon: ShieldCheck },
                  { title: "Integridad Ledger", desc: "0 Discrepancias", icon: ShieldCheck },
                  { title: "Optimización ISLR", desc: "Base Imponible Sincronizada", icon: ShieldCheck },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-primary/20 transition-all shadow-inner">
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

        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
            <div className="lg:col-span-4">
                <RecentInvoices />
            </div>
        </div>

        {/* Áreas de Gestión Directa */}
        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Módulos de Control Maestro</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contabilidadGroup?.items.map((item) => (
                    <Card key={item.href} className="glass-card border-none bg-card/40 p-1 rounded-[2rem] hover:bg-card/60 transition-all group overflow-hidden shadow-xl">
                        <Link href={item.href as any} className="p-8 flex flex-col justify-between h-full min-h-[180px]">
                            <div className="space-y-4">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 transition-transform border border-primary/20">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">Protocolo Activo</span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
      </div>

      <Dialog open={isPaying} onOpenChange={(val) => { setIsPaying(val); if(!val) setPayStep(1); }}>
        <DialogContent className="rounded-[2.5rem] bg-card/95 backdrop-blur-3xl border-border p-10">
            <DialogHeader>
                <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Autorización de Dispersión</DialogTitle>
            </DialogHeader>
            <div className="py-6">
                {payStep === 1 && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Beneficiario Certificado</Label>
                            <Input placeholder="Nombre o RIF de la Empresa" className="bg-muted/30 border-border rounded-xl h-12 text-xs font-bold uppercase" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Monto de Operación</Label>
                            <div className="relative">
                                <Input type="number" placeholder="0.00" className="bg-muted/30 border-border rounded-xl pl-12 h-14 text-lg font-black italic" />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">$</span>
                            </div>
                        </div>
                        <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-glow" onClick={handleSimulatePayment}>AUTORIZAR TRANSACCIÓN</Button>
                    </div>
                )}
                {payStep === 2 && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                            <div className="p-8 rounded-[2.5rem] border-2 border-primary bg-primary/10 relative z-10">
                                <Fingerprint className="h-16 w-16 text-primary" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-black uppercase italic text-foreground">Escaneo Biométrico</p>
                            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Loader2 className="h-3 w-3 animate-spin" /> Validando Firma Digital...
                            </p>
                        </div>
                    </div>
                )}
                {payStep === 3 && (
                    <div className="py-12 text-center space-y-6 animate-in fade-in">
                        <div className="p-6 bg-emerald-500/10 rounded-full w-fit mx-auto border-2 border-emerald-500/30 shadow-glow-secondary">
                            <CheckCircle className="h-16 w-16 text-emerald-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Sello Exitoso</h3>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Inyectado en Ledger Inmutable</p>
                        </div>
                        <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => setIsPaying(false)}>Finalizar Protocolo</Button>
                    </div>
                )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
