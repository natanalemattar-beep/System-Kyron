import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Rocket, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/50 dark:to-background">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-background/80">
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
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-32">
          <div className="inline-block rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200 mb-4">
            Plataforma Empresarial Venezuela
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-gray-100">
            Gestión integral para{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Jurídicos
            </span>{" "}
            y{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Naturales
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            Accede a tu cuenta empresarial o personal para gestionar RIF,
            permisos, documentos civiles y casos judiciales con la más alta
            tecnología y seguridad
          </p>

          <Card className="mt-12 w-full max-w-sm bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl">
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="p-4 bg-teal-100 dark:bg-teal-900 rounded-full mb-4">
                <Rocket className="h-8 w-8 text-teal-600 dark:text-teal-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Iniciar Sesión
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Accede a tu cuenta para comenzar a gestionar tus trámites de
                forma inteligente
              </p>
              <Button asChild className="mt-6 w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/dashboard">
                  <Zap className="mr-2 h-4 w-4" /> Acceder Ahora
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
