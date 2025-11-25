
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, PlusCircle, CheckCircle, HelpCircle, Users, Landmark, FileText, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const movimientos = [
    { id: 1, empleado: "Ana Pérez", fechaIngreso: "10/01/2022", fechaMovimiento: "11/01/2022", tipo: "Ingreso (14-01)" },
    { id: 2, empleado: "Luis Gómez", fechaIngreso: "15/03/2021", fechaMovimiento: "16/03/2021", tipo: "Ingreso (14-01)" },
    { id: 3, empleado: "Pedro Martinez", fechaIngreso: "10/01/2022", fechaMovimiento: "16/06/2024", tipo: "Egreso (14-02)" },
];

const obligacionesPatrono = [
    { title: "Inscripción de la Empresa", description: "Toda empresa con al menos un trabajador debe inscribirse en el IVSS dentro de los 5 días hábiles siguientes al inicio de actividades." },
    { title: "Inscripción de Trabajadores", description: "Inscribir a cada nuevo trabajador dentro de los 3 días hábiles siguientes a su ingreso." },
    { title: "Notificación de Retiros y Cambios", description: "Informar sobre el retiro de un trabajador o cambios de salario dentro de los 3 días hábiles siguientes." },
    { title: "Pago de Cotizaciones", description: "Retener el aporte del trabajador y pagar mensualmente las cotizaciones (aporte patronal + retención) al IVSS." },
];

const typeVariant: { [key: string]: "default" | "destructive" } = {
  "Ingreso (14-01)": "default",
  "Egreso (14-02)": "destructive",
};

export default function IvssPage() {
    const { toast } = useToast();

    const handleRegister = (type: string) => {
        toast({
            title: "Movimiento Registrado",
            description: `El ${type} del empleado ha sido registrado en el IVSS.`,
        })
    }

  return (
    <div className="space-y-12">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Briefcase className="h-8 w-8" />
                Guía y Gestión del IVSS (Seguro Social)
            </h1>
            <p className="text-muted-foreground mt-2">
              Todo sobre la Ley del Seguro Social, las obligaciones del patrono y la gestión de movimientos de personal.
            </p>
        </header>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><HelpCircle className="text-primary"/>¿Qué es el IVSS y qué cubre?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    El Instituto Venezolano de los Seguros Sociales (IVSS) es la institución pública encargada de la seguridad social. Su objetivo es proteger a los trabajadores y sus familias ante contingencias como:
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
                    <li className="p-4 bg-secondary/50 rounded-lg"><Activity className="mx-auto h-8 w-8 text-primary mb-2"/>Salud</li>
                    <li className="p-4 bg-secondary/50 rounded-lg"><Users className="mx-auto h-8 w-8 text-primary mb-2"/>Vejez</li>
                    <li className="p-4 bg-secondary/50 rounded-lg"><Landmark className="mx-auto h-8 w-8 text-primary mb-2"/>Maternidad</li>
                    <li className="p-4 bg-secondary/50 rounded-lg"><FileText className="mx-auto h-8 w-8 text-primary mb-2"/>Invalidez y Sobrevivencia</li>
                </ul>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Obligaciones del Patrono</CardTitle>
                <CardDescription>Principales deberes que toda empresa debe cumplir ante el IVSS para evitar sanciones.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {obligacionesPatrono.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0"/>
                            <div>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>


        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Historial de Movimientos (Form. 14-01 y 14-02)</CardTitle>
                    <CardDescription>Registro de inscripciones y retiros de empleados en el IVSS.</CardDescription>
                </div>
                 <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2" />
                                Registrar Ingreso
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Registrar Ingreso de Empleado (14-01)</DialogTitle>
                                <DialogDescription>
                                    Complete los datos del empleado para su inscripción en el IVSS.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="empleado-ingreso" className="text-right">Empleado</Label>
                                    <Input id="empleado-ingreso" placeholder="Nombre del Empleado" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={() => handleRegister("ingreso")}>Registrar Ingreso</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                <PlusCircle className="mr-2" />
                                Registrar Egreso
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Registrar Egreso de Empleado (14-02)</DialogTitle>
                                <DialogDescription>
                                    Complete los datos del empleado para su retiro del IVSS.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="empleado-egreso" className="text-right">Empleado</Label>
                                    <Input id="empleado-egreso" placeholder="Nombre del Empleado" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant="destructive" onClick={() => handleRegister("egreso")}>Registrar Egreso</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha de Ingreso a la Empresa</TableHead>
                            <TableHead>Fecha del Movimiento IVSS</TableHead>
                            <TableHead className="text-center">Tipo de Movimiento</TableHead>
                            <TableHead className="text-right">QR de Verificación</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimientos.map((mov) => (
                            <TableRow key={mov.id}>
                                <TableCell className="font-medium">{mov.empleado}</TableCell>
                                <TableCell>{mov.fechaIngreso}</TableCell>
                                <TableCell>{mov.fechaMovimiento}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={typeVariant[mov.tipo]}>{mov.tipo}</Badge>
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=ivss-mov-${mov.id}`} alt={`QR for ${mov.id}`} width={24} height={24} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Guía Práctica y Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>¿Cómo se calcula el aporte al IVSS?</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-muted-foreground">El aporte se calcula aplicando un porcentaje sobre el salario del trabajador. Una parte es retenida al trabajador y otra es aportada por el patrono. El monto total se paga mensualmente al IVSS. Existen topes salariales para el cálculo de estas cotizaciones.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>¿Qué es el Formulario 14-01 y 14-02?</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-muted-foreground">El <strong>Formulario 14-01</strong> se utiliza para la inscripción inicial de la empresa ante el IVSS. El <strong>Formulario 14-02</strong> se utiliza para registrar los movimientos de los empleados, como ingresos, egresos y cambios de salario.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>¿Qué sucede si no inscribo a un trabajador a tiempo?</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-muted-foreground">No inscribir a un trabajador o notificar su retiro fuera de los 3 días hábiles establecidos genera multas y sanciones para la empresa. Además, el trabajador podría perder el derecho a recibir prestaciones en caso de una contingencia.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
