import { cn } from "@/lib/utils";

/**
 * @fileOverview Logo Institucional de System Kyron v2.6.5.
 * Diseño fiel a la identidad visual: Hexágono de precisión con glifo de inducción y nodo central.
 * Sustituye la 'K' por la arquitectura vectorial de la marca.
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
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          
          <linearGradient id="hex-gradient-master" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(14, 165, 233, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
          </linearGradient>

          <filter id="master-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Fondo del Hexágono - Contraste Corporativo */}
        <path
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z"
          fill="#050505"
        />

        {/* Borde del Hexágono Neón */}
        <path
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z"
          stroke="url(#hex-gradient-master)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Glifo de Inducción - Identidad Visual Real */}
        <g filter="url(#master-glow)">
          <path
            d="M68 28L38 50L68 72"
            stroke="url(#logo-gradient-master)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Nodo de Inteligencia Central */}
          <circle cx="46" cy="50" r="6" fill="#ffffff" />
          <circle cx="46" cy="50" r="3" fill="#22c55e" />
        </g>

        {/* Detalles de Vértice */}
        <circle cx="50" cy="5" r="2" fill="#0ea5e9" />
        <circle cx="50" cy="95" r="2" fill="#22c55e" />
      </svg>
    </div>
  );
}
