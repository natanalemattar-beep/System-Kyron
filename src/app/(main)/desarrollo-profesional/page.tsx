
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Search, ArrowRight, BookOpen, Users, Award, Star, MessageSquare, Target, Heart, Sparkles, HeartHandshake } from "lucide-react";
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
    titulo: "Empresas que sobresalen (Good to Great)",
    autor: "Jim Collins",
    descripcion: "Un estudio sobre las empresas que lograron pasar de ser buenas a ser magníficas, con lecciones sobre liderazgo y estrategias.",
    imagen: "https://picsum.photos/seed/book4/300/400"
  },
  {
    titulo: "El ejecutivo al minuto",
    autor: "Kenneth Blanchard",
    descripcion: "Un libro fácil de leer que enseña principios de administración de manera eficiente.",
    imagen: "https://picsum.photos/seed/book5/300/400"
  },
  {
    titulo: "El método Lean Startup",
    autor: "Eric Ries",
    descripcion: "Ofrece un marco para construir negocios innovadores de manera más rápida y eficiente, basándose en la experimentación.",
    imagen: "https://picsum.photos/seed/book6/300/400"
  },
  {
    titulo: "La semana laboral de 4 horas",
    autor: "Timothy Ferriss",
    descripcion: "Enseña cómo diseñar un estilo de vida y crear un negocio que libere tiempo y recursos, en lugar de atarse a él.",
    imagen: "https://picsum.photos/seed/book7/300/400"
  },
  {
    titulo: "Startup de Riesgo Cero",
    autor: "Paulo Andrez",
    descripcion: "Proporciona herramientas para detectar y evitar riesgos en una nueva empresa, buscando construir negocios más seguros.",
    imagen: "https://picsum.photos/seed/book8/300/400"
  },
  {
    titulo: "Empieza con el porqué",
    autor: "Simon Sinek",
    descripcion: "Explora el poder del propósito en el liderazgo y cómo esta idea puede inspirar y motivar a empleados y clientes.",
    imagen: "https://picsum.photos/seed/book9/300/400"
  },
  {
    titulo: "Nunca te pares (Shoe Dog)",
    autor: "Phil Knight",
    descripcion: "La historia del fundador de Nike, que ofrece una perspectiva motivadora sobre la perseverancia y el espíritu emprendedor.",
    imagen: "https://picsum.photos/seed/book10/300/400"
  },
];

const capacitaciones = [
    { titulo: "Liderazgo Efectivo en Entornos Híbridos", icon: Users },
    { titulo: "Taller de Comunicación Asertiva", icon: MessageSquare },
    { titulo: "Certificación en Metodologías Ágiles", icon: Award },
]

export default function DesarrolloProfesionalPage() {
  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-yellow-400" />
            Portal de Crecimiento y Bienestar
        </h1>
        <p className="text-muted-foreground mt-2">
          Invierte en tu desarrollo y aprovecha las herramientas para crecer.
        </p>
      </header>

    {/* Secciones de Desarrollo, Reconocimiento y Bienestar */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Capacitación */}
        <Card className="flex flex-col bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen/> Capacitación Continua</CardTitle>
                <CardDescription>Adquiere nuevas habilidades y conocimientos.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                {capacitaciones.map(c => (
                    <div key={c.titulo} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <c.icon className="h-5 w-5 text-primary" />
                        <span>{c.titulo}</span>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full">Ver Catálogo de Cursos</Button>
            </CardFooter>
        </Card>

        {/* Mentoría */}
        <Card className="flex flex-col bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users/> Programa de Mentoría</CardTitle>
                <CardDescription>Conecta con líderes experimentados y acelera tu crecimiento.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-center flex flex-col items-center justify-center">
                 <Image src="https://picsum.photos/seed/mentoring/400/250" alt="Mentoría" width={400} height={250} className="rounded-lg mb-4" />
                 <p className="text-sm text-muted-foreground">Encuentra un mentor que te guíe en tu carrera profesional.</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Buscar un Mentor</Button>
            </CardFooter>
        </Card>

        {/* Reconocimiento */}
        <Card className="flex flex-col bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star/> Reconocimientos</CardTitle>
                <CardDescription>Celebramos tus logros y contribuciones.</CardDescription>
            </CardHeader>
             <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <Award className="h-6 w-6 text-yellow-500"/>
                    <div>
                        <p className="font-semibold">Empleado del Mes</p>
                        <p className="text-sm text-muted-foreground">¡Felicidades, Luis Gómez!</p>
                    </div>
                </div>
                 <p className="text-sm text-center text-muted-foreground pt-4">Aquí verás los reconocimientos que has recibido.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full">Ver Historial de Logros</Button>
            </CardFooter>
        </Card>

         {/* Feedback y Metas */}
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target/> Feedback y Metas</CardTitle>
                <CardDescription>Define tus objetivos y recibe retroalimentación constructiva.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button className="w-full justify-between">
                    <span>Ver mis Metas del Q3</span>
                    <ArrowRight/>
                </Button>
                 <Button variant="secondary" className="w-full justify-between">
                    <span>Agendar Sesión de Feedback</span>
                     <ArrowRight/>
                </Button>
            </CardContent>
        </Card>
        
        {/* Bienestar */}
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><HeartHandshake/> Bienestar y Apoyo</CardTitle>
                <CardDescription>Tu salud y equilibrio son nuestra prioridad.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Accede a recursos de bienestar, pausas activas y solicita horarios flexibles. Brindamos apoyo en caso de enfermedad del trabajador o de un familiar directo.</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full">Explorar Programas de Apoyo</Button>
            </CardFooter>
        </Card>
    </div>

    {/* Biblioteca */}
      <div className="space-y-8 pt-8">
        <h2 className="text-2xl font-bold tracking-tight">Biblioteca de Recursos</h2>
        <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
                type="text"
                placeholder="Buscar libros por título o autor..."
                className="w-full bg-background border rounded-md h-12 pl-12 pr-4"
            />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {libros.map((libro) => (
            <Card key={libro.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="relative aspect-[3/4] mb-4">
                        <Image src={libro.imagen} alt={`Portada de ${libro.titulo}`} layout="fill" className="rounded-md object-cover"/>
                    </div>
                <CardTitle className="text-lg">{libro.titulo}</CardTitle>
                <CardDescription>por {libro.autor}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{libro.descripcion}</p>
                </CardContent>
                <CardFooter>
                <Button variant="outline" className="w-full">
                    Leer más
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
      </div>

    </div>
  );
}
