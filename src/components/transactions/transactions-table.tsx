
"use client";

import { useState } from "react";
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
import { Loader2, Sparkles } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { categorizeTransactionAction } from "@/app/(main)/transactions/actions";
import { useToast } from "@/hooks/use-toast";

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
}: {
  initialTransactions: Transaction[];
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [categorizingId, setCategorizingId] = useState<string | null>(null);
  const { toast } = useToast();

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

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell
                  className={`text-right font-mono ${
                    transaction.amount > 0
                      ? "text-green-600"
                      : "text-red-600 dark:text-red-500"
                  }`}
                >
                  {formatCurrency(transaction.amount, 'Bs.')}
                </TableCell>
                <TableCell>
                  <Select
                    value={transaction.category}
                    onValueChange={(value) =>
                      handleCategoryChange(transaction.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  {transaction.category === "Sin Categorizar" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAutoCategorize(transaction)}
                      disabled={categorizingId === transaction.id}
                    >
                      {categorizingId === transaction.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
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
