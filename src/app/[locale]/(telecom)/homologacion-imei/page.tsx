"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Fingerprint, Smartphone, Shield, Search, CircleCheck,
  AlertTriangle, FileText, RefreshCw, CheckCircle2, XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const EQUIPOS = [
  { id: "EQ1", empleado: "Carlos Pérez", marca: "Samsung", modelo: "Galaxy S24 Ultra", imei: "353456789012345", estado: "homologado", fechaVerif: "15/03/2026" },
  { id: "EQ2", empleado: "María Gómez", marca: "Apple", modelo: "iPhone 15 Pro", imei: "358765432109876", estado: "homologado", fechaVerif: "12/03/2026" },
  { id: "EQ3", empleado: "Juan Rodríguez", marca: "Xiaomi", modelo: "14 Pro", imei: "352198765432100", estado: "pendiente", fechaVerif: "—" },
  { id: "EQ4", empleado: "Ana Fernández", marca: "Motorola", modelo: "Edge 50 Pro", imei: "359876543210987", estado: "homologado", fechaVerif: "10/03/2026" },
  { id: "EQ5", empleado: "Luis Martínez", marca: "Huawei", modelo: "P60 Pro", imei: "354321098765432", estado: "rechazado", fechaVerif: "08/03/2026" },
  { id: "EQ6", empleado: "Sandra López", marca: "Samsung", modelo: "Galaxy A55", imei: "357654321098765", estado: "homologado", fechaVerif: "05/03/2026" },
];

const ESTADO_CONFIG: Record<string, { label: string; color: string; icon: typeof CircleCheck }> = {
  homologado: { label: "Homologado", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle2 },
  pendiente: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: RefreshCw },
  rechazado: { label: "Rechazado", color: "bg-rose-500/10 text-rose-500 border-rose-500/20", icon: XCircle },
};

export default function HomologacionIMEIPage() {
  const { toast } = useToast();
  const [imeiInput, setImeiInput] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [resultado, setResultado] = useState<null | { valido: boolean; mensaje: string }>(null);
  const [search, setSearch] = useState("");

  const verificarIMEI = () => {
    if (imeiInput.length !== 15 || !/^\d+$/.test(imeiInput)) {
      toast({ variant: "destructive", title: "IMEI inválido", description: "El IMEI debe tener exactamente 15 dígitos numéricos." });
      return;
    }
    setBuscando(true);
    setResultado(null);
    setTimeout(() => {
      setBuscando(false);
      const valido = Math.random() > 0.3;
      setResultado({
        valido,
        mensaje: valido
          ? "Equipo homologado por CONATEL. Apto para activación en redes venezolanas."
          : "Equipo NO homologado. No puede ser activado en operadoras nacionales."
      });
    }, 2000);
  };

  const filtrados = EQUIPOS.filter(e =>
    e.empleado.toLowerCase().includes(search.toLowerCase()) ||
    e.imei.includes(search) ||
    e.marca.toLowerCase().includes(search.toLowerCase())
  );

  const homologados = EQUIPOS.filter(e => e.estado === "homologado").length;
  const pendientes = EQUIPOS.filter(e => e.estado === "pendiente").length;
  const rechazados = EQUIPOS.filter(e => e.estado === "rechazado").length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Fingerprint className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Empresa</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Homologación IMEI</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Verificación CONATEL de equipos corporativos para activación en redes venezolanas.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Equipos", val: `${EQUIPOS.length}`, icon: Smartphone, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Homologados", val: `${homologados}`, icon: CheckCircle2, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Pendientes", val: `${pendientes}`, icon: RefreshCw, color: "text-yellow-500", accent: "from-yellow-500/20 to-yellow-500/0", ring: "ring-yellow-500/20", iconBg: "bg-yellow-500/10" },
          { label: "Rechazados", val: `${rechazados}`, icon: XCircle, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Search className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Verificar IMEI</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Consulta el estado de homologación de un equipo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Ingresa los 15 dígitos del IMEI"
              value={imeiInput}
              onChange={e => { setImeiInput(e.target.value.replace(/\D/g, '').slice(0, 15)); setResultado(null); }}
              className="h-11 rounded-xl text-sm font-mono flex-1"
              maxLength={15}
            />
            <Button onClick={verificarIMEI} disabled={buscando} className="h-11 px-6 rounded-xl text-xs font-semibold">
              {buscando ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="ml-2">{buscando ? "Verificando..." : "Verificar"}</span>
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">Marca *#06# en tu dispositivo para obtener el IMEI</p>

          {resultado && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cn("p-4 rounded-xl border flex items-start gap-3",
                resultado.valido ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"
              )}
            >
              {resultado.valido ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <XCircle className="h-5 w-5 text-rose-500 shrink-0" />}
              <div>
                <p className={cn("text-sm font-bold", resultado.valido ? "text-emerald-500" : "text-rose-500")}>
                  {resultado.valido ? "EQUIPO HOMOLOGADO" : "NO HOMOLOGADO"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{resultado.mensaje}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Shield className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Inventario de Equipos</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{filtrados.length} equipo{filtrados.length !== 1 ? 's' : ''}</CardDescription>
            </div>
          </div>
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
            <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="h-8 pl-9 rounded-lg text-xs" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                  <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Empleado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Equipo</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">IMEI</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Verificación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrados.map((e) => {
                  const conf = ESTADO_CONFIG[e.estado];
                  return (
                    <TableRow key={e.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                      <TableCell className="pl-5 py-3 text-xs font-semibold text-foreground">{e.empleado}</TableCell>
                      <TableCell>
                        <p className="text-xs font-semibold text-foreground">{e.marca}</p>
                        <p className="text-[10px] text-muted-foreground">{e.modelo}</p>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{e.imei}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5", conf.color)}>
                          {conf.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-[11px] text-muted-foreground">{e.fechaVerif}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
