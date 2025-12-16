
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function RecoverLegalPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsSubmitted(true);
            setIsProcessing(false);
            toast({
              title: "Solicitud de Recuperación Enviada",
              description: "Se ha notificado a la administración del departamento legal."
            });
        }, 1500);
    }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
        <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Recuperación de Acceso Legal</CardTitle>
            <CardDescription>Inicia el proceso para restablecer tus credenciales de forma segura.</CardDescription>
        </CardHeader>
        
        {!isSubmitted ? (
             <form onSubmit={handleStep1}>
                <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-center text-muted-foreground">Paso 1: Identificación</p>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico Corporativo</Label>
                        <Input id="email" type="email" placeholder="legal.user@kyron.com" required/>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Notificar a Administración
                    </Button>
                </CardFooter>
             </form>
        ) : (
            <CardContent className="p-6 text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="font-semibold">Solicitud Enviada</p>
                <p className="text-muted-foreground">Un administrador del departamento legal ha sido notificado. Se pondrán en contacto contigo para verificar tu identidad y restablecer tu acceso de forma segura.</p>
                <Button asChild className="w-full mt-4">
                    <Link href="/login-escritorio-juridico">Volver al Inicio de Sesión</Link>
                </Button>
            </CardContent>
        )}
    </Card>
  );
}
