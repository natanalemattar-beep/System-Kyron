
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FileText, Gavel, Heart, Shield, ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    title: 'Partidas de Nacimiento',
    description: 'Solicita y gestiona partidas de nacimiento de forma digital y segura.',
    icon: Heart,
    href: '/partidas-nacimiento',
  },
  {
    title: 'Actas de Matrimonio',
    description: 'Accede a actas de matrimonio y gestiona trámites relacionados.',
    icon: FileText,
    href: '/actas-matrimonio',
  },
  {
    title: 'Documentos Judiciales',
    description: 'Gestiona documentos judiciales y mantén un registro organizado.',
    icon: Gavel,
    href: '/documentos-judiciales',
  },
  {
    title: 'Antecedentes Penales',
    description: 'Sube tu currículum y obtén automáticamente tu certificado de antecedentes penales.',
    icon: Shield,
    href: '/antecedentes-penales',
  },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <LayoutDashboard className="h-10 w-10 text-primary" />
            Dashboard de Trámites Personales
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Gestiona tus documentos y solicitudes desde un solo lugar.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={'p-3 rounded-lg bg-primary/10'}>
                  <action.icon className={'h-6 w-6 text-primary'} />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
                 <p className="text-muted-foreground text-sm">{action.description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                  <Link href={action.href}>Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    