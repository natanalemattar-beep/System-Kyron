
import { StatsCards } from "@/components/dashboard/stats-cards";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { Button } from "@/components/ui/button";
import { FilePlus, Upload } from "lucide-react";
import Link from "next/link";

export default function DashboardJuridicoPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Jurídico</h1>
        <div className="flex gap-2">
           <Link href="/data-entry">
            <Button variant="outline">
                <Upload className="mr-2" />
                Cargar Documento
            </Button>
          </Link>
          <Link href="/invoices">
            <Button>
                <FilePlus className="mr-2" />
                Crear Factura
            </Button>
          </Link>
        </div>
      </header>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
            <OverviewChart />
        </div>
        <div className="md:col-span-2">
            <RecentInvoices />
        </div>
      </div>
    </div>
  );
}
