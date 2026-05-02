'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Shield, CircleCheck, XCircle, Loader2, Lock, Plus, Trash2, Sparkles, Eye, Pencil, ArrowRight, FileEdit } from 'lucide-react';

const TEMPLATES = [
  { id: 'personalizado', label: 'Personalizado' },
  { id: 'bienvenida', label: 'Bienvenida' },
  { id: 'notificacion', label: 'Notificación' },
  { id: 'facturacion', label: 'Facturación' },
  { id: 'soporte', label: 'Soporte Técnico' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'seguridad', label: 'Seguridad' },
];

const SENDERS = [
  { id: 'auto', label: 'Automático' },
  { id: 'gmail', label: 'Gmail (noreplysystemkyron)' },
  { id: 'outlook', label: 'Outlook (alertas_systemkyron)' },
];

type Draft = {
  to: string[];
  nombre: string | null;
  subject: string;
  message: string;
  sender: string;
  template: string;
};

type HistoryItem = {
  to: string;
  subject: string;
  provider: string;
  success: boolean;
  time: string;
};

type Mode = 'ai' | 'manual';

const EMPTY_DRAFT: Draft = {
  to: [''],
  nombre: null,
  subject: '',
  message: '',
  sender: 'auto',
  template: 'personalizado',
};

export default function KyronMailPage() {
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [masterKey, setMasterKey] = useState('');
  const [failCount, setFailCount] = useState(0);

  const [mode, setMode] = useState<Mode>('ai');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editing, setEditing] = useState(false);

  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const handleAuth = () => {
    if (masterKey === 'Carlos0507..') {
      setAuthenticated(true);
      setFailCount(0);
      toast({ title: 'Bienvenido, jefe', description: 'Panel desbloqueado.' });
    } else {
      const fails = failCount + 1;
      setFailCount(fails);
      if (fails >= 5) {
        toast({ variant: 'destructive', title: 'Bloqueado', description: 'Demasiados intentos. Recarga la página.' });
      } else {
        toast({ variant: 'destructive', title: 'Clave incorrecta' });
      }
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setDraft(null);
    setEditing(false);
    setPrompt('');
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.trim().length < 5) {
      toast({ variant: 'destructive', title: 'Escribe algo', description: 'Dime qué quieres enviar.' });
      return;
    }
    setGenerating(true);
    setDraft(null);
    try {
      const res = await fetch('/api/admin/kyron-mail-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: masterKey, prompt: prompt.trim() }),
      });
      const data = await res.json();
      if (data.success && data.draft) {
        setDraft(data.draft);
        setEditing(false);
        toast({ title: 'Borrador listo', description: 'Revisa y envía cuando quieras.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: data.error || 'No se pudo generar el correo.' });
      }
    } catch {
      toast({ variant: 'destructive', title: 'Error de conexión' });
    } finally {
      setGenerating(false);
    }
  };

  const handleManualCreate = () => {
    setDraft({ ...EMPTY_DRAFT, to: [''] });
    setEditing(true);
  };

  const handleSend = async () => {
    if (!draft) return;
    const validRecipients = draft.to.filter(r => r.includes('@') && r !== 'pendiente@definir.com');
    if (!validRecipients.length) {
      toast({ variant: 'destructive', title: 'Falta el correo', description: 'Agrega al menos un correo válido.' });
      if (!editing) setEditing(true);
      return;
    }
    if (!draft.subject.trim()) {
      toast({ variant: 'destructive', title: 'Falta el asunto', description: 'Escribe un asunto para el correo.' });
      return;
    }
    if (!draft.message.trim()) {
      toast({ variant: 'destructive', title: 'Falta el mensaje', description: 'Escribe el contenido del correo.' });
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
          subject: draft.subject,
          message: draft.message,
          template: draft.template,
          sender: draft.sender,
          nombre: draft.nombre || undefined,
        }),
      });
      const data = await res.json();

      setHistory(prev => [{
        to: validRecipients.join(', '),
        subject: data.subject || draft.subject,
        provider: data.provider || 'none',
        success: !!data.success,
        time: new Date().toLocaleTimeString('es-VE'),
      }, ...prev]);

      if (data.success) {
        toast({ title: 'Enviado', description: `Correo enviado via ${data.provider}` });
        setDraft(null);
        setPrompt('');
        setEditing(false);
        promptRef.current?.focus();
      } else {
        toast({ variant: 'destructive', title: 'Error al enviar', description: data.error });
      }
    } catch {
      toast({ variant: 'destructive', title: 'Error de conexión' });
    } finally {
      setSending(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <Card className="w-full max-w-sm p-10 bg-card/60 border-none rounded-3xl shadow-lg text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="••••••••"
              value={masterKey}
              onChange={e => setMasterKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              className="text-center text-lg font-mono tracking-widest h-12 rounded-xl"
              disabled={failCount >= 5}
            />
            <Button onClick={handleAuth} disabled={failCount >= 5} className="w-full h-11 rounded-xl font-bold text-xs uppercase tracking-widest">
              <Shield className="mr-2 h-3.5 w-3.5" /> Entrar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const draftEditor = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Para</label>
        {(draft?.to || ['']).map((r, i) => (
          <div key={i} className="flex gap-2">
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              value={r}
              onChange={e => {
                const copy = [...(draft?.to || [''])];
                copy[i] = e.target.value;
                setDraft(prev => prev ? { ...prev, to: copy } : null);
              }}
              className="h-10 rounded-xl text-sm"
            />
            {(draft?.to?.length || 0) > 1 && (
              <Button variant="ghost" size="icon" onClick={() => setDraft(prev => prev ? { ...prev, to: prev.to.filter((_, idx) => idx !== i) } : null)} className="h-10 w-10 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setDraft(prev => prev ? { ...prev, to: [...prev.to, ''] } : null)} className="rounded-lg text-[10px]">
          <Plus className="mr-1 h-3 w-3" /> Agregar
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Nombre</label>
          <Input placeholder="Nombre del destinatario" value={draft?.nombre || ''} onChange={e => setDraft(prev => prev ? { ...prev, nombre: e.target.value || null } : null)} className="h-10 rounded-xl text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Remitente</label>
          <Select value={draft?.sender || 'auto'} onValueChange={v => setDraft(prev => prev ? { ...prev, sender: v } : null)}>
            <SelectTrigger className="h-10 rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SENDERS.map(s => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Asunto</label>
          <Input placeholder="Asunto del correo" value={draft?.subject || ''} onChange={e => setDraft(prev => prev ? { ...prev, subject: e.target.value } : null)} className="h-10 rounded-xl text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Plantilla</label>
          <Select value={draft?.template || 'personalizado'} onValueChange={v => setDraft(prev => prev ? { ...prev, template: v } : null)}>
            <SelectTrigger className="h-10 rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {TEMPLATES.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mensaje</label>
        <Textarea placeholder="Escribe el contenido del correo..." value={draft?.message || ''} onChange={e => setDraft(prev => prev ? { ...prev, message: e.target.value } : null)} rows={8} className="rounded-xl resize-none text-sm" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 max-w-6xl mx-auto min-h-screen bg-background">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
          <Mail className="h-3 w-3" /> COMUNICACIONES
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">
          CORREO <span className="text-primary italic">KYRON</span>
        </h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-1 italic">
          noreplysystemkyron@gmail.com · alertas_systemkyron@hotmail.com
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex gap-2">
            <Button
              variant={mode === 'ai' ? 'default' : 'outline'}
              onClick={() => switchMode('ai')}
              className="flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles className="mr-2 h-4 w-4" /> IA
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => switchMode('manual')}
              className="flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              <FileEdit className="mr-2 h-4 w-4" /> Manual
            </Button>
          </div>

          {mode === 'ai' && (
            <>
              <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Dime qué enviar</span>
                </div>
                <Textarea
                  ref={promptRef}
                  placeholder={`Ejemplos:\n• "Mándale un correo a juan@gmail.com diciéndole que su factura está lista"\n• "Envía una bienvenida a maria@empresa.com desde outlook"\n• "Avísale a soporte@cliente.com que su ticket fue resuelto"`}
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={4}
                  className="rounded-xl resize-none text-sm"
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-muted-foreground">Ctrl+Enter para generar</span>
                  <Button onClick={handleGenerate} disabled={generating || !prompt.trim()} className="rounded-xl font-bold text-xs uppercase tracking-widest h-10 px-6">
                    {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {generating ? 'Generando...' : 'Generar Correo'}
                  </Button>
                </div>
              </Card>

              {draft && (
                <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Borrador</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)} className="text-xs rounded-lg">
                      <Pencil className="mr-1 h-3 w-3" /> {editing ? 'Vista previa' : 'Editar'}
                    </Button>
                  </div>

                  {editing ? draftEditor : (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {draft.to.map((r, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{r}</span>
                        ))}
                        {draft.nombre && <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 text-xs font-semibold">{draft.nombre}</span>}
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <p className="text-xs font-bold text-foreground mb-1">{draft.subject}</p>
                        <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">{draft.message}</p>
                      </div>
                      <div className="flex gap-2 text-[10px] text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-muted/50">{SENDERS.find(s => s.id === draft.sender)?.label || draft.sender}</span>
                        <span className="px-2 py-0.5 rounded bg-muted/50">{TEMPLATES.find(t => t.id === draft.template)?.label || draft.template}</span>
                      </div>
                    </div>
                  )}

                  <Button onClick={handleSend} disabled={sending} className="w-full h-12 rounded-xl font-semibold text-sm uppercase tracking-widest" size="lg">
                    {sending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Enviar<ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </Card>
              )}
            </>
          )}

          {mode === 'manual' && (
            <Card className="p-6 bg-card/50 border-none rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <FileEdit className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Redactar correo</span>
              </div>

              {!draft ? (
                <div className="py-8 text-center">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Escribe tu correo manualmente con control total.</p>
                  <Button onClick={handleManualCreate} className="rounded-xl font-bold text-xs uppercase tracking-widest h-10 px-8">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo correo
                  </Button>
                </div>
              ) : (
                <>
                  {draftEditor}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => { setDraft(null); setEditing(false); }} className="flex-1 h-12 rounded-xl font-bold text-xs uppercase tracking-widest">
                      Descartar
                    </Button>
                    <Button onClick={handleSend} disabled={sending} className="flex-[2] h-12 rounded-xl font-semibold text-sm uppercase tracking-widest" size="lg">
                      {sending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> Enviar<ArrowRight className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card className="p-5 bg-card/50 border-none rounded-2xl shadow-xl">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" /> Cuentas
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-[11px] font-bold text-foreground">noreplysystemkyron@gmail.com</p>
                <p className="text-[11px] text-muted-foreground">Gmail</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[11px] font-bold text-foreground">alertas_systemkyron@hotmail.com</p>
                <p className="text-[11px] text-muted-foreground">Outlook</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-card/50 border-none rounded-2xl shadow-xl">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">Historial</h3>
            {history.length === 0 ? (
              <p className="text-[11px] text-muted-foreground italic">Sin envíos aún.</p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className={`p-2.5 rounded-xl text-[11px] border ${h.success ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-destructive/5 border-destructive/10'}`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {h.success ? <CircleCheck className="h-3 w-3 text-emerald-500" /> : <XCircle className="h-3 w-3 text-destructive" />}
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
