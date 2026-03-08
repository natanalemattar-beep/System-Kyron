
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        
        setTimeout(() => {
            if (username === demoUsername || password === demoPassword) {
                router.push(redirectPath as any);
            } else {
                setError("Credenciales de demostración incorrectas.");
                setIsLoading(false);
            }
        }, 400);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-[#020202] w-full">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-white dark:bg-card border rounded-[2.5rem] shadow-2xl overflow-hidden"
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
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Capacidades del Módulo</p>
                                <ul className="space-y-3">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                                            <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formulario de Login */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8 space-y-1">
                        <h2 className="text-xl font-black uppercase italic tracking-tight text-primary">Acceso Seguro</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocolo de Verificación Kyron</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Alert variant="default" className="bg-slate-50 dark:bg-white/5 border-none rounded-2xl p-4">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <AlertTitle className="text-[10px] font-black uppercase tracking-widest ml-3">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-3 mt-1 space-y-1">
                                <p className="text-[10px] font-mono">USUARIO: <span className="font-bold text-primary">{demoUsername}</span></p>
                                <p className="text-[10px] font-mono">CLAVE: <span className="font-bold text-primary">{demoPassword}</span></p>
                            </AlertDescription>
                        </Alert>

                        {error && (
                            <Alert variant="destructive" className="rounded-2xl">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription className="text-xs font-bold uppercase">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Identificador</Label>
                            <Input name="username" placeholder="Tu usuario o correo" required className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus-visible:ring-primary font-bold" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Contraseña</Label>
                            <Input name="password" type="password" required className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus-visible:ring-primary font-bold" />
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Entrar al Portal'}
                        </Button>
                    </form>

                    {footerLinks && (
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                            <Link href={footerLinks.primary.href as any} className="text-[10px] font-black uppercase text-primary hover:underline">{footerLinks.primary.text}</Link>
                        </div>
                    )}
                </div>
            </motion.div>
            <p className="mt-10 text-[8px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.6em]">System Kyron v2.6.5 • Secure Access Protocol</p>
        </div>
    );
}
