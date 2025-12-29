
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, User } from 'lucide-react';
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
                toast({ title: "Acceso Concedido", description: `Bienvenido al portal ${portalName}.` });
                router.push(redirectPath);
            } else {
                setError("Credenciales de demostración incorrectas. Utilice las indicadas.");
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-2 border-border shadow-xl rounded-2xl">
                 <CardHeader className="text-center p-8">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <Icon className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-3xl font-bold">{portalName}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2">
                        {portalDescription}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 space-y-6">
                         <Alert variant="default" className="bg-secondary">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Modo Demostración</AlertTitle>
                            <AlertDescription>
                                <p className="font-mono text-sm"><strong>Usuario:</strong> {demoUsername}</p>
                                <p className="font-mono text-sm"><strong>Clave:</strong> {demoPassword}</p>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error de Autenticación</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input id="username" name="username" type="text" placeholder="Ingresa tu usuario" required className="text-base" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" name="password" type="password" required className="text-base" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 flex flex-col gap-4">
                        <Button type="submit" className="w-full text-lg h-12" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Acceder'
                        }</Button>
                        {footerLinks && footerLinks.primary && (
                          <Button variant="link" asChild className="text-muted-foreground font-normal">
                             <Link href={footerLinks.primary.href}>{footerLinks.primary.text}</Link>
                          </Button>
                        )}
                         {footerLinks && footerLinks.secondaryLinks && footerLinks.secondaryLinks.links.length > 0 && (
                            <div className="text-center w-full pt-4 border-t">
                                <p className="text-sm text-muted-foreground mb-2">{footerLinks.secondaryLinks.title || 'Otras opciones:'}</p>
                                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                                    {footerLinks.secondaryLinks.links.map(link => (
                                         <Button key={link.href} variant="link" asChild className="p-0 h-auto text-xs">
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
