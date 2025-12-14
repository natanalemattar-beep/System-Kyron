
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { mockTransactions } from "@/lib/data";

export default function TransactionsPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View, manage, and categorize your transactions.
        </p>
      </header>
      <TransactionsTable initialTransactions={mockTransactions} />
    </div>
  );
}
