
import { InvoicesTable } from "@/components/invoices/invoices-table";
import { CreateInvoiceSheet } from "@/components/invoices/create-invoice-sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockInvoices } from "@/lib/data";

export default function InvoicesPage() {
  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Create and manage your customer invoices.
          </p>
        </div>
        <CreateInvoiceSheet>
          <Button>
            <PlusCircle className="mr-2" />
            Create Invoice
          </Button>
        </CreateInvoiceSheet>
      </header>
      <InvoicesTable invoices={mockInvoices} />
    </div>
  );
}
