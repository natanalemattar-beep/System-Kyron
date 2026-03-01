import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Ingresos Totales",
    amount: 45231.89,
    trend: "+20.1% vs mes anterior",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5"
  },
  {
    title: "Gastos Totales",
    amount: 21345.67,
    trend: "+12.5% vs mes anterior",
    icon: TrendingDown,
    color: "text-rose-400",
    bg: "bg-rose-400/5"
  },
  {
    title: "Ingreso Neto",
    amount: 23886.22,
    trend: "+30.2% vs mes anterior",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-400/5"
  },
  {
    title: "Facturas Pendientes",
    amount: 3,
    trend: "2 pagadas hoy",
    icon: Receipt,
    color: "text-amber-400",
    bg: "bg-amber-400/5"
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="glass-card border-none group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] group-hover:opacity-[0.05] transition-all scale-150">
            <stat.icon className="w-24 h-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{stat.title}</CardTitle>
            <div className={cn("p-3 rounded-xl border border-white/5 shadow-inner", stat.bg, stat.color)}>
                <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter italic text-white mb-2">
              {index < 3 ? formatCurrency(stat.amount, 'Bs.') : stat.amount}
            </div>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest", stat.color)}>{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}