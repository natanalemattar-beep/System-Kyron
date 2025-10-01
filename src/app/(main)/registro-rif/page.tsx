
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RegistroRifPage() {
  const rifStatus = "Verificado"; // Can be "Verificado", "En Proceso", "Rechazado"

  const statusInfo = {
    Verificado: {
      icon: CheckCircle,
      color: "text-green-500",
      badge: "default",
      description: "Tu RIF ha sido verificado y está activo.",
    },
    "En Proceso": {
      icon: Clock,
      color: "text-yellow-500",
      badge: "secondary",
      description: "Tu solicitud de RIF está siendo procesada. Te notificaremos cualquier actualización.",
    },
    "Rechazado": {
        icon: CheckCircle,
        color: "text-red-500",
        badge: "destructive",
        description: "Tu RIF ha sido verificado y está activo.",
    },
  };

  const currentStatus = statusInfo[rifStatus as keyof typeof statusInfo];


  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileEdit className="h-8 w-8" />
            Registro de RIF
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona el estado de tu Registro de Información Fiscal (RIF).
        </p>
      </header>
      <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <currentStatus.icon className={`h-6 w-6 ${currentStatus.color}`} />
                <span>Estado del RIF:</span>
            </div>
            <Badge variant={currentStatus.badge as any}>{rifStatus}</Badge>
          </CardTitle>
          <CardDescription>{currentStatus.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Razón Social:</span>
                    <span className="font-semibold">Empresa S.A.</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Número de RIF:</span>
                    <span className="font-semibold">J-12345678-9</span>
                </div>
                 <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Fecha de Vencimiento:</span>
                    <span className="font-semibold">31/12/2025</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            {rifStatus === "Verificado" ? (
                <Button className="w-full">Descargar Comprobante Digital</Button>
            ) : (
                <Button className="w-full" disabled>Actualizar Información (No disponible)</Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
