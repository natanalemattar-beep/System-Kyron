
"use client";

import { TransactionsTable } from "@/components/transactions/transactions-table";
import { useUser } from "@/firebase/provider";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";

export default function TransactionsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, "users", user.uid, "transactions"));
  }, [user, firestore]);

  const { data: transactions, isLoading } = useCollection(transactionsQuery);

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
