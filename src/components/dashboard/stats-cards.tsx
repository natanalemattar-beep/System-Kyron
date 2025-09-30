import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    title: "Total Revenue",
    amount: 45231.89,
    trend: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Total Expenses",
    amount: 21345.67,
    trend: "+12.5% from last month",
    icon: TrendingDown,
  },
  {
    title: "Net Income",
    amount: 23886.22,
    trend: "+30.2% from last month",
    icon: TrendingUp,
  },
  {
    title: "Pending Invoices",
    amount: 3,
    trend: "2 paid this week",
    icon: Receipt,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {index < 3 ? formatCurrency(stat.amount) : stat.amount}
            </div>
            <p className="text-xs text-muted-foreground">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
