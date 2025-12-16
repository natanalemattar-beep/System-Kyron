
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const forecastData = [
    { cliente: "Innovate Corp", "Próximos 7 días": 2500, "Próximos 30 días": 7500 },
    { cliente: "Tech Solutions LLC", "Próximos 7 días": 0, "Próximos 30 días": 12000 },
    { cliente: "Marketing Pro", "Próximos 7 días": 1500, "Próximos 30 días": 1500 },
];

export const CollectionForecast = () => {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Pronóstico de Cobranza</CardTitle>
                <CardDescription>Cuentas por cobrar esperadas en el corto plazo.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="text-right">7 Días</TableHead>
                            <TableHead className="text-right">30 Días</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {forecastData.map(item => (
                             <TableRow key={item.cliente}>
                                <TableCell className="font-medium">{item.cliente}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item["Próximos 7 días"], 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item["Próximos 30 días"], 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
