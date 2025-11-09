
"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Gavel, Heart, Shield, Upload } from 'lucide-react';
import { useState } from 'react';
import { FileInputTrigger } from '@/components/file-input-trigger';
import { useToast } from '@/hooks/use-toast';
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
    const [file, setFile] = useState<File | null>(null);
    const { toast } = useToast();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        toast({
            title: "Archivo Seleccionado",
            description: `CV "${selectedFile.name}" listo para ser procesado.`,
        });
    };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Personal</h1>
        <Badge variant="secondary" className="text-green-400 border-green-500/50 bg-green-500/10">
          <CheckCircle className="w-4 h-4 mr-2" />
          Cuenta Verificada
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={'p-3 rounded-lg bg-secondary'}>
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
            <CardContent>
                <Button asChild className="w-full">
                  <Link href={action.href}>Acceder al Módulo</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
