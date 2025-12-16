
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
import { KeyRound, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Step = 1 | 2 | 3 | 4;

export default function RecoverFintechPage() {
    const [step, setStep] = useState<Step>(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setStep(2);
            setIsProcessing(false);
            toast({ title: "Código Enviado", description: "Hemos enviado un código de verificación por SMS." });
        }, 1000);
    }
    
    const handleStep2 = () => {
         setIsProcessing(true);
        setTimeout(() => {
            setStep(3);
            setIsProcessing(false);
        }, 1000);
    }
    
    const handleStep3 = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setStep(4);
            setIsProcessing(false);
            toast({ title: "Verificación Exitosa", description: "Hemos enviado un enlace para restablecer tu contraseña a tu correo." });
        }, 1000);
    }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
        <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Recuperación de Cuenta FinTech</CardTitle>
            <CardDescription>Sigue los pasos para recuperar el acceso a tu cuenta de forma segura.</CardDescription>
        </CardHeader>
        
        {step === 1 && (
             <form onSubmit={handleStep1}>
                <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-center text-muted-foreground">Paso 1: Verificación de Identidad</p>
                    <div className="space-y-2">
                        <Label htmlFor="cedula">Cédula de Identidad o RIF</Label>
                        <Input id="cedula" placeholder="Ej: V-12345678" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="telefono">Número de Teléfono Registrado</Label>
                        <Input id="telefono" type="tel" placeholder="Ej: 0412-1234567" required/>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Enviar Código de Verificación por SMS
                    </Button>
                </CardFooter>
             </form>
        )}

        {step === 2 && (
             <CardContent className="p-6 space-y-4 flex flex-col items-center">
                <p className="text-sm text-center text-muted-foreground">Paso 2: Código SMS</p>
                <Label>Introduce el código recibido en tu teléfono</Label>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                 <Button onClick={handleStep2} className="w-full mt-4" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Verificar Código
                </Button>
            </CardContent>
        )}
        
         {step === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); handleStep3(); }}>
                <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-center text-muted-foreground">Paso 3: Pregunta de Seguridad</p>
                    <div className="space-y-2">
                        <Label htmlFor="security-q">¿Cuál es el nombre de tu primera mascota?</Label>
                        <Input id="security-q" required/>
                    </div>
                </CardContent>
                 <CardFooter className="p-6 pt-0">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Verificar y Enviar Enlace de Recuperación
                    </Button>
                </CardFooter>
            </form>
        )}

         {step === 4 && (
            <CardContent className="p-6 text-center space-y-4">
                <p className="text-sm text-muted-foreground">Paso 4: Correo Enviado</p>
                <p>Revisa tu bandeja de entrada. Te hemos enviado un correo electrónico con un enlace seguro para que puedas restablecer tu contraseña.</p>
                <Button asChild className="w-full mt-4">
                    <Link href="/login-fintech">Volver al Inicio de Sesión</Link>
                </Button>
            </CardContent>
        )}

    </Card>
  );
}
