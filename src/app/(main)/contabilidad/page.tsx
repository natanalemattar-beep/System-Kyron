
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ContabilidadPage() {
  return (
    <div>
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Reportes Contables
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de reportes contables.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Reportes Contables</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás generar y visualizar tus estados financieros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}

    
