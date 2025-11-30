
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Heart, Gavel, ArrowRight } from "lucide-react";
import Link from "next/link";

const documents = [
    {
        title: "Partida de Nacimiento",
        description: "Documento digital de tu partida de nacimiento solicitada.",
        icon: Heart,
        href: "/partidas-nacimiento"
    },
    {
        title: "Acta de Matrimonio",
        description: "Copia certificada de tu acta de matrimonio.",
        icon: FileText,
        href: "/actas-matrimonio"
    },
    {
        title: "Sentencia Judicial",
        description: "Documento de la sentencia del caso EXP-001-2024.",
        icon: Gavel,
        href: "/documentos-judiciales"
    }
]

export default function DocumentosPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8"/>
            Mis Documentos
        </h1>
        <p className="text-muted-foreground mt-2">
          Aquí encontrarás todos tus documentos personales gestionados a través de la plataforma.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
            <Card key={doc.title} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <doc.icon className="h-6 w-6 text-primary"/>
                        {doc.title}
                    </CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={doc.href}>
                            Gestionar Documento <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
