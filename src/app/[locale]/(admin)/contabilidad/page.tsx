
"use client";

import { useState } from "react";
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
    FileText,
    Landmark,
    Banknote,
    History
} from "lucide-react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { useToast } from "@/hooks/use-toast";

export default function ContabilidadPage() {
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

  const contabilidadModules = adminNavGroups.find(g => g.title === "Contabilidad")?.items || [];

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      {/* 1. HEADER ESTRATÉGICO */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> NODO CONTABLE v2.6
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Inteligencia <span className="text-primary italic">Financiera</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Arquitectura VEN-NIF & IFRS • Gestión Global</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">
                <Link href="/billetera-cambio">
                    <Wallet className="mr-2 h-4 w-4" /> EXCHANGE
                </Link>
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                AUDITORÍA MAESTRA
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        {/* 2. KPIs DE LIQUIDEZ */}
        <StatsCards />

        {/* 3. NÚCLEO OPERATIVO ORGANIZADO */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* AGENTE FISCAL - BLOQUE IZQUIERDO */}
            <Card className="lg:col-span-7 glass-card border-primary/20 overflow-hidden relative group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-all duration-1000">
                    <Bot className="h-48 w-48 text-primary" />
                </div>
                <CardHeader className="p-10 border-b border-border/50 bg-primary/5">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-foreground">
                                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                                Agente Fiscal Autónomo
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">Supervisión Predictiva de Cumplimiento</CardDescription>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] font-black uppercase tracking-widest h-6 px-4">Activo 24/7</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Prórroga IVA", desc: "Auditada", status: "Ok" },
                            { title: "Libros Fiscales", desc: "Sincronizados", status: "Ok" },
                            { title: "ISLR ARI/ARC", desc: "Validado", status: "Ok" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/[0.02] border border-border/50 rounded-2xl shadow-inner group/item hover:border-primary/30 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                    <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 rounded-md">{item.status}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{item.title}</p>
                                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-8 rounded-3xl bg-black/40 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4"><Terminal className="h-4 w-4 text-primary/20" /></div>
                        <p className="text-sm font-bold italic text-white/60 leading-relaxed uppercase tracking-widest">
                            "Protocolo preventivo: Se recomienda revisar la base imponible del periodo actual. El INPC proyectado sugiere un reajuste de activos no monetarios del 12.4%."
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* TESORERÍA MULTIMONEDA - BLOQUE DERECHO */}
            <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Wallet className="h-32 w-32" /></div>
                <CardHeader className="p-0 mb-10">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                        <Lock className="h-3 w-3" /> Caja Digital Certificada
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                    <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-border/50 pb-4">
                            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇻🇪 Bolívares (VES)</span>
                            <span className="text-3xl font-black italic text-foreground tracking-tighter">Bs. 45.678,90</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-border/50 pb-4">
                            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇺🇸 Dólares (USD)</span>
                            <span className="text-3xl font-black italic text-primary tracking-tighter">$ 12.345,67</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">🇪🇺 Euros (EUR)</span>
                            <span className="text-3xl font-black italic text-foreground/80 tracking-tighter">€ 890,12</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button className="h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">
                            <ArrowDownRight className="mr-2 h-4 w-4" /> INYECTAR
                        </Button>
                        <Button variant="outline" className="h-14 rounded-2xl border-border bg-card/5 text-foreground font-black uppercase text-[10px] tracking-widest hover:bg-card/80 shadow-xl" onClick={() => setIsPaying(true)}>
                            <ArrowUpRight className="mr-2 h-4 w-4" /> DISPERSAR
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* 4. ANÁLISIS Y ACCESO DIRECTO */}
        <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <OverviewChart />
            </div>
            
            {/* MÓDULOS DE CONTROL - BLOQUE ORGANIZADO */}
            <div className="lg:col-span-4 space-y-8">
                <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-white/[0.02] shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Módulos de Control</CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-1 gap-3">
                        {contabilidadModules.map((item) => (
                            <Button
                                key={item.href}
                                asChild
                                variant="ghost"
                                className="justify-between h-12 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-primary/10 hover:text-primary transition-all group"
                            >
                                <Link href={item.href as any}>
                                    <div className="flex items-center gap-4">
                                        <item.icon className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </Card>

                <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow border-none group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000"><Zap className="h-32 w-32" /></div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Zero-Risk Active</h3>
                    <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Sincronización total con el portal fiscal. Blindaje contra sanciones del SENIAT.</p>
                    <Button variant="secondary" asChild className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">
                        <Link href="/zero-risk">ESTADO DE BLINDAJE</Link>
                    </Button>
                </Card>
            </div>
        </div>
      </div>

      {/* 5. DIÁLOGO DE DISPERSIÓN BIOMÉTRICA */}
      <Dialog open={isPaying} onOpenChange={(val) => { setIsPaying(val); if(!val) setPayStep(1); }}>
        <DialogContent className="rounded-[3rem] bg-card/95 backdrop-blur-3xl border-border p-10">
            <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Autorización Maestro</DialogTitle>
            </DialogHeader>
            <div className="py-8">
                {payStep === 1 && (
                    <div className="space-y-8 animate-in fade-in">
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Beneficiario del Pago</Label>
                            <Input placeholder="Nombre o RIF Destino" className="h-12 rounded-xl bg-white/5 border-border font-bold text-sm uppercase" />
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
                            <p className="text-lg font-black uppercase italic text-foreground tracking-tight">Escaneo de Identidad</p>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                                <Loader2 className="h-4 w-4 animate-spin" /> Verificando Firma...
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
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Dispersión Exitosa</h3>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em]">REGISTRADO EN LEDGER INMUTABLE</p>
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-xl border-border text-[9px] font-black uppercase tracking-widest" onClick={() => setIsPaying(false)}>FINALIZAR PROTOCOLO</Button>
                    </div>
                )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
