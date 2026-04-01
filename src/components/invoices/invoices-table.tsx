"use client";

import type { Invoice } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveHorizontal as MoreHorizontal, Loader as Loader2, Eye, Download, Lock, ShieldCheck, Send, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const statusVariant: { [key in Invoice["status"]]: "default" | "secondary" | "destructive" | "outline" } = {
  Pagada: "default",
  Enviada: "secondary",
  Borrador: "outline",
  Vencida: "destructive",
};

export function InvoicesTable({ invoices, isLoading }: { invoices: Invoice[], isLoading: boolean }) {
  const { toast } = useToast();

  const handleImmutableAction = () => {
    toast({
      variant: "destructive",
      title: "Documento Fiscal Inmutable",
      description: "Este documento ya fue emitido y no puede ser editado ni eliminado según la Providencia SNAT/2011/00071. Para correcciones, emita una Nota de Crédito o Nota de Débito.",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factura #</TableHead>
                <TableHead>Control</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="w-[80px] text-center">Fiscal</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-6 rounded-full mx-auto" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  if (!invoices || invoices.length === 0) {
    return (
        <div className="text-center py-12 text-muted-foreground">
            No se han encontrado facturas.
        </div>
    )
  }

  return (
    <TooltipProvider>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factura #</TableHead>
                <TableHead>Control</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="w-[80px] text-center">Fiscal</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const isImmutable = (invoice as Record<string, unknown>).inmutable === true || invoice.status !== 'Borrador';

                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium font-mono text-xs">{invoice.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">—</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(invoice.amount, 'Bs.')}
                    </TableCell>
                    <TableCell className="text-center">
                      {isImmutable ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10">
                              <Lock className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-[280px]">
                            <div className="space-y-1">
                              <p className="font-bold text-xs flex items-center gap-1.5">
                                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                Documento Fiscal Inmutable
                              </p>
                              <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Providencia SNAT/2011/00071 — Este documento no puede ser editado ni eliminado. Para correcciones use NC o ND.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/10">
                              <FileText className="h-3.5 w-3.5 text-amber-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p className="text-xs">Borrador — editable</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-3.5 w-3.5" />
                            Ver Documento
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-3.5 w-3.5" />
                            Descargar PDF
                          </DropdownMenuItem>
                          {isImmutable && (
                            <>
                              <DropdownMenuItem className="gap-2">
                                <Send className="h-3.5 w-3.5" />
                                Reenviar al Cliente
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="gap-2 text-muted-foreground cursor-not-allowed opacity-50"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleImmutableAction();
                                }}
                              >
                                <Lock className="h-3.5 w-3.5" />
                                No Editable — SENIAT
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
