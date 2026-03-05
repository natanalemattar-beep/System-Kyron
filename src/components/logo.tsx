import { cn } from "@/lib/utils";

/**
 * @fileOverview Logo Institucional de System Kyron v2.6.5.
 * Diseño refinado con equilibrio geométrico absoluto.
 * Hexágono de precisión con núcleo vectorial 'K' y nodo de inteligencia.
 */

export function Logo({ className, id }: { className?: string; id?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        id={id}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient-master" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" /> {/* Sky Blue */}
            <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
          </linearGradient>
          
          <linearGradient id="hex-gradient-master" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(14, 165, 233, 0.4)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.2)" />
          </linearGradient>

          <filter id="master-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Hexágono Perímetro de Precisión */}
        <path
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z"
          stroke="url(#hex-gradient-master)"
          strokeWidth="2"
          fill="rgba(255, 255, 255, 0.02)"
          strokeLinejoin="round"
        />
        
        {/* Acentos de Vértice */}
        <circle cx="50" cy="5" r="1.5" fill="#0ea5e9" />
        <circle cx="50" cy="95" r="1.5" fill="#22c55e" />
        
        {/* Glifo 'K' - Arquitectura de Datos (Proporciones Áureas) */}
        <g filter="url(#master-glow)">
          {/* Barra Vertical */}
          <path
            d="M36 28V72"
            stroke="url(#logo-gradient-master)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Brazos Diagonales */}
          <path
            d="M64 28L36 50L64 72"
            stroke="url(#logo-gradient-master)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Nodo Central de Procesamiento */}
          <circle cx="44" cy="50" r="4" fill="#ffffff" />
          <circle cx="44" cy="50" r="2" fill="#22c55e" />
        </g>
      </svg>
    </div>
  );
}
