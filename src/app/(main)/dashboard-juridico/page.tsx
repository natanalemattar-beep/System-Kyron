
"use client";

import {
  BookOpen,
  FilePlus,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  Eye,
  Plus,
  Landmark,
  Wine,
  Receipt,
  Users,
  Send,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";


const mainActions = [
  {
    title: 'Libros Contables',
    description: 'Gestiona todos los libros contables oficiales de tu empresa.',
    icon: BookOpen,
    buttonText: 'Crear Libro',
    href: '/libros-contables',
  },
  {
    title: 'Libro Compra/Venta SENIAT',
    description: 'Registro oficial de compras y ventas para el SENIAT.',
    icon: Landmark,
    buttonText: 'Nuevo Registro',
    href: '/libro-compra-venta',
  },
  {
    title: 'Libro de Licores',
    description: 'Control especial para empresas del sector licorería.',
    icon: Wine,
    buttonText: 'Registrar Movimiento',
    href: '/libro-licores',
  },
    {
    title: 'Proformas',
    description: 'Genera proformas y cotizaciones profesionales.',
    icon: Receipt,
    buttonText: 'Nueva Proforma',
    href: '/proformas',
  },
  {
    title: 'Gestión de Nómina',
    description: 'Calcula y administra la nómina de tus empleados.',
    icon: Users,
    buttonText: 'Ir a Nómina',
    href: '/nominas',
  },
];

const stats = [
    { title: 'Permisos Vigentes', value: '3', footer: '1 por renovar', icon: CheckCircle, iconColor: 'text-green-500' },
    { title: 'Multas Pendientes', value: '2', footer: 'Bs. 45,000', icon: AlertTriangle, iconColor: 'text-orange-500' },
    { title: 'Facturas del Mes', value: '127', footer: 'Bs. 2.4M', icon: FilePlus, iconColor: 'text-blue-500' },
    { title: 'Inventario', value: '1,245', footer: '15 productos bajos', icon: BarChart2, iconColor: 'text-purple-500' },
]

const recentActivities = [
    { description: 'Autorización SENIAT aprobada', time: 'Hace 2 horas', icon: CheckCircle, iconColor: 'text-green-500' },
    { description: 'Factura #2024-0156 generada', time: 'Ayer', icon: FilePlus, iconColor: 'text-blue-500' },
]

const dailySummary = {
    ventas: 1850.75,
    gastos: 430.50,
}

const financialSummary = [
    { label: 'Ingresos del Mes', amount: 2400000, color: 'bg-green-600/20 text-green-400' },
    { label: 'Gastos del Mes', amount: 1800000, color: 'bg-red-600/20 text-red-400' },
]

const ActivitySkeleton = () => (
  <div className="lg:col-span-2">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-3 rounded-md bg-secondary">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-md bg-secondary">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const LazyActivityCard = dynamic(() => import('@/components/dashboard/activity-card').then(mod => mod.ActivityCard), {
  ssr: false,
  loading: () => <ActivitySkeleton />,
});


export default function DashboardJuridicoPage() {
  const {toast} = useToast();

   const handleRequestReport = () => {
    toast({
      title: "Reporte Enviado",
      description: "Los estados financieros han sido enviados a tu correo.",
      action: <CheckCircle className="text-green-500" />
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Jurídico</h1>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          Empresa Activa
        </Badge>
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {mainActions.map((action, index) => (
          <Card key={index} className="flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className={`p-3 rounded-lg bg-secondary w-max mb-4`}>
                <action.icon className={`h-6 w-6 text-primary`} />
              </div>
              <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
              <CardDescription className="text-sm">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="secondary">
                <Link href={action.href}>
                    <Plus className="mr-2 h-4 w-4" />
                    {action.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

        {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => (
              <Card key={stat.title} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.footer}</p>
                  </CardContent>
              </Card>
          ))}
      </div>


      {/* Activity and Financial Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <LazyActivityCard recentActivities={recentActivities} />
        
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Resumen Diario</CardTitle>
             <CardDescription>
                Ventas y gastos del día de hoy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className={'p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'}>
                  <p className="text-sm font-medium">Ventas del Día</p>
                  <p className="text-2xl font-bold">{formatCurrency(dailySummary.ventas, 'Bs.')}</p>
              </div>
               <div className={'p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}>
                  <p className="text-sm font-medium">Gastos del Día</p>
                  <p className="text-2xl font-bold">{formatCurrency(dailySummary.gastos, 'Bs.')}</p>
              </div>
              <div className="border-t pt-4">
                 <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-primary">Resultado Neto del Día</span>
                    <span className="font-bold text-primary">{formatCurrency(dailySummary.ventas - dailySummary.gastos, 'Bs.')}</span>
                 </div>
              </div>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle>Supervisión Financiera</CardTitle>
                <CardDescription>
                Accede a los reportes financieros o solicita un envío a tu correo.
                </CardDescription>
            </div>
             <div className="flex gap-2">
                <Button asChild variant="outline">
                    <Link href="/reports">
                        <TrendingUp className="mr-2"/>Ver Reportes Completos
                    </Link>
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Send className="mr-2"/>Solicitar Estados Financieros
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Solicitar Reporte por Correo</DialogTitle>
                            <DialogDescription>
                                Se enviará un resumen de los estados financieros al correo electrónico que especifiques.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo del Representante Legal</Label>
                                <Input id="email" type="email" placeholder="representante@empresa.com" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleRequestReport}>Enviar Reporte</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
             </div>
        </CardHeader>
       </Card>
    </div>
  );
}
