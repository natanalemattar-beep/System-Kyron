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
  import { Loader2, Plus, Search, Trash2, ArrowLeft, Users, CircleCheck, Building, Clock, TriangleAlert, XCircle, TriangleAlert, FileText, Shield, Briefcase, Scale, ShieldCheck, FileSignature, Activity, Wallet, DollarSign, Car, Heart, Phone, Globe, Package, UserCheck, Receipt, ShoppingCart, CreditCard, Stethoscope, ShieldAlert, Smartphone, MapPin, Star, Send, Eye, Calendar, Hash, Landmark } from "lucide-react";
  import { useToast } from "@/hooks/use-toast";
  import { cn } from "@/lib/utils";
  import { Link } from "@/navigation";

  const estadoColors: Record<string, string> = {
    activo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  inactivo: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  vacaciones: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  licencia: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  };

  export default function DirectorioCorporativoPage() {
    const { toast } = useToast();
    const [data, setData] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
      nombre: "",
    apellido: "",
    cedula: "",
    cargo: "",
    departamento: "",
    email: "",
    telefono: "",
    extension: "",
    ubicacion: "",
    fecha_ingreso: "",
    tipo_contrato: "",
    supervisor: ""
    });

    const fetchData = useCallback(async () => {
      try {
        const res = await fetch("/api/directorio-corporativo");
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
        const res = await fetch("/api/directorio-corporativo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          toast({ title: "Registro creado", description: "Se ha guardado correctamente." });
          setDialogOpen(false);
          setForm({ nombre: "", apellido: "", cedula: "", cargo: "", departamento: "", email: "", telefono: "", extension: "", ubicacion: "", fecha_ingreso: "", tipo_contrato: "", supervisor: "" });
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
        await fetch("/api/directorio-corporativo", {
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

    const StatIcon = { total: Users, activos: CircleCheck, departamentos: Building, temporales: Clock };

    return (
      <div className="space-y-8 pb-20 relative">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[150px]" />
        </div>

        <div>
          <Link href="/dashboard-empresa" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition mb-4">
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
          <motion.header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wide text-blue-500 mb-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <Activity className="h-3 w-3 animate-pulse" /> DIRECTORIO
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
                Directorio{' '}<span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent italic">Corporativo</span>
              </h1>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Registro de Personal, Cargos y Departamentos</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl h-12 px-8 font-semibold uppercase text-[10px] tracking-[0.15em] bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Nuevo Registro
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold uppercase">Nuevo — Directorio Corporativo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2 py-4">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre *</Label>
                      <Input type="text" value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" required />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Apellido *</Label>
                      <Input type="text" value={form.apellido} onChange={e => setForm(p => ({ ...p, apellido: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" required />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cédula</Label>
                      <Input type="text" value={form.cedula} onChange={e => setForm(p => ({ ...p, cedula: e.target.value }))} placeholder="V-00000000" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cargo *</Label>
                      <Input type="text" value={form.cargo} onChange={e => setForm(p => ({ ...p, cargo: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" required />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Departamento *</Label>
                      <Select value={form.departamento} onValueChange={v => setForm(p => ({ ...p, departamento: v }))}>
                        <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border mt-1"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                        <SelectContent>
                      <SelectItem value="Dirección">Dirección</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="RRHH">RRHH</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Ventas">Ventas</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                    <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                    <SelectItem value="Logística">Logística</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Corporativo</Label>
                      <Input type="text" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Teléfono</Label>
                      <Input type="text" value={form.telefono} onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Extensión</Label>
                      <Input type="text" value={form.extension} onChange={e => setForm(p => ({ ...p, extension: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ubicación/Sede</Label>
                      <Input type="text" value={form.ubicacion} onChange={e => setForm(p => ({ ...p, ubicacion: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha de Ingreso</Label>
                      <Input type="date" value={form.fecha_ingreso} onChange={e => setForm(p => ({ ...p, fecha_ingreso: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tipo Contrato</Label>
                      <Select value={form.tipo_contrato} onValueChange={v => setForm(p => ({ ...p, tipo_contrato: v }))}>
                        <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border mt-1"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                        <SelectContent>
                      <SelectItem value="fijo">Fijo</SelectItem>
                    <SelectItem value="temporal">Temporal</SelectItem>
                    <SelectItem value="pasante">Pasante</SelectItem>
                    <SelectItem value="honorarios">Honorarios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Supervisor</Label>
                      <Input type="text" value={form.supervisor} onChange={e => setForm(p => ({ ...p, supervisor: e.target.value }))} placeholder="" className="h-11 rounded-xl bg-muted/30 border-border mt-1" />
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
            { label: "Total", val: stats.total ?? 0, icon: Users, color: "text-blue-500", glow: "shadow-blue-500/20" },
            { label: "Activos", val: stats.activos ?? 0, icon: CircleCheck, color: "text-emerald-500", glow: "shadow-emerald-500/20" },
            { label: "Departamentos", val: stats.departamentos ?? 0, icon: Building, color: "text-violet-500", glow: "shadow-violet-500/20" },
            { label: "Temporales", val: stats.temporales ?? 0, icon: Clock, color: "text-amber-500", glow: "shadow-amber-500/20" }
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
                <Users className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground font-bold text-sm">Sin registros</p>
                <p className="text-muted-foreground/60 text-xs mt-1">Crea tu primer registro con el botón superior</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                        <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nombre</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Apellido</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cargo</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Departamento</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
                      <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
                      <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((row: any) => (
                      <TableRow key={row.id} className="hover:bg-muted/30 transition">
                        <TableCell className="text-xs font-medium">{row.nombre || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.apellido || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.cargo || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.departamento || "—"}</TableCell>
                      <TableCell className="text-xs font-medium">{row.email || "—"}</TableCell>
                      <TableCell><Badge variant="outline" className={cn("text-[10px] font-bold capitalize", estadoColors[row.estado] || "bg-gray-500/20 text-gray-400")}>{(row.estado || "").replace(/_/g, " ")}</Badge></TableCell>
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
  