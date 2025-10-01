import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Building, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#productos", label: "Productos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contabilidad", label: "Contabilidad" },
  { href: "/seguros", label: "Seguro Contable y Jurídico" },
  { href: "/#contacto", label: "Contacto" },
];

const productsAndServices = [
    {
        title: "Registro Empresarial",
        description: "Constitución y legalización de tu empresa de forma rápida y segura.",
        image: "https://picsum.photos/seed/bridge/600/400",
        dataAiHint: "bridge structure"
    },
    {
        title: "Gestión Contable",
        description: "Soluciones completas para la contabilidad y finanzas de tu negocio.",
        image: "https://picsum.photos/seed/desktop/600/400",
        dataAiHint: "desktop computer"
    },
    {
        title: "Trámites Personales",
        description: "Gestiona documentos civiles y personales con facilidad y confianza.",
        image: "https://picsum.photos/seed/waterfall/600/400",
        dataAiHint: "waterfall"
    }
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">System CRS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors data-[active=true]:text-foreground data-[active=true]:font-semibold">
                    {link.label}
                </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary">
                System CRS
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Soluciones Comerciales y Contables para su Negocio
            </p>
        </section>

        <section id="productos" className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Productos y Servicios</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsAndServices.map(item => (
                        <Card key={item.title}>
                            <CardContent className="p-0">
                                <Image src={item.image} alt={item.title} data-ai-hint={item.dataAiHint} width={600} height={400} className="rounded-t-lg aspect-video object-cover"/>
                            </CardContent>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} System CRS. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
