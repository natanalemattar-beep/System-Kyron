
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ContabilidadPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de contabilidad general.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Contabilidad</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás gestionar la contabilidad de tu empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
