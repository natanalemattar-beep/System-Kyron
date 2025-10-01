

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUser, Download, ChevronsRight, User, Building, FileText } from "lucide-react";

const juridicoFeatures = [
    "Legalización de Empresa: Guía paso a paso para constituir tu empresa.",
    "Gestión de Permisos: Controla y renueva todas tus licencias y permisos.",
    "Contabilidad y Fiscal: Genera libros contables y declara impuestos (IVA, ISLR).",
    "Recursos Humanos: Administra nóminas y contratos.",
];

const naturalFeatures = [
    "Documentos Civiles: Solicita partidas de nacimiento y actas de matrimonio.",
    "Trámites Personales: Gestiona antecedentes penales y documentos judiciales.",
    "Notificaciones: Recibe alertas sobre el estado de tus solicitudes.",
];

const reportFeatures = [
    "Selección del Tipo de Reporte: Elige entre Balance General, Estado de Resultados, Flujo de Caja, etc.",
    "Definición de Período y Filtros: Personaliza los reportes por rango de fechas, categorías o sucursales.",
    "Visualización y Exportación: Visualiza los datos en gráficos interactivos y exporta a PDF o Excel.",
];

export default function ManualUsuarioPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookUser className="h-8 w-8" />
                    Manual de Usuario de C.M.S
                </h1>
                <p className="text-muted-foreground mt-2">
                    Tu guía completa para aprovechar al máximo la plataforma.
                </p>
            </div>
            <Button>
                <Download className="mr-2" />
                Descargar Manual en PDF
            </Button>
        </header>

        <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Introducción</CardTitle>
                    <CardDescription>Bienvenido a C.M.S, la plataforma digital oficial para la gestión integral de trámites para personas jurídicas y naturales en Venezuela.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Nuestra misión es simplificar la burocracia, centralizando todos tus documentos y procesos en un solo lugar. Con nuestra plataforma, puedes registrar tu empresa, gestionar permisos, cumplir con tus obligaciones fiscales, administrar a tu personal y mucho más.</p>
                </CardContent>
            </Card>

             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Primeros Pasos: Registro e Inicio de Sesión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <ChevronsRight className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Registro</h3>
                            <p className="text-muted-foreground">En la página de inicio, haz clic en "Registrarse". Selecciona si eres Persona Jurídica o Natural y completa los datos solicitados. Recibirás un código de verificación en tu correo para activar tu cuenta.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <ChevronsRight className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Inicio de Sesión</h3>
                            <p className="text-muted-foreground">Una vez registrado, ve a "Iniciar Sesión". Ingresa tu RIF (para empresas) o Cédula (para personas) y tu contraseña para acceder a tu dashboard personalizado.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" /> Módulos Clave (Persona Jurídica)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {juridicoFeatures.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Módulos Clave (Persona Natural)</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="space-y-3">
                            {naturalFeatures.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Generación de Reportes</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {reportFeatures.map(feature => (
                            <li key={feature} className="flex items-start gap-3">
                                <ChevronsRight className="h-5 w-5 text-primary mt-1 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
