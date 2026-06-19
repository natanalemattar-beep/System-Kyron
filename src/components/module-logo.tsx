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
    sm: { width: 40, height: 40 },
    md: { width: 56, height: 56 },
    lg: { width: 128, height: 128 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <Image
        src={src}
        alt={alt || "Module Logo"}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
