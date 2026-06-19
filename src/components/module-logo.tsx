import Image from "next/image";
import { cn } from "@/lib/utils";

interface ModuleLogoProps {
  src: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ModuleLogo({ src, alt, className, size = "md" }: ModuleLogoProps) {
  const sizeMap = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-32 w-32",
  };

  const sizeClass = sizeMap[size];

  return (
    <div className={cn("relative overflow-hidden rounded-xl flex items-center justify-center", sizeClass, className)}>
      <img 
        src={src} 
        alt={alt || "Module Logo"} 
        className="h-full w-full object-contain" 
      />
    </div>
  );
}
