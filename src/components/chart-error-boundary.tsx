'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallbackLabel?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChartErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ChartErrorBoundary] Chart rendering failed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
          <BarChart3 className="h-8 w-8" />
          <p className="text-[10px] font-semibold uppercase">
            {this.props.fallbackLabel ?? 'Error al cargar el gráfico'}
          </p>
          <p className="text-[9px]">Actualiza la página para intentar de nuevo</p>
        </div>
      );
    }

    return this.props.children;
  }
}
