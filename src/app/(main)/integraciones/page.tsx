
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function IntegracionesPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Cog className="h-8 w-8" />
            Integraciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de integraciones.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Módulo de Integraciones</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás conectar tu cuenta con otros servicios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
