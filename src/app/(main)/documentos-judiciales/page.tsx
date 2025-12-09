
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode, Gavel } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type Documento = {
  id: string;
  fecha: string;
  tipo: string;
  caso: string;
  estado: "Activo" | "Archivado";
};

const documentos: Documento[] = [
    {
        id: "DJ-2024-001",
        fecha: "10/06/2024",
        tipo: "Sentencia Definitiva",
        caso: "Expediente N° 123-456",
        estado: "Archivado",
    },
    {
        id: "DJ-2024-002",
        fecha: "20/07/2024",
        tipo: "Auto de Admisión",
        caso: "Expediente N° 789-012",
        estado: "Activo",
    },
    {
        id: "DJ-2024-003",
        fecha: "25/07/2024",
        tipo: "Medida Cautelar",
        caso: "Expediente N° 345-678",
        estado: "Activo",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Archivado: "outline",
  Activo: "secondary",
};


export default function DocumentosJudicialesPage() {
    const [filter, setFilter] = useState("todos");

    const filteredDocumentos = documentos.filter(d => {
        if (filter === "todos") return true;
        return d.estado.toLowerCase() === filter;
    });

  return (
    <div className="space-y-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gavel className="h-8 w-8"/>
            Documentos Judiciales
          </h1>
          <p className="text-muted-foreground">
            Consulta y gestiona tus documentos judiciales.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Nueva Solicitud
        </Button>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Mis Documentos</CardTitle>
            <CardDescription>Historial de documentos asociados a tus casos.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                 <TabsList className="grid w-full grid-cols-3 max-w-md mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="activo">Activos</TabsTrigger>
                    <TabsTrigger value="archivado">Archivados</TabsTrigger>
                </TabsList>
                 <TabsContent value={filter}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nro. Documento</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Caso</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDocumentos.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.id}</TableCell>
                                    <TableCell>{doc.fecha}</TableCell>
                                    <TableCell>{doc.tipo}</TableCell>
                                    <TableCell>{doc.caso}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[doc.estado]}>{doc.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=doc-judicial-${doc.id}`} alt={`QR for ${doc.id}`} width={24} height={24} className="inline-block mr-2" />
                                        <Button variant="ghost" size="icon" className="mr-2">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <FileDown className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredDocumentos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">No hay documentos en este estado.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
