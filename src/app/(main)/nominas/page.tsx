

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle, Calculator, Eye, Send, Mail, MessageCircle, Cloud, FileText, Printer, Briefcase, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Simple Telegram Icon
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);


const empleados = [
    { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", salarioBase: 12000, estado: "Activo", email: "ana.perez@email.com", telefono: "0412-1112233", fechaIngreso: "01/01/2020", departamento: "Gerencia" },
    { id: 2, nombre: "Luis Gómez", cedula: "V-18.765.432", cargo: "Desarrollador Senior", salarioBase: 10500, estado: "Activo", email: "luis.gomez@email.com", telefono: "0414-4445566", fechaIngreso: "15/03/2021", departamento: "Tecnología" },
    { id: 3, nombre: "María Rodriguez", cedula: "V-20.111.222", cargo: "Diseñadora UI/UX", salarioBase: 9000, estado: "De Vacaciones", email: "maria.r@email.com", telefono: "0416-7778899", fechaIngreso: "10/06/2022", departamento: "Diseño" },
    { id: 4, nombre: "Carlos Sanchez", cedula: "E-8.999.000", cargo: "Analista de Calidad", salarioBase: 8500, estado: "Activo", email: "carlos.sanchez@email.com", telefono: "0424-0001122", fechaIngreso: "01/11/2023", departamento: "Calidad" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Activo: "default",
  "De Vacaciones": "secondary",
  Inactivo: "outline",
};

export default function NominasPage() {
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isCartaDialogOpen, setIsCartaDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof empleados)[0] | null>(null);
  const { toast } = useToast();

  const handleOpenSendDialog = (employee: (typeof empleados)[0]) => {
    setSelectedEmployee(employee);
    setIsSendDialogOpen(true);
  };
  
  const handleOpenCartaDialog = (employee: (typeof empleados)[0]) => {
    setSelectedEmployee(employee);
    setIsCartaDialogOpen(true);
  };

  const handleSend = (method: 'whatsapp' | 'email') => {
    toast({
      title: "Recibo Enviado Exitosamente",
      description: `El recibo de ${selectedEmployee?.nombre} fue enviado por ${method} y archivado en la nube.`,
    });
    setIsSendDialogOpen(false);
  };

  const handleSendCarta = (method: 'whatsapp' | 'email' | 'telegram') => {
    toast({
      title: "Carta de Trabajo Enviada",
      description: `La carta de trabajo de ${selectedEmployee?.nombre} fue enviada por ${method}.`,
    });
    setIsCartaDialogOpen(false);
  };
  
  const handleExportContacts = () => {
    const headers = ["Nombre", "Cargo", "Departamento", "Teléfono", "Email"];
    const csvContent = [
        headers.join(","),
        ...empleados.map(e => [e.nombre, e.cargo, e.departamento, e.telefono, e.email].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "contactos_empleados.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    toast({
        title: "Exportación Completa",
        description: "Los contactos de los empleados han sido exportados a un archivo CSV."
    });
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
                <Button variant="outline" onClick={handleExportContacts}>
                    <Download className="mr-2"/>
                    Exportar Contactos
                </Button>
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

        <Card className="bg-card/50 backdrop-blur-sm">
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
                                <TableCell className="text-right space-x-1">
                                    <Button asChild variant="ghost" size="sm">
                                       <Link href={`/nominas/${emp.id}`}>
                                            <Eye className="h-4 w-4" />
                                       </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleOpenSendDialog(emp)}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleOpenCartaDialog(emp)}>
                                        <Briefcase className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Send Receipt Dialog */}
        {selectedEmployee && (
            <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
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

        {/* Generate Work Certificate Dialog */}
        {selectedEmployee && (
           <Dialog open={isCartaDialogOpen} onOpenChange={setIsCartaDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Carta de Trabajo: {selectedEmployee.nombre}</DialogTitle>
                        <DialogDescription>
                            Previsualización de la carta de trabajo. Puedes enviarla o imprimirla.
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="my-4">
                        <CardContent className="p-8 text-sm text-justify space-y-6 relative">
                            <h3 className="text-center font-bold text-lg mb-8">CARTA DE TRABAJO</h3>
                            <p className="pt-8">A quien pueda interesar,</p>
                            <p>
                                Por medio de la presente hacemos constar que el(la) ciudadano(a) <span className="font-bold">{selectedEmployee.nombre}</span>, titular de la cédula de identidad N° <span className="font-bold">{selectedEmployee.cedula}</span>, presta sus servicios en nuestra empresa, Empresa S.A. (RIF: J-12345678-9), desde el <span className="font-bold">{selectedEmployee.fechaIngreso}</span>, desempeñando el cargo de <span className="font-bold">{selectedEmployee.cargo}</span> y devengando un salario mensual de <span className="font-bold">{formatCurrency(selectedEmployee.salarioBase, 'Bs.')}</span>.
                            </p>
                            <p>
                                Constancia que se expide a petición de la parte interesada en la ciudad de Caracas, a los {formatDate(new Date().toISOString())}.
                            </p>
                            
                            <div className="pt-24 text-center">
                                <p className="border-t-2 border-foreground inline-block px-8 pt-2">Atentamente,</p>
                                <p className="font-bold">Recursos Humanos</p>
                                <p>Empresa S.A.</p>
                            </div>
                            
                            <div className="absolute bottom-8 right-8">
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=empleado-id-${selectedEmployee.id}`} alt={`QR para ${selectedEmployee.nombre}`} width={60} height={60} />
                            </div>
                        </CardContent>
                    </Card>
                    <DialogFooter className="sm:justify-between">
                         <div className="flex gap-2">
                            <Button className="w-full justify-start" onClick={() => handleSendCarta('whatsapp')}>
                                <MessageCircle className="mr-2" />
                                WhatsApp
                            </Button>
                            <Button className="w-full justify-start" onClick={() => handleSendCarta('email')}>
                                <Mail className="mr-2" />
                                Email
                            </Button>
                             <Button className="w-full justify-start" onClick={() => handleSendCarta('telegram')}>
                                <TelegramIcon className="mr-2" />
                                Telegram
                            </Button>
                        </div>
                        <Button variant="outline" onClick={() => window.print()}>
                            <Printer className="mr-2" />
                            Imprimir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
    </div>
  );
}
