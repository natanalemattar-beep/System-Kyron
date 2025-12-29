
"use client";

import { TransactionsTable } from "@/components/transactions/transactions-table";
import { mockTransactions } from "@/lib/data";

export default function TransactionsPage() {
  // Using mock data directly, no need for Firebase hooks.
  const transactions = mockTransactions;
  const isLoading = false; // Data is static, so it's never loading.

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Transacciones</h1>
        <p className="text-muted-foreground">
          Visualiza, gestiona y categoriza tus transacciones.
        </p>
      </header>
      <TransactionsTable 
        initialTransactions={transactions || []} 
        isLoading={isLoading} 
      />
    </div>
  );
}
