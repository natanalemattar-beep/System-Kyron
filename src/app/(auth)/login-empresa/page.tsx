
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, Building, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginEmpresaPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const rif = formData.get('rif') as string;
        const password = formData.get('password') as string;

        const DEMO_RIF = "J-12345678-9";
        const DEMO_PASS = "admin1234";
        
        setTimeout(() => {
            if (rif === DEMO_RIF && password === DEMO_PASS) {
                router.push('/contabilidad');
            } else {
                setError("Credenciales de demostración incorrectas. Utilice las indicadas.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-12 md:left-12 h-12 rounded-xl text-base">
                <a href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-5 w-5"/> Volver</a>
            </Button>
            <Card className="w-full max-w-xl bg-card/80 backdrop-blur-2xl border-2 border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[3rem] overflow-hidden">
                 <CardHeader className="text-center p-12 pb-6">
                    <div className="mx-auto bg-primary/10 p-5 rounded-3xl w-fit mb-8 shadow-inner">
                        <Building className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter">Portal Empresarial</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-4 leading-snug">
                        Acceso al Centro de Contabilidad, Finanzas y Gestión de Cumplimiento.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-12 pt-6 space-y-10">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-3xl p-6">
                            <AlertTriangle className="h-6 w-6 text-primary" />
                            <AlertTitle className="text-lg font-bold ml-4">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-4 mt-2">
                                <p className="text-base">Utilice las siguientes credenciales:</p>
                                <div className="mt-2 flex gap-6">
                                    <p className="font-mono text-base"><strong>RIF:</strong> J-12345678-9</p>
                                    <p className="font-mono text-base"><strong>Clave:</strong> admin1234</p>
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
                            <Label htmlFor="rif" className="text-base font-bold uppercase tracking-widest opacity-70">RIF de la Empresa</Label>
                            <Input id="rif" name="rif" type="text" placeholder="J-12345678-9" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="password" className="text-base font-bold uppercase tracking-widest opacity-70">Contraseña Maestra</Label>
                            <Input id="password" name="password" type="password" required className="h-16 text-xl px-6 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-12 pt-0 flex flex-col gap-6">
                        <Button type="submit" className="w-full text-xl font-black h-20 rounded-[2rem] shadow-2xl btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-3 h-8 w-8 animate-spin" /> : 'Acceder al Sistema'
                        }</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
