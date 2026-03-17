
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
import { UserPlus, Loader as Loader2, CircleCheck as CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Simulate user data that would come from a pre-authentication step (e.g., SSO)
const preAuthenticatedUser = {
    name: "Maria T. Hernandez",
    email: "mhernandez@kyron.com"
};

export default function SolicitudAccesoLegalPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState("");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const privacyCheckbox = form.querySelector<HTMLInputElement>('#privacy-policy');
        if (!privacyCheckbox?.checked) {
            toast({
                variant: "destructive",
                title: "Error de Validación",
                description: "Debe aceptar la política de confidencialidad para continuar.",
            });
            return;
        }

        setIsProcessing(true);
        // Simulate backend submission
        setTimeout(() => {
            const newTicketId = `LEG-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
            setTicketId(newTicketId);
            setIsSubmitted(true);
            setIsProcessing(false);
            toast({
              title: "Solicitud de Acceso Enviada",
              description: `Tu solicitud ha sido registrada con el ticket ${newTicketId}.`
            });
        }, 1500);
    }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-md border">
        {!isSubmitted ? (
             <>
                <CardHeader className="text-center">
                    <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                      <UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Solicitud de Acceso al Portal Legal</CardTitle>
                    <CardDescription>Completa este formulario para que un administrador evalúe tu solicitud de acceso.</CardDescription>
                </CardHeader>
                 <form onSubmit={handleSubmit}>
                    <CardContent className="p-6 space-y-6">
                        <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                            <h4 className="font-semibold text-sm">Información del Solicitante (Verificada)</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nombre Completo</Label>
                                    <Input id="fullName" value={preAuthenticatedUser.name} readOnly disabled />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico Corporativo</Label>
                                    <Input id="email" type="email" value={preAuthenticatedUser.email} readOnly disabled />
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rol-solicitado">Rol Solicitado</Label>
                                <Select required>
                                    <SelectTrigger id="rol-solicitado">
                                        <SelectValue placeholder="Selecciona un rol..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paralegal">Paralegal</SelectItem>
                                        <SelectItem value="abogado_asociado">Abogado Asociado</SelectItem>
                                        <SelectItem value="socio">Socio</SelectItem>
                                        <SelectItem value="consultor_externo">Consultor Externo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                              <div className="space-y-2">
                                <Label htmlFor="caso-asociado">Caso / Expediente Asociado (Opcional)</Label>
                                <Input id="caso-asociado" placeholder="Ej: EXP-2024-0123" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="justification">Justificación Detallada del Acceso</Label>
                            <Textarea id="justification" placeholder="Describe brevemente por qué necesitas acceso, los casos que manejarás o tus responsabilidades..." required/>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-4">
                            <Checkbox id="privacy-policy" required />
                            <Label htmlFor="privacy-policy" className="text-sm font-normal">
                                He leído y acepto la <Link href="/politica-privacidad" className="underline hover:text-primary">política de confidencialidad de información legal sensible</Link>.
                            </Label>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <Button type="submit" className="w-full h-11 text-base" disabled={isProcessing}>
                            {isProcessing ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Enviando...</>
                            ) : (
                                "Enviar Solicitud de Acceso"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </>
        ) : (
            <CardContent className="p-10 text-center flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Solicitud Recibida</h2>
                <p className="text-muted-foreground">Gracias, {preAuthenticatedUser.name}. Tu solicitud ha sido enviada para revisión.</p>
                <div className="p-4 bg-secondary/50 rounded-lg w-full">
                     <p className="text-sm">Tu número de ticket es:</p>
                    <p className="text-2xl font-mono font-bold text-primary">{ticketId}</p>
                </div>
                <p className="text-sm text-muted-foreground pt-2">Un administrador se pondrá en contacto contigo o recibirás una notificación por correo en un plazo de 24-48 horas hábiles con los siguientes pasos.</p>
                <Button asChild className="w-full max-w-xs mt-6">
                    <Link href="/">Volver a la Página Principal</Link>
                </Button>
            </CardContent>
        )}
         <CardFooter className="p-6 border-t text-sm justify-center">
            <p className="text-muted-foreground">¿Ya tienes una cuenta? <Link href="/login-escritorio-juridico" className="font-medium text-primary hover:underline">Inicia sesión aquí</Link></p>
        </CardFooter>
    </Card>
  );
}
