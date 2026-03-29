"use client";

import { useState, useEffect, useCallback } from "react";
import { Briefcase, Users, DollarSign, UserPlus, ArrowRight, FileWarning, CalendarCheck2, ShieldCheck, Activity, Zap, BrainCircuit, School, Terminal, CircleCheck as CheckCircle, Stethoscope, TrendingUp, Scale, Calculator, Loader as Loader2, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
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

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: string;
    departamento: string;
    salario_base: string;
}

const chartConfig = {
    count: { label: "Empleados", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

const DEPARTAMENTOS = ["Ventas", "Tecnología", "Admin", "Soporte", "Diseño", "Gerencia", "RRHH", "Legal", "Contabilidad", "Operaciones"];

export default function RecursosHumanosPage() {
    const { toast } = useToast();
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        nombre: "", apellido: "", cedula: "", cargo: "", departamento: "Admin",
        fecha_ingreso: "", salario_base: "", tipo_contrato: "indefinido",
        telefono: "", email: "", cuenta_banco: "", numero_cuenta: ""
    });

    const fetchEmpleados = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/empleados');
            if (res.ok) {
                const data = await res.json();
                setEmpleados(data.empleados ?? []);
            }
        } catch { /* silently fail */ }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchEmpleados(); }, [fetchEmpleados]);

    const totalNomina = empleados.reduce((acc, e) => acc + parseFloat(e.salario_base ?? "0"), 0);

    const distribucion = DEPARTAMENTOS.map(dep => ({
        name: dep,
        count: empleados.filter(e => e.departamento === dep).length,
    })).filter(d => d.count > 0);

    const handleSave = async () => {
        if (!form.nombre || !form.apellido || !form.cedula) {
            toast({ title: "Nombre, apellido y cédula son requeridos", variant: "destructive" });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/empleados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre, apellido: form.apellido, cedula: form.cedula,
                    cargo: form.cargo, departamento: form.departamento,
                    fecha_ingreso: form.fecha_ingreso || undefined,
                    salario_base: parseFloat(form.salario_base || "0"),
                    tipo_contrato: form.tipo_contrato,
                    telefono: form.telefono || undefined,
                    email: form.email || undefined,
                    cuenta_banco: form.cuenta_banco || undefined,
                    numero_cuenta: form.numero_cuenta || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast({ title: "EMPLEADO REGISTRADO", description: `${form.nombre} ${form.apellido} añadido al sistema.`, action: <CheckCircle className="text-secondary h-4 w-4" /> });
            setShowDialog(false);
            setForm({ nombre: "", apellido: "", cedula: "", cargo: "", departamento: "Admin", fecha_ingreso: "", salario_base: "", tipo_contrato: "indefinido", telefono: "", email: "", cuenta_banco: "", numero_cuenta: "" });
            fetchEmpleados();
        } catch (err: unknown) {
            toast({ title: "Error", description: err instanceof Error ? err.message : "No se pudo guardar", variant: "destructive" });
        } finally { setSaving(false); }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-700 p-8 md:p-10 text-white mt-6 md:mt-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-[80px] animate-pulse" style={{ animationDuration: '5s' }} />
                    <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-emerald-300/10 blur-[70px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
                    <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="hrGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#hrGrid)"/>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                            <Heart className="h-3 w-3" /> Área de Talento
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-none drop-shadow-md">
                            Centro de <span className="text-emerald-200 italic">Cultura y Personal</span>
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-50">
                            Gestión de Capital Humano · Protocolo LOTTT 2026
                            <span className="ml-3 inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Activo</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" onClick={fetchEmpleados} disabled={loading}>
                            <Activity className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Actualizar
                        </Button>
                        <Button className="h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest bg-white text-emerald-700 hover:bg-white/90 shadow-lg shadow-black/20" onClick={() => setShowDialog(true)}>
                            <UserPlus className="mr-2 h-4 w-4" /> NUEVO EMPLEADO
                        </Button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { title: "Personal Activo", value: loading ? "—" : String(empleados.length), icon: Users, color: "text-emerald-500", bg: "bg-gradient-to-br from-emerald-500/10 to-teal-500/5", border: "border-emerald-500/10" },
                    { title: "Carga de Nómina", value: loading ? "—" : formatCurrency(totalNomina, 'Bs.'), icon: DollarSign, color: "text-cyan-500", bg: "bg-gradient-to-br from-cyan-500/10 to-blue-500/5", border: "border-cyan-500/10" },
                    { title: "Departamentos", value: loading ? "—" : String(distribucion.length), icon: Briefcase, color: "text-teal-500", bg: "bg-gradient-to-br from-teal-500/10 to-green-500/5", border: "border-teal-500/10" },
                ].map((kpi, index) => (
                    <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <Card className={cn("border rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group", kpi.bg, kpi.border)}>
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                                <div className={cn("p-2.5 rounded-xl bg-background/50 border border-border/50 group-hover:scale-110 transition-transform", kpi.color)}>
                                    <kpi.icon className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-foreground tracking-tighter">{kpi.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="border border-border/30 rounded-[2rem] bg-card overflow-hidden shadow-xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-black uppercase tracking-tighter text-foreground">Distribución de Fuerza Laboral</CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Balance de capital humano por área operativa · Datos reales</CardDescription>
                                </div>
                                <Button asChild variant="ghost" className="h-10 px-4 rounded-xl border border-border text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                    <Link href="/nominas">Ver Nómina</Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[350px] p-10">
                            {distribucion.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/30">
                                    <Users className="h-12 w-12" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Sin empleados registrados aún</p>
                                </div>
                            ) : (
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={distribucion}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                                            <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="count" name="Empleados" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border border-emerald-500/10 p-10 rounded-[2rem] bg-gradient-to-br from-emerald-500/5 to-green-500/3 shadow-sm">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-foreground mb-6 flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                </div>
                                Cumplimiento LOPCYMAT
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-muted-foreground/60">Programa de Seguridad</span>
                                        <span className="text-emerald-500">AL DÍA</span>
                                    </div>
                                    <Progress value={100} className="h-2 bg-muted" />
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                    <Stethoscope className="h-5 w-5 text-emerald-500" />
                                    <p className="text-[10px] font-bold text-foreground/70 uppercase">Delegados de prevención activos.</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border border-cyan-500/10 p-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/5 to-blue-500/3 shadow-sm">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-foreground mb-6 flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/10">
                                    <BrainCircuit className="h-5 w-5 text-cyan-500" />
                                </div>
                                Resumen Salarial
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="text-4xl font-black text-emerald-500 tracking-tighter">{loading ? "—" : formatCurrency(totalNomina, 'Bs.')}</div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-emerald-500">Carga Mensual Total</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{empleados.length} empleados activos</p>
                                </div>
                                <Button variant="outline" asChild className="w-full h-10 rounded-xl border-emerald-500/20 text-emerald-600 font-black uppercase text-[9px] tracking-widest hover:bg-emerald-500/5 transition-all">
                                    <Link href="/nominas">Ver Libro de Nómina</Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="border border-border/30 bg-card rounded-[2rem] p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700"><ShieldCheck className="h-32 w-32" /></div>
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                                <Activity className="h-4 w-4" /> Alertas del Nodo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {empleados.length === 0 ? (
                                <div className="py-4 text-center">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Sin alertas activas</p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-blue-500/10 bg-blue-500/5">
                                    <FileWarning className="h-5 w-5 mt-0.5 shrink-0 text-blue-500" />
                                    <p className="text-[10px] font-bold text-foreground/70 uppercase leading-snug">{empleados.length} empleado(s) activo(s) en nómina</p>
                                </div>
                            )}
                            {distribucion.length > 0 && (
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
                                    <CalendarCheck2 className="h-5 w-5 mt-0.5 shrink-0 text-emerald-500" />
                                    <p className="text-[10px] font-bold text-foreground/70 uppercase leading-snug">Distribución en {distribucion.length} departamento(s)</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border border-emerald-800/30 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 rounded-[2rem] overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-emerald-400/10 blur-[50px]" />
                        </div>
                        <CardHeader className="p-10 pb-6 relative z-10">
                            <CardTitle className="text-xl font-black uppercase tracking-tighter text-emerald-300">Protocolos Activos</CardTitle>
                            <CardDescription className="text-[9px] font-bold uppercase text-white/30 tracking-[0.2em]">Gestión de Personal v2.6.5</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 space-y-3 relative z-10">
                            {[
                                { label: "Nómina y Beneficios", href: "/nominas", icon: Calculator, color: "text-emerald-400" },
                                { label: "Reclutamiento e Inducción", href: "/reclutamiento", icon: UserPlus, color: "text-cyan-400" },
                                { label: "Desarrollo Personal", href: "/desarrollo-personal", icon: School, color: "text-teal-400" },
                                { label: "Prestaciones Sociales", href: "/prestaciones-sociales", icon: Scale, color: "text-green-400" },
                            ].map(item => (
                                <Button key={item.label} asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 font-black uppercase text-[10px] tracking-widest transition-all group/btn">
                                    <Link href={item.href as any} className="flex items-center justify-between w-full">
                                        <span className="flex items-center gap-3">
                                            <item.icon className={cn("h-4 w-4", item.color)} />
                                            {item.label}
                                        </span>
                                        <ArrowRight className="h-4 w-4 opacity-20 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                        <CardFooter className="p-8 bg-white/5 border-t border-white/5 flex justify-center relative z-10">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-white/30">
                                <Terminal className="h-4 w-4" /> Nodo Talento · CM|SG|MS
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-[2rem] p-0 overflow-hidden">
                    <DialogHeader className="p-8 pb-4 border-b border-border bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5">
                        <DialogTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                                <UserPlus className="h-5 w-5 text-emerald-500" />
                            </div>
                            Registro de Nuevo Empleado
                        </DialogTitle>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Protocolo LOTTT 2026 · Todos los campos con * son obligatorios</p>
                    </DialogHeader>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Nombre *</Label>
                            <Input placeholder="Primer nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Apellido *</Label>
                            <Input placeholder="Apellido" value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Cédula de Identidad *</Label>
                            <Input placeholder="V-18.745.632" value={form.cedula} onChange={e => setForm(f => ({ ...f, cedula: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Cargo / Posición</Label>
                            <Input placeholder="Ej: Gerente de Ventas" value={form.cargo} onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Departamento</Label>
                            <Select value={form.departamento} onValueChange={v => setForm(f => ({ ...f, departamento: v }))}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                                <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Tipo de Contrato</Label>
                            <Select value={form.tipo_contrato} onValueChange={v => setForm(f => ({ ...f, tipo_contrato: v }))}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {["indefinido", "determinado", "obra", "pasantia"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Ingreso</Label>
                            <Input type="date" value={form.fecha_ingreso} onChange={e => setForm(f => ({ ...f, fecha_ingreso: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Salario Base (Bs.)</Label>
                            <Input type="number" step="0.01" placeholder="0.00" value={form.salario_base} onChange={e => setForm(f => ({ ...f, salario_base: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Teléfono</Label>
                            <Input placeholder="0412-1234567" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Correo Electrónico</Label>
                            <Input type="email" placeholder="empleado@empresa.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Banco para Pago</Label>
                            <Input placeholder="Ej: Banco de Venezuela" value={form.cuenta_banco} onChange={e => setForm(f => ({ ...f, cuenta_banco: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Número de Cuenta</Label>
                            <Input placeholder="0102-0000-00-0000000000" value={form.numero_cuenta} onChange={e => setForm(f => ({ ...f, numero_cuenta: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" />
                        </div>
                    </div>
                    <DialogFooter className="p-8 border-t border-border bg-gradient-to-r from-emerald-500/3 via-transparent to-teal-500/3 flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {saving ? "REGISTRANDO..." : "REGISTRAR EMPLEADO"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
