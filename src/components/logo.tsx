import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-10 h-10 flex items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-primary/10 rounded-lg transform-gpu" style={{
        transform: 'perspective(100px) rotateX(20deg) rotateY(-10deg) scale(0.9)',
        boxShadow: '0 5px 15px hsl(var(--primary-rgb) / 0.1), 0 1px 3px hsl(var(--primary-rgb) / 0.2)',
        border: '1px solid hsl(var(--primary-rgb) / 0.1)',
        backdropFilter: 'blur(4px)',
      }}></div>
      
      {/* Inner Orb */}
      <div className="absolute w-4 h-4 bg-primary rounded-full blur-[6px] animate-pulse"></div>
      <div className="absolute w-3 h-3 bg-white rounded-full"></div>
      
      {/* Rings */}
      <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
      <div className="absolute w-[70%] h-[70%] border border-primary/20 rounded-full animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>

    </div>
  );
}
