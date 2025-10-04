
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, Download, Printer, QrCode, ShieldCheck, CreditCard } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const factura = {
    numero: "00001234",
    numeroControl: "2024-ABC-00001234",
    fechaEmision: new Date(),
    empresa: {
        nombre: "Tu Empresa, C.A.",
        rif: "J-12345678-9",
        direccion: "Av. Principal, Edif. Centro, Piso 1, Caracas",
        telefono: "0212-1234567",
    },
    cliente: {
        nombre: "Cliente Corporativo, S.A.",
        rif: "J-98765432-1",
        direccion: "Calle Secundaria, Torre Empresarial, Valencia",
    },
    items: [
        { id: 1, descripcion: "Licencia Anual - Plan Emprendedor", cantidad: 1, precio: 360 },
        { id: 2, descripcion: "Soporte Técnico Prioritario (Mensual)", cantidad: 6, precio: 50 },
        { id: 3, descripcion: "Módulo de Nómina Avanzada", cantidad: 1, precio: 150 },
    ],
    metodoPago: {
        tipo: "Punto de Venta",
        banco: "Banesco",
        tarjeta: "Mastercard",
        referencia: "00123456"
    },
    plataformaCredito: {
        nombre: "Cashea",
        modalidad: "Compra Ahora, Paga Después (BNPL)",
        instruccion: "El cliente debe escanear el código QR en la tienda para ver el plan de pagos y confirmar la compra en la app. Luego, debe subir la foto de esta factura para formalizar el compromiso de pago."
    }
};

const subtotal = factura.items.reduce((acc, item) => acc + (item.cantidad * item.price), 0);
const iva = subtotal * 0.16;
const total = subtotal + iva;

export default function ModeloFacturaPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Factura ${factura.numero} ${action}`,
            description: `La factura ha sido ${action === 'impresa' ? 'enviada a la impresora' : 'descargada en formato PDF'}.`,
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="h-8 w-8" />
                Modelo de Factura Fiscal
            </h1>
            <p className="text-muted-foreground mt-2">
              Diseño de factura homologada y adaptada a la Providencia Administrativa del SENIAT.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('impresa')}>
                <Printer className="mr-2"/> Imprimir Factura
            </Button>
            <Button onClick={() => handleAction('descargada')}>
                <Download className="mr-2"/> Descargar PDF
            </Button>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="p-6 md:p-8 border-b grid grid-cols-2 gap-8">
            <div>
                <h2 className="font-bold text-xl">{factura.empresa.nombre}</h2>
                <p className="text-sm text-muted-foreground">RIF: {factura.empresa.rif}</p>
                <p className="text-xs text-muted-foreground">{factura.empresa.direccion}</p>
            </div>
            <div className="text-right">
                <h2 className="text-2xl font-bold">FACTURA</h2>
                <p className="text-red-500 font-mono font-semibold">N° {factura.numero}</p>
                <p className="text-xs text-muted-foreground mt-2">N° de Control: <span className="font-mono">{factura.numeroControl}</span></p>
                <p className="text-xs text-muted-foreground">Fecha de Emisión: {formatDate(factura.fechaEmision)}</p>
            </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
            <div className="mb-8 p-4 rounded-lg bg-secondary/50">
                <h3 className="font-semibold mb-1">Datos del Cliente:</h3>
                <p><strong>Razón Social:</strong> {factura.cliente.nombre}</p>
                <p><strong>RIF:</strong> {factura.cliente.rif}</p>
                <p><strong>Domicilio Fiscal:</strong> {factura.cliente.direccion}</p>
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
                    {factura.items.map(item => (
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
                        <span className="text-primary">TOTAL A PAGAR:</span>
                        <span className="text-primary">{formatCurrency(total, 'Bs.')}</span>
                     </div>
                </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-4 rounded-lg bg-secondary/50">
                     <h4 className="font-semibold mb-2 text-foreground">Método de Pago</h4>
                     <p className="text-sm"><strong>Tipo:</strong> {factura.metodoPago.tipo}</p>
                     <p className="text-sm"><strong>Banco:</strong> {factura.metodoPago.banco}</p>
                     <p className="text-sm"><strong>Tarjeta:</strong> {factura.metodoPago.tarjeta}</p>
                     <p className="text-sm"><strong>Referencia:</strong> {factura.metodoPago.referencia}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-start justify-center text-left gap-2">
                     <div className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-primary shrink-0"/>
                        <h4 className="font-semibold">{factura.plataformaCredito.nombre} ({factura.plataformaCredito.modalidad})</h4>
                     </div>
                     <div>
                        <p className="text-xs text-muted-foreground">{factura.plataformaCredito.instruccion}</p>
                     </div>
                </div>
            </div>
             <div className="text-xs text-muted-foreground mt-8">
                <h4 className="font-semibold text-foreground mb-1">Términos y Condiciones:</h4>
                <p>1. Esta factura debe ser pagada en o antes de la fecha de vencimiento. <br/> 2. Los pagos vencidos estarán sujetos a recargos por mora según los artículos 108 del C. de Co. y 1.277 del C.C.V.</p>
            </div>

        </CardContent>
        <CardFooter className="p-6 md:p-8 border-t bg-secondary/30 flex justify-between items-center">
            <div className="flex items-center gap-2 text-green-500 text-sm">
                <ShieldCheck className="h-5 w-5"/>
                <p>Factura emitida conforme a la Prov. Adm. SNAT/2011/0071.</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RIF:${factura.empresa.rif},Factura:${factura.numero},Fecha:${factura.fechaEmision.toISOString().split('T')[0]},Monto:${total}`} alt="QR Fiscal" width={80} height={80} />
                <p className="text-xs text-muted-foreground mt-1">Validez Fiscal</p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

    

    