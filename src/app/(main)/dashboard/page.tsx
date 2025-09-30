import { StatsCards } from "@/components/dashboard/stats-cards";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a snapshot of your finances.
        </p>
      </header>
      <div className="space-y-8">
        <StatsCards />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OverviewChart />
          </div>
          <div>
            <RecentInvoices />
          </div>
        </div>
      </div>
    </div>
  );
}
