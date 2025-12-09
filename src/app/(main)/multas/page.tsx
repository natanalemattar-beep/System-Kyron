
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CreditCard, Eye, QrCode } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Multa = {
  id: string;
  ente: string;
  motivo: string;
  fecha: string;
  monto: number;
  estado: "Pendiente" | "Pagada";
};

const multas: Multa[] = [
    { id: "MUL-001", ente: "SENIAT", motivo: "Retraso en declaración de IVA", fecha: "05/07/2024", monto: 45000, estado: "Pendiente" },
    { id: "MUL-002", ente: "IVSS", motivo: "Inconsistencia en nómina", fecha: "20/06/2024", monto: 15000, estado: "Pagada" },
    { id: "MUL-003", ente: "Alcaldía de Caracas", motivo: "Publicidad exterior no autorizada", fecha: "10/05/2024", monto: 25000, estado: "Pagada" },
    { id: "MUL-004", ente: "CONATEL", motivo: "Uso de frecuencia no autorizada", fecha: "22/07/2024", monto: 120000, estado: "Pendiente" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Pagada: "default",
  Pendiente: "destructive",
};

export default function MultasPage() {
    const { toast } = useToast();
    const [filter, setFilter] = useState("todos");

    const handlePayFine = (fineId: string) => {
        toast({
            title: "Procesando Pago",
            description: `Se ha iniciado el proceso de pago para la multa ${fineId}.`,
        });
    }
    
    const filteredMultas = multas.filter(m => {
        if (filter === "todos") return true;
        return m.estado.toLowerCase() === filter;
    });

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-8 w-8" />
            Gestión de Multas
        </h1>
        <p className="text-muted-foreground mt-2">
            Consulta y paga las multas y sanciones asociadas a tu empresa.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Historial de Multas</CardTitle>
            <CardDescription>Listado completo de multas y su estado actual.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-sm mb-4">
                    <TabsTrigger value="todos">Todas</TabsTrigger>
                    <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
                    <TabsTrigger value="pagada">Pagadas</TabsTrigger>
                </TabsList>
                 <TabsContent value={filter}>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referencia</TableHead>
                                <TableHead>Ente Emisor</TableHead>
                                <TableHead>Motivo</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMultas.map((multa) => (
                                <TableRow key={multa.id} className={multa.estado === 'Pendiente' ? 'bg-destructive/10' : ''}>
                                    <TableCell className="font-medium">{multa.id}</TableCell>
                                    <TableCell>{multa.ente}</TableCell>
                                    <TableCell>{multa.motivo}</TableCell>
                                    <TableCell>{multa.fecha}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(multa.monto, "Bs.")}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[multa.estado]}>{multa.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=multa-${multa.id}`} alt={`QR for ${multa.id}`} width={24} height={24} className="inline-block mr-2" />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="mr-2">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Detalles de la Multa: {multa.id}</DialogTitle>
                                                    <DialogDescription>{multa.motivo}</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4 space-y-2">
                                                    <p><strong>Ente:</strong> {multa.ente}</p>
                                                    <p><strong>Fecha:</strong> {multa.fecha}</p>
                                                    <p><strong>Monto:</strong> {formatCurrency(multa.monto, "Bs.")}</p>
                                                    <p><strong>Estado:</strong> {multa.estado}</p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        {multa.estado === "Pendiente" && (
                                             <Button variant="outline" size="sm" onClick={() => handlePayFine(multa.id)}>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Pagar
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMultas.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground">No hay multas en este estado.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                 </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
