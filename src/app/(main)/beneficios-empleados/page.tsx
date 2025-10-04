
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift, HeartHandshake, Sparkles, ThumbsUp } from "lucide-react";

const beneficiosLey = [
    { title: "Vacaciones", description: "15 días de vacaciones pagadas después de un año de servicio, más un feriado remunerado adicional hasta 30 días." },
    { title: "Días de descanso", description: "Incluyen días feriados y de descanso que deben ser pagados." },
    { title: "Bonificaciones de fin de año", description: "Conocidas como aguinaldos, son un pago adicional que se otorga a fin de año." },
];

const beneficiosSociales = [
    { title: "Beneficio de alimentación", description: "Puede ser a través de servicios de comedores, cupones o tarjetas electrónicas, como el Cestaticket Socialista." },
    { title: "Servicios de salud y seguros", description: "Incluyen seguros médicos privados y el pago de gastos médicos, farmacéuticos y odontológicos para el empleado y sus familiares." },
    { title: "Asistencia educativa", description: "Otorgamiento de becas o pago de cursos de capacitación y formación para los trabajadores." },
    { title: "Servicios de guardería", description: "Centros de educación inicial para los hijos de los empleados." },
];

const beneficiosAdicionales = [
    { title: "Flexibilidad laboral", description: "Opciones de horarios flexibles, trabajo híbrido o remoto para mejorar la conciliación." },
    { title: "Programas de bienestar", description: "Acceso a terapias psicológicas, consultas con nutricionistas o convenios con gimnasios." },
    { title: "Bonos por desempeño", description: "Compensaciones monetarias adicionales basadas en el rendimiento del empleado." },
    { title: "Seguro de vida", description: "Cobertura para la protección del empleado y su familia en caso de fallecimiento." },
    { title: "Apoyo en transporte", description: "Ayuda para cubrir los gastos de movilidad." },
];

const importanciaBeneficios = [
    "Mejora el bienestar del empleado: Contribuyen a la salud y bienestar general del trabajador.",
    "Fideliza al personal: Los beneficios no monetarios son una estrategia para retener y motivar a los empleados.",
    "No inciden en prestaciones sociales: Los beneficios sociales de carácter no remunerativo no se consideran parte del salario para el cálculo de prestaciones.",
];


export default function BeneficiosEmpleadosPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gift className="h-8 w-8" />
            Guía de Beneficios para Empleados en Venezuela
        </h1>
        <p className="text-muted-foreground mt-2">
          Un resumen completo de los beneficios laborales, desde los obligatorios por ley hasta los voluntarios que marcan la diferencia.
        </p>
      </header>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle>Visión General (Creada por IA)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Los beneficios para empleados en Venezuela incluyen las prestaciones de ley como vacaciones y aguinaldos, pero también beneficios sociales no salariales como seguros médicos y bonos de alimentación (Cestaticket), además de beneficios adicionales ofrecidos por empresas, como flexibilidad laboral, capacitación y bonos por desempeño.
            </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><HeartHandshake className="h-6 w-6 text-primary"/>Beneficios de Ley</CardTitle>
                <CardDescription>Derechos irrenunciables establecidos en la LOTTT.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {beneficiosLey.map(b => (
                    <div key={b.title} className="p-3 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold">{b.title}</h4>
                        <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Sparkles className="h-6 w-6 text-primary"/>Beneficios Sociales y No Salariales</CardTitle>
                <CardDescription>Ventajas que no forman parte del salario pero mejoran la calidad de vida.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                 {beneficiosSociales.map(b => (
                     <div key={b.title} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold">{b.title}</h4>
                            <p className="text-sm text-muted-foreground">{b.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><ThumbsUp className="h-6 w-6 text-primary"/>Beneficios Adicionales y Voluntarios</CardTitle>
                <CardDescription>Iniciativas que las empresas ofrecen para atraer y retener al mejor talento.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {beneficiosAdicionales.map(b => (
                    <div key={b.title} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold">{b.title}</h4>
                            <p className="text-sm text-muted-foreground">{b.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>¿Por Qué son Importantes los Beneficios?</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-3">
                    {importanciaBeneficios.map((item, index) => (
                         <li key={index} className="flex items-start gap-3 text-lg">
                            <CheckCircle className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

    </div>
  );
}
