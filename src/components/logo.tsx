import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2472" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
          <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.6)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.4)" />
          </linearGradient>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Hexágono Tecnológico de Fondo */}
        <path
          d="M50 2L93.3 27V73L50 98L6.7 73V27L50 2Z"
          stroke="url(#hex-gradient)"
          strokeWidth="1.5"
          fill="rgba(37, 99, 235, 0.03)"
          strokeLinejoin="round"
        />
        
        {/* Detalles de Esquina Hexagonal (Acentos) */}
        <path d="M50 2L60 7.7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 98L40 92.3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        
        {/* Forma de 'K' Estilizada (Vectores de Precisión) */}
        <path
          d="M32 30V70"
          stroke="url(#logo-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          filter="url(#logo-glow)"
        />
        <path
          d="M68 30L32 50L68 70"
          stroke="url(#logo-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logo-glow)"
        />
        
        {/* Nodo Central de Inteligencia (Punto de Conexión) */}
        <circle cx="46" cy="50" r="4.5" fill="#4CAF50" filter="url(#logo-glow)" />
      </svg>
    </div>
  );
}
