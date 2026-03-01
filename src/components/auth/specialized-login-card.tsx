
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
        
        // Reduced timeout for snappier experience
        setTimeout(() => {
            if (username === demoUsername && password === demoPassword) {
                router.push(redirectPath);
            } else {
                setError("Credenciales de demostración incorrectas. Utilice las indicadas.");
                setIsLoading(false);
            }
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-9 rounded-xl text-xs">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>
            <Card className="w-full max-w-lg bg-card/80 backdrop-blur-2xl border border-border shadow-xl rounded-[2rem] overflow-hidden">
                 <CardHeader className="text-center p-8 pb-4">
                    <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-6 shadow-inner">
                        <Icon className="h-10 w-10 text-primary"/>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tighter">{portalName}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2 leading-snug">
                        {portalDescription}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 pt-4 space-y-6">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-2xl p-4">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                            <AlertTitle className="text-sm font-bold ml-3">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-3 mt-1">
                                <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
                                    <p className="font-mono text-xs"><strong>Usuario:</strong> {demoUsername}</p>
                                    <p className="font-mono text-xs"><strong>Clave:</strong> {demoPassword}</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive" className="rounded-2xl p-4">
                                <AlertTriangle className="h-5 w-5" />
                                <AlertTitle className="text-sm font-bold ml-3">Error de Acceso</AlertTitle>
                                <AlertDescription className="ml-3 mt-1 text-xs">{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest opacity-70">Usuario</Label>
                            <Input id="username" name="username" type="text" placeholder="Tu identificador" required className="h-11 text-base px-4 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest opacity-70">Contraseña</Label>
                            <Input id="password" name="password" type="password" required className="h-11 text-base px-4 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex flex-col gap-4">
                        <Button type="submit" className="w-full text-lg font-black h-12 rounded-xl shadow-lg btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Acceder al Portal'
                        }</Button>
                        {footerLinks && footerLinks.primary && (
                          <Button variant="link" asChild className="text-muted-foreground font-bold text-sm h-auto py-1">
                             <Link href={footerLinks.primary.href as any}>{footerLinks.primary.text}</Link>
                          </Button>
                        )}
                         {footerLinks && footerLinks.secondaryLinks && footerLinks.secondaryLinks.links.length > 0 && (
                            <div className="text-center w-full pt-6 border-t border-border/10">
                                <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-[0.2em] font-bold">{footerLinks.secondaryLinks.title || 'Otras opciones'}</p>
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                                    {footerLinks.secondaryLinks.links.map(link => (
                                         <Button key={link.href} variant="link" asChild className="p-0 h-auto text-xs font-bold">
                                            <Link href={link.href as any}>{link.text}</Link>
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
