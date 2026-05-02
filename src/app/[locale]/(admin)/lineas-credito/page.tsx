"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CreditCard, Plus, Loader2, TrendingUp, TriangleAlert, DollarSign,
  Pencil, Trash2, Percent, Calendar, Building2, Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";

interface LineaCredito {
  id: number;
  tipo: string;
  entidad: string;
  referencia: string | null;
  monto_aprobado: string;
  monto_utilizado: string;
  moneda: string;
  tasa_interes: string | null;
  fecha_apertura: string;
  fecha_vencimiento: string | null;
  plazo_meses: number | null;
  estado: string;
  condiciones: string | null;
  contacto: string | null;
  notas: string | null;
}

interface Stats {
  activas: string;
  total_aprobado: string;
  total_utilizado: string;
  en_mora: string;
}

const ESTADO_BADGE: Record<string, string> = {
  activa: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  suspendida: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  cerrada: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  vencida: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  en_mora: "bg-red-500/10 text-red-600 border-red-500/20",
};

const EMPTY_FORM = {
  tipo: "recibida", entidad: "", referencia: "", monto_aprobado: "",
  monto_utilizado: "0", moneda: "USD", tasa_interes: "", fecha_apertura: "",
  fecha_vencimiento: "", plazo_meses: "", estado: "activa", condiciones: "",
  contacto: "", notas: "",
};

export default function LineasCreditoPage() {
  const { toast } = useToast();
  const { format: fmtCur } = useCurrency();
  const [lineas, setLineas] = useState<LineaCredito[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>("todas");

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/lineas-credito');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLineas(data.lineas || []);
      setStats(data.stats || null);
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar las líneas de crédito", variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    if (!form.entidad || !form.monto_aprobado) {
      toast({ title: "Campos requeridos", description: "Entidad y monto aprobado son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const payload = editId ? { id: editId, ...form } : form;
      const res = await fetch('/api/lineas-credito', {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast({ title: editId ? "Actualizada" : "Registrada", description: `Línea de crédito ${editId ? 'actualizada' : 'registrada'} exitosamente` });
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
      await loadData();
    } catch {
      toast({ title: "Error", description: "No se pudo guardar", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta línea de crédito?")) return;
    try {
      await fetch(`/api/lineas-credito?id=${id}`, { method: 'DELETE' });
      toast({ title: "Eliminada" });
      await loadData();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const openEdit = (l: LineaCredito) => {
    setEditId(l.id);
    setForm({
      tipo: l.tipo, entidad: l.entidad, referencia: l.referencia || "",
      monto_aprobado: l.monto_aprobado, monto_utilizado: l.monto_utilizado,
      moneda: l.moneda, tasa_interes: l.tasa_interes || "",
      fecha_apertura: l.fecha_apertura?.split('T')[0] || "",
      fecha_vencimiento: l.fecha_vencimiento?.split('T')[0] || "",
      plazo_meses: l.plazo_meses?.toString() || "", estado: l.estado,
      condiciones: l.condiciones || "", contacto: l.contacto || "",
      notas: l.notas || "",
    });
    setShowForm(true);
  };

  const filtered = filtroTipo === "todas" ? lineas : lineas.filter(l => l.tipo === filtroTipo);
  const disponible = stats ? parseFloat(stats.total_aprobado) - parseFloat(stats.total_utilizado) : 0;
  const utilizacion = stats && parseFloat(stats.total_aprobado) > 0
    ? Math.round((parseFloat(stats.total_utilizado) / parseFloat(stats.total_aprobado)) * 100)
    : 0;

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Líneas de Crédito</h1>
          </div>
          <p className="text-sm text-muted-foreground">Gestión de créditos recibidos y otorgados a clientes</p>
        </div>
        <Button onClick={() => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Nueva línea
        </Button>
      </header>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Líneas activas</p>
          <p className="text-2xl font-bold text-primary">{stats?.activas || 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Total aprobado</p>
          <p className="text-2xl font-bold">{fmtCur(parseFloat(stats?.total_aprobado || '0'))}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Disponible</p>
          <p className="text-2xl font-bold text-emerald-600">{fmtCur(disponible)}</p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">{100 - utilizacion}% sin usar</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">En mora</p>
          <p className={cn("text-2xl font-bold", parseInt(stats?.en_mora || '0') > 0 ? "text-red-500" : "text-foreground")}>
            {stats?.en_mora || 0}
          </p>
        </Card>
      </div>

      <div className="flex gap-2">
        {["todas", "recibida", "otorgada"].map(t => (
          <Button key={t} variant={filtroTipo === t ? "default" : "outline"} size="sm" onClick={() => setFiltroTipo(t)}>
            {t === "todas" ? "Todas" : t === "recibida" ? "Recibidas" : "Otorgadas"}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <CreditCard className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No hay líneas de crédito registradas</p>
          <Button className="mt-4" variant="outline" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" /> Registrar primera línea
          </Button>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entidad</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Aprobado</TableHead>
                <TableHead className="text-right">Utilizado</TableHead>
                <TableHead className="text-right">Tasa</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(l => (
                <TableRow key={l.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{l.entidad}</p>
                      {l.referencia && <p className="text-xs text-muted-foreground">{l.referencia}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {l.tipo === 'recibida' ? 'Recibida' : 'Otorgada'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{fmtCur(parseFloat(l.monto_aprobado))}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{fmtCur(parseFloat(l.monto_utilizado))}</TableCell>
                  <TableCell className="text-right text-sm">{l.tasa_interes ? `${l.tasa_interes}%` : '—'}</TableCell>
                  <TableCell className="text-sm">
                    {l.fecha_vencimiento ? new Date(l.fecha_vencimiento).toLocaleDateString('es-VE') : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[10px]", ESTADO_BADGE[l.estado] || "")}>
                      {l.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(l)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete(l.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditId(null); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar' : 'Nueva'} Línea de Crédito</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recibida">Recibida (banco/proveedor)</SelectItem>
                    <SelectItem value="otorgada">Otorgada (a cliente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado</Label>
                <Select value={form.estado} onValueChange={v => setForm(f => ({ ...f, estado: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activa">Activa</SelectItem>
                    <SelectItem value="suspendida">Suspendida</SelectItem>
                    <SelectItem value="cerrada">Cerrada</SelectItem>
                    <SelectItem value="vencida">Vencida</SelectItem>
                    <SelectItem value="en_mora">En mora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Entidad *</Label><Input value={form.entidad} onChange={e => setForm(f => ({ ...f, entidad: e.target.value }))} placeholder="Banco, proveedor o cliente" /></div>
              <div><Label>Referencia</Label><Input value={form.referencia} onChange={e => setForm(f => ({ ...f, referencia: e.target.value }))} placeholder="Nro. contrato" /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Monto aprobado *</Label><Input type="number" value={form.monto_aprobado} onChange={e => setForm(f => ({ ...f, monto_aprobado: e.target.value }))} /></div>
              <div><Label>Monto utilizado</Label><Input type="number" value={form.monto_utilizado} onChange={e => setForm(f => ({ ...f, monto_utilizado: e.target.value }))} /></div>
              <div>
                <Label>Moneda</Label>
                <Select value={form.moneda} onValueChange={v => setForm(f => ({ ...f, moneda: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="VES">VES (Bs.)</SelectItem>
                    <SelectItem value="CNY">CNY (Yuan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Tasa de interés (%)</Label><Input type="number" step="0.01" value={form.tasa_interes} onChange={e => setForm(f => ({ ...f, tasa_interes: e.target.value }))} /></div>
              <div><Label>Plazo (meses)</Label><Input type="number" value={form.plazo_meses} onChange={e => setForm(f => ({ ...f, plazo_meses: e.target.value }))} /></div>
              <div><Label>Fecha apertura</Label><Input type="date" value={form.fecha_apertura} onChange={e => setForm(f => ({ ...f, fecha_apertura: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Fecha vencimiento</Label><Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} /></div>
              <div><Label>Contacto</Label><Input value={form.contacto} onChange={e => setForm(f => ({ ...f, contacto: e.target.value }))} placeholder="Persona o departamento" /></div>
            </div>
            <div><Label>Condiciones</Label><Textarea value={form.condiciones} onChange={e => setForm(f => ({ ...f, condiciones: e.target.value }))} rows={2} placeholder="Términos, garantías, restricciones..." /></div>
            <div><Label>Notas</Label><Textarea value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editId ? 'Guardar cambios' : 'Registrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
