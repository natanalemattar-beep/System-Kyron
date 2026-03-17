
"use client";

import { useState } from "react";
import { 
    Calculator, 
    TrendingUp, 
    TrendingDown,
    Activity, 
    CheckCircle,
    Zap,
    ArrowRight,
    BookOpen,
    Landmark,
    Users,
    History,
    Box,
    Receipt,
    Loader2,
    ShieldAlert,
    BarChart3
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OverviewChart } from "@/components/dashboard/overview-chart";

const kpiStats = [
  { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-600" },
  { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-600" },
  { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-primary" },
  { label: "LIQUIDEZ SISTEMA", value: "2.45", sub: "ÓPTIMO", icon: Activity, color: "text-blue-500" },
];

const quickBooks = [
    { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Al día", color: "text-blue-600" },
    { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-600" },
    { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box, kpi: "45 SKUs", color: "text-amber-600" },
    { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Ok", color: "text-rose-600" },
];

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const [simulation, setSimulation] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClosePeriod = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toast({
        title: "PERIODO CERRADO",
        description: "Ejercicio fiscal sellado con éxito.",
        action: <CheckCircle className="text-primary h-4 w-4" />
      });
    }, 800);
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-6 py-2 mt-6 md:mt-10">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2 md:mb-3">
                <Calculator className="h-3 w-3" /> CENTRO OPERATIVO CENTRAL
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-none text-foreground italic-shadow">
                CENTRO DE <span className="text-primary italic">MANDO</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-1 md:mt-2 italic">
                Portal Empresarial • Gestión Consolidada 2026
            </p>
        </div>
        <div className="flex w-full md:w-auto gap-3 no-print">
            <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 px-4 md:px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground/60">
                <History className="mr-2 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button 
                className="flex-1 md:flex-none btn-3d-primary h-11 md:h-12 px-6 md:px-10 rounded-xl font-black text-[9px] uppercase tracking-widest"
                onClick={handleClosePeriod}
                disabled={isClosing}
            >
                {isClosing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Receipt className="mr-2 h-4 w-4" />}
                {isClosing ? "PROCESANDO" : "CERRAR PERIODO"}
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiStats.map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 md:p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform shadow-inner">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="text-xl md:text-2xl font-black italic tracking-tighter text-foreground break-words">{kpi.value}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between ml-2 gap-4">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-xl"><BookOpen className="h-5 w-5 text-primary" /></div>
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-foreground/60">Registros Certificados</h3>
            </div>
            <Button asChild variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest p-0 h-auto self-start sm:self-auto">
                <Link href="/contabilidad/libros" className="flex items-center gap-2">
                    BIBLIOTECA COMPLETA <ArrowRight className="h-3 w-3"/>
                </Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickBooks.map((item, i) => (
                <Link key={i} href={item.href as any}>
                    <Card className="glass-card border-none bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-6 md:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                                <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors italic">{item.label}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.kpi}</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-all" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 w-full overflow-hidden">
            <OverviewChart />
        </div>

        <div className="lg:col-span-5 space-y-8">
            <Card className="glass-card border-none bg-[#050505] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><BarChart3 className="h-32 md:h-48 w-32 md:w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#00A86B]">Escenarios IA</h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Modelado Predictivo</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <Button 
                            onClick={() => toast({ title: "SIMULACIÓN ACTIVA" })}
                            variant="outline" 
                            className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-[#00A86B] hover:border-[#00A86B] group text-white"
                        >
                            <TrendingUp className="mr-4 h-5 w-5 text-[#00A86B] group-hover:text-white transition-all" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Aumento Ventas 20%</span>
                        </Button>
                        <Button 
                            onClick={() => toast({ title: "SIMULACIÓN ACTIVA" })}
                            variant="outline" 
                            className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-rose-500 hover:border-rose-500 group text-white"
                        >
                            <ShieldAlert className="mr-4 h-5 w-5 text-rose-500 group-hover:text-white transition-all" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Escenario Inflación</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
