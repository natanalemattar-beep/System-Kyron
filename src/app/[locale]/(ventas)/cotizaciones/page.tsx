"use client";

  import { useState, useEffect, useCallback } from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
  import { motion } from "framer-motion";
  import { Loader2, Plus, Search, Trash2, ArrowLeft, Receipt, Send, CircleCheck, DollarSign, Clock, TriangleAlert, XCircle, TriangleAlert, FileText, Shield, Briefcase, Scale, ShieldCheck, FileSignature, Activity, Wallet, Users, Car, Heart, Phone, Globe, Package, Building, UserCheck, ShoppingCart, CreditCard, Stethoscope, ShieldAlert, Smartphone, MapPin, Star, Eye, Calendar, Hash, Landmark } from "lucide-react";
  import { useToast } from "@/hooks/use-toast";
  import { cn } from "@/lib/utils";
  import { Link } from "@/navigation";

  const estadoColors: Record<string, string> = {
    borrador: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  enviada: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  aceptada: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rechazada: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  vencida: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  };

  export default function CotizacionesPage() {
    const { toast } = useToast();
    const [data, setData] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
      numero_cotizacion: "",
    cliente_nombre: "",
    cliente_rif: "",
    cliente_email: "",
    fecha_emision: "",
    fecha_validez: "",
    moneda: "",
    condiciones: "",
    notas: ""
    });

    const fetchData = useCallback(async () => {
      try {
        const res = await fetch("/api/cotizaciones");
        if (res.ok) {
          const json = await res.json();
          setData(json.rows || []);
          setStats(json.stats || {});
        }
      } catch {} finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSave = async () => {
      setSaving(true);
      try {
        const res = await fetch("/api/cotizaciones", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          toast({ title: "Registro creado", description: "Se ha guardado correctamente." });
          setDialogOpen(false);
          setForm({ numero_cotizacion: "", cliente_nombre: "", cliente_rif: "", cliente_email: "", fecha_emision: "", fecha_validez: "", moneda: "", condiciones: "", notas: "" });
          fetchData();
        } else {
          toast({ variant: "destructive", title: "Error", description: "No se pudo guardar." });
        }
      } catch {
        toast({ variant: "destructive", title: "Error de conexión" });
      } finally {
        setSaving(false);
      }
    };

    const handleDelete = async (id: number) => {
      try {
        await fetch("/api/cotizaciones", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        toast({ title: "Eliminado" });
        fetchData();
      } catch {
        toast({ variant: "destructive", title: "Error" });
      }
    };

    const filtered = data.filter(r =>
      !search || JSON.stringify(r).toLowerCase().includes(search.toLowerCase())
    );

    const StatIcon = { total: Receipt, enviadas: Send, aceptadas: CircleCheck, monto_total: DollarSign };

    return (
      <div className="space-y-8 pb-20 relative">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[150px]" />
        </div>

        <div>
          <Link href="/facturacion" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition mb-4">
            <ArrowLeft className="h-3 w-3" /> Centro de Facturación
          </Link>
          <motion.header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wide text-blue-500 mb-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <Activity className="h-3 w-3 animate-pulse" /> COTIZACIONES
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent italic">Cotizaciones</span>
              </h1>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Creación y Seguimiento de Presupuestos para Clientes</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl h-12 px-8 font-semibold uppercase text-[10px] tracking-[0.15em] bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Nuevo Registro
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold uppercase">Nuevo — Cotizaciones</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2 py-4">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nro. Cotización *</Label>
                      <Input type="text" value={form.numero_cotizacion} onChange={e => setForm(p => ({ ...p, numero_cotizacion: e.target.value }))} placeholder="COT-000001" className="h-11 rounded-xl bg-muted/30 border-border mt-1" required />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cliente *</Label>
                      <Input type="text" value={form.cliente_nombre} onChange={e => setForm(p => ({ ...p, cliente_nombre: e.target.value }))} placeholder="Nombre o razón social" className="h-11 rounded-xl bg-muted/30 border-border mt-1" required />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RIF</Label>
                      <Input type="text" value={form.cliente_rif} onChange={e => setForm(p => ({ ...p, cliente_rif: e.target.value }))} placeholder="J-12345678-0" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Cliente</Label>
                      <Input type="text" value={form.cliente_email} onChange={e => setForm(p => ({ ...p, cliente_email: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha Emisión</Label>
                      <Input type="date" value={form.fecha_emision} onChange={e => setForm(p => ({ ...p, fecha_emision: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Válida Hasta</Label>
                      <Input type="date" value={form.fecha_validez} onChange={e => setForm(p => ({ ...p, fecha_validez: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Moneda</Label>
                      <Select value={form.moneda} onValueChange={v => setForm(p => ({ ...p, moneda: v }))}>
                        <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border mt-1"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                        <SelectContent>
                      <SelectItem value="VES">VES</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  <div className="md:col-span-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Condiciones</Label>
                      <Textarea value={form.condiciones} onChange={e => setForm(p => ({ ...p, condiciones: e.target.value }))} placeholder="Condiciones comerciales" className="rounded-xl bg-muted/30 border-border mt-1" rows={3} />
                    </div>
                  <div className="md:col-span-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notas</Label>
                      <Textarea value={form.notas} onChange={e => setForm(p => ({ ...p, notas: e.target.value }))} placeholder="" className="rounded-xl bg-muted/30 border-border mt-1" rows={3} />
                    </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSave} disabled={saving} className="rounded-xl font-bold">
                    {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null} Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.header>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total", val: stats.total ?? 0, icon: Receipt, color: "text-blue-500", glow: "shadow-blue-500/20" },
            { label: "Enviadas", val: stats.enviadas ?? 0, icon: Send, color: "text-amber-500", glow: "shadow-amber-500/20" },
            { label: "Aceptadas", val: stats.aceptadas ?? 0, icon: CircleCheck, color: "text-emerald-500", glow: "shadow-emerald-500/20" },
            { label: "Monto Total", val: stats.monto_total ?? 0, icon: DollarSign, color: "text-violet-500", glow: "shadow-violet-500/20" }
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Card className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${kpi.glow}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                      <p className="text-2xl font-bold mt-1">{typeof kpi.val === 'number' ? kpi.val.toLocaleString('es-VE') : kpi.val}</p>
                    </div>
                    <kpi.icon className={`h-8 w-8 ${kpi.color} opacity-60`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Registros</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="pl-10 h-10 rounded-xl bg-muted/30 border-border text-xs" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Receipt className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground font-bold text-sm">Sin registros</p>
                <p className="text-muted-foreground/60 text-xs mt-1">Crea tu primer registro con el botón superior</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                        <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nro.</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">RIF</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Total</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Validez</TableHead>
                      <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((row: any) => (
                      <TableRow key={row.id} className="hover:bg-muted/30 transition">
                        <TableCell className="text-xs font-medium">{row.numero_cotizacion || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.cliente_nombre || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.cliente_rif || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.total || "—"}</TableCell>
                      <TableCell><Badge variant="outline" className={cn("text-[10px] font-bold capitalize", estadoColors[row.estado] || "bg-gray-500/20 text-gray-400")}>{(row.estado || "").replace(/_/g, " ")}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.fecha_validez ? new Date(row.fecha_validez).toLocaleDateString("es-VE") : "—"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)} className="h-8 w-8 p-0 text-rose-400 hover:text-rose-500 hover:bg-rose-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  