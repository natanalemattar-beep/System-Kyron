"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, CirclePlus as PlusCircle, Download, Activity, Zap, Terminal, CalendarClock, ShieldAlert, TrendingDown, Wand as Wand2, CircleCheck as CheckCircle, Loader as Loader2, RefreshCw, Trash2, Pencil } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InventarioItem {
    id: number;
    sku: string | null;
    nombre: string;
    descripcion: string | null;
    categoria: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    costo_unitario: string;
    precio_venta: string;
    fecha_vencimiento: string | null;
}

interface Stats {
    total_items: string;
    valor_total: string;
    items_criticos: string;
    categorias: string;
}

const CATEGORIAS = ["Tecnología", "Telecom", "Consumibles", "Fiscal", "Oficina", "Servicios", "General", "Alimentos", "Salud", "Otro"];

function getRiesgo(item: InventarioItem): string {
    if (!item.fecha_vencimiento) return "Sin Venc.";
    const venc = new Date(item.fecha_vencimiento);
    const hoy = new Date();
    const diff = (venc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "Vencido";
    if (diff <= 30) return "Crítico";
    if (diff <= 90) return "Alerta";
    return "Bajo";
}

export default function InventarioPage() {
    const { toast } = useToast();
    const [items, setItems] = useState<InventarioItem[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAlert, setActiveAlert] = useState<InventarioItem | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        sku: "", nombre: "", descripcion: "", categoria: "General",
        unidad_medida: "unidad", stock_actual: "", stock_minimo: "0",
        costo_unitario: "", precio_venta: "", fecha_vencimiento: ""
    });

    const fetchInventario = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/inventario');
            if (res.ok) {
                const data = await res.json();
                setItems(data.items ?? []);
                setStats(data.stats ?? null);
                const critico = (data.items ?? []).find((i: InventarioItem) => {
                    const r = getRiesgo(i);
                    return r === "Crítico" || r === "Vencido";
                });
                setActiveAlert(critico ?? null);
            }
        } catch {
            toast({ title: "Error al cargar inventario", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => { fetchInventario(); }, [fetchInventario]);

    const handleSave = async () => {
        if (!form.nombre.trim()) {
            toast({ title: "El nombre es requerido", variant: "destructive" });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/inventario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sku: form.sku || undefined,
                    nombre: form.nombre,
                    descripcion: form.descripcion || undefined,
                    categoria: form.categoria,
                    unidad_medida: form.unidad_medida,
                    stock_actual: parseInt(form.stock_actual || '0', 10),
                    stock_minimo: parseInt(form.stock_minimo || '0', 10),
                    costo_unitario: parseFloat(form.costo_unitario || '0'),
                    precio_venta: parseFloat(form.precio_venta || '0'),
                    fecha_vencimiento: form.fecha_vencimiento || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast({ title: "PRODUCTO REGISTRADO", description: `${form.nombre} añadido al kardex.`, action: <CheckCircle className="text-primary h-4 w-4" /> });
            setShowDialog(false);
            setForm({ sku: "", nombre: "", descripcion: "", categoria: "General", unidad_medida: "unidad", stock_actual: "", stock_minimo: "0", costo_unitario: "", precio_venta: "", fecha_vencimiento: "" });
            fetchInventario();
        } catch (err: unknown) {
            toast({ title: "Error", description: err instanceof Error ? err.message : "No se pudo guardar", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, nombre: string) => {
        if (!confirm(`¿Eliminar "${nombre}" del inventario?`)) return;
        await fetch(`/api/inventario?id=${id}`, { method: 'DELETE' });
        toast({ title: "Producto eliminado" });
        fetchInventario();
    };

    const handleExportCSV = () => {
        if (!items.length) { toast({ title: "Sin datos para exportar" }); return; }
        const cols = ["SKU", "Nombre", "Categoría", "Stock", "Stock Mín.", "Costo Unit.", "Precio Venta", "Vencimiento"];
        const rows = items.map(i => [
            i.sku ?? "", i.nombre, i.categoria, i.stock_actual,
            i.stock_minimo, i.costo_unitario, i.precio_venta,
            i.fecha_vencimiento ?? "N/A"
        ]);
        const csv = [cols, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "inventario-kyron.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    const valorTotal = parseFloat(stats?.valor_total ?? "0");

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Archive className="h-3 w-3" /> NODO DE EXISTENCIAS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Kardex <span className="text-primary italic">de Inventario</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Riesgo • Liquidación Preventiva 2026</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50" onClick={fetchInventario} disabled={loading}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> ACTUALIZAR
                    </Button>
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50" onClick={handleExportCSV}>
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR CSV
                    </Button>
                    <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setShowDialog(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> NUEVO PRODUCTO
                    </Button>
                </div>
            </header>

            <AnimatePresence>
                {activeAlert && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 glass-card border-none bg-rose-500/5 p-8 rounded-[3rem] shadow-2xl border-l-4 border-rose-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                                <ShieldAlert className="h-32 w-32 text-rose-500" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                <div className="space-y-6 flex-1">
                                    <div className="space-y-2">
                                        <Badge className="bg-rose-500/20 text-rose-500 border-none text-[8px] font-black uppercase tracking-widest">Alerta de Vencimiento Crítica</Badge>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Riesgo en SKU: {activeAlert.sku ?? "S/N"}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{activeAlert.nombre}</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <TrendingDown className="h-5 w-5 text-rose-500" />
                                            <h4 className="text-xs font-black uppercase text-rose-500">Análisis Predictivo</h4>
                                        </div>
                                        <p className="text-xs font-medium italic text-muted-foreground/80 leading-relaxed text-justify uppercase">
                                            El lote vence el <span className="text-rose-500 font-black">{activeAlert.fecha_vencimiento ?? "N/A"}</span>. Se recomienda liquidar mediante estrategia de volumen para proteger la inversión de capital.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-64 space-y-4">
                                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
                                        <p className="text-[8px] font-black uppercase text-primary mb-2">Valor en riesgo</p>
                                        <p className="text-sm font-black italic text-white leading-tight uppercase">
                                            {formatCurrency(activeAlert.stock_actual * parseFloat(activeAlert.costo_unitario), 'Bs.')}
                                        </p>
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={async () => {
                                        try {
                                            const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'inventario', subcategoria: 'liquidacion', descripcion: `Estrategia de liquidación para ${activeAlert?.nombre ?? 'producto'}` }) });
                                            if (res.ok) { toast({ title: "ESTRATEGIA ACTIVADA", description: "Protocolo de liquidación registrado." }); }
                                            else { toast({ title: "Error", description: "No se pudo registrar", variant: "destructive" }); }
                                        } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
                                    }}>
                                        <Wand2 className="mr-2 h-4 w-4" /> Aplicar Estrategia
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        <Card className="glass-card border-none bg-card/40 p-8 rounded-[3rem] shadow-2xl flex flex-col justify-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-6">Valor en Riesgo Total</p>
                            <p className="text-5xl font-black italic text-rose-500 tracking-tight shadow-glow-sm">
                                {formatCurrency(parseInt(stats?.items_criticos ?? "0") > 0 ? parseInt(stats?.items_criticos ?? "0") * parseFloat(activeAlert?.costo_unitario ?? "0") : 0, 'Bs.')}
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                                <Terminal className="h-4 w-4" /> {stats?.items_criticos ?? 0} producto(s) crítico(s)
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5"><Zap className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Valor Total Almacén</p>
                    <p className="text-3xl font-black italic text-primary tracking-tight shadow-glow-text">{loading ? "—" : formatCurrency(valorTotal, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Total Productos</p>
                    <p className="text-3xl font-black italic text-foreground tracking-tight">{loading ? "—" : stats?.total_items ?? 0}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5"><ShieldAlert className="h-24 w-24 text-rose-500" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Por Vencer (30d)</p>
                    <p className={cn("text-3xl font-black italic tracking-tight", parseInt(stats?.items_criticos ?? "0") > 0 ? "text-rose-500" : "text-emerald-500")}>{loading ? "—" : stats?.items_criticos ?? 0}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5"><Archive className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Categorías</p>
                    <p className="text-3xl font-black italic text-foreground tracking-tight">{loading ? "—" : stats?.categorias ?? 0}</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Kardex de Existencias Auditado</CardTitle>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                        <Terminal className="h-4 w-4" /> {items.length} registros en base de datos
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">SKU / Ref</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Producto</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Stock</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Costo</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Venta</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Riesgo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={7} className="py-16 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
                            ) : items.length === 0 ? (
                                <TableRow><TableCell colSpan={7} className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Archive className="h-10 w-10 text-muted-foreground/20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Inventario vacío</p>
                                        <Button className="btn-3d-primary mt-2 h-10 px-6 rounded-xl font-black text-[9px] uppercase" onClick={() => setShowDialog(true)}>
                                            <PlusCircle className="mr-2 h-3 w-3" /> Añadir primer producto
                                        </Button>
                                    </div>
                                </TableCell></TableRow>
                            ) : items.map((item) => {
                                const riesgo = getRiesgo(item);
                                return (
                                    <TableRow key={item.id} className={cn(
                                        "border-border/50 hover:bg-muted/20 transition-all group cursor-pointer",
                                        (riesgo === "Crítico" || riesgo === "Vencido") && "bg-rose-500/5"
                                    )} onClick={() => (riesgo === "Crítico" || riesgo === "Vencido") ? setActiveAlert(item) : null}>
                                        <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{item.sku ?? "—"}</TableCell>
                                        <TableCell className="py-6">
                                            <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{item.nombre}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{item.categoria} · {item.unidad_medida}</p>
                                        </TableCell>
                                        <TableCell className="text-center py-6">
                                            <span className={cn("font-black text-sm", item.stock_actual <= item.stock_minimo ? "text-rose-500" : "text-foreground/70")}>{item.stock_actual}</span>
                                        </TableCell>
                                        <TableCell className="text-center py-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <CalendarClock className={cn("h-3.5 w-3.5", (riesgo === "Crítico" || riesgo === "Vencido") ? "text-rose-500" : "text-muted-foreground/40")} />
                                                <span className={cn("text-[10px] font-bold uppercase", (riesgo === "Crítico" || riesgo === "Vencido") ? "text-rose-500" : "text-muted-foreground")}>{item.fecha_vencimiento ?? "N/A"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(parseFloat(item.costo_unitario), 'Bs.')}</TableCell>
                                        <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(parseFloat(item.precio_venta), 'Bs.')}</TableCell>
                                        <TableCell className="text-right pr-10 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Badge variant={riesgo === "Crítico" || riesgo === "Vencido" ? 'destructive' : riesgo === "Alerta" ? 'outline' : 'outline'} className={cn("text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg", riesgo === "Alerta" && "border-amber-500/30 text-amber-500")}>
                                                    {riesgo}
                                                </Badge>
                                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-500" onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.nombre); }}>
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">Datos en tiempo real desde la base de datos. Haga clic en un producto crítico para activar el protocolo de liquidación.</p>
                </CardFooter>
            </Card>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-[2rem] p-0 overflow-hidden">
                    <DialogHeader className="p-8 pb-4 border-b border-border bg-muted/10">
                        <DialogTitle className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                            <Archive className="h-5 w-5 text-primary" /> Registro de Nuevo Producto
                        </DialogTitle>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Todos los campos marcados son obligatorios</p>
                    </DialogHeader>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Nombre del Producto *</Label>
                            <Input placeholder="Ej: SIM Card 5G Pro" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">SKU / Referencia</Label>
                            <Input placeholder="Ej: SIM-5G-001" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-mono font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Categoría</Label>
                            <Select value={form.categoria} onValueChange={v => setForm(f => ({ ...f, categoria: v }))}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                                <SelectContent>{CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Unidad de Medida</Label>
                            <Select value={form.unidad_medida} onValueChange={v => setForm(f => ({ ...f, unidad_medida: v }))}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {["unidad", "kg", "litro", "metro", "caja", "paquete", "servicio"].map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Stock Actual *</Label>
                            <Input type="number" placeholder="0" value={form.stock_actual} onChange={e => setForm(f => ({ ...f, stock_actual: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Stock Mínimo (Alerta)</Label>
                            <Input type="number" placeholder="0" value={form.stock_minimo} onChange={e => setForm(f => ({ ...f, stock_minimo: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Costo Unitario (Bs.) *</Label>
                            <Input type="number" step="0.01" placeholder="0.00" value={form.costo_unitario} onChange={e => setForm(f => ({ ...f, costo_unitario: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Precio de Venta (Bs.)</Label>
                            <Input type="number" step="0.01" placeholder="0.00" value={form.precio_venta} onChange={e => setForm(f => ({ ...f, precio_venta: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Vencimiento</Label>
                            <Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Descripción</Label>
                            <Input placeholder="Descripción opcional..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} className="h-12 rounded-xl bg-muted/30 border-border font-bold text-sm" />
                        </div>
                    </div>
                    <DialogFooter className="p-8 border-t border-border bg-muted/10 flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button className="flex-1 btn-3d-primary h-12 rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {saving ? "GUARDANDO..." : "REGISTRAR PRODUCTO"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
