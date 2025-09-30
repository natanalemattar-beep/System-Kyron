
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificacionesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
        <p className="text-muted-foreground">
          Aquí verás todas tus alertas y notificaciones.
        </p>
      </header>
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 min-h-[300px]">
            <Bell className="w-16 h-16"/>
            <p className="text-lg font-medium">No tienes notificaciones nuevas</p>
            <p className="text-sm">Vuelve más tarde para ver si hay actualizaciones.</p>
        </CardContent>
      </Card>
    </div>
  );
}
