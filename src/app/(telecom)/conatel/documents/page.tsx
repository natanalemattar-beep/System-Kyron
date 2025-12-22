
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, Folder, File, UploadCloud } from "lucide-react";

export default function DocumentsPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestor Documental CONATEL</h1>
                    <p className="text-muted-foreground mt-2">
                        Repositorio central para todos tus documentos y plantillas.
                    </p>
                </div>
                <Button>
                    <UploadCloud className="mr-2" />
                    Cargar Documento
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Navegador de Archivos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                        <Folder className="h-5 w-5 text-primary" />
                        <span className="font-medium">/Documentos CONATEL/</span>
                    </div>
                    <div className="pl-6 space-y-3 border-l-2 ml-3">
                         <div className="flex items-center gap-2 p-3">
                            <Folder className="h-5 w-5 text-yellow-500" />
                            <span>Licencias Activas</span>
                        </div>
                        <div className="pl-6 space-y-2 border-l-2 ml-3">
                             <div className="flex items-center gap-2 p-2">
                                <File className="h-5 w-5 text-muted-foreground"/>
                                <span>CON-001.pdf</span>
                            </div>
                             <div className="flex items-center gap-2 p-2">
                                <File className="h-5 w-5 text-muted-foreground"/>
                                <span>CON-002.pdf</span>
                            </div>
                        </div>

                         <div className="flex items-center gap-2 p-3">
                            <Folder className="h-5 w-5 text-red-500" />
                            <span>En Renovación</span>
                        </div>
                         <div className="pl-6 space-y-2 border-l-2 ml-3">
                            <div className="flex items-center gap-2 p-2">
                                <Folder className="h-5 w-5 text-muted-foreground" />
                                <span>CON-003</span>
                            </div>
                             <div className="pl-6 space-y-2 border-l-2 ml-3">
                                 <div className="flex items-center gap-2 p-2">
                                    <File className="h-5 w-5 text-muted-foreground"/>
                                    <span>Formulario_renovacion.pdf</span>
                                </div>
                                <div className="flex items-center gap-2 p-2">
                                    <File className="h-5 w-5 text-muted-foreground"/>
                                    <span>Pago_derechos.pdf</span>
                                </div>
                            </div>
                        </div>

                         <div className="flex items-center gap-2 p-3">
                            <Folder className="h-5 w-5 text-blue-500" />
                            <span>Plantillas</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
