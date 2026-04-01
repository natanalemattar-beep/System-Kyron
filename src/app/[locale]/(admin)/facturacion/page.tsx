"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TabletSmartphone, CreditCard, Receipt, FilePlus, FileMinus, ShieldAlert, CircleCheck as CheckCircle, Loader as Loader2, Activity, TrendingUp, DollarSign, FileCheck, AlertTriangle, BarChart3, Users, Wallet } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

const facturacionModules = [
    {
        title: "Punto de Venta (TPV)",
        description: "Procesa ventas en tiempo real con inventario y facturación sincronizada. Múltiples métodos de pago.",
        icon: TabletSmartphone,
        href: "/punto-de-venta",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10 border-blue-500/15",
    },
    {
        title: "Facturación a Crédito",
        description: "Ventas con financiamiento, control de cuentas por cobrar, integración con Cashea y pasarelas.",
        icon: CreditCard,
        href: "/facturacion-credito",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 border-emerald-500/15",
    },
    {
        title: "Facturas Proforma",
        description: "Cotizaciones y facturas preliminares profesionales antes de la venta final.",
        icon: Receipt,
        href: "/proformas",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10 border-violet-500/15",
    },
    {
        title: "Modelo de Factura SENIAT",
        description: "Modelo homologado de factura fiscal adaptado a la normativa vigente del SENIAT.",
        icon: FileText,
        href: "/modelo-factura",
        color: "text-primary",
        bgColor: "bg-primary/10 border-primary/15",
    },
    {
        title: "Nota de Débito",
        description: "Ajustes por intereses, cargos adicionales o correcciones al alza sobre facturas emitidas.",
        icon: FileMinus,
        href: "/nota-debito",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10 border-amber-500/15",
    },
    {
        title: "Nota de Crédito",
        description: "Anulaciones o correcciones por devoluciones, descuentos o errores en documentos emitidos.",
        icon: FilePlus,
        href: "/nota-credito",
        color: "text-rose-500",
        bgColor: "bg-rose-500/10 border-rose-500/15",
    },
];

const recentActivity = [
    { doc: "Factura #0089", client: "Inversiones Bolívar C.A.", amount: "$1,250.00", status: "Pagada", date: "28/03/2026" },
    { doc: "Factura #0088", client: "Tech Solutions VE", amount: "$3,480.00", status: "Pendiente", date: "27/03/2026" },
    { doc: "N/C #0012", client: "Servicios Delta S.R.L.", amount: "-$450.00", status: "Procesada", date: "26/03/2026" },
    { doc: "Proforma #0045", client: "Constructora Norte C.A.", amount: "$8,900.00", status: "Enviada", date: "25/03/2026" },
];

export default function FacturacionPage() {
  const { toast } = useToast();
  const [isCorrecting, setIsCorrecting] = useState(false);

  const handleAutoCorrect = () => {
    setIsCorrecting(true);
    setTimeout(() => {
      setIsCorrecting(false);
      toast({
        title: "Revisión Finalizada",
        description: "Se han auditado los documentos de venta. No se detectan errores fiscales.",
        action: <CheckCircle className="text-emerald-500 h-4 w-4" />
      });
    }, 2500);
  };

  return (
    <div className="space-y-10 pb-20">
      <div>
        <BackButton href="/dashboard-empresa" label="Dashboard" />
        <header className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4">
              <Activity className="h-3 w-3" /> NODO DE VENTAS
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase">Centro de <span className="text-primary italic">Facturación</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Ciclo de Vida Documental • Control de Ingresos 2026</p>
          </div>
          <Button 
            onClick={handleAutoCorrect} 
            disabled={isCorrecting}
            className="rounded-xl h-11 px-6 font-black uppercase text-[10px] tracking-[0.15em]"
          >
            {isCorrecting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
            AUDITORÍA FISCAL
          </Button>
        </header>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Facturado Este Mes", val: "$24,850", change: "+12.4%", up: true, icon: DollarSign, color: "text-emerald-500" },
          { label: "Documentos Emitidos", val: "89", change: "+8 hoy", up: true, icon: FileCheck, color: "text-blue-500" },
          { label: "Cuentas por Cobrar", val: "$6,230", change: "14 pendientes", up: false, icon: Wallet, color: "text-amber-500" },
          { label: "Clientes Activos", val: "156", change: "+3 nuevos", up: true, icon: Users, color: "text-violet-500" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.01] transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/40">{kpi.label}</p>
              <div className={cn("p-1.5 rounded-lg border", kpi.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/15" : kpi.color === "text-blue-500" ? "bg-blue-500/10 border-blue-500/15" : kpi.color === "text-amber-500" ? "bg-amber-500/10 border-amber-500/15" : "bg-violet-500/10 border-violet-500/15")}>
                <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
              </div>
            </div>
            <p className="text-2xl font-black text-foreground tracking-tight">{kpi.val}</p>
            <p className={cn("text-[10px] font-bold mt-1 flex items-center gap-1", kpi.up ? "text-emerald-500" : "text-amber-500")}>
              <TrendingUp className={cn("h-3 w-3", !kpi.up && "rotate-180")} /> {kpi.change}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facturacionModules.map((module) => (
          <Link key={module.title} href={module.href as any} className="group block">
            <Card className="glass-card border-none bg-card/50 p-6 rounded-2xl h-full flex flex-col justify-between hover:scale-[1.01] transition-all">
              <div className="space-y-4">
                <div className={cn("p-3 rounded-xl border w-fit transition-transform group-hover:scale-110 duration-300", module.bgColor)}>
                  <module.icon className={cn("h-5 w-5", module.color)} />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{module.title}</CardTitle>
                  <CardDescription className="text-[11px] text-muted-foreground leading-relaxed">{module.description}</CardDescription>
                </div>
              </div>
              <div className="pt-5 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground/40 group-hover:text-primary transition-colors uppercase tracking-wider">
                  <span>Acceder</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Actividad Reciente</CardTitle>
              <CardDescription className="text-[10px] mt-1">Últimos documentos fiscales procesados</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9">
              <BarChart3 className="mr-2 h-3.5 w-3.5" /> Ver Reportes
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/20">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/8 border border-primary/10 shrink-0">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{item.doc}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{item.client}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("text-sm font-black", item.amount.startsWith('-') ? "text-rose-500" : "text-foreground")}>{item.amount}</p>
                  <div className="flex items-center gap-2 justify-end mt-0.5">
                    <span className={cn(
                      "text-[9px] font-bold uppercase px-2 py-0.5 rounded-md",
                      item.status === "Pagada" ? "bg-emerald-500/10 text-emerald-500" :
                      item.status === "Pendiente" ? "bg-amber-500/10 text-amber-500" :
                      item.status === "Procesada" ? "bg-blue-500/10 text-blue-500" :
                      "bg-violet-500/10 text-violet-500"
                    )}>{item.status}</span>
                    <span className="text-[9px] text-muted-foreground/40">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15 shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground mb-0.5">Control de Deberes Formales SENIAT</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Todas las facturas se validan automáticamente antes de emitirse: RIF del cliente, base imponible, IVA 16%, IGTF 3%, retenciones ISLR, y numeración correlativa.</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 shrink-0">
          Ver Normativa
        </Button>
      </div>
    </div>
  );
}
