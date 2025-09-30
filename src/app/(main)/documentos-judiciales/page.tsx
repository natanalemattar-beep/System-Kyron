import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function DocumentosJudicialesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos Judiciales</h1>
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
        <CardContent className="pt-6">
          <p>Actualmente no tienes documentos judiciales.</p>
        </CardContent>
      </Card>
    </div>
  );
}
