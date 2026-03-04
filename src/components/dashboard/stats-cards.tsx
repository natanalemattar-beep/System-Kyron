import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Ingresos Totales",
    amount: 45231.89,
    trend: "+20.1%",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5"
  },
  {
    title: "Gastos Totales",
    amount: 21345.67,
    trend: "+12.5%",
    icon: TrendingDown,
    color: "text-rose-400",
    bg: "bg-rose-400/5"
  },
  {
    title: "Utilidad Neta",
    amount: 23886.22,
    trend: "+30.2%",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-400/5"
  },
  {
    title: "Facturas",
    amount: 3,
    trend: "2 hoy",
    icon: Receipt,
    color: "text-amber-400",
    bg: "bg-amber-400/5"
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="glass-card border-none group relative overflow-hidden rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{stat.title}</CardTitle>
            <div className={cn("p-2 rounded-lg border border-white/5", stat.bg, stat.color)}>
                <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tighter italic text-white mb-1">
              {index < 3 ? formatCurrency(stat.amount, 'Bs.') : stat.amount}
            </div>
            <p className={cn("text-[9px] font-bold uppercase tracking-widest", stat.color)}>{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
