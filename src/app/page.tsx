import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900/50 dark:to-background">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-background/80 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-3">
            <div className="bg-teal-600 text-white p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                System C.R.S
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Plataforma Digital Oficial
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Iniciar Sesión</Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="#">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <span className="inline-block bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                        Plataforma Empresarial Venezuela
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Gestión integral para <span className="text-teal-600">Juridicos</span> y <span className="text-green-500">Naturales</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                        Accede a tu cuenta empresarial o personal para gestionar RIF, permisos, documentos civiles y casos judiciales con la más alta tecnología y seguridad
                    </p>
                </div>

                 <Card className="w-full max-w-md mx-auto bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                        <Rocket className="h-12 w-12 text-teal-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Iniciar Sesión</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Accede a tu cuenta para comenzar a gestionar tus trámites de forma inteligente
                        </p>
                        <Button asChild className="mt-6 w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg">
                            <Link href="/dashboard">
                                <Zap className="mr-2 h-5 w-5" /> Acceder Ahora
                            </Link>
                        </Button>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            ¿Primera vez?{" "}
                            <Link href="#" className="font-semibold text-teal-600 hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-20">
          <div className="text-center w-full max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Integración oficial con:
            </h3>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {integrationItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-md rounded-full px-4 py-2"
                >
                  <item.icon className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-background py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsItems.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-gray-50 dark:bg-card/50 p-6 rounded-2xl shadow-lg"
                >
                  <p className="text-4xl md:text-5xl font-bold text-teal-600 dark:text-teal-400">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Impacto Social y Ambiental
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Tecnología que ayuda a comunidades vulnerables
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl text-left">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-3 rounded-lg">
                      <Recycle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      Fundación de Reciclaje
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Sistema integrado con basureros inteligentes y recolección
                    con motos para ayudar a personas vulnerables.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Basureros inteligentes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Recolección optimizada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Ayuda social automática</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                  >
                    Participar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl text-left">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-3 rounded-lg">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      Asesoría de Publicidad
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Estrategias completas de marketing digital y tradicional
                    para hacer crecer tu negocio.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Estrategias SMART</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Canales digitales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Medición de resultados</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white"
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Para Personas
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Accede a todos tus documentos civiles de forma rápida y segura
            </p>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureItems.map((item) => (
                <Card
                  key={item.title}
                  className="bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl text-left hover:shadow-2xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 p-3 rounded-lg">
                        <item.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 my-6 pl-12">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white"
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
    </div>
  );
}
