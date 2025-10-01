
// This is a placeholder file. You can delete it if you want.
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function GeneralPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Cog className="h-8 w-8" />
            General
        </h1>
        <p className="text-muted-foreground mt-2">
          Módulo de configuraciones generales.
        </p>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Módulo General</CardTitle>
          <CardDescription>
            Sección en construcción.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente...</p>
        </CardContent>
      </Card>
    </div>
  );
}
