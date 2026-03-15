"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Link } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        const auth = getAuth();
        const db = getFirestore();

        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Guardar perfil en Firestore
                await setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                    firstName: name.split(' ')[0] || name,
                    lastName: name.split(' ').slice(1).join(' ') || '',
                    email: user.email,
                    portal: portalName,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });

                toast({
                    title: "CUENTA CREADA",
                    description: "Bienvenido al ecosistema Kyron.",
                    action: <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast({
                    title: "ACCESO CONCEDIDO",
                    description: "Enlace establecido con el nodo central.",
                });
            }
            router.push(redirectPath as any);
        } catch (err: any) {
            console.error(err);
            let message = "Error en el protocolo de acceso.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') message = "Credenciales incorrectas.";
            if (err.code === 'auth/email-already-in-use') message = "El usuario ya existe en el registro.";
            if (err.code === 'auth/weak-password') message = "La clave debe tener al menos 6 caracteres.";
            setError(message);
            setIsLoading(false);
        }
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
                        <h2 className="text-2xl font-black uppercase italic tracking-tight text-primary">
                            {isRegister ? "Crear Registro" : "Acceso Seguro"}
                        </h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocolo Kyron v2.6</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <Alert variant="destructive" className="rounded-2xl border-none bg-rose-500/10 text-rose-600">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertDescription className="text-[10px] font-black uppercase tracking-widest">{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isRegister && (
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nombre Completo</Label>
                                <Input name="name" placeholder="Tu nombre" required className="h-12 bg-muted/30 border-border rounded-xl focus-visible:ring-primary font-bold" />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Correo Electrónico</Label>
                            <Input name="email" type="email" placeholder="usuario@kyron.com" required className="h-12 bg-muted/30 border-border rounded-xl focus-visible:ring-primary font-bold" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Clave Maestra</Label>
                            <Input name="password" type="password" placeholder="••••••••" required className="h-12 bg-muted/30 border-border rounded-xl focus-visible:ring-primary font-bold" />
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                isRegister ? "REGISTRAR EN LEDGER" : "AUTENTICAR NODO"
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border/50 text-center space-y-4">
                        <button 
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-[10px] font-black uppercase text-primary hover:underline flex items-center justify-center gap-2 mx-auto"
                        >
                            {isRegister ? <LogIn className="h-3 w-3"/> : <UserPlus className="h-3 w-3"/>}
                            {isRegister ? "¿Ya tienes cuenta? Entrar" : "¿No tienes cuenta? Registrarse"}
                        </button>
                        
                        {footerLinks && !isRegister && (
                            <Link href={footerLinks.primary.href as any} className="block text-[9px] font-bold uppercase text-slate-400 hover:text-primary transition-colors">{footerLinks.primary.text}</Link>
                        )}
                    </div>
                </div>
            </motion.div>
            <p className="mt-10 text-[8px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.6em]">System Kyron v2.6.5 • Secure Access Protocol</p>
        </div>
    );
}
