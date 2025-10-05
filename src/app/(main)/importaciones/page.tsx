
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, PlusCircle, FileDown, Eye, CheckCircle, Clock, AlertTriangle, Route } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const importaciones = [
    { id: "IMP-2024-001", fechaSalida: "2024-07-10", fechaLlegadaEst: "2024-08-05", proveedor: "Global Tech Supplies", origen: "China", valorCIF: 25000, estado: "En Tránsito" },
    { id: "IMP-2024-002", fechaSalida: "2024-06-25", fechaLlegadaEst: "2024-07-22", proveedor: "Euro Components", origen: "Alemania", valorCIF: 18000, estado: "En Aduana" },
    { id: "IMP-2024-003", fechaSalida: "2024-06-15", fechaLlegadaEst: "2024-07-10", proveedor: "American Parts Co.", origen: "EE.UU.", valorCIF: 32000, estado: "Completado" },
    { id: "IMP-2024-004", fechaSalida: "2024-07-01", fechaLlegadaEst: "2024-07-25", proveedor: "Brazil Exports", origen: "Brasil", valorCIF: 15000, estado: "Retenido" },
];


const statusInfo: { [key: string]: { icon: React.ElementType, color: string, label: string, variant: "default" | "secondary" | "destructive" | "outline" } } = {
    "En Tránsito": { icon: Route, color: "text-blue-500", label: "En Tránsito", variant: "secondary" },
    "En Aduana": { icon: Clock, color: "text-yellow-500", label: "En Aduana", variant: "outline" },
    "Completado": { icon: CheckCircle, color: "text-green-500", label: "Completado", variant: "default" },
    "Retenido": { icon: AlertTriangle, color: "text-red-500", label: "Retenido", variant: "destructive" },
};

export default function ImportacionesPage() {
    const { toast } = useToast();

    const handleAction = (message: string) => {
        toast({
            title: "Acción Realizada",
            description: message,
        });
    };

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Ship className="h-8 w-8" />
                Gestión de Importaciones
            </h1>
            <p className="text-muted-foreground mt-2">
              Rastrea y gestiona tus procesos de importación y nacionalización.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Registrar Nueva Importación
        </Button>
      </header>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Operaciones de Importación</CardTitle>
            <CardDescription>
                Listado de todas las importaciones en curso y completadas.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Proveedor (Origen)</TableHead>
                        <TableHead>Llegada Estimada</TableHead>
                        <TableHead className="text-right">Valor CIF</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {importaciones.map((imp) => {
                        const status = statusInfo[imp.estado];
                        return (
                            <TableRow key={imp.id} className={imp.estado === 'Retenido' ? 'bg-destructive/10' : ''}>
                                <TableCell className="font-mono">{imp.id}</TableCell>
                                <TableCell className="font-medium">
                                    {imp.proveedor}
                                    <p className="text-xs text-muted-foreground">{imp.origen}</p>
                                </TableCell>
                                <TableCell>{formatDate(imp.fechaLlegadaEst)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(imp.valorCIF, 'USD')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={status.variant} className="flex items-center justify-center gap-2">
                                        <status.icon className={`h-4 w-4 ${status.color}`} />
                                        <span>{status.label}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=importacion-${imp.id}`} alt={`QR for ${imp.id}`} width={24} height={24} className="inline-block mr-2" />
                                    <Button variant="ghost" size="icon" title="Ver Detalles">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Rastrear Envío">
                                        <Route className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Gestionar Documentos de Aduana">
                                        <FileDown className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

    </div>
  );
}
