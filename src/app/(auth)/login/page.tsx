
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, Building, KeyRound, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { loginOptions } from '@/lib/login-options';

export default function LoginPage() {
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
                toast({ title: "Acceso Concedido", description: "Bienvenido al Centro de Contabilidad." });
                router.push('/contabilidad');
            } else {
                setError("Credenciales de demostración incorrectas. Utilice las indicadas.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-2 border-border shadow-xl rounded-2xl">
                 <CardHeader className="text-center p-8">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <Building className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-3xl font-bold">Portal Empresarial</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2">
                        Acceso al Centro de Contabilidad y gestión financiera.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 space-y-6">
                         <Alert variant="default" className="bg-secondary">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Modo Demostración</AlertTitle>
                            <AlertDescription>
                                <p>Utilice las siguientes credenciales para acceder:</p>
                                <p className="font-mono text-sm"><strong>RIF:</strong> J-12345678-9</p>
                                <p className="font-mono text-sm"><strong>Clave:</strong> admin1234</p>
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
                            <Label htmlFor="rif">RIF de la Empresa</Label>
                            <Input id="rif" name="rif" type="text" placeholder="J-12345678-9" required className="text-base" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña Maestra</Label>
                            <Input id="password" name="password" type="password" required className="text-base" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 flex flex-col gap-4">
                        <Button type="submit" className="w-full text-lg h-12" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Acceder'
                        }</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className="text-muted-foreground font-normal">
                                    ¿Acceder a otro portal? <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 shadow-lg rounded-xl">
                                {loginOptions.filter(o => o.href !== '/login' && o.href !== '/login-fintech').map((option) => (
                                    <DropdownMenuItem key={option.href} asChild>
                                        <Link href={option.href} className="flex items-start gap-3 p-3">
                                            <div className="p-2 bg-primary/10 rounded-md mt-1">
                                                <option.icon className="h-5 w-5 text-primary"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{option.label}</p>
                                                <p className="text-xs text-muted-foreground">{option.description}</p>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
