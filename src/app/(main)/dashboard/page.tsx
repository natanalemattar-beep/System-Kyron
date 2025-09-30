import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bell,
  Book,
  Download,
  Eye,
  FileSignature,
  FileText,
  Library,
  LineChart,
  Package,
  Receipt,
  Settings,
  Plus,
  BookOpen,
  ShoppingBasket,
  FilePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const mainActions = [
  {
    title: 'Libros Contables',
    description: 'Gestiona todos los libros contables oficiales de tu empresa',
    icon: BookOpen,
    buttonText: 'Crear Libro',
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Libro Compra/Venta SENIAT',
    description: 'Registro oficial de compras y ventas para el SENIAT',
    icon: ShoppingBasket,
    buttonText: 'Nuevo Registro',
    iconBg: 'bg-green-600/20',
    iconColor: 'text-green-400',
  },
  {
    title: 'Libro de Licores',
    description: 'Control especial para empresas del sector licorería',
    icon: 'liquor',
    buttonText: 'Registrar Movimiento',
    iconBg: 'bg-orange-600/20',
    iconColor: 'text-orange-400',
  },
  {
    title: 'Proformas',
    description: 'Genera proformas y cotizaciones profesionales',
    icon: FilePlus,
    buttonText: 'Nueva Proforma',
    iconBg: 'bg-purple-600/20',
    iconColor: 'text-purple-400',
  },
];

const stats = [
  {
    title: 'Permisos Vigentes',
    value: '3',
    description: '1 por renovar',
    icon: BadgeCheck,
    iconColor: 'text-green-500',
  },
  {
    title: 'Multas Pendientes',
    value: '2',
    description: 'Bs. 45,000',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
  },
  {
    title: 'Facturas del Mes',
    value: '127',
    description: 'Bs. 2.4M',
    icon: Receipt,
    iconColor: 'text-blue-500',
  },
  {
    title: 'Inventario',
    value: '1,245',
    description: '15 productos bajos',
    icon: Package,
    iconColor: 'text-purple-500',
  },
];

const recentActivity = [
  {
    id: 'act-1',
    title: 'Autorización SENIAT aprobada',
    time: 'Hace 2 horas',
    icon: BadgeCheck,
    iconColor: 'bg-green-500/20 text-green-400',
    actionIcon: Eye,
  },
  {
    id: 'act-2',
    title: 'Factura #2024-0156 generada',
    time: 'Hace 4 horas',
    icon: FileText,
    iconColor: 'bg-blue-500/20 text-blue-400',
    actionIcon: Download,
  },
  {
    id: 'act-3',
    title: 'Permiso ambiental por vencer',
    time: 'En 15 días',
    icon: AlertTriangle,
    iconColor: 'bg-red-500/20 text-red-400',
    actionIcon: Bell,
  },
  {
    id: 'act-4',
    title: 'Libro contable 2024 creado',
    time: 'Hace 1 día',
    icon: Book,
    iconColor: 'bg-purple-500/20 text-purple-400',
    actionIcon: Eye,
  },
  {
    id: 'act-5',
    title: 'Registro SENIAT actualizado',
    time: 'Hace 2 días',
    icon: Library,
    iconColor: 'bg-teal-500/20 text-teal-400',
    actionIcon: Download,
  },
];

const financialSummary = [
  { label: 'Ingresos del Mes', amount: 2400000, color: 'bg-green-500' },
  { label: 'Gastos del Mes', amount: 1800000, color: 'bg-red-500' },
  { label: 'Balance', amount: 600000, color: 'bg-blue-500' },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Jurídico</h1>
        <Badge variant="outline" className="border-green-500 text-green-500">
          <BadgeCheck className="w-4 h-4 mr-2" />
          Empresa Activa
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mainActions.map((action, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${action.iconBg}`}>
                  {action.icon === 'liquor' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-6 w-6 ${action.iconColor}`}
                    >
                      <path d="M8 22h8" />
                      <path d="M7 16h10" />
                      <path d="M12 16V5" />
                      <path d="M5.3 5.3a4.2 4.2 0 0 1 0-6" />
                      <path d="M18.7 5.3a4.2 4.2 0 0 0 0-6" />
                      <path d="M12 5a4.2 4.2 0 0 0-4.2-4.2" />
                      <path d="M12 5a4.2 4.2 0 0 1 4.2-4.2" />
                    </svg>
                  ) : (
                    <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                  )}
                </div>
                <CardTitle className="text-lg font-semibold">
                  {action.title}
                </CardTitle>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                {action.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-white/5">
                <Plus className="mr-2 h-4 w-4" />
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80"
              >
                <div className={`p-2 rounded-full ${item.iconColor}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <item.actionIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Resumen Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {financialSummary.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-bold">{formatCurrency(item.amount, 'Bs.')}</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${(item.amount / 2400000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
