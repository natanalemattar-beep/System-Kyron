"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, Building, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
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
            <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-sm">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>
            <Card className="w-full max-w-lg bg-card/80 backdrop-blur-2xl border border-border shadow-xl rounded-[2rem] overflow-hidden">
                 <CardHeader className="text-center p-8 pb-4">
                    <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-6 shadow-inner">
                        <Building className="h-10 w-10 text-primary"/>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tighter">Portal Empresarial</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2 leading-snug">
                        Acceso al Centro de Contabilidad y Finanzas.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 pt-4 space-y-6">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-2xl p-4">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                            <AlertTitle className="text-sm font-bold ml-3">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-3 mt-1">
                                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                    <p className="font-mono text-xs"><strong>RIF:</strong> J-12345678-9</p>
                                    <p className="font-mono text-xs"><strong>Clave:</strong> admin1234</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive" className="rounded-2xl p-4">
                                <AlertTriangle className="h-5 w-5" />
                                <AlertTitle className="text-sm font-bold ml-3">Error de Autenticación</AlertTitle>
                                <AlertDescription className="ml-3 mt-1 text-xs">{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="rif" className="text-xs font-bold uppercase tracking-widest opacity-70">RIF de la Empresa</Label>
                            <Input id="rif" name="rif" type="text" placeholder="J-12345678-9" required className="h-12 text-base px-4 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest opacity-70">Contraseña Maestra</Label>
                            <Input id="password" name="password" type="password" required className="h-12 text-base px-4 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex flex-col gap-4">
                        <Button type="submit" className="w-full text-lg font-black h-14 rounded-xl shadow-lg btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Acceder al Sistema'
                        }</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
