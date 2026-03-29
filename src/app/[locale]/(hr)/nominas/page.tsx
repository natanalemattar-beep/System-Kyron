"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Download, Users, Wallet, Loader as Loader2, Activity, Terminal, Calendar, Zap, TrendingUp, ShieldCheck, RefreshCw, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: string;
    departamento: string;
    salario_base: string;
    fecha_ingreso: string | null;
    tipo_contrato: string | null;
}

const DEPARTAMENTOS = ["Ventas", "Tecnología", "Admin", "Soporte", "Diseño", "Gerencia", "RRHH", "Legal", "Contabilidad", "Operaciones"];

export default function NominasPage() {
    const { toast } = useToast();
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
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
    const totalUtilidades = totalNomina * 3;

    const handleProcessPayroll = async () => {
        if (empleados.length === 0) {
            toast({ title: "No hay empleados registrados", description: "Registra empleados primero.", variant: "destructive" });
            return;
        }
        setIsProcessing(true);
        toast({ title: "CALCULANDO NÓMINA", description: "Auditando asignaciones y deducciones LOTTT..." });
        try {
            const mesActual = new Date().toISOString().slice(0, 7);
            const res = await fetch('/api/nomina', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    periodo: mesActual,
                    tipo: 'quincenal',
                    fecha_inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
                    fecha_fin: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString().split('T')[0],
                    empleados: empleados.map(e => ({
                        empleado_id: e.id,
                        salario_base: parseFloat(e.salario_base ?? "0"),
                    })),
                }),
            });
            if (res.ok) {
                toast({ title: "NÓMINA CERTIFICADA", description: `Cálculo de ${empleados.length} empleados finalizado y guardado.`, action: <CheckCircle className="text-emerald-500 h-4 w-4" /> });
            } else {
                const data = await res.json();
                toast({ title: "Error al procesar nómina", description: data.error ?? "Error desconocido", variant: "destructive" });
            }
        } catch {
            toast({ title: "Error de conexión", variant: "destructive" });
        } finally { setIsProcessing(false); }
    };

    const handleExportCSV = () => {
        if (!empleados.length) { toast({ title: "Sin empleados para exportar" }); return; }
        const cols = ["Nombre", "Apellido", "Cédula", "Cargo", "Departamento", "Salario Base", "Tipo Contrato"];
        const rows = empleados.map(e => [e.nombre, e.apellido, e.cedula, e.cargo ?? "", e.departamento ?? "", e.salario_base, e.tipo_contrato ?? ""]);
        const csv = [cols, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob); const a = document.createElement("a");
        a.href = url; a.download = "nomina-kyron.csv"; a.click(); URL.revokeObjectURL(url);
    };

    const handleSave = async () => {
        if (!form.nombre || !form.apellido || !form.cedula) {
            toast({ title: "Nombre, apellido y cédula son requeridos", variant: "destructive" }); return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/empleados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: form.nombre, apellido: form.apellido, cedula: form.cedula, cargo: form.cargo, departamento: form.departamento, fecha_ingreso: form.fecha_ingreso || undefined, salario_base: parseFloat(form.salario_base || "0"), tipo_contrato: form.tipo_contrato, telefono: form.telefono || undefined, email: form.email || undefined, cuenta_banco: form.cuenta_banco || undefined, numero_cuenta: form.numero_cuenta || undefined }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast({ title: "EMPLEADO REGISTRADO", description: `${form.nombre} ${form.apellido} incorporado.`, action: <CheckCircle className="text-secondary h-4 w-4" /> });
            setShowDialog(false);
            setForm({ nombre: "", apellido: "", cedula: "", cargo: "", departamento: "Admin", fecha_ingreso: "", salario_base: "", tipo_contrato: "indefinido", telefono: "", email: "", cuenta_banco: "", numero_cuenta: "" });
            fetchEmpleados();
        } catch (err: unknown) { toast({ title: "Error", description: err instanceof Error ? err.message : "No se pudo guardar", variant: "destructive" }); }
        finally { setSaving(false); }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <Calculator className="h-3 w-3" /> NODO DE COMPENSACIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Libro de <span className="text-secondary italic">Nómina y Beneficios</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control Salarial • Vacaciones • Utilidades 2026</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={fetchEmpleados} disabled={loading}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> ACTUALIZAR
                    </Button>
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={handleExportCSV}>
                        <Download className="mr-2 h-4 w-4" /> ARCHIVO BANCO
                    </Button>
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => setShowDialog(true)}>
                        <UserPlus className="mr-2 h-4 w-4" /> NUEVO EMPLEADO
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={handleProcessPayroll} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                        CALCULAR QUINCENA
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Wallet className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Total Erogación (Mes)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter shadow-glow-text">{loading ? "—" : formatCurrency(totalNomina, 'Bs.')}</p>
                    <p className="text-[9px] font-bold text-muted-foreground/40 mt-2 uppercase">{empleados.length} empleados</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><TrendingUp className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Provisión de Utilidades</p>
                    <p className="text-4xl font-black italic text-secondary tracking-tighter shadow-glow-secondary">{loading ? "—" : formatCurrency(totalUtilidades, 'Bs.')}</p>
                    <p className="text-[9px] font-bold text-muted-foreground/40 mt-2 uppercase">Proyección 90 días</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Estatus Parafiscal</p>
                    <p className="text-4xl font-black italic text-emerald-500 tracking-tighter uppercase">AL DÍA</p>
                </Card>
            </div>

            <Tabs defaultValue="nomina" className="w-full">
                <TabsList className="flex h-16 bg-card/40 border border-border rounded-[2rem] p-2 mb-10 shadow-inner max-w-2xl">
                    <TabsTrigger value="nomina" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Relación Salarial</TabsTrigger>
                    <TabsTrigger value="vacaciones" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Plan Vacacional</TabsTrigger>
                    <TabsTrigger value="utilidades" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Utilidades</TabsTrigger>
                </TabsList>

                <TabsContent value="nomina" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Trabajador / Cargo</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Cédula</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Departamento</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Sueldo Base</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tipo Contrato</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow><TableCell colSpan={5} className="py-16 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-secondary" /></TableCell></TableRow>
                                    ) : empleados.length === 0 ? (
                                        <TableRow><TableCell colSpan={5} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Users className="h-10 w-10 text-muted-foreground/20" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Sin empleados registrados</p>
                                                <Button className="btn-3d-secondary mt-2 h-10 px-6 rounded-xl font-black text-[9px] uppercase" onClick={() => setShowDialog(true)}>
                                                    <PlusCircle className="mr-2 h-3 w-3" /> Registrar Empleado
                                                </Button>
                                            </div>
                                        </TableCell></TableRow>
                                    ) : empleados.map(e => (
                                        <TableRow key={e.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-secondary transition-colors">{e.nombre} {e.apellido}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase">{e.cargo ?? "Sin cargo"}</p>
                                            </TableCell>
                                            <TableCell className="py-6 text-center font-mono text-xs font-bold text-foreground/40">{e.cedula}</TableCell>
                                            <TableCell className="py-6 text-center">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">{e.departamento ?? "—"}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(parseFloat(e.salario_base ?? "0"), 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 px-3 h-6 rounded-lg">{e.tipo_contrato ?? "indefinido"}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 bg-secondary/5 border-t border-border flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <Terminal className="h-4 w-4 text-secondary" /> {empleados.length} trabajadores • LOTTT v2.8.5
                            </div>
                            <Button variant="ghost" className="text-secondary text-[9px] font-black uppercase tracking-widest" onClick={() => setShowDialog(true)}>
                                <PlusCircle className="mr-2 h-3 w-3" /> Añadir Empleado
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="vacaciones" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 p-10 shadow-2xl">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8">Cronograma Vacacional Certificado</h3>
                        {empleados.length === 0 ? (
                            <div className="py-12 text-center"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Sin empleados registrados</p></div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-8">
                                {empleados.map(e => {
                                    const ingreso = e.fecha_ingreso ? new Date(e.fecha_ingreso) : new Date();
                                    const mesVacaciones = new Date(ingreso.setFullYear(ingreso.getFullYear() + 1)).toLocaleDateString('es-VE', { month: 'long' });
                                    return (
                                        <div key={e.id} className="p-6 rounded-[2.5rem] bg-white/5 border border-border space-y-4 group hover:border-secondary/30 transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 bg-secondary/10 rounded-2xl group-hover:scale-110 transition-transform"><Calendar className="h-5 w-5 text-secondary" /></div>
                                                <Badge variant="outline" className="text-[7px] font-black uppercase capitalize">{mesVacaciones}</Badge>
                                            </div>
                                            <p className="font-black text-xs uppercase italic text-foreground/80">{e.nombre} {e.apellido}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">Bono Vacacional: <span className="text-secondary">{formatCurrency(parseFloat(e.salario_base ?? "0") * 0.5, 'Bs.')}</span></p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="utilidades" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 p-10 shadow-2xl border-l-4 border-emerald-500">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><TrendingUp className="h-8 w-8 text-emerald-500" /></div>
                            <div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Provisión Legal de Utilidades</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Cálculo Proyectado a 90 días de salario</p>
                            </div>
                        </div>
                        {empleados.length === 0 ? (
                            <div className="py-8 text-center"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Sin empleados registrados</p></div>
                        ) : (
                            <div className="space-y-6">
                                {empleados.map(e => (
                                    <div key={e.id} className="flex justify-between items-center border-b border-border pb-4 last:border-none last:pb-0">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase text-foreground/80">{e.nombre} {e.apellido}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Base: {formatCurrency(parseFloat(e.salario_base ?? "0"), 'Bs.')} × 3 meses</p>
                                        </div>
                                        <p className="text-xl font-black italic text-emerald-500 tracking-tighter">{formatCurrency(parseFloat(e.salario_base ?? "0") * 3, 'Bs.')}</p>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-emerald-500/20 flex justify-between items-center">
                                    <p className="text-xs font-black uppercase text-emerald-500">Total Provisión Anual</p>
                                    <p className="text-2xl font-black italic text-emerald-500">{formatCurrency(totalUtilidades, 'Bs.')}</p>
                                </div>
                            </div>
                        )}
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-[2rem] p-0 overflow-hidden">
                    <DialogHeader className="p-8 pb-4 border-b border-border bg-muted/10">
                        <DialogTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                            <UserPlus className="h-5 w-5 text-secondary" /> Incorporar Nuevo Empleado
                        </DialogTitle>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Protocolo LOTTT 2026 • Los campos * son obligatorios</p>
                    </DialogHeader>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Nombre *</Label><Input placeholder="Primer nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Apellido *</Label><Input placeholder="Apellido" value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Cédula *</Label><Input placeholder="V-18.745.632" value={form.cedula} onChange={e => setForm(f => ({ ...f, cedula: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Cargo</Label><Input placeholder="Ej: Analista Contable" value={form.cargo} onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Departamento</Label><Select value={form.departamento} onValueChange={v => setForm(f => ({ ...f, departamento: v }))}><SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger><SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Tipo Contrato</Label><Select value={form.tipo_contrato} onValueChange={v => setForm(f => ({ ...f, tipo_contrato: v }))}><SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger><SelectContent>{["indefinido", "determinado", "obra", "pasantia"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Ingreso</Label><Input type="date" value={form.fecha_ingreso} onChange={e => setForm(f => ({ ...f, fecha_ingreso: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Salario Base (Bs.)</Label><Input type="number" step="0.01" placeholder="0.00" value={form.salario_base} onChange={e => setForm(f => ({ ...f, salario_base: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Teléfono</Label><Input placeholder="0412-1234567" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Correo Electrónico</Label><Input type="email" placeholder="empleado@empresa.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Banco</Label><Input placeholder="Ej: Banco de Venezuela" value={form.cuenta_banco} onChange={e => setForm(f => ({ ...f, cuenta_banco: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Número de Cuenta</Label><Input placeholder="0102-0000-00-0000000000" value={form.numero_cuenta} onChange={e => setForm(f => ({ ...f, numero_cuenta: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                    </div>
                    <DialogFooter className="p-8 border-t border-border bg-muted/10 flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button className="flex-1 btn-3d-secondary h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {saving ? "GUARDANDO..." : "INCORPORAR EMPLEADO"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
