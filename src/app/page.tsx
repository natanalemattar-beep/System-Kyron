import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Zap,
  Star,
  Link as LinkIcon,
  Building,
  FileBadge,
  Scale,
  ShieldCheck,
  Recycle,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Rocket,
  Calculator,
  Heart,
  Bot,
  CreditCard,
  BookUser,
} from "lucide-react";
import Link from "next/link";

const integrationItems = [
  { name: "SENIAT", icon: Star },
  { name: "Registro Civil", icon: Star },
  { name: "Tribunales", icon: Star },
  { name: "SAREN", icon: Star },
  { name: "Ministerios", icon: Star },
];

const statsItems = [
  { value: "50,000+", label: "Empresas Registradas", icon: Building },
  { value: "1M+", label: "Documentos Procesados", icon: FileBadge },
  { value: "25,000+", label: "Casos Judiciales", icon: Scale },
  { value: "100%", label: "Seguridad", icon: ShieldCheck },
];

const featureItems = [
  {
    icon: FileText,
    title: "Registro Empresarial RIF",
    description:
      "Registra tu empresa y obtén tu RIF automáticamente con conexión directa a entes públicos.",
    features: [
      "Registro automático",
      "Permisos integrados",
      "Validación en tiempo real",
    ],
  },
  {
    icon: Calculator,
    title: "Gestión Contable",
    description:
      "Organiza todos tus procesos contables con herramientas profesionales integradas.",
    features: [
      "Libros contables",
      "Reportes fiscales",
      "Declaraciones automáticas",
    ],
  },
  {
    icon: Heart,
    title: "Notificaciones de Multas",
    description:
      "Recibe alertas automáticas sobre multas y sanciones para mantener tu empresa al día.",
    features: ["Alertas en tiempo real", "Historial completo", "Opciones de pago"],
  },
  {
    icon: Bot,
    title: "Vendedor Virtual 24/7",
    description:
      "Bot inteligente que genera ventas automáticamente con pagos y archivo de procesos.",
    features: ["Ventas automáticas"],
  },
  {
    icon: CreditCard,
    title: "Sistema de Cobro Integral",
    description:
      "Punto de venta con pago móvil, transferencias, efectivo y facturación automática.",
    features: ["Múltiples métodos de pago"],
  },
  {
    icon: BookUser,
    title: "Nóminas y Contratos VE",
    description:
      "Todos los formatos de nóminas, contratos y libros de vacaciones venezolanos.",
    features: ["Formatos oficiales LOTTT"],
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                System C.R.S
              </span>
              <span className="text-xs text-muted-foreground">
                Plataforma Digital Oficial
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                        Plataforma Empresarial Venezuela
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Gestión integral para <span className="text-primary">Jurídicos</span> y <span className="text-green-400">Naturales</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                        Accede a tu cuenta empresarial o personal para gestionar RIF, permisos, documentos civiles y casos judiciales con la más alta tecnología y seguridad
                    </p>
                </div>

                 <Card className="w-full max-w-md mx-auto">
                    <CardHeader className="items-center text-center">
                        <Rocket className="h-12 w-12 text-primary mb-4" />
                        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center p-6 pt-0 text-center">
                        <p className="mt-2 text-muted-foreground">
                            Accede a tu cuenta para comenzar a gestionar tus trámites de forma inteligente
                        </p>
                        <Button asChild className="mt-6 w-full text-lg">
                            <Link href="/login">
                                <Zap className="mr-2 h-5 w-5" /> Acceder Ahora
                            </Link>
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            ¿Primera vez?{" "}
                            <Link href="/register" className="font-semibold text-primary hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-20">
          <div className="text-center w-full max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Integración oficial con:
            </h3>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {integrationItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 bg-card border shadow-sm rounded-full px-4 py-2"
                >
                  <item.icon className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsItems.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl"
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Impacto Social y Ambiental
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Tecnología que ayuda a comunidades vulnerables
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="text-left">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-900/50 text-green-400 p-3 rounded-lg">
                      <Recycle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      Fundación de Reciclaje
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Sistema integrado con basureros inteligentes y recolección
                    con motos para ayudar a personas vulnerables.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Basureros inteligentes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Recolección optimizada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Ayuda social automática</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Participar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-left">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-900/50 text-blue-400 p-3 rounded-lg">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      Asesoría de Publicidad
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Estrategias completas de marketing digital y tradicional
                    para hacer crecer tu negocio.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Estrategias SMART</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Canales digitales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Medición de resultados</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Solicitar Consulta <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Para Personas
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Accede a todos tus documentos civiles de forma rápida y segura
            </p>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureItems.map((item) => (
                <Card
                  key={item.title}
                  className="text-left hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <item.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 my-6 pl-12">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Comenzar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 bg-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-muted-foreground">
            Dueños: Carlos Mattar, Sebastian Garrido , Marcos Sousa
          </p>
        </div>
      </footer>
    </div>
  );
}
