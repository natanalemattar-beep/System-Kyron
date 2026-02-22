
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, User, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function LoginPersonalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const DEMO_EMAIL = "usuario@kyron.com";
        const DEMO_PASS = "password123";
        
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASS) {
                toast({ title: "Acceso Concedido", description: "Bienvenido a tu portal personal." });
                router.push('/dashboard');
            } else {
                setError("Credenciales de demostración incorrectas. Utilice las indicadas.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
             <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-12 md:left-12 h-12 rounded-xl text-base">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-5 w-5"/> Volver</Link>
            </Button>
            <Card className="w-full max-w-xl bg-card/80 backdrop-blur-2xl border-2 border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[3rem] overflow-hidden">
                 <CardHeader className="text-center p-12 pb-6">
                    <div className="mx-auto bg-primary/10 p-5 rounded-3xl w-fit mb-8 shadow-inner">
                        <User className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter">Portal Personal</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-4 leading-snug">
                        Accede a tus trámites civiles, documentos digitalizados y servicios de salud.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-12 pt-6 space-y-10">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-3xl p-6">
                            <AlertTriangle className="h-6 w-6 text-primary" />
                            <AlertTitle className="text-lg font-bold ml-4">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-4 mt-2">
                                <p className="text-base">Utilice las siguientes credenciales:</p>
                                <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-6">
                                    <p className="font-mono text-base"><strong>Correo:</strong> usuario@kyron.com</p>
                                    <p className="font-mono text-base"><strong>Clave:</strong> password123</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive" className="rounded-3xl p-6">
                                <AlertTriangle className="h-6 w-6" />
                                <AlertTitle className="text-lg font-bold ml-4">Error de Autenticación</AlertTitle>
                                <AlertDescription className="ml-4 mt-2 text-base">{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <Label htmlFor="email" className="text-base font-bold uppercase tracking-widest opacity-70">Correo Electrónico</Label>
                            <Input id="email" name="email" type="email" placeholder="tu@correo.com" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="password" className="text-base font-bold uppercase tracking-widest opacity-70">Contraseña</Label>
                            <Input id="password" name="password" type="password" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-12 pt-0 flex flex-col gap-8">
                        <Button type="submit" className="w-full text-xl font-black h-20 rounded-[2rem] shadow-2xl btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-3 h-8 w-8 animate-spin" /> : 'Iniciar Sesión Segura'
                        }</Button>
                        <div className="text-center w-full pt-8 border-t border-border/10">
                            <p className="text-base text-muted-foreground mb-4">¿No tienes una cuenta o tienes problemas?</p>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                                <Button variant="link" asChild className="p-0 h-auto text-base font-bold">
                                    <Link href="/register">Crear cuenta nueva</Link>
                                </Button>
                                    <Button variant="link" asChild className="p-0 h-auto text-base font-bold">
                                    <Link href="#">Recuperar acceso</Link>
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
