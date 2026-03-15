
"use client";

import { useState, useEffect } from "react";
import { 
    Calculator, 
    Wallet, 
    TrendingUp, 
    ShieldCheck, 
    Activity, 
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
    CreditCard,
    Loader2,
    Receipt,
    BookOpen,
    Landmark,
    Users,
    History,
    Calendar,
    FileSearch,
    Box,
    HandCoins,
    Stamp,
    FileText,
    Banknote
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OverviewChart } from "@/components/dashboard/overview-chart";

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [simulation, setSimulation] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runSimulation = (type: string) => {
    setSimulation(null);
    setTimeout(() => {
      setSimulation(type);
      toast({
        title: "SIMULACIÓN COMPLETADA",
        description: "El sistema ha proyectado los resultados del escenario estratégico.",
        action: <CheckCircle className="text-primary h-4 w-4" />
      });
    }, 1000);
  };

  const handleClosePeriod = () => {
    setIsClosing(true);
    toast({
      title: "INICIANDO CIERRE DE PERIODO",
      description: "Auditando balances y sellando libros fiscales...",
    });

    setTimeout(() => {
      setIsClosing(false);
      toast({
        title: "PERIODO CERRADO EXITOSAMENTE",
        description: "El ejercicio fiscal ha sido sellado con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
      });
    }, 3000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      {/* HEADER ESTRATÉGICO */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-[#0A2472] pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] mb-3">
                <Calculator className="h-3 w-3" /> CONSOLA DE MANDO v2.6.5
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none text-[#0A2472]">CENTRO DE <span className="text-[#00A86B] italic">INTELIGENCIA</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Control de Gestión Financiera • Ejercicio 2026</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white text-[#0A2472]">
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button 
                className="bg-[#0A2472] hover:bg-blue-900 text-white h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                onClick={handleClosePeriod}
                disabled={isClosing}
            >
                {isClosing ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Receipt className="mr-3 h-4 w-4" />}
                {isClosing ? "PROCESANDO..." : "CERRAR PERIODO"}
            </Button>
        </div>
      </motion.header>

      {/* KPIs EJECUTIVOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-600" },
          { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-600" },
          { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-[#0A2472]" },
          { label: "LIQUIDEZ SISTEMA", value: "2.45", sub: "ÓPTIMO", icon: Activity, color: "text-blue-500" },
        ].map((kpi, i) => (
          <Card key={i} className="border-none bg-white p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-[#0A2472]">{kpi.value}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- SECCIÓN MAESTRA DE LIBROS --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between ml-2">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-[#0A2472]/5 rounded-xl"><BookOpen className="h-5 w-5 text-[#0A2472]" /></div>
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472]">Libros y Registros</h3>
            </div>
            <Button asChild variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest p-0 h-auto">
                <Link href="/contabilidad/libros" className="flex items-center gap-2">
                    BIBLIOTECA COMPLETA <ArrowRight className="h-3 w-3"/>
                </Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Marzo: Al día", color: "text-blue-600" },
                { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-600" },
                { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box, kpi: "45 SKUs", color: "text-amber-600" },
                { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Alícuotas: Ok", color: "text-rose-600" },
            ].map((item, i) => (
                <Link key={i} href={item.href as any}>
                    <Card className="border-none bg-white hover:bg-slate-50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                                <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors">{item.label}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.kpi}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ArrowRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* --- TRIBUTOS Y CUMPLIMIENTO --- */}
        <div className="lg:col-span-7 space-y-8">
            <Card className="border-none shadow-sm rounded-[3rem] bg-white overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b bg-slate-50/50 flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Unidad de Tributos</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase opacity-40 mt-1">Gestión ante el SENIAT</CardDescription>
                    </div>
                    <Badge className="bg-[#00A86B]/10 text-[#00A86B] border-none text-[8px] font-black uppercase px-3">Blindado</Badge>
                </CardHeader>
                <CardContent className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { label: "IVA", desc: "Declaración mensual", href: "/declaracion-iva", icon: FileText },
                        { label: "ISLR AR-C", desc: "Comprobantes retención", href: "/islr-arc", icon: Banknote },
                        { label: "Retenciones", desc: "IVA e ISLR proveedores", href: "/contabilidad/impuestos/retenciones", icon: ShieldCheck },
                        { label: "Homologación", desc: "Equipos fiscales", href: "/contabilidad/impuestos/homologacion", icon: CheckCircle },
                    ].map(t => (
                        <Link key={t.label} href={t.href as any} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                <t.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase text-[#0A2472]">{t.label}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.desc}</p>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[3rem] bg-white p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-48 w-48 text-primary" /></div>
                <div className="space-y-6 relative z-10">
                    <div className="space-y-2 text-center md:text-left">
                        <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Cero Riesgo Fiscal</Badge>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#0A2472] leading-none">Auditoría IA Permanente</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed uppercase tracking-widest max-w-md text-center md:text-left">
                        Supervisión automática de cada factura contra la Gaceta Oficial para garantizar integridad absoluta.
                    </p>
                </div>
                <Button asChild className="relative z-10 h-16 px-12 rounded-2xl bg-[#0A2472] text-white font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-blue-900">
                    <Link href="/zero-risk">VER ESTADO</Link>
                </Button>
            </Card>
        </div>

        {/* --- ANÁLISIS ESTRATÉGICO --- */}
        <div className="lg:col-span-5 space-y-8">
            <Card className="border-none shadow-xl rounded-[3rem] bg-[#0A2472] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><BarChart3 className="h-48 w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#00A86B]">Simulador BI</h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Escenarios de Negocio</p>
                    </div>
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
                                className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-[#00A86B] hover:border-[#00A86B] group text-white transition-all"
                            >
                                <sc.icon className="mr-4 h-5 w-5 text-[#00A86B] group-hover:text-white group-hover:scale-110 transition-all" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{sc.label}</span>
                            </Button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        {simulation && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
                                <p className="text-[9px] font-black uppercase text-[#00A86B] mb-2">Impacto Proyectado</p>
                                <p className="text-sm font-bold italic text-white/80 leading-relaxed uppercase">
                                    {simulation === 'ventas' ? "Incremento del 28% en rentabilidad neta." : 
                                     simulation === 'sucursales' ? "Punto de equilibrio en 14 meses." : 
                                     "Requerimiento de liquidez adicional del 15%."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[3rem] bg-white p-10 flex flex-col justify-between">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl border"><Calendar className="h-6 w-6 text-slate-400" /></div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Calendario Fiscal</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-amber-50 transition-all">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">IVA - Marzo Q1</span>
                            <Badge className="bg-amber-500 text-white border-none text-[8px] font-black uppercase h-5 px-3">Vence en 5d</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-rose-50 transition-all">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">ISLR - Anual</span>
                            <Badge className="bg-rose-500 text-white border-none text-[8px] font-black uppercase h-5 px-3">Vence 31/03</Badge>
                        </div>
                    </div>
                </div>
                <Button variant="outline" asChild className="w-full h-12 rounded-xl border-slate-200 text-slate-400 hover:text-[#0A2472] font-black uppercase text-[10px] tracking-widest mt-8">
                    <Link href="/contabilidad/impuestos/calendario">VER CRONOGRAMA COMPLETO</Link>
                </Button>
            </Card>
        </div>
      </div>

      {/* --- GRÁFICO DE RENDIMIENTO --- */}
      <div className="grid gap-10">
        <OverviewChart />
      </div>
    </div>
  );
}
