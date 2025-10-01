
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const initialBudgetItems = [
    { id: 1, categoria: "Marketing y Publicidad", presupuestado: 5000, gastado: 3200 },
    { id: 2, categoria: "Salarios y Nómina", presupuestado: 15000, gastado: 14500 },
    { id: 3, categoria: "Suministros de Oficina", presupuestado: 1200, gastado: 1350 },
    { id: 4, categoria: "Alquiler y Servicios", presupuestado: 2500, gastado: 2500 },
    { id: 5, categoria: "Desarrollo y Tecnología", presupuestado: 8000, gastado: 6000 },
];

export default function PresupuestoPage() {
  const { toast } = useToast();

  const handleAddBudget = () => {
    toast({
      title: "Partida Añadida",
      description: "La nueva partida presupuestaria ha sido añadida exitosamente.",
    });
  };

  const totalPresupuestado = initialBudgetItems.reduce((acc, item) => acc + item.presupuestado, 0);
  const totalGastado = initialBudgetItems.reduce((acc, item) => acc + item.gastado, 0);
  const totalSaldo = totalPresupuestado - totalGastado;

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <PieChart className="h-8 w-8" />
                    Gestión de Presupuesto
                </h1>
                <p className="text-muted-foreground mt-2">
                    Planifica y controla los gastos de tu empresa.
                </p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Añadir Partida
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Nueva Partida Presupuestaria</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="categoria" className="text-right">Categoría</Label>
                            <Input id="categoria" placeholder="Ej: Viajes" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="monto" className="text-right">Monto</Label>
                            <Input id="monto" type="number" placeholder="Ej: 3000" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleAddBudget}>Guardar Partida</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

         <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{formatCurrency(totalPresupuestado, 'Bs.')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{formatCurrency(totalGastado, 'Bs.')}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={`text-2xl font-bold ${totalSaldo < 0 ? 'text-destructive' : 'text-green-500'}`}>{formatCurrency(totalSaldo, 'Bs.')}</p>
                </CardContent>
            </Card>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Desglose del Presupuesto</CardTitle>
                <CardDescription>Detalle de gastos por categoría para el período actual.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-2/5">Categoría</TableHead>
                            <TableHead className="text-right">Presupuestado</TableHead>
                            <TableHead className="text-right">Gastado</TableHead>
                            <TableHead className="text-right">Saldo</TableHead>
                             <TableHead className="w-1/5 text-center">Progreso</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialBudgetItems.map((item) => {
                            const saldo = item.presupuestado - item.gastado;
                            const progreso = (item.gastado / item.presupuestado) * 100;
                            return (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.categoria}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.presupuestado, 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.gastado, 'Bs.')}</TableCell>
                                <TableCell className={`text-right font-semibold ${saldo < 0 ? 'text-destructive' : 'text-green-500'}`}>{formatCurrency(saldo, 'Bs.')}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center gap-2">
                                        <Progress value={progreso} className="h-2" />
                                        <span className="text-xs text-muted-foreground">{Math.round(progreso)}%</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
