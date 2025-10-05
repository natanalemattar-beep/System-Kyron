
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, CheckCircle, Clock, AlertTriangle, Mail, MessageSquare, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function RegistroRifPage() {
  const { toast } = useToast();
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
        icon: AlertTriangle,
        color: "text-red-500",
        badge: "destructive",
        description: "Tu solicitud de RIF fue rechazada. Por favor, revisa los documentos.",
    },
  };

  const currentStatus = statusInfo[rifStatus as keyof typeof statusInfo];

  const handleRecovery = () => {
    toast({
        title: "Solicitud de Recuperación Enviada",
        description: "Se ha enviado una notificación por SMS y Correo Electrónico a la administración para aprobar el reseteo de la clave.",
        action: <CheckCircle className="text-green-500" />
    })
  }


  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileEdit className="h-8 w-8" />
            Registro Parental: Autorización Fiscal y Financiera para Menores
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona el RIF y las autorizaciones para que los menores puedan manejar instrumentos financieros, cumpliendo con las normativas de impuestos.
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
                    <span className="font-semibold">Cliente</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Número de RIF:</span>
                    <span className="font-semibold">J-12345678-9</span>
                </div>
                 <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">cedula del niño, niña,adolecentes</span>
                    <span className="font-semibold font-mono">123456789-ABC</span>
                </div>
                 <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Fecha de Emisión:</span>
                    <span className="font-semibold">01/01/2023</span>
                </div>
                 <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-muted-foreground">Fecha de Vencimiento:</span>
                    <span className="font-semibold">31/12/2025</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col items-start pt-6 border-t">
            {rifStatus === "Verificado" ? (
                <Button className="w-full">Descargar Comprobante Digital</Button>
            ) : (
                <Button className="w-full" disabled>Actualizar Información (No disponible)</Button>
            )}
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-muted-foreground mx-auto mt-4">
                        ¿Olvidaste tu contraseña?
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Recuperación por Preguntas de Seguridad del SENIAT</DialogTitle>
                        <DialogDescription>
                           Responde a las preguntas de seguridad con la información exacta de tus declaraciones para verificar tu identidad.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="q1">Fecha de la última declaración de ISLR (AAAA)</Label>
                            <Input id="q1" type="number" placeholder="Ej: 2023" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="q2">Monto del impuesto pagado en la última declaración de IVA</Label>
                            <Input id="q2" type="number" placeholder="Ej: 15750.50" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancelar</Button>
                        <DialogTrigger asChild>
                         <Button onClick={handleRecovery}>
                            Verificar y Notificar a Administración
                        </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>

       <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm mt-8">
        <CardHeader>
          <CardTitle>¿Quiénes deben tener RIF?</CardTitle>
          <CardDescription>
            Información sobre el procedimiento para la inscripción de menores en el RIF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Puntos Clave para el Registro de Menores</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>
                        <strong>Obligatoriedad:</strong> Toda persona que realice operaciones que incurran en pago de impuestos, incluidos menores de edad autorizados para manejar instrumentos financieros, debe estar inscrita.
                    </li>
                    <li>
                        <strong>Edad Mínima:</strong> Un menor de edad puede obtener un RIF a partir de los 9 años, siempre que posea una Cédula de Identidad.
                    </li>
                    <li>
                        <strong>Vinculación Parental:</strong> El registro se realiza vinculando la Cédula de Identidad del menor a la del padre, madre o representante legal.
                    </li>
                    <li>
                        <strong>Declaración de Pensión Alimentaria:</strong> Si el menor recibe pensión alimentaria, este monto debe ser declarado en el registro. Esto facilita la fiscalización del SENIAT, ya que los padres deben presentar facturas de gastos ante los tribunales de protección correspondientes.
                    </li>
                </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
         <CardFooter>
            <Button variant="outline" className="w-full">
                Iniciar Trámite de Registro para Menor
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
