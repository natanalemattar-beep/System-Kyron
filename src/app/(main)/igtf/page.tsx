
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Percent } from "lucide-react";

export default function IgtfPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Percent className="h-8 w-8" />
            IGTF & Exoneraciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de IGTF y exoneraciones.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>IGTF & Exoneraciones</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás gestionar el IGTF y las exoneraciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
