"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Loader as Loader2,
    TriangleAlert as AlertTriangle,
    ChevronLeft,
    CircleCheck as CheckCircle2,
    ShieldCheck,
    Smartphone,
    Signal,
    Wifi,
    Radio,
    Network,
    Globe,
    UserPlus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ACCESS_TYPES = {
    personal: {
        label: 'Mi Línea Personal',
        tag: 'PERSONAL',
        description: 'Gestión individual de tu línea móvil, recargas y consumo de datos 5G.',
        icon: Smartphone,
        accentClass: 'bg-primary',
        redirectPath: '/mi-linea',
        features: [
            'Activación de eSIM Individual',
            'Recargas de Saldo Prepago',
            'Monitor de Consumo 5G',
        ],
        bgIcons: (
            <div className="flex flex-col gap-16 p-16 opacity-20">
                <Wifi className="h-20 w-20" />
                <Smartphone className="h-20 w-20 ml-20" />
                <Signal className="h-20 w-20" />
            </div>
        ),
    },
    empresa: {
        label: 'Mi Línea Empresa',
        tag: 'CORPORATIVO',
        description: 'Centro de control de flota corporativa para la gestión masiva de líneas.',
        icon: Signal,
        accentClass: 'bg-amber-600',
        redirectPath: '/flota-empresarial',
        features: [
            'Control de Flota por Departamento',
            'Límites de Consumo por Empleado',
            'Facturación Consolidada',
        ],
        bgIcons: (
            <div className="grid grid-cols-2 gap-12 p-12 opacity-15">
                <Radio className="h-24 w-24 animate-pulse" />
                <Network className="h-24 w-24" />
                <Globe className="h-24 w-24" />
                <Signal className="h-24 w-24" />
            </div>
        ),
    },
} as const;

type AccessType = keyof typeof ACCESS_TYPES;

export default function LoginLineaUnifiedPage() {
    const [selected, setSelected] = useState<AccessType>('personal');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
                setError(json.error || 'Credenciales incorrectas. Verifica tu correo y contraseña.');
                setIsLoading(false);
                return;
            }

            toast({
                title: 'ACCESO CONCEDIDO',
                description: `Bienvenido al portal de ${current.label}, ${json.user?.nombre ?? ''}.`,
                action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />,
            });
            router.push(current.redirectPath as any);
        } catch {
            setError('Error de conexión. Por favor intenta de nuevo.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full hud-grid relative overflow-hidden">
            <Button
                variant="ghost"
                asChild
                className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all"
            >
                <Link href="/login" className="flex items-center">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Portal
                </Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-card border border-border/50 rounded-[3rem] shadow-glow overflow-hidden relative z-10"
            >
                {/* Selector de Tipo de Acceso */}
                <div className="grid grid-cols-2 border-b border-border/50">
                    {(Object.keys(ACCESS_TYPES) as AccessType[]).map((key) => {
                        const opt = ACCESS_TYPES[key];
                        const isActive = selected === key;
                        return (
                            <button
                                key={key}
                                onClick={() => { setSelected(key); setError(null); }}
                                className={cn(
                                    'flex items-center justify-center gap-2.5 py-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-b-2',
                                    isActive
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                )}
                            >
                                <opt.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{opt.label}</span>
                                <span className="sm:hidden">{opt.tag}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Panel de Información - cambia según selección */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                'p-10 md:p-14 relative overflow-hidden flex flex-col justify-center text-white',
                                current.accentClass
                            )}
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                {current.bgIcons}
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="p-5 bg-white/10 rounded-[2rem] w-fit border border-white/20 shadow-2xl backdrop-blur-sm">
                                    <Icon className="h-10 w-10 text-white" />
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-60 border border-white/20 px-2 py-1 rounded-md">
                                        {current.tag}
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic italic-shadow leading-none mt-3">
                                        {current.label}
                                    </h1>
                                    <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest max-w-xs">
                                        {current.description}
                                    </p>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Funcionalidades</p>
                                    <ul className="space-y-3">
                                        {current.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight">
                                                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Formulario de Autenticación */}
                    <div className="p-10 md:p-14 flex flex-col justify-center bg-card">
                        <div className="mb-8 space-y-1">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight text-foreground">
                                Iniciar Sesión
                            </h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                Protocolo de Verificación Kyron
                            </p>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="rounded-2xl border-destructive/30 bg-destructive/10">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="text-[10px] font-black uppercase tracking-widest">
                                        Error de Acceso
                                    </AlertTitle>
                                    <AlertDescription className="text-[9px] font-bold uppercase tracking-widest">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        Correo Electrónico
                                    </Label>
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
                                        <Label className="text-sm font-semibold text-foreground">
                                            Contraseña
                                        </Label>
                                        <Button
                                            variant="link"
                                            asChild
                                            className="p-0 h-auto text-xs font-medium text-primary hover:no-underline"
                                        >
                                            <Link href="/recover-legal">¿Olvidaste tu clave?</Link>
                                        </Button>
                                    </div>
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                        className="h-12 bg-background border-input rounded-xl focus-visible:ring-primary text-foreground"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                ) : (
                                    `ACCEDER · ${ACCESS_TYPES[selected].tag}`
                                )}
                            </Button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-4">
                            <p className="text-xs font-medium text-muted-foreground">¿No tienes cuenta?</p>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full h-12 rounded-xl border-border bg-background text-sm font-semibold hover:bg-primary/5 hover:text-primary transition-all"
                            >
                                <Link href="/register" className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" /> Registrarse
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <p className="mt-12 text-[8px] font-black text-muted-foreground/30 uppercase tracking-[1em] italic">
                SYSTEM KYRON v2.6.5 • ENLACE SEGURO
            </p>
        </div>
    );
}
