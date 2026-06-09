'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QrCodeProps {
  data: string;
  size?: number;
  className?: string;
  alt?: string;
}

export function QrCode({ data, size = 200, className, alt }: QrCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    setError(false);
    QRCodeLib.toCanvas(canvasRef.current, data, {
      width: size,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    }, (err) => {
      if (err) {
        console.error('[qr-code] Error generando QR:', err);
        setError(true);
      }
    });
  }, [data, size]);

  if (error) {
    return (
      <div
        className={className}
        style={{ width: size, height: size }}
      >
        <div className="flex items-center justify-center h-full bg-muted/30 rounded-xl border border-border/50">
          <span className="text-[10px] text-muted-foreground">Error al generar QR</span>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
      aria-label={alt || `QR: ${data.slice(0, 40)}`}
      role="img"
    />
  );
}
