
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
  PieChart
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
      { label: "Libro Diario", href: "#", kpi: "Asientos al día", icon: FileText, color: "text-blue-600" },
      { label: "Libro Mayor", href: "#", kpi: "Saldos revisados", icon: BookOpen, color: "text-blue-600" },
      { label: "Libro de Balance", href: "/reportes-maestros", kpi: "Cierre mensual", icon: Scale, color: "text-emerald-600" },
    ]
  },
  {
    title: "Fiscales y Tributarios",
    icon: Landmark,
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", kpi: "Marzo: Al día", icon: Receipt, color: "text-blue-600" },
      { label: "Retenciones IVA", href: "/contabilidad/impuestos/retenciones", kpi: "15 registradas", icon: HandCoins, color: "text-emerald-600" },
      { label: "Retenciones ISLR", href: "/islr-arc", kpi: "Pendiente AR-C", icon: Banknote, color: "text-amber-600" },
      { label: "Libro de IVA", href: "/declaracion-iva", kpi: "Débito vs Crédito", icon: Calculator, color: "text-blue-600" },
      { label: "Libro de ISLR", href: "#", kpi: "Estimada 2026", icon: Landmark, color: "text-blue-600" },
      { label: "Libro de IGTF", href: "#", kpi: "Operaciones 3%", icon: Coins, color: "text-rose-600" },
      { label: "Timbres Fiscales", href: "#", kpi: "Saldo: Ok", icon: Stamp, color: "text-slate-600" },
      { label: "Homologación", href: "/contabilidad/impuestos/homologacion", kpi: "Equipos: Ok", icon: CheckCircle, color: "text-emerald-600" },
    ]
  },
  {
    title: "Tesorería y Bancos",
    icon: Wallet,
    items: [
      { label: "Libro de Bancos", href: "#", kpi: "4 cuentas", icon: Building2, color: "text-blue-600" },
      { label: "Conciliación", href: "/analisis-caja", kpi: "Conciliado hoy", icon: Activity, color: "text-emerald-600" },
      { label: "Cheques Emitidos", href: "#", kpi: "Último: #456", icon: FileText, color: "text-slate-600" },
      { label: "Depósitos", href: "#", kpi: "Recibidos hoy", icon: Wallet, color: "text-emerald-600" },
      { label: "Anticipos Prov.", href: "#", kpi: "2 pendientes", icon: HandCoins, color: "text-rose-600" },
      { label: "Anticipos Cli.", href: "#", kpi: "Saldo favor", icon: Coins, color: "text-emerald-600" },
    ]
  },
  {
    title: "Laborales",
    icon: Users,
    items: [
      { label: "Nómina y Personal", href: "/contabilidad/libros/nomina", kpi: "23 Empleados", icon: Users, color: "text-blue-600" },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Vigente", icon: Banknote, color: "text-emerald-600" },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", kpi: "17h este mes", icon: Timer, color: "text-amber-600" },
      { label: "Libro Vacaciones", href: "#", kpi: "3 disfrutando", icon: Plane, color: "text-blue-600" },
      { label: "Libro Utilidades", href: "#", kpi: "Proyectadas", icon: Zap, color: "text-yellow-600" },
      { label: "Prestaciones", href: "/rrhh/liquidaciones", kpi: "Fondo acumulado", icon: Scale, color: "text-emerald-600" },
      { label: "Aportes Paraf.", href: "#", kpi: "IVSS/FAOV", icon: Landmark, color: "text-blue-600" },
      { label: "Asistencia", href: "#", kpi: "Turno Mañana", icon: Clock, color: "text-slate-600" },
    ]
  },
  {
    title: "Activos e Inventarios",
    icon: Box,
    items: [
      { label: "Inventario Activo", href: "/contabilidad/libros/inventario", kpi: "45 SKUs", icon: Box, color: "text-blue-600" },
      { label: "Activos Fijos", href: "/legal/permisos-y-licencias", kpi: "Propiedades", icon: Building2, color: "text-slate-600" },
      { label: "Depreciación", href: "#", kpi: "Método lineal", icon: TrendingUp, color: "text-rose-600" },
      { label: "Inv. Valorado", href: "#", kpi: "Kardex FIFO", icon: Calculator, color: "text-emerald-600" },
      { label: "Ajustes RIPF", href: "/contabilidad/ajuste-inflacion", kpi: "Inflación BCV", icon: Activity, color: "text-amber-600" },
    ]
  },
  {
    title: "Legales y Corporativos",
    icon: Gavel,
    items: [
      { label: "Actas Asamblea", href: "/legal/acta-asamblea", kpi: "Última: Feb 26", icon: FileText, color: "text-blue-600" },
      { label: "Libro Accionistas", href: "/legal/poderes-holding", kpi: "Registro Civil", icon: Users, color: "text-blue-600" },
      { label: "Libro de Poderes", href: "/legal/poderes-holding", kpi: "SAREN Verificado", icon: ShieldCheck, color: "text-emerald-600" },
      { label: "Libro Contratos", href: "/legal/contratos", kpi: "12 Vigentes", icon: FileSearch, color: "text-blue-600" },
      { label: "Control Licores", href: "/contabilidad/libros/control-licores", kpi: "Alícuotas OK", icon: Landmark, color: "text-amber-600" },
    ]
  },
  {
    title: "Análisis y Reportes",
    icon: BarChart3,
    items: [
      { label: "Flujo Proyectado", href: "/contabilidad/analisis-caja", kpi: "12 meses", icon: Activity, color: "text-emerald-600" },
      { label: "Rentabilidad", href: "/contabilidad/analisis-rentabilidad", kpi: "Margen: 32%", icon: TrendingUp, color: "text-primary" },
      { label: "Análisis Costos", href: "/contabilidad/estructura-costos", kpi: "Eficiencia", icon: PieChart, color: "text-blue-600" },
      { label: "Rep. Gerenciales", href: "/reportes-maestros", kpi: "Dossier Global", icon: LayoutDashboard, color: "text-slate-600" },
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
        title: "ÁREA EN CONSTRUCCIÓN",
        description: `El registro "${item.label}" está siendo sincronizado con el sistema central.`,
      });
    }
  };

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-4">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-4 italic">
            <Book className="h-10 w-10 text-[#00A86B]" />
            Biblioteca de Libros Contables
          </h1>
          <p className="text-slate-500 font-medium text-sm">Repositorio central de registros fiscales, laborales y operativos.</p>
        </div>
      </header>

      {/* --- BUSCADOR --- */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
        <Input 
            placeholder="Buscar libro por nombre o categoría..." 
            className="h-14 rounded-2xl bg-white border-none shadow-sm pl-12 font-bold uppercase text-xs tracking-widest placeholder:text-slate-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* --- CATEGORÍAS --- */}
      <div className="space-y-16">
        {libraryCategories.map((category, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4 ml-2">
              <div className="p-3 bg-[#0A2472]/5 rounded-xl">
                <category.icon className="h-6 w-6 text-[#0A2472]" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.4em] text-[#0A2472] italic">{category.title}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items
                .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                .map((item, i) => (
                <Link key={i} href={item.href as any} onClick={(e) => handleItemClick(e, item)}>
                  <Card className="border-none bg-white hover:bg-slate-50 transition-all rounded-3xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg min-h-[160px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <item.icon className="h-12 w-12" />
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors leading-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.kpi}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
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

      <footer className="pt-20 pb-10 text-center opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-900 italic">SYSTEM KYRON • LIBRARY NODE • 2026</p>
      </footer>
    </div>
  );
}
