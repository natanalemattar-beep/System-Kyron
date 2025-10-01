
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Archive } from "lucide-react";

export default function InventarioPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Archive className="h-8 w-8" />
            Inventario
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de gestión de inventario.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Módulo de Inventario</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás gestionar tu inventario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
