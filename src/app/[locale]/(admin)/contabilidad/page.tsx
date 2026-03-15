
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
    Banknote
} from "lucide-react";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [payStep, setPayStep] = useState(1);
  const contabilidadGroup = adminNavGroups.find(g => g.title === "Contabilidad");

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
    <div className="space-y-12 pb-20 px-6 md:px-10">
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> ÁREA CONTABLE
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión <span className="text-primary italic">Financiera</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Automatización VEN-NIF • Control Fiscal Activo</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-secondary/30 bg-secondary/5 text-secondary">
                <Link href="/mercado-ecocreditos">
                    <Coins className="mr-2 h-4 w-4" /> CANJE DE PUNTOS
                </Link>
            </Button>
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground hover:bg-card">
                Sincronizar BCV
            </Button>
        </div>
      </motion.header>

      <div className="space-y-10">
        <StatsCards />

        <section className="space-y-8">
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40 italic">Tesorería / Caja Digital</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Saldos Multimoneda */}
                <Card className="lg:col-span-5 glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-10">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-primary">Saldo Disponible Consolidado</CardTitle>
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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="flex-1 h-12 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest">
                                        <ArrowDownRight className="mr-2 h-4 w-4" /> Recibir Fondos
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-[2.5rem] bg-card/95 backdrop-blur-3xl border-border p-10">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Datos para Depósito</DialogTitle>
                                        <DialogDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Cuentas vinculadas al ecosistema</DialogDescription>
                                    </DialogHeader>
                                    <div className="py-6 space-y-6">
                                        <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
                                            <p className="text-[9px] font-black uppercase text-primary tracking-widest">🏦 Banco Nacional (Bs.)</p>
                                            <div className="text-sm font-mono text-foreground/80 space-y-1 uppercase">
                                                <p>Kyron, C.A.</p>
                                                <p>J-12345678-9</p>
                                                <p>0102-XXXX-XXXX-XXXX-XXXX</p>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
                                            <p className="text-[9px] font-black uppercase text-secondary tracking-widest">🏦 Custodia Digital ($)</p>
                                            <div className="text-sm font-mono text-foreground/80 space-y-1">
                                                <p>SWIFT: KYRONVEAA</p>
                                                <p>ACCT: 9876543210</p>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button className="w-full h-12 rounded-xl font-black uppercase text-[10px]">Copiar Datos</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={isPaying} onOpenChange={(val) => { setIsPaying(val); if(!val) setPayStep(1); }}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex-1 h-12 rounded-xl border-border bg-card/5 text-foreground font-black uppercase text-[9px] tracking-widest hover:bg-card/80">
                                        <ArrowUpRight className="mr-2 h-4 w-4" /> Hacer Pago
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-[2.5rem] bg-card/95 backdrop-blur-3xl border-border p-10">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Emitir Pago Digital</DialogTitle>
                                    </DialogHeader>
                                    
                                    <div className="py-6">
                                        {payStep === 1 && (
                                            <div className="space-y-6 animate-in fade-in">
                                                <div className="space-y-2">
                                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Beneficiario</Label>
                                                    <Input placeholder="Nombre o RIF" className="bg-muted/30 border-border rounded-xl h-12 text-xs font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 ml-1">Monto de la Operación</Label>
                                                    <div className="relative">
                                                        <Input type="number" placeholder="0.00" className="bg-muted/30 border-border rounded-xl pl-12 h-14 text-lg font-black italic" />
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">$</span>
                                                    </div>
                                                </div>
                                                <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest" onClick={handleSimulatePayment}>AUTORIZAR PAGO</Button>
                                            </div>
                                        )}

                                        {payStep === 2 && (
                                            <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                                                    <div className="p-8 rounded-[2.5rem] border-2 border-primary bg-primary/10 relative z-10">
                                                        <Fingerprint className="h-16 w-16 text-primary" />
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <p className="text-sm font-black uppercase italic text-foreground">Validando Identidad</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] flex items-center gap-2">
                                                        <Loader2 className="h-3 w-3 animate-spin" /> Escaneo Biométrico...
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {payStep === 3 && (
                                            <div className="py-12 text-center space-y-6 animate-in fade-in">
                                                <div className="p-6 bg-emerald-500/10 rounded-full w-fit mx-auto border-2 border-emerald-500/30">
                                                    <CheckCircle className="h-16 w-16 text-emerald-500" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Pago Exitoso</h3>
                                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Transacción Sellada en Ledger</p>
                                                </div>
                                                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => setIsPaying(false)}>Cerrar Protocolo</Button>
                                            </div>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Movimientos Recientes */}
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Movimientos Recientes</CardTitle>
                        <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-primary">Historial Completo <ArrowRight className="ml-2 h-3 w-3"/></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-widest opacity-30">Descripción</TableHead>
                                    <TableHead className="text-right pr-10 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { date: "08 MAR", desc: "Pago Factura #F123", amount: -450.00, curr: "USD", type: "out" },
                                    { date: "07 MAR", desc: "Recarga Línea Kyron 5G", amount: -1200.00, curr: "Bs.", type: "out" },
                                    { date: "06 MAR", desc: "Cobro Cliente Epsilon", amount: 2300.00, curr: "USD", type: "in" },
                                    { date: "05 MAR", desc: "Pago Nómina Q1 (Billetera)", amount: -8500.00, curr: "Bs.", type: "out" },
                                ].map((move, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-colors group">
                                        <TableCell className="pl-10 py-5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">{move.date}</TableCell>
                                        <TableCell className="py-5 font-bold text-foreground/80 text-xs uppercase italic flex items-center gap-3">
                                            <Lock className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
                                            {move.desc}
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

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                   <OverviewChart />
              </div>
              <div className="lg:col-span-4">
                   <RecentInvoices />
              </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center gap-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/40">Protocolos de Control</h2>
                <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 lg:col-span-2 shadow-xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Automatización de Balances</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <p className="text-lg font-bold italic text-muted-foreground/60 leading-relaxed text-justify">
                            El sistema procesa los registros contables garantizando la integridad bajo normas nacionales. La automatización del ajuste por inflación utiliza datos oficiales para reflejar la situación económica real de la empresa en múltiples divisas.
                        </p>
                        <div className="p-10 rounded-[2.5rem] bg-muted/30 border border-border shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-8 flex items-center gap-3">
                                <Terminal className="h-4 w-4" /> Pasos del Cierre Mensual
                            </h4>
                            <div className="text-sm font-bold italic text-muted-foreground/70 leading-relaxed text-justify space-y-4">
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[1]</span>
                                    <span>Consolidación de ventas del periodo actual.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[2]</span>
                                    <span>Ejecución del análisis de inflación basado en el BCV.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[3]</span>
                                    <span>Generación de reportes de situación financiera.</span>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="font-black text-xs text-primary">[4]</span>
                                    <span>Cierre de libros fiscales para presentación oficial.</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-10 border-t border-border mt-10 flex justify-between items-center">
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                            <ShieldCheck className="h-4 w-4 text-primary" /> VALIDACIÓN FISCAL 2026
                        </div>
                        <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow uppercase tracking-widest">Activo</Badge>
                    </CardFooter>
                </Card>

                <div className="space-y-8">
                    <Card className="glass-card border-none bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                            <Landmark className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3 relative z-10">
                            <Scale className="h-6 w-6" /> Asesoría IA
                        </h3>
                        <p className="text-sm font-bold opacity-80 leading-relaxed mb-8 relative z-10 uppercase tracking-wide">
                            Analice el impacto legal de sus estados financieros con nuestro asistente especializado.
                        </p>
                        <Button asChild className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-2xl">
                            <Link href="/gaceta-6952" className="flex items-center justify-center">CONSULTAR GACETA <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic pl-4">Herramientas Contables</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {contabilidadGroup?.items.slice(1).map((item) => (
                                <Button key={item.href} asChild variant="ghost" className="justify-between h-12 px-6 rounded-2xl border border-border bg-card/40 hover:bg-primary/5 hover:border-primary/30 transition-all group">
                                    <Link href={item.href as any} className="flex items-center gap-4">
                                        <item.icon className="h-4 w-4 text-primary/40 group-hover:text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-foreground">{item.label}</span>
                                    </Link>
                                    <ChevronRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary" />
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
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
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
}
