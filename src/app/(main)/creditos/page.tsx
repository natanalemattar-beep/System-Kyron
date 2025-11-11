
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, PlusCircle, Check, X, Filter, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/utils";

type Credito = {
    id: number;
    cliente: string;
    monto: number;
    fechaSolicitud: string;
    estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
    plazo: string;
};

const initialCreditos: Credito[] = [
    { id: 1, cliente: "Tech Solutions LLC", monto: 5000, fechaSolicitud: "2024-07-20", estado: "Aprobado", plazo: "90 días" },
    { id: 2, cliente: "Innovate Corp", monto: 12000, fechaSolicitud: "2024-07-18", estado: "Pendiente", plazo: "120 días" },
    { id: 3, cliente: "Marketing Pro", monto: 3500, fechaSolicitud: "2024-07-15", estado: "Rechazado", plazo: "60 días" },
];

const kpis = [
    { title: "Créditos Otorgados (Mes)", value: formatCurrency(25000, 'Bs.') },
    { title: "Créditos en Mora", value: "3" },
    { title: "Tasa de Aprobación", value: "85%" },
];


const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Pendiente: "secondary",
  Aprobado: "default",
  Rechazado: "destructive",
};

export default function CreditosPage() {
    const { toast } = useToast();
    const [creditos, setCreditos] = useState(initialCreditos);

    const handleUpdateStatus = (id: number, newStatus: 'Aprobado' | 'Rechazado') => {
        setCreditos(prev => 
            prev.map(c => c.id === id ? { ...c, estado: newStatus } : c)
        );
        toast({
            title: "Estado Actualizado",
            description: `El crédito #${id} ha sido marcado como ${newStatus}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <CreditCard className="h-8 w-8" />
                Gestión de Créditos
            </h1>
            <p className="text-muted-foreground mt-2">
              Analiza, aprueba y gestiona las solicitudes de crédito de tus clientes.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Nueva Solicitud de Crédito
        </Button>
      </header>

       <div className="grid gap-6 md:grid-cols-3 mb-8">
        {kpis.map((kpi, index) => (
             <Card key={index} className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                </CardContent>
            </Card>
        ))}
       </div>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Solicitudes de Crédito</CardTitle>
            <CardDescription>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4"/> Filtrar por Estado
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Todos</DropdownMenuItem>
                        <DropdownMenuItem>Pendiente</DropdownMenuItem>
                        <DropdownMenuItem>Aprobado</DropdownMenuItem>
                        <DropdownMenuItem>Rechazado</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha Solicitud</TableHead>
                        <TableHead>Monto Solicitado</TableHead>
                        <TableHead>Plazo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {creditos.map((credito) => (
                        <TableRow key={credito.id}>
                            <TableCell className="font-medium">{credito.cliente}</TableCell>
                            <TableCell>{formatDate(credito.fechaSolicitud)}</TableCell>
                            <TableCell>{formatCurrency(credito.monto, 'Bs.')}</TableCell>
                            <TableCell>{credito.plazo}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[credito.estado]}>{credito.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {credito.estado === 'Pendiente' && (
                                    <>
                                        <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600" onClick={() => handleUpdateStatus(credito.id, 'Aprobado')}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" className="text-destructive hover:text-red-600" onClick={() => handleUpdateStatus(credito.id, 'Rechazado')}>
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
