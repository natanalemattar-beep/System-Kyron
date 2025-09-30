import { DataEntryForm } from "@/components/data-entry/data-entry-form";

export default function DataEntryPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Automated Data Entry</h1>
        <p className="text-muted-foreground">
          Upload a receipt or invoice to automatically extract financial data.
        </p>
      </header>
      <DataEntryForm />
    </div>
  );
}
