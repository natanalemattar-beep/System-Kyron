
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
        // Trimming inputs to ignore spaces
        const rif = (formData.get('rif') as string || "").trim();
        const password = (formData.get('password') as string || "").trim();

        const DEMO_RIF = "J-12345678-9";
        const DEMO_PASS = "admin1234";
        
        setTimeout(() => {
            if (rif === DEMO_RIF && password === DEMO_PASS) {
                router.push('/contabilidad');
            } else {
                setError("Credenciales de demostración incorrectas.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-9 rounded-xl text-xs">
                <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4"/> Volver</Link>
            </Button>
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-2xl border border-border shadow-xl rounded-[1.5rem] overflow-hidden">
                 <CardHeader className="text-center p-6 pb-4">
                    <div className="mx-auto bg-primary/10 p-3.5 rounded-xl w-fit mb-4 shadow-inner">
                        <Building className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tighter">Portal Empresarial</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1.5 leading-snug">
                        Centro de Contabilidad y Finanzas.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-6 pt-2 space-y-5">
                         <Alert variant="default" className="bg-secondary/50 border-none rounded-xl p-3">
                            <AlertTriangle className="h-4 w-4 text-primary" />
                            <AlertTitle className="text-xs font-bold ml-2">Modo Demostración</AlertTitle>
                            <AlertDescription className="ml-2 mt-0.5">
                                <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                                    <p className="font-mono text-[10px]"><strong>RIF:</strong> J-12345678-9</p>
                                    <p className="font-mono text-[10px]"><strong>Clave:</strong> admin1234</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                        {error && (
                             <Alert variant="destructive" className="rounded-xl p-3">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-xs font-bold ml-2">Error</AlertTitle>
                                <AlertDescription className="ml-2 mt-0.5 text-[10px]">{error}</AlertDescription>
                             </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="rif" className="text-[10px] font-black uppercase tracking-widest opacity-70">RIF Empresa</Label>
                            <Input id="rif" name="rif" type="text" placeholder="J-12345678-9" required className="h-10 text-sm px-4 rounded-xl bg-secondary/30 border-none" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest opacity-70">Clave Maestra</Label>
                            <Input id="password" name="password" type="password" required className="h-10 text-sm px-4 rounded-xl bg-secondary/30 border-none" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                        <Button type="submit" className="w-full text-sm font-bold h-11 rounded-xl shadow-lg btn-3d-primary" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Entrar al Sistema'
                        }</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
