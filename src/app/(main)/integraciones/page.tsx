

"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, Users, Home, BookOpen, HeartHandshake, VenetianMask, FlaskConical, Trophy, Shield, Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const parafiscales = [
    {
        icon: Landmark,
        titulo: "IVSS (Seguro Social Obligatorio)",
        descripcion: "Aporte patronal y retención al trabajador para cubrir contingencias de salud, maternidad, vejez, etc.",
        ente: "Instituto Venezolano de los Seguros Sociales"
    },
    {
        icon: Users,
        titulo: "RPE (Régimen Prestacional de Empleo)",
        descripcion: "Conocido como 'Paro Forzoso', protege al trabajador en caso de terminación de la relación laboral.",
        ente: "IVSS"
    },
    {
        icon: Home,
        titulo: "FAOV (Fondo de Ahorro para la Vivienda)",
        descripcion: "Aporte mensual para el fondo de ahorro habitacional, anteriormente conocido como LPH.",
        ente: "BANAVIH"
    },
    {
        icon: BookOpen,
        titulo: "INCES (Educación Socialista)",
        descripcion: "Aporte destinado a la formación y capacitación técnica de los trabajadores y jóvenes.",
        ente: "Instituto Nacional de Capacitación y Educación Socialista"
    },
    {
        icon: Shield,
        titulo: "Ley de Protección de Pensiones",
        descripcion: "Nueva contribución especial (vigente desde 2024) para la protección de las pensiones de seguridad social.",
        ente: "SENIAT"
    },
    {
        icon: VenetianMask,
        titulo: "ONA (Fondo Nacional Antidrogas)",
        descripcion: "Aporte del 1% sobre la utilidad operativa para empresas con más de 50 trabajadores.",
        ente: "Oficina Nacional Antidrogas"
    },
    {
        icon: FlaskConical,
        titulo: "FONACIT (Ciencia y Tecnología)",
        descripcion: "Aporte de empresas con ingresos brutos superiores a 100.000 U.T. para financiar la ciencia y tecnología.",
        ente: "Fondo Nacional de Ciencia, Tecnología e Innovación"
    },
    {
        icon: Trophy,
        titulo: "FONDEP (Fondo Nacional del Deporte)",
        descripcion: "Aporte del 1% sobre la utilidad neta de empresas que realizan actividades económicas con fines de lucro.",
        ente: "Fondo Nacional del Deporte"
    },
    {
        icon: HeartHandshake,
        titulo: "CONAPDIS (Personas con Discapacidad)",
        descripcion: "Las empresas deben cumplir con la inserción laboral del 5% de su nómina o realizar aportes a proyectos.",
        ente: "Consejo Nacional para las Personas con Discapacidad"
    },
]

export default function IntegracionesPage() {
  const { toast } = useToast();

  const handleConnect = (titulo: string) => {
    toast({
        title: "Conexión en Proceso",
        description: `Se ha iniciado el proceso para conectar con ${titulo}.`,
    })
  }

  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Repeat className="h-8 w-8" />
            Aportes Parafiscales y Otras Contribuciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Conecta con los sistemas de declaración de los diferentes entes parafiscales y gestiona tus aportes obligatorios.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {parafiscales.map((item) => (
            <Card key={item.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex-row items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{item.titulo}</CardTitle>
                        <CardDescription className="pt-1">Regulado por: <span className="font-medium">{item.ente}</span></CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                    <Button variant="outline" className="w-full" onClick={() => handleConnect(item.titulo)}>
                        Gestionar Aporte
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
