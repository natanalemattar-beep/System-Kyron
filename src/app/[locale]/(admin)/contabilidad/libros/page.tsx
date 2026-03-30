
"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { Book, ArrowLeft, Search, FileText, BookOpen, Scale, Receipt, HandCoins, Banknote, Calculator, Landmark, Coins, CircleCheck as CheckCircle, Building2, Activity, Wallet, Users, Timer, Zap, Clock, Box, TrendingUp, Gavel, ShieldCheck, FileSearch, LayoutDashboard, ChartPie as PieChart, ChartBar as BarChart3, ArrowRight, Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MotionContainer, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const libraryCategories = [
  {
    title: "Contables Maestros",
    icon: Book,
    items: [
      { label: "Libro Diario", href: "/contabilidad/libros/diario", kpi: "Asientos: Ok", icon: FileText, color: "text-primary" },
      { label: "Libro Mayor", href: "/contabilidad/libros/mayor", kpi: "Saldos síncronos", icon: BookOpen, color: "text-primary" },
      { label: "Inventario de Bienes", href: "/contabilidad/libros/inventario", kpi: "Stock auditado", icon: Box, color: "text-amber-600" },
    ]
  },
  {
    title: "Especializados IVA",
    icon: Landmark,
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", kpi: "Dossier Completo", icon: Receipt, color: "text-primary" },
      { label: "Retenciones IVA", href: "/contabilidad/tributos/retenciones-iva", kpi: "75%/100% Sync", icon: HandCoins, color: "text-emerald-500" },
      { label: "Prorrateo Fiscal", href: "/contabilidad/libros/compra-venta", kpi: "Cálculo Activo", icon: Calculator, color: "text-primary" },
    ]
  },
  {
    title: "Especies y Otros",
    icon: Landmark,
    items: [
      { label: "Control de Licores", href: "/contabilidad/libros/control-licores", kpi: "Ley Alcohólicas", icon: Landmark, color: "text-rose-600" },
      { label: "Grandes Patrimonios", href: "/contabilidad/tributos/igp", kpi: "Base Anual", icon: Coins, color: "text-amber-600" },
    ]
  },
  {
    title: "Laborales LOTTT",
    icon: Users,
    items: [
      { label: "Nómina y Personal", href: "/contabilidad/libros/nomina", kpi: "Auditoría Ok", icon: Users, color: "text-primary" },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", kpi: "Control Diario", icon: Timer, color: "text-amber-600" },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Beneficio Alim.", icon: Banknote, color: "text-emerald-500" },
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
        title: "ÁREA EN DESARROLLO",
        description: `El registro "${item.label}" está siendo sincronizado con el motor central.`,
      });
    }
  };

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-12">
      <MotionContainer variant="fade-left" className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-4">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight flex items-center gap-4 italic leading-none italic-shadow">
            <Book className="h-10 w-10 text-primary" />
            Bóveda de <span className="text-primary">Registros</span>
          </h1>
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest opacity-60">Biblioteca Central de Libros Digitales 2026</p>
        </div>
      </MotionContainer>

      <MotionContainer variant="fade-up" delay={0.15} className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
        <Input 
            placeholder="Buscar libro por nombre o categoría..." 
            className="h-14 rounded-2xl bg-card border-none shadow-sm pl-12 font-bold uppercase text-xs tracking-widest placeholder:text-slate-300 text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </MotionContainer>

      <div className="space-y-16">
        {libraryCategories.map((category, idx) => (
          <div key={idx} className="space-y-8">
            <MotionContainer variant="fade-left" delay={idx * 0.05} className="flex items-center gap-4 ml-2">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.4em] text-foreground italic">{category.title}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </MotionContainer>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.07}>
              {category.items
                .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                .map((item, i) => (
                <StaggerItem key={i} variant="scale-in">
                  <Link href={item.href as any} onClick={(e) => handleItemClick(e, item)}>
                    <Card className="glass-card border-none bg-card hover:bg-white/[0.05] transition-all rounded-[2.5rem] p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg hover-lift min-h-[160px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                          <item.icon className="h-12 w-12" />
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-all duration-300 border border-transparent group-hover:border-primary/20 shadow-inner group-hover:scale-110">
                          <item.icon className={cn("h-6 w-6 transition-all duration-300", item.color)} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors duration-300 leading-tight">{item.label}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{item.kpi}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-glow-sm">
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
