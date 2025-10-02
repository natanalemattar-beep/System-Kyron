
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, PlusCircle, CheckCircle, Clock } from "lucide-react";

const autorizaciones = [
    { id: "AUT-SEN-001", ente: "SENIAT", tipo: "Autorización para Emisión de Facturas", estado: "Aprobada", fecha: "10/01/2024" },
    { id: "AUT-INS-002", ente: "INPSASEL", tipo: "Aprobación de Programa de Seguridad", estado: "Aprobada", fecha: "05/03/2024" },
    { id: "AUT-MIN-003", ente: "MINEC", tipo: "Autorización de Impacto Ambiental", estado: "En Revisión", fecha: "20/06/2024" },
];

const statusInfo = {
    Aprobada: { icon: CheckCircle, color: "text-green-500", label: "Aprobada" },
    "En Revisión": { icon: Clock, color: "text-yellow-500", label: "En Revisión" },
};

export default function AutorizacionesPage() {
  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="h-8 w-8" />
                Autorizaciones Oficiales
            </h1>
            <p className="text-muted-foreground mt-2">
                Gestiona las autorizaciones requeridas por los entes gubernamentales.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Nueva Solicitud
        </Button>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {autorizaciones.map(auth => {
            const status = statusInfo[auth.estado as keyof typeof statusInfo];
            return (
                <Card key={auth.id} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>{auth.ente}</span>
                            <status.icon className={`h-5 w-5 ${status.color}`} />
                        </CardTitle>
                        <CardDescription>{auth.tipo}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Nro. de Solicitud:</span>
                            <span className="font-mono">{auth.id}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Fecha:</span>
                            <span>{auth.fecha}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Estado:</span>
                            <span className={`font-semibold ${status.color}`}>{status.label}</span>
                        </div>
                         <Button variant="outline" className="w-full mt-4">Ver Detalles</Button>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
