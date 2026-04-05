"use client";

import { useEffect, useState, useCallback } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock, User, FileText, Stethoscope, Scale, History, ChevronRight,
  Search, Lock, LifeBuoy, Bell, CircleCheck as CheckCircle, Fingerprint,
  Shield, Sparkles, Folder, AlertCircle, ArrowRight, Eye, Leaf,
  Sun, Moon, Sunrise, Heart, BadgeCheck, Trophy
} from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/context";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ActivityTimeline } from "@/components/activity-timeline";

interface NaturalDashboardData {
  solicitudes: { total: number; pendientes: number; aprobadas: number };
  documentos: number;
  notificaciones: number;
}

function getGreeting(hour: number): { text: string; icon: typeof Sun } {
  if (hour >= 5 && hour < 12) return { text: "Buenos días", icon: Sunrise };
  if (hour >= 12 && hour < 18) return { text: "Buenas tardes", icon: Sun };
  return { text: "Buenas noches", icon: Moon };
}

function getVerificationLevel(docs: number): { level: number; label: string; percent: number; color: string; gradient: string; next: string } {
  if (docs >= 10) return { level: 3, label: "Platino", percent: 100, color: "text-amber-400", gradient: "from-amber-400 to-yellow-300", next: "Nivel máximo alcanzado" };
  if (docs >= 5) return { level: 2, label: "Oro", percent: 70, color: "text-yellow-400", gradient: "from-yellow-400 to-amber-300", next: `${10 - docs} docs más para Platino` };
  if (docs >= 1) return { level: 1, label: "Plata", percent: 40, color: "text-slate-300", gradient: "from-slate-400 to-slate-300", next: `${5 - docs} docs más para Oro` };
  return { level: 0, label: "Básico", percent: 10, color: "text-muted-foreground", gradient: "from-muted-foreground/50 to-muted-foreground/30", next: "Sube un documento para subir de nivel" };
}

export default function DashboardPersonalPage() {
  const { user } = useAuth();
  const currentLocale = useLocale();
  const firstName = user?.nombre?.split(" ")[0] ?? "";
  const [data, setData] = useState<NaturalDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [greeting, setGreeting] = useState<{ text: string; icon: typeof Sun } | null>(null);
  const [clientTimeStr, setClientTimeStr] = useState<string | null>(null);
  const [clientDateStr, setClientDateStr] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const loc = currentLocale || 'es';
    setGreeting(getGreeting(now.getHours()));
    setClientTimeStr(now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }));
    setClientDateStr(now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, [currentLocale]);

  const fetchData = useCallback(async () => {
    setLoadError(false);
    try {
      const r = await fetch("/api/natural/dashboard");
      if (r.ok) { setData(await r.json()); }
      else { setLoadError(true); }
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const verif = getVerificationLevel(data?.documentos ?? 0);
  const GreetingIcon = greeting?.icon ?? Sun;

  const kpiCards = [
    {
      title: "Expediente Civil",
      value: data ? (data.documentos > 0 ? `${data.documentos} Docs` : "Pendiente") : "—",
      desc: data ? (data.documentos > 0 ? `${data.documentos} documentos registrados` : "Sin documentos aún") : "Cargando...",
      icon: FileText, color: "text-blue-500", bg: "bg-blue-500/8", ring: "ring-blue-500/10",
      href: "/documentos",
    },
    {
      title: "ID Digital 3D",
      value: `Nivel ${verif.level}`,
      desc: verif.label,
      icon: Fingerprint, color: "text-indigo-500", bg: "bg-indigo-500/8", ring: "ring-indigo-500/10",
      href: "/tarjeta-digital",
    },
    {
      title: "Gestiones",
      value: data ? (data.solicitudes.pendientes > 0 ? `${data.solicitudes.pendientes} Activas` : "0 Activas") : "—",
      desc: data ? (data.solicitudes.total > 0 ? `${data.solicitudes.total} trámites totales` : "Sin trámites") : "Cargando...",
      icon: Clock, color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10",
    },
    {
      title: "Notificaciones",
      value: data ? (data.notificaciones > 0 ? `${data.notificaciones} Nuevas` : "Sin nuevas") : "—",
      desc: "Alertas del sistema",
      icon: Bell, color: "text-emerald-500", bg: "bg-emerald-500/8", ring: "ring-emerald-500/10",
      alert: data ? data.notificaciones > 0 : false,
      href: "/notificaciones",
    },
  ];

  if (!loading && loadError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No se pudo cargar el dashboard</p>
          <p className="text-xs text-muted-foreground">Hubo un error al obtener tus datos. Intenta de nuevo.</p>
          <Button size="sm" onClick={fetchData} className="rounded-lg text-xs mt-2">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      <ModuleTutorial config={moduleTutorials["ciudadano"]} />
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 md:p-8 text-white mt-4 md:mt-6"
      >
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-indigo-500/[0.04] blur-[80px]" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {greeting && <GreetingIcon className="h-4 w-4 text-amber-300/60" />}
                  <h1 className="text-lg md:text-xl font-bold tracking-tight">
                    {greeting?.text ?? "Hola"}{firstName ? `, ${firstName}` : ""}
                  </h1>
                </div>
                <p className="text-[11px] text-muted-foreground/60 font-medium capitalize">{clientDateStr ?? ""} · {clientTimeStr ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En vivo
              </span>
              <span className={cn("text-[10px] px-2.5 py-0.5 rounded-lg bg-muted/50 border border-border/30 font-semibold flex items-center gap-1.5", verif.color)}>
                <Trophy className="h-3 w-3" /> {verif.label}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" className="h-9 px-5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 shadow-lg shadow-blue-500/15">
              <Link href="/tarjeta-digital">ID Digital</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-border/30 bg-card/60 backdrop-blur-sm p-4"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <BadgeCheck className={cn("h-4 w-4", verif.color)} />
              <span className="text-[11px] font-semibold text-foreground/60">Nivel de Verificación</span>
            </div>
            <span className={cn("text-xs font-bold", verif.color)}>{verif.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted/20 overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", verif.gradient)}
              initial={{ width: 0 }}
              animate={{ width: `${verif.percent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-1.5">{verif.next}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}>
            {kpi.href ? (
              <Link href={kpi.href as never}>
                <Card className={cn("group border border-border/30 rounded-xl overflow-hidden h-full bg-card/80 transition-all hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5 duration-300 cursor-pointer ring-0 hover:ring-4", kpi.ring)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold text-muted-foreground/60">{kpi.title}</span>
                      <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300", kpi.bg)}>
                        <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        {kpi.alert && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                      </div>
                    </div>
                    {loading ? (
                      <div className="h-6 w-20 bg-muted/20 rounded-lg animate-pulse mb-1" />
                    ) : (
                      <p className="text-lg font-bold tracking-tight text-foreground">{kpi.value}</p>
                    )}
                    {loading ? (
                      <div className="h-3 w-28 bg-muted/10 rounded animate-pulse mt-1.5" />
                    ) : (
                      <p className="text-[10px] text-muted-foreground/50 mt-1">{kpi.desc}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card className={cn("group border border-border/30 rounded-xl overflow-hidden h-full bg-card/80 transition-all hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5 duration-300", kpi.ring)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-muted-foreground/60">{kpi.title}</span>
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", kpi.bg)}>
                      <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                    </div>
                  </div>
                  {loading ? (
                    <div className="h-6 w-20 bg-muted/20 rounded-lg animate-pulse mb-1" />
                  ) : (
                    <p className="text-lg font-bold tracking-tight text-foreground">{kpi.value}</p>
                  )}
                  {loading ? (
                    <div className="h-3 w-28 bg-muted/10 rounded animate-pulse mt-1.5" />
                  ) : (
                    <p className="text-[10px] text-muted-foreground/50 mt-1">{kpi.desc}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Card className="border border-border/30 rounded-xl bg-card/80 overflow-hidden">
            <div className="p-5 pb-3 flex items-center justify-between border-b border-border/15">
              <div>
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground/70">Solicitudes Institucionales</CardTitle>
                <p className="text-[10px] text-muted-foreground/40 mt-0.5">
                  Trámites ante registros y notarías
                  {data && data.solicitudes.total > 0 && (
                    <span className="ml-2 text-emerald-500/60">· {data.solicitudes.total} registradas</span>
                  )}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[10px] font-semibold text-muted-foreground/50 rounded-lg">Histórico</Button>
            </div>
            <div className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/5 border-none">
                    <TableHead className="pl-5 text-[10px] font-semibold uppercase tracking-wider">Referencia</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider">Servicio</TableHead>
                    <TableHead className="text-right pr-5 text-[10px] font-semibold uppercase tracking-wider">Estatus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <>
                      {[1, 2, 3].map(n => (
                        <TableRow key={n}>
                          <TableCell className="pl-5"><div className="h-3 w-24 bg-muted/20 rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-3 w-32 bg-muted/20 rounded animate-pulse" /></TableCell>
                          <TableCell className="text-right pr-5"><div className="h-5 w-16 bg-muted/20 rounded-lg animate-pulse ml-auto" /></TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2.5">
                          <div className="h-12 w-12 rounded-xl bg-muted/10 flex items-center justify-center">
                            <Folder className="h-6 w-6 text-muted-foreground/15" />
                          </div>
                          <p className="text-[11px] font-medium text-muted-foreground/35">Sin solicitudes registradas</p>
                          <p className="text-[10px] text-muted-foreground/20">Inicia un trámite para verlo aquí</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-4 space-y-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card className="border border-border/30 rounded-xl bg-gradient-to-br from-primary/[0.04] via-card to-card p-5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/[0.06] blur-[50px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500/60">IA Jurídica</span>
              </div>
              <h3 className="text-sm font-bold text-foreground/90 mb-1">Asistencia Legal</h3>
              <p className="text-[10px] text-muted-foreground/60 mb-4 leading-relaxed">
                ¿Dudas sobre ISLR o trámites sucesorales? Solicita orientación.
              </p>
              <Button asChild size="sm" className="w-full h-8 text-[10px] font-semibold rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15">
                <Link href="/manual-usuario">Pedir ayuda IA</Link>
              </Button>
            </div>
          </Card>

          <Card className="border border-border/30 rounded-xl bg-card/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-4 w-4 text-muted-foreground/35" />
              <span className="text-[11px] font-semibold text-foreground/60">Notificaciones</span>
              {data && data.notificaciones > 0 && (
                <Badge className="ml-auto bg-rose-500/8 text-rose-400 border-rose-500/15 text-[11px] font-semibold h-5 rounded-md">{data.notificaciones}</Badge>
              )}
            </div>
            {loading ? (
              <div className="space-y-2 py-2">
                {[1, 2].map(n => <div key={n} className="h-9 bg-muted/10 rounded-lg animate-pulse" />)}
              </div>
            ) : data && data.notificaciones > 0 ? (
              <Link href="/notificaciones" className="block">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-rose-500/[0.03] border border-rose-500/10 hover:bg-rose-500/[0.06] transition-colors">
                  <Bell className="h-4 w-4 text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold">{data.notificaciones} sin leer</p>
                    <p className="text-[11px] text-muted-foreground/40">Revisa tu bandeja</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/20" />
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center py-4 gap-1.5">
                <CheckCircle className="h-6 w-6 text-muted-foreground/10" />
                <p className="text-[10px] text-muted-foreground/25">Sin notificaciones</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <Card className="border border-amber-500/10 rounded-xl bg-card/80 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-[11px] font-semibold text-foreground/60">Vencimiento de Documentos</span>
          </div>
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <FileText className="h-8 w-8 opacity-15" />
            <p className="text-[10px] text-muted-foreground/40 text-center">Accede a tu expediente para ver las fechas de vencimiento</p>
            <Link href="/documentos">
              <span className="text-[10px] font-medium text-primary/70 hover:text-primary flex items-center gap-1">Ver documentos <ArrowRight className="h-3 w-3" /></span>
            </Link>
          </div>
        </Card>

        <Card className="border border-green-500/10 rounded-xl bg-card/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span className="text-[11px] font-semibold text-foreground/60">Eco-Créditos</span>
            </div>
            <Link href="/tarjeta-reciclaje"><span className="text-[10px] font-medium text-green-400/70 hover:text-green-300 flex items-center gap-1">Ver <ChevronRight className="h-3 w-3" /></span></Link>
          </div>
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <Leaf className="h-8 w-8 opacity-15 text-green-500" />
            <p className="text-[11px] font-bold text-foreground/60">0 créditos</p>
            <p className="text-[10px] text-muted-foreground/40 text-center">Recicla materiales para acumular eco-créditos</p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <span className="text-[11px] font-semibold text-muted-foreground/40 ml-1 mb-3 block">Accesos Rápidos</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Carnet Personal", icon: User, href: "/carnet-personal", desc: "Identificación digital", color: "text-blue-500", bg: "bg-blue-500/8", ring: "ring-blue-500/10" },
            { title: "Tarjeta Reciclaje", icon: Leaf, href: "/tarjeta-reciclaje", desc: "Eco-créditos activos", color: "text-green-500", bg: "bg-green-500/8", ring: "ring-green-500/10" },
            { title: "Registro RIF", icon: FileText, href: "/registro-rif", desc: "Actualización RIF", color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10" },
            { title: "Seguridad", icon: Lock, href: "/seguridad", desc: "Contraseña y 2FA", color: "text-purple-500", bg: "bg-purple-500/8", ring: "ring-purple-500/10" },
          ].map((item, i) => (
            <Link key={i} href={item.href as never} className="group">
              <div className={cn("flex items-center gap-3 p-3.5 rounded-xl border border-border/30 bg-card/60 hover:bg-card hover:shadow-md hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ring-0 hover:ring-4", item.ring)}>
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300", item.bg)}>
                  <item.icon className={cn("h-4 w-4", item.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-foreground/70 group-hover:text-foreground transition-colors">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground/35">{item.desc}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/10 group-hover:text-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <span className="text-[11px] font-semibold text-muted-foreground/40 ml-1 mb-3 block">Módulos Especializados</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Directorio Médico", icon: Stethoscope, href: "/directorio-medico", desc: "Red de salud afiliada", color: "text-cyan-500", bg: "bg-cyan-500/8", ring: "ring-cyan-500/10" },
            { title: "LOPNNA Sync", icon: Scale, href: "/manutencion", desc: "Obligación de manutención", color: "text-purple-500", bg: "bg-purple-500/8", ring: "ring-purple-500/10" },
            { title: "Bóveda Civil", icon: Lock, href: "/documentos", desc: "Resguardo de documentos", color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10" },
          ].map((serv, i) => (
            <Link key={i} href={serv.href as never} className="group">
              <Card className={cn("border border-border/30 rounded-xl p-4 bg-card/60 hover:bg-card hover:shadow-md hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ring-0 hover:ring-4", serv.ring)}>
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300", serv.bg)}>
                    <serv.icon className={cn("h-4.5 w-4.5", serv.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[12px] font-bold text-foreground/70 group-hover:text-foreground transition-colors">{serv.title}</h4>
                    <p className="text-[10px] text-muted-foreground/40">{serv.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/10 group-hover:text-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <ActivityTimeline limit={8} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="rounded-xl border border-border/20 bg-gradient-to-r from-blue-500/[0.02] to-indigo-500/[0.02] p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-500/8 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-foreground/60">Cuenta Verificada</p>
            <p className="text-[10px] text-muted-foreground/30">Acceso completo al ecosistema ciudadano</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["VEN-NIF", "SAIME", "SENIAT"].map((b, i) => (
            <span key={i} className="text-[11px] font-semibold text-muted-foreground/25 px-2 py-0.5 rounded-md border border-border/15 bg-muted/10">{b}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
