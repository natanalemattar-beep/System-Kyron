"use client";

import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Activity, LayoutGrid, Loader2 } from "lucide-react";
import { useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function TransactionsPage() {
  const { user } = useUser();
  const db = useMemoFirebase(() => user ? query(collection(getFirestore(), "users", user.uid, "transactions"), orderBy("date", "desc")) : null, [user]);
  
  // Nota: Importante importar getFirestore de firebase/firestore
  // Si useCollection requiere el SDK directo, aseguramos la conexión.
  const { data: transactions, isLoading } = useCollection(db as any);

  return (
    <div className="space-y-10 px-6 md:px-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest border border-white/5 mb-4">
            <Activity className="h-3 w-3" /> Ledger Transaccional Personalizado
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase leading-none italic italic-shadow">Registro de <span className="text-primary">Operaciones Reales</span></h1>
        <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
          Visualización de datos vinculados a su UID: {user?.uid.slice(0, 8)}...
        </p>
      </header>
      
      <div className="titanium-card rounded-[2rem] overflow-hidden">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 bg-card/40 backdrop-blur-xl">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Sincronizando con Firestore...</p>
            </div>
        ) : (
            <TransactionsTable initialTransactions={transactions || []} isLoading={false} />
        )}
      </div>
    </div>
  );
}

// Helper para importar getFirestore si no está disponible globalmente
import { getFirestore } from "firebase/firestore";
