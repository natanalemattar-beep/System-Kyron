"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell, Info, TriangleAlert, CircleCheck,
  Activity, ArrowLeft, Mail, MessageSquare, Smartphone, Loader2,
  CheckCheck, RefreshCw, Settings, FileText, CalendarClock,
  ShieldCheck, CreditCard, Construction
} from "lucide-react";
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getModuleContext, type ModuleContext } from '@/lib/module-context';

const DASHBOARD_MAP: Record<ModuleContext, string> = {
  natural: "/dashboard",
  admin: "/dashboard-empresa",
  ventas: "/estrategias-ventas",
  legal: "/escritorio-juridico",
  socios: "/dashboard-socios",
  informatica: "/dashboard-it",
  telecom: "/dashboard-telecom",
  hr: "/dashboard-rrhh",
  sostenibilidad: "/sostenibilidad",
};

interface Notificacion {
  id: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  accion_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface NotifConfig {
  notif_email: boolean;
  notif_whatsapp: boolean;
  telefono_whatsapp: string;
  notif_sms: boolean;
  telefono_sms: string;
  notif_vencimientos: boolean;
  notif_pagos: boolean;
  email_verificacion: string;
  email_alertas: string;
}

const iconMap: Record<string, React.ReactNode> = {
  exito: <CircleCheck className="h-5 w-5 text-emerald-500" />,
  alerta: <TriangleAlert className="h-5 w-5 text-red-500" />,
  advertencia: <TriangleAlert className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  fiscal: <FileText className="h-5 w-5 text-indigo-500" />,
  parafiscal: <ShieldCheck className="h-5 w-5 text-violet-500" />,
  laboral: <CreditCard className="h-5 w-5 text-teal-500" />,
  regulatorio: <ShieldCheck className="h-5 w-5 text-rose-500" />,
  municipal: <FileText className="h-5 w-5 text-cyan-500" />,
  ambiental: <ShieldCheck className="h-5 w-5 text-green-500" />,
  vencimiento: <CalendarClock className="h-5 w-5 text-orange-500" />,
};

const tipoBadge: Record<string, { label: string; color: string }> = {
  exito: { label: "Éxito", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  alerta: { label: "Alerta", color: "bg-red-500/15 text-red-400 border-red-500/20" },
  advertencia: { label: "Advertencia", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  info: { label: "Información", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  fiscal: { label: "Fiscal", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20" },
  parafiscal: { label: "Parafiscal", color: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
  laboral: { label: "Laboral", color: "bg-teal-500/15 text-teal-400 border-teal-500/20" },
  regulatorio: { label: "Regulatorio", color: "bg-rose-500/15 text-rose-400 border-rose-500/20" },
  municipal: { label: "Municipal", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20" },
  ambiental: { label: "Ambiental", color: "bg-green-500/15 text-green-400 border-green-500/20" },
  vencimiento: { label: "Vencimiento", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Ahora";
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days}d`;
  return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'short' });
}

export function NotificacionesPageContent() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [totalNoLeidas, setTotalNoLeidas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'todas' | 'no_leidas'>('todas');
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<NotifConfig | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);
  const [backHref, setBackHref] = useState("/dashboard");
  const { toast } = useToast();

  useEffect(() => {
    const ctx = getModuleContext();
    setBackHref(DASHBOARD_MAP[ctx] || "/dashboard");
  }, []);

  const fetchNotificaciones = useCallback(async (checkRegulatorio = false) => {
    try {
      let params = tab === 'no_leidas' ? '?no_leidas=true&limit=50' : '?limit=50';
      if (checkRegulatorio) params += '&check_regulatorio=true';
      
      const res = await fetch(`/api/notificaciones${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setNotificaciones(data.notificaciones ?? []);
      setTotalNoLeidas(data.total_no_leidas ?? 0);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [tab]);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/configuracion');
      if (!res.ok) return;
      const data = await res.json();
      setConfig(data.config);
    } catch {}
  }, []);

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  useEffect(() => {
    if (showSettings && !config) fetchConfig();
  }, [showSettings, config, fetchConfig]);

  const markAsRead = async (id: number) => {
    try {
      await fetch('/api/notificaciones', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setNotificaciones(prev =>
        prev.map(n => n.id === id ? { ...n, leida: true } : n)
      );
      setTotalNoLeidas(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await fetch('/api/notificaciones', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todas: true }),
      });
      setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
      setTotalNoLeidas(0);
      toast({ title: 'Listo', description: 'Todas las notificaciones marcadas como leídas.' });
    } catch {}
  };

  const saveConfig = async () => {
    if (!config) return;
    setSavingConfig(true);
    try {
      const res = await fetch('/api/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notif_email: config.notif_email,
          notif_whatsapp: config.notif_whatsapp,
          telefono_whatsapp: config.telefono_whatsapp || null,
          notif_sms: config.notif_sms,
          telefono_sms: config.telefono_sms || null,
          notif_vencimientos: config.notif_vencimientos,
          notif_pagos: config.notif_pagos,
        }),
      });
      if (res.ok) {
        toast({ title: 'Configuración guardada', description: 'Tus preferencias de notificación han sido actualizadas.' });
      }
    } catch {
      toast({ title: 'Error', description: 'No se pudo guardar la configuración.', variant: 'destructive' });
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <Link href={backHref} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
      </Link>

      <header className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-primary/[0.04] via-card to-card p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Bell className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Buzón de Alertas</h1>
            <p className="text-sm text-muted-foreground font-medium">Alertas por email, WhatsApp y SMS en tiempo real</p>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant={tab === 'todas' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setTab('todas'); setLoading(true); }}
            className="rounded-xl text-xs font-bold"
          >
            Todas
          </Button>
          <Button
            variant={tab === 'no_leidas' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setTab('no_leidas'); setLoading(true); }}
            className="rounded-xl text-xs font-bold"
          >
            No leídas
            {totalNoLeidas > 0 && (
              <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">
                {totalNoLeidas}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline" size="sm"
            onClick={() => { setLoading(true); fetchNotificaciones(true); }}
            className="rounded-xl text-xs font-bold"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Actualizar
          </Button>
          {totalNoLeidas > 0 && (
            <Button
              variant="outline" size="sm"
              onClick={markAllRead}
              className="rounded-xl text-xs font-bold"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1.5" /> Marcar todas leídas
            </Button>
          )}
          <Button
            variant={showSettings ? 'default' : 'outline'} size="sm"
            onClick={() => setShowSettings(v => !v)}
            className="rounded-xl text-xs font-bold"
          >
            <Settings className="h-3.5 w-3.5 mr-1.5" /> Canales
          </Button>
        </div>
      </div>

      {showSettings && config && (
        <Card className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Canales de Notificación
            </CardTitle>
          </CardHeader>
          <div className="p-6 pt-2 space-y-5">
            <div className="grid gap-5">
              <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Mail className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold">Email</Label>
                      <p className="text-xs text-muted-foreground">Recibe alertas en tu correo electrónico</p>
                    </div>
                  </div>
                  <Switch
                    checked={config.notif_email}
                    onCheckedChange={(v) => setConfig({ ...config, notif_email: v })}
                  />
                </div>
                {config.notif_email && (
                  <div className="pl-2 border-t border-border/20 pt-3">
                    <p className="text-[10px] text-muted-foreground/60">Las alertas, verificaciones y notificaciones fiscales se enviarán automáticamente al correo registrado en tu cuenta.</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold">WhatsApp</Label>
                      <p className="text-xs text-muted-foreground">Recibe alertas por WhatsApp</p>
                    </div>
                  </div>
                  <Switch
                    checked={false}
                    onCheckedChange={() => {
                      toast({ title: 'WhatsApp en construcción', description: 'Las alertas por WhatsApp estarán disponibles próximamente.' });
                    }}
                  />
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1.5 mt-1">
                  <Construction className="h-3.5 w-3.5" /> En construcción — disponible próximamente
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                      <Smartphone className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold">SMS</Label>
                      <p className="text-xs text-muted-foreground">Recibe alertas por mensaje de texto</p>
                    </div>
                  </div>
                  <Switch
                    checked={false}
                    onCheckedChange={() => {
                      toast({ title: 'SMS en construcción', description: 'Las alertas por SMS estarán disponibles próximamente.' });
                    }}
                  />
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1.5 mt-1">
                  <Construction className="h-3.5 w-3.5" /> En construcción — disponible próximamente
                </p>
              </div>
            </div>

            <div className="border-t border-border/30 pt-4 space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tipos de alerta</p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-orange-400" />
                  <Label className="text-sm font-medium">Vencimientos</Label>
                </div>
                <Switch
                  checked={config.notif_vencimientos}
                  onCheckedChange={(v) => setConfig({ ...config, notif_vencimientos: v })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-400" />
                  <Label className="text-sm font-medium">Pagos</Label>
                </div>
                <Switch
                  checked={config.notif_pagos}
                  onCheckedChange={(v) => setConfig({ ...config, notif_pagos: v })}
                />
              </div>
            </div>

            <Button
              onClick={saveConfig}
              disabled={savingConfig}
              className="w-full h-11 rounded-xl font-bold text-sm"
            >
              {savingConfig ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
              Guardar Preferencias
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Cargando notificaciones...</p>
        </div>
      ) : notificaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="p-5 bg-muted/30 rounded-2xl border border-border/30">
            <Bell className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground/60">Sin notificaciones</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tab === 'no_leidas' ? 'No tienes notificaciones pendientes.' : 'Aún no has recibido ninguna notificación.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {notificaciones.map(noti => (
            <Card
              key={noti.id}
              className={cn(
                "rounded-2xl border transition-all group overflow-hidden cursor-pointer hover:shadow-lg",
                noti.leida
                  ? "bg-card/40 border-border/20 opacity-70 hover:opacity-90"
                  : "bg-card border-border/40 hover:border-primary/30"
              )}
              onClick={() => !noti.leida && markAsRead(noti.id)}
            >
              <CardHeader className="flex-row items-start gap-4 p-5 space-y-0 relative">
                {!noti.leida && (
                  <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                )}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <Activity className="h-10 w-10" />
                </div>
                <div className="mt-0.5 p-2.5 bg-muted/50 rounded-xl border border-border/50 shrink-0 group-hover:rotate-3 transition-transform">
                  {iconMap[noti.tipo] || iconMap.info}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-sm font-bold tracking-tight text-foreground">
                        {noti.titulo}
                      </CardTitle>
                      {tipoBadge[noti.tipo] && (
                        <Badge variant="outline" className={cn("text-[11px] font-bold uppercase px-2 py-0", tipoBadge[noti.tipo].color)}>
                          {tipoBadge[noti.tipo].label}
                        </Badge>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/40 tracking-wide shrink-0">
                      {timeAgo(noti.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {noti.mensaje?.replace(/\n⚖️\s*Riesgo:.*$/s, '').trim()}
                  </p>
                  {noti.metadata?.riesgo_multa && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border/30 space-y-2">
                      {(noti.metadata.riesgo_multa as { descripcion?: string; monto?: string; base_legal?: string }).descripcion && (
                        <div className="flex items-start gap-2">
                          <TriangleAlert className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-amber-400/90 font-semibold leading-snug">
                            {(noti.metadata.riesgo_multa as { descripcion: string }).descripcion}
                          </p>
                        </div>
                      )}
                      {(noti.metadata.riesgo_multa as { monto?: string }).monto && (
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            <span className="font-semibold text-red-400/80">Multa:</span>{' '}
                            {(noti.metadata.riesgo_multa as { monto: string }).monto}
                          </p>
                        </div>
                      )}
                      {(noti.metadata.riesgo_multa as { base_legal?: string }).base_legal && (
                        <div className="flex items-start gap-2">
                          <FileText className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            <span className="font-semibold text-blue-400/80">Base Legal:</span>{' '}
                            {(noti.metadata.riesgo_multa as { base_legal: string }).base_legal}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {noti.metadata?.ente && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <ShieldCheck className="h-3 w-3 text-muted-foreground/50" />
                      <span className="text-[10px] text-muted-foreground/60 font-medium">
                        {(noti.metadata.ente_nombre as string) || (noti.metadata.ente as string)}
                      </span>
                    </div>
                  )}
                  {noti.accion_url && (
                    <Link
                      href={noti.accion_url}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver detalle <ArrowLeft className="h-3 w-3 rotate-180" />
                    </Link>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
