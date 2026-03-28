'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { loginOptions } from '@/lib/login-options';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Lock, Fingerprint, Globe, Server, Zap, Shield } from 'lucide-react';

export default function LoginSelectionPage() {
  const personalOptions = loginOptions.filter(o =>
    ['/login-personal', '/login-linea'].includes(o.href)
  );
  const enterpriseOptions = loginOptions.filter(o =>
    !['/login-personal', '/login-linea'].includes(o.href)
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/3 blur-[80px]" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> Inicio</Link>
          </Button>
        </div>

        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-5">
            <ShieldCheck className="h-3.5 w-3.5" /> Acceso Seguro · AES-256
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-foreground">
            Selecciona tu <span className="text-primary italic">Portal</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Elige el módulo al que deseas acceder para gestionar tus operaciones.
          </p>
        </header>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 flex-wrap">
          {[
            { icon: Lock, text: "Cifrado E2E" },
            { icon: Fingerprint, text: "Biometría" },
            { icon: Shield, text: "2FA Activo" },
            { icon: Server, text: "99.9% Uptime" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-muted-foreground/50">
              <item.icon className="h-3 w-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.text}</span>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <User className="h-3.5 w-3.5" /> Portal Ciudadano
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors border border-primary/5">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{option.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5" /> Portales Corporativos
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors border border-primary/5">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">{option.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border/30 bg-card/30 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Ecosistema Completo</p>
                <p className="text-[9px] text-muted-foreground">12+ módulos integrados · Cumplimiento fiscal VEN-NIF</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5" /> Recuperar cuenta
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl text-[9px] font-black uppercase tracking-widest px-5">
                  <User className="mr-2 h-3.5 w-3.5" /> Crear cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 pb-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["VEN-NIF Certificado", "Compatible SENIAT", "IGTF 3%", "LOTTT"].map((badge, i) => (
              <span key={i} className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border/20">
                {badge}
              </span>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-bold">
            <Globe className="h-3 w-3 inline mr-1" />
            System Kyron v2.8.2 · Infraestructura Segura · Venezuela
          </p>
        </div>
      </div>
    </div>
  );
}
