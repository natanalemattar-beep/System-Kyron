
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface SpecializedLoginCardProps {
    portalName: string;
    portalDescription: string;
    redirectPath: string;
    icon: React.ElementType;
    demoUsername: string;
    demoPassword: string;
    footerLinks?: {
      primary: { href: string; text: string };
      secondaryLinks?: {
        title?: string;
        links: { href: string; text: string }[];
      };
    };
}

export function SpecializedLoginCard({ portalName, portalDescription, redirectPath, icon: Icon, demoUsername, demoPassword, footerLinks }: SpecializedLoginCardProps) {
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
            if (username === demoUsername && password === demoPassword) {
                router.push(redirectPath);
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
                        <Icon className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter">{portalName}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-4 leading-snug">
                        {portalDescription}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-12 pt-6 space-y-10">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-3xl p-6">
                            <AlertTriangle className="h-6 w-6 text-primary" />
                            <AlertTitle className="text-lg font-bold ml-4">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-4 mt-2">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                                    <p className="font-mono text-base"><strong>Usuario:</strong> {demoUsername}</p>
                                    <p className="font-mono text-base"><strong>Clave:</strong> {demoPassword}</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive" className="rounded-3xl p-6">
                                <AlertTriangle className="h-6 w-6" />
                                <AlertTitle className="text-lg font-bold ml-4">Error de Acceso</AlertTitle>
                                <AlertDescription className="ml-4 mt-2 text-base">{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <Label htmlFor="username" className="text-base font-bold uppercase tracking-widest opacity-70">Usuario</Label>
                            <Input id="username" name="username" type="text" placeholder="Tu identificador" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="password" className="text-base font-bold uppercase tracking-widest opacity-70">Contraseña</Label>
                            <Input id="password" name="password" type="password" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-12 pt-0 flex flex-col gap-6">
                        <Button type="submit" className="w-full text-xl font-black h-20 rounded-[2rem] shadow-2xl btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-3 h-8 w-8 animate-spin" /> : 'Acceder al Portal'
                        }</Button>
                        {footerLinks && footerLinks.primary && (
                          <Button variant="link" asChild className="text-muted-foreground font-bold text-base h-auto py-2">
                             <Link href={footerLinks.primary.href}>{footerLinks.primary.text}</Link>
                          </Button>
                        )}
                         {footerLinks && footerLinks.secondaryLinks && footerLinks.secondaryLinks.links.length > 0 && (
                            <div className="text-center w-full pt-8 border-t border-border/10">
                                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-[0.2em] font-bold">{footerLinks.secondaryLinks.title || 'Otras opciones'}</p>
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                                    {footerLinks.secondaryLinks.links.map(link => (
                                         <Button key={link.href} variant="link" asChild className="p-0 h-auto text-base font-bold">
                                            <Link href={link.href}>{link.text}</Link>
                                         </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
