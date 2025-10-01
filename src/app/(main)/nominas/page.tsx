
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle, Calculator, Eye, Send, Mail, MessageCircle, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const empleados = [
    { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", salarioBase: 12000, estado: "Activo", email: "ana.perez@email.com", telefono: "0412-1112233" },
    { id: 2, nombre: "Luis Gómez", cedula: "V-18.765.432", cargo: "Desarrollador Senior", salarioBase: 10500, estado: "Activo", email: "luis.gomez@email.com", telefono: "0414-4445566" },
    { id: 3, nombre: "María Rodriguez", cedula: "V-20.111.222", cargo: "Diseñadora UI/UX", salarioBase: 9000, estado: "De Vacaciones", email: "maria.r@email.com", telefono: "0416-7778899" },
    { id: 4, nombre: "Carlos Sanchez", cedula: "E-8.999.000", cargo: "Analista de Calidad", salarioBase: 8500, estado: "Activo", email: "carlos.sanchez@email.com", telefono: "0424-0001122" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Activo: "default",
  "De Vacaciones": "secondary",
  Inactivo: "outline",
};

export default function NominasPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof empleados)[0] | null>(null);
  const { toast } = useToast();

  const handleOpenDialog = (employee: (typeof empleados)[0]) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleSend = (method: 'whatsapp' | 'email') => {
    // Simulate sending action
    console.log(`Sending receipt to ${selectedEmployee?.nombre} via ${method}`);
    toast({
      title: "Recibo Enviado Exitosamente",
      description: `El recibo de ${selectedEmployee?.nombre} fue enviado por ${method} y archivado en la nube.`,
    });
    setIsDialogOpen(false);
  };


  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    Gestión de Nóminas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Administra el personal y calcula la nómina de tu empresa.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <PlusCircle className="mr-2" />
                    Agregar Empleado
                </Button>
                <Button>
                    <Calculator className="mr-2" />
                    Calcular Nómina
                </Button>
            </div>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Lista de Empleados</CardTitle>
                <CardDescription>Visualiza la información de los empleados y gestiona sus recibos de pago.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cédula</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-right">Salario Base</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {empleados.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell className="font-medium">{emp.nombre}</TableCell>
                                <TableCell>{emp.cedula}</TableCell>
                                <TableCell>{emp.cargo}</TableCell>
                                <TableCell className="text-right">{formatCurrency(emp.salarioBase, 'Bs.')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={statusVariant[emp.estado]}>{emp.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button asChild variant="outline" size="sm">
                                       <Link href={`/nominas/${emp.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Ver Recibo
                                       </Link>
                                    </Button>
                                    <Button variant="default" size="sm" onClick={() => handleOpenDialog(emp)}>
                                        <Send className="mr-2 h-4 w-4" />
                                        Enviar Recibo
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {selectedEmployee && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enviar Recibo de Pago a {selectedEmployee.nombre}</DialogTitle>
                        <DialogDescription>
                            Selecciona el método de envío. Una copia del recibo se guardará automáticamente en la nube.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <Button className="w-full justify-start" onClick={() => handleSend('whatsapp')}>
                            <MessageCircle className="mr-2" />
                            Enviar a WhatsApp ({selectedEmployee.telefono})
                        </Button>
                        <Button className="w-full justify-start" onClick={() => handleSend('email')}>
                            <Mail className="mr-2" />
                            Enviar a Correo Electrónico ({selectedEmployee.email})
                        </Button>
                    </div>
                    <DialogFooter className="border-t pt-4">
                        <div className="flex items-center text-sm text-muted-foreground w-full">
                            <Cloud className="mr-2 h-4 w-4 text-green-500"/>
                            <span>El recibo se archivará de forma segura en la nube.</span>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
    </div>
  );
}
