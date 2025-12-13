
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, CheckCircle, Gavel, HelpCircle, UserX, Users } from "lucide-react";

const obligadosSubsidiarios = [
    "Hermanos o hermanas mayores del niño.",
    "Ascendientes, por orden de proximidad.",
    "Parientes colaterales hasta el tercer grado.",
    "La persona que represente al niño, niña o adolescente, a falta de los padres.",
    "La persona a la cual le fue otorgada su Responsabilidad de Crianza.",
];

const quienesPuedenSolicitar = [
    "El propio hijo o hija (si tiene 12 años o más).",
    "Su padre o su madre.",
    "Quien ejerza su representación.",
    "Sus ascendientes y parientes colaterales hasta el cuarto grado.",
    "Quien ejerza la Responsabilidad de Crianza.",
    "El Ministerio Público.",
    "El Consejo de Protección de Niños, Niñas y Adolescentes.",
];

export default function ManutencionPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gavel className="h-8 w-8" />
            La Obligación de Manutención en Venezuela
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre la institución familiar prevista en la LOPNNA que comprende el sustento integral de niños, niñas y adolescentes.
        </p>
      </header>
      
      <Card>
        <CardHeader>
            <CardTitle>¿Qué es la Obligación de Manutención?</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Es una institución familiar que comprende todo lo relativo al sustento, vestido, habitación, educación, cultura, asistencia y atención médica, medicinas, recreación y deportes requeridos por el niño, niña y adolescente. Esta obligación corresponde al padre y a la madre respecto a sus hijos que no hayan alcanzado la mayoría de edad.
            </p>
            <br />
            <p className="text-muted-foreground">
                Se trata de un efecto de la filiación (legal o judicial) y una consecuencia de la Patria Potestad, que tiene por objeto el cuidado, desarrollo y educación integral de los hijos.
            </p>
        </CardContent>
      </Card>

       <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="casos-especiales" className="border rounded-lg px-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span>Establecimiento en Casos Especiales</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-muted-foreground">
                    <p className="mb-4">Aunque se requiere filiación legal, la Ley permite garantizar la obligación de manutención cuando:</p>
                    <ul className="list-decimal pl-5 space-y-2">
                        <li>La filiación resulte indirectamente de una sentencia judicial firme.</li>
                        <li>Exista una declaración explícita y por escrito del padre o una confesión en documento auténtico.</li>
                        <li>A juicio del juez, el vínculo filial resulte de un conjunto de indicios suficientes, precisos y concordantes.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="subsidiarios" className="border rounded-lg px-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Personas Obligadas de Forma Subsidiaria</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-muted-foreground">
                    <p className="mb-4">
                        Solo cuando se comprueba que los progenitores no pueden cumplir con su obligación, esta recae subsidiariamente en otras personas, según el artículo 368 de la LOPNNA:
                    </p>
                     <ul className="space-y-3">
                        {obligadosSubsidiarios.map((item, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>

             <AccordionItem value="duracion" className="border rounded-lg px-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span>¿Hasta cuándo dura la obligación de manutención?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-muted-foreground">
                   <p>Cesa cuando el hijo o hija alcanza la mayoría de edad, con dos excepciones:</p>
                   <ul className="list-decimal pl-5 space-y-2 mt-2">
                       <li>Si padece discapacidades físicas o mentales que le impidan proveer su propio sustento.</li>
                       <li>Si se encuentra cursando estudios que le impiden realizar trabajos remunerados, caso en el cual la obligación puede extenderse hasta los 25 años, previa aprobación judicial.</li>
                   </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="incumplimiento" className="border rounded-lg px-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <UserX className="h-5 w-5 text-destructive" />
                        <span>Incumplimiento y Privación de la Patria Potestad</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-muted-foreground">
                   <p>El incumplimiento reiterado e injustificado de la obligación de manutención puede llevar a la privación de la Patria Potestad. Sin embargo, esta es una medida extrema que solo puede ser declarada por un juez, a solicitud de parte interesada, y cuando se demuestre fehacientemente que el progenitor se ha negado a cumplir la obligación fijada por un tribunal, aun teniendo los medios económicos para hacerlo.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <Card>
            <CardHeader>
                <CardTitle>Determinación y Solicitud Judicial</CardTitle>
                <CardDescription>Todo lo relativo a la fijación, ofrecimiento y revisión del monto debe ser decidido por vía judicial.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold mb-2">Criterios del Juez</h4>
                    <p className="text-sm text-muted-foreground">Para fijar el monto, el juez considera la necesidad del niño, la capacidad económica del obligado, el principio de unidad de filiación, la equidad de género y el reconocimiento del trabajo del hogar como actividad económica.</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">¿Quiénes pueden solicitarla?</h4>
                    <ul className="space-y-2">
                        {quienesPuedenSolicitar.map((item, index) => (
                             <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
