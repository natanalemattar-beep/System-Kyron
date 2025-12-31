
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Heart, Send, Printer } from "lucide-react";
import { mockInvoices } from "@/lib/data";

const frequentCustomers = [
    { id: "CLI-001", name: "Tech Solutions LLC", totalPurchases: 65000, invoiceCount: 15, email: "billing@techsolutions.com" },
    { id: "CLI-002", name: "Innovate Corp", totalPurchases: 120000, invoiceCount: 8, email: "accounts@innovatecorp.com" },
    { id: "CLI-004", name: "Constructora XYZ", totalPurchases: 85000, invoiceCount: 22, email: "pagos@constructoraxyz.com" },
];

type Customer = typeof frequentCustomers[0];

export default function FidelizacionClientesPage() {
    const { toast } = useToast();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const customerInvoices = selectedCustomer 
        ? mockInvoices.filter(inv => inv.customer.toLowerCase().includes(selectedCustomer.name.split(' ')[0].toLowerCase())).slice(0, 4)
        : [];

    const handleSendEmail = () => {
        if (!selectedCustomer) return;
        toast({
            title: "Correo Enviado Exitosamente",
            description: `El correo de fin de año ha sido enviado a ${selectedCustomer.name}.`,
        });
    };

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="space-y-8">
             <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-email, #printable-email * { visibility: visible; }
                        #printable-email { position: absolute; left: 0; top: 0; width: 100%; }
                    }
                `}
            </style>
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Heart className="h-8 w-8 text-primary" />
                    Fidelización de Clientes
                </h1>
                <p className="text-muted-foreground mt-2">
                    Envía comunicaciones y reconocimientos a tus clientes más importantes.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Clientes Frecuentes - Resumen Anual</CardTitle>
                    <CardDescription>Selecciona un cliente para previsualizar y enviar el correo de fin de año.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="text-center">Facturas Totales</TableHead>
                                <TableHead className="text-right">Monto Total Comprado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {frequentCustomers.map(customer => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell className="text-center">{customer.invoiceCount}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(customer.totalPurchases, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => setSelectedCustomer(customer)}>
                                                    Ver y Enviar Correo
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-4xl">
                                                <DialogHeader>
                                                    <DialogTitle>Previsualización del Correo de Fin de Año</DialogTitle>
                                                    <DialogDescription>Para: {selectedCustomer?.name}</DialogDescription>
                                                </DialogHeader>
                                                <div id="printable-email" className="my-4 max-h-[60vh] overflow-y-auto p-2 border rounded-lg bg-secondary/20">
                                                    <Card className="max-w-3xl mx-auto my-8">
                                                        <CardHeader className="bg-secondary p-8 text-center">
                                                            <div className="mx-auto w-fit mb-4">
                                                                <Logo className="h-16 w-16" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold">¡Gracias por un Año Increíble!</h2>
                                                        </CardHeader>
                                                        <CardContent className="p-8 space-y-6 text-sm">
                                                            <p>Estimado/a <strong>{selectedCustomer?.name}</strong>,</p>
                                                            <p>En nombre de todo el equipo de Kyron, C.A., queremos extenderte nuestro más sincero agradecimiento por la confianza que has depositado en nosotros durante este año. Ha sido un placer servirte y ser parte de tu crecimiento.</p>
                                                            <p>Valoramos enormemente nuestra relación comercial y, como muestra de nuestro aprecio, hemos preparado un pequeño resumen de tu actividad con nosotros:</p>
                                                            <div className="p-4 bg-secondary/50 rounded-lg text-center">
                                                                <p className="text-muted-foreground">Total Comprado en el Año</p>
                                                                <p className="text-3xl font-bold text-primary">{formatCurrency(selectedCustomer?.totalPurchases || 0, 'Bs.')}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Resumen de Últimas Facturas:</h4>
                                                                <Table>
                                                                    <TableHeader><TableRow><TableHead>Factura</TableHead><TableHead>Fecha</TableHead><TableHead className="text-right">Monto</TableHead></TableRow></TableHeader>
                                                                    <TableBody>
                                                                        {customerInvoices.map(inv => (
                                                                            <TableRow key={inv.id}><TableCell>{inv.id}</TableCell><TableCell>{formatDate(inv.date)}</TableCell><TableCell className="text-right">{formatCurrency(inv.amount, 'Bs.')}</TableCell></TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <p>Te deseamos unas felices fiestas y un próspero año nuevo. ¡Esperamos seguir colaborando contigo!</p>
                                                            <Separator />
                                                            <div className="flex items-center gap-4">
                                                                <Image src="https://picsum.photos/seed/signature/200/80" alt="Firma del Director" width={150} height={60} />
                                                                <Image src="https://picsum.photos/seed/seal/100/100" alt="Sello de la empresa" width={80} height={80} />
                                                                <div>
                                                                    <p className="font-bold">Ana Pérez</p>
                                                                    <p className="text-xs text-muted-foreground">Directora de Recursos Humanos</p>
                                                                    <p className="text-xs text-muted-foreground">Kyron, C.A.</p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4"/>Imprimir</Button>
                                                    <Button onClick={handleSendEmail}><Send className="mr-2 h-4 w-4"/>Enviar a {selectedCustomer?.email}</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
