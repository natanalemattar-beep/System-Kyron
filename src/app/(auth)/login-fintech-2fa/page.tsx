
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


export default function LoginFintech2faPage() {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const { toast } = useToast();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleVerify = () => {
        setIsVerifying(true);
        // Simulate API call
        setTimeout(() => {
            if (code === "123456") { // Mock correct code
                 toast({
                    title: "Acceso Concedido",
                    description: "Verificación exitosa. Redirigiendo al dashboard...",
                });
                window.location.href = "/contabilidad";
            } else {
                toast({
                    variant: "destructive",
                    title: "Código Inválido",
                    description: "El código de verificación es incorrecto. Inténtalo de nuevo.",
                });
            }
            setIsVerifying(false);
        }, 1000);
    };
    
    const handleResend = () => {
        if (countdown === 0) {
            toast({
                title: "Código Reenviado",
                description: "Se ha enviado un nuevo código a tus dispositivos.",
            });
            setCountdown(30);
        }
    }


  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Verificación de Segundo Factor</CardTitle>
        <CardDescription>
            Hemos enviado un código de 6 dígitos a tu aplicación autenticadora y al teléfono terminado en ****4567.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>

         <Button onClick={handleVerify} disabled={isVerifying || code.length < 6} className="w-full h-11 text-base">
            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verificar
        </Button>
      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
        <Button onClick={handleResend} variant="link" disabled={countdown > 0} className="text-muted-foreground p-0 h-auto">
            {countdown > 0 ? `Reenviar código en ${countdown}s` : "Reenviar código"}
        </Button>
         <Button asChild variant="link" className="p-0 h-auto">
            <Link href="#">
                ¿No recibiste el código? Usar método de respaldo
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
