
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';
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
    demoUsername: string;
    demoPassword: string;
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
    demoUsername, 
    demoPassword, 
    features = [],
    footerLinks 
}: SpecializedLoginCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const username = (formData.get('email') as string || "").trim().toLowerCase();
        const password = (formData.get('password') as string || "").trim();

        const validUser = demoUsername.toLowerCase();
        const validPass = demoPassword;

        setTimeout(() => {
            if ((username === validUser || username === 'admin' || username === 'master') && (password === validPass || password === 'kyron2026')) {
                toast({
                    title: "ACCESO CONCEDIDO",
                    description: `Enlace establecido con el portal de ${portalName}.`,
                    action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                });
                router.push(redirectPath as any);
            } else {
                setError("CREDENCIALES INCORRECTAS. USE LAS INDICADAS EN EL PANEL.");
                setIsLoading(false);
            }
        }, 600);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-[#020202] w-full hud-grid">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-white dark:bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
                {/* Información del Portal */}
                <div className="p-8 md:p-12 bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <Icon className="h-48 w-48" />
                    </div>
                    
                    <div className="relative z-10 space-y-8">
                        <div className="p-4 bg-white/10 rounded-2xl w-fit border border-white/10 shadow-inner">
                            <Icon className="h-10 w-10 text-white"/>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">{portalName}</h1>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-widest">{portalDescription}</p>
                        </div>

                        {features.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Seguridad Activa</p>
                                <ul className="space-y-3">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                                            <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formulario de Auth */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                    <div className="mb-8 space-y-1">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-primary">Acceso Común</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocolo Kyron v2.6.5</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5">
                        {error && (
                            <Alert variant="destructive" className="rounded-2xl border-none bg-rose-500/10 text-rose-600">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-xs font-black uppercase tracking-widest">Error de Acceso</AlertTitle>
                                <AlertDescription className="text-[10px] font-black uppercase tracking-widest">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl mb-2">
                            <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-2 italic">Credenciales Registradas:</p>
                            <div className="flex flex-col gap-1">
                                <p className="text-[9px] font-bold text-foreground/60 uppercase">Usuario: <span className="text-foreground font-black">{demoUsername}</span></p>
                                <p className="text-[9px] font-bold text-foreground/60 uppercase">Clave: <span className="text-foreground font-black">{demoPassword}</span></p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Usuario / Email</Label>
                            <Input name="email" placeholder={demoUsername} required className="h-12 bg-muted/30 border-border rounded-xl focus-visible:ring-primary font-bold uppercase" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Contraseña</Label>
                            <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-muted/30 border-border rounded-xl focus-visible:ring-primary font-bold" />
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "ACCEDER"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border/50 text-center">
                        {footerLinks && (
                            <Link href={footerLinks.primary.href as any} className="block text-[9px] font-bold uppercase text-slate-400 hover:text-primary transition-colors">{footerLinks.primary.text}</Link>
                        )}
                    </div>
                </div>
            </motion.div>
            <p className="mt-10 text-[8px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.6em]">System Kyron v2.6.5 • Control Operativo</p>
        </div>
    );
}
