"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader as Loader2, Sparkles } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { categorizeTransactionAction } from "@/app/actions/transactions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

const categories = [
  "Ingreso",
  "Comida",
  "Transporte",
  "Servicios Públicos",
  "Software",
  "Suministros de Oficina",
  "Entretenimiento",
  "Sin Categorizar",
];

export function TransactionsTable({
  initialTransactions,
  isLoading
}: {
  initialTransactions: Transaction[];
  isLoading: boolean;
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [categorizingId, setCategorizingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleCategoryChange = (transactionId: string, newCategory: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, category: newCategory } : t
      )
    );
  };

  const handleAutoCategorize = async (transaction: Transaction) => {
    setCategorizingId(transaction.id);
    const result = await categorizeTransactionAction({
      transactionDescription: transaction.description,
      transactionAmount: transaction.amount,
    });
    setCategorizingId(null);

    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Falló la Categorización",
        description: result.error,
      });
    } else {
      handleCategoryChange(transaction.id, result.category);
      toast({
        title: "¡Categorizado!",
        description: `Transacción marcada como "${result.category}" con ${Math.round(result.confidence * 100)}% de confianza.`,
      });
    }
  };
  
  if (isLoading) {
    return (
       <Card className="glass-card border-none bg-card/40">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-none">
                <TableHead className="text-[10px] font-semibold uppercase tracking-widest opacity-30">Fecha</TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-widest opacity-30">Descripción</TableHead>
                <TableHead className="text-right text-[10px] font-semibold uppercase tracking-widest opacity-30">Monto</TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-widest opacity-30">Categoría</TableHead>
                <TableHead className="text-right text-[10px] font-semibold uppercase tracking-widest opacity-30">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-[180px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-[120px] ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-none bg-card/40 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 border-none">
              <TableHead className="pl-8 text-[10px] font-semibold uppercase tracking-widest opacity-30">Fecha</TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-widest opacity-30">Descripción</TableHead>
              <TableHead className="text-right text-[10px] font-semibold uppercase tracking-widest opacity-30">Monto</TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-widest opacity-30">Categoría</TableHead>
              <TableHead className="text-right pr-8 text-[10px] font-semibold uppercase tracking-widest opacity-30">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-border/50 hover:bg-muted/20 transition-all">
                <TableCell className="pl-8 py-6 text-xs font-bold text-muted-foreground uppercase">{formatDate(transaction.date)}</TableCell>
                <TableCell className="py-6 font-semibold uppercase text-xs italic text-white/80">
                  {transaction.description}
                </TableCell>
                <TableCell
                  className={`text-right py-6 font-mono text-sm font-bold ${
                    transaction.amount > 0
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {formatCurrency(transaction.amount, 'Bs.')}
                </TableCell>
                <TableCell className="py-6">
                  <Select
                    value={transaction.category}
                    onValueChange={(value) =>
                      handleCategoryChange(transaction.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px] h-10 rounded-xl bg-white/5 border-white/10 text-[10px] font-bold uppercase">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/10">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-[10px] font-bold uppercase">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right pr-8 py-6">
                  {transaction.category === "Sin Categorizar" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl h-10 px-4 hover:bg-primary/10 hover:text-primary transition-all font-bold text-[11px] uppercase tracking-widest"
                      onClick={() => handleAutoCategorize(transaction)}
                      disabled={categorizingId === transaction.id}
                    >
                      {categorizingId === transaction.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 text-primary animate-pulse" />
                          Categorizar
                        </>
                      )}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
