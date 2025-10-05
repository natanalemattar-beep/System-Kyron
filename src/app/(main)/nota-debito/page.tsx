
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileMinus, Download, Printer, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

const notaDebito = {
    numero: "ND-0000101",
    numeroControl: "2024-ND-0000101",
    fechaEmision: new Date(),
    facturaAfectada: "00001225",
    empresa: {
        nombre: "Tu Empresa, C.A.",
        rif: "J-12345678-9",
        direccion: "Av. Principal, Edif. Centro, Piso 1, Caracas",
    },
    cliente: {
        nombre: "Cliente Corporativo, S.A.",
        rif: "J-98765432-1",
        direccion: "Calle Secundaria, Torre Empresarial, Valencia",
    },
    items: [
        { id: 1, descripcion: "Intereses por mora (15 días de retraso)", cantidad: 1, precio: 120.50 },
        { id: 2, descripcion: "Error en cálculo de flete", cantidad: 1, precio: 45.00 },
    ],
    motivo: "Ajuste por intereses de mora y corrección en el costo del flete de la factura original.",
};

const subtotal = notaDebito.items.reduce((acc, item) => acc + (item.cantidad * item.price), 0);
const iva = subtotal * 0.16;
const total = subtotal + iva;

export default function NotaDebitoPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Nota de Débito ${notaDebito.numero} ${action}`,
            description: `El documento ha sido ${action === 'impresa' ? 'enviado a la impresora' : 'descargado en formato PDF'}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileMinus className="h-8 w-8" />
                Modelo de Nota de Débito
            </h1>
            <p className="text-muted-foreground mt-2">
              Diseño de nota de débito para aumentar el valor de facturas, adaptada a la normativa fiscal.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2"/> Imprimir
            </Button>
            <Button onClick={() => handleAction('descargada')}>
                <Download className="mr-2"/> Descargar PDF
            </Button>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="p-6 md:p-8 border-b grid grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
                 <Logo className="h-14 w-14" />
                 <div>
                    <h2 className="font-bold text-xl">{notaDebito.empresa.nombre}</h2>
                    <p className="text-sm text-muted-foreground">RIF: {notaDebito.empresa.rif}</p>
                    <p className="text-xs text-muted-foreground">{notaDebito.empresa.direccion}</p>
                 </div>
            </div>
            <div className="text-right">
                <h2 className="text-2xl font-bold">NOTA DE DÉBITO</h2>
                <p className="text-red-500 font-mono font-semibold">N° {notaDebito.numero}</p>
                <p className="text-xs text-muted-foreground mt-2">N° de Control: <span className="font-mono">{notaDebito.numeroControl}</span></p>
                <p className="text-xs text-muted-foreground">Fecha de Emisión: {formatDate(notaDebito.fechaEmision)}</p>
            </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
            <div className="mb-8 grid md:grid-cols-2 gap-4">
                 <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold mb-1">Datos del Cliente:</h3>
                    <p><strong>Razón Social:</strong> {notaDebito.cliente.nombre}</p>
                    <p><strong>RIF:</strong> {notaDebito.cliente.rif}</p>
                    <p><strong>Domicilio Fiscal:</strong> {notaDebito.cliente.direccion}</p>
                </div>
                 <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold mb-1">Datos del Documento Modificado:</h3>
                    <p><strong>Tipo de Documento:</strong> Factura</p>
                    <p><strong>Número de Factura:</strong> {notaDebito.facturaAfectada}</p>
                </div>
            </div>
            
             <div className="mb-6">
                <h3 className="font-semibold mb-2">Conceptos de la Nota de Débito:</h3>
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
                        {notaDebito.items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.descripcion}</TableCell>
                                <TableCell className="text-center">{item.cantidad}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.precio, 'Bs.')}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(item.precio * item.cantidad, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <div className="text-sm p-4 rounded-lg bg-secondary/30 mb-8">
                <span className="font-semibold">Motivo de la Nota de Débito:</span> {notaDebito.motivo}
            </div>
            
            <div className="mt-8 flex justify-end">
                <div className="w-full max-w-sm space-y-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Sub-total:</span>
                        <span className="font-medium">{formatCurrency(subtotal, 'Bs.')}</span>
                     </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Débito Fiscal (IVA 16%):</span>
                        <span className="font-medium">{formatCurrency(iva, 'Bs.')}</span>
                     </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                        <span className="text-primary">TOTAL DÉBITO:</span>
                        <span className="text-primary">{formatCurrency(total, 'Bs.')}</span>
                     </div>
                </div>
            </div>

        </CardContent>
        <CardFooter className="p-6 md:p-8 border-t bg-secondary/30 flex justify-between items-center">
            <div className="flex items-center gap-2 text-green-500 text-sm">
                <ShieldCheck className="h-5 w-5"/>
                <p>Documento emitido conforme a la Prov. Adm. SNAT/2011/0071.</p>
            </div>
             <div className="flex flex-col items-center">
                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RIF:${notaDebito.empresa.rif},ND:${notaDebito.numero},Fecha:${notaDebito.fechaEmision.toISOString().split('T')[0]},Monto:${total}`} alt="QR Fiscal" width={80} height={80} />
                <p className="text-xs text-muted-foreground mt-1">Validez Fiscal</p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

    