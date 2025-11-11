
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Users, Scale, Building, CheckCircle, Briefcase } from "lucide-react";

const componentes = [
    "Cargos y Roles: Cada cuadro o casilla representa un puesto o departamento dentro de la empresa, indicando el nombre del puesto y, a veces, la persona que lo ocupa.",
    "Jerarquía: Las líneas que conectan los cuadros muestran la relación de autoridad y dependencia entre los diferentes niveles.",
    "Cadenas de Mando: Se ilustran las relaciones de supervisión, mostrando quién reporta a quién.",
    "Departamentos: Se visualizan las distintas áreas de la compañía (por ejemplo, marketing, finanzas, operaciones).",
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
    "Mejora la comunicación: Al aclarar la estructura, se evitan malentendidos y se facilita la comunicación formal.",
    "Clarifica roles y responsabilidades: Cada empleado entiende su lugar en la organización y a quién debe dirigirse para resolver consultas o problemas.",
    "Facilita la incorporación (Onboarding): Los nuevos miembros pueden familiarizarse rápidamente con la estructura de la empresa y el organigrama.",
    "Ayuda en la toma de decisiones: Permite a los líderes y a los empleados ver claramente la cadena de autoridad para una toma de decisiones más eficiente."
];

const nivelesDirectivos = [
    { title: "Junta Directiva", description: "Supervisa la administración y establece la estrategia general de la empresa." },
    { title: "Director General", description: "Responsable de la planificación, dirección y gestión global de la empresa." },
];

const gerenciasFuncionales = [
    "Gerencia de Finanzas/Contabilidad: Supervisa la contabilidad, gestión fiscal y financiera de la empresa.",
    "Gerencia de Recursos Humanos: Encargada de la contratación, desarrollo y gestión del personal.",
    "Gerencia Comercial: Dirige las ventas y las estrategias de marketing.",
];

const departamentosOperativos = [
    { title: "Departamento de Desarrollo de Software", description: "Incluye Gerente de Proyectos, Analistas, Programadores y Diseñadores UI/UX." },
    { title: "Departamento Comercial", description: "Compuesto por Asesores Comerciales y el equipo de Marketing y Publicidad." },
    { title: "Departamento de Contabilidad y Administración", description: "Incluye Auxiliares de Contabilidad y personal administrativo general." },
    { title: "Departamento de Soporte Técnico", description: "Personal dedicado a atender consultas y problemas de los usuarios del software." },
];

const elementosClaveEstructura = [
    { title: "Jerarquía", description: "La estructura muestra la cadena de mando y la autoridad de cada puesto, siendo útil para la comunicación interna y la claridad de roles." },
    { title: "Departamentalización", description: "Se agrupan las funciones en departamentos que trabajan hacia objetivos comunes." },
    { title: "Especialización", description: "Permite a cada departamento o empleado enfocarse en un área específica, aumentando la eficiencia." },
];


export default function OrganigramaPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Network className="h-8 w-8" />
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
        
        <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Ejemplo de Organigrama para una Empresa de Software Contable</CardTitle>
                <CardDescription>
                Esta estructura jerárquica y funcional está diseñada para optimizar la eficiencia y la especialización.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold text-lg mb-3">Nivel Directivo y Administrativo</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {nivelesDirectivos.map(item => (
                            <div key={item.title} className="p-4 bg-secondary/50 rounded-lg">
                                <h5 className="font-semibold">{item.title}</h5>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg mt-4">
                        <h5 className="font-semibold">Gerencias Funcionales</h5>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                            {gerenciasFuncionales.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-3">Nivel Operativo</h4>
                     <div className="space-y-4">
                        {departamentosOperativos.map(item => (
                            <div key={item.title} className="p-4 bg-secondary/50 rounded-lg">
                                <h5 className="font-semibold">{item.title}</h5>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div>
                    <h4 className="font-semibold text-lg mb-3">Estructura y Elementos Clave</h4>
                     <div className="grid md:grid-cols-3 gap-4">
                        {elementosClaveEstructura.map(item => (
                             <div key={item.title} className="p-4 bg-secondary/50 rounded-lg">
                                <h5 className="font-semibold">{item.title}</h5>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
