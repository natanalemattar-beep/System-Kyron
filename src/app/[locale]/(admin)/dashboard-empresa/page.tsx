
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
    FileText,
    ShoppingCart,
    Smartphone,
    Receipt,
    History,
    Heart,
    Gavel,
    FileSignature,
    UserCheck,
    Scale,
    Landmark,
    Banknote,
    Percent,
    Stamp,
    Recycle,
    Leaf,
    Coins,
    Users,
    Briefcase,
    Clock,
    Search,
    Database,
    Box,
    Truck,
    LayoutDashboard
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OverviewChart } from "@/components/dashboard/overview-chart";

// --- Módulos por Nodo de Inteligencia ---
const nodeGroups = [
  {
    title: "Finanzas y Contabilidad",
    icon: Calculator,
    color: "text-blue-500",
    items: [
      { label: "Contabilidad", href: "/contabilidad", kpi: "Auditoría OK", icon: Calculator },
      { label: "Cuentas x Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 45.6k", icon: Wallet },
      { label: "Cuentas x Pagar", href: "/cuentas-por-pagar", kpi: "3 Pendientes", icon: Truck },
      { label: "Ajuste RIPF", href: "/ajuste-por-inflacion", kpi: "INPC Activo", icon: Activity },
      { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence en 5d", icon: FileText },
      { label: "ISLR AR-C", href: "/islr-arc", kpi: "Generado", icon: Landmark },
      { label: "Billetera Cambio", href: "/billetera-cambio", kpi: "Tasas BCV", icon: Globe },
      { label: "Rentabilidad Pro", href: "/analisis-rentabilidad", kpi: "VAN: $450k", icon: BarChart3 },
    ]
  },
  {
    title: "Ventas y Facturación",
    icon: ShoppingCart,
    color: "text-emerald-500",
    items: [
      { label: "Facturación", href: "/facturacion", kpi: "Hub Activo", icon: FileText },
      { label: "Punto de Venta", href: "/punto-de-venta", kpi: "Terminal 01", icon: Smartphone },
      { label: "Ventas Crédito", href: "/facturacion-credito", kpi: "Cashea Sync", icon: CreditCard },
      { label: "Cotizaciones", href: "/proformas", kpi: "5 Enviadas", icon: Receipt },
      { label: "Invoices", href: "/invoices", kpi: "Ledger Ok", icon: History },
      { label: "Fidelización", href: "/fidelizacion-clientes", kpi: "98% Retención", icon: Heart },
      { label: "Análisis Ventas", href: "/analisis-ventas", kpi: "+12.7% Mes", icon: TrendingUp },
      { label: "Análisis Mercado", href: "/analisis-mercado", kpi: "8.5% Growth", icon: PieChart },
    ]
  },
  {
    title: "Legal y Corporativo",
    icon: Gavel,
    color: "text-amber-500",
    items: [
      { label: "Escritorio Jurídico", href: "/escritorio-juridico", kpi: "Vault Pro", icon: Gavel },
      { label: "Actas Asamblea", href: "/acta-asamblea", kpi: "Última: 15/03", icon: FileSignature },
      { label: "Contratos", href: "/contratos", kpi: "24 Activos", icon: ShieldCheck },
      { label: "Autorizaciones", href: "/autorizaciones", kpi: "SAPI Valid", icon: UserCheck },
      { label: "Permisos Vigentes", href: "/permisos", kpi: "CONATEL Ok", icon: ShieldAlert },
      { label: "Recursos Fiscales", href: "/recursos-fiscales", kpi: "Leyes 2026", icon: Scale },
      { label: "Poderes Holding", href: "/poderes-representacion", kpi: "8 Vigentes", icon: Users },
      { label: "Tramites Corp", href: "/tramites-corporativos", kpi: "Internacional", icon: Globe },
    ]
  },
  {
    title: "Talento y Operaciones",
    icon: Users,
    color: "text-purple-500",
    items: [
      { label: "Nómina Q1", href: "/nominas", kpi: "Procesada", icon: Users },
      { label: "Liquidaciones", href: "/prestaciones-sociales", kpi: "Cálculo IA", icon: Calculator },
      { label: "Reclutamiento", href: "/reclutamiento", kpi: "2 Vacantes", icon: Target },
      { label: "Ingeniería IA", href: "/it/dashboard", kpi: "Noc Activo", icon: Cpu },
      { label: "Sostenibilidad", href: "/sostenibilidad", kpi: "1.2k E-CR", icon: Recycle },
      { label: "Zero Risk", href: "/zero-risk", kpi: "Protegido", icon: ShieldCheck },
      { label: "Data Entry", href: "/data-entry", kpi: "OCR 99%", icon: Box },
      { label: "Reportes Pro", href: "/reports", kpi: "Dossier 2026", icon: FileText },
    ]
  }
];

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
      {/* 1. HEADER HUD */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-[#0A2472] pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] shadow-glow mb-4">
                <Cpu className="h-3 w-3" /> NODO CENTRAL v2.6.5
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">DASHBOARD <span className="text-[#0A2472] italic">EMPRESA</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Consola de Inteligencia de Negocios • Control Total</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-[#0A2472]/20 bg-[#0A2472]/5 text-[#0A2472]">
                AUDITORÍA GLOBAL
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472]">
                CERRAR PERIODO
            </Button>
        </div>
      </motion.header>

      {/* 2. KPIs GLOBALES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-500" },
          { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-primary" },
          { label: "LIQUIDEZ NODO", value: "2.45", sub: "ÓPTIMO", icon: Activity, color: "text-blue-400" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-xl hover:bg-card/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted/50 border border-border">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tighter text-foreground">{kpi.value}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. GEMELO DIGITAL Y BLINDAJE FISCAL */}
      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 glass-card border-primary/20 overflow-hidden bg-white/[0.02] rounded-[3.5rem] shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 bg-primary/5">
                <CardTitle className="flex items-center gap-4 text-2xl font-black uppercase italic tracking-tighter">
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
                            className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 group"
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
                            <p className="text-sm font-bold italic text-foreground leading-relaxed">
                                {simulation === 'ventas' ? "Incremento del 28% en rentabilidad neta para el cierre de ciclo." : 
                                 simulation === 'sucursales' ? "Punto de equilibrio estimado en 14 meses bajo inversión CapEx." : 
                                 "Requerimiento de liquidez adicional del 15% detectado por el motor IA."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>

        <Card className="lg:col-span-7 bg-emerald-600 text-white rounded-[3.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden shadow-glow-secondary border-none group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-48 w-48" /></div>
            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Protocolo Zero-Risk Activo</Badge>
                    <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Blindaje Fiscal <br/> Inexpugnable</h3>
                </div>
                <p className="text-sm font-medium opacity-80 leading-relaxed uppercase tracking-widest max-w-md">
                    Cada transacción es auditada por la IA contra la Gaceta Oficial y sellada en el Ledger Blockchain. 0% probabilidad de multa fiscal.
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

      {/* 4. MATRIZ DE NODOS OPERATIVOS (CARPETAS) */}
      <section className="space-y-16">
        {nodeGroups.map((group) => (
          <div key={group.title} className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="p-3 bg-[#0A2472]/10 rounded-2xl border border-[#0A2472]/20">
                    <group.icon className={cn("h-6 w-6", group.color)} />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground italic-shadow">{group.title}</h3>
                <div className="h-px flex-1 bg-border/50"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.items.map((item) => (
                <Link key={item.label} href={item.href as any}>
                  <Card className="glass-card border-none bg-card/40 p-8 hover:bg-card/80 transition-all group h-full flex flex-col justify-between border-transparent hover:border-[#0A2472]/30 shadow-xl rounded-[2.5rem]">
                    <div className="space-y-6">
                        <div className="p-3 bg-[#0A2472]/5 rounded-xl w-fit group-hover:scale-110 group-hover:bg-[#0A2472]/10 transition-all shadow-inner border border-[#0A2472]/5">
                        <item.icon className="h-5 w-5 text-[#0A2472]" />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black uppercase tracking-tight text-foreground/80 group-hover:text-[#0A2472] transition-colors leading-none mb-2">{item.label}</h4>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40 italic tracking-widest">{item.kpi}</p>
                        </div>
                    </div>
                    <div className="flex justify-end pt-6">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-[#0A2472] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 5. ANÁLISIS Y FACTURACIÓN VIP */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
            <OverviewChart />
        </div>
        <Card className="lg:col-span-4 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Facturación VIP</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {[
                    { client: "Tech Solutions LLC", date: "20/07", amount: 5000 },
                    { client: "Innovate Corp", date: "18/07", amount: 12000 },
                    { client: "Marketing Pro", date: "25/06", amount: 2500 },
                    { client: "Constructora XYZ", date: "22/07", amount: 7500 },
                ].map((inv, i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                    <TableCell className="pl-10 py-6 font-black text-[10px] text-foreground/80 uppercase italic group-hover:text-primary">{inv.client}</TableCell>
                    <TableCell className="text-right pr-10 py-6 font-mono text-xs font-black text-primary italic">{formatCurrency(inv.amount, 'Bs.')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-6 border-t border-border/50 bg-primary/5 flex justify-center">
             <Button variant="link" asChild className="text-[9px] font-black uppercase tracking-widest text-primary">
                <Link href="/facturacion">VER TODAS LAS FACTURAS <ArrowRight className="ml-2 h-3 w-3"/></Link>
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
