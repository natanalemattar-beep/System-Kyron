"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock, User, FileText, Stethoscope, Scale, History, ChevronRight,
  Search, Lock, LifeBuoy, Bell, CircleCheck as CheckCircle, Fingerprint,
  Shield, Sparkles, Folder, AlertCircle, ArrowRight, Eye, Leaf
} from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NaturalDashboardData {
  solicitudes: { total: number; pendientes: number; aprobadas: number };
  documentos: number;
  notificaciones: number;
}

export default function DashboardPersonalPage() {
  const { user } = useAuth();
  const displayName = user ? `${user.nombre}${user.apellido ? " " + user.apellido : ""}` : "—";
  const [data, setData] = useState<NaturalDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/natural/dashboard")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0f1f] via-[#101830] to-[#0c1425] p-6 md:p-8 text-white mt-4 md:mt-6 border border-blue-500/[0.08]">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/[0.06] blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/[0.04] blur-[80px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dGrid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.4"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dGrid)"/>
          </svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">Mi Terminal Ciudadana</h1>
                <p className="text-[10px] text-white/40 font-medium">{displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {!loading && <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En vivo</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-white/40" />
              <Input placeholder="Buscar trámite..." className="h-8 w-52 rounded-lg pl-7 text-[10px] font-medium bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25" />
            </div>
            <Button asChild size="sm" className="h-8 px-4 rounded-lg text-[10px] font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 shadow-lg shadow-blue-500/20">
              <Link href="/tarjeta-digital">ID Digital</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            title: "Expediente Civil",
            value: data ? (data.documentos > 0 ? `${data.documentos} Docs` : "Pendiente") : "Pendiente",
            desc: data ? (data.documentos > 0 ? `${data.documentos} documentos registrados` : "Sin documentos aún") : "Sin documentos aún",
            icon: FileText, gradient: "from-blue-500/10 to-blue-500/[0.02]", iconBg: "bg-blue-500/15", iconColor: "text-blue-400", border: "border-blue-500/10",
          },
          {
            title: "ID Digital 3D",
            value: "Nivel 1",
            desc: "Cuenta verificada",
            icon: Fingerprint, gradient: "from-indigo-500/10 to-indigo-500/[0.02]", iconBg: "bg-indigo-500/15", iconColor: "text-indigo-400", border: "border-indigo-500/10",
          },
          {
            title: "Gestiones",
            value: data ? (data.solicitudes.pendientes > 0 ? `${data.solicitudes.pendientes} Activas` : "0 Activas") : "0 Activas",
            desc: data ? (data.solicitudes.total > 0 ? `${data.solicitudes.total} trámites totales` : "Sin trámites iniciados") : "Sin trámites iniciados",
            icon: Clock, gradient: "from-amber-500/10 to-amber-500/[0.02]", iconBg: "bg-amber-500/15", iconColor: "text-amber-400", border: "border-amber-500/10",
          },
          {
            title: "Notificaciones",
            value: data ? (data.notificaciones > 0 ? `${data.notificaciones} Nuevas` : "Sin nuevas") : "—",
            desc: "Alertas del sistema",
            icon: Bell, gradient: "from-emerald-500/10 to-emerald-500/[0.02]", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-400", border: "border-emerald-500/10",
            alert: data ? data.notificaciones > 0 : false,
          },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}>
            <Card className={cn("border rounded-xl overflow-hidden h-full bg-gradient-to-b transition-all hover:shadow-lg", kpi.gradient, kpi.border)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">{kpi.title}</span>
                  <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center relative", kpi.iconBg)}>
                    <kpi.icon className={cn("h-3.5 w-3.5", kpi.iconColor)} />
                    {kpi.alert && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                  </div>
                </div>
                {loading ? (
                  <div className="h-6 w-20 bg-muted/30 rounded animate-pulse mb-1" />
                ) : (
                  <p className="text-lg font-bold tracking-tight text-foreground">{kpi.value}</p>
                )}
                {loading ? (
                  <div className="h-3 w-28 bg-muted/20 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-[9px] font-medium text-muted-foreground/50 mt-1">{kpi.desc}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 border border-border/20 rounded-xl bg-card/80 overflow-hidden">
          <div className="p-4 pb-3 flex items-center justify-between border-b border-border/10">
            <div>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground/80">Solicitudes Institucionales</CardTitle>
              <p className="text-[10px] text-muted-foreground/50 font-medium mt-0.5">
                Trámites ante registros y notarías
                {data && data.solicitudes.total > 0 && (
                  <span className="ml-2 text-emerald-400/70">· {data.solicitudes.total} registradas</span>
                )}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-[9px] font-semibold text-muted-foreground/60">Histórico</Button>
          </div>
          <div className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-none">
                  <TableHead className="pl-4 text-[9px] font-semibold uppercase tracking-wider">Referencia</TableHead>
                  <TableHead className="text-[9px] font-semibold uppercase tracking-wider">Servicio</TableHead>
                  <TableHead className="text-right pr-4 text-[9px] font-semibold uppercase tracking-wider">Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <>
                    {[1, 2, 3].map(n => (
                      <TableRow key={n}>
                        <TableCell className="pl-4"><div className="h-3 w-24 bg-muted/30 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-3 w-32 bg-muted/30 rounded animate-pulse" /></TableCell>
                        <TableCell className="text-right pr-4"><div className="h-5 w-16 bg-muted/30 rounded-full animate-pulse ml-auto" /></TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="py-10 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Folder className="h-8 w-8 text-muted-foreground/15" />
                        <p className="text-[10px] font-medium text-muted-foreground/40">Sin solicitudes registradas</p>
                        <p className="text-[9px] text-muted-foreground/25">Inicia un trámite para verlo aquí</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="lg:col-span-4 space-y-4">
          <Card className="border border-border/20 rounded-xl bg-gradient-to-b from-[#0a0f1f] to-card/80 p-4 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/[0.08] blur-[40px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-400/70">IA Jurídica</span>
              </div>
              <h3 className="text-sm font-bold text-blue-300 mb-1">Asistencia Legal</h3>
              <p className="text-[9px] text-white/40 mb-3 leading-relaxed">
                ¿Dudas sobre ISLR o trámites sucesorales? Solicita orientación a nuestro nodo jurídico.
              </p>
              <Button asChild size="sm" className="w-full h-8 text-[9px] font-semibold rounded-lg bg-white/[0.08] border border-white/[0.1] text-white hover:bg-white/[0.12]">
                <Link href="/manual-usuario">Pedir ayuda IA</Link>
              </Button>
            </div>
          </Card>

          <Card className="border border-border/20 rounded-xl bg-card/80 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">Notificaciones</span>
            </div>
            {loading ? (
              <div className="space-y-2 py-2">
                {[1, 2].map(n => (
                  <div key={n} className="h-8 bg-muted/20 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-3 gap-1.5">
                <CheckCircle className="h-6 w-6 text-muted-foreground/15" />
                <p className="text-[9px] font-medium text-muted-foreground/30">Sin notificaciones</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 ml-1 mb-3 block">Accesos Rápidos</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { title: "Carnet Personal", icon: User, href: "/carnet-personal", desc: "Identificación digital", color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "Tarjeta Reciclaje", icon: Leaf, href: "/tarjeta-reciclaje", desc: "Eco-créditos activos", color: "text-green-400", bg: "bg-green-500/10" },
            { title: "Registro RIF", icon: FileText, href: "/registro-rif", desc: "Actualización RIF", color: "text-amber-400", bg: "bg-amber-500/10" },
            { title: "Seguridad", icon: Lock, href: "/seguridad", desc: "Contraseña y 2FA", color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((item, i) => (
            <Link key={i} href={item.href as never} className="group">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border/20 bg-card/50 hover:bg-card hover:shadow-sm transition-all cursor-pointer">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", item.bg)}>
                  <item.icon className={cn("h-4 w-4", item.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-foreground/70 group-hover:text-foreground transition-colors">{item.title}</p>
                  <p className="text-[8px] text-muted-foreground/40">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 ml-1 mb-3 block">Módulos Especializados</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Directorio Médico", icon: Stethoscope, href: "/directorio-medico", desc: "Red de salud afiliada", gradient: "from-cyan-500/[0.06] to-transparent", border: "border-cyan-500/10", color: "text-cyan-400" },
            { title: "LOPNNA Sync", icon: Scale, href: "/manutencion", desc: "Obligación de manutención", gradient: "from-purple-500/[0.06] to-transparent", border: "border-purple-500/10", color: "text-purple-400" },
            { title: "Bóveda Civil", icon: Lock, href: "/documentos", desc: "Resguardo de documentos", gradient: "from-amber-500/[0.06] to-transparent", border: "border-amber-500/10", color: "text-amber-400" },
          ].map((serv, i) => (
            <Link key={i} href={serv.href as never} className="group">
              <Card className={cn("border rounded-xl p-4 bg-gradient-to-b hover:shadow-lg transition-all cursor-pointer", serv.gradient, serv.border)}>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-background/50 border border-border/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <serv.icon className={cn("h-4 w-4", serv.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-foreground/80 group-hover:text-foreground transition-colors">{serv.title}</h4>
                    <p className="text-[9px] text-muted-foreground/50">{serv.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/15 group-hover:text-foreground/40 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-500/[0.08] bg-gradient-to-r from-blue-500/[0.03] to-indigo-500/[0.03] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-foreground/70">Cuenta Verificada</p>
            <p className="text-[9px] text-muted-foreground/40">Acceso completo al ecosistema ciudadano</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["VEN-NIF", "SAIME", "SENIAT"].map((b, i) => (
            <span key={i} className="text-[8px] font-semibold text-muted-foreground/30 px-2 py-0.5 rounded-md border border-border/15">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
