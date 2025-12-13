
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle, Shield, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { Progress } from "@/components/ui/progress";

export default function AntecedentesPenalesPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const { toast } = useToast();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setStatus('idle');
        toast({
            title: "Archivo Seleccionado",
            description: `CV "${selectedFile.name}" listo para ser procesado.`,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
             toast({
                variant: "destructive",
                title: "No hay archivo",
                description: "Por favor, sube tu currículum para continuar.",
            });
            return;
        }

        setStatus('processing');
        toast({
            title: "Procesando Solicitud...",
            description: "Estamos extrayendo tus datos y generando el certificado.",
        });

        // Simulate API call and processing
        setTimeout(() => {
            setStatus('success');
            toast({
                title: "¡Certificado Generado Exitosamente!",
                description: "Tu certificado de antecedentes penales está listo para descargar.",
                action: <CheckCircle className="text-green-500" />
            });
        }, 3000);
    }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8"/>
            Certificado de Antecedentes Penales
        </h1>
        <p className="text-muted-foreground">
          Sube tu currículum vitae (CV) para obtener tu certificado automáticamente.
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <Card className="text-center p-8 max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Sube tu CV</CardTitle>
                <CardDescription>Nuestro sistema extraerá la información necesaria para generar el certificado de forma segura y rápida.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                 <FileInputTrigger onFileSelect={handleFileSelect}>
                    <Button variant="outline" type="button">
                        <Upload className="mr-2" />
                        {file ? "Cambiar Archivo" : "Subir Archivo (.pdf, .doc)"}
                    </Button>
                </FileInputTrigger>
                {file && <p className="text-sm text-muted-foreground">Archivo cargado: {file.name}</p>}
                
                {status === 'processing' && (
                    <div className="w-full mt-4">
                        <Progress value={50} className="w-full animate-pulse" />
                        <p className="text-sm text-muted-foreground mt-2">Procesando...</p>
                    </div>
                )}

                {status === 'success' && (
                     <div className="w-full mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex flex-col items-center">
                        <CheckCircle className="h-10 w-10 text-green-500 mb-2"/>
                        <p className="font-semibold">Certificado Listo</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
                 {status !== 'success' ? (
                     <Button type="submit" className="w-full" disabled={status === 'processing' || !file}>
                        {status === 'processing' ? <Loader2 className="mr-2 animate-spin"/> : <Shield className="mr-2"/>}
                        {status === 'processing' ? "Generando..." : "Generar Certificado"}
                    </Button>
                 ) : (
                     <Button type="button" className="w-full" onClick={() => toast({title: "Descarga Iniciada"})}>
                        <Download className="mr-2"/>
                        Descargar Certificado
                    </Button>
                 )}
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
