
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DocumentosPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Mis Documentos</CardTitle>
          <CardDescription>
            Aquí encontrarás todos tus documentos personales gestionados a través de la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Sección de documentos en construcción.</p>
        </CardContent>
      </Card>
    </div>
  );
}
