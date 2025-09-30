import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ActasMatrimonioPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Actas de Matrimonio</h1>
                <p className="text-muted-foreground">
                    Solicita y gestiona tus actas de matrimonio.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Acta
            </Button>
        </header>
      <Card>
        <CardContent className="pt-6">
          <p>Actualmente no tienes solicitudes de actas de matrimonio.</p>
        </CardContent>
      </Card>
    </div>
  );
}
