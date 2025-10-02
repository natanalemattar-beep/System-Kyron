
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function CreditosPage() {
  return (
    <div>
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Créditos
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de gestión de créditos.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Créditos</CardTitle>
          <CardDescription>
            Sección en construcción. Aquí podrás gestionar los créditos de tus clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}

    
