
"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { 
  ArrowLeft, 
  Search, 
  BarChart3, 
  Users, 
  Globe, 
  TrendingUp, 
  Calendar, 
  Calculator, 
  PieChart, 
  Scale, 
  Target, 
  Zap, 
  UserCheck, 
  Briefcase, 
  LineChart, 
  ShieldAlert, 
  Droplets, 
  RefreshCw, 
  TrendingDown, 
  Wallet, 
  History, 
  ArrowRightLeft, 
  Percent, 
  Activity, 
  BarChart, 
  FileText, 
  Layers, 
  Store, 
  Tag, 
  Clock, 
  UserCog, 
  LayoutDashboard, 
  Bell,
  ArrowUpRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const libraryCategories = [
  {
    title: "Ventas e Ingresos",
    icon: TrendingUp,
    items: [
      { label: "Ventas por Producto", href: "/analisis-ventas", kpi: "Último: 15/03", icon: BarChart3, color: "text-blue-600" },
      { label: "Análisis por Cliente", href: "#", kpi: "Tendencia: +5%", icon: Users, color: "text-emerald-600" },
      { label: "Desglose Regional", href: "#", kpi: "Sede Caracas", icon: Globe, color: "text-blue-600" },
      { label: "Evolución Mensual", href: "/analisis-ventas", kpi: "Auditado", icon: LineChart, color: "text-primary" },
      { label: "Estacionalidad", href: "#", kpi: "Patrones Ok", icon: Calendar, color: "text-slate-600" },
    ]
  },
  {
    title: "Costos y Gastos",
    icon: Activity,
    items: [
      { label: "Costos Fijos/Var", href: "/estructura-costos", kpi: "Márgenes Ok", icon: Calculator, color: "text-rose-600" },
      { label: "Centros de Costo", href: "#", kpi: "5 activos", icon: PieChart, color: "text-blue-600" },
      { label: "Real vs Presupuesto", href: "#", kpi: "Varianza: 2%", icon: Scale, color: "text-emerald-600" },
      { label: "Punto de Equilibrio", href: "/estructura-costos", kpi: "Meta: 450 Ud", icon: Target, color: "text-primary" },
    ]
  },
  {
    title: "Rentabilidad",
    icon: Zap,
    items: [
      { label: "Rent. por Producto", href: "/analisis-rentabilidad", kpi: "Margen: 32%", icon: Zap, color: "text-yellow-600" },
      { label: "Rent. por Cliente", href: "#", kpi: "Top VIP", icon: UserCheck, color: "text-emerald-600" },
      { label: "Rent. por Proyecto", href: "#", kpi: "ROI: 2.4", icon: Briefcase, color: "text-blue-600" },
      { label: "Margen Bruto/Neto", href: "/analisis-rentabilidad", kpi: "Sincronizado", icon: LineChart, color: "text-primary" },
    ]
  },
  {
    title: "Riesgo Financiero",
    icon: ShieldAlert,
    items: [
      { label: "Riesgo de Crédito", href: "/analisis-riesgo", kpi: "Mora: 1.2%", icon: ShieldAlert, color: "text-rose-600" },
      { label: "Riesgo de Liquidez", href: "#", kpi: "Cobertura: 4m", icon: Droplets, color: "text-blue-600" },
      { label: "Riesgo Cambiario", href: "#", kpi: "Delta BCV", icon: RefreshCw, color: "text-amber-600" },
      { label: "Tasas de Interés", href: "#", kpi: "Estable", icon: TrendingDown, color: "text-slate-600" },
    ]
  },
  {
    title: "Flujo de Caja",
    icon: Wallet,
    items: [
      { label: "Proyección 30/60/90", href: "/analisis-caja", kpi: "Previsiones", icon: Wallet, color: "text-emerald-600" },
      { label: "Caja Histórico", href: "#", kpi: "Consolidado", icon: History, color: "text-slate-600" },
      { label: "Flujo por Actividad", href: "#", kpi: "Operacional", icon: ArrowRightLeft, color: "text-blue-600" },
    ]
  },
  {
    title: "Ratios Financieros",
    icon: Percent,
    items: [
      { label: "Ratio de Liquidez", href: "#", kpi: "2.45 (Óptimo)", icon: Percent, color: "text-emerald-600" },
      { label: "Endeudamiento", href: "#", kpi: "Ratio: 0.4", icon: Activity, color: "text-rose-600" },
      { label: "ROE / ROA", href: "#", kpi: "Rent. Capital", icon: BarChart, color: "text-primary" },
      { label: "Eficiencia Op.", href: "#", kpi: "Sincronizado", icon: History, color: "text-slate-600" },
    ]
  },
  {
    title: "Factibilidad Económica",
    icon: FileText,
    items: [
      { label: "VAN / TIR", href: "/estudio-factibilidad-economica", kpi: "Viable", icon: FileText, color: "text-primary" },
      { label: "Análisis Sensibilidad", href: "#", kpi: "3 Escenarios", icon: Layers, color: "text-blue-600" },
    ]
  },
  {
    title: "Mercado y Competencia",
    icon: Store,
    items: [
      { label: "Market Share", href: "/analisis-mercado", kpi: "Cuota: 20%", icon: Store, color: "text-blue-600" },
      { label: "Precios Competencia", href: "#", kpi: "Monitor Vivo", icon: Tag, color: "text-amber-600" },
      { label: "Análisis FODA", href: "#", kpi: "Auditado", icon: Search, color: "text-slate-600" },
    ]
  },
  {
    title: "Productividad",
    icon: Clock,
    items: [
      { label: "Prod. por Empleado", href: "#", kpi: "Meta: 100%", icon: Clock, color: "text-emerald-600" },
      { label: "Eficiencia Laboral", href: "#", kpi: "Ok", icon: Zap, color: "text-yellow-600" },
      { label: "Control de Horas", href: "#", kpi: "17h Extras", icon: UserCog, color: "text-blue-600" },
    ]
  },
  {
    title: "Dashboard de KPIs",
    icon: LayoutDashboard,
    items: [
      { label: "Tablero Personal", href: "#", kpi: "Configurado", icon: LayoutDashboard, color: "text-primary" },
      { label: "Alertas Automáticas", href: "#", kpi: "3 Activas", icon: Bell, color: "text-rose-600" },
    ]
  }
];

export default function TodasLasAnalisisPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    if (item.href === "#") {
      e.preventDefault();
      toast({
        title: "ÁREA EN DESARROLLO",
        description: `El módulo "${item.label}" está siendo sincronizado con el motor de inteligencia.`,
      });
    }
  };

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-4">
            <Link href="/analisis"><ArrowLeft className="mr-2 h-4 w-4"/> Volver</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4 italic leading-none">
            <PieChart className="h-10 w-10 text-secondary" />
            Centro de Análisis
          </h1>
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest opacity-60">Biblioteca de Inteligencia de Negocios y BI</p>
        </div>
      </header>

      {/* --- BUSCADOR --- */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
        <Input 
            placeholder="Buscar análisis, ratio o métrica..." 
            className="h-14 rounded-2xl bg-card border-none shadow-sm pl-12 font-bold uppercase text-xs tracking-widest placeholder:text-slate-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* --- CATEGORÍAS --- */}
      <div className="space-y-16">
        {libraryCategories.map((category, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4 ml-2">
              <div className="p-3 bg-primary/5 rounded-xl">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.4em] text-foreground italic">{category.title}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items
                .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                .map((item, i) => (
                <Link key={i} href={item.href as any} onClick={(e) => handleItemClick(e, item)}>
                  <Card className="border-none bg-card hover:bg-muted/20 transition-all rounded-[2rem] p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg min-h-[160px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <item.icon className="h-12 w-12" />
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-muted rounded-2xl group-hover:bg-card transition-colors border border-transparent group-hover:border-border shadow-inner">
                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors leading-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{item.kpi}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-20 pb-10 text-center opacity-20 border-t border-border">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-foreground italic">SYSTEM KYRON • ANALYTICS NODE • 2026</p>
      </footer>
    </div>
  );
}
