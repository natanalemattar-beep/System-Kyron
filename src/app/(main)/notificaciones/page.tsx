
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Eye, FileWarning, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const notificaciones = [
    {
        id: 1,
        titulo: "Multa pendiente de pago",
        descripcion: "Tiene una multa de tránsito por Bs. 500.000 que vence el 30/08/2024.",
        fecha: "Hace 2 días",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    {
        id: 2,
        titulo: "Solicitud de Acta de Nacimiento Aprobada",
        descripcion: "Su solicitud Nro. PN-2024-001 ha sido aprobada y está lista para descargar.",
        fecha: "Hace 1 semana",
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        id: 3,
        titulo: "Recordatorio: Solicitar Declaración de ISLR",
        descripcion: "Recuerde solicitar a los empleados no declarantes su información de ISLR para el próximo cierre.",
        fecha: "Hace 3 días",
        icon: FileWarning,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
    }
];

export default function NotificacionesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
        <p className="text-muted-foreground">
          Aquí verás todas tus alertas y notificaciones.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
            {notificaciones.length > 0 ? (
                 <ul className="space-y-4">
                    {notificaciones.map((notificacion) => (
                        <li key={notificacion.id} className={`flex items-start gap-4 p-4 rounded-lg ${notificacion.bgColor}`}>
                            <notificacion.icon className={`h-6 w-6 mt-1 ${notificacion.iconColor}`} />
                            <div className="flex-1">
                                <h3 className="font-semibold">{notificacion.titulo}</h3>
                                <p className="text-sm text-muted-foreground">{notificacion.descripcion}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notificacion.fecha}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Eye className="h-5 w-5" />
                            </Button>
                        </li>
                    ))}
                 </ul>
            ) : (
                <div className="pt-6 flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 min-h-[300px]">
                    <Bell className="w-16 h-16"/>
                    <p className="text-lg font-medium">No tienes notificaciones nuevas</p>
                    <p className="text-sm">Vuelve más tarde para ver si hay actualizaciones.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
