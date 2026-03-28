'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock,
  Smartphone, Signal, Building
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ACCESS_TYPES = {
  personal: {
    label: 'Mi Línea Personal',
    tag: 'Personal',
    description: 'Gestión de tu línea móvil, recargas y consumo 5G.',
    icon: Smartphone,
    redirectPath: '/mi-linea',
    features: ['eSIM Individual', 'Recargas Prepago', 'Monitor 5G'],
  },
  empresa: {
    label: 'Mi Línea Empresa',
    tag: 'Corporativo',
    description: 'Centro de control de flota corporativa y gestión masiva.',
    icon: Signal,
    redirectPath: '/flota-empresarial',
    features: ['Control de Flota', 'Límites por Empleado', 'Facturación Consolidada'],
  },
} as const;

type AccessType = keyof typeof ACCESS_TYPES;

export default function LoginLineaUnifiedPage() {
  const [selected, setSelected] = useState<AccessType>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const current = ACCESS_TYPES[selected];
  const Icon = current.icon;

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Credenciales incorrectas.');
        setIsLoading(false);
        return;
      }
      toast({
        title: 'Acceso concedido',
        description: `Bienvenido, ${json.user?.nombre ?? ''}.`,
        action: <CircleCheck className="text-emerald-500 h-4 w-4" />,
      });
      router.push(current.redirectPath as any);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
      </Button>

      <div className="w-full max-w-5xl bg-card border border-border/40 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 border-b border-border/40">
          {(Object.keys(ACCESS_TYPES) as AccessType[]).map((key) => {
            const opt = ACCESS_TYPES[key];
            const isActive = selected === key;
            return (
              <button
                key={key}
                onClick={() => { setSelected(key); setError(null); }}
                className={cn(
                  'flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all duration-200 border-b-2',
                  isActive
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                )}
              >
                <opt.icon className="h-4 w-4" />
                {opt.tag}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-2 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between bg-blue-600 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-black/10 blur-[60px]" />

            <div className="relative z-10 space-y-6">
              <div className="p-3.5 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">{current.label}</h1>
                <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">{current.description}</p>
              </div>
            </div>

            <div className="relative z-10 space-y-3 mt-8 pt-6 border-t border-white/10">
              <ul className="space-y-2.5">
                {current.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-semibold opacity-90">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-card">
            <div className="mb-8">
              <h2 className="text-xl font-black tracking-tight text-foreground">Iniciar Sesión</h2>
              <p className="text-sm text-muted-foreground mt-1">Accede a tu portal de telecomunicaciones</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20">
                  <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className="h-12 pl-10 rounded-xl border-border/60" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Contraseña</Label>
                  <Link href="/recuperar-cuenta" className="text-xs font-medium text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl border-border/60" />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border/50" />
                <span className="text-xs text-muted-foreground">¿No tienes línea?</span>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <Button variant="outline" asChild className="w-full h-11 rounded-xl text-sm font-semibold hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
                <Link href="/register/telecom" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Activar Mi Línea</Link>
              </Button>
              <div className="text-center">
                <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors">¿Problemas para acceder? Recuperar cuenta</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">System Kyron v2.8.2 · Mi Línea 5G</p>
    </div>
  );
}
