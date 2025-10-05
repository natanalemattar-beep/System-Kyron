
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, Scale, Activity, Globe, CheckCircle } from "lucide-react";

const tipos = {
  formaJuridica: {
    title: "Según su Forma Jurídica",
    icon: Scale,
    items: [
      "Empresario Individual: Persona que ejerce una actividad económica bajo su propio nombre.",
      "Sociedad Limitada (S.L.): Socios con responsabilidad limitada al capital aportado.",
      "Sociedad Anónima (S.A.): Capital dividido en acciones, responsabilidad limitada.",
      "Sociedad Cooperativa: Asociación de personas para satisfacer necesidades comunes.",
    ]
  },
  tamano: {
    title: "Según su Tamaño",
    icon: Building,
    items: [
      "Microempresas: Número reducido de empleados.",
      "Pequeñas y Medianas Empresas (PYMES): Rango intermedio de tamaño.",
      "Empresas Grandes: Gran número de empleados y alta facturación.",
    ]
  },
  actividadEconomica: {
    title: "Según su Actividad Económica",
    icon: Activity,
    items: [
      "Sector Primario: Extracción de recursos naturales (agricultura, minería).",
      "Sector Secundario (Industrial): Transformación de materias primas.",
      "Sector Terciario (Servicios): Ofrecen bienes y servicios (bancos, comercio).",
    ]
  },
  propiedadCapital: {
    title: "Según la Propiedad del Capital",
    icon: Globe,
    items: [
      "Empresas Privadas: Propiedad de particulares.",
      "Empresas Públicas: Propiedad del Estado o entidades públicas.",
      "Empresas Mixtas: Propiedad compartida entre sector público y privado.",
    ]
  }
};


export default function TiposEmpresaPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-8 w-8" />
            Clasificación de Tipos de Empresas
        </h1>
        <p className="text-muted-foreground mt-2">
          Criterios para clasificar las empresas según la legislación y prácticas comerciales.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.values(tipos).map(tipo => (
            <Card key={tipo.title} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <tipo.icon className="h-6 w-6 text-primary" />
                        <span>{tipo.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {tipo.items.map((item, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
