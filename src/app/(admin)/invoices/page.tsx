
"use client";
import { InvoicesTable } from "@/components/invoices/invoices-table";
import { CreateInvoiceSheet } from "@/components/invoices/create-invoice-sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useUser } from "@/firebase/provider";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";

export default function InvoicesPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const invoicesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    // Correctly query the subcollection for the logged-in user
    return query(collection(firestore, "users", user.uid, "invoices"));
  }, [user, firestore]);

  const { data: invoices, isLoading } = useCollection(invoicesQuery);

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturas</h1>
          <p className="text-muted-foreground">
            Crea y gestiona las facturas de tus clientes.
          </p>
        </div>
        <CreateInvoiceSheet>
          <Button>
            <PlusCircle className="mr-2" />
            Crear Factura
          </Button>
        </CreateInvoiceSheet>
      </header>
      <InvoicesTable invoices={invoices || []} isLoading={isLoading} />
    </div>
  );
}
