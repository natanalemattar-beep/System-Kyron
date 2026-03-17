
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, CirclePlus as PlusCircle, Download, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const activos = [
    { id: "INM-001", tipo: "Oficina", ubicacion: "Torre Empresarial, Caracas", area: "120 m²", valor: 150000, estado: "En Uso" },
    { id: "INM-002", tipo: "Almacén", ubicacion: "Zona Industrial, Valencia", area: "500 m²", valor: 250000, estado: "En Uso" },
    { id: "INM-003", tipo: "Terreno", ubicacion: "Guatire, Miranda", area: "1000 m²", valor: 80000, estado: "Sin Desarrollar" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  "En Uso": "default",
  "Sin Desarrollar": "secondary",
  "En Venta": "outline",
};

export default function ActivosInmobiliariosPage() {
  const { toast } = useToast();

  const handleExport = () => {
    const headers = ["ID", "Tipo", "Ubicación", "Área", "Estado", "Valor"];
    const csvContent = [
        headers.join(','),
        ...activos.map(a => [
            a.id,
            a.tipo,
            `"${a.ubicacion}"`,
            a.area,
            a.estado,
            a.valor
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "inventario_inmobiliario.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
        title: "Exportación Completa",
        description: "El listado de activos inmobiliarios ha sido descargado como CSV.",
    });
  };

  return (
    <div className="space-y-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Building className="h-8 w-8 text-primary" />
                Gestión de Activos Inmobiliarios
            </h1>
            <p className="text-muted-foreground mt-2">
              Control, registro y valoración de tus propiedades y bienes inmuebles.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4"/> Exportar Listado
            </Button>
            <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4"/> Registrar Activo
            </Button>
        </div>
      </header>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Inventario de Propiedades</CardTitle>
            <CardDescription>Detalle de los bienes raíces propiedad del holding.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Valor Contable</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activos.map(activo => (
                        <TableRow key={activo.id}>
                            <TableCell className="font-medium">{activo.tipo}</TableCell>
                            <TableCell>{activo.ubicacion}</TableCell>
                            <TableCell>{activo.area}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[activo.estado]}>{activo.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(activo.valor, 'USD')}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <FileText className="mr-2 h-4 w-4"/> Ver Documentos
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
