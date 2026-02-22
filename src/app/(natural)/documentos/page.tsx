
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { File, Download, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const documentos = [
    { id: "DOC-001", nombre: "Cédula de Identidad Digital", tipo: "PDF", tamano: "1.2 MB", fecha: "15/01/2024" },
    { id: "DOC-002", nombre: "RIF Personal (V-12345678-9)", tipo: "PDF", tamano: "0.8 MB", fecha: "20/05/2024" },
    { id: "DOC-003", nombre: "Pasaporte (Página Principal)", tipo: "JPG", tamano: "2.5 MB", fecha: "10/02/2023" },
    { id: "DOC-004", nombre: "Título Universitario", tipo: "PDF", tamano: "4.1 MB", fecha: "05/11/2022" },
];

export default function MisDocumentosPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Mis Documentos</h1>
                <p className="text-muted-foreground mt-2">Tu bóveda digital segura para documentos de identidad y civiles.</p>
            </header>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar documentos..." className="pl-10" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documentos.map(doc => (
                    <Card key={doc.id} className="hover:border-primary transition-colors cursor-pointer group">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <File className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base">{doc.nombre}</CardTitle>
                                <CardDescription>{doc.fecha} • {doc.tamano}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1"><Eye className="mr-2 h-4 w-4"/> Ver</Button>
                            <Button variant="outline" size="sm" className="flex-1"><Download className="mr-2 h-4 w-4"/> Bajar</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
