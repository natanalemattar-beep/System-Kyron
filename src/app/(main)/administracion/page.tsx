
// This is a placeholder file. You can delete it if you want.
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function AdministracionPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Administración
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de administración de la empresa.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Módulo de Administración</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás gestionar los roles de usuario y configuraciones de la empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
