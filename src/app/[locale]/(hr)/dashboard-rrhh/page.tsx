"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Briefcase, Users, DollarSign, UserPlus, ArrowRight, FileWarning,
  CalendarCheck2, ShieldCheck, Activity, BrainCircuit, School, Terminal,
  CircleCheck as CheckCircle, Stethoscope, TrendingUp, Scale, Calculator,
  Loader as Loader2, Heart, ChevronRight, Search, Mail, Phone, Building2,
  BarChart3, Clock, Award, Target
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  cargo: string;
  departamento: string;
  salario_base: string;
  fecha_ingreso?: string;
  email?: string;
  telefono?: string;
}

const chartConfig = {
  count: { label: "Empleados", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

const DEPARTAMENTOS = ["Ventas", "Tecnología", "Admin", "Soporte", "Diseño", "Gerencia", "RRHH", "Legal", "Contabilidad", "Operaciones"];

const BAR_COLORS = ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6", "#6366f1", "#f97316"];

export default function RecursosHumanosPage() {
  const { toast } = useToast();
  const currentLocale = useLocale();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    nombre: "", apellido: "", cedula: "", cargo: "", departamento: "Admin",
    fecha_ingreso: "", salario_base: "", tipo_contrato: "indefinido",
    telefono: "", email: "", cuenta_banco: "", numero_cuenta: ""
  });

  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/empleados");
      if (res.ok) {
        const data = await res.json();
        setEmpleados(data.empleados ?? []);
      } else {
        toast({ variant: "destructive", title: "Error al cargar empleados", description: "No se pudieron obtener los datos. Intente nuevamente." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión", description: "No se pudo conectar al servidor." });
    }
    finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { fetchEmpleados(); }, [fetchEmpleados]);

  const totalNomina = empleados.reduce((acc, e) => { const v = parseFloat(e.salario_base ?? "0"); return acc + (isNaN(v) ? 0 : v); }, 0);
  const avgSalario = empleados.length > 0 ? totalNomina / empleados.length : 0;

  const distribucion = DEPARTAMENTOS.map(dep => ({
    name: dep,
    count: empleados.filter(e => e.departamento === dep).length,
  })).filter(d => d.count > 0);

  const filteredEmpleados = empleados.filter(e =>
    !searchTerm ||
    `${e.nombre} ${e.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.cargo ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.nombre || !form.apellido || !form.cedula) {
      toast({ title: "Nombre, apellido y cédula son requeridos", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre, apellido: form.apellido, cedula: form.cedula,
          cargo: form.cargo, departamento: form.departamento,
          fecha_ingreso: form.fecha_ingreso || undefined,
          salario_base: isNaN(parseFloat(form.salario_base)) ? 0 : parseFloat(form.salario_base || "0"),
          tipo_contrato: form.tipo_contrato,
          telefono: form.telefono || undefined,
          email: form.email || undefined,
          cuenta_banco: form.cuenta_banco || undefined,
          numero_cuenta: form.numero_cuenta || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast({ title: "Empleado registrado", description: `${form.nombre} ${form.apellido} añadido al sistema.` });
      setShowDialog(false);
      setForm({ nombre: "", apellido: "", cedula: "", cargo: "", departamento: "Admin", fecha_ingreso: "", salario_base: "", tipo_contrato: "indefinido", telefono: "", email: "", cuenta_banco: "", numero_cuenta: "" });
      fetchEmpleados();
    } catch (err: unknown) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "No se pudo guardar", variant: "destructive" });
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071a15] via-[#0d2620] to-[#091e18] p-6 md:p-8 text-white mt-4 md:mt-6 border border-emerald-500/[0.08]">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/[0.06] blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-teal-500/[0.04] blur-[80px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hrGrid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.4"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hrGrid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">Capital Humano</h1>
                <p className="text-[10px] text-white/40 font-medium">Gestión de Personal · LOTTT 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Activo</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.06]" onClick={fetchEmpleados} disabled={loading}>
              <Activity className={cn("h-3.5 w-3.5 mr-1.5", loading && "animate-spin")} /> Actualizar
            </Button>
            <Button size="sm" className="h-8 px-4 rounded-lg text-[10px] font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20" onClick={() => setShowDialog(true)}>
              <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Nuevo Empleado
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Personal Activo", value: loading ? "—" : String(empleados.length), icon: Users, gradient: "from-emerald-500/10 to-emerald-500/[0.02]", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-400", border: "border-emerald-500/10" },
          { label: "Nómina Mensual", value: loading ? "—" : formatCurrency(totalNomina, "Bs.", currentLocale), icon: DollarSign, gradient: "from-cyan-500/10 to-cyan-500/[0.02]", iconBg: "bg-cyan-500/15", iconColor: "text-cyan-400", border: "border-cyan-500/10" },
          { label: "Salario Promedio", value: loading ? "—" : formatCurrency(avgSalario, "Bs.", currentLocale), icon: Target, gradient: "from-blue-500/10 to-blue-500/[0.02]", iconBg: "bg-blue-500/15", iconColor: "text-blue-400", border: "border-blue-500/10" },
          { label: "Departamentos", value: loading ? "—" : String(distribucion.length), icon: Building2, gradient: "from-teal-500/10 to-teal-500/[0.02]", iconBg: "bg-teal-500/15", iconColor: "text-teal-400", border: "border-teal-500/10" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}>
            <Card className={cn("border rounded-xl overflow-hidden h-full bg-gradient-to-b transition-all hover:shadow-lg", kpi.gradient, kpi.border)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">{kpi.label}</span>
                  <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", kpi.iconBg)}>
                    <kpi.icon className={cn("h-3.5 w-3.5", kpi.iconColor)} />
                  </div>
                </div>
                <p className={cn("text-lg md:text-xl font-bold tracking-tight text-foreground", loading && "animate-pulse opacity-50")}>
                  {kpi.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 border border-border/20 rounded-xl overflow-hidden bg-card/80">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground/80">Distribución por Departamento</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground/50 font-medium mt-0.5">Balance de fuerza laboral · Datos en vivo</CardDescription>
            </div>
            <Link href="/nominas"><Button variant="ghost" size="sm" className="h-7 text-[11px] font-semibold text-muted-foreground/60">Nómina</Button></Link>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              {distribucion.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
                  <Users className="h-10 w-10" />
                  <p className="text-[10px] font-semibold uppercase">Sin empleados registrados</p>
                </div>
              ) : (
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distribucion} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" stroke="#475569" fontSize={9} fontWeight="600" tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={9} fontWeight="600" tickLine={false} axisLine={false} allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" name="Empleados" radius={[6, 6, 0, 0]}>
                        {distribucion.map((_, idx) => <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-4">
          <Card className="border border-emerald-500/10 rounded-xl bg-gradient-to-b from-emerald-500/[0.05] to-transparent p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">LOPCYMAT</span>
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-semibold h-5">Al día</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] font-medium mb-1.5">
                  <span className="text-muted-foreground/60">Programa de Seguridad</span>
                  <span className="text-emerald-400">100%</span>
                </div>
                <Progress value={100} className="h-1.5 bg-muted/20" />
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/[0.06]">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <p className="text-[11px] font-medium text-foreground/60">Delegados de prevención activos</p>
              </div>
            </div>
          </Card>

          <Card className="border border-cyan-500/10 rounded-xl bg-gradient-to-b from-cyan-500/[0.05] to-transparent p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">Resumen Salarial</span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-lg font-bold text-cyan-400 tracking-tight">{loading ? "—" : formatCurrency(totalNomina, "Bs.", currentLocale)}</p>
                <p className="text-[11px] text-muted-foreground/50">Carga mensual total</p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-muted-foreground/50">{empleados.length} empleados</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-muted-foreground/50">Prom. {loading ? "—" : formatCurrency(avgSalario, "Bs.", currentLocale)}</span>
              </div>
              <Link href="/nominas">
                <Button variant="outline" size="sm" className="w-full h-7 mt-1 text-[11px] font-semibold rounded-lg border-cyan-500/15 text-cyan-400 hover:bg-cyan-500/10">
                  Ver Libro de Nómina
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 border border-border/20 rounded-xl bg-card/80 overflow-hidden">
          <div className="p-4 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/10">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">Directorio de Personal</span>
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/40" />
              <Input
                placeholder="Buscar empleado..."
                className="h-7 pl-7 text-[10px] rounded-lg bg-muted/10 border-border/20"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="p-3 max-h-[320px] overflow-y-auto">
            {loading ? (
              <div className="space-y-2">{[1, 2, 3, 4].map(n => <div key={n} className="h-12 bg-muted/15 rounded-lg animate-pulse" />)}</div>
            ) : filteredEmpleados.length === 0 ? (
              <div className="py-10 text-center">
                <Users className="h-8 w-8 text-muted-foreground/15 mx-auto mb-2" />
                <p className="text-[10px] font-medium text-muted-foreground/40">
                  {searchTerm ? "Sin resultados" : "Sin empleados registrados"}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredEmpleados.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/15 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0">
                      {emp.nombre[0]}{emp.apellido[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate">{emp.nombre} {emp.apellido}</p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                        <span>{emp.cargo || "Sin cargo"}</span>
                        <span className="text-muted-foreground/20">·</span>
                        <span>{emp.departamento}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-[10px] font-semibold text-foreground/70 tabular-nums">{formatCurrency(parseFloat(emp.salario_base ?? "0"), "Bs.", currentLocale)}</p>
                      <p className="text-[10px] text-muted-foreground/40 font-mono">{emp.cedula}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="lg:col-span-4 space-y-4">
          <Card className="border border-border/20 rounded-xl bg-card/80 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">Estado del Sistema</span>
            </div>
            <div className="space-y-2">
              {empleados.length > 0 && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/[0.04] border border-blue-500/[0.06]">
                  <FileWarning className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <p className="text-[11px] font-medium text-foreground/60">{empleados.length} empleado(s) en nómina</p>
                </div>
              )}
              {distribucion.length > 0 && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/[0.06]">
                  <CalendarCheck2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <p className="text-[11px] font-medium text-foreground/60">{distribucion.length} departamento(s) activos</p>
                </div>
              )}
              {empleados.length === 0 && (
                <div className="py-4 text-center text-muted-foreground/30">
                  <p className="text-[11px] font-semibold">Sin alertas activas</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="border border-border/20 rounded-xl bg-gradient-to-b from-[#071a15] to-card/80 p-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-emerald-500/[0.06] blur-[30px]" />
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-emerald-300 mb-1">Protocolos</h3>
              <p className="text-[11px] text-white/40 mb-3">Accesos rápidos</p>
              <div className="space-y-1.5">
                {[
                  { label: "Nómina y Beneficios", href: "/nominas", icon: Calculator, color: "text-emerald-400" },
                  { label: "Reclutamiento", href: "/reclutamiento", icon: UserPlus, color: "text-cyan-400" },
                  { label: "Desarrollo Personal", href: "/desarrollo-personal", icon: School, color: "text-teal-400" },
                  { label: "Prestaciones", href: "/prestaciones-sociales", icon: Scale, color: "text-green-400" },
                  { label: "Libros Laborales", href: "/libros-laborales", icon: Briefcase, color: "text-blue-400" },
                  { label: "Salud y Seguridad", href: "/salud-seguridad", icon: Stethoscope, color: "text-rose-400" },
                  { label: "Clima Organizacional", href: "/clima-organizacional", icon: Heart, color: "text-pink-400" },
                  { label: "Proyectos y Estrategias", href: "/proyectos-personal", icon: Target, color: "text-violet-400" },
                  { label: "Bienestar y Vacaciones", href: "/bienestar-laboral", icon: Award, color: "text-amber-400" },
                  { label: "Manuales y Contratos", href: "/manuales-rrhh", icon: Briefcase, color: "text-indigo-400" },
                ].map(item => (
                  <Link key={item.label} href={item.href as never}>
                    <Button variant="ghost" size="sm" className="w-full h-8 justify-between text-[11px] font-semibold text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg group/btn">
                      <span className="flex items-center gap-2">
                        <item.icon className={cn("h-3.5 w-3.5", item.color)} />
                        {item.label}
                      </span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl rounded-xl p-0 overflow-hidden">
          <DialogHeader className="p-5 pb-3 border-b border-border/10 bg-gradient-to-r from-emerald-500/[0.03] to-transparent">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-emerald-400" /> Nuevo Empleado
            </DialogTitle>
            <p className="text-[11px] text-muted-foreground/50 font-medium">LOTTT 2026 · Campos con * son obligatorios</p>
          </DialogHeader>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Nombre *</Label>
              <Input placeholder="Primer nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Apellido *</Label>
              <Input placeholder="Apellido" value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Cédula *</Label>
              <Input placeholder="V-18.745.632" value={form.cedula} onChange={e => setForm(f => ({ ...f, cedula: e.target.value }))} className="h-9 rounded-lg text-xs font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Cargo</Label>
              <Input placeholder="Ej: Gerente de Ventas" value={form.cargo} onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Departamento</Label>
              <Select value={form.departamento} onValueChange={v => setForm(f => ({ ...f, departamento: v }))}>
                <SelectTrigger className="h-9 rounded-lg text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Tipo Contrato</Label>
              <Select value={form.tipo_contrato} onValueChange={v => setForm(f => ({ ...f, tipo_contrato: v }))}>
                <SelectTrigger className="h-9 rounded-lg text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indefinido">Indefinido</SelectItem>
                  <SelectItem value="temporal">Temporal</SelectItem>
                  <SelectItem value="obra">Por Obra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Fecha Ingreso</Label>
              <Input type="date" value={form.fecha_ingreso} onChange={e => setForm(f => ({ ...f, fecha_ingreso: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Salario Base (Bs.)</Label>
              <Input type="number" placeholder="0.00" value={form.salario_base} onChange={e => setForm(f => ({ ...f, salario_base: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Teléfono</Label>
              <Input placeholder="+58 412..." value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Email</Label>
              <Input type="email" placeholder="email@empresa.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">Banco</Label>
              <Input placeholder="Ej: Banesco" value={form.cuenta_banco} onChange={e => setForm(f => ({ ...f, cuenta_banco: e.target.value }))} className="h-9 rounded-lg text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold">N° Cuenta</Label>
              <Input placeholder="0134-xxxx-xx-xxxxxxxx" value={form.numero_cuenta} onChange={e => setForm(f => ({ ...f, numero_cuenta: e.target.value }))} className="h-9 rounded-lg text-xs font-mono" />
            </div>
          </div>
          <DialogFooter className="p-5 pt-3 border-t border-border/10">
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-lg text-xs h-8">Cancelar</Button>
            <Button onClick={handleSave} disabled={saving} className="rounded-lg text-xs h-8 bg-emerald-500 text-white hover:bg-emerald-400 font-semibold">
              {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="mr-1.5 h-3.5 w-3.5" />}
              {saving ? "Guardando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
