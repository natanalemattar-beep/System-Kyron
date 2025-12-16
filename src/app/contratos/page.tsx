
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSignature, PlusCircle, MoreHorizontal, Download, Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/utils";

const initialContracts = [
    { id: "CON-001", cliente: "Tech Solutions LLC", tipo: "Prestación de Servicios", fechaFirma: new Date(2023, 0, 15), fechaVencimiento: new Date(2024, 0, 14), monto: 50000, estado: "Activo" },
    { id: "CON-002", cliente: "Constructora XYZ", tipo: "Contrato de Obra", fechaFirma: new Date(2022, 5, 20), fechaVencimiento: new Date(2024, 5, 19), monto: 250000, estado: "Vencido" },
    { id: "CON-003", cliente: "Innovate Corp", tipo: "Acuerdo de Confidencialidad", fechaFirma: new Date(2024, 6, 1), fechaVencimiento: new Date(2026, 6, 1), monto: 0, estado: "Activo" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Activo: "default",
  Vencido: "destructive",
  Renovado: "secondary",
};

export default function ContratosPage() {
    const [contracts, setContracts] = useState(initialContracts);
    const { toast } = useToast();
    
    const handleAction = (action: string, contractId: string) => {
        toast({
            title: `Acción Realizada`,
            description: `Se ha solicitado la acción '${action}' para el contrato ${contractId}.`,
        });
    };

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <FileSignature className="h-8 w-8" />
                        Gestión de Contratos
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Crea, visualiza y gestiona el ciclo de vida de tus contratos.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2" />
                    Crear Nuevo Contrato
                </Button>
            </header>

            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Repositorio de Contratos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente/Parte</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Fecha Vencimiento</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contracts.map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell className="font-medium">{contract.cliente}</TableCell>
                                    <TableCell>{contract.tipo}</TableCell>
                                    <TableCell>{formatDate(contract.fechaVencimiento)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[contract.estado as keyof typeof statusVariant]}>{contract.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{contract.monto > 0 ? formatCurrency(contract.monto, 'Bs.') : 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleAction('Ver', contract.id)}><Eye className="mr-2 h-4 w-4"/> Ver Contrato</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction('Descargar', contract.id)}><Download className="mr-2 h-4 w-4"/> Descargar PDF</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Eliminar', contract.id)}><Trash2 className="mr-2 h-4 w-4"/> Eliminar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

    