"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard-empresa error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <TriangleAlert className="h-7 w-7 text-rose-500" />
      </div>
      <h2 className="text-lg font-bold text-foreground">Error al cargar el dashboard</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Ocurrió un error inesperado. Esto puede deberse a un problema de conexión o a datos incorrectos.
      </p>
      {error && (
        <p className="text-[11px] font-mono text-rose-400/60 max-w-md truncate">
          {error.message}
        </p>
      )}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-2" />
          Recargar página
        </Button>
        <Button
          size="sm"
          className="rounded-xl"
          onClick={reset}
        >
          Reintentar
        </Button>
      </div>
    </div>
  );
}
