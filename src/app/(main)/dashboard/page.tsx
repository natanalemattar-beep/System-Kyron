
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
    features: ['Solicitud online', 'Entrega digital', 'Verificación oficial'],
    buttonText: 'Solicitar',
  },
  {
    title: 'Actas de Matrimonio',
    description: 'Accede a actas de matrimonio y gestiona trámites relacionados.',
    icon: FileText,
    href: '/actas-matrimonio',
    features: ['Consulta rápida', 'Certificaciones', 'Actualizaciones'],
    buttonText: 'Solicitar',
  },
  {
    title: 'Documentos Judiciales',
    description: 'Gestiona documentos judiciales y mantén un registro organizado.',
    icon: Gavel,
    href: '/documentos-judiciales',
    features: ['Archivo digital', 'Seguimiento legal', 'Notificaciones'],
    buttonText: 'Gestionar',
  },
  {
    title: 'Antecedentes Penales',
    description: 'Sube tu currículum y obtén automáticamente tu certificado de antecedentes penales.',
    icon: Shield,
    href: '/antecedentes-penales',
    features: ['Procesamiento automático', 'Certificado oficial', 'Integración con CV'],
    buttonText: 'Subir CV',
    buttonIcon: Upload,
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
                  <p className="text-muted-foreground text-sm mt-2">{action.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <ul className="space-y-2 mb-6">
                {action.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {action.buttonIcon ? (
                 <FileInputTrigger onFileSelect={handleFileSelect}>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={action.href}>
                        <action.buttonIcon className="mr-2 h-4 w-4" />
                        {action.buttonText}
                      </Link>
                    </Button>
                </FileInputTrigger>
              ) : (
                <Button asChild className="w-full">
                  <a href={action.href}>{action.buttonText}</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
