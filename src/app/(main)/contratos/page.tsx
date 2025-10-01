
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileSignature } from "lucide-react";

export default function ContratosPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileSignature className="h-8 w-8" />
            Contratos
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de gestión de contratos.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Módulo de Contratos</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás crear y gestionar tus contratos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
