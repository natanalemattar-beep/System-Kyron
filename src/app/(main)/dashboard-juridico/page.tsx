
import {
  BookOpen,
  FileText,
  FilePlus,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  Eye,
  Plus,
  Landmark,
  Wine,
  Receipt,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';


const mainActions = [
  {
    title: 'Libros Contables',
    description: 'Gestiona todos los libros contables oficiales de tu empresa.',
    icon: BookOpen,
    buttonText: 'Crear Libro',
    href: '/libros-contables',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-900/50',
  },
  {
    title: 'Libro Compra/Venta SENIAT',
    description: 'Registro oficial de compras y ventas para el SENIAT.',
    icon: Landmark,
    buttonText: 'Nuevo Registro',
    href: '/libro-compra-venta',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-900/50',
  },
  {
    title: 'Libro de Licores',
    description: 'Control especial para empresas del sector licorería.',
    icon: Wine,
    buttonText: 'Registrar Movimiento',
    href: '/libro-licores',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-900/50',
  },
    {
    title: 'Proformas',
    description: 'Genera proformas y cotizaciones profesionales.',
    icon: Receipt,
    buttonText: 'Nueva Proforma',
    href: '/proformas',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-900/50',
  },
];

const stats = [
    { title: 'Permisos Vigentes', value: '3', footer: '1 por renovar', icon: CheckCircle, iconColor: 'text-green-500' },
    { title: 'Multas Pendientes', value: '2', footer: 'Bs. 45,000', icon: AlertTriangle, iconColor: 'text-orange-500' },
    { title: 'Facturas del Mes', value: '127', footer: 'Bs. 2.4M', icon: FileText, iconColor: 'text-blue-500' },
    { title: 'Inventario', value: '1,245', footer: '15 productos bajos', icon: BarChart2, iconColor: 'text-purple-500' },
]

const recentActivities = [
    { description: 'Autorización SENIAT aprobada', time: 'Hace 2 horas', icon: CheckCircle, iconColor: 'text-green-500' },
    { description: 'Factura #2024-0156 generada', time: 'Ayer', icon: FilePlus, iconColor: 'text-blue-500' },
]

const financialSummary = [
    { label: 'Ingresos del Mes', amount: 2400000, color: 'bg-green-600/20 text-green-400' },
    { label: 'Gastos del Mes', amount: 1800000, color: 'bg-red-600/20 text-red-400' },
]

export default function DashboardJuridicoPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Jurídico</h1>
        <Badge variant="outline" className="border-green-500 text-green-500">
          <CheckCircle className="w-4 h-4 mr-2" />
          Empresa Activa
        </Badge>
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {mainActions.map((action, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm flex flex-col justify-between">
            <CardHeader>
              <div className={`p-3 rounded-lg ${action.iconBg} w-max mb-4`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
              <CardDescription className="text-sm">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary-foreground">
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
              <Card key={stat.title} className="bg-card/50 backdrop-blur-sm">
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
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-center gap-4 p-3 rounded-md bg-secondary/50">
                     <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                      <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4"/>
                      </Button>
                  </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Resumen Financiero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              {financialSummary.map(item => (
                  <div key={item.label} className={`p-4 rounded-lg ${item.color}`}>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-2xl font-bold">{formatCurrency(item.amount, 'Bs.')}</p>
                  </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
