
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Search, ArrowRight } from "lucide-react";
import Image from "next/image";

const libros = [
  {
    titulo: "La nueva fórmula del trabajo",
    autor: "Laszlo Bock",
    descripcion: "Revela los secretos de cómo Google se convirtió en un modelo de gestión de talento y cultura organizacional.",
    imagen: "https://picsum.photos/seed/book1/300/400"
  },
  {
    titulo: "El arte de dirigir personas hoy",
    autor: "Santiago Larduet",
    descripcion: "Una guía práctica para liderar equipos en el entorno actual, enfocada en la comunicación y la empatía.",
    imagen: "https://picsum.photos/seed/book2/300/400"
  },
  {
    titulo: "Las cinco disfunciones de un equipo",
    autor: "Patrick Lencioni",
    descripcion: "Una fábula de liderazgo que explora las barreras que impiden que los equipos alcancen su máximo potencial.",
    imagen: "https://picsum.photos/seed/book3/300/400"
  },
  {
    titulo: "Cómo motivar y comprometer a los empleados",
    autor: "Harvard Business Review",
    descripcion: "Recopilación de artículos de HBR con estrategias probadas para aumentar el compromiso y la motivación.",
    imagen: "https://picsum.photos/seed/book4/300/400"
  },
  {
    titulo: "El código del liderazgo",
    autor: "Dave Ulrich, Norm Smallwood, Kate Sweetman",
    descripcion: "Define las cinco reglas clave que debe dominar todo líder para generar valor y resultados sostenibles.",
     imagen: "https://picsum.photos/seed/book5/300/400"
  },
];

export default function DesarrolloProfesionalPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bookmark className="h-8 w-8" />
            Desarrollo Profesional
        </h1>
        <p className="text-muted-foreground mt-2">
          Biblioteca de recursos para la gestión y desarrollo del talento humano.
        </p>
      </header>

      <div className="mb-8 relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <input
            type="text"
            placeholder="Buscar libros por título o autor..."
            className="w-full bg-background border rounded-md h-12 pl-12 pr-4"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {libros.map((libro) => (
          <Card key={libro.titulo} className="flex flex-col">
            <CardHeader>
                <div className="relative aspect-[3/4] mb-4">
                    <Image src={libro.imagen} alt={`Portada de ${libro.titulo}`} layout="fill" className="rounded-md object-cover"/>
                </div>
              <CardTitle>{libro.titulo}</CardTitle>
              <CardDescription>por {libro.autor}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{libro.descripcion}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    