
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sitemap, Users, Scale, Building, CheckCircle } from "lucide-react";

const componentes = [
    "Cargos y Roles: Cada cuadro representa un puesto o departamento.",
    "Jerarquía: Las líneas muestran la relación de autoridad y dependencia.",
    "Cadenas de Mando: Se ilustra quién reporta a quién.",
    "Departamentos: Se visualizan las distintas áreas de la compañía.",
];

const tipos = [
    {
        title: "Vertical",
        description: "El tipo más común. Muestra la estructura de arriba hacia abajo, con los cargos más altos en la parte superior."
    },
    {
        title: "Horizontal",
        description: "Los puestos se presentan de izquierda a derecha, con los de mayor jerarquía a la izquierda."
    },
    {
        title: "Circular",
        description: "El puesto de mayor jerarquía se sitúa en el centro y el resto se disponen en círculos concéntricos."
    }
];

const ventajas = [
    "Mejora la comunicación: Al aclarar la estructura, se evitan malentendidos.",
    "Clarifica roles y responsabilidades: Cada empleado entiende su lugar y a quién reportar.",
    "Facilita la incorporación (Onboarding): Los nuevos miembros se familiarizan rápidamente con la estructura.",
    "Ayuda en la toma de decisiones: Permite ver claramente la cadena de autoridad para una mayor eficiencia."
];

export default function OrganigramaPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sitemap className="h-8 w-8" />
            Organigrama y Estructura Empresarial
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre la representación gráfica de la estructura interna de una empresa.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>¿Qué es un Organigrama?</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Un organigrama es una representación gráfica de la estructura interna de una empresa que muestra la jerarquía, los departamentos y la relación entre los diferentes roles y empleados. Se utiliza para clarificar la cadena de mando, las responsabilidades y las funciones, facilitando la comunicación interna y externa.
            </p>
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Users className="h-6 w-6 text-primary"/>Componentes Principales</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {componentes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Building className="h-6 w-6 text-primary"/>Tipos Comunes de Organigramas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {tipos.map(tipo => (
                    <div key={tipo.title} className="p-3 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold">{tipo.title}</h4>
                        <p className="text-sm text-muted-foreground">{tipo.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Scale className="h-6 w-6 text-primary"/>Funciones y Ventajas</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {ventajas.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

    </div>
  );
}
