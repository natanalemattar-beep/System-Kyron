"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { Book, Search, FileText, BookOpen, Receipt, HandCoins, Banknote, Calculator, Landmark, Coins, Users, Timer, Box, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

const libraryCategories = [
  {
    title: "Libros Principales",
    icon: Book,
    items: [
      { label: "Libro Diario", href: "/contabilidad/libros/diario", desc: "Art. 32 Código de Comercio", icon: FileText, color: "text-primary" },
      { label: "Libro Mayor", href: "/contabilidad/libros/mayor", desc: "Art. 34 Código de Comercio", icon: BookOpen, color: "text-primary" },
      { label: "Inventario de Bienes", href: "/contabilidad/libros/inventario", desc: "Art. 35 Código de Comercio", icon: Box, color: "text-amber-600" },
    ]
  },
  {
    title: "Especializados IVA",
    icon: Landmark,
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", desc: "Providencia SNAT/2011/0071", icon: Receipt, color: "text-primary" },
      { label: "Retenciones IVA", href: "/contabilidad/tributos/retenciones-iva", desc: "Providencia 0049", icon: HandCoins, color: "text-emerald-500" },
    ]
  },
  {
    title: "Especies y Otros",
    icon: Landmark,
    items: [
      { label: "Control de Licores", href: "/contabilidad/libros/control-licores", desc: "Ley de Impuesto sobre Alcohol", icon: Landmark, color: "text-rose-600" },
      { label: "Grandes Patrimonios", href: "/contabilidad/tributos/igp", desc: "Ley de Impuesto a Grandes Patrimonios", icon: Coins, color: "text-amber-600" },
    ]
  },
  {
    title: "Laborales LOTTT",
    icon: Users,
    items: [
      { label: "Nómina y Personal", href: "/contabilidad/libros/nomina", desc: "LOTTT Arts. 98-105", icon: Users, color: "text-primary" },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", desc: "LOTTT Arts. 178-183", icon: Timer, color: "text-amber-600" },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", desc: "Ley de Alimentación para Trabajadores", icon: Banknote, color: "text-emerald-500" },
    ]
  }
];

export default function TodosLosLibrosPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
            <Book className="h-3.5 w-3.5" /> Biblioteca de Registros
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Libros <span className="text-primary">Contables</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Registros obligatorios según el Código de Comercio y legislación vigente</p>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar libro por nombre..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        {libraryCategories.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{category.title}</h3>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items
                .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                .map((item, i) => (
                <Link key={i} href={item.href as any}>
                  <Card className="rounded-2xl border p-5 hover:bg-muted/30 transition-colors group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-muted border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                        <item.icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
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
