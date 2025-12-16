
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TabletSmartphone, CreditCard, Receipt, FilePlus, FileMinus } from "lucide-react";
import Link from "next/link";

const facturacionModules = [
    {
        title: "Punto de Venta (TPV)",
        description: "Interfaz rápida y visual para procesar ventas en tiempo real, integrada con el inventario y la facturación.",
        icon: TabletSmartphone,
        href: "/punto-de-venta"
    },
    {
        title: "Facturación a Crédito",
        description: "Gestiona ventas con financiamiento, controla las cuentas por cobrar y maneja plataformas como Cashea.",
        icon: CreditCard,
        href: "/facturacion-credito"
    },
    {
        title: "Facturas Proforma",
        description: "Crea y envía cotizaciones o facturas preliminares a tus clientes antes de la venta final.",
        icon: Receipt,
        href: "/proformas"
    },
    {
        title: "Modelo de Factura",
        description: "Visualiza y descarga un modelo de factura fiscal homologado y adaptado a la normativa del SENIAT.",
        icon: FileText,
        href: "/modelo-factura"
    },
    {
        title: "Nota de Débito",
        description: "Emite notas de débito para aumentar el valor de una factura por intereses o cargos adicionales.",
        icon: FileMinus,
        href: "/nota-debito"
    },
    {
        title: "Nota de Crédito",
        description: "Genera notas de crédito para anular o corregir facturas por devoluciones, descuentos o errores.",
        icon: FilePlus,
        href: "/nota-credito"
    },
];

export default function FacturacionPage() {
  return (
    <div className="space-y-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Centro de Facturación
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona todo el ciclo de vida de tus documentos de venta, desde la cotización hasta el cobro.
        </p>
      </header>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facturacionModules.map((module) => (
            <Card key={module.title} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <module.icon className="h-6 w-6 text-primary" />
                        {module.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{module.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={module.href}>
                            Acceder <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}

    