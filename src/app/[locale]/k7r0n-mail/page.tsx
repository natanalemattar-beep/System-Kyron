'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Shield, CheckCircle, XCircle, Loader2, Lock, Plus, Trash2 } from 'lucide-react';

const TEMPLATES = [
  { id: 'personalizado', label: 'Personalizado', desc: 'Correo libre con branding Kyron' },
  { id: 'bienvenida', label: 'Bienvenida', desc: 'Onboarding de nuevo usuario' },
  { id: 'notificacion', label: 'Notificación', desc: 'Aviso importante del sistema' },
  { id: 'facturacion', label: 'Facturación', desc: 'Información de cobros y pagos' },
  { id: 'soporte', label: 'Soporte Técnico', desc: 'Respuesta de soporte' },
  { id: 'comercial', label: 'Comercial', desc: 'Propuesta o contacto comercial' },
  { id: 'seguridad', label: 'Seguridad', desc: 'Alerta de seguridad de cuenta' },
];

const SENDERS = [
  { id: 'auto', label: 'Automático', desc: 'El sistema elige el mejor proveedor' },
  { id: 'gmail', label: 'Gmail (noreplysystemkyron)', desc: 'Envía desde Gmail Kyron' },
  { id: 'outlook', label: 'Outlook (alertas_systemkyron)', desc: 'Envía desde Outlook Kyron' },
];

export default function KyronMailPage() {
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [masterKey, setMasterKey] = useState('');
  const [sending, setSending] = useState(false);
  const [recipients, setRecipients] = useState(['']);
  const [cc, setCc] = useState('');
  const [nombre, setNombre] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('personalizado');
  const [sender, setSender] = useState('auto');
  const [history, setHistory] = useState<Array<{ to: string; subject: string; provider: string; success: boolean; time: string }>>([]);

  const handleAuth = () => {
    if (masterKey === 'KYRON-2026-MASTER') {
      setAuthenticated(true);
      toast({ title: 'Acceso Concedido', description: 'Panel de correo Kyron desbloqueado.' });
    } else {
      toast({ variant: 'destructive', title: 'Clave Incorrecta', description: 'No tienes acceso a este panel.' });
    }
  };

  const addRecipient = () => setRecipients([...recipients, '']);
  const removeRecipient = (i: number) => setRecipients(recipients.filter((_, idx) => idx !== i));
  const updateRecipient = (i: number, val: string) => {
    const copy = [...recipients];
    copy[i] = val;
    setRecipients(copy);
  };

  const handleSend = async () => {
    const validRecipients = recipients.map(r => r.trim()).filter(Boolean);
    if (!validRecipients.length || !message.trim()) {
      toast({ variant: 'destructive', title: 'Campos Requeridos', description: 'Necesitas al menos un destinatario y un mensaje.' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/kyron-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: masterKey,
          to: validRecipients,
          cc: cc.trim() || undefined,
          subject: subject.trim() || undefined,
          message: message.trim(),
          template,
          sender,
          nombre: nombre.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({ title: 'Correo Enviado', description: `Enviado via ${data.provider} a ${validRecipients.join(', ')}` });
        setHistory(prev => [{
          to: validRecipients.join(', '),
          subject: data.subject || subject,
          provider: data.provider,
          success: true,
          time: new Date().toLocaleTimeString('es-VE'),
        }, ...prev]);
        setMessage('');
        setNombre('');
        setSubject('');
        setRecipients(['']);
        setCc('');
      } else {
        toast({ variant: 'destructive', title: 'Error al Enviar', description: data.error || 'El proveedor de correo no respondió.' });
        setHistory(prev => [{
          to: validRecipients.join(', '),
          subject: subject || '(sin asunto)',
          provider: data.provider || 'none',
          success: false,
          time: new Date().toLocaleTimeString('es-VE'),
        }, ...prev]);
      }
    } catch {
      toast({ variant: 'destructive', title: 'Error de Conexión' });
    } finally {
      setSending(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-10 bg-card/60 border-none rounded-3xl shadow-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground uppercase">Acceso Restringido</h1>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Panel de Comunicaciones Kyron</p>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Clave Maestra"
              value={masterKey}
              onChange={e => setMasterKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              className="text-center text-lg font-mono tracking-widest h-12 rounded-xl"
            />
            <Button onClick={handleAuth} className="w-full h-12 rounded-xl font-bold text-sm uppercase tracking-widest">
              <Shield className="mr-2 h-4 w-4" /> Desbloquear
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
          <Mail className="h-3 w-3" /> PANEL INTERNO
        </div>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
          CORREO <span className="text-primary italic">KYRON</span>
        </h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
          Envío de correos oficiales con branding System Kyron
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-8 bg-card/50 border-none rounded-2xl shadow-xl space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plantilla</label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPLATES.map(t => (
                      <SelectItem key={t.id} value={t.id}>
                        <span className="font-semibold">{t.label}</span>
                        <span className="text-muted-foreground ml-2 text-xs">— {t.desc}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Enviar Desde</label>
                <Select value={sender} onValueChange={setSender}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SENDERS.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        <span className="font-semibold">{s.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Destinatarios</label>
              {recipients.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={r}
                    onChange={e => updateRecipient(i, e.target.value)}
                    className="h-11 rounded-xl"
                  />
                  {recipients.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeRecipient(i)} className="h-11 w-11 rounded-xl text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addRecipient} className="rounded-lg text-xs">
                <Plus className="mr-1 h-3 w-3" /> Agregar Destinatario
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CC (Opcional)</label>
                <Input
                  type="email"
                  placeholder="copia@ejemplo.com"
                  value={cc}
                  onChange={e => setCc(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nombre del Destinatario</label>
                <Input
                  placeholder="Juan Pérez"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asunto (se usa el de la plantilla si lo dejas vacío)</label>
              <Input
                placeholder="Asunto personalizado..."
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mensaje</label>
              <Textarea
                placeholder="Escribe tu mensaje aquí... Los saltos de línea se conservan."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={8}
                className="rounded-xl resize-none"
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={sending}
              className="w-full h-14 rounded-xl font-black text-sm uppercase tracking-widest"
              size="lg"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Enviar Correo Oficial
                </>
              )}
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Cuentas Activas
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs font-bold text-foreground">noreplysystemkyron@gmail.com</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Gmail · Verificaciones y General</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-xs font-bold text-foreground">alertas_systemkyron@hotmail.com</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Outlook · Alertas y Notificaciones</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-500" /> Tips
            </h3>
            <div className="space-y-2 text-[11px] text-muted-foreground">
              <p>• Los correos llegan con el branding completo de System Kyron</p>
              <p>• Gmail se usa para verificaciones, Outlook para alertas</p>
              <p>• El modo "Automático" elige el mejor proveedor disponible</p>
              <p>• Máximo 30 correos por hora</p>
              <p>• Los saltos de línea en el mensaje se preservan</p>
              <p>• Si pones nombre, aparece "Estimado/a [Nombre]" al inicio</p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Historial de Envíos</h3>
            {history.length === 0 ? (
              <p className="text-[11px] text-muted-foreground italic">Sin envíos en esta sesión.</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className={`p-3 rounded-xl text-xs border ${h.success ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-destructive/5 border-destructive/10'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {h.success ? <CheckCircle className="h-3 w-3 text-emerald-500" /> : <XCircle className="h-3 w-3 text-destructive" />}
                      <span className="font-bold text-foreground">{h.provider}</span>
                      <span className="text-muted-foreground ml-auto">{h.time}</span>
                    </div>
                    <p className="text-muted-foreground truncate">{h.to}</p>
                    <p className="text-muted-foreground truncate opacity-60">{h.subject}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
