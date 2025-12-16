
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
import { Gavel, Loader2, CheckCircle, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function SolicitudAccesoLegalPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsSubmitted(true);
            setIsProcessing(false);
            toast({
              title: "Solicitud de Acceso Enviada",
              description: "Tu solicitud ha sido enviada al administrador del portal para su revisión."
            });
        }, 1500);
    }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
        <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Solicitud de Acceso al Portal Legal</CardTitle>
            <CardDescription>Completa este formulario para que un administrador evalúe tu solicitud.</CardDescription>
        </CardHeader>
        
        {!isSubmitted ? (
             <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre Completo</Label>
                        <Input id="fullName" placeholder="Ej: Ana Pérez" required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico Corporativo</Label>
                        <Input id="email" type="email" placeholder="ana.perez@kyron.com" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Cargo / Rol</Label>
                        <Input id="role" placeholder="Ej: Abogado Asociado, Asistente Legal" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="justification">Justificación de Acceso</Label>
                        <Textarea id="justification" placeholder="Describe brevemente por qué necesitas acceso al portal..." required/>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Enviar Solicitud
                    </Button>
                </CardFooter>
             </form>
        ) : (
             <CardContent className="p-6 text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="font-semibold">Solicitud Enviada para Revisión</p>
                <p className="text-muted-foreground">Gracias. Un administrador revisará tu solicitud y recibirás una notificación por correo electrónico con los siguientes pasos.</p>
                <Button asChild className="w-full mt-4">
                    <Link href="/login-escritorio-juridico">Volver al Inicio de Sesión</Link>
                </Button>
            </CardContent>
        )}
    </Card>
  );
}
