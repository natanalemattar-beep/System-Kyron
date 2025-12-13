
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Filter, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

type Notificacion = {
    id: number;
    remitente: string;
    tipo: "Alerta de Cumplimiento" | "Solicitud de Aprobación" | "Análisis Financiero";
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
        descripcion: "La Póliza de 'Flota de Vehículos' ha vencido. Se requiere acción inmediata para renovar la cobertura y evitar riesgos operativos. Por favor, contacte a su corredor de seguros.",
    },
    {
        id: 2,
        remitente: "Jorge Vivas (Ventas)",
        tipo: "Solicitud de Aprobación",
        fecha: "Hace 1 hora",
        estado: "No Leído",
        descripcion: "Solicitud de aprobación para descuento del 15% en factura FAC-0892 para el cliente 'Innovate Corp'. El cliente tiene un historial de pagos excelente y un alto volumen de compra.",
    },
    {
        id: 3,
        remitente: "Contabilidad IA",
        tipo: "Análisis Financiero",
        fecha: "Hace 3 horas",
        estado: "Leído",
        descripcion: "El reporte de rentabilidad del Q2 ha sido generado exitosamente. Se observa un incremento del 5% en el margen neto en comparación con el Q1, impulsado por la optimización de costos en la categoría de suministros.",
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

    const handleApproval = (id: number, action: 'Aprobado' | 'Rechazado') => {
        handleMarkAsRead(id);
        toast({
            title: `Solicitud ${action}`,
            description: `La solicitud de descuento ha sido marcada como ${action.toLowerCase()}.`,
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

      <Card>
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
                        <Dialog key={notificacion.id}>
                            <DialogTrigger asChild>
                                <TableRow className={`cursor-pointer hover:bg-muted/50 ${notificacion.estado === 'No Leído' ? 'bg-primary/5' : ''}`}>
                                    <TableCell className="font-medium">{notificacion.remitente}</TableCell>
                                    <TableCell>{notificacion.tipo}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{notificacion.descripcion}</TableCell>
                                    <TableCell>{notificacion.fecha}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[notificacion.estado]}>{notificacion.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {notificacion.estado === 'No Leído' && (
                                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notificacion.id); }}>
                                                <Check className="mr-2 h-4 w-4" />
                                                Marcar como leído
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-xl">{notificacion.tipo}</DialogTitle>
                                    <DialogDescription>
                                        <p><strong>De:</strong> {notificacion.remitente}</p>
                                        <p><strong>Fecha:</strong> {notificacion.fecha}</p>
                                        <p><strong>Estado:</strong> <Badge variant={statusVariant[notificacion.estado]}>{notificacion.estado}</Badge></p>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 text-muted-foreground border-t border-b">
                                    <p className="font-semibold text-foreground mb-2">Detalles:</p>
                                    <p>{notificacion.descripcion}</p>
                                </div>
                                <DialogFooter>
                                     {notificacion.tipo === 'Solicitud de Aprobación' && notificacion.estado === 'No Leído' && (
                                        <div className="flex w-full justify-end gap-2">
                                            <Button variant="destructive" onClick={() => handleApproval(notificacion.id, 'Rechazado')}><X className="mr-2 h-4 w-4"/> Rechazar</Button>
                                            <Button variant="default" onClick={() => handleApproval(notificacion.id, 'Aprobado')}><Check className="mr-2 h-4 w-4"/> Aprobar</Button>
                                        </div>
                                     )}
                                     {notificacion.tipo !== 'Solicitud de Aprobación' && notificacion.estado === 'No Leído' && (
                                        <Button variant="outline" onClick={() => handleMarkAsRead(notificacion.id)}>Marcar como Leído</Button>
                                    )}
                                    <DialogTrigger asChild>
                                        <Button>Cerrar</Button>
                                    </DialogTrigger>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
