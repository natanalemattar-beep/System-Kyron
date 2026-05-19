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
  Globe, Plus, Loader2, Ship, Plane, Package, Pencil, Trash2,
  MapPin, DollarSign, FileText, Anchor
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";

interface CompraIntl {
  id: number;
  proveedor: string;
  pais_origen: string;
  descripcion: string;
  referencia_orden: string | null;
  monto: string;
  moneda: string;
  tasa_cambio: string | null;
  monto_bs: string | null;
  flete: string;
  seguro: string;
  aranceles: string;
  iva_aduanero: string;
  costo_total: string;
  fecha_orden: string;
  fecha_embarque: string | null;
  fecha_llegada: string | null;
  incoterm: string;
  estado: string;
  agente_aduanal: string | null;
  numero_bl: string | null;
  numero_dua: string | null;
  notas: string | null;
}

const PAISES = [
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "DE", name: "Alemania", flag: "🇩🇪" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "TR", name: "Turquía", flag: "🇹🇷" },
  { code: "JP", name: "Japón", flag: "🇯🇵" },
  { code: "KR", name: "Corea del Sur", flag: "🇰🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "OTHER", name: "Otro", flag: "🌍" },
];

const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "DDP", "DAP", "FCA"];

const ESTADO_BADGE: Record<string, string> = {
  pendiente: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  en_transito: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  en_aduana: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  nacionalizada: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  entregada: "bg-green-500/10 text-green-700 border-green-500/20",
  cancelada: "bg-red-500/10 text-red-600 border-red-500/20",
};

const ESTADO_LABEL: Record<string, string> = {
  pendiente: "Pendiente",
  en_transito: "En tránsito",
  en_aduana: "En aduana",
  nacionalizada: "Nacionalizada",
  entregada: "Entregada",
  cancelada: "Cancelada",
};

const EMPTY_FORM = {
  proveedor: "", pais_origen: "CN", descripcion: "", referencia_orden: "",
  monto: "", moneda: "USD", tasa_cambio: "", monto_bs: "",
  flete: "0", seguro: "0", aranceles: "0", iva_aduanero: "0",
  fecha_orden: "", fecha_embarque: "", fecha_llegada: "",
  incoterm: "FOB", estado: "pendiente", agente_aduanal: "",
  numero_bl: "", numero_dua: "", notas: "",
};

export default function ComprasInternacionalesPage() {
  const { toast } = useToast();
  const { format: fmtCur } = useCurrency();
  const [compras, setCompras] = useState<CompraIntl[]>([]);
  const [stats, setStats] = useState<Record<string, string>>({});
  const [porPais, setPorPais] = useState<Array<{ pais_origen: string; cantidad: string; total_monto: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [filtroPais, setFiltroPais] = useState<string>("todos");

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/compras-internacionales');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCompras(data.compras || []);
      setStats(data.stats || {});
      setPorPais(data.porPais || []);
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar las compras", variant: "destructive" });
    } finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    if (!form.proveedor || !form.pais_origen || !form.descripcion) {
      toast({ title: "Campos requeridos", description: "Proveedor, país y descripción son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const payload = editId ? { id: editId, ...form } : form;
      const res = await fetch('/api/compras-internacionales', {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast({ title: editId ? "Actualizada" : "Registrada", description: `Compra internacional ${editId ? 'actualizada' : 'registrada'}` });
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
      await loadData();
    } catch {
      toast({ title: "Error", description: "No se pudo guardar", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta compra internacional?")) return;
    try {
      await fetch(`/api/compras-internacionales?id=${id}`, { method: 'DELETE' });
      toast({ title: "Eliminada" });
      await loadData();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const openEdit = (c: CompraIntl) => {
    setEditId(c.id);
    setForm({
      proveedor: c.proveedor, pais_origen: c.pais_origen, descripcion: c.descripcion,
      referencia_orden: c.referencia_orden || "", monto: c.monto,
      moneda: c.moneda, tasa_cambio: c.tasa_cambio || "", monto_bs: c.monto_bs || "",
      flete: c.flete, seguro: c.seguro, aranceles: c.aranceles, iva_aduanero: c.iva_aduanero,
      fecha_orden: c.fecha_orden?.split('T')[0] || "",
      fecha_embarque: c.fecha_embarque?.split('T')[0] || "",
      fecha_llegada: c.fecha_llegada?.split('T')[0] || "",
      incoterm: c.incoterm, estado: c.estado,
      agente_aduanal: c.agente_aduanal || "",
      numero_bl: c.numero_bl || "", numero_dua: c.numero_dua || "",
      notas: c.notas || "",
    });
    setShowForm(true);
  };

  const getPaisInfo = (code: string) => PAISES.find(p => p.code === code) || { code, name: code, flag: "🌍" };
  const filtered = filtroPais === "todos" ? compras : compras.filter(c => c.pais_origen === filtroPais);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="h-5 w-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Compras Internacionales</h1>
          </div>
          <p className="text-sm text-muted-foreground">Importaciones, compras en el exterior y seguimiento aduanero</p>
        </div>
        <Button onClick={() => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Nueva compra
        </Button>
      </header>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Total compras</p>
          <p className="text-2xl font-bold">{stats.total || 0}</p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">{stats.paises || 0} países</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Monto total</p>
          <p className="text-2xl font-bold">{fmtCur(parseFloat(stats.total_monto || '0'))}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">En tránsito</p>
          <p className="text-2xl font-bold text-blue-600">{stats.en_transito || 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted-foreground mb-1">En aduana</p>
          <p className="text-2xl font-bold text-amber-600">{stats.en_aduana || 0}</p>
        </Card>
      </div>

      {porPais.length > 0 && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-3">Compras por país</h3>
          <div className="flex flex-wrap gap-3">
            {porPais.map(p => {
              const info = getPaisInfo(p.pais_origen);
              return (
                <button
                  key={p.pais_origen}
                  onClick={() => setFiltroPais(filtroPais === p.pais_origen ? "todos" : p.pais_origen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm",
                    filtroPais === p.pais_origen
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span>{info.flag}</span>
                  <span className="font-medium">{info.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{p.cantidad}</Badge>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Globe className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No hay compras internacionales registradas</p>
          <Button className="mt-4" variant="outline" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" /> Registrar primera compra
          </Button>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor / País</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="text-right">Costo total</TableHead>
                <TableHead>Incoterm</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => {
                const info = getPaisInfo(c.pais_origen);
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{info.flag}</span>
                        <div>
                          <p className="font-medium text-sm">{c.proveedor}</p>
                          <p className="text-xs text-muted-foreground">{info.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm truncate max-w-[200px]">{c.descripcion}</p>
                      {c.referencia_orden && <p className="text-xs text-muted-foreground">Ref: {c.referencia_orden}</p>}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{c.moneda} {parseFloat(c.monto).toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold">{fmtCur(parseFloat(c.costo_total))}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{c.incoterm}</Badge></TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-[10px]", ESTADO_BADGE[c.estado] || "")}>
                        {ESTADO_LABEL[c.estado] || c.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(c.fecha_orden).toLocaleDateString('es-VE')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(c)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete(c.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditId(null); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar' : 'Nueva'} Compra Internacional</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Proveedor *</Label><Input value={form.proveedor} onChange={e => setForm(f => ({ ...f, proveedor: e.target.value }))} placeholder="Nombre del proveedor" /></div>
              <div>
                <Label>País de origen *</Label>
                <Select value={form.pais_origen} onValueChange={v => setForm(f => ({ ...f, pais_origen: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAISES.map(p => (
                      <SelectItem key={p.code} value={p.code}>{p.flag} {p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Descripción *</Label><Textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} rows={2} placeholder="Descripción de mercancía..." /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Referencia de orden</Label><Input value={form.referencia_orden} onChange={e => setForm(f => ({ ...f, referencia_orden: e.target.value }))} placeholder="PO-001" /></div>
              <div><Label>Monto</Label><Input type="number" value={form.monto} onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} /></div>
              <div>
                <Label>Moneda</Label>
                <Select value={form.moneda} onValueChange={v => setForm(f => ({ ...f, moneda: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CNY">CNY (Yuan)</SelectItem>
                    <SelectItem value="GBP">GBP (Libra)</SelectItem>
                    <SelectItem value="BGN">BGN (Lev)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div><Label>Flete</Label><Input type="number" value={form.flete} onChange={e => setForm(f => ({ ...f, flete: e.target.value }))} /></div>
              <div><Label>Seguro</Label><Input type="number" value={form.seguro} onChange={e => setForm(f => ({ ...f, seguro: e.target.value }))} /></div>
              <div><Label>Aranceles</Label><Input type="number" value={form.aranceles} onChange={e => setForm(f => ({ ...f, aranceles: e.target.value }))} /></div>
              <div><Label>IVA aduanero</Label><Input type="number" value={form.iva_aduanero} onChange={e => setForm(f => ({ ...f, iva_aduanero: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Tasa de cambio</Label><Input type="number" step="0.0001" value={form.tasa_cambio} onChange={e => setForm(f => ({ ...f, tasa_cambio: e.target.value }))} placeholder="Ej: 474.05" /></div>
              <div><Label>Monto en Bs.</Label><Input type="number" value={form.monto_bs} onChange={e => setForm(f => ({ ...f, monto_bs: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Fecha orden</Label><Input type="date" value={form.fecha_orden} onChange={e => setForm(f => ({ ...f, fecha_orden: e.target.value }))} /></div>
              <div><Label>Fecha embarque</Label><Input type="date" value={form.fecha_embarque} onChange={e => setForm(f => ({ ...f, fecha_embarque: e.target.value }))} /></div>
              <div><Label>Fecha llegada</Label><Input type="date" value={form.fecha_llegada} onChange={e => setForm(f => ({ ...f, fecha_llegada: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Incoterm</Label>
                <Select value={form.incoterm} onValueChange={v => setForm(f => ({ ...f, incoterm: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INCOTERMS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado</Label>
                <Select value={form.estado} onValueChange={v => setForm(f => ({ ...f, estado: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ESTADO_LABEL).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Agente aduanal</Label><Input value={form.agente_aduanal} onChange={e => setForm(f => ({ ...f, agente_aduanal: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>N. B/L (Bill of Lading)</Label><Input value={form.numero_bl} onChange={e => setForm(f => ({ ...f, numero_bl: e.target.value }))} /></div>
              <div><Label>N. DUA (Declaración Aduanera)</Label><Input value={form.numero_dua} onChange={e => setForm(f => ({ ...f, numero_dua: e.target.value }))} /></div>
            </div>
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
