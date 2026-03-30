
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface Factura {
  id: number;
  numero_factura: string;
  cliente_nombre: string | null;
  fecha_emision: string;
  total: string;
  estado: string;
}

export function RecentInvoices() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [pendientes, setPendientes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facturas?limit=5')
      .then(r => r.ok ? r.json() : { facturas: [] })
      .then(data => {
        const list: Factura[] = data.facturas ?? [];
        setFacturas(list);
        setPendientes(list.filter(f => f.estado === 'emitida' || f.estado === 'pendiente').length);
      })
      .catch(() => setFacturas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Facturas Recientes</CardTitle>
        <CardDescription>
          {loading ? 'Cargando...' : `Tienes ${pendientes} facturas pendientes.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))
        ) : facturas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No hay facturas registradas aún.</p>
        ) : (
          facturas.map((f) => (
            <div key={f.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{(f.cliente_nombre ?? f.numero_factura).charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {f.cliente_nombre ?? f.numero_factura}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(f.fecha_emision)}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(parseFloat(f.total), 'Bs.')}
              </div>
            </div>
          ))
        )}
        <Button asChild className="w-full">
          <Link href="/facturacion">
            Ver Todas las Facturas <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
