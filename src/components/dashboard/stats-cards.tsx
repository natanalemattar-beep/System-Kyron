import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stats = [
  { title: "Ingresos Totales", amount: 45231.89, trend: "+20.1%", icon: DollarSign },
  { title: "Gastos Totales", amount: 21345.67, trend: "+12.5%", icon: TrendingDown },
  { title: "Utilidad Neta", amount: 23886.22, trend: "+30.2%", icon: TrendingUp },
  { title: "Ventas Activas", amount: 3, trend: "2 hoy", icon: Receipt },
];

export function StatsCards() {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 w-full">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="bg-[#050505] border border-[#1f1f1f] group hover:border-[#333] transition-all">
          <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.title}</CardTitle>
            <stat.icon className="h-3.5 w-3.5 text-white/20 group-hover:text-white transition-colors" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-xl font-bold text-white mb-1">
              {index < 3 ? formatCurrency(stat.amount, 'Bs.') : stat.amount}
            </div>
            <p className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                stat.trend.startsWith('+') ? "text-emerald-400" : "text-rose-400"
            )}>{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
