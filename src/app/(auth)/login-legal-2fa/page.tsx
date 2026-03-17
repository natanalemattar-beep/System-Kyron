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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck, Loader as Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function LoginLegal2faPage() {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const { toast } = useToast();

    const handleVerify = () => {
        setIsVerifying(true);
        // Simulate API call to a Cloud Function to verify the TOTP code
        setTimeout(() => {
            if (code === "123456") { // Mock correct code
                 toast({
                    title: "Acceso Concedido",
                    description: "Verificación de 2FA exitosa. Redirigiendo al portal legal...",
                });
                window.location.href = "/escritorio-juridico";
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
    
  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border rounded-[2rem] shadow-xl overflow-hidden">
      <CardHeader className="text-center p-8 pb-4">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-black tracking-tight">Verificación de 2FA</CardTitle>
        <CardDescription>
            Ingrese el código de 6 dígitos enviado a su dispositivo.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 flex flex-col items-center justify-center space-y-6">
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
        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">(Pista: 123456)</p>

         <Button onClick={handleVerify} disabled={isVerifying || code.length < 6} className="w-full h-12 text-base font-bold rounded-xl btn-3d-primary shadow-lg">
            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verificar y Acceder
        </Button>
      </CardContent>
      <CardFooter className="p-6 border-t text-sm bg-secondary/10">
        <Button asChild variant="link" className="p-0 h-auto w-full text-muted-foreground font-bold">
            <Link href="#">
                ¿Problemas con el código?
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
