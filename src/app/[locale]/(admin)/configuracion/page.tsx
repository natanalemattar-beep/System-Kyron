'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import { usePreferences } from '@/lib/preferences-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { PageTransition } from '@/components/ui/motion';
import { BackButton } from '@/components/back-button';
import {
  Settings,
  Zap,
  PanelLeft,
  Bell,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  Shield,
  Save,
  Loader2,
  CheckCircle2,
  Building2,
  Receipt,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfigData {
  idioma: string;
  moneda_preferida: string;
  zona_horaria: string;
  notif_email: boolean;
  notif_whatsapp: boolean;
  telefono_whatsapp: string;
  notif_sms: boolean;
  telefono_sms: string;
  notif_vencimientos: boolean;
  notif_pagos: boolean;
  iva_pct: string;
  igtf_pct: string;
  islr_pct: string;
  rif_empresa: string;
  nombre_comercial: string;
  email_verificacion: string;
  email_alertas: string;
  reducir_animaciones: boolean;
  nav_lateral: boolean;
}

const defaultConfig: ConfigData = {
  idioma: 'es',
  moneda_preferida: 'VES',
  zona_horaria: 'America/Caracas',
  notif_email: true,
  notif_whatsapp: false,
  telefono_whatsapp: '',
  notif_sms: false,
  telefono_sms: '',
  notif_vencimientos: true,
  notif_pagos: true,
  iva_pct: '16.00',
  igtf_pct: '3.00',
  islr_pct: '34.00',
  rif_empresa: '',
  nombre_comercial: '',
  email_verificacion: '',
  email_alertas: '',
  reducir_animaciones: false,
  nav_lateral: false,
};

function SectionCard({ icon: Icon, title, description, children, color = 'primary' }: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border/20 flex items-center gap-3">
        <div className={cn("p-2 rounded-xl", color === 'primary' ? 'bg-primary/10' : `bg-${color}/10`)}>
          <Icon className={cn("h-4 w-4", color === 'primary' ? 'text-primary' : `text-${color}`)} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-[10px] text-muted-foreground/50">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onCheckedChange, disabled }: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground/50 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  );
}

export default function ConfiguracionPage() {
  const { user } = useAuth();
  const { prefs, updatePref } = usePreferences();
  const { toast } = useToast();
  const [config, setConfig] = useState<ConfigData>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/configuracion')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.config) {
          setConfig({
            ...defaultConfig,
            ...data.config,
            telefono_whatsapp: data.config.telefono_whatsapp || '',
            telefono_sms: data.config.telefono_sms || '',
            rif_empresa: data.config.rif_empresa || '',
            nombre_comercial: data.config.nombre_comercial || '',
            email_verificacion: data.config.email_verificacion || '',
            email_alertas: data.config.email_alertas || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { reducir_animaciones, nav_lateral, ...savePayload } = config;
      const res = await fetch('/api/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savePayload),
      });
      if (res.ok) {
        toast({ title: 'Configuración guardada', description: 'Tus preferencias se han actualizado correctamente.' });
      } else {
        toast({ title: 'Error', description: 'No se pudo guardar la configuración.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Error de conexión.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: keyof ConfigData, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 space-y-8">
        <div>
          <BackButton href="/dashboard-empresa" label="Dashboard" />
          <div className="flex items-center gap-4 mt-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/15">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Configuración</h1>
              <p className="text-xs text-muted-foreground/50 mt-0.5">
                Personaliza tu experiencia en System Kyron
              </p>
            </div>
          </div>
        </div>

        <SectionCard icon={Zap} title="Experiencia Visual" description="Controla la velocidad y el estilo de la interfaz">
          <ToggleRow
            label="Reducir Animaciones"
            description="Desactiva transiciones y animaciones para una experiencia más rápida. Ideal para conexiones lentas."
            checked={prefs.reducir_animaciones}
            onCheckedChange={(v) => updatePref('reducir_animaciones', v)}
          />
          <div className="border-t border-border/15 pt-5">
            <ToggleRow
              label="Navegación Lateral"
              description="Cambia la barra superior por una barra lateral fija en los dashboards."
              checked={prefs.nav_lateral}
              onCheckedChange={(v) => updatePref('nav_lateral', v)}
            />
          </div>
        </SectionCard>

        <SectionCard icon={Bell} title="Notificaciones" description="Elige cómo quieres recibir alertas">
          <ToggleRow
            label="Notificaciones por Email"
            description="Recibe alertas y avisos en tu correo electrónico."
            checked={config.notif_email}
            onCheckedChange={(v) => updateConfig('notif_email', v)}
          />
          <div className="border-t border-border/15 pt-5">
            <ToggleRow
              label="Notificaciones por WhatsApp"
              description="Recibe mensajes directamente a tu WhatsApp."
              checked={config.notif_whatsapp}
              onCheckedChange={(v) => updateConfig('notif_whatsapp', v)}
            />
            {config.notif_whatsapp && (
              <div className="mt-3 pl-1">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Teléfono WhatsApp</Label>
                <Input
                  value={config.telefono_whatsapp}
                  onChange={(e) => updateConfig('telefono_whatsapp', e.target.value)}
                  placeholder="+58 412 1234567"
                  className="mt-1.5 h-9 rounded-xl text-sm"
                />
              </div>
            )}
          </div>
          <div className="border-t border-border/15 pt-5">
            <ToggleRow
              label="Notificaciones SMS"
              description="Recibe alertas por mensaje de texto."
              checked={config.notif_sms}
              onCheckedChange={(v) => updateConfig('notif_sms', v)}
            />
            {config.notif_sms && (
              <div className="mt-3 pl-1">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Teléfono SMS</Label>
                <Input
                  value={config.telefono_sms}
                  onChange={(e) => updateConfig('telefono_sms', e.target.value)}
                  placeholder="+58 412 1234567"
                  className="mt-1.5 h-9 rounded-xl text-sm"
                />
              </div>
            )}
          </div>
          <div className="border-t border-border/15 pt-5 space-y-4">
            <ToggleRow
              label="Alertas de Vencimientos"
              description="Recibe avisos cuando se acerquen fechas de vencimiento."
              checked={config.notif_vencimientos}
              onCheckedChange={(v) => updateConfig('notif_vencimientos', v)}
            />
            <ToggleRow
              label="Alertas de Pagos"
              description="Notificaciones de pagos recibidos y pendientes."
              checked={config.notif_pagos}
              onCheckedChange={(v) => updateConfig('notif_pagos', v)}
            />
          </div>
        </SectionCard>

        <SectionCard icon={Receipt} title="Parámetros Fiscales" description="Tasas predeterminadas para cálculos fiscales">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">IVA %</Label>
              <Input
                type="number"
                step="0.01"
                value={config.iva_pct}
                onChange={(e) => updateConfig('iva_pct', e.target.value)}
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">IGTF %</Label>
              <Input
                type="number"
                step="0.01"
                value={config.igtf_pct}
                onChange={(e) => updateConfig('igtf_pct', e.target.value)}
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">ISLR %</Label>
              <Input
                type="number"
                step="0.01"
                value={config.islr_pct}
                onChange={(e) => updateConfig('islr_pct', e.target.value)}
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={Building2} title="Datos de Empresa" description="Información fiscal y comercial de tu empresa">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">RIF Empresa</Label>
              <Input
                value={config.rif_empresa}
                onChange={(e) => updateConfig('rif_empresa', e.target.value)}
                placeholder="J-12345678-9"
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Nombre Comercial</Label>
              <Input
                value={config.nombre_comercial}
                onChange={(e) => updateConfig('nombre_comercial', e.target.value)}
                placeholder="Mi Empresa C.A."
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/15 pt-5">
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Email Verificación</Label>
              <Input
                type="email"
                value={config.email_verificacion}
                onChange={(e) => updateConfig('email_verificacion', e.target.value)}
                placeholder="verificacion@empresa.com"
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Email Alertas</Label>
              <Input
                type="email"
                value={config.email_alertas}
                onChange={(e) => updateConfig('email_alertas', e.target.value)}
                placeholder="alertas@empresa.com"
                className="mt-1.5 h-9 rounded-xl text-sm"
              />
            </div>
          </div>
        </SectionCard>

        <div className="flex items-center justify-between pt-4 pb-8">
          <div className="flex items-center gap-2 text-muted-foreground/30">
            <Logo className="h-4 w-4 opacity-40" />
            <span className="text-[8px] font-bold uppercase tracking-[0.3em]">System Kyron v2.8.5</span>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl h-11 px-8 text-[10px] font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 shadow-md shadow-primary/15"
          >
            {saving ? (
              <><Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> Guardando</>
            ) : (
              <><Save className="h-3.5 w-3.5 mr-2" /> Guardar Cambios</>
            )}
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
