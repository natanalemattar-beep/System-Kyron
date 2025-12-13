
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, PlusCircle, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registros = [
    { id: 1, empleado: "Ana Pérez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 2, empleado: "Luis Gómez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 3, empleado: "María Rodriguez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 4, empleado: "Carlos Sanchez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
];

export default function LibroCestaTicketPage() {
  const { toast } = useToast();

  const handleExportCSV = () => {
    const headers = ["Empleado", "Periodo", "Fecha de Pago", "Monto Pagado"];
    const csvContent = [
        headers.join(","),
        ...registros.map(r => [`"${r.empleado}"`, r.periodo, r.fechaPago, r.monto].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "libro_cesta_ticket.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    toast({
      title: "Reporte Exportado",
      description: "El libro de cesta ticket ha sido exportado exitosamente.",
    });
  };

  const handleRegisterPayment = () => {
    toast({
        title: "Pago Registrado",
        description: "El nuevo pago de cesta ticket ha sido registrado.",
    })
  }

  return (
    <div>
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ShoppingCart className="h-8 w-8" />
                    Libro de Cesta Ticket
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registro y control del beneficio de alimentación.
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="mr-2" />
                    Exportar a Excel
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Pago
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Pago de Cesta Ticket</DialogTitle>
                            <DialogDescription>
                                Complete la información para registrar un nuevo pago masivo o individual.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="periodo" className="text-right">Período</Label>
                                <Input id="periodo" defaultValue="Julio 2024" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="monto" className="text-right">Monto</Label>
                                <Input id="monto" type="number" defaultValue="1460" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleRegisterPayment}>Registrar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Pagos de Julio 2024</CardTitle>
                <CardDescription>Listado de pagos del bono de alimentación por empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Período</TableHead>
                            <TableHead>Fecha de Pago</TableHead>
                            <TableHead className="text-right">Monto Pagado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.periodo}</TableCell>
                                <TableCell>{reg.fechaPago}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(reg.monto, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
