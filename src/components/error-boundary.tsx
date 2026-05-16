"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <TriangleAlert className="h-7 w-7 text-rose-500" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Algo salió mal</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Ocurrió un error inesperado al cargar esta sección. Intenta recargar la página.
          </p>
          {this.state.error && (
            <p className="text-[11px] font-mono text-rose-400/60 max-w-md truncate">
              {this.state.error.message}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
