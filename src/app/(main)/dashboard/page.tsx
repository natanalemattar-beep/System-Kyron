
"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Gavel, Heart, Shield, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { FileInputTrigger } from '@/components/file-input-trigger';

const actions = [
  {
    title: 'Partidas de Nacimiento',
    description: 'Solicita y gestiona partidas de nacimiento de forma digital y segura.',
    icon: Heart,
    href: '/partidas-nacimiento',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-600/20',
    features: ['Solicitud online', 'Entrega digital', 'Verificación oficial'],
    buttonText: 'Solicitar',
  },
  {
    title: 'Actas de Matrimonio',
    description: 'Accede a actas de matrimonio y gestiona trámites relacionados.',
    icon: FileText,
    href: '/actas-matrimonio',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-600/20',
    features: ['Consulta rápida', 'Certificaciones', 'Actualizaciones'],
    buttonText: 'Solicitar',
  },
  {
    title: 'Documentos Judiciales',
    description: 'Gestiona documentos judiciales y mantén un registro organizado.',
    icon: Gavel,
    href: '/documentos-judiciales',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-600/20',
    features: ['Archivo digital', 'Seguimiento legal', 'Notificaciones'],
    buttonText: 'Gestionar',
  },
  {
    title: 'Antecedentes Penales',
    description: 'Sube tu currículum y obtén automáticamente tu certificado de antecedentes penales.',
    icon: Shield,
    href: '/antecedentes-penales',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-600/20',
    features: ['Procesamiento automático', 'Certificado oficial', 'Integración con CV'],
    buttonText: 'Subir CV',
    buttonIcon: Upload,
  },
];

export default function DashboardPersonalPage() {
    const [file, setFile] = useState<File | null>(null);
  return (
    <div className="p-4 md:p-8 space-y-8 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Personal</h1>
        <Badge variant="outline" className="border-green-500 text-green-500">
          <CheckCircle className="w-4 h-4 mr-2" />
          Cuenta Verificada
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.slice(0, 3).map((action, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${action.iconBg}`}>
                  <action.icon className={`h-6 w-6 ${action.iconColor}`} />
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
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-primary/80 hover:bg-primary">
                <a href={action.href}>{action.buttonText}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.slice(3).map((action, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${action.iconBg}`}>
                  <action.icon className={`h-6 w-6 ${action.iconColor}`} />
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
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
               <FileInputTrigger
                    onFileSelect={(selectedFile) => setFile(selectedFile)}
                    >
                    <Button variant="outline" className="w-full">
                        {action.buttonIcon && <action.buttonIcon className="mr-2 h-4 w-4" />}
                        {action.buttonText}
                    </Button>
                </FileInputTrigger>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
