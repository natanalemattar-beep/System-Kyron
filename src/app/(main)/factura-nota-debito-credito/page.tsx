
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle, FileText, FilePlus, FileMinus, Repeat } from "lucide-react";

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
                Una <strong>factura</strong> es un comprobante de una transacción comercial; una <strong>nota de crédito</strong> se emite para anular o reducir el valor de una factura previa, a favor del cliente, por devoluciones o descuentos; y una <strong>nota de débito</strong> se emite para aumentar el valor de una factura original, a favor del vendedor, por conceptos adicionales no facturados o errores en el precio.
            </p>
        </CardContent>
       </Card>

      <Card className="bg-card/50 backdrop-blur-sm mb-8">
          <CardHeader>
              <CardTitle>Tabla Comparativa</CardTitle>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[15%]">Documento</TableHead>
                          <TableHead className="w-[25%]">Propósito</TableHead>
                          <TableHead className="w-[30%]">Efecto Contable</TableHead>
                          <TableHead className="w-[30%]">Causas y Ejemplos Comunes</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                          <TableCell className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/>Factura</TableCell>
                          <TableCell>Comprobante de una venta de bienes o servicios que detalla precios y total del pedido.</TableCell>
                          <TableCell>Registra la operación y crea las cuentas por cobrar y por pagar.</TableCell>
                          <TableCell className="text-sm text-muted-foreground">Ej: Venta de mercancía a un cliente.</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell className="font-semibold flex items-center gap-2"><FilePlus className="h-5 w-5 text-green-500"/>Nota de Crédito</TableCell>
                          <TableCell>Disminuir el monto adeudado por el cliente o anular una factura.</TableCell>
                          <TableCell>Reduce los ingresos del vendedor y la deuda del comprador. Indica que el cliente tiene un saldo a favor.</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-4 space-y-2">
                                <li><strong>Devoluciones:</strong> Un cliente devuelve un producto defectuoso o porque no le gusta.</li>
                                <li><strong>Descuentos:</strong> Se aplica un descuento después de la facturación.</li>
                                <li><strong>Pago Fallido:</strong> El pago de un cliente con tarjeta es rechazado después de emitir la factura. Se emite una Nota de Crédito para anular la venta fallida.</li>
                            </ul>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell className="font-semibold flex items-center gap-2"><FileMinus className="h-5 w-5 text-red-500"/>Nota de Débito</TableCell>
                          <TableCell>Aumentar el valor de una factura o una deuda existente.</TableCell>
                          <TableCell>Aumenta los ingresos del vendedor y la deuda del comprador.</TableCell>
                           <TableCell className="text-sm text-muted-foreground">
                             <ul className="list-disc pl-4 space-y-2">
                                <li><strong>Cargos Adicionales:</strong> Cobrar gastos de envío no incluidos en la factura original.</li>
                                <li><strong>Intereses por Mora:</strong> Aplicar penalizaciones por pago tardío.</li>
                                <li><strong>Errores de Precio:</strong> Un producto se facturó con un precio menor al correcto y se cobra la diferencia.</li>
                            </ul>
                           </TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
          </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Repeat className="h-5 w-5"/>Flujo de Trabajo: Cómo Devolver Productos en el Sistema</CardTitle>
            <CardDescription>Pasos a seguir cuando un cliente devuelve un producto, por ejemplo, si su pago con tarjeta no pudo ser procesado.</CardDescription>
        </CardHeader>
        <CardContent>
            <ol className="relative border-l border-border ml-6 space-y-8">
                <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-secondary rounded-full -left-4 ring-8 ring-background">1</span>
                    <h3 className="font-semibold">Emitir Nota de Crédito</h3>
                    <p className="text-sm text-muted-foreground">Para anular la factura original, ve a "Nota de Crédito" en el menú, genera un nuevo documento referenciando la factura afectada. Esto ajusta la contabilidad (reduce ingresos, disminuye cuentas por cobrar) y actualiza los impuestos (crédito fiscal).</p>
                </li>
                 <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-secondary rounded-full -left-4 ring-8 ring-background">2</span>
                    <h3 className="font-semibold">Registrar Devolución en Inventario</h3>
                    <p className="text-sm text-muted-foreground">Una vez emitida la nota de crédito, el sistema te guiará para registrar el reingreso del producto al inventario. Ve al módulo de "Inventario", selecciona el producto y ajusta el stock. Esto asegura que tus niveles de existencia sean precisos.</p>
                </li>
                 <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-secondary rounded-full -left-4 ring-8 ring-background">3</span>
                    <h3 className="font-semibold">Gestionar Reembolso o Saldo a Favor</h3>
                    <p className="text-sm text-muted-foreground">Si el cliente ya había pagado, el sistema registrará un saldo a su favor en "Cuentas por Cobrar". Puedes usar este saldo para futuras compras o procesar un reembolso.</p>
                </li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
