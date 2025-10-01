
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileInputTrigger } from "@/components/file-input-trigger";

export default function AntecedentesPenalesPage() {
    const [file, setFile] = useState<File | null>(null);
    const { toast } = useToast();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        toast({
            title: "Archivo Seleccionado",
            description: `CV "${selectedFile.name}" listo para ser procesado.`,
        });
    };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Certificado de Antecedentes Penales</h1>
        <p className="text-muted-foreground">
          Sube tu currículum para obtener tu certificado automáticamente.
        </p>
      </header>
      <Card className="text-center p-8 bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Sube tu CV</CardTitle>
            <CardDescription>Nuestro sistema extraerá la información necesaria para generar el certificado.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <FileInputTrigger onFileSelect={handleFileSelect}>
                <Button>
                    <Upload className="mr-2" />
                    Subir Archivo
                </Button>
            </FileInputTrigger>
            {file && <p className="text-sm text-muted-foreground">Archivo cargado: {file.name}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
