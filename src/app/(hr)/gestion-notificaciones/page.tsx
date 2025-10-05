
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, FileWarning, Check, X, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notificacionesRecibidas = [
    {
        id: 1,
        empleado: "Juan Pérez",
        tipo: "Inasistencia",
        fecha: "Hace 1 hora",
        estado: "Pendiente",
        descripcion: "No podré asistir el día 25/07 por una cita médica impostergable.",
    },
    {
        id: 2,
        empleado: "Ana García",
        tipo: "Solicitud de Permiso",
        fecha: "Hace 2 días",
        estado: "Aprobado",
        descripcion: "Solicito el día 05/08 libre por asuntos personales.",
    },
    {
        id: 3,
        empleado: "Luis Martínez",
        tipo: "Recordatorio de Vacaciones",
        fecha: "Hace 1 semana",
        estado: "Visto",
        descripcion: "Mis vacaciones programadas inician el 15/08.",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Pendiente: "secondary",
  Aprobado: "default",
  Rechazado: "destructive",
  Visto: "outline",
};

export default function GestionNotificacionesPage() {
    const { toast } = useToast();

    const handleUpdateStatus = (id: number, newStatus: string) => {
        toast({
            title: "Estado Actualizado",
            description: `La notificación #${id} ha sido marcada como ${newStatus}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BellRing className="h-8 w-8" />
                Gestión de Notificaciones
            </h1>
            <p className="text-muted-foreground mt-2">
              Revisa, aprueba o rechaza los comunicados enviados por los empleados.
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Filter className="mr-2" />
                    Filtrar por Estado
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Pendiente</DropdownMenuItem>
                <DropdownMenuItem>Aprobado</DropdownMenuItem>
                <DropdownMenuItem>Rechazado</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Bandeja de Entrada de Comunicados</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {notificacionesRecibidas.map((notificacion) => (
                        <TableRow key={notificacion.id}>
                            <TableCell className="font-medium">{notificacion.empleado}</TableCell>
                            <TableCell>{notificacion.tipo}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{notificacion.descripcion}</TableCell>
                            <TableCell>{notificacion.fecha}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[notificacion.estado]}>{notificacion.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {notificacion.estado === 'Pendiente' && (
                                    <>
                                        <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600" onClick={() => handleUpdateStatus(notificacion.id, 'Aprobado')}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" className="text-destructive hover:text-red-600" onClick={() => handleUpdateStatus(notificacion.id, 'Rechazado')}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
