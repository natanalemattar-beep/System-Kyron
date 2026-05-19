"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Search, ChevronRight, ChevronDown, Hash, Loader2, Inbox, Printer, Plus, Trash2, Edit3, X, Save, FolderPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type CuentaDB = {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  nivel: number;
  cuenta_padre: number | null;
  activa: boolean;
  descripcion: string | null;
};

type CuentaTree = CuentaDB & { subcuentas: CuentaTree[] };

const tipoColors: Record<string, { text: string; bg: string }> = {
  activo: { text: "text-primary", bg: "bg-primary/10" },
  pasivo: { text: "text-rose-500", bg: "bg-rose-500/10" },
  patrimonio: { text: "text-violet-500", bg: "bg-violet-500/10" },
  ingreso: { text: "text-emerald-500", bg: "bg-emerald-500/10" },
  costo: { text: "text-amber-500", bg: "bg-amber-500/10" },
  gasto: { text: "text-orange-500", bg: "bg-orange-500/10" },
};

const tipoOptions = [
  { value: "activo", label: "Activo" },
  { value: "pasivo", label: "Pasivo" },
  { value: "patrimonio", label: "Patrimonio" },
  { value: "ingreso", label: "Ingreso" },
  { value: "costo", label: "Costo" },
  { value: "gasto", label: "Gasto" },
];

const emptyForm = { codigo: "", nombre: "", tipo: "activo", descripcion: "", cuenta_padre: null as number | null };

function buildTree(flat: CuentaDB[]): CuentaTree[] {
  const map = new Map<number, CuentaTree>();
  const roots: CuentaTree[] = [];
  for (const c of flat) map.set(c.id, { ...c, subcuentas: [] });
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.cuenta_padre && map.has(c.cuenta_padre)) {
      map.get(c.cuenta_padre)!.subcuentas.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function flatSearch(flat: CuentaDB[], term: string): CuentaDB[] {
  const lower = term.toLowerCase();
  const matched = new Set<number>();
  for (const c of flat) {
    if (c.nombre.toLowerCase().includes(lower) || c.codigo.includes(term)) {
      matched.add(c.id);
      let parent = c.cuenta_padre;
      while (parent) {
        matched.add(parent);
        const p = flat.find(x => x.id === parent);
        parent = p?.cuenta_padre ?? null;
      }
    }
  }
  return flat.filter(c => matched.has(c.id));
}

function CuentaRow({ cuenta, depth = 0, onEdit, onDelete, onAddSub }: {
  cuenta: CuentaTree; depth?: number;
  onEdit: (c: CuentaDB) => void;
  onDelete: (c: CuentaDB) => void;
  onAddSub: (parentId: number, parentCodigo: string, parentTipo: string) => void;
}) {
  const [open, setOpen] = useState(depth < 2);
  const hasSub = cuenta.subcuentas.length > 0;
  const tc = tipoColors[cuenta.tipo] || tipoColors.activo;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 py-2.5 px-4 hover:bg-muted/30 transition-colors group border-b border-border/30",
          depth === 0 && "bg-muted/20 font-bold"
        )}
        style={{ paddingLeft: `${16 + depth * 24}px` }}
      >
        <button
          type="button"
          className="w-5 flex items-center justify-center shrink-0"
          onClick={() => hasSub && setOpen(!open)}
        >
          {hasSub ? (
            open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <Hash className="h-3 w-3 text-muted-foreground/40" />
          )}
        </button>
        <span className="font-mono text-[11px] text-muted-foreground w-20 shrink-0">{cuenta.codigo}</span>
        <span className={cn("flex-1 text-xs min-w-0 truncate", depth === 0 ? "font-semibold uppercase tracking-wide" : "font-medium")}>{cuenta.nombre}</span>
        <Badge className={cn("text-[10px] font-bold uppercase border-none shrink-0", tc.bg, tc.text)}>{cuenta.tipo}</Badge>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button type="button" onClick={() => onAddSub(cuenta.id, cuenta.codigo, cuenta.tipo)} className="p-1 rounded-md hover:bg-primary/10 text-primary" title="Agregar subcuenta">
            <FolderPlus className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => onEdit(cuenta)} className="p-1 rounded-md hover:bg-blue-500/10 text-blue-500" title="Editar">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => onDelete(cuenta)} className="p-1 rounded-md hover:bg-red-500/10 text-red-500" title="Eliminar">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {open && cuenta.subcuentas.map(sub => (
        <CuentaRow key={sub.id} cuenta={sub} depth={depth + 1} onEdit={onEdit} onDelete={onDelete} onAddSub={onAddSub} />
      ))}
    </>
  );
}

export default function PlanCuentasPage() {
  const [cuentasFlat, setCuentasFlat] = useState<CuentaDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchCuentas = useCallback(async () => {
    try {
      const res = await fetch('/api/contabilidad/records?type=plan_cuentas');
      if (!res.ok) throw new Error();
      const d = await res.json();
      setCuentasFlat(d.rows ?? []);
    } catch {
      setCuentasFlat([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCuentas(); }, [fetchCuentas]);

  const filtered = search ? flatSearch(cuentasFlat, search) : cuentasFlat;
  const tree = buildTree(filtered);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openAddSub = (parentId: number, parentCodigo: string, parentTipo: string) => {
    setEditId(null);
    setForm({ ...emptyForm, cuenta_padre: parentId, codigo: parentCodigo + ".", tipo: parentTipo });
    setShowForm(true);
  };

  const openEdit = (c: CuentaDB) => {
    setEditId(c.id);
    setForm({ codigo: c.codigo, nombre: c.nombre, tipo: c.tipo, descripcion: c.descripcion || "", cuenta_padre: c.cuenta_padre });
    setShowForm(true);
  };

  const handleDelete = async (c: CuentaDB) => {
    const hasSubs = cuentasFlat.some(x => x.cuenta_padre === c.id);
    if (hasSubs) {
      toast({ title: "No se puede eliminar", description: "Esta cuenta tiene subcuentas. Elimínalas primero.", variant: "destructive" });
      return;
    }
    if (!confirm(`¿Eliminar la cuenta ${c.codigo} — ${c.nombre}?`)) return;
    try {
      const res = await fetch(`/api/contabilidad/records?type=plan_cuentas&id=${c.id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Error"); }
      toast({ title: "Cuenta eliminada" });
      fetchCuentas();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleSave = async () => {
    if (!form.codigo.trim() || !form.nombre.trim()) {
      toast({ title: "Campos requeridos", description: "Código y nombre son obligatorios.", variant: "destructive" });
      return;
    }

    const dots = form.codigo.split(".").filter(Boolean).length;
    const nivel = dots || 1;

    setSaving(true);
    try {
      if (editId) {
        const res = await fetch('/api/contabilidad/records', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "plan_cuentas", id: editId,
            data: { codigo: form.codigo.trim(), nombre: form.nombre.trim(), tipo: form.tipo, nivel, descripcion: form.descripcion.trim() || null, cuenta_padre: form.cuenta_padre },
          }),
        });
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Error al actualizar"); }
        toast({ title: "Cuenta actualizada" });
      } else {
        const res = await fetch('/api/contabilidad/records', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "plan_cuentas",
            data: { codigo: form.codigo.trim(), nombre: form.nombre.trim(), tipo: form.tipo, nivel, descripcion: form.descripcion.trim() || null, cuenta_padre: form.cuenta_padre, activa: true },
          }),
        });
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Error al crear"); }
        toast({ title: "Cuenta creada", description: `${form.codigo} — ${form.nombre}` });
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
      fetchCuentas();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const parentOptions = cuentasFlat.filter(c => !editId || c.id !== editId);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton label="Dashboard" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Catálogo Contable
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Plan de <span className="text-primary">Cuentas</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">VEN-NIF · Catálogo configurable · Partida doble</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
              <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>
            <Button onClick={openNew} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Nueva Cuenta
            </Button>
          </div>
        </div>
      </header>

      {showForm && (
        <Card className="rounded-2xl border shadow-lg overflow-hidden border-primary/20">
          <CardHeader className="p-5 border-b bg-primary/5 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" /> {editId ? "Editar Cuenta" : "Nueva Cuenta"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest">Código *</Label>
                <Input
                  value={form.codigo}
                  onChange={e => setForm(f => ({ ...f, codigo: e.target.value }))}
                  placeholder="1.1.01"
                  className="h-10 rounded-xl font-mono"
                />
                <p className="text-[11px] text-muted-foreground">Ej: 1 (Activo), 1.1 (Activo Corriente), 1.1.01 (Caja)</p>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest">Nombre *</Label>
                <Input
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  placeholder="Caja General"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest">Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest">Cuenta Padre (opcional)</Label>
                <Select
                  value={form.cuenta_padre ? String(form.cuenta_padre) : "none"}
                  onValueChange={v => setForm(f => ({ ...f, cuenta_padre: v === "none" ? null : Number(v) }))}
                >
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue placeholder="Sin cuenta padre (raíz)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="none">— Sin cuenta padre (raíz) —</SelectItem>
                    {parentOptions.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        <span className="font-mono text-[10px] mr-2">{c.codigo}</span> {c.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest">Descripción (opcional)</Label>
                <Input
                  value={form.descripcion}
                  onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  placeholder="Descripción de la cuenta..."
                  className="h-10 rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }} className="rounded-xl">
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving} className="rounded-xl">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editId ? "Guardar Cambios" : "Crear Cuenta"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative max-w-lg flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cuenta por código o nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          <span>{cuentasFlat.length} cuentas registradas</span>
        </div>
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Estructura del Plan de Cuentas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando plan de cuentas...</span>
            </div>
          ) : tree.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">{search ? "Sin resultados" : "Sin cuentas registradas"}</p>
              <p className="text-xs text-muted-foreground/70 text-center max-w-sm">
                {search
                  ? "No se encontraron cuentas con ese criterio de búsqueda."
                  : "Haga clic en \"Nueva Cuenta\" para comenzar a configurar su plan de cuentas VEN-NIF."}
              </p>
              {!search && (
                <Button onClick={openNew} className="mt-4 rounded-xl">
                  <Plus className="mr-2 h-4 w-4" /> Crear Primera Cuenta
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/10 border-b text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="w-5" />
                <span className="w-20">Código</span>
                <span className="flex-1">Nombre de la Cuenta</span>
                <span className="w-20 text-center">Tipo</span>
                <span className="w-24 text-right pr-1">Acciones</span>
              </div>
              {tree.map(cuenta => (
                <CuentaRow key={cuenta.id} cuenta={cuenta} onEdit={openEdit} onDelete={handleDelete} onAddSub={openAddSub} />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
