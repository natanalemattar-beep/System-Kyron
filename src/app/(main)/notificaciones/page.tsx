
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileWarning, Send, CheckCircle, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const notificacionesEnviadas = [
    {
        id: 1,
        titulo: "Notificación de Inasistencia",
        descripcion: "No podré asistir el día 25/07 por una cita médica impostergable.",
        fecha: "Hace 1 hora",
        estado: "Enviado",
        icon: FileWarning,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    {
        id: 2,
        titulo: "Solicitud de Día Libre",
        descripcion: "Solicito el día 05/08 libre por asuntos personales.",
        fecha: "Hace 2 días",
        estado: "Visto por RR.HH.",
        icon: Clock,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        id: 3,
        titulo: "Recordatorio de Vacaciones",
        descripcion: "Mis vacaciones programadas inician el 15/08.",
        fecha: "Hace 1 semana",
        estado: "Aprobado",
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-500/10",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Enviado: "secondary",
  "Visto por RR.HH.": "outline",
  Aprobado: "default",
};

export default function NotificacionesPage() {
    const { toast } = useToast();

    const handleSendNotification = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Notificación Enviada a RR.HH.",
            description: "Tu comunicado ha sido registrado y enviado al departamento de Recursos Humanos.",
            action: <CheckCircle className="text-green-500" />
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notificaciones a RR.HH.
        </h1>
        <p className="text-muted-foreground mt-2">
          Comunica inasistencias, permisos o recordatorios al departamento de Recursos Humanos.
        </p>
      </header>

       <Card className="mb-8 bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Enviar Nuevo Comunicado</CardTitle>
            <CardDescription>
                Utiliza este formulario para notificar formalmente al departamento de RR.HH.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSendNotification} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="notification-type">Tipo de Notificación</Label>
                        <Select required>
                            <SelectTrigger id="notification-type">
                                <SelectValue placeholder="Selecciona un tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inasistencia">Inasistencia</SelectItem>
                                <SelectItem value="permiso">Solicitud de Permiso / Día Libre</SelectItem>
                                <SelectItem value="vacaciones">Recordatorio de Vacaciones</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea 
                        id="description" 
                        placeholder="Ej: No podré asistir mañana por una cita médica..."
                        required
                    />
                 </div>
                 <Button type="submit" className="w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4"/>
                    Enviar a RR.HH.
                 </Button>
            </form>
        </CardContent>
       </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Historial de Comunicados Enviados</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
            {notificacionesEnviadas.length > 0 ? (
                 <ul className="space-y-4">
                    {notificacionesEnviadas.map((notificacion) => (
                        <li key={notificacion.id} className={`flex items-center gap-4 p-4 rounded-lg ${notificacion.bgColor}`}>
                            <notificacion.icon className={`h-6 w-6 mt-1 shrink-0 ${notificacion.iconColor}`} />
                            <div className="flex-1">
                                <h3 className="font-semibold">{notificacion.titulo}</h3>
                                <p className="text-sm text-muted-foreground">{notificacion.descripcion}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notificacion.fecha}</p>
                            </div>
                            <Badge variant={statusVariant[notificacion.estado]}>{notificacion.estado}</Badge>
                        </li>
                    ))}
                 </ul>
            ) : (
                <div className="pt-6 flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 min-h-[200px]">
                    <Bell className="w-16 h-16"/>
                    <p className="text-lg font-medium">No has enviado notificaciones</p>
                    <p className="text-sm">Utiliza el formulario de arriba para enviar tu primer comunicado.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
