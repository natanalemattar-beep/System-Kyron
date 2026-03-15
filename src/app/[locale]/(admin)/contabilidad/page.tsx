
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  FileText, 
  Landmark, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  BookOpen, 
  History, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  Box,
  Banknote,
  Stamp,
  HandCoins,
  ShieldAlert,
  Zap,
  Users,
  Calendar,
  Search,
  ArrowRight,
  FileSearch,
  Scale,
  Book,
  Receipt,
  ArrowUpRight,
  Building2,
  Lock,
  Timer,
  Plane,
  Coins,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Centro de Contabilidad Maestro de System Kyron.
 * Centraliza el acceso a todos los libros y registros contables, fiscales y legales.
 */

const accountingCategories = [
  {
    title: "Contables Básicos",
    icon: Book,
    description: "Estructura principal del sistema contable.",
    items: [
      { label: "Libro Diario", href: "#", kpi: "Asientos al día", icon: FileText, color: "text-blue-600" },
      { label: "Libro Mayor", href: "#", kpi: "Saldos revisados", icon: BookOpen, color: "text-blue-600" },
      { label: "Libro Balance", href: "/reportes-maestros", kpi: "Cierre mensual", icon: Scale, color: "text-emerald-600" },
    ]
  },
  {
    title: "Fiscales y Tributarios",
    icon: Landmark,
    description: "Cumplimiento obligatorio ante el SENIAT.",
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", kpi: "Marzo: Al día", icon: Receipt, color: "text-blue-600" },
      { label: "Retenciones IVA", href: "/contabilidad/impuestos/retenciones", kpi: "15 registradas", icon: HandCoins, color: "text-emerald-600" },
      { label: "Retenciones ISLR", href: "/contabilidad/impuestos/islr-arc", kpi: "Pendiente AR-C", icon: Banknote, color: "text-amber-600" },
      { label: "Libro de IVA", href: "/contabilidad/impuestos/iva", kpi: "Débito vs Crédito", icon: Calculator, color: "text-blue-600" },
      { label: "Libro de ISLR", href: "#", kpi: "Estimada 2026", icon: Landmark, color: "text-blue-600" },
      { label: "Libro de IGTF", href: "#", kpi: "Operaciones 3%", icon: Coins, color: "text-rose-600" },
      { label: "Timbres Fiscales", href: "#", kpi: "Saldo: Ok", icon: Stamp, color: "text-slate-600" },
      { label: "Homologación", href: "/contabilidad/impuestos/homologacion", kpi: "Equipos: Ok", icon: CheckCircle, color: "text-emerald-600" },
      { label: "Control Licores", href: "/contabilidad/libros/control-licores", kpi: "Alícuotas: Ok", icon: Landmark, color: "text-amber-600" },
    ]
  },
  {
    title: "Tesorería y Bancos",
    icon: Wallet,
    description: "Gestión de liquidez y saldos monetarios.",
    items: [
      { label: "Libro Bancos", href: "#", kpi: "4 cuentas activas", icon: Building2, color: "text-blue-600" },
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
    description: "Control de personal y beneficios LOTTT.",
    items: [
      { label: "Libro Nómina", href: "/contabilidad/libros/nomina", kpi: "23 Empleados", icon: Users, color: "text-blue-600" },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Vigente", icon: Banknote, color: "text-emerald-600" },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", kpi: "17h este mes", icon: Timer, color: "text-amber-600" },
      { label: "Libro Vacaciones", href: "#", kpi: "3 disfrutando", icon: Plane, color: "text-blue-600" },
      { label: "Utilidades", href: "#", kpi: "Proyectadas", icon: Zap, color: "text-yellow-600" },
      { label: "Prestaciones", href: "/rrhh/liquidaciones", kpi: "Fondo acumulado", icon: Scale, color: "text-emerald-600" },
      { label: "Aportes Paraf.", href: "#", kpi: "IVSS/FAOV/INCES", icon: Landmark, color: "text-blue-600" },
      { label: "Asistencia", href: "#", kpi: "Turno Mañana", icon: Clock, color: "text-slate-600" },
    ]
  },
  {
    title: "Activos e Inventarios",
    icon: Box,
    description: "Control de propiedad y existencias.",
    items: [
      { label: "Inventario", href: "/contabilidad/libros/inventario", kpi: "45 SKUs", icon: Box, color: "text-blue-600" },
      { label: "Activos Fijos", href: "/legal/permisos-y-licencias", kpi: "Propiedades", icon: Building2, color: "text-slate-600" },
      { label: "Depreciación", href: "#", kpi: "Método lineal", icon: TrendingUp, color: "text-rose-600" },
      { label: "Inv. Valorado", href: "#", kpi: "Kardex FIFO", icon: Calculator, color: "text-emerald-600" },
      { label: "Ajustes RIPF", href: "/contabilidad/ajuste-inflacion", kpi: "Inflación BCV", icon: Activity, color: "text-amber-600" },
    ]
  },
  {
    title: "Legales y Corporativos",
    icon: Gavel,
    description: "Documentación estatutaria y representación.",
    items: [
      { label: "Actas Asamblea", href: "/legal/acta-asamblea", kpi: "Última: Feb 2026", icon: FileText, color: "text-blue-600" },
      { label: "Accionistas", href: "/legal/poderes-holding", kpi: "Libro Registro", icon: Users, color: "text-blue-600" },
      { label: "Libro Poderes", href: "/legal/poderes-holding", kpi: "SAREN Verificado", icon: ShieldCheck, color: "text-emerald-600" },
      { label: "Libro Contratos", href: "/legal/contratos", kpi: "12 Vigentes", icon: FileSearch, color: "text-blue-600" },
    ]
  },
  {
    title: "Análisis y Reportes",
    icon: BarChart3,
    description: "Inteligencia de negocio estratégica.",
    items: [
      { label: "Flujo Proyectado", href: "/contabilidad/analisis-caja", kpi: "12 meses", icon: Activity, color: "text-emerald-600" },
      { label: "Rentabilidad", href: "/contabilidad/analisis-rentabilidad", kpi: "Margen: 32%", icon: TrendingUp, color: "text-primary" },
      { label: "Análisis Costos", href: "/contabilidad/estructura-costos", kpi: "Eficiencia", icon: PieChart, color: "text-blue-600" },
      { label: "Rep. Gerenciales", href: "/reportes-maestros", kpi: "Dossier Global", icon: LayoutDashboard, color: "text-slate-600" },
    ]
  }
];

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    if (item.href === "#") {
      e.preventDefault();
      toast({
        title: "ÁREA EN CONSTRUCCIÓN",
        description: `El módulo "${item.label}" está siendo sincronizado con el sistema central.`,
        variant: "default"
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
      {/* --- CABECERA --- */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-[#0A2472] pl-8 py-2 mt-10">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] mb-3">
                <Calculator className="h-3 w-3" /> SISTEMA FINANCIERO MAESTRO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A2472] uppercase leading-none">CENTRO DE <span className="text-[#00A86B] italic">CONTABILIDAD</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Control Integral de Libros y Registros • Ejercicio 2026</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white text-[#0A2472]" onClick={() => alert("Generando Auditoría...")}>
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="bg-[#0A2472] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg" onClick={() => alert("Preparando Balance...")}>
                <Receipt className="mr-3 h-4 w-4" /> CERRAR PERIODO
            </Button>
        </div>
      </header>

      {/* --- KPI SUMMARY --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "SALDO DISPONIBLE", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-600", icon: Wallet },
          { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Activos", color: "text-blue-600", icon: TrendingUp },
          { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Compromisos", color: "text-rose-600", icon: HandCoins },
          { label: "IVA POR DECLARAR", val: "Bs. 5.678", trend: "Vence en 5d", color: "text-amber-600", icon: Landmark },
        ].map((kpi, i) => (
          <Card key={i} className="border-none bg-white p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-[#0A2472]">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- SECCIONES DE LIBROS --- */}
      <div className="space-y-12">
        {accountingCategories.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-4 ml-2">
              <div className="p-2.5 bg-[#0A2472]/5 rounded-xl">
                <category.icon className="h-5 w-5 text-[#0A2472]" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472]">{category.title}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{category.description}</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((item, i) => (
                <Link key={i} href={item.href as any} onClick={(e) => handleItemClick(e, item)}>
                  <Card className="border-none bg-white hover:bg-slate-50 transition-all rounded-2xl p-6 flex flex-col justify-between group shadow-sm hover:shadow-md h-full min-h-[110px]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                        <item.icon className={cn("h-5 w-5 transition-all", item.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors">{item.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.kpi}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-[#0A2472] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- PANEL DE CUMPLIMIENTO --- */}
      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8 border-l-4 border-amber-500">
          <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-amber-600 flex items-center gap-3">
                <ShieldAlert className="h-4 w-4" /> Vencimientos Próximos
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Alertas de Cumplimiento SENIAT</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase text-amber-600 hover:bg-amber-50">Sincronizar</Button>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {[
              { text: "Declaración IVA Marzo vence en 5 días", color: "text-amber-600", icon: Clock },
              { text: "Renovación Máquina Fiscal ACL-9988", color: "text-amber-600", icon: Calendar },
              { text: "Cierre Fiscal ISLR 31 de Marzo", color: "text-rose-600", icon: AlertTriangle }
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-4">
                  <alert.icon className={cn("h-4 w-4", alert.color)} />
                  <p className={cn("text-[10px] font-bold uppercase tracking-tight", alert.color)}>{alert.text}</p>
                </div>
                <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-slate-600" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#0A2472] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-xl group border-none flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#00A86B]">Reporte Global</h3>
            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase">Consolide toda la información de los libros en un dossier analítico para la junta directiva.</p>
          </div>
          <Button className="w-full h-14 bg-[#00A86B] hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg relative z-10 border-none transition-all">
            DESCARGAR DOSSIER 2026
          </Button>
        </Card>
      </div>
    </div>
  );
}
