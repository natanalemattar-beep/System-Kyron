
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notificacion = {
    id: number;
    remitente: string;
    tipo: string;
    fecha: string;
    estado: 'No Leído' | 'Leído';
    descripcion: string;
};

const initialNotificaciones: Notificacion[] = [
    {
        id: 1,
        remitente: "Sistema",
        tipo: "Alerta de Cumplimiento",
        fecha: "Hace 5 minutos",
        estado: "No Leído",
        descripcion: "La Póliza de 'Flota de Vehículos' ha vencido. Se requiere acción inmediata.",
    },
    {
        id: 2,
        remitente: "Jorge Vivas (Ventas)",
        tipo: "Solicitud de Aprobación",
        fecha: "Hace 1 hora",
        estado: "No Leído",
        descripcion: "Solicitud de aprobación para descuento del 15% en factura FAC-0892.",
    },
    {
        id: 3,
        remitente: "Contabilidad IA",
        tipo: "Análisis Financiero",
        fecha: "Hace 3 horas",
        estado: "Leído",
        descripcion: "El reporte de rentabilidad del Q2 ha sido generado exitosamente.",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" } = {
  "No Leído": "secondary",
  "Leído": "default",
};

export default function NotificacionesPage() {
    const { toast } = useToast();
    const [notificaciones, setNotificaciones] = useState(initialNotificaciones);

    const handleMarkAsRead = (id: number) => {
        setNotificaciones(prev => 
            prev.map(n => n.id === id ? { ...n, estado: 'Leído' } : n)
        );
        toast({
            title: "Notificación Leída",
            description: `La notificación #${id} ha sido marcada como leída.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bell className="h-8 w-8" />
                Centro de Notificaciones
            </h1>
            <p className="text-muted-foreground mt-2">
              Revisa todas las alertas y comunicados importantes del sistema.
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Filter className="mr-2" />
                    Filtrar
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Todas</DropdownMenuItem>
                <DropdownMenuItem>No Leídas</DropdownMenuItem>
                <DropdownMenuItem>Leídas</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Bandeja de Entrada</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Remitente</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {notificaciones.map((notificacion) => (
                        <TableRow key={notificacion.id} className={notificacion.estado === 'No Leído' ? 'bg-primary/5' : ''}>
                            <TableCell className="font-medium">{notificacion.remitente}</TableCell>
                            <TableCell>{notificacion.tipo}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{notificacion.descripcion}</TableCell>
                            <TableCell>{notificacion.fecha}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[notificacion.estado]}>{notificacion.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {notificacion.estado === 'No Leído' && (
                                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notificacion.id)}>
                                        <Check className="mr-2 h-4 w-4" />
                                        Marcar como leído
                                    </Button>
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
