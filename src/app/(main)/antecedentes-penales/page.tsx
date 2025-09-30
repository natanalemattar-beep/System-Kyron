
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function AntecedentesPenalesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Certificado de Antecedentes Penales</h1>
        <p className="text-muted-foreground">
          Sube tu currículum para obtener tu certificado automáticamente.
        </p>
      </header>
      <Card className="text-center p-8">
        <CardHeader>
            <CardTitle>Sube tu CV</CardTitle>
            <CardDescription>Nuestro sistema extraerá la información necesaria para generar el certificado.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button>
                <Upload className="mr-2" />
                Subir Archivo
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
