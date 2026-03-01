
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, Download, FileSpreadsheet } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LibroCompraVentaPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Landmark className="h-8 w-8 text-primary" />
                        Libro de Compras y Ventas
                    </h1>
                    <p className="text-muted-foreground mt-2">Registros fiscales obligatorios según la Prov. Adm. 0071.</p>
                </div>
                <Button className="btn-3d-primary">
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Libro Mensual
                </Button>
            </header>

            <Tabs defaultValue="ventas">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="ventas">Registro de Ventas</TabsTrigger>
                    <TabsTrigger value="compras">Registro de Compras</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ventas" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ventas del Mes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Nro. Documento</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead className="text-right">Base Imponible</TableHead>
                                        <TableHead className="text-right">IVA (16%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDate(new Date())}</TableCell>
                                        <TableCell>FAC-000123</TableCell>
                                        <TableCell>Cliente Genérico</TableCell>
                                        <TableCell className="text-right">{formatCurrency(1000)}</TableCell>
                                        <TableCell className="text-right font-bold">{formatCurrency(160)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="compras" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Compras del Mes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Proveedor</TableHead>
                                        <TableHead className="text-right">Total Factura</TableHead>
                                        <TableHead className="text-right">IVA Crédito</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDate(new Date())}</TableCell>
                                        <TableCell>Distribuidora Central</TableCell>
                                        <TableCell className="text-right">{formatCurrency(5000)}</TableCell>
                                        <TableCell className="text-right text-green-600 font-bold">{formatCurrency(800)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
