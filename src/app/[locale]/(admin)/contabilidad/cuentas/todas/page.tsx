"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { Building2, Search, Landmark, FileText, HandCoins, Coins, TrendingUp, Activity, FileSearch, Wallet, ExternalLink, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const libraryCategories = [
  {
    title: "Cuentas Bancarias",
    icon: Landmark,
    items: [
      { label: "Libro de Bancos", icon: Building2, href: "/contabilidad/analisis-caja" },
      { label: "Conciliación Bancaria", icon: Activity, href: "/contabilidad/conciliacion-bancaria" },
      { label: "Cheques Emitidos", icon: FileText, href: "#" },
      { label: "Depósitos", icon: Wallet, href: "/contabilidad/analisis-caja" },
      { label: "Transferencias", icon: ExternalLink, href: "#" },
    ],
  },
  {
    title: "Anticipos",
    icon: HandCoins,
    items: [
      { label: "Anticipos a Proveedores", icon: HandCoins, href: "/contabilidad/cuentas-por-pagar" },
      { label: "Anticipos de Clientes", icon: Coins, href: "/contabilidad/cuentas-por-cobrar" },
    ],
  },
  {
    title: "Análisis Avanzado",
    icon: TrendingUp,
    items: [
      { label: "Flujo Proyectado", icon: Activity, href: "/contabilidad/analisis-caja" },
      { label: "Reporte de CxC", icon: FileSearch, href: "/contabilidad/cuentas-por-cobrar" },
      { label: "Reporte de CxP", icon: FileSearch, href: "/contabilidad/cuentas-por-pagar" },
    ],
  },
];

export default function TodasLasCuentasPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const handleItemClick = (e: React.MouseEvent, item: { href: string; label: string }) => {
    if (item.href === "#") {
      e.preventDefault();
      toast({
        title: "En desarrollo",
        description: `El módulo "${item.label}" estará disponible próximamente.`,
      });
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/cuentas" label="Cuentas" />
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Gestión de <span className="text-primary">Cuentas</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Repositorio central de tesorería y bancos</p>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cuenta o reporte..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        {libraryCategories.map((category, idx) => {
          const filteredItems = category.items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold">{category.title}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredItems.map((item, i) => (
                  <Link key={i} href={item.href as any} onClick={(e) => handleItemClick(e, item)} className="block group">
                    <Card className="border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all min-h-[100px] flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors border border-border group-hover:border-primary/20">
                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold group-hover:text-primary transition-colors">{item.label}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
