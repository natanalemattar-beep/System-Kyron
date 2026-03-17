
"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { Building2, ArrowLeft, Search, Landmark, FileText, History, HandCoins, Coins, TrendingUp, ChartPie as PieChart, ChartBar as BarChart3, Activity, Calculator, ShieldCheck, FileSearch, Banknote, ArrowUpRight, Wallet, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const libraryCategories = [
  {
    title: "Cuentas Bancarias",
    icon: Landmark,
    items: [
      { label: "Libro de Bancos", icon: Building2, kpi: "4 cuentas", color: "text-blue-600", href: "/analisis-caja" },
      { label: "Conciliación Bancaria", icon: Activity, kpi: "Al día", color: "text-emerald-600", href: "/analisis-caja" },
      { label: "Cheques Emitidos", icon: FileText, kpi: "Registro: Ok", color: "text-slate-600", href: "#" },
      { label: "Depósitos", icon: Wallet, kpi: "Sincronizado", color: "text-emerald-600", href: "/analisis-caja" },
      { label: "Transferencias", icon: ExternalLink, kpi: "T+0", color: "text-blue-600", href: "#" },
    ]
  },
  {
    title: "Anticipos",
    icon: HandCoins,
    items: [
      { label: "Anticipos a Proveedores", icon: HandCoins, kpi: "2 activos", color: "text-rose-600", href: "/cuentas-por-pagar" },
      { label: "Anticipos de Clientes", icon: Coins, kpi: "Crédito favor", color: "text-emerald-600", href: "/cuentas-por-cobrar" },
    ]
  },
  {
    title: "Análisis Avanzado",
    icon: TrendingUp,
    items: [
      { label: "Flujo Proyectado", icon: Activity, kpi: "12 meses", color: "text-emerald-600", href: "/analisis-caja" },
      { label: "Reporte de CxC", icon: FileSearch, kpi: "Clientes", color: "text-blue-600", href: "/cuentas-por-cobrar" },
      { label: "Reporte de CxP", icon: FileSearch, kpi: "Proveedores", color: "text-rose-600", href: "/cuentas-por-pagar" },
    ]
  }
];

export default function TodasLasCuentasPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    if (item.href === "#") {
      e.preventDefault();
      toast({
        title: "ÁREA EN CONSTRUCCIÓN",
        description: `El servicio "${item.label}" está siendo sincronizado con el sistema de tesorería.`,
      });
    }
  };

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-4 transition-all">
            <Link href="/cuentas"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4 italic leading-none italic-shadow">
            <Wallet className="h-10 w-10 text-secondary" />
            Gestión de Cuentas
          </h1>
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest opacity-60">Repositorio Central de Tesorería y Bancos 2026</p>
        </div>
      </header>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
        <Input 
            placeholder="Buscar cuenta o reporte..." 
            className="h-14 rounded-2xl bg-card border-none shadow-sm pl-12 font-bold uppercase text-xs tracking-widest placeholder:text-slate-300 text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-16">
        {libraryCategories.map((category, idx) => {
          const filteredItems = category.items.filter(item => 
            item.label.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-8">
              <div className="flex items-center gap-4 ml-2">
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-[0.4em] text-foreground italic">{category.title}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map((item, i) => (
                  <Link key={i} href={item.href as any} onClick={(e) => handleItemClick(e, item)} className="block group">
                    <Card className="glass-card border-none bg-card hover:bg-muted/20 transition-all rounded-[2rem] p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg min-h-[160px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><item.icon className="h-12 w-12" /></div>
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-muted rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-border shadow-inner">
                          <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors leading-tight">{item.label}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{item.kpi}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
