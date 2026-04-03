"use client";

import { useState } from "react";
import {
  Wifi, Phone, Globe, Tv, Router, Signal, Gauge, ArrowUpDown,
  CheckCircle, Clock, AlertTriangle, CreditCard, Calendar, MapPin,
  Plus, Search, Download, PhoneCall, Headphones, Shield, Zap,
  ChevronRight, Star, TrendingUp, RefreshCw, FileText, DollarSign,
  Monitor, Smartphone
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const PROVEEDORES_INTERNET = [
  { id: "cantv", nombre: "CANTV ABA", tipo: "dsl", color: "text-blue-600", logo: "🔵" },
  { id: "inter", nombre: "Inter", tipo: "cable", color: "text-red-500", logo: "🔴" },
  { id: "netuno", nombre: "NetUno", tipo: "cable", color: "text-purple-500", logo: "🟣" },
  { id: "movistar_fibra", nombre: "Movistar Fibra", tipo: "fibra", color: "text-green-500", logo: "🟢" },
  { id: "digitel_lte", nombre: "Digitel LTE Home", tipo: "lte", color: "text-amber-500", logo: "🟡" },
  { id: "supercable", nombre: "Supercable", tipo: "cable", color: "text-orange-500", logo: "🟠" },
  { id: "google_fiber", nombre: "Starlink", tipo: "satelital", color: "text-slate-600", logo: "⚫" },
];

const PROVEEDORES_TELEFONO = [
  { id: "cantv_fijo", nombre: "CANTV Línea Fija", tipo: "fijo", color: "text-blue-600" },
  { id: "movistar", nombre: "Movistar", tipo: "movil", color: "text-green-500" },
  { id: "digitel", nombre: "Digitel", tipo: "movil", color: "text-amber-500" },
  { id: "movilnet", nombre: "Movilnet", tipo: "movil", color: "text-red-500" },
];

const PLANES_INTERNET = [
  { nombre: "ABA Básico", velocidad: "4 Mbps", precio: 3.00, moneda: "USD", proveedor: "CANTV ABA" },
  { nombre: "ABA Plus", velocidad: "10 Mbps", precio: 8.00, moneda: "USD", proveedor: "CANTV ABA" },
  { nombre: "Inter 50", velocidad: "50 Mbps", precio: 25.00, moneda: "USD", proveedor: "Inter" },
  { nombre: "Inter 100", velocidad: "100 Mbps", precio: 40.00, moneda: "USD", proveedor: "Inter" },
  { nombre: "NetUno Hogar", velocidad: "30 Mbps", precio: 20.00, moneda: "USD", proveedor: "NetUno" },
  { nombre: "NetUno Premium", velocidad: "80 Mbps", precio: 35.00, moneda: "USD", proveedor: "NetUno" },
  { nombre: "Fibra 200", velocidad: "200 Mbps", precio: 45.00, moneda: "USD", proveedor: "Movistar Fibra" },
  { nombre: "LTE Home 20GB", velocidad: "20 Mbps", precio: 15.00, moneda: "USD", proveedor: "Digitel LTE Home" },
  { nombre: "Starlink Standard", velocidad: "100 Mbps", precio: 65.00, moneda: "USD", proveedor: "Starlink" },
];

interface ServicioInternet {
  id: number;
  proveedor: string;
  plan: string;
  velocidad: string;
  tipo_conexion: string;
  direccion: string;
  numero_contrato: string;
  monto_mensual: number;
  moneda: string;
  estado: string;
  fecha_instalacion: string;
  proximo_pago: string;
  consumo_gb: number;
  limite_gb: number | null;
  ip_publica: string;
}

interface LineaTelefonica {
  id: number;
  numero: string;
  proveedor: string;
  tipo: string;
  plan: string;
  monto_mensual: number;
  moneda: string;
  estado: string;
  minutos_consumidos: number;
  minutos_incluidos: number;
  sms_consumidos: number;
  datos_consumidos_gb: number;
  datos_incluidos_gb: number;
}

const [initialServicios] = [[] as ServicioInternet[]];
const [initialLineas] = [[] as LineaTelefonica[]];

export default function MiInternetPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("internet");
  const [servicios] = useState<ServicioInternet[]>(initialServicios);
  const [lineas] = useState<LineaTelefonica[]>(initialLineas);
  const [showNuevoInternet, setShowNuevoInternet] = useState(false);
  const [showNuevaLinea, setShowNuevaLinea] = useState(false);
  const [search, setSearch] = useState("");

  const [formInternet, setFormInternet] = useState({
    proveedor: "",
    plan: "",
    direccion: "",
    numero_contrato: "",
  });

  const [formLinea, setFormLinea] = useState({
    numero: "",
    proveedor: "",
    tipo: "movil",
    plan: "",
  });

  const handleRegistrarInternet = () => {
    if (!formInternet.proveedor || !formInternet.direccion) {
      toast({ title: "Error", description: "Complete proveedor y dirección", variant: "destructive" });
      return;
    }
    toast({ title: "Servicio Registrado", description: `Internet ${formInternet.proveedor} agregado a tu perfil` });
    setShowNuevoInternet(false);
    setFormInternet({ proveedor: "", plan: "", direccion: "", numero_contrato: "" });
  };

  const handleRegistrarLinea = () => {
    if (!formLinea.numero || !formLinea.proveedor) {
      toast({ title: "Error", description: "Complete número y proveedor", variant: "destructive" });
      return;
    }
    toast({ title: "Línea Registrada", description: `Línea ${formLinea.numero} agregada a tu perfil` });
    setShowNuevaLinea(false);
    setFormLinea({ numero: "", proveedor: "", tipo: "movil", plan: "" });
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">MI INTERNET Y TELÉFONO</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestión de tus servicios de internet y líneas telefónicas personales
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Servicios Internet</span>
            </div>
            <p className="text-2xl font-black mt-1">{servicios.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Líneas Telefónicas</span>
            </div>
            <p className="text-2xl font-black mt-1">{lineas.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Vel. Máxima</span>
            </div>
            <p className="text-2xl font-black mt-1">—</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20 border-violet-200/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-violet-500" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Gasto Mensual</span>
            </div>
            <p className="text-2xl font-black mt-1">$0,00</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="internet" className="gap-1.5">
            <Wifi className="h-3.5 w-3.5" /> Internet
          </TabsTrigger>
          <TabsTrigger value="telefono" className="gap-1.5">
            <Phone className="h-3.5 w-3.5" /> Teléfono
          </TabsTrigger>
          <TabsTrigger value="planes" className="gap-1.5">
            <Star className="h-3.5 w-3.5" /> Planes Disponibles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internet" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar servicio..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Button onClick={() => setShowNuevoInternet(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Agregar Servicio
            </Button>
          </div>

          {servicios.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-4">
                  <Wifi className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg">Sin servicios de Internet registrados</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Registra tu servicio de internet para llevar control de pagos, velocidad y consumo.
                  Compatible con CANTV, Inter, NetUno, Movistar Fibra, Digitel LTE y Starlink.
                </p>
                <Button onClick={() => setShowNuevoInternet(true)} className="mt-4 gap-2" variant="outline">
                  <Plus className="h-4 w-4" /> Registrar Internet
                </Button>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
                  {PROVEEDORES_INTERNET.slice(0, 4).map((p) => (
                    <Card key={p.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => { setFormInternet({ ...formInternet, proveedor: p.nombre }); setShowNuevoInternet(true); }}>
                      <CardContent className="p-3 text-center">
                        <span className="text-2xl">{p.logo}</span>
                        <p className="text-xs font-bold mt-1">{p.nombre}</p>
                        <Badge variant="outline" className="text-[9px] mt-1">{p.tipo.toUpperCase()}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {servicios.map((s) => (
                <Card key={s.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Wifi className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{s.proveedor} — {s.plan}</h4>
                          <p className="text-xs text-muted-foreground">{s.velocidad} • {s.direccion}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black">${s.monto_mensual.toFixed(2)}/mes</p>
                        <Badge variant="secondary" className={s.estado === "activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {s.estado}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="telefono" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar línea..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Button onClick={() => setShowNuevaLinea(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Agregar Línea
            </Button>
          </div>

          {lineas.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-20 w-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mb-4">
                  <Phone className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg">Sin líneas telefónicas registradas</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Registra tus líneas fijas y móviles para monitorear consumo, pagos y contratos.
                  Compatible con CANTV, Movistar, Digitel y Movilnet.
                </p>
                <Button onClick={() => setShowNuevaLinea(true)} className="mt-4 gap-2" variant="outline">
                  <Plus className="h-4 w-4" /> Registrar Línea
                </Button>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
                  {PROVEEDORES_TELEFONO.map((p) => (
                    <Card key={p.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => { setFormLinea({ ...formLinea, proveedor: p.nombre }); setShowNuevaLinea(true); }}>
                      <CardContent className="p-3 text-center">
                        <Phone className={cn("h-6 w-6 mx-auto", p.color)} />
                        <p className="text-xs font-bold mt-1">{p.nombre}</p>
                        <Badge variant="outline" className="text-[9px] mt-1">{p.tipo === "fijo" ? "FIJO" : "MÓVIL"}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {lineas.map((l) => (
                <Card key={l.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          {l.tipo === "fijo" ? <Phone className="h-5 w-5 text-emerald-500" /> : <Smartphone className="h-5 w-5 text-emerald-500" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{l.numero}</h4>
                          <p className="text-xs text-muted-foreground">{l.proveedor} • {l.plan}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black">${l.monto_mensual.toFixed(2)}/mes</p>
                        <Badge variant="secondary" className={l.estado === "activa" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {l.estado}
                        </Badge>
                      </div>
                    </div>
                    {l.tipo === "movil" && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground">Minutos</p>
                          <Progress value={(l.minutos_consumidos / l.minutos_incluidos) * 100} className="h-1.5 mt-1" />
                          <p className="text-[10px] mt-0.5">{l.minutos_consumidos}/{l.minutos_incluidos}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Datos</p>
                          <Progress value={(l.datos_consumidos_gb / l.datos_incluidos_gb) * 100} className="h-1.5 mt-1" />
                          <p className="text-[10px] mt-0.5">{l.datos_consumidos_gb}/{l.datos_incluidos_gb} GB</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">SMS</p>
                          <p className="text-[10px] mt-2.5">{l.sms_consumidos} enviados</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="planes" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Planes de Internet Disponibles en Venezuela
              </CardTitle>
              <CardDescription>Comparativa de planes de los principales proveedores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PLANES_INTERNET.map((plan, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          <Wifi className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{plan.nombre}</h4>
                          <p className="text-xs text-muted-foreground">{plan.proveedor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            <Gauge className="h-3 w-3 mr-1" />
                            {plan.velocidad}
                          </Badge>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="font-black text-sm">${plan.precio.toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground">/mes</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Servicios Telefónicos
              </CardTitle>
              <CardDescription>Líneas fijas y móviles disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold">Línea Fija CANTV</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Servicio de telefonía fija con cobertura nacional. Planes con llamadas locales ilimitadas y larga distancia.</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span>Plan Básico (local)</span><span className="font-bold">$2.00/mes</span></div>
                    <div className="flex justify-between text-xs"><span>Plan Completo (LDN+LDI)</span><span className="font-bold">$5.00/mes</span></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <h4 className="font-bold">Líneas Móviles</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Movistar, Digitel y Movilnet ofrecen planes prepago y postpago con datos 4G/LTE.</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span>Prepago (desde)</span><span className="font-bold">$3.00/mes</span></div>
                    <div className="flex justify-between text-xs"><span>Postpago (desde)</span><span className="font-bold">$10.00/mes</span></div>
                    <div className="flex justify-between text-xs"><span>Plan Datos Ilimitado</span><span className="font-bold">$25.00/mes</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <Tv className="h-6 w-6 text-violet-500" />
                </div>
                <div>
                  <h4 className="font-bold">Paquetes Triple Play</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Algunos proveedores ofrecen paquetes que incluyen Internet + TV por Cable + Telefonía Fija.
                    Disponible con Inter, NetUno y Supercable en ciudades principales.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline"><Wifi className="h-3 w-3 mr-1" /> Internet</Badge>
                    <Badge variant="outline"><Tv className="h-3 w-3 mr-1" /> TV Cable</Badge>
                    <Badge variant="outline"><Phone className="h-3 w-3 mr-1" /> Teléfono</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNuevoInternet} onOpenChange={setShowNuevoInternet}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" /> Registrar Servicio de Internet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Proveedor *</Label>
              <Select value={formInternet.proveedor} onValueChange={(v) => setFormInternet({ ...formInternet, proveedor: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar proveedor" /></SelectTrigger>
                <SelectContent>
                  {PROVEEDORES_INTERNET.map(p => (
                    <SelectItem key={p.id} value={p.nombre}>
                      {p.logo} {p.nombre} ({p.tipo.toUpperCase()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plan Contratado</Label>
              <Input value={formInternet.plan} onChange={(e) => setFormInternet({ ...formInternet, plan: e.target.value })} placeholder="Ej: ABA Plus 10 Mbps" />
            </div>
            <div className="space-y-2">
              <Label>Dirección de Instalación *</Label>
              <Input value={formInternet.direccion} onChange={(e) => setFormInternet({ ...formInternet, direccion: e.target.value })} placeholder="Ej: Av. Principal, Urb. Los Palos Grandes, Caracas" />
            </div>
            <div className="space-y-2">
              <Label>N° de Contrato</Label>
              <Input value={formInternet.numero_contrato} onChange={(e) => setFormInternet({ ...formInternet, numero_contrato: e.target.value })} placeholder="Ej: 0212-1234567" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNuevoInternet(false)}>Cancelar</Button>
            <Button onClick={handleRegistrarInternet} className="gap-2"><Plus className="h-4 w-4" /> Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNuevaLinea} onOpenChange={setShowNuevaLinea}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" /> Registrar Línea Telefónica
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Número de Teléfono *</Label>
              <Input value={formLinea.numero} onChange={(e) => setFormLinea({ ...formLinea, numero: e.target.value })} placeholder="Ej: 0212-1234567 o 0414-1234567" />
            </div>
            <div className="space-y-2">
              <Label>Proveedor *</Label>
              <Select value={formLinea.proveedor} onValueChange={(v) => setFormLinea({ ...formLinea, proveedor: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar proveedor" /></SelectTrigger>
                <SelectContent>
                  {PROVEEDORES_TELEFONO.map(p => (
                    <SelectItem key={p.id} value={p.nombre}>{p.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Línea</Label>
              <Select value={formLinea.tipo} onValueChange={(v) => setFormLinea({ ...formLinea, tipo: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fijo">Línea Fija</SelectItem>
                  <SelectItem value="movil">Línea Móvil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <Input value={formLinea.plan} onChange={(e) => setFormLinea({ ...formLinea, plan: e.target.value })} placeholder="Ej: Postpago 20GB, Prepago básico..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNuevaLinea(false)}>Cancelar</Button>
            <Button onClick={handleRegistrarLinea} className="gap-2"><Plus className="h-4 w-4" /> Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
