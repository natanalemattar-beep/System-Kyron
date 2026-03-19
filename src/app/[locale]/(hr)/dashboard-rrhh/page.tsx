"use client";

import { useState, useEffect, useCallback } from "react";
import { Briefcase, Users, DollarSign, UserPlus, ArrowRight, FileWarning, CalendarCheck2, ShieldCheck, Activity, Zap, BrainCircuit, School, Terminal, CircleCheck as CheckCircle, Stethoscope, TrendingUp, Scale, Calculator, Loader as Loader2 } from "lucide-react";
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
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <Briefcase className="h-3 w-3" /> ÁREA DE TALENTO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-secondary italic">Cultura y Personal</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Capital Humano • Protocolo LOTTT 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={fetchEmpleados} disabled={loading}>
                        <Activity className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Actualizar
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setShowDialog(true)}>
                        <UserPlus className="mr-2 h-4 w-4" /> NUEVO EMPLEADO
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { title: "Personal Activo", value: loading ? "—" : String(empleados.length), icon: Users, color: "text-secondary" },
                    { title: "Carga de Nómina", value: loading ? "—" : formatCurrency(totalNomina, 'Bs.'), icon: DollarSign, color: "text-emerald-500" },
                    { title: "Departamentos", value: loading ? "—" : String(distribucion.length), icon: Briefcase, color: "text-blue-500" },
                ].map((kpi, index) => (
                    <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl group hover:bg-white/[0.05]">
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                                <div className={cn("p-2 rounded-lg border border-border group-hover:scale-110 transition-transform", kpi.color)}>
                                    <kpi.icon className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="text-3xl font-black italic text-foreground tracking-tighter">{kpi.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Distribución de Fuerza Laboral</CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Balance de capital humano por área operativa • Datos reales</CardDescription>
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
                        <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 border-l-4 border-emerald-500 shadow-xl">
                            <h3 className="text-lg font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-emerald-500" /> Cumplimiento LOPCYMAT
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

                        <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-xl">
                            <h3 className="text-lg font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-3">
                                <BrainCircuit className="h-5 w-5 text-primary" /> Resumen Salarial
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-sm">{loading ? "—" : formatCurrency(totalNomina, 'Bs.')}</div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-primary">Carga Mensual Total</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{empleados.length} empleados activos</p>
                                </div>
                                <Button variant="outline" asChild className="w-full h-10 rounded-xl border-primary/20 text-primary font-black uppercase text-[9px] tracking-widest hover:bg-primary/5 transition-all">
                                    <Link href="/nominas">Ver Libro de Nómina</Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700"><ShieldCheck className="h-32 w-32" /></div>
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-3 italic">
                                <Activity className="h-4 w-4" /> Alertas del Nodo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            {empleados.length === 0 ? (
                                <div className="py-4 text-center">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Sin alertas activas</p>
                                </div>
                            ) : (
                                <div className={cn("flex items-start gap-4 p-4 rounded-2xl border border-border bg-blue-500/5")}>
                                    <FileWarning className="h-5 w-5 mt-0.5 shrink-0 text-blue-500" />
                                    <p className="text-[10px] font-bold text-foreground/70 uppercase leading-snug">{empleados.length} empleado(s) activo(s) en nómina</p>
                                </div>
                            )}
                            {distribucion.length > 0 && (
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-secondary/5">
                                    <CalendarCheck2 className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                                    <p className="text-[10px] font-bold text-foreground/70 uppercase leading-snug">Distribución en {distribucion.length} departamento(s)</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl">
                        <CardHeader className="p-10 pb-6">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Protocolos Activos</CardTitle>
                            <CardDescription className="text-[9px] font-bold uppercase text-white/30 tracking-[0.2em]">Gestión de Personal v2.6.5</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 space-y-3">
                            {[
                                { label: "Nómina y Beneficios", href: "/nominas", icon: Calculator, color: "text-emerald-500" },
                                { label: "Reclutamiento e Inducción", href: "/reclutamiento", icon: UserPlus, color: "text-blue-400" },
                                { label: "Desarrollo Personal", href: "/desarrollo-personal", icon: School, color: "text-primary" },
                                { label: "Prestaciones Sociales", href: "/prestaciones-sociales", icon: Scale, color: "text-secondary" },
                            ].map(item => (
                                <Button key={item.label} asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest transition-all group">
                                    <Link href={item.href as any} className="flex items-center justify-between w-full">
                                        <span className="flex items-center gap-3">
                                            <item.icon className={cn("h-4 w-4", item.color)} />
                                            {item.label}
                                        </span>
                                        <ArrowRight className="h-4 w-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                        <CardFooter className="p-8 bg-white/5 border-t border-white/5 flex justify-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <Terminal className="h-4 w-4" /> Nodo Talento • CM|SG|MS
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-[2rem] p-0 overflow-hidden">
                    <DialogHeader className="p-8 pb-4 border-b border-border bg-muted/10">
                        <DialogTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                            <UserPlus className="h-5 w-5 text-secondary" /> Registro de Nuevo Empleado
                        </DialogTitle>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Protocolo LOTTT 2026 • Todos los campos con * son obligatorios</p>
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
                            <Input placeholder="V-12.345.678" value={form.cedula} onChange={e => setForm(f => ({ ...f, cedula: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" />
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
                    <DialogFooter className="p-8 border-t border-border bg-muted/10 flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button className="flex-1 btn-3d-secondary h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {saving ? "REGISTRANDO..." : "REGISTRAR EMPLEADO"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
