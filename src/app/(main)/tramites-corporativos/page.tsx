

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, UserCog, CheckCircle, ArrowRight, Award, Briefcase, Building } from "lucide-react";

const pasosSucursal = [
    "Registro de sucursal en SAREN (si es nacional).",
    "Estudio de viabilidad y legislación del país destino (si es internacional).",
    "Legalización y apostilla de documentos para uso en el extranjero.",
    "Obtención de identificaciones fiscales locales (nacionales o internacionales).",
    "Cumplimiento de normativas municipales y de inversión extranjera.",
];

const pasosResidencia = [
    "Actualización de datos en el RIF personal y de la empresa.",
    "Modificación del Acta Constitutiva si la residencia afecta los estatutos.",
    "Notificación al Registro Mercantil sobre el cambio de domicilio.",
    "Actualización de la información en IVSS, BANAVIH, etc.",
];

const pasosApostilla = [
    "Acta Constitutiva y sus modificaciones.",
    "Actas de Asamblea de Accionistas.",
    "Certificación de RIF y Billetes de Banco.",
    "Poderes Generales o Especiales.",
    "Certificaciones de Gravamen.",
];

const pasosFranquicia = [
    "Elaboración del Contrato de Franquicia (Circular de Oferta).",
    "Registro de la marca y propiedad intelectual.",
    "Manuales de Operación y Asistencia Técnica.",
    "Gestión de cánones, regalías y fondos de publicidad.",
    "Soporte continuo y control de calidad.",
];


export default function TramitesCorporativosPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UserCog className="h-8 w-8" />
            Trámites Corporativos Especiales
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre procedimientos para cambios estructurales en la empresa.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-1">
          {/* Legalización y Apostilla */}
        <Card className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary"/>
                    <span>Legalización y Apostilla de Documentos</span>
                </CardTitle>
                <CardDescription>Proceso para certificar la autenticidad de documentos públicos venezolanos para su uso en el extranjero, bajo el convenio de la Apostilla de La Haya.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <h4 className="font-semibold mb-3">Documentos clave que requieren este trámite:</h4>
                <ul className="space-y-3">
                    {pasosApostilla.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardContent>
                <Button variant="outline" className="w-full">
                    Gestionar Apostilla <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 mt-8">
        {/* Gestión de Sucursales */}
        <Card className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-primary"/>
                    <span>Gestión de Sucursales (Nacional / Internacional)</span>
                </CardTitle>
                <CardDescription>Pasos clave para la apertura y gestión de sucursales dentro y fuera del país.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-3">
                    {pasosSucursal.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardContent>
                <Button variant="outline" className="w-full">
                    Iniciar Asesoría de Expansión <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>

        {/* Cambio de Residencia del Representante Legal */}
        <Card className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <UserCog className="h-6 w-6 text-primary"/>
                    <span>Cambio de Residencia del Representante Legal</span>
                </CardTitle>
                <CardDescription>Procedimiento para actualizar la información de residencia fiscal y legal.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                 <ul className="space-y-3">
                    {pasosResidencia.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
             <CardContent>
                <Button variant="outline" className="w-full">
                    Iniciar Trámite de Actualización <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>

        {/* Gestión de Franquicias */}
        <Card className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary"/>
                    <span>Gestión de Franquicias (Franquiciante / Franquiciado)</span>
                </CardTitle>
                <CardDescription>Guía para la administración, creación o adquisición de una franquicia.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                 <ul className="space-y-3">
                    {pasosFranquicia.map((paso, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{paso}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
             <CardContent>
                <Button variant="outline" className="w-full">
                    Gestionar Franquicias <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
