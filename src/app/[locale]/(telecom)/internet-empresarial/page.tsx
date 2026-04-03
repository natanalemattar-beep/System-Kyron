"use client";

import { useState } from "react";
import {
  Wifi, Phone, Globe, Server, Router, Signal, Gauge, Shield,
  CheckCircle, Clock, AlertTriangle, CreditCard, Calendar, MapPin,
  Plus, Search, Download, Headphones, Zap, Building2,
  ChevronRight, Star, TrendingUp, RefreshCw, FileText, DollarSign,
  Monitor, Users, Settings, BarChart3, Lock, Eye, Activity
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const PROVEEDORES_CORP = [
  { id: "cantv_empresas", nombre: "CANTV Empresas", tipo: "dsl_fibra", icono: "🔵", servicios: ["Internet ABA Empresarial", "Líneas Fijas Centrex", "VPN Corporativa", "Troncales SIP"] },
  { id: "inter_corp", nombre: "Inter Empresas", tipo: "fibra_cable", icono: "🔴", servicios: ["Fibra Dedicada", "Internet Simétrico", "Colocation", "Cloud Connect"] },
  { id: "netuno_corp", nombre: "NetUno Business", tipo: "fibra", icono: "🟣", servicios: ["Fibra Empresarial", "Enlaces Dedicados", "MPLS", "VoIP Corporativo"] },
  { id: "movistar_corp", nombre: "Movistar Empresas", tipo: "fibra_movil", icono: "🟢", servicios: ["Fibra Simétrica", "Flota Móvil", "IoT Empresarial", "Cloud PBX"] },
  { id: "digitel_corp", nombre: "Digitel Corporativo", tipo: "lte_fibra", icono: "🟡", servicios: ["4G LTE Empresarial", "Planes Flotillas", "M2M/IoT", "SMS Masivo"] },
  { id: "starlink_biz", nombre: "Starlink Business", tipo: "satelital", icono: "⚫", servicios: ["Internet Satelital", "Alta Disponibilidad", "IP Fija", "Soporte Prioritario"] },
];

const PLANES_EMPRESARIALES = [
  { nombre: "ABA Empresarial 20M", proveedor: "CANTV Empresas", velocidad: "20/5 Mbps", tipo: "Asimétrico", precio: 50, garantia: "70%", sla: "8h" },
  { nombre: "Inter Fibra Dedicada 50M", proveedor: "Inter Empresas", velocidad: "50/50 Mbps", tipo: "Simétrico", precio: 150, garantia: "95%", sla: "4h" },
  { nombre: "Inter Fibra Dedicada 100M", proveedor: "Inter Empresas", velocidad: "100/100 Mbps", tipo: "Simétrico", precio: 280, garantia: "99%", sla: "2h" },
  { nombre: "NetUno Enterprise", proveedor: "NetUno Business", velocidad: "100/100 Mbps", tipo: "Dedicado", precio: 300, garantia: "99.5%", sla: "2h" },
  { nombre: "Movistar Fibra PRO", proveedor: "Movistar Empresas", velocidad: "200/200 Mbps", tipo: "Simétrico", precio: 400, garantia: "99.5%", sla: "2h" },
  { nombre: "Starlink Business", proveedor: "Starlink Business", velocidad: "200/20 Mbps", tipo: "Satelital", precio: 250, garantia: "99%", sla: "24h" },
];

const PLANES_TELEFONIA = [
  { nombre: "Centrex Básico (5 ext)", proveedor: "CANTV Empresas", lineas: 5, precio: 25, incluye: "Llamadas locales ilimitadas, buzón de voz" },
  { nombre: "Centrex Avanzado (20 ext)", proveedor: "CANTV Empresas", lineas: 20, precio: 80, incluye: "LDN incluida, IVR básico, grabación" },
  { nombre: "Troncal SIP (10 canales)", proveedor: "CANTV Empresas", lineas: 10, precio: 60, incluye: "Numeración DID, integración PBX IP" },
  { nombre: "Cloud PBX Starter", proveedor: "Movistar Empresas", lineas: 10, precio: 45, incluye: "App móvil, extensiones remotas, auto-attendant" },
  { nombre: "Cloud PBX Enterprise", proveedor: "Movistar Empresas", lineas: 50, precio: 180, incluye: "Grabación, CRM, analítica, soporte 24/7" },
  { nombre: "VoIP Corporativo", proveedor: "NetUno Business", lineas: 15, precio: 70, incluye: "Numeración nacional, QoS dedicado, panel admin" },
];

const SERVICIOS_ADICIONALES = [
  { nombre: "VPN Site-to-Site", descripcion: "Conexión segura entre sedes con cifrado IPSec/SSL", precio: "Desde $50/mes", icono: Lock },
  { nombre: "Enlace Dedicado MPLS", descripcion: "Red privada virtual con QoS garantizado entre sucursales", precio: "Desde $200/mes", icono: Globe },
  { nombre: "IP Fija Pública", descripcion: "Dirección IP estática para servidores y servicios web", precio: "Desde $15/mes", icono: Server },
  { nombre: "Firewall Gestionado", descripcion: "Protección perimetral administrada con reportes de amenazas", precio: "Desde $80/mes", icono: Shield },
  { nombre: "Backup Internet (4G)", descripcion: "Enlace de respaldo por LTE en caso de caída del principal", precio: "Desde $30/mes", icono: Signal },
  { nombre: "Monitoreo 24/7 (NOC)", descripcion: "Centro de operaciones de red con alertas y gestión proactiva", precio: "Desde $100/mes", icono: Eye },
  { nombre: "Colocation / Housing", descripcion: "Espacio en datacenter para tus servidores con energía y clima", precio: "Desde $150/mes", icono: Server },
  { nombre: "SMS Masivo Empresarial", descripcion: "Envío masivo de SMS para notificaciones y marketing", precio: "Desde $0.02/SMS", icono: FileText },
];

export default function InternetEmpresarialPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("internet");
  const [showSolicitud, setShowSolicitud] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [formSolicitud, setFormSolicitud] = useState({
    servicio_tipo: "internet",
    proveedor: "",
    plan: "",
    direccion: "",
    contacto_nombre: "",
    contacto_telefono: "",
    contacto_email: "",
    notas: "",
  });

  const handleSolicitar = () => {
    if (!formSolicitud.proveedor || !formSolicitud.direccion || !formSolicitud.contacto_nombre) {
      toast({ title: "Error", description: "Complete los campos obligatorios", variant: "destructive" });
      return;
    }
    toast({ title: "Solicitud Enviada", description: "Su solicitud de servicio empresarial ha sido registrada. Un ejecutivo le contactará." });
    setShowSolicitud(false);
    setFormSolicitud({ servicio_tipo: "internet", proveedor: "", plan: "", direccion: "", contacto_nombre: "", contacto_telefono: "", contacto_email: "", notas: "" });
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">INTERNET Y TELEFONÍA EMPRESARIAL</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Conectividad corporativa — enlaces dedicados, telefonía IP, VPN y servicios gestionados
            </p>
          </div>
          <Button onClick={() => setShowSolicitud(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Solicitar Servicio
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {PROVEEDORES_CORP.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-all cursor-pointer group" onClick={() => { setFormSolicitud({ ...formSolicitud, proveedor: p.nombre }); setShowSolicitud(true); }}>
              <CardContent className="p-3 text-center">
                <span className="text-2xl">{p.icono}</span>
                <p className="text-xs font-bold mt-1 group-hover:text-primary transition-colors">{p.nombre}</p>
                <Badge variant="outline" className="text-[8px] mt-1">{p.tipo.replace("_", "/").toUpperCase()}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="internet" className="gap-1.5">
            <Wifi className="h-3.5 w-3.5" /> Internet
          </TabsTrigger>
          <TabsTrigger value="telefonia" className="gap-1.5">
            <Phone className="h-3.5 w-3.5" /> Telefonía
          </TabsTrigger>
          <TabsTrigger value="servicios" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" /> Servicios
          </TabsTrigger>
          <TabsTrigger value="comparador" className="gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" /> Comparador
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internet" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Planes de Internet Empresarial
              </CardTitle>
              <CardDescription>Enlaces dedicados y simétricos con SLA garantizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PLANES_EMPRESARIALES.map((plan, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                      selectedPlan === plan.nombre ? "border-primary bg-primary/5 shadow-sm" : "hover:bg-muted/30"
                    )} onClick={() => setSelectedPlan(selectedPlan === plan.nombre ? null : plan.nombre)}>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                          <Wifi className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{plan.nombre}</h4>
                          <p className="text-xs text-muted-foreground">{plan.proveedor}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-[9px]">
                              <Gauge className="h-2.5 w-2.5 mr-0.5" /> {plan.velocidad}
                            </Badge>
                            <Badge variant="outline" className="text-[9px]">{plan.tipo}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black">${plan.precio}</p>
                        <p className="text-[10px] text-muted-foreground">/mes + IVA</p>
                        <div className="flex gap-1 mt-1 justify-end">
                          <Badge variant="secondary" className="text-[8px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            SLA: {plan.garantia}
                          </Badge>
                          <Badge variant="secondary" className="text-[8px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                            Resp: {plan.sla}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {selectedPlan === plan.nombre && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 ml-16 p-3 rounded-lg bg-muted/30 border-l-2 border-primary">
                        <p className="text-xs text-muted-foreground mb-2">Incluye:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-[9px]"><Shield className="h-2.5 w-2.5 mr-0.5" /> IP Fija</Badge>
                          <Badge variant="outline" className="text-[9px]"><Activity className="h-2.5 w-2.5 mr-0.5" /> Monitoreo</Badge>
                          <Badge variant="outline" className="text-[9px]"><Headphones className="h-2.5 w-2.5 mr-0.5" /> Soporte {plan.sla}</Badge>
                          <Badge variant="outline" className="text-[9px]"><Router className="h-2.5 w-2.5 mr-0.5" /> Router Incluido</Badge>
                        </div>
                        <Button size="sm" className="mt-3 gap-1.5" onClick={() => { setFormSolicitud({ ...formSolicitud, proveedor: plan.proveedor, plan: plan.nombre, servicio_tipo: "internet" }); setShowSolicitud(true); }}>
                          <Plus className="h-3.5 w-3.5" /> Solicitar Este Plan
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telefonia" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-emerald-500" />
                Planes de Telefonía Corporativa
              </CardTitle>
              <CardDescription>Centrex, troncales SIP, Cloud PBX y VoIP empresarial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PLANES_TELEFONIA.map((plan, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="p-4 rounded-lg border hover:bg-muted/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                            <Phone className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{plan.nombre}</h4>
                            <p className="text-xs text-muted-foreground">{plan.proveedor}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-[9px]">
                                <Users className="h-2.5 w-2.5 mr-0.5" /> {plan.lineas} líneas
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">${plan.precio}</p>
                          <p className="text-[10px] text-muted-foreground">/mes + IVA</p>
                        </div>
                      </div>
                      <div className="mt-2 ml-16">
                        <p className="text-xs text-muted-foreground">{plan.incluye}</p>
                        <Button size="sm" variant="outline" className="mt-2 gap-1.5" onClick={() => { setFormSolicitud({ ...formSolicitud, proveedor: plan.proveedor, plan: plan.nombre, servicio_tipo: "telefonia" }); setShowSolicitud(true); }}>
                          <Plus className="h-3.5 w-3.5" /> Solicitar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicios" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-violet-500" />
                Servicios Adicionales
              </CardTitle>
              <CardDescription>VPN, seguridad, monitoreo y servicios gestionados para empresas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SERVICIOS_ADICIONALES.map((serv, i) => {
                  const Icon = serv.icono;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="p-4 rounded-lg border hover:shadow-md transition-all group cursor-pointer" onClick={() => { setFormSolicitud({ ...formSolicitud, servicio_tipo: "adicional", plan: serv.nombre }); setShowSolicitud(true); }}>
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center shrink-0 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors">
                            <Icon className="h-5 w-5 text-violet-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm">{serv.nombre}</h4>
                              <Badge variant="outline" className="text-[9px] shrink-0">{serv.precio}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{serv.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparador" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" />
                Comparador de Proveedores
              </CardTitle>
              <CardDescription>Compara características y precios entre proveedores empresariales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-bold">Proveedor</th>
                      <th className="text-center p-3 font-bold">Velocidad Máx</th>
                      <th className="text-center p-3 font-bold">Tipo</th>
                      <th className="text-center p-3 font-bold">SLA</th>
                      <th className="text-center p-3 font-bold">Soporte</th>
                      <th className="text-center p-3 font-bold">Precio Desde</th>
                      <th className="text-center p-3 font-bold">Cobertura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prov: "CANTV Empresas", vel: "20 Mbps", tipo: "DSL/Fibra", sla: "70%", sop: "Lun-Vie", precio: "$50", cob: "Nacional" },
                      { prov: "Inter Empresas", vel: "100 Mbps", tipo: "Fibra/HFC", sla: "99%", sop: "24/7", precio: "$150", cob: "Principales" },
                      { prov: "NetUno Business", vel: "100 Mbps", tipo: "Fibra", sla: "99.5%", sop: "24/7", precio: "$300", cob: "Caracas/Valencia" },
                      { prov: "Movistar Empresas", vel: "200 Mbps", tipo: "Fibra", sla: "99.5%", sop: "24/7", precio: "$400", cob: "Principales" },
                      { prov: "Digitel Corp.", vel: "50 Mbps", tipo: "LTE/Fibra", sla: "95%", sop: "Lun-Sab", precio: "$80", cob: "Nacional" },
                      { prov: "Starlink Business", vel: "200 Mbps", tipo: "Satelital", sla: "99%", sop: "Online", precio: "$250", cob: "Total" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-bold">{row.prov}</td>
                        <td className="p-3 text-center"><Badge variant="outline" className="text-[9px]">{row.vel}</Badge></td>
                        <td className="p-3 text-center text-xs">{row.tipo}</td>
                        <td className="p-3 text-center">
                          <Badge variant="secondary" className={cn("text-[9px]",
                            parseFloat(row.sla) >= 99 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                            parseFloat(row.sla) >= 95 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          )}>{row.sla}</Badge>
                        </td>
                        <td className="p-3 text-center text-xs">{row.sop}</td>
                        <td className="p-3 text-center font-bold">{row.precio}</td>
                        <td className="p-3 text-center text-xs">{row.cob}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <h4 className="font-bold text-sm">Mejor Relación Precio/Velocidad</h4>
                </div>
                <p className="text-xs text-muted-foreground">Inter Empresas ofrece 100 Mbps simétricos con SLA 99% desde $150/mes.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <h4 className="font-bold text-sm">Mayor Disponibilidad</h4>
                </div>
                <p className="text-xs text-muted-foreground">NetUno y Movistar ofrecen SLA de 99.5% con soporte 24/7 y tiempos de respuesta de 2h.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-amber-500" />
                  <h4 className="font-bold text-sm">Mayor Cobertura</h4>
                </div>
                <p className="text-xs text-muted-foreground">CANTV y Digitel tienen cobertura nacional. Starlink llega donde no hay fibra ni cable.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showSolicitud} onOpenChange={setShowSolicitud}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Solicitar Servicio Empresarial
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Servicio *</Label>
              <Select value={formSolicitud.servicio_tipo} onValueChange={(v) => setFormSolicitud({ ...formSolicitud, servicio_tipo: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="internet">Internet Empresarial</SelectItem>
                  <SelectItem value="telefonia">Telefonía Corporativa</SelectItem>
                  <SelectItem value="adicional">Servicio Adicional</SelectItem>
                  <SelectItem value="paquete">Paquete Integrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Proveedor Preferido *</Label>
              <Select value={formSolicitud.proveedor} onValueChange={(v) => setFormSolicitud({ ...formSolicitud, proveedor: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar proveedor" /></SelectTrigger>
                <SelectContent>
                  {PROVEEDORES_CORP.map(p => (
                    <SelectItem key={p.id} value={p.nombre}>{p.icono} {p.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formSolicitud.plan && (
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="text-xs text-muted-foreground">Plan seleccionado:</p>
                <p className="font-bold text-sm">{formSolicitud.plan}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label>Dirección de la Empresa *</Label>
              <Input value={formSolicitud.direccion} onChange={(e) => setFormSolicitud({ ...formSolicitud, direccion: e.target.value })} placeholder="Dirección completa de instalación" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre Contacto *</Label>
                <Input value={formSolicitud.contacto_nombre} onChange={(e) => setFormSolicitud({ ...formSolicitud, contacto_nombre: e.target.value })} placeholder="Responsable TI" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={formSolicitud.contacto_telefono} onChange={(e) => setFormSolicitud({ ...formSolicitud, contacto_telefono: e.target.value })} placeholder="0412-1234567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Contacto</Label>
              <Input type="email" value={formSolicitud.contacto_email} onChange={(e) => setFormSolicitud({ ...formSolicitud, contacto_email: e.target.value })} placeholder="ti@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label>Notas / Requerimientos</Label>
              <Textarea value={formSolicitud.notas} onChange={(e) => setFormSolicitud({ ...formSolicitud, notas: e.target.value })} placeholder="Necesidades especiales, cantidad de usuarios, horario de atención..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSolicitud(false)}>Cancelar</Button>
            <Button onClick={handleSolicitar} className="gap-2"><Plus className="h-4 w-4" /> Enviar Solicitud</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
