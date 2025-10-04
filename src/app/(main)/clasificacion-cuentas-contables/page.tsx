
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, CheckCircle, Scale } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const clasificacionGeneral = [
    {
        title: "Cuentas de Activo",
        description: "Representan todos los bienes y derechos que una empresa posee, y que son susceptibles de generar ingresos o beneficios en el futuro.",
        subcategories: [
            {
                title: "Activos Corrientes",
                description: "Recursos que se espera convertir en efectivo, vender o consumir dentro de un período no mayor a 12 meses (Ej: Caja, Bancos, Clientes, Inventarios).",
            },
            {
                title: "Activos No Corrientes",
                description: "Recursos que la empresa no planea vender ni utilizar dentro del plazo de un año, generalmente destinados a ser utilizados en el largo plazo (ej: Propiedades, planta y equipo, Inversiones a largo plazo, Intangibles).",
            },
        ]
    },
    {
        title: "Cuentas de Pasivo",
        description: "Reflejan las obligaciones que la empresa tiene con terceros, es decir, son deudas u obligaciones financieras que deben pagarse en el futuro.",
        subcategories: [
            {
                title: "Pasivos Corrientes",
                description: "Pasivos que se deben pagar en el corto plazo, generalmente en menos de 12 meses (Ej: Proveedores, Documentos por pagar, Préstamos a corto plazo).",
            },
            {
                title: "Pasivos No Corrientes",
                description: "Deudas u obligaciones que no deben pagarse en menos de 12 meses, es decir, compromisos a largo plazo (ej: Préstamos bancarios a largo plazo, Bonos emitidos).",
            },
        ]
    },
    {
        title: "Cuentas de Patrimonio",
        description: "Refleja los recursos financieros que los propietarios o accionistas han invertido en la empresa, así como las ganancias generadas que aún no han sido distribuidas.",
        subcategories: [
            {
                title: "Capital Social",
                description: "Dinero que los socios o accionistas aportan al momento de fundar o aumentar la empresa.",
            },
            {
                title: "Utilidades Retenidas",
                description: "Ganancias generadas por la empresa que se retienen y no se distribuyen como dividendos a los accionistas, sino que se reinvierten en el negocio.",
            },
        ]
    },
    {
        title: "Cuentas de Ingresos",
        description: "Reflejan todo el dinero que la empresa recibe a cambio de bienes o servicios vendidos.",
        subcategories: [
            {
                title: "Ingresos Operativos",
                description: "Ingresos generados por la actividad principal de la empresa (ej: Ventas de productos, Prestación de servicios).",
            },
            {
                title: "Ingresos No Operativos",
                description: "Ingresos que provienen de actividades secundarias (ej: Alquiler de propiedades, Intereses ganados).",
            },
        ]
    },
    {
        title: "Cuentas de Gasto",
        description: "Reflejan todos los costos que la empresa incurre en su actividad diaria para producir o generar sus ingresos.",
         subcategories: [
            {
                title: "Gastos Operativos",
                description: "Gastos directamente relacionados con la actividad principal (ej: Sueldos y salarios, Alquiler, Materiales, Costo de ventas).",
            },
            {
                title: "Gastos No Operativos",
                description: "Gastos no relacionados directamente con la actividad principal (ej: Impuestos sobre la renta, Intereses de deudas).",
            },
        ]
    }
];

const reglasDebitoCredito = [
    { tipo: "Activo", debito: "Aumenta", credito: "Disminuye" },
    { tipo: "Pasivo", debito: "Disminuye", credito: "Aumenta" },
    { tipo: "Patrimonio", debito: "Disminuye", credito: "Aumenta" },
    { tipo: "Ingresos", debito: "Disminuye", credito: "Aumenta" },
    { tipo: "Gastos", debito: "Aumenta", credito: "Disminuye" },
];

const transacciones = [
    { id: 1, debitoCuenta: "Inventarios", debitoMonto: 5000, creditoCuenta: "Proveedores", creditoMonto: 5000, descripcion: "Compra de mercancía a crédito" },
    { id: 2, debitoCuenta: "Caja", debitoMonto: 7000, creditoCuenta: "Ventas", creditoMonto: 7000, descripcion: "Venta de productos al contado" },
    { id: 3, debitoCuenta: "Préstamos Bancarios", debitoMonto: 2000, creditoCuenta: "Caja", creditoMonto: 2000, descripcion: "Pago de parte de un préstamo bancario" },
    { id: 4, debitoCuenta: "Gastos Generales", debitoMonto: 3000, creditoCuenta: "Caja", creditoMonto: 3000, descripcion: "Pago de salarios" },
    { id: 5, debitoCuenta: "Caja", debitoMonto: 1000, creditoCuenta: "Intereses Ganados", creditoMonto: 1000, descripcion: "Obtención de ingresos por intereses" },
];

export default function ClasificacionCuentasPage() {
    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    Clasificación de Cuentas Contables
                </h1>
                <p className="text-muted-foreground mt-2">
                    Guía para Emprendedores y Profesionales sobre la estructura financiera de una empresa.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>¿Qué son las Cuentas Contables?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Las cuentas contables son herramientas utilizadas por la contabilidad para organizar, clasificar y registrar todos los movimientos financieros de una empresa. Permiten que cada transacción se registre de manera precisa, asegurando que la información financiera sea clara y comprensible. Generalmente, se clasifican en cinco grupos básicos: activos, pasivos, patrimonio, ingresos y gastos.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Clasificación General de las Cuentas Contables</CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        {clasificacionGeneral.map((grupo) => (
                             <AccordionItem value={grupo.title} key={grupo.title}>
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold">{grupo.title}</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground mb-4">{grupo.description}</p>
                                    <div className="pl-4 border-l-2 border-primary/50 space-y-3">
                                        {grupo.subcategories.map(sub => (
                                            <div key={sub.title}>
                                                <h4 className="font-semibold">{sub.title}</h4>
                                                <p className="text-sm text-muted-foreground">{sub.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                     </Accordion>
                </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5"/>El Principio de Partida Doble</CardTitle>
                    <CardDescription>Cada transacción afecta, al menos, dos cuentas. Cuando una cuenta se debita, otra se acredita por la misma cantidad, asegurando que los balances se mantengan equilibrados.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo de Cuenta</TableHead>
                                <TableHead>Débito (Aumenta/Disminuye)</TableHead>
                                <TableHead>Crédito (Aumenta/Disminuye)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reglasDebitoCredito.map(regla => (
                                <TableRow key={regla.tipo}>
                                    <TableCell className="font-medium">{regla.tipo}</TableCell>
                                    <TableCell className={regla.debito === "Aumenta" ? "text-green-400" : "text-red-400"}>{regla.debito}</TableCell>
                                    <TableCell className={regla.credito === "Aumenta" ? "text-green-400" : "text-red-400"}>{regla.credito}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Aplicación Práctica de la Partida Doble</CardTitle>
                    <CardDescription>Ejemplo de registro de transacciones para la empresa "Servicios XYZ".</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold mb-4">Registro de Transacciones</h4>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Cuenta (Debe)</TableHead>
                                    <TableHead>Monto (Debe)</TableHead>
                                    <TableHead>Cuenta (Crédito)</TableHead>
                                    <TableHead>Monto (Crédito)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transacciones.map(t => (
                                    <TableRow key={t.id}>
                                        <TableCell>{t.descripcion}</TableCell>
                                        <TableCell>{t.debitoCuenta}</TableCell>
                                        <TableCell className="font-mono">{formatCurrency(t.debitoMonto, 'Bs.')}</TableCell>
                                        <TableCell>{t.creditoCuenta}</TableCell>
                                        <TableCell className="font-mono">{formatCurrency(t.creditoMonto, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
