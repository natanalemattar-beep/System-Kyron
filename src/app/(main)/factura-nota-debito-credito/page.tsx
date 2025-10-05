
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle, FileText, FilePlus, FileMinus, CheckCircle } from "lucide-react";

const documents = [
    {
        icon: FileText,
        title: "Factura",
        purpose: "Comprobante de venta que detalla los bienes o servicios vendidos, sus precios y el total del pedido.",
        fn: "Documento principal de una transacción; registra la operación y crea las cuentas por cobrar del cliente y las cuentas por pagar de la empresa.",
        issuer: "Vendedor",
        example: "Venta de mercancía a un cliente.",
    },
    {
        icon: FilePlus,
        title: "Nota de Crédito",
        purpose: "Disminuir el monto adeudado por el cliente o anular una factura.",
        fn: "Refleja que la empresa debe dinero al cliente o que el cliente tiene un saldo a favor.",
        causes: ["Devoluciones de productos", "Errores de facturación (sobrecargo)", "Descuentos o bonificaciones post-venta"],
        issuer: "Vendedor",
        example: "Un cliente devuelve una prenda porque no le gusta.",
    },
    {
        icon: FileMinus,
        title: "Nota de Débito",
        purpose: "Aumentar el valor de una factura o una deuda.",
        fn: "Aumenta la deuda del comprador o refleja que el cliente debe más dinero al vendedor.",
        causes: ["Cobrar importes adicionales no incluidos en la factura original (ej: gastos de envío)", "Penalizaciones por pago tardío", "Corrección de un precio facturado por debajo del correcto"],
        issuer: "Comprador o vendedor, según el caso",
        example: "Un producto se facturó con un precio menor al correcto, y el vendedor emite una nota de débito para cobrar la diferencia.",
    },
];

export default function FacturaNotaDebitoCreditoPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HelpCircle className="h-8 w-8" />
            Factura, Nota de Débito y Nota de Crédito
        </h1>
        <p className="text-muted-foreground mt-2">
            Comprende las diferencias clave entre estos tres documentos contables fundamentales.
        </p>
      </header>

       <Card className="mb-8 bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Resumen General</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Una **factura** es un comprobante de una transacción comercial; una **nota de crédito** se emite para anular o reducir el valor de una factura previa, a favor del cliente; y una **nota de débito** se emite para aumentar el valor de una factura original, a favor del vendedor, por conceptos adicionales.
            </p>
        </CardContent>
       </Card>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
            <Card key={doc.title} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <doc.icon className="h-6 w-6 text-primary" />
                        <span>{doc.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    <div>
                        <h4 className="font-semibold">Propósito</h4>
                        <p className="text-sm text-muted-foreground">{doc.purpose}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">Función Principal</h4>
                        <p className="text-sm text-muted-foreground">{doc.fn}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">Emisor Común</h4>
                        <p className="text-sm text-muted-foreground">{doc.issuer}</p>
                    </div>
                    {doc.causes && (
                        <div>
                            <h4 className="font-semibold">Causas Comunes</h4>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                            {doc.causes.map(cause => (
                                <li key={cause} className="text-sm text-muted-foreground">{cause}</li>
                            ))}
                            </ul>
                        </div>
                    )}
                     <div className="pt-4">
                        <h4 className="font-semibold">Ejemplo</h4>
                        <p className="text-sm text-muted-foreground italic">"{doc.example}"</p>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

    