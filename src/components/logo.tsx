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
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Hexagon */}
        <path
          d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z"
          className="fill-primary/5 stroke-primary/20"
          strokeWidth="1.5"
        />
        
        {/* Dynamic 'K' Shapes */}
        <path
          d="M35 28V72"
          stroke="url(#logo-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          d="M68 28L35 50L68 72"
          stroke="url(#logo-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        
        {/* Core Connection Point */}
        <circle cx="50" cy="50" r="3" fill="#4CAF50" className="animate-pulse" />
      </svg>
    </div>
  );
}