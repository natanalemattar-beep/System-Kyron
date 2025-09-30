import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Zap, Star, Link as LinkIcon, Building, FileBadge, Scale, ShieldCheck } from "lucide-react";
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
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-24">
          
          <Card className="w-full max-w-md bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl">
            <CardContent className="flex flex-col items-center p-8 text-center">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg">
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

          <div className="mt-16 text-center w-full max-w-4xl">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                <LinkIcon className="h-5 w-5"/>
                Integración oficial con:
              </h3>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                {integrationItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-md rounded-full px-4 py-2">
                        <item.icon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                    </div>
                ))}
              </div>
          </div>
        </section>

        <section className="bg-white dark:bg-background py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsItems.map((stat) => (
                        <div key={stat.label} className="text-center bg-gray-50 dark:bg-card/50 p-6 rounded-2xl shadow-lg">
                            <p className="text-4xl md:text-5xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</p>
                            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
