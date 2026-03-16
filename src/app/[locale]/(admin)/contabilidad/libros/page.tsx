
"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { 
  Book, 
  ArrowLeft, 
  Search, 
  FileText, 
  BookOpen, 
  Scale, 
  Receipt, 
  HandCoins, 
  Banknote, 
  Calculator, 
  Landmark, 
  Coins, 
  Stamp, 
  CheckCircle, 
  Building2, 
  Activity, 
  Wallet, 
  Users, 
  Timer, 
  Plane, 
  Zap, 
  Clock, 
  Box, 
  TrendingUp, 
  Gavel, 
  ShieldCheck, 
  FileSearch, 
  LayoutDashboard,
  PieChart,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const libraryCategories = [
  {
    title: "Contables Básicos",
    icon: Book,
    items: [
      { label: "Libro Diario", href: "#", kpi: "Asientos al día", icon: FileText, color: "text-primary" },
      { label: "Libro Mayor", href: "#", kpi: "Saldos revisados", icon: BookOpen, color: "text-primary" },
      { label: "Libro de Balance", href: "/reports", kpi: "Cierre mensual", icon: Scale, color: "text-emerald-500" },
    ]
  },
  {
    title: "Fiscales y Tributarios",
    icon: Landmark,
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", kpi: "Marzo: Al día", icon: Receipt, color: "text-primary" },
      { label: "Retenciones IVA", href: "/contabilidad/tributos/retenciones-iva", kpi: "15 registradas", icon: HandCoins, color: "text-emerald-500" },
      { label: "Retenciones ISLR", href: "/contabilidad/tributos/retenciones-islr", kpi: "Pendiente AR-C", icon: Banknote, color: "text-amber-600" },
      { label: "Libro de IVA", href: "/contabilidad/tributos/iva", kpi: "Débito vs Crédito", icon: Calculator, color: "text-primary" },
      { label: "Libro de ISLR", href: "/contabilidad/tributos/islr", kpi: "Estimada 2026", icon: Landmark, color: "text-primary" },
      { label: "Libro de IGTF", href: "/contabilidad/tributos/igtf", kpi: "Operaciones 3%", icon: Coins, color: "text-rose-600" },
      { label: "Homologación", href: "/contabilidad/tributos/homologacion", kpi: "Equipos: Ok", icon: CheckCircle, color: "text-emerald-500" },
    ]
  },
  {
    title: "Tesorería y Bancos",
    icon: Wallet,
    items: [
      { label: "Libro de Bancos", href: "/contabilidad/cuentas", kpi: "4 cuentas", icon: Building2, color: "text-primary" },
      { label: "Conciliación", href: "/analisis-caja", kpi: "Conciliado hoy", icon: Activity, color: "text-emerald-500" },
      { label: "Anticipos Prov.", href: "/cuentas-por-pagar", kpi: "2 pendientes", icon: HandCoins, color: "text-rose-600" },
      { label: "Anticipos Cli.", href: "/cuentas-por-cobrar", kpi: "Saldo favor", icon: Coins, color: "text-emerald-500" },
    ]
  },
  {
    title: "Laborales",
    icon: Users,
    items: [
      { label: "Nómina y Personal", href: "/contabilidad/libros/nomina", kpi: "23 Empleados", icon: Users, color: "text-primary" },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Vigente", icon: Banknote, color: "text-emerald-500" },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", kpi: "17h este mes", icon: Timer, color: "text-amber-600" },
      { label: "Prestaciones", href: "/prestaciones-sociales", kpi: "Fondo acumulado", icon: Scale, color: "text-emerald-500" },
    ]
  }
];

export default function TodosLosLibrosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    if (item.href === "#") {
      e.preventDefault();
      toast({
        title: "NODO EN DESARROLLO",
        description: `El registro "${item.label}" está siendo sincronizado con el sistema central.`,
      });
    }
  };

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-4">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4 italic leading-none italic-shadow text-white">
            <Book className="h-10 w-10 text-primary" />
            Bóveda de <span className="text-primary">Registros</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Biblioteca Central de Libros Digitales 2026</p>
        </div>
      </header>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
        <Input 
            placeholder="Buscar libro por nombre o categoría..." 
            className="h-14 rounded-2xl bg-card border-none shadow-sm pl-12 font-bold uppercase text-xs tracking-widest placeholder:text-slate-300 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-16">
        {libraryCategories.map((category, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4 ml-2">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
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
                  <Card className="glass-card border-none bg-card hover:bg-white/[0.05] transition-all rounded-[2.5rem] p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg min-h-[160px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <item.icon className="h-12 w-12" />
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-white/80 group-hover:text-primary transition-colors leading-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{item.kpi}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
