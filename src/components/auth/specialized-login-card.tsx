
"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader as Loader2, TriangleAlert as AlertTriangle, ChevronLeft, CircleCheck as CheckCircle2, ShieldCheck, ArrowRight, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpecializedLoginCardProps {
    portalName: string;
    portalDescription: string;
    redirectPath: string;
    icon: React.ElementType;
    accentColor?: string;
    bgPattern?: React.ReactNode;
    features?: string[];
    footerLinks?: {
      primary: { href: string; text: string };
      secondaryLinks?: {
        title?: string;
        links: { href: string; text: string }[];
      };
    };
}

export function SpecializedLoginCard({ 
    portalName, 
    portalDescription, 
    redirectPath, 
    icon: Icon, 
    accentColor = "primary",
    bgPattern,
    features = [],
    footerLinks 
}: SpecializedLoginCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = (formData.get('email') as string || "").trim().toLowerCase();
        const password = formData.get('password') as string;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error || 'Credenciales incorrectas. Verifica tu correo y contraseña.');
                setIsLoading(false);
                return;
            }

            toast({
                title: "ACCESO CONCEDIDO",
                description: `Bienvenido al portal de ${portalName}, ${json.user?.nombre ?? ''}.`,
                action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
            });
            router.push(redirectPath as any);
        } catch {
            setError('Error de conexión. Por favor intenta de nuevo.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full hud-grid relative overflow-hidden">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all">
                <Link href={footerLinks?.primary.href as any ?? "/login"} className="flex items-center">
                    <ChevronLeft className="mr-2 h-4 w-4"/> {footerLinks?.primary.text ?? 'Volver'}
                </Link>
            </Button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-card border border-border/50 rounded-[3rem] shadow-glow overflow-hidden relative z-10"
            >
                {/* Panel de Información del Portal */}
                <div className={cn(
                    "p-10 md:p-16 relative overflow-hidden flex flex-col justify-center text-white",
                    `bg-${accentColor}`
                )}>
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {bgPattern}
                    </div>
                    
                    <div className="relative z-10 space-y-10">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="p-5 bg-white/10 rounded-[2rem] w-fit border border-white/20 shadow-2xl backdrop-blur-sm"
                        >
                            <Icon className="h-12 w-12 text-white"/>
                        </motion.div>
                        
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic italic-shadow leading-none">{portalName}</h1>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest max-w-xs">{portalDescription}</p>
                        </div>

                        {features.length > 0 && (
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Funcionalidades</p>
                                <ul className="space-y-3">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight">
                                            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formulario de Autenticación */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-card">
                    <div className="mb-10 space-y-2">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Iniciar Sesión</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocolo de Verificación Kyron</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="rounded-2xl border-destructive/30 bg-destructive/10">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Error de Acceso</AlertTitle>
                                <AlertDescription className="text-[9px] font-bold uppercase tracking-widest">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-foreground">Correo Electrónico</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="tu@correo.com"
                                    required
                                    autoComplete="email"
                                    className="h-12 bg-background border-input rounded-xl focus-visible:ring-primary text-foreground text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-sm font-semibold text-foreground">Contraseña</Label>
                                    <Button variant="link" asChild className="p-0 h-auto text-xs font-medium text-primary hover:no-underline">
                                        <Link href="/recover-legal">¿Olvidaste tu clave?</Link>
                                    </Button>
                                </div>
                                <div className="relative">
                                    <Input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        className="h-12 bg-background border-input rounded-xl focus-visible:ring-primary text-foreground pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : "ACCEDER AL PORTAL"}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4">
                        <p className="text-xs font-medium text-muted-foreground">¿No tienes cuenta?</p>
                        <Button variant="outline" asChild className="w-full h-12 rounded-xl border-border bg-background text-sm font-semibold hover:bg-primary/5 hover:text-primary transition-all">
                            <Link href="/register" className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" /> Registrarse
                            </Link>
                        </Button>

                        {footerLinks?.secondaryLinks && (
                            <div className="text-center text-xs text-muted-foreground space-y-1 mt-2">
                                {footerLinks.secondaryLinks.title && (
                                    <p className="font-medium">{footerLinks.secondaryLinks.title}</p>
                                )}
                                {footerLinks.secondaryLinks.links.map(link => (
                                    <Link key={link.href} href={link.href as any} className="block text-primary hover:underline font-medium">
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <p className="mt-12 text-[8px] font-black text-muted-foreground/30 uppercase tracking-[1em] italic">SYSTEM KYRON v2.6.5 • ENLACE SEGURO</p>
        </div>
    );
}
