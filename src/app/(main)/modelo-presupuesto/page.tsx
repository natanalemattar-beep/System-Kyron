
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, Download, Printer, QrCode, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

const presupuesto = {
    numero: "PRE-2024-07-001",
    fechaEmision: new Date(),
    validez: 15, // Días
    empresa: {
        nombre: "Tu Empresa, C.A.",
        rif: "J-12345678-9",
        direccion: "Av. Principal, Edif. Centro, Piso 1, Caracas",
        telefono: "0212-1234567",
    },
    cliente: {
        nombre: "Cliente Potencial, S.A.",
        rif: "J-87654321-0",
        direccion: "Av. Secundaria, Torre B, Maracay",
    },
    items: [
        { id: 1, descripcion: "Licencia Anual - Plan Profesional", cantidad: 1, precio: 48000 },
        { id: 2, descripcion: "Horas de Soporte Adicional (Paquete 10h)", cantidad: 2, precio: 2000 },
        { id: 3, descripcion: "Módulo de Integración con CRM", cantidad: 1, precio: 5000 },
    ],
};

const subtotal = presupuesto.items.reduce((acc, item) => acc + (item.cantidad * item.price), 0);
const iva = subtotal * 0.16;
const total = subtotal + iva;

export default function ModeloPresupuestoPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Presupuesto ${presupuesto.numero} ${action}`,
            description: `El documento ha sido ${action === 'impreso' ? 'enviado a la impresora' : 'descargado en formato PDF'}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="h-8 w-8" />
                Modelo de Presupuesto / Cotización
            </h1>
            <p className="text-muted-foreground mt-2">
              Diseño de cotización formal para presentar a tus clientes.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impreso')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargado')}>
                <Download className="mr-2"/> Descargar PDF
            </Button>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="p-6 md:p-8 border-b grid grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
                 <Logo className="h-14 w-14" />
                 <div>
                    <h2 className="font-bold text-xl">{presupuesto.empresa.nombre}</h2>
                    <p className="text-sm text-muted-foreground">RIF: {presupuesto.empresa.rif}</p>
                    <p className="text-xs text-muted-foreground">{presupuesto.empresa.direccion}</p>
                 </div>
            </div>
            <div className="text-right">
                <h2 className="text-2xl font-bold">PRESUPUESTO</h2>
                <p className="text-primary font-mono font-semibold">N° {presupuesto.numero}</p>
                <p className="text-xs text-muted-foreground mt-2">Fecha de Emisión: {formatDate(presupuesto.fechaEmision)}</p>
                <p className="text-xs text-muted-foreground">Válido por: {presupuesto.validez} días</p>
            </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
            <div className="mb-8 p-4 rounded-lg bg-secondary/50">
                <h3 className="font-semibold mb-2">Cliente:</h3>
                <p><strong>Razón Social:</strong> {presupuesto.cliente.nombre}</p>
                <p><strong>RIF:</strong> {presupuesto.cliente.rif}</p>
                <p><strong>Domicilio Fiscal:</strong> {presupuesto.cliente.direccion}</p>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">Descripción</TableHead>
                        <TableHead className="text-center">Cant.</TableHead>
                        <TableHead className="text-right">Precio Unitario</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {presupuesto.items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.descripcion}</TableCell>
                            <TableCell className="text-center">{item.cantidad}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.precio, 'Bs.')}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(item.precio * item.cantidad, 'Bs.')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <div className="mt-8 flex justify-end">
                <div className="w-full max-w-sm space-y-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Sub-total:</span>
                        <span className="font-medium">{formatCurrency(subtotal, 'Bs.')}</span>
                     </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (16%):</span>
                        <span className="font-medium">{formatCurrency(iva, 'Bs.')}</span>
                     </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                        <span className="text-primary">TOTAL PRESUPUESTADO:</span>
                        <span className="text-primary">{formatCurrency(total, 'Bs.')}</span>
                     </div>
                </div>
            </div>
            
            <Separator className="my-8" />
            
             <div className="text-xs text-muted-foreground mt-8">
                <h4 className="font-semibold text-foreground mb-1">Términos y Condiciones:</h4>
                <p>1. Este presupuesto tiene una validez de {presupuesto.validez} días a partir de su fecha de emisión. <br/> 2. Los precios están sujetos a cambios sin previo aviso una vez vencido el plazo. <br/> 3. Condiciones de pago: 50% de anticipo para iniciar, 50% contra entrega.</p>
            </div>

        </CardContent>
        <CardFooter className="p-6 md:p-8 border-t bg-secondary/30 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Gracias por su interés.</p>
            <div className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground mt-1">Atentamente, El Equipo de Ventas</p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
