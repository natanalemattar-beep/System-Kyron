
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/provider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import Link from 'next/link';

interface LoginCardProps {
    portalName: string;
    portalDescription: string;
    redirectPath: string;
    footerLinks?: {
      primary: { href: string; text: string };
      secondaryLinks?: {
        title?: string;
        links: { href: string; text: string }[];
      };
    };
}

export function LoginCard({ portalName, portalDescription, redirectPath, footerLinks }: LoginCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const auth = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!auth) {
            setError("Servicio de autenticación no disponible.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push(redirectPath);
        } catch (err: any) {
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-credential':
                    setError("Credenciales inválidas. Por favor, verifica tu correo y contraseña.");
                    break;
                case 'auth/wrong-password':
                    setError("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                    break;
                case 'auth/invalid-email':
                    setError("El formato del correo electrónico es inválido.");
                    break;
                case 'auth/too-many-requests':
                    setError("Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo más tarde.");
                    break;
                default:
                    setError("Ocurrió un error inesperado al iniciar sesión.");
                    console.error("Firebase login error:", err);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-2 border-border shadow-xl rounded-2xl">
                 <CardHeader className="text-center p-8">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <User className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-3xl font-bold">{portalName}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2">
                        {portalDescription}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 space-y-6">
                        {error && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error de Autenticación</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" name="email" type="email" placeholder="tu@email.com" required className="text-base" />
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
                        {footerLinks && (
                          <>
                            <Button variant="link" asChild className="text-muted-foreground font-normal">
                               <Link href={footerLinks.primary.href}>{footerLinks.primary.text}</Link>
                            </Button>
                            {footerLinks.secondaryLinks && footerLinks.secondaryLinks.links.length > 0 && (
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
                          </>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
