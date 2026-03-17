
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CirclePlus as PlusCircle, CalendarDays, MapPin, Briefcase, Eye, Calendar, Mail, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const vacantes = [
    { id: 1, titulo: "Desarrollador Full-Stack", modalidad: "Remoto", candidatos: 12 },
    { id: 2, titulo: "Diseñador UI/UX Senior", modalidad: "Híbrido", candidatos: 5 },
    { id: 3, titulo: "Analista Contable", modalidad: "Presencial", candidatos: 25 },
];

const candidatos = [
    { id: 1, nombre: "Elena Torres", vacante: "Desarrollador Full-Stack", fecha: "Hace 2 días", estado: "En revisión" },
    { id: 2, nombre: "Ricardo Mendoza", vacante: "Desarrollador Full-Stack", fecha: "Hace 1 día", estado: "En revisión" },
    { id: 3, nombre: "Sofía Castro", vacante: "Diseñador UI/UX Senior", fecha: "Hace 5 horas", estado: "Entrevista Agendada" },
    { id: 4, nombre: "Andrés Rojas", vacante: "Analista Contable", fecha: "Ayer", estado: "Aceptado" },
    { id: 5, nombre: "Valentina Gil", vacante: "Analista Contable", fecha: "Hace 3 días", estado: "Rechazado" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "En revisión": "secondary",
  "Entrevista Agendada": "default",
  "Aceptado": "default",
  "Rechazado": "destructive",
};

export default function ReclutamientoPage() {
    const { toast } = useToast();

    const handleAction = (action: string, candidateName: string) => {
        toast({
            title: `Acción: ${action}`,
            description: `Se ha procesado la acción para el candidato ${candidateName}.`
        });
    }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserPlus className="h-8 w-8" />
                Portal de Reclutamiento y Selección
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona el ciclo completo de atracción de talento, desde la vacante hasta la contratación.
            </p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2" />
                    Publicar Nueva Vacante
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva Vacante</DialogTitle>
                    <DialogDescription>
                        Complete la información para publicar una nueva oportunidad de empleo.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="titulo-vacante" className="text-right">Título del Cargo</Label>
                        <Input id="titulo-vacante" placeholder="Ej: Gerente de Ventas" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="modalidad-vacante" className="text-right">Modalidad</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="presencial">Presencial</SelectItem>
                                <SelectItem value="remoto">Remoto</SelectItem>
                                <SelectItem value="hibrido">Híbrido</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Publicar Vacante</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Vacantes Activas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vacantes.map(vacante => (
                <Card key={vacante.id} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>{vacante.titulo}</CardTitle>
                        <CardDescription className="flex items-center gap-4 pt-2">
                             <Badge variant="outline" className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {vacante.modalidad}</Badge>
                             <Badge variant="outline" className="flex items-center gap-1"><Briefcase className="h-3 w-3"/> {vacante.candidatos} Candidatos</Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Ver Candidatos</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Bandeja de Candidatos Recibidos</CardTitle>
                <CardDescription>
                    Listado de todos los profesionales que han aplicado a las vacantes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Vacante</TableHead>
                            <TableHead>Fecha de Postulación</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidatos.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.nombre}</TableCell>
                                <TableCell>{c.vacante}</TableCell>
                                <TableCell>{c.fecha}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={statusVariant[c.estado]}>{c.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="icon" title="Ver CV" onClick={() => handleAction('Ver CV', c.nombre)}>
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Agendar Entrevista" onClick={() => handleAction('Agendar Entrevista', c.nombre)}>
                                        <Calendar className="h-4 w-4" />
                                    </Button>
                                     <Button variant="ghost" size="icon" title="Contactar por Correo" onClick={() => handleAction('Contactar por Correo', c.nombre)}>
                                        <Mail className="h-4 w-4" />
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
