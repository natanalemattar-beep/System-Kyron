"use client";

import { useEffect, useState, useCallback } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock, User, FileText, Stethoscope, Scale, ChevronRight,
  Lock, Bell, CircleCheck as CircleCheck, Fingerprint,
  Shield, TriangleAlert, ArrowRight, Leaf,
  Sun, Moon, Sunrise, Heart, BadgeCheck, Trophy
} from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/auth/context";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ActivityTimeline } from "@/components/activity-timeline";
import { ProfileCompletionNotice } from "@/components/dashboard/profile-completion-notice";
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
  const [clientDateStr, setClientDateStr] = useState<string | null>(null);
  const [clientTimeStr, setClientTimeStr] = useState<string | null>(null);

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
    } catch (err) { console.error('[dashboard] fetchData error:', err); setLoadError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const verif = getVerificationLevel(data?.documentos ?? 0);
  
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
          <TriangleAlert className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No se pudo cargar el dashboard</p>
          <p className="text-xs text-muted-foreground">Hubo un error al obtener tus datos. Intenta de nuevo.</p>
          <Button size="sm" onClick={fetchData} className="rounded-lg text-xs mt-2">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-container pt-6">
      <ModuleTutorial config={moduleTutorials["ciudadano"]} />
      <ProfileCompletionNotice />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <div className="ds-card w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Portal Ciudadano</p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-0.5">
                  {greeting?.text ?? "Hola"}{firstName ? `, ${firstName}` : ""}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold", verif.color, "bg-current/5 border-current/20")}>
                <Trophy className="h-3.5 w-3.5" /> {verif.label}
              </div>
              <Button asChild size="sm" className="rounded-lg text-xs font-semibold">
                <Link href="/tarjeta-digital">ID Digital</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {!loading && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm shadow-black/[0.02]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <BadgeCheck className={cn("h-4 w-4", verif.color)} />
              <span className="text-xs font-medium text-muted-foreground">Nivel de Verificación</span>
            </div>
            <span className={cn("text-xs font-semibold", verif.color)}>{verif.percent}%</span>
          </div>
          <div className="ds-progress !h-3">
            <div
              className={cn("h-full rounded-full", verif.color.replace('text-', 'bg-'))}
              style={{ width: `${verif.percent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground/40 mt-1.5">{verif.next}</p>
        </div>
      )}

      <div className="ds-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi, i) => (
          kpi.href ? (
            <Link href={kpi.href as never} key={i}>
              <Card className="ds-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground">{kpi.title}</span>
                    <div className={cn("ds-kpi-icon h-8 w-8 rounded-lg flex items-center justify-center", kpi.bg)}>
                      <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                      {kpi.alert && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />}
                    </div>
                  </div>
                  {loading ? (
                    <div className="h-6 w-20 bg-muted rounded-lg animate-pulse mb-1" />
                  ) : (
                    <p className="text-lg font-bold tracking-tight text-foreground">{kpi.value}</p>
                  )}
                  {loading ? (
                    <div className="h-3 w-28 bg-muted rounded animate-pulse mt-1.5" />
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">{kpi.desc}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card key={i} className="ds-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground">{kpi.title}</span>
                  <div className={cn("ds-kpi-icon h-8 w-8 rounded-lg flex items-center justify-center", kpi.bg)}>
                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                  </div>
                </div>
                {loading ? (
                  <div className="h-6 w-20 bg-muted rounded-lg animate-pulse mb-1" />
                ) : (
                  <p className="text-lg font-bold tracking-tight text-foreground">{kpi.value}</p>
                )}
                {loading ? (
                  <div className="h-3 w-28 bg-muted rounded animate-pulse mt-1.5" />
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">{kpi.desc}</p>
                )}
              </CardContent>
            </Card>
          )
        ))}
      </div>
      </div>

      <div className="rounded-2xl bg-muted/20 p-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <Card className="border border-border bg-card rounded-xl overflow-hidden shadow-sm shadow-black/[0.02]">
            <div className="p-5 pb-3 flex items-center justify-between border-b border-border">
              <div>
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground/70">Solicitudes Institucionales</CardTitle>
                <p className="text-xs text-muted-foreground/40 mt-0.5">
                  Trámites ante registros y notarías
                  {data && data.solicitudes.total > 0 && (
                    <span className="ml-2 text-emerald-500/60">· {data.solicitudes.total} registradas</span>
                  )}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-muted-foreground/50 rounded-lg">Histórico</Button>
            </div>
            <div className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-none">
                    <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider">Referencia</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Servicio</TableHead>
                    <TableHead className="text-right pr-5 text-xs font-semibold uppercase tracking-wider">Estatus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <>
                      {[1, 2, 3].map(n => (
                        <TableRow key={n}>
                          <TableCell className="pl-5"><div className="h-3 w-24 bg-muted animate-pulse rounded animate-pulse" /></TableCell>
                          <TableCell><div className="h-3 w-32 bg-muted animate-pulse rounded animate-pulse" /></TableCell>
                          <TableCell className="text-right pr-5"><div className="h-5 w-16 bg-muted animate-pulse rounded-lg animate-pulse ml-auto" /></TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="py-12 text-center">
                          <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                              <CircleCheck className="h-5 w-5 text-muted-foreground/30" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Sin solicitudes registradas</p>
                              <p className="text-xs text-muted-foreground/50">Inicia un trámite para verlo aquí</p>
                            </div>
                          </div>
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card className="border border-border bg-card rounded-xl p-5 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Escritorio Jurídico</span>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">Asistencia Legal</h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Gestión de trámites sucesorales, mercantiles y civiles ante entes públicos.
            </p>
            <Button 
              asChild
              size="sm" 
              className="w-full h-8 text-xs font-semibold rounded-lg"
            >
              <Link href="/documentos">Gestionar Documentos</Link>
            </Button>
          </Card>

          <Card className="border border-border bg-card rounded-xl p-5 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-4 w-4 text-muted-foreground/35" />
              <span className="text-xs font-semibold text-foreground/60">Notificaciones</span>
              {data && data.notificaciones > 0 && (
                <Badge className="ml-auto bg-rose-500/8 text-rose-400 border-rose-500/15 text-xs font-semibold h-5 rounded-md">{data.notificaciones}</Badge>
              )}
            </div>
            {loading ? (
              <div className="space-y-2 py-2">
                {[1, 2].map(n => <div key={n} className="h-9 bg-muted animate-pulse rounded-lg animate-pulse" />)}
              </div>
            ) : data && data.notificaciones > 0 ? (
              <Link href="/notificaciones" className="block">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-rose-500/[0.03] border border-rose-500/10 hover:bg-rose-500/[0.06] transition-colors">
                  <Bell className="h-4 w-4 text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{data.notificaciones} sin leer</p>
                    <p className="text-xs text-muted-foreground/40">Revisa tu bandeja</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/20" />
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center py-4 gap-1.5">
                <CircleCheck className="h-6 w-6 text-muted-foreground/10" />
                <p className="text-xs text-muted-foreground/25">Sin notificaciones</p>
              </div>
            )}
          </Card>
        </div>
      </div>
      </div>

      <div className="rounded-2xl bg-muted/20 p-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border border-border bg-card rounded-xl p-4 shadow-sm shadow-black/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <TriangleAlert className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-foreground/60">Vencimiento de Documentos</span>
          </div>
          <div className="ds-empty-state">
            <FileText className="h-8 w-8 opacity-15" />
            <p className="text-xs text-muted-foreground/40 text-center">Accede a tu expediente para ver las fechas de vencimiento</p>
            <Link href="/documentos">
              <span className="text-xs font-medium text-primary/70 hover:text-primary flex items-center gap-1">Ver documentos <ArrowRight className="h-3 w-3" /></span>
            </Link>
          </div>
        </Card>

        <Card className="border border-border bg-card rounded-xl p-4 shadow-sm shadow-black/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span className="text-xs font-semibold text-foreground/60">Eco-Créditos</span>
            </div>
            <Link href="/tarjeta-reciclaje"><span className="text-xs font-medium text-green-400/70 hover:text-green-300 flex items-center gap-1">Ver <ChevronRight className="h-3 w-3" /></span></Link>
          </div>
          <div className="ds-empty-state">
            <Leaf className="h-8 w-8 opacity-15 text-green-500" />
            <p className="text-xs font-bold text-foreground/60">0 créditos</p>
            <p className="text-xs text-muted-foreground/40 text-center">Recicla materiales para acumular eco-créditos</p>
          </div>
        </Card>
      </div>
      </div>

      <div className="rounded-2xl bg-muted/20 p-5 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-1 rounded-full bg-primary/40" />
          <span className="text-xs font-semibold text-muted-foreground">Accesos Rápidos</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Carnet Personal", icon: User, href: "/carnet-personal", desc: "Identificación digital", color: "text-blue-500", bg: "bg-blue-500/10", ring: "" },
            { title: "Tarjeta Reciclaje", icon: Leaf, href: "/tarjeta-reciclaje", desc: "Eco-créditos activos", color: "text-green-500", bg: "bg-green-500/10", ring: "" },
            { title: "Registro RIF", icon: FileText, href: "/registro-rif", desc: "Actualización RIF", color: "text-amber-500", bg: "bg-amber-500/10", ring: "" },
            { title: "Seguridad", icon: Lock, href: "/seguridad", desc: "Contraseña y 2FA", color: "text-purple-500", bg: "bg-purple-500/10", ring: "" },
          ].map((item, i) => (
            <Link key={i} href={item.href as never}>
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card transition-all hover:shadow-md shadow-sm shadow-black/[0.02]">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", item.bg)}>
                  <item.icon className={cn("h-4 w-4", item.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="ds-section">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-1 rounded-full bg-primary/40" />
          <span className="text-xs font-semibold text-muted-foreground">Módulos Especializados</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Directorio Médico", icon: Stethoscope, href: "/directorio-medico", desc: "Red de salud afiliada", color: "text-cyan-500", bg: "bg-cyan-500/8", ring: "ring-cyan-500/10" },
            { title: "LOPNNA Sync", icon: Scale, href: "/manutencion", desc: "Obligación de manutención", color: "text-purple-500", bg: "bg-purple-500/8", ring: "ring-purple-500/10" },
            { title: "Bóveda Civil", icon: Lock, href: "/documentos", desc: "Resguardo de documentos", color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10" },
          ].map((serv, i) => (
            <Link key={i} href={serv.href as never}>
              <Card className="ds-card">
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", serv.bg)}>
                    <serv.icon className={cn("h-[18px] w-[18px]", serv.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground">{serv.title}</h4>
                    <p className="text-xs text-muted-foreground">{serv.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-muted/20 p-5 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-1 rounded-full bg-primary/40" />
          <span className="text-xs font-semibold text-muted-foreground">Entes de Validez Nacional</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border bg-card rounded-xl p-5 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", "bg-blue-500/10")}>
                 <Fingerprint className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">SAIME</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Identidad Ciudadana</p>
              </div>
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-500 border-none rounded text-xs">Sincronizado</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Estatus de Cédula</span>
                <span className="font-semibold text-foreground">Vigente</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Última validación</span>
                <span className="font-medium text-foreground">{clientDateStr?.split(' ')[1] || 'Hoy'}</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full h-8 text-xs">
              <Link href="/tarjeta-digital">Ver datos biométricos</Link>
            </Button>
          </Card>

          <Card className="border border-border bg-card rounded-xl p-5 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", "bg-amber-500/10")}>
                 <FileText className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">SENIAT</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Perfil Tributario</p>
              </div>
              <Badge className="ml-auto bg-amber-500/10 text-amber-500 border-none rounded text-xs">Revisión</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Registro de RIF</span>
                <span className="font-semibold text-foreground">Actualizado</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Declaración ISLR</span>
                <span className="font-medium text-amber-500">Pendiente</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full h-8 text-xs">
              <Link href="/registro-rif">Consultar RIF Digital</Link>
            </Button>
          </Card>

          <Card className="border border-border bg-card rounded-xl p-5 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", "bg-rose-500/10")}>
                 <Heart className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">IVSS & FAOV</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Seguridad Social</p>
              </div>
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-500 border-none rounded text-xs">Al día</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Cotizaciones IVSS</span>
                <span className="font-semibold text-foreground">12 Activas</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Aportes FAOV</span>
                <span className="font-medium text-foreground">Solvente</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full h-8 text-xs">
              <Link href="/documentos">Descargar Solvencias</Link>
            </Button>
          </Card>
        </div>
      </div>

      <ActivityTimeline limit={8} />

    </div>
  );
}

