
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
import { ShieldCheck, Loader2 } from "lucide-react";
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
                window.location.href = "/legal/dashboard-juridico";
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
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Verificación de Segundo Factor</CardTitle>
        <CardDescription>
            Se requiere verificación adicional. Ingrese el código de 6 dígitos de su aplicación autenticadora.
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
            Verificar y Acceder
        </Button>
      </CardContent>
      <CardFooter className="p-6 border-t text-sm">
        <Button asChild variant="link" className="p-0 h-auto w-full">
            <Link href="#">
                No puedo usar mi 2FA en este momento
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
