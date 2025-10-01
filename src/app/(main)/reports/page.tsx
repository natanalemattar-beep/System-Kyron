import { ReportsView } from "@/components/reports/reports-view";

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reportes Financieros</h1>
        <p className="text-muted-foreground">
          Genera y visualiza tus estados financieros.
        </p>
      </header>
      <ReportsView />
    </div>
  );
}
