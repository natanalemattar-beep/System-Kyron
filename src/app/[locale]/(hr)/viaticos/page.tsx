"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plane, MapPin, Building2, Hotel, UtensilsCrossed, Car, Fuel, Receipt,
  Phone, ShieldCheck, CreditCard, Banknote, Plus, Search, Loader2,
  Globe, Flag, Users, FileText, CheckCircle, XCircle, Clock, Eye,
  Trash2, DollarSign, TrendingUp, Briefcase, Calendar, Filter,
  Download, ChevronDown, AlertTriangle, Gift, Wallet, ArrowUpDown
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

interface Viatico {
  id: number;
  tipo_viaje: string;
  destino_pais: string | null;
  destino_ciudad: string;
  motivo: string;
  fecha_salida: string;
  fecha_retorno: string;
  dias: number;
  categoria: string;
  descripcion: string | null;
  proveedor: string | null;
  numero_factura: string | null;
  tiene_factura: boolean;
  monto: string;
  moneda: string;
  tasa_cambio: string | null;
  monto_ves: string | null;
  estado: string;
  aprobado_por: string | null;
  fecha_aprobacion: string | null;
  notas: string | null;
  es_socio: boolean;
  es_bono: boolean;
  empleado_nombre: string | null;
  empleado_apellido: string | null;
  empleado_cargo: string | null;
  empleado_departamento: string | null;
  created_at: string;
}

interface Stats {
  total: string;
  pendientes: string;
  aprobados: string;
  pagados: string;
  rendidos: string;
  rechazados: string;
  total_aprobado: string;
  total_pendiente: string;
  total_internacional: string;
  total_nacional: string;
  total_socios: string;
  sin_factura: string;
  total_bonos: string;
}

const CATEGORIAS = [
  { value: "pasaje_aereo", label: "Pasaje Aéreo", icon: Plane, color: "text-blue-500" },
  { value: "pasaje_terrestre", label: "Pasaje Terrestre", icon: Car, color: "text-slate-600" },
  { value: "hotel", label: "Hotel / Alojamiento", icon: Hotel, color: "text-purple-500" },
  { value: "restaurante", label: "Restaurante / Alimentación", icon: UtensilsCrossed, color: "text-orange-500" },
  { value: "transporte_local", label: "Transporte Local", icon: Car, color: "text-teal-500" },
  { value: "combustible", label: "Combustible", icon: Fuel, color: "text-amber-600" },
  { value: "peaje", label: "Peajes", icon: CreditCard, color: "text-gray-500" },
  { value: "telefonia", label: "Telefonía / Internet", icon: Phone, color: "text-indigo-500" },
  { value: "seguro_viaje", label: "Seguro de Viaje", icon: ShieldCheck, color: "text-green-500" },
  { value: "visa", label: "Visa / Permisos", icon: FileText, color: "text-red-500" },
  { value: "impuestos", label: "Impuestos de Salida", icon: Receipt, color: "text-rose-600" },
  { value: "propinas", label: "Propinas", icon: Banknote, color: "text-emerald-500" },
  { value: "lavanderia", label: "Lavandería", icon: Building2, color: "text-cyan-500" },
  { value: "representacion", label: "Gastos de Representación", icon: Briefcase, color: "text-violet-500" },
  { value: "otros", label: "Otros Gastos", icon: Wallet, color: "text-gray-400" },
];

const MONEDAS = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "VES", label: "VES (Bs.)", symbol: "Bs." },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "COP", label: "COP ($)", symbol: "COP$" },
  { value: "BRL", label: "BRL (R$)", symbol: "R$" },
];

const ESTADOS = [
  { value: "pendiente", label: "Pendiente", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  { value: "aprobado", label: "Aprobado", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300", icon: CheckCircle },
  { value: "rechazado", label: "Rechazado", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", icon: XCircle },
  { value: "pagado", label: "Pagado", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", icon: DollarSign },
  { value: "rendido", label: "Rendido", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300", icon: FileText },
];

const PAISES_LATAM = [
  "Colombia", "Brasil", "Argentina", "Chile", "Perú", "Ecuador", "Bolivia",
  "Paraguay", "Uruguay", "México", "Panamá", "Costa Rica", "Guatemala",
  "Honduras", "El Salvador", "Nicaragua", "Rep. Dominicana", "Cuba",
  "Puerto Rico", "Trinidad y Tobago", "Guyana", "Surinam"
];

const PAISES_OTROS = [
  "Estados Unidos", "Canadá", "España", "Portugal", "Italia", "Francia",
  "Alemania", "Reino Unido", "China", "Japón", "Emiratos Árabes", "Turquía"
];

const CIUDADES_VE = [
  "Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay", "Ciudad Guayana",
  "Barcelona", "Maturín", "San Cristóbal", "Cumaná", "Mérida", "Barinas",
  "Punto Fijo", "Puerto La Cruz", "Los Teques", "Guarenas", "Guatire",
  "Porlamar", "San Fernando de Apure", "Coro", "Acarigua", "Calabozo",
  "El Tigre", "Tucupita", "Puerto Ordaz", "Valera", "Guanare"
];

function getCategoriaInfo(cat: string) {
  return CATEGORIAS.find(c => c.value === cat) || CATEGORIAS[CATEGORIAS.length - 1];
}

function getEstadoInfo(est: string) {
  return ESTADOS.find(e => e.value === est) || ESTADOS[0];
}

function getMonedaSymbol(mon: string) {
  return MONEDAS.find(m => m.value === mon)?.symbol || "$";
}

function formatMonto(monto: string | number, moneda: string) {
  const val = typeof monto === "string" ? parseFloat(monto) : monto;
  if (isNaN(val)) return `${getMonedaSymbol(moneda)} 0,00`;
  return `${getMonedaSymbol(moneda)} ${val.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatFecha(f: string) {
  if (!f) return "—";
  return new Date(f).toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ViaticosPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [viaticos, setViaticos] = useState<Viatico[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState("internacional");
  const [showDialog, setShowDialog] = useState(false);
  const [showDetail, setShowDetail] = useState<Viatico | null>(null);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [filterCategoria, setFilterCategoria] = useState("todas");

  const [form, setForm] = useState({
    tipo_viaje: "internacional" as string,
    destino_pais: "",
    destino_ciudad: "",
    motivo: "",
    fecha_salida: "",
    fecha_retorno: "",
    dias: 1,
    categoria: "pasaje_aereo",
    descripcion: "",
    proveedor: "",
    numero_factura: "",
    tiene_factura: true,
    monto: "",
    moneda: "USD",
    tasa_cambio: "",
    notas: "",
    es_socio: false,
    es_bono: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/viaticos");
      if (!res.ok) throw new Error("Error cargando viáticos");
      const data = await res.json();
      setViaticos(data.viaticos || []);
      setStats(data.stats || null);
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar los viáticos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async () => {
    if (!form.destino_ciudad || !form.motivo || !form.fecha_salida || !form.fecha_retorno) {
      toast({ title: "Error", description: "Complete todos los campos obligatorios", variant: "destructive" });
      return;
    }
    const parsedMonto = parseFloat(form.monto);
    if (isNaN(parsedMonto) || parsedMonto <= 0) {
      toast({ title: "Error", description: "Ingrese un monto válido", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("/api/viaticos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          monto: parsedMonto,
          dias: parseInt(String(form.dias)) || 1,
          tasa_cambio: form.tasa_cambio ? parseFloat(form.tasa_cambio) : null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Error al registrar");
      }
      toast({ title: "Registrado", description: "Gasto de viático registrado exitosamente" });
      setShowDialog(false);
      resetForm();
      fetchData();
    } catch (err: unknown) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Error desconocido", variant: "destructive" });
    }
  };

  const handleEstadoChange = async (id: number, nuevoEstado: string) => {
    try {
      const res = await fetch("/api/viaticos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      toast({ title: "Actualizado", description: `Estado cambiado a ${nuevoEstado}` });
      fetchData();
    } catch {
      toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/viaticos?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Error al eliminar");
      }
      toast({ title: "Eliminado", description: "Viático eliminado" });
      fetchData();
      setShowDetail(null);
    } catch (err: unknown) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Error", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setForm({
      tipo_viaje: activeTab === "socios" ? "internacional" : activeTab,
      destino_pais: "",
      destino_ciudad: "",
      motivo: "",
      fecha_salida: "",
      fecha_retorno: "",
      dias: 1,
      categoria: "pasaje_aereo",
      descripcion: "",
      proveedor: "",
      numero_factura: "",
      tiene_factura: activeTab !== "socios",
      monto: "",
      moneda: activeTab === "nacional" ? "VES" : "USD",
      tasa_cambio: "",
      notas: "",
      es_socio: activeTab === "socios",
      es_bono: false,
    });
  };

  const openNewDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const filtered = viaticos.filter(v => {
    if (activeTab === "internacional" && v.tipo_viaje !== "internacional") return false;
    if (activeTab === "nacional" && v.tipo_viaje !== "nacional") return false;
    if (activeTab === "socios" && !v.es_socio) return false;
    if (activeTab !== "socios" && v.es_socio) return false;

    if (filterEstado !== "todos" && v.estado !== filterEstado) return false;
    if (filterCategoria !== "todas" && v.categoria !== filterCategoria) return false;

    if (search) {
      const q = search.toLowerCase();
      const match =
        v.destino_ciudad.toLowerCase().includes(q) ||
        (v.destino_pais || "").toLowerCase().includes(q) ||
        v.motivo.toLowerCase().includes(q) ||
        (v.proveedor || "").toLowerCase().includes(q) ||
        (v.empleado_nombre || "").toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalFiltered = filtered.reduce((sum, v) => sum + parseFloat(v.monto || "0"), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">CENTRO DE VIÁTICOS</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestión integral de gastos de viaje — pasajes, hoteles, alimentación y más
            </p>
          </div>
          <Button onClick={openNewDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Registrar Gasto
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Internacional</span>
            </div>
            <p className="text-lg font-black mt-1">{formatMonto(stats?.total_internacional || "0", "USD")}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Nacional</span>
            </div>
            <p className="text-lg font-black mt-1">{formatMonto(stats?.total_nacional || "0", "USD")}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20 border-violet-200/50 dark:border-violet-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-violet-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Socios</span>
            </div>
            <p className="text-lg font-black mt-1">{formatMonto(stats?.total_socios || "0", "USD")}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200/50 dark:border-amber-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Pendientes</span>
            </div>
            <p className="text-lg font-black mt-1">{stats?.pendientes || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border-red-200/50 dark:border-red-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Sin Factura</span>
            </div>
            <p className="text-lg font-black mt-1">{stats?.sin_factura || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 border-pink-200/50 dark:border-pink-800/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-pink-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Bonos</span>
            </div>
            <p className="text-lg font-black mt-1">{stats?.total_bonos || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearch(""); setFilterEstado("todos"); setFilterCategoria("todas"); }}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="internacional" className="gap-1.5">
            <Plane className="h-3.5 w-3.5" /> Internacional
          </TabsTrigger>
          <TabsTrigger value="nacional" className="gap-1.5">
            <Flag className="h-3.5 w-3.5" /> Nacional
          </TabsTrigger>
          <TabsTrigger value="socios" className="gap-1.5">
            <Users className="h-3.5 w-3.5" /> Socios
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por destino, motivo, proveedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {ESTADOS.map(e => (
                <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCategoria} onValueChange={setFilterCategoria}>
            <SelectTrigger className="w-[180px]">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              {CATEGORIAS.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {[["internacional", "Viáticos Internacionales", "Pasajes aéreos, hoteles, alimentación y gastos en el exterior"],
          ["nacional", "Viáticos Nacionales", "Gastos de viaje dentro de Venezuela — pasajes, hoteles, alimentación"],
          ["socios", "Viáticos de Socios", "Pagos sin factura, bonos y gastos de representación de socios"]
        ].map(([key, title, desc]) => (
          <TabsContent key={key} value={key} className="mt-4 space-y-4">
            {filtered.length > 0 && (
              <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-2">
                <span>{filtered.length} registro(s)</span>
                <span className="font-bold text-foreground">Total: {formatMonto(totalFiltered, activeTab === "nacional" ? "VES" : "USD")}</span>
              </div>
            )}

            {filtered.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    {key === "internacional" ? <Plane className="h-8 w-8 text-muted-foreground/50" /> :
                     key === "nacional" ? <Flag className="h-8 w-8 text-muted-foreground/50" /> :
                     <Users className="h-8 w-8 text-muted-foreground/50" />}
                  </div>
                  <h3 className="font-bold text-lg">{title as string}</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">{desc as string}</p>
                  <Button onClick={openNewDialog} className="mt-4 gap-2" variant="outline">
                    <Plus className="h-4 w-4" /> Registrar Primer Gasto
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filtered.map((v, i) => {
                  const catInfo = getCategoriaInfo(v.categoria);
                  const estInfo = getEstadoInfo(v.estado);
                  const CatIcon = catInfo.icon;
                  const EstIcon = estInfo.icon;

                  return (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Card
                        className="hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => setShowDetail(v)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center bg-muted/50 shrink-0", catInfo.color)}>
                              <CatIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm truncate">{catInfo.label}</h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {v.destino_pais ? `${v.destino_ciudad}, ${v.destino_pais}` : v.destino_ciudad}
                                    {v.proveedor && ` • ${v.proveedor}`}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="font-black text-sm">{formatMonto(v.monto, v.moneda)}</p>
                                  <Badge variant="secondary" className={cn("text-[10px] mt-1", estInfo.color)}>
                                    <EstIcon className="h-3 w-3 mr-1" />
                                    {estInfo.label}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatFecha(v.fecha_salida)} → {formatFecha(v.fecha_retorno)}
                                </span>
                                <span>{v.dias} día(s)</span>
                                {!v.tiene_factura && (
                                  <Badge variant="outline" className="text-[10px] border-red-300 text-red-600 dark:border-red-700 dark:text-red-400">
                                    Sin Factura
                                  </Badge>
                                )}
                                {v.es_bono && (
                                  <Badge variant="outline" className="text-[10px] border-pink-300 text-pink-600 dark:border-pink-700 dark:text-pink-400">
                                    <Gift className="h-2.5 w-2.5 mr-0.5" /> Bono
                                  </Badge>
                                )}
                                {v.numero_factura && (
                                  <span className="flex items-center gap-1">
                                    <Receipt className="h-3 w-3" />
                                    Fact. {v.numero_factura}
                                  </span>
                                )}
                              </div>
                              {v.motivo && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">"{v.motivo}"</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Registrar Gasto de Viático
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Viaje *</Label>
                <Select value={form.tipo_viaje} onValueChange={(v) => setForm({ ...form, tipo_viaje: v, moneda: v === "nacional" ? "VES" : "USD" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internacional">Internacional</SelectItem>
                    <SelectItem value="nacional">Nacional (Venezuela)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoría *</Label>
                <Select value={form.categoria} onValueChange={(v) => setForm({ ...form, categoria: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {form.tipo_viaje === "internacional" && (
              <div className="space-y-2">
                <Label>País de Destino</Label>
                <Select value={form.destino_pais} onValueChange={(v) => setForm({ ...form, destino_pais: v })}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar país" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__latam" disabled><span className="font-bold text-xs">— LATINOAMÉRICA —</span></SelectItem>
                    {PAISES_LATAM.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                    <SelectItem value="__otros" disabled><span className="font-bold text-xs">— OTROS —</span></SelectItem>
                    {PAISES_OTROS.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Ciudad de Destino *</Label>
              {form.tipo_viaje === "nacional" ? (
                <Select value={form.destino_ciudad} onValueChange={(v) => setForm({ ...form, destino_ciudad: v })}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar ciudad" /></SelectTrigger>
                  <SelectContent>
                    {CIUDADES_VE.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={form.destino_ciudad}
                  onChange={(e) => setForm({ ...form, destino_ciudad: e.target.value })}
                  placeholder="Ej: Bogotá, Miami, Madrid..."
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Motivo del Viaje *</Label>
              <Input
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                placeholder="Ej: Reunión con proveedores, capacitación, congreso..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Fecha Salida *</Label>
                <Input type="date" value={form.fecha_salida} onChange={(e) => setForm({ ...form, fecha_salida: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Fecha Retorno *</Label>
                <Input type="date" value={form.fecha_retorno} onChange={(e) => setForm({ ...form, fecha_retorno: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Días</Label>
                <Input type="number" min={1} value={form.dias} onChange={(e) => setForm({ ...form, dias: parseInt(e.target.value) || 1 })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Proveedor / Empresa</Label>
                <Input
                  value={form.proveedor}
                  onChange={(e) => setForm({ ...form, proveedor: e.target.value })}
                  placeholder="Ej: Avior Airlines, Hotel Marriott..."
                />
              </div>
              <div className="space-y-2">
                <Label>N° de Factura</Label>
                <Input
                  value={form.numero_factura}
                  onChange={(e) => setForm({ ...form, numero_factura: e.target.value })}
                  placeholder="Ej: 00012345"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Monto *</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.monto}
                  onChange={(e) => setForm({ ...form, monto: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Moneda</Label>
                <Select value={form.moneda} onValueChange={(v) => setForm({ ...form, moneda: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {MONEDAS.map(m => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tasa de Cambio</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.tasa_cambio}
                  onChange={(e) => setForm({ ...form, tasa_cambio: e.target.value })}
                  placeholder="Bs./$"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Detalles adicionales del gasto..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Notas Internas</Label>
              <Textarea
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
                placeholder="Notas privadas sobre este gasto..."
                rows={2}
              />
            </div>

            <div className="flex flex-wrap gap-6 items-center pt-2 border-t">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.tiene_factura}
                  onCheckedChange={(v) => setForm({ ...form, tiene_factura: v })}
                />
                <Label className="text-sm cursor-pointer">Tiene factura</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.es_socio}
                  onCheckedChange={(v) => setForm({ ...form, es_socio: v })}
                />
                <Label className="text-sm cursor-pointer">Gasto de Socio</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.es_bono}
                  onCheckedChange={(v) => setForm({ ...form, es_bono: v })}
                />
                <Label className="text-sm cursor-pointer">Es Bono</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Plus className="h-4 w-4" /> Registrar Gasto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {showDetail && (() => {
            const v = showDetail;
            const catInfo = getCategoriaInfo(v.categoria);
            const estInfo = getEstadoInfo(v.estado);
            const CatIcon = catInfo.icon;

            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <CatIcon className={cn("h-5 w-5", catInfo.color)} />
                    {catInfo.label}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={cn("text-xs", estInfo.color)}>
                      {estInfo.label}
                    </Badge>
                    <span className="text-2xl font-black">{formatMonto(v.monto, v.moneda)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Destino</span>
                      <p className="font-medium">{v.destino_pais ? `${v.destino_ciudad}, ${v.destino_pais}` : v.destino_ciudad}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Tipo</span>
                      <p className="font-medium capitalize">{v.tipo_viaje}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Fechas</span>
                      <p className="font-medium">{formatFecha(v.fecha_salida)} — {formatFecha(v.fecha_retorno)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Días</span>
                      <p className="font-medium">{v.dias}</p>
                    </div>
                    {v.proveedor && (
                      <div>
                        <span className="text-muted-foreground text-xs">Proveedor</span>
                        <p className="font-medium">{v.proveedor}</p>
                      </div>
                    )}
                    {v.numero_factura && (
                      <div>
                        <span className="text-muted-foreground text-xs">N° Factura</span>
                        <p className="font-medium">{v.numero_factura}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground text-xs">Tiene Factura</span>
                      <p className="font-medium">{v.tiene_factura ? "Sí" : "No"}</p>
                    </div>
                    {v.tasa_cambio && (
                      <div>
                        <span className="text-muted-foreground text-xs">Tasa de Cambio</span>
                        <p className="font-medium">{v.tasa_cambio} Bs./$</p>
                      </div>
                    )}
                    {v.es_bono && (
                      <div>
                        <span className="text-muted-foreground text-xs">Tipo Especial</span>
                        <Badge variant="outline" className="border-pink-300 text-pink-600"><Gift className="h-3 w-3 mr-1" /> Bono</Badge>
                      </div>
                    )}
                    {v.es_socio && (
                      <div>
                        <span className="text-muted-foreground text-xs">Origen</span>
                        <Badge variant="outline" className="border-violet-300 text-violet-600"><Users className="h-3 w-3 mr-1" /> Socio</Badge>
                      </div>
                    )}
                  </div>

                  {v.motivo && (
                    <div>
                      <span className="text-muted-foreground text-xs">Motivo</span>
                      <p className="text-sm mt-0.5">{v.motivo}</p>
                    </div>
                  )}

                  {v.descripcion && (
                    <div>
                      <span className="text-muted-foreground text-xs">Descripción</span>
                      <p className="text-sm mt-0.5">{v.descripcion}</p>
                    </div>
                  )}

                  {v.notas && (
                    <div>
                      <span className="text-muted-foreground text-xs">Notas</span>
                      <p className="text-sm mt-0.5 italic">{v.notas}</p>
                    </div>
                  )}

                  {v.empleado_nombre && (
                    <div>
                      <span className="text-muted-foreground text-xs">Empleado</span>
                      <p className="text-sm font-medium">{v.empleado_nombre} {v.empleado_apellido} — {v.empleado_cargo} ({v.empleado_departamento})</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-3 border-t">
                    {v.estado === "pendiente" && (
                      <>
                        <Button size="sm" className="gap-1.5" onClick={() => { handleEstadoChange(v.id, "aprobado"); setShowDetail(null); }}>
                          <CheckCircle className="h-3.5 w-3.5" /> Aprobar
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1.5" onClick={() => { handleEstadoChange(v.id, "rechazado"); setShowDetail(null); }}>
                          <XCircle className="h-3.5 w-3.5" /> Rechazar
                        </Button>
                      </>
                    )}
                    {v.estado === "aprobado" && (
                      <Button size="sm" className="gap-1.5" onClick={() => { handleEstadoChange(v.id, "pagado"); setShowDetail(null); }}>
                        <DollarSign className="h-3.5 w-3.5" /> Marcar Pagado
                      </Button>
                    )}
                    {v.estado === "pagado" && (
                      <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { handleEstadoChange(v.id, "rendido"); setShowDetail(null); }}>
                        <FileText className="h-3.5 w-3.5" /> Marcar Rendido
                      </Button>
                    )}
                    {v.estado === "pendiente" && (
                      <Button size="sm" variant="ghost" className="gap-1.5 text-destructive ml-auto" onClick={() => handleDelete(v.id)}>
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </Button>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
