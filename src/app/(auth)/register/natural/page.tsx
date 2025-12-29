
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";


export default function RegisterNaturalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate API call for demo purposes
        setTimeout(() => {
            const formData = new FormData(event.currentTarget);
            const email = formData.get('email');
            
            // Simulate common errors for demonstration
            if (email === "used@test.com") {
                setError("Este correo electrónico ya está en uso. Intenta iniciar sesión.");
                setIsLoading(false);
                return;
            }

            toast({
                title: "¡Registro Exitoso!",
                description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
            });
            setIsLoading(false);
            router.push("/login");
        }, 1500);
    };

    return (
         <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro Personal</CardTitle>
                <CardDescription>Crea tu cuenta para gestionar tus trámites personales.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
                <CardContent className="p-6 space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nombres y Apellidos</Label>
                        <Input id="fullName" name="fullName" placeholder="Ej: Juan Pérez" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" name="email" type="email" placeholder="tu@correo.com" required />
                    </div>
                     <div className="relative space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" name="password" type={passwordVisible ? "text" : "password"} placeholder="Mínimo 6 caracteres" required />
                         <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                            {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-2 flex flex-col gap-4">
                     <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        Crear Cuenta
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
