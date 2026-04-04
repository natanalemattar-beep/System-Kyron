"use client";

import React from "react";
import { Link } from "@/navigation";
import { Wallet, TrendingUp, HandCoins, Activity, ChevronRight, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

export default function CuentasPage() {
  const secciones = [
    {
      label: "Cuentas por Cobrar",
      href: "/contabilidad/cuentas-por-cobrar",
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      desc: "Gestión de cartera y seguimiento de cobros.",
    },
    {
      label: "Cuentas por Pagar",
      href: "/contabilidad/cuentas-por-pagar",
      icon: HandCoins,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      desc: "Control de compromisos y obligaciones con proveedores.",
    },
    {
      label: "Análisis de Caja",
      href: "/contabilidad/analisis-caja",
      icon: Activity,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      desc: "Monitoreo de liquidez y flujos de efectivo.",
    },
  ];

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
            <Landmark className="h-3.5 w-3.5" /> Centro de Tesorería
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Gestión de <span className="text-primary">Cuentas</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Administración financiera · Cobros · Pagos · Tesorería</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secciones.map((item, i) => (
          <Link key={i} href={item.href as any} className="block group">
            <Card className={cn("border rounded-2xl p-8 flex flex-col justify-between min-h-[200px] hover:shadow-lg transition-all", item.border)}>
              <div className="space-y-4">
                <div className={cn("p-3 rounded-xl w-fit border", item.bg, item.border)}>
                  <item.icon className={cn("h-7 w-7", item.color)} />
                </div>
                <div>
                  <h3 className="text-base font-bold group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
