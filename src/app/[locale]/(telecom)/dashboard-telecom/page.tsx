"use client";

import { useState, useEffect, useCallback } from "react";
import { Signal, ArrowRight, ShieldCheck, Activity, Radio, Lock, Zap, Globe, Cpu, Database, FileText, Terminal, CirclePlus as PlusCircle, Loader as Loader2, CircleCheck as CheckCircle, RefreshCw, Wifi } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate, cn } from "@/lib/utils";
import { Link } from '@/navigation';
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

interface Linea {
    id: number;
    numero: string;
    operadora: string;
    tipo_linea: string;
    titular: string | null;
    cedula_titular: string | null;
    plan_contratado: string | null;
    monto_plan: string;
    moneda_plan: string;
    fecha_activacion: string | null;
    fecha_vencimiento: string | null;
    activa: boolean;
    uso_datos_gb: string | null;
    limite_datos_gb: string | null;
}

const OPERADORAS = ["Movilnet", "Movistar", "Digitel", "Inter", "NetUno", "Otro"];

export default function DashboardTelecomPage() {
    const { toast } = useToast();
    const [lineas, setLineas] = useState<Linea[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        numero: "", operadora: "Movilnet", tipo_linea: "postpago",
        titular: "", cedula_titular: "", plan_contratado: "",
        monto_plan: "", moneda_plan: "USD",
        fecha_activacion: "", fecha_vencimiento: "",
        limite_datos_gb: "", notas: ""
    });

    const fetchLineas = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/telecom');
            if (res.ok) {
                const data = await res.json();
                setLineas(data.lineas ?? []);
            }
        } catch { /* silently fail */ }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchLineas(); }, [fetchLineas]);

    const lineasActivas = lineas.filter(l => l.activa);

    const handleSave = async () => {
        if (!form.numero || !form.operadora) {
            toast({ title: "Número y operadora son requeridos", variant: "destructive" }); return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/telecom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numero: form.numero, operadora: form.operadora,
                    tipo_linea: form.tipo_linea,
                    titular: form.titular || undefined,
                    cedula_titular: form.cedula_titular || undefined,
                    plan_contratado: form.plan_contratado || undefined,
                    monto_plan: parseFloat(form.monto_plan || "0"),
                    moneda_plan: form.moneda_plan,
                    fecha_activacion: form.fecha_activacion || undefined,
                    fecha_vencimiento: form.fecha_vencimiento || undefined,
                    limite_datos_gb: form.limite_datos_gb ? parseFloat(form.limite_datos_gb) : undefined,
                    notas: form.notas || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast({ title: "LÍNEA REGISTRADA", description: `${form.numero} (${form.operadora}) activada en el sistema.`, action: <CheckCircle className="text-amber-500 h-4 w-4" /> });
            setShowDialog(false);
            setForm({ numero: "", operadora: "Movilnet", tipo_linea: "postpago", titular: "", cedula_titular: "", plan_contratado: "", monto_plan: "", moneda_plan: "USD", fecha_activacion: "", fecha_vencimiento: "", limite_datos_gb: "", notas: "" });
            fetchLineas();
        } catch (err: unknown) {
            toast({ title: "Error", description: err instanceof Error ? err.message : "No se pudo guardar", variant: "destructive" });
        } finally { setSaving(false); }
    };

    return (
        <div className="space-y-12 pb-20 px-6 md:px-10">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-amber-500 pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 shadow-glow mb-4">
                        <Signal className="h-3 w-3" /> ÁREA TÉCNICA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Gestión de <span className="text-amber-500 italic">Conectividad</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Infraestructura Digital • Servicios 5G • {lineas.length} líneas registradas</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={fetchLineas} disabled={loading}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Actualizar
                    </Button>
                    <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black shadow-2xl" onClick={() => setShowDialog(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> NUEVA LÍNEA
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="glass-card border-none bg-amber-500/5 p-8 rounded-[2.5rem] shadow-2xl border border-amber-500/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 mb-4">Líneas Activas</p>
                    <p className="text-4xl font-black italic text-amber-400 tracking-tighter">{loading ? "—" : lineasActivas.length}</p>
                </Card>
                <Card className="glass-card border-none bg-white/[0.02] p-8 rounded-[2.5rem] shadow-2xl border border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Total Registradas</p>
                    <p className="text-4xl font-black italic text-white tracking-tighter">{loading ? "—" : lineas.length}</p>
                </Card>
                <Card className="glass-card border-none bg-white/[0.02] p-8 rounded-[2.5rem] shadow-2xl border border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Estado de Red</p>
                    <p className="text-2xl font-black italic text-emerald-400 tracking-tighter uppercase">OPERATIVO</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12">
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                    <Radio className="h-6 w-6 text-amber-500" /> Líneas Registradas en Sistema
                                </CardTitle>
                                <Button className="h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20" onClick={() => setShowDialog(true)}>
                                    <PlusCircle className="mr-2 h-3 w-3" /> Añadir Línea
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.02] border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Número / Operadora</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Titular</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Plan</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Estado</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Vencimiento</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow><TableCell colSpan={5} className="py-16 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-500" /></TableCell></TableRow>
                                    ) : lineas.length === 0 ? (
                                        <TableRow><TableCell colSpan={5} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Wifi className="h-10 w-10 text-white/10" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Sin líneas registradas</p>
                                                <Button className="mt-2 h-10 px-6 rounded-xl font-black text-[9px] uppercase bg-amber-500/10 border border-amber-500/20 text-amber-400" onClick={() => setShowDialog(true)}>
                                                    <PlusCircle className="mr-2 h-3 w-3" /> Registrar primera línea
                                                </Button>
                                            </div>
                                        </TableCell></TableRow>
                                    ) : lineas.map(linea => (
                                        <TableRow key={linea.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-sm text-white/80 uppercase italic tracking-tight font-mono">{linea.numero}</p>
                                                <p className="text-[9px] font-mono font-bold text-white/30 uppercase mt-1">{linea.operadora} • {linea.tipo_linea}</p>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <p className="text-xs font-bold text-white/60 uppercase">{linea.titular ?? "—"}</p>
                                                <p className="text-[9px] font-mono text-white/20">{linea.cedula_titular ?? ""}</p>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <p className="text-xs font-bold text-white/60 uppercase">{linea.plan_contratado ?? "Sin plan"}</p>
                                                {parseFloat(linea.monto_plan) > 0 && <p className="text-[9px] font-mono text-amber-400">{linea.monto_plan} {linea.moneda_plan}</p>}
                                            </TableCell>
                                            <TableCell className="py-6 text-center">
                                                <span className={cn("font-black text-[10px] tracking-widest uppercase italic", linea.activa ? "text-green-400" : "text-red-400")}>
                                                    {linea.activa ? "ACTIVA" : "INACTIVA"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <span className="text-[10px] font-bold text-white/30">{linea.fecha_vencimiento ? formatDate(linea.fecha_vencimiento) : "—"}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="glass-card border-none p-12 md:p-20 rounded-[4rem] bg-white/[0.02] mt-10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                <div className="grid lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
                    <div className="lg:col-span-5 space-y-10">
                        <div className="flex items-center gap-6">
                            <Logo className="h-16 w-16 drop-shadow-glow" />
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                                Red de Datos <br/> <span className="text-amber-500">Empresarial</span>
                            </h2>
                        </div>
                        <p className="text-xl font-bold italic text-white/60 leading-relaxed text-justify border-l-4 border-amber-500/20 pl-10">
                            Infraestructura de conectividad profesional basada en estándares internacionales. Kyron gestiona de forma inteligente las líneas de su empresa.
                        </p>
                        <div className="flex items-center gap-10 pt-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                            <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> ESTÁNDAR GLOBAL</span>
                            <span className="flex items-center gap-2"><Cpu className="h-3 w-3" /> ACTIVACIÓN SEGURA</span>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <Card className="bg-amber-500/5 border border-amber-500/20 p-10 rounded-[3rem] flex items-center justify-between">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Estado de la Red</p>
                                <p className="text-2xl font-black text-white italic tracking-tighter uppercase">FUNCIONANDO</p>
                                <p className="text-[9px] font-bold text-white/30 uppercase">{lineasActivas.length} línea(s) activa(s) en tiempo real</p>
                            </div>
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px] font-black px-6 py-2 rounded-xl shadow-glow-secondary uppercase">Alta Velocidad</Badge>
                        </Card>
                    </div>
                </div>
            </Card>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-[2rem] p-0 overflow-hidden">
                    <DialogHeader className="p-8 pb-4 border-b border-border bg-muted/10">
                        <DialogTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                            <Signal className="h-5 w-5 text-amber-500" /> Registrar Nueva Línea Telefónica
                        </DialogTitle>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Sistema de Gestión Telecom • Los campos * son obligatorios</p>
                    </DialogHeader>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Número Telefónico *</Label><Input placeholder="0412-1234567" value={form.numero} onChange={e => setForm(f => ({ ...f, numero: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Operadora *</Label><Select value={form.operadora} onValueChange={v => setForm(f => ({ ...f, operadora: v }))}><SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger><SelectContent>{OPERADORAS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Tipo de Línea</Label><Select value={form.tipo_linea} onValueChange={v => setForm(f => ({ ...f, tipo_linea: v }))}><SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger><SelectContent>{["postpago", "prepago", "corporativo", "eSIM"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Titular</Label><Input placeholder="Nombre del titular" value={form.titular} onChange={e => setForm(f => ({ ...f, titular: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Cédula del Titular</Label><Input placeholder="V-12.345.678" value={form.cedula_titular} onChange={e => setForm(f => ({ ...f, cedula_titular: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Plan Contratado</Label><Input placeholder="Ej: Plan Empresarial 5G" value={form.plan_contratado} onChange={e => setForm(f => ({ ...f, plan_contratado: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Monto del Plan</Label><Input type="number" step="0.01" placeholder="0.00" value={form.monto_plan} onChange={e => setForm(f => ({ ...f, monto_plan: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Moneda</Label><Select value={form.moneda_plan} onValueChange={v => setForm(f => ({ ...f, moneda_plan: v }))}><SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger><SelectContent>{["USD", "VES", "EUR"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Activación</Label><Input type="date" value={form.fecha_activacion} onChange={e => setForm(f => ({ ...f, fecha_activacion: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Vencimiento</Label><Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Límite de Datos (GB)</Label><Input type="number" step="0.1" placeholder="0" value={form.limite_datos_gb} onChange={e => setForm(f => ({ ...f, limite_datos_gb: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono" /></div>
                        <div className="space-y-2"><Label className="text-[9px] font-black uppercase tracking-widest">Notas</Label><Input placeholder="Observaciones adicionales..." value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border" /></div>
                    </div>
                    <DialogFooter className="p-8 border-t border-border bg-muted/10 flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest bg-amber-500 hover:bg-amber-400 text-black" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {saving ? "REGISTRANDO..." : "ACTIVAR LÍNEA"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
